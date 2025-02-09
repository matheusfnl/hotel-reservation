<template>
  <span>
    {{ $t('hotel.filters.by') }}

    <span class="text-primary text-bold text-italic cursor-pointer">
      {{ $t(`hotel.filters.options.${modelValue}`) }}
      <q-icon name="expand_more" class="q-mr-sm" />

      <q-menu>
        <q-list style="min-width: 200px">
          <q-item
            v-for="item in menuOptions"
            :key="item"
            dense
            clickable
            v-close-popup
            @click="selectOption(item)"
            :active="modelValue === item"
          >
            <q-item-section>
              {{ $t(`hotel.filters.options.${item}`) }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </span>
  </span>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: string
}

defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const menuOptions = ['recommended', 'best_rated']

const selectOption = (option: string) => {
  emit('update:modelValue', option)
}
</script>
