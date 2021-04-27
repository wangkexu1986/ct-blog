(self.webpackChunkct_blog=self.webpackChunkct_blog||[]).push([[93],{5663:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var i=n(7294),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"}}]},name:"close",theme:"outlined"},s=n(4420),o=function(e,t){return i.createElement(s.Z,Object.assign({},e,{ref:t,icon:r}))};o.displayName="CloseOutlined";var a=i.forwardRef(o)},2226:function(e,t,n){"use strict";n.d(t,{q:function(){return s}});var i=n(7294),r=i.createContext(void 0),s=function(e){var t=e.children,n=e.size;return i.createElement(r.Consumer,null,(function(e){return i.createElement(r.Provider,{value:n||e},t)}))};t.Z=r},8493:function(e,t,n){"use strict";var i=n(8991),r=n(6144),s=n(5991),o=n(69),a=n(446),c=n(7294),l=n(7714),h=n(1786),u=n(7840),d=n(2275),f=n(5334),p=function(e){(0,o.Z)(n,e);var t=(0,a.Z)(n);function n(){var e;return(0,r.Z)(this,n),(e=t.apply(this,arguments)).resizeObserver=null,e.childNode=null,e.currentElement=null,e.state={width:0,height:0,offsetHeight:0,offsetWidth:0},e.onResize=function(t){var n=e.props.onResize,r=t[0].target,s=r.getBoundingClientRect(),o=s.width,a=s.height,c=r.offsetWidth,l=r.offsetHeight,h=Math.floor(o),u=Math.floor(a);if(e.state.width!==h||e.state.height!==u||e.state.offsetWidth!==c||e.state.offsetHeight!==l){var d={width:h,height:u,offsetWidth:c,offsetHeight:l};e.setState(d),n&&Promise.resolve().then((function(){n((0,i.Z)((0,i.Z)({},d),{},{offsetWidth:c,offsetHeight:l}),r)}))}},e.setChildNode=function(t){e.childNode=t},e}return(0,s.Z)(n,[{key:"componentDidMount",value:function(){this.onComponentUpdated()}},{key:"componentDidUpdate",value:function(){this.onComponentUpdated()}},{key:"componentWillUnmount",value:function(){this.destroyObserver()}},{key:"onComponentUpdated",value:function(){if(this.props.disabled)this.destroyObserver();else{var e=(0,l.Z)(this.childNode||this);e!==this.currentElement&&(this.destroyObserver(),this.currentElement=e),!this.resizeObserver&&e&&(this.resizeObserver=new f.Z(this.onResize),this.resizeObserver.observe(e))}}},{key:"destroyObserver",value:function(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null)}},{key:"render",value:function(){var e=this.props.children,t=(0,h.Z)(e);if(t.length>1)(0,u.ZP)(!1,"Find more than one child node with `children` in ResizeObserver. Will only observe first one.");else if(0===t.length)return(0,u.ZP)(!1,"`children` of ResizeObserver is empty. Nothing is in observe."),null;var n=t[0];if(c.isValidElement(n)&&(0,d.Yr)(n)){var i=n.ref;t[0]=c.cloneElement(n,{ref:(0,d.sQ)(i,this.setChildNode)})}return 1===t.length?t[0]:t.map((function(e,t){return!c.isValidElement(e)||"key"in e&&null!==e.key?e:c.cloneElement(e,{key:"".concat("rc-observer-key","-").concat(t)})}))}}]),n}(c.Component);p.displayName="ResizeObserver",t.Z=p},4686:function(e,t,n){"use strict";n.r(t);var i=n(7294),r=n(3148),s=n(6452),o=n(3385),a=n(1192),c=[{name:"JavaScript规范",path:"https://github.com/airbnb/javascript",description:"ES最新语法的编码规则及最佳实践。"},{name:"CSS规范",path:"",description:"包含css原生，less, css in js的写法及多浏览器，响应式等最佳实践。"},{name:"React规范",path:"",description:"组件，Hook的编码规则，性能分析和优化方法。"},{name:"Nodejs规范",path:"",description:"后端API的开发流程，参数校验规则，推荐的工具库等。"},{name:"单体测试规范",path:"",description:"React的单体测试模板，测试点分析，用例写法等最佳实践和API的单体测试模板。"},{name:"工程规范",path:"",description:"前后端分离的工程规范，包含目录结构，文件命名，工具库，打包，页面组件拆分原则等。"}];t.default=function(e){var t=e.location;return i.createElement(a.Z,{title:"开发规范",location:t},i.createElement(r.Z,{span:24,className:"code-styles"},i.createElement("p",{className:"title"},"统一团队编码风格，提升代码可读性和品质"),c.map((function(e){return i.createElement(s.Z,{span:12,className:"file",key:e.name},i.createElement(o.Z,{title:i.createElement("a",{href:e.path,target:"_blank"},e.name)},i.createElement("p",null,e.description)))}))))}}}]);