import { defineStore } from 'pinia'

import type { HotelsByPlace, Hotel } from '@/types'

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

          if (['high_price', 'low_price'].includes(sort as string)) {
            return sort === 'low_price'
              ? placeHotels?.sort((a, b) => +a.price - +b.price)
              : placeHotels?.sort((a, b) => +b.price - +a.price)
          }

          if (sort === 'best_rated') {
            return placeHotels?.sort((a, b) => +b.stars - +a.stars)
          }

          return placeHotels?.sort((a, b) =>
            a.favorite !== b.favorite ? +b.favorite - +a.favorite : +b.stars - +a.stars,
          )
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
