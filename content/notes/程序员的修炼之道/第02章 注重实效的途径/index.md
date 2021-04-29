---
date: "2021-04-10"
---
# 注重实效的途径

## 重复的危害

### DRY

> Don't Repeat Yourself 
> 不要重复你自己

### 重复是怎样发生的？

* 强加的重复

开发者觉得他们无可选择，环境似乎要求重复

> 信息的多种表示

例如，在编写cs系统时，c端和s端使用了不同的语言，并且需要再两端都表示某种共有的结构。
解决办法，编写简单的过滤器或代码生成器。

> 代码中的文档

给代码加上注释，注释往往不可信，因为和代码逻辑不同步。

> 文档与代码

先写文档，后写代码。往往会推迟文档的更新。

> 语言问题

？ 头文件的重复导出。

* 无意的重复
开发者没有意识到他们在重复信息

> 设计的重复

```c#
// 1
class Line {
  public:
     Point start;
     Point end;
     double length;
};

// ? 重复 ？

// 2
class Line {
  public:
     Point start;
     Point end;
     double length() { return start.distanceTo(end); }
};

// 在开发中，可能因为性能问题会违反DRY原则，比如缓存数据时。


// 3 官方版
class Line {
  private:
     bool changed;
     double length;
     Point start;
     Point end;
  
  public:
     void setStart(Point p) { start = p; changed = true; }
     void setEnd(Point p) { end = p; changed = true; }

     Point getStart(void) { return start; }
     Point getEnd(void) { return end;}

     double getLength() {
       if (changed) {
          length = start.distanceTo(end);
          changed = false;
       }
     }
};
```

* 无耐性的重复
开发者偷懒，他们重复，因为那样似乎更容易。

迫于项目的严厉，容易走捷径。

* 开发者之间的重复
同一团队的几个人重复了同样的信息，功能间的代码重复。

## 正交性
几何术语，如果两条直线相交成直角，他们就是正交的。
在计算技术中，表示某种不相依赖性或是解耦性。如果两个或者更多事物中的一个发生变化，不会影响其他事物，这些事物就是正交的。例如，数据库代码和用户界面。

非正交系统，直升机的各个控制器。

### 正交的好处
消除无关事物的影响，高内聚，低耦合。

> 提高生产率

> 降低风险

### 项目团队
如果团队的组织有许多重叠，各个成员就会责任感干到困惑，每一次改动都需要惊动所有人。
尽肯能降低重叠。

### 设计
### 工具箱和库
### 编码
* 让你的代码保持解耦
* 避免使用全局数据
* 避免编写相似的函数

要养成不断的批判对待自己的代码的习惯。重新组织，以改善其结构和正交性，重构！

### 测试
单元测试
修正bug，判断影响范围，来评估系统的正交性。

正交性 && DRY


分析代码，那个更正交？

```java
// 1
class Split1 {
  public Split(InputStreamReader rdr) { ...
  public void readNextLine() throws IOExceptoin { ...
  public int numFields() { ...
  public String getField(int fieldNo) { ...
}

// 2
class Split2 {
  public Split2(String line) { ...
  public int numFields() { ...
  public String getField(int fieldNo) { ...
}

```

## 可撤销性

项目中，技术或者架构的可互换性

## 曳光弹

### 曳光代码 VS 原型制作

使用原型，你是要探究最终系统的某些具体的方面。
曳光代码，你需要知道应用怎样结合成一个整体。你想要向用户演示，实际的交互是怎么工作的。同时你还想要给出一个架构骨架。

## 原型与便签

在设计原型时，可以忽略
* 正确性
* 完整性
* 健壮性
* 风格

## 领域语言

## 估算

估算项目的周期。

多准确才足够准确

估算的单位：天，周，月