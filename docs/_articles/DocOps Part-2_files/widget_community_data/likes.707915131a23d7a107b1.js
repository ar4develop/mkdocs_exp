﻿(()=>{"use strict";var e,t,i,n,o,s,a={132968:(e,t,i)=>{var n,o,s,a=i(827652);(null==(o=window.vk)||null==(n=o.pe)?void 0:n.static_manager_dynamic_imports)&&(null==(s=window.vk)?void 0:s.stDomain)&&(i.p=window.vk.stDomain+"/dist/"),window.Likes=a.Likes;try{window.stManager.done(window.jsc("web/likes.js"))}catch(e){}},693982:(e,t,i)=>{function n(e){const t=e.match(/^([a-z_]+)([0-9\-_]+)$/);if(!t)return null;const[,i,n]=t;return{objectType:i,objectId:n}}i.d(t,{getElementLikeButtonCount:()=>r,getElementLikeButtonIcon:()=>c,getElementLikeButtonLabel:()=>u,likePostObjectId:()=>o,likeReplyObjectId:()=>s,parseLikeObjectId:()=>n});const o=e=>`wall${e}`,s=e=>`wall_reply${e}`;var a;const r=e=>{var t;return null!=(a=null==(t=e)?void 0:t.querySelector(".like_button_count, ._like_button_count"))?a:void 0};var l;const c=e=>{var t;return null!=(l=null==(t=e)?void 0:t.querySelector(".like_button_icon, ._like_button_icon"))?l:void 0};var d;const u=e=>null!=(d=e.querySelector(".like_button_label, ._like_button_label"))?d:void 0},234514:(e,t,i)=>{i.d(t,{LikeButtonTypes:()=>n});const n={like:"like",share:"share",views:"views",comment:"comment"}},898298:(e,t,i)=>{i.d(t,{isIntentPreviewHidden:()=>l,isIntentPreviewInActionStatusBar:()=>r,isIntentPreviewUseCurrent:()=>c,isVariantHidden:()=>s,isVariantInActionStatusBar:()=>o,parsePreviewVariant:()=>u,previewVisibilityIntentForVariant:()=>d,previewVisibilityUseCurrent:()=>a});var n=i(580151);const o=e=>e===n.PreviewVariantActionStatusBar,s=e=>e===n.PreviewVariantHidden,a={kind:"useCurrent"},r=e=>e.kind===n.PreviewVariantActionStatusBar,l=e=>e.kind===n.PreviewVariantHidden,c=e=>"useCurrent"===e.kind,d=e=>e?{kind:e}:a,u=e=>n.PreviewVariants.includes(e)?e:void 0},580151:(e,t,i)=>{i.d(t,{PreviewVariantActionStatusBar:()=>n,PreviewVariantHidden:()=>o,PreviewVariants:()=>s});const n="action_status_bar",o="hidden",s=[n,o]},682951:(e,t,i)=>{i.d(t,{REACTIONS_COUNTS_RESPONSE_FIELD:()=>l,SIZE_128:()=>r,SIZE_32:()=>o,SIZE_40:()=>s,SIZE_96:()=>a,SUPPORTED_OBJECT_TYPES:()=>n,WK_SECTION_PREFIX_REACTIONS:()=>c});const n={wall:"wall",wall_reply:"wall_reply"},o={width:32,height:32},s={width:40,height:40},a={width:96,height:96},r={width:128,height:128},l="reactions_counts",c="reactions"},109454:(e,t,i)=>{i.d(t,{isReactionsFullUpdatePayload:()=>a,reactionsCountsOnlyUpdatePayload:()=>r,reactionsCountsUpdatePayload:()=>s});var n=i(434788),o=i(900641);const s=(e,t)=>(0,n._)({kind:o.PayloadKindFull},e,{reactionIdState:{reactionId:t.id}}),a=e=>e.kind===o.PayloadKindFull,r=e=>(0,n._)({kind:o.PayloadKindCountsOnly},e)},900641:(e,t,i)=>{i.d(t,{PayloadKindCountsOnly:()=>n,PayloadKindFull:()=>o});const n="counts_only",o="counts_with_current_reaction"},999237:(e,t,i)=>{i.d(t,{triggerReactionsUpdate:()=>r});var n=i(693982),o=i(682951),s=i(505426),a=i(109454);const r=(e,t,i,r)=>{const l=(0,n.parseLikeObjectId)(e);l&&l.objectType===o.SUPPORTED_OBJECT_TYPES.wall&&l.objectId?(0,s.emitEvent)(s.WallDataEvents.post_reactions_counts_update,function(e,t,i,n){var o,s,r;const l={counts:e,isFromWkLayer:null==(o=t)?void 0:o.isFromWkLayer,isPrimaryLikeButtonClick:null==(s=t)?void 0:s.isPrimaryLikeButtonClick,isQueueUpdate:null==(r=t)?void 0:r.isQueueUpdate,isUserAction:t.isUserAction,postFullId:i.objectId,previewVisibility:t.previewVisibility,reactionIdState:n?{reactionId:n.id}:void 0,suggestSubscribe:t.suggestSubscribe};return n?(0,a.reactionsCountsUpdatePayload)(l,n):(0,a.reactionsCountsOnlyUpdatePayload)(l)}(t,r,l,i)):l&&l.objectType===o.SUPPORTED_OBJECT_TYPES.wall_reply&&l.objectId?(0,s.emitEvent)(s.WallDataEvents.reply_reactions_counts_update,{counts:t,replyFullId:l.objectId,reactionIdState:i?{reactionId:i.id}:void 0}):console.warn("Unsupported reactions object update",e)}},505426:(e,t,i)=>{i.d(t,{WallDataEvents:()=>a,emitEvent:()=>u,registerNonGlobalNonUniqueListener:()=>d,registerUniqueListener:()=>c});var n=i(434788),o=i(980602),s=i(367431);const a={post_reactions_counts_update:"wall/post_reactions_counts_update",reply_reactions_counts_update:"wall/reply_reactions_counts_update",post_subscribe_update:"wall/post_subscribe_update"},r=(0,s.makeSharedState)("wall-data",(()=>({emitter:new o.default,keyedListeners:Object.create(null)})),{version:0}),l=(e,t,i)=>{var o,s;const a=r(),l=null==(s=a.keyedListeners)||null==(o=s[e])?void 0:o[t];return l&&a.emitter.removeListener(e,l),((e,t,i)=>{const o=r();return o.emitter.addListener(e,i),o.keyedListeners[e]=(0,n._)({},o.keyedListeners[e],{[t]:i}),()=>{var n,s;o.emitter.removeListener(e,i),(null==(n=o.keyedListeners[e])?void 0:n[t])===i&&(null==(s=o.keyedListeners[e])||delete s[t])}})(e,t,i)},c=(e,t,i)=>l(t,e,i),d=(e,t)=>((e,t)=>{const i=r();return i.emitter.addListener(e,t),()=>{i.emitter.removeListener(e,t)}})(e,t),u=(e,t)=>{r().emitter.emit(e,t)}},228411:(e,t,i)=>{i.d(t,{updateAriaLabelCounter:()=>s});var n=i(29271),o=i(234514);const s=(e,t,i)=>{if(!("number"==typeof t&&e instanceof HTMLElement&&e.classList.contains("PostBottomAction")))return;const s=(e=>{let t;switch(e){case o.LikeButtonTypes.comment:t=n.getLang("likes_comments_N_aria_short","raw");break;case o.LikeButtonTypes.like:t=n.getLang("likes_likes_N_aria_short","raw");break;case o.LikeButtonTypes.share:t=n.getLang("likes_shares_N_aria_short","raw")}return t})(i);if(!s)return;const a=(0,n.langNumeric)(t,s,!1);e.setAttribute("aria-label",a)}},827652:(e,t,i)=>{i.d(t,{Likes:()=>g});var n=i(434788),o=i(795558),s=i(953908),a=i(320422),r=i(82161),l=i(893106),c=i(95432),d=i(664988),u=i(514986),p=i(29271),_=i(693982),v=i(234514),w=i(682951),h=i(898298),m=i(999237),k=i(878021),y=i(228411),f=i(362246),b=i(944615);const g={toggle(e,t,i,n){if((0,s.cancelEvent)(t),(0,d.isObject)(window.cur)&&(0,d.isFunction)(cur.viewAsBox))return cur.viewAsBox();if(vk.widget&&!vk.id)return window.Widgets.oauth();const a=(0,o.hasClass)(e,"active");(0,o.addClass)(e,"animate"),this.clientUpdate(i,v.LikeButtonTypes.like,a?-1:1,!a);const r=i.match(/^(video)(?!(_comment))(.*)/)?(0,f.getVideoTrackCode)():void 0,l={act:a?"a_do_unlike":"a_do_like",object:i,hash:n,list:cur.pvListId,wall:2,from:this._getReference(i),from_widget:vk.widget?1:0,track_code:r},c=()=>((0,o.toggleClass)(e,"active",a),this.clientUpdate(i,v.LikeButtonTypes.like,a?1:-1,a),!1);window.ajax.post("like.php",l,{onDone:t=>{if(t.unauth_action_box)return c(),void k.UnauthActionBox.show(t.unauth_action_box);this.update(i,t);const n=i.match(/^(wall|market)(.*)/);n&&cur.onLike&&cur.onLike(e,n[1],n[2],a)},onFail:c});(0,d.intval)((0,o.domData)(e,"count"))>0?g.showLikes(e,i,{fast:!0}):e.tt&&e.tt.destroy&&e.tt.destroy()},_getReference:e=>cur.pvShown?"photo_viewer":e===cur.wallLayer?"wkview":window.mvcur&&window.mvcur.mvShown?"videoview":cur.wallType?"feed"===cur.wallType?"news"===cur.section?`feed_${cur.subsection?cur.subsection:cur.section}`:"recommended"===cur.section?"feed_recommended"+("recent"!==cur.subsection?"_"+cur.subsection:""):(0,r.inArray)(cur.section,["friends","groups","videos","photos"])?"feed_"+(cur.subsection?"_"+cur.subsection:""):`feed_${cur.section}`:"top"===cur.wallType?"wall_top":"wall_"+(cur.onepost?"one":(cur.wallType||"").indexOf("full_")?"page":"full"):cur.module,share(e,t={},i=void 0){if(vk.widget&&!vk.id)return window.Widgets.oauth();if((0,d.isObject)(window.cur)&&(0,d.isFunction)(cur.viewAsBox))return cur.viewAsBox();if(window.cur){const e=(0,b.getTrackCodeFromPost)(i);window.cur.shareButtonTrackCode=e}const{objectType:o,objectId:s}=(0,_.parseLikeObjectId)(e);(vk.widget?window.showBox:u.showBox)("like.php",(0,n._)({act:"publish_box",object:e,from_widget:vk.widget?1:0},t),{onDone:(e,t)=>{t.unauth_action_box&&(e.hide(),k.UnauthActionBox.show(t.unauth_action_box))},stat:[window.jsc("web/page.js"),"page.css",window.jsc("web/wide_dd.js"),"wide_dd.css",window.jsc("web/sharebox.js")]}),"wall"===o&&window.Wall&&window.Wall.triggerAdPostStat(s,"share_post"),cur.RpcMethods&&(cur.RpcMethods.likeFullUpdate=t=>g.update(e,window.cleanObj(t)))},clientUpdate(e,t,i,n){const s=this._getButtonsByType(e,t);if(!s.length)return;const a=(0,d.intval)((0,o.domData)(s[0],"count"))+i;this._updateDom(e,t,a,n),this.updateExternalIndex(e,{type:t,count:a,isActive:n})},update(e,t){if(!isNaN(parseInt(t.like_num))){const i=(0,d.isUndefined)(t.like_my)?void 0:!!(0,d.intval)(t.like_my);this._updateDom(e,v.LikeButtonTypes.like,t.like_num,i,t.like_title),this.updateExternalIndex(e,{type:v.LikeButtonTypes.like,count:t.like_num,isActive:i})}if(!isNaN(parseInt(t.share_num))){const i=(0,d.isUndefined)(t.share_my)?void 0:!!(0,d.intval)(t.share_my);this._updateDom(e,v.LikeButtonTypes.share,t.share_num,i,t.share_title),this.updateExternalIndex(e,{type:v.LikeButtonTypes.share,count:t.share_num})}if((0,r.isNumeric)(t.views_num)&&this._updateDom(e,v.LikeButtonTypes.views,t.views_num,void 0,t.views_title),(0,r.isNumeric)(t.comment_num)&&this._updateDom(e,v.LikeButtonTypes.comment,t.comment_num),t[w.REACTIONS_COUNTS_RESPONSE_FIELD]){const i=!!t.isQueueUpdate;(0,m.triggerReactionsUpdate)(e,t[w.REACTIONS_COUNTS_RESPONSE_FIELD],void 0,{isQueueUpdate:i,isUserAction:!1,previewVisibility:h.previewVisibilityUseCurrent})}},updateComments(e,t){this.update(e,{comment_num:t})},_updateDom(e,t,i,n,s){var a;const c=this._getButtonsByType(e,t),u=t===v.LikeButtonTypes.views;if(!(null==(a=c)?void 0:a.length))return;let w="";u?w=i:i>0&&(w=vk.widget?(0,r.formatCount)(i):(0,p.langNumeric)(i,"%s",!0)),u||(i=(0,d.intval)(i));for(let e=0;e<c.length;e++){const a=c[e];if((0,o.hasClass)(a,"no_counter"))continue;const r=u?c[e]:(0,_.getElementLikeButtonCount)(c[e]);var h,m,k;if((0,l.animateCount)(r,w,{str:"auto",noWrapWidth:!u,noSpaceIfEmpty:!0}),(0,o.toggleClass)(a,"empty",i<=0),"boolean"==typeof n&&(0,o.toggleClass)(a,"active",n),(0,o.attr)(c[e],"data-count",i),(0,y.updateAriaLabelCounter)(a,i,t),u)null==(k=a)||null==(m=k.closest)||null==(h=m.call(k,".like_views"))||h.setAttribute("title",s||"");const p=c[e].tt;if(p){const e=(0,o.domByClass)(p.container,"_content"),r=(0,o.domByClass)(p.container,"_value"),l=(0,o.domByClass)(p.container,"_title"),c=(0,d.intval)((0,o.val)(r));(0,o.val)(r,i),s&&(0,o.val)(l,s),(0,d.isObject)(p)&&(p.likeInvalidated=!0),(c!==i&&c<7||!1===s)&&(t===v.LikeButtonTypes.like?a.needReinitLikesTT=!0:t===v.LikeButtonTypes.share&&(a.needReinitShareTT=!0)),t===v.LikeButtonTypes.like&&(0,o.toggleClass)(e,"me_hidden",!n),!1===s&&p.destroy&&p.destroy()}}},_getButtonsByType:(e,t)=>(0,o.domQuery)(`._like_${e} ._${t}, ._like_${e} [data-like-button-type="${t}"]`),showLikes(e,t,i={}){var n;if(!e||!(e instanceof HTMLElement)||e.postDontShowLikes)return;if(vk.widget&&vk.show_external_auth_box)return;let s=i.views?{views:1}:i.share?{published:1}:{};i.listId&&(s.list=i.listId),i.like_hash&&(s.like_hash=i.like_hash),i.like_stats_params&&Object.assign(s,i.like_stats_params);const l=!!(0,o.geByClass1)("share",(0,o.gpeByClass)("like_wrap",e));let c=document.body,u=!1;const p=getComputedStyle(e),v=(0,d.intval)(p.getPropertyValue("padding-left").replace("px","")),w=(0,d.intval)(p.getPropertyValue("padding-top").replace("px","")),h=(0,_.getElementLikeButtonIcon)(e);let m=40;"wpost"===i.from&&(m=24);const k=[m-(0,o.getSize)(h)[0]/2-v,10-w];let y=i.cl||"";if(i.share)y+="likes_tt_share";else if(y+="likes_tt_like","widget_community"===i.from)k[0]=6;else if("wcomments"===i.from||"widget_comments"===cur.wallType){const t=16,i=10;k[0]=(0,o.getSize)(e)[0]+t-(0,o.getSize)(h)[0]/2-i}else"photo_carousel"===i.from&&(k[1]=10);if(!!(null==(n=i)?void 0:n.isFromReactionsPreview)){const t=e.querySelector("._ReactionsPreview__itemsContainer");if(t){const e=t.querySelector(".ReactionsPreviewItem"),i=(0,o.getXYRect)(e,!1),n=(i.width||0)/2;let s=n;c=t;i.left+i.width/2>window.innerWidth/2&&(u=!0,s=t.offsetWidth-n),k[0]=-s+m}}let f,b;i.share?(f="needReinitLikesTT",b="resetLikesTTTimer"):(f="needReinitShareTT",b="resetShareTTTimer"),clearTimeout(e[b]),(0,a.showTooltip)(e,{url:"/like.php",params:(0,r.extend)({act:"a_get_stats",object:t,has_share:l?1:""},s),appendEl:c,slide:15,shift:k,ajaxdt:i.fast?0:100,showdt:i.fast?0:400,hidedt:200,dir:"auto",checkLeft:!0,needLeft:u,reverseOffset:80,noZIndex:!0,hasover:!0,tip:{over:()=>{g.showLikes(e,t,i)}},typeClass:"like_tt",className:y,onHide:()=>{clearTimeout(e[b]),e[f]&&(e[b]=setTimeout((()=>{delete e[f],e.tt&&e.tt.destroy&&e.tt.destroy()}),200))}})},showShare:function(e,t,i){g.showLikes(e,t,(0,r.extend)(i,{share:1}))},updateViews:(e,t)=>{vk.widget&&vk.show_external_auth_box||window.ajax.post("like.php",{act:"a_get_stats",object:e,views:1},{cache:1,onDone(t,i){const n=(0,o.ce)("div",{innerHTML:i});g._updateDom(e,v.LikeButtonTypes.views,t,void 0,n.innerText||n.textContent)}})},makeTemplate(e,t){if(!e)return"";(t=(0,r.extend)({buttons_prepend:"",object_raw:"",likes_count:"",liked:!1,share_count:"",shared:"",views_count:"",share_opts:{},like_opts:{},class_name:"",like_cont_class:"",like_class_name:"",[w.REACTIONS_COUNTS_RESPONSE_FIELD]:"",reactions_class_name:""},t)).like_active=t.liked?"active":"",t.share_active=t.shared?"active":"",t.comment_active="",t.likes_formatted_count=t.likes_count>0?(0,p.langNumeric)(t.likes_count,"%s",!0):"",t.share_formatted_count=t.share_count>0?(0,p.langNumeric)(t.share_count,"%s",!0):"",t.share_opts=this._convertOptsToString(t.share_opts),t.like_opts=this._convertOptsToString(t.like_opts),t.like_class_name+=t.likes_count>0?"":" empty",t.share_class_name=t.share_count>0?"":"empty";const i=t[w.REACTIONS_COUNTS_RESPONSE_FIELD],n=!!i&&Object.values(i).some((e=>!!e));return t.reactions_class_name+=n?"":" PostBottomAction--empty",(0,o.rs)(e,t)},_convertOptsToString:e=>JSON.stringify(e).replace(/\"/g,"'"),updateExternalIndex(e,t={}){const{objectType:i,objectId:n}=(0,_.parseLikeObjectId)(e);switch(i){case"photo":if(!cur.pvShown||!cur.pvCurPhoto||cur.pvCurPhoto.id!==n)return;const e=cur.pvListId,i=cur.pvIndex,o=cur.pvData[e][i];t.type===v.LikeButtonTypes.like?(o.likes=t.count,o.liked=t.isActive,cur.pvCommsLikes[o.id][1]=t.count):t.type===v.LikeButtonTypes.share&&(o.shares=t.count);break;case"video":if(window.mvcur&&window.mvcur.mvShown&&window.mvcur.videoRaw===n&&t.type===v.LikeButtonTypes.like){const e=window.Videoview.getMvData();e.likes=t.count,void 0!==t.isActive&&(e.liked=t.isActive,window.Videoview.playerOnLiked(t.isActive),window.Videoview.recache())}break;case"clip":t.type===v.LikeButtonTypes.like&&window.Videoview.playerOnLiked(t.isActive)}},showLikesList(e,t){cur.viewAsBox||(0,o.hasClass)((0,o.gpeByClass)("like_btn",e),"no_counter")||(0,c.showWiki)({w:"likes/"+(0,r.clean)(t)},!1,!1,{queue:1})},showSharesList(e,t){cur.viewAsBox||(0,o.hasClass)((0,o.gpeByClass)("like_btn",e),"no_counter")||(0,c.showWiki)({w:"shares/"+(0,r.clean)(t)},!1,!1,{queue:1})}}}},r={};function l(e){var t=r[e];if(void 0!==t)return t.exports;var i=r[e]={exports:{}};return a[e].call(i.exports,i,i.exports,l),i.exports}l.m=a,e=[],l.O=(t,i,n,o)=>{if(!i){var s=1/0;for(d=0;d<e.length;d++){for(var[i,n,o]=e[d],a=!0,r=0;r<i.length;r++)(!1&o||s>=o)&&Object.keys(l.O).every((e=>l.O[e](i[r])))?i.splice(r--,1):(a=!1,o<s&&(s=o));if(a){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[i,n,o]},l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},i=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,l.t=function(e,n){if(1&n&&(e=this(e)),8&n)return e;if("object"==typeof e&&e){if(4&n&&e.__esModule)return e;if(16&n&&"function"==typeof e.then)return e}var o=Object.create(null);l.r(o);var s={};t=t||[null,i({}),i([]),i(i)];for(var a=2&n&&e;"object"==typeof a&&!~t.indexOf(a);a=i(a))Object.getOwnPropertyNames(a).forEach((t=>s[t]=()=>e[t]));return s.default=()=>e,l.d(o,s),o},l.d=(e,t)=>{for(var i in t)l.o(t,i)&&!l.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},l.f={},l.e=e=>Promise.all(Object.keys(l.f).reduce(((t,i)=>(l.f[i](e,t),t)),[])),l.u=e=>25394===e?"AudioLongtapModal.96dbc358dca071fa3de5.js":24817===e?"hls.7bfefe299fa92971b99a.js":75980===e?"menu_settings.3ea04534d06cb6d38e2c.js":96816===e?"web-audio-lyrics-modal.218229d2232b2e3d93fb.js":9375===e?"voice_message_player.f0c31b4a3dc08de145c9.js":28762===e?"speech.be0c329a1eff7c81577d.js":57468===e?"SilentModeForms.81e354f9bd61dfd364b5.js":96248===e?"feed-skeleton.add07457f9a9b141ed5a.js":59240===e?"performance-stats.4b38c82ee7bdbd67bf4a.js":38288===e?"lottie.74aaa0cc8728efa0bd7a.js":void 0,l.miniCssF=e=>e+"."+{25394:"6af57e1b0cf5a74f9a87",57468:"d05f5967dbd8ab294b5c",75980:"5bbee2c9f3e189193a73"}[e]+".css",l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n={},l.l=(e,t,i,o)=>{if(n[e])n[e].push(t);else{var s,a;if(void 0!==i)for(var r=document.getElementsByTagName("script"),c=0;c<r.length;c++){var d=r[c];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")=="vk:"+i){s=d;break}}s||(a=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,l.nc&&s.setAttribute("nonce",l.nc),s.setAttribute("data-webpack","vk:"+i),s.src=e),n[e]=[t];var u=(t,i)=>{s.onerror=s.onload=null,clearTimeout(p);var o=n[e];if(delete n[e],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((e=>e(i))),t)return t(i)},p=setTimeout(u.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=u.bind(null,s.onerror),s.onload=u.bind(null,s.onload),a&&document.head.appendChild(s)}},l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="/dist/",o=e=>new Promise(((t,i)=>{var n=l.miniCssF(e),o=l.p+n;if(((e,t)=>{for(var i=document.getElementsByTagName("link"),n=0;n<i.length;n++){var o=(a=i[n]).getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===e||o===t))return a}var s=document.getElementsByTagName("style");for(n=0;n<s.length;n++){var a;if((o=(a=s[n]).getAttribute("data-href"))===e||o===t)return a}})(n,o))return t();((e,t,i,n)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=s=>{if(o.onerror=o.onload=null,"load"===s.type)i();else{var a=s&&("load"===s.type?"missing":s.type),r=s&&s.target&&s.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=a,l.request=r,o.parentNode.removeChild(o),n(l)}},o.href=t,document.head.appendChild(o)})(e,o,t,i)})),s={22568:0},l.f.miniCss=(e,t)=>{s[e]?t.push(s[e]):0!==s[e]&&{25394:1,57468:1,75980:1}[e]&&t.push(s[e]=o(e).then((()=>{s[e]=0}),(t=>{throw delete s[e],t})))},(()=>{var e={22568:0};l.f.j=(t,i)=>{var n=l.o(e,t)?e[t]:void 0;if(0!==n)if(n)i.push(n[2]);else if(75980!=t){var o=new Promise(((i,o)=>n=e[t]=[i,o]));i.push(n[2]=o);var s=l.p+l.u(t),a=new Error;l.l(s,(i=>{if(l.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var o=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",a.name="ChunkLoadError",a.type=o,a.request=s,n[1](a)}}),"chunk-"+t,t)}else e[t]=0},l.O.j=t=>0===e[t];var t=(t,i)=>{var n,o,[s,a,r]=i,c=0;if(s.some((t=>0!==e[t]))){for(n in a)l.o(a,n)&&(l.m[n]=a[n]);if(r)var d=r(l)}for(t&&t(i);c<s.length;c++)o=s[c],l.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return l.O(d)},i=self.webpackChunkvk=self.webpackChunkvk||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var c=l.O(void 0,[75514,98066,56990,24509,76400,40885,68592],(()=>l(132968)));c=l.O(c)})();