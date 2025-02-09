<template>
  <q-card class="bg-white rounded-borders-md row">
    <q-card-section class="image-section q-pa-none col-3 overflow-hidden">
      <q-carousel
        v-model="slide"
        animated
        infinite
        :autoplay="10000"
        arrows
        height="256px"
        class="rounded-borders-md no-scroll"
        navigation-icon="radio_button_unchecked"
        control-type="regular"
        control-color="white"
        control-text-color="grey"
      >
        <q-carousel-slide
          v-for="(image, index) in hotel.images"
          :key="index"
          :name="index"
          class="q-pa-none"
          style="height: 256px"
        >
          <q-img
            :src="image"
            spinner-color="primary"
            fit="cover"
            height="256px"
            class="full-width"
            no-native-menu
          />
        </q-carousel-slide>
      </q-carousel>
    </q-card-section>

    <q-card-section class="col-6">
      <p class="text-h5 q-mb-none two-lines-truncate">{{ hotel.name }}</p>
      <p class="text-grey-6">{{ getHotelLocation }}</p>

      <div class="q-ma-none q-mb-sm row items-center q-gutter-x-sm">
        {{ rating }}

        <q-rating v-model="rating" readonly size="18px" :max="5" color="yellow" />

        <q-separator vertical color="grey" />

        <q-icon
          v-for="amenity in getAmenities"
          :key="amenity.key"
          :name="Amenities[amenity.key]"
          size="xs"
        >
          <q-tooltip class="bg-primary text-bold">
            {{ amenity.label }}
          </q-tooltip>
        </q-icon>
      </div>

      <q-chip v-if="isRefundable" color="grey" text-color="white" class="text-weight-medium" square>
        {{ $t('hotel.hotel.refundable') }}
      </q-chip>
    </q-card-section>

    <q-card-section class="col-3 relative-position">
      <q-separator vertical color="grey-3" class="position-left" spaced />
      <p class="q-mb-xs text-grey-6 text-caption">{{ $t('hotel.hotel.from') }}:</p>
      <p class="q-mb-xs">
        {{ $t('hotel.hotel.currency') }}<span class="text-h5">{{ getFullPrice }}</span>
      </p>

      <p class="q-mb-none text-grey-6 text-caption">{{ getPerNightText }}</p>
      <p class="text-grey-7 q-mb-xl text-caption">{{ $t('hotel.hotel.taxes_included') }}</p>

      <q-btn rounded no-caps color="primary" size="md" style="width: 140px">
        {{ $t('hotel.hotel.select') }}
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import type { Hotel } from '@/types'

import { Amenities } from '@/enums/amenities'

const { t } = useI18n()

const { hotel } = defineProps<{
  hotel: Hotel
}>()

const rating = ref(0)
const slide = ref(0)

const getAmenities = computed(() => {
  const amenities = hotel.amenities ? [...hotel.amenities] : []

  if (hotel.hasBreakFast && !amenities.find((amenity) => amenity.key === 'BREAKFAST')) {
    amenities.push({
      key: 'BREAKFAST',
      label: 'Café da manhã',
    })
  }

  return amenities
})

const isRefundable = computed(() => {
  return hotel.hasRefundableRoom && !hotel.nonRefundable
})

const getHotelLocation = computed(() => {
  const { city, district, street } = hotel.address

  return `${city}, ${district}, ${street}.`
})

const formatValue = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

const getFullPrice = computed(() => {
  return formatValue(hotel.price)
})

const getPerNightText = computed(() => {
  const value = hotel.price / 3

  return `${t('hotel.hotel.currency')}${formatValue(value)}${t('hotel.hotel.per_night')}`
})

onMounted(() => {
  rating.value = +hotel.stars
})
</script>

<style lang="scss" scoped>
.image-section {
  border-radius: 0.75rem 0 0 0.75rem !important;

  .fit-image {
    object-fit: cover;
    object-position: center;
    pointer-events: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  :deep(.q-carousel) {
    .q-panel.scroll {
      overflow: hidden !important;
    }

    .q-carousel__prev-arrow--horizontal {
      left: 8px;
    }

    .q-carousel__next-arrow--horizontal {
      right: 8px;
    }

    .q-carousel__arrow {
      button {
        width: 18px;
        height: 18px;
        min-width: unset;
        min-height: unset;

        i {
          font-size: 1rem;
        }
      }
    }
  }
}

.position-left {
  position: absolute;
  height: 100%;
  top: 0px;
  left: 0;
  margin: 0 !important;
}

.two-lines-truncate {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
