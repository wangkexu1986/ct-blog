---
date: "2019-04-24"
---

## 提炼函数
### 曾用名  提炼函数（Extract Method）
### 反向重构 内联函数

```js
 function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
 
  // print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```


```js
 function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  printDetails(outstanding);
  
  function printDetails(outstanding) {
     console.log(`name: ${invoice.customer}`);
     console.log(`amount: ${outstanding}`);
  }
}
```

### 动机

何时应该把代码放进独立的函数？

* 观点1： 从代码的长度考虑
* 观点2：从代码复用考虑，只要被用过不止一次的代码，就该放进一个函数
* 观点3：作者观点，将意图与实现分开
> 当你需要花时间浏览一段代码才能弄清楚它到底在干什么？那么久应该将其提炼到一个函数中。并命名，通过名字知道它在干什么。
> 一个函数一旦超过6行，就开发散发臭味。
> 有些人担心短函数会有性能问题，短函数可以更容易的被缓存，不用担心。
> 小函数需要好名字，所以应该在命名上花心思。

### 做法

* 创造一个新函数，根据这个函数的意图命名（以它做什么来命名，不要以它怎么做命名。）
* 讲待提炼的代码从源函数复制到新建的目标函数中
* 仔细检查提炼出的代码，看看其中是否引用了作用域限于源函数，在提炼出的新函数中访问不到的变量
* 所有变量都处理完后，编译
* 在源函数中，将被提炼的代码替换成对目标函数的调用
* 测试
* 查看其他代码是否有与被提炼的代码段相同或者相似之处。如果有置换成新函数


### 范例

```js
function printOwing(invoice) {
	let outstanding = 0;

	console.log("***********************");
	console.log("**** Customer Owes ****");
	console.log("***********************");

	// calculate outstanding 
	for (const o of invoice.orders) {
		outstanding += o.amount;
	}

	// record due date
	const today = Clock.today; // 避免使用Date.now(), 导致测试行为的不可预测。
	invoice.dueData = new Data(today.getFullYear(), today.getMonth(), today.getDate() + 30);

	// print details
	console.log(`name: ${invoice.customer}`);
	console.log(`amount: ${outstanding}`);
	console.log(`due: ${invoice.dueData.toLocaleDateString()}`);
}
```

### 重构1： 无局部变量（内联函数）

```js
    printBanner() {
	console.log("***********************");
	console.log("**** Customer Owes ****");
	console.log("***********************");
    }

    printDetails() {
	console.log(`name: ${invoice.customer}`);
	console.log(`amount: ${outstanding}`);
	console.log(`due: ${invoice.dueData.toLocaleDateString()}`);
    }
```

### 重构2: 有局部变量( 新函数)

```js
function printDetails(invoice, outstanding) {
	console.log(`name: ${invoice.customer}`);
	console.log(`amount: ${outstanding}`);
	console.log(`due: ${invoice.dueData.toLocaleDateString()}`);
}

function recordDueDate(invoice) {
	const today = Clock.today;
	invoice.dueData = new Data(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}
```

### 重构3： 对重构变量再赋值

```js
function calculateOutstanding(invoice) {
	let result = 0;
	for (const o of invoice.orders) {
		result += o.amount;
	}
	return result;
}
```

### 结果

```js
function printOwing(invoice) {
	printBanner();
	const outstanding = calculateOutstanding(invoice);
	recordDueDate(invoice);
	printDetails(invoice, outstanding);
}

function printBanner() {
	console.log("***********************");
	console.log("**** Customer Owes ****");
	console.log("***********************");
}

function printDetails(invoice, outstanding) {
	console.log(`name: ${invoice.customer}`);
	console.log(`amount: ${outstanding}`);
	console.log(`due: ${invoice.dueData.toLocaleDateString()}`);
}

function recordDueDate(invoice) {
	const today = Clock.today;
	invoice.dueData = new Data(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function calculateOutstanding(invoice) {
	let result = 0;
	for (const o of invoice.orders) {
		result += o.amount;
	}
	return result;
}
```


## 问题？ 怎么判断函数该返回一个值，还是多个值？

## 内联函数
### 曾用名 内联函数（Inline Method）
### 反向重构： 提炼函数
### 例
```js
function getRating(driver) {
	return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
	return driver.numberOfLateDeliveries > 5
}

function getRating(driver) {
	return (driver.numberOfLateDeliveries > 5) ? 2 : 1;
}
```

### 动机

* 情况1：
简短的函数表现动作意图，这样会使代码更清晰易读。但有时候你会遇到某些函数，其内部代码和函数名称同样清晰易读。此时，你应该去掉这个函数。

* 情况2：
讲一群组织不合理的函数，内联到一个大型函数很中，然后再提炼小函数

### 做法
* 检查函数，确定它不具多态性
> 如果该函数属于一个类，并且有子类继承了这个函数，那么就无法内联

* 找出这个函数的所有调用点
* 将这个函数的所有调用点都替换为函数本体
* 每次替换之后，执行测试
* 删除该删除的定义

### 范例

* 范例1：
```js
// 重构前
function getRating(driver) {
	return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
	return driver.numberOfLateDeliveries > 5
}

// 重构后
function getRating(driver) {
	return (driver.numberOfLateDeliveries > 5) ? 2 : 1;
}
```
直接代码替换


* 范例2：
```js
// 重构前
function getRating(driver) {
	return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(dvr) {
	return dvr.numberOfLateDeliveries > 5
}

// 重构后
function getRating(aDriver) {
	return (aDriver.numberOfLateDeliveries > 5) ? 2 : 1;
}
```
需要修改变量名


## 提炼变量（Extract Variable）
### 曾用名: 引入解释性变量（Introduce Explaining Variable）
### 反向重构：内联变量
```js
return order.quantity * order.itemPrice - 
Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
Math.min(order.quantity * order.itemPrice * 0.1, 100);


const basePrice = order.quantity * order.itemPrice;
const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
const shipping = Math.min(basePrice * 0.1, 100);
return basePrice - quantityDiscount + shipping;

```

### 动机
表达式复杂且难懂的情况下，可以提取局部变量帮助我们理解代码，这样也便于调试

### 做法
* 确认要提炼的表达式没有副作用
* 声明一个不可修改的变量，把你想要提炼的表达式复制一份，以该表达式的结果值给这个变量赋值。
* 用这个新变量取代原来的表达式
* 测试

### 范例

```js
// 重构前
class Order {
	constructor(aRecord) {
		this._data = aRecord;
	}

	get quantity() { return this._data.quantity; }
	get itemPrice() { return this._data.itemPrice; }
	get price() {
		return order.quantity * order.itemPrice - 
			Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
			Math.min(order.quantity * order.itemPrice * 0.1, 100);
	}

}

// 重构后
class Order {
	constructor(aRecord) {
		this._data = aRecord;
	}

	get quantity() { return this._data.quantity; }
	get itemPrice() { return this._data.itemPrice; }
	get price() {
		return this.basePrice - this.quantityDiscount + this.shipping;
	}
	get basePrice() { return this.quantity * this.itemPrice; }
	get quantityDiscount { return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05; }
	get shipping() { return Math.min(this.basePrice * 0.1, 100);}
}
```

## 内联变量（Inline Variable）
### 曾用名: 内联临时变量（Inline Temp）
### 反向重构： 提炼变量
```js
let basePrice = anOrder.basePrice;
return (basePrice > 1000);

return anOrder.basePrice > 1000
```
### 动机
在一个函数内部，变量能给表达式提供有意义的名字，因此通常变量是好东西。但有时候，名字并不比表达式本身具有表现力

### 做法
* 检查确认变量赋值语句的右侧表达式没有副作用
* 如果变量没有被声明为不可修改，先将其变为不可修改，并执行测试
* 找到第一处使用该变量的地方，将其替换为直接使用赋值语句的右侧表达式
* 测试
* 重复前面两步，逐一替换其他素有使用该变量的地方。
* 删除该变量的声明点和赋值语句
* 测试

## 改变函数声明（Change Function Declaration）
### 曾用名：函数改名（Rename Method）
```js
function circum(radius) { ... }

function circumference(radius) {  ... }
```
### 动机
* 很难一次就给函数起个好名，即使名字有点疑惑也先放着。一旦想到好名字，马上替换。
* 函数参数的变化，能增加函数的作用范围

### 做法

1. 简单做法
* 如果想要移除一个参数，需要先确定函数体内没有使用该参数。
* 修改函数声明，使其成为你期望的状态。
* 找出所有使用旧的函数声明的地方，将它们改为使用新的函数声明
* 测试

2. 迁移式做法
* 如果有必要的话，先对函数体内部加以重构，使后面的提炼步骤易于开展。
* 使用提炼函数将函数体提炼成一个新函数
* 如果提炼出的函数需要新增参数，用前面的简单做法添加即可
* 测试
* 对就函数使用内联函数
* 如果新函数使用了临时的名字，再次使用改变函数声明将其改回原来的名字。
* 测试

### 范例 函数改名（简单做法）

```js
function circum(radius) { 
  return 2 * Math.PI * radius;
}

function circumference(radius) { 
  return 2 * Math.PI * radius;
}
```

### 范例 函数改名（迁移式做法）

```js
function circum(radius) { 
  return circumference(radius);
}

function circumference(radius) { 
  return 2 * Math.PI * radius;
}
```

### 范例 添加参数
```js
// 图书管理系统，接受图书的预订
addReservation(customer) {
	this._reservations.push(customer);
}

// 需求，支持高优先级预订

//  1. 先给函数一个临时的变量名
addReservation(customer) {
	this.zz_addReservation(customer);
}

zz_addReservation(customer) {
	this._reservations.push(customer);
}

// 2. 给新函数增加参数
addReservation(customer) {
	this.zz_addReservation(customer, false);
}

zz_addReservation(customer, isPriority) {
	this._reservations.push(customer);
}

// 3. 引入断言？
addReservation(customer) {
	this.zz_addReservation(customer, false);
}

zz_addReservation(customer, isPriority) {
        assert（isPriority === true|| isPriority === false);
	this._reservations.push(customer);
}

// 4. 改回新函数的名字
```

### 范例 把参数改为属性

```js
// 判断一个顾客是不是来自新英格兰
function inNewEngland(aCustomer) {
	return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
}

// 调用
const newEnglanders = someCustomers.filter(c => inNewEngland(c));

```

练习重构？？

<details>
  <summary>重构结果</summary>

```js
// 判断一个顾客是不是来自新英格兰
function inNewEngland(stateCode) {
	return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

// 调用
const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state));

```
</details>


## 封装变量（Encapsulate Variable）
### 曾用名: 自封装字段（Self-Encapsulate Field）
### 曾用名: 封装字段（Encapsulate Field）
```js
let defaultOwner = { firstName: "Martin", lastName: "Fowler"};

let defaultOwnerData = { firstName: "Martin", lastName: "Fowler"};
export function defaultOwner() { return defaultOwnerData; }
export function setDefaultOwner(arg) { defaultOwnerData = arg; }
```
### 动机
想要迁移一处被广泛使用的数据，最好的办法往往是先以函数形式封装所有对该数据的访问。
封装数据，还能监控数据的变化和使用情况。

### 做法
* 创建封装函数，在其中访问和更新变量值
* 执行静态检查
* 逐一修改使用该变量的代码，将其改为调用合适的封装函数。每次替换之后，执行测试。
* 限制变量的可见性
* 测试
* 如果变量值是一个记录，考虑使用封装记录手法

### 范例
```js
// 定义
let defaultOwner = { firstName: "Martin", lastName: "Fowler"};

// 调用
spaceship.owner = defaultOwner;

// 更新
defaultOwner = { firstName: "Rebecca", lastName: "Parsons"};


// 重构
let defaultOwnerData = { firstName: "Martin", lastName: "Fowler"};
export function defaultOwner() { return defaultOwnerData; }
export function setDefaultOwner(arg) { defaultOwnerData = arg; }

spaceship.owner = defaultOwner();
setDefaultOwner({ firstName: "Rebecca", lastName: "Parsons"});
```

### 封装值

前面的手法只封装了对最外层数据的引用。如果想控制对内容的修改。有两个办法。

1. 禁止对数据结构内部的数值做任何修改，
```js
let defaultOwnerData = { firstName: "Martin", lastName: "Fowler"};
export function defaultOwner() { return Object.assign({}, defaultOwnerData); }
export function setDefaultOwner(arg) { defaultOwnerData = arg; }
```

2. 封装记录阻止对数据的修改
```js
let defaultOwnerData = { firstName: "Martin", lastName: "Fowler"};
export function defaultOwner() { return new Person(defaultOwnerData); }
export function setDefaultOwner(arg) { defaultOwnerData = arg; }


class Person {
  constructor(data) {
     this._lastName = data.lastName;
     this._firstName = data.firstName;
  }

  get lastName() { return this._lastName;}
  get firstName() { return this._firstName;}
}
```

## 变量改名 (Rename Variable)
```js
  let a = height * width;
  
  let area = height * width;
```

### 动机
好的命名是整洁编程的核心，使用范围越广，名字的好坏就越重要

### 做法
* 如果变量被广泛使用，考虑运用封装变量将其封装起来。
* 找出所有使用该变量的代码，逐一修改。
* 测试

### 范例

```js
  let tpHd = "untitled";
  result += `<h1>${tpHd}</h1>`;

 //
 tpHd = obj['articleTitle']



// 重构
result += `<h1>${title()}</h1>`
setTitle(obj['articleTitle']);

function title() { return tpHd; }
function setTitle(arg) { return arg; }

```

### 给常量改名

```js
 const cpyNm = "Acme Gooseberries";


const companyName = "Acme Gooseberries";
const cpyNm = companyName;
```

## 引入参数对象(Introduce Parameter Object)
```js
function amountInvoiced(startDate, endDate) {...}
function amountReceived(startDate, endDate) {...}
function amountOverdue(startDate, endDate) {...}


function amountInvoiced(aDateRange) {...}
function amountReceived(aDateRange) {...}
function amountOverdue(aDateRange) {...}

```

### 动机
讲数据组织成结构是一件有价值的事，可以让数据项之间的关系变得明晰。

### 做法
* 如果暂时还没有一个合适的数据结构，就创建一个。
* 测试
* 使用改变函数声明给原来的函数新增一个参数，类型是新建的数据结构
* 测试
* 调整所有调用者，传入新数据结构的适当实例。没修改一处，执行测试。
* 用新数据结构中的每项元素，逐一取代单数列表中与之对应的参数项，然后删除原来的参数。测试。

### 范例
```js
// 检查一组温度数据，是否超出了指定的温度范围。
const station = {
	name: "ZB1",
	readings: [
		{ temp: 47, time: "2016-11-10 09:10" },
		{ temp: 53, time: "2016-11-10 09:20" },
		{ temp: 58, time: "2016-11-10 09:30" },
		{ temp: 53, time: "2016-11-10 09:40" },
		{ temp: 51, time: "2016-11-10 09:50" }
	]
};

function readingOutsideRange(station, min, max) {
	return station.readings.filter(r => r.temp < min || r.temp > max);
}


// 调用
alerts = readingOutsideRange(station, operationPlan.temperatureFlor, operationPlan.temperatureCeling);

// 重构
// 1.  抽象min， max
class NumberRange {
	constructor(min, max) {
		this._data = {min, max};
	}

	get min() { return this._data.min; }
	get max() { return this._data.max; }
}


// 2. 给函数添加新参数
function readingOutsideRange(station, min, max, range) {
	return station.readings.filter(r => r.temp < min || r.temp > max);
}

// 3. 修改调用
alerts = readingOutsideRange(station, operationPlan.temperatureFlor, operationPlan.temperatureCeling, null);


// 4. 替换
const range = new NumberRange(operationPlan.temperatureFlor, operationPlan.temperatureCeling);
alerts = readingOutsideRange(station, operationPlan.temperatureFlor, operationPlan.temperatureCeling, range);


// 5. 修改参数 从max开始
function readingOutsideRange(station, min, range) {
	return station.readings.filter(r => r.temp < min || r.temp > range.max);
}

alerts = readingOutsideRange(station, operationPlan.temperatureFlor, range);

// 6. 修改min
function readingOutsideRange(station, range) {
	return station.readings.filter(r => r.temp < range.min || r.temp > range.max);
}

alerts = readingOutsideRange(station, range);

// 7. 提炼范围函数
class NumberRange {
	constructor(min, max) {
		this._data = {min, max};
	}

	get min() { return this._data.min; }
	get max() { return this._data.max; }
	contains(arg) {
		return (arg >= this.min && arg <= this.max);
	}
}

function readingOutsideRange(station, range) {
	return station.readings.filter(r => range.contains(r.temp);
}
```

## 函数组合成类(Combine Functions into Class)
```js
function base() {...}
function taxableCharge() {...}
function calculateBaseCharge() {...}

class Reading {
	base() {...}
	taxableCharge() {...}
	calculateBaseCharge() {...}
}
```
### 动机
如果发现一组函数形影不离的操作同一块数据，就认为是时候组件一个类了。类能明确的给这些函数提供一个共用的环境，在对象内部调用这些函数，可以减少传递的参数，从而简化函数调用。

### 做法
* 运用封装记录对过个函数共用的数据记录加以封装。
* 对于使用该记录结构的每个函数，运用搬移函数将其移入新类。
* 用以处理该数据记录的逻辑可以用提炼函数提炼出来，并移入新类。

### 范例
```js
// 虚构一种用于向老百姓供给茶水的公共设施。每个月会有软件读取茶水计量器的数据。
reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 };

// 客户端1：
const aReading = acquireReading();
// 基础费用
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity

// 客户端2：
// 超出一定的量，需要缴税
const aReading = acquireReading();
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));


// 客户端3：
// 超出一定的量，需要缴税
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}


// 封装记录
class Reading {
   
   constructor(data) {
   	  this._customer = data.customer;
   	  this._quantity =data.quantity;
   	  this._month = data.month;
   	  this._year = data.year;
   }

   get customer() { return this._customer; }
   get quantity() { return this._quantity; }
   get month() { return this._month; }
   get year() { return this._year; }
}

// 客户端3
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading);
```


搬移函数
```js
class Reading {
   
   constructor(data) {
   	  this._customer = data.customer;
   	  this._quantity =data.quantity;
   	  this._month = data.month;
   	  this._year = data.year;
   }

   get customer() { return this._customer; }
   get quantity() { return this._quantity; }
   get month() { return this._month; }
   get year() { return this._year; }
   get baseCharge() {
   	  return baseRate(this.month, this.year) * this.quantity;
   }
}

// 客户端1
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const baseCharge = aReading.baseCharge;

// 客户端2
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));

// 客户端3
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = aReading.baseCharge;
```


// TODO  思考？







```js
class Reading {
   
   constructor(data) {
   	  this._customer = data.customer;
   	  this._quantity =data.quantity;
   	  this._month = data.month;
   	  this._year = data.year;
   }

   get customer() { return this._customer; }
   get quantity() { return this._quantity; }
   get month() { return this._month; }
   get year() { return this._year; }
   get baseCharge() {
   	  return baseRate(this.month, this.year) * this.quantity;
   }
   get taxableCharge() {
   	  return Math.max(0, this.baseCharge - taxThreshold(this.year));
   }
}
```

## 函数组合成变换（Combine Functions into Transform）

```js
function base(aReading) { ... }
function taxableCharge(aReading) { ... }

function enrichReading(argReading) {
	const aReading = _.cloneDeep(argReading);
	aReading.baseCharge = base(aReading);
	aReading.taxableCharge = taxableCharge(aReading);
	return aReading
}

```

### 动机
计算派生数据的逻辑收拢到移除，便于更新逻辑，避免重复。

### 做法
* 创建一个变换函数，输入参数是需要变换的记录，并直接返回该记录的值。
* 挑选一块逻辑，将其主题移入变换函数中，把结果作为字段添加到输出记录中。修改客户端代码，令其使用这个新字段
* 测试
* 针对其他相关的计算逻辑，重复上述步骤

### 范例

```js
function enrichReading(original) {
	const result = _.cloneDeep(original);
	result.baseCharge = base(original);
	result.taxableCharge = taxableCharge(original);
	return result
}
```


如果代码中会对源数据做更新，那么使用类要好很多；如果使用变换，派生数据会被存储在新做成的记录中，一旦源数据被修改，可能会有数据不一致。
两种手法，根据已有的编程风格来选择。

## 拆分阶段（Split Phase）
```js

const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0]].split("-")[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;


// 重构后
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);

function parseOrder(aString) {
	const values = aString.split(/\s+/);
	return ({
		productID: values[0].split(“-”)[1],
		quantity: parseInt(values[1]),
	});
}


function price(order, priceList) {
	return order.quantity * priceList[order.productID];
}
```

### 动机

同一段代码，在处理两件不同的事时，拆分成各自独立的模块。
### 做法
* 将第二阶段的代码提炼成独立的函数
* 测试
* 引入一个中转数据结构，将其作为参数添加到提炼出的新函数的参数列表中。
* 测试
* 逐一检查提炼出的“第二阶段函数”的每个参数。如果某个参数被第一阶段用到，就将其移入中转数据结构。每次搬移之后都要执行测试。
* 对第一阶段的代码运用提炼函数，让提炼出的函数返回中转数据结构。

### 范例

```js
// 计算单价
function priceOrder(product, quantity, shippingMethod) {
	const basePrice = product.basePrice * quantity;
	const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
	const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
	const shippingCost = quantity * shippingPerCase;
	const price = basePrice - discount + shippingCost;
	return price;
}


// 将第二简短的代码提炼出来（配送）

function priceOrder(product, quantity, shippingMethod) {
	const basePrice = product.basePrice * quantity;
	const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
	const price = applyShipping(basePrice, shippingMethod, quantity, discount);
	return price;
}

function applyShipping(basePrice, shippingMethod, quantity, discount) {
	const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
	const shippingCost = quantity * shippingPerCase;
	const price = basePrice - discount + shippingCost;
	return price;
}

// 引入中转结构
function priceOrder(product, quantity, shippingMethod) {
	const basePrice = product.basePrice * quantity;
	const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
	const priceData = {basePrice, quantity, discount};
	const price = applyShipping(priceData, shippingMethod);
	return price;
}

function applyShipping(priceData, shippingMethod) {
	const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
	const shippingCost = priceData.quantity * shippingPerCase;
	const price = priceData.basePrice - priceData.discount + shippingCost;
	return price;
}

// 提炼第一阶段代码作为独立函数
function priceOrder(product, quantity, shippingMethod) {
    const priceData = calculatePricingData(product, quantity);
	const price = applyShipping(priceData, shippingMethod);
	return price;
}

function calculatePricingData(product, quantity) {
	const basePrice = product.basePrice * quantity;
	const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
	return {basePrice, quantity, discount};
}

function applyShipping(priceData, shippingMethod) {
	const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
	const shippingCost = priceData.quantity * shippingPerCase;
	const price = priceData.basePrice - priceData.discount + shippingCost;
	return price;
}

// 洁癖，删除price变量
function priceOrder(product, quantity, shippingMethod) {
    const priceData = calculatePricingData(product, quantity);
	return applyShipping(priceData, shippingMethod);
}

function calculatePricingData(product, quantity) {
	const basePrice = product.basePrice * quantity;
	const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
	return {basePrice, quantity, discount};
}

function applyShipping(priceData, shippingMethod) {
	const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
	const shippingCost = priceData.quantity * shippingPerCase;
	return priceData.basePrice - priceData.discount + shippingCost;
}
```