(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3185],{5780:function(e,n,a){"use strict";var l=a(8173),s=a(7437);n.Z=(0,l.Z)((0,s.jsx)("path",{d:"m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}),"ExpandLess")},1:function(e,n,a){"use strict";var l=a(8173),s=a(7437);n.Z=(0,l.Z)((0,s.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore")},3326:function(e,n,a){Promise.resolve().then(a.bind(a,3411)),Promise.resolve().then(a.t.bind(a,1120,23)),Promise.resolve().then(a.t.bind(a,9208,23)),Promise.resolve().then(a.t.bind(a,4543,23)),Promise.resolve().then(a.t.bind(a,9577,23)),Promise.resolve().then(a.t.bind(a,4767,23)),Promise.resolve().then(a.t.bind(a,2609,23)),Promise.resolve().then(a.t.bind(a,8013,23)),Promise.resolve().then(a.bind(a,1568)),Promise.resolve().then(a.bind(a,2845)),Promise.resolve().then(a.bind(a,7585))},1568:function(e,n,a){"use strict";a.r(n),a.d(n,{Footer:function(){return Footer}});var l=a(7437),s=a(1101),r=a(6507),t=a(5269);function Footer(){let e=(0,s.Z)();return(0,l.jsx)(r.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,l.jsx)(t.Z,{align:"center",variant:"caption",bgcolor:e.palette.primary.light,flexGrow:1,children:"版權所有 \xa9 2023 油蔴地天主教小學(海泓道)家長教師會"})})}},2845:function(e,n,a){"use strict";a.r(n),a.d(n,{Navbar:function(){return Navbar}});var l,s=a(7437),r=a(2265),t=a(1101),o=a(6507),i=a(851),c=a(6093),d=a(6776),h=a(5269),_=a(210),m=a(5152),f=a(4986),b=a(565),y=a(7682),p=a(2502),x=a(8212),u=a(4990),k=a(8173),v=(0,k.Z)((0,s.jsx)("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),"Menu"),j=(0,k.Z)((0,s.jsx)("path",{d:"M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),"ChevronLeft"),Z=a(5780),N=a(1),F=a(4033),P=a(3169);(l||(l={})).version="0.16.0";let S=[{key:"/members/",label:"會員通訊",href:"/members/",children:[{key:"/members/news/",label:"最新消息",href:"/members/news/"},{key:"/members/notices/",label:"通告",href:"/members/notices/"},{key:"/members/newsletters/",label:"會訊",href:"/members/newsletters/"},{key:"/members/welfare/",label:"福利",href:"/members/welfare/"}]},{key:"/pta/",label:"家教會",href:"/pta/",children:[{key:"/pta/words/",label:"我們心聲",href:"/pta/words/"},{key:"/pta/exco/",label:"委員名單",href:"/pta/exco/"},{key:"/pta/docs/",label:"文件",href:"/pta/docs/"},{key:"/pta/contact/",label:"聯絡",href:"/pta/contact/"}]},{key:"/helpers/",label:"家長義工地帶",href:"/helpers/",children:[{key:"/helpers/recruit/",label:"義工招募",href:"/helpers/recruit/"},{key:"/helpers/handbook/",label:"義工手冊",href:"/helpers/handbook/"},{key:"/helpers/code/",label:"守則",href:"/helpers/code/"}]},{key:"/events/",label:"活動",href:"/events/",children:[{key:"/events/calendar/",label:"年度活動",href:"/events/calendar/"},{key:"/events/albums/",label:"影集",href:"/events/albums/"}]}];function NavbarDrawer(e){let{navItems:n}=e,a=(0,F.useRouter)(),k=(0,t.Z)(),[S,g]=(0,r.useState)(!1),[w,C]=(0,r.useState)(""),handleMenuExpand=e=>()=>{C(e)},handleMenuCollapse=()=>{C("")},handleLinkRoute=e=>()=>{a.push(e),g(!1)},L=(0,F.usePathname)();return P.k.info(L,"pathname"),(0,s.jsxs)(o.Z,{sx:{display:"flex"},children:[(0,s.jsx)(i.Z,{position:"sticky",children:(0,s.jsxs)(c.Z,{variant:"dense",children:[(0,s.jsx)(d.Z,{onClick:()=>{g(!0)},children:(0,s.jsx)(v,{})}),(0,s.jsx)(h.Z,{variant:"h4",align:"center",sx:{flexGrow:1},children:"油蔴地天主教小學(海泓道)家長教師會"}),(0,s.jsx)(_.Z,{variant:"rounded",sx:{bgcolor:k.palette.primary.dark},onClick:handleLinkRoute("/"),children:"家"})]})}),(0,s.jsxs)(m.ZP,{sx:{flexShrink:0,display:"flex"},variant:"persistent",anchor:"left",open:S,PaperProps:{sx:{backgroundColor:k.palette.secondary.main,color:k.palette.secondary.contrastText}},children:[(0,s.jsx)(d.Z,{onClick:()=>{g(!1)},children:(0,s.jsx)(j,{})}),(0,s.jsx)(f.Z,{}),(0,s.jsx)(b.Z,{dense:!0,children:n.map(e=>(0,s.jsxs)(r.Fragment,{children:[(0,s.jsx)(y.ZP,{disablePadding:!0,sx:{backgroundColor:L.endsWith(e.href)?k.palette.primary.main:void 0},children:(0,s.jsxs)(p.Z,{onClick:e.children.length>0?w===e.key?handleMenuCollapse:handleMenuExpand(e.key):handleLinkRoute(e.href),children:[(0,s.jsx)(x.Z,{primary:e.label}),0!==e.children.length&&(w===e.key?(0,s.jsx)(Z.Z,{}):(0,s.jsx)(N.Z,{}))]},e.key)}),0!==e.children.length&&(0,s.jsx)(u.Z,{in:w===e.key,timeout:"auto",unmountOnExit:!0,children:(0,s.jsx)(b.Z,{dense:!0,disablePadding:!0,children:e.children.map(e=>(0,s.jsx)(y.ZP,{disablePadding:!0,sx:{backgroundColor:L.endsWith(e.href)?k.palette.primary.main:void 0},children:(0,s.jsx)(p.Z,{sx:{pl:4},onClick:handleLinkRoute(e.href),children:(0,s.jsx)(x.Z,{primary:e.label})})},e.key))})},"collapse-".concat(e.key))]},e.key))}),(0,s.jsx)(o.Z,{sx:{flexGrow:1}}),(0,s.jsxs)(b.Z,{dense:!0,children:[(0,s.jsx)(f.Z,{}),(0,s.jsx)(y.ZP,{children:(0,s.jsxs)(x.Z,{children:["網站版本: ",l.version]})})]})]})]})}function Navbar(){return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(NavbarDrawer,{navItems:S})})}},7585:function(e,n,a){"use strict";a.r(n),a.d(n,{Providers:function(){return Providers}});var l=a(7437),s=a(342),r=a(6778),t=a(4360),o=a(6398),i=a(1120),c=a.n(i),d=a(9208),h=a.n(d),_=a(4543),m=a.n(_),f=a(9577),b=a.n(f),y=a(4767),p=a.n(y),x=a(2609),u=a.n(x),k=a(8013),v=a.n(k);let j=[m(),p(),u(),v(),c()],Z=[b(),h()];function createFontFamily(e,n){return[...e,...n].map(e=>e.style.fontFamily).join(",")}let N=(0,s.Z)((0,r.Z)({palette:{primary:{main:t.Z[600]},secondary:{main:o.Z[600]}},typography:{allVariants:{fontFamily:createFontFamily(j,Z)}}}));var F=a(3857),P=a(8508);function Providers(e){let{children:n}=e;return(0,l.jsxs)(P.Z,{theme:N,children:[(0,l.jsx)(F.ZP,{}),n]})}},3169:function(e,n,a){"use strict";a.d(n,{k:function(){return t}});var l=a(440),s=a.n(l),r=a(5566);let t=s()({nestedKey:"payload",level:r.env.NEXT_LOGGER_LEVEL||"info",browser:{asObject:!0}});t.info("[Pino] Logger version is ".concat(t.version)),t.info("[Pino] Logger level is ".concat(t.level))},4543:function(e){e.exports={style:{fontFamily:"'__Noto_Sans_Display_fe9a7f', '__Noto_Sans_Display_Fallback_fe9a7f'",fontStyle:"normal"},className:"__className_fe9a7f"}},4767:function(e){e.exports={style:{fontFamily:"'__Noto_Sans_HK_bd84f1', '__Noto_Sans_HK_Fallback_bd84f1'",fontStyle:"normal"},className:"__className_bd84f1"}},9577:function(e){e.exports={style:{fontFamily:"'__Noto_Sans_Mono_b30432', '__Noto_Sans_Mono_Fallback_b30432'",fontStyle:"normal"},className:"__className_b30432"}},2609:function(e){e.exports={style:{fontFamily:"'__Noto_Sans_Symbols_c1d050', '__Noto_Sans_Symbols_Fallback_c1d050'",fontStyle:"normal"},className:"__className_c1d050"}},8013:function(e){e.exports={style:{fontFamily:"'__Noto_Sans_Symbols_2_234cee', '__Noto_Sans_Symbols_2_Fallback_234cee'",fontWeight:400,fontStyle:"normal"},className:"__className_234cee"}},1120:function(e){e.exports={style:{fontFamily:"'__Roboto_Flex_568df3', '__Roboto_Flex_Fallback_568df3'",fontStyle:"normal"},className:"__className_568df3"}},9208:function(e){e.exports={style:{fontFamily:"'__Roboto_Mono_a2a516', '__Roboto_Mono_Fallback_a2a516'",fontStyle:"normal"},className:"__className_a2a516"}},4033:function(e,n,a){e.exports=a(94)}},function(e){e.O(0,[396,9713,3411,151,2971,2472,1744],function(){return e(e.s=3326)}),_N_E=e.O()}]);