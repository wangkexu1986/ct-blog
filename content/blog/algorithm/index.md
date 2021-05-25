---
date: "2021-05-24"
title: "各个数据结构值得一刷的leetcode题"
category: "algorithm"
tag: "leetcode刷题整理"
type: "学习整理"
author: "y_lv"
---

## 链表： 链表翻转 哨兵节点（临界条件）

141 环形链表 - 

142 环形链表Ⅱ - 

202 快乐数 - 

206 链表反转（递归） - 

92 链表反转Ⅱ  - 链表区间翻转 虚拟头结点, 普通的递归翻转  

61 旋转链表  LeetCode 

24 两两交换（递归）

19 删除倒数几个链表（虚拟头结点）

[86. 分隔链表](https://leetcode-cn.com/problems/partition-list/)



链表的翻转：

pre是翻转后的头结点， cur是未反转的下一个节点

循环：while(cur!==null){ [cur.next, prev, cur] = [prev, cur, cur.next] }

递归：

```js
var reverseList = function(head) {
    if (!head || !head.next) { return head }
    let tail = head.next, phead = reverseList(head.next);
    head.next = null;
    tail.next = head;
    return phead;
};
```

```js
// 动态规划思想
var reverseList = function(head, n) {
    if (!head || !head.next || n === 1) { return head }
// 对于这次翻转后n-1个已经翻转完成了，tail这个是翻转部分的tail,
    let tail = head.next, phead = reverseList(head.next, n-1);
    head.next = tail.next; // 这个时候的tail.next其实是 未被反转的第一个节点（也就是第n+1节点）
    tail.next = head;
    return phead;
};
```



![!img](https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg)



```js
// 两两翻转
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    if (!head || !head.next) return head;
    let p1 = head, p2 = head.next, q;
    if (p2.next){
        q = swapPairs(p2.next);
        p2.next = q;
    }
    p1.next = p2.next;
    p2.next = p1;
    return p2;  
};
```

## 树

### 常用算法

##### 前中后序遍历 

略

##### 深度优先遍历

参考：https://leetcode-cn.com/tag/depth-first-search/problemset/

|      |                                                              |       |      |      |
| ---- | ------------------------------------------------------------ | ----- | ---- | ---- |
|      | [113. 路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/) | 62.2% | 中等 |      |
| 已做 | [114. 二叉树展开为链表](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/) | 72.3% | 中等 |      |
|      | [116. 填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/) | 69.5% | 中等 |      |
|      | [117. 填充每个节点的下一个右侧节点指针 II](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii/) | 59.9% | 中等 |      |
|      | [124. 二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/) | 43.7% | 困难 |      |
|      | [129. 求根节点到叶节点数字之和](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/) | 67.2% | 中等 |      |
|      | [130. 被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/) | 43.3% | 中等 |      |
|      | [131. 分割回文串](https://leetcode-cn.com/problems/palindrome-partitioning/) | 72.5% | 中等 |      |
|      | [133. 克隆图](https://leetcode-cn.com/problems/clone-graph/) | 67.2% | 中等 |      |
|      | [199. 二叉树的右视图](https://leetcode-cn.com/problems/binary-tree-right-side-view/) | 64.9% | 中等 |      |
|      | [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/) | 53.9% | 中等 |      |
|      | [207. 课程表](https://leetcode-cn.com/problems/course-schedule/) | 54.6% | 中等 |      |
|      | [210. 课程表 II](https://leetcode-cn.com/problems/course-schedule-ii/) | 53.4% | 中等 |      |
|      | [211. 添加与搜索单词 - 数据结构设计](https://leetcode-cn.com/problems/design-add-and-search-words-data-structure/) | 48.2% | 中等 |      |
|      | [257. 二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/) | 67.4% | 简单 |      |
|      | [329. 矩阵中的最长递增路径](https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix/) | 47.4% | 困难 |      |
|      | [332. 重新安排行程](https://leetcode-cn.com/problems/reconstruct-itinerary/) | 44.5% | 中等 |      |
|      | [337. 打家劫舍 III](https://leetcode-cn.com/problems/house-robber-iii/) | 61.3% | 中等 |      |


##### 广度优先算法

参考：https://leetcode-cn.com/tag/breadth-first-search/problemset/

|                                                              |                                                              |       |      |      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ----- | ---- | ---- |
| 已做                                                         | [101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/) | 55.0% | 简单 |      |
| 已做   [issue 99](https://github.com/DreamArts/dac-3g-portal/issues/99) | [102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/) | 64.1% | 中等 |      |
|                                                              | [103. 二叉树的锯齿形层序遍历](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/) | 57.1% | 中等 |      |
|                                                              | [107. 二叉树的层序遍历 II](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/) | 68.9% | 中等 |      |
|                                                              | [111. 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/) | 47.7% | 简单 |      |
|                                                              | [116. 填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/) | 69.5% | 中等 |      |
|                                                              | [126. 单词接龙 II](https://leetcode-cn.com/problems/word-ladder-ii/) | 38.7% | 困难 |      |
|                                                              | [127. 单词接龙](https://leetcode-cn.com/problems/word-ladder/) | 46.4% | 困难 |      |
|                                                              | [130. 被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/) | 43.3% | 中等 |      |
|                                                              | [133. 克隆图](https://leetcode-cn.com/problems/clone-graph/) | 67.2% | 中等 |      |
|                                                              | [199. 二叉树的右视图](https://leetcode-cn.com/problems/binary-tree-right-side-view/) | 64.9% | 中等 |      |
|                                                              | [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/) | 53.9% | 中等 |      |
|                                                              | [207. 课程表](https://leetcode-cn.com/problems/course-schedule/) | 54.6% | 中等 |      |
|                                                              | [210. 课程表 II](https://leetcode-cn.com/problems/course-schedule-ii/) | 53.4% | 中等 |      |



### 一些树

##### 二叉搜索树

二叉搜索树（Binary Search Tree，简称 BST）是一种很常用的的二叉树。它的定义是：一个二叉树中，**任意节点的值要大于等于左子树所有节点的值，且要小于等于右边子树的所有节点的值。**（不等价于 任何节点 左节点< 中 < 右节点 ）

参考： https://github.com/labuladong/fucking-algorithm/blob/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%B3%BB%E5%88%97/%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E6%93%8D%E4%BD%9C%E9%9B%86%E9%94%A6.md



|                                                              |                                                              |       |      |            |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ----- | ---- | ---------- |
| 已做 [issue](https://github.com/DreamArts/dac-3g-portal/issues/97) | [98 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/) |       |      | 注意定义   |
|                                                              | [95. 不同的二叉搜索树 II](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/) | 68.7% | 中等 |            |
|                                                              | [99. 恢复二叉搜索树](https://leetcode-cn.com/problems/recover-binary-search-tree/) | 61.9% | 困难 |            |
|                                                              | [108. 将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/) | 75.3% | 简单 |            |
| 5.25已做                                                     | [450. 删除二叉搜索树中的节点](https://leetcode-cn.com/problems/delete-node-in-a-bst/) | 47.3% | 中等 | 哨兵根节点 |
| 5.24已做                                                     | [701. 二叉搜索树中的插入操作](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/) | 72.4% | 中等 |            |
| 5.24已做                                                     | [700. 二叉搜索树中的搜索](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/) | 75.6% | 简单 |            |




##### 二叉堆

二叉堆（Binary Heap）没什么神秘，性质比二叉搜索树 BST 还简单。其主要操作就两个，`sink`（下沉）和 `swim`（上浮），用以维护二叉堆的性质。其主要应用有两个，首先是一种排序方法「堆排序」，第二是一种很有用的数据结构「优先级队列」。

参考：https://github.com/labuladong/fucking-algorithm/blob/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%B3%BB%E5%88%97/%E4%BA%8C%E5%8F%89%E5%A0%86%E8%AF%A6%E8%A7%A3%E5%AE%9E%E7%8E%B0%E4%BC%98%E5%85%88%E7%BA%A7%E9%98%9F%E5%88%97.md



|      |                                                              |       |      |      |
| ---- | ------------------------------------------------------------ | ----- | ---- | ---- |
|      | [23. 合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/) | 55.1% | 困难 |      |
|      | [215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/) | 64.6% | 中等 |      |
|      | [218. 天际线问题](https://leetcode-cn.com/problems/the-skyline-problem/) | 46.9% | 困难 |      |
|      | [239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/) | 49.5% | 困难 |      |
|      | [264. 丑数 II](https://leetcode-cn.com/problems/ugly-number-ii/) | 57.1% | 中等 |      |
|      | [295. 数据流的中位数](https://leetcode-cn.com/problems/find-median-from-data-stream/) | 51.9% | 困难 |      |
|      | [313. 超级丑数](https://leetcode-cn.com/problems/super-ugly-number/) | 64.5% | 中等 |      |

##### 前缀树

|      |                                                              |       |      |      |
| ---- | ------------------------------------------------------------ | ----- | ---- | ---- |
|      | [208. 实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/) | 71.6% | 中等 |      |
|      | [211. 添加与搜索单词 - 数据结构设计](https://leetcode-cn.com/problems/design-add-and-search-words-data-structure/) | 48.2% | 中等 |      |
|      | [212. 单词搜索 II](https://leetcode-cn.com/problems/word-search-ii/) | 45.4% | 困难 |      |
|      | [336. 回文对](https://leetcode-cn.com/problems/palindrome-pairs/) | 40.1% | 困难 |      |
|      | [421. 数组中两个数的最大异或值](https://leetcode-cn.com/problems/maximum-xor-of-two-numbers-in-an-array/) | 62.4% | 中等 |      |



##### 二叉索引树（树状数组）

|      |                                                              |       |      |      |
| ---- | ------------------------------------------------------------ | ----- | ---- | ---- |
|      | [307. 区域和检索 - 数组可修改](https://leetcode-cn.com/problems/range-sum-query-mutable/) | 55.5% | 中等 |      |
|      | [315. 计算右侧小于当前元素的个数](https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/) | 42.0% | 困难 |      |
|      | [327. 区间和的个数](https://leetcode-cn.com/problems/count-of-range-sum/) | 42.9% | 困难 |      |
|      | [493. 翻转对](https://leetcode-cn.com/problems/reverse-pairs/) | 34.2% | 困难 |      |
|      | [1649. 通过指令创建有序数组](https://leetcode-cn.com/problems/create-sorted-array-through-instructions/) | 46.9% | 困难 |      |



#####

##### 红黑树（一种自平衡二叉查找树）

|      |                                                              |       |      |      |
| ---- | ------------------------------------------------------------ | ----- | ---- | ---- |
|      | [1382. 将二叉搜索树变平衡](https://leetcode-cn.com/problems/balance-a-binary-search-tree/) | 68.6% | 中等 |      |
|      |                                                              |       |      |      |



### 用途

react源码

组织结构

霍夫曼树


