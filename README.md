# promise-top-sdk (Taobao TOP API Node SDK)

Axios 实现的阿里开放平台 TOP SDK

[![NPM Version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

- 支持 Promise1
- Typescript
- http/https keep alive

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
