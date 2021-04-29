---
date: "2019-04-29"
---

## 封装记录(Encapsulate Record)
```js
organization = { name: "Acme Gooseberries", country: "GB" };

class Organization {
	constructor(data) {
		this._name = data.name;
		this._country = data.country;
	}

	get name() { return this._name; }
	set name(arg) { this._name = arg; }
	get country() { return this._country; }
	set country() { this._country = arg; }
}
```
### 动机
作者观点，对于可变数据，偏爱类对象而非记录，对象可以隐藏结构的细节。

### 做法

* 对持有记录的变量使用封装变量，将其封装到一个函数中。
* 创建一个类，将记录包装起来，并将记录变量的值替换为该类的一个实例。然后在类上定义一个访问函数，用于返回原始的记录。修改封装变量的函数，令其使用这个访问函数。
* 测试
* 新建一个函数，让它返回该类的对象，而非那条原始的记录。
* 对于该记录的每处使用点，将原先返回记录的函数调用替换为那个返回实例对象的函数调用。使用对象上的访问函数来获取数据的字段，如果该字段的访问函数还不存在，那就创建一个。每次更改之后运行测试。
* 移除类对原始记录的访问函数，那个容易搜索的返回原始数据的函数也要一并删除。
* 测试
* 如果记录中的字段本身也是复杂结构，考虑对其再次应用封装记录或封装集合手法。

### 范例

```js
organization = { name: "Acme Gooseberries", country: "GB" };

// 使用场景
result += `<h1>${organization.name}</h1>`;
organization.name = newName;
```

* 第一步， 封装变量
```js
function getRawDataOfOrganization() { return organization; }

// 使用场景
result += `<h1>${getRawDataOfOrganization() .name}</h1>`;
getRawDataOfOrganization() .name = newName;
```

* 第二步，创建类
```js
class Organization {
	consstuctor(data) {
		this._data = data;
	}
}

const organization = new Organization({ name: "Acme Gooseberries", country: "GB" });

function getRawDataOfOrganization() { return organization._data; }
```

* 第三步，新建函数
```js
class Organization {
	consstuctor(data) {
		this._data = data;
	}
}

const organization = new Organization({ name: "Acme Gooseberries", country: "GB" });

function getOrganization() { return organization; }
```
* 第四步
```js
class Organization {
	consstuctor(data) {
		this._data = data;
	}
	set name(aString) { this._data.name = aString; }
	get name() { this._data.name; }
}

// 使用场景
result += `<h1>${getOrganization().name}</h1>`;
getOrganization().name(newName);
```

* 第五步
```js
class Organization {
	consstuctor(data) {
		this._name = data.name;
		this._country = data.country;
	}
	set name(aString) { this._name = aString; }
	get name() { this._name; }
	set country(aCountryCode) { this._country = aCountryCode; }
	get country() { this._country; }
}
```

## 封装集合(Encapsulate Collection)
```js
class Person {
	get courses() { return this._courses; }
	set courses(aList) { this._courses = aList; }
}


class Person {
	get courses() { return this._courses.slice(); }
	addCourse(aCourse) { ... }
	removeCourse(aCourse) { ... } 
}
```
### 动机
不要修改集合本身的值。

### 做法

* 如果集合的引用尚未被封装起来，先用封装变量封装它
* 在类上添加用于“添加集合元素”和“移除集合元素”的函数
* 执行静态检查
* 查找集合的引用点。如果有调用者直接修改集合，令该处调用使用新的添加、移除元素的函数。每次修改后执行测试。
* 修改集合的取值函数，使其返回一份只读的数据，可以使用只读代理或数据副本。
* 测试

### 范例

```js
class Person {
	constructor (name) {
		this._name = name;
		this._courses = [];
	}

	get name() { return this._name; }
	get courses() { return this._courses; }
	set courses(aList) { this._courses = aList; }
}

class Course {
	constructor(name, isAdvanced) {
		this._name = name;
		this._isAdvanced = isAdvanced;
	}

	get name() { return this._name; }
	get isAdvanced() { return this._isAdvanced; }
}


// 使用1
numAdvancedCourses = aPerson.courses.filter(c => c.isAdvanced).length;


// 使用2
const basicCourseNames = readBasicCourseNames(filename);
aPerson.courses = basicCourseNames.map(name => new Course(name, false));


// 使用3
for(const name of readBasicCourseNames(filename)) {
	aPerson.courses.push(new Course(name, false));
}
```

破坏了封装，因为以此方式更新列表Person类根本无从得知。这里仅仅封装了字段作用，而为真正封装字段的内容。


```js
class Person {
	constructor (name) {
		this._name = name;
		this._courses = [];
	}

	get name() { return this._name; }
	get courses() { return this._courses.slice(); }

	addCourse(aCourse) {
		this._courses.push(aCourse);
	}

	removeCourse(aCourse, fnIfAbsent = () => { throw new RangeError();}) {
		const index = this._courses.indexOf(aCourse);
		if (index === -1) fnIfAbsent();
		else this._courses.splice(index, 1);
	}
}

class Course {
	constructor(name, isAdvanced) {
		this._name = name;
		this._isAdvanced = isAdvanced;
	}

	get name() { return this._name; }
	get isAdvanced() { return this._isAdvanced; }
}


// 使用
for(const name of readBasicCourseNames(filename)) {
	aPerson.addCourse(new Course(name, false));
}
```

## 以对象取代基本类型(Replace Primitive with Object)
```js
orders.filter(o => "high" === o.priority || "rush" === o.priority);

orders.filter(o => o.priority.higherThan(new Priority("normal")));

```
### 动机
开发初期，你往往决定以简单的数据项表示简单的情况，比如使用数字或字符串等。但随着开发的进行，你可能会发现，这些简单数据项不再那么简单了。
### 做法
* 如果变量尚未被封装起来，先使用封装变量封装它。
* 为这个数据值创建一个简单的类。类的构造函数应该保存这个数据值，并为它提供一个取值函数。
* 执行静态检查
* 修改第一步得到的设值函数，令其创建一个新类的对象并将其存入字段，如果有必要的话，同时修改字段的类型说明
* 修改取值函数，令其调用新类的取值函数，并返回结果。
* 测试
* 考虑对第一步得到的访问函数使用函数改名，以便更好反映其用途。
* 考虑应用将引用对象改为值对象或将值对象改为引用对象，明确指出新对象的角色是值对象还是引用对象。
### 范例

```js
// 服务器
class Order {
	constructor(data) {
		this.priority = data.priority;
		// more initialization
	}
}

// 客户端
highPriorityCount = orders.filter(o => "high" === o.priority || "rush" === o.priority).length;


//  1. 封装变量
class Order {
	constructor(data) {
		this._priority = data.priority;
		// more initialization
	}

	get priority() { return this._priority; }
	set priority(aString) { this._priority = aString; }
}

// 2. 创建新类
class Priority {
	constructor(value) { this._value = value; }
	toString() { return this._value;}
}

// 3. 修改访问函数
// 服务器
class Order {
	constructor(data) {
		this._priority = data;
		// more initialization
	}

	get priority() { return this._priority; }
	set priority(aString) { this._priority = new Priority(aString); }
}

// 客户端
highPriorityCount = orders.filter(o => "high" === o.priority.toString() || "rush" === o.priority.toString()).length;

// 4. 迁移逻辑
// 服务器
class Priority {
	constructor(value) {
		if（value instanceof Priority) return value;
	 	if (Priority.legalValues().includes(value))
	 		this._value = value;
 		else 
 			throw new Error(`<${value}> is invalid for Priority`); 
	}
	toString() { return this._value;}
	get _index() { return Priority.legalValues().findIndex(s => s === this._value); }
    static legalValues() { return ['low', 'normal', 'high', 'rush']; }

    equals(other) { return this._index === other._index; }
    higherThan(other) { return this._index > other._index; }
    lowerThan(other) { return this._index < other._index; }	
}

// 客户端
highPriorityCount = orders.filter(o => o.priority.higherThan(new Priority("normal"))).length;

```
## 以查询取代临时变量(Replace Temp with Query)
```js
const basePrice = this._quantity * this._itemPrice;

if(basePrice > 1000) {
	return basePrice * 0.95;
} else {
	return basePrice * 0.98;
}



get basePrice() { this._quantity * this._itemPrice; }

...
if (this.basePrice > 1000) {
	return this.basePrice * 0.95;
} else {
	return this.basePrice * 0.98;
}

```

### 动机
### 做法
* 检查变量在使用前是否已经完全计算完毕，检查计算它的那段代码是否每次都能得到一样的值。
* 如果变量目前不是只读的，但是可以改造成只读变量，那就先改造它。
* 测试。
* 将为变量赋值的代码段提炼成函数
* 测试
* 应用内联变量手法移除临时变量。

### 范例
```js
class Order {
	constructor(quantity, item) {
		this._quantity = quantity;
		this._item = item;
	}

	get price() {
		var basePrice = this._quantity * this._item.price;
		var discountFactor = 0.98;
		if (basePrice > 1000) discountFactor -= 0.03;
		return basePrice * discountFactor;
	}
}
// 1. basePrice , discountFactor 变成函数
class Order {
	constructor(quantity, item) {
		this._quantity = quantity;
		this._item = item;
	}

	get price() {
		const basePrice = this.basePrice;
		var discountFactor = 0.98;
		if (basePrice > 1000) discountFactor -= 0.03;
		return basePrice * discountFactor;
	}

	get basePrice() {
		return this._quantity * this._item.price;
	}
}

//2. 应用内联变量
class Order {
	constructor(quantity, item) {
		this._quantity = quantity;
		this._item = item;
	}

	get price() {
		var discountFactor = 0.98;
		if (this.basePrice > 1000) discountFactor -= 0.03;
		return this.basePrice * discountFactor;
	}

	get basePrice() {
		return this._quantity * this._item.price;
	}
}

// 3. 提炼函数

class Order {
	constructor(quantity, item) {
		this._quantity = quantity;
		this._item = item;
	}

	get price() {
		return this.basePrice * this.discountFactor;
	}

	get basePrice() {
		return this._quantity * this._item.price;
	}

	get discountFactor() {
		var discountFactor = 0.98;
		if (this.basePrice > 1000) discountFactor -= 0.03;
		return this.basePrice * discountFactor;
	}
}

```

## 提炼类 (Extract Class)
```js
class Person {
	get officeAreaCode() { return this._officeAreaCode; }
	get officeNumber() { return this._officeNumber; }
}

class Person {
	get officeAreaCode() { return this._telephoneNumber.areaCode; }
	get officeNumber() { return this._telephoneNumber.number; }
}


class TelephoneNumber {
	get areaCode() { return this._areaCode; }
	get number() { return this._number; }
}

```
### 动机
### 做法
### 范例

## 内联类(InLine Class)
```js
class TelephoneNumber {
	get areaCode() { return this._areaCode; }
	get number() { return this._number; }
}

class Person {
	get officeAreaCode() { return this._officeAreaCode; }
	get officeNumber() { return this._officeNumber; }
}

class Person {
	get officeAreaCode() { return this._telephoneNumber.areaCode; }
	get officeNumber() { return this._telephoneNumber.number; }
}
```
### 动机
如果一个类不再承担足够责任，不再有单独存在的理由
### 做法
### 范例

## 隐藏委托关系(Hide Delegate)
```js
manager = aPerson.department.manager;

manager = aPerson.manager;
class Person {
	get manager() { return this.department.manager;}
}

```
### 动机
如果客户端先通过服务对象的字段得到另一个对象（受拖类），然后调用后者的函数。那么客户就必须知晓这一次层关系。万一受拖类修改了接口，变化会波及所有的客户端。
### 做法
* 对于每个委托关系中的函数，在服务对象端建立一个简单的委托函数
* 调整客户端，令它只调用服务对象提供的函数。每次调整后运行测试。
* 如果将来不再有任何客户端需要去Delegate（受拖类），便可移除服务对象中的相关访问函数。
* 测试

### 范例
```js
class Person {
	constructor(name) {
		this._name = name;
	}

	get name() { return this._name; }
	get department() { return this._department; }
	set department(arg) { this._department = arg; }
}

class Deprtment {
	get chargeCode() { return this._chargeCode;}
	set chargeCode(arg) { this._chargeCode = arg;}
	get manager() { return this._manager;}
	set manager(arg) { this._manager = arg;}
}


manager = aPerson.department.manager;



// 隐藏委托
manager = aPerson.manager;
class Person {
	get manager() { return this.department.manager;}
}
```

## 移除中间人（Remove Middle Man）
```js
manager = aPerson.manager;

class Person {
	get manager() { return this.department.manager;}
}


manager = aPerson.department.manager;
```
### 动机
很难判断，什么时候该隐藏，什么时候该删除。
### 做法
* 为受托对象创建一个取值函数
* 对于每个委托函数，让其客户端转为连续的访问函数调用。每次替换后运行测试。

### 范例

```js
manager = aPerson.manager;

class Person {
	get manager() { return this.department.manager;}
}

manager = aPerson.department.manager;


manager = aPerson.manager;

class Person {
	get department() { return this.department; }
}

class Deprtment {
	get manager() { return this.manager;}
}


manager = aPerson.department.manager

```

## 替换算法（Substitute Algorithm）
```js
function foundPerson(people) {
	for(let i = 0; i< people.length; i++) {
		if (people[i] === "Don") {
			return "Don";
		}

		if (people[i] === "John") {
			return "John";
		}

	    if (people[i] === "Kent") {
			return "Kent";
		}

	}
	return "";
}


function foundPerson(people) {
	const candidates = ["Don", "John", "Kent"];
	return people.find(p => candidates.includes(p) || "");
}
```

### 动机
清晰的方式，取代复杂的算法。


### 做法
* 整理一下待替换的算法，保证它已经被抽取到一个独立的函数中。
* 先只为这个函数准备测试，以便固定它的行为
* 准备好另一个算法
* 执行静态检查
* 运行测试，比对新旧算法的运行结果