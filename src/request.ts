import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { parseXml } from './xml'

export class OptenError extends Error {
  request: string
  constructor(m: string) {
    super(m)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, OptenError.prototype)
  }
}

interface OptenErrorResponse {
  'SOAP-ENV:Envelope': {
    $: $
    'SOAP-ENV:Body': SOAPENVBodyItem[]
  }
}
interface $ {
  'xmlns:SOAP-ENV': string
}
interface SOAPENVBodyItem {
  'SOAP-ENV:Fault': SOAPENVFaultItem[]
}
interface SOAPENVFaultItem {
  faultcode: string[]
  faultstring: string[]
}

export async function soapRequest(
  url: string,
  xml: string,
  axiosConfig?: AxiosRequestConfig
) {
  try {
    const response = await axios({
      ...axiosConfig,
      method: 'post',
      url,
      data: xml
    })
    return response.data
  } catch (err) {
    const e: AxiosError = err
    if (e.response) {
      const errorResp: OptenErrorResponse = await parseXml(e.response.data)
      console.error('Opten error request', JSON.stringify(xml))
      console.error('Opten error response', JSON.stringify(errorResp))
      if(errorResp === null) {
        console.error('invalid response', String(e.response.data));
        throw new Error('invalid opten soap error response');
      } else {
        const newErr = new OptenError(
          `Opten Error: ${
            errorResp['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0][
              'SOAP-ENV:Fault'
            ][0].faultstring
          }`
        )
        newErr.request = xml
        throw newErr
      }
    } else {
      console.error(`SOAP FAIL: ${e}`)
      throw e
    }
  }
}
