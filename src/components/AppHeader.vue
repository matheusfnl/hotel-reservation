<template>
  <div
    class="row items-center q-mx-auto q-pa-xs"
    :style="{ justifyContent: $q.screen.lt.sm ? 'center' : 'start' }"
    style="max-width: 1600px"
  >
    <h1 class="h1-reset">
      <router-link :to="{ name: 'home' }" class="cursor-pointer">
        <img
          :src="Logo"
          :alt="$t('shared.logo_alt')"
          :style="{ width: $q.screen.lt.sm ? '150px' : '200px' }"
        />
      </router-link>
    </h1>
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/assets/main-logo.svg'
</script>

<style scoped>
.h1-reset {
  all: unset;
  display: block;
}
</style>
