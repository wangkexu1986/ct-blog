---
title: "Nodejs版本工具nvm"
date: "2018-03-21"
category: "tool"
tag: "nvm,开发工具"
---

nvm
=====

## 简介
nodejs的版本管理工具 Node Version Manager

## 安装
[官网](https://github.com/creationix/nvm)

## 使用
```shell
#1. 安装node
DAC-yangsl:jcomsurvey_api_event dac-yangsl$ nvm install 9.8
######################################################################## 100.0%
Checksums empty
Now using node v9.8.0 (npm v5.6.0)
DAC-yangsl:jcomsurvey_api_event dac-yangsl$ 
```

```shell
#2. 切换node版本
DAC-yangsl:jcomsurvey_api_event dac-yangsl$ nvm use 6
Now using node v6.9.4 (npm v3.10.10)
DAC-yangsl:jcomsurvey_api_event dac-yangsl$ nodejs --version
bash: nodejs: command not found
DAC-yangsl:jcomsurvey_api_event dac-yangsl$ node --version
v6.9.4
DAC-yangsl:jcomsurvey_api_event dac-yangsl$ npm --version
3.10.10
DAC-yangsl:jcomsurvey_api_event dac-yangsl$ 
```

```shell
#3. 查看本地安装的nodejs
DAC-yangsl:jcomsurvey_api_event dac-yangsl$ nvm list
       v0.10.32
       v0.10.38
        v0.12.4
         v4.4.4
         v5.0.0
         v6.2.2
->       v6.9.4
         v8.9.0
         v9.6.1
         system
default -> 0.10 (-> v0.10.38)
node -> stable (-> v9.6.1) (default)
stable -> 9.6 (-> v9.6.1) (default)
unstable -> 8.9 (-> v8.9.0) (default)
iojs -> iojs- (-> N/A) (default)
DAC-yangsl:jcomsurvey_api_event dac-yangsl$ 
```