---
date: "2021-02-19"
title: "84. 柱状图中最大的矩形"
level: "中等"
tag: "矩形"
---

## 题目
给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。
![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/histogram.png)

以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。
![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/histogram_area.png)
图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。

示例:

输入: [2,1,5,6,2,3]
输出: 10

[来源：力扣（LeetCode）](https://leetcode-cn.com/problems/largest-rectangle-in-histogram)

## 解题

### dutLyuyu 
```js
/**
 * @param {number[]} heights
 * @return {number}
 */

const IncreStack = {
    val: [],
    // 空栈栈顶和pop 结果返回undefined
    top: function(){
        return this.val[this.val.length - 1];
    },
    pop: function(){
        return this.val.pop();
    }
};

var largestRectangleArea = function(heights) {
    let re = 0;

    // 矩阵后各添加一个height为0的矩阵
    // increStrack 存的是index
    // 但是单调栈维护 以heights为准
    const increStack = Object.create(IncreStack);
    heights.push(0);

    const updateResult = (comingIndex) => {
        const cur = increStack.pop();
        // 栈里面前一个数、也就是下一个栈顶
        let pre = increStack.top() === undefined ? - 1 : increStack.top();
        let tmp = (comingIndex - pre - 1) * heights[cur];
        re = re > tmp ? re : tmp;
        return pre;
    };

    increStack.val = [0];
    for(let i = 1; i < heights.length; i++){
        let top = increStack.top();
        while(heights[i] < heights[top]){
            top = updateResult(i);
        }
        if(top === -1 || heights[i] > heights[top]){
            increStack.val.push(i);
        }else if(heights[i] === heights[top]){
            // !!
            increStack.val[increStack.val.length - 1] = i;
        }
    }
    return re;
};
```

### fangq78 超时
```js
class Solution {
    public int largestRectangleArea(int[] heights) {
        if (heights.length==0) {
            return 0;
        }
        
        int maxArea = 0;
        for (int i=0; i<heights.length; i++) {
            int count = count(i,heights);
            maxArea = count > maxArea?count:maxArea;
        }        
        return maxArea;
    }
    
    private int count(int idx,int[] heights) {
        int base = heights[idx];
        int sameCount = 0;
        int result = 0;
        for (int i=idx; i<heights.length; i++) {
            if (base <= heights[i]) {
                sameCount++;
                continue;
            }

            int tmp = sameCount*base;
            if (tmp>(heights.length-idx)*heights[i]) {
                break;
            }
            result = result < tmp? tmp : result;
            base = heights[i];
            sameCount++;
        }
        result = result < sameCount*base? sameCount*base : result;
        return result;
    }
}
```

### slsay 超时
```js
/**
* @param {number[]} heights
* @return {number}
*/
var largestRectangleArea = function(heights) {
 let maxResult = 0;
 const result = [...heights];
 const len = heights.length;
 for (let i = 0; i < len; i++) {
   // left
   for (let l = i - 1; l >= 0 && l < i; l--) {
       if (heights[l] >= heights[i]) {
           result[i] += heights[i];
       } else {
           break;
       }
   }

   // right
   for (let r = i + 1; r < len; r++) {
       if (heights[r] >= heights[i]) {
           result[i] += heights[i];
       } else {
           break;
       }
   }
   maxResult = Math.max(maxResult, result[i]);
 }

 return maxResult;
};
```

### xiaozhouzhou
```js
/**
 * @param {number[]} heights
 * @return {number}
 */

var handleStack  = function(heights,stack,height,heigthIndex,max) {
    if(heights[stack[stack.length -1]] > height) {
        var popT = stack.pop();
        max.value = max.value < heights[popT] * (heigthIndex - stack[stack.length -1] -1) ? heights[popT] * (heigthIndex - stack[stack.length -1] -1) : max.value;
        handleStack(heights,stack,height,heigthIndex,max);
    }else {
        stack.push(heigthIndex);
    }
} 
var largestRectangleArea = function(heights) {
    heights =  [0,...heights,0];
    var stack = [];
    var max = {value:0};
    for(var index in heights) {
        if(stack.length == 0) {
            stack.push(index);
        }else {
            handleStack(heights,stack,heights[index],index,max);
        }
    }
    return max.value;
};
```