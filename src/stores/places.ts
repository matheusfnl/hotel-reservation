import { defineStore } from 'pinia'

import { Place } from '@/models/Place'
import type { Places } from '@/types'

import placesMock from '@/mock/place.json'

const places = placesMock as Places[]

export const usePlacesStore = defineStore('places', {
  state: () => ({ places: [] as Place[] }),
  actions: {
    async fetchPlaces() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        this.places = places.map((place) => new Place(place))
      } catch (error: unknown) {
        return error
      }
    },
  },
})
