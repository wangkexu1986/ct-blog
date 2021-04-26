---
title: "React 开发规约"
date: "2018-08-07"
category: "react"
tag: "react,开发规约"
---

## 0.编码规则
https://github.com/airbnb/javascript/  
https://github.com/JasonBoy/javascript/tree/master/react


## 1.文件目录

* 功能
> 为了便于多人同时开发，功能拆分

* 页面
> 组件的组合和控制（数据和事件）

* 组件
> 小的显示功能

## 2.命名

### 类名
* 用React写的，以jsx结尾
* JS文件以.js结尾
* 类名使用大驼峰
* 页面名以S开头采用大驼峰
* 组件名以C开头采用大驼峰

### 方法名

* 事件方法handle+功能名+组件类型（Input，Button，CheckBox。。）+事件类型（Click,Change...）采用小驼峰
* 自定义方法采用小驼峰，见名释义即可

## 3.类定义

类定义模板

```js
class List extends React.Component {
  // 构造器
  constructor(props) {
  }
  // 声明周期方法

  // 事件绑定方法

  // 自定义方法

  // 页面表示
  render() {
    return <div />;
  }
}

// 属性类型check
List.propTypes = {

};

// 属性默认值
List.defaultProps = {

};

// 导出
export default List;
```

### 构造器
* 调用super方法
* 初期化state
* 绑定事件方法
例子：
```js
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      displayFlag: false,
      currentPage: firstPage,
      search: {
        status: ['開催中'],
        name: '',
        spanFrom: '',
        spanTo: '',
        purposes: [],
        products: [],
        planPattern: [],
      },
    };
    // 表示範囲：開催ステータス・目的・商材・企画パターン
    this.handleSearchCheckboxChange = this.handleSearchCheckboxChange.bind(this);
    // 表示範囲：イベント名
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    // 表示範囲：開催月
    this.handleSearchDateSpanChange = this.handleSearchDateSpanChange.bind(this);
    // 表示範囲：クリアボタン
    this.handleSearchClearButtonClick = this.handleSearchClearButtonClick.bind(this);
    // 表示範囲：検索ボタン
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    // 表示範囲：ページングボタン
    this.handlePaginationButtonClick = this.handlePaginationButtonClick.bind(this);
    // 表示範囲：検索詳細ボタン
    this.handleSearchDetailButtonClick = this.handleSearchDetailButtonClick.bind(this);
    this.handleEventReportClick = this.handleEventReportClick.bind(this);
  }
```

### 定义声明周期方法
定义顺序
* componentWillMount()
> 组件加载完成前调用，很少使用

* componentDidMount()
> 组件加载完成后调用，常用。获取数据，比如通过API取数据

* componentWillReceiveProps()
> 很少使用

* shouldComponentUpdate()
> 判断组件状态变化后，组件是否该刷新

* componentDidUpdate()
> 很少使用

* componentWillUnmount()
> 组件退出时调用，状态的清理用

参考：
![声明周期](http://img.hb.aicdn.com/dc5a57d458898753adf7a5aae045693115142f7916efb-vZnd9x_fw658)

**组件从创建到显示的过程**
* constructor()
* componentWillMount()
* render()
* componentDidMount()

**组件的更新过程**
* componentWillReceiveProps()
* shouldComponentUpdate()
* componentWillUpdate()
* render()
* componentDidUpdate()

**组件销毁**
* componentWillUnmount()

### 事件方法定义
* 接收事件参数，更新组件状态

### 自定义方法
* 共通代码抽出
* 业务逻辑独立

### 显示方法

* 数据整理
* 表示定义
* 代码尽量简短

### 属性check
* 确保组件的每个属性，都有类型check

### 属性默认值
* 确保组件的每个属性，都有默认值

## 4.import 顺序
* 第三方库
* 工程内文件

## 5.页面和组件定义原则
* 页面负责该页面上所有组件的数据取得和事件控制（全局的共通组件除外如nav， sidemenu）
* 组件内，不允许请求API，只负责数据显示
* 组件内的事件，不允许在其内部处理，通过属性返回到调用它的父组件上。（看情况，不是绝对的）

## 6.禁止
* 代码发布时，禁止代码中保留console.log

