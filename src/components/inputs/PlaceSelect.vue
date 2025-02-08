<template>
  <q-select
    v-model="placeSearch"
    use-input
    hide-selected
    fill-input
    outlined
    :dense="dense"
    clearable
    hide-dropdown-icon
    input-debounce="0"
    :placeholder="$t('hotel.search.inputs.destination.placeholder')"
    :options="filteredPlaces"
    option-label="formattedLabel"
    @filter="filterPlaces"
    @update:model-value="$emit('update:modelValue', $event)"
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

import { usePlacesStore } from '@/stores/places'

interface Place {
  name: string
  state: {
    name: string
    shortname: string
  }
  placeId: number
  formattedLabel: string
}

const placeStore = usePlacesStore()

defineEmits<{
  'update:modelValue': [value: Place | null]
}>()

defineProps({
  dense: {
    type: Boolean,
    default: true,
  },
})

const placeSearch = ref('')
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

onMounted(async () => {
  await placeStore.fetchPlaces()
})
</script>
