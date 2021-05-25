CT-BLOG
=======

## 前期准备

安装Nodejs 12

## 使用

### 本地环境启动
```shell script
npm install
npm run start
```
### 提交变更
```shell script
git push
```

### 更新网站
```shell script
npm run deploy
```

## 书写规范

### 博客
必须添加文件头
```shell script
---
date: "2021-04-21"
title: "网站草图"
category: "tool"
tag: ""
type: "学习整理 | 问题解决 | BUG复盘 | 其他"
author: "github账号名"
---
```

### 力扣题
必须添加文件头
```shell script
---
date: "2021-04-21"
title: "网站草图"
level: "简单 | 中等 | 困难
tag: ""
author: "github账号名"
---
```

### 读书笔记
必须添加文件头
```shell script
---
title: '书名 章节名'
date: "2021-04-21"
author: "github账号名"
---
```

## Markdown Syntax
https://www.gatsbyjs.com/docs/reference/markdown-syntax/


## 常见问题
### 1. sharp安装问题
```shell script
  Error: Something went wrong installing the "sharp" module
  Cannot find module '../build/Release/sharp.node'
  Require stack:
```

请升级系统库
brew install vips

