import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { QBreadcrumbsEl } from 'quasar'

import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import type { BreadcrumbItem } from '@/types'

const mountWrapper = (props: { breadcrumbItems: Array<string | BreadcrumbItem> }) => {
  return mount(AppBreadcrumb, {
    props,
  })
}

describe('AppBreadcrumb', () => {
  it('should render breadcrumb with simple routes', () => {
    const breadcrumbItems = ['home', 'hotels']
    const wrapper = mountWrapper({ breadcrumbItems })
    const items = wrapper.findAllComponents(QBreadcrumbsEl)

    expect(wrapper.html()).toMatchSnapshot()
    expect(items.length).toBe(2)
    expect(items[0]!.props('label')).toBe(wrapper.vm.$t('routes.home'))
    expect(items[1]!.props('label')).toBe(wrapper.vm.$t('routes.hotels'))
  })

  it('should render breadcrumb with complex routes', () => {
    const breadcrumbItems = [
      'home',
      { label: 'destination.name', options: { name: 'Hotel', local: 'BH' } },
    ]
    const wrapper = mountWrapper({ breadcrumbItems })
    const items = wrapper.findAllComponents(QBreadcrumbsEl)

    expect(wrapper.html()).toMatchSnapshot()
    expect(items.length).toBe(2)
    expect(items[1]!.props('label')).toBe('"Hotel" em BH')
    expect(items[1]!.props('to')).toEqual({ name: 'destination.name' })
  })
})
