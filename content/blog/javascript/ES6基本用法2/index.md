---
title: "ES6基本用法(二)"
date: "2018-06-28"
category: "javascript"
tag: "ES6,基本语法,异步,Promises"
---

ES6基本用法_2
=======

## Promises
### 异步延迟加载函数
* Promises 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
* 简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
* 从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
* Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise对象有以下两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

Promise也有一些缺点。
* 首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
* 其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
* 第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署Promise更好的选择。

```js
setTimeout(function(){
  console.log('Yay!');
}, 1000);
```

```js
//ES6 Promises重写
var wait1000 =  new Promise(function(resolve, reject) {
  setTimeout(resolve, 1000);
}).then(function() {
  console.log('Yay!');
});
or
var wait1000 =  new Promise((resolve, reject)=> {
  setTimeout(resolve, 1000);
}).then(()=> {
  console.log('Yay!');
});
```
* 如果我们有更多的嵌套逻辑在setTimeout()回调函数中，我们将发现更多好处：
```js
setTimeout(function(){
  console.log('Yay!');
  setTimeout(function(){
    console.log('Wheeyee!');
  }, 1000)
}, 1000);
```

```js
//ES6 Promises重写
var wait1000 =  ()=> new Promise((resolve, reject)=> {
    setTimeout(resolve, 1000)
  }
);
wait1000()
    .then(function() {
        console.log('Yay!')
        return wait1000()
    })
    .then(function() {
        console.log('Wheeyee!')
    });
```
* 更多详细的信息关于promise
* http://es6.ruanyifeng.com/#docs/promise
* http://jamesknelson.com/grokking-es6-promises-the-four-functions-you-need-to-avoid-callback-hell/

## Classes
### 类
* 如果你喜欢面向对象编程（OOP），那么你将喜爱这个特性。
* 类的创建和使用真是一件令人头疼的事情在过去的ES5中，因为没有一个关键字class.
* ES6没有用函数, 而是使用原型实现类。我们创建一个类baseModel ，并且在这个类里定义了一个constructor 和一个 getName()方法：
```js
class baseModel {
  constructor(options = {}, data = []) { // class constructor
    this.name = 'Base';
    this.url = 'http://azat.co/api';
    this.data = data;
    this.options = options;
   }
 
    getName() { // class method
        console.log(`Class name: ${this.name}`);
    }
}
```
* 注意我们对options 和data使用了默认参数值。
* 此外方法名也不需要加function关键字，而且冒号(：)也不需要了。
* 另外一个大的区别就是你不需要分配属性this。
* 现在设置一个属性的值，只需简单的在构造函数中分配。

### 继承
* AccountModel 从类baseModel 中而来
```js
class AccountModel extends baseModel {
    constructor(options, data) {
//为了调用父级构造函数，可以毫不费力的唤起super()用参数传递：
    super({private: true}, ['32113123123', '524214691']); //call the parent method with super
    this.name = 'Account Model';
    this.url +='/accounts/';
   }

   get accountsData() { //calculated attribute getter
   // 设置accountData 属性
   return this.data;
   }
}
//调用 结果?
let accounts = new AccountModel(5);
accounts.getName();
console.log('Data is %s', accounts.accountsData); 
```


## Modules
### 模块
* 在ES6以前JavaScript并不支持本地的模块。人们想出了AMD，RequireJS，CommonJS以及其它解决方法。
* 现在ES6中可以用模块import 和export 操作了。
```js
//在ES5中,module.js有port变量和getAccounts 方法:
module.exports = {
  port: 3000,
  getAccounts: function() {
    ...
  }
}

//main.js需要依赖require(‘module’) 导入module.js：
var service = require('module.js');
console.log(service.port); // 3000

```
* 在ES6中，我们将用export and import模块。
```js
//用ES6 写的module.js文件库：
export var port = 3000;
export function getAccounts(url) {
  ...
}

//导入到文件main.js中，我们需用import {name} from ‘my-module’语法
import {port, getAccounts} from 'module';
console.log(port); // 3000

//或者我们可以在main.js中把整个模块导入, 并命名为 service：
import * as service from 'module';
console.log(service.port); // 3000
```

## ES7
### Array.prototype.includes
替代indexOf，用来检查数组中是否存在值
```js
let arr = ['react', 'angular', 'vue'];
// WRONG 
if (arr.indexOf('react')) {       // 0 -> evaluates to false, definitely as we expected 
    console.log('Can use React'); // this line would never be executed 
}
 
// Correct 
if (arr.indexOf('react') !== -1) { 
console.log('Can use React'); 
}

```
在ES7中使用includes代码如下:
```js
let arr = ['react', 'angular', 'vue']

// Correct
if (arr.includes('react')) {
  console.log('Can use React')
}

```
还能在字符串中使用includes:
```js
let str = 'React Quickly'

// Correct
if (str.toLowerCase().includes('react')) {  // true
  console.log('Found "react"')  
}
```
许多JavaScript库已经实现includes或类似功能contains
1. jQuery: $.inArray
2. Underscore.js: _.contains
3. Lodash: _.includes 

Array.prototype.includes特点:
* 增强了可读性语义化，实际上给开发者返回布尔值，而不是匹配的位置。
* includes也可以在NaN(非数字)使用。
* includes第二可选参数fromIndex，这对于优化是有好处的，因为它允许从特定位置开始寻找匹配。
```js
console.log([1, 2, 3].includes(2)) // === true) 
console.log([1, 2, 3].includes(4)) // === false) 
console.log([1, 2, NaN].includes(NaN)) // === true) 
console.log([1, 2, -0].includes(+0)) // === true) 
console.log([1, 2, +0].includes(-0)) // === true) 
console.log(['a', 'b', 'c'].includes('a')) // === true) 
console.log(['a', 'b', 'c'].includes('a', 1)) // === false)
```

### Exponentiation Operator(求幂运算)
* 求幂运算大多数是为开发者做一些数学计算，对于3D，VR，SVG还有数据可视化非常有用。
* 在ES6或者早些版本，你不得不创建一个循环，创建一个递归函数或者使用Math.pow,
* 如果你忘记了什么是指数,当你有相同数字（基数）自相相乘多次（指数）。例如，7的3次方是7*7*7
```js
//在ES6，你能使用Math.pow创建一个短的递归箭头函数
calculateExponent = (base, exponent) => base*((--exponent>1)?calculateExponent(base, exponent):base) console.log(calculateExponent(7,12) === Math.pow(7,12)) // true 
console.log(calculateExponent(2,7) === Math.pow(2,7)) // true

```
在ES7，以数学向导的开发者可以使用更短的语法:
```js
let a = 7 ** 12
let b = 2 ** 7
console.log(a === Math.pow(7,12)) // true
console.log(b === Math.pow(2,7)) // true
```
开发者还可以操作结果:
```js
let a = 7
a **= 12
let b = 2
b **= 7
console.log(a === Math.pow(7,12)) // true
console.log(b === Math.pow(2,7)) // true
```
许多ES新特性是从其他语言模仿而来的。指数运算符在其他语言的存在形式：
* Python: x ** y
* CoffeeScript: x ** y
* Ruby: x ** y
* Perl: x ** y 

## ES8
### 字符填充函数padStart 和 padEnd
* 该函数能够通过填充字符串的首部或者尾部来保证字符串达到固定的长度；
* 开发者可以指定填充的字符串或者使用默认的空格;
函数的声明如下：
```js
//函数的首个参数为目标长度，即最终生成的字符串长度；
//第二个参数即是指定的填充字符串
str.padStart(targetLength [, padString])    // 在开始部位填充
str.padEnd(targetLength [, padString])      // 从字符串的尾端右边开始填充
```
使用空格创建列：
```js
console.log('react'.padStart(10).length)         // "       react" is 10
console.log('backbone'.padStart(10).length)         // "  backbone" is 10
```
它对于财务方面非常有用：
```js
console.log('0.00'.padStart(20))            
console.log('10,000.00'.padStart(20))    
console.log('250,000.00'.padStart(20))    
```
这结果作为一个会计总账格式非常漂亮：
```js
                0.00
           10,000.00
          250,000.00
```

```js
// 其他字符填充
console.log('react'.padStart(10, '_'))         // "_____react"
console.log('backbone'.padStart(10, '*'))         // "**backbone"

//第二个参数，你能实际上用一个任何长度的字符串。
console.log('react'.padEnd(10, ':-)'))         // "react:-):-" is 10 
console.log('backbone'.padEnd(10, '*'))         // "backbone**" is 10
```

### 对象值遍历Object.values/Object.entries
* Object.values 函数会返回指定对象的可迭代的属性值数组，数组中值顺序与 for-in 循环保持一致
* Object.values 和Object.keys类似，返回数组类型，其序号和Object.keys序号对应

函数的声明为：
```js
Object.values(obj)  //参数obj可以为某个对象或者数组（数组可以看做键为下标的对象）
```

```js
const obj = { x: 'xxx', y: 1 };
Object.values(obj);             // ['xxx', 1]

const obj = ['e', 's', '8'];    // same as { 0: 'e', 1: 's', 2: '8' };
Object.values(obj);             // ['e', 's', '8']

// when we use numeric keys, the values returned in a numerical 
// order according to the keys
const obj = { 10: 'xxx', 1: 'yyy', 3: 'zzz' };
Object.values(obj);            // ['yyy', 'zzz', 'xxx']
Object.values('es8');          // ['e', 's', '8']
```
* Object.entries 方法则会将某个对象的可迭代属性与值按照二维数组的方式返回
* key-value对数组（作为一个数组），他们（key-value）分别以数组存放数组中。
* Object.entries 数组中顺序与 Object.values 保持一致

```js
const obj = { x: 'xxx', y: 1 };
Object.entries(obj); // [['x', 'xxx'], ['y', 1]]

const obj = ['e', 's', '8'];
Object.entries(obj); // [['0', 'e'], ['1', 's'], ['2', '8']]

const obj = { 10: 'xxx', 1: 'yyy', 3: 'zzz' };
Object.entries(obj); // [['1', 'yyy'], ['3', 'zzz'], ['10': 'xxx']]
Object.entries('es8'); // [['0', 'e'], ['1', 's'], ['2', '8']]
```

猜一猜，我们同样使用ES6for/of（毕竟全部都是数组）遍历Object.entries返回来的结果值。
```js
let obj = {a: 1, b: 2, c: 3}
for (let [key, value] of Object.entries(obj)) {
  console.log(`${key} is ${value}`)
}
//结果?
```

### 对象的属性描述符获取
**Object.getOwnPropertyDescriptors**
* getOwnPropertyDescriptors 函数会返回指定对象的某个指定属性的描述符；
* 该属性必须是对象自己定义而不是继承自原型链

函数的声明为：
```js
Object.getOwnPropertyDescriptor(obj, prop)
```
obj 即为源对象，而 prop 即为需要查看的属性名；结果中包含的键可能有 configurable、enumerable、writable、get、set 以及 value。

```js
let azatsBooks = { 
  books: ['React Quickly'], 
  get latest () { 
    let numberOfBooks = this.books.length 
    if (numberOfBooks == 0) return undefined 
    return this.books[numberOfBooks - 1] 
  } 
}
```
数据描述符books由Object.getOwnPropertyDescriptor(azatsBooks, 'books')产生结果如下：
```js
Object
    configurable: true
    enumerable: true
    value: Array[1]
    writable: true
    __proto__: Object
```
Object.getOwnPropertyDescriptor(azatsBooks, 'latest')将会展现latest的描述符，这个latest（get）存取器描述符展现如下：
```js
Object
    configurable: true
    numerable: true
    get: latest()
    set: undefined
    __proto__: Object
```
现在我们调用新方法获取所有的描述符：
```js
console.log(Object.getOwnPropertyDescriptors(azatsBooks))
```
它会给出这个对象两个描述符books和latest：
```js
Object 
  books: Object 
    configurable: true 
    enumerable: true 
    value: Array[1] 
    writable: true 
    __proto__: Object 
  latest: Object 
    configurable: true 
    enumerable: true 
    get: latest() 
    set: undefined 
    __proto__: Object 
  __proto__: Object

```
### 函数参数列表和调用中的尾逗号
* 尾逗号在函数定义中只是一个纯粹语法变化
* 该特性允许我们在定义或者调用函数时添加尾部逗号而不报错：

在ES5中，将会非法语法，在函数参数后面应该是没有逗号的：
```js
var f = function(a,
  b,
  c,
  d) { // NO COMMA!
  // ...
  console.log(d)
}
f(1,2,3,'this')
```

在ES8中，这种尾逗号是没有问题的：
```js
var f = function(a,
  b,
  c,
  d,
) { // COMMA? OK!
  // ...
  console.log(d)
}
f(1,2,3,'this')
```

现在，函数中尾逗号是向数组（ES3）中和字面量对象（ES5）中尾逗号看齐。
```js
var arr = [1,  // Length == 3
  2,
  3,
]  // <--- ok
let obj = {a: 1,  // Only 3 properties
  b: 2,
  c: 3,
}  // <--- ok
```

现在你可以到处使用逗号，甚至最后参数都可以啦。

### 异步函数
* 异步函数（或者async/await）特性操作是Promise最重要的功能。
* 在ES8，异步函数是那么给力。开发者定义一个asyc函数里面不包含或者包含await 基于Promise异步操作。
* 在这引擎之下一个异步函数返回一个Promise，无论如何你在任何地方不会看到这样的一个词

在ES6中我们可以使用Promise，Axios库向GraphQL服务器发送一个请求：
```js
axios.get(`/q?query=${query}`) 
  .then(response => response.data) 
  .then(data => { 
    this.props.processfetchedData(data) // Defined somewhere else 
  }) 
  .catch(error => console.log(error))

```
任何一个Promise库都能兼容新的异步函数，我们可以使用同步try/catch做错误处理。
```js
async fetchData(url) => { 
  try { 
    const response = await axios.get(`/q?query=${query}`);
    const data = response.data; 
    this.props.processfetchedData(data); 
  } catch (error) { 
    console.log(error); 
  } 
}

```
异步函数返回一个Promise，所以我们像下面可以继续执行流程:
```js
async fetchData(query) => { 
  try { 
    const response = await axios.get(`/q?query=${query}`) 
    const data = response.data 
    return data 
  } catch (error) { 
    console.log(error) 
  } 
} 
fetchData(query).then(data => { 
  this.props.processfetchedData(data) 
})

```
```js
let axios = { // mocks 
  get: function(x) { 
  return new Promise(resolve => { 
    setTimeout(() => { 
      resolve({data: x}) 
    }, 2000) 
  }) 
}} 
let query = 'mangos' 
async function fetchData(query) { 
  try { 
    const response = await axios.get(`/q?query=${query}`) 
    const data = response.data 
    return data 
  } catch (error) { 
    console.log(error) 
  } 
} 
fetchData(query).then(data => { 
  console.log(data) // Got data 2s later... Can use data! 
})

```
有了 async/await,我们的代码执行异步看起来像执行同步一样。