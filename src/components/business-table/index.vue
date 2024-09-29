<template>
  <div>
    <div class="table-header">
      <slot name="header" />
    </div>

    <el-table :data="dataSource">
      <slot />
    </el-table>

    <div mt-4>
      <el-pagination
        :total="totalCount"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        hide-on-single-page
        layout="prev, pager, next, jumper, sizes, ->, total"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BusinessTableProps } from "./type"

defineProps<BusinessTableProps<any>>()

const currentPage = defineModel<number>("currentPage", { default: 1 })
const pageSize = defineModel<number>("pageSize", { default: 10 })
</script>

<style lang="scss" scoped>
.table-header {
  margin-bottom: 12px;
}
</style>
