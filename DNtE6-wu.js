import{d as D,f as K,h as T,r as q,i as A,j as k,w as E,k as p,l as e,a as $,u as H,m as o,b as i,n as t,p as s,q as P,t as n,e as l,v as h,x as Q,c as W,y as F,z as G,B as J,A as O,C as X}from"./assets/index-B6Sr_t6A.js";import{u as Y}from"./DDJBs58D.js";import{g as Z,_ as ee}from"./CruuKwbB.js";const te="/assets/logo-QnzrzBtt.jpg",oe=r=>(O("data-v-9d36a954"),r=r(),X(),r),ae=oe(()=>l("img",{alt:"logo",class:"rounded-full w-12 h-12",loading:"lazy",src:te},null,-1)),ne={key:2},se={class:"text-blue-500 cursor-pointer"},le=D({__name:"homeLayout",setup(r){const g=$(),v=H(),c=K(),[w]=T(),b=q({backgroundColor:"transparent"}),x=A(()=>c.userInfo),d=k([window.location.pathname]),C=k([{key:"/home",label:"首页"},{key:"/order",label:"我的订单"},{key:"/copilot",label:"Copilot",children:[{key:"/copilot-package",label:"套餐列表"},{key:"/copilot-usage-history",label:"使用记录"}]},{key:"/purse",label:"钱包明细"}]);E(g,a=>{d.value=[a.path]});function S({key:a}){v.push(a)}const{data:z}=Y(()=>new Promise(a=>{a(Z())}),{pollingInterval:1e3,pollingWhenHidden:!1}),B=c.logout;function I(){open(`${J}/oauth/discourse/redirect?callback_url=${location.origin}/redirect`,"_self")}return(a,u)=>{const m=o("router-link"),f=o("a-menu"),y=o("a-menu-item"),j=o("a-dropdown"),_=o("a-button"),L=o("a-layout-header"),M=o("router-view"),N=o("a-layout-content"),R=o("a-layout-footer"),U=o("a-layout");return i(),p(U,{class:"bg-transparent flex flex-col"},{default:e(()=>[t(L,{class:F([{dark:s(w)},"header flex items-center justify-between w-full z-10 fixed transition"]),style:G(b)},{default:e(()=>[t(m,{to:"/"},{default:e(()=>[ae]),_:1}),s(c).account_id?(i(),p(f,{key:0,selectedKeys:d.value,"onUpdate:selectedKeys":u[0]||(u[0]=V=>d.value=V),items:C.value,mode:"horizontal",onClick:S},null,8,["selectedKeys","items"])):P("",!0),s(c).account_id?(i(),p(j,{key:1},{overlay:e(()=>[t(f,null,{default:e(()=>[t(m,{to:"/order"},{default:e(()=>[t(y,null,{default:e(()=>[n("我的订单")]),_:1})]),_:1}),t(y,{onClick:s(B)},{default:e(()=>[n("退出登录")]),_:1},8,["onClick"])]),_:1})]),default:e(()=>[l("a",{class:"ant-dropdown-link",onClick:u[1]||(u[1]=Q(()=>{},["prevent"]))},h(x.value.nick_name),1)]),_:1})):(i(),W("span",ne,[t(_,{onClick:I},{default:e(()=>[n("登录")]),_:1})]))]),_:1},8,["class","style"]),t(N,{class:"dark:text-white pt-16 flex-1 content"},{default:e(()=>[t(M)]),_:1}),t(R,{class:"flex justify-between"},{default:e(()=>[l("div",null,[t(_,{type:"link"},{default:e(()=>[n("用户协议")]),_:1}),t(_,{type:"link"},{default:e(()=>[n("隐私政策")]),_:1})]),l("div",null,[n(" 服务器时间："),l("span",se,h(s(z)),1)])]),_:1})]),_:1})}}}),ie=ee(le,[["__scopeId","data-v-9d36a954"]]);export{ie as default};
