---
title: "Rest API"
date: "2018-03-30"
category: "other"
tag: "Rest API"
---

Rest API
=========

REST（Representational State Transfer，表现层状态转化）是 Roy Thomas Fielding【1】 在2000年他的博士论文《Architectural Styles and the Design of Network-based Software Architectures》中提出的一个描述互联系统架构风格的名词。

RESTful架构：  
（1）每一个URI代表一种资源；  
（2）客户端和服务器之间，传递这种资源的某种表现层；  
（3）客户端通过四个HTTP动词，对服务器端资源进行操作，实现"表现层状态转化"。  

## Rest API

### 1.HTTP动词
|动词|说明|CRUD|
|------|------|------|
|POST|新规|CREATE|
|GET|取得|READ|
|PUT|更新|UPDATE|
|DELETE|删除|DELETE|

### 2.无状态

状态保存在哪里？  服务器还是客户端
cookie & session

token
jwt
oauth

### 3.安全性和幂等性

* 安全性：不会改变资源状态，可以理解为只读的；
* 幂等性：执行1次和执行N次，对资源状态改变的效果是等价的。

|动词|安全性|幂等性|
|------|------|------|
|POST|×|×|
|PUT|×|√|
|GET|√|√|
|DELETE|×|√|

## 命名规范
### 域名
```js
https://api.example.com
https://example.org/api/

// eg:
https://api.github.com
```
### 版本
```js
https://api.example.com/v1/
https://api.example.com/1.1/

eg:
https://api.github.com/v3
```
### URL

* 不用大写；
* 用中杠-不用下杠_；
* 参数列表要encode；
* URI中的名词表示资源集合，使用复数形式。

GET：查询
```js
GET /zoos
GET /zoos/1
GET /zoos/1/employees

eg:
GET /applications/grants/:id
```

POST：新规

```js
POST /animals  //新增动物
POST /zoos/1/employees //为id为1的动物园雇佣员工
```
PUT：更新

```js
PUT /animals/1
PUT /zoos/1
```

DELETE：删除

```js
DELETE /zoos/1/employees/2
DELETE /zoos/1/animals  //删除id为1的动物园内的所有动物
```

### 常用参数
```js
?limit=10：指定返回记录的数量
?skip=10：指定返回记录的开始位置。
?page=2&per_page=100：指定第几页，以及每页的记录数。
?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
?animal_type_id=1：指定筛选条件
```

## 状态码

|状态码|使用场景|
|--------|--------|
|400|bad request常用在参数校验|
|401|unauthorized未经验证的用户，常见于未登录。如果经过验证后依然没权限，应该 403（即 authentication 和 authorization 的区别）。|
|403|forbidden无权限|
|404|not found资源不存在|
|500|internal server error非业务类异常|
|503|service unavaliable|

## 错误

错误构造
* 错误码
* 错误类型
* 详细信息
* 资源信息

发送的json对象中，有非法的字段
```js
 HTTP/1.1 422 Unprocessable Entity
 Content-Length: 149
 
 {
  "message": "Validation Failed",
  "errors": [
    {
      "resource": "Issue",
      "field": "title",
      "code": "missing_field"
    }
  ]
 }
```


## API Doc
http://apidocjs.com/

## 测试
postman 
https://www.getpostman.com/
## 管理
...

## 设计流程

资源 > URL > 动词 > 参数 > 返回结果构造