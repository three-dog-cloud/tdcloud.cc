import{g as C,u as T,aw as A,r as w,a4 as c,ag as d,ab as t,a6 as n,a7 as s,ad as i,aa as o,H as O,ah as j,ax as R,as as U,ay as N,az as P,aA as q,af as h,n as B,ak as I,ai as z}from"./assets/index-CAwU6Zsh.js";import{_ as m}from"./jABTa_-y.js";import{b as D,_ as G,a as H}from"./BcLLECjM.js";import{_ as M}from"./CwatsEyP.js";import{_ as E}from"./JGFKB80l.js";import{_ as k}from"./CXLW1zmg.js";import{_ as b}from"./B3uU83pg.js";import{I as F,O as J}from"./BLkjHsvj.js";import{U as K,O as Q}from"./C9YzgWTO.js";const W={class:"flex items-center justify-center min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-145px)] px-4"},X={class:"grid gap-4"},Y={class:"flex justify-center"},Z={class:"flex flex-wrap justify-center gap-2 max-w-[250px]"},ee={class:"grid gap-4"},se={class:"grid gap-2"},te={class:"grid gap-2"},oe={class:"flex items-center justify-between"},ae={key:0,class:"text-center text-sm"},_e=C({__name:"LoginPage",setup(ne){var g,p,_,x;const u=T(),f=A();function y(){K.requestLogin(l.value).then(a=>{q.success(h("login.success")),B(()=>{const e=I();e.setToken(a.token,a.token_timeout),e.setRefreshToken(a.refresh_token,a.refresh_token_timeout),f.push({name:"HomePage"})})}).catch(a=>{z(a.error,h("error.code")+a.code),a.code===20104&&(l.value.password="")})}function V(){f.push({name:"RegisterPage"})}const $=[{icon:"logos:discourse-icon",name:"Discourse",show:(g=u.config)==null?void 0:g.discourse},{icon:"logos:github-icon",name:"Github",show:(p=u.config)==null?void 0:p.github},{icon:"logos:google-icon",name:"Google",show:(_=u.config)==null?void 0:_.google},{icon:"logos:telegram",name:"Telegram",show:(x=u.config)==null?void 0:x.telegram}],l=w({username:"",password:""}),L=w(null),S=a=>{Q.getLoginAccountOAuthURL(a).then(e=>{window.location.replace(e.redirect)}).catch(e=>{J.error(e.error)})};return(a,e)=>(c(),d("div",W,[t(s(D),{class:"w-full max-w-sm"},{default:n(()=>[t(s(G),null,{default:n(()=>[t(s(M),{class:"text-2xl text-center"},{default:n(()=>e[2]||(e[2]=[i(" 登录 ")])),_:1}),t(s(E),{class:"text-center"},{default:n(()=>e[3]||(e[3]=[i(" 请选择登录方式或输入您的账户信息 ")])),_:1})]),_:1}),t(s(H),null,{default:n(()=>{var v;return[o("div",X,[o("div",Y,[o("div",Z,[(c(),d(O,null,j($,r=>N(t(s(m),{key:r.name,variant:"outline",size:"icon",class:"w-10 h-10 dark:bg-gray-500",title:r.name,onClick:re=>S(r.name.toLowerCase())},{default:n(()=>[t(s(F),{icon:r.icon,class:"w-6 h-6"},null,8,["icon"])]),_:2},1032,["title","onClick"]),[[P,r.show]])),64))])]),e[9]||(e[9]=o("div",{class:"relative"},[o("div",{class:"absolute inset-0 flex items-center"},[o("span",{class:"w-full border-t"})]),o("div",{class:"relative flex justify-center text-xs uppercase"},[o("span",{class:"bg-background px-2 text-muted-foreground"},"或")])],-1)),o("form",{onSubmit:R(y,["prevent"])},[o("div",ee,[o("div",se,[t(s(b),{for:"account"},{default:n(()=>e[4]||(e[4]=[i("账户")])),_:1}),t(s(k),{type:"text",placeholder:"请输入账户",name:"account",modelValue:l.value.username,"onUpdate:modelValue":e[0]||(e[0]=r=>l.value.username=r),required:""},null,8,["modelValue"])]),o("div",te,[o("div",oe,[t(s(b),{for:"password"},{default:n(()=>e[5]||(e[5]=[i("密码")])),_:1})]),t(s(k),{type:"password",name:"password",placeholder:"请输入密码",modelValue:l.value.password,"onUpdate:modelValue":e[1]||(e[1]=r=>l.value.password=r),required:""},null,8,["modelValue"])]),t(s(m),{type:"submit",class:"w-full",disabled:L.value!==null},{default:n(()=>e[6]||(e[6]=[i(" 登录 ")])),_:1},8,["disabled"])])],32),(v=s(u).config)!=null&&v.register?(c(),d("div",ae,[e[8]||(e[8]=i(" 还没有账户? ")),t(s(m),{variant:"link",class:"px-0 h-auto",onClick:V},{default:n(()=>e[7]||(e[7]=[i("注册")])),_:1})])):U("",!0)])]}),_:1})]),_:1})]))}});export{_e as default};
