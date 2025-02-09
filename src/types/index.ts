import type { Amenities as AmenitiesKey } from '@/enums/amenities'

export interface Hotel {
  id: number
  favorite: boolean
  name: string
  description: string
  stars: string
  thumb: string
  amenities: Amenities[] | null
  hasBreakFast: boolean
  hasRefundableRoom: boolean
  hasAgreement: boolean
  nonRefundable: boolean | null
  address: {
    fullAddress: string
    city: string
    district: string
    street: string
  }
  images: string[]
  deals: unknown
  roomsQuantity: number
  price: number
}

export interface Amenities {
  key: keyof typeof AmenitiesKey
  label: string
}

export interface HotelsByPlace {
  placeId: number
  hotels: Hotel[]
}

export interface Places {
  name: string
  state: PlaceState
  placeId: number
}

export interface FormattedPlaces {
  name: string
  state: PlaceState
  placeId: number
}

export interface PlaceState {
  name: string
  shortname: string
}

export interface BreadcrumbItem {
  label: string
  options: { [key: string]: string }
}
