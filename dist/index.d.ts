import { AxiosResponse } from "axios";
interface ClientOption {
    appkey: string;
    appsecret: string;
    REST_URL?: string;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    retryCondition?: (res: AxiosResponse<any>) => boolean;
    simplify?: boolean;
}
interface ClientParam {
    [key: string]: any;
}
export default class TopSdk {
    appkey: string;
    appsecret: string;
    REST_URL: string;
    timeout: number;
    retries: number;
    retryDelay: number;
    retryCondition: (res: AxiosResponse<any>) => boolean;
    simplify: boolean;
    constructor({ appkey, appsecret, REST_URL, timeout, retries, retryDelay, retryCondition, simplify }: ClientOption);
    execute(method: string, param: ClientParam): Promise<any>;
}
export {};
