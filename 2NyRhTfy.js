import{g as Q,c as X,a as Y,u as Z,b as ee}from"./DwvKPdHQ.js";import{d as B,r as te,k as i,E as se,o as E,n as d,b as o,c as n,e,F as g,G as S,l as F,m as C,x as l,t as T,q as x,p as c,f as oe,h as ae,j as V,A as ne,H as le,v as re,C as ce,D as ie}from"./assets/index-Bim51ZJQ.js";import{f as de,d as R,g as ue}from"./Bf623Eqq.js";import{u as _e}from"./DF0P71qK.js";import{g as pe}from"./B1U4_Z0r.js";import{_ as ge}from"./DlAUqK2U.js";const he={class:"list flex flex-wrap w-[1200px] gap-5"},fe=["alt","src"],ve={class:"p-2 flex-1"},me={class:"text-2xl"},xe={class:"overflow-hidden flex my-4"},ye={key:0,class:"py-1 px-2 mr-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-500 dark:text-gray-200"},be={class:"flex justify-between items-center"},ke={class:""},we={class:"mr-4"},Ce={class:"text-red-500"},Se={class:"image-price"},$e={class:"text-xl text-blue-600 dark:text-blue-400"},je=B({__name:"ListProducts",setup(h){const u=te({limit:"20",page:1,search_value:""}),f=i([]),v=i(0),{run:y}=_e(async()=>pe(se(u)).then(r=>{f.value=r.list,v.value=r.total}),{debounceWait:500,manual:!0});return E(()=>{y()}),(r,p)=>{const m=d("router-link"),$=d("a-pagination");return o(),n(g,null,[e("div",he,[(o(!0),n(g,null,S(f.value,s=>(o(),F(m,{key:s.gd_no,to:"/detail?id="+s.gd_no,class:"image-card flex pointer w-[590px] rounded-xl border dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800 dark:shadow-gray-700 hover:text-blue-400 hover:shadow-xl"},{default:C(()=>[e("img",{alt:s.gd_name,src:s.picture,class:"w-[138px] h-[138px]",loading:"lazy"},null,8,fe),e("div",ve,[e("h4",me,l(s.gd_name),1),e("div",xe,[(o(!0),n(g,null,S(s.gd_keywords,b=>(o(),n("div",{key:s.gd_no+b,class:"py-1 px-2 mr-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-500 dark:text-gray-200"},l(b),1))),128)),s.is_automatic?(o(),n("div",ye," 自动发货 ")):T("",!0)]),e("div",be,[e("p",ke,[e("span",we,"库存："+l(s.in_stock),1),e("span",Ce,"已售："+l(s.sales_volume),1)]),e("p",Se,[e("span",$e,l(x(de)(s.retail_price)),1)])])])]),_:2},1032,["to"]))),128))]),c($,{current:u.page,"onUpdate:current":p[0]||(p[0]=s=>u.page=s),size:u.limit,"onUpdate:size":p[1]||(p[1]=s=>u.limit=s),total:v.value,"hide-on-single-page":"","show-less-items":"",onChange:x(y)},null,8,["current","size","total","onChange"])],64)}}}),_=h=>(ce("data-v-e0549572"),h=h(),ie(),h),Le={class:"home flex flex-col items-center gap-5"},Re={key:0,class:"flex w-[1200px] gap-5"},Te={class:"p-5 flex justify-between items-center"},ze=_(()=>e("h4",null,"套餐",-1)),Ie=_(()=>e("span",{class:"text-blue-500 cursor-pointer"},"更多",-1)),Ue={key:0,class:"h-full overflow-auto scrollbar-width-none flex-1"},De={class:"hover:bg-gray-100 dark:hover:bg-gray-900 p-5"},Ve={class:"flex items-center justify-between"},Be={class:"flex items-center justify-between"},Ee={key:1},Fe={class:"h-full flex items-center justify-center"},Ne={class:"bg-white dark:bg-gray-800 dark:border-gray-900 border rounded-xl p-5"},Pe={class:"flex justify-between items-center mb-2"},qe=_(()=>e("h4",{class:""},"我的钱包",-1)),Ae=_(()=>e("span",{class:"text-blue-500 cursor-pointer"},"更多",-1)),Ge={class:"flex flex-col gap-2"},He={class:"text-gray-600 dark:text-gray-200"},Me={class:"flex flex-col justify-between gap-2"},We={class:"copilot-box rounded-xl p-5"},Je={class:"flex justify-between mb-2"},Ke=_(()=>e("span",{class:"font-bold text-gray-50"},"Copilot",-1)),Oe={class:"flex justify-between items-center text-gray-200"},Qe=_(()=>e("span",{class:""},"剩余时间",-1)),Xe={class:"text-2xl"},Ye={class:"bg-white dark:bg-gray-800 dark:border-gray-900 border rounded-xl p-5"},Ze=_(()=>e("span",null,"服务器时间：",-1)),et={class:"text-blue-500"},tt=B({__name:"index",setup(h){const u=i(),f=i({width:0,height:0}),v=oe(),y=ae(),r=i({paused_time:void 0,remaining_time:0,start_time:void 0,is_paused:1}),p=V(()=>R(r.value.remaining_time,"second"));function m(){r.value.is_paused!=1&&setTimeout(()=>{r.value.remaining_time-=1,m()},1e3)}function $(){Q().then(t=>{r.value=t,m()})}const s=i(!1);function b(){s.value=!0,X().then(t=>{r.value.remaining_time=t.remaining_time,r.value.is_paused=t.is_paused,m()}).finally(()=>{s.value=!1})}const z=i([]);function I(){Y().then(t=>{z.value=t}).finally(()=>{G()})}const k=i(""),j=i(!1);function N(){j.value=!0,Z(k.value).then(()=>{k.value="",I(),le.success("兑换成功")}).finally(()=>{j.value=!1})}const L=i([]);function P(){ee({status:"ACTIVE",order_by:"asc"}).then(t=>{L.value=t.list.map(q)})}function q(t){t.reason_label=t.reason||"已使用：0s";const w=t.reason_label.match(/\d+/);return t.reason=w[0],t.percent=100-+t.reason/t.recharge_time*100,t}const A=V(()=>ue(y.timeStamp));function G(){const t=getComputedStyle(u.value);f.value={width:parseFloat(t.width),height:parseFloat(t.height)}}return E(()=>{v.account_id&&($(),I(),P())}),(t,w)=>{const U=d("router-link"),D=d("a-divider"),H=d("a-progress"),M=d("a-empty"),W=d("a-input"),J=d("a-button"),K=d("a-switch");return o(),n("div",Le,[x(v).account_id?(o(),n("div",Re,[e("div",{style:ne({height:f.value.height+"px"}),class:"flex-1 flex flex-col bg-white dark:bg-gray-800 dark:border-gray-900 border rounded-xl overflow-hidden"},[e("div",Te,[ze,c(U,{to:"/copilot-package"},{default:C(()=>[Ie]),_:1})]),c(D,{class:"m-0"}),L.value.length?(o(),n("div",Ue,[(o(!0),n(g,null,S(L.value,(a,O)=>(o(),n(g,{key:a.source},[O!=0?(o(),F(D,{key:0,class:"m-0"})):T("",!0),e("div",De,[e("div",Ve,[e("h4",null,l(a.source),1),e("span",null,"总时长："+l(a.recharge_time_label),1)]),c(H,{percent:a.percent,"show-info":!1,class:"mb-0",strokeColor:"#1677ff"},null,8,["percent"]),e("div",Be,[e("span",null,"剩余："+l(x(R)(a.recharge_time-+(a.reason||"0"),"second")),1),e("span",null,"已使用："+l(x(R)(+(a.reason||"0"),"second")),1)])])],64))),128))])):(o(),n("div",Ee,[e("div",Fe,[c(M)])]))],4),e("div",{ref_key:"serverRef",ref:u,class:"w-[300px] flex flex-col gap-5 flex-shrink-0"},[e("div",Ne,[e("div",Pe,[qe,c(U,{to:"/purse"},{default:C(()=>[Ae]),_:1})]),e("ul",Ge,[(o(!0),n(g,null,S(z.value,a=>(o(),n("li",{key:a.type_label,class:"flex justify-between"},[e("span",He,l(a.type_label),1),e("span",null,l(a.balance_label),1)]))),128)),e("li",Me,[c(W,{value:k.value,"onUpdate:value":w[0]||(w[0]=a=>k.value=a),"allow-clear":"",placeholder:"兑换码"},null,8,["value"]),c(J,{loading:j.value,type:"primary",onClick:N},{default:C(()=>[re("充值 ")]),_:1},8,["loading"])])])]),e("div",We,[e("ul",null,[e("li",Je,[Ke,c(K,{checked:r.value.is_paused,"checked-value":0,loading:s.value,"un-checked-value":1,"checked-children":"开",class:"copilot-green","un-checked-children":"关",onClick:b},null,8,["checked","loading"])]),e("li",Oe,[Qe,e("span",Xe,l(p.value),1)])])]),e("div",Ye,[Ze,e("span",et,l(A.value),1)])],512)])):T("",!0),c(je)])}}}),ct=ge(tt,[["__scopeId","data-v-e0549572"]]);export{ct as default};