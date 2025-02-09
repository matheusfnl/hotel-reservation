<template>
  <q-card-section class="q-pb-none">
    <div class="q-ma-none q-mb-sm row items-center q-gutter-x-sm">
      {{ rating }}

      <q-rating v-model="rating" readonly size="18px" :max="5" color="yellow" />
    </div>

    <p class="text-h4 q-mb-none two-lines-truncate">{{ hotel.getName }}</p>
    <p class="text-grey-6 q-mb-none">{{ hotel.getFullHotelLocation }}</p>
  </q-card-section>

  <q-card-section>
    <q-carousel
      v-model="slide"
      animated
      infinite
      :autoplay="100000"
      arrows
      height="512px"
      class="no-scroll"
      navigation-icon="radio_button_unchecked"
      control-type="regular"
      control-color="white"
      control-text-color="grey"
    >
      <q-carousel-slide
        v-for="(image, index) in hotel.getImages"
        :key="index"
        :name="index"
        class="q-pa-none"
        style="height: 512px"
      >
        <q-img
          :src="image"
          spinner-color="primary"
          fit="cover"
          height="512px"
          class="full-width"
          no-native-menu
        />
      </q-carousel-slide>

      <template v-slot:control>
        <div class="image-counter text-white q-px-md q-py-xs">
          {{ slide + 1 }}/{{ hotel.getImages.length }}
        </div>
      </template>
    </q-carousel>
  </q-card-section>

  <q-card-section v-if="hotel.getAmenities.length">
    <p class="text-h5">{{ $t('hotel.drawer.facilities.title') }}</p>

    <q-separator />

    <div class="q-my-lg amenities-grid">
      <span v-for="amenity in getAmenities" class="amenity-item text-grey-6" :key="amenity.key">
        <q-icon :name="Amenities[amenity.key]" size="sm" />
        {{ amenity.label }}
      </span>
    </div>

    <div class="row justify-center q-mb-lg" v-if="hotel.getAmenities.length > 4">
      <q-btn rounded no-caps color="primary" outline @click="toggleFacilities">
        {{ getAmenitiesText }}
      </q-btn>
    </div>

    <q-separator />
  </q-card-section>

  <q-card-section>
    <p class="text-h5">{{ $t('hotel.drawer.description.title') }}</p>

    <p class="text-grey-6">
      {{ hotel.getDescription }}
    </p>
  </q-card-section>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { Hotel } from '@/models/Hotel'

import { Amenities } from '@/enums/amenities'

const { hotel } = defineProps<{
  hotel: Hotel
}>()

const { t } = useI18n()

const rating = ref(0)
const slide = ref(0)
const showAllAmenities = ref(false)

const getAmenities = computed(() => {
  const quantity = showAllAmenities.value ? hotel.getAmenities.length : 4
  const amenities = hotel.getAmenities

  return amenities.splice(0, quantity)
})

const getAmenitiesText = computed(() => {
  return showAllAmenities.value ? t('hotel.drawer.button.less') : t('hotel.drawer.button.more')
})

const toggleFacilities = () => {
  showAllAmenities.value = !showAllAmenities.value
}

onMounted(() => {
  rating.value = +hotel.getRating
})
</script>

<style lang="scss" scoped>
:deep(.q-carousel) {
  border-radius: 16px;
  overflow: hidden;

  .q-carousel__slide {
    border-radius: 16px;
  }

  .q-img {
    border-radius: 16px;
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

.image-counter {
  position: absolute;
  bottom: 16px;
  left: 50%;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 16px;
  transform: translateX(-50%);
}

.amenities-grid {
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: space-between;
}

.amenity-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
}

.two-lines-truncate {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
