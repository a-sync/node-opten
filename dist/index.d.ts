import { RapidSearchRet } from './rapid-search';
import { ExampleMultiInfoResponse } from './multi-info';
import * as dayjs from 'dayjs';
export interface OptenOptions {
    username: string;
    password: string;
    mockMultiInfo?: boolean;
}
export declare class Opten {
    token: string;
    tokenExpiresAt: dayjs.Dayjs;
    options: OptenOptions;
    constructor(options: OptenOptions);
    getToken(): Promise<string>;
    rapidSearch(query: string, isRetry?: boolean): Promise<RapidSearchRet>;
    fragmentSearch(query: string, isRetry?: boolean): Promise<RapidSearchRet>;
    multiInfo<T = ExampleMultiInfoResponse>(firmTaxNo: string, isRetry?: boolean): Promise<T>;
}
