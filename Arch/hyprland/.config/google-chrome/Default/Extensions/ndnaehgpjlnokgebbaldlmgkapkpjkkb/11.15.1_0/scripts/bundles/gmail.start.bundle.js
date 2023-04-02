/*!
 * El código a continuación es propiedad intelectual de The Mail Track Company S.L. de Barcelona, España,
 * y solo debe ser utilizado y manejado bajo estos Términos: https://mailtrack.io/es/terms
 *
 * The code hereafter is the intellectual property of The Mail Track Company S.L. of Barcelona, Spain
 * and must be used and handled only according to these Terms: https://mailtrack.io/en/terms
 *
 */(()=>{var t={2705:(t,u,e)=>{var r=e(/*! ./_root */5639).Symbol;t.exports=r},7412:t=>{function u(t,u){for(var e=-1,r=null==t?0:t.length;++e<r&&!1!==u(t[e],e,t););return t}t.exports=u},4636:(t,u,e)=>{var r=e(/*! ./_baseTimes */2545),n=e(/*! ./isArguments */5694),o=e(/*! ./isArray */1469),a=e(/*! ./isBuffer */4144),i=e(/*! ./_isIndex */5776),c=e(/*! ./isTypedArray */6719),F=Object.prototype.hasOwnProperty;function l(t,u){var e=o(t),l=!e&&n(t),s=!e&&!l&&a(t),f=!e&&!l&&!s&&c(t),p=e||l||s||f,d=p?r(t.length,String):[],v=d.length;for(var y in t)(u||F.call(t,y))&&!(p&&("length"==y||s&&("offset"==y||"parent"==y)||f&&("buffer"==y||"byteLength"==y||"byteOffset"==y)||i(y,v)))&&d.push(y);return d}t.exports=l},9881:(t,u,e)=>{var r=e(/*! ./_baseForOwn */7816),n=e(/*! ./_createBaseEach */9291)(r);t.exports=n},8483:(t,u,e)=>{var r=e(/*! ./_createBaseFor */5063)();t.exports=r},7816:(t,u,e)=>{var r=e(/*! ./_baseFor */8483),n=e(/*! ./keys */3674);function o(t,u){return t&&r(t,u,n)}t.exports=o},4239:(t,u,e)=>{var r=e(/*! ./_Symbol */2705),n=e(/*! ./_getRawTag */9607),o=e(/*! ./_objectToString */2333),a="[object Null]",i="[object Undefined]",c=r?r.toStringTag:void 0;function F(t){return null==t?void 0===t?i:a:c&&c in Object(t)?n(t):o(t)}t.exports=F},9454:(t,u,e)=>{var r=e(/*! ./_baseGetTag */4239),n=e(/*! ./isObjectLike */7005),o="[object Arguments]";function a(t){return n(t)&&r(t)==o}t.exports=a},8749:(t,u,e)=>{var r=e(/*! ./_baseGetTag */4239),n=e(/*! ./isLength */1780),o=e(/*! ./isObjectLike */7005),a="[object Arguments]",i="[object Array]",c="[object Boolean]",F="[object Date]",l="[object Error]",s="[object Function]",f="[object Map]",p="[object Number]",d="[object Object]",v="[object RegExp]",y="[object Set]",b="[object String]",A="[object WeakMap]",g="[object ArrayBuffer]",m="[object DataView]",h="[object Float64Array]",j="[object Int8Array]",D="[object Int16Array]",O="[object Int32Array]",x="[object Uint8Array]",E="[object Uint8ClampedArray]",w="[object Uint16Array]",C="[object Uint32Array]",k={};function B(t){return o(t)&&n(t.length)&&!!k[r(t)]}k["[object Float32Array]"]=k[h]=k[j]=k[D]=k[O]=k[x]=k[E]=k[w]=k[C]=!0,k[a]=k[i]=k[g]=k[c]=k[m]=k[F]=k[l]=k[s]=k[f]=k[p]=k[d]=k[v]=k[y]=k[b]=k[A]=!1,t.exports=B},280:(t,u,e)=>{var r=e(/*! ./_isPrototype */5726),n=e(/*! ./_nativeKeys */6916),o=Object.prototype.hasOwnProperty;function a(t){if(!r(t))return n(t);var u=[];for(var e in Object(t))o.call(t,e)&&"constructor"!=e&&u.push(e);return u}t.exports=a},2545:t=>{function u(t,u){for(var e=-1,r=Array(t);++e<t;)r[e]=u(e);return r}t.exports=u},7518:t=>{function u(t){return function(u){return t(u)}}t.exports=u},4290:(t,u,e)=>{var r=e(/*! ./identity */6557);function n(t){return"function"==typeof t?t:r}t.exports=n},9291:(t,u,e)=>{var r=e(/*! ./isArrayLike */8612);function n(t,u){return function(e,n){if(null==e)return e;if(!r(e))return t(e,n);for(var o=e.length,a=u?o:-1,i=Object(e);(u?a--:++a<o)&&!1!==n(i[a],a,i););return e}}t.exports=n},5063:t=>{function u(t){return function(u,e,r){for(var n=-1,o=Object(u),a=r(u),i=a.length;i--;){var c=a[t?i:++n];if(!1===e(o[c],c,o))break}return u}}t.exports=u},1957:(t,u,e)=>{var r="object"==typeof e.g&&e.g&&e.g.Object===Object&&e.g;t.exports=r},9607:(t,u,e)=>{var r=e(/*! ./_Symbol */2705),n=Object.prototype,o=n.hasOwnProperty,a=n.toString,i=r?r.toStringTag:void 0;function c(t){var u=o.call(t,i),e=t[i];try{t[i]=void 0;var r=!0}catch(t){}var n=a.call(t);return r&&(u?t[i]=e:delete t[i]),n}t.exports=c},5776:t=>{var u=9007199254740991,e=/^(?:0|[1-9]\d*)$/;function r(t,r){var n=typeof t;return!!(r=null==r?u:r)&&("number"==n||"symbol"!=n&&e.test(t))&&t>-1&&t%1==0&&t<r}t.exports=r},5726:t=>{var u=Object.prototype;function e(t){var e=t&&t.constructor,r="function"==typeof e&&e.prototype||u;return t===r}t.exports=e},6916:(t,u,e)=>{var r=e(/*! ./_overArg */5569)(Object.keys,Object);t.exports=r},1167:(t,u,e)=>{t=e.nmd(t);var r=e(/*! ./_freeGlobal */1957),n=u&&!u.nodeType&&u,o=n&&t&&!t.nodeType&&t,a=o&&o.exports===n&&r.process,i=function(){try{var t=o&&o.require&&o.require("util").types;if(t)return t;return a&&a.binding&&a.binding("util")}catch(t){}}();t.exports=i},2333:t=>{var u=Object.prototype.toString;function e(t){return u.call(t)}t.exports=e},5569:t=>{function u(t,u){return function(e){return t(u(e))}}t.exports=u},5639:(t,u,e)=>{var r=e(/*! ./_freeGlobal */1957),n="object"==typeof self&&self&&self.Object===Object&&self,o=r||n||Function("return this")();t.exports=o},6073:(t,u,e)=>{t.exports=e(/*! ./forEach */4486)},4486:(t,u,e)=>{var r=e(/*! ./_arrayEach */7412),n=e(/*! ./_baseEach */9881),o=e(/*! ./_castFunction */4290),a=e(/*! ./isArray */1469);function i(t,u){return(a(t)?r:n)(t,o(u))}t.exports=i},6557:t=>{function u(t){return t}t.exports=u},5694:(t,u,e)=>{var r=e(/*! ./_baseIsArguments */9454),n=e(/*! ./isObjectLike */7005),o=Object.prototype,a=o.hasOwnProperty,i=o.propertyIsEnumerable,c=r(function(){return arguments}())?r:function(t){return n(t)&&a.call(t,"callee")&&!i.call(t,"callee")};t.exports=c},1469:t=>{var u=Array.isArray;t.exports=u},8612:(t,u,e)=>{var r=e(/*! ./isFunction */3560),n=e(/*! ./isLength */1780);function o(t){return null!=t&&n(t.length)&&!r(t)}t.exports=o},4144:(t,u,e)=>{t=e.nmd(t);var r=e(/*! ./_root */5639),n=e(/*! ./stubFalse */5062),o=u&&!u.nodeType&&u,a=o&&t&&!t.nodeType&&t,i=a&&a.exports===o?r.Buffer:void 0,c=(i?i.isBuffer:void 0)||n;t.exports=c},3560:(t,u,e)=>{var r=e(/*! ./_baseGetTag */4239),n=e(/*! ./isObject */3218),o="[object AsyncFunction]",a="[object Function]",i="[object GeneratorFunction]",c="[object Proxy]";function F(t){if(!n(t))return!1;var u=r(t);return u==a||u==i||u==o||u==c}t.exports=F},1780:t=>{var u=9007199254740991;function e(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=u}t.exports=e},3218:t=>{function u(t){var u=typeof t;return null!=t&&("object"==u||"function"==u)}t.exports=u},7005:t=>{function u(t){return null!=t&&"object"==typeof t}t.exports=u},6719:(t,u,e)=>{var r=e(/*! ./_baseIsTypedArray */8749),n=e(/*! ./_baseUnary */7518),o=e(/*! ./_nodeUtil */1167),a=o&&o.isTypedArray,i=a?n(a):r;t.exports=i},2353:t=>{function u(t){return void 0===t}t.exports=u},3674:(t,u,e)=>{var r=e(/*! ./_arrayLikeKeys */4636),n=e(/*! ./_baseKeys */280),o=e(/*! ./isArrayLike */8612);function a(t){return o(t)?r(t):n(t)}t.exports=a},5062:t=>{function u(){return!1}t.exports=u}},u={};function e(r){var n=u[r];if(void 0!==n)return n.exports;var o=u[r]={id:r,loaded:!1,exports:{}};return t[r](o,o.exports,e),o.loaded=!0,o.exports}(()=>{e.n=t=>{var u=t&&t.__esModule?()=>t.default:()=>t;return e.d(u,{a:u}),u}})(),(()=>{e.d=(t,u)=>{for(var r in u)e.o(u,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:u[r]})}})(),(()=>{e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(t){if("object"==typeof window)return window}}()})(),(()=>{e.o=(t,u)=>Object.prototype.hasOwnProperty.call(t,u)})(),(()=>{e.nmd=t=>(t.paths=[],t.children||(t.children=[]),t)})();var r={};(()=>{"use strict";/*!*********************************************************************!*\
  !*** ./app/src/entries/contentScript/documentStart.ts + 14 modules ***!
  \*********************************************************************/var t,u=e(6073),r=e.n(u);function n(t,u){var e=Error("".concat(u," - ").concat(t.message));return e.stack=t.stack,e}function o(t,u){(null==u||u>t.length)&&(u=t.length);for(var e=0,r=Array(u);e<u;e++)r[e]=t[e];return r}function a(t){if(Array.isArray(t))return t}function i(t){if(Array.isArray(t))return o(t)}function c(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function F(t,u){var e,r,n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o=[],a=!0,i=!1;try{for(n=n.call(t);!(a=(e=n.next()).done)&&(o.push(e.value),!u||o.length!==u);a=!0);}catch(t){i=!0,r=t}finally{try{a||null==n.return||n.return()}finally{if(i)throw r}}return o}}function l(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function f(t,u){return a(t)||F(t,u)||v(t,u)||l()}function p(t){return a(t)||c(t)||v(t)||l()}function d(t){return i(t)||c(t)||v(t)||s()}function v(t,u){if(t){if("string"==typeof t)return o(t,u);var e=Object.prototype.toString.call(t).slice(8,-1);if("Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return o(t,u)}}function y(t){var u=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=function(t,e){u&&t.apply(void 0,d(r(e)))},r=function(){var u,e,r,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],o=[];return 1===n.length?u=f(n,1)[0]:(u=void 0===(r=(e=p(n))[0])?"":r,o=e.slice(1)),["".concat(t," - ").concat(u)].concat(d(o))};return{debug:function(){for(var t=arguments.length,u=Array(t),r=0;r<t;r++)u[r]=arguments[r];e(console.debug,u)},log:function(){for(var t=arguments.length,u=Array(t),r=0;r<t;r++)u[r]=arguments[r];e(console.log,u)},info:function(){for(var t=arguments.length,u=Array(t),r=0;r<t;r++)u[r]=arguments[r];e(console.info,u)},warn:function(){for(var t=arguments.length,u=Array(t),r=0;r<t;r++)u[r]=arguments[r];e(console.warn,u)},error:function(){for(var t=arguments.length,u=Array(t),r=0;r<t;r++)u[r]=arguments[r];e(console.error,u)}}}var b=50,A=500,g=500,m="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",h=null,j=/src\s*=\s*["'][^"']+\/trace\/mail\/([0-9a-f]{40})\.png/,D=/<(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>/g,O=/\b((?!\.)((?!.*\.{2})[a-zA-Z0-9\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF\.!#$%&'*+-/=?^_`{|}~\-\d]+)@(?!\.)([a-zA-Z0-9\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF\-\.\d]+)((\.([a-zA-Z\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF]){2,})+))\b/gi,x={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"},E="mt-detrack-inspected",w="data-mt-skip-link",C=/<a href="https?:.*?"*>(.*?)<\/a>/g,k="mt-no-pointer-events",B="mt-thread",S="brc",P="mt-signature",T="mt-remove-signature-button",I="user-deleted",M="wrong-credentials",L="activationCloseCount",_={id:"",idLegacy:""},N=null,z="mailtrack-menu-opener",U=".mt-menu",Z="https://twitter.com/MailtrackStatus",R="[data-ogsr-up], header > div:nth-child(2) > div:nth-child(3)",q="show",H={left:123,right:20,top:50},G=new Map([["Message sent.","Message sent and tracked by Mailtrack."],["S'ha enviat el missatge.","El missatge s'ha enviat i trackejat amb Mailtrack."],["Mensaje enviado.","Mensaje enviado y trackeado con Mailtrack."],["Mensagem enviada.","Mensagem enviada e trackeada com Mailtrack."]]),K="star",W='.adn:not([style="display: none;"]) .zd:not([data-mt-item="mt-star"]), .adf:not([style="display: none;"]) .zd:not([data-mt-item="mt-star"])',$=".adn",J="mt-installed-msg",Q="MT_INSTALLED_MSG_SHOWN",V="thread",X="sent",Y="inbox",tt="compose",tu=".ah.aiv.aJS:last-child:not(.mt-replies)",te=/[0-9a-f]{40}(?:(\d+)\.png|\.png\?u=(\d+))/,tr="mt-people-view",tn="mt-schedule-view",to="bkK",ta="aim",ti="bsU",tc="TK",tF="mt-navEl",tl="TO",ts="".concat(tF,"__lists__icon"),tf="".concat(tF,"__schedule__icon"),tp="--active",td="ain",tv=null,ty="NQ",tb=".qj",tA="n1",tg="n0",tm=".".concat(ta,":not(.").concat(td,") ").concat(tb),th="mt-send",tj="mt-send-options",tD="mt-schedule",tO="mt-send-option-btn",tx="J-N-JT",tE="v7",tw=".Am.Al.editable.LW-avf",tC="mtComposer",tk="data-mt-composer",tB="[".concat(tk,"]"),tS="reminders@mailtrack.io",tP="notification@mailtrack.io",tT="title",tI="label/mailtrack+lists",tM="label/mailtrack+scheduled",tL='header form[role="search"]',t_='.T-I-KE[role="button"]:not(.aDV):not(.ti8ygd)',tN=null,tz=null,tU="gmail-scroll--overflow-y-auto",tZ=".BltHke[role=main]",tR="mt-gmail",tq=function(t){for(var u=RegExp(PIXEL_URL_REGEX,"g"),e=[],r=u.exec(t);null!==r;)e.push(r[1]),r=u.exec(t);return e};function tH(t,u,e){return u in t?Object.defineProperty(t,u,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[u]=e,t}function tG(t){for(var u=1;u<arguments.length;u++){var e=null!=arguments[u]?arguments[u]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(u){tH(t,u,e[u])})}return t}function tK(t,u){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);u&&(r=r.filter(function(u){return Object.getOwnPropertyDescriptor(t,u).enumerable})),e.push.apply(e,r)}return e}function tW(t,u){return u=null!=u?u:{},Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(u)):tK(Object(u)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(u,e))}),t}var t$=4,tJ="*",tQ="## hidden for privacy reasons ##",tV="".concat(tQ," - Seems an email"),tX="**privacy**",tY=null,t0=null,t1=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,t7=/^(\^|msg-a:|thread-a:)/,t3=function(t){return t.replace(t0,"").replace(tY,tJ)},t2=function(t){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t$;if(!t||"string"!=typeof t)return"";if(u<=0)return t3(t);u>=t.length&&(u=t.length/2);var e=t.length-u,r=t.slice(0,-u),n=t.slice(e);return"".concat(t3(r)).concat(n)},t9=function(t){return t2(t)},t8=function(t){if(!t||""===t)return"";var u=t.split(".");if(u.length<1)return"";var e=u.length;return 1===e?tX:u.reduce(function(t,u,r){return"".concat(t).concat(r>=e-1?u:"".concat(tX,"."))},"")},t4=function(t){var u;return"object"!=typeof t||null===t||Array.isArray(t)?t:tW(tG({},t),{subject:(null==t?void 0:t.subject)?tQ:void 0,sender:(null==t?void 0:t.sender)?t9(t.sender):void 0,recipients:(null==t?void 0:null===(u=t.recipients)||void 0===u?void 0:u.map(function(t){return{name:tQ,email:t9(null==t?void 0:t.email)}}))||void 0})},t5=function(t){return"string"!=typeof t?"":t.replace(/\/.*$/,"/".concat(tQ))},t6=function(t){var u=function(e){return"string"==typeof e?t(e):Array.isArray(e)?e.map(u):"object"==typeof e&&null!==e?Object.keys(e).reduce(function(r,n){var o=e[n];return Array.isArray(o)?(r[n]=o.map(u),r):"object"==typeof o&&null!==e?(r[n]=u(o),r):"string"==typeof o?(r[n]=t(o),r):(r[n]=o,r)},{}):e};return u},ut=function(t){return t6(function(t){if(t7.test(t)||!isNaN(Number(t)))return t;if(t1.test(t))return tV;var u=getPixelHashes(t);return"".concat(tQ," - length: ").concat(t.length," chars - contains ").concat(u.length," pixels")})(t)};function uu(t,u,e){return u in t?Object.defineProperty(t,u,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[u]=e,t}function ue(t,u){return null!=u&&"undefined"!=typeof Symbol&&u[Symbol.hasInstance]?!!u[Symbol.hasInstance](t):t instanceof u}function ur(t){for(var u=1;u<arguments.length;u++){var e=null!=arguments[u]?arguments[u]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(u){uu(t,u,e[u])})}return t}function un(t,u){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);u&&(r=r.filter(function(u){return Object.getOwnPropertyDescriptor(t,u).enumerable})),e.push.apply(e,r)}return e}function uo(t,u){return u=null!=u?u:{},Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(u)):un(Object(u)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(u,e))}),t}var ua=y("Logger"),ui="Generic error report ErrorToLogger";!function(t){t.Info="info",t.Error="error"}(t||(t={}));var uc=[],uF={},ul=function(t){uc.push(t)},us=function(t){uF=t},uf=function(t){uF=ur({},uF,t)},up=function(u,e){switch(u){case t.Error:return ud(e);case t.Info:return uv(e)}ud({error:"Invalid type error"})},ud=function(t){var u=t.error,e=ur({data:t.data},uF,uy());u&&ue(u,Error)||(u=uA(u)),uc.forEach(function(t){return t.error({error:u,data:e})})},uv=function(t){var u=ur({data:t.data},uF,uy());uc.forEach(function(e){return e.info({message:t.message,data:u})})},uy=function(){var t=navigator,u=t.connection,e={networkDownlinkBandwidth:null==u?void 0:u.downlink,networkEffectiveType:null==u?void 0:u.effectiveType,networkSaveData:null==u?void 0:u.saveData,networkType:null==u?void 0:u.type},r=uo(ur({deviceOnline:navigator.onLine},e),{deviceMemory:t.deviceMemory});return ur({},ub(),r)},ub=function(){return location?{locationHash:t5(location.hash),pathname:location.pathname,host:location.host,search:location.search}:{}},uA=function(t){return"string"==typeof t?Error("".concat(ui," - ").concat(t)):Error(ui)},ug=function(t,u){t.innerHTML=u},um=function(t,u){r()(u,function(u,e){var r;r=Array.isArray(u)?u.join(" "):u,t.setAttribute(e,r)})},uh=function(t,u){u&&t.appendChild(u)},uj=function(t){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;try{var o=document.createElement(t);return um(o,u),ug(o,e),uh(o,r),o}catch(t){ud({error:n(t,"CreateElement")})}},uD=e(2353),uO=e.n(uD),ux="NULL ids found",uE="Tracked mail without pixel",uw="Tracked mail with multiple pixels",uC="Tracked mail with wrong pixel",uk="Find element timeout",uB="Insert track data",uS="Textarea not found",uP="IndexedDB init",uT="IndexedDB persist",uI="Trying to remove hash from undefined",uM="Missing selector: ",uL="MAILTRACK_INITIALIZATION",u_="DraftId undefined in: ",uN="Extension context invalidated",uz="Empty legacy thread Id",uU="Wrong reply detected in LIST view",uZ="".concat(uU,":").concat(uz),uR="Error while parsing the full data response",uq=function(t){var u=t.selector,e=t.parent;return t.findAll?e.querySelectorAll(u):e.querySelector(u)},uH=function(t,u){var e=t.position,r=t.findAll;return null!==e?!uO()(u[e]):r?u.length>0:null!==u};function uG(t){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,o={selector:t,parent:u,findAll:r,position:n};return new Promise(function(r,n){var a=uq(o);if(uH(o,a))return r(a);var i=e?setTimeout(function(){c.disconnect(),n(Error("".concat(uk," - ").concat(t)))},e):null,c=new MutationObserver(function(){var t=uq(o);uH(o,t)&&(clearTimeout(i),c.disconnect(),r(t))});c.observe(u,{subtree:!0,childList:!0,attributes:!0,characterData:!1})})}function uK(){return"#".concat(tI)}function uW(t){return t.startsWith(uK())}function u$(t){return'\n        <div class="mt-list-loading-spinner visible">\n            <i class="mt-logo-icon"></i>\n            <div class="loading-bar"></div>\n            <span>'.concat(t,"</span>\n        </div>\n    ")}var uJ=function(t){var u=chrome.i18n.getMessage("loadingLists");t.appendChild(uj("div",{class:"mt-list-loading-spinner-container"},u$(u)))},uQ=".bkK",uV=function(){uG(uQ).then(function(t){return uJ(t)})};!function(){uW(location.hash)&&uV()}()})()})();