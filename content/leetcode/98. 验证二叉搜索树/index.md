---
date: "2021-03-26"
title: "98. 验证二叉搜索树"
level: "中等"
tag: "二叉树"
---

## 题目
给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。
示例 1:
```shell
输入:
    2
   / \
  1   3
输出: true
```

示例 2:
```shell
输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
```
解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。

[来源：力扣（LeetCode）](https://leetcode-cn.com/problems/validate-binary-search-tree)

## 解题

### xiaozhouzhou 116ms
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var getArrayFromPoint = function(point) {
    var arrayleft =[];
    var arrayRight = [];
    if(point.left) {
        arrayleft = getArrayFromPoint(point.left);
    }
    if(point.right) {
        arrayRight = getArrayFromPoint(point.right);
    }

    return [...arrayleft,point.val,...arrayRight];
}
  
var isValidBST = function(root) {
    var array = getArrayFromPoint(root);
    console.log(array);
    for(var i =0;i<array.length-1;i++) {
        if(array[i]>=array[i+1]) {
            return false;
        }
    }
    return true;
};
```

### dutLyuyu 104ms
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    // let flag = true;
    const loop = (root, leftSide, rightSide) => {
        let tmp = true;
        if(leftSide !== null){
            tmp = root.val > leftSide;
        }
        if(rightSide !== null){
            tmp = tmp && root.val < rightSide;
        }
        if(tmp && root && root.left !== null){
            tmp = loop(root.left, leftSide, root.val);
        }
        if( tmp && root && root.right !== null){
             tmp = loop(root.right, root.val, rightSide);
        }
        return tmp;

        // if(root === null || (root.left === null && root.right === null)){
        //     return true;
        // }
        // if(root.left !== null ){
        //     if(leftSide !== null){
        //         flag = root.left.val < root.val  && root.left.val > leftSide
        //     } else {
        //         flag = root.left.val < root.val;
        //     }
        //     if(flag){
        //          loop(root.left, leftSide, root.val);
        //     } 
        // } 
        
        // if(flag && root.right !== null ){
        //     if(rightSide !== null){
        //         flag = root.right.val > root.val && root.right.val < rightSide;
        //     } else {
        //         flag = root.right.val > root.val;
        //     }
             
        //     if(flag){
        //          loop(root.right, root.val, rightSide);
        //     }   
        // }
    }

    return loop(root, null, null);
}
```

### slsay 108ms
```js
var isValidBST = function(root) {
   let result = true;
   const check = (node, min, max) => {
       const { val, left, right } = node;

       if ((val >= max) || (val <= min)) {
           result =  false;
           return;
       } else {
           left && check(left, min, val);
           right && check(right, val, max);
       }
   }
   check(root, -Infinity, Infinity);
   return result;
};
```

### Aria486
```js
  const loop = (root, min, max) => {
    if (!root) {
      return true;
    } 
    if (root.val >= max || root.val <= min) {
      return false;
    } 
    return loop(root.left, min, root.val)
      && loop(root.right, root.val, max);
  }

var isValidBST = function (root) {
  return loop(root, -Infinity, Infinity)
};
```