import { defineStore } from 'pinia'

import type { HotelsByPlace, Hotel } from '@/types'

import hotelsMock from '@/mock/hotel.json'

interface FetchHotelsParams {
  placeId?: number | string
  page?: number
  price?: string
  name?: string
}

const allPlaceHotels = [...hotelsMock] as HotelsByPlace[]

export const useHotelsStore = defineStore('hotels', {
  state: () => ({ hotels: [] as Hotel[] }),
  actions: {
    async fetchHotels({ placeId, price, page = 1, name }: FetchHotelsParams = {}) {
      try {
        const filterHotels = (): Hotel[] => {
          let placeHotels = placeId
            ? allPlaceHotels.find((hotel) => hotel.placeId === +placeId)?.hotels
            : allPlaceHotels.flatMap((place) => place.hotels)

          if (!placeHotels) {
            return []
          }

          if (name) {
            placeHotels = placeHotels.filter((hotel) =>
              hotel.name.toLowerCase().includes(name.toLowerCase()),
            )
          }

          if (price) {
            return price === 'asc'
              ? placeHotels?.sort((a, b) => +a.price - +b.price)
              : placeHotels?.sort((a, b) => +b.price - +a.price)
          }

          return placeHotels?.sort((a, b) => +b.stars - +a.stars)
        }

        await new Promise((resolve) => setTimeout(resolve, 2000))

        const placeHotels = filterHotels()
        const itemsIndex = (page - 1) * 10

        this.hotels = placeHotels ? placeHotels.slice(itemsIndex, itemsIndex + 10) : []
      } catch (error: unknown) {
        return error
      }
    },
  },
})
