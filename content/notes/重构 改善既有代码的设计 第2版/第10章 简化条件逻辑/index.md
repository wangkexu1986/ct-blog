---
date: "2019-05-13"
---

## 分解条件表达式（Decompose Conditional）
```js
if(!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
	charge = quantity * plan.summerRate;
} else {
	charge = quantity * plan.regularRate + plan.regularServiceCharge;
}

if(summer()) {
	charge = summerCharge();
} else {
	charge = regularCharge();
}
```
### 动机
### 做法
* 对条件判断和每个条件分支分别运用提炼函数手法。
### 范例
```js
if(!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
	charge = quantity * plan.summerRate;
} else {
	charge = quantity * plan.regularRate + plan.regularServiceCharge;
}

function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

function summerCharge() {
    return quantity * plan.summerRate;
}

function regularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge;
}

charge = summer() ? summerCharge() : regularCharge();
```

## 合并条件表达式（Consolidate Conditional Expression）
```js
if(anEmployee.seniority < 2) return 0;
if(anEmployee.monthsDisabled > 12) return 0;
if(anEmployee.isPartTime) return 0;



if(isNotEligibleForDisability()) return 0;

function isNotEligibleForDisability() {
	return ((anEmployee.seniority < 2)
		|| (anEmployee.monthsDisabled > 12)
		|| (anEmployee.isPartTime));
}
```
### 动机
### 做法
* 确定这些条件表达式都没有副作用
* 使用适当的逻辑运算符，将两个相关条件表达式合并为一个。
* 测试
* 重复前面的合并过程，直到所有相关的条件表达式都合并到一起
* 可以考虑对合并后的条件表达式实施提炼函数
### 范例: 使用逻辑与
```js
if(anEmployee.onVacation)
	if(anEmployee.seniority > 10)
		return 1;
return 0.5;

if(anEmployee.onVacation && anEmployee.seniority > 10) return 1;
return 0.5;

```

## 合并条件表达式（Consolidate Conditional Expression）
```js
if(anEmployee.seniority < 2) return 0;
if(anEmployee.monthsDisabled > 12) return 0;
if(anEmployee.isPartTime) return 0;



if(isNotEligibleForDisability()) return 0;

function isNotEligibleForDisability() {
	return ((anEmployee.seniority < 2)
		|| (anEmployee.monthsDisabled > 12)
		|| (anEmployee.isPartTime));
}
```
### 动机
### 做法
* 确定这些条件表达式都没有副作用
* 使用适当的逻辑运算符，将两个相关条件表达式合并为一个。
* 测试
* 重复前面的合并过程，直到所有相关的条件表达式都合并到一起
* 可以考虑对合并后的条件表达式实施提炼函数
### 范例: 使用逻辑与
```js
if(anEmployee.onVacation)
	if(anEmployee.seniority > 10)
		return 1;
return 0.5;

if(anEmployee.onVacation && anEmployee.seniority > 10) return 1;
return 0.5;

```

## 以卫语句取代嵌套条件表达式（Replace Nested Conditional with Guard Clauses）
```js
function getPayAmount() {
	let result;
	if(isDead) {
		result = deadAmount();
	} else {
		if(isSeparated) {
			result = separateAmount();
		} else {
			if(isRetired) {
				result = retiredAmount();
			} else {
				result = normalPayAmount();
			}
		}
	}

	return result;
}


function getPayAmount() {
	if(isDead) return deadAmount();
	if(isSeparated) return separatedAmount();
	if(isRetired) return retiredAmount();
	return normalPayAmount();
}
```
### 动机
### 做法
* 选中最外层需要被替换的条件逻辑，将其替换为卫语句
* 测试
* 有需要的话，重复上述步骤
* 如果所有卫语句都引发同样的结果，可以使用合并条件表达式合并之。
### 范例

## 以多态取代条件表达式（Replace Conditional with Polymorphism）
```js
switch(bird.type) {
	case 'EuropeanSwallow':
		return "average";
	case 'AfricanSwallow':
		return (bird.numberOfCoconuts > 2) ? "tired" : "average";
	case 'NorwegianBlueParrot':
		return (bird.voltage > 100) ? "scorched" : "beautiful";
	default:
		return "unknown";	
}




class EuropeanSwallow {
	get plumage() {
		return "average";
	}
}

class AfricanSwallow {
	get plumage() {
		return (this.numberOfCoconuts > 2) ? "tired" : "average";
	}
}

class NorwegianBlueParrot {
	get plumage() {
		return (this.voltage > 100) ? "scorched" : "beautiful";
	}
}
```
### 动机
将逻辑分开。
### 做法
* 如果现有的类尚不具备多态行为，就用工厂函数创建之，令工厂函数返回恰当的对象实例。
* 在调用方代码中使用工厂函数获得对象实例
* 将带有条件逻辑的函数移到超类中
* 任选一个子类，在其中建立一个函数，使之覆写超类中容纳条件表达式的那个函数。将与该子类相关的条件表达式分支复制到新函数中，并对它进行适当调整
* 重复上述过程，处理其他条件分支
* 在超类函数中保留默认情况的逻辑。或者，如果超类应该是抽象的，就把该函数声明为abstract,或在其中直接抛出异常，表明计算责任都在子类中。

### 范例

朋友有一群鸟儿，他想知道这些鸟飞得有多块，以及他们的羽毛是什么样的。
```js
function plumages(birds) {
	return new Map(birds.map(b => [b.name, plumage(b)]));
}

function speeds(birds) {
	return new Map(birds.map(b => [b.name, airSpeedVelocity(b)]));
}

function plumage(bird) {
	switch(bird.type) {
		case 'EuropeanSwallow':
			return "average";
		case 'AfricanSwallow':
			return (bird.numberOfCoconuts > 2) ? "tired" : "average";
		case 'NorwegianBlueParrot':
			return (bird.voltage > 100) ? "scorched" : "beautiful";
		default:
			return "unknown";	
	}
}

function airSpeedVelocity(bird) {
	switch(bird.type) {
		case 'EuropeanSwallow':
			return 35;
		case 'AfricanSwallow':
			return 40 - 2 * bird.numberOfCoconuts;
		case 'NorwegianBlueParrot':
			return (bird.isNailed) ? 0 : 10 + bird.voltage / 10;
		default:
			return null;	
	}
}

// 1. 有两个不同的操作，其行为都随着“鸟的类型”发生变化，因此可以创建出对应的类，用多态来处理各类型特有的行为。
先对airSpeedVelocity和plumage两个函数使用函数组合成类
function plumage(bird) {
	return new Bird(bird).plumage;
}

function airSpeedVelocity(bird) {
	return new Bird(bird).airSpeedVelocity;
}

class Bird {
	constructor(birdObject) {
		Object.assign(this, birdObject);
	}

	get plumage(bird) {
		switch(bird.type) {
			case 'EuropeanSwallow':
				return "average";
			case 'AfricanSwallow':
				return (bird.numberOfCoconuts > 2) ? "tired" : "average";
			case 'NorwegianBlueParrot':
				return (bird.voltage > 100) ? "scorched" : "beautiful";
			default:
				return "unknown";	
		}
	}

	get airSpeedVelocity(bird) {
		switch(bird.type) {
			case 'EuropeanSwallow':
				return 35;
			case 'AfricanSwallow':
				return 40 - 2 * bird.numberOfCoconuts;
			case 'NorwegianBlueParrot':
				return (bird.isNailed) ? 0 : 10 + bird.voltage / 10;
			default:
				return null;	
		}
	}
}

// 2. 针对每种鸟创建一个子类，用一个工厂函数来实例化合适的子类对象.
function plumage(bird) {
	return createBird(bird).plumage;
}

function airSpeedVelocity(bird) {
	return createBird(bird).airSpeedBelocity;
}

function createBird(bird) {
	switch(bird.type) {
		case 'EuropeanSwallow':
			return new EuropeanSwallow(bird);
		case 'AfricanSwallow':
			return new AfricanSwallow(bird);
		case 'NorwegianBlueParrot':
			return new NorwegianBlueParrot(bird);
		default:
			return new Bird(bird);	
	}
}


class EuropeanSwallow extends Bird {

}

class AfricanSwallow extends Bird {

}

class NorwegianBlueParrot extends Bird {

}
// 3. 从switch语句中选一个分支，用适当的子类覆写这个逻辑
function plumages(birds) {
	return new Map(birds
		.map(b => createBird(b)))
		.map(bird => [bird.name, bird.plumage]);
}

function speeds(birds) {
	return new Map(birds
		.map(b => createBird(b)))
		.map(bird => [bird.name, bird.airSpeedVelocity]);
}

function createBird(bird) {
	switch(bird.type) {
		case 'EuropeanSwallow':
			return new EuropeanSwallow(bird);
		case 'AfricanSwallow':
			return new AfricanSwallow(bird);
		case 'NorwegianBlueParrot':
			return new NorwegianBlueParrot(bird);
		default:
			return new Bird(bird);	
	}
}


class EuropeanSwallow extends Bird {
	get plumage() {
		return "average";
	}

	get airSpeedVelocity() {
		return 35;
	}

}

class AfricanSwallow extends Bird {
	get plumage() {
		return (this.numberOfCoconuts > 2) ? "tired" : "average";
	}

	get airSpeedVelocity() {
		return 40 - 2 * this.numberOfCoconuts;
	}

}

class NorwegianBlueParrot extends Bird {
	get plumage() {
		return (bird.voltage > 100) ? "scorched" : "beautiful";
	}

	get airSpeedVelocity() {
		return (this.isNailed) ? 0 : 10 + this.voltage / 10;
	}
}

class Bird {
	constructor(birdObject) {
		Object.assign(this, birdObject);
	}
	
	get plumage() {
		return "unknown";
	}

	get airSpeedVelocity() {
		return null;
	}

}

教科书般的继承和多态，但是在实践中并不常见，一般的情况是某几个对象大体类似，但是又有一些不同之处。
```

### 范例：用多态处理变体逻辑
例子： 有一家评级机构，要对远洋航船的航行进行投资评级。这个机构会给出A或者B两种评级，在评估中既要考虑航程本身的特征(盈利和风险)，也要考虑船长过往航行的历史。

```js
function rating(voyage, history) {
	const vpf = voyageProfitFactor(voyage, history);
	const vr = voyageRisk(voyage);
	const chr = captainHistoryRisk(voyage, history);
	if(vpf *3 > (vr + chr * 2)) return "A"
	else return "B";
}

function voyageRisk(voyage) {
	let result = 1;
	if(voyage.length > 4) result += 2;
	if(voyage.length > 8) result += voyage.length - 8;
	if(["china", "east-indies"].includes(voyage.zone)) result +=4;
	return Math.max(result, 0);
}

function captainHistoryRisk(voyage, history) {
	let result = 1;
	if(history.length < 5) result += 4;
	result += history.filter(v => v.profit < 0).length;
	if(voyage.zone === "china" && hasChina(history)) result -= 2;
	return Math.max(result, 0);
}

function hasChina(history) {
	return history.some(v => "china" === v.zone);
}

function voyageProfitFactor(voyage, history) {
	let result = 2;
	if(voyage.zone === "china") result += 1;
	if(voyage.zone === "east-indies") result += 1;
	if(voyage.zone === "china" && hasChina(history)) {
		result += 3;
		if(history.length > 10) result += 1;
		if(voyage.length > 12) result += 1;
		if(voyage.length > 18) result -= 1;
	}
	else {
		if(history.length > 8) result += 1;
		if(voyage.length > 14) result -= 1;
	}
	return result;
}
```
voyageRisk和captainHistoryRisk两个函数负责打出风险分数，voyageProfitFactor负责打出盈利潜力分数，rating函数将3个分数组合到一起，给出一次航行的综合评级。

```js
// 调用
const voyage = { zone: "west-indies", length: 10};
const history =[
	{zone: "east-indies", profit: 5},
	{zone: "west-indies", profit: 15},
	{zone: "china",       profit: -2},
	{zone: "west-indies", profit: 7}
];

const myRating = rating(voyage, history);

```

重构点：
代码中有两处同样的条件逻辑，都在询问是否有到过中的航程，以及船长是否曾去过中国。用继承和多态从逻辑中分离出来。

## 引入特例（Introduce Special Case）
```js
if(aCustomer === "unknown") customerName = "occupant";


class UnknownCustomer {
	get name() { return "occupant"; }
}
```

### 动机
一种常见的重复代码是这种情况：一个数据结构的使用者都在检查某个特殊的值，并且当这个特殊值出现时所做的处理也都相同。如果发现代码中有多处这样的代码，应该使用一个特例类型。通常也叫Null对象。

### 做法
### 范例

一家提供公共事业服务的公司将自己的服务安装在各个场所。大多数情况下，一个场所
```js
class Site {
	get customer() { return this._customer; }
}

class Customer {
	get name() {...}
	get billingPlan() {...}
	set billingPlan(arg) {...}
	get paymentHistory() {...}
}


// 客户端1
const aCustomer = site.customer;
let customerName;
if(aCustomer === "unknown") customerName = "occupant";
else customerName = aCustomer.name;

// 客户端2
const plan = (aCustomer === "unknown") ? registry.billingPlans.basic : aCustomer.billingPlan;

// 客户端3
if(aCustomer !== "unknown") aCustomer.billingPlan = newPLan;

// 客户端4
const weeksDelinquent = (aCustomer === "unknown") ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;


// 1. 重构，定义一个未知的顾客类 
class Customer {
	get isUnknown() { return false; }
}

class UnknownCustomer extends Customer {
	get isUnknown() { return true; }
}

// 2. 用isUnknown替换unknown
function isUnknown(arg) {
	if(!(arg instancdof Customer) || (arg === "unknown"))
		throw new Error(`investigate bad value: <${arg}>`);
	return (arg === "unknown");
}

// 客户端1
let customerName;
if(isUnknown(aCustomer)) customerName = "occupant";
else customerName = aCustomer.name;

// 客户端2
const plan = isUnknown(aCustomer) ? registry.billingPlans.basic : aCustomer.billingPlan;

// 客户端3
if(!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;

// 客户端4
const weeksDelinquent = isUnknown(aCustomer) ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;


```
## 引入断言（Introduce Assertion）
```js
if(this.discountRate)
	base = base -(this.discountRate * base);


assert(this.discountRate >= 0);
if(this.discountRate)
base = base - (this.discountRate * base)

```
### 动机

### 做法
* 如果你发现代码假设某个条件始终为真，就加入一个断言明确说明这种情况

### 范例
```js
class Customer {
	applyDiscount(aNumber) {
		return (this.discountRate) ? aNumber - (this.discountRate * aNumber) : aNumber
	}
}

// 
class Customer {
	applyDiscount(aNumber) {
		if(!this.discountRate) {
			return aNumber;
		} else {
			assert(this.discountRate >=0);
			return aNumber - (this.discountRate * aNumber);
		}
	}
}

```
