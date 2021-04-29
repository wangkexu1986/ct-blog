---
date: "2020-10-14"
title: "75. 颜色分类"
level: "中等"
tag: "矩形"
---

## 题目
给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

 

示例 1：

输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
示例 2：

输入：nums = [2,0,1]
输出：[0,1,2]
示例 3：

输入：nums = [0]
输出：[0]
示例 4：

输入：nums = [1]
输出：[1]
 

提示：

n == nums.length
1 <= n <= 300
nums[i] 为 0、1 或 2
 

进阶：

你可以不使用代码库中的排序函数来解决这道题吗？
你能想出一个仅使用常数空间的一趟扫描算法吗？


[来源：力扣（LeetCode）](https://leetcode-cn.com/problems/sort-colors)

## 解题

### slsay 80ms
```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    let cur = 0;
    let temp;
    while (cur <= right) {
        if (nums[cur] === 0) {
            temp = nums[left];
            nums[left] = nums[cur];
            nums[cur] = temp;
            left += 1;
            cur += 1;
        } else if (nums[cur] === 2) {
            temp = nums[right];
            nums[right] = nums[cur];
            nums[cur] = temp;
            right += -1;
        } else {
            cur += 1;
        }
    }
};
```

### dutLyuyu 100ms
```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    const r = [0, 0 ,0];
    for (let i = 0; i < nums.length; i++ ){
        r[nums[i]]++;
    }

    for(let i = 0; i < nums.length; i++ ){
        if(i+1 <= r[0]){
            nums[i] = 0;
        }else if( i + 1 <= r[1] + r[0]){
            nums[i] = 1;
        }else{
            nums[i] = 2;
        }
    }
    return nums;
};
```

### Aria486 90ms
```js
const sortColors = (nums) => {
  const colors = [0, 0, 0];
  for (let i = 0; i < nums.length; i++) {
    colors[nums[i]] ++;
  }
  let j = 0;
  for (let i = 0; i < colors.length; i++) {
    while (colors[i]) {
      nums[j] = i;
      j++;
      colors[i]--;
    }
  }
  return nums;
};
```