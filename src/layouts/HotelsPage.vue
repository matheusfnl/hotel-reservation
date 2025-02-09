<template>
  <q-layout view="lHh Lpr lFf">
    <PageHeader
      :request-pending="searchRequestPending"
      :search-label="getSearchLabel"
      @search="handleSearch"
    >
      <template #inputs>
        <div class="row q-col-gutter-x-md">
          <label class="col-12 col-sm-6">
            <span class="text-weight-medium text-grey-7">
              {{ $t('hotel.search.inputs.destination.label') }}
              <span class="text-red">*</span>
            </span>

            <PlaceSelect v-model="placeSearch" />
          </label>

          <label class="col-12 col-sm-6">
            <span class="text-weight-medium text-grey-7">
              {{ $t('hotel.search.inputs.hotel.label') }}
            </span>

            <q-input
              outlined
              v-model="nameSearch"
              dense
              clearable
              :placeholder="$t('hotel.search.inputs.hotel.placeholder')"
              @keydown.enter="handleSearch"
            />
          </label>
        </div>
      </template>
    </PageHeader>

    <div class="row items-center justify-between q-py-md" style="row-gap: 16px">
      <AppBreadcrumb :breadcrumb-items="getBreadcrumb" />
      <SearchResultsOrder v-model="hotelSort" />
    </div>

    <div class="row q-col-gutter-y-md">
      <template v-if="(hotelStore.hotels.length && !requestPending) || pageRequestPending">
        <div v-for="hotel in hotelStore.hotels" class="col-12" :key="hotel.getId">
          <HotelCard :hotel="hotel as Hotel" />
        </div>

        <div v-if="hasNextPage" class="list-end" v-observe-visibility="fetchNextPage" />
        <span v-else class="full-width flex justify-center text-grey-6 empty-feedback q-ma-none">
          {{ $t('hotel.empty.end_list') }}
        </span>
      </template>

      <span
        v-else-if="!requestPending"
        class="full-width flex justify-center text-grey-6 empty-feedback q-ma-none"
      >
        {{ $t('hotel.empty.no_data') }}
      </span>

      <AppSpinner v-if="requestPending || pageRequestPending" size="md" color="primary" />
    </div>
  </q-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import type { Places, BreadcrumbItem } from '@/types'
import type { Hotel } from '@/models/Hotel'

import PageHeader from '@/components/PageHeader.vue'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import SearchResultsOrder from '@/components/SearchResultsOrder.vue'
import HotelCard from '@/components/hotel/HotelCard.vue'
import PlaceSelect from '@/components/inputs/PlaceSelect.vue'
import AppSpinner from '@/components/shared/AppSpinner.vue'

import { Sort } from '@/enums/hotel-sort'
import { useHotelsStore } from '@/stores/hotels'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const hotelStore = useHotelsStore()

const nameSearch = ref('')
const hotelSort = ref(Sort.RECOMMENDED)
const placeSearch = ref<Places | null>(null)
const destinationLabel = ref<BreadcrumbItem | string>('destination.fallback')
const requestPending = ref(false)
const searchRequestPending = ref(false)
const pageRequestPending = ref(false)
const filterApplied = ref(false)
const page = ref(1)

const getSearchLabel = computed(() => {
  if (route.query.name || route.query.sort || filterApplied.value) {
    return t('hotel.search.button.filter')
  }

  return t('hotel.search.button.default')
})

const getBreadcrumb = computed(() => {
  return ['home', 'hotels', destinationLabel.value]
})

const hasNextPage = computed(() => {
  return hotelStore.hotels.length % 10 === 0
})

const fetchHotels = async () => {
  requestPending.value = true
  await hotelStore.fetchHotels({
    placeId: route.params.placeId as string,
    name: nameSearch.value,
    sort: hotelSort.value,
    page: page.value,
  })

  requestPending.value = false
}

const fetchNextPage = async (visible: boolean) => {
  if (visible && !pageRequestPending.value) {
    page.value++
    pageRequestPending.value = true
    await fetchHotels()
    pageRequestPending.value = false
  }
}

const handleSearch = async () => {
  const query = {} as { name: string; sort: string }

  if (nameSearch.value) {
    query.name = nameSearch.value
  }

  if (hotelSort.value !== Sort.RECOMMENDED) {
    query.sort = hotelSort.value
  }

  await router.push({
    name: 'hotels.place',
    params: { placeId: placeSearch.value?.placeId },
    query,
  })

  page.value = 1
  filterApplied.value = true
  searchRequestPending.value = true
  await fetchHotels()
  searchRequestPending.value = false
  destinationLabel.value = setDestinationBreadcrumb()
}

const setDestinationBreadcrumb = (): BreadcrumbItem | string => {
  if (nameSearch.value && placeSearch.value?.name) {
    return {
      label: 'destination.name',
      options: {
        local: placeSearch.value?.name,
        name: nameSearch.value,
      },
    }
  }

  if (placeSearch.value?.name) {
    return {
      label: 'destination.default',
      options: { local: placeSearch.value?.name },
    }
  }

  return 'destination.fallback'
}

onMounted(async () => {
  if (route.query.name) {
    nameSearch.value = route.query.name as string
  }

  if (route.query.sort && [Sort.RECOMMENDED, Sort.BEST_RATED].includes(route.query.sort as Sort)) {
    hotelSort.value = route.query.sort as Sort
  }

  await fetchHotels()
  destinationLabel.value = setDestinationBreadcrumb()
})
</script>

<style scoped>
.empty-feedback {
  font-size: 18px;
}
</style>
