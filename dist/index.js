"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const agentkeepalive_1 = __importDefault(require("agentkeepalive"));
const axios_1 = __importDefault(require("axios"));
const crypto_1 = require("crypto");
const form_data_1 = __importDefault(require("form-data"));
const moment_1 = __importDefault(require("moment"));
class TopSdk {
    constructor({ appkey, appsecret, REST_URL = "http://gw.api.taobao.com/router/rest" }) {
        this.appkey = appkey;
        this.appsecret = appsecret;
        this.REST_URL = REST_URL;
    }
    execute(method, param) {
        return __awaiter(this, void 0, void 0, function* () {
            const timestamp = moment_1.default().format("YYYY-MM-DD HH:mm:ss");
            const v = "2.0";
            const sign_method = "md5";
            const data = Object.assign({ method, app_key: this.appkey, timestamp,
                v,
                sign_method, format: "json", simplify: true }, param);
            const arr = [];
            const formdata = new form_data_1.default();
            for (const key of Object.keys(data)) {
                formdata.append(key, String(data[key]));
                arr.push(key + String(data[key]));
            }
            const str = this.appsecret + arr.sort().join("") + this.appsecret;
            const sign = crypto_1.createHash("md5")
                .update(str)
                .digest("hex")
                .toUpperCase();
            formdata.append("sign", sign);
            const httpAgent = new agentkeepalive_1.default({});
            const httpsAgent = new agentkeepalive_1.default.HttpsAgent();
            const res = yield axios_1.default.post(this.REST_URL, formdata, {
                headers: formdata.getHeaders(),
                httpAgent,
                httpsAgent
            });
            return res.data;
        });
    }
}
exports.default = TopSdk;
//# sourceMappingURL=index.js.map