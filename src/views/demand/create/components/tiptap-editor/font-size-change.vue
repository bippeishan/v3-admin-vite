<template>
  <el-dropdown trigger="click">
    <div class="tools_item">
      <span class="tools_item_label">{{ editor.getAttributes("textStyle").fontSize || 12 }}</span>
      <el-icon color="#9B9C9D"><CaretBottom /></el-icon>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item class="tiptap_editor_tools_head_item" @click="editor.chain().focus().setFontSize(12).run()">
          <el-icon v-if="editor.isActive('textStyle', { fontSize: 12 })"><Check /></el-icon>
          <span>12</span>
        </el-dropdown-item>

        <el-dropdown-item class="tiptap_editor_tools_head_item" @click="editor.chain().focus().setFontSize(14).run()">
          <el-icon v-if="editor.isActive('textStyle', { fontSize: 14 })"><Check /></el-icon>
          <span>14</span>
        </el-dropdown-item>

        <el-dropdown-item class="tiptap_editor_tools_head_item" @click="editor.chain().focus().setFontSize(16).run()">
          <el-icon v-if="editor.isActive('textStyle', { fontSize: 16 })"><Check /></el-icon>
          <span>16</span>
        </el-dropdown-item>

        <el-dropdown-item class="tiptap_editor_tools_head_item" @click="editor.chain().focus().setFontSize(18).run()">
          <el-icon v-if="editor.isActive('textStyle', { fontSize: 18 })"><Check /></el-icon>
          <span>18</span>
        </el-dropdown-item>

        <el-dropdown-item class="tiptap_editor_tools_head_item" @click="editor.chain().focus().setFontSize(20).run()">
          <el-icon v-if="editor.isActive('textStyle', { fontSize: 20 })"><Check /></el-icon>
          <span>20</span>
        </el-dropdown-item>

        <el-dropdown-item class="tiptap_editor_tools_head_item" @click="editor.chain().focus().setFontSize(24).run()">
          <el-icon v-if="editor.isActive('textStyle', { fontSize: 24 })"><Check /></el-icon>
          <span>24</span>
        </el-dropdown-item>

        <el-dropdown-item class="tiptap_editor_tools_head_item" @click="editor.chain().focus().setFontSize(28).run()">
          <el-icon v-if="editor.isActive('textStyle', { fontSize: 28 })"><Check /></el-icon>
          <span>28</span>
        </el-dropdown-item>

        <el-dropdown-item class="tiptap_editor_tools_head_item" @click="editor.chain().focus().setFontSize(32).run()">
          <el-icon v-if="editor.isActive('textStyle', { fontSize: 32 })"><Check /></el-icon>
          <span>32</span>
        </el-dropdown-item>

        <el-dropdown-item class="tiptap_editor_tools_head_item" @click="editor.chain().focus().setFontSize(36).run()">
          <el-icon v-if="editor.isActive('textStyle', { fontSize: 36 })"><Check /></el-icon>
          <span>36</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// import { Editor } from "node_modules/@tiptap/vue-3/dist/packages/vue-3/src/Editor"

defineProps<{ editor: any }>()
</script>
