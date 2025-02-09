import type { Places, PlaceState } from '@/types'

export class Place {
  readonly name: string
  readonly state: PlaceState
  readonly placeId: number

  constructor(data: Places) {
    this.name = data.name
    this.state = data.state
    this.placeId = data.placeId
  }
}
