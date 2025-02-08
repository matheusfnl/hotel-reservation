<template>
  <span class="pulse-animation full-width flex justify-center">
    <q-icon :color="color" :size="size" name="hotel" />
  </span>
</template>

<script lang="ts" setup>
defineProps<{
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color: string
}>()
</script>

<style lang="scss" scoped>
.pulse-animation {
  animation: pulse 1s ease-in-out infinite;
  transform-origin: center center;
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
    transform: scale(1.05) rotate(0deg);
  }
  25% {
    opacity: 0.3;
    transform: scale(1.05) rotate(5deg);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
    transform: scale(1.05) rotate(0deg);
  }
  75% {
    opacity: 0.9;
    transform: scale(1.05);
    transform: scale(1.05) rotate(-5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    transform: scale(1.05) rotate(0deg);
  }
}
</style>
