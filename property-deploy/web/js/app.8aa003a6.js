import{g as U,E as F,a as Y,s as $,b as m,c as D,t as g,j as u,V as y,C as X,H as J,T as K,e as j,f as k,h as L,i as C,k as Q,l as Z,m as ee,n as ae,o as te,p as ne,R as I,q as d,v as s,w as p}from"./vendors.d3685d28.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const e of r.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&a(e)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();var re=`
/* H5 端隐藏 TabBar 空图标（只隐藏没有 src 的图标） */
.weui-tabbar__icon:not([src]),
.weui-tabbar__icon[src=''] {
  display: none !important;
}

.weui-tabbar__item:has(.weui-tabbar__icon:not([src])) .weui-tabbar__label,
.weui-tabbar__item:has(.weui-tabbar__icon[src='']) .weui-tabbar__label {
  margin-top: 0 !important;
}

/* Vite 错误覆盖层无法选择文本的问题 */
vite-error-overlay {
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-user-select: text !important;
}

vite-error-overlay::part(window) {
  max-width: 90vw;
  padding: 10px;
}

.taro_page {
  overflow: auto;
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* H5 导航栏页面自动添加顶部间距 */
body.h5-navbar-visible .taro_page {
  padding-top: 44px;
}
`,ie=`
/* PC 宽屏适配 - 基础布局 */
@media (min-width: 769px) {
  html {
    font-size: 15px !important;
  }

  body {
    background-color: #f3f4f6 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    min-height: 100vh !important;
  }
}
`,oe=`
/* PC 宽屏适配 - 手机框样式（有 TabBar 页面） */
@media (min-width: 769px) {
  .taro-tabbar__container {
    width: 375px !important;
    max-width: 375px !important;
    height: calc(100vh - 40px) !important;
    max-height: 900px !important;
    background-color: #fff !important;
    transform: translateX(0) !important;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1) !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    position: relative !important;
  }

  .taro-tabbar__panel {
    height: 100% !important;
    overflow: auto !important;
  }
}

/* PC 宽屏适配 - 手机框样式（无 TabBar 页面，通过 JS 添加 no-tabbar 类） */
@media (min-width: 769px) {
  body.no-tabbar #app {
    width: 375px !important;
    max-width: 375px !important;
    height: calc(100vh - 40px) !important;
    max-height: 900px !important;
    background-color: #fff !important;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1) !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    position: relative !important;
    transform: translateX(0) !important;
  }

  body.no-tabbar #app .taro_router {
    height: 100% !important;
    overflow: auto !important;
  }
}
`;function se(){var o=document.createElement("style");o.innerHTML=re+ie+oe,document.head.appendChild(o)}function ue(){var o=function(){var a=!!document.querySelector(".taro-tabbar__container");document.body.classList.toggle("no-tabbar",!a)};o();var n=new MutationObserver(o);n.observe(document.body,{childList:!0,subtree:!0})}function ce(){se(),ue()}function le(){var o=U();if(o===F.WEAPP||o===F.TT)try{var n=Y(),t=n.miniProgram.envVersion;console.log("[Debug] envVersion:",t),t!=="release"&&$({enableDebug:!0})}catch(a){console.error("[Debug] 开启调试模式失败:",a)}}var de={visible:!1,title:"",bgColor:"#ffffff",textStyle:"black",navStyle:"default",transparent:"none",leftIcon:"none"},pe=function(){var n,t=j();return(t==null||(n=t.config)===null||n===void 0?void 0:n.window)||{}},ge=function(){var n,t,a=(n=j())===null||n===void 0||(n=n.config)===null||n===void 0?void 0:n.tabBar;return new Set((a==null||(t=a.list)===null||t===void 0?void 0:t.map(function(i){return i.pagePath}))||[])},ve=function(n,t,a){if(!n)return"none";var i=n==="pages/index/index"||n==="/pages/index/index",r=t.has(n),e=a>1;return r||i?"none":e?"back":"home"},fe=function(){var n=m.useState(de),t=D(n,2),a=t[0],i=t[1],r=m.useState(0),e=D(r,2),H=e[0],N=e[1],E=m.useCallback(function(){var c=g.getCurrentPages(),l=c[c.length-1],w=(l==null?void 0:l.route)||"",b=(l==null?void 0:l.config)||{},h=pe(),B=ge(),G=w==="pages/index/index"||w==="/pages/index/index",q=B.has(w),A=B.size<=1&&c.length<=1&&(G||q);i({visible:!A,title:b.navigationBarTitleText||h.navigationBarTitleText||"",bgColor:b.navigationBarBackgroundColor||h.navigationBarBackgroundColor||"#ffffff",textStyle:b.navigationBarTextStyle||h.navigationBarTextStyle||"black",navStyle:b.navigationStyle||h.navigationStyle||"default",transparent:b.transparentTitle||h.transparentTitle||"none",leftIcon:A?"none":ve(w,B,c.length)})},[]);g.useDidShow(function(){E()}),g.usePageScroll(function(c){var l=c.scrollTop;a.transparent==="auto"&&N(Math.min(l/100,1))}),m.useEffect(function(){var c=document.querySelector("title")||document.head,l=new MutationObserver(function(){return E()});return l.observe(c,{subtree:!0,childList:!0,characterData:!0}),function(){return l.disconnect()}},[E]);var P=a.visible&&a.navStyle!=="custom";if(m.useEffect(function(){P?document.body.classList.add("h5-navbar-visible"):document.body.classList.remove("h5-navbar-visible")},[P]),!P)return u.jsx(u.Fragment,{});var S=a.textStyle==="white"?"#fff":"#333",V=a.textStyle==="white"?"text-white":"text-gray-800",M=function(){return a.transparent==="always"?{backgroundColor:"transparent"}:a.transparent==="auto"?{backgroundColor:a.bgColor,opacity:H}:{backgroundColor:a.bgColor}},W=function(){return g.navigateBack()},z=function(){return g.reLaunch({url:"/pages/index/index"})};return u.jsxs(u.Fragment,{children:[u.jsxs(y,{className:"fixed top-0 left-0 right-0 h-11 flex items-center justify-center z-1000",style:M(),children:[a.leftIcon==="back"&&u.jsx(y,{className:"absolute left-2 top-1_f2 -translate-y-1_f2 p-1 flex items-center justify-center",onClick:W,children:u.jsx(X,{size:24,color:S})}),a.leftIcon==="home"&&u.jsx(y,{className:"absolute left-2 top-1_f2 -translate-y-1_f2 p-1 flex items-center justify-center",onClick:z,children:u.jsx(J,{size:22,color:S})}),u.jsx(K,{className:"text-base font-medium max-w-3_f5 truncate ".concat(V),children:a.title})]}),u.jsx(y,{className:"h-11 shrink-0"})]})},be=function(n){var t=n.children;return u.jsxs(u.Fragment,{children:[u.jsx(fe,{}),t]})},he=function(n){var t=n.children;return g.useLaunch(function(){le(),ce()}),u.jsx(be,{children:t})},me=function(n){var t=n.children;return u.jsx(he,{children:t})},x=k.__taroAppConfig={router:{},pages:["pages/index/index","pages/repair/index","pages/payment/index","pages/notice/index","pages/profile/index","pages/admin/login/index","pages/admin/dashboard/index","pages/admin/repair/index","pages/admin/payment/index","pages/admin/notice/index","pages/admin/user/index"],window:{backgroundTextStyle:"light",navigationBarBackgroundColor:"#fff",navigationBarTitleText:"智慧物业",navigationBarTextStyle:"black"},tabBar:{color:"#999999",selectedColor:"#1890ff",backgroundColor:"#ffffff",borderStyle:"black",list:[{pagePath:"pages/index/index",text:"首页",iconPath:"./assets/tabbar/home.png",selectedIconPath:"./assets/tabbar/home-active.png"},{pagePath:"pages/repair/index",text:"报修",iconPath:"./assets/tabbar/wrench.png",selectedIconPath:"./assets/tabbar/wrench-active.png"},{pagePath:"pages/payment/index",text:"缴费",iconPath:"./assets/tabbar/credit-card.png",selectedIconPath:"./assets/tabbar/credit-card-active.png"},{pagePath:"pages/notice/index",text:"通知",iconPath:"./assets/tabbar/bell.png",selectedIconPath:"./assets/tabbar/bell-active.png"},{pagePath:"pages/profile/index",text:"我的",iconPath:"./assets/tabbar/user.png",selectedIconPath:"./assets/tabbar/user-active.png"}]}},v=[],f=[];v[0]="/static/images/home.png";f[0]="/static/images/home-active.png";v[1]="/static/images/wrench.png";f[1]="/static/images/wrench-active.png";v[2]="/static/images/credit-card.png";f[2]="/static/images/credit-card-active.png";v[3]="/static/images/bell.png";f[3]="/static/images/bell-active.png";v[4]="/static/images/user.png";f[4]="/static/images/user-active.png";var O=x.tabBar.list;for(var _=0;_<O.length;_++){var T=O[_];T.iconPath&&(T.iconPath=v[_]),T.selectedIconPath&&(T.selectedIconPath=f[_])}x.routes=[Object.assign({path:"pages/index/index",load:function(){var o=d(s().m(function t(a,i){var r;return s().w(function(e){for(;;)switch(e.n){case 0:return e.n=1,p(()=>import("./index.18a77d07.js"),["js/index.18a77d07.js","js/vendors.d3685d28.js","css/vendors.8886af03.css","css/index.e3b0c442.css"]);case 1:return r=e.v,e.a(2,[r,a,i])}},t)}));function n(t,a){return o.apply(this,arguments)}return n}()},{navigationBarTitleText:"首页"}),Object.assign({path:"pages/repair/index",load:function(){var o=d(s().m(function t(a,i){var r;return s().w(function(e){for(;;)switch(e.n){case 0:return e.n=1,p(()=>import("./index.ebafbcca.js"),["js/index.ebafbcca.js","js/vendors.d3685d28.js","css/vendors.8886af03.css"]);case 1:return r=e.v,e.a(2,[r,a,i])}},t)}));function n(t,a){return o.apply(this,arguments)}return n}()},{navigationBarTitleText:"报修"}),Object.assign({path:"pages/payment/index",load:function(){var o=d(s().m(function t(a,i){var r;return s().w(function(e){for(;;)switch(e.n){case 0:return e.n=1,p(()=>import("./index.5cfe723b.js"),["js/index.5cfe723b.js","js/vendors.d3685d28.js","css/vendors.8886af03.css"]);case 1:return r=e.v,e.a(2,[r,a,i])}},t)}));function n(t,a){return o.apply(this,arguments)}return n}()},{navigationBarTitleText:"缴费"}),Object.assign({path:"pages/notice/index",load:function(){var o=d(s().m(function t(a,i){var r;return s().w(function(e){for(;;)switch(e.n){case 0:return e.n=1,p(()=>import("./index.4f795cb7.js"),["js/index.4f795cb7.js","js/vendors.d3685d28.js","css/vendors.8886af03.css"]);case 1:return r=e.v,e.a(2,[r,a,i])}},t)}));function n(t,a){return o.apply(this,arguments)}return n}()},{navigationBarTitleText:"通知"}),Object.assign({path:"pages/profile/index",load:function(){var o=d(s().m(function t(a,i){var r;return s().w(function(e){for(;;)switch(e.n){case 0:return e.n=1,p(()=>import("./index.8c7169a8.js"),["js/index.8c7169a8.js","js/vendors.d3685d28.js","css/vendors.8886af03.css"]);case 1:return r=e.v,e.a(2,[r,a,i])}},t)}));function n(t,a){return o.apply(this,arguments)}return n}()},{navigationBarTitleText:"我的"}),Object.assign({path:"pages/admin/login/index",load:function(){var o=d(s().m(function t(a,i){var r;return s().w(function(e){for(;;)switch(e.n){case 0:return e.n=1,p(()=>import("./index.46f6248a.js"),["js/index.46f6248a.js","js/vendors.d3685d28.js","css/vendors.8886af03.css","js/common.7640e3c1.js","css/index.e3b0c442.css"]);case 1:return r=e.v,e.a(2,[r,a,i])}},t)}));function n(t,a){return o.apply(this,arguments)}return n}()},{navigationBarTitleText:"管理员登录"}),Object.assign({path:"pages/admin/dashboard/index",load:function(){var o=d(s().m(function t(a,i){var r;return s().w(function(e){for(;;)switch(e.n){case 0:return e.n=1,p(()=>import("./index.7bbea8d0.js"),["js/index.7bbea8d0.js","js/vendors.d3685d28.js","css/vendors.8886af03.css","js/common.7640e3c1.js","css/index.e3b0c442.css"]);case 1:return r=e.v,e.a(2,[r,a,i])}},t)}));function n(t,a){return o.apply(this,arguments)}return n}()},{navigationBarTitleText:"管理后台"}),Object.assign({path:"pages/admin/repair/index",load:function(){var o=d(s().m(function t(a,i){var r;return s().w(function(e){for(;;)switch(e.n){case 0:return e.n=1,p(()=>import("./index.865fa2dc.js"),["js/index.865fa2dc.js","js/vendors.d3685d28.js","css/vendors.8886af03.css","js/common.7640e3c1.js","css/index.e3b0c442.css"]);case 1:return r=e.v,e.a(2,[r,a,i])}},t)}));function n(t,a){return o.apply(this,arguments)}return n}()},{navigationBarTitleText:"报修管理"}),Object.assign({path:"pages/admin/payment/index",load:function(){var o=d(s().m(function t(a,i){var r;return s().w(function(e){for(;;)switch(e.n){case 0:return e.n=1,p(()=>import("./index.c550d455.js"),["js/index.c550d455.js","js/vendors.d3685d28.js","css/vendors.8886af03.css","js/common.7640e3c1.js","css/index.e3b0c442.css"]);case 1:return r=e.v,e.a(2,[r,a,i])}},t)}));function n(t,a){return o.apply(this,arguments)}return n}()},{navigationBarTitleText:"缴费管理"}),Object.assign({path:"pages/admin/notice/index",load:function(){var o=d(s().m(function t(a,i){var r;return s().w(function(e){for(;;)switch(e.n){case 0:return e.n=1,p(()=>import("./index.53005fa6.js"),["js/index.53005fa6.js","js/vendors.d3685d28.js","css/vendors.8886af03.css","js/common.7640e3c1.js","css/index.e3b0c442.css"]);case 1:return r=e.v,e.a(2,[r,a,i])}},t)}));function n(t,a){return o.apply(this,arguments)}return n}()},{navigationBarTitleText:"通知管理"}),Object.assign({path:"pages/admin/user/index",load:function(){var o=d(s().m(function t(a,i){var r;return s().w(function(e){for(;;)switch(e.n){case 0:return e.n=1,p(()=>import("./index.8f66b73a.js"),["js/index.8f66b73a.js","js/vendors.d3685d28.js","css/vendors.8886af03.css","js/common.7640e3c1.js","css/index.e3b0c442.css"]);case 1:return r=e.v,e.a(2,[r,a,i])}},t)}));function n(t,a){return o.apply(this,arguments)}return n}()},{navigationBarTitleText:"业主管理"})];Object.assign(L,{findDOMNode:C.findDOMNode,render:C.render,unstable_batchedUpdates:C.unstable_batchedUpdates});Q();var _e=Z(me,I,L,x),R=ee({window:k});ae(x,R);te(R,_e,x,I);ne({designWidth:750,deviceRatio:{375:2,640:1.17,750:1,828:.905},baseFontSize:20,unitPrecision:void 0,targetUnit:void 0});
