export interface UserInfo {
  name: string
  email: string
  role: "DEVELOPER" | "TESTER"
  department: string
  responsibility: "TEAM_LEADER" | "TEAM_MEMBER"
  id: string
}

export interface FormType {
  name: string
  email: string
  password: string
  repeatPassword: string
  role: "DEVELOPER" | "TESTER"
  department: string
  responsibility: "TEAM_LEADER" | "TEAM_MEMBER"
}

export interface ValidateFuncInfo {
  rule: any
  value: string
  callback: any
}

export interface UpdateUserProps {
  record?: UserInfo
}

export const userInfos: UserInfo[] = [
  {
    id: "1",
    name: "test1",
    email: "test1@qq.com",
    role: "DEVELOPER",
    department: "FRONTED",
    responsibility: "TEAM_LEADER"
  },
  {
    id: "2",
    name: "test2",
    email: "test2@qq.com",
    role: "DEVELOPER",
    department: "FRONTED",
    responsibility: "TEAM_LEADER"
  },
  { id: "3", name: "test3", email: "test3@qq.com", role: "TESTER", department: "TEST", responsibility: "TEAM_MEMBER" },
  { id: "4", name: "test4", email: "test4@qq.com", role: "TESTER", department: "TEST", responsibility: "TEAM_LEADER" }
]
