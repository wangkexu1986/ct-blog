---
date: "2020-09-23"
title: "72. 编辑距离"
level: "困难"
tag: "矩形"
---

## 题目
给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：

插入一个字符
删除一个字符
替换一个字符
 

示例 1：
```shell script
输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
```

示例 2：
```shell script
输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')
```

 

提示：

0 <= word1.length, word2.length <= 500
word1 和 word2 由小写英文字母组成

[来源：力扣（LeetCode）](https://leetcode-cn.com/problems/edit-distance)

## 解题

### dutLyuyu 
#### 子问题：
dp[i][j] = min( dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + int(word1[i] != word2[j]) )

ps: 
自顶向下不好推
自底向上：
![image](https://user-images.githubusercontent.com/40752791/93743815-5185ce80-fc23-11ea-83a4-d1b8d99ca2be.png)

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  const memo = [];

  const getSmallest = (i, j) => {
    const s1 = memo[i][j-1] > memo[i-1][j] ? memo[i-1][j] : memo[i][j-1];
    return s1 > memo[i-1][j-1] ? memo[i-1][j-1] : s1;
  };

  // 纵轴是word1
  for (let i = 0; i <= word1.length; i++){
    memo[i] = [i];
    for(let j = 1; j <= word2.length; j++){
      if(i === 0){
        memo[0].push(j);
      }else{
        if(word1[i-1] === word2[j-1]){
          memo[i].push( memo[i-1][j-1] > getSmallest(i, j) + 1 ? getSmallest(i, j) + 1 : memo[i-1][j-1] );
        }else{
          memo[i].push(getSmallest(i, j) + 1);
        }
      }
    }
  }


  return memo[word1.length][word2.length];
};
```

### slsay 446ms
```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    const len1 = word1.length;
    const len2 = word2.length;
    const result = {};
    let diff, up, left, leftUp;

    for (let i = 0; i <= len1; i++) {
        result[`${i}-0`] = i;
    }

    for (let i = 0; i <= len2; i++) {
        result[`0-${i}`] = i;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            diff = (word1[i-1] === word2[j-1]) ? 0 : 1;
            up = result[`${i-1}-${j}`] + 1;
            left = result[`${i}-${j-1}`] + 1;
            leftUp = result[`${i-1}-${j-1}`] + diff;
            result[`${i}-${j}`] = Math.min(up, left, leftUp);
        }
    }

    return result[`${len1}-${len2}`];
};
```