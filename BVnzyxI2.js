import{Q as i}from"./assets/index-B6Sr_t6A.js";function t(e){return i({url:`/api/use/redemption_code/${e}`,method:"POST"})}function n(){return i({url:"/api/coin"})}function c(e,o){return i({url:`/api/coin/${e}`,data:o})}function s(e){return i({url:"/api/service/copilot/recharge",data:e})}function u(){return i({url:"/api/service/copilot"})}function a(){return i({url:"/api/service/copilot/switch",method:"POST"})}function p(e){return i({url:"/api/service/copilot/sessions",data:e})}export{n as a,s as b,a as c,p as d,c as e,u as g,t as u};
