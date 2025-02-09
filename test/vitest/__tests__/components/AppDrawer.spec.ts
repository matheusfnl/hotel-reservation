import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, defineComponent } from 'vue'
import mitt from 'mitt'

import AppDrawer from '@/components/AppDrawer.vue'

const emitter = mitt()

const MockComponent = defineComponent({
  template: '<div class="mock-component">Mock Component</div>',
})

const mountWrapper = () => {
  return mount(AppDrawer, {
    global: {
      provide: {
        emitter,
      },
    },
  })
}

vi.useFakeTimers()

describe('AppDrawer', () => {
  it('should render drawer with default state', () => {
    const wrapper = mountWrapper()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.mock-component').exists()).toBe(false)
  })

  it('should opens drawer on drawer-open event', async () => {
    const wrapper = mountWrapper()

    emitter.emit('drawer-open', { component: MockComponent, props: {} })
    await nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.mock-component').exists()).toBe(true)
  })

  it('should closes drawer on drawer-close event', async () => {
    const wrapper = mountWrapper()

    emitter.emit('drawer-open', { component: MockComponent, props: {} })
    await nextTick()

    emitter.emit('drawer-close')
    await nextTick()

    vi.advanceTimersByTime(300)
    await nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.mock-component').exists()).toBe(false)
  })
})
