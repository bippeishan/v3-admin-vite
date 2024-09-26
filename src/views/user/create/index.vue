<template>
  <div class="app-container">
    <el-card shadow="never"> 创建页 </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router"

const route = useRoute()

console.log("route:", route)
</script>
