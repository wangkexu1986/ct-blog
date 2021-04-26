---
title: "ES6基本用法(一)"
date: "2018-06-12"
category: "javascript"
tag: "ES6,基本语法,变量，函数"
---

ES6基本用法
=======

## const和let 
### const
* const用来定义常量,相当于java中的final关键字.
* const声明常量之后必须立即初始化.
```js
const PI = 3.1415;
console.log(PI);  // 3.1415

PI = 3;           // TypeError: Assignment to constant variable.
```
### let
* ES6 新增了let命令，用来声明变量。
* 块级作用域,只在let命令所在的代码块内有效。
```js
//ES6
{
  var a = 5;
  let b = 6;
}
console.log(a);       //5
//console.log(b);     //ReferenceError: b is undefined
```
* for循环的计数器，就很合适使用let命令。
```js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);      
}

console.log(i);      // ReferenceError: i is not defined
```
* 不存在变量提升
```js
console.log(c);            //undefined
var c=8;
console.log("----------");
console.log(d);            //ReferenceError: d is not defined
let d=9;
```
* 暂时性死区（temporal dead zone，简称 TDZ）
```js
var tmp = 123;

if (true) {
  tmp = 'abc';   // ReferenceError: tmp is not defined
  let tmp;
}
```
## 解构
* 模式匹配,ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
```js
//变量赋值
let a = 1;
let b = 2;
let c = 3;
// ES6 解构赋值
let [a, b, c] = [1, 2, 3];
```
### 数组的解构赋值

* 可以从数组中提取值，按照对应位置，对变量赋值。
```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```
* 默认值,解构赋值允许指定默认值。
```js
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

function f() {
  console.log('aaa');   
}

let [x = f()] = [1];   // 会输出aaa吗?
```

### 对象的解构赋值

* 对象的解构与数组有一个重要的不同。
* 数组的元素是按次序排列的，变量的取值由它的位置决定；
* 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
```js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```
* 如果变量名与属性名不一致，必须写成下面这样。
```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
### 字符串的结构赋值

* 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
* 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
```js
let {length : len} = 'hello';
len // 5
```
### 函数参数的解构赋值

```js
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```
* 也可以使用默认值
```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

```
## 模板字符串

```js
// ES5 输出模板
$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);

// ES6
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

* 模板字符串采用反引号（`）标识，并且模板字符串中的空格、换行将在输出时有所保留。

```js
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```
* ${主体}，其中主体可以是表达式、运算、对象属性还可以是函数，若是字符串将直接输出该字符串。
```js
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"

function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar
```

## 函数 

### 函数参数的默认值
```js
// ES5
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

// ES6
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```

* 参数变量是默认声明的，所以不能用let或const再次声明。
```js
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}
```
*  使用参数默认值时，函数不能有同名参数。
```js
// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context
```

```js
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // ?

x = 100;
foo() // ?
```
### 箭头函数
* 不需要function关键字来创建函数
* 省略return关键字
* 继承当前上下文的 this 关键字
```js 
//例如： 
[1,2,3].map( x => x + 1 )
//等同于： 
[1,2,3].map((function(x){ return x + 1 }).bind(this))
```

## 拓展的对象功能
### 属性的简洁表示法
* ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```js
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 等同于
const baz = {foo: foo};
```
```js
// 另一个例子
function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}
```
* 除了属性简写,方法也可以简写
```js
let birth = '2000/01/01';

const Person = {

  name: '张三',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

};
```

## 展开运算符
* ES2018 将这个扩展运算符（...）引入了对象
```js
const [a, ...b] = [1, 2, 3];
a // 1
b // [2, 3]
```
### 组装对象或者数组

```js
//数组
const color = ['red', 'yellow']
const colorful = [...color, 'green', 'pink']
console.log(colorful) //[red, yellow, green, pink]
    
//对象
const alp = { fist: 'a', second: 'b'}
const alphabets = { ...alp, third: 'c' }
console.log(alphabets) //{ "fist": "a", "second": "b", "third": "c"
```

### 获取数组或者对象除了前几项或者除了某几项的其他项
```js
//数组
const number = [1,2,3,4,5]
const [first, ...rest] = number
console.log(rest) //2,3,4,5
//对象
const user = {
    username: 'lux',
    gender: 'female',
    age: 19,
    address: 'peking'
}
const { username, ...rest } = user
console.log(rest) //{"address": "peking", "age": 19, "gender": "female"
```

### 组合成新的对象

```js
const first = {
    a: 1,
    b: 2,
    c: 6,
}
const second = {
    c: 3,
    d: 4
}
const total = { ...first, ...second }
console.log(total) // { a: 1, b: 2, c: 3, d: 4 } //重复属性名,右边覆盖左边
```

## export和import
* export用于对外输出本模块（一个文件可以理解为一个模块）变量的接口
* import用于在一个模块中加载另一个含有export接口的模块。
* 也就是说使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件）。
```js
//全部导入
import people from './example'

//有一种特殊情况，即允许你将整个模块当作单一对象进行导入
//该模块的所有导出都会作为对象的属性存在
import * as example from "./example.js"
console.log(example.name)
console.log(example.age)
console.log(example.getName())

//导入部分
import {name, age} from './example'

// 导出默认, 有且只有一个默认
export default App

// 部分导出
export class App extend Component {};
```

* 导入的时候有没有大括号的区别是什么?
1. 当用**export default** people导出时，就用 import people 导入（**不带大括号**）
2. 一个文件里**，有且只能有一个**export default。但可以有多个export。
3. 当用export name 时，就用import { name }导入（**记得带上大括号**）
4. 当一个文件里，既有一个export default people, 又有多个export name 或者 export age时，导入就用 import people, { name, age } 
5. 当一个文件里出现n多个 export 导出很多模块，导入时除了一个一个导入，也可以用import * as example

### 重命名export和import

* 为了解决导出命名冲突的问题，ES6为你提供了重命名的方法解决这个问题
```js
import {flip as flipOmelet} from "eggs.js";  
import {flip as flipHouse} from "real-estate.js";  
```

* 同样，当你在导出的时候也可以重命名。
```js
v1() { ... }  
v2() { ... }  
  
export {  
  v1 as streamV1,  
  v2 as streamV2,  
  v2 as streamLatestVersion  
};
```

### 作为中转模块导出
* 有时候为了避免上层模块导入太多的模块，我们可能使用底层模块作为中转，直接导出另一个模块的内容如下：

```js
//------ myFunc.js ------  
export default function() {...};  
      
//------ lib.js ------  
export * from 'myFunc';  
export function each() {...};  
      
//------ main.js ------  
import myFunc,{ each } from 'lib';  
```