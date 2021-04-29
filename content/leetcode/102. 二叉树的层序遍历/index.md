---
date: "2021-04-16"
title: "102. 二叉树的层序遍历"
level: "中等"
tag: "二叉树"
---

## 题目

给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

示例：
二叉树：[3,9,20,null,null,15,7],
```shell
    3
   / \
  9  20
    /  \
   15   7
```

返回其层序遍历结果：
```shell
[
  [3],
  [9,20],
  [15,7]
]
```
[来源：力扣（LeetCode）](https://leetcode-cn.com/problems/binary-tree-level-order-traversal)

## 解题

### slsay 84ms
```js
var levelOrder = function(root) {
    if (!root) return [];
   const result = {};
   let index = 0;
   const split = (node, index) => {
       if (node) {
        const temp = [];
        result[index] = result[index] || [];
        result[index].push(node.val);
        index = index + 1;
        split(node.left, index);
        split(node.right, index);
       }
   }
   split(root, index);
   return Object.values(result);
};
```

### Aria486 ms
```js
var levelOrder = function (root) {
  if (!root) {
   return [];
  }
  let res = [];
  let rootArr = [root];
  while (rootArr.length > 0) {
    let nodeArr = [];
    let nodeLen = rootArr.length;
    while (nodeLen--) {
      const node = rootArr.shift();
      nodeArr.push(node.val);
      if (node.left) {
        rootArr.push(node.left);
      }
      if (node.right) {
        rootArr.push(node.right);
      } 
    }
    res.push(nodeArr)
  }
  return res;
};
```

### dutLyuyu
```js
var levelOrder = function(root) {
    const re = [];
    const loop = (node, level) => {
        if(node === null){
            return;
        }
        if(re[level] === undefined){
            re[level] = [];
        }
        re[level].push(node.val);

        if(node.left !== null){
            loop(node.left, level + 1);
        }
        if(node.right !== null){
            loop(node.right, level + 1);
        }
    };
    loop(root, 0);
    return re;
};
```

### kojo-jotaro 
```c++
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> result;
        queue<TreeNode*> q;
        if(root==nullptr) return result;
        q.push(root);
        while(!q.empty()){
            vector<int> mid;
                std::cout<<q.size()<<' ';
            int len=q.size();
            for(int i=0;i < len;i++){
                std::cout<<q.size()<<endl;
                TreeNode* q_mid=q.front();
                q.pop();
                mid.push_back(q_mid->val);
                if(q_mid->left!=nullptr) q.push(q_mid->left);
                if(q_mid->right!=nullptr) q.push(q_mid->right);
            }
            result.push_back(mid);
        }
        return result;
    }
};
```