<template>
  <div class="tools_item tools_item_single" @click="setLink" :class="{ tools_item_active: editor.isActive('link') }">
    <div class="tools_item_label">
      <el-icon><Link /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
const { editor } = defineProps<{ editor: any }>()

const setLink = () => {
  const previousUrl = editor.getAttributes("link").href
  const url = window.prompt("URL", previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run()

    return
  }

  // update link
  editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
}
</script>
