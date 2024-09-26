<template>
  <el-upload
    class="upload-demo"
    action=""
    :auto-upload="false"
    :show-file-list="false"
    accept="image/*"
    :on-change="handleImageChange"
  >
    <template #trigger>
      <div class="tools_item tools_item_single" :class="{ tools_item_active: editor.isActive('image') }">
        <div class="tools_item_label">
          <el-icon><Picture /></el-icon>
        </div>
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
const { editor } = defineProps<{ editor: any }>()

const handleImageChange = (file: any) => {
  const fileReader = new FileReader()

  fileReader.readAsDataURL(file.raw)
  fileReader.onload = () => {
    editor.chain().focus().setImage({ src: fileReader.result }).run()
  }
}
</script>
