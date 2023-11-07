(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9773,4967,2163,6516,7828,930,8381,8498,4550,1581,801,3591,6487,7243,2447,7937,9626,836,3502,7195,7718,7214,7923,6740,1699,3750,2485,3929,2394,9347],{24654:function(){},78964:function(t,e,s){Promise.resolve().then(s.bind(s,33411)),Promise.resolve().then(s.bind(s,21337)),Promise.resolve().then(s.bind(s,76346))},80510:function(t,e,s){"use strict";s.d(e,{k:function(){return i}});var r=s(90440),n=s.n(r),a=s(25566);let i=n()({nestedKey:"payload",level:a.env.NEXT_LOGGER_LEVEL||"info",browser:{asObject:!0}});i.info("[Pino] Logger version is ".concat(i.version)),i.info("[Pino] Logger level is ".concat(i.level))},90979:function(t,e,s){"use strict";s.r(e),s.d(e,{CenteredBox:function(){return a}});var r=s(96507),n=s(35843);let a=(0,n.ZP)(r.Z)({display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",maxHeight:"400px"})},21337:function(t,e,s){"use strict";s.r(e),s.d(e,{Header:function(){return Header}});var r=s(57437),n=s(96507),a=s(85269);function Header(){return(0,r.jsx)(n.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,r.jsx)(a.Z,{align:"center",variant:"h4",children:"油蔴地天主教小學(海泓道)家長教師會"})})}},76346:function(t,e,s){"use strict";s.r(e),s.d(e,{Posts:function(){return Posts}});var r,n,a,i,o=s(57437);s(6205);var c=s(80510),l=s(2265),d=s(85269),h=s(49600),g=s(47042),p=s(13457),u=s(54986),f=s(18687),E=s(70001),P=s(95780),y=s(95211);s(21337);var S=s(13581),w=s(98809),x=s(65082);let Markdown=t=>{let{children:e}=t;return(0,o.jsx)(S.U,{remarkPlugins:[w.Z],rehypePlugins:[x.Z],children:e})};var _=s(74548),m=s.n(_),T=s(6537),j=s.n(T),I=s(82399),v=s.n(I),k=s(35140),C=s.n(k);m().extend(j()),m().extend(v()),m().extend(C());var M=m();(r=i||(i={})).ITEMS_PER_PAGE=100,r.djsAnniversarySince=M("2022-09-01"),(n=r.TAG_SLUGS||(r.TAG_SLUGS={})).PTA_ALL_TIME="pta-all-time",n.PTA_2022_TO_2024="pta-2022-2024",(a=r.CATEGORY_SLUGS||(r.CATEGORY_SLUGS={})).MEMBERS_NEWS="members-news",a.MEMBERS_NOTICES="members-notices",a.MEMBERS_NEWSLETTERS="members-newsletters",a.MEMBERS_WELFARE="members-welfare",a.PTA_WORDS="pta-words",a.PTA_EXCO="pta-exco",a.PTA_DOCS="pta-docs",a.PTA_CONTACT="pta-contact",a.HELPERS_RECRUIT="helpers-recruit",a.HELPERS_HANDBOOK="helpers-handbook",a.HELPERS_CODE="helpers-code",a.EVENTS_CALENDAR="events-calendar",a.EVENTS_ALBUMS="events-albums";var A=s(90979),R=s(45771),L=s(12608),b=s(82498),Z=s.n(b);let WpClient=class WpClient{static create(t){return new WpClient(t)}async loadCategories(){try{let t=await this.wp.categories().perPage(i.ITEMS_PER_PAGE);t.forEach(t=>{this.categoryIdMap.set(t.slug,t)}),this.categoriesLoaded=!0}catch(t){throw c.k.error(t,"Error loading categories"),t}}async loadTags(){try{let t=await this.wp.tags().perPage(i.ITEMS_PER_PAGE);t.forEach(t=>{this.tagIdMap.set(t.slug,t)}),this.tagsLoaded=!0}catch(t){throw c.k.error(t,"Error loading tags"),t}}async getCategoryId(t){this.categoriesLoaded||await this.loadCategories();let e=this.categoryIdMap.get(t);if(!e)try{let e=await this.wp.categories().slug(t),s=e[0];this.categoryIdMap.set(s.slug,s)}catch(s){let e="Error fetching category: ".concat(t);throw c.k.error(e),Error(e)}if(e=this.categoryIdMap.get(t))return e.id}async getTagId(t){this.tagsLoaded||await this.loadTags();let e=this.tagIdMap.get(t);if(!e)try{let e=await this.wp.tags().slug(t),s=e[0];this.tagIdMap.set(s.slug,s)}catch(s){let e="Error fetching tag: ".concat(t);throw c.k.error(e),Error(e)}if(e=this.tagIdMap.get(t))return e.id}async getTaxonomyIds(t,e){let[s,r]=await Promise.all([this.getCategoryId(t),this.getTagId(e)]);if(void 0===s||void 0===r)throw c.k.error({categorySlug:t,catId:s,tagSlug:e,tagId:r},"undefined category or tag"),Error("undefined category or tag");return[s,r]}async fetchStickyPosts(t){let{categorySlug:e,tagSlug:s}=t,[r,n]=await this.getTaxonomyIds(e,s),a=i.ITEMS_PER_PAGE,o=0,fetchFn=t=>this.wp.posts().perPage(a).offset(t).orderby("date").order("desc").categories(r).tags(n).after(i.djsAnniversarySince.toISOString()).status("publish").sticky(!0).get(),c=await fetchFn(o),l=this.mapWpPosts(c),d=[...l];for(;l.length>=a;)o+=a,c=await fetchFn(o),d=[...d,...l=this.mapWpPosts(c)];return d}async fetchNonStickyPosts(t){let{categorySlug:e,tagSlug:s,maxPosts:r=i.ITEMS_PER_PAGE}=t,[n,a]=await this.getTaxonomyIds(e,s),o=i.ITEMS_PER_PAGE,c=0,fetchFn=t=>this.wp.posts().perPage(o).offset(t).orderby("date").order("desc").categories(n).tags(a).after(i.djsAnniversarySince.toISOString()).status("publish").sticky(!1).get(),l=await fetchFn(c),d=this.mapWpPosts(l),h=[...d];for(;r>h.length&&d.length>=o;)c+=o,l=await fetchFn(c),h=[...h,...d=this.mapWpPosts(l)];return h}async fetchPosts(t){let{categorySlug:e,tagSlug:s,maxPosts:r=i.ITEMS_PER_PAGE}=t,[n,a]=await this.getTaxonomyIds(e,s),o=i.ITEMS_PER_PAGE,c=0,fetchFn=t=>this.wp.posts().perPage(o).offset(t).orderby("date").order("desc").categories(n).tags(a).after(i.djsAnniversarySince.toISOString()).status("publish").get(),l=await fetchFn(c),d=this.mapWpPosts(l),h=[...d];for(;r>h.length&&d.length>=o;)c+=o,l=await fetchFn(c),h=[...h,...d=this.mapWpPosts(l)];return h}mapWpPosts(t){return t.map(t=>wpPostFromJson(t))}constructor(t){this.categoryIdMap=new Map,this.tagIdMap=new Map,this.categoriesLoaded=!1,this.tagsLoaded=!1,this.wp=t}};let G=WpClient.create(new(Z())({endpoint:"https://pta.ycps.edu.hk/wp-json"})),wpPostFromJson=t=>({postId:t.id,date:M(t.date),guid:t.guid.rendered,title:t.title.rendered,content:t.content.rendered,excerpt:t.excerpt.rendered,sticky:t.sticky});async function fetchPosts(t){if(t.filterSticky){let e=await G.fetchStickyPosts(t),s=await G.fetchNonStickyPosts(t);return{stickyPosts:e,posts:s}}let e=await G.fetchPosts(t);return{stickyPosts:[],posts:e}}let O=(0,L.no)("categories",{all:null}),N=(0,L.no)("tags",{all:null}),W=(0,L.no)("posts",{single:null,categorized:t=>({queryKey:[t.categorySlug,t.tagSlug,t.filterSticky,t],queryFn:e=>fetchPosts(t)})}),F=(0,L.kR)(O,N,W);function usePosts(t){return(0,R.a)(F.posts.categorized(t))}function Posts(t){let{categorySlug:e,tagSlug:s,showDate:r=!1,maxPosts:n=i.ITEMS_PER_PAGE,collapseAfter:a=5,stickyFirst:l}=t,{isPending:f,isError:E,data:P,error:y,refetch:S}=usePosts({categorySlug:e,tagSlug:s,filterSticky:!!l,maxPosts:n}),handleReload=async()=>{S()};if(E)return c.k.error(y,"error fetching posts"),(0,o.jsx)("section",{children:(0,o.jsxs)(A.CenteredBox,{children:[(0,o.jsx)(d.Z,{variant:"h5",gutterBottom:!0,color:"error",children:"Error loading data"}),(0,o.jsx)(h.Z,{variant:"contained",onClick:handleReload,children:"Reload"})]})});if(f)return(0,o.jsx)("section",{children:(0,o.jsx)(A.CenteredBox,{children:(0,o.jsx)(g.Z,{})})});let{stickyPosts:w,posts:x}=P;return 0===w.length&&0===x.length?(0,o.jsx)("section",{children:(0,o.jsx)(A.CenteredBox,{children:(0,o.jsx)(d.Z,{children:"Coming soon. Stay tuned."})})}):(0,o.jsxs)("section",{children:[(0,o.jsx)(p.Z,{divider:(0,o.jsx)(u.Z,{flexItem:!0}),children:w.map((t,e)=>(0,o.jsx)(CollapsiblePost,{showDate:r,post:t,defaultCollapsed:!1},t.guid))}),(0,o.jsx)(p.Z,{divider:(0,o.jsx)(u.Z,{flexItem:!0}),children:x.map((t,e)=>(0,o.jsx)(CollapsiblePost,{showDate:r,post:t,defaultCollapsed:void 0!==a&&!(a<0)&&e>=a},t.guid))})]})}function CollapsiblePost(t){let{post:e,showDate:s,defaultCollapsed:r=!0}=t,[n,a]=(0,l.useState)(!!r),i=(0,l.useCallback)(()=>{a(t=>!t)},[]);return(0,o.jsxs)(f.Z,{component:"article",sx:{padding:1},elevation:4,children:[(0,o.jsxs)(p.Z,{onClick:i,children:[(0,o.jsxs)(p.Z,{direction:"row",children:[n?(0,o.jsx)(E.Z,{}):(0,o.jsx)(P.Z,{}),(0,o.jsx)(d.Z,{variant:"h6",children:e.title}),e.sticky&&(0,o.jsx)(y.Z,{fontSize:"small"})]}),s&&(0,o.jsx)(d.Z,{variant:"caption",children:e.date.fromNow()})]}),!n&&(0,o.jsx)(Markdown,{children:e.content})]})}},6205:function(){}},function(t){t.O(0,[9713,3411,151,6853,190,2971,2472,1744],function(){return t(t.s=78964)}),_N_E=t.O()}]);