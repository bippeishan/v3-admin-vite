<template>
  <div class="app-container">
    <el-card shadow="never">
      <div class="table-header">
        <el-button type="primary" @click="handleCreate()">创建</el-button>
      </div>

      <el-table :data="demandInfos">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="type" label="需求类型">
          <template #default="scope">
            <el-tag type="primary" v-if="scope.row.type === 'newFeature'">新特性</el-tag>
            <el-tag type="success" v-if="scope.row.type === 'optimize'">优化</el-tag>
            <el-tag type="danger" v-if="scope.row.type === 'bug'">BUG</el-tag>
            <el-tag type="warning" v-if="scope.row.type === 'reBuild'">重构</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="priority" label="优先级">
          <template #default="scope">
            <el-tag type="danger" v-if="scope.row.priority === 'p0'">p0</el-tag>
            <el-tag type="warning" v-if="scope.row.priority === 'p1'">p1</el-tag>
            <el-tag type="primary" v-if="scope.row.priority === 'p2'">p2</el-tag>
            <el-tag type="success" v-if="scope.row.priority === 'p3'">p3</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="complexity" label="复杂程度">
          <template #default="scope">
            <el-tag type="danger" v-if="scope.row.complexity === 'p0'">p0</el-tag>
            <el-tag type="warning" v-if="scope.row.complexity === 'p1'">p1</el-tag>
            <el-tag type="primary" v-if="scope.row.complexity === 'p2'">p2</el-tag>
            <el-tag type="success" v-if="scope.row.complexity === 'p3'">p3</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="来源">
          <template #default="scope">
            <span v-if="scope.row.source === 'customer'">客户</span>
            <span v-if="scope.row.source === 'inner'">内部</span>
          </template>
        </el-table-column>
        <el-table-column prop="relateDepartment" label="涉及部门" />
        <el-table-column prop="createUser" label="创建者" />
        <el-table-column prop="expectePublish" label="期望上线时间" width="140" />
        <el-table-column fixed="right" label="操作" width="250">
          <template #default="scope">
            <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" text bg size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"

import { DemandInfo, demandInfos } from "./type"

const router = useRouter()

const handleCreate = () => {
  router.push("create")
}

const handleUpdate = (_row: DemandInfo) => {}
</script>

<style lang="scss" scoped>
.table-header {
  margin-bottom: 12px;
}
</style>
