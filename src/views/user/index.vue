<script lang="ts" setup>
import { ref, watch } from "vue"
import axios from "axios"

import { UserInfo } from "./type"
import UpdateUser from "./modal/update-user.vue"
import BusinessTable from "@/components/business-table/index.vue"

const updateUserVisible = ref(false)
const editInfo = ref<UserInfo>()
const userInfos = ref<UserInfo[]>([])
const totalCount = ref(0)

const currentPage = ref(1)
const pageSize = ref(10)

const getUsers = ({ page, size }: { page?: number; size?: number }) => {
  const _page = page === undefined ? currentPage.value : page
  const _size = size === undefined ? pageSize.value : size

  axios
    .get("/api-yunmo/users", { params: { limit: _size, offset: (_page - 1) * _size } })
    .then((response) => {
      console.log(response.data)
      userInfos.value = response.data?.infos || []
      totalCount.value = response.data?.totalCount || 0
    })
    .catch((error) => {
      console.error(error)
      userInfos.value = []
    })
}

watch(
  [currentPage, pageSize],
  ([newPage, newSize]) => {
    getUsers({ page: newPage, size: newSize })
  },
  { immediate: true }
)

const handleCreate = () => {
  updateUserVisible.value = !updateUserVisible.value
  editInfo.value = undefined
}

const handleUpdate = (row: UserInfo) => {
  updateUserVisible.value = !updateUserVisible.value
  editInfo.value = row
}

const handleDelete = (_row: UserInfo) => {}
</script>

<template>
  <div class="app-container">
    <el-card shadow="never">
      <BusinessTable
        :dataSource="userInfos"
        :totalCount="totalCount"
        v-model:currentPage="currentPage"
        v-model:pageSize="pageSize"
      >
        <template #header>
          <el-button type="primary" @click="handleCreate()">创建</el-button>
        </template>

        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色" />
        <el-table-column prop="department" label="部门" />
        <el-table-column prop="responsibility" label="职能" />
        <el-table-column fixed="right" label="操作" width="250">
          <template #default="scope">
            <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改密码</el-button>
            <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </BusinessTable>
    </el-card>

    <UpdateUser
      v-if="updateUserVisible"
      v-model="updateUserVisible"
      :record="editInfo"
      @onClose="updateUserVisible = false"
      @onComplate="getUsers({})"
    />
  </div>
</template>

<style lang="scss" scoped></style>
