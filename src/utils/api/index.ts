import { ConfigOption } from "./type"
import { getFunc, postAllFunc, postFunc } from "./utils"

class ApiClass {
  configOption: ConfigOption

  constructor(options: ConfigOption = {}) {
    this.configOption = options
  }

  config = (options: ConfigOption) => {
    this.configOption = options
  }

  getConfigOptions = (options: ConfigOption) => {
    return { ...this.configOption, ...options } || this.configOption
  }

  post = (params: any, options: ConfigOption) => {
    const _options = this.getConfigOptions(options)
    return postFunc(params, _options)
  }

  postAll = (params: any, options: ConfigOption) => {
    const _options = this.getConfigOptions(options)
    return postAllFunc(params, _options)
  }

  get = (params: any, options: ConfigOption) => {
    const _options = this.getConfigOptions(options)
    return getFunc(params, _options)
  }
}

const Api = new ApiClass()

export default Api
