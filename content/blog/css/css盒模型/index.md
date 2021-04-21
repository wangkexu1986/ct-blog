---
title: "CSS 盒模型"
date: "2018-11-27"
description: "CSS 盒模型 定位 布局"
category: "css"
---

## CSS 盒模型
盒模型指定元素如何显示以及如何相互交互。页面上的每个元素都被看成一个矩形框。
这个框由内容(content)，内边距(padding)，边框(border)，外边距(margin)组成.

内边距（padding）出现在内容（content）的周围，如果在元素上添加背景，背景会应用于内容和内边距组成的区域。

### 标准模型
![](https://guxinyan.github.io/blogImg/%E6%A0%87%E5%87%86%E7%9B%92%E6%A8%A1%E5%9E%8B.png)

在css中，width和height指的是内容区域的宽度和高度。增加内边距，边框和外边距不会影响内容区域的大小。但是会增加元素框的大小。

假设框的每个边上有 10 个像素的外边距和 5 个像素的内边距。如果希望这个元素框达到 100 个像素，就需要将内容的宽度设置为 70 像素，请看下图：

```css
#box {
  width: 70px;
  margin: 10px;
  padding: 5px;
}
```
![](http://www.w3school.com.cn/i/ct_css_boxmodel_example.gif)


### IE模型
![](https://guxinyan.github.io/blogImg/IE%E7%9B%92%E6%A8%A1%E5%9E%8B.png)

IE盒模型和标准盒模型的不同就在于，IE盒模型的content部分包括padding和border。

例如：
![](https://github.com/DreamArts/dac-3g-portal/blob/master/css/css05_01.png)

* 标准盒模型占据的位置：宽=20px2+5px2+10px2+200px=270px,高=20px2+5px2+10px2+50px=120px
* 标准盒模型实际大小为：宽=5px2+10px2+200px=230px,高=5px2+10px2+50px=80px
* IE盒模型占据的位置：宽=20px2+200px=240px,高=20px2+50px=90px
* IE盒模型实际大小为：宽=200px,高=50px

通过css3新增的属性 box-sizing: content-box | border-box分别设置盒模型为标准模型（content-box）和IE模型（border-box）。

### 外边距重叠

简单的说， 当两个或更多个垂直边距相遇时， 它们将形成一个外边距。这个外边距的高度等于两个发生叠加的外边距的高度中的较大者。但是注意只有普通文档流中块框的垂直外边距才会发生外边距叠加。 行内框、 浮动框或绝对定位框之间的外边距不会叠加。

一般来说， 垂直外边距叠加有三种情况：

1. 元素的顶外边距与前面元素的底外边距发生叠加

这个外边距的高度等于两个发生叠加的外边距的高度中的较大者
> 相邻元素叠加 相邻的两个元素， 如果它们的上下边距相遇，即会产生叠加。

![](http://www.w3school.com.cn/i/ct_css_margin_collapsing_example_1.gif)

2. 元素的顶外边距与父元素的顶外边距发生叠加

> 包含（父子）元素叠加 包含元素的外边距隔着 父元素的内边距和边框， 当这两项都不存在的时候， 父子元素垂直外边距相邻， 产生叠加。 添加任何一项即会取消叠加。

![](http://www.w3school.com.cn/i/ct_css_margin_collapsing_example_2.gif)

3. 元素的顶外边距与底外边距发生叠加

> 元素自身叠加 当元素没有内容（即空元素）、内边距、边框时， 它的上下边距就相遇了， 即会产生叠加（垂直方向）。 当为元素添加内容、 内边距、 边框任何一项， 就会取消叠加。

![](http://www.w3school.com.cn/i/ct_css_margin_collapsing_example_3.gif)

4. 空元素中已经叠加的外边距与另一个空元素的外边距发生叠加

![](http://www.w3school.com.cn/i/ct_css_margin_collapsing_example_4.gif)

![](http://www.w3school.com.cn/i/ct_css_margin_collapsing.gif)

## CSS 定位
### 普通流

简单说就是元素按照其在 HTML 中的位置顺序决定排布的过程。并且这种过程遵循标准的描述。

其他人给出的定义：
* 将窗体自上而下分成一行行，并在每行中按从左至右的顺序排放元素，即为文档流。
* Jennifer.Kyrnin@About.com: 普通流是元素在多数情况下呈现在 web 页面上的方式。所有 HTML 都在块框( block boxes，块级元素 )或者行内框( inline boxes，行内元素 )中。
* Rainbo Design: 当浏览器开始渲染 HTML 文档，它从窗口的顶端开始，经过整个文档内容的过程中，分配元素需要的空间。除非文档的尺寸被 CSS 特别的限定，否则浏览器垂直扩展文档来容纳全部的内容。每个新的块级元素渲染为新行。行内元素则按照顺序被水平渲染直到当前行遇到了边界，然后换到下一行垂直渲染。这个过程被成为普通文档流。

CSS2.1RC
> Normal flow. In CSS 2.1, normal flow includes block formatting of block boxes, inline formatting of inline boxes, relative positioning of block or inline boxes, and positioning of run-in boxes.

这个过程包括了块格式化( block formatting )，行内格式化( inline formatting )，相对定位( relative positioning )，以及 run-in boxes的定位。

在普通流中的 Box(框) 属于一种 formatting context(格式化上下文) ，类型可以是 block ，或者是 inline ，但不能同时属于这两者。并且， Block boxes(块框) 在 block formatting context(块格式化上下文) 里格式化， Inline boxes(块内框) 则在 inline formatting context(行内格式化上下文) 里格式化。

普通流就是这样的过程：

1. 在对应的 block formatting context 中，块级元素按照其在HTML中的顺序，在其容器框里从左上角开始，从上到下垂直地依次分配空间、堆砌( stack )，并独占一行，边界紧贴父容器。两相邻元素间的距离由 margin 属性决定，在同一个 block formatting context 中的垂直边界将被重叠( collapse )。并且，除非创建一个新的 block formatting context ，否则块级元素的宽度不受浮动元素的影响(这就是浮动元素能盖在块级元素上面的原因)。

2. 在对应的 inline formatting context 中，行内元素从容器的顶端开始，一个接一个地水平排布。水平填充、边框和边距对行内元素有效。但垂直的填充、边框和空白边不影响其高度。一个水平行中的所有 inline box 组成了名为 line box 的矩形区域。 line box 的高度始终容下所有的 inline box ，并只与行高有关。 line box 的宽度受到父容器和浮动元素存在的影响(这就是文本环绕浮动元素)。如果 line box 的宽度小于容器， line box 的水平排布就取决于 text-align 。如果 line box 的宽度大于容器，则截断 line box 并换行在新的 line box 中重新排布元素(截断处不应用 padding 和 margin 值)。如果 line box 无法截断，如单词过长或者指定不换行，则会溢出容器。

3. 对这些 block box 和 inline box 进行相对定位，即相对于已排布的位置进行偏移。元素在其中保留原来所占用的空间。

### 浮动流
### 绝对定位


## CSS 布局