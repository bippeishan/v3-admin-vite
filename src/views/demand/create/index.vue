<template>
  <div class="app-container">
    <el-card shadow="never">
      <div>创建需求</div>

      <el-row>
        <el-col :span="16" :offset="4">
          <el-form ref="ruleFormRef" label-width="120px" :rules="rules" :model="formValues" status-icon>
            <el-form-item label="名称" placeholder="请输入名称" prop="name">
              <el-input v-model="formValues.name" />
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item label="所属模块" placeholder="请选择所属模块" prop="module">
                  <el-select v-model="formValues.module">
                    <el-option v-for="item in moduleInfos" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="计划完成时间">
                  <el-date-picker type="date" placeholder="Pick a day" v-model="formValues.expectePublish" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="需求类型">
              <el-radio-group v-model="formValues.type">
                <el-radio value="newFeature">新特性</el-radio>
                <el-radio value="optimize">优化</el-radio>
                <el-radio value="bug">Bug</el-radio>
                <el-radio value="reBuild">重构</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="优先级">
              <el-radio-group v-model="formValues.priority">
                <el-radio value="p0">p0</el-radio>
                <el-radio value="p1">p1</el-radio>
                <el-radio value="p2">p2</el-radio>
                <el-radio value="p3">p3</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="复杂程度">
              <el-radio-group v-model="formValues.complexity">
                <el-radio value="p0">p0</el-radio>
                <el-radio value="p1">p1</el-radio>
                <el-radio value="p2">p2</el-radio>
                <el-radio value="p3">p3</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="开发人员" placeholder="请选择开发">
              <el-select multiple v-model="formValues.developers">
                <el-option v-for="item in userInfos" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>

            <el-form-item label="" v-if="!!developers.length">
              <DeveloperTime :developers="developers" v-model="timeValues" />
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item label="来源">
                  <el-radio-group v-model="formValues.source">
                    <el-radio value="customer">客户</el-radio>
                    <el-radio value="inner">内部</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="涉及部门">
                  <el-select v-model="formValues.departments" multiple>
                    <el-option v-for="item in departmentInfos" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="描述" placeholder="请输入描述">
              <TiptapEditor />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row justify="center">
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)"> Confirm </el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import { useRouter } from "vue-router"

import { CreateFormType, moduleInfos, departmentInfos } from "../type"
import { userInfos } from "../../user/type"
import DeveloperTime from "./components/developer-time.vue"
import TiptapEditor from "./components/tiptap-editor/tiptap-editor.vue"
import { FormType } from "./type"

const router = useRouter()

const formValues: CreateFormType = reactive({
  name: "",
  remark: "",
  complexity: "p1",
  priority: "p1",
  type: "newFeature",
  source: "customer",
  relateDepartment: "",
  createUser: "",
  developers: [],
  expectePublish: 0,
  module: "",
  departments: []
})

const timeValues: Record<string, any[]> = reactive({})
const ruleFormRef = ref<FormInstance>()

const developers = computed(() => {
  return userInfos
    .filter((it) => formValues.developers?.includes(it.id))
    .map((it) => {
      if (!timeValues[it.id]) {
        timeValues[it.id] = []
      }
      return it
    })
})

const rules: FormRules<FormType> = reactive({
  name: [
    { required: true, message: "请输入名称" },
    { min: 3, max: 30, message: "长度为3-30" }
  ],
  module: [{ required: true, message: "请输入" }]
})

const handleSubmit = (formEl: FormInstance | undefined) => {
  console.log("handleSubmit:", formEl, formValues)
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!")
    } else {
      console.log("error submit!", fields)
    }
  })
}

const handleCancel = () => {
  router.push("/demand")
}
</script>
