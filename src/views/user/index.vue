<script lang="ts" setup>
import { ref, onMounted } from "vue"
import axios from "axios"

import { UserInfo } from "./type"
import UpdateUser from "./modal/update-user.vue"

const updateUserVisible = ref(false)
const editInfo = ref<UserInfo>()
const userInfos = ref<UserInfo[]>([])

const currentPage = ref(1)
const pageSize = ref(10)

onMounted(() => {
  getUsers()
})

const getUsers = () => {
  axios
    .get("/api-yunmo/users", { params: { limit: 2, offset: 0 } })
    .then((response) => {
      console.log(response.data)
      userInfos.value = response.data
    })
    .catch((error) => {
      console.error(error)
      userInfos.value = []
    })
}

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
      <div class="table-header">
        <el-button type="primary" @click="handleCreate()">创建</el-button>
      </div>

      <el-table :data="userInfos">
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
      </el-table>

      <div mt-4>
        <el-pagination
          :total="35"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          hide-on-single-page
          layout="prev, pager, next, jumper, sizes, ->, total"
        />
      </div>
    </el-card>

    <UpdateUser
      v-if="updateUserVisible"
      v-model="updateUserVisible"
      :record="editInfo"
      @onClose="updateUserVisible = false"
      @onComplate="getUsers()"
    />
  </div>
</template>

<style lang="scss" scoped>
.table-header {
  margin-bottom: 12px;
}
</style>
