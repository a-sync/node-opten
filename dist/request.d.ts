import { AxiosRequestConfig } from 'axios';
export declare class OptenError extends Error {
    request: string;
    constructor(m: string);
}
export declare function soapRequest(url: string, xml: string, axiosConfig?: AxiosRequestConfig): Promise<any>;
