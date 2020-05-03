# Taobao TOP API Node SDK

Axios 实现的阿里开放平台TOP SDK

- 支持Promise
- Typescript
- http/https keep alive

## Get Started

```typescript

import TopClient from "taobao-top-sdk";

const param={};
const client = new TopClient({
    appkey:"",
    appsecret:""
    //REST_URL:"http://gw.api.taobao.com/router/rest" 
    });
const data= await client.execute("taobao.tbk.dg.material.optional", param)
console.log(data);  // {"result_list":[{"category_id":50008881,"category_name"......}

```
