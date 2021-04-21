---
title: "CSS如何工作"
date: "2018-11-27"
description: "CSS如何工作"
category: "css"
---

## CSS如何工作

如何将你的 CSS 应用到你的 HTML 上

### 外部样式表

你已经在这篇文章看到了外部样式表，但是并不知道它的名字。外部样式表是指：当你将你的 CSS 保存在一个独立的扩展名为 .css 的文件中，并从HTML的 <link> 元素中引用它。此时 HTML 文件看起来像这样：

```css
/* style.css */
h1 {
  color: blue;
  background-color: yellow;
  border: 1px solid black;
}

p {
  color: red;
}
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My CSS experiment</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is my first CSS example</p>
  </body>
</html>
```

### 内部样式表

内部样式表是指不使用外部 CSS 文件，而是将你的 CSS 放置在<style> 元素中，该元素包含在 HTML head 内。此时HTML看起来像这样：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My CSS experiment</title>
    <style>
      h1 {
        color: blue;
        background-color: yellow;
        border: 1px solid black;
      }

      p {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is my first CSS example</p>
  </body>
</html>
```

这在某些情况下很有用（也许你正在使用一个内容管理系统，不能直接修改 CSS 文件），但它不如外部样式表高效 —— 在网站中，CSS 将需要在每个页面重复，并且需要更新时要更改的多个位置。

### 内联样式

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My CSS experiment</title>
  </head>
  <body>
    <h1 style="color: blue;background-color: yellow;border: 1px solid black;">Hello World!</h1>
    <p style="color:red;">This is my first CSS example</p>
  </body>
</html>
```

除非有必要，否则不要这么做！这很难维护（你可能不得不在每份文档里更新多次同样的信息），并且它还混合了 CSS 表示的样式信息和 HTML 的结构信息，使 CSS 难以阅读和理解。保持不同类型代码的分离和纯净使处理该代码的任何人工作更为容易。

## CSS 实际上如何工作？

当浏览器显示文档时，它必须将文档的内容与其样式信息结合。它分两个阶段处理文档：

浏览器将 HTML 和 CSS 转化成 DOM （文档对象模型）。DOM在计算机内存中表示文档。它把文档内容和其样式结合在一起。
浏览器显示 DOM 的内容。

![](https://mdn.mozillademos.org/files/11781/rendering.svg)
