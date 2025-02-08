<template>
  <span>
    Organizar por

    <span class="text-primary text-bold text-italic cursor-pointer" @click="showMenu = true">
      {{ selectedOption }}
      <q-icon name="expand_more" class="q-mr-sm" />

      <q-menu>
        <q-list style="min-width: 200px" v-for="item in menuOptions" :key="item">
          <q-item dense clickable v-close-popup @click="selectOption(item)">
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const menuOptions = ['recommended', 'high_price', 'low_price']

const showMenu = ref(false)
const selectedOption = ref('recommended')

const selectOption = (option: string) => {
  selectedOption.value = option
}
</script>

<style scoped>
.inline-select :deep(.q-btn) {
  color: #1976d2;
}
</style>
