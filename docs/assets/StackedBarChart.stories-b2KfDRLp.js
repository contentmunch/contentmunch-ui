import{j as $}from"./jsx-runtime-D_zvdyIk.js";import{R as fn,r as B}from"./index-D4lIrffr.js";import{b as Dn,i as an,d as dn,e as In,f as hn,o as Sn,g as En,c as Q,a as Hn,s as gn}from"./transform-DzJepInR.js";function Y(n,t){return n==null||t==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function zn(n,t){return n==null||t==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function bn(n){let t,a,e;n.length!==2?(t=Y,a=(s,f)=>Y(n(s),f),e=(s,f)=>n(s)-f):(t=n===Y||n===zn?n:Bn,a=n,e=n);function r(s,f,l=0,d=s.length){if(l<d){if(t(f,f)!==0)return d;do{const c=l+d>>>1;a(s[c],f)<0?l=c+1:d=c}while(l<d)}return l}function i(s,f,l=0,d=s.length){if(l<d){if(t(f,f)!==0)return d;do{const c=l+d>>>1;a(s[c],f)<=0?l=c+1:d=c}while(l<d)}return l}function o(s,f,l=0,d=s.length){const c=r(s,f,l,d-1);return c>l&&e(s[c-1],f)>-e(s[c],f)?c-1:c}return{left:r,center:o,right:i}}function Bn(){return 0}function On(n){return n===null?NaN:+n}const jn=bn(Y),Ln=jn.right;bn(On).center;const Gn=Math.sqrt(50),Wn=Math.sqrt(10),qn=Math.sqrt(2);function U(n,t,a){const e=(t-n)/Math.max(0,a),r=Math.floor(Math.log10(e)),i=e/Math.pow(10,r),o=i>=Gn?10:i>=Wn?5:i>=qn?2:1;let s,f,l;return r<0?(l=Math.pow(10,-r)/o,s=Math.round(n*l),f=Math.round(t*l),s/l<n&&++s,f/l>t&&--f,l=-l):(l=Math.pow(10,r)*o,s=Math.round(n/l),f=Math.round(t/l),s*l<n&&++s,f*l>t&&--f),f<s&&.5<=a&&a<2?U(n,t,a*2):[s,f,l]}function _n(n,t,a){if(t=+t,n=+n,a=+a,!(a>0))return[];if(n===t)return[n];const e=t<n,[r,i,o]=e?U(t,n,a):U(n,t,a);if(!(i>=r))return[];const s=i-r+1,f=new Array(s);if(e)if(o<0)for(let l=0;l<s;++l)f[l]=(i-l)/-o;else for(let l=0;l<s;++l)f[l]=(i-l)*o;else if(o<0)for(let l=0;l<s;++l)f[l]=(r+l)/-o;else for(let l=0;l<s;++l)f[l]=(r+l)*o;return f}function rn(n,t,a){return t=+t,n=+n,a=+a,U(n,t,a)[2]}function Qn(n,t,a){t=+t,n=+n,a=+a;const e=t<n,r=e?rn(t,n,a):rn(n,t,a);return(e?-1:1)*(r<0?1/-r:r)}function Xn(n,t){let a;if(t===void 0)for(const e of n)e!=null&&(a<e||a===void 0&&e>=e)&&(a=e);else{let e=-1;for(let r of n)(r=t(r,++e,n))!=null&&(a<r||a===void 0&&r>=r)&&(a=r)}return a}function Yn(n,t,a){n=+n,t=+t,a=(r=arguments.length)<2?(t=n,n=0,1):r<3?1:+a;for(var e=-1,r=Math.max(0,Math.ceil((t-n)/a))|0,i=new Array(r);++e<r;)i[e]=n+e*a;return i}function Un(n){return n}var tn=1,en=2,on=3,G=4,mn=1e-6;function Zn(n){return"translate("+n+",0)"}function Jn(n){return"translate(0,"+n+")"}function Kn(n){return t=>+n(t)}function nt(n,t){return t=Math.max(0,n.bandwidth()-t*2)/2,n.round()&&(t=Math.round(t)),a=>+n(a)+t}function tt(){return!this.__axis}function Fn(n,t){var a=[],e=null,r=null,i=6,o=6,s=3,f=typeof window<"u"&&window.devicePixelRatio>1?0:.5,l=n===tn||n===G?-1:1,d=n===G||n===en?"x":"y",c=n===tn||n===on?Zn:Jn;function u(g){var p=e??(t.ticks?t.ticks.apply(t,a):t.domain()),x=r??(t.tickFormat?t.tickFormat.apply(t,a):Un),k=Math.max(i,0)+s,v=t.range(),M=+v[0]+f,E=+v[v.length-1]+f,N=(t.bandwidth?nt:Kn)(t.copy(),f),b=g.selection?g.selection():g,T=b.selectAll(".domain").data([null]),F=b.selectAll(".tick").data(p,t).order(),D=F.exit(),C=F.enter().append("g").attr("class","tick"),V=F.select("line"),A=F.select("text");T=T.merge(T.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),F=F.merge(C),V=V.merge(C.append("line").attr("stroke","currentColor").attr(d+"2",l*i)),A=A.merge(C.append("text").attr("fill","currentColor").attr(d,l*k).attr("dy",n===tn?"0em":n===on?"0.71em":"0.32em")),g!==b&&(T=T.transition(g),F=F.transition(g),V=V.transition(g),A=A.transition(g),D=D.transition(g).attr("opacity",mn).attr("transform",function(m){return isFinite(m=N(m))?c(m+f):this.getAttribute("transform")}),C.attr("opacity",mn).attr("transform",function(m){var S=this.parentNode.__axis;return c((S&&isFinite(S=S(m))?S:N(m))+f)})),D.remove(),T.attr("d",n===G||n===en?o?"M"+l*o+","+M+"H"+f+"V"+E+"H"+l*o:"M"+f+","+M+"V"+E:o?"M"+M+","+l*o+"V"+f+"H"+E+"V"+l*o:"M"+M+","+f+"H"+E),F.attr("opacity",1).attr("transform",function(m){return c(N(m)+f)}),V.attr(d+"2",l*i),A.attr(d,l*k).text(x),b.filter(tt).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",n===en?"start":n===G?"end":"middle"),b.each(function(){this.__axis=N})}return u.scale=function(g){return arguments.length?(t=g,u):t},u.ticks=function(){return a=Array.from(arguments),u},u.tickArguments=function(g){return arguments.length?(a=g==null?[]:Array.from(g),u):a.slice()},u.tickValues=function(g){return arguments.length?(e=g==null?null:Array.from(g),u):e&&e.slice()},u.tickFormat=function(g){return arguments.length?(r=g,u):r},u.tickSize=function(g){return arguments.length?(i=o=+g,u):i},u.tickSizeInner=function(g){return arguments.length?(i=+g,u):i},u.tickSizeOuter=function(g){return arguments.length?(o=+g,u):o},u.tickPadding=function(g){return arguments.length?(s=+g,u):s},u.offset=function(g){return arguments.length?(f=+g,u):f},u}function et(n){return Fn(on,n)}function at(n){return Fn(G,n)}function rt(n,t){t||(t=[]);var a=n?Math.min(t.length,n.length):0,e=t.slice(),r;return function(i){for(r=0;r<a;++r)e[r]=n[r]*(1-i)+t[r]*i;return e}}function it(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ot(n,t){var a=t?t.length:0,e=n?Math.min(a,n.length):0,r=new Array(e),i=new Array(a),o;for(o=0;o<e;++o)r[o]=sn(n[o],t[o]);for(;o<a;++o)i[o]=t[o];return function(s){for(o=0;o<e;++o)i[o]=r[o](s);return i}}function lt(n,t){var a=new Date;return n=+n,t=+t,function(e){return a.setTime(n*(1-e)+t*e),a}}function st(n,t){var a={},e={},r;(n===null||typeof n!="object")&&(n={}),(t===null||typeof t!="object")&&(t={});for(r in t)r in n?a[r]=sn(n[r],t[r]):e[r]=t[r];return function(i){for(r in a)e[r]=a[r](i);return e}}function sn(n,t){var a=typeof t,e;return t==null||a==="boolean"?Dn(t):(a==="number"?an:a==="string"?(e=hn(t))?(t=e,dn):In:t instanceof hn?dn:t instanceof Date?lt:it(t)?rt:Array.isArray(t)?ot:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?st:an)(n,t)}function ut(n,t){return n=+n,t=+t,function(a){return Math.round(n*(1-a)+t*a)}}function ct(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function Z(n,t){if(!isFinite(n)||n===0)return null;var a=(n=t?n.toExponential(t-1):n.toExponential()).indexOf("e"),e=n.slice(0,a);return[e.length>1?e[0]+e.slice(2):e,+n.slice(a+1)]}function j(n){return n=Z(Math.abs(n)),n?n[1]:NaN}function ft(n,t){return function(a,e){for(var r=a.length,i=[],o=0,s=n[0],f=0;r>0&&s>0&&(f+s+1>e&&(s=Math.max(1,e-f)),i.push(a.substring(r-=s,r+s)),!((f+=s+1)>e));)s=n[o=(o+1)%n.length];return i.reverse().join(t)}}function dt(n){return function(t){return t.replace(/[0-9]/g,function(a){return n[+a]})}}var ht=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function J(n){if(!(t=ht.exec(n)))throw new Error("invalid format: "+n);var t;return new un({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}J.prototype=un.prototype;function un(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}un.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function gt(n){n:for(var t=n.length,a=1,e=-1,r;a<t;++a)switch(n[a]){case".":e=r=a;break;case"0":e===0&&(e=a),r=a;break;default:if(!+n[a])break n;e>0&&(e=0);break}return e>0?n.slice(0,e)+n.slice(r+1):n}var K;function mt(n,t){var a=Z(n,t);if(!a)return K=void 0,n.toPrecision(t);var e=a[0],r=a[1],i=r-(K=Math.max(-8,Math.min(8,Math.floor(r/3)))*3)+1,o=e.length;return i===o?e:i>o?e+new Array(i-o+1).join("0"):i>0?e.slice(0,i)+"."+e.slice(i):"0."+new Array(1-i).join("0")+Z(n,Math.max(0,t+i-1))[0]}function wn(n,t){var a=Z(n,t);if(!a)return n+"";var e=a[0],r=a[1];return r<0?"0."+new Array(-r).join("0")+e:e.length>r+1?e.slice(0,r+1)+"."+e.slice(r+1):e+new Array(r-e.length+2).join("0")}const pn={"%":(n,t)=>(n*100).toFixed(t),b:n=>Math.round(n).toString(2),c:n=>n+"",d:ct,e:(n,t)=>n.toExponential(t),f:(n,t)=>n.toFixed(t),g:(n,t)=>n.toPrecision(t),o:n=>Math.round(n).toString(8),p:(n,t)=>wn(n*100,t),r:wn,s:mt,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function xn(n){return n}var Tn=Array.prototype.map,yn=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function wt(n){var t=n.grouping===void 0||n.thousands===void 0?xn:ft(Tn.call(n.grouping,Number),n.thousands+""),a=n.currency===void 0?"":n.currency[0]+"",e=n.currency===void 0?"":n.currency[1]+"",r=n.decimal===void 0?".":n.decimal+"",i=n.numerals===void 0?xn:dt(Tn.call(n.numerals,String)),o=n.percent===void 0?"%":n.percent+"",s=n.minus===void 0?"−":n.minus+"",f=n.nan===void 0?"NaN":n.nan+"";function l(c,u){c=J(c);var g=c.fill,p=c.align,x=c.sign,k=c.symbol,v=c.zero,M=c.width,E=c.comma,N=c.precision,b=c.trim,T=c.type;T==="n"?(E=!0,T="g"):pn[T]||(N===void 0&&(N=12),b=!0,T="g"),(v||g==="0"&&p==="=")&&(v=!0,g="0",p="=");var F=(u&&u.prefix!==void 0?u.prefix:"")+(k==="$"?a:k==="#"&&/[boxX]/.test(T)?"0"+T.toLowerCase():""),D=(k==="$"?e:/[%p]/.test(T)?o:"")+(u&&u.suffix!==void 0?u.suffix:""),C=pn[T],V=/[defgprs%]/.test(T);N=N===void 0?6:/[gprs]/.test(T)?Math.max(1,Math.min(21,N)):Math.max(0,Math.min(20,N));function A(m){var S=F,R=D,I,nn,H;if(T==="c")R=C(m)+R,m="";else{m=+m;var h=m<0||1/m<0;if(m=isNaN(m)?f:C(Math.abs(m),N),b&&(m=gt(m)),h&&+m==0&&x!=="+"&&(h=!1),S=(h?x==="("?x:s:x==="-"||x==="("?"":x)+S,R=(T==="s"&&!isNaN(m)&&K!==void 0?yn[8+K/3]:"")+R+(h&&x==="("?")":""),V){for(I=-1,nn=m.length;++I<nn;)if(H=m.charCodeAt(I),48>H||H>57){R=(H===46?r+m.slice(I+1):m.slice(I))+R,m=m.slice(0,I);break}}}E&&!v&&(m=t(m,1/0));var w=S.length+m.length+R.length,y=w<M?new Array(M-w+1).join(g):"";switch(E&&v&&(m=t(y+m,y.length?M-R.length:1/0),y=""),p){case"<":m=S+m+R+y;break;case"=":m=S+y+m+R;break;case"^":m=y.slice(0,w=y.length>>1)+S+m+R+y.slice(w);break;default:m=y+S+m+R;break}return i(m)}return A.toString=function(){return c+""},A}function d(c,u){var g=Math.max(-8,Math.min(8,Math.floor(j(u)/3)))*3,p=Math.pow(10,-g),x=l((c=J(c),c.type="f",c),{suffix:yn[8+g/3]});return function(k){return x(p*k)}}return{format:l,formatPrefix:d}}var X,Cn,An;pt({thousands:",",grouping:[3],currency:["$",""]});function pt(n){return X=wt(n),Cn=X.format,An=X.formatPrefix,X}function xt(n){return Math.max(0,-j(Math.abs(n)))}function Tt(n,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(j(t)/3)))*3-j(Math.abs(n)))}function yt(n,t){return n=Math.abs(n),t=Math.abs(t)-n,Math.max(0,j(t)-j(n))+1}function Pn(){var n=Sn().unknown(void 0),t=n.domain,a=n.range,e=0,r=1,i,o,s=!1,f=0,l=0,d=.5;delete n.unknown;function c(){var u=t().length,g=r<e,p=g?r:e,x=g?e:r;i=(x-p)/Math.max(1,u-f+l*2),s&&(i=Math.floor(i)),p+=(x-p-i*(u-f))*d,o=i*(1-f),s&&(p=Math.round(p),o=Math.round(o));var k=Yn(u).map(function(v){return p+i*v});return a(g?k.reverse():k)}return n.domain=function(u){return arguments.length?(t(u),c()):t()},n.range=function(u){return arguments.length?([e,r]=u,e=+e,r=+r,c()):[e,r]},n.rangeRound=function(u){return[e,r]=u,e=+e,r=+r,s=!0,c()},n.bandwidth=function(){return o},n.step=function(){return i},n.round=function(u){return arguments.length?(s=!!u,c()):s},n.padding=function(u){return arguments.length?(f=Math.min(1,l=+u),c()):f},n.paddingInner=function(u){return arguments.length?(f=Math.min(1,u),c()):f},n.paddingOuter=function(u){return arguments.length?(l=+u,c()):l},n.align=function(u){return arguments.length?(d=Math.max(0,Math.min(1,u)),c()):d},n.copy=function(){return Pn(t(),[e,r]).round(s).paddingInner(f).paddingOuter(l).align(d)},En.apply(c(),arguments)}function kt(n){return function(){return n}}function Nt(n){return+n}var kn=[0,1];function O(n){return n}function ln(n,t){return(t-=n=+n)?function(a){return(a-n)/t}:kt(isNaN(t)?NaN:.5)}function Vt(n,t){var a;return n>t&&(a=n,n=t,t=a),function(e){return Math.max(n,Math.min(t,e))}}function vt(n,t,a){var e=n[0],r=n[1],i=t[0],o=t[1];return r<e?(e=ln(r,e),i=a(o,i)):(e=ln(e,r),i=a(i,o)),function(s){return i(e(s))}}function Mt(n,t,a){var e=Math.min(n.length,t.length)-1,r=new Array(e),i=new Array(e),o=-1;for(n[e]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++o<e;)r[o]=ln(n[o],n[o+1]),i[o]=a(t[o],t[o+1]);return function(s){var f=Ln(n,s,1,e)-1;return i[f](r[f](s))}}function Rt(n,t){return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function St(){var n=kn,t=kn,a=sn,e,r,i,o=O,s,f,l;function d(){var u=Math.min(n.length,t.length);return o!==O&&(o=Vt(n[0],n[u-1])),s=u>2?Mt:vt,f=l=null,c}function c(u){return u==null||isNaN(u=+u)?i:(f||(f=s(n.map(e),t,a)))(e(o(u)))}return c.invert=function(u){return o(r((l||(l=s(t,n.map(e),an)))(u)))},c.domain=function(u){return arguments.length?(n=Array.from(u,Nt),d()):n.slice()},c.range=function(u){return arguments.length?(t=Array.from(u),d()):t.slice()},c.rangeRound=function(u){return t=Array.from(u),a=ut,d()},c.clamp=function(u){return arguments.length?(o=u?!0:O,d()):o!==O},c.interpolate=function(u){return arguments.length?(a=u,d()):a},c.unknown=function(u){return arguments.length?(i=u,c):i},function(u,g){return e=u,r=g,d()}}function Et(){return St()(O,O)}function bt(n,t,a,e){var r=Qn(n,t,a),i;switch(e=J(e??",f"),e.type){case"s":{var o=Math.max(Math.abs(n),Math.abs(t));return e.precision==null&&!isNaN(i=Tt(r,o))&&(e.precision=i),An(e,o)}case"":case"e":case"g":case"p":case"r":{e.precision==null&&!isNaN(i=yt(r,Math.max(Math.abs(n),Math.abs(t))))&&(e.precision=i-(e.type==="e"));break}case"f":case"%":{e.precision==null&&!isNaN(i=xt(r))&&(e.precision=i-(e.type==="%")*2);break}}return Cn(e)}function Ft(n){var t=n.domain;return n.ticks=function(a){var e=t();return _n(e[0],e[e.length-1],a??10)},n.tickFormat=function(a,e){var r=t();return bt(r[0],r[r.length-1],a??10,e)},n.nice=function(a){a==null&&(a=10);var e=t(),r=0,i=e.length-1,o=e[r],s=e[i],f,l,d=10;for(s<o&&(l=o,o=s,s=l,l=r,r=i,i=l);d-- >0;){if(l=rn(o,s,a),l===f)return e[r]=o,e[i]=s,t(e);if(l>0)o=Math.floor(o/l)*l,s=Math.ceil(s/l)*l;else if(l<0)o=Math.ceil(o*l)/l,s=Math.floor(s*l)/l;else break;f=l}return n},n}function $n(){var n=Et();return n.copy=function(){return Rt(n,$n())},En.apply(n,arguments),Ft(n)}function Nn(n,t){if((o=n.length)>1)for(var a=1,e,r,i=n[t[0]],o,s=i.length;a<o;++a)for(r=i,i=n[t[a]],e=0;e<s;++e)i[e][1]+=i[e][0]=isNaN(r[e][1])?r[e][0]:r[e][1]}function Vn(n){for(var t=n.length,a=new Array(t);--t>=0;)a[t]=t;return a}function Ct(n,t){return n[t]}function At(n){const t=[];return t.key=n,t}function Pt(){var n=Q([]),t=Vn,a=Nn,e=Ct;function r(i){var o=Array.from(n.apply(this,arguments),At),s,f=o.length,l=-1,d;for(const c of i)for(s=0,++l;s<f;++s)(o[s][l]=[0,+e(c,o[s].key,l,i)]).data=c;for(s=0,d=Hn(t(o));s<f;++s)o[d[s]].index=s;return a(o,d),o}return r.keys=function(i){return arguments.length?(n=typeof i=="function"?i:Q(Array.from(i)),r):n},r.value=function(i){return arguments.length?(e=typeof i=="function"?i:Q(+i),r):e},r.order=function(i){return arguments.length?(t=i==null?Vn:typeof i=="function"?i:Q(Array.from(i)),r):t},r.offset=function(i){return arguments.length?(a=i??Nn,r):a},r}const cn=({data:n,comparisonData:t,colorRange:a,toPercentage:e,withLegend:r,showOnlyValues:i})=>{const o=fn.createRef(),s=fn.createRef(),f=B.useCallback(()=>{const d=(()=>{const c={};c.totalField=n.totalField,c.titleField=n.titleField,c.stackFields=n.stackFields;const u=(p,x)=>{if(x){const k=x.toString().split(p);return k.length>1?k[1]:"*"}return"*"},g=(p,x)=>x?x.toString().split(p)[0]:null;if(t){c.values=[];let p="*",x=0;n.values.forEach((k,v)=>{if(c.values.push(k),n.titleSeparator){const M=v-x,E=g(n.titleSeparator,k[n.titleField]),N=t.values[M]?g(n.titleSeparator,t.values[M][n.titleField]):null;if(E===N)c.values.push(t.values[M]),p=u(n.titleSeparator,t.values[M][n.titleField]);else{const b={};b[c.titleField]=E+n.titleSeparator+p,c.values.push(b),x++}}else t.values[v]&&c.values.push(t.values[v])})}else c.values=n.values;return c})();if(d&&d.values&&d.values.length>0){const c=t?20:30,u=3,g={top:0,right:10,left:t?150:110},p=580,x=`0 0 ${p} ${d.values.length*c+20}`,k=d.values.length*c,v=p-g.left-g.right,M=["#4e79a7","#59a14f","#f28e2c","#e15759","#261759","#acd643","#daf2dc"],E=(h,w)=>e?h/w*100:h,N=(h,w)=>e?(h*w/100).toFixed(0):h,b=h=>{if(e){let w=0;return d.stackFields.forEach(y=>{w+=E(+h[y],+h[d.totalField])}),w}else return+h[d.totalField]},T=h=>e?h.toFixed(0)+"%":h.toString(),F=()=>{const h=Xn(d.values,w=>b(w));return h===void 0?0:+h.toFixed(0)},D=Pt().keys(d.stackFields).value((h,w)=>E(h[w],h[d.totalField])),C=Pn().rangeRound([0,k]).paddingInner(.2).align(.1).domain(d.values.map(h=>h[d.titleField])),V=$n().rangeRound([0,v]).domain([0,F()]).nice(),A=Sn().range(a||M).domain(d.stackFields),m=h=>{if(h==null)return"";const w=a?a.findIndex(y=>y===h):M.findIndex(y=>y===h);return w>-1&&w<d.stackFields.length?d.stackFields[w]:""},S=gn(o.current).attr("viewBox",x);S.selectAll("g").remove();const R=S.append("g").attr("transform",`translate(${g.left},${g.top})`),H=R.append("g").selectAll("g").data(D(d.values)).join("g").attr("fill-opacity",.9).attr("fill",h=>A(h.key)).selectAll("rect").data(h=>h).enter();if(H.append("rect").classed("bar-rectangle",!0).attr("y",(h,w)=>C(h.data[d.titleField])-(t&&w%2===1?u:0)).attr("x",h=>V(h[0])).attr("width",h=>V(h[1])-V(h[0])).attr("height",C.bandwidth()).append("title").text((h,w,y)=>{var q,_;const P=(_=(q=y[w].parentNode)==null?void 0:q.parentElement)==null?void 0:_.getAttribute("fill"),z=m(P),L=h[1]-h[0];return i?`${z}: ${N(L,h.data[d.totalField])}`:`${z}: ${e?T(L):""} (${N(L,h.data[d.totalField])} of ${h.data[d.totalField]})`}),H.append("text").text((h,w,y)=>{const P=h[1]-h[0],z=V(h[1])-V(h[0]),L=i?`${N(P,h.data[d.totalField])}`:`${T(P)} (${N(P,h.data[d.totalField])} of ${h.data[d.totalField]})`,q=`${P} of ${h.data[d.totalField]}`,_=50;return e?z>_?L:"":z>30?q:""}).classed("bar-text",!0).attr("y",(h,w)=>C(h.data[d.titleField])+c/2-(t&&w%2===1?u:0)).attr("text-anchor","end").attr("x",h=>{const w=V(h[1])-V(h[0]);return V(h[0])+w-5}),R.append("g").attr("class","axis").attr("transform",()=>"translate(0,0)").call(at(C).tickSizeOuter(0)),i||R.append("g").attr("class","axis").attr("transform","translate(0,"+k+")").call(et(V).tickFormat(h=>T(h.valueOf()))),r){const h=`0 0 45 ${d.stackFields.length*8}`,w=gn(s.current).attr("viewBox",h);w.selectAll("g").remove(),w.selectAll("text").remove(),w.attr("text-anchor","end");const y=w.selectAll("g").data(d.stackFields.slice()).join("g").attr("transform",(P,z)=>"translate("+g.right+","+z*7+")");y.append("rect").attr("fill-opacity",.9).attr("x",28).attr("width",6).attr("height",6).attr("fill",P=>A(P)),y.append("text").attr("x",26).attr("dy","0.24rem").text(P=>P)}}},[o,s,n,a,e,t,r]);return B.useEffect(()=>{f()},[f]),$.jsxs("div",{className:"muncher-bar-chart",children:[$.jsx("svg",{ref:o,className:"svg-bar-chart"}),r?$.jsx("svg",{className:"svg-bar-chart-legend",ref:s}):""]})};cn.__docgenInfo={description:"",methods:[],displayName:"StackedBarChart",props:{data:{required:!0,tsType:{name:"StackedBarChartData"},description:""},comparisonData:{required:!1,tsType:{name:"StackedBarChartData"},description:""},toPercentage:{required:!1,tsType:{name:"boolean"},description:""},colorRange:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},withLegend:{required:!1,tsType:{name:"boolean"},description:""},showOnlyValues:{required:!1,tsType:{name:"boolean"},description:""}}};const zt={title:"Visualization/BarChart",component:cn,parameters:{layout:"fullscreen"}},W=()=>{const n=[[{Title:"Scholars Rooftop",Renewal:8,New:5,Extension:0,Vacant:0,Total:13},{Title:"Scholars Rock",Renewal:50,New:44,Extension:0,Vacant:0,Total:94},{Title:"Huntington Gardens",Renewal:25,New:4,Extension:0,Vacant:4,Total:33},{Title:"Covenanter Hill",Renewal:114,New:79,Extension:0,Vacant:3,Total:196},{Title:"MeadowCreek",Renewal:165,New:56,Extension:2,Vacant:6,Total:229},{Title:"Scholars Quad",Renewal:40,New:29,Extension:0,Vacant:3,Total:72},{Title:"Cov Affordable",Renewal:7,New:2,Extension:0,Vacant:2,Total:11},{Title:"Porto Flats",Renewal:25,New:15,Extension:0,Vacant:6,Total:46},{Title:"Cape Dutch Villas",Renewal:20,New:3,Extension:0,Vacant:1,Total:24},{Title:"Verona Park",Renewal:5,New:2,Extension:0,Vacant:1,Total:8},{Title:"HighGrove",Renewal:36,New:15,Extension:0,Vacant:7,Total:58},{Title:"SummerHouse",Renewal:67,New:58,Extension:0,Vacant:5,Total:130}],[{Title:"Cape Dutch Villas",Renewal:16,New:7,Extension:1,Vacant:2,Total:26},{Title:"Covenanter Hill",Renewal:99,New:96,Extension:1,Vacant:1,Total:197},{Title:"HighGrove",Renewal:23,New:22,Extension:1,Vacant:2,Total:48},{Title:"MeadowCreek",Renewal:154,New:74,Extension:1,Vacant:4,Total:233},{Title:"Scholars Quad",Renewal:36,New:36,Extension:0,Vacant:2,Total:74},{Title:"Scholars Rooftop",Renewal:5,New:8,Extension:0,Vacant:0,Total:13}],[{Title:"Cape Dutch Villas",Renewal:43,New:22,Extension:0,Vacant:35,Total:126},{Title:"Covenanter Hill",Renewal:56,New:33,Extension:1,Vacant:10,Total:100},{Title:"HighGrove",Renewal:60,New:30,Extension:8,Vacant:2,Total:100},{Title:"MeadowCreek",Renewal:70,New:17,Extension:6,Vacant:7,Total:100},{Title:"Scholars Quad",Renewal:80,New:12,Extension:2,Vacant:6,Total:100},{Title:"Scholars Rooftop",Renewal:52.5,New:30,Extension:7,Vacant:10.5,Total:100},{Title:"Porto Flats",Renewal:62.5,New:20,Extension:7,Vacant:10.5,Total:100},{Title:"Verona Park",Renewal:32.5,New:50,Extension:7,Vacant:10.5,Total:100}],[{Title:"Cape Dutch Villas",Renewal:43,New:22,Extension:0,Vacant:35,Total:126}],[{Title:"Cape Dutch Villas",Renewal:43,New:22,Extension:0,Vacant:35,Total:126},{Title:"Covenanter Hill",Renewal:56,New:33,Extension:1,Vacant:10,Total:100}]],[t,a]=B.useState(0),[e,r]=B.useState(!0),[i,o]=B.useState(!0),[s,f]=B.useState(!1),[l,d]=B.useState({titleField:"Title",totalField:"Total",stackFields:["Renewal","New","Extension","Vacant"],values:n[0]}),c=()=>{const p=(t+1)%n.length;d({...l,values:n[p]}),a(p)},u=()=>{r(!e)},g=()=>{f(!s)};return $.jsxs($.Fragment,{children:[$.jsx(cn,{data:l,toPercentage:e,withLegend:i,showOnlyValues:s}),$.jsx("button",{onClick:u,children:e?"To Data":"To Percent"}),"    ",$.jsx("button",{onClick:g,children:s?"Show Percentage":"Show only values"}),"    ",$.jsx("button",{onClick:c,children:"Change Data"}),"    ",$.jsx("button",{onClick:()=>{o(!i)},children:i?"Without Legend":"With Legend"})]})};W.__docgenInfo={description:"",methods:[],displayName:"Default"};var vn,Mn,Rn;W.parameters={...W.parameters,docs:{...(vn=W.parameters)==null?void 0:vn.docs,source:{originalSource:`() => {
  const initValue: FieldValue[][] = [[{
    "Title": "Scholars Rooftop",
    "Renewal": 8,
    "New": 5,
    "Extension": 0,
    "Vacant": 0,
    "Total": 13
  }, {
    "Title": "Scholars Rock",
    "Renewal": 50,
    "New": 44,
    "Extension": 0,
    "Vacant": 0,
    "Total": 94
  }, {
    "Title": "Huntington Gardens",
    "Renewal": 25,
    "New": 4,
    "Extension": 0,
    "Vacant": 4,
    "Total": 33
  }, {
    "Title": "Covenanter Hill",
    "Renewal": 114,
    "New": 79,
    "Extension": 0,
    "Vacant": 3,
    "Total": 196
  }, {
    "Title": "MeadowCreek",
    "Renewal": 165,
    "New": 56,
    "Extension": 2,
    "Vacant": 6,
    "Total": 229
  }, {
    "Title": "Scholars Quad",
    "Renewal": 40,
    "New": 29,
    "Extension": 0,
    "Vacant": 3,
    "Total": 72
  }, {
    "Title": "Cov Affordable",
    "Renewal": 7,
    "New": 2,
    "Extension": 0,
    "Vacant": 2,
    "Total": 11
  }, {
    "Title": "Porto Flats",
    "Renewal": 25,
    "New": 15,
    "Extension": 0,
    "Vacant": 6,
    "Total": 46
  }, {
    "Title": "Cape Dutch Villas",
    "Renewal": 20,
    "New": 3,
    "Extension": 0,
    "Vacant": 1,
    "Total": 24
  }, {
    "Title": "Verona Park",
    "Renewal": 5,
    "New": 2,
    "Extension": 0,
    "Vacant": 1,
    "Total": 8
  }, {
    "Title": "HighGrove",
    "Renewal": 36,
    "New": 15,
    "Extension": 0,
    "Vacant": 7,
    "Total": 58
  }, {
    "Title": "SummerHouse",
    "Renewal": 67,
    "New": 58,
    "Extension": 0,
    "Vacant": 5,
    "Total": 130
  }], [{
    "Title": "Cape Dutch Villas",
    "Renewal": 16,
    "New": 7,
    "Extension": 1,
    "Vacant": 2,
    "Total": 26
  }, {
    "Title": "Covenanter Hill",
    "Renewal": 99,
    "New": 96,
    "Extension": 1,
    "Vacant": 1,
    "Total": 197
  }, {
    "Title": "HighGrove",
    "Renewal": 23,
    "New": 22,
    "Extension": 1,
    "Vacant": 2,
    "Total": 48
  }, {
    "Title": "MeadowCreek",
    "Renewal": 154,
    "New": 74,
    "Extension": 1,
    "Vacant": 4,
    "Total": 233
  }, {
    "Title": "Scholars Quad",
    "Renewal": 36,
    "New": 36,
    "Extension": 0,
    "Vacant": 2,
    "Total": 74
  }, {
    "Title": "Scholars Rooftop",
    "Renewal": 5,
    "New": 8,
    "Extension": 0,
    "Vacant": 0,
    "Total": 13
  }], [{
    "Title": "Cape Dutch Villas",
    "Renewal": 43,
    "New": 22,
    "Extension": 0,
    "Vacant": 35,
    "Total": 126
  }, {
    "Title": "Covenanter Hill",
    "Renewal": 56,
    "New": 33,
    "Extension": 1,
    "Vacant": 10,
    "Total": 100
  }, {
    "Title": "HighGrove",
    "Renewal": 60,
    "New": 30,
    "Extension": 8,
    "Vacant": 2,
    "Total": 100
  }, {
    "Title": "MeadowCreek",
    "Renewal": 70,
    "New": 17,
    "Extension": 6,
    "Vacant": 7,
    "Total": 100
  }, {
    "Title": "Scholars Quad",
    "Renewal": 80,
    "New": 12,
    "Extension": 2,
    "Vacant": 6,
    "Total": 100
  }, {
    "Title": "Scholars Rooftop",
    "Renewal": 52.5,
    "New": 30,
    "Extension": 7,
    "Vacant": 10.5,
    "Total": 100
  }, {
    "Title": "Porto Flats",
    "Renewal": 62.5,
    "New": 20,
    "Extension": 7,
    "Vacant": 10.5,
    "Total": 100
  }, {
    "Title": "Verona Park",
    "Renewal": 32.5,
    "New": 50,
    "Extension": 7,
    "Vacant": 10.5,
    "Total": 100
  }], [{
    "Title": "Cape Dutch Villas",
    "Renewal": 43,
    "New": 22,
    "Extension": 0,
    "Vacant": 35,
    "Total": 126
  }], [{
    "Title": "Cape Dutch Villas",
    "Renewal": 43,
    "New": 22,
    "Extension": 0,
    "Vacant": 35,
    "Total": 126
  }, {
    "Title": "Covenanter Hill",
    "Renewal": 56,
    "New": 33,
    "Extension": 1,
    "Vacant": 10,
    "Total": 100
  }]];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toPercent, setToPercent] = useState(true);
  const [withLegend, setWithLegend] = useState(true);
  const [showOnlyValues, setShowOnlyValues] = useState(false);
  const [barData, setBarData] = useState<StackedBarChartData>({
    "titleField": "Title",
    "totalField": "Total",
    "stackFields": ["Renewal", "New", "Extension", "Vacant"],
    "values": initValue[0]
  });
  const handleButtonClicked = () => {
    const currentIndex = (selectedIndex + 1) % initValue.length;
    setBarData({
      ...barData,
      values: initValue[currentIndex]
    });
    setSelectedIndex(currentIndex);
  };
  const togglePercent = () => {
    setToPercent(!toPercent);
  };
  const toggleShowOnlyValues = () => {
    setShowOnlyValues(!showOnlyValues);
  };
  return <>
            <StackedBarChart data={barData} toPercentage={toPercent} withLegend={withLegend} showOnlyValues={showOnlyValues} />
            <button onClick={togglePercent}>{toPercent ? "To Data" : "To Percent"}</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={toggleShowOnlyValues}>{showOnlyValues ? "Show Percentage" : "Show only values"}</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleButtonClicked}>Change Data</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => {
      setWithLegend(!withLegend);
    }}>{withLegend ? "Without Legend" : "With Legend"}
            </button>
        </>;
}`,...(Rn=(Mn=W.parameters)==null?void 0:Mn.docs)==null?void 0:Rn.source}}};const Bt=["Default"];export{W as Default,Bt as __namedExportsOrder,zt as default};
