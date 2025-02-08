import { defineStore } from 'pinia'

import type { Places } from '@/types'

import placesMock from '@/mock/place.json'

const places = placesMock as Places[]

export const usePlacesStore = defineStore('places', {
  state: () => ({ places: [] as Places[] }),
  actions: {
    async fetchPlaces() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        this.places = places
      } catch (error: unknown) {
        return error
      }
    },
  },
})
