(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7923,4967,2163,6516,7828,930,8381,8498,801,3591,6487,7243,7023,9929,2447,7937,9626,836,3502,7195,3750,9773,2485,3929,2394,9347],{24654:function(){},7458:function(e,t,r){Promise.resolve().then(r.bind(r,50423)),Promise.resolve().then(r.t.bind(r,69050,23)),Promise.resolve().then(r.bind(r,90069)),Promise.resolve().then(r.bind(r,22090))},95345:function(e,t,r){"use strict";r.d(t,{k:function(){return i}});var n=r(90440),s=r.n(n),a=r(25566);let i=s()({nestedKey:"payload",level:a.env.NEXT_LOGGER_LEVEL||"info",browser:{asObject:!0}});i.info("[Pino] Logger version is ".concat(i.version)),i.info("[Pino] Logger level is ".concat(i.level))},91404:function(e,t,r){"use strict";r.r(t),r.d(t,{CenteredBox:function(){return a}});var n=r(39227),s=r(35843);let a=(0,s.ZP)(n.Z)({display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",maxHeight:"400px"})},90069:function(e,t,r){"use strict";r.r(t),r.d(t,{Header:function(){return i}});var n=r(57437),s=r(39227),a=r(43226);function i(){return(0,n.jsx)(s.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,n.jsx)(a.Z,{align:"center",variant:"h4",children:"油蔴地天主教小學(海泓道)家長教師會"})})}},22090:function(e,t,r){"use strict";r.r(t),r.d(t,{Posts:function(){return R}});var n,s,a,i,o=r(57437);r(48160);var c=r(95345),d=r(82498),l=r.n(d),h=r(74548),g=r.n(h),u=r(6537),p=r.n(u),f=r(82399),E=r.n(f),x=r(35140),y=r.n(x);g().extend(p()),g().extend(E()),g().extend(y());var v=g();(n=i||(i={})).djsAnniversarySince=v("2022-09-01"),(s=n.TAG_SLUGS||(n.TAG_SLUGS={})).PTA_ALL_TIME="pta-all-time",s.PTA_2022_TO_2024="pta-2022-2024",(a=n.CATEGORY_SLUGS||(n.CATEGORY_SLUGS={})).MEMBERS_NEWS="members-news",a.MEMBERS_NOTICES="members-notices",a.MEMBERS_NEWSLETTERS="members-newsletters",a.PTA_WORDS="pta-words",a.PTA_EXCO="pta-exco",a.PTA_DOCS="pta-docs",a.HELPERS_RECRUIT="helpers-recruit",a.HELPERS_HANDBOOK="helpers-handbook",a.HELPERS_TIPS="helpers-tips",a.EVENTS_CALENDAR="events-calendar",a.EVENTS_ALBUMS="events-albums";class w{static create(e){return new w(e)}async loadCategories(){try{let e=await this.wp.categories();e.forEach(e=>{this.categoryIdMap.set(e.slug,e)}),this.categoriesLoaded=!0}catch(e){throw c.k.error(e,"Error loading categories"),e}}async loadTags(){try{let e=await this.wp.tags();e.forEach(e=>{this.tagIdMap.set(e.slug,e)}),this.tagsLoaded=!0}catch(e){throw c.k.error(e,"Error loading tags"),e}}async getCategoryId(e){this.categoriesLoaded||await this.loadCategories();let t=this.categoryIdMap.get(e);if(!t)try{let t=await this.wp.categories().slug(e),r=t[0];this.categoryIdMap.set(r.slug,r)}catch(r){let t="Error fetching category: ".concat(e);throw c.k.error(t),Error(t)}if(t=this.categoryIdMap.get(e))return t.id}async getTagId(e){this.tagsLoaded||await this.loadTags();let t=this.tagIdMap.get(e);if(!t)try{let t=await this.wp.tags().slug(e),r=t[0];this.tagIdMap.set(r.slug,r)}catch(r){let t="Error fetching tag: ".concat(e);throw c.k.error(t),Error(t)}if(t=this.tagIdMap.get(e))return t.id}async loadPublishedPosts(e){let{categorySlug:t,tagSlug:r}=e,[n,s]=await Promise.all([this.getCategoryId(t),this.getTagId(r)]);if(void 0===n||void 0===s)throw c.k.error({categorySlug:t,catId:n,tagSlug:r,tagId:s},"undefined category or tag"),Error("undefined category or tag");let a=await this.wp.posts().perPage(100).orderby("date").order("desc").categories(n).tags(s).after(i.djsAnniversarySince.toISOString()).status("publish").get();c.k.info("fetched ".concat(a.length," posts"));let o=this.mapWpPosts(a);return o}mapWpPosts(e){return e.map(e=>_(e))}constructor(e){this.categoryIdMap=new Map,this.tagIdMap=new Map,this.categoriesLoaded=!1,this.tagsLoaded=!1,this.wp=e}}let S=w.create(new(l())({endpoint:"https://pta.ycps.edu.hk/wp-json"})),_=e=>({postId:e.id,date:v(e.date),guid:e.guid.rendered,title:e.title.rendered,content:e.content.rendered,excerpt:e.excerpt.rendered});var j=r(2265),P=r(43226),m=r(49050),L=r(6882),T=r(98075),C=r(74404),I=r(29872);r(90069);var M=r(28179),b=r(81130),k=r(91331);let A=e=>{let{children:t}=e;return(0,o.jsx)(M.D,{remarkPlugins:[b.Z],rehypePlugins:[k.Z],children:t})};var Z=r(91404);function R(e){let{categorySlug:t,tagSlug:r,showDate:n=!1}=e,[s,a]=(0,j.useState)(null),[i,d]=(0,j.useState)(!0),[l,h]=(0,j.useState)([]),g=(0,j.useCallback)(async()=>{try{let e=await S.loadPublishedPosts({categorySlug:t,tagSlug:r});h(e)}catch(e){c.k.error(e,"error fetching posts"),a(e),h([])}finally{d(!1)}},[t,r]);(0,j.useEffect)(()=>{g()},[g]);let u=async()=>{a(null),d(!0),h([]),await g()};return s?(0,o.jsx)("section",{children:(0,o.jsxs)(Z.CenteredBox,{children:[(0,o.jsx)(P.Z,{variant:"h5",gutterBottom:!0,color:"error",children:"Error loading data"}),(0,o.jsx)(m.Z,{variant:"contained",onClick:u,children:"Reload"})]})}):i?(0,o.jsx)("section",{children:(0,o.jsx)(Z.CenteredBox,{children:(0,o.jsx)(L.Z,{})})}):0==l.length?(0,o.jsx)("section",{children:(0,o.jsx)(Z.CenteredBox,{children:(0,o.jsx)(P.Z,{children:"Coming soon. Stay tuned."})})}):(0,o.jsx)("section",{children:(0,o.jsx)(T.Z,{divider:(0,o.jsx)(C.Z,{flexItem:!0}),children:l.map(e=>(0,o.jsxs)(I.Z,{component:"article",sx:{padding:1},elevation:4,children:[(0,o.jsxs)(T.Z,{children:[(0,o.jsx)(P.Z,{variant:"h6",children:e.title}),n&&(0,o.jsx)(P.Z,{variant:"caption",children:e.date.fromNow()})]}),(0,o.jsx)(A,{children:e.content})]},e.guid))})})}},48160:function(){}},function(e){e.O(0,[3094,8785,4447,151,8441,3712,9970,2971,7864,1744],function(){return e(e.s=7458)}),_N_E=e.O()}]);