import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import AppHeader from '@/components/AppHeader.vue'

const mountWrapper = () => {
  return mount(AppHeader)
}

describe('AppHeader', () => {
  it('should render header', () => {
    const wrapper = mountWrapper()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
