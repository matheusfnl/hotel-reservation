<template>
  <q-layout view="lHh Lpr lFf">
    <PageHeader :request-pending="searchRequestPending" @search="handleSearch">
      <template #inputs>
        <div class="row q-col-gutter-x-md">
          <label class="col-6">
            <span class="text-weight-medium text-grey-7">
              {{ $t('hotel.search.inputs.destination.label') }}
              <span class="text-red">*</span>
            </span>

            <PlaceSelect v-model="placeSearch" />
          </label>

          <label class="col-6">
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

    <div class="row items-center justify-between q-py-md">
      <AppBreadcrumb :breadcrumb-items="getBreadcrumb" />
      <SearchResultsOrder />
    </div>

    <div class="row q-col-gutter-y-md">
      <AppSpinner v-if="requestPending" size="md" color="primary" />

      <template v-else-if="hotelStore.hotels.length">
        <div v-for="hotel in hotelStore.hotels" class="col-12" :key="hotel.id">
          <HotelCard :hotel="hotel" />
        </div>
      </template>

      <span v-else class="full-width flex justify-center text-grey-6 empty-feedback q-ma-none">
        {{ $t('hotel.empty') }}
      </span>
    </div>
  </q-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { FormattedPlaces, BreadcrumbItem } from '@/types'

import PageHeader from '@/components/PageHeader.vue'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import SearchResultsOrder from '@/components/SearchResultsOrder.vue'
import HotelCard from '@/components/hotel/HotelCard.vue'
import PlaceSelect from '@/components/inputs/PlaceSelect.vue'
import AppSpinner from '@/components/shared/AppSpinner.vue'

import { useHotelsStore } from '@/stores/hotels'

const route = useRoute()
const router = useRouter()
const hotelStore = useHotelsStore()

const nameSearch = ref('')
const placeSearch = ref<FormattedPlaces | null>(null)
const requestPending = ref(false)
const destinationLabel = ref<BreadcrumbItem | string>('destination.fallback')
const searchRequestPending = ref(false)

const getBreadcrumb = computed(() => {
  return ['home', 'hotels', destinationLabel.value]
})

const fetchHotels = async () => {
  requestPending.value = true
  await hotelStore.fetchHotels({
    placeId: route.params.placeId as string,
    name: nameSearch.value,
  })

  requestPending.value = false
}

const handleSearch = async () => {
  await router.push({
    name: 'hotels.place',
    params: { placeId: placeSearch.value?.placeId },
    query: { name: nameSearch.value },
  })

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

  await fetchHotels()
  destinationLabel.value = setDestinationBreadcrumb()
})
</script>

<style scoped>
.empty-feedback {
  font-size: 18px;
}
</style>
