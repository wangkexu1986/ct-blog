---
date: "2021-06-3"
title: "Linux常用命令"
category: "linux"
tag: "Linux,常用命令"
type: "学习整理"
author: "王克"
---

## 网络命令
### 访问url
```sh
curl [url]
```
### 显示头信息
```sh
curl -I
```

### 添加cookie
```sh
curl -c 'xxx'
```

### 更改表头
```sh
curl -H or -HEAD
```

### 通讯方式
```sh
curl -X POST or GET ...
```

### POST携带参数
```sh
curl -X POST -F 'xxx=xxx'
```
