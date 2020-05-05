# promise-top-sdk (Taobao TOP API Node SDK)

Axios 实现的阿里开放平台 TOP SDK

[![NPM Version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

- 支持 Promise
- Typescript
- http/https keep alive
- 默认开启 simplify 返回精简 JSON 格式
- 自动重试 可配置重试次数,重试间隔,重试条件

参考文档 <https://open.taobao.com/doc.htm?docId=101617&docType=1>

## Get Started

```typescript
import TopClient from "taobao-top-sdk";

const param = {};
const client = new TopClient({
  appkey: "",
  appsecret: ""
  //REST_URL:"http://gw.api.taobao.com/router/rest"
});
const data = await client.execute("taobao.tbk.dg.material.optional", param);
console.log(data); // {"result_list":[{"category_id":50008881,"category_name"......}
```

[npm-image]: https://img.shields.io/npm/v/retry-axios.svg
[npm-url]: https://npmjs.org/package/promise-top-sdk
[download-image]: https://img.shields.io/npm/dm/promise-top-sdk.svg?style=flat-square
[download-url]: https://npmjs.org/package/promise-top-sdk

## 注意事项

### 默认开启 simplify,返回精简 JSON

目前没有在阿里文档找到 simplify 参数的相关说明,下面是开启后返回 json 对比.
目前观察到的是数组精简掉 "map_data" 和 精简 "接口名称\_response"

simplify=true 时

```json
{
  "result_list": [
    {
      ...
      "shop_title": "xxx旗舰店",
      "short_title": "xxx肩带防滑聚拢小无钢圈抹胸",
      "small_images": [
        "https://img.alicdn.com/i2/800648922/O1CN01XDo8R92FmKB0tYu86_!!800648922.jpg",
        "https://img.alicdn.com/i1/800648922/O1CN019jyqEZ2FmKFEQv1k2_!!800648922.jpg"
      ],
      "title": "xxx无肩带文胸防滑聚拢小胸罩抹胸无钢圈蕾丝美背隐形内衣女",
      "x_id": "4H2rEIrvnSnOC7PVBfgv",
      "zk_final_price": "165"
    }
  ],
  "total_results": 903001,
  "request_id": "o7x83wd8zjtg"
}
```

simplify=false 时

```json
{
  "tbk_dg_material_optional_response": {
    "result_list": {
      "map_data": [
        {
          ...
          "shop_title": "芬斯狄娜旗舰店",
          "short_title": "芬斯狄娜肩带防滑聚拢小无钢圈抹胸",
          "small_images": {
            "string": [
              "https://img.alicdn.com/i2/800648922/O1CN01XDo8R92FmKB0tYu86_!!800648922.jpg",
              "https://img.alicdn.com/i1/800648922/O1CN019jyqEZ2FmKFEQv1k2_!!800648922.jpg"
            ]
          },
          "title": "芬斯狄娜无肩带文胸防滑聚拢小胸罩抹胸无钢圈蕾丝美背隐形内衣女",
          "x_id": "4H2rEIrvnSnOC7PVBfgv",
          "zk_final_price": "165"
        }
      ]
    },
    "total_results": 907240,
    "request_id": "ojpm34kxw0w0"
  }
}
```

## 更多设置

```javascript
import TopClient from "taobao-top-sdk";
const client = new TopClient({
  appkey,
  appsecret,
  REST_URL:"http://gw.api.taobao.com/router/rest" //网关地址
  retryCondition: res => {
    return res.data?.error_response?.sub_code === "50001" || res.status >= 400;
  }, // 重试条件 default: (res)=>{return res.status >= 400} 状态码大于等于400都进行重试
  retries: 10, // 重试次数  default:0 不重试
  retryDelay: 50, // 重试间隔(毫秒) default:0 无间隔
  timeout: 1000, // 超时时间(毫秒) default:0 无超时
  simplify: true // 是否启用精简json default:true 启用
});
const data = await client.execute("taobao.tbk.dg.material.optional", para);
console.log(data);
```
