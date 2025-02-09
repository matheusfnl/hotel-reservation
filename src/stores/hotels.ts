import { defineStore } from 'pinia'

import { Hotel } from '@/models/Hotel'
import type { HotelsByPlace, Hotel as HotelInterface } from '@/types'

import hotelsMock from '@/mock/hotel.json'

interface FetchHotelsParams {
  placeId?: number | string
  page?: number
  name?: string
  sort?: string
}

const allPlaceHotels = [...hotelsMock] as HotelsByPlace[]

export const useHotelsStore = defineStore('hotels', {
  state: () => ({ hotels: [] as Hotel[] }),
  actions: {
    async fetchHotels({ placeId, page = 1, name, sort }: FetchHotelsParams = {}) {
      try {
        const filterHotels = (): HotelInterface[] => {
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

          if (sort === 'best_rated') {
            return placeHotels?.sort((a, b) => +b.stars - +a.stars)
          }

          return placeHotels?.sort((a, b) => +b.price - +a.price)
        }

        await new Promise((resolve) => setTimeout(resolve, 2000))

        const placeHotels = filterHotels()
        const itemsIndex = (page - 1) * 10
        const newHotels = placeHotels
          ? placeHotels.slice(itemsIndex, itemsIndex + 10).map((hotel) => new Hotel(hotel))
          : []

        if (page === 1) {
          this.hotels = newHotels
          return
        }

        this.hotels = [...this.hotels, ...newHotels]
      } catch (error: unknown) {
        return error
      }
    },
  },
})
