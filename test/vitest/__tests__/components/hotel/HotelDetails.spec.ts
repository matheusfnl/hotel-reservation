import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { QRating } from 'quasar'
import { mount } from '@vue/test-utils'

import HotelDetails from '@/components/hotel/HotelDetails.vue'

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

const mockDrawer = {
  open: vi.fn(),
}

const mountWrapper = () => {
  return mount(HotelDetails, {
    props: {
      hotel: mockHotel,
    },
    global: {
      provide: {
        drawer: mockDrawer,
      },
    },
  })
}

describe('HotelCard', () => {
  it('should render correctly', () => {
    const wrapper = mountWrapper()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should show rating correctly', async () => {
    const wrapper = mountWrapper()
    const rating = wrapper.findComponent(QRating)

    await nextTick()

    expect(rating.props().modelValue).toBe(4.5)
  })
})
