import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import AppSpinner from '@/components/shared/AppSpinner.vue'

describe('AppSpinner', () => {
  it('should render correctly', () => {
    const wrapper = mount(AppSpinner)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
