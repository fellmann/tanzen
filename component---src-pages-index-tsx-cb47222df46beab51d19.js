"use strict";(self.webpackChunkggc_distance=self.webpackChunkggc_distance||[]).push([[245],{3368:function(e,t){t.A=e=>setTimeout((()=>e.target.setSelectionRange(0,10)),1)},6508:function(e,t,r){function n(e){return Array.from({length:e},(()=>0))}function o(e){return Array.from({length:e},((e,t)=>t))}function l(e,t){return Array.from({length:e},(()=>n(t)))}r.d(t,{Jj:function(){return l},X3:function(){return n},mz:function(){return o}})},788:function(e,t,r){r.r(t),r.d(t,{default:function(){return U}});var n=r(6540),o=r(4635),l=r(4506),a=r(7813),s=r(3443),c=r(5169),i=r(7917),u=r(1247),m=r(8210),f=r(5556),p=r.n(f),d=r(6942),g=r.n(d),v=r(6331),b=["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"];function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},h.apply(this,arguments)}function k(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var y={bordered:p().bool,borderless:p().bool,className:p().string,cssModule:p().object,dark:p().bool,hover:p().bool,innerRef:p().oneOfType([p().func,p().string,p().object]),responsive:p().oneOfType([p().bool,p().string]),responsiveTag:v.Wx,size:p().string,striped:p().bool,tag:v.Wx};function j(e){var t=e.className,r=e.cssModule,o=e.size,l=e.bordered,a=e.borderless,s=e.striped,c=e.dark,i=e.hover,u=e.responsive,m=e.tag,f=void 0===m?"table":m,p=e.responsiveTag,d=void 0===p?"div":p,y=e.innerRef,j=k(e,b),E=(0,v.qO)(g()(t,"table",!!o&&"table-"+o,!!l&&"table-bordered",!!a&&"table-borderless",!!s&&"table-striped",!!c&&"table-dark",!!i&&"table-hover"),r),O=n.createElement(f,h({},j,{ref:y,className:E}));if(u){var A=(0,v.qO)(!0===u?"table-responsive":"table-responsive-".concat(u),r);return n.createElement(d,{className:A},O)}return O}j.propTypes=y;var E=j,O=r(3298),A=r(8444),w=r(3368),S=r(6508);r(6910);function x(e,t){if(0==e.length)return[];if(1==e.length)return[e];const r=e.sort(t),n=[];let o=0;for(let l=0;l<r.length;l=o){for(o=l+1;o<r.length&&0==t(r[l],r[o]);)o++;n.push(r.slice(l,o))}return n}function N(e,t,r){const n=(0,S.Jj)(t,r);let o=0;for(const l of e){for(let e=0;e<t;e++)for(let t=0;t<l.judges;t++)n[e][t+o]=l.marks[e][t];o+=l.judges}return n}function P(e){return{from:e,to:e}}function M(e){return e?(e.from+e.to)/2:0}function C(e,t,r){const n=Math.floor(e.judges/2)+1,o=[];for(let f=0;f<e.competitors;f++){const t=(0,S.X3)(e.competitors+1),r=(0,S.X3)(e.competitors+1);for(let n=0;n<e.judges;n++){var l,a;const o=null!==(l=null===(a=e.marks[f])||void 0===a?void 0:a[n])&&void 0!==l?l:0;if(o>0)for(let n=o;n<=e.competitors;n++)t[n]++,r[n]+=o}o[f]={majority:t,sum:r,index:f}}let s=t||(0,S.mz)(e.competitors);const c=(0,S.mz)(e.competitors).map((t=>(0,S.X3)(e.competitors+1).map((e=>{})))),i=[];let u=r||1,m=u;for(;s.length&&m<=e.competitors;){let e=x(s.map((e=>o[e])).map((e=>{const t=null==e?void 0:e.majority[m],r=c[(null==e?void 0:e.index)||0];return r&&(r[m]=0==t?"-":null==t?void 0:t.toString()),e})).filter((e=>((null==e?void 0:e.majority[m])||0)>=n)).map((e=>({index:e.index,majority:e.majority.slice(m),sum:e.sum.slice(m)}))),((e,t)=>{for(let r=0;r<e.majority.length;r++){const n=m+r;c[e.index][n]=e.majority[r].toString(),c[t.index][n]=t.majority[r].toString();const o=(t.majority[r]||0)-(e.majority[r]||0);if(o)return o;c[e.index][n]+=" ("+e.sum[r]+")",c[t.index][n]+=" ("+t.sum[r]+")";const l=(e.sum[r]||0)-(t.sum[r]||0);if(l)return l}return 0}));for(const t of e){for(const e of t)i[e.index]={from:u,to:u+t.length-1},s=s.filter((t=>t!=e.index));u+=t.length}m++}return{places:i,table:c}}function z(e){if("object"!=typeof e)return e;var t,r,n=Object.prototype.toString.call(e);if("[object Object]"===n){if(e.constructor!==Object&&"function"==typeof e.constructor)for(t in r=new e.constructor,e)e.hasOwnProperty(t)&&r[t]!==e[t]&&(r[t]=z(e[t]));else for(t in r={},e)"__proto__"===t?Object.defineProperty(r,t,{value:z(e[t]),configurable:!0,enumerable:!0,writable:!0}):r[t]=z(e[t]);return r}if("[object Array]"===n){for(t=e.length,r=Array(t);t--;)r[t]=z(e[t]);return r}return"[object Set]"===n?(r=new Set,e.forEach((function(e){r.add(z(e))})),r):"[object Map]"===n?(r=new Map,e.forEach((function(e,t){r.set(z(t),z(e))})),r):"[object Date]"===n?new Date(+e):"[object RegExp]"===n?((r=new RegExp(e.source,e.flags)).lastIndex=e.lastIndex,r):"[object DataView]"===n?new e.constructor(z(e.buffer)):"[object ArrayBuffer]"===n?e.slice(0):"Array]"===n.slice(-6)?new e.constructor(e):e}function D(e){const t=z(e);let r=0,n=[];const o=(0,S.X3)(t.competitors+1);for(let l=0;l<t.competitors;l++){n[l]=!0;for(let e=0;e<t.judges;e++){var a;const r=(null===(a=t.marks[l])||void 0===a?void 0:a[e])||0;if(r<=0||r>t.competitors){n[l]=!1;break}}if(n[l]){for(let e=0;e<t.judges;e++){var s;const r=(null===(s=t.marks[l])||void 0===s?void 0:s[e])||0;o[r]++}r++}}function c(e){const r=n.map(((e,t)=>e?-1:t)).filter((e=>e>=0));if(0==r.length)return;const a=r.filter(((t,r)=>r<e)),s=r.filter(((t,r)=>r>=e)),c=[];for(let n=t.competitors;n>0;n--)c.push.apply(c,(0,l.A)((0,S.X3)(t.judges-(o[n]||0)).map((()=>n))));for(const n of[a,s]){const e=(0,S.X3)(t.competitors);let r=(0,l.A)(n);for(let n=0;n<t.judges;n++){for(let o=0;o<r.length;o++){let l=t.marks[r[o]||0];const a=c.pop()||0;l&&(l[n]=a),e[r[o]||0]+=a}r=r.sort(((t,r)=>-(e[t]||0)+(e[r]||0)))}}}let i,u=[];const m={from:P(t.competitors),to:P(1)};for(let l=0;l<t.competitors;l++)n[l]?u[l]={from:P(t.competitors),to:P(1)}:u[l]=m;for(let l=0;l<=t.competitors-r;l++){c(l);const e=C(t);i=e.table;for(let r=0;r<t.competitors;r++){const t=e.places[r];if(!t)continue;const n=u[r];n&&(M(n.from)>M(t)&&(n.from=t),M(n.to)<M(t)&&(n.to=t))}}if(i&&r<t.competitors-1)for(let l=0;l<t.competitors;l++)n[l]||(i[l]=(0,S.X3)(t.competitors+1).map((e=>"")));return{table:i,places:u}}function T(e){const t=Object.assign({},e,{marks:(0,S.Jj)(e.competitors,e.judges)});for(let n=0;n<e.competitors;n++)for(let o=0;o<e.judges;o++){var r;t.marks[n][o]=(null===(r=e.marks[n])||void 0===r?void 0:r[o])||0}return t}const I=(0,a.sH)({competitors:6,judges:5,marks:[T({competitors:6,judges:5,marks:[]})],results:void 0,setMark(e,t,r,n){var o;const l=null===(o=this.marks[e])||void 0===o?void 0:o.marks[t];l&&(l[r]=n)},setCompetitors(e){this.competitors=e;for(let t=0;t<this.marks.length;t++)this.marks[t]=T(Object.assign({},this.marks[t],{competitors:Math.min(9,e)}))},setJudges(e){this.judges=e;for(let t=0;t<this.marks.length;t++)this.marks[t]=T(Object.assign({},this.marks[t],{judges:Math.min(11,e)}))},setDances(e){const t=[];for(let r=0;r<e;r++)t[r]=this.marks[r]||T({marks:[],judges:this.judges,competitors:this.competitors});this.marks=t},delete(){if(confirm("Alle Wertungen löschen?"))for(let e=0;e<this.marks.length;e++)this.marks[e]=T(Object.assign({},this.marks[e],{marks:[]}))},get valid(){const e=this.marks.map((e=>e.marks.map((e=>e.map((()=>!0)))))),t=this.marks.map((()=>!0));for(let o=0;o<this.marks.length;o++){const l=this.marks[o];if(l)for(let a=0;a<l.judges;a++){const s=[];for(let c=0;c<l.competitors;c++){var r,n;const i=(null===(r=l.marks[c])||void 0===r?void 0:r[a])||0;i<=0?t[o]=!1:i>l.competitors?(e[o][c][a]=!1,t[o]=!1):(null!==(n=s[i])&&void 0!==n?n:-1)>=0&&(e[o][c][a]=!1,e[o][s[i]][a]=!1,t[o]=!1),s[i]=c}}}return{danceValid:t,valid:e}}}),R="undefined"!=typeof window&&window.localStorage.getItem("final");if(R){const e=JSON.parse(R);Object.assign(I,e)}(0,a.fm)((()=>{const e=JSON.stringify({marks:I.marks,judges:I.judges,competitors:I.competitors});localStorage.setItem("final",e)}),{delay:500}),(0,a.fm)((()=>{Date.now();const e=I.marks.map((e=>D(e))),t=I.valid.danceValid.map(((t,r)=>{var n,o;return t?{marks:I.marks[r],places:null===(n=e[r])||void 0===n||null===(o=n.places)||void 0===o?void 0:o.map((e=>e.from))}:null})).filter((e=>!!e)).map((e=>e)),r=t.length>1?function(e){var t;if(e.length<1)return;const r=(null===(t=e[0])||void 0===t?void 0:t.marks.competitors)||0;if(!r)return;const n=(0,S.X3)(r).map((e=>P(e+1))),o=(0,S.X3)(r),l=(0,S.Jj)(r,r+1),a=(0,S.Jj)(r,r+1),s=e.map((e=>e.marks.judges)).reduce(((e,t)=>e+t)),c={competitors:r,judges:s,marks:N(e.map((e=>e.marks)),r,s)};let i=[],u=[];const m=(0,S.Jj)(r,e.length+1).map((e=>e.map((()=>""))));for(let g=0;g<e.length;g++){const t=e[g];for(let e=0;e<r;e++){const n=M(t.places[e]);m[e][g]=n.toString(),o[e]+=n;for(let t=r;t>=n;t--)l[e][t]++,a[e][t]+=n}}for(let g=0;g<r;g++)m[g][e.length]=o[g].toString();const f=x((0,S.mz)(r),((e,t)=>o[e]-o[t]));let p=1;for(const g of f)if(1==g.length){const t=g[0];n[t]=P(p),m[t][e.length+1]=M(n[t]).toString(),p++}else{let t=g;const o=(0,S.X3)(r).map((()=>e.length+1));for(const r of t)m[r][e.length+1]="punktgleich für "+p+".";for(;t.length>0;){const e=x(t,((e,t)=>l[t][p]-l[e][p]))[0],r=x(e,((e,t)=>a[e][p]-a[t][p]))[0];if(1==r.length){const e=r[0];n[e]=P(p),m[e][o[e]+1]=M(n[e]).toString(),t=t.filter((t=>t!=e)),p++}else{for(const t of r)m[t][o[t]+1]="punktgleich für "+p+".";const e=C(c,r,p);for(let t=0;t<e.table.length;t++)for(let r=0;r<e.table[t].length;r++){var d;const n=e.table[t][r],o=(null===(d=i[t])||void 0===d?void 0:d[r])||"";e.table[t][r]=n>o?n:o}i=e.table;const l=x(r,((t,r)=>M(e.places[t])-M(e.places[r])));for(let r=0;r<l.length;r++){const a=l[r];if(r>0&&(l.length>2||a.length>1))for(const e of a)o[e]+=2;else{for(const r of a)n[r]={from:p,to:p+a.length-1},u[r]=e.places[r],m[r][o[r]+2]=M(n[r]).toString(),t=t.filter((e=>e!=r));p+=a.length}}}}}return{places:n,table:m,skatingTable:i,skatingPlaces:u}}(t):void 0,n={results:e,skating:r,dances:t.length};(0,a.h5)((()=>I.results=n))}),{delay:200});var J=I;const X=J;var W=(0,s.PA)((function(){return(0,n.useEffect)((()=>{document.title="Finalrechner Majoritäts- & Skatingsystem"}),[]),n.createElement(c.A,null,n.createElement("h1",null,"Finalrechner Majoritäts- & Skatingsystem"),n.createElement("p",null,"Die Wertungen werden automatisch gespeichert."),n.createElement(K,null),n.createElement("br",null),n.createElement(i.A,{onClick:()=>X.delete()},"Wertungen zurücksetzen"),X.marks.map(((e,t)=>n.createElement(_,{dance:t,key:t}))),n.createElement(F,null))}));const F=(0,s.PA)((function(){var e;return null!==(e=X.results)&&void 0!==e&&e.skating?n.createElement("div",{className:"dance-section"},n.createElement("h3",null,"Gesamtergebnis"),n.createElement(G,null),n.createElement("h5",{className:"mt-2 mb-0"},"Ergebnistabelle"),n.createElement(H,{table:(0,a.HO)(X.results.skating.table),places:X.results.skating.places}),!!X.results.skating.skatingTable.length&&n.createElement(n.Fragment,null,n.createElement("h5",{className:"mt-2 mb-0"},"Skatingtabelle"),n.createElement(V,{table:X.results.skating.skatingTable,places:X.results.skating.skatingPlaces}))):null})),_=(0,s.PA)((function(e){var t;const r=e.dance,o=null===(t=X.results)||void 0===t?void 0:t.results[r],{0:l,1:a}=(0,n.useState)((()=>!1));return n.createElement("div",{key:r,className:"dance-section"},X.marks.length>1&&n.createElement("h3",null,r+1,". Tanz"),n.createElement(B,{dance:r,places:null==o?void 0:o.places}),n.createElement("br",null),!(null==o||!o.table)&&n.createElement(n.Fragment,null,n.createElement(i.A,{size:"sm",onClick:()=>a(!l)},"Wertungstabelle"),n.createElement(u.A,{isOpen:l},n.createElement(V,{table:o.table,places:o.places}))))})),B=(0,s.PA)((function(e){const t=X.marks[e.dance];if(!t)return null;let r=e.dance*t.competitors*t.judges;const o=e=>{const t=document.getElementById("im"+e);null==t||t.focus(),null==t||t.select()};return n.createElement("div",{className:"mark-input"},n.createElement("table",{className:"mark-input"},n.createElement("tbody",null,t.marks.map(((l,a)=>n.createElement("tr",{className:"mark-row",key:a},n.createElement("td",{className:"mark-label"},"#",a+1),l.map(((s,c)=>{var i,u;const f=r++;return n.createElement("td",{className:"mark-input",key:c},n.createElement(m.A,{draggable:"false",onDragStart:e=>e.preventDefault(),style:{backgroundColor:!1===(null===(i=X.valid.valid[e.dance])||void 0===i||null===(u=i[a])||void 0===u?void 0:u[c])?"#fcc":void 0},onContextMenu:e=>e.preventDefault(),autoComplete:"off",id:"im"+f,inputMode:"numeric",pattern:"[0-9]*",key:c,value:s||"",onFocus:w.A,onKeyDown:e=>{l[c]||"Backspace"!=e.key?"ArrowUp"==e.key?(e.preventDefault(),o(f-X.judges)):"ArrowDown"==e.key?(e.preventDefault(),o(f+X.judges)):"ArrowRight"==e.key?(e.preventDefault(),o(f+1)):"ArrowLeft"==e.key&&(e.preventDefault(),o(f-1)):(e.preventDefault(),o(f-1))},onInput:r=>{const n=parseInt(r.currentTarget.value||"0");var o;n>=0&&n<=t.competitors&&(X.setMark(e.dance,a,c,n),n>0&&(null===(o=document.getElementById("im"+(f+1)))||void 0===o||o.focus()))}}))})),n.createElement("td",{className:"mark-label"},!!e.places&&q(e.places[a]))))))))}));function L(e){return null!=e&&e.from&&null!=e&&e.to?M(e).toLocaleString():"-"}function q(e){if(null==e||!e.from||null==e||!e.to)return"-";const t=M(e.from),r=M(e.to);return t==r?t.toLocaleString():t.toLocaleString()+"-"+r.toLocaleString()}const V=(0,s.PA)((function(e){var t;let{table:r,places:o}=e;return n.createElement(E,{bordered:!0,responsive:!0,size:"sm",className:"result-table"},n.createElement("thead",null,n.createElement("tr",null,n.createElement("th",null,"Nr."),null===(t=r[0])||void 0===t?void 0:t.map(((e,t)=>t>0&&n.createElement("th",{key:t},t>1?"1-"+t:t))),n.createElement("th",null,"Ergebnis"))),n.createElement("tbody",null,r.map(((e,t)=>{var r;return n.createElement("tr",{key:t},n.createElement("td",null,"#",t+1),e.map(((e,t)=>t>0&&n.createElement("td",{key:t},void 0===e?"—":e))),n.createElement("td",null,o.length>t&&!!o[t]&&("number"==typeof(null===(r=o[t])||void 0===r?void 0:r.from)?L(o[t]):q(o[t]))))}))))})),H=(0,s.PA)((function(e){var t;let{table:r,places:o}=e;const a=Math.max.apply(Math,(0,l.A)(r.map((e=>e.length)))),s=(null===(t=J.results)||void 0===t?void 0:t.dances)||0,c=a-s-2,i=(0,S.mz)(a);return n.createElement(E,{bordered:!0,responsive:!0,size:"sm",className:"result-table"},n.createElement("thead",null,n.createElement("tr",null,n.createElement("th",null,"Nr."),(0,S.mz)(s).map(((e,t)=>n.createElement("th",{key:t},t+1))),n.createElement("th",null,"Summe"),n.createElement("th",null,"Regel 9"),(0,S.mz)(c).map((e=>n.createElement("th",{key:e},"Regel ",10+e%2))),n.createElement("th",null,"Ergebnis"))),n.createElement("tbody",null,r.map(((e,t)=>n.createElement("tr",{key:t},n.createElement("td",null,"#",t+1),i.map((o=>{const l=e[o];let a=1;if(null!=l&&l.startsWith("punktgleich")){var s;if((null===(s=r[t-1])||void 0===s?void 0:s[o])==l)return null;for(;(null===(c=r[t+a])||void 0===c?void 0:c[o])==l;){var c;a++}}return n.createElement("td",{key:o,rowSpan:a},void 0===l?"—":l)})),n.createElement("td",null,L(o[t])))))))})),K=(0,s.PA)((function(){return n.createElement("div",{className:"final-inputs"},n.createElement("form",null,n.createElement(O.A,null,n.createElement(A.A,null,"Teilnehmer"),n.createElement(m.A,{inputMode:"numeric",pattern:"[0-9]*",value:X.competitors,onFocus:w.A,onChange:e=>{X.setCompetitors(parseInt(e.target.value||"0"))},style:{textAlign:"right"}})),n.createElement(O.A,null,n.createElement(A.A,null,"Wertungsrichter"),n.createElement(m.A,{inputMode:"numeric",pattern:"[0-9]*",value:X.judges,onFocus:w.A,onChange:e=>{X.setJudges(parseInt(e.target.value||"0"))},style:{textAlign:"right"}})),n.createElement(O.A,null,n.createElement(A.A,null,"Tänze"),n.createElement(m.A,{inputMode:"numeric",pattern:"[0-9]*",value:X.marks.length,onFocus:w.A,onChange:e=>X.setDances(parseInt(e.target.value||"0")),style:{textAlign:"right"}}))))})),G=(0,s.PA)((function(){var e,t,r;const o=null===(e=X.results)||void 0===e||null===(t=e.skating)||void 0===t?void 0:t.places,l=null===(r=X.results)||void 0===r?void 0:r.results;return o&&l?n.createElement("div",{className:"mark-input"},n.createElement("table",{className:"mark-input"},n.createElement("tbody",null,(0,S.mz)(X.competitors).map((e=>n.createElement("tr",{className:"mark-row",key:e},n.createElement("td",{className:"mark-label"},"#",e+1),(0,S.mz)(X.marks.length).map((t=>{var r,o;return n.createElement("td",{className:"mark-input",key:t},n.createElement("form",null,n.createElement(m.A,{value:X.valid.danceValid[t]&&M(null===(r=l[t])||void 0===r||null===(o=r.places[e])||void 0===o?void 0:o.from)||"",disabled:!0})))})),n.createElement("td",{className:"mark-label"},L(o[e])))))))):null}));function U(){return n.createElement(o.A,{title:"Majoritäts- und Skatingrechner"},n.createElement(W,null))}},7917:function(e,t,r){r.d(t,{A:function(){return E}});var n=r(6540),o=r(5556),l=r.n(o),a=r(6942),s=r.n(a),c=r(6331),i=["className","cssModule","variant","innerRef"];function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},u.apply(this,arguments)}function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var d={active:l().bool,"aria-label":l().string,onClick:l().func,variant:l().oneOf(["white"]),className:l().string,cssModule:l().object,innerRef:l().oneOfType([l().object,l().string,l().func])};function g(e){var t=e.className,r=(e.cssModule,e.variant),o=e.innerRef,l=p(e,i),a=(0,c.qO)(s()(t,"btn-close",r&&"btn-close-".concat(r)));return n.createElement("button",u({ref:o,type:"button",className:a},function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){f(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({"aria-label":"close"},l)))}g.propTypes=d;var v=g,b=["active","aria-label","block","className","close","cssModule","color","outline","size","tag","innerRef"];function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},h.apply(this,arguments)}function k(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var y={active:l().bool,"aria-label":l().string,block:l().bool,children:l().node,className:l().string,cssModule:l().object,close:l().bool,color:l().string,disabled:l().bool,innerRef:l().oneOfType([l().object,l().func,l().string]),onClick:l().func,outline:l().bool,size:l().string,tag:c.Wx};function j(e){var t=(0,n.useCallback)((function(t){if(!e.disabled)return e.onClick?e.onClick(t):void 0;t.preventDefault()}),[e.onClick,e.disabled]),r=e.active,o=e["aria-label"],l=e.block,a=e.className,i=e.close,u=e.cssModule,m=e.color,f=void 0===m?"secondary":m,p=e.outline,d=e.size,g=e.tag,y=void 0===g?"button":g,j=e.innerRef,E=k(e,b);if(i)return n.createElement(v,E);var O="btn".concat(p?"-outline":"","-").concat(f),A=(0,c.qO)(s()(a,"btn",O,!!d&&"btn-".concat(d),!!l&&"d-block w-100",{active:r,disabled:e.disabled}),u);return E.href&&"button"===y&&(y="a"),n.createElement(y,h({type:"button"===y&&E.onClick?"button":void 0},E,{className:A,ref:j,onClick:t,"aria-label":o}))}j.propTypes=y;var E=j},4598:function(e,t,r){var n=r(9039);e.exports=function(e,t){var r=[][e];return!!r&&n((function(){r.call(null,t||function(){return 1},1)}))}},7680:function(e,t,r){var n=r(9504);e.exports=n([].slice)},4488:function(e,t,r){var n=r(7680),o=Math.floor,l=function(e,t){var r=e.length;if(r<8)for(var a,s,c=1;c<r;){for(s=c,a=e[c];s&&t(e[s-1],a)>0;)e[s]=e[--s];s!==c++&&(e[s]=a)}else for(var i=o(r/2),u=l(n(e,0,i),t),m=l(n(e,i),t),f=u.length,p=m.length,d=0,g=0;d<f||g<p;)e[d+g]=d<f&&g<p?t(u[d],m[g])<=0?u[d++]:m[g++]:d<f?u[d++]:m[g++];return e};e.exports=l},6955:function(e,t,r){var n=r(2140),o=r(4901),l=r(2195),a=r(8227)("toStringTag"),s=Object,c="Arguments"===l(function(){return arguments}());e.exports=n?l:function(e){var t,r,n;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(r=function(e,t){try{return e[t]}catch(r){}}(t=s(e),a))?r:c?l(t):"Object"===(n=l(t))&&o(t.callee)?"Arguments":n}},4606:function(e,t,r){var n=r(6823),o=TypeError;e.exports=function(e,t){if(!delete e[t])throw new o("Cannot delete property "+n(t)+" of "+n(e))}},3709:function(e,t,r){var n=r(2839).match(/firefox\/(\d+)/i);e.exports=!!n&&+n[1]},3763:function(e,t,r){var n=r(2839);e.exports=/MSIE|Trident/.test(n)},3607:function(e,t,r){var n=r(2839).match(/AppleWebKit\/(\d+)\./);e.exports=!!n&&+n[1]},2140:function(e,t,r){var n={};n[r(8227)("toStringTag")]="z",e.exports="[object z]"===String(n)},655:function(e,t,r){var n=r(6955),o=String;e.exports=function(e){if("Symbol"===n(e))throw new TypeError("Cannot convert a Symbol value to a string");return o(e)}},6910:function(e,t,r){var n=r(6518),o=r(9504),l=r(9306),a=r(8981),s=r(6198),c=r(4606),i=r(655),u=r(9039),m=r(4488),f=r(4598),p=r(3709),d=r(3763),g=r(9519),v=r(3607),b=[],h=o(b.sort),k=o(b.push),y=u((function(){b.sort(void 0)})),j=u((function(){b.sort(null)})),E=f("sort"),O=!u((function(){if(g)return g<70;if(!(p&&p>3)){if(d)return!0;if(v)return v<603;var e,t,r,n,o="";for(e=65;e<76;e++){switch(t=String.fromCharCode(e),e){case 66:case 69:case 70:case 72:r=3;break;case 68:case 71:r=4;break;default:r=2}for(n=0;n<47;n++)b.push({k:t+n,v:r})}for(b.sort((function(e,t){return t.v-e.v})),n=0;n<b.length;n++)t=b[n].k.charAt(0),o.charAt(o.length-1)!==t&&(o+=t);return"DGBEFHACIJK"!==o}}));n({target:"Array",proto:!0,forced:y||!j||!E||!O},{sort:function(e){void 0!==e&&l(e);var t=a(this);if(O)return void 0===e?h(t):h(t,e);var r,n,o=[],u=s(t);for(n=0;n<u;n++)n in t&&k(o,t[n]);for(m(o,function(e){return function(t,r){return void 0===r?-1:void 0===t?1:void 0!==e?+e(t,r)||0:i(t)>i(r)?1:-1}}(e)),r=s(o),n=0;n<r;)t[n]=o[n++];for(;n<u;)c(t,n++);return t}})}}]);
//# sourceMappingURL=component---src-pages-index-tsx-cb47222df46beab51d19.js.map