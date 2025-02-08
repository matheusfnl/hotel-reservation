<template>
  <div
    class="row items-center q-mx-auto q-pa-sm"
    :style="{ justifyContent: $q.screen.lt.sm ? 'center' : 'start' }"
    style="max-width: 1600px"
  >
    <img :src="Logo" alt="Onfly Logo" :style="{ width: $q.screen.lt.sm ? '150px' : '200px' }" />
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/assets/main-logo.svg'
</script>
