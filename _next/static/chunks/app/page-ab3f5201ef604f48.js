(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1931],{5838:function(e,r,t){Promise.resolve().then(t.bind(t,6117))},8693:function(e,r,t){"use strict";t.d(r,{Z:function(){return g}});var n=t(1119),i=t(4610),o=t(2265),s=t(1994),a=t(702),c=t(8720),u=t(5086),l=t(2720),f=t(7437);let d=["className","component"];var h=t(6063),m=t(8780),v=t(2166),Z=t(1194);let x=(0,m.Z)();var g=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{themeId:r,defaultTheme:t,defaultClassName:h="MuiBox-root",generateClassName:m}=e,v=(0,a.default)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(c.Z);return o.forwardRef(function(e,o){let a=(0,l.Z)(t),c=(0,u.Z)(e),{className:Z,component:x="div"}=c,g=(0,i.Z)(c,d);return(0,f.jsx)(v,(0,n.Z)({as:x,ref:o,className:(0,s.Z)(Z,m?m(h):h),theme:r&&a[r]||a},g))})}({themeId:v.Z,defaultTheme:x,defaultClassName:Z.Z.root,generateClassName:h.Z.generate})},1194:function(e,r,t){"use strict";let n=(0,t(4143).Z)("MuiBox",["root"]);r.Z=n},3053:function(e,r,t){"use strict";var n=t(5008),i=t(4610),o=t(1119),s=t(2265),a=t(1994),c=t(801),u=t(3146),l=t(5657),f=t(7053),d=t(6210),h=t(4964),m=t(7437);function v(){let e=(0,n._)(["\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n"]);return v=function(){return e},e}function Z(){let e=(0,n._)(["\n  0% {\n    stroke-dasharray: 1px, 200px;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -15px;\n  }\n\n  100% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -125px;\n  }\n"]);return Z=function(){return e},e}function x(){let e=(0,n._)(["\n      animation: "," 1.4s linear infinite;\n    "]);return x=function(){return e},e}function g(){let e=(0,n._)(["\n      animation: "," 1.4s ease-in-out infinite;\n    "]);return g=function(){return e},e}let p=["className","color","disableShrink","size","style","thickness","value","variant"],k=e=>e,P,C,b,y,S=(0,u.F4)(P||(P=k(v()))),j=(0,u.F4)(C||(C=k(Z()))),w=e=>{let{classes:r,variant:t,color:n,disableShrink:i}=e,o={root:["root",t,"color".concat((0,l.Z)(n))],svg:["svg"],circle:["circle","circle".concat((0,l.Z)(t)),i&&"circleDisableShrink"]};return(0,c.Z)(o,h.C,r)},M=(0,d.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{let{ownerState:t}=e;return[r.root,r[t.variant],r["color".concat((0,l.Z)(t.color))]]}})(e=>{let{ownerState:r,theme:t}=e;return(0,o.Z)({display:"inline-block"},"determinate"===r.variant&&{transition:t.transitions.create("transform")},"inherit"!==r.color&&{color:(t.vars||t).palette[r.color].main})},e=>{let{ownerState:r}=e;return"indeterminate"===r.variant&&(0,u.iv)(b||(b=k(x(),0)),S)}),N=(0,d.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),R=(0,d.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{let{ownerState:t}=e;return[r.circle,r["circle".concat((0,l.Z)(t.variant))],t.disableShrink&&r.circleDisableShrink]}})(e=>{let{ownerState:r,theme:t}=e;return(0,o.Z)({stroke:"currentColor"},"determinate"===r.variant&&{transition:t.transitions.create("stroke-dashoffset")},"indeterminate"===r.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})},e=>{let{ownerState:r}=e;return"indeterminate"===r.variant&&!r.disableShrink&&(0,u.iv)(y||(y=k(g(),0)),j)}),_=s.forwardRef(function(e,r){let t=(0,f.i)({props:e,name:"MuiCircularProgress"}),{className:n,color:s="primary",disableShrink:c=!1,size:u=40,style:l,thickness:d=3.6,value:h=0,variant:v="indeterminate"}=t,Z=(0,i.Z)(t,p),x=(0,o.Z)({},t,{color:s,disableShrink:c,size:u,thickness:d,value:h,variant:v}),g=w(x),k={},P={},C={};if("determinate"===v){let e=2*Math.PI*((44-d)/2);k.strokeDasharray=e.toFixed(3),C["aria-valuenow"]=Math.round(h),k.strokeDashoffset="".concat(((100-h)/100*e).toFixed(3),"px"),P.transform="rotate(-90deg)"}return(0,m.jsx)(M,(0,o.Z)({className:(0,a.Z)(g.root,n),style:(0,o.Z)({width:u,height:u},P,l),ownerState:x,ref:r,role:"progressbar"},C,Z,{children:(0,m.jsx)(N,{className:g.svg,ownerState:x,viewBox:"".concat(22," ").concat(22," ").concat(44," ").concat(44),children:(0,m.jsx)(R,{className:g.circle,style:k,ownerState:x,cx:44,cy:44,r:(44-d)/2,fill:"none",strokeWidth:d})})}))});r.Z=_},4964:function(e,r,t){"use strict";t.d(r,{C:function(){return o}});var n=t(4143),i=t(738);function o(e){return(0,i.ZP)("MuiCircularProgress",e)}let s=(0,n.Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);r.Z=s},2720:function(e,r,t){"use strict";var n=t(5680),i=t(2570);let o=(0,n.Z)();r.Z=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o;return(0,i.Z)(e)}},2570:function(e,r,t){"use strict";var n=t(2265),i=t(4692);r.Z=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,r=n.useContext(i.T);return r&&0!==Object.keys(r).length?r:e}},9376:function(e,r,t){"use strict";var n=t(5475);t.o(n,"usePathname")&&t.d(r,{usePathname:function(){return n.usePathname}}),t.o(n,"useRouter")&&t.d(r,{useRouter:function(){return n.useRouter}}),t.o(n,"useSearchParams")&&t.d(r,{useSearchParams:function(){return n.useSearchParams}}),t.o(n,"useServerInsertedHTML")&&t.d(r,{useServerInsertedHTML:function(){return n.useServerInsertedHTML}})},6117:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return u}});var n=t(7437),i=t(6255),o=t(6387),s=t(3053),a=t(9376),c=t(2265);function u(){let e=(0,a.useRouter)();return(0,c.useEffect)(()=>e.replace("/members/news"),[e]),(0,n.jsx)("main",{children:(0,n.jsxs)(i.CenteredBox,{children:[(0,n.jsx)(o.Z,{children:"Redirecting..."}),(0,n.jsx)(s.Z,{})]})})}},6255:function(e,r,t){"use strict";t.d(r,{CenteredBox:function(){return i}});var n=t(8693);let i=(0,t(6210).ZP)(n.Z)({display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",maxHeight:"400px"})},5008:function(e,r,t){"use strict";function n(e,r){return r||(r=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(r)}}))}t.d(r,{_:function(){return n}})}},function(e){e.O(0,[6387,2971,2117,1744],function(){return e(e.s=5838)}),_N_E=e.O()}]);