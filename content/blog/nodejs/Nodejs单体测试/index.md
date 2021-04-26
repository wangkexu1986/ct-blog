---
title: "nodejs 单体测试"
date: "2018-03-30"
category: "nodejs"
tag: "nodejs,单体测试"
---

nodejs 单体测试
=====

## 测试目的

『ISTQB ソフトウェアテスト標準用語集 日本語版』より引用
- 欠陥を摘出する
- 対象ソフトウェアの品質レベルが十分であることを確認する 
- 意志決定のための情報を示す 
- 欠陥の作りこみを防ぐ

Grenford J. Myers在《The Art of Software Testing》一书中的观点
- 软件测试是为了发现错误而执行程序的过程
- 测试是为了证明程序有错，而不是证明程序无错误
- 一个好的测试用例是在于它能发现至今未发现的错误

## 目录

- [为什么要单体测试](#为什么要单体测试)
- [理解单体测试](#理解单体测试)
- [两种测试方式](#两种测试方式)
  - [TDD](#TDD-测试驱动开发)
  - [BDD](#BDD-行为驱动开发)
- [单体测试测什么](#单体测试测什么)
  - [接口](#接口)
  - [局部数据](#局部数据)
  - [边界](#边界)
  - [路径](#路径)
  - [错误处理](#错误处理)
- [不能测试的部分](#不能测试的部分)
- [怎样写好单体测试](#怎样写好单体测试)
- [单体测试的编码规约](#单体测试的编码规约)
  - [目录](#目录)
  - [代码](#代码)
  - [执行](#代码)
  - [报告](#代码)
- [测试的10个单词](#测试的10个单词)

## 为什么要单体测试

* 在快速的迭代开发中，保证代码品质
* 如果想进行代码重构，可以大胆重构
* 看到自己写的代码，测试都能通过。有种安心感

## 理解单体测试

* 测试代码的功能是否正确
* 白盒测试/黑盒测试
* 覆盖率（语句/分支/条件/路径）
* 报告
* 工具

## 两种测试方式
从测试的角度来检验整个项目

```js
module.exports = function (n) {
  if (n < 0) return NaN;
  if (n === 0) return 1;
  return n * factorial(n - 1);
};
```

### TDD-测试驱动开发
```js
var assert = require('assert'),
    factorial = require('../index');
suite('Test', function (){
  setup(function (){
    // Create any objects that we might need
  });
  suite('#factorial()', function (){
    test('equals 1 for sets of zero length', function (){
      assert.equal(1, factorial(0));
    });
    test('equals 1 for sets of length one', function (){
      assert.equal(1, factorial(1));
    });
    test('equals 2 for sets of length two', function (){
      assert.equal(2, factorial(2));
    });
    test('equals 6 for sets of length three', function (){
      assert.equal(6, factorial(3));
    });
  });
});
```

### BDD-行为驱动开发
```js
var assert = require('assert'),
    factorial = require('../index');
describe('Test', function (){
  before(function(){
    // Stuff to do before the tests, like imports, what not
  });
  describe('#factorial()', function (){
    it('should return 1 when given 0', function (){
      factorial(0).should.equal(1);
    });
    it('should return 1 when given 1', function (){
      factorial(1).should.equal(1);
    });
    it('should return 2 when given 2', function (){
      factorial(2).should.equal(2);
    });
    it('should return 6 when given 3', function (){
      factorial(3).should.equal(6);
    });
  });
  after(function () {
    // Anything after the tests have finished
  });
});
```

## 单体测试测什么

### 接口
* 参数个数和类型
* 参数的边界值

### 局部数据

* 内部数据（初期値， 数据类型， 边界， 空， 异常）

### 边界

* 变量
* 参数
* for 边界

### 路径

* else
* switch
* for（循环次数）

### 错误处理

* 错误（错误信息， 错误分类）

## 单元测试中的替身

* Dummy Objects (傀儡对象)

```js
it(`should have getTitle() to return 'todos'`, () => {
  const dummy = {
    lang: 'en-us'
  };
  
  const target = new TitleComponent();  
  expect(target.getTitle(dummy)).toBe('todos');
});
```

* Stub (测试桩)
* Spy (测试间谍)
* Fake objects (伪造对象)

```js
it(`should use getTitle()`, () => {
  spyOn(component, 'getTitle').and.callFake(() => 'fake');
  fixture.detectChanges();

  htmlElement = debugElement.query(By.css('h1')).nativeElement;
  
  expect(htmlElement.textContent).toBe('fake');
});
```
* Mocks (模拟对象)

## 工具准备
* 测试框架（mocha）
* 断言库（should）
* 覆盖率（istanbul）
* 报告（mochareport）
* mock库

## 怎样写好单体测试
* 执行速度快
* 预期， 准备， 调用， 结果判断（断言）
* 测试结果不能依赖运行环境
* 测试结果不依赖运行测试的顺序
* 测试必须是可重复执行的
* 自我判定
* 应该尽量覆盖所有使用场景

## 测试数据的管理
* DB
* 文件
  1. 初期化
  2. 中间数据
  3. 清除

## 单体测试的编码规约
### 目录
```js
test
├── data
│   ├── db
│   │   └── init.js                 // DB初期化数据
│   └── img
│       ├── YUKARi.ipa
│       └── YUKARi.png
├── e2e
│   ├── nightwatch.json
│   └── specs
│       └── e2e_spec_sample.js
├── readme.md                      // DB数据说明
├── reports
│   └── UnitCoverage
│       ├── coverage.json
│       ├── lcov-report
│       └── lcov.info
├── restapi
│   └── specs
│       └── restapi_spec_appstore.js
└── unit
    ├── TestCommon.js              // 共通方法
    ├── TestInit.js                // 测试之前的db初期化
    ├── TestLoader.js              // 加载测试代码
    ├── TestMock.js                // req，res，loginUser等的mock
    ├── api
    │   └── admin
    ├── controllers
    │   ├── admin
    │   └── new_content
    └── models
        ├── new_content
        └── test_mod_s3_common.js
```

### 代码
```js
"use strict";

var should      = require("should")
  , simple      = require("simple-mock") //异常对象mock
  , faker       = require("mockjs") // 数据生成
  , Common      = require("../../TestCommon")
  , mock        = require("../../TestMock")
  , ctrlUser    = require("../../../../controllers/admin/ctrl_user")
  , modUser     = require("../../../../models/admin/mod_user");

describe("Controllers User", function() {

  /***********************************************/
  describe("测试方法名", function() {
    it("测试用例描述", function(done) {
      done();
    });
  });
});
```

### 执行
```js
npm run-script test-unit
npm run-script test-mocha
```
### 报告

* mocha测试结果报告

![mocha测试结果报告](https://github.com/adamgruber/mochawesome/blob/master/docs/marge-report-1.0.1.png)

* 代码覆盖率报告

![代码覆盖率报告](https://istanbul.js.org/assets/browser.png)

## 测试的10个单词

1. 定义
2. 测什么内容
3. 测试方法
4. 测试工具
5. 衡量标准
6. 测试设计
7. 测试管理
8. 测试报告
9. bts分析
10. 最佳实践

## 问题
> 如果才能确定一个参数是正确的?


```js
let 参数A = 未知的值
if (参数A有值) {
   if (typeos 参数A) {
      if (参数A是合法的值) {
         // 参数A如果需要再DB中校验
         if (参数A在DB中存在) {
            // 业务逻辑判断
            // 。。。
            console.log("参数A是合法的值")
         } else {
            console.log("参数A在DB中不存在")
         }

         // 业务逻辑判断
         if (参数A满足业务需求) {
           console.log("参数A是合法的值")
         } else {
            console.log("参数A不正确")
         }

         // 权限判断
         if (参数A有次权限) {
           console.log("参数A是合法的值")
         } else {
           console.log("参数A没有权限")
         }
      } else {
        console.log("参数A不是一个合法的值（非法字段，长度，边界等）");
      }
   } else {
      console.log("参数A类型不正确");
   }
} else {
   console.log(“参数A没有值”);
}
```