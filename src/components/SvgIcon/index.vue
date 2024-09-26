<script lang="ts" setup>
import { computed } from "vue"

interface Props {
  prefix?: string
  name: string
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  prefix: "icon",
  width: "1em",
  height: "1em"
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg class="svg-icon" aria-hidden="true" :width="props.width" :height="props.height">
    <use :href="symbolId" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  fill: currentColor;
  overflow: hidden;
}
</style>
