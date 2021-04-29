---
date: "2021-04-23"
title: "104. 二叉树的最大深度"
level: "简单"
tag: "二叉树"
---

## 题目
给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，
```shell
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

[来源：力扣（LeetCode）](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree)


## 解题

### Aria486 90ms 

```js
var maxDepth = function(root) {
  if (!root) {
    return 0;
  }
  let res = 0;
  let rootArr = [root];
  while (rootArr.length > 0) {
    let nodeLen = rootArr.length;
    if (nodeLen > 0) {
      res++;
    }
    while (nodeLen--) {
      const node = rootArr.shift();
      if (node.left ) {
        rootArr.push(node.left);
      }
      if (node.right) {
        rootArr.push(node.right);
      } 
    }
  }
  return res;
};
```

### fangq78 0ms

```java
class Solution
{
    public int maxDepth(TreeNode root)
    {
        if(root==null)
        {
            return 0;
        }

        if (root.left != null || root.right != null) {
            return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
        }

        return 1;
    }
}
```

### dutLyuyu

```js
var maxDepth = function(root) {
    const depthCount = (node) => {
        if(!node) return 0;
        const l = depthCount(node.left);
        const r = depthCount(node.right);
        return l > r ? l + 1 : r + 1;
    } 
    return depthCount(root);
};
```