(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6740,4967,2163,6516,7828,930,8381,8498,4550,1581,801,3591,6487,7243,2447,7937,9626,836,3502,7195,7718,7214,7923,1699,3750,9773,2485,3929,2394,9347],{4654:function(){},8964:function(e,t,r){Promise.resolve().then(r.bind(r,3411)),Promise.resolve().then(r.bind(r,1337)),Promise.resolve().then(r.bind(r,7482))},3169:function(e,t,r){"use strict";r.d(t,{k:function(){return i}});var s=r(440),a=r.n(s),n=r(5566);let i=a()({nestedKey:"payload",level:n.env.NEXT_LOGGER_LEVEL||"info",browser:{asObject:!0}});i.info("[Pino] Logger version is ".concat(i.version)),i.info("[Pino] Logger level is ".concat(i.level))},979:function(e,t,r){"use strict";r.r(t),r.d(t,{CenteredBox:function(){return n}});var s=r(6507),a=r(5843);let n=(0,a.ZP)(s.Z)({display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",maxHeight:"400px"})},1337:function(e,t,r){"use strict";r.r(t),r.d(t,{Header:function(){return Header}});var s=r(7437),a=r(6507),n=r(5269);function Header(){return(0,s.jsx)(a.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,s.jsx)(n.Z,{align:"center",variant:"h4",children:"油蔴地天主教小學(海泓道)家長教師會"})})}},7482:function(e,t,r){"use strict";r.r(t),r.d(t,{Posts:function(){return Posts}});var s,a,n,i,o=r(7437);r(6205);var c=r(3169),d=r(2498),l=r.n(d),h=r(4548),g=r.n(h),u=r(6537),p=r.n(u),E=r(2399),f=r.n(E),y=r(5140),x=r.n(y);g().extend(p()),g().extend(f()),g().extend(x());var w=g();(s=i||(i={})).djsAnniversarySince=w("2022-09-01"),(a=s.TAG_SLUGS||(s.TAG_SLUGS={})).PTA_ALL_TIME="pta-all-time",a.PTA_2022_TO_2024="pta-2022-2024",(n=s.CATEGORY_SLUGS||(s.CATEGORY_SLUGS={})).MEMBERS_NEWS="members-news",n.MEMBERS_NOTICES="members-notices",n.MEMBERS_NEWSLETTERS="members-newsletters",n.MEMBERS_WELFARE="members-welfare",n.PTA_WORDS="pta-words",n.PTA_EXCO="pta-exco",n.PTA_DOCS="pta-docs",n.PTA_CONTACT="pta-contact",n.HELPERS_RECRUIT="helpers-recruit",n.HELPERS_HANDBOOK="helpers-handbook",n.HELPERS_CODE="helpers-code",n.EVENTS_CALENDAR="events-calendar",n.EVENTS_ALBUMS="events-albums";let WpClient=class WpClient{static create(e){return new WpClient(e)}async loadCategories(){try{let e=await this.wp.categories();e.forEach(e=>{this.categoryIdMap.set(e.slug,e)}),this.categoriesLoaded=!0}catch(e){throw c.k.error(e,"Error loading categories"),e}}async loadTags(){try{let e=await this.wp.tags();e.forEach(e=>{this.tagIdMap.set(e.slug,e)}),this.tagsLoaded=!0}catch(e){throw c.k.error(e,"Error loading tags"),e}}async getCategoryId(e){this.categoriesLoaded||await this.loadCategories();let t=this.categoryIdMap.get(e);if(!t)try{let t=await this.wp.categories().slug(e),r=t[0];this.categoryIdMap.set(r.slug,r)}catch(r){let t="Error fetching category: ".concat(e);throw c.k.error(t),Error(t)}if(t=this.categoryIdMap.get(e))return t.id}async getTagId(e){this.tagsLoaded||await this.loadTags();let t=this.tagIdMap.get(e);if(!t)try{let t=await this.wp.tags().slug(e),r=t[0];this.tagIdMap.set(r.slug,r)}catch(r){let t="Error fetching tag: ".concat(e);throw c.k.error(t),Error(t)}if(t=this.tagIdMap.get(e))return t.id}async loadPublishedPosts(e){let{categorySlug:t,tagSlug:r,maxPosts:s=100,stickyFirst:a=!0}=e,[n,o]=await Promise.all([this.getCategoryId(t),this.getTagId(r)]);if(void 0===n||void 0===o)throw c.k.error({categorySlug:t,catId:n,tagSlug:r,tagId:o},"undefined category or tag"),Error("undefined category or tag");let d=await this.wp.posts().perPage(s).orderby("date").order("desc").categories(n).tags(o).after(i.djsAnniversarySince.toISOString()).status("publish").get();c.k.info("fetched ".concat(d.length," posts"));let l=this.mapWpPosts(d);if(a){let e=l.filter(e=>e.sticky),t=l.filter(e=>!e.sticky);return[...e,...t]}return l}mapWpPosts(e){return e.map(e=>wpPostFromJson(e))}constructor(e){this.categoryIdMap=new Map,this.tagIdMap=new Map,this.categoriesLoaded=!1,this.tagsLoaded=!1,this.wp=e}};let C=WpClient.create(new(l())({endpoint:"https://pta.ycps.edu.hk/wp-json"})),wpPostFromJson=e=>({postId:e.id,date:w(e.date),guid:e.guid.rendered,title:e.title.rendered,content:e.content.rendered,excerpt:e.excerpt.rendered,sticky:e.sticky});var _=r(2265),S=r(5269),P=r(9600),T=r(7171),v=r(3457),j=r(4986),m=r(8687),L=r(1),R=r(5780),k=r(5211);r(1337);var M=r(3581),O=r(8809),A=r(5082);let Markdown=e=>{let{children:t}=e;return(0,o.jsx)(M.U,{remarkPlugins:[O.Z],rehypePlugins:[A.Z],children:t})};var I=r(979);let b={error:null,loading:!0,posts:[]},reducer=(e,t)=>{switch(t.type){case"ERROR_CAUGHT":return{...e,error:t.payload,posts:[]};case"POSTS_FETCHED":return{...e,posts:t.payload,loading:!1};case"LOADING_COMPLETED":return{...e,loading:!1};case"RELOAD_REQUESTED":return{...e,error:null,loading:!0,posts:[]};default:return e}};function Posts(e){let{categorySlug:t,tagSlug:r,showDate:s=!1,maxPosts:a=100,collapseAfter:n=5,stickyFirst:i}=e,[d,l]=(0,_.useReducer)(reducer,b),{error:h,loading:g,posts:u}=d,p=(0,_.useCallback)(async()=>{try{let e=await C.loadPublishedPosts({categorySlug:t,tagSlug:r,maxPosts:a,stickyFirst:i});l({type:"POSTS_FETCHED",payload:e})}catch(e){c.k.error(e,"error fetching posts"),l({type:"ERROR_CAUGHT",payload:e})}finally{l({type:"LOADING_COMPLETED"})}},[t,r,a,i]);(0,_.useEffect)(()=>{p()},[p]);let handleReload=async()=>{l({type:"RELOAD_REQUESTED"}),await p()};return h?(0,o.jsx)("section",{children:(0,o.jsxs)(I.CenteredBox,{children:[(0,o.jsx)(S.Z,{variant:"h5",gutterBottom:!0,color:"error",children:"Error loading data"}),(0,o.jsx)(P.Z,{variant:"contained",onClick:handleReload,children:"Reload"})]})}):g?(0,o.jsx)("section",{children:(0,o.jsx)(I.CenteredBox,{children:(0,o.jsx)(T.Z,{})})}):0===u.length?(0,o.jsx)("section",{children:(0,o.jsx)(I.CenteredBox,{children:(0,o.jsx)(S.Z,{children:"Coming soon. Stay tuned."})})}):(0,o.jsx)("section",{children:(0,o.jsx)(v.Z,{divider:(0,o.jsx)(j.Z,{flexItem:!0}),children:u.map((e,t)=>(0,o.jsx)(CollapsiblePost,{showDate:s,post:e,defaultCollapsed:void 0!==n&&!(n<0)&&t>=n},e.guid))})})}function CollapsiblePost(e){let{post:t,showDate:r,defaultCollapsed:s=!0}=e,[a,n]=(0,_.useState)(!!s),i=(0,_.useCallback)(()=>{n(e=>!e)},[]);return(0,o.jsxs)(m.Z,{component:"article",sx:{padding:1},elevation:4,children:[(0,o.jsxs)(v.Z,{onClick:i,children:[(0,o.jsxs)(v.Z,{direction:"row",children:[a?(0,o.jsx)(L.Z,{}):(0,o.jsx)(R.Z,{}),(0,o.jsx)(S.Z,{variant:"h6",children:t.title}),t.sticky&&(0,o.jsx)(k.Z,{fontSize:"small"})]}),r&&(0,o.jsx)(S.Z,{variant:"caption",children:t.date.fromNow()})]}),!a&&(0,o.jsx)(Markdown,{children:t.content})]})}},6205:function(){}},function(e){e.O(0,[9713,3411,151,8155,190,2971,2472,1744],function(){return e(e.s=8964)}),_N_E=e.O()}]);