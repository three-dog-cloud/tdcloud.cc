import{m as D,p as S,M as j,L as G,q as z,g as I,r as w,t as $e,s as oe,aJ as Ze,E as Qe,N as ee,aK as ke,x as T,Q as R,aL as Je,y as Ce,aM as re,aN as ge,k,aO as et,B as tt,P as at,w as pe,n as _e,aP as ot,aQ as nt,aR as st,U as lt,aS as rt,K as be,aT as it,aU as ct,j as dt,T as ut,aV as ze,aW as mt,X as ft,aX as ye,Z as ne,a4 as b,a5 as P,a6 as c,ab as l,a7 as e,ax as K,ay as Z,aa as h,ad as $,ae as B,ag as O,ar as V,H as A,ah as Y,l as H,ac as q,aq as te,A as pt,am as ht,an as vt,a2 as gt}from"./assets/index-BE9XhI5F.js";import{P as _t,O as xe,i as bt,_ as yt,a as xt}from"./Dhes7gQn.js";import{O as E}from"./Cd_E4zi1.js";import{_ as wt,a as $t,b as kt}from"./3K1s4utO.js";import{_ as Q}from"./BmMxN-ha.js";import{_ as Ct,a as zt,b as St,c as Pt,d as Bt,e as Rt,f as Ot,g as Nt,h as It}from"./Br2fWh7J.js";import{a as ie,b as ce,c as de,_ as ue}from"./CEBeazy6.js";import{g as W,a as Tt,d as Mt,e as Dt,f as Et,_ as Lt,b as jt,c as At}from"./hbcvasLE.js";import{_ as Ut,a as Ft,b as Vt,c as Ht,d as Yt,D as qt}from"./DLQ4Cbss.js";import{_ as me,c as Se,A as Wt,O as Xt,v as Gt,d as Kt}from"./DAvAWswm.js";import{_ as J}from"./CUIF3cD1.js";import{_ as Zt}from"./Cvr482_B.js";import{_ as Qt}from"./B_Z6GyEv.js";import{_ as le}from"./Bj6-l3Qo.js";import{P as Jt}from"./DRO8VUZ_.js";import"./BWDXiyOw.js";import{u as ea}from"./Clxn1Ass.js";import{L as ta}from"./BEbPrrrj.js";import"./CRlC_2N-.js";import"./CvxCNvYV.js";import"./DiveiT-O.js";import"./FDccv-hp.js";import"./YaxshJu-.js";function aa(t){switch(typeof t){case"string":return t||void 0;case"number":return String(t);default:return}}const oa={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},na=D("tag",`
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[S("strong",`
 font-weight: var(--n-font-weight-strong);
 `),j("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),j("icon",`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),j("avatar",`
 display: flex;
 margin: 0 6px 0 0;
 `),j("close",`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),S("round",`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[j("icon",`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),j("avatar",`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),S("closable",`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),S("icon, avatar",[S("round",`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),S("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),S("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[G("disabled",[z("&:hover","background-color: var(--n-color-hover-checkable);",[G("checked","color: var(--n-text-color-hover-checkable);")]),z("&:active","background-color: var(--n-color-pressed-checkable);",[G("checked","color: var(--n-text-color-pressed-checkable);")])]),S("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[G("disabled",[z("&:hover","background-color: var(--n-color-checked-hover);"),z("&:active","background-color: var(--n-color-checked-pressed);")])])])]),sa=Object.assign(Object.assign(Object.assign({},oe.props),oa),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),la=tt("n-tag"),Pe=I({name:"Tag",props:sa,setup(t){const o=w(null),{mergedBorderedRef:a,mergedClsPrefixRef:n,inlineThemeDisabled:s,mergedRtlRef:r}=$e(t),i=oe("Tag","-tag",na,Ze,t,n);Qe(la,{roundRef:ee(t,"round")});function d(){if(!t.disabled&&t.checkable){const{checked:g,onCheckedChange:y,onUpdateChecked:_,"onUpdate:checked":m}=t;_&&_(!g),m&&m(!g),y&&y(!g)}}function p(g){if(t.triggerClickOnClose||g.stopPropagation(),!t.disabled){const{onClose:y}=t;y&&at(y,g)}}const u={setTextContent(g){const{value:y}=o;y&&(y.textContent=g)}},f=ke("Tag",r,n),v=T(()=>{const{type:g,size:y,color:{color:_,textColor:m}={}}=t,{common:{cubicBezierEaseInOut:M},self:{padding:N,closeMargin:U,borderRadius:x,opacityDisabled:L,textColorCheckable:se,textColorHoverCheckable:Be,textColorPressedCheckable:Re,textColorChecked:Oe,colorCheckable:Ne,colorHoverCheckable:Ie,colorPressedCheckable:Te,colorChecked:Me,colorCheckedHover:De,colorCheckedPressed:Ee,closeBorderRadius:Le,fontWeightStrong:je,[R("colorBordered",g)]:Ae,[R("closeSize",y)]:Ue,[R("closeIconSize",y)]:Fe,[R("fontSize",y)]:Ve,[R("height",y)]:he,[R("color",g)]:He,[R("textColor",g)]:Ye,[R("border",g)]:qe,[R("closeIconColor",g)]:ve,[R("closeIconColorHover",g)]:We,[R("closeIconColorPressed",g)]:Xe,[R("closeColorHover",g)]:Ge,[R("closeColorPressed",g)]:Ke}}=i.value,X=Je(U);return{"--n-font-weight-strong":je,"--n-avatar-size-override":`calc(${he} - 8px)`,"--n-bezier":M,"--n-border-radius":x,"--n-border":qe,"--n-close-icon-size":Fe,"--n-close-color-pressed":Ke,"--n-close-color-hover":Ge,"--n-close-border-radius":Le,"--n-close-icon-color":ve,"--n-close-icon-color-hover":We,"--n-close-icon-color-pressed":Xe,"--n-close-icon-color-disabled":ve,"--n-close-margin-top":X.top,"--n-close-margin-right":X.right,"--n-close-margin-bottom":X.bottom,"--n-close-margin-left":X.left,"--n-close-size":Ue,"--n-color":_||(a.value?Ae:He),"--n-color-checkable":Ne,"--n-color-checked":Me,"--n-color-checked-hover":De,"--n-color-checked-pressed":Ee,"--n-color-hover-checkable":Ie,"--n-color-pressed-checkable":Te,"--n-font-size":Ve,"--n-height":he,"--n-opacity-disabled":L,"--n-padding":N,"--n-text-color":m||Ye,"--n-text-color-checkable":se,"--n-text-color-checked":Oe,"--n-text-color-hover-checkable":Be,"--n-text-color-pressed-checkable":Re}}),C=s?Ce("tag",T(()=>{let g="";const{type:y,size:_,color:{color:m,textColor:M}={}}=t;return g+=y[0],g+=_[0],m&&(g+=`a${re(m)}`),M&&(g+=`b${re(M)}`),a.value&&(g+="c"),g}),v,t):void 0;return Object.assign(Object.assign({},u),{rtlEnabled:f,mergedClsPrefix:n,contentRef:o,mergedBordered:a,handleClick:d,handleCloseClick:p,cssVars:s?void 0:v,themeClass:C==null?void 0:C.themeClass,onRender:C==null?void 0:C.onRender})},render(){var t,o;const{mergedClsPrefix:a,rtlEnabled:n,closable:s,color:{borderColor:r}={},round:i,onRender:d,$slots:p}=this;d==null||d();const u=ge(p.avatar,v=>v&&k("div",{class:`${a}-tag__avatar`},v)),f=ge(p.icon,v=>v&&k("div",{class:`${a}-tag__icon`},v));return k("div",{class:[`${a}-tag`,this.themeClass,{[`${a}-tag--rtl`]:n,[`${a}-tag--strong`]:this.strong,[`${a}-tag--disabled`]:this.disabled,[`${a}-tag--checkable`]:this.checkable,[`${a}-tag--checked`]:this.checkable&&this.checked,[`${a}-tag--round`]:i,[`${a}-tag--avatar`]:u,[`${a}-tag--icon`]:f,[`${a}-tag--closable`]:s}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},f||u,k("span",{class:`${a}-tag__content`,ref:"contentRef"},(o=(t=this.$slots).default)===null||o===void 0?void 0:o.call(t)),!this.checkable&&s?k(et,{clsPrefix:a,class:`${a}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:i,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?k("div",{class:`${a}-tag__border`,style:{borderColor:r}}):null)}}),we=I({name:"SlotMachineNumber",props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(t){const o=w(null),a=w(t.value),n=w(t.value),s=w("up"),r=w(!1),i=T(()=>r.value?`${t.clsPrefix}-base-slot-machine-current-number--${s.value}-scroll`:null),d=T(()=>r.value?`${t.clsPrefix}-base-slot-machine-old-number--${s.value}-scroll`:null);pe(ee(t,"value"),(f,v)=>{a.value=v,n.value=f,_e(p)});function p(){const f=t.newOriginalNumber,v=t.oldOriginalNumber;v===void 0||f===void 0||(f>v?u("up"):v>f&&u("down"))}function u(f){s.value=f,r.value=!1,_e(()=>{var v;(v=o.value)===null||v===void 0||v.offsetWidth,r.value=!0})}return()=>{const{clsPrefix:f}=t;return k("span",{ref:o,class:`${f}-base-slot-machine-number`},a.value!==null?k("span",{class:[`${f}-base-slot-machine-old-number ${f}-base-slot-machine-old-number--top`,d.value]},a.value):null,k("span",{class:[`${f}-base-slot-machine-current-number`,i.value]},k("span",{ref:"numberWrapper",class:[`${f}-base-slot-machine-current-number__inner`,typeof t.value!="number"&&`${f}-base-slot-machine-current-number__inner--not-number`]},n.value)),a.value!==null?k("span",{class:[`${f}-base-slot-machine-old-number ${f}-base-slot-machine-old-number--bottom`,d.value]},a.value):null)}}}),{cubicBezierEaseOut:F}=ot;function ra({duration:t=".2s"}={}){return[z("&.fade-up-width-expand-transition-leave-active",{transition:`
 opacity ${t} ${F},
 max-width ${t} ${F},
 transform ${t} ${F}
 `}),z("&.fade-up-width-expand-transition-enter-active",{transition:`
 opacity ${t} ${F},
 max-width ${t} ${F},
 transform ${t} ${F}
 `}),z("&.fade-up-width-expand-transition-enter-to",{opacity:1,transform:"translateX(0) translateY(0)"}),z("&.fade-up-width-expand-transition-enter-from",{maxWidth:"0 !important",opacity:0,transform:"translateY(60%)"}),z("&.fade-up-width-expand-transition-leave-from",{opacity:1,transform:"translateY(0)"}),z("&.fade-up-width-expand-transition-leave-to",{maxWidth:"0 !important",opacity:0,transform:"translateY(60%)"})]}const ia=z([z("@keyframes n-base-slot-machine-fade-up-in",`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),z("@keyframes n-base-slot-machine-fade-down-in",`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),z("@keyframes n-base-slot-machine-fade-up-out",`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),z("@keyframes n-base-slot-machine-fade-down-out",`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),D("base-slot-machine",`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[D("base-slot-machine-number",`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[ra({duration:".2s"}),nt({duration:".2s",delay:"0s"}),D("base-slot-machine-old-number",`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[S("top",{transform:"translateY(-100%)"}),S("bottom",{transform:"translateY(100%)"}),S("down-scroll",{animation:"n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),S("up-scroll",{animation:"n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1})]),D("base-slot-machine-current-number",`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[S("down-scroll",{animation:"n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),S("up-scroll",{animation:"n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),j("inner",`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[S("not-number",`
 right: unset;
 left: 0;
 `)])])])])]),ca=I({name:"BaseSlotMachine",props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(t){st("-base-slot-machine",ia,ee(t,"clsPrefix"));const o=w(),a=w(),n=T(()=>{if(typeof t.value=="string")return[];if(t.value<1)return[0];const s=[];let r=t.value;for(t.max!==void 0&&(r=Math.min(t.max,r));r>=1;)s.push(r%10),r/=10,r=Math.floor(r);return s.reverse(),s});return pe(ee(t,"value"),(s,r)=>{typeof s=="string"?(a.value=void 0,o.value=void 0):typeof r=="string"?(a.value=s,o.value=void 0):(a.value=s,o.value=r)}),()=>{const{value:s,clsPrefix:r}=t;return typeof s=="number"?k("span",{class:`${r}-base-slot-machine`},k(rt,{name:"fade-up-width-expand-transition",tag:"span"},{default:()=>n.value.map((i,d)=>k(we,{clsPrefix:r,key:n.value.length-d-1,oldOriginalNumber:o.value,newOriginalNumber:a.value,value:i}))}),k(lt,{key:"+",width:!0},{default:()=>t.max!==void 0&&t.max<s?k(we,{clsPrefix:r,value:"+"}):null})):k("span",{class:`${r}-base-slot-machine`},s)}}}),da=z([z("@keyframes badge-wave-spread",{from:{boxShadow:"0 0 0.5px 0px var(--n-ripple-color)",opacity:.6},to:{boxShadow:"0 0 0.5px 4.5px var(--n-ripple-color)",opacity:0}}),D("badge",`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[S("as-is",[D("badge-sup",{position:"static",transform:"translateX(0)"},[be({transformOrigin:"left bottom",originalTransform:"translateX(0)"})])]),S("dot",[D("badge-sup",`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[z("::before","border-radius: 4px;")])]),D("badge-sup",`
 background: var(--n-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: #FFF;
 position: absolute;
 height: 18px;
 line-height: 18px;
 border-radius: 9px;
 padding: 0 6px;
 text-align: center;
 font-size: var(--n-font-size);
 transform: translateX(-50%);
 left: 100%;
 bottom: calc(100% - 9px);
 font-variant-numeric: tabular-nums;
 z-index: 1;
 display: flex;
 align-items: center;
 `,[be({transformOrigin:"left bottom",originalTransform:"translateX(-50%)"}),D("base-wave",{zIndex:1,animationDuration:"2s",animationIterationCount:"infinite",animationDelay:"1s",animationTimingFunction:"var(--n-ripple-bezier)",animationName:"badge-wave-spread"}),z("&::before",`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),ua=Object.assign(Object.assign({},oe.props),{value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:"default"},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array}),fe=I({name:"Badge",props:ua,setup(t,{slots:o}){const{mergedClsPrefixRef:a,inlineThemeDisabled:n,mergedRtlRef:s}=$e(t),r=oe("Badge","-badge",da,it,t,a),i=w(!1),d=()=>{i.value=!0},p=()=>{i.value=!1},u=T(()=>t.show&&(t.dot||t.value!==void 0&&!(!t.showZero&&Number(t.value)<=0)||!ct(o.value)));dt(()=>{u.value&&(i.value=!0)});const f=ke("Badge",s,a),v=T(()=>{const{type:y,color:_}=t,{common:{cubicBezierEaseInOut:m,cubicBezierEaseOut:M},self:{[R("color",y)]:N,fontFamily:U,fontSize:x}}=r.value;return{"--n-font-size":x,"--n-font-family":U,"--n-color":_||N,"--n-ripple-color":_||N,"--n-bezier":m,"--n-ripple-bezier":M}}),C=n?Ce("badge",T(()=>{let y="";const{type:_,color:m}=t;return _&&(y+=_[0]),m&&(y+=re(m)),y}),v,t):void 0,g=T(()=>{const{offset:y}=t;if(!y)return;const[_,m]=y,M=typeof _=="number"?`${_}px`:_,N=typeof m=="number"?`${m}px`:m;return{transform:`translate(calc(${f!=null&&f.value?"50%":"-50%"} + ${M}), ${N})`}});return{rtlEnabled:f,mergedClsPrefix:a,appeared:i,showBadge:u,handleAfterEnter:d,handleAfterLeave:p,cssVars:n?void 0:v,themeClass:C==null?void 0:C.themeClass,onRender:C==null?void 0:C.onRender,offsetStyle:g}},render(){var t;const{mergedClsPrefix:o,onRender:a,themeClass:n,$slots:s}=this;a==null||a();const r=(t=s.default)===null||t===void 0?void 0:t.call(s);return k("div",{class:[`${o}-badge`,this.rtlEnabled&&`${o}-badge--rtl`,n,{[`${o}-badge--dot`]:this.dot,[`${o}-badge--as-is`]:!r}],style:this.cssVars},r,k(ut,{name:"fade-in-scale-up-transition",onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?k("sup",{class:`${o}-badge-sup`,title:aa(this.value),style:this.offsetStyle},ze(s.value,()=>[this.dot?null:k(ca,{clsPrefix:o,appeared:this.appeared,max:this.max,value:this.value})]),this.processing?k(mt,{clsPrefix:o}):null):null}))}});var ma=function(t,o,a,n){function s(r){return r instanceof a?r:new a(function(i){i(r)})}return new(a||(a=Promise))(function(r,i){function d(f){try{u(n.next(f))}catch(v){i(v)}}function p(f){try{u(n.throw(f))}catch(v){i(v)}}function u(f){f.done?r(f.value):s(f.value).then(d,p)}u((n=n.apply(t,o||[])).next())})};const fa={distance:{type:Number,default:0},onLoad:Function,scrollbarProps:Object},pa=I({name:"InfiniteScroll",props:fa,setup(t){const o=w(null);let a=!1;const n=()=>ma(this,void 0,void 0,function*(){var i;const{value:d}=o;if(d){const{containerRef:p,containerScrollTop:u}=d,f=p==null?void 0:p.scrollHeight,v=p==null?void 0:p.clientHeight;if(p&&f!==void 0&&v!==void 0&&u+v>=f-t.distance){a=!0;try{yield(i=t.onLoad)===null||i===void 0?void 0:i.call(t)}catch{}a=!1}}});return{scrollbarInstRef:o,handleScroll:()=>{a||n()},handleWheel:i=>{i.deltaY<=0||a||n()}}},render(){return k(ft,Object.assign({},this.scrollbarProps,{ref:"scrollbarInstRef",onWheel:this.handleWheel,onScroll:this.handleScroll}),{default:()=>ze(this.$slots.default,()=>[])})}});var ae;(t=>{function o(n){return ye({url:"/commodity",method:"get",params:n})}t.searchCommodityList=o;function a(n){return ye({url:`/commodity/${n}`,method:"get"})}t.getCommodityDetail=a})(ae||(ae={}));const ha=t=>{const o=w(!1),a=w(t.value.limit),n=w([]),s=T(()=>n.value.length>=a.value),r=T(()=>({...t.value}));return ne(()=>{o.value=!0,ae.searchCommodityList(r.value).then(i=>{a.value!=i.total&&(a.value=i.total),Array.isArray(i.items)&&i.items.length>0&&n.value.push(...i.items)}).catch(i=>{E.error(i.error)}).finally(()=>{o.value=!1})}),{loading:o,noMore:s,data:n}},va=()=>{const t=w(!1),o=w([]);return ne(()=>{t.value&&(t.value=!1,_t.getPayOrderPayment().then(a=>{o.value=a}).catch(a=>{E.error(a.error)}))}),{paymentSignal:t,payments:o}},ga=t=>{var i;const o=w(!1),a=w(!1),n=w(),s=w({gd_no:((i=n==null?void 0:n.value)==null?void 0:i.gd_no)??t,quantity:1,other_ipu:{}}),r=()=>{n.value&&n.value.other_ipu_cnf.forEach(d=>{d.isRequired&&!s.value.other_ipu[d.key]?d.status="请输入"+d.label:d.status=""})};return pe(s,r),ne(()=>{a.value===!0&&(o.value=!0,a.value=!1,ae.getCommodityDetail(t).then(d=>{n.value={...d,wholesale_price_cnf:(d.wholesale_price_cnf||[]).map(p=>{const u=p.split("=");return{buy_number:Number(u[0]),price:Number(u[1])}}),other_ipu_cnf:(d.other_ipu_cnf||[]).map(p=>{const u=p.split("=");return{key:u[0],label:u[1],isRequired:u[2]=="true"}})}}).catch(d=>{E.error(d.error)}).finally(()=>{o.value=!1}))}),{loading:o,commodityDetailsignal:a,product:n,formData:s,validator:r}},_a=["src","alt"],ba={class:"space-y-4"},ya={class:"text-lg font-semibold leading-tight text-gray-900 dark:text-white"},xa={class:"mt-2 flex items-center gap-2"},wa={class:"text-sm font-medium text-gray-900 dark:text-white"},$a={key:0,class:"text-sm font-medium text-gray-900 dark:text-white"},ka={class:"mt-2 flex items-center space-x-1 flex-wrap"},Ca={class:"mt-4 flex items-center justify-between gap-4"},za=I({__name:"CommodityCard",props:{commodity:{}},setup(t){const o=w(!0);return setTimeout(()=>{o.value=!1},3e3),(a,n)=>{const s=Ct,r=fe,i=Pe;return b(),P(e(kt),{class:"overflow-hidden flex flex-col hover:shadow-sm dark:hover:shadow-white-sm dark:bg-gray-900"},{default:c(()=>[l(e(wt),{class:"p-0"},{default:c(()=>[K(l(e(Q),{class:"h-35 w-full"},null,512),[[Z,o.value]]),K(h("img",{src:a.commodity.picture_url,alt:a.commodity.gd_name,class:"w-full h-35 object-cover",onLoad:n[0]||(n[0]=()=>o.value=!1)},null,40,_a),[[Z,!o.value]])]),_:1}),l(e($t),{class:"flex-grow flex flex-col justify-between p-4"},{default:c(()=>[K(h("div",ba,[l(e(Q),{class:"h-4 w-[250px]"}),l(e(Q),{class:"h-4 w-[200px]"}),l(e(Q),{class:"h-4 w-[200px]"})],512),[[Z,o.value]]),K(h("div",null,[h("span",ya,[l(s,{class:"w-full"},{default:c(()=>[$(B(a.commodity.gd_name),1)]),_:1})]),h("div",xa,[h("span",wa,[n[1]||(n[1]=$(" 库存：")),l(r,{max:999,value:a.commodity.in_stock,type:"info","show-zero":"",class:"text-gray-900!"},null,8,["value"])]),a.commodity.sales_volume>0?(b(),O("span",$a,[n[2]||(n[2]=$(" 销量：")),l(r,{max:999,value:a.commodity.sales_volume,type:"info","show-zero":"",class:"text-gray-900!"},null,8,["value"])])):V("",!0)]),h("div",ka,[(b(!0),O(A,null,Y(a.commodity.gd_keywords,(d,p)=>(b(),P(i,{key:p,size:"small"},{default:c(()=>[$(B(d),1)]),_:2},1024))),128))]),h("div",Ca,[H(a.$slots,"footer",{commodity:a.commodity})])],512),[[Z,!o.value]])]),_:3})]),_:3})}}}),Sa={class:"text-2xl font-extrabold leading-tight text-gray-900 dark:text-white flex"},Pa={class:"line-through"},Ba=I({__name:"CommodityCardAction",props:{commodity:{}},setup(t){return(o,a)=>(b(),O(A,null,[h("p",Sa,[l(e(ue),null,{default:c(()=>[l(e(ie),null,{default:c(()=>[l(e(ce),{class:"flex flex-row items-center"},{default:c(()=>[h("span",Pa,[(b(),P(q(e(W)(o.commodity.actual_price))))]),a[0]||(a[0]=$(" / ")),(b(),P(q(e(W)(o.commodity.retail_price))))]),_:1}),l(e(de),{class:"text-lg"},{default:c(()=>[$(B(o.$t("shopping.discounted.original_cost")+o.commodity.actual_price.toLocaleString()+o.$t("console.wallet_card.unit"))+", "+B(o.$t("shopping.discounted.sell_price")+o.commodity.retail_price.toLocaleString()+o.$t("console.wallet_card.unit")),1)]),_:1})]),_:1})]),_:1})]),H(o.$slots,"default")],64))}}),Ra=I({__name:"CardDialog",props:{open:{type:Boolean},title:{}},emits:["update:open"],setup(t,{emit:o}){console.log(t.open);const a=o;return(n,s)=>{const r=jt;return b(),P(e(Lt),{"onUpdate:open":s[0]||(s[0]=i=>a("update:open",i)),open:n.open},{default:c(()=>[l(e(Tt),{"as-child":""},{default:c(()=>[l(e(me),null,{default:c(()=>s[1]||(s[1]=[$("详情")])),_:1})]),_:1}),l(r,{class:te(["min-h-[100vh]!","min-w-full!","my-0","mx-0","md:w-180!","md:h-140!","md:min-h-auto!","md:min-w-auto!","lg:w-240!","max-w-full!"])},{default:c(()=>[l(e(Mt),{class:"flex justify-center"},{default:c(()=>[l(e(Dt),null,{default:c(()=>s[2]||(s[2]=[$(" 商品详情 ")])),_:1}),l(e(Et),null,{default:c(()=>[$(B(n.title),1)]),_:1})]),_:1}),H(n.$slots,"default")]),_:3})]),_:3},8,["open"])}}}),Oa=I({__name:"Avatar",props:{class:{},size:{default:"sm"},shape:{default:"circle"}},setup(t){const o=t;return(a,n)=>(b(),P(e(Wt),{class:te(e(Se)(e(Ta)({size:a.size,shape:a.shape}),o.class))},{default:c(()=>[H(a.$slots,"default")]),_:3},8,["class"]))}}),Na=I({__name:"AvatarImage",props:{src:{},asChild:{type:Boolean},as:{}},setup(t){const o=t;return(a,n)=>(b(),P(e(Xt),pt(o,{class:"h-full w-full object-cover"}),null,16))}}),Ia=I({__name:"AvatarFallback",props:{delayMs:{},asChild:{type:Boolean},as:{}},setup(t){const o=t;return(a,n)=>(b(),P(e(Gt),ht(vt(o)),{default:c(()=>[H(a.$slots,"default")]),_:3},16))}}),Ta=Kt("inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden",{variants:{size:{sm:"h-10 w-10 text-xs",base:"h-16 w-16 text-2xl",lg:"h-32 w-32 text-5xl"},shape:{circle:"rounded-full",square:"rounded-md"}}}),Ma=(t,o,a,n)=>{const s=w(0);return ne(()=>{var i;const r=w(t*(((i=a.value)==null?void 0:i.quantity)??1));if(o.value&&o.value.length>0){const d=n.value.find(p=>p.uuid===o.value);if(d){let p=r.value;if(d.handling_fee_fixed>0&&(p+=d.handling_fee_fixed),d.handling_fee_percent>0){let u=parseFloat((p*(d.handling_fee_percent/100)).toFixed(0));u>d.handling_fee_percent_max*100&&(u=d.handling_fee_percent_max*100),p+=u}r.value=p}}r.value!=s.value&&(s.value=r.value)}),{price:s}},Da=async(t,o,a,n)=>{const s=(i,d)=>new Promise((p,u)=>{const f=setInterval(()=>{xe.getOrderStatus(i).then(C=>{C.status!=0&&(clearInterval(f),clearInterval(v),p(C))}).catch(C=>{clearInterval(f),clearTimeout(v),u(C)})},4e3),v=setInterval(()=>{d-=1,d<=0&&(clearInterval(f),clearInterval(v),u({error:"支付超时，请重新尝试",code:-408}))},1e3)}),r=i=>{Jt.createOrderPayGateway(a,i).then(d=>{const p=d.expire_time-Math.floor(Date.now()/1e3);E.promise(()=>(setTimeout(()=>{let u=d.redirect;bt(u)||(u=`${window.location.origin}`+u,console.log(u)),window.open(u,"_blank")},2e3),s(i,p)),{loading:"等待支付中，请勿关闭页面......",success:u=>(ea().initWallet(),setTimeout(()=>{o.value=!1,n(),gt.push({name:"OrderUserPage"})},3e3),u.status==1?"支付成功":"支付取消"),error:u=>(o.value=!1,u.error),position:"top-center"})}).catch(d=>{o.value=!1,E.error(d.error)})};return o.value=!0,xe.createOrder(t).then(i=>{r(i.order_no)}).catch(i=>{o.value=!1,E.error(i.error)})},Ea={class:"max-w-screen-lg px-4 mx-auto 2xl:px-0"},La={key:0,class:"text-center"},ja={key:1,class:"lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16"},Aa={class:"shrink-0 max-w-md lg:max-w-lg mx-auto"},Ua=["src"],Fa={class:"mt-0"},Va={class:"text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"},Ha={class:"mt-4 sm:items-center sm:gap-4 sm:flex"},Ya={class:"line-through"},qa={class:"mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8"},Wa={class:"flex items-center gap-2"},Xa={class:"text-sm font-medium text-gray-900 dark:text-white"},Ga={class:"text-sm font-medium text-gray-900 dark:text-white"},Ka={key:0,class:"mt-4 sm:gap-4 sm:items-center sm:flex"},Za={class:"flex items-center grid grid-cols-2 gap-4"},Qa={class:"text-sm font-medium text-gray-900"},Ja={class:"text-sm font-medium text-gray-900 flex"},eo={class:"w-full my-4 grid grid-cols-2 gap-2 flex-wrap"},to={class:"mt-4 sm:gap-2 sm:items-center sm:flex sm:flex-wrap"},ao=["href"],oo={class:"mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8 grid grid-cols-2 gap-4"},no={class:"flex items-center grid grid-cols-2 gap-1 w-full md:w-1/2"},so={class:"flex items-center justify-end grid grid-cols-1 gap-2 w-full md:w-1/2"},lo=["innerHTML"],ro={class:"mt-8"},io={class:"md:flex md:flex-row"},co={class:"w-[calc(100%-10)] flex items-center space-x-1 flex-wrap"},uo=["innerHTML"],mo=I({__name:"DetailPage",props:{commodity:{}},setup(t){var y;const{loading:o,commodityDetailsignal:a,product:n,formData:s,validator:r}=ga(t.commodity.gd_no),{paymentSignal:i,payments:d}=va(),p=w(!1),u=w(""),{price:f}=Ma(((y=n.value)==null?void 0:y.retail_price)??t.commodity.retail_price,u,s,d),v=_=>{s.value.quantity=_},C=async()=>{var _;if(r(),((_=u.value)==null?void 0:_.length)===0){E.error("请选择支付方式"),g.value=!1;return}if(n.value&&n.value.other_ipu_cnf.some(m=>m.status)){E.error("请填写辅助信息"),g.value=!1;return}await Da(s.value,o,u.value,()=>{g.value=!1})},g=w(!1);return(_,m)=>{const M=Pe;return b(),P(e(Ra),{title:_.commodity.gd_name,open:p.value,"onUpdate:open":m[4]||(m[4]=N=>{p.value=N,i.value=N,a.value=N})},{default:c(()=>[l(e(Qt),{class:"h-full p-4"},{default:c(()=>[l(e(At),{loading:e(o)},{default:c(()=>{var N,U;return[h("div",Ea,[e(n)?(b(),O("div",ja,[h("div",Aa,[h("img",{src:e(n).picture_url,class:"h-full w-full object-cover object-center",onLoad:m[0]||(m[0]=()=>o.value=!1)},null,40,Ua)]),h("div",Fa,[h("h1",Va,B(e(n).gd_name),1),h("div",Ha,[l(e(ue),null,{default:c(()=>[l(e(ie),null,{default:c(()=>[l(e(ce),{class:"flex flex-row items-center"},{default:c(()=>[h("span",Ya,[(b(),P(q(e(W)(e(n).actual_price))))]),m[5]||(m[5]=$(" / ")),(b(),P(q(e(W)(e(n).retail_price))))]),_:1}),l(e(de),{class:"text-lg z-99999999"},{default:c(()=>[$(B(_.$t("shopping.discounted.original_cost")+e(n).actual_price.toLocaleString()+_.$t("console.wallet_card.unit"))+", "+B(_.$t("shopping.discounted.sell_price")+e(n).retail_price.toLocaleString()+_.$t("console.wallet_card.unit")),1)]),_:1})]),_:1})]),_:1})]),h("div",qa,[l(e(ue),null,{default:c(()=>[l(e(ie),null,{default:c(()=>[l(e(ce),{"as-child":""},{default:c(()=>[l(e(Oa),null,{default:c(()=>[l(e(Na),{src:"https://bing.ee123.net/img/rand",alt:"商家/作者"}),l(e(Ia),null,{default:c(()=>[$(B(e(n).connected_user_name),1)]),_:1})]),_:1})]),_:1}),l(e(de),{class:"text-lg z-99999999"},{default:c(()=>[m[6]||(m[6]=h("span",null,"商家/作者:",-1)),$(" "+B(e(n).connected_user_name),1)]),_:1})]),_:1})]),_:1}),h("div",Wa,[h("span",Xa,[m[7]||(m[7]=$(" 库存：")),l(e(fe),{max:999,value:e(n).in_stock,type:"info","show-zero":"",class:"text-gray-900!"},null,8,["value"])]),h("span",Ga,[m[8]||(m[8]=$(" 销量：")),l(e(fe),{max:999,value:e(n).sales_volume,type:"info","show-zero":"",class:"text-gray-900!"},null,8,["value"])])])]),l(e(le),{class:"mt-4 border-t-2 border-gray-200 dark:border-gray-700"}),e(n).wholesale_price_cnf.length>0&&e(n).buy_limit_num>1?(b(),O("div",Ka,[(b(!0),O(A,null,Y(e(n).wholesale_price_cnf,(x,L)=>(b(),O("div",{key:L},[h("div",Za,[h("div",Qa," 单次购买："+B(x.buy_number),1),h("div",Ja,[m[9]||(m[9]=$(" 价格： ")),(b(),P(q(e(W)(x.price))))])])]))),128))])):V("",!0),h("div",eo,[l(e(J),{for:"buy-amount",class:"col-span-2 sm:col-span-1 text-lg"},{default:c(()=>m[10]||(m[10]=[$(" 购买数量 ")])),_:1}),l(e(Ut),{min:1,max:e(n).buy_limit_num,"default-value":e(s).quantity,"model-value":e(s).quantity,"onUpdate:modelValue":v,class:"col-span-2 sm:col-span-1"},{default:c(()=>[l(e(Ft),null,{default:c(()=>[l(e(Vt)),l(e(Ht)),l(e(Yt))]),_:1})]),_:1},8,["max","default-value","model-value"]),(b(!0),O(A,null,Y(e(n).other_ipu_cnf,(x,L)=>(b(),O(A,{key:L},[l(e(J),{for:x.label,class:"col-span-2 sm:col-span-1 text-lg"},{default:c(()=>[$(B(x.label),1)]),_:2},1032,["for"]),l(e(Zt),{type:"text",placeholder:"请输入"+x.label,class:te(["col-span-2 sm:col-span-1",[x.status&&x.status.length>0?"border-red-500":""]]),modelValue:e(s).other_ipu[x.key],"onUpdate:modelValue":se=>e(s).other_ipu[x.key]=se},null,8,["placeholder","class","modelValue","onUpdate:modelValue"])],64))),128))]),l(e(le),{class:"mt-4 border-t-2 border-gray-200 dark:border-gray-700"}),h("div",to,[l(e(yt),{price:e(f),payments:e(d),payment:u.value,loading:e(o),isShowPrice:!0,"onUpdate:payment":m[1]||(m[1]=x=>{u.value!==x&&(u.value=x)}),"onUpdate:price":m[2]||(m[2]=x=>f.value=x)},{default:c(()=>[h("a",{href:e(qt),target:"_blank",class:"text-sm font-medium text-indigo-600 hover:text-indigo-500"},"支付说明",8,ao)]),_:1},8,["price","payments","payment","loading"])]),l(e(le),{class:"mt-4 border-t-2 border-gray-200 dark:border-gray-700"}),H(_.$slots,"default",{},()=>[h("div",oo,[h("div",no,[l(e(J),{for:"total-price"},{default:c(()=>m[11]||(m[11]=[$(" 总价 ")])),_:1}),l(e(xt),{money:e(f)},null,8,["money"])]),h("div",so,[l(e(zt),{open:g.value,"onUpdate:open":m[3]||(m[3]=x=>g.value=x)},{default:c(()=>[l(e(St),{"as-child":""},{default:c(()=>[l(e(me),null,{default:c(()=>m[12]||(m[12]=[$("购买")])),_:1})]),_:1}),l(e(Pt),{class:"z-99999999 w-full md:w-1/2 justify-end"},{default:c(()=>[l(e(Bt),null,{default:c(()=>{var x;return[l(e(Rt),null,{default:c(()=>[$(B(_.$t("shopping.confirm_buy.title")),1)]),_:1}),((x=e(n).buy_prompt)==null?void 0:x.length)>0?(b(),P(e(Ot),{key:0},{default:c(()=>[h("div",{innerHTML:e(n).buy_prompt},null,8,lo)]),_:1})):V("",!0)]}),_:1}),l(e(Nt),null,{default:c(()=>[l(e(It),{disabled:e(o)},{default:c(()=>[$(B(_.$t("common.cancel")),1)]),_:1},8,["disabled"]),l(e(me),{type:"primary",onClick:C,disabled:e(o)},{default:c(()=>[e(o)?(b(),P(e(ta),{key:0,class:te(e(Se)("w-4 h-4 mr-2 animate-spin"))},null,8,["class"])):V("",!0),$(" "+B(_.$t("common.confirm")),1)]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["open"])])])])])])):(b(),O("div",La,"暂无商品信息，如果这是错误，请联系管理员")),h("div",ro,[h("div",io,[l(e(J),{class:"w-20 text-lg font-semibold text-gray-900 dark:text-white"},{default:c(()=>m[13]||(m[13]=[$("商品描述")])),_:1}),h("div",co,[(b(!0),O(A,null,Y((N=e(n))==null?void 0:N.gd_keywords,(x,L)=>(b(),P(M,{key:L,size:"small",class:"rounded-full"},{default:c(()=>[$(B(x),1)]),_:2},1024))),128))])]),h("div",{innerHTML:(U=e(n))==null?void 0:U.gd_description,class:"mt-2"},null,8,uo)])])]}),_:3},8,["loading"])]),_:3})]),_:3},8,["title","open"])}}}),fo={class:"grid gap-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 xxl:grid-cols-6"},po={class:"my-2"},ho={key:0,class:"text-center"},vo={key:1,class:"text-center"},Ao=I({__name:"IndexPage",setup(t){const o=w({page:1,limit:4}),{loading:a,noMore:n,data:s}=ha(o),r=()=>{a.value||n.value||(o.value.page+=1)};return(i,d)=>(b(),P(e(pa),{distance:10,onLoad:r},{default:c(()=>[h("div",fo,[(b(!0),O(A,null,Y(e(s),p=>(b(),P(e(za),{key:p.gd_no,commodity:p},{footer:c(()=>[l(e(Ba),{commodity:p},{default:c(()=>[l(mo,{commodity:p},null,8,["commodity"])]),_:2},1032,["commodity"])]),_:2},1032,["commodity"]))),128))]),h("div",po,[e(a)?(b(),O("div",ho,"加载中...")):V("",!0),e(n)?(b(),O("div",vo,"没有更多了 🤪")):V("",!0)])]),_:1}))}});export{Ao as default};
