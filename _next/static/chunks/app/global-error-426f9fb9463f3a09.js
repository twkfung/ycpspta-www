(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[470],{66653:function(e,r,t){Promise.resolve().then(t.bind(t,7e3))},7e3:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return o}});var n=t(9268),i=t(86006),s=t(57653);function o(e){let{error:r,reset:t}=e;return(0,i.useEffect)(()=>{s.k.error(r,"Error reported in app global")},[r]),(0,n.jsxs)("html",{children:[(0,n.jsx)("body",{children:(0,n.jsx)("h2",{children:"Something went wrong!"})}),(0,n.jsx)("button",{onClick:()=>t(),children:"Try again"})]})}},57653:function(e,r,t){"use strict";t.d(r,{k:function(){return o}});var n=t(60554),i=t.n(n),s=t(28611);let o=i()({nestedKey:"payload",level:s.env.NEXT_LOGGER_LEVEL||"info",browser:{asObject:!0}});o.info("[Pino] Logger version is ".concat(o.version)),o.info("[Pino] Logger level is ".concat(o.level))},83177:function(e,r,t){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=t(86006),i=Symbol.for("react.element"),s=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,l=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function c(e,r,t){var n,s={},c=null,u=null;for(n in void 0!==t&&(c=""+t),void 0!==r.key&&(c=""+r.key),void 0!==r.ref&&(u=r.ref),r)o.call(r,n)&&!a.hasOwnProperty(n)&&(s[n]=r[n]);if(e&&e.defaultProps)for(n in r=e.defaultProps)void 0===s[n]&&(s[n]=r[n]);return{$$typeof:i,type:e,key:c,ref:u,props:s,_owner:l.current}}r.Fragment=s,r.jsx=c,r.jsxs=c},9268:function(e,r,t){"use strict";e.exports=t(83177)},28611:function(e){var r,t,n,i=e.exports={};function s(){throw Error("setTimeout has not been defined")}function o(){throw Error("clearTimeout has not been defined")}function l(e){if(r===setTimeout)return setTimeout(e,0);if((r===s||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:s}catch(e){r=s}try{t="function"==typeof clearTimeout?clearTimeout:o}catch(e){t=o}}();var a=[],c=!1,u=-1;function f(){c&&n&&(c=!1,n.length?a=n.concat(a):u=-1,a.length&&h())}function h(){if(!c){var e=l(f);c=!0;for(var r=a.length;r;){for(n=a,a=[];++u<r;)n&&n[u].run();u=-1,r=a.length}n=null,c=!1,function(e){if(t===clearTimeout)return clearTimeout(e);if((t===o||!t)&&clearTimeout)return t=clearTimeout,clearTimeout(e);try{t(e)}catch(r){try{return t.call(null,e)}catch(r){return t.call(this,e)}}}(e)}}function v(e,r){this.fun=e,this.array=r}function d(){}i.nextTick=function(e){var r=Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)r[t-1]=arguments[t];a.push(new v(e,r)),1!==a.length||c||l(h)},v.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=d,i.addListener=d,i.once=d,i.off=d,i.removeListener=d,i.removeAllListeners=d,i.emit=d,i.prependListener=d,i.prependOnceListener=d,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}},66252:function(e){"use strict";function r(e){try{return JSON.stringify(e)}catch(e){return'"[Circular]"'}}e.exports=function(e,t,n){var i=n&&n.stringify||r;if("object"==typeof e&&null!==e){var s=t.length+1;if(1===s)return e;var o=Array(s);o[0]=i(e);for(var l=1;l<s;l++)o[l]=i(t[l]);return o.join(" ")}if("string"!=typeof e)return e;var a=t.length;if(0===a)return e;for(var c="",u=0,f=-1,h=e&&e.length||0,v=0;v<h;){if(37===e.charCodeAt(v)&&v+1<h){switch(f=f>-1?f:0,e.charCodeAt(v+1)){case 100:case 102:if(u>=a||null==t[u])break;f<v&&(c+=e.slice(f,v)),c+=Number(t[u]),f=v+2,v++;break;case 105:if(u>=a||null==t[u])break;f<v&&(c+=e.slice(f,v)),c+=Math.floor(Number(t[u])),f=v+2,v++;break;case 79:case 111:case 106:if(u>=a||void 0===t[u])break;f<v&&(c+=e.slice(f,v));var d=typeof t[u];if("string"===d){c+="'"+t[u]+"'",f=v+2,v++;break}if("function"===d){c+=t[u].name||"<anonymous>",f=v+2,v++;break}c+=i(t[u]),f=v+2,v++;break;case 115:if(u>=a)break;f<v&&(c+=e.slice(f,v)),c+=String(t[u]),f=v+2,v++;break;case 37:f<v&&(c+=e.slice(f,v)),c+="%",f=v+2,v++,u--}++u}++v}return -1===f?e:(f<h&&(c+=e.slice(f)),c)}},60554:function(e,r,t){"use strict";let n=t(66252);e.exports=s;let i=function(){function e(e){return void 0!==e&&e}try{if("undefined"!=typeof globalThis)return globalThis;return Object.defineProperty(Object.prototype,"globalThis",{get:function(){return delete Object.prototype.globalThis,this.globalThis=this},configurable:!0}),globalThis}catch(r){return e(self)||e(window)||e(this)||{}}}().console||{};function s(e){var r;(e=e||{}).browser=e.browser||{};let t=e.browser.transmit;if(t&&"function"!=typeof t.send)throw Error("pino: transmit option must have a send function");let n=e.browser.write||i;e.browser.write&&(e.browser.asObject=!0);let u=e.serializers||{},f=function(e,r){if(Array.isArray(e)){let r=e.filter(function(e){return"!stdSerializers.err"!==e});return r}return!0===e&&Object.keys(r)}(e.browser.serialize,u),h=e.browser.serialize;Array.isArray(e.browser.serialize)&&e.browser.serialize.indexOf("!stdSerializers.err")>-1&&(h=!1);let g=Object.keys(e.customLevels||{}),p=["error","fatal","warn","info","debug","trace"].concat(g);"function"==typeof n&&p.forEach(function(e){n[e]=n}),(!1===e.enabled||e.browser.disabled)&&(e.level="silent");let m=e.level||"info",y=Object.create(n);y.log||(y.log=v),Object.defineProperty(y,"levelVal",{get:function(){return"silent"===this.level?1/0:this.levels.values[this.level]}}),Object.defineProperty(y,"level",{get:function(){return this._level},set:function(e){if("silent"!==e&&!this.levels.values[e])throw Error("unknown level "+e);this._level=e,o(w,y,"error","log"),o(w,y,"fatal","error"),o(w,y,"warn","error"),o(w,y,"info","log"),o(w,y,"debug","log"),o(w,y,"trace","log"),g.forEach(function(e){o(w,y,e,"log")})}});let w={transmit:t,serialize:f,asObject:e.browser.asObject,levels:p,timestamp:"function"==typeof(r=e).timestamp?r.timestamp:!1===r.timestamp?d:b};return y.levels=function(e){let r=e.customLevels||{},t=Object.assign({},s.levels.values,r),n=Object.assign({},s.levels.labels,function(e){let r={};return Object.keys(e).forEach(function(t){r[e[t]]=t}),r}(r));return{values:t,labels:n}}(e),y.level=m,y.setMaxListeners=y.getMaxListeners=y.emit=y.addListener=y.on=y.prependListener=y.once=y.prependOnceListener=y.removeListener=y.removeAllListeners=y.listeners=y.listenerCount=y.eventNames=y.write=y.flush=v,y.serializers=u,y._serialize=f,y._stdErrSerialize=h,y.child=function(r,n){if(!r)throw Error("missing bindings for child Pino");n=n||{},f&&r.serializers&&(n.serializers=r.serializers);let i=n.serializers;if(f&&i){var s=Object.assign({},u,i),o=!0===e.browser.serialize?Object.keys(s):f;delete r.serializers,l([r],o,s,this._stdErrSerialize)}function h(e){this._childLevel=(0|e._childLevel)+1,this.error=a(e,r,"error"),this.fatal=a(e,r,"fatal"),this.warn=a(e,r,"warn"),this.info=a(e,r,"info"),this.debug=a(e,r,"debug"),this.trace=a(e,r,"trace"),s&&(this.serializers=s,this._serialize=o),t&&(this._logEvent=c([].concat(e._logEvent.bindings,r)))}return h.prototype=this,new h(this)},t&&(y._logEvent=c()),y}function o(e,r,t,s){let o=Object.getPrototypeOf(r);r[t]=r.levelVal>r.levels.values[t]?v:o[t]?o[t]:i[t]||i[s]||v,function(e,r,t){if(e.transmit||r[t]!==v){var s;r[t]=(s=r[t],function(){let o=e.timestamp(),a=Array(arguments.length),u=Object.getPrototypeOf&&Object.getPrototypeOf(this)===i?i:this;for(var f=0;f<a.length;f++)a[f]=arguments[f];if(e.serialize&&!e.asObject&&l(a,this._serialize,this.serializers,this._stdErrSerialize),e.asObject?s.call(u,function(e,r,t,i){e._serialize&&l(t,e._serialize,e.serializers,e._stdErrSerialize);let s=t.slice(),o=s[0],a={};i&&(a.time=i),a.level=e.levels.values[r];let c=(0|e._childLevel)+1;if(c<1&&(c=1),null!==o&&"object"==typeof o){for(;c--&&"object"==typeof s[0];)Object.assign(a,s.shift());o=s.length?n(s.shift(),s):void 0}else"string"==typeof o&&(o=n(s.shift(),s));return void 0!==o&&(a.msg=o),a}(this,t,a,o)):s.apply(u,a),e.transmit){let n=e.transmit.level||r.level,i=r.levels.values[n],s=r.levels.values[t];if(s<i)return;(function(e,r,t){let n=r.send,i=r.ts,s=r.methodLevel,o=r.methodValue,a=r.val,u=e._logEvent.bindings;l(t,e._serialize||Object.keys(e.serializers),e.serializers,void 0===e._stdErrSerialize||e._stdErrSerialize),e._logEvent.ts=i,e._logEvent.messages=t.filter(function(e){return -1===u.indexOf(e)}),e._logEvent.level.label=s,e._logEvent.level.value=o,n(s,e._logEvent,a),e._logEvent=c(u)})(this,{ts:o,methodLevel:t,methodValue:s,transmitLevel:n,transmitValue:r.levels.values[e.transmit.level||r.level],send:e.transmit.send,val:r.levelVal},a)}})}}(e,r,t)}function l(e,r,t,n){for(let i in e)if(n&&e[i]instanceof Error)e[i]=s.stdSerializers.err(e[i]);else if("object"==typeof e[i]&&!Array.isArray(e[i]))for(let n in e[i])r&&r.indexOf(n)>-1&&n in t&&(e[i][n]=t[n](e[i][n]))}function a(e,r,t){return function(){let n=Array(1+arguments.length);n[0]=r;for(var i=1;i<n.length;i++)n[i]=arguments[i-1];return e[t].apply(this,n)}}function c(e){return{ts:0,messages:[],bindings:e||[],level:{label:"",value:0}}}function u(e){let r={type:e.constructor.name,msg:e.message,stack:e.stack};for(let t in e)void 0===r[t]&&(r[t]=e[t]);return r}function f(){return{}}function h(e){return e}function v(){}function d(){return!1}function b(){return Date.now()}s.levels={values:{fatal:60,error:50,warn:40,info:30,debug:20,trace:10},labels:{10:"trace",20:"debug",30:"info",40:"warn",50:"error",60:"fatal"}},s.stdSerializers={mapHttpRequest:f,mapHttpResponse:f,wrapRequestSerializer:h,wrapResponseSerializer:h,wrapErrorSerializer:h,req:f,res:f,err:u,errWithCause:u},s.stdTimeFunctions=Object.assign({},{nullTime:d,epochTime:b,unixTime:function(){return Math.round(Date.now()/1e3)},isoTime:function(){return new Date(Date.now()).toISOString()}})}},function(e){e.O(0,[253,698,744],function(){return e(e.s=66653)}),_N_E=e.O()}]);