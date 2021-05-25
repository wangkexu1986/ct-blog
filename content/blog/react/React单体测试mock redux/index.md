---
date: "2021-05-24"
title: "React单体测试中mock redux"
category: "react"
tag: "react mock redux"
type: "问题解决"
author: "slsay"
---

## 现象
写单体测试时，发生如下错误。
```shell 
Error: could not find react-redux context value; please ensure the component is wrapped in a <Provider>
```

## 原因
react-redux的项目中，写单体测试时必须mock react-redux。

## 解决办法
### 1. 安装redux-mock-store
```shell script
npm install --save-dev redux-mock-store
```

### 2. 导入库
```shell script
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
```

### 3. mock store
```javascript
const initialState = { test: 'test' };
const mockStore = configureStore();
const store = mockStore(initialState);
const { getByText } = render(<Provider store={store}><App /></Provider>)
...
```





