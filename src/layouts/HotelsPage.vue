<template>
  <q-layout view="lHh Lpr lFf">
    <PageHeader ref="pageHeader">
      <template #inputs>
        <div class="row q-col-gutter-x-md">
          <label class="col-6">
            <span class="text-weight-medium text-grey-7">
              {{ $t('hotel.search.inputs.destination.label') }}
              <span class="text-red">*</span>
            </span>

            <PlaceSelect />
          </label>

          <label class="col-6">
            <span class="text-weight-medium text-grey-7">
              {{ $t('hotel.search.inputs.hotel.label') }}
            </span>

            <q-input
              outlined
              v-model="nameSearch"
              dense
              :placeholder="$t('hotel.search.inputs.hotel.placeholder')"
              @keydown.enter="handleSearch"
            />
          </label>
        </div>
      </template>
    </PageHeader>

    <div class="row items-center justify-between q-py-md">
      <AppBreadcrumb :breadcrumb-items="['home']" />
      <SearchResultsOrder />
    </div>

    <div class="row q-col-gutter-y-md">
      <template v-if="hotelStore.hotels.length">
        <div v-for="hotel in hotelStore.hotels" class="col-12" :key="hotel.id">
          <HotelCard :hotel="hotel" />
        </div>
      </template>
    </div>
  </q-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import PageHeader from '@/components/PageHeader.vue'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import SearchResultsOrder from '@/components/SearchResultsOrder.vue'
import HotelCard from '@/components/hotel/HotelCard.vue'
import PlaceSelect from '@/components/inputs/PlaceSelect.vue'

import { useHotelsStore } from '@/stores/hotels'

interface Amenity {
  key: string
  label: string
}

const hotelStore = useHotelsStore()

const nameSearch = ref('')
const pageHeader = ref<InstanceType<typeof PageHeader>>()

const handleSearch = () => {
  pageHeader.value?.searchData()
}

onMounted(async () => {
  await hotelStore.fetchHotels()

  console.log(
    hotelStore.hotels
      .flatMap((hotel) => hotel.amenities)
      .reduce((acc: Amenity[], current) => {
        if (current && !acc.some((item) => item.key === current.key)) {
          acc.push(current)
        }
        return acc
      }, [] as Amenity[]),
  )
})
</script>
