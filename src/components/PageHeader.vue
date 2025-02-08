<template>
  <q-card class="bg-white rounded-borders-md">
    <q-card-section class="q-px-md q-py-sm">
      <h2 class="text-h5 text-weight-medium q-ma-none">{{ $t('home.title') }}</h2>
    </q-card-section>

    <q-separator />

    <q-card-section class="column q-gutter-md">
      <div v-if="$slots.inputs">
        <slot name="inputs" />
      </div>

      <div class="row justify-end">
        <q-btn
          :loading="search_request_pending"
          rounded
          no-caps
          color="primary"
          size="md"
          class="text-bold"
          style="width: 180px"
          @click="searchData"
        >
          {{ $t('home.search.button') }}

          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            {{ $t('home.search.request_pending') }}
          </template>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const search_request_pending = ref(false)
const searchData = () => {
  search_request_pending.value = true
  setTimeout(() => {
    search_request_pending.value = false
  }, 2000)
}

defineExpose({ searchData })
</script>

<style scoped>
.q-btn::before {
  box-shadow: none !important;
}
</style>
