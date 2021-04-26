---
title: "CSS 模块化"
date: "2015-05-01"
category: "css"
---

## 1. css存在的问题

① 全局污染

```css
// App.js
import A from './A.js'
import B from './B.js'

/* a.css */
.title {
  color: red;
}

/* b.css */
.title {
  color: yellow;
}
```

② 为了解决样式全局引入nameSpace概念，导致嵌套层级过深问题

```CSS
.widget .table .row .cell .content .header .title {
  padding: 10px 20px;
  font-weight: bold;
  font-size: 2rem;
}
```

- 根据CSS选择器的解析规则可以知道，层级越深，比较的次数也就越多。当然在更多的情况下，可能嵌套的层次还会更深，另外，这里单单用了类选择器，而采用类选择器的时候，可能对整个网页的渲染影响更重。

- 增加了不必要的字节开销

- 语义混乱，当文档中出现过多的`content`、`title`以及`item`这些通用的类名时，可能要花上老半天才知道它们到底是用在哪个元素上

- 可扩展性不好，约束越多，扩展性越差

③ 没有模块化概念

```css
/* a.css */
.title .modal{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
}

/* b.css */
.content .title {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
}
```

## 2. 解决方案

### css预处理器 SASS/LESS

Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，这些拓展令 CSS 更加强大与优雅。使用 Sass 以及 Sass 的样式库（如 [Compass](http://compass-style.org/)）有助于更好地组织管理样式文件，以及更高效地开发项目。

- #### 解决了CSS以下痛点：

① 模块化

② css复用，减少冗余css

- #### 改善项：

让编写CSS更加编程化，更加灵活

- #### 详细：

① 变量

```css
/* SASS允许使用变量，所有变量以$开头。*/
$blue : #1875e7;　
$side : left;

div {
　color : $blue;
}

.rounded {
　border-#{$side}-radius: 5px;
}
```

② 计算

```css
body {
　margin: (14px/2);
　top: 50px + 100px;
　right: $var * 10%;
}
```

③ 嵌套

```css
div {
　hi {
　　color:red;
   border: {
　　　color: red;
　　}
　}
}
```

④ 继承

```css
%commonBtnStyle {
  background: $btnBackgroundColor;
  outline: none;
  @include color(yellow);
  border: {
    radius: 4px;
    color: black;
  }

  &:hover {
    background: aqua;
    cursor: pointer;
  }

  &:active {
    background: aqua;
  }
}

.button {
  @extend %commonBtnStyle;
  width: $buttonWidth;
  height: 30px;
  border: {
    color: #010203 * 2;
  }
}
```

⑤ Mixin

```css
/**
* 自定义a标签样式
*/
@mixin linkDIY($defaultColor: red, $visColor: blue, $hoverColor: green, $actColor: yellow) {
  color: $defaultColor;
  &:visited {
    color: $visColor;
  }
  &:hover {
    color: $hoverColor;
  }
  &:active {
    color: red;
  }
}

a {
  @include linkDIY(pink, green, black, yellow);
}
```

⑥ @import

```css
@import "foo.scss";

...
```

⑦ 条件语句

```css
/**
* 溢出省略号
* @param {Number} 行数
*/
@mixin ellipsis($rowCount: 1) {
  @if $rowCount <=1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: $rowCount;
    -webkit-box-orient: vertical;
  }
}
```

⑧ 循环(for, while, each)

```css
@for $i from 1 to 10 {
　.border-#{$i} {
　　border: #{$i}px solid blue;
　}
}
```

⑨ 自定义函数

```css
@function double($n) {
　@return $n * 2;
}

#sidebar {
　width: double(5px);
}
```

⑩ 内置函数 https://sass-lang.com/documentation/modules

……以上并没有解决全局污染问题，编译之后通常还是一个CSS文件

### CSS modules

- #### 解决了CSS以下痛点：

① 全局污染

② css模块化，可复用

CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效。产生局部作用域的唯一方法，就是使用一个独一无二的`class`的名字，不会与其他选择器重名。这就是 CSS Modules 的做法。

```js
import React from 'react';
import style from './App.css';

export default () => {
  return (
    <h1 className={style.title}>
      Hello World
    </h1>
  );
};

// css
.title {
  color: red;
}

// html
<h1 class="_3zyde4l1yATCOkgn-DBWEL">Hello World</h1>
```

需要将样式全局的时候

```css
:global(.title) {
  color: green;
}
```

继承

```css
.back {
  background-color: blue;
}

.title {
  composes: back;
  color: red;
}
```

定义变量

```css
@value blue: #0c77f8;
@value red: #ff0000;
@value green: #aaf200;
```

输入其他模块

```css
/* a.css */
.className {
  background-color: blue;
}

/* b.css */
.title {
  composes: className from './another.css';
  color: red;
}
```

很明显，除了解决全局污染，其他的用法都不如sass/less便利

scss + modules 解决大部分问题

### BEM（Block Element Modifier）

- Block：逻辑和页面功能都独立的页面组件，是一个可复用单元，特点如下：
  - 可以随意嵌套组合
  - 可以放在任意页面的任何位置，不影响功能和外观
  - 可复用，界面可以有任意多个相同Block的实例
- Element：Block的组成部分，依赖Block存在
- Modifier(修饰符):  是一个元素的状态显示，代表 .block 的不同状态或不同版本。例如active、current、selected


\- 中划线 ：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。

__ 双下划线：双下划线用来连接块和块的子元素。

_ 单下划线：单下划线用来描述一个块或者块的子元素的一种状态。

```html
<div class="article">
    <div class="article__body">
        <div class="tag"></div>
        <button class="article__button--primary"></button>
        <button class="article__button--success"></button>
    </div>
</div>
```

## 

## 3. css

- 引入了变量
- 近年来加入了各种布局，flex，grid，相对于使用第三方来说，更加便利
- 学习成本低



