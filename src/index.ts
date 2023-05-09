import { rapidSearch, RapidSearchRet, fragmentSearch } from './rapid-search'
import { authorize } from './authorize'
import { multiInfo, ExampleMultiInfoResponse } from './multi-info'
import { encodeXML } from 'entities'
import * as dayjs from 'dayjs'

export interface OptenOptions {
  username: string
  password: string
  mockMultiInfo?: boolean
}
export class Opten {
  token: string = null
  tokenExpiresAt: dayjs.Dayjs
  options: OptenOptions
  constructor(options: OptenOptions) {
    this.options = options
  }

  async getToken() {
    if (this.token) {
      if (dayjs().isBefore(this.tokenExpiresAt)) return this.token
    }
    const token = await authorize({
      username: this.options.username,
      password: this.options.password
    })
    this.token = token
    this.tokenExpiresAt = dayjs().add(175, 'minute') // token expires in 3 hours

    return token
  }

  async rapidSearch(query: string, isRetry = false): Promise<RapidSearchRet> {
    const token = await this.getToken()
    try {
      return rapidSearch(encodeXML(query), token)
    } catch (err) {
      if (!isRetry) {
        delete this.token
        return this.rapidSearch(query, true)
      } else {
        throw err
      }
    }
  }

  async fragmentSearch(query: string, isRetry = false): Promise<RapidSearchRet> {
    const token = await this.getToken()
    try {
      return fragmentSearch(encodeXML(query), token)
    } catch (err) {
      if (!isRetry) {
        delete this.token
        return this.fragmentSearch(query, true)
      } else {
        throw err
      }
    }
  }

  async multiInfo<T = ExampleMultiInfoResponse>(firmTaxNo: string, isRetry = false):Promise<T> {
    const token = await this.getToken()
    try {
      return multiInfo<T>(firmTaxNo, token)
    } catch (err) {
      if (!isRetry) {
        delete this.token
        return this.multiInfo<T>(firmTaxNo, true)
      } else {
        throw err
      }
    }
  }
}
