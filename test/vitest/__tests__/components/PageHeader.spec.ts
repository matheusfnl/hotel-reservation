import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { QBtn } from 'quasar'

import PageHeader from '@/components/PageHeader.vue'

const mountWrapper = (props: {
  requestPending: boolean
  searchLabel: string
  disabled: boolean
}) => {
  return mount(PageHeader, {
    props,
  })
}

describe('PageHeader', () => {
  it('should render correctly', async () => {
    const wrapper = mountWrapper({ requestPending: false, searchLabel: 'Search', disabled: false })
    const button = wrapper.findComponent(QBtn)

    expect(wrapper.html()).toMatchSnapshot()
    expect(button.props('loading')).toBe(false)
    expect(button.attributes('disabled')).not.toBeDefined()

    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('search')
  })

  it('should disable button when disabled prop is true', () => {
    const wrapper = mountWrapper({ requestPending: false, searchLabel: 'Search', disabled: true })
    const button = wrapper.findComponent(QBtn)

    expect(button.attributes('disabled')).toBeDefined()
  })

  it('should show loading state when requestPending is true', () => {
    const wrapper = mountWrapper({ requestPending: true, searchLabel: 'Search', disabled: false })
    const button = wrapper.findComponent(QBtn)

    expect(button.props('loading')).toBe(true)
    expect(button.text()).toContain(wrapper.vm.$t('hotel.search.request_pending'))
  })

  it('should emit search event on button click', async () => {
    const wrapper = mountWrapper({ requestPending: false, searchLabel: 'Search', disabled: false })
    const button = wrapper.findComponent(QBtn)

    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('search')
  })
})
