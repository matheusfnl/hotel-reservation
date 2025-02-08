<template>
  <q-layout view="lHh Lpr lFf">
    <PageHeader ref="pageHeader">
      <template #inputs>
        <div class="row q-col-gutter-x-md">
          <label class="col-6">
            <span class="text-bold text-grey-6">
              {{ $t('home.search.inputs.destination.label') }}
              <span class="text-red">*</span>
            </span>

            <q-select
              v-model="text"
              use-input
              hide-selected
              fill-input
              outlined
              dense
              dropdown-icon=""
              input-debounce="0"
              :placeholder="$t('home.search.inputs.destination.placeholder')"
              :options="options"
              @filter="filterFn"
              @filter-abort="abortFilterFn"
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
            <span class="text-bold text-grey-6">
              {{ $t('home.search.inputs.hotel.label') }}
            </span>

            <q-input
              outlined
              v-model="text"
              dense
              :placeholder="$t('home.search.inputs.hotel.placeholder')"
              @keydown.enter="handleSearch"
            />
          </label>
        </div>
      </template>
    </PageHeader>

    <div class="row items-center justify-between q-py-md">
      <AppBreadcrumb />
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

import { useHotelsStore } from 'src/stores/hotels'

const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']

const hotelStore = useHotelsStore()

const text = ref('')
const pageHeader = ref<InstanceType<typeof PageHeader>>()
const options = ref(stringOptions)

const handleSearch = () => {
  pageHeader.value?.searchData()
}

const filterFn = (val: string, update: (callbackFn: () => void, afterFn?: () => void) => void) => {
  setTimeout(() => {
    update(() => {
      if (val === '') {
        options.value = stringOptions
      } else {
        const needle = val.toLowerCase()
        options.value = stringOptions.filter((v) => v.toLowerCase().indexOf(needle) > -1)
      }
    })
  }, 1500)
}

const abortFilterFn = () => {}

interface Amenity {
  key: string
  label: string
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
