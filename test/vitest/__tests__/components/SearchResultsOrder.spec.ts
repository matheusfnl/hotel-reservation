import { describe, it, expect } from 'vitest'
import { QMenu, QItem } from 'quasar'
import { mount } from '@vue/test-utils'

import SearchResultsOrder from '@/components/SearchResultsOrder.vue'

import { Sort } from '@/enums/hotel-sort'

const mountWrapper = (props: { modelValue: string }) => {
  return mount(SearchResultsOrder, {
    props,
  })
}

describe('SearchResultsOrder', () => {
  it('should render correctly with initial value', () => {
    const wrapper = mountWrapper({ modelValue: Sort.RECOMMENDED })
    const menu = wrapper.findComponent(QMenu)
    const items = menu.findAllComponents(QItem)

    expect(wrapper.html()).toMatchSnapshot()
    expect(items.length).toBe(0)
  })

  it('should show menu options when clicked', async () => {
    const wrapper = mountWrapper({ modelValue: Sort.RECOMMENDED })
    const trigger = wrapper.find('.cursor-pointer')

    await trigger.trigger('click')
    const menu = wrapper.findComponent(QMenu)
    const items = menu.findAllComponents(QItem)

    expect(items[0]!.text()).toContain(wrapper.vm.$t(`hotel.filters.options.${Sort.RECOMMENDED}`))
    expect(items[1]!.text()).toContain(wrapper.vm.$t(`hotel.filters.options.${Sort.BEST_RATED}`))
  })

  it('should emit update event when selecting an option', async () => {
    const wrapper = mountWrapper({ modelValue: Sort.RECOMMENDED })
    const trigger = wrapper.find('.cursor-pointer')

    await trigger.trigger('click')
    const menu = wrapper.findComponent(QMenu)
    const items = menu.findAllComponents(QItem)

    await items[1]!.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([Sort.BEST_RATED])
  })
})
