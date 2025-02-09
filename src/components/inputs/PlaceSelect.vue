<template>
  <q-select
    v-model="placeSearch"
    use-input
    hide-selected
    fill-input
    outlined
    :dense="dense"
    hide-dropdown-icon
    input-debounce="0"
    :placeholder="$t('hotel.search.inputs.destination.placeholder')"
    :options="filteredPlaces"
    option-label="formattedLabel"
    option-value="placeId"
    class="place-select"
    selected-item-label="selectedLabel"
    @filter="filterPlaces"
    @update:model-value="setPlace(placeSearch?.placeId)"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          {{ $t('hotel.search.inputs.destination.empty') }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import type { Places } from '@/types'

import { usePlacesStore } from '@/stores/places'

const placeStore = usePlacesStore()

const route = useRoute()

const emit = defineEmits<{
  'update:modelValue': [value: Places | null]
}>()

defineProps({
  dense: {
    type: Boolean,
    default: true,
  },
})

const placeSearch = ref<Places | null>(null)
const filteredPlaces = ref<Places[]>([])

const filterPlaces = (val: string, update: (fn: () => void) => void) => {
  const formattedPlaces = placeStore.places.map((place) => ({
    formattedLabel: `${place.name}, ${place.state.name}`,
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

const setPlace = (placeId: string | number | undefined) => {
  const formattedPlaces = placeStore.places.map((place) => ({
    formattedLabel: `${place.name}, ${place.state.name}`,
    ...place,
  }))

  if (placeId) {
    const place = formattedPlaces.find((place) => +place.placeId === +placeId)

    if (place) {
      place.formattedLabel = `${place.name}, ${place.state.shortname}`
    }

    emit('update:modelValue', place || null)
  }
}

onMounted(async () => {
  await placeStore.fetchPlaces()

  if (route.params.placeId) {
    setPlace(route.params.placeId as string)
  }
})

defineExpose({
  setPlace,
})
</script>

<style lang="scss" scoped>
.place-select {
  :deep(input) {
    width: inherit;
  }
}
</style>
