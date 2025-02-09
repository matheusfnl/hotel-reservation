import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { QBtn, QSelect } from 'quasar'
import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { usePlacesStore } from '@/stores/places'

import HomeView from '@/pages/HomeView.vue'
import PlaceSelect from '@/components/inputs/PlaceSelect.vue'

const mockPlaces = [
  { name: 'São Paulo', state: { name: 'São Paulo', shortname: 'SP' }, placeId: 1 },
  { name: 'Rio de Janeiro', state: { name: 'Rio de Janeiro', shortname: 'RJ' }, placeId: 2 },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('HomeView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const placesStore = usePlacesStore()
    placesStore.places = mockPlaces

    vi.spyOn(router, 'push').mockImplementation(() => Promise.resolve())
  })

  const mountWrapper = () => {
    return mount(HomeView, {
      global: {
        plugins: [router],
      },
    })
  }

  it('should render correctly', () => {
    const wrapper = mountWrapper()
    const html = wrapper
      .html()
      .replace(/id="f_[^"]+"/g, 'id="static-id"')
      .replace(/for="f_[^"]+"/g, 'for="static-for"')
      .replace(/aria-controls="f_[^"]+"/g, 'aria-controls="static-aria-controls"')

    expect(html).toMatchSnapshot()
  })

  it('should emit update:modelValue with selected place', async () => {
    const wrapper = mountWrapper()
    const selectComponent = wrapper.findComponent(PlaceSelect)
    const select = selectComponent.findComponent(QSelect)

    await select.vm.$emit('update:model-value', mockPlaces[0])
    await nextTick()

    expect(selectComponent.emitted('update:modelValue')).toBeTruthy()
    expect(selectComponent.emitted('update:modelValue')![0]).toEqual([
      {
        ...mockPlaces[0],
        formattedLabel: 'São Paulo, SP',
      },
    ])
  })

  it('should navigate to hotels on button click', async () => {
    const wrapper = mountWrapper()
    const selectComponent = wrapper.findComponent(PlaceSelect)
    const select = selectComponent.findComponent(QSelect)
    const button = wrapper.findComponent(QBtn)

    await select.vm.$emit('update:model-value', mockPlaces[0])
    await nextTick()

    await button.trigger('click')

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(router.push).toHaveBeenCalledWith({
      name: 'hotels.place',
      params: { placeId: mockPlaces[0]!.placeId },
    })
  })
})
