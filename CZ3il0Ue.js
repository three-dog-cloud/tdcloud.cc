import{_ as n}from"./BNFsYpSQ.js";import"./B2fpPDBJ.js";import{g as s,aj as i,x as p,a3 as m,a4 as u,a5 as l,a6 as c,a7 as d,ab as _}from"./assets/index-TEvEOdUJ.js";import"./DOUTsnoj.js";import"./CgIIxLXQ.js";import"./Q2geCv2H.js";import"./CjPmofJG.js";import"./CHX-ruqe.js";const C=s({name:"HomeLayout",__name:"Index",setup(f){const e=i(),o=p(()=>[{title:"主页",path:"HomePage",icon:"material-symbols:home-rounded",type:"router-link"},e.isLogin?{title:"控制台",path:"DashboardPage",icon:"mage:dashboard-bar-fill",type:"button"}:{title:"登录",path:"LoginPage",icon:"material-symbols:login-rounded",type:"button"}]);return(b,t)=>{const a=m("router-view");return u(),l(d(n),{routerMaps:o.value,"onUpdate:routerMaps":t[0]||(t[0]=r=>o.value=r),routerMapsModifiers:{lazy:!0}},{content:c(()=>[_(a)]),_:1},8,["routerMaps"])}}});export{C as default};