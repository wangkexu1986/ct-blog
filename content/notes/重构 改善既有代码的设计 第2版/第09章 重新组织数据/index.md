---
date: "2019-05-13"
---

## 拆分变量（Split Variable）
```js
let temp = 2 * (height + width);
console.log(temp);
temp = height * width;
console.log(temp);


const perimeter = 2 * (height + width);
console.log(perimeter);
const area = height * width;
console.log(area);
```
### 动机
变量被对此赋值的情况，
1. 循环变量，每次运行都会改变值
2. 结果收集变量，负责将某个函数的运算结果的值保留下来。
### 做法
* 在待分解变量的声明以及第一次被赋值处，修改其名称。
* 如果可能的话，将新的变量声明为不可修改。
* 以该变量的第二次赋值动作为界，修改此前对该变量的所有引用，让它们引用新变量。
* 测试
* 重读上述过程，修改下一个变量
### 范例
```js
function distanceTravelled(scenario, time) {
	let result;
	let acc = scenario.primaryForce / scenario.mass;
	let primaryTime = Math.min(time, scenario.delay);
	result = 0.5 * acc * primaryTime * primaryTime;
	let secondaryTime = time - scenario.delay;
	if (secondaryTime > 0) {
		let primaryVelocity = acc * scenario.delay;
		acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
		result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
	}

	return result;
}

// 重构后
function distanceTravelled(scenario, time) {
	let result;
	const primaryAcceleration = scenario.primaryForce / scenario.mass;
	let primaryTime = Math.min(time, scenario.delay);
	result = 0.5 * primaryAcceleration * primaryTime * primaryTime;
	let secondaryTime = time - scenario.delay;
	if (secondaryTime > 0) {
		let primaryVelocity = primaryAcceleration * scenario.delay;
		let acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
		result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
	}

	return result;
}
```

### 范例：对输入参数赋值
```js
function discount(inputValue, quantity) {
	if(inputValue > 50) inputValue = inputValue - 2;
	if(quantity > 100) inputValue = inputValue - 1;
	return inputValue;
}

// 重构后
function discount(inputValue, quantity) {
	let result = inputValue;
	if(inputValue > 50) result = result - 2;
	if(quantity > 100) result = result - 1;
	return result;
}
```

## 字段改名（Rename Field）
```js
class Organization {
	get name() {...}
}


class Organization {
	get title() {...}
}
```

### 动机
记录结构的命名格外重要，开发过程中，修改的可能性高
### 做法
* 如果记录的作用域较小，可以直接修改所有该字段的代码，然后测试。后面的步骤就不需要了
* 如果记录还未封装，请先封装记录。
* 在对象内对私有字段改名，修改内部访问该字段的函数
* 测试
* 如果构造函数的参数用了旧的字段名，运用改变函数声明将其改名
* 运用函数改名给访问函数改名
### 范例： 给字段改名
```js
const organization = { name: "Acme Gooseberries", country: "GB"};

// 1. 封装记录
class Organization {
	constructor(data) {
		this._name = data.name;
		this._country = data.country;
	}

	get name() { return this._name; }
	set name(aString) { this._name = aString; }
	get country() { return this._country; }
	set country(aCountryCode) { this._country = aCountryCode; }
}

const organization = new Organization({name: "Acme Gooseberries", country: "GB"});

// 2. 改name为title
class Organization {
	constructor(data) {
		this._title = data.title;
		this._country = data.country;
	}

	get title() { return this._title; }
	set title(aString) { this._title = aString; }
	get country() { return this._country; }
	set country(aCountryCode) { this._country = aCountryCode; }
}

const organization = new Organization({title: "Acme Gooseberries", country: "GB"});

```

## 以查询取代派生变量（Replace Derived Variable with Query）
```js
get discountedTotal() { return this._discountedTotal; }
set discount(aNumber) {
	const old = this._discount;
	this._discount = aNumber;
	this._discountedTotal += old - aNumber;
}


get discountedTotal() { return this._baseTotal - this._discount; }
set discount(aNumber) { this.discount = aNumber; }

```
### 动机
可变数据是软件中最大的错误源头之一。对数据的修改常常导致代码的各个部分以丑陋的形式互相耦合：在一处修改数据，却在另一处造成难以发现的破坏。
作者强烈建议：尽量把可变数据的作用域限制在最小范围。

### 做法
* 识别出所有对变量做更新的地方。如果必要，要拆分变量分割各个更新点
* 新建一个函数，用于计算该变量的值
* 用引入断言断言该变量和计算函数始终给出同样的值。
* 测试
* 修改读取该变量的代码，令其调用新建的函数。
* 测试
* 用移除死代码去掉变量的声明和赋值。

### 范例

下面的例子虽小，却完美展示了代码的丑陋。
```js
class ProductionPlan {
	get production() { return this._production; }
	applyAdjustment(anAdjustment) {
		this._adjustments.push(anAdjustment);
		this._production += anAdjustment.amount;
	}
}

(作者的话：丑与不丑，全在观者。我看到的丑陋之处是重复，不是常见的代码重复，而是数据的重复)

// 重构后
class ProductionPlan {
	get production() { return this._adjustments.reduce((sum, a) => sum + a.amount, 0); }
	applyAdjustment(anAdjustment) {
		this._adjustments.push(anAdjustment);
	}
}
```

## 将引用对象改为值对象（Change Reference to Value）
```js
class Product {
	applyDiscount(arg) { this._price.amount -= arg; }
}


class Product {
	applyDiscount(arg) {
		this._price = new Money(this._price.amount - arg, this._price.currency);
	}
}
```
### 动机

在把一个对象嵌入另一个对象时，位于内部的这个对象可以被视为引用对象，也可以被视为值对象。
两者最明显的差异在于如何更新内部对象的属性：如果将内部对象视为引用对象，在更新其属性时，我会保留原对象不动，更新内部对象的属性；如果将其视为值对象时，我就会替换整个内部对象，新换上的对象会有我想要的属性值。

如果我想在几个对象之间共享一个对象，以便几个对象都能看见对共享对象的修改，那么这个共享的对象就应该是引用。

### 做法
* 检查重构目标是否为不可变对象，或者是否可修改为不可变对象。
* 用移除设值函数逐一去掉所有设值函数。
* 提供一个基于值的相等性判断函数，在其中使用值对象的字段。

### 范例
```js
class Person {
	constructor() {
		this._telephoneNumber = new TelephoneNumber();
	}

	get officeAreaCode() { return this._telephoneNumber.areaCode; }
	set officeAreaCode(arg) { this._telephoneNumber.areaCode = arg; }
	get officeNumber() { return this._telephoneNumber.number; }
	set officeNumber(arg) { this._telephoneNumber.number = arg; }
}

class TelephoneNumber {
	get areaCode { return this._areaCode; }
	set areaCode(arg) { this._areaCode = arg; }
	get number() { return this._number; }
	set number(arg) { this._number = arg; }
}


// 修改TelephoneNumber为不可变对象
class Person {
	get officeAreaCode() { return this._telephoneNumber.areaCode; }
	set officeAreaCode(arg) { this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber); }
	get officeNumber() { return this._telephoneNumber.number; }
	set officeNumber(arg) { this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg); }
}


class TelephoneNumber {
	constructor(areaCode, number) {
		this._areaCode = areaCode;
		this._number = number;
	}
}
```

## 将值对象改为引用对象（Change Value to Reference）
```js
let customer = new Customer(customerData);

let customer = customerRepository.get(customerData.id);
```
### 动机
### 做法
* 为相关对象创建一个仓库
* 确保构造函数有办法找到关联对象的正确实例
* 修改宿主对象的构造函数，令其从仓库中获取关联对象。每次修改后执行测试。
### 范例
```js
class Order {
	constructor(data) {
		this._number = data.number;
		this._customer = new Customer(data.customer);
	}

	get customer() { return this._customer; }
}

class Customer {
	constructor(id) {
		this._id = id;
	}

	get id() { return this._id; }
}

创建的customer是值对象，如果有5个订单都属于id为123的顾客，就会有5个各自独立的customer对象。对其中一个所做的修改，不会反映在其他几个对象上。

class Order {
	constructor(data) {
		this._number = data.number;
		this._customer = registerCustomer(data.customer);
	}

	get customer() { return this._customer; }
}

let _repositoryData;

export function initialize() {
	_repositoryData = {};
	_repositoryData.customers = new Map();
}

export function registerCustomer(id) {
	if(!_repositoryData.customers.has(id)) {
		_repositoryData.customers.set(id, new Customer(id));
	}
	return findCustomer(id);
}


export function findCustomer(id) {
	return _repositoryData.customers.get(id);
}

```