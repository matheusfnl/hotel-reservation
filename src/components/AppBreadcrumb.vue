<template>
  <q-breadcrumbs class="text-brown">
    <template v-slot:separator>
      <q-icon size="1.5em" name="chevron_right" color="primary" />
    </template>

    <q-breadcrumbs-el
      v-for="route in breadcrumbItems"
      :key="getLabel(route)"
      :label="$t(`routes.${getLabel(route)}`, getOptions(route))"
      :to="{ name: getLabel(route) }"
    />
  </q-breadcrumbs>
</template>

<script lang="ts" setup>
interface BreadcrumbItem {
  label: string
  options: { [key: string]: string }
}

defineProps<{
  breadcrumbItems: Array<string | BreadcrumbItem>
}>()

const getLabel = (route: string | BreadcrumbItem): string => {
  return typeof route === 'string' ? route : route.label
}

const getOptions = (route: string | BreadcrumbItem): { [key: string]: string } => {
  return typeof route === 'string' ? {} : route.options
}
</script>
