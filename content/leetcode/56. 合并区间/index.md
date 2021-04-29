---
date: "2020-08-26"
title: "56. 合并区间"
level: "中等"
tag: "矩形"
---

## 题目

以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。


示例 1：

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2：

输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 

提示：

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104

[来源：力扣（LeetCode）](https://leetcode-cn.com/problems/merge-intervals)

## 解题

### slsay
题解1 96ms
```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (intervals.length < 2) return intervals;
    intervals.sort(function(x, y){
        return x[0] - y[0];
    });

    const result = [intervals[0]];
    
    for (let i = 1, len = intervals.length; i < len; i++) {
        let flag = true;
        for (let j = 0, jLen = result.length; j < jLen; j++) {
            if ( intervals[i][1] < result[j][0] || intervals[i][0] > result[j][1]) {
                continue;
            } else {
                result[j][0] = Math.min(result[j][0], intervals[i][0]);
                result[j][1] = Math.max(result[j][1], intervals[i][1]);
                flag = false;
            }
        }

        if (flag) {
            result.push(intervals[i]);
        }
    }

    return result;
};
```

题解2 92s
```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (intervals.length < 2) return intervals;
    intervals.sort(function(x, y){
        return x[0] - y[0];
    });

    const result = [intervals[0]];

    for (let i = 1, len = intervals.length; i < len; i++) {
        const last = result[result.length - 1];
        if (intervals[i][0] > last[1]) {
            result.push(intervals[i]);;
        } else {
            last[1] = Math.max(last[1], intervals[i][1]);
        }
    }

    return result;
};
```

### xiaozhouzhou 84ms
```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if(intervals.length == 0) {
        return [];
    }
    intervals = intervals.sort(
    (a, b) => {
            if(a[0] > b[0]) {
                return 1;
            }else {
                return -1;
            }
        }
    );
    var result = [intervals[0]];
    for(var i = 1;i<intervals.length;i++) {
        if(intervals[i][0]<=result[result.length-1][1]) {
            result[result.length-1][1] = result[result.length-1][1] > intervals[i][1] ? result[result.length-1][1] : intervals[i][1];
        }else {
            result.push(intervals[i]);
        }
    }
    return result;
};
```

### wangkexu1986 200ms
```switch
class Solution {
    func merge(_ intervals: [[Int]]) -> [[Int]] {
            if intervals.count <= 1 {
                return intervals
            }

        var list = intervals.sorted { (arr1, arr2) -> Bool in
            if Int(arr1.first!) < Int(arr2.first!) {
                return true
            } else {
                return false
            }
        }

        var i : Int = 1
        while i < list.count {
            if list[i].last! < list[i - 1].last! {
                list.remove(at : i)
             } else if list[i].first! <= list[i - 1].last! {
                 list[i - 1] = [list[i - 1].first!, list[i].last!]
                 list.remove(at : i)
             } else {
                 i += 1
             }
            }
        return list
    }
}
```

### kojo-jotaro 52ms
```c++
class Solution {
public:
    static bool cmp(const vector<int> &a,vector<int> &b){
        return a[0] < b[0];
    }
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), cmp);

        vector<vector<int>> data;
        for (int i = 0; i < intervals.size(); i++) {
            int left_point = intervals[i][0];
            int right_point = intervals[i][1];


            while ( i + 1 < intervals.size() && intervals[i+1][0] <= right_point) {
                right_point = max(intervals[i+1][1], right_point);
                i++;
            }
            data.push_back({left_point,right_point});
        }
        return data;
    }
};
```

### dutLyuyu 92ms
```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a,b) => a[0]-b[0]);
    let index = 1;
    let a = intervals[0];
    for(let i = 1; i < intervals.length; i++){
        let b = intervals[i]; 
        if(a[1] < b[0]){
            intervals[index] = b;
            index++;
            a = b;
        }else{
            a[1] = a[1] > b[1] ? a[1] : b[1];
        } 
    }
    intervals.length = index ;
    return intervals;
};
```

### Aria486 95ms
```js
var merge = function(intervals) {
    intervals.sort(function(a, b) {
        return a[0] - b[0];
    });
    
    let start = 1;
    while (start < intervals.length) {
        if (intervals[start][0] > intervals[start-1][1]) {
            start++;
        } else {
            const left = Math.min(intervals[start-1][0], intervals[start][0]);
            const right = Math.max(intervals[start-1][1], intervals[start][1]);
            intervals.splice(start, 1);
            intervals[start-1] = [left, right];
        }
    }
    return intervals;
};
```

### fangq78 9ms
```java 
class Solution {
    public int[][] merge(int[][] intervals) {
        List<int[]> resultList = new ArrayList<>();
        if (intervals == null || intervals.length == 0) {
            return new int[0][];
        }
        System.out.println("1");
        Arrays.sort(intervals, new Comparator<int[]>() {
            @Override
            public int compare(int[] o1, int[] o2) {
                // TODO Auto-generated method stub
                return o1[0] - o2[0];
            }
        });

        int i = 0;
        while (i < intervals.length) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            while (i < intervals.length - 1 && end >= intervals[i + 1][0]) {
                i++;
                end = Math.max(end, intervals[i][1]);
            }
            resultList.add(new int[] { start, end });
            i++;
        }
        return resultList.toArray(new int[0][]);
    }
}
```

### DA-ly-xu 9ms
```java 
class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals == null || intervals.length == 0) {
			return new int[0][0];
		}

		for (int[] item : intervals) {
			Arrays.parallelSort(item);
		}

		Arrays.parallelSort(intervals, (interval1, interval2) -> interval1[0] - interval2[0]);

		if (intervals.length == 1) {
			return intervals;
		}

		List<int[]> result = new ArrayList<int[]>();
		for (int index = 1; index < intervals.length; index++) {
			int[] previousPair = intervals[index - 1];
			int[] currentPair = intervals[index];
			if (previousPair[previousPair.length - 1] >= currentPair[0]) {
				currentPair[0] = previousPair[0];
				if (previousPair[previousPair.length - 1] > currentPair[currentPair.length - 1]) {
					currentPair[currentPair.length - 1] = previousPair[previousPair.length - 1];
				}
				intervals[index - 1] = null;
			}
		}

		for (int index = 0; index < intervals.length; index++) {
			if (intervals[index] != null) {
				result.add(intervals[index]);
			}
		}

		return result.toArray(new int[result.size()][2]);
    }
}
```