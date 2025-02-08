<template>
  <div class="overflow-hidden">
    <div class="circle-1" />
    <div class="circle-2" />
    <div class="circle-3" />

    <div class="absolute-center full-width q-pa-md flex justify-center">
      <form style="width: fit-content">
        <q-card class="bg-white rounded-borders-xl">
          <q-card-section class="q-pa-xl text-center">
            <h2 class="text-h3 text-primary text-weight-medium q-ma-none q-mb-lg">
              {{ $t('home.cta.title') }}
            </h2>

            <p class="text-h6 q-mx-xl text-center q-ma-none q-mb-lg">
              {{ $t('home.cta.description') }}
              <span class="text-primary">{{ $t('home.cta.stay') }}</span
              >,
              {{ $t('home.cta.with') }}
              <span class="text-primary">{{ $t('home.cta.comfort') }}</span>
              {{ $t('home.cta.and') }}
              <span class="text-primary">{{ $t('home.cta.practicality') }}</span
              >.
            </p>

            <PlaceSelect v-model="placeSearch" class="q-mb-lg" :dense="false" />

            <q-btn
              rounded
              no-caps
              color="primary"
              size="lg"
              style="min-width: 160px"
              :to="{ name: 'hotels.place', params: { placeId: placeSearch?.placeId } }"
            >
              {{ $t('home.cta.search') }}
            </q-btn>
          </q-card-section>
        </q-card>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormattedPlaces } from '@/types'

import PlaceSelect from '@/components/inputs/PlaceSelect.vue'

const placeSearch = ref<FormattedPlaces | null>(null)
</script>

<style lang="scss" scoped>
.circle {
  &-1 {
    position: fixed;
    width: 120vh;
    height: 120vh;
    background: $primary;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    left: -40vh;
    top: 75vh;
    z-index: 0;
    opacity: 1;
  }

  &-2 {
    position: fixed;
    width: 300vh;
    height: 300vh;
    background: $primary;
    border-radius: 53% 47% 47% 53% / 45% 0% 0% 55%;
    right: -130vh;
    top: 45vh;
    z-index: 0;
    opacity: 0.6;
  }

  &-3 {
    position: fixed;
    width: 120vh;
    height: 120vh;
    background: $primary;
    border-radius: 42% 58% 58% 42% / 53% 43% 57% 47%;
    left: 10vh;
    top: -90vh;
    z-index: 0;
    opacity: 0.7;
  }
}

.form-container {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 1);
}
</style>
