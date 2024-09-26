export interface DemandInfo {
  id: string
  name: string
  remark: string
  complexity: Complexity
  type: DemandType
  source: DemandSource
  relateDepartment: string
  createUser: string
  developers?: string[]
  expectePublish: number
  isDelay: boolean
  module?: string
  priority: Complexity
}

export type Complexity = "p0" | "p1" | "p2" | "p3"

export type DemandType = "newFeature" | "reBuild" | "bug" | "optimize"

export type DemandSource = "customer" | "inner"

export interface CreateFormType {
  name: string
  remark: string
  complexity: Complexity
  type: DemandType
  source: DemandSource
  relateDepartment: string
  createUser: string
  developers?: string[]
  expectePublish: number
  module?: string
  priority: Complexity
  departments?: string[]
}

export const demandInfos: DemandInfo[] = [
  {
    id: "1",
    name: "test1",
    remark: "xxx",
    createUser: "1",
    complexity: "p0",
    priority: "p0",
    type: "newFeature",
    source: "customer",
    relateDepartment: "1",
    expectePublish: 11111,
    isDelay: false
  },
  {
    id: "2",
    name: "test2",
    remark: "xxx",
    createUser: "2",
    complexity: "p1",
    priority: "p1",
    type: "bug",
    source: "inner",
    relateDepartment: "1",
    expectePublish: 11111,
    isDelay: false
  },
  {
    id: "3",
    name: "test3",
    remark: "xxx",
    createUser: "2",
    complexity: "p2",
    priority: "p2",
    type: "reBuild",
    source: "inner",
    relateDepartment: "1",
    expectePublish: 11111,
    isDelay: false
  },
  {
    id: "4",
    name: "test4",
    remark: "xxx",
    createUser: "2",
    complexity: "p3",
    priority: "p3",
    type: "optimize",
    source: "inner",
    relateDepartment: "1",
    expectePublish: 11111,
    isDelay: false
  }
]

export interface ModuleInfo {
  id: string
  name: string
  productId: string
}
export const moduleInfos: ModuleInfo[] = [
  { id: "1", name: "模块1", productId: "1" },
  { id: "2", name: "模块2", productId: "1" },
  { id: "3", name: "模块3", productId: "1" }
]

export interface DepartmentInfo {
  id: string
  name: string
}
export const departmentInfos: DepartmentInfo[] = [
  { id: "1", name: "部门1" },
  { id: "2", name: "部门2" },
  { id: "3", name: "部门3" }
]
