(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6487,4967,2163,6516,7828,930,8381,8498,4550,1581,801,3591,7243,2447,7937,9626,836,3502,7195,7718,7214,7923,6740,1699,3750,9773,2394,9347,2485,3929],{24654:function(){},7458:function(e,t,r){Promise.resolve().then(r.bind(r,50423)),Promise.resolve().then(r.t.bind(r,69050,23)),Promise.resolve().then(r.bind(r,90069)),Promise.resolve().then(r.bind(r,22090))},95345:function(e,t,r){"use strict";r.d(t,{k:function(){return i}});var s=r(90440),n=r.n(s),a=r(25566);let i=n()({nestedKey:"payload",level:a.env.NEXT_LOGGER_LEVEL||"info",browser:{asObject:!0}});i.info("[Pino] Logger version is ".concat(i.version)),i.info("[Pino] Logger level is ".concat(i.level))},91404:function(e,t,r){"use strict";r.r(t),r.d(t,{CenteredBox:function(){return a}});var s=r(39227),n=r(35843);let a=(0,n.ZP)(s.Z)({display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",maxHeight:"400px"})},90069:function(e,t,r){"use strict";r.r(t),r.d(t,{Header:function(){return i}});var s=r(57437),n=r(39227),a=r(43226);function i(){return(0,s.jsx)(n.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,s.jsx)(a.Z,{align:"center",variant:"h4",children:"油蔴地天主教小學(海泓道)家長教師會"})})}},22090:function(e,t,r){"use strict";r.r(t),r.d(t,{Posts:function(){return B}});var s,n,a,i,o=r(57437);r(48160);var c=r(95345),d=r(82498),l=r.n(d),h=r(74548),g=r.n(h),u=r(6537),p=r.n(u),E=r(82399),f=r.n(E),y=r(35140),x=r.n(y);g().extend(p()),g().extend(f()),g().extend(x());var _=g();(s=i||(i={})).djsAnniversarySince=_("2022-09-01"),(n=s.TAG_SLUGS||(s.TAG_SLUGS={})).PTA_ALL_TIME="pta-all-time",n.PTA_2022_TO_2024="pta-2022-2024",(a=s.CATEGORY_SLUGS||(s.CATEGORY_SLUGS={})).MEMBERS_NEWS="members-news",a.MEMBERS_NOTICES="members-notices",a.MEMBERS_NEWSLETTERS="members-newsletters",a.MEMBERS_WELFARE="members-welfare",a.PTA_WORDS="pta-words",a.PTA_EXCO="pta-exco",a.PTA_DOCS="pta-docs",a.PTA_CONTACT="pta-contact",a.HELPERS_RECRUIT="helpers-recruit",a.HELPERS_HANDBOOK="helpers-handbook",a.HELPERS_CODE="helpers-code",a.EVENTS_CALENDAR="events-calendar",a.EVENTS_ALBUMS="events-albums";class w{static create(e){return new w(e)}async loadCategories(){try{let e=await this.wp.categories();e.forEach(e=>{this.categoryIdMap.set(e.slug,e)}),this.categoriesLoaded=!0}catch(e){throw c.k.error(e,"Error loading categories"),e}}async loadTags(){try{let e=await this.wp.tags();e.forEach(e=>{this.tagIdMap.set(e.slug,e)}),this.tagsLoaded=!0}catch(e){throw c.k.error(e,"Error loading tags"),e}}async getCategoryId(e){this.categoriesLoaded||await this.loadCategories();let t=this.categoryIdMap.get(e);if(!t)try{let t=await this.wp.categories().slug(e),r=t[0];this.categoryIdMap.set(r.slug,r)}catch(r){let t="Error fetching category: ".concat(e);throw c.k.error(t),Error(t)}if(t=this.categoryIdMap.get(e))return t.id}async getTagId(e){this.tagsLoaded||await this.loadTags();let t=this.tagIdMap.get(e);if(!t)try{let t=await this.wp.tags().slug(e),r=t[0];this.tagIdMap.set(r.slug,r)}catch(r){let t="Error fetching tag: ".concat(e);throw c.k.error(t),Error(t)}if(t=this.tagIdMap.get(e))return t.id}async loadPublishedPosts(e){let{categorySlug:t,tagSlug:r,maxPosts:s=100,stickyFirst:n=!0}=e,[a,o]=await Promise.all([this.getCategoryId(t),this.getTagId(r)]);if(void 0===a||void 0===o)throw c.k.error({categorySlug:t,catId:a,tagSlug:r,tagId:o},"undefined category or tag"),Error("undefined category or tag");let d=await this.wp.posts().perPage(s).orderby("date").order("desc").categories(a).tags(o).after(i.djsAnniversarySince.toISOString()).status("publish").get();c.k.info("fetched ".concat(d.length," posts"));let l=this.mapWpPosts(d);if(n){let e=l.filter(e=>e.sticky),t=l.filter(e=>!e.sticky);return[...e,...t]}return l}mapWpPosts(e){return e.map(e=>T(e))}constructor(e){this.categoryIdMap=new Map,this.tagIdMap=new Map,this.categoriesLoaded=!1,this.tagsLoaded=!1,this.wp=e}}let S=w.create(new(l())({endpoint:"https://pta.ycps.edu.hk/wp-json"})),T=e=>({postId:e.id,date:_(e.date),guid:e.guid.rendered,title:e.title.rendered,content:e.content.rendered,excerpt:e.excerpt.rendered,sticky:e.sticky});var v=r(2265),C=r(43226),j=r(49050),P=r(6882),L=r(98075),m=r(74404),R=r(29872),O=r(48727),k=r(81344),A=r(20001);r(90069);var M=r(28179),I=r(81130),b=r(91331);let Z=e=>{let{children:t}=e;return(0,o.jsx)(M.D,{remarkPlugins:[I.Z],rehypePlugins:[b.Z],children:t})};var D=r(91404);let N={error:null,loading:!0,posts:[]},G=(e,t)=>{switch(t.type){case"ERROR_CAUGHT":return{...e,error:t.payload,posts:[]};case"POSTS_FETCHED":return{...e,posts:t.payload,loading:!1};case"LOADING_COMPLETED":return{...e,loading:!1};case"RELOAD_REQUESTED":return{...e,error:null,loading:!0,posts:[]};default:return e}};function B(e){let{categorySlug:t,tagSlug:r,showDate:s=!1,maxPosts:n=100,collapseAfter:a=5,stickyFirst:i}=e,[d,l]=(0,v.useReducer)(G,N),{error:h,loading:g,posts:u}=d,p=(0,v.useCallback)(async()=>{try{let e=await S.loadPublishedPosts({categorySlug:t,tagSlug:r,maxPosts:n,stickyFirst:i});l({type:"POSTS_FETCHED",payload:e})}catch(e){c.k.error(e,"error fetching posts"),l({type:"ERROR_CAUGHT",payload:e})}finally{l({type:"LOADING_COMPLETED"})}},[t,r,n]);(0,v.useEffect)(()=>{p()},[p]);let E=async()=>{l({type:"RELOAD_REQUESTED"}),await p()};return h?(0,o.jsx)("section",{children:(0,o.jsxs)(D.CenteredBox,{children:[(0,o.jsx)(C.Z,{variant:"h5",gutterBottom:!0,color:"error",children:"Error loading data"}),(0,o.jsx)(j.Z,{variant:"contained",onClick:E,children:"Reload"})]})}):g?(0,o.jsx)("section",{children:(0,o.jsx)(D.CenteredBox,{children:(0,o.jsx)(P.Z,{})})}):0===u.length?(0,o.jsx)("section",{children:(0,o.jsx)(D.CenteredBox,{children:(0,o.jsx)(C.Z,{children:"Coming soon. Stay tuned."})})}):(0,o.jsx)("section",{children:(0,o.jsx)(L.Z,{divider:(0,o.jsx)(m.Z,{flexItem:!0}),children:u.map((e,t)=>(0,o.jsx)(H,{showDate:s,post:e,defaultCollapsed:void 0!==a&&!(a<0)&&t>=a},e.guid))})})}function H(e){let{post:t,showDate:r,defaultCollapsed:s=!0}=e,[n,a]=(0,v.useState)(!!s),i=(0,v.useCallback)(()=>{a(e=>!e)},[]);return(0,o.jsxs)(R.Z,{component:"article",sx:{padding:1},elevation:4,children:[(0,o.jsxs)(L.Z,{onClick:i,children:[(0,o.jsxs)(L.Z,{direction:"row",children:[n?(0,o.jsx)(k.Z,{}):(0,o.jsx)(O.Z,{}),(0,o.jsx)(C.Z,{variant:"h6",children:t.title}),t.sticky&&(0,o.jsx)(A.Z,{fontSize:"small"})]}),r&&(0,o.jsx)(C.Z,{variant:"caption",children:t.date.fromNow()})]}),!n&&(0,o.jsx)(Z,{children:t.content})]})}},48160:function(){}},function(e){e.O(0,[3094,8785,4447,151,4458,7731,9970,2971,7864,1744],function(){return e(e.s=7458)}),_N_E=e.O()}]);