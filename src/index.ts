import Agent from "agentkeepalive";
import axios from "axios";
import { createHash } from "crypto";
import FormData from "form-data";
import moment from "moment";
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
  constructor({ appkey, appsecret, REST_URL = "http://gw.api.taobao.com/router/rest" }: ClientOption) {
    this.appkey = appkey;
    this.appsecret = appsecret;
    this.REST_URL = REST_URL;
  }
  async execute(method: string, param: ClientParam) {
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
      simplify: true,
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
    const httpAgent = new Agent({});
    const httpsAgent = new Agent.HttpsAgent();
    const res = await axios.post(this.REST_URL, formdata, {
      headers: formdata.getHeaders(),
      httpAgent,
      httpsAgent
    });
    return res.data;
  }
}
