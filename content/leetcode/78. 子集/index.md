---
date: "2020-11-04"
title: "78. 子集"
level: "中等"
tag: "矩形"
---

## 题目
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
示例 1：

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
示例 2：

输入：nums = [0]
输出：[[],[0]]
 

提示：

1 <= nums.length <= 10
-10 <= nums[i] <= 10
nums 中的所有元素 互不相同

[来源：力扣（LeetCode）](https://leetcode-cn.com/problems/subsets)

## 解题

### dutLyuyu 
```js
var subsets = function(nums) {
    const res = [[]];
    for(let i = 0; i<nums.length; i++){
        let curLen = res.length;
        for(let j = 0; j < curLen; j++){
            const resx2 = [...res[j], nums[i]];
            res.push(resx2);
        }
    }
    return res;
};
```

### Aria486 100ms
```js
var subsets = function(nums) {
    let res = [[]];
    sub(0,[]);
    return res;
    const sub = (st,arr) => {
        for(let i=st; i<nums.length; i++){
            arr.push(nums[i]);
            res.push([...arr]);
            sub(i+1,arr);
            arr.pop();
        }
    }
};
```

### xiaozhouzhou 76ms
```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let sum = Math.pow(2, nums.length);
    var result = [];
    for (var i = 0;i<sum;i++) {
       var j = i;
       var count = 0;
       var sub = [];
        result.push(sub);
        while(j > 0) {
            var yushu = j % 2;
            j = j>>1;
            if(yushu > 0) {
                sub.push(nums[count]);
            } 
            count ++;
        }
           
    }
    return result;
};
```

### fangq78 76ms
```js
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<List<Integer>>();
        if (nums == null || nums.length == 0) {
            return result;
        }
        result.add(new ArrayList<Integer>());
        int flag = 1;
        while (flag <= nums.length) {
            for (int i=0; i<nums.length; i++) {
                List<Integer> list = new ArrayList<Integer>();
                for (int j=0;j<flag;j++) {
                    if (j+i>=nums.length) {
                        break;
                    }
                    list.add(nums[j+i]);
                }
                result.add(list);
            }
            flag++;
        }
        return result;
    }
}
```