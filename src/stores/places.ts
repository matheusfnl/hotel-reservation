import { defineStore } from 'pinia'

import type { Places } from '@/types'

import placesMock from '@/mock/place.json'

const places = placesMock as Places[]

interface FetchPlacesParams {
  placeId: number
  page: number
}

export const usePlacesStore = defineStore('places', {
  state: () => ({ places: [] as Places[] }),
  actions: {
    async fetchPlaces({ page }: FetchPlacesParams) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const itemsIndex = (page - 1) * 10

        this.places = places.slice(itemsIndex, itemsIndex + 10)
      } catch (error: unknown) {
        return error
      }
    },
  },
})
