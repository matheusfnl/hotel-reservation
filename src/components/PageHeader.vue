<template>
  <q-card class="bg-white rounded-borders-md">
    <q-card-section class="q-px-md q-py-sm">
      <h2 class="text-h5 q-ma-none">{{ $t('hotel.title') }}</h2>
    </q-card-section>

    <q-separator />

    <q-card-section class="column q-gutter-md">
      <div v-if="$slots.inputs">
        <slot name="inputs" />
      </div>

      <div class="row justify-end">
        <q-btn
          :loading="requestPending"
          rounded
          no-caps
          color="primary"
          size="md"
          class="col-12 col-sm-auto"
          style="min-width: 180px"
          @click="emit('search')"
        >
          {{ searchLabel }}

          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            {{ $t('hotel.search.request_pending') }}
          </template>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
defineProps<{
  requestPending: boolean
  searchLabel: string
}>()

const emit = defineEmits<{ search: unknown }>()
</script>
