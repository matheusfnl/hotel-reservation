<template>
  <q-layout>
    <q-header class="bg-white">
      <Header />
    </q-header>

    <Drawer />

    <q-page-container>
      <div class="page-container">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import Header from '@/components/AppHeader.vue'
import Drawer from '@/components/AppDrawer.vue'
</script>

<style lang="scss" scoped>
.page-container {
  max-width: 1440px;
  width: 100%;
  margin: auto;
  padding: 2rem;
}
</style>
