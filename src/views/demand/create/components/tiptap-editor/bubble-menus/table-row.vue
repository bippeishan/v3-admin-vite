<template>
  <bubble-menu
    pluginKey="tableRowMenu"
    :editor="editor"
    :tippyOptions="{
      placement: 'left',
      offset: [0, 15],
      popperOptions: { modifiers: [{ name: 'flip', enabled: false }] }
    }"
    :shouldShow="shouldShow"
  >
    <div class="bubbleMenuContainer">
      <div>add before</div>
      <div>add after</div>
      <div>delete</div>
    </div>
  </bubble-menu>
</template>

<script setup lang="ts">
import { BubbleMenu } from "@tiptap/vue-3"
// import { computed } from "vue"
import isRowGripSelected from "./utils"

const { editor } = defineProps<{ editor: any }>()

const shouldShow = ({ view, state, from }: any) => {
  if (!state || !from) {
    return false
  }

  return isRowGripSelected({ editor, view, state, from })
}
</script>
