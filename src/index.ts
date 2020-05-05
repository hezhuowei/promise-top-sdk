import Agent from "agentkeepalive";
import axios, { AxiosResponse } from "axios";
import { createHash } from "crypto";
import FormData from "form-data";
import moment from "moment";
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
  constructor({
    appkey,
    appsecret,
    REST_URL = "http://gw.api.taobao.com/router/rest",
    timeout = 0,
    retries = 0,
    retryDelay = 0,
    retryCondition = res => {
      return res.status >= 400;
    },
    simplify = true
  }: ClientOption) {
    this.appkey = appkey;
    this.appsecret = appsecret;
    this.REST_URL = REST_URL;
    this.timeout = timeout;
    this.retries = retries;
    this.retryDelay = retryDelay;
    this.retryCondition = retryCondition;
    this.simplify = simplify;
  }
  async execute(method: string, param: ClientParam) {
    const formdata = () => {
      const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
      const v = "2.0";
      const sign_method = "md5";
      const data: { [key: string]: any } = {
        method,
        app_key: this.appkey,
        timestamp,
        v,
        sign_method,
        format: "json",
        simplify: this.simplify,
        ...param
      };
      const arr = [];
      const formdata = new FormData();
      for (const key of Object.keys(data)) {
        formdata.append(key, String(data[key]));
        arr.push(key + String(data[key]));
      }
      const str = this.appsecret + arr.sort().join("") + this.appsecret;
      const sign = createHash("md5")
        .update(str)
        .digest("hex")
        .toUpperCase();
      formdata.append("sign", sign);
      return formdata;
    };
    const httpAgent = new Agent({});
    const httpsAgent = new Agent.HttpsAgent();
    const axiosPost = (formdata: FormData) => {
      return axios.post(this.REST_URL, formdata, {
        timeout: this.timeout,
        headers: formdata.getHeaders(),
        httpAgent,
        httpsAgent
      });
    };
    let res = await axiosPost(formdata());
    for (let i = 0; i < this.retries && this.retryCondition(res); i++) {
      if (this.retryDelay > 0) {
        await new Promise(resolve => {
          setTimeout(() => resolve(), this.retryDelay);
        });
      }
      res = await axiosPost(formdata());
    }

    return res.data;
  }
}
