---
date: "2020-10-28"
title: "76. 最小覆盖子串"
level: "困难"
tag: "矩形"
---

## 题目
给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

注意：如果 s 中存在这样的子串，我们保证它是唯一的答案。


示例 1：

输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
示例 2：

输入：s = "a", t = "a"
输出："a"
 

提示：

1 <= s.length, t.length <= 105
s 和 t 由英文字母组成
 

进阶：你能设计一个在 o(n) 时间内解决此问题的算法吗？

[来源：力扣（LeetCode）](https://leetcode-cn.com/problems/minimum-window-substring)

## 解题
### DA-ly-xu 53ms
```java
class Solution {
 public String minWindow(String s, String t) {
 	if (s == null || t == null || t.length() > s.length()) {
 		return "";
 	}
 	char[] charsOfT = t.toCharArray();
 	Map<Character, Integer> targetBucket = new HashMap<Character, Integer>();
 	for (char c : charsOfT) {
 		Integer count = targetBucket.get(c);
 		if (count == null) {
 			targetBucket.put(c, 1);
 		} else {
 			targetBucket.put(c, ++count);
 		}
 	}

 	Map<Character, Integer> collector = new HashMap<Character, Integer>();
 	int[] shortest = new int[] { -1, -1 };
 	int shortWindowWidth = Integer.MAX_VALUE;

 	int left = 0;
 	int right = 0;
 	for (int i = 0; i < s.length(); i++) {
 		char c = s.charAt(i);
 		right = i;
 		if (targetBucket.keySet().contains(c)) {
 			Integer countInCollector = collector.get(c);
 			if (countInCollector == null) {
 				collector.put(c, 1);
 			} else {
 				collector.put(c, ++countInCollector);
 			}
 			if (isDesirable(targetBucket, collector)) {
 				// 該当windowがすべて含む条件を満たした
 				while (left < right) {
 					char contractWindow = s.charAt(left);
 					Integer countOfContractWindow = collector.get(contractWindow);
 					Integer countInTarget = targetBucket.get(contractWindow);
 					if (countOfContractWindow == null) {
 						left++;
 					} else if (countOfContractWindow - 1 >= countInTarget) {
 						// left edgeを削除しても条件を満たす
 						left++;
 						collector.put(contractWindow, countOfContractWindow - 1);
 					} else {
 						break;
 					}
 				}
 				char nextWindow = s.charAt(left);
 				Integer countForNextRound = collector.get(nextWindow);
 				if (countForNextRound == 1) {
 					collector.remove(nextWindow);
 				} else {
 					collector.put(nextWindow, countForNextRound - 1);
 				}
 				if (right - left + 1 < shortWindowWidth) {
 					shortWindowWidth = right - left + 1;
 					shortest[0] = left;
 					shortest[1] = right;
 				}
 				i = right;
 				left++;
 			}
 		}
 		continue;
 	}

 	if (shortest[0] == -1 && shortest[1] == -1) {
 		return "";
 	}
 	return s.substring(shortest[0], shortest[1] + 1);
 }

 public boolean isDesirable(Map<Character, Integer> targetMap, Map<Character, Integer> sourceMap) {
 	return targetMap.keySet().stream().allMatch(key -> {
 		Integer inT = targetMap.get(key);
 		Integer inS = sourceMap.get(key);
 		if (inS == null) {
 			return false;
 		}
 		return inS >= inT;
 	});
 }
}
```

### Aria486 110ms
```js
const minWindow = (s, t) => {
  let minLen = Infinity;
  let lIndex; 
  let charMap = {};                
  let charType = 0;         
  for (const char of t) {      
    if (!charMap[char]) {
      charType++;          
      charMap[char] = 1;
    } else { 
      charMap[char]++;
    }
  }
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    let rightChar = s[right];          
    if (charMap[rightChar] !== undefined) {
       charMap[rightChar]--; 
    }
    if (charMap[rightChar] === 0) {
        charType--;             
    }
    while (charType === 0) { 
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        lIndex = left;                   
      }
      let leftChar = s[left];          
      if (charMap[leftChar] !== undefined) {
        charMap[leftChar]++;
      }
      if (charMap[leftChar] > 0) {
        charType++;
      }
      left++;                          
    }
  }
  return s.substring(lIndex, lIndex + minLen);
};
```

### dutLyuyu 148ms
```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

var minWindow = function(s, t) {
  let tlen = t.length;
  let slen =s.length;

  // ? 左闭右开
  let left = 0;
  let right = 0;

  let minlen = slen + 1;
  let begin;
  let tmap = {};
  let winmap = {};

  for(let i = 0; i < tlen; i++){
    tmap[t[i]] > 0 ? tmap[t[i]]++ : (tmap[t[i]] = 1);
  }

  let distance = 0;

  // ?
  while(right < slen + 1){

    if((winmap[s[right]]||0)< tmap[s[right]] ){
      distance++;
    }

    if(tmap[s[right]]){
      winmap[s[right]] > 0 ? winmap[s[right]]++ : (winmap[s[right]] = 1);
    }
    right++;

    while(distance === tlen){
      if(right - left < minlen){
        minlen = right - left;
        begin = left;
      }


      if(typeof winmap[s[left]] ==='number' && winmap[s[left]] === tmap[s[left]]){
        distance--;
      }

      if(tmap[s[left]]){
        winmap[s[left]]--;
      }
      left++;
    }
  }

  if(minlen === s.length +1 ){
    return ''
  }
  return s.substring(begin , minlen + begin);
};
```

### xiaozhouzhou 超时
```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    let sStart = 0;
    let subStr = "";
    let tempT = t;
    let array = [];
    let tempArray = [];
    if(s.length < t.length) {
        return "";
    }
   
    while(sStart < s.length) {
        const outIndex = t.indexOf(s[sStart])
        if(outIndex > -1) {
            array.push(sStart);
        }
        sStart ++;
    }
    sStart = 0;
    while(sStart < array.length) {
        const index = tempT.indexOf(s[array[sStart]])
        tempArray.push(sStart);
        if(index > -1) {
            tempT = tempT.slice(0, index) + tempT.slice( index+1);
            if(tempT == "") {
                if(subStr == "" || (subStr != "" && subStr.length > (array[sStart] - array[tempArray[0]] + 1))) {
                    subStr = s.substring(array[tempArray[0]],array[sStart] +1);
                }
                tempT = t;
                if(tempArray.length > 1) {
                   sStart = tempArray[1] ;
                }else {
                    sStart ++;
                }

                tempArray = [];
            }else {
                sStart ++;
            }
            
        }else {
            sStart ++;
        }
             
    }
    
    return subStr;

};
```

### fangq78 超时
```js
class Solution {
    public String minWindow(String s, String t) {
        Map<Character, Integer> map = new HashMap<>();
        if (s==null || t==null || t.length()==0 || s.length()==0) {
            return "";
        }
        for (Character c : t.toCharArray()) {
            map.put(c,map.get(c)!=null?map.get(c)+1:1);
            if (!s.contains(String.valueOf(c))) {
                return "";
            }
        }
        String result = new String(s);
        
        int pointStart = 0;
        int pointEnd = 0;
        while(pointEnd<s.length()) {
            Character c = s.charAt(pointEnd);
            if (map.get(c)!=null) {
                if (map.get(c)==1) {
                    map.remove(c);
                } else {
                    map.put(c,map.get(c)-1);
                }
            }
            if (map.size() == 0) {
                if (result.length()>pointEnd-pointStart+1) {
                    result = s.substring(pointStart,pointEnd+1);
                }
                if (result.length()==t.length()) {
                    return result;
                }
                
                while (true) {
                    
                    map.clear();
                    for (Character c1 : t.toCharArray()) {
                        map.put(c1,map.get(c1)!=null?map.get(c1)+1:1);
                    }
                    for (int i = pointStart+1;i<pointEnd+1;i++) {
                        if (map.get(s.charAt(i))!=null) {
                            if (map.get(s.charAt(i))==1) {
                                map.remove(s.charAt(i));
                            }  else {
                               map.put(s.charAt(i),map.get(s.charAt(i))-1);
                            }
                        } 
                        if (map.size() == 0) {
                            if (result.length()>pointEnd-pointStart+1) {
                                result = s.substring(pointStart,pointEnd+1);
                            }
                            if (result.length()==t.length()) {
                                return result;
                            }
                            pointStart++;
                            break;
                        }
                    }
                    if (map.size() > 0) {
                        break;
                    } 
                    
                }
                
                pointEnd=pointStart;

                for (Character c1 : t.toCharArray()) {
                    map.put(c1,map.get(c1)!=null?map.get(c1)+1:1);
                }
            } else {
                pointEnd++;
            }
        }
        return result;
    }
}
```