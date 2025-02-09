<template>
  <Transition name="fade">
    <div class="background" v-if="drawer" @click="drawer = false" />
  </Transition>

  <q-drawer
    v-model="drawer"
    :width="900"
    behavior="desktop"
    side="right"
    overlay
    bordered
    class="drawer-custom"
    @hide="() => setOverflow('auto')"
  >
    <component :is="component" v-bind="props" />
  </q-drawer>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue'
import type { Emitter } from 'mitt'

import type { DrawerEventType } from '@/types'

const emitter = inject<Emitter<DrawerEventType>>('emitter')
const drawer = ref(false)
const component = ref<object | null>({})
const props = ref<object | null>({})

emitter?.on('drawer-open', ({ component: drawerComponent, props: drawerProps }) => {
  drawer.value = true
  component.value = drawerComponent
  props.value = drawerProps
  setOverflow('hidden')
})

emitter?.on('drawer-close', () => {
  drawer.value = false
  component.value = {}
  props.value = {}
  setOverflow('auto')
})

const setOverflow = (value: string) => {
  document.body.style.overflow = value
}
</script>

<style scoped>
.background {
  width: 100vw;
  height: 100vh;
  background: black;
  position: fixed;
  z-index: 10;
  opacity: 0.3;
  top: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
