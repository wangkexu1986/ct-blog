---
date: "2021-04-24"
---
## 例子
设想有一个戏剧演出团，演员们经常要去各种场合表演戏剧。通常客户(customer),会指定几出剧目，而剧团则根据观众(audience)人数及剧目类型来向客户收费。
* 戏剧类型：悲剧（tragedy）, 喜剧（comedy）
* 客户结账时会返积分(volume credit)，下次通过积分可获得折扣

#### plays.json 剧目(哈姆雷特, 皆大欢喜, 奥赛罗,)
```json
{
  "hamlet": {"name": "Hamlet", "type": "tragedy"},
  "as-like": {"name": "As You Like It", "type": "comedy"},
  "othello": {"name": "Othello", "type": "tragedy"}
}
```
####  invoices.json 客户订单
```json
[
  {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "hamlet",
        "audience": 55
      },
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othello",
        "audience": 40
      }
    ]
  }
]
```

#### 打印账单详细的代码
```js
function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US",
                        { style: "currency", currency: "USD",
                          minimumFractionDigits: 2 }).format;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
    case "tragedy":
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy":
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
        throw new Error(`unknown type: ${play.type}`);
    }

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    //print line for this order
    result += `  ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount/100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}
```
#### 账单的输出结果
```shell
Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
```
## 代码分析

### 费用的计算
1. 悲剧，基础费用40000美元，观众人数 > 30时，超出的人数每人追收1000美元
2. 喜剧，基础费用30000美元，每位观众收300美元，观众人数 > 20时，超出的人数每人追收500美元，并且追加10000美元的基础费。

### 积分的算法
观众人数<=30时，0分，>30时，超出的人数，每人1分。如果观看的是喜剧，观众人数/5 向下取整作为喜剧积分。观众积分和喜剧积分的总和作为总积分。

 > 如果你要给程序添加一个特性，但发现代码因缺乏良好的结构而不易于进行更改，那就先重构那个程序，使其容易添加特性，然后再添加该特性

## 本例中的需求变化
* 如果客户希望以HTML格式输出账单。
* 有新的戏剧类型增加，计费方式，积分方式也不同


## 重构的第一步

> 先检查自己是否有一套可靠的测试集。这些测试必须有自我检验能力。

名言：

> 傻瓜都能写出计算机可以理解的代码，唯有能写出人类容易理解的代码的，才是优秀的程序员。

到目前为止，我们重构的目的主要是让逻辑和机构清晰，把复杂的代码块分解为更小的单元。起一个好的命名。

### 使用的技巧:
* 提炼函数 （106）
* 以查询取代临时变量 （178）
* 内联变量 （123）
* 改变函数声明 （124）
* 拆分循环 （227）
* 移动语句 （223）

### 编程时，需要遵循营地方法则：保证你离开时的代码库一定比来时更健康


本章重构有3个重要节点：

1. 讲原函数分解成一组嵌套的函数
2. 应用拆分阶段分离计算逻辑和输出逻辑
3. 为价格和积分计算引入多态性。


> 好代码的检验标准就是人们是否能轻而易举的修改它。