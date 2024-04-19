import{D as P,E as J,o as E,F as K,G as M,r as I,H as O,d as B,j as h,I as Q,m as p,b as l,c as r,e,J as x,K as C,k as L,l as k,v as u,q as T,n as f,p as m,f as X,z as Y,L as Z,t as ee,A as te,C as se}from"./assets/index-B6Sr_t6A.js";import{g as oe,c as ne,a as ae,u as le,b as ce}from"./BVnzyxI2.js";import{d as z,_ as ie}from"./CruuKwbB.js";import{u as re}from"./DDJBs58D.js";import{g as ue}from"./g79jvVlz.js";function de(t,s){var d,i;if(!P)return;if(!t)return s;let o;return typeof t=="function"?o=t():J(t)?o=(i=(d=t.value)==null?void 0:d.$el)!=null?i:t.value:o=t,o}function _e(t=()=>{}){const s=()=>{M(()=>{t()})};return E(()=>{window.addEventListener("resize",s,!1)}),K(()=>{window.removeEventListener("resize",s)}),null}function pe(t){const s=I({width:0,height:0}),d=()=>{var i,o;const _=de(t);s.width=(i=_==null?void 0:_.clientWidth)!=null?i:0,s.height=(o=_==null?void 0:_.clientHeight)!=null?o:0};return _e(d),E(()=>{setTimeout(()=>{d()},120)}),{...O(s)}}const fe={class:"list flex flex-wrap w-[1200px] pt-5"},he=["alt","src"],ge={class:"p-2 flex-1"},ve={class:"text-2xl"},me={class:"overflow-hidden my-4"},xe={key:0,class:"py-1 px-2 mr-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-500 dark:text-gray-200"},be={class:"flex justify-between items-center"},ye={class:""},we={class:"mr-4"},ke={class:"text-red-500"},Ce={class:"image-price"},Ee={class:"text-xl text-blue-600 dark:text-blue-400"},Se=B({__name:"ListProducts",setup(t){const s=I({limit:"20",page:1,search_value:""}),d=h([]),i=h(0),{run:o}=re(async()=>ue(Q(s)).then(_=>{d.value=_.list,i.value=_.total}),{debounceWait:500,manual:!0});return E(()=>{o()}),(_,g)=>{const S=p("router-link"),y=p("a-pagination");return l(),r(x,null,[e("div",fe,[(l(!0),r(x,null,C(d.value,n=>(l(),L(S,{key:n.gd_no,to:"/detail?id="+n.gd_no,class:"image-card flex pointer w-full rounded-xl border dark:border-slate-500 overflow-hidden bg-gray-100 dark:bg-gray-600 dark:shadow-gray-700 hover:text-blue-400 hover:shadow-xl mb-6"},{default:k(()=>[e("img",{alt:n.gd_name,src:n.picture,class:"w-32 h-32",loading:"lazy"},null,8,he),e("div",ge,[e("h4",ve,u(n.gd_name),1),e("p",me,[(l(!0),r(x,null,C(n.gd_keywords,v=>(l(),r("span",{key:n.gd_no+v,class:"py-1 px-2 mr-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-500 dark:text-gray-200"},u(v),1))),128)),n.is_automatic?(l(),r("span",xe,"自动发货")):T("",!0)]),e("div",be,[e("p",ye,[e("span",we,"库存："+u(n.in_stock),1),e("span",ke,"已售："+u(n.sales_volume),1)]),e("p",Ce,[e("span",Ee,u(n.actual_price_label),1)])])])]),_:2},1032,["to"]))),128))]),f(y,{current:s.page,"onUpdate:current":g[0]||(g[0]=n=>s.page=n),size:s.limit,"onUpdate:size":g[1]||(g[1]=n=>s.limit=n),total:i.value,"hide-on-single-page":"","show-less-items":"",onChange:m(o)},null,8,["current","size","total","onChange"])],64)}}}),b=t=>(te("data-v-a5b00585"),t=t(),se(),t),$e={class:"home flex flex-col items-center gap-5"},ze={key:0,class:"flex w-[1200px] gap-5 pt-5"},Le={class:"p-5 flex justify-between items-center"},Re=b(()=>e("h4",null,"套餐",-1)),je=b(()=>e("span",{class:"text-blue-500 cursor-pointer"},"更多",-1)),Ie={class:"hover:bg-gray-100 p-5"},Be={class:"flex items-center justify-between"},Te={class:"flex items-center justify-between"},Ue={class:"bg-white border rounded-xl p-5"},De={class:"flex justify-between items-center mb-2"},Ve=b(()=>e("h4",{class:""},"我的钱包",-1)),He=b(()=>e("span",{class:"text-blue-500 cursor-pointer"},"更多",-1)),Ne={class:"flex flex-col gap-2"},We={class:"text-gray-600"},qe={class:"flex flex-col justify-between gap-2"},Ae={class:"copilot-box rounded-xl p-5"},Fe={class:"flex justify-between mb-2"},Ge=b(()=>e("span",{class:"font-bold text-gray-50"},"Copilot",-1)),Pe={class:"flex justify-between items-center text-gray-200"},Je=b(()=>e("span",{class:""},"剩余时间",-1)),Ke=B({__name:"index",setup(t){const s=h(),d=pe(s),i=X(),o=h({paused_time:void 0,remaining_time:0,start_time:void 0,is_paused:1});function _(){oe().then(a=>{o.value=a})}const g=h(!1);function S(){g.value=!0,ne().then(a=>{o.value.is_paused=a.is_paused}).finally(()=>{g.value=!1})}const y=h([]);function n(){ae().then(a=>{y.value=a})}const v=h(""),$=h(!1);function U(){$.value=!0,le(v.value).then(()=>{v.value="",Z.success("兑换成功")}).finally(()=>{$.value=!1})}const R=h([]);function D(){ce({status:"ACTIVE"}).then(a=>{R.value=a.list.map(V)})}function V(a){a.reason_label=a.reason||"已使用：0s";const w=a.reason_label.match(/\d+/);return a.reason=w[0],a.percent=100-+a.reason/a.recharge_time*100,a}return E(()=>{i.account_id&&(_(),n(),D())}),(a,w)=>{const j=p("router-link"),H=p("a-divider"),N=p("a-progress"),W=p("a-input"),q=p("a-button"),A=p("a-switch"),F=p("a-statistic"),G=p("a-statistic-countdown");return l(),r("div",$e,[m(i).account_id?(l(),r("div",ze,[e("div",{style:Y({height:m(d).height+"px"}),class:"flex-1 max-h-[352px] overflow-auto scrollbar-width-none bg-white border rounded-xl"},[e("div",Le,[Re,f(j,{to:"/copilot-package"},{default:k(()=>[je]),_:1})]),(l(!0),r(x,null,C(R.value,c=>(l(),r(x,{key:c.source},[f(H,{class:"m-0"}),e("div",Ie,[e("div",Be,[e("h4",null,u(c.source),1),e("span",null,"总时长："+u(c.recharge_time_label),1)]),f(N,{percent:c.percent,"show-info":!1,class:"mb-0",strokeColor:"#1677ff"},null,8,["percent"]),e("div",Te,[e("span",null,"剩余："+u(m(z)(c.recharge_time-+(c.reason||"0"),"second")),1),e("span",null,"已使用："+u(m(z)(+(c.reason||"0"),"second")),1)])])],64))),128))],4),e("div",{ref_key:"serverRef",ref:s,class:"w-[300px] flex flex-col gap-5 flex-shrink-0"},[e("div",Ue,[e("div",De,[Ve,f(j,{to:"/purse"},{default:k(()=>[He]),_:1})]),e("ul",Ne,[(l(!0),r(x,null,C(y.value,c=>(l(),r("li",{key:c.type_label,class:"flex justify-between"},[e("span",We,u(c.type_label),1),e("span",null,u(c.balance_label),1)]))),128)),e("li",qe,[f(W,{value:v.value,"onUpdate:value":w[0]||(w[0]=c=>v.value=c),placeholder:"兑换码"},null,8,["value"]),f(q,{loading:$.value,type:"primary",onClick:U},{default:k(()=>[ee("充值 ")]),_:1},8,["loading"])])])]),e("div",Ae,[e("ul",null,[e("li",Fe,[Ge,f(A,{checked:o.value.is_paused,"checked-value":0,loading:g.value,"un-checked-value":1,"checked-children":"开",class:"copilot-green","un-checked-children":"关",onClick:S},null,8,["checked","loading"])]),e("li",Pe,[Je,o.value.is_paused===1?(l(),L(F,{key:0,value:m(z)(o.value.remaining_time),"value-style":{color:"#E5E7EB"}},null,8,["value"])):(l(),L(G,{key:1,value:o.value.remaining_time,"value-style":{color:"#E5E7EB"},format:"HH:mm:ss"},null,8,["value"]))])])])],512)])):T("",!0),f(Se)])}}}),Ze=ie(Ke,[["__scopeId","data-v-a5b00585"]]);export{Ze as default};
