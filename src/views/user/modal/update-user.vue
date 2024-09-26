<template>
  <el-dialog v-model="visible" title="编辑用户">
    <el-form ref="ruleFormRef" :rules="rules" :model="formValues" label-width="120px" status-icon>
      <el-form-item label="名称" placeholder="请输入名称" prop="name">
        <el-input v-model="formValues.name" />
      </el-form-item>

      <el-form-item label="邮箱" placeholder="请输入邮箱" prop="email" v-if="!props.record">
        <el-input v-model="formValues.email" />
      </el-form-item>

      <el-form-item label="密码" placeholder="请输入密码" prop="password" v-if="!props.record">
        <PasswordStrength v-model="formValues.password" />
      </el-form-item>

      <el-form-item label="确认密码" placeholder="请在此输入密码" prop="repeatPassword" v-if="!props.record">
        <el-input v-model="formValues.repeatPassword" />
      </el-form-item>

      <el-form-item label="角色">
        <el-radio-group v-model="formValues.role">
          <el-radio value="DEVELOPER">研发</el-radio>
          <el-radio value="TESTER">测试</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="部门" prop="department">
        <el-select v-model="formValues.department" placeholder="请选择部门">
          <el-option v-for="item in departmentInfos" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="职能">
        <el-radio-group v-model="formValues.responsibility">
          <el-radio value="TEAM_MEMBER">组员</el-radio>
          <el-radio value="TEAM_LEADER">组长</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <div>
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import axios from "axios"
import { FormType, UpdateUserProps } from "../type"
import { checkPassword, checkRepeatPassword, departmentInfos } from "../utils"
import PasswordStrength from "../../../components/password-strength/index.vue"

const props = defineProps<UpdateUserProps>()
const emit = defineEmits(["onComplate", "onClose"])
const visible = defineModel<boolean>()

const ruleFormRef = ref<FormInstance>()

const formValues: FormType = reactive({
  name: props?.record?.name || "",
  email: props?.record?.email || "",
  password: "",
  repeatPassword: "",
  role: props?.record?.role || "DEVELOPER",
  department: props?.record?.department || "",
  responsibility: props?.record?.responsibility || "TEAM_MEMBER"
})

onMounted(() => {
  getDepartments()
})

const getDepartments = () => {
  // 默认值设为下拉框数据的第一个
  setTimeout(() => {
    formValues.department = departmentInfos[0].value
  }, 1000)
}

const handleSubmit = (formEl: FormInstance | undefined) => {
  console.log("handleSubmit:", formEl, formValues)
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      axios
        .post("/api-yunmo/users", formValues, { withCredentials: true })
        .then((res) => {
          console.log("success:", res)
          emit("onClose")
          emit("onComplate")
        })
        .catch((err) => {
          console.log("err:", err)
        })
    } else {
      console.log("error submit!", fields)
    }
  })
}

const handleCancel = () => {
  emit("onClose")
}

const rules: FormRules<FormType> = reactive({
  name: [
    { required: true, message: "请输入名称" },
    { min: 3, max: 30, message: "长度为3-30" }
  ],
  email: [{ type: "email", required: true, message: "邮箱格式不正确" }],
  password: [
    {
      validator: (rule: any, value: string, callback: any) => {
        checkPassword({ rule, value, callback }, { formValues, ruleFormRef })
      }
    }
  ],
  repeatPassword: [
    {
      validator: (rule: any, value: string, callback: any) => {
        checkRepeatPassword({ rule, value, callback }, { formValues, ruleFormRef })
      }
    }
  ],
  department: [{ required: true, message: "请选择部门" }]
})
</script>
