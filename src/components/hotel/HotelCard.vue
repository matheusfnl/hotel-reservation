<template>
  <q-card class="bg-white rounded-borders-md row">
    <q-card-section class="image-section q-pa-none col-3 overflow-hidden">
      <img :src="hotel.thumb" class="full-width fit-image" />
    </q-card-section>

    <q-card-section class="col-5">
      <p class="text-h5 text-weight-medium q-mb-none">Mélia Paulista</p>
      <p class="text-weight-medium text-grey-6">São Paulo, Paraíso. A 2,97km do centro</p>

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

      <q-chip color="grey" text-color="white" class="text-bold" square>Reembolsável</q-chip>
    </q-card-section>

    <q-card-section class="col-4 relative-position">
      <q-separator vertical color="grey-3" class="position-left" spaced />
      adasdasd
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import type { Hotel } from '@/types'
import { Amenities } from '@/enums/amenities'

const rating = ref(4.8)

const { hotel } = defineProps<{
  hotel: Hotel
}>()

const getAmenities = computed(() => {
  const amenities = hotel.amenities ? [...hotel.amenities] : []

  if (hotel.hasBreakFast && !amenities.find((amenity) => amenity.key === 'BREAKFAST')) {
    amenities.push({
      key: 'BREAKFAST',
      label: 'Café da manhã',
    })
  }

  if (hotel.hasRefundableRoom && !hotel.nonRefundable) {
    amenities.push({
      key: 'REFUNDABLE',
      label: 'Reembolsável',
    })
  }

  return amenities
})
</script>

<style lang="scss" scoped>
.image-section {
  border-radius: 0.75rem 0 0 0.75rem !important;

  .fit-image {
    height: 256px;
    object-fit: cover;
    object-position: center;
  }
}

.position-left {
  position: absolute;
  height: 100%;
  top: 0px;
  left: 0;
  margin: 0 !important;
}
</style>
