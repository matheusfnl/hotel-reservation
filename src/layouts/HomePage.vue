<template>
  <div class="overflow-hidden">
    <div class="circle-1" />
    <div class="circle-2" />
    <div class="circle-3" />

    <div class="absolute-center full-width q-pa-md flex justify-center">
      <Form v-slot="{ meta }" style="width: fit-content">
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

            <Field
              v-slot="{ field, errorMessage, meta }"
              name="place"
              :value="placeSearch"
              rules="placeSelected"
            >
              <div>
                <PlaceSelect
                  :model-value="placeSearch"
                  @update:model-value="(val) => handlePlaceUpdate(val, field)"
                  @blur="field.onBlur"
                />

                <span v-if="errorMessage && meta.touched" class="text-negative text-caption">
                  {{
                    $t('validation.required', {
                      field: $t('hotel.search.inputs.destination.label').toLowerCase(),
                    })
                  }}
                </span>
              </div>
            </Field>

            <q-btn
              rounded
              no-caps
              color="primary"
              size="lg"
              class="q-mt-lg"
              :disabled="!meta.valid"
              style="min-width: 160px"
              @click.prevent="navigateToHotels"
            >
              {{ $t('home.cta.search') }}
            </q-btn>
          </q-card-section>
        </q-card>
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Places } from '@/types'
import { Form, Field, defineRule } from 'vee-validate'
import type { FieldBindingObject } from 'vee-validate'
import { useRouter } from 'vue-router'

import PlaceSelect from '@/components/inputs/PlaceSelect.vue'

const router = useRouter()

const placeSearch = ref<Places | null>(null)
const handlePlaceUpdate = (val: Places | null, field: FieldBindingObject) => {
  placeSearch.value = val
  field.onChange(val)
}

const navigateToHotels = async () => {
  if (placeSearch.value?.placeId) {
    await router.push({
      name: 'hotels.place',
      params: { placeId: placeSearch.value.placeId },
    })
  }
}

const validatePlace = (value: Places | null) => {
  return !!value?.placeId
}

defineRule('placeSelected', validatePlace)
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
