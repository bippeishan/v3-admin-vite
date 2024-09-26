import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { ConfigOption } from "./type"

const handleResponse = (response: AxiosResponse) => {
  if (response && response.status === 200) {
    return response.data
  } else {
    throw new Error("系统错误")
  }
}

const send = async (config: AxiosRequestConfig, options: ConfigOption) => {
  const { url = "", timeout = 60000, params } = options || {}

  const configInfo = {
    url,
    params,
    timeout,
    ...config
  }

  let response = null
  try {
    response = await axios(configInfo)
  } catch (error) {
    throw new Error("网络错误")
  }
  return handleResponse(response)
}

const postFunc = async (params: any, options: ConfigOption) => {
  const { axiosConfig = {} } = options || {}
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    method: "post",
    data: params
  }

  return send(config, options)
}

const postAllFunc = async (params: any, options: ConfigOption) => {
  let List: Array<any> = []
  const Limit = 100
  let PageIndex = 0
  let Count = (PageIndex + 1) * Limit // 当前总数据量

  const responseBody = {
    Limit: "Limit",
    Offset: "Offset",
    TotalCount: "TotalCount",
    FormatListResponse: (resp: any) => resp?.Infos as Array<any>
  }

  const getParams = (index: number) => {
    return {
      Offset: index * Limit,
      Limit: Limit,
      ...params
    }
  }

  const func = async (params: any) => {
    const resp = await postFunc(params, options)
    const resultInfos = responseBody.FormatListResponse?.(resp)
    List = List.concat(resultInfos ? resultInfos : [])
    if (resp[`${responseBody.TotalCount}`] > Count) {
      PageIndex = PageIndex + 1
      Count = (PageIndex + 1) * Limit
      await func(getParams(PageIndex))
    }
  }

  await func(getParams(PageIndex))

  return List
}

const getFunc = async (params: any, options: ConfigOption) => {
  const { axiosConfig, params: _params } = options || {}
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    method: "get",
    params: { ...params, ..._params }
  }

  return send(config, options)
}

export { postFunc, postAllFunc, getFunc }
