import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { QBtn } from 'quasar'
import { createRouter, createWebHistory } from 'vue-router'

import { useHotelsStore } from '@/stores/hotels'
import HotelsView from '@/pages/HotelsView.vue'
import PlaceSelect from '@/components/inputs/PlaceSelect.vue'

import type { Hotel as HotelInterface } from '@/types'
import { Hotel } from '@/models/Hotel'

const mockHotelData: HotelInterface = {
  id: 1,
  favorite: false,
  name: 'Hotel Teste',
  description: 'Descrição do hotel',
  stars: '4.5',
  thumb: 'thumb.jpg',
  amenities: [{ key: 'ROOM_SERVICE', label: 'Wi-Fi' }],
  hasBreakFast: true,
  hasRefundableRoom: true,
  hasAgreement: false,
  nonRefundable: null,
  address: {
    fullAddress: 'Rua Exemplo, 123',
    city: 'São Paulo',
    district: 'Centro',
    street: 'Rua Exemplo',
    state: 'SP',
    zipCode: '12345-678',
  },
  images: ['image1.jpg', 'image2.jpg'],
  deals: null,
  roomsQuantity: 10,
  price: 1000,
}

const mockHotel = new Hotel(mockHotelData)

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('HotelsView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const hotelsSore = useHotelsStore()
    hotelsSore.hotels = [mockHotel]

    vi.spyOn(router, 'push').mockImplementation(() => Promise.resolve())
  })

  const mountWrapper = () => {
    return mount(HotelsView, {
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

  it('should update place and search on button click', async () => {
    const wrapper = mountWrapper()
    const selectComponent = wrapper.findComponent(PlaceSelect)
    const select = selectComponent.find('input')
    const button = wrapper.findComponent(QBtn)

    await select.setValue('São Paulo')
    await select.trigger('input')
    await button.trigger('click')

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(router.push).toHaveBeenCalledWith({
      name: 'hotels.place',
      params: { placeId: undefined },
      query: {},
    })
  })
})
