---
date: "2021-05-14"
---

## 函数上移(Pull Up Method)
```js

class Employee { ... }

class Salesman extends Employee {
	get name() { ...}
}

class Engineer extends Employee {
	get name() { ... }
}


class Employee { 
	get name() { ... }
}

class Salesman extends Employee { ... }

class Engineer extends Employee { ... }

```
### 动机
减少重复代码


## 字段上移(Pull Up Field)
```java
class Employee { ... } //Java

class Salesman extends Employee {
	private String name;
}

class Engineer extends Employee {
	private String name;
}


class Employee { 
	private String name;
}

class Salesman extends Employee { ... }

class Engineer extends Employee { ... }
```
### 动机
重复代码


## 构造函数本质上移(Pull Up Constructor Body)
```js
class Party { ... }

class Employee extends Party {
	constructor(name, id, monthlyCost) {
		super();
		this._id = id;
		this._name = name;
		this._monthlyCost = monthlyCost;
	}
}

class Party {
	constructor(name) {
		this._name = name;
	}
}

class Employee extends Party {
	constructor(name, id, monthlyCost) {
		super(name);
		this._id = id;
		this._monthlyCost = monthlyCost;
	}
}
```
### 动机
如果子类的函数中，有共同的行为

## 函数下移(Push Down Method)
```js
class Employee {
	get quota() { ... }
}

class Engineer extends Employee { ... }
class Salesman extends Employee { ... }



class Employee { ... }
class Engineer extends Employee { ... }
class Salesman extends Employee {
	get quota { ... }
}

```
### 动机
如果超类中的某个函数只与一个子类有关，那么最好将其从超类中挪走。

## 字段下移(Push Down Field)
```java

// Java
class Employee {
	private String quota;
}

class Engineer extends Employee { ... }
class Salesman extends Employee { ... }



class Employee { ... }
class Engineer extends Employee { ... }
class Salesman extends Employee {
	private String quota;
}
```
### 动机
如果某个字段只被一个子类用到，将其移到子类中。

## 以子类取代类型码(Replace Type Code with Subclasses)
```js
function createEmployee(name, type) {
	return new Employee(name, type);
}




function createEmployee(name, type) {
	switch(type) {
		case "enginner": return new Engineer(name);
		case "salesman": return new Salesman(name);
		case "manager": return new Manager(name);
	}
}
```

## 移除子类(Remove Subclass)
```js
class Person {
	get genderCode() { return "X"; }
}

class Male extends Person {
	get genderCode() { return "M"; }
}

class Female extends Person {
	get genderCode() { return "F"; }
}



class Person {
	get genderCode() { return this._genderCode; }
}
```

## 提炼超类(Extract Superclass)

```js
class Department {
	get totalAnnualCost() { ... }
	get name() { ... }
	get headCount() { ... }
}

class Employee {
	get annualCost() { ... }
	get name() { ... }
	get id() { ... }
}


class Party {
	get name() { ... }
	get annualCost() { ... }
}

class Department extends Party {
	get annualCost() { ... }
	get headCount() { ... }
}

class Employee extends Party {
	get annualCost() { ... }
	get id() { ... }
}

```

## 折叠继承体系(Collapse Hierarchy)
```js
class Employee { ... }
class Salesman extends Employee { ... }



class Employee { ... }
```
### 动机
如果一个类和超类已经没有多大差别，不值得再作为独立的类存在。

## 以委托取代子类(Replace Subclass with Delegate)

```js

class Order {
	get daysToShip() {
		return this._warehouse.daysToShip;
	}
}


class PriorityOrder extends Order {
	get daysToShip() {
		return this._priorityPlan.daysToShip;
	}
}



class Order {
	get daysToShip() {
		return (this._priorityDelegate) ? this._priorityDelegate.daysToShip : this._warehouse.daysToShip;
	}
}


class PriorityDelegate {
	get daysToShip() {
		return this._priorityPlan.daysToShip;
	}
}
```

## 以委托取代超类(Replace Superclass with Delegate)

```js
class List { ... }
class Stack extends List { ... }


class Stack {
	constructor() {
		this._storage = new List();
	}
}

class List { ... }
```