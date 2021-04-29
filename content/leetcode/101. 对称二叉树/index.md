---
date: "2021-04-09"
title: "101. 对称二叉树"
level: "简单"
tag: "二叉树"
---

## 题目
给定一个二叉树，检查它是否是镜像对称的。
例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
```shell script
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
```shell script
    1
   / \
  2   2
   \   \
   3    3
```

进阶：
你可以运用递归和迭代两种方法解决这个问题吗？

[来源：力扣（LeetCode）](https://leetcode-cn.com/problems/symmetric-tree)

## 解题

### slsay 96ms
```js
var isSymmetric = function(root) {
   const diff = (left, right) => {
       if (!left && !right) return true;
       if (!left || !right) return false;
       if (left.val === right.val)　{
           return diff(left.left, right.right) && diff(left.right, right.left);
       } else {
           return false;
       }
   };

   return diff(root, root);
};
```

### fangq78 0ms
```java
class Solution {
    public boolean isSymmetric(TreeNode root) {
        return isPair(root, root);
    }

    public boolean isPair(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null) return false;
        return (t1.val == t2.val)
            && isPair(t1.right, t2.left)
            && isPair(t1.left, t2.right);
    }
}
```

### Aria486 92ms
```js
var isSymmetric = function(root) {
  if(!root) {
    return true;
  }
  const isEqual = (left, right) => {
    if(!left && !right) {
      return true;
    }
    if(!left || !right) {
      return false;
    }
    return left.val === right.val && isEqual(left.left, right.right) && isEqual(left.right, right.left);
  }
  return isEqual(root.left, root.right);
};
```

### dutLyuyu
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

// 左中右 遍历出所有节点之后 比较 + 按层
var isSymmetric = function(root) {
    const arr = [];
    const loop = (node, level)=> {
        if (!arr[level]) arr[level] = [];
        if (!node) {
            arr[level].push('#');
            return;
        } else {
            arr[level].push(node.val);
        }
      
        // if (!(node.left === null && node.right === null)){ 
        //     loop(node.left, level + 1);
        //     loop(node.right, level + 1);
        // } 

        let flag = 0; 
        if(node.left === null){
            flag++;
        } else if(node.right === null){
            flag++;
        }

        if(node.left !== null){
            loop(node.left, level + 1);
        } else if(flag === 1){
           loop(node.left, level + 1);
        }
    
        if(node.right !== null){
            loop(node.right, level + 1);
        } else if(flag === 1){
            loop(node.right, level + 1);
        }
    }
    loop(root, 0);
    for (let level = 0; level < arr.length; level++){
            for (let i = 0, j = arr[level].length - 1; i < j; i++, j--) {
                if (arr[level][i] !== arr[level][j]) {
                    return false;
                }
            }
    }
    return true
};
```

### xiaozhouzhou 有问题 没跑通
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

var getLeft = function (point) {
    var array = [];
    if(point) {
        var val = point.val;
        if(!val) {
            val = "null";
        }

        
        array = [...getLeft(point.right),val,...getLeft(point.left) ];
        
    }
    return array;
}
var getRight = function(point,array) {
var array = [];
    if(point) {
        var val = point.val;
        if(!val ) {
            val = "null";
        }
        array = [...getRight(point.left),val,...getRight(point.right) ];
        
    }
    return array;
}
var isSymmetric = function(root) {
    if(root) {
        var leftArray = getLeft(root.left);
        var rightArray = getRight(root.right);
        console.log(leftArray);
        console.log(rightArray);
        if(leftArray.join(",") === rightArray.join(",")) {
            return true;
        }else {
            return false;
        }
    }else {
        return false;
    }
};
```