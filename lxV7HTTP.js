import{J as i}from"./assets/index-CbxeMZXM.js";function t(e){return i({url:`/api/use/redemption_code/${e}`,method:"POST"})}function n(e){return i({url:`/api/redemption_code/${e}/exists`})}function s(){return i({url:"/api/coin"})}function u(e,o){return i({url:`/api/coin/${e}`,params:o})}function c(e){return i({url:"/api/service/copilot/recharge",params:e})}function a(){return i({url:"/api/service/copilot"})}function p(){return i({url:"/api/service/copilot/switch",method:"POST"})}function l(e){return i({url:"/api/service/copilot/sessions",params:e})}export{s as a,c as b,p as c,l as d,u as e,a as g,n as q,t as u};