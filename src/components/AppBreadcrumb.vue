<template>
  <q-breadcrumbs class="text-brown">
    <template v-slot:separator>
      <q-icon size="1.5em" name="chevron_right" color="primary" />
    </template>

    <q-breadcrumbs-el
      v-for="route in breadcrumbItems"
      :key="route"
      :label="$t(`routes.${route}`)"
    />
  </q-breadcrumbs>
</template>

<script lang="ts" setup>
defineProps<{
  breadcrumbItems: string[]
}>()
</script>
