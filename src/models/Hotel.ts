import { createI18n } from 'vue-i18n'
import messages from '@/i18n'

import type { Amenities, Hotel as HotelInterface } from '@/types'
import { formatValue } from '@/helpers/number-to-value'

const i18n = createI18n({
  locale: 'pt-BR',
  legacy: false,
  messages,
})

export class Hotel {
  private id: number
  private favorite: boolean
  private name: string
  private description: string
  private stars: string
  private thumb: string
  private amenities: Amenities[] | null
  private hasBreakFast: boolean
  private hasRefundableRoom: boolean
  private hasAgreement: boolean
  private nonRefundable: boolean | null
  private address: {
    fullAddress: string
    city: string
    district: string
    street: string
    state: string
    zipCode: string | null
  }
  private images: string[]
  private deals: unknown
  private roomsQuantity: number
  private price: number

  constructor(data: HotelInterface) {
    this.id = data.id
    this.favorite = data.favorite
    this.name = data.name
    this.description = data.description
    this.stars = data.stars
    this.thumb = data.thumb
    this.amenities = data.amenities
    this.hasBreakFast = data.hasBreakFast
    this.hasRefundableRoom = data.hasRefundableRoom
    this.hasAgreement = data.hasAgreement
    this.nonRefundable = data.nonRefundable
    this.address = data.address
    this.images = data.images
    this.deals = data.deals
    this.roomsQuantity = data.roomsQuantity
    this.price = data.price
  }

  public get getId(): number {
    return this.id
  }

  public get getName(): string {
    return this.name
  }

  public get getDescription(): string {
    return this.description
  }

  public get getImages(): string[] {
    return this.images
  }

  public get getHotelLocation(): string {
    const { city, district, street } = this.address

    return `${city}, ${district}, ${street}.`
  }

  public get getFullHotelLocation(): string {
    const { fullAddress, city, state, zipCode } = this.address

    return `${fullAddress}, ${city} - ${state}${zipCode ? `, ${zipCode}` : ''}`
  }

  public get getRating(): string {
    return this.stars
  }

  public get getAmenities(): Amenities[] {
    let amenities = this.amenities ? [...this.amenities] : []
    amenities = amenities.filter((amenity) => !Array.isArray(amenity))

    if (this.hasBreakFast && !amenities.find((amenity) => amenity.key === 'BREAKFAST')) {
      amenities.push({
        key: 'BREAKFAST',
        label: 'Café da manhã',
      })
    }

    return amenities || []
  }

  public get isRefundable(): boolean {
    return this.hasRefundableRoom && !this.nonRefundable
  }

  public get getFullPrice(): string {
    return formatValue(this.price)
  }

  public get getPerNightText(): string {
    const value = this.price / 3

    return `${i18n.global.t('hotel.hotel.currency')}${formatValue(value)}${i18n.global.t('hotel.hotel.per_night')}`
  }
}
