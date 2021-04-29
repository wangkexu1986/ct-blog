---
date: "2019-05-11"
---

## 搬移函数（Move Function）
```js
class Account {
	get overdraftCharge() {...}
}



class AccountType {
	get overdraftCharge() {...}
}
```

### 动机

### 做法
*  检查函数在当前上下文里引用的所有程序元素，考虑是否需要将它们一并搬移 
*  检查待搬移函数是否具备多态性
*  将函数复制一份到目标上下文中。调整函数，使它能适应新家
*  执行静态检查
*  设法从源上下文中正确引用目标函数
*  修改源函数，使之成为一个纯委托函数
*  测试
*  考虑对源函数使用内联函数

### 范例

```js
function trackSummary(pointer) {
	const totalTime = calculateTime();
	const totalDistance = calculateDistance();
	const pace = totalTime / 60 / totalDistance;

	return {
		time: totalTime,
		distance: totalDistance,
		pace: pace
	};


	function calculateDistance() {
		let result = 0;
		for (let i = 1; i < points.length; i++) {
			result += distance(points[i-1], points[i]);
		}
		return result;
	}

	function distance(p1, p2) {...}
	function radians(degrees) {...}
	function calculateTime() {...}
}


// 重构后

function trackSummary(pointer) {
	const totalTime = calculateTime();
	const totalDistance = calculateDistance();
	const pace = totalTime / 60 / totalDistance;

	return {
		time: totalTime,
		distance: totalDistance,
		pace: pace
	};

	function distance(p1, p2) {...}
	function radians(degrees) {...}
	function calculateTime() {...}
}


function calculateDistance() {
	let result = 0;
	for (let i = 1; i < points.length; i++) {
		result += distance(points[i-1], points[i]);
	}
	return result;
}
```

## 搬移字段（Move Field）
```js
class Customer {
	get plan() { return this._plan;}
	get discountRate() { return this._discountRate; }
}




class Customer {
	get plan() { return this._plan; }
	get discountRate() { return this.plan.discountRate; }
}
```
### 动机
### 做法
### 范例

## 搬移语句到函数（Move Statements into Function）
```js
result.push(`<p>title: ${person.photo.title}</p>`);
result.concat(photoData(person.photo));

function photoData(aPhoto) {
	return [
		`<p>locationo: ${aPhoto.location}</p>`,
		`<p>date: ${aPhoto.date.toDateString()}</p>`,
	];
}



result.concat(photoData(person.photo));

function photoData(aPhoto) {
	return [
	    `<p>title: ${aPhoto.title}</p>`,
		`<p>locationo: ${aPhoto.location}</p>`,
		`<p>date: ${aPhoto.date.toDateString()}</p>`,
	];
}
```
### 动机
### 做法
### 范例

## 搬移语句到调用者（Move Statements into Callers）
```js
emitPhotoData(outStream, person.photo);

function emitPhotoData(outStream, photo) {
	outStream.write(`<p>title: ${photo.title}</p>`);
	outStream.write(`<p>location: ${photo.location}</p>`);
}


emitPhotoData(outStream, person.photo);
outStream.write(`<p>location: ${person.photo.location}</p>`);

function emitPhotoData(outStream, photo) {
	outStream.write(`<p>title: ${photo.title}</p>`);
}
```
### 动机
### 做法
### 范例

```js
function renderPerson(outStream, person) {
	outStream.wriete(`<p>${person.name}</p>\n`);
	renderPhoto(outStream, person.photo);
	emitPhotoData(outStream, person.photo);
}


function listRecentPhotos(outStream, photos) {
	photos
	.filter(p => p.date > recentDateCutoff())
	.forEach(p => {
		outStream.write("<div>\n");
		emitPhotoData(outStream, p);
		outStream.write("</div>\n");
	})
}


function emitPhotoData(outStream, photo) {
	outStream.write(`<p>title: ${photo.title}</p>\n`);
	outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`);
	outStream.write(`<p>location: ${photo.location}</p>\n`);
}


// 重构后
function renderPerson(outStream, person) {
	outStream.wriete(`<p>${person.name}</p>\n`);
	renderPhoto(outStream, person.photo);
	emitPhotoData(outStream, person.photo);
	outStream.write(`<p>location: ${photo.location}</p>\n`);
}


function listRecentPhotos(outStream, photos) {
	photos
	.filter(p => p.date > recentDateCutoff())
	.forEach(p => {
		outStream.write("<div>\n");
		emitPhotoData(outStream, p);
		outStream.write(`<p>location: ${photo.location}</p>\n`);
		outStream.write("</div>\n");
	})
}


function emitPhotoData(outStream, photo) {
	outStream.write(`<p>title: ${photo.title}</p>\n`);
	outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`);
}

```

## 移动语句（Slide Statements）
```js
const pricingPlan = retrievePricingPlan();
const order = retreiveOrder();
let charge;
const chargePerUnit = pricingPlan.unit;


const pricingPlan = retrievePricingPlan();
const chargePerUnit = pricingPlan.unit;
const order = retreiveOrder();
let charge;
```
### 动机
让存在关联的东西一起出现，可以使代码更容易理解。
### 做法
* 先看看，移动后是否会影响代码的正常工作。如果会，就放弃移动
* 剪切源代码片段，粘贴到上一步选定的位置上。
* 测试

### 范例
移动代码时，要想清楚两件事：
1. 调整的目标是什么，以及该目标能否达成
2. 移动后，代码之间产生的干扰

```js
1 const pricingPlan = retrievePricingPlan();
2 const order = retrieveOrder();
3 const baseCharge = pricingPlan.base;
4 let charge;
5 const chargePerUnit = pricingPlan.unit;
6 const units =order.units;
7 let discount;
8 charge = baseCharge + units * chargePerUnit;
9 let discountableUnits = Math.max(units, pricingPlan.discountThreshold, 0);
10 discount = discountableUnits * pricingPlan.discountFactor;
11 if( order.isRepeat) discount += 20;
12 charge = charge - discount;
13 chargeOrder(charge);
```
移动时，注意移动语句的变量，在上下文中有没有被修改

### 范例 包含条件逻辑的移动
```js
let result;
if (avaliableResources.length === 0) {
	result = createResource();
	allocatedResources.push(result);
} else {
	result = avaliableResources.pop();
	avaliableResources.push(result);
}

let result;
if (avaliableResources.length === 0) {
	result = createResource();
} else {
	result = avaliableResources.pop();
}

allocatedResources.push(result);
```

## 拆分循环（Split Loop）
```js
let averageAge = 0;
let totalSalary = 0;
for (const p of people) {
	averageAge += p.age;
	totalSalary += p.salary;
}

averageAge = averageAge / people.length;



let totalSalary = 0;
for (const p of people) {
	totalSalary += p.salary;
}

let averageAge = 0;
for (const p of people) {
	averageAge += p.age;
}

averageAge = averageAge / people.length
```
### 动机
一个循环，只做一件事
### 做法
* 赋值一遍循环代码
* 识别并移除循环中的重复代码，使每个循环只做一件事
* 测试
### 范例

## 以管道取代循环（Replace Loop with Pipeline）
```js
const names = [];
for (const i of input) {
	if (i.job === "programmer") {
	   name.push(i.name);
	}
}


const names = input
.filter(i => i.job === 'programmer')
.map(i => i.name);

```
### 动机
map 用一个函数作用域输入集合的每一个元素上，将集合变换成另外一个集合的过程
filter 用一个函数从输入集合中筛选出符合条件的元素子集

### 做法
* 创建一个新变量，用以存放参与循环过程的集合
* 从循环顶部开始，将循环里的每一块行为依次搬移出来，在上异步创建的集合变量上用一种管道运算替代之。每次修改后运行测试
* 搬移完循环里的全部行为后，将循环整个删除。
### 范例
csv文件，保存办公室的数据
```csv
office, country, telephone
Chicago, USA,  +1 312 373 1000
Beijing, China, +86 4008 900 505
Bangalore, India, +91 80 4064 9570
Porto Alegre, Brazil, +55 51 3079 3550
Chennai, India, +91 44 660 44766
```

```js
function acquireData(input) {
	const lines = input.split("\n");
	let firstLine = true;
	const result = [];
	for (const line of lines) {
		if (firstLine) {
			firstLine = false;
			continue;
		}

		if (line.trim() === "") continue;
		const record = line.split(",");
		if (record[1].trim() === "India") {
			result.push({city: record[0].trim(), phone: record[2].trim()});
		}
	}
	return result;
}

// 先想想怎么重构？

// 1. 创建一个新变量，用以存放参与循环过程的集合
function acquireData(input) {
	const lines = input.split("\n");
	let firstLine = true;
	const result = [];
	const loopItems = lines; // 新变量
	for (const line of loopItems) {
		if (firstLine) {
			firstLine = false;
			continue;
		}

		if (line.trim() === "") continue;
		const record = line.split(",");
		if (record[1].trim() === "India") {
			result.push({city: record[0].trim(), phone: record[2].trim()});
		}
	}
	return result;
}

// 2. 移除第一行
function acquireData(input) {
	const lines = input.split("\n");
	const result = [];
	const loopItems = lines.slice(1); // 移除第一行
	for (const line of loopItems) {
		if (line.trim() === "") continue;
		const record = line.split(",");
		if (record[1].trim() === "India") {
			result.push({city: record[0].trim(), phone: record[2].trim()});
		}
	}
	return result;
}

// 3. 移除空判断
function acquireData(input) {
	const lines = input.split("\n");
	const result = [];
	const loopItems = lines.slice(1).filter(line => line.trim() !== "");
	for (const line of loopItems) {
		const record = line.split(",");
		if (record[1].trim() === "India") {
			result.push({city: record[0].trim(), phone: record[2].trim()});
		}
	}
	return result;
}
// 4. 移除记录拆分
function acquireData(input) {
	const lines = input.split("\n");
	const result = [];
	const loopItems = lines.slice(1)
	.filter(line => line.trim() !== "")
	.map(line => line.split(","))
	;
	for (const line of loopItems) {
		if (record[1].trim() === "India") {
			result.push({city: record[0].trim(), phone: record[2].trim()});
		}
	}
	return result;
}
// 5. 移除过滤语句
function acquireData(input) {
	const lines = input.split("\n");
	const result = [];
	const loopItems = lines.slice(1)
	.filter(line => line.trim() !== "")
	.map(line => line.split(","))
	.filter(record => record[1].trim() === "India");
	for (const line of loopItems) {
		result.push({city: record[0].trim(), phone: record[2].trim()});	
	}
	return result;
}

// 6. 移除push
function acquireData(input) {
	const lines = input.split("\n");
	const result = [];
	const loopItems = lines.slice(1)
	.filter(line => line.trim() !== "")
	.map(line => line.split(","))
	.filter(record => record[1].trim() === "India");
	.map(record => ({city: record[0].trim(), phone: record[2].trim()}));
	for (const line of loopItems) {
		result.push(line);	
	}
	return result;
}

// 7. 移除for
function acquireData(input) {
	const lines = input.split("\n");
	const result = lines.slice(1)
	.filter(line => line.trim() !== "")
	.map(line => line.split(","))
	.filter(record => record[1].trim() === "India");
	.map(record => ({city: record[0].trim(), phone: record[2].trim()}));
	return result;
}

// 8. 移除变量
function acquireData(input) {
	const lines = input.split("\n");
	return lines.slice(1)
	.filter(line => line.trim() !== "")
	.map(line => line.split(","))
	.filter(record => record[1].trim() === "India");
	.map(record => ({city: record[0].trim(), phone: record[2].trim()}));
}
```

// 性能测试
```js
const csv = "office, country, telephone\nChicago, USA,  +1 312 373 1000Beijing, China, +86 4008 900 505\nBangalore, India, +91 80 4064 9570\nPorto Alegre, Brazil, +55 51 3079 3550\nChennai, India, +91 44 660 44766";

function acquireData1(input) {
    const startDate = new Date().getTime();
	const lines = input.split("\n");
	let firstLine = true;
	const result = [];
	for (const line of lines) {
		if (firstLine) {
			firstLine = false;
			continue;
		}

		if (line.trim() === "") continue;
		const record = line.split(",");
		if (record[1].trim() === "India") {
			result.push({city: record[0].trim(), phone: record[2].trim()});
		}
	}
	console.log(new Date().getTime() - startDate);
	return result;
}

function acquireData2(input) {
	const lines = input.split("\n");
	return lines.slice(1)
	.filter(line => line.trim() !== "")
	.map(line => line.split(","))
	.filter(record => record[1].trim() === "India");
	.map(record => ({city: record[0].trim(), phone: record[2].trim()}));
}
console.log(acquireData2(csv));

```

## 移除死代码（Remove Dead Code）
```js
if (false) {
  doSomethingThatUsedToMatter();
}

```
### 动机
一旦代码不再被使用，立马删除它。
### 做法
* 如果死代码可以从外部直接引用，先查找引用点。
* 将死代码移除
* 测试
### 范例