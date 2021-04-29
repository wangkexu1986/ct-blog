---
date: "2020-09-16"
title: "70. 爬楼梯"
level: "简单"
tag: "矩形"
---

## 题目
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

示例 1：
```shell script
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
```

示例 2：
```shell 
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```


[来源：力扣（LeetCode）](https://leetcode-cn.com/problems/climbing-stairs)

## 解题

### xiaozhouzhou
题解1 排列组合
```js
/**
 * @param {number} n
 * @return {number}
 */

function Factorial1(num)
{
    if(num == 0) {
        return 1;
    }
    return num*Factorial1(num-1)
}

function sum(x,y) {
    
    return Factorial1(x+y)/Factorial1(x)/Factorial1(y)
}
var climbStairs = function(n) {
    var result = 0;
    for(var i = 0;i <= n;i++) {
        var y =  (n-i)/2;
        if(y%1 === 0) {
            result += sum(i,y);
        }
    }
    return result;
};
```

题解2
```js
/**
 * @param {number} n
 * @return {number}
 */


var climbStairs = function(n) {
    var result = [1,2];
    for(var i = 2;i<n; i++) {
        result[i] = result[i-1]+result[i-2];
    }
    return result[n-1];
};
```

### fangq78
```java
class Solution {
    public int climbStairs(int n) {
        List<Integer> list = new ArrayList<Integer>();
        list.add(1);
        list.add(2);
        for (int i=2;i<n;i++) {
            list.add(list.get(i-1)+list.get(i-2));
        }
        return list.get(n-1);
    }
}
```

### 84ms
```js
var climbStairs = function(n) {
  let prev = 1;
  let cur = 1;
  for (let i = 2; i < n + 1; i++) {
    const temp = cur;
    cur = prev + cur;
    prev = temp;
  }
  return cur;
};
```

### Aria486 100ms
```js 
var climbStairs = function(n) {
  if (n < 1) {
    return 0
  } else if (n === 1) {
    return 1
  } else if (n === 2) {
    return 2
  }
  let a = 1;
  let b = 2;
  let reslut;
  for (let i = 3; i <= n; i++) {
    reslut = a + b
    a = b
    b = reslut
  }
  return reslut
};
```

### dutLyuyu 72ms
```js
var climbStairs = function(n) {
   let sqrt5 = Math.sqrt(5);
   let fibn = Math.pow((1 + sqrt5) / 2, n + 1) - Math.pow((1 - sqrt5) / 2, n + 1);
    return fibn / sqrt5;
};
```