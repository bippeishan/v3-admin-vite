<template>
  <el-dropdown trigger="click">
    <div class="tools_item">
      <span class="tools_item_label">{{ titleValue }}</span>
      <el-icon color="#9B9C9D"><CaretBottom /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item class="tiptap_editor_tools_head_item" @click="editor.chain().focus().setParagraph().run()">
          <el-icon v-if="editor.isActive('paragraph')"><Check /></el-icon>
          <span>正文</span>
        </el-dropdown-item>
        <el-dropdown-item
          class="tiptap_editor_tools_head_item"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <el-icon v-if="editor.isActive('heading', { level: 1 })"><Check /></el-icon>
          <h1>标题1</h1>
        </el-dropdown-item>
        <el-dropdown-item
          class="tiptap_editor_tools_head_item"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <el-icon v-if="editor.isActive('heading', { level: 2 })"><Check /></el-icon>
          <h2>标题2</h2>
        </el-dropdown-item>
        <el-dropdown-item
          class="tiptap_editor_tools_head_item"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <el-icon v-if="editor.isActive('heading', { level: 3 })"><Check /></el-icon>
          <h3>标题3</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from "vue"

const { editor } = defineProps<{ editor: any }>()

const titleValue = computed(() => {
  const headerLevel = editor.getAttributes("heading").level
  switch (headerLevel) {
    case 1:
      return "标题1"
    case 2:
      return "标题2"
    case 3:
      return "标题3"
  }
  return "正文"
})
</script>

<style lang="scss"></style>
