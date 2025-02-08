<template>
  <q-layout view="lHh Lpr lFf">
    <PageHeader ref="pageHeader">
      <template #inputs>
        <div class="row q-col-gutter-x-md">
          <label class="col-6">
            <span class="text-weight-medium text-grey-7">
              {{ $t('home.search.inputs.destination.label') }}
              <span class="text-red">*</span>
            </span>

            <q-select
              v-model="placeSearch"
              use-input
              hide-selected
              fill-input
              outlined
              dense
              clearable
              hide-dropdown-icon
              input-debounce="0"
              :placeholder="$t('home.search.inputs.destination.placeholder')"
              :options="filteredPlaces"
              option-label="formattedLabel"
              @filter="filterPlaces"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    {{ $t('home.search.inputs.destination.empty') }}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </label>

          <label class="col-6">
            <span class="text-weight-medium text-grey-7">
              {{ $t('home.search.inputs.hotel.label') }}
            </span>

            <q-input
              outlined
              v-model="nameSearch"
              dense
              :placeholder="$t('home.search.inputs.hotel.placeholder')"
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

import { useHotelsStore } from '@/stores/hotels'
import { usePlacesStore } from '@/stores/places'

interface Amenity {
  key: string
  label: string
}

interface Place {
  name: string
  state: {
    name: string
    shortname: string
  }
  placeId: number
  formattedLabel: string
}

const hotelStore = useHotelsStore()
const placeStore = usePlacesStore()

const placeSearch = ref('')
const nameSearch = ref('')
const pageHeader = ref<InstanceType<typeof PageHeader>>()
const filteredPlaces = ref<Place[]>([])

const filterPlaces = (val: string, update: (fn: () => void) => void) => {
  const formattedPlaces = placeStore.places.map((place) => ({
    formattedLabel: `${place.name}, ${place.state.shortname}`,
    ...place,
  }))

  update(() => {
    const search = val.toLowerCase()
    filteredPlaces.value = formattedPlaces.filter(
      (place) =>
        place.formattedLabel.toLowerCase().includes(search) ||
        place.state.name.toLowerCase().includes(search),
    )
  })
}

const handleSearch = () => {
  pageHeader.value?.searchData()
}

onMounted(async () => {
  await Promise.allSettled([hotelStore.fetchHotels(), placeStore.fetchPlaces()])

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
