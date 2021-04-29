---
date: "2019-05-14"
---
## 将查询函数和修改函数分离(Separate Query from Modifier)
```js
function getTotalOutstandingAndSendBill() {
	const result = customer.invoices.reduce((total, each) => each.amount + total, 0);
	sendBill();
	return result;
}


function totalOutstanding() {
	return customer.invoices.reduce((total, each) => each.amount + total, 0);
}

function sendBill() {
	emailGateway.send(formatBill(customer));
}
```
### 动机
无副作用：无副作用函数，是指那些不使用类的成员，不使用全局变量变化的函数。
有副作用：

任何有返回值的函数，都不应该有看的到的副作用

### 做法
* 复制整个函数，将其作为一个查询来命名
* 从新建的查询函数中去掉所有造成副作用的语句
* 执行静态检查
* 查找所有调用原函数地方，将其修改为新建的查询函数。每次修改之后都要测试
* 从原函数中去掉返回值
* 测试

### 范例
```js
function alertForMiscreant(people) {
	for (const p of people) {
		if(p === "Don") {
			setOffAlarms();
			return "Don";
		}

		if(p === "John") {
			setOffAlarms();
			return "John"
		}
	}
	return ""
}

// 1. 复制整个函数， 以查询来命名
function findMiscreant(people) {
	for (const p of people) {
		if(p === "Don") {
			setOffAlarms();
			return "Don";
		}

		if(p === "John") {
			setOffAlarms();
			return "John"
		}
	}
	return ""
}

// 2. 在新建的查询函数中去掉副作用
function findMiscreant(people) {
	for (const p of people) {
		if(p === "Don") {
			// setOffAlarms();
			return "Don";
		}

		if(p === "John") {
			// setOffAlarms();
			return "John"
		}
	}
	return ""
}

// 3. 修改原来的调用者，
const found = alertForMiscreant(people);

const found = findMiscreant(people);
alertForMiscreant(people);

// 4. 删除返回值
function alertForMiscreant(people) {
	for (const p of people) {
		if(p === "Don") {
			setOffAlarms();
			return;
		}

		if(p === "John") {
			setOffAlarms();
			return;
		}
	}
	return;
}

// 5. 删除重复代码
function alertForMiscreant(people) {
	if(findMiscreant(people) !== "") setOffAlarms();
}
```

## 函数参数化(Parameterize Function)
```js
function tenPercentRaise(aPerson) {
	aPerson.salary = aPerson.salary.multiply(1.1);
}

function fivePercentRaise(aPerson) {
	aPerson.salary = aPerson.salary.multiply(1.05);
}


function raise(aPerson, factor) {
	aPerson.salary = aPerson.salary.multiply(1 + factor);
}
```
### 动机
如果发现两个函数逻辑非常相似，只有一些字面量不同，可以将其合并成一个函数，以参数的形式传入不同的值，从而消除重复。

### 做法
* 从一组相似的函数中选择一个
* 运用改变函数声明，把需要作为参数传入的字面量添加到参数列表中
* 修改该函数所有的调用处，使其在调用时传入该字面量值
* 测试
* 修改函数体，令其使用新传入的参数。每使用一个新参数都要测试
* 对于其他与之相似的函数，注意将其调用处改为调用已经参数化的函数。每次修改后都要测试。

### 范例
```js
function baseCharge(usage) {
	if(usage < 0) return usd(0);
	const amount = bottomBand(usage) * 0.03
	+ middleBand(usage) * 0.05
	+ topBand(usage) * 0.07;
	return usd(amount);
}

function bottomBand(usage) {
	return Math.min(usage, 100);
}

function middleBand(usage) {
	rturn usage > 100 ? Math.min(usage, 200) - 100 : 0;
}

function topBand(usage) {
	return usage > 200 ? usage - 200 : 0;
}

// 重构后
function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}


function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

function baseCharge(usage) {
	if(usage < 0) return usd(0);
	const amount = withinBand(usage, 0, 100) * 0.03
	+ withinBand(usage, 100, 200) * 0.05
	+ withinBand(usage, 200, Infinity) * 0.07;
	return usd(amount);
}
```

## 移除标记参数(Remove Flag Argument)

```js

function setDimension(name, value) {
	if(name === "height") {
		this._height = value;
		return;
	}

	if(name === "width") {
		this._width = value;
		return;
	}
}

function setHeight(value) { this._height = value; }
function setWidth(value) { this._width = value; }

```
### 动机


### 做法
* 针对参数的每一种可能值，新建一个明确函数
* 对于”用字面量值作为参数“的函数调用者，将其改为调用新建的明确函数

### 范例
```js
aShipment.deliveryDate = deliveryDate(anOrder, true);
aShipment.deliveryDate = deliveryDate(anOrder, false);

function deliveryDate(anOrder, isRush) {
	if(isRush) {
		let deliveryTime;
		if(["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
		else if(["NY", "NH"].includes(anOrder.deliveryState)) deliveryState = 2;
		else deliveryTime = 3;
		return anOrder.placedOn.plusDays(1 + deliveryTime);
	} else {
		let deliveryTime;
		if(["MA", "CT", "NY"].includes(anOrder.deliveryState)) deliveryTime = 2;
		else if(["ME", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
		else deliveryTime = 4;
		return anOrder.placedOn.plusDays(2 + deliveryTime);
	}
}

// 重构后：

aShipment.deliveryDate = rushDeliveryDate(anOrder);
aShipment.deliveryDate = regularDeliveryDate(anOrder);

function rushDeliveryDate(anOrder) {
	let deliveryTime;
	if(["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
	else if(["NY", "NH"].includes(anOrder.deliveryState)) deliveryState = 2;
	else deliveryTime = 3;
	return anOrder.placedOn.plusDays(1 + deliveryTime);
}

function regularDeliveryDate(anOrder) {
	let deliveryTime;
	if(["MA", "CT", "NY"].includes(anOrder.deliveryState)) deliveryTime = 2;
	else if(["ME", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
	else deliveryTime = 4;
	return anOrder.placedOn.plusDays(2 + deliveryTime);
}
```
## 保持对象完整(Preserve Whole Object)
```js
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if(aPlan.withinRange(low, high))


if(aPlan.withinRange(aRoom.daysTempRange))
```
### 动机
### 做法
* 新建一个空函数，给它以期望中的参数列表
* 在新函数体内调用旧函数，并把新的参数映射到旧的参数列表
* 执行静态检查
* 逐一修改就函数的调用者，令其使用新函数，每次修改之后执行测试
* 所有调用者处都修改过来之后，使用内联函数把旧函数内联到新函数体内
* 给新函数改名，从重构开始时的容易搜索的临时名字，改为使用旧函数的名字，同时修改所有调用者

### 范例
我们想象一个室温监控系统，它负责记录房间一天中的最高温度和最低温度，然后将实际的温度范围与预先规定的温度控制计划相比较，如果当天温度不符合计划要求，就发出警告。

```js
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if(!aPlan.withinRange(low, high))
	alerts.push("room temperature went outside range");


class HeatingPlan {
	withinRange(bottom, top) {
		return (bottom >= this._temperatureRange.low) && (top <= this._temperatureRange.high);
	}
}

// 重构后

if(!aPlan.withinRange(aRoom.daysTempRange))
	alerts.push("room temperature went outside range");


class HeatingPlan {
	withinRange(aNumberRange) {
		return (aNumberRange.low >= this._temperatureRange.low) && (aNumberRange.high <= this._temperatureRange.high);
	}
}
```

## 以查询取代参数(Replace Parameter with Query)
```js

availableVacation(anEmployee, anEmployee.grade);

function availableVacation(anEmployee, grade) {
	// calculate vacation...
}



availableVacation(anEmployee)

function availableVacation(anEmployee) {
	const grade = anEmployee.grade;
	// calculate vacation...
}
```
### 动机
### 做法
* 如果有必要，使用提炼函数将参数的计算过程提炼到一个独立的函数中
* 将函数体内引用该参数的地方改为调用新建的函数。每次修改后执行测试
* 全部替换完成后，使用改变函数声明将该参数去掉

### 范例
```js
class Order {
	get finalPrice() {
		const basePrice = this.quantity * this.itemPrice;
		let discountLevel;
		if(this.quantity > 100) discountLevel = 2;
		else discountLevel = 1;
		return this.discountedPrice(basePrice, discountLevel);
	}

	discountedPrice(basePrice, discountLevel) {
		switch(discountLevel) {
			case 1: return basePrice * 0.95;
			case 2: return basePrice * 0.9;
		}
	}
}

// 重构后
class Order {
	get finalPrice() {
		const basePrice = this.quantity * this.itemPrice;
		return this.discountedPrice(basePrice, this.discountLevel);
	}

	get discountLevel() {
		return this.quantity > 100 ? 2 : 1;
	}

	discountedPrice(basePrice) {
		switch(this.discountLevel) {
			case 1: return basePrice * 0.95;
			case 2: return basePrice * 0.9;
		}
	}
}

```

## 以参数取代查询(Replace Query with Parameter)
```js
targetTemperature(aPlan)

function targetTemperature(aPlan) {
	currentTemperature = thermostat.currentTemperature;
	// rest of function...
}



targetTemperature(aPlan, thermostat.currentTemperature)

function targetTemperature(aPlan, currentTemperature) {
	// rest of function
}

```
### 动机
### 做法
### 范例

## 移除设值函数(Remove Setting Method)
class Person {
	get name() {...}
	set name(aString) {...}
}


class Person {
	get name() {...}
}
### 动机
如果不希望咱对象创建之后此字段还有机会被改变，那就不要为它提供设值函数。

### 做法
### 范例
```js

class Person {
	get name() { return this._name; }
	set name(arg) { this._name = arg; }
	get id() { return this._id; }
	set id(arg) { this._id = arg; }
}


const martin = new Person();
martin.name = "martin";
martin.id = "1234";

// 重构后
class Person {
	constructor(id) {
		this.id = id;
	}
	get name() { return this._name; }
	set name(arg) { this._name = arg; }
	get id() { return this._id; }

}


const martin = new Person("1234");
martin.name = "martin";
```

## 以工厂函数取代构造函数(Replace Constructor with Factory Function)
```js
leadEngineer = new Employee(document.leadEngineer, 'E');



leadEngineer = createEngineer(document.leadEngineer);
```
### 动机
无法根据环境或参数信息返回子类实例或代理对象；构造函数的名字是固定的，因此无法使用默认名字更清晰的函数名；构造函数需要通过特殊的操作符来调用，所以在要求普通函数的场合就难以使用。工厂函数不受这些限制。

### 做法
* 创建一个工厂函数，让它调用现有的构造函数
* 将调用构造函数的代码改为调用工厂函数
* 每修改一处，就执行测试
* 尽量缩小构造函数的可见范围
### 范例
```js

class Employee {
	constructor(name, typeCode) {
		this._name = name;
		this._typeCode = typeCode;
	}

	get name() { return this._name; }
	get type() {
		return Employee.legalTypeCodes[this._typeCode];
	}
	static get legalTypeCodes() {
		return ["E": "Engineer", "M": "Manager", "S": "Salesman"];
	}
}

// 调用方
candidate = new Employee(document.name, document.empType);

// 重构第一步，创建工厂函数，把创建对象的责任之直接委托给构造函数
function createEmployee(name, typeCode) {
	return new Employee(name, typeCode);
}


// 调用方
candidate = createEmployee(document.name, document.empType);
```

## 以命令取代函数(Replace Function with Command)
```js
function score(candidate, medicalExam, scoringGuide) {
	let result = 0;
	let healthLevel = 0;
	// long body code
}

class Scorer {
	constructor(candidate, medicalExam, scoringGuide) {
		this._candidate = candidate;
		this._medicalExam = medicalExam;
		this._scoringGuide = scoringGuide;
	}

	execute() {
		this._result = 0;
		this._healthLevel = 0;
		// long body code
	}
}
```
### 动机
将函数封装成自己的对象，有时也是一种有用的办法。这样的对象我称之为”命令对象“，或”命令“。
这种对象大多只服务于单一函数。
于普通函数相比，命令对象提供了更大的控制灵活性和更强的表达能力。除了函数调用本身，命令对象还可以支持附加的操作，例如撤销操作。

### 做法
* 为想要包装的函数创建一个空的类，更具该函数的名字为其命令
* 使用搬移函数把函数移到空的类里
* 可以考虑给每个参数创建一个字段，并在构造函数中添加对应的参数。

### 范例
```js
// 每次搬移一个参数到构造函数
function score(candidate, medicalExam, scoringGuide) {
	return new Scorer(candidate).execute(medicalExam, scoringGuide);
}

class Scorer {
	constructor(candidate) {
		this._candidate = candidate;
	}

	execute(medicalExam, scoringGuide) {
		let result = 0;
		let healthLevel = 0;
		let highMedicalRiskFlag = false;

		if(medicalExam.isSmoker) {
			healthLevel += 10;
			highMedicalRiskFlag = true;
		}

		let certificationGrade = "regular";
		if(scoringGuide.stateWithLowCertification(this._candidate.originState)) {
			certificationGrade = "low";
			result -=5;
		}

		// lots more code like this
		result -= Math.max(healthLevel - 5, 0);
		return result;
	}
}

// 继续处理其他参数
function score(candidate, medicalExam, scoringGuide) {
	return new Scorer(candidate, medicalExam, scoringGuide).execute();
}

class Scorer {
	constructor(candidate, medicalExam, scoringGuide) {
		this._candidate = canndidate;
		this._medicalExam = medicalExam;
		this._scoringGuide = scoringGuide;
	}

	execute() {
		this._result = 0;
		let healthLevel = 0;
		let highMedicalRiskFlag = false;

		if(this._medicalExam.isSmoker) {
			healthLevel += 10;
			highMedicalRiskFlag = true;
		}

		let certificationGrade = "regular";
		if(this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
			certificationGrade = "low";
			this.result -=5;
		}

		// lots more code like this
		this._result -= Math.max(healthLevel - 5, 0);
		return this._result;
	}
}

// 接着提炼函数

```

## 以函数取代命令(Replace Command with Function)
```js
class ChargeCalculator {
	constructor(customer, usage) {
		this._customer = customer;
		this._usage = usage;
	}

	execute() {
		return this._customer.rate * this._usage;
	}
}


function charge(customer, usage) {
	return customer.rate * usage;
}
```
### 动机
函数不复杂时，有时候只想调用一个函数，
### 做法
### 范例
```js
class ChargeCalculator {
	constructor(customer, usage) {
		this._customer = customer;
		this._usage = usage;
	}

	get baseCharge() {
		return this._customer.baseRate * this._usage;
	}

	get charge() {
		return this.baseCharge + this._provider.connectionCharge;
	}
}


// 调用
monthCharge = new ChargeCalculator(customer, usage, provider).charge;



// 重构后
function charge(customer, usage, provider) {
	const baseCharge = customer.baseRate * usage;
	return baseCharge + provider.connectionCharge;
}
```
