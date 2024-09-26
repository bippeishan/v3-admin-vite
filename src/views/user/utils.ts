import { FormType, ValidateFuncInfo } from "./type"

const checkPassword = (validInfo: ValidateFuncInfo, formInfos: { formValues: FormType; ruleFormRef: any }) => {
  const { value, callback } = validInfo
  const { formValues, ruleFormRef } = formInfos

  if (value === "") {
    callback(new Error("请输入密码"))
  } else {
    if (formValues.repeatPassword !== "") {
      if (!ruleFormRef.value) return
      // 控制台会有uncaugth的报错
      ruleFormRef.value.validateField("repeatPassword")
    }
    callback()
  }
}

const checkRepeatPassword = (validInfo: ValidateFuncInfo, formInfos: { formValues: FormType; ruleFormRef: any }) => {
  const { value, callback } = validInfo
  const { formValues } = formInfos

  if (value === "") {
    callback(new Error("请再次输入密码"))
  } else if (value !== formValues.password) {
    callback(new Error("两次密码不匹配"))
  } else {
    callback()
  }
}

const departmentInfos = [
  { label: "前端", value: "department1" },
  { label: "测试", value: "department2" },
  { label: "云管", value: "department3" },
  { label: "黄河", value: "department4" }
]

export { checkPassword, checkRepeatPassword, departmentInfos }
