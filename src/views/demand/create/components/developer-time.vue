<template>
  <div>
    <el-row v-for="developer in developers" :key="developer.id" class="developer_row">
      <el-col :span="4">{{ developer.name }}</el-col>
      <el-col :span="20"
        ><el-date-picker
          v-model="timeValues[developer.id]"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
      /></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { UserInfo } from "@/views/user/type"

interface DevelopTimeProps {
  developers: UserInfo[]
}

defineProps<DevelopTimeProps>()

const timeValues = defineModel<Record<string, any[]>>({ required: true })
</script>

<style lang="scss" scoped>
.developer_row {
  margin-bottom: 8px;
}
</style>
