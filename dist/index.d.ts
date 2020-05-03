interface ClientOption {
    appkey: string;
    appsecret: string;
    REST_URL?: string;
}
interface ClientParam {
    [key: string]: any;
}
export default class TopSdk {
    appkey: string;
    appsecret: string;
    REST_URL: string;
    constructor({ appkey, appsecret, REST_URL }: ClientOption);
    execute(method: string, param: ClientParam): Promise<any>;
}
export {};
