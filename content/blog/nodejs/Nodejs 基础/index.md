---
date: "2018-03-08"
title: "Nodejs 基础"
category: "nodejs"
tag: "node, 基础知识"
---

## 1.Nodejs简介
Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

### 1.1 从前端到后端
JavaScript最早是运行在浏览器中，然而浏览器只是提供了一个上下文，它定义了使用JavaScript可以做什么，但并没有“说”太多关于JavaScript语言本身可以做什么。事实上，JavaScript是一门“完整”的语言： 它可以使用在不同的上下文中，其能力与其他同类语言相比有过之而无不及。

Node.js事实上就是另外一种上下文，它允许在后端（脱离浏览器环境）运行JavaScript代码。
要实现在后台运行JavaScript代码，代码需要先被解释然后正确的执行。Node.js的原理正是如此，它使用了Google的V8虚拟机（Google的Chrome浏览器使用的JavaScript执行环境），来解释和执行JavaScript代码。

### 1.2 同步和异步
```js
// 同步
console.log('begin');
for (var i=0; i< 10; i++) {
  console.log(i);
}
console.log('end');
```

```js
// 异步
var fs = require('fs');

// 1
console.log('begin');
fs.readFile('test.txt',function(err, data){
    // 2
    console.log(data);
});
// 3
console.log('end');
```
* 回调函数

![](http://cdn2.hubspot.net/hub/395275/file-4198520470-jpg/blog-files/nodejs_pyramid.jpg)

### 1.3 事件驱动和非阻塞
![图](https://camo.githubusercontent.com/ef0df2c7fd297dc8ce7e559a03f41333db755e7d/687474703a2f2f692e696d6775722e636f6d2f4d5a49704b62482e706e67)

## 2. Hello World

```js
console.log("Hello World");
```

```sh
node hello.js
```

## 3. modules
```js
// circle.js
const { PI } = Math;

exports.area = (r) => PI * r ** 2;

exports.circumference = (r) => 2 * PI * r;

// foo.js
const circle = require('./circle.js');
console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);
```
```sh
node foo.js
```

* require & exports

```js
//CLASS.js
var CLASS = function(){
    this.name = "class";
}
CLASS.prototype.func = function(){
    alert(this.name);
}
module.exports = new CLASS();

// main.js
var c = require('./CLASS.js');
c.func();//"class"
```

### CMD & AMD & ES6
AMD: define + require

CMD: exports + require

ES6: export + import

![](http://img.blog.csdn.net/20170111164714676?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd2VpeWFzdG9yeQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

## 4. Errors
错误分类： 同步和异步

### 4.1 错误类型
* EvalError : thrown when a call to eval() fails.
* SyntaxError : thrown in response to improper JavaScript language syntax.
* RangeError : thrown when a value is not within an expected range
* ReferenceError : thrown when using undefined variables
* TypeError : thrown when passing arguments of the wrong type
* URIError : thrown when a global URI handling function is misused.

### 4.2 同步错误
```js
// Throws with a ReferenceError because z is undefined
try {
  const m = 1;
  const n = m + z;
} catch (err) {
  // Handle the error here.
}
```
### 4.3 异步错误
```js
const fs = require('fs');
  fs.readFile('a file that does not exist', (err, data) => {
    if (err) {
      console.error('There was an error reading the file!', err);
      return;
    }
    // Otherwise handle the data
  });
```

### 4.4 分析
```js
// THIS WILL NOT WORK:
const fs = require('fs');

try {
  fs.readFile('/some/file/that/does-not-exist', (err, data) => {
    // mistaken assumption: throwing here...
    if (err) {
      throw err;
    }
  });
} catch (err) {
  // This will not catch the throw!
  console.error(err);
}
```

## 5. File/Stream

```js
const fs = require('fs');

fs.unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```

```js
const fs = require('fs');

try {
  fs.unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}
```
## 6. Events

```js
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
```

## 7. Timer

```js
// setTimeout()
function myFunc (arg1, arg2) {
  console.log('args was => ' + arg1 + ',' + arg2);
}

setTimeout(myFunc, 1500, 'hello', 'world');  // 'args was => hello, world'

// setInterval()
function  myfunc(Interval){
    console.log("myfunc  "+Interval);
}
setInterval(myfunc,1000,"Interval");

```