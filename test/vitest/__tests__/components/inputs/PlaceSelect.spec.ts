import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { QSelect } from 'quasar'
import { setActivePinia, createPinia } from 'pinia'

import PlaceSelect from '@/components/inputs/PlaceSelect.vue'

import { usePlacesStore } from '@/stores/places'

const mockPlaces = [
  { name: 'São Paulo', state: { name: 'São Paulo', shortname: 'SP' }, placeId: 1 },
  { name: 'Rio de Janeiro', state: { name: 'Rio de Janeiro', shortname: 'RJ' }, placeId: 2 },
]

describe('PlaceSelect', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const placesStore = usePlacesStore()
    placesStore.places = mockPlaces
  })

  const mountWrapper = () => {
    return mount(PlaceSelect)
  }

  it('should emit update:modelValue with selected place', async () => {
    const wrapper = mountWrapper()
    const select = wrapper.findComponent(QSelect)

    await select.vm.$emit('update:model-value', mockPlaces[0])
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([
      {
        ...mockPlaces[0],
        formattedLabel: 'São Paulo, SP',
      },
    ])
  })
})
