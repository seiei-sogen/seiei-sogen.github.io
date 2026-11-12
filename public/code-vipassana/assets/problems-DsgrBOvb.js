var e={context:void 0,registry:void 0,effects:void 0,done:!1,getContextId(){return t(this.context.count)},getNextContextId(){return t(this.context.count++)}};function t(t){let n=String(t),r=n.length-1;return e.context.id+(r?String.fromCharCode(96+r):``)+n}function n(t){e.context=t}function r(){return{...e.context,id:e.getNextContextId(),count:0}}var i=(e,t)=>e===t,a=Symbol(`solid-proxy`),o=typeof Proxy==`function`,s=Symbol(`solid-track`),c={equals:i},l=null,u=ge,d=1,f=2,p={owned:null,cleanups:null,context:null,owner:null},m={},h=null,g=null,_=null,v=null,y=null,b=0;function x(e,t){let n=_,r=h,i=e.length===0,a=t===void 0?r:t,o=i?p:{owned:null,cleanups:null,context:a?a.context:null,owner:a},s=i?e:()=>e(ee(o));h=o,_=null;try{return z(s,!0)}finally{_=n,h=r}}function ee(e){return()=>E(()=>H(e))}function S(e,t){t=t?Object.assign({},c,t):c;let n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0};return[fe.bind(n),e=>(typeof e==`function`&&(e=g&&g.running&&g.sources.has(n)?e(n.tValue):e(n.value)),pe(n,e))]}function te(e,t,n){I(L(e,t,!0,d))}function C(e,t,n){I(L(e,t,!1,d))}function w(e,t,n){u=_e;let r=L(e,t,!1,d),i=F&&P(F);i&&(r.suspense=i),n&&n.render||(r.user=!0),y?y.push(r):I(r)}function T(e,t,n){n=n?Object.assign({},c,n):c;let r=L(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,I(r),fe.bind(r)}function ne(e){return e&&typeof e==`object`&&`then`in e}function re(t,n,r){let i,a,o;typeof n==`function`?(i=t,a=n,o=r||{}):(i=!0,a=t,o=n||{});let s=null,c=m,l=null,u=!1,d=!1,f=`initialValue`in o,p=typeof i==`function`&&T(i),v=new Set,[y,b]=(o.storage||S)(o.initialValue),[x,ee]=S(void 0),[C,w]=S(void 0,{equals:!1}),[re,ie]=S(f?`ready`:`unresolved`);h&&k(()=>{for(let e of v.keys())e.decrement();v.clear(),g&&s&&g.promises.delete(s),s=null}),e.context&&(l=e.getNextContextId(),o.ssrLoadFrom===`initial`?c=o.initialValue:e.load&&e.has(l)&&(c=e.load(l)));function D(e,t,n,r){return s===e&&(s=null,r!==void 0&&(f=!0),(e===c||t===c)&&o.onHydrated&&queueMicrotask(()=>o.onHydrated(r,{value:t})),c=m,g&&e&&u?(g.promises.delete(e),u=!1,z(()=>{g.running=!0,O(t,n)},!1)):O(t,n)),t}function O(e,t){z(()=>{t===void 0&&b(()=>e),ie(t===void 0?f?`ready`:`unresolved`:`errored`),ee(t);for(let e of v.keys())e.decrement();v.clear()},!1)}function A(){let e=F&&P(F),t=y(),n=x();if(n!==void 0&&!s)throw n;return _&&!_.user&&e&&te(()=>{C(),s&&(e.resolved&&g&&u?g.promises.add(s):v.has(e)||(e.increment(),v.add(e)))}),t}function j(e=!0){if(e!==!1&&d)return;d=!1;let t=p?p():i;if(u=g&&g.running,t==null||t===!1){D(s,E(y));return}g&&s&&g.promises.delete(s);let n,r=c===m?E(()=>{try{return a(t,{value:y(),refetching:e})}catch(e){n=e}}):c;if(n!==void 0)D(s,void 0,U(n),t);else return ne(r)?(s=r,`v`in r?(r.s===1?D(s,r.v,void 0,t):D(s,void 0,U(r.v),t),r):(d=!0,queueMicrotask(()=>d=!1),z(()=>{ie(f?`refreshing`:`pending`),w()},!1),r.then(e=>D(r,e,void 0,t),e=>D(r,void 0,U(e),t)))):(D(s,r,void 0,t),r)}Object.defineProperties(A,{state:{get:()=>re()},error:{get:()=>x()},loading:{get(){let e=re();return e===`pending`||e===`refreshing`}},latest:{get(){if(!f)return A();let e=x();if(e&&!s)throw e;return y()}}});let M=h;return p?te(()=>(M=h,j(!1))):j(!1),[A,{refetch:e=>ae(M,()=>j(e)),mutate:b}]}function ie(e){return z(e,!1)}function E(e){if(_===null)return e();let t=_;_=null;try{return e()}finally{_=t}}function D(e,t,n){let r=Array.isArray(e),i,a=n&&n.defer;return n=>{let o;if(r){o=Array(e.length);for(let t=0;t<e.length;t++)o[t]=e[t]()}else o=e();if(a)return a=!1,n;let s=E(()=>t(o,i,n));return i=o,s}}function O(e){w(()=>E(e))}function k(e){return h===null||(h.cleanups===null?h.cleanups=[e]:h.cleanups.push(e)),e}function A(e,t){l||=Symbol(`error`),h=L(void 0,void 0,!0),h.context={...h.context,[l]:[t]},g&&g.running&&g.sources.add(h);try{return e()}catch(e){W(e)}finally{h=h.owner}}function j(){return h}function ae(e,t){let n=h,r=_;h=e,_=null;try{return z(t,!0)}catch(e){W(e)}finally{h=n,_=r}}function M(e){if(g&&g.running)return e(),g.done;let t=_,n=h;return Promise.resolve().then(()=>{_=t,h=n;let r;return F&&(r=g||={sources:new Set,effects:[],promises:new Set,disposed:new Set,queue:new Set,running:!0},r.done||(r.done=new Promise(e=>r.resolve=e)),r.running=!0),z(e,!1),_=h=null,r?r.done:void 0})}var[oe,se]=S(!1);function ce(e){y.push.apply(y,e),e.length=0}function N(e,t){let n=Symbol(`context`);return{id:n,Provider:xe(n),defaultValue:e}}function P(e){let t;return h&&h.context&&(t=h.context[e.id])!==void 0?t:e.defaultValue}function le(e){let t=T(e),n=T(()=>G(t()));return n.toArray=()=>{let e=n();return Array.isArray(e)?e:e==null?[]:[e]},n}var F;function ue(){return F||=N()}function de(e){e.observerSlots=e.observers.map((t,n)=>{let r=t.sources;if(!r)return-1;for(let i=r.length-1;i>=0;i--)if(r[i]===e&&t.sourceSlots&&t.sourceSlots[i]===n)return i;return r.lastIndexOf(e)})}function fe(){let e=g&&g.running;if(this.sources&&(e?this.tState:this.state)){if((e?this.tState:this.state)===d)I(this);else{let e=v;v=null,z(()=>B(this),!1),v=e}}if(_){let e=this.observers;if(!e||e[e.length-1]!==_){let t=e?e.length:0;if(_.sources)_.sources.push(this),_.sourceSlots.push(t);else{let e=[this],n=[t];_.sources=e,_.sourceSlots=n}if(e)this.observerSlots&&this.observerSlots.length===e.length||de(this),e.push(_),this.observerSlots.push(_.sources.length-1);else{let e=[_],t=[_.sources.length-1];this.observers=e,this.observerSlots=t}}}return e&&g.sources.has(this)?this.tValue:this.value}function pe(e,t,n){let r=g&&g.running&&g.sources.has(e)?e.tValue:e.value;if(!e.comparator||!e.comparator(r,t)){if(g){let r=g.running;(r||!n&&g.sources.has(e))&&(g.sources.add(e),e.tValue=t),r||(e.value=t)}else e.value=t;e.observers&&e.observers.length&&z(()=>{for(let t=0;t<e.observers.length;t+=1){let n=e.observers[t],r=g&&g.running;r&&g.disposed.has(n)||((r?!n.tState:!n.state)&&(n.pure?v.push(n):y.push(n),n.observers&&ve(n)),r?n.tState=d:n.state=d)}if(v.length>1e6)throw v=[],Error()},!1)}return t}function I(e){if(!e.fn)return;H(e,!0);let t=b;me(e,g&&g.running&&g.sources.has(e)?e.tValue:e.value,t),g&&!g.running&&g.sources.has(e)&&queueMicrotask(()=>{z(()=>{g&&(g.running=!0),_=h=e,me(e,e.tValue,t),_=h=null},!1)})}function me(e,t,n){let r,i=h,a=_;_=h=e;try{r=e.fn(t)}catch(t){return e.pure&&(g&&g.running?(e.tState=d,e.tOwned&&e.tOwned.forEach(e=>H(e)),e.tOwned=void 0):(e.state=d,e.owned&&e.owned.forEach(e=>H(e)),e.owned=null)),e.updatedAt=n+1,W(t)}finally{_=a,h=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&`observers`in e?pe(e,r,!0):g&&g.running&&e.pure?(g.sources.has(e)||(e.value=r),g.sources.add(e),e.tValue=r):e.value=r,e.updatedAt=n)}function L(e,t,n,r=d,i){let a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:h,context:h?h.context:null,pure:n};return g&&g.running&&(a.state=0,a.tState=r),h===null||h!==p&&(g&&g.running&&h.pure?h.tOwned?h.tOwned.push(a):h.tOwned=[a]:h.owned?h.owned.push(a):h.owned=[a]),a}function R(e){let t=g&&g.running;if((t?e.tState:e.state)===0)return;if((t?e.tState:e.state)===f)return B(e);if(e.suspense&&E(e.suspense.inFallback))return e.suspense.effects.push(e);let n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<b);){if(t&&g.disposed.has(e))return;(t?e.tState:e.state)&&n.push(e)}for(let r=n.length-1;r>=0;r--){if(e=n[r],t){let t=e,i=n[r+1];for(;(t=t.owner)&&t!==i;)if(g.disposed.has(t))return}if((t?e.tState:e.state)===d)I(e);else if((t?e.tState:e.state)===f){let t=v;v=null,z(()=>B(e,n[0]),!1),v=t}}}function z(e,t){if(v)return e();let n=!1;t||(v=[]),y?n=!0:y=[],b++;try{let t=e();return he(n),t}catch(e){n||(y=null),v=null,W(e)}}function he(e){if(v&&=(ge(v),null),e)return;let t;if(g){if(!g.promises.size&&!g.queue.size){let e=g.sources,n=g.disposed;y.push.apply(y,g.effects),t=g.resolve;for(let e of y)`tState`in e&&(e.state=e.tState),delete e.tState;g=null,z(()=>{for(let e of n)H(e);for(let t of e){if(t.value=t.tValue,t.owned)for(let e=0,n=t.owned.length;e<n;e++)H(t.owned[e]);t.tOwned&&(t.owned=t.tOwned),delete t.tValue,delete t.tOwned,t.tState=0}se(!1)},!1)}else if(g.running){g.running=!1,g.effects.push.apply(g.effects,y),y=null,se(!0);return}}let n=y;y=null,n.length&&z(()=>u(n),!1),t&&t()}function ge(e){for(let t=0;t<e.length;t++)R(e[t])}function _e(t){let r,i=0;for(r=0;r<t.length;r++){let e=t[r];e.user?t[i++]=e:R(e)}if(e.context){if(e.count){e.effects||=[],e.effects.push(...t.slice(0,i));return}n()}for(e.effects&&(e.done||!e.count)&&(t=[...e.effects,...t],i+=e.effects.length,delete e.effects),r=0;r<i;r++)R(t[r])}function B(e,t){let n=g&&g.running;n?e.tState=0:e.state=0;for(let r=0;r<e.sources.length;r+=1){let i=e.sources[r];if(i.sources){let e=n?i.tState:i.state;e===d?i!==t&&(!i.updatedAt||i.updatedAt<b)&&R(i):e===f&&B(i,t)}}}function ve(e){let t=g&&g.running;for(let n=0;n<e.observers.length;n+=1){let r=e.observers[n];(t?!r.tState:!r.state)&&(t?r.tState=f:r.state=f,r.pure?v.push(r):y.push(r),r.observers&&ve(r))}}function V(e){g&&g.sources.has(e)&&(g.sources.delete(e),delete e.tValue)}function H(e,t){let n;if(e.sources)for(;e.sources.length;){let n=e.sources.pop(),r=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){n.observerSlots&&n.observerSlots.length===i.length||de(n);let e=i.pop(),t=n.observerSlots.pop();r<i.length&&(e.sourceSlots[t]=r,i[r]=e,n.observerSlots[r]=t)}t||i&&i.length||!g||V(n)}if(e.tOwned){for(n=e.tOwned.length-1;n>=0;n--)H(e.tOwned[n]);delete e.tOwned}if(g&&g.running&&e.pure)ye(e,!0);else if(e.owned){for(n=e.owned.length-1;n>=0;n--)H(e.owned[n]);e.owned=null}if(t||V(e),e.cleanups){for(n=e.cleanups.length-1;n>=0;n--)e.cleanups[n]();e.cleanups=null}g&&g.running?e.tState=0:e.state=0}function ye(e,t){if(t||(e.tState=0,g.disposed.add(e),V(e)),e.owned)for(let t=0;t<e.owned.length;t++)ye(e.owned[t])}function U(e){return e instanceof Error?e:Error(typeof e==`string`?e:`Unknown error`,{cause:e})}function be(e,t,n){try{for(let n of t)n(e)}catch(e){W(e,n&&n.owner||null)}}function W(e,t=h){let n=l&&t&&t.context&&t.context[l],r=U(e);if(!n)throw r;y?y.push({fn(){be(r,n,t)},state:d}):be(r,n,t)}function G(e){if(typeof e==`function`&&!e.length)return G(e());if(Array.isArray(e)){let t=[];for(let n=0;n<e.length;n++){let r=G(e[n]);if(Array.isArray(r)){if(r.length<32768)t.push.apply(t,r);else for(let e=0;e<r.length;e++)t.push(r[e])}else t.push(r)}return t}return e}function xe(e,t){return function(t){let n;return C(()=>n=E(()=>(h.context={...h.context,[e]:t.value},le(()=>t.children))),void 0),n}}var Se=Symbol(`fallback`);function Ce(e){for(let t=0;t<e.length;t++)e[t]()}function we(e,t,n={}){let r=[],i=[],a=[],o=0,c=t.length>1?[]:null;return k(()=>Ce(a)),()=>{let l=e()||[],u=l.length,d,f;return l[s],E(()=>{let e,t,s,m,h,g,_,v,y;if(u===0)o!==0&&(Ce(a),a=[],r=[],i=[],o=0,c&&=[]),n.fallback&&(r=[Se],i[0]=x(e=>(a[0]=e,n.fallback())),o=1);else if(o===0){for(i=Array(u),f=0;f<u;f++)r[f]=l[f],i[f]=x(p);o=u}else{for(s=Array(u),m=Array(u),c&&(h=Array(u)),g=0,_=Math.min(o,u);g<_&&r[g]===l[g];g++);for(_=o-1,v=u-1;_>=g&&v>=g&&r[_]===l[v];_--,v--)s[v]=i[_],m[v]=a[_],c&&(h[v]=c[_]);for(e=new Map,t=Array(v+1),f=v;f>=g;f--)y=l[f],d=e.get(y),t[f]=d===void 0?-1:d,e.set(y,f);for(d=g;d<=_;d++)y=r[d],f=e.get(y),f!==void 0&&f!==-1?(s[f]=i[d],m[f]=a[d],c&&(h[f]=c[d]),f=t[f],e.set(y,f)):a[d]();for(f=g;f<u;f++)f in s?(i[f]=s[f],a[f]=m[f],c&&(c[f]=h[f],c[f](f))):i[f]=x(p);i=i.slice(0,o=u),r=l.slice(0)}return i});function p(e){if(a[f]=e,c){let[e,n]=S(f);return c[f]=n,t(l[f],e)}return t(l[f])}}}var Te=!1;function Ee(){Te=!0}function De(t,i){if(Te&&e.context){let a=e.context;n(r());let o=E(()=>t(i||{}));return n(a),o}return E(()=>t(i||{}))}function K(){return!0}var q={get(e,t,n){return t===a?n:e.get(t)},has(e,t){return t===a||e.has(t)},set:K,deleteProperty:K,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:K,deleteProperty:K}},ownKeys(e){return e.keys()}};function J(e){return(e=typeof e==`function`?e():e)?e:{}}function Oe(){for(let e=0,t=this.length;e<t;++e){let t=this[e]();if(t!==void 0)return t}}function ke(...e){let t=!1;for(let n=0;n<e.length;n++){let r=e[n];t||=!!r&&a in r,e[n]=typeof r==`function`?(t=!0,T(r)):r}if(o&&t)return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){let r=J(e[n])[t];if(r!==void 0)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in J(e[n]))return!0;return!1},keys(){let t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(J(e[n])));return[...new Set(t)]}},q);let n={},r=Object.create(null);for(let t=e.length-1;t>=0;t--){let i=e[t];if(!i)continue;let a=Object.getOwnPropertyNames(i);for(let e=a.length-1;e>=0;e--){let t=a[e];if(t===`__proto__`||t===`constructor`)continue;let o=Object.getOwnPropertyDescriptor(i,t);if(!r[t])r[t]=o.get?{enumerable:!0,configurable:!0,get:Oe.bind(n[t]=[o.get.bind(i)])}:o.value===void 0?void 0:o;else{let e=n[t];e&&(o.get?e.push(o.get.bind(i)):o.value!==void 0&&e.push(()=>o.value))}}}let i={},s=Object.keys(r);for(let e=s.length-1;e>=0;e--){let t=s[e],n=r[t];n&&n.get?Object.defineProperty(i,t,n):i[t]=n?n.value:void 0}return i}function Ae(e,...t){let n=t.length;if(o&&a in e){let r=n>1?t.flat():t[0],i=new Set,a=t.map(t=>{let n=t.filter(e=>!i.has(e)&&(i.add(e),!0));return new Proxy({get(t){return n.includes(t)?e[t]:void 0},has(t){return n.includes(t)&&t in e},keys(){return n.filter(t=>t in e)}},q)});return a.push(new Proxy({get(t){return r.includes(t)?void 0:e[t]},has(t){return!r.includes(t)&&t in e},keys(){return Object.keys(e).filter(e=>!r.includes(e))}},q)),a}let r=[];for(let e=0;e<=n;e++)r[e]={};for(let i of Object.getOwnPropertyNames(e)){let a=n;for(let e=0;e<t.length;e++)if(t[e].includes(i)){a=e;break}let o=Object.getOwnPropertyDescriptor(e,i);!o.get&&!o.set&&o.enumerable&&o.writable&&o.configurable?r[a][i]=o.value:Object.defineProperty(r[a],i,o)}return r}function je(t){let r,i,a=()=>{if(!i){let e=i=t();e.then(e=>{r=()=>e.default},()=>{i===e&&(i=void 0)})}return i},o=t=>{let i=e.context;if(i){let[t,o]=S();e.count||=0,e.count++,a().then(t=>{!e.done&&n(i),e.count--,o(()=>t.default),n()},t=>{!e.done&&n(i),e.count--,o(()=>()=>{throw t}),n()}),r=t}else if(!r){let[e]=re(()=>a().then(e=>e.default));r=e,k(()=>{r===e&&(r=void 0)})}let o;return T(()=>(o=r?.())?E(()=>{if(!i||e.done)return o(t);let r=e.context;n(i);let a=o(t);return n(r),a}):``)};return o.preload=()=>a(),o}var Me=0;function Ne(){return e.context?e.getNextContextId():`cl-${Me++}`}var Pe=e=>`Stale read from <${e}>.`;function Fe(e){let t=`fallback`in e&&{fallback:()=>e.fallback};return T(we(()=>e.each,e.children,t||void 0))}function Ie(e){let t=e.keyed,n=T(()=>e.when,void 0,void 0),r=t?n:T(n,void 0,{equals:(e,t)=>!e==!t});return T(()=>{let i=r();if(i){let a=e.children;return typeof a==`function`&&a.length>0?E(()=>a(t?i:()=>{if(!E(r))throw Pe(`Show`);return n()})):a}return e.fallback},void 0,void 0)}function Le(e){let t=le(()=>e.children),n=T(()=>{let e=t(),n=Array.isArray(e)?e:[e],r=()=>void 0;for(let e=0;e<n.length;e++){let t=e,i=n[e],a=r,o=T(()=>a()?void 0:i.when,void 0,void 0),s=i.keyed?o:T(o,void 0,{equals:(e,t)=>!e==!t});r=()=>a()||(s()?[t,o,i]:void 0)}return r});return T(()=>{let t=n()();if(!t)return e.fallback;let[r,i,a]=t,o=a.children;return typeof o==`function`&&o.length>0?E(()=>o(a.keyed?i():()=>{if(E(n)()?.[0]!==r)throw Pe(`Match`);return i()})):o},void 0,void 0)}function Re(e){return e}var Y;function ze(t){let n;e.context&&e.load&&(n=e.load(e.getContextId()));let[r,i]=S(n,void 0);return Y||=new Set,Y.add(i),k(()=>Y.delete(i)),T(()=>{let e;if(e=r()){let n=t.fallback;return typeof n==`function`&&n.length?E(()=>n(e,()=>i())):n}return A(()=>t.children,i)},void 0,void 0)}var Be=N();function Ve(t){let r=0,i,a,o,s,c,[l,u]=S(!1),d=ue(),f={increment:()=>{++r===1&&u(!0)},decrement:()=>{--r===0&&u(!1)},inFallback:l,effects:[],resolved:!1},p=j();if(e.context&&e.load){let t=e.getContextId(),r=e.load(t);if(r&&(typeof r!=`object`||r.s!==1?o=r:e.gather(t)),o&&o!==`$$f`){let[r,i]=S(void 0,{equals:!1});s=r,o.then(()=>{if(e.done)return i();e.gather(t),n(a),i(),n()},e=>{c=e,i()})}}let m=P(Be);m&&(i=m.register(f.inFallback));let h;return k(()=>h&&h()),De(d.Provider,{value:f,get children(){return T(()=>{if(c)throw c;if(a=e.context,s){s(),s=void 0;return}a&&o===`$$f`&&n();let r=T(()=>t.children);return T(e=>{let s=f.inFallback(),{showContent:c=!0,showFallback:l=!0}=i?i():{};if((!s||o&&o!==`$$f`)&&c)return f.resolved=!0,h&&h(),h=a=o=void 0,ce(f.effects),r();if(l)return h?e:x(e=>(h=e,a&&=(n({id:a.id+`F`,count:0}),void 0),t.fallback),p)})})}})}var He=new Set([`className`,`value`,`readOnly`,`noValidate`,`formNoValidate`,`isMap`,`noModule`,`playsInline`,`adAuctionHeaders`,`allowFullscreen`,`browsingTopics`,`defaultChecked`,`defaultMuted`,`defaultSelected`,`disablePictureInPicture`,`disableRemotePlayback`,`preservesPitch`,`shadowRootClonable`,`shadowRootCustomElementRegistry`,`shadowRootDelegatesFocus`,`shadowRootSerializable`,`sharedStorageWritable`,...`allowfullscreen.async.alpha.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.hidden.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.adauctionheaders.browsingtopics.credentialless.defaultchecked.defaultmuted.defaultselected.defer.disablepictureinpicture.disableremoteplayback.preservespitch.shadowrootclonable.shadowrootcustomelementregistry.shadowrootdelegatesfocus.shadowrootserializable.sharedstoragewritable`.split(`.`)]),Ue=new Set([`innerHTML`,`textContent`,`innerText`,`children`]),We=Object.assign(Object.create(null),{className:`class`,htmlFor:`for`}),Ge=Object.assign(Object.create(null),{class:`className`,novalidate:{$:`noValidate`,FORM:1},formnovalidate:{$:`formNoValidate`,BUTTON:1,INPUT:1},ismap:{$:`isMap`,IMG:1},nomodule:{$:`noModule`,SCRIPT:1},playsinline:{$:`playsInline`,VIDEO:1},readonly:{$:`readOnly`,INPUT:1,TEXTAREA:1},adauctionheaders:{$:`adAuctionHeaders`,IFRAME:1},allowfullscreen:{$:`allowFullscreen`,IFRAME:1},browsingtopics:{$:`browsingTopics`,IMG:1},defaultchecked:{$:`defaultChecked`,INPUT:1},defaultmuted:{$:`defaultMuted`,AUDIO:1,VIDEO:1},defaultselected:{$:`defaultSelected`,OPTION:1},disablepictureinpicture:{$:`disablePictureInPicture`,VIDEO:1},disableremoteplayback:{$:`disableRemotePlayback`,AUDIO:1,VIDEO:1},preservespitch:{$:`preservesPitch`,AUDIO:1,VIDEO:1},shadowrootclonable:{$:`shadowRootClonable`,TEMPLATE:1},shadowrootdelegatesfocus:{$:`shadowRootDelegatesFocus`,TEMPLATE:1},shadowrootserializable:{$:`shadowRootSerializable`,TEMPLATE:1},sharedstoragewritable:{$:`sharedStorageWritable`,IFRAME:1,IMG:1}});function Ke(e,t){let n=Ge[e];return typeof n==`object`?n[t]?n.$:void 0:n}var qe=new Set([`beforeinput`,`click`,`dblclick`,`contextmenu`,`focusin`,`focusout`,`input`,`keydown`,`keyup`,`mousedown`,`mousemove`,`mouseout`,`mouseover`,`mouseup`,`pointerdown`,`pointermove`,`pointerout`,`pointerover`,`pointerup`,`touchend`,`touchmove`,`touchstart`]),Je=new Set(`altGlyph.altGlyphDef.altGlyphItem.animate.animateColor.animateMotion.animateTransform.circle.clipPath.color-profile.cursor.defs.desc.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.font.font-face.font-face-format.font-face-name.font-face-src.font-face-uri.foreignObject.g.glyph.glyphRef.hkern.image.line.linearGradient.marker.mask.metadata.missing-glyph.mpath.path.pattern.polygon.polyline.radialGradient.rect.set.stop.svg.switch.symbol.text.textPath.tref.tspan.use.view.vkern`.split(`.`)),Ye={xlink:`http://www.w3.org/1999/xlink`,xml:`http://www.w3.org/XML/1998/namespace`},Xe=e=>T(()=>e());function Ze(e,t,n){let r=n.length,i=t.length,a=r,o=0,s=0,c=t[i-1].nextSibling,l=null;for(;o<i||s<a;)if(t[o]===n[s])o++,s++;else{for(;t[i-1]===n[a-1];)i--,a--;if(i===o){let t=a<r?s?n[s-1].nextSibling:n[a-s]:c;for(;s<a;)e.insertBefore(n[s++],t)}else if(a===s)for(;o<i;)l&&l.has(t[o])||t[o].remove(),o++;else if(t[o]===n[a-1]&&n[s]===t[i-1]){let r=t[--i].nextSibling;e.insertBefore(n[s++],t[o++].nextSibling),e.insertBefore(n[--a],r),t[i]=n[a]}else{if(!l){l=new Map;let e=s;for(;e<a;)l.set(n[e],e++)}let r=l.get(t[o]);if(r!=null){if(s<r&&r<a){let c=o,u=1,d;for(;++c<i&&c<a&&(d=l.get(t[c]))!=null&&d===r+u;)u++;if(u>r-s){let i=t[o];for(;s<r;)e.insertBefore(n[s++],i)}else e.replaceChild(n[s++],t[o++])}else o++}else t[o++].remove()}}}var Qe=`_$DX_DELEGATE`;function $e(e,t,n,r={}){let i;return x(r=>{i=r,t===document?e():dt(t,e(),!n&&t.firstChild?null:void 0,n)},r.owner),()=>{i(),t.textContent=``}}function et(e,t,n,r){let i,a=()=>{let t=r?document.createElementNS(`http://www.w3.org/1998/Math/MathML`,`template`):document.createElement(`template`);return t.innerHTML=e,n?t.content.firstChild.firstChild:r?t.firstChild:t.content.firstChild},o=t?()=>E(()=>document.importNode(i||=a(),!0)):()=>(i||=a()).cloneNode(!0);return o.cloneNode=o,o}function tt(e,t=window.document){let n=t[Qe]||(t[Qe]=new Set);for(let r=0,i=e.length;r<i;r++){let i=e[r];n.has(i)||(n.add(i),t.addEventListener(i,xt))}}function nt(e,t,n){Z(e)||(e[t]=(t===`value`||t===`defaultValue`)&&(e.nodeName===`INPUT`||e.nodeName===`TEXTAREA`)?n??``:n)}function X(e,t,n){Z(e)||(n==null?e.removeAttribute(t):e.setAttribute(t,n))}function rt(e,t,n,r){Z(e)||(r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r))}function it(e,t,n){Z(e)||(n?e.setAttribute(t,``):e.removeAttribute(t))}function at(e,t){Z(e)||(t==null?e.removeAttribute(`class`):e.className=t)}function ot(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){let r=n[0];e.addEventListener(t,n[0]=t=>r.call(e,n[1],t))}else e.addEventListener(t,n,typeof n!=`function`&&n)}function st(e,t,n={}){let r=Object.keys(t||{}),i=Object.keys(n),a,o;for(a=0,o=i.length;a<o;a++){let r=i[a];r&&r!==`undefined`&&!t[r]&&(yt(e,r,!1),delete n[r])}for(a=0,o=r.length;a<o;a++){let i=r[a],o=!!t[i];i&&i!==`undefined`&&n[i]!==o&&o&&(yt(e,i,!0),n[i]=o)}return n}function ct(e,t,n){if(!t)return n?X(e,`style`):t;let r=e.style;if(typeof t==`string`)return r.cssText=t;typeof n==`string`&&(r.cssText=n=void 0),n||={},t||={};let i,a;for(a in n)t[a]??r.removeProperty(a),delete n[a];for(a in t)i=t[a],i!==n[a]&&(r.setProperty(a,i),n[a]=i);return n}function lt(e,t={},n,r){let i={};return r||C(()=>i.children=Q(e,t.children,i.children)),C(()=>typeof t.ref==`function`&&ut(t.ref,e)),C(()=>ft(e,t,n,!0,i,!0)),i}function ut(e,t,n){return E(()=>e(t,n))}function dt(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!=`function`)return Q(e,t,r,n);C(r=>Q(e,t(),r,n),r)}function ft(e,t,n,r,i={},a=!1){t||={};for(let r in i)if(!(r in t)){if(r===`children`)continue;i[r]=bt(e,r,null,i[r],n,a,t)}for(let o in t){if(o===`children`){r||Q(e,t.children);continue}let s=t[o];i[o]=bt(e,o,s,i[o],n,a,t)}}function pt(t,n,r={}){if(globalThis._$HY.done)return $e(t,n,[...n.childNodes],r);e.completed=globalThis._$HY.completed,e.events=globalThis._$HY.events,e.load=e=>globalThis._$HY.r[e],e.has=e=>e in globalThis._$HY.r,e.gather=e=>wt(n,e),e.registry=new Map,e.context={id:r.renderId||``,count:0};try{return wt(n,r.renderId),$e(t,n,[...n.childNodes],r)}finally{e.context=null}}function mt(t){let n,r;return!Z()||!(n=e.registry.get(r=Tt()))?t():(e.completed&&e.completed.add(n),e.registry.delete(r),n)}function ht(e,t){for(;e&&e.localName!==t;)e=e.nextSibling;return e}function gt(e){let t=e,n=0,r=[];if(Z(e))for(;t;){if(t.nodeType===8){let e=t.nodeValue;if(e===`$`)n++;else if(e===`/`){if(n===0)return[t,r];n--}}r.push(t),t=t.nextSibling}return[t,r]}function _t(){e.events&&!e.events.queued&&(queueMicrotask(()=>{let{completed:t,events:n}=e;if(n){for(n.queued=!1;n.length;){let[e,r]=n[0];if(!t.has(e))return;n.shift(),xt(r)}e.done&&(e.events=_$HY.events=null,e.completed=_$HY.completed=null)}}),e.events.queued=!0)}function Z(t){return!!e.context&&!e.done&&(!t||t.isConnected)}function vt(e){return e.toLowerCase().replace(/-([a-z])/g,(e,t)=>t.toUpperCase())}function yt(e,t,n){let r=t.trim().split(/\s+/);for(let t=0,i=r.length;t<i;t++)e.classList.toggle(r[t],n)}function bt(e,t,n,r,i,a,o){let s,c,l,u,d;if(t===`style`)return ct(e,n,r);if(t===`classList`)return st(e,n,r);if(n===r)return r;if(t===`ref`)a||n(e);else if(t.slice(0,3)===`on:`){let i=t.slice(3);r&&e.removeEventListener(i,r,typeof r!=`function`&&r),n&&e.addEventListener(i,n,typeof n!=`function`&&n)}else if(t.slice(0,10)===`oncapture:`){let i=t.slice(10);r&&e.removeEventListener(i,r,!0),n&&e.addEventListener(i,n,!0)}else if(t.slice(0,2)===`on`){let i=t.slice(2).toLowerCase(),a=qe.has(i);if(!a&&r){let t=Array.isArray(r)?r[0]:r;e.removeEventListener(i,t)}(a||n)&&(ot(e,i,n,a),a&&tt([i]))}else if(t.slice(0,5)===`attr:`)X(e,t.slice(5),n);else if(t.slice(0,5)===`bool:`)it(e,t.slice(5),n);else if((d=t.slice(0,5)===`prop:`)||(l=Ue.has(t))||!i&&((u=Ke(t,e.tagName))||(c=He.has(t)))||(s=e.nodeName.includes(`-`)||`is`in o)){if(d)t=t.slice(5),c=!0;else if(Z(e))return n;t===`class`||t===`className`?at(e,n):s&&!c&&!l?e[vt(t)]=n:(t===`value`||t===`defaultValue`)&&(e.nodeName===`INPUT`||e.nodeName===`TEXTAREA`)?e[u||t]=n??``:e[u||t]=n}else{let r=i&&t.indexOf(`:`)>-1&&Ye[t.split(`:`)[0]];r?rt(e,r,t,n):X(e,We[t]||t,n)}return n}function xt(t){if(e.registry&&e.events&&e.events.find(([e,n])=>n===t))return;let n=t.target,r=`$$${t.type}`,i=t.target,a=t.currentTarget,o=e=>Object.defineProperty(t,"target",{configurable:!0,value:e}),s=()=>{let e=n[r];if(e&&!n.disabled){let i=n[`${r}Data`];if(i===void 0?e.call(n,t):e.call(n,i,t),t.cancelBubble)return}return n.host&&typeof n.host!=`string`&&!n.host._$host&&n.contains(t.target)&&o(n.host),!0},c=()=>{for(;s()&&(n=n._$host||n.parentNode||n.host););};Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return n||document}}),e.registry&&!e.done&&(e.done=_$HY.done=!0);try{if(t.composedPath){let e=t.composedPath();o(e[0]);for(let t=0;t<e.length-2&&(n=e[t],s());t++){if(n._$host){n=n._$host,c();break}if(n.parentNode===a)break}}else c();o(i)}finally{t=n=null}}function Q(e,t,n,r,i){let a=Z(e);if(a){!n&&(n=[...e.childNodes]);let t=[];for(let e=0;e<n.length;e++){let r=n[e];r.nodeType===8&&r.data.slice(0,2)===`!$`?r.remove():t.push(r)}n=t}for(;typeof n==`function`;)n=n();if(t===n)return n;let o=typeof t,s=r!==void 0;if(e=s&&n[0]&&n[0].parentNode||e,o===`string`||o===`number`){if(a||o===`number`&&(t=t.toString(),t===n))return n;if(s){let i=n[0];i&&i.nodeType===3?i.data!==t&&(i.data=t):i=document.createTextNode(t),n=$(e,n,r,i)}else n=n!==``&&typeof n==`string`?e.firstChild.data=t:e.textContent=t}else if(t==null||o===`boolean`){if(a)return n;n=$(e,n,r)}else if(o===`function`)return C(()=>{let i=t();for(;typeof i==`function`;)i=i();n=Q(e,i,n,r)}),()=>n;else if(Array.isArray(t)){let o=[],c=n&&Array.isArray(n);if(St(o,t,n,i))return C(()=>n=Q(e,o,n,r,!0)),()=>n;if(a){if(!o.length)return n;if(r===void 0)return n=[...e.childNodes];let t=o[0];if(t.parentNode!==e)return n;let i=[t];for(;(t=t.nextSibling)!==r;)i.push(t);return n=i}if(o.length===0){if(n=$(e,n,r),s)return n}else c?n.length===0?Ct(e,o,r):Ze(e,n,o):(n&&$(e),Ct(e,o));n=o}else if(t.nodeType){if(a&&t.parentNode)return n=s?[t]:t;if(Array.isArray(n)){if(s)return n=$(e,n,r,t);$(e,n,null,t)}else n==null||n===``||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}return n}function St(e,t,n,r){let i=!1;for(let a=0,o=t.length;a<o;a++){let o=t[a],s=n&&n[e.length],c;if(o!=null&&o!==!0&&o!==!1){if((c=typeof o)==`object`&&o.nodeType)e.push(o);else if(Array.isArray(o))i=St(e,o,s)||i;else if(c===`function`){if(r){for(;typeof o==`function`;)o=o();i=St(e,Array.isArray(o)?o:[o],Array.isArray(s)?s:[s])||i}else e.push(o),i=!0}else{let t=String(o);s&&s.nodeType===3&&s.data===t?e.push(s):e.push(document.createTextNode(t))}}}return i}function Ct(e,t,n=null){for(let r=0,i=t.length;r<i;r++)e.insertBefore(t[r],n)}function $(e,t,n,r){if(n===void 0)return e.textContent=``;let i=r||document.createTextNode(``);if(t.length){let r=!1;for(let a=t.length-1;a>=0;a--){let o=t[a];if(i!==o){let t=o.parentNode===e;!r&&!a?t?e.replaceChild(i,o):e.insertBefore(i,n):t&&o.remove()}else r=!0}}else e.insertBefore(i,n);return[i]}function wt(t,n){let r=t.querySelectorAll(`*[data-hk]`);for(let t=0;t<r.length;t++){let i=r[t],a=i.getAttribute(`data-hk`);n&&!a.startsWith(n)||e.registry.has(a)||e.registry.set(a,i)}}function Tt(){return e.getNextContextId()}function Et(t){return e.context?void 0:t.children}var Dt=`http://www.w3.org/2000/svg`;function Ot(e,t=!1,n=void 0){return t?document.createElementNS(Dt,e):document.createElement(e,{is:n})}var kt=(...e)=>(Ee(),pt(...e));function At(t,n){let r=T(t);return T(()=>{let t=r();switch(typeof t){case`function`:return E(()=>t(n));case`string`:let r=Je.has(t),i=e.context?mt():Ot(t,r,E(()=>n.is));return lt(i,n,r),i}})}function jt(e){let[,t]=Ae(e,[`component`]);return At(()=>e.component,t)}var Mt={id:`001-clsx`,level:`beginner`,kind:`output`,title:`clsx: 入れ子と falsy 値`,question:"`clsx('a', 0, ['b', [null, 'c', { d: true, e: 0 }]], { f: 1 }, 2)` の戻り値はどれか。",language:`js`,choices:[{text:'`"a b c d f 2"`',why:`0 は33行目、null は10行目、e: 0 は19行目でそれぞれ落ちる。数値 2 は5行目で文字列に足される。`},{text:'`"a 0 b c d f 2"`',why:"4行目より先に33行目の `if (tmp = arguments[i])` で 0 は falsy として捨てられる。"},{text:'`"a b c d e f 2"`',why:`オブジェクトはキーを全部並べるのではなく、19行目で値が truthy なキーだけを残す。`},{text:'`"a b f 2"`',why:`配列の要素は11行目で toVal を再帰的に呼ぶので、入れ子の配列の中身も展開される。`}],answer:0,evidenceLines:[5,10,19,33],source:{repo:`lukeed/clsx`,commit:`925494cf31bcd97d3337aacd34e659e80cae7fe2`,path:`src/index.js`,lines:[1,43],license:`MIT`,licenseKey:`clsx`,modified:!1}},Nt={id:`002-tiny-invariant`,level:`beginner`,kind:`intent`,title:`tiny-invariant: 本番で消えるメッセージ`,question:"19〜21行目で、本番（`isProduction` が true）のときはメッセージを使わず `prefix` だけで throw している。主なねらいはどれか。",language:`ts`,choices:[{text:`本番ビルドで23行目以降を到達しないコードとして削除させ、バンドルを小さくするため`,why:"24行目のコメントどおり。`NODE_ENV` が定数に置き換わると、20行目より後は消せるコードになる。"},{text:`エラーメッセージに含まれる内部情報を、本番のユーザーに見せないため`,why:`結果として表示はされないが、呼び出し側に書いたメッセージ文字列はバンドルに残る。隠す仕組みにはなっていない。`},{text:"本番では `condition` が常に真になるので、メッセージを組み立てる必要がないため",why:`13行目の判定は本番でも同じように行われる。偽なら20行目で throw される。`},{text:"`message` が関数のとき、本番で二重に呼ばれるのを防ぐため",why:"26行目で `message()` を呼ぶのはもともと1回だけ。二重呼び出しの問題はない。"}],answer:0,evidenceLines:[1,19,20,24],source:{repo:`alexreardon/tiny-invariant`,commit:`b5587cf4ba45e257bce49053c3345b6614324252`,path:`src/tiny-invariant.ts`,lines:[1,48],license:`MIT`,licenseKey:`tiny-invariant`,modified:!0,modification:`関数の前の JSDoc コメント（元の4〜18行目）を省略`}},Pt={id:`003-ms`,level:`beginner`,kind:`output`,title:`ms: 単位つき文字列のパース`,question:"次の `parse` の呼び出しのうち、`NaN` を返すものはどれか。",language:`ts`,choices:[{text:"`parse('1h30m')`",why:"正規表現は `^…$` で全体一致を求め、単位は1つしか書けない。`1h` の後ろの `30m` で一致に失敗する。"},{text:"`parse('.5s')`",why:"`\\d*` は0桁を許すので `.5` が数値として読める。500 を返す。"},{text:"`parse('10 MINUTES')`",why:"正規表現の `i` フラグで大文字も一致し、95行目で小文字にしてから switch する。600000 を返す。"},{text:"`parse('5  sec')`（空白2つ）",why:"数値と単位の間の ` *` は0個以上の空白を許す。5000 を返す。"}],answer:0,evidenceLines:[78,82,83],source:{repo:`vercel/ms`,commit:`4ff48cec099f0514c3e9bbca18706c9c21122bfb`,path:`src/index.ts`,lines:[71,147],license:`MIT`,licenseKey:`ms`,modified:!1}},Ft={id:`004-mitt`,level:`beginner`,kind:`line`,title:`mitt: ワイルドカードのハンドラ`,question:"`emitter.emit('foo', 42)` を呼んだとき、`emitter.on('*', h)` で登録したハンドラ `h` が実際に呼び出されるのは何行目か。",language:`ts`,choices:[{text:`118行目`,why:"`all.get('*')` で取り出した配列の各ハンドラを `handler(type, evt!)` で呼ぶ。"},{text:`109行目`,why:"これは `'foo'` に登録したハンドラの呼び出し。`on` は type ごとに別の配列に入れるので、`h` はここにいない。"},{text:`113行目`,why:"`'*'` のハンドラ配列を取り出しているだけで、まだ呼んでいない。"},{text:`69行目`,why:"`on` で配列に追加する行。登録であって呼び出しではない。"}],answer:0,evidenceLines:[113,118],source:{repo:`developit/mitt`,commit:`6b41670516ed8e8b738612f60491995470aa63b3`,path:`src/index.ts`,lines:[46,123],license:`MIT`,licenseKey:`mitt`,modified:!1}},It={id:`005-nanoid`,level:`intermediate`,kind:`intent`,title:`nanoid: 捨てられる乱数バイト`,question:"29行目で、`safeByteCutoff` 以上のバイトを捨てている（IDに使わない）のはなぜか。2行目の計算とあわせて考えよ。",language:`js`,choices:[{text:"256 が `alphabet.length` で割り切れないとき、`%` の結果に偏りが出て一部の文字が出やすくなるのを防ぐため",why:`2行目の cutoff は length の倍数。0〜cutoff-1 のバイトだけを使えば、どの文字もちょうど同じ数のバイトに対応する。`},{text:"`bytes[i] % alphabet.length` が `alphabet` の範囲外を指すのを防ぐため",why:"`%` の結果は常に 0〜length-1 で、範囲外にはならない。"},{text:"捨てることで `getRandom` の呼び出し回数を減らし、速くするため",why:`逆に、捨てた分だけバイトが余計に要る。24行目で多めに要求しているのはそれを補うため。`},{text:"4行目の分岐と同じく、`%` を使わず `&` だけで計算を済ませるため",why:"30行目は `%` を使っている。`&` で済むのは4行目の分岐（長さが2のべき乗）のときだけ。"}],answer:0,evidenceLines:[2,29,30],source:{repo:`ai/nanoid`,commit:`055d1700cc67ac843e3efb5235d806b419ec7b2b`,path:`index.js`,lines:[26,84],license:`MIT`,licenseKey:`nanoid`,modified:!0,modification:`customRandom 関数だけを抜粋し、行コメントをすべて削除（答えがコメントに書いてあるため）`}},Lt={id:`006-debounce`,level:`intermediate`,kind:`output`,title:`debounce: 張り直されるタイマー`,question:"`const f = debounce(fn, 100)`（`immediate` なし）とし、`f()` を t = 0ms, 50ms, 120ms の3回だけ呼んだ。`fn` はいつ、何回実行されるか。タイマーは指定どおりの時刻に発火するものとする。",language:`js`,choices:[{text:`1回。t = 220ms に、3回目の呼び出しの引数で`,why:`最後の呼び出し（120ms）から100ms経った時点で初めて34行目の条件が偽になり、40行目で実行される。`},{text:`1回。t = 150ms に、2回目の呼び出しの引数で`,why:`56行目で3回目（120ms）も timestamp を更新する。150ms の later では経過が30msしかなく、またタイマーを張り直す。`},{text:`2回。t = 100ms と t = 220ms`,why:`100ms の later では最後の呼び出し（50ms）から50msしか経っておらず、34〜35行目でタイマーを張り直すだけ。`},{text:`3回。t = 100ms, 150ms, 220ms（各呼び出しの100ms後）`,why:`60行目で、タイマーが動いている間は新しいタイマーを作らない。タイマーは常に1本。`}],answer:0,evidenceLines:[32,34,35,56,60,61],source:{repo:`sindresorhus/debounce`,commit:`02f1816e7ec6982a0817ecfbb48756d11af9617f`,path:`index.js`,lines:[1,70],license:`MIT`,licenseKey:`debounce`,modified:!1}},Rt={id:`007-p-limit`,level:`intermediate`,kind:`line`,title:`p-limit: fn はどこで呼ばれるか`,question:"同時実行数に空きがあるとき、`limit(fn)` に渡した `fn` が実際に呼び出されるのは何行目か。",language:`js`,choices:[{text:`34行目`,why:"58行目の `.then` から呼ばれた `run` が、ここで `function_(...arguments_)` を実行する。"},{text:`23行目`,why:"この `.run()` は `queueItem.run`、つまり56行目で入れた `internalResolve`。32行目の `run` とは別物で、Promise を解決するだけ。"},{text:`58行目`,why:"`.then` にコールバックを登録しているだけ。呼ばれるのは Promise が解決された後のマイクロタスク。"},{text:`62行目`,why:"`resumeNext()` を呼び、その先の23行目で Promise を解決する。`fn` を直接は呼ばない。"}],answer:0,evidenceLines:[23,34,56,58],source:{repo:`sindresorhus/p-limit`,commit:`a8a6fbec4e0e866d6d779b10889bb4f5567e70eb`,path:`index.js`,lines:[1,68],license:`MIT`,licenseKey:`p-limit`,modified:!1}},zt={id:`008-dequal`,level:`intermediate`,kind:`bug`,title:`dequal: 修正前の深い比較`,question:"これは dequal の修正前のコードである。`const dict = () => Object.assign(Object.create(null), { x: 1 })` とする。次のうち正しく動かない（例外が出る、または誤った結果を返す）呼び出しはどれか。",language:`js`,choices:[{text:"`dequal(dict(), dict())`",why:"プロトタイプのないオブジェクトには `hasOwnProperty` がないので、19行目で TypeError になる。"},{text:"`dequal([1, 2], [1, 2, 3])`",why:"10行目で長さが違うと while を回さず、13行目で `len === -1` が偽になって false。正しい。"},{text:"`dequal(NaN, NaN)`",why:"NaN は falsy なので5行目を素通りし、26行目の `foo !== foo && bar !== bar` で true。正しい。"},{text:"`dequal(new Date(0), new Date(0))`",why:"6行目で `getTime()` を比べて true。正しい。"}],answer:0,evidenceLines:[5,16,18,19],source:{repo:`lukeed/dequal`,commit:`7d090f46192843c6b35eca37045e5c3832ad8fd6`,path:`src/index.js`,lines:[1,27],license:`MIT`,licenseKey:`dequal`,modified:!1}},Bt={id:`009-zustand`,level:`advanced`,kind:`intent`,title:`zustand: 参照比較で決まる「変化」`,question:"73行目では、状態を更新してリスナーに通知するかどうかを `Object.is(nextState, state)` だけで決めている。この設計の前提として最も適切なものはどれか。",language:`ts`,choices:[{text:`状態は書き換えず、変えるときは新しいオブジェクトを渡すという約束。だから参照が同じなら「変化なし」とみなせる`,why:`中身を見ずに O(1) で判定できる。約束を破って同じオブジェクトを書き換えて返すと、通知されない。`},{text:"`Object.is` はオブジェクトの中身まで比べるので、値が同じなら通知を省ける",why:"`Object.is` は参照の比較。中身が同じでも別のオブジェクトなら「変化あり」になる。"},{text:`78行目でマージした結果と元の state を比べ、差分があるときだけ通知する`,why:"比較（73行目）はマージ（78行目）より前。比べているのは渡された `nextState` そのもの。"},{text:"`NaN` や `-0` のような特殊な値を含む状態を、毎回「変化あり」として通知するため",why:"`Object.is(NaN, NaN)` は true。`===` と違い、NaN を同じ値とみなす比較。"}],answer:0,evidenceLines:[69,70,71,72,73,78,79],source:{repo:`pmndrs/zustand`,commit:`9fed2eb2f3af672da9f7bf694b996df3831fc207`,path:`src/vanilla.ts`,lines:[60,100],license:`MIT`,licenseKey:`zustand`,modified:!1}},Vt={id:`010-react-scheduler`,level:`advanced`,kind:`line`,title:`React Scheduler: 最小ヒープの順序`,question:"`siftDown` で、左右の子がどちらも `node` より小さいとき、小さいほうの子と入れ替えることでヒープの順序（親 ≤ 子）を保っている。その「小さいほう」を選んでいるのは何行目の判定か。",language:`js`,choices:[{text:`71行目`,why:`右の子が存在し、かつ右 < 左 なら右と、そうでなければ左と入れ替える。`},{text:`70行目`,why:"左の子が `node` より小さいかを見るだけで、左右の大小はまだ比べていない。"},{text:`80行目`,why:"左が `node` 以上のときに右だけを見る分岐。左右どちらも小さいケースはここに来ない。"},{text:`63行目`,why:`ループの継続条件。子を持つ位置（配列の前半）だけを回るための判定で、子どうしは比べない。`}],answer:0,evidenceLines:[70,71,72,73,74],source:{repo:`facebook/react`,commit:`cb7c59ecdb7b620ed3d6ce0bf669d7502daedf13`,path:`packages/scheduler/src/SchedulerMinHeap.js`,lines:[17,95],license:`MIT`,licenseKey:`react`,modified:!1}},Ht={code:`function toVal(mix) {
	var k, y, str='';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			var len=mix.length;
			for (k=0; k < len; k++) {
				if (mix[k]) {
					if (y = toVal(mix[k])) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (y in mix) {
				if (mix[y]) {
					str && (str += ' ');
					str += y;
				}
			}
		}
	}

	return str;
}

export function clsx() {
	var i=0, tmp, x, str='', len=arguments.length;
	for (; i < len; i++) {
		if (tmp = arguments[i]) {
			if (x = toVal(tmp)) {
				str && (str += ' ');
				str += x
			}
		}
	}
	return str;
}

export default clsx;`,lines:[`<span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">toVal</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#E36209;--d:#FFAB70">mix</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`	<span style="--l:#D73A49;--d:#F97583">var</span><span style="--l:#24292E;--d:#E1E4E8"> k, y, str</span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#032F62;--d:#9ECBFF">''</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">typeof</span><span style="--l:#24292E;--d:#E1E4E8"> mix </span><span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#032F62;--d:#9ECBFF">'string'</span> <span style="--l:#D73A49;--d:#F97583">||</span> <span style="--l:#D73A49;--d:#F97583">typeof</span><span style="--l:#24292E;--d:#E1E4E8"> mix </span><span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#032F62;--d:#9ECBFF">'number'</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		str </span><span style="--l:#D73A49;--d:#F97583">+=</span><span style="--l:#24292E;--d:#E1E4E8"> mix;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	} </span><span style="--l:#D73A49;--d:#F97583">else</span> <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">typeof</span><span style="--l:#24292E;--d:#E1E4E8"> mix </span><span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#032F62;--d:#9ECBFF">'object'</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`		<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (Array.</span><span style="--l:#6F42C1;--d:#B392F0">isArray</span><span style="--l:#24292E;--d:#E1E4E8">(mix)) {</span>`,`			<span style="--l:#D73A49;--d:#F97583">var</span><span style="--l:#24292E;--d:#E1E4E8"> len</span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8">mix.</span><span style="--l:#005CC5;--d:#79B8FF">length</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`			<span style="--l:#D73A49;--d:#F97583">for</span><span style="--l:#24292E;--d:#E1E4E8"> (k</span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">; k </span><span style="--l:#D73A49;--d:#F97583">&lt;</span><span style="--l:#24292E;--d:#E1E4E8"> len; k</span><span style="--l:#D73A49;--d:#F97583">++</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`				<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (mix[k]) {</span>`,`					<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (y </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#6F42C1;--d:#B392F0">toVal</span><span style="--l:#24292E;--d:#E1E4E8">(mix[k])) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">						str </span><span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span><span style="--l:#24292E;--d:#E1E4E8"> (str </span><span style="--l:#D73A49;--d:#F97583">+=</span> <span style="--l:#032F62;--d:#9ECBFF">' '</span><span style="--l:#24292E;--d:#E1E4E8">);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">						str </span><span style="--l:#D73A49;--d:#F97583">+=</span><span style="--l:#24292E;--d:#E1E4E8"> y;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">					}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">				}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		} </span><span style="--l:#D73A49;--d:#F97583">else</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`			<span style="--l:#D73A49;--d:#F97583">for</span><span style="--l:#24292E;--d:#E1E4E8"> (y </span><span style="--l:#D73A49;--d:#F97583">in</span><span style="--l:#24292E;--d:#E1E4E8"> mix) {</span>`,`				<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (mix[y]) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">					str </span><span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span><span style="--l:#24292E;--d:#E1E4E8"> (str </span><span style="--l:#D73A49;--d:#F97583">+=</span> <span style="--l:#032F62;--d:#9ECBFF">' '</span><span style="--l:#24292E;--d:#E1E4E8">);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">					str </span><span style="--l:#D73A49;--d:#F97583">+=</span><span style="--l:#24292E;--d:#E1E4E8"> y;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">				}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	}</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> str;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`,``,`<span style="--l:#D73A49;--d:#F97583">export</span> <span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">clsx</span><span style="--l:#24292E;--d:#E1E4E8">() {</span>`,`	<span style="--l:#D73A49;--d:#F97583">var</span><span style="--l:#24292E;--d:#E1E4E8"> i</span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">, tmp, x, str</span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#032F62;--d:#9ECBFF">''</span><span style="--l:#24292E;--d:#E1E4E8">, len</span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#005CC5;--d:#79B8FF">arguments</span><span style="--l:#24292E;--d:#E1E4E8">.</span><span style="--l:#005CC5;--d:#79B8FF">length</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`	<span style="--l:#D73A49;--d:#F97583">for</span><span style="--l:#24292E;--d:#E1E4E8"> (; i </span><span style="--l:#D73A49;--d:#F97583">&lt;</span><span style="--l:#24292E;--d:#E1E4E8"> len; i</span><span style="--l:#D73A49;--d:#F97583">++</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`		<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (tmp </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#005CC5;--d:#79B8FF">arguments</span><span style="--l:#24292E;--d:#E1E4E8">[i]) {</span>`,`			<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (x </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#6F42C1;--d:#B392F0">toVal</span><span style="--l:#24292E;--d:#E1E4E8">(tmp)) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">				str </span><span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span><span style="--l:#24292E;--d:#E1E4E8"> (str </span><span style="--l:#D73A49;--d:#F97583">+=</span> <span style="--l:#032F62;--d:#9ECBFF">' '</span><span style="--l:#24292E;--d:#E1E4E8">);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">				str </span><span style="--l:#D73A49;--d:#F97583">+=</span><span style="--l:#24292E;--d:#E1E4E8"> x</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	}</span>`,`	<span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> str;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`,``,`<span style="--l:#D73A49;--d:#F97583">export</span> <span style="--l:#D73A49;--d:#F97583">default</span><span style="--l:#24292E;--d:#E1E4E8"> clsx;</span>`]},Ut={code:`const isProduction: boolean = process.env.NODE_ENV === 'production';
const prefix: string = 'Invariant failed';

export default function invariant(
  condition: any,
  // Not providing an inline default argument for message as the result is smaller
  /**
   * Can provide a string, or a function that returns a string for cases where
   * the message takes a fair amount of effort to compute
   */
  message?: string | (() => string),
): asserts condition {
  if (condition) {
    return;
  }
  // Condition not passed

  // In production we strip the message but still throw
  if (isProduction) {
    throw new Error(prefix);
  }

  // When not in production we allow the message to pass through
  // *This block will be removed in production builds*

  const provided: string | undefined = typeof message === 'function' ? message() : message;

  // Options:
  // 1. message provided: \`\${prefix}: \${provided}\`
  // 2. message not provided: prefix
  const value: string = provided ? \`\${prefix}: \${provided}\` : prefix;
  throw new Error(value);
}`,lines:[`<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">isProduction</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">boolean</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> process.env.</span><span style="--l:#005CC5;--d:#79B8FF">NODE_ENV</span> <span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#032F62;--d:#9ECBFF">'production'</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">prefix</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">string</span> <span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#032F62;--d:#9ECBFF">'Invariant failed'</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,``,`<span style="--l:#D73A49;--d:#F97583">export</span> <span style="--l:#D73A49;--d:#F97583">default</span> <span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">invariant</span><span style="--l:#24292E;--d:#E1E4E8">(</span>`,`  <span style="--l:#E36209;--d:#FFAB70">condition</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">any</span><span style="--l:#24292E;--d:#E1E4E8">,</span>`,`  <span style="--l:#6A737D;--d:#6A737D">// Not providing an inline default argument for message as the result is smaller</span>`,`  <span style="--l:#6A737D;--d:#6A737D">/**</span>`,`<span style="--l:#6A737D;--d:#6A737D">   * Can provide a string, or a function that returns a string for cases where</span>`,`<span style="--l:#6A737D;--d:#6A737D">   * the message takes a fair amount of effort to compute</span>`,`<span style="--l:#6A737D;--d:#6A737D">   */</span>`,`  <span style="--l:#E36209;--d:#FFAB70">message</span><span style="--l:#D73A49;--d:#F97583">?:</span> <span style="--l:#005CC5;--d:#79B8FF">string</span> <span style="--l:#D73A49;--d:#F97583">|</span><span style="--l:#24292E;--d:#E1E4E8"> (() </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span> <span style="--l:#005CC5;--d:#79B8FF">string</span><span style="--l:#24292E;--d:#E1E4E8">),</span>`,`<span style="--l:#24292E;--d:#E1E4E8">)</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#D73A49;--d:#F97583">asserts</span> <span style="--l:#E36209;--d:#FFAB70">condition</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`  <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (condition) {</span>`,`    <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  }</span>`,`  <span style="--l:#6A737D;--d:#6A737D">// Condition not passed</span>`,``,`  <span style="--l:#6A737D;--d:#6A737D">// In production we strip the message but still throw</span>`,`  <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (isProduction) {</span>`,`    <span style="--l:#D73A49;--d:#F97583">throw</span> <span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#6F42C1;--d:#B392F0">Error</span><span style="--l:#24292E;--d:#E1E4E8">(prefix);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  }</span>`,``,`  <span style="--l:#6A737D;--d:#6A737D">// When not in production we allow the message to pass through</span>`,`  <span style="--l:#6A737D;--d:#6A737D">// *This block will be removed in production builds*</span>`,``,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">provided</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">string</span> <span style="--l:#D73A49;--d:#F97583">|</span> <span style="--l:#005CC5;--d:#79B8FF">undefined</span> <span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#D73A49;--d:#F97583">typeof</span><span style="--l:#24292E;--d:#E1E4E8"> message </span><span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#032F62;--d:#9ECBFF">'function'</span> <span style="--l:#D73A49;--d:#F97583">?</span> <span style="--l:#6F42C1;--d:#B392F0">message</span><span style="--l:#24292E;--d:#E1E4E8">() </span><span style="--l:#D73A49;--d:#F97583">:</span><span style="--l:#24292E;--d:#E1E4E8"> message;</span>`,``,`  <span style="--l:#6A737D;--d:#6A737D">// Options:</span>`,'  <span style="--l:#6A737D;--d:#6A737D">// 1. message provided: `${prefix}: ${provided}`</span>',`  <span style="--l:#6A737D;--d:#6A737D">// 2. message not provided: prefix</span>`,'  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">value</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">string</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> provided </span><span style="--l:#D73A49;--d:#F97583">?</span> <span style="--l:#032F62;--d:#9ECBFF">`${</span><span style="--l:#24292E;--d:#E1E4E8">prefix</span><span style="--l:#032F62;--d:#9ECBFF">}: ${</span><span style="--l:#24292E;--d:#E1E4E8">provided</span><span style="--l:#032F62;--d:#9ECBFF">}`</span> <span style="--l:#D73A49;--d:#F97583">:</span><span style="--l:#24292E;--d:#E1E4E8"> prefix;</span>',`  <span style="--l:#D73A49;--d:#F97583">throw</span> <span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#6F42C1;--d:#B392F0">Error</span><span style="--l:#24292E;--d:#E1E4E8">(value);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`]},Wt={code:`export function parse(str: string): number {
  if (typeof str !== 'string' || str.length === 0 || str.length > 100) {
    throw new Error(
      \`Value provided to ms.parse() must be a string with length between 1 and 99. value=\${JSON.stringify(str)}\`,
    );
  }
  const match =
    /^(?<value>-?\\d*\\.?\\d+) *(?<unit>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)?$/i.exec(
      str,
    );

  if (!match?.groups) {
    return NaN;
  }

  // Named capture groups need to be manually typed today.
  // https://github.com/microsoft/TypeScript/issues/32098
  const { value, unit = 'ms' } = match.groups as {
    value: string;
    unit: string | undefined;
  };

  const n = parseFloat(value);

  const matchUnit = unit.toLowerCase() as Lowercase<Unit>;

  /* istanbul ignore next - istanbul doesn't understand, but thankfully the TypeScript the exhaustiveness check in the default case keeps us type safe here */
  switch (matchUnit) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'months':
    case 'month':
    case 'mo':
      return n * mo;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      matchUnit satisfies never;
      throw new Error(
        \`Unknown unit "\${matchUnit}" provided to ms.parse(). value=\${JSON.stringify(str)}\`,
      );
  }
}`,lines:[`<span style="--l:#D73A49;--d:#F97583">export</span> <span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">parse</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#E36209;--d:#FFAB70">str</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">string</span><span style="--l:#24292E;--d:#E1E4E8">)</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">number</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`  <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">typeof</span><span style="--l:#24292E;--d:#E1E4E8"> str </span><span style="--l:#D73A49;--d:#F97583">!==</span> <span style="--l:#032F62;--d:#9ECBFF">'string'</span> <span style="--l:#D73A49;--d:#F97583">||</span><span style="--l:#24292E;--d:#E1E4E8"> str.</span><span style="--l:#005CC5;--d:#79B8FF">length</span> <span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#005CC5;--d:#79B8FF">0</span> <span style="--l:#D73A49;--d:#F97583">||</span><span style="--l:#24292E;--d:#E1E4E8"> str.</span><span style="--l:#005CC5;--d:#79B8FF">length</span> <span style="--l:#D73A49;--d:#F97583">&gt;</span> <span style="--l:#005CC5;--d:#79B8FF">100</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`    <span style="--l:#D73A49;--d:#F97583">throw</span> <span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#6F42C1;--d:#B392F0">Error</span><span style="--l:#24292E;--d:#E1E4E8">(</span>`,'      <span style="--l:#032F62;--d:#9ECBFF">`Value provided to ms.parse() must be a string with length between 1 and 99. value=${</span><span style="--l:#005CC5;--d:#79B8FF">JSON</span><span style="--l:#032F62;--d:#9ECBFF">.</span><span style="--l:#6F42C1;--d:#B392F0">stringify</span><span style="--l:#032F62;--d:#9ECBFF">(</span><span style="--l:#24292E;--d:#E1E4E8">str</span><span style="--l:#032F62;--d:#9ECBFF">)</span><span style="--l:#032F62;--d:#9ECBFF">}`</span><span style="--l:#24292E;--d:#E1E4E8">,</span>',`<span style="--l:#24292E;--d:#E1E4E8">    );</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  }</span>`,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">match</span> <span style="--l:#D73A49;--d:#F97583">=</span>`,`    <span style="--l:#032F62;--d:#9ECBFF">/</span><span style="--l:#D73A49;--d:#F97583">^</span><span style="--l:#032F62;--d:#DBEDFF">(?&lt;</span><span style="--l:#24292E;--d:#E1E4E8">value</span><span style="--l:#032F62;--d:#DBEDFF">&gt;-</span><span style="--l:#D73A49;--d:#F97583">?</span><span style="--l:#005CC5;--d:#79B8FF">\\d</span><span style="--l:#D73A49;--d:#F97583">*</span><span style="--l:#22863A;--l-font-weight:bold;--d:#85E89D;--d-font-weight:bold">\\.</span><span style="--l:#D73A49;--d:#F97583">?</span><span style="--l:#005CC5;--d:#79B8FF">\\d</span><span style="--l:#D73A49;--d:#F97583">+</span><span style="--l:#032F62;--d:#DBEDFF">) </span><span style="--l:#D73A49;--d:#F97583">*</span><span style="--l:#032F62;--d:#DBEDFF">(?&lt;</span><span style="--l:#24292E;--d:#E1E4E8">unit</span><span style="--l:#032F62;--d:#DBEDFF">&gt;milliseconds</span><span style="--l:#D73A49;--d:#F97583">?|</span><span style="--l:#032F62;--d:#DBEDFF">msecs</span><span style="--l:#D73A49;--d:#F97583">?|</span><span style="--l:#032F62;--d:#DBEDFF">ms</span><span style="--l:#D73A49;--d:#F97583">|</span><span style="--l:#032F62;--d:#DBEDFF">seconds</span><span style="--l:#D73A49;--d:#F97583">?|</span><span style="--l:#032F62;--d:#DBEDFF">secs</span><span style="--l:#D73A49;--d:#F97583">?|</span><span style="--l:#032F62;--d:#DBEDFF">s</span><span style="--l:#D73A49;--d:#F97583">|</span><span style="--l:#032F62;--d:#DBEDFF">minutes</span><span style="--l:#D73A49;--d:#F97583">?|</span><span style="--l:#032F62;--d:#DBEDFF">mins</span><span style="--l:#D73A49;--d:#F97583">?|</span><span style="--l:#032F62;--d:#DBEDFF">m</span><span style="--l:#D73A49;--d:#F97583">|</span><span style="--l:#032F62;--d:#DBEDFF">hours</span><span style="--l:#D73A49;--d:#F97583">?|</span><span style="--l:#032F62;--d:#DBEDFF">hrs</span><span style="--l:#D73A49;--d:#F97583">?|</span><span style="--l:#032F62;--d:#DBEDFF">h</span><span style="--l:#D73A49;--d:#F97583">|</span><span style="--l:#032F62;--d:#DBEDFF">days</span><span style="--l:#D73A49;--d:#F97583">?|</span><span style="--l:#032F62;--d:#DBEDFF">d</span><span style="--l:#D73A49;--d:#F97583">|</span><span style="--l:#032F62;--d:#DBEDFF">weeks</span><span style="--l:#D73A49;--d:#F97583">?|</span><span style="--l:#032F62;--d:#DBEDFF">w</span><span style="--l:#D73A49;--d:#F97583">|</span><span style="--l:#032F62;--d:#DBEDFF">months</span><span style="--l:#D73A49;--d:#F97583">?|</span><span style="--l:#032F62;--d:#DBEDFF">mo</span><span style="--l:#D73A49;--d:#F97583">|</span><span style="--l:#032F62;--d:#DBEDFF">years</span><span style="--l:#D73A49;--d:#F97583">?|</span><span style="--l:#032F62;--d:#DBEDFF">yrs</span><span style="--l:#D73A49;--d:#F97583">?|</span><span style="--l:#032F62;--d:#DBEDFF">y)</span><span style="--l:#D73A49;--d:#F97583">?$</span><span style="--l:#032F62;--d:#9ECBFF">/</span><span style="--l:#D73A49;--d:#F97583">i</span><span style="--l:#24292E;--d:#E1E4E8">.</span><span style="--l:#6F42C1;--d:#B392F0">exec</span><span style="--l:#24292E;--d:#E1E4E8">(</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      str,</span>`,`<span style="--l:#24292E;--d:#E1E4E8">    );</span>`,``,`  <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">match?.groups) {</span>`,`    <span style="--l:#D73A49;--d:#F97583">return</span> <span style="--l:#005CC5;--d:#79B8FF">NaN</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  }</span>`,``,`  <span style="--l:#6A737D;--d:#6A737D">// Named capture groups need to be manually typed today.</span>`,`  <span style="--l:#6A737D;--d:#6A737D">// https://github.com/microsoft/TypeScript/issues/32098</span>`,`  <span style="--l:#D73A49;--d:#F97583">const</span><span style="--l:#24292E;--d:#E1E4E8"> { </span><span style="--l:#005CC5;--d:#79B8FF">value</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#005CC5;--d:#79B8FF">unit</span> <span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#032F62;--d:#9ECBFF">'ms'</span><span style="--l:#24292E;--d:#E1E4E8"> } </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> match.groups </span><span style="--l:#D73A49;--d:#F97583">as</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`    <span style="--l:#E36209;--d:#FFAB70">value</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">string</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`    <span style="--l:#E36209;--d:#FFAB70">unit</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">string</span> <span style="--l:#D73A49;--d:#F97583">|</span> <span style="--l:#005CC5;--d:#79B8FF">undefined</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  };</span>`,``,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">n</span> <span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#6F42C1;--d:#B392F0">parseFloat</span><span style="--l:#24292E;--d:#E1E4E8">(value);</span>`,``,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">matchUnit</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> unit.</span><span style="--l:#6F42C1;--d:#B392F0">toLowerCase</span><span style="--l:#24292E;--d:#E1E4E8">() </span><span style="--l:#D73A49;--d:#F97583">as</span> <span style="--l:#6F42C1;--d:#B392F0">Lowercase</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">Unit</span><span style="--l:#24292E;--d:#E1E4E8">&gt;;</span>`,``,`  <span style="--l:#6A737D;--d:#6A737D">/* istanbul ignore next - istanbul doesn't understand, but thankfully the TypeScript the exhaustiveness check in the default case keeps us type safe here */</span>`,`  <span style="--l:#D73A49;--d:#F97583">switch</span><span style="--l:#24292E;--d:#E1E4E8"> (matchUnit) {</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'years'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'year'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'yrs'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'yr'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'y'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`      <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> n </span><span style="--l:#D73A49;--d:#F97583">*</span><span style="--l:#24292E;--d:#E1E4E8"> y;</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'months'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'month'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'mo'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`      <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> n </span><span style="--l:#D73A49;--d:#F97583">*</span><span style="--l:#24292E;--d:#E1E4E8"> mo;</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'weeks'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'week'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'w'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`      <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> n </span><span style="--l:#D73A49;--d:#F97583">*</span><span style="--l:#24292E;--d:#E1E4E8"> w;</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'days'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'day'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'d'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`      <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> n </span><span style="--l:#D73A49;--d:#F97583">*</span><span style="--l:#24292E;--d:#E1E4E8"> d;</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'hours'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'hour'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'hrs'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'hr'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'h'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`      <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> n </span><span style="--l:#D73A49;--d:#F97583">*</span><span style="--l:#24292E;--d:#E1E4E8"> h;</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'minutes'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'minute'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'mins'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'min'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'m'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`      <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> n </span><span style="--l:#D73A49;--d:#F97583">*</span><span style="--l:#24292E;--d:#E1E4E8"> m;</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'seconds'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'second'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'secs'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'sec'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'s'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`      <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> n </span><span style="--l:#D73A49;--d:#F97583">*</span><span style="--l:#24292E;--d:#E1E4E8"> s;</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'milliseconds'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'millisecond'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'msecs'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'msec'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`    <span style="--l:#D73A49;--d:#F97583">case</span> <span style="--l:#032F62;--d:#9ECBFF">'ms'</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`      <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> n;</span>`,`    <span style="--l:#D73A49;--d:#F97583">default</span><span style="--l:#24292E;--d:#E1E4E8">:</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      matchUnit </span><span style="--l:#D73A49;--d:#F97583">satisfies</span> <span style="--l:#005CC5;--d:#79B8FF">never</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`      <span style="--l:#D73A49;--d:#F97583">throw</span> <span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#6F42C1;--d:#B392F0">Error</span><span style="--l:#24292E;--d:#E1E4E8">(</span>`,'        <span style="--l:#032F62;--d:#9ECBFF">`Unknown unit "${</span><span style="--l:#24292E;--d:#E1E4E8">matchUnit</span><span style="--l:#032F62;--d:#9ECBFF">}" provided to ms.parse(). value=${</span><span style="--l:#005CC5;--d:#79B8FF">JSON</span><span style="--l:#032F62;--d:#9ECBFF">.</span><span style="--l:#6F42C1;--d:#B392F0">stringify</span><span style="--l:#032F62;--d:#9ECBFF">(</span><span style="--l:#24292E;--d:#E1E4E8">str</span><span style="--l:#032F62;--d:#9ECBFF">)</span><span style="--l:#032F62;--d:#9ECBFF">}`</span><span style="--l:#24292E;--d:#E1E4E8">,</span>',`<span style="--l:#24292E;--d:#E1E4E8">      );</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`]},Gt={code:`export default function mitt<Events extends Record<EventType, unknown>>(
	all?: EventHandlerMap<Events>
): Emitter<Events> {
	type GenericEventHandler =
		| Handler<Events[keyof Events]>
		| WildcardHandler<Events>;
	all = all || new Map();

	return {
		/**
		 * A Map of event names to registered handler functions.
		 */
		all,

		/**
		 * Register an event handler for the given type.
		 * @param {string|symbol} type Type of event to listen for, or \`'*'\` for all events
		 * @param {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
			const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
			if (handlers) {
				handlers.push(handler);
			} else {
				all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
			}
		},

		/**
		 * Remove an event handler for the given type.
		 * If \`handler\` is omitted, all handlers of the given type are removed.
		 * @param {string|symbol} type Type of event to unregister \`handler\` from (\`'*'\` to remove a wildcard handler)
		 * @param {Function} [handler] Handler function to remove
		 * @memberOf mitt
		 */
		off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
			const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
			if (handlers) {
				if (handler) {
					handlers.splice(handlers.indexOf(handler) >>> 0, 1);
				} else {
					all!.set(type, []);
				}
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, \`'*'\` handlers are invoked after type-matched handlers.
		 *
		 * Note: Manually firing '*' handlers is not supported.
		 *
		 * @param {string|symbol} type The event type to invoke
		 * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
			let handlers = all!.get(type);
			if (handlers) {
				(handlers as EventHandlerList<Events[keyof Events]>)
					.slice()
					.map((handler) => {
						handler(evt!);
					});
			}

			handlers = all!.get('*');
			if (handlers) {
				(handlers as WildCardEventHandlerList<Events>)
					.slice()
					.map((handler) => {
						handler(type, evt!);
					});
			}
		}
	};
}`,lines:[`<span style="--l:#D73A49;--d:#F97583">export</span> <span style="--l:#D73A49;--d:#F97583">default</span> <span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">mitt</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">Events</span> <span style="--l:#D73A49;--d:#F97583">extends</span> <span style="--l:#6F42C1;--d:#B392F0">Record</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">EventType</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#005CC5;--d:#79B8FF">unknown</span><span style="--l:#24292E;--d:#E1E4E8">&gt;&gt;(</span>`,`	<span style="--l:#E36209;--d:#FFAB70">all</span><span style="--l:#D73A49;--d:#F97583">?:</span> <span style="--l:#6F42C1;--d:#B392F0">EventHandlerMap</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">&gt;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">)</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Emitter</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">&gt; {</span>`,`	<span style="--l:#D73A49;--d:#F97583">type</span> <span style="--l:#6F42C1;--d:#B392F0">GenericEventHandler</span> <span style="--l:#D73A49;--d:#F97583">=</span>`,`		<span style="--l:#D73A49;--d:#F97583">|</span> <span style="--l:#6F42C1;--d:#B392F0">Handler</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">[</span><span style="--l:#D73A49;--d:#F97583">keyof</span> <span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">]&gt;</span>`,`		<span style="--l:#D73A49;--d:#F97583">|</span> <span style="--l:#6F42C1;--d:#B392F0">WildcardHandler</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">&gt;;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	all </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> all </span><span style="--l:#D73A49;--d:#F97583">||</span> <span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#6F42C1;--d:#B392F0">Map</span><span style="--l:#24292E;--d:#E1E4E8">();</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`		<span style="--l:#6A737D;--d:#6A737D">/**</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 * A Map of event names to registered handler functions.</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 */</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		all,</span>`,``,`		<span style="--l:#6A737D;--d:#6A737D">/**</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 * Register an event handler for the given type.</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 * </span><span style="--l:#D73A49;--d:#F97583">@param</span> <span style="--l:#6F42C1;--d:#B392F0">{string|symbol}</span> <span style="--l:#24292E;--d:#E1E4E8">type</span><span style="--l:#6A737D;--d:#6A737D"> Type of event to listen for, or \`'*'\` for all events</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 * </span><span style="--l:#D73A49;--d:#F97583">@param</span> <span style="--l:#6F42C1;--d:#B392F0">{Function}</span> <span style="--l:#24292E;--d:#E1E4E8">handler</span><span style="--l:#6A737D;--d:#6A737D"> Function to call in response to given event</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 * </span><span style="--l:#D73A49;--d:#F97583">@memberOf</span><span style="--l:#6A737D;--d:#6A737D"> mitt</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 */</span>`,`		<span style="--l:#6F42C1;--d:#B392F0">on</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">Key</span> <span style="--l:#D73A49;--d:#F97583">extends</span> <span style="--l:#D73A49;--d:#F97583">keyof</span> <span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">&gt;(</span><span style="--l:#E36209;--d:#FFAB70">type</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Key</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">handler</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">GenericEventHandler</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`			<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">handlers</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Array</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">GenericEventHandler</span><span style="--l:#24292E;--d:#E1E4E8">&gt; </span><span style="--l:#D73A49;--d:#F97583">|</span> <span style="--l:#005CC5;--d:#79B8FF">undefined</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> all</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">.</span><span style="--l:#6F42C1;--d:#B392F0">get</span><span style="--l:#24292E;--d:#E1E4E8">(type);</span>`,`			<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (handlers) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">				handlers.</span><span style="--l:#6F42C1;--d:#B392F0">push</span><span style="--l:#24292E;--d:#E1E4E8">(handler);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			} </span><span style="--l:#D73A49;--d:#F97583">else</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">				all</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">.</span><span style="--l:#6F42C1;--d:#B392F0">set</span><span style="--l:#24292E;--d:#E1E4E8">(type, [handler] </span><span style="--l:#D73A49;--d:#F97583">as</span> <span style="--l:#6F42C1;--d:#B392F0">EventHandlerList</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">[</span><span style="--l:#D73A49;--d:#F97583">keyof</span> <span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">]&gt;);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		},</span>`,``,`		<span style="--l:#6A737D;--d:#6A737D">/**</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 * Remove an event handler for the given type.</span>`,'<span style="--l:#6A737D;--d:#6A737D">		 * If `handler` is omitted, all handlers of the given type are removed.</span>','<span style="--l:#6A737D;--d:#6A737D">		 * </span><span style="--l:#D73A49;--d:#F97583">@param</span> <span style="--l:#6F42C1;--d:#B392F0">{string|symbol}</span> <span style="--l:#24292E;--d:#E1E4E8">type</span><span style="--l:#6A737D;--d:#6A737D"> Type of event to unregister `handler` from (`\'*\'` to remove a wildcard handler)</span>',`<span style="--l:#6A737D;--d:#6A737D">		 * </span><span style="--l:#D73A49;--d:#F97583">@param</span> <span style="--l:#6F42C1;--d:#B392F0">{Function}</span> <span style="--l:#24292E;--d:#E1E4E8">[handler]</span><span style="--l:#6A737D;--d:#6A737D"> Handler function to remove</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 * </span><span style="--l:#D73A49;--d:#F97583">@memberOf</span><span style="--l:#6A737D;--d:#6A737D"> mitt</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 */</span>`,`		<span style="--l:#6F42C1;--d:#B392F0">off</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">Key</span> <span style="--l:#D73A49;--d:#F97583">extends</span> <span style="--l:#D73A49;--d:#F97583">keyof</span> <span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">&gt;(</span><span style="--l:#E36209;--d:#FFAB70">type</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Key</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">handler</span><span style="--l:#D73A49;--d:#F97583">?:</span> <span style="--l:#6F42C1;--d:#B392F0">GenericEventHandler</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`			<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">handlers</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Array</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">GenericEventHandler</span><span style="--l:#24292E;--d:#E1E4E8">&gt; </span><span style="--l:#D73A49;--d:#F97583">|</span> <span style="--l:#005CC5;--d:#79B8FF">undefined</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> all</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">.</span><span style="--l:#6F42C1;--d:#B392F0">get</span><span style="--l:#24292E;--d:#E1E4E8">(type);</span>`,`			<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (handlers) {</span>`,`				<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (handler) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">					handlers.</span><span style="--l:#6F42C1;--d:#B392F0">splice</span><span style="--l:#24292E;--d:#E1E4E8">(handlers.</span><span style="--l:#6F42C1;--d:#B392F0">indexOf</span><span style="--l:#24292E;--d:#E1E4E8">(handler) </span><span style="--l:#D73A49;--d:#F97583">&gt;&gt;&gt;</span> <span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#005CC5;--d:#79B8FF">1</span><span style="--l:#24292E;--d:#E1E4E8">);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">				} </span><span style="--l:#D73A49;--d:#F97583">else</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">					all</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">.</span><span style="--l:#6F42C1;--d:#B392F0">set</span><span style="--l:#24292E;--d:#E1E4E8">(type, []);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">				}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		},</span>`,``,`		<span style="--l:#6A737D;--d:#6A737D">/**</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 * Invoke all handlers for the given type.</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 * If present, \`'*'\` handlers are invoked after type-matched handlers.</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 *</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 * Note: Manually firing '*' handlers is not supported.</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 *</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 * </span><span style="--l:#D73A49;--d:#F97583">@param</span> <span style="--l:#6F42C1;--d:#B392F0">{string|symbol}</span> <span style="--l:#24292E;--d:#E1E4E8">type</span><span style="--l:#6A737D;--d:#6A737D"> The event type to invoke</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 * </span><span style="--l:#D73A49;--d:#F97583">@param</span> <span style="--l:#6F42C1;--d:#B392F0">{Any}</span> <span style="--l:#24292E;--d:#E1E4E8">[evt]</span><span style="--l:#6A737D;--d:#6A737D"> Any value (object is recommended and powerful), passed to each handler</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 * </span><span style="--l:#D73A49;--d:#F97583">@memberOf</span><span style="--l:#6A737D;--d:#6A737D"> mitt</span>`,`<span style="--l:#6A737D;--d:#6A737D">		 */</span>`,`		<span style="--l:#6F42C1;--d:#B392F0">emit</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">Key</span> <span style="--l:#D73A49;--d:#F97583">extends</span> <span style="--l:#D73A49;--d:#F97583">keyof</span> <span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">&gt;(</span><span style="--l:#E36209;--d:#FFAB70">type</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Key</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">evt</span><span style="--l:#D73A49;--d:#F97583">?:</span> <span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">[</span><span style="--l:#6F42C1;--d:#B392F0">Key</span><span style="--l:#24292E;--d:#E1E4E8">]) {</span>`,`			<span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> handlers </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> all</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">.</span><span style="--l:#6F42C1;--d:#B392F0">get</span><span style="--l:#24292E;--d:#E1E4E8">(type);</span>`,`			<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (handlers) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">				(handlers </span><span style="--l:#D73A49;--d:#F97583">as</span> <span style="--l:#6F42C1;--d:#B392F0">EventHandlerList</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">[</span><span style="--l:#D73A49;--d:#F97583">keyof</span> <span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">]&gt;)</span>`,`<span style="--l:#24292E;--d:#E1E4E8">					.</span><span style="--l:#6F42C1;--d:#B392F0">slice</span><span style="--l:#24292E;--d:#E1E4E8">()</span>`,`<span style="--l:#24292E;--d:#E1E4E8">					.</span><span style="--l:#6F42C1;--d:#B392F0">map</span><span style="--l:#24292E;--d:#E1E4E8">((</span><span style="--l:#E36209;--d:#FFAB70">handler</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`						<span style="--l:#6F42C1;--d:#B392F0">handler</span><span style="--l:#24292E;--d:#E1E4E8">(evt</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">					});</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			}</span>`,``,`<span style="--l:#24292E;--d:#E1E4E8">			handlers </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> all</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">.</span><span style="--l:#6F42C1;--d:#B392F0">get</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#032F62;--d:#9ECBFF">'*'</span><span style="--l:#24292E;--d:#E1E4E8">);</span>`,`			<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (handlers) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">				(handlers </span><span style="--l:#D73A49;--d:#F97583">as</span> <span style="--l:#6F42C1;--d:#B392F0">WildCardEventHandlerList</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">Events</span><span style="--l:#24292E;--d:#E1E4E8">&gt;)</span>`,`<span style="--l:#24292E;--d:#E1E4E8">					.</span><span style="--l:#6F42C1;--d:#B392F0">slice</span><span style="--l:#24292E;--d:#E1E4E8">()</span>`,`<span style="--l:#24292E;--d:#E1E4E8">					.</span><span style="--l:#6F42C1;--d:#B392F0">map</span><span style="--l:#24292E;--d:#E1E4E8">((</span><span style="--l:#E36209;--d:#FFAB70">handler</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`						<span style="--l:#6F42C1;--d:#B392F0">handler</span><span style="--l:#24292E;--d:#E1E4E8">(type, evt</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">					});</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	};</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`]},Kt={code:`export function customRandom(alphabet, defaultSize, getRandom) {
  let safeByteCutoff = 256 - (256 % alphabet.length)

  if (safeByteCutoff === 256) {
    let mask = alphabet.length - 1

    return (size = defaultSize) => {
      if (!size) return ''
      let id = ''
      while (true) {
        let bytes = getRandom(size)
        let i = (size |= 0)
        while (i--) {
          id += alphabet[bytes[i] & mask]
          if (id.length >= size) return id
        }
      }
    }
  }

  return (size = defaultSize) => {
    if (!size) return ''
    let id = ''
    let step = Math.ceil((1.6 * 256 * size) / safeByteCutoff)
    while (true) {
      let bytes = getRandom(step)
      let i = step
      while (i--) {
        if (bytes[i] < safeByteCutoff) {
          id += alphabet[bytes[i] % alphabet.length]
          if (id.length >= size) return id
        }
      }
    }
  }
}`,lines:[`<span style="--l:#D73A49;--d:#F97583">export</span> <span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">customRandom</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#E36209;--d:#FFAB70">alphabet</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">defaultSize</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">getRandom</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`  <span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> safeByteCutoff </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#005CC5;--d:#79B8FF">256</span> <span style="--l:#D73A49;--d:#F97583">-</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#005CC5;--d:#79B8FF">256</span> <span style="--l:#D73A49;--d:#F97583">%</span><span style="--l:#24292E;--d:#E1E4E8"> alphabet.</span><span style="--l:#005CC5;--d:#79B8FF">length</span><span style="--l:#24292E;--d:#E1E4E8">)</span>`,``,`  <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (safeByteCutoff </span><span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#005CC5;--d:#79B8FF">256</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`    <span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> mask </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> alphabet.</span><span style="--l:#005CC5;--d:#79B8FF">length</span> <span style="--l:#D73A49;--d:#F97583">-</span> <span style="--l:#005CC5;--d:#79B8FF">1</span>`,``,`    <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#E36209;--d:#FFAB70">size</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> defaultSize) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`      <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">size) </span><span style="--l:#D73A49;--d:#F97583">return</span> <span style="--l:#032F62;--d:#9ECBFF">''</span>`,`      <span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> id </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#032F62;--d:#9ECBFF">''</span>`,`      <span style="--l:#D73A49;--d:#F97583">while</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#005CC5;--d:#79B8FF">true</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`        <span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> bytes </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#6F42C1;--d:#B392F0">getRandom</span><span style="--l:#24292E;--d:#E1E4E8">(size)</span>`,`        <span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> i </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> (size </span><span style="--l:#D73A49;--d:#F97583">|=</span> <span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">)</span>`,`        <span style="--l:#D73A49;--d:#F97583">while</span><span style="--l:#24292E;--d:#E1E4E8"> (i</span><span style="--l:#D73A49;--d:#F97583">--</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">          id </span><span style="--l:#D73A49;--d:#F97583">+=</span><span style="--l:#24292E;--d:#E1E4E8"> alphabet[bytes[i] </span><span style="--l:#D73A49;--d:#F97583">&amp;</span><span style="--l:#24292E;--d:#E1E4E8"> mask]</span>`,`          <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (id.</span><span style="--l:#005CC5;--d:#79B8FF">length</span> <span style="--l:#D73A49;--d:#F97583">&gt;=</span><span style="--l:#24292E;--d:#E1E4E8"> size) </span><span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> id</span>`,`<span style="--l:#24292E;--d:#E1E4E8">        }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">    }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  }</span>`,``,`  <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#E36209;--d:#FFAB70">size</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> defaultSize) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`    <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">size) </span><span style="--l:#D73A49;--d:#F97583">return</span> <span style="--l:#032F62;--d:#9ECBFF">''</span>`,`    <span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> id </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#032F62;--d:#9ECBFF">''</span>`,`    <span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> step </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> Math.</span><span style="--l:#6F42C1;--d:#B392F0">ceil</span><span style="--l:#24292E;--d:#E1E4E8">((</span><span style="--l:#005CC5;--d:#79B8FF">1.6</span> <span style="--l:#D73A49;--d:#F97583">*</span> <span style="--l:#005CC5;--d:#79B8FF">256</span> <span style="--l:#D73A49;--d:#F97583">*</span><span style="--l:#24292E;--d:#E1E4E8"> size) </span><span style="--l:#D73A49;--d:#F97583">/</span><span style="--l:#24292E;--d:#E1E4E8"> safeByteCutoff)</span>`,`    <span style="--l:#D73A49;--d:#F97583">while</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#005CC5;--d:#79B8FF">true</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`      <span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> bytes </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#6F42C1;--d:#B392F0">getRandom</span><span style="--l:#24292E;--d:#E1E4E8">(step)</span>`,`      <span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> i </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> step</span>`,`      <span style="--l:#D73A49;--d:#F97583">while</span><span style="--l:#24292E;--d:#E1E4E8"> (i</span><span style="--l:#D73A49;--d:#F97583">--</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`        <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (bytes[i] </span><span style="--l:#D73A49;--d:#F97583">&lt;</span><span style="--l:#24292E;--d:#E1E4E8"> safeByteCutoff) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">          id </span><span style="--l:#D73A49;--d:#F97583">+=</span><span style="--l:#24292E;--d:#E1E4E8"> alphabet[bytes[i] </span><span style="--l:#D73A49;--d:#F97583">%</span><span style="--l:#24292E;--d:#E1E4E8"> alphabet.</span><span style="--l:#005CC5;--d:#79B8FF">length</span><span style="--l:#24292E;--d:#E1E4E8">]</span>`,`          <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (id.</span><span style="--l:#005CC5;--d:#79B8FF">length</span> <span style="--l:#D73A49;--d:#F97583">&gt;=</span><span style="--l:#24292E;--d:#E1E4E8"> size) </span><span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> id</span>`,`<span style="--l:#24292E;--d:#E1E4E8">        }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">    }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`]},qt={code:`export default function debounce(function_, wait = 100, options = {}) {
	if (typeof function_ !== 'function') {
		throw new TypeError(\`Expected the first parameter to be a function, got \\\`\${typeof function_}\\\`.\`);
	}

	if (wait < 0) {
		throw new RangeError('\`wait\` must not be negative.');
	}

	if (typeof options === 'boolean') {
		throw new TypeError('The \`options\` parameter must be an object, not a boolean. Use \`{immediate: true}\` instead.');
	}

	const {immediate} = options;

	let storedContext;
	let storedArguments;
	let timeoutId;
	let timestamp;
	let result;

	function run() {
		const callContext = storedContext;
		const callArguments = storedArguments;
		storedContext = undefined;
		storedArguments = undefined;
		result = function_.apply(callContext, callArguments);
		return result;
	}

	function later() {
		const last = Date.now() - timestamp;

		if (last < wait && last >= 0) {
			timeoutId = setTimeout(later, wait - last);
		} else {
			timeoutId = undefined;

			if (!immediate) {
				result = run();
			}
		}
	}

	const debounced = function (...arguments_) {
		if (
			storedContext
			&& this !== storedContext
			&& Object.getPrototypeOf(this) === Object.getPrototypeOf(storedContext)
		) {
			throw new Error('Debounced method called with different contexts of the same prototype.');
		}

		storedContext = this; // eslint-disable-line unicorn/no-this-assignment
		storedArguments = arguments_;
		timestamp = Date.now();

		const callNow = immediate && !timeoutId;

		if (!timeoutId) {
			timeoutId = setTimeout(later, wait);
		}

		if (callNow) {
			result = run();
			return result;
		}

		return undefined;
	};`,lines:[`<span style="--l:#D73A49;--d:#F97583">export</span> <span style="--l:#D73A49;--d:#F97583">default</span> <span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">debounce</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#E36209;--d:#FFAB70">function_</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">wait</span> <span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#005CC5;--d:#79B8FF">100</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">options</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> {}) {</span>`,`	<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">typeof</span><span style="--l:#24292E;--d:#E1E4E8"> function_ </span><span style="--l:#D73A49;--d:#F97583">!==</span> <span style="--l:#032F62;--d:#9ECBFF">'function'</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,'		<span style="--l:#D73A49;--d:#F97583">throw</span> <span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#6F42C1;--d:#B392F0">TypeError</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#032F62;--d:#9ECBFF">`Expected the first parameter to be a function, got </span><span style="--l:#005CC5;--d:#79B8FF">\\`</span><span style="--l:#032F62;--d:#9ECBFF">${</span><span style="--l:#D73A49;--d:#F97583">typeof</span> <span style="--l:#24292E;--d:#E1E4E8">function_</span><span style="--l:#032F62;--d:#9ECBFF">}</span><span style="--l:#005CC5;--d:#79B8FF">\\`</span><span style="--l:#032F62;--d:#9ECBFF">.`</span><span style="--l:#24292E;--d:#E1E4E8">);</span>',`<span style="--l:#24292E;--d:#E1E4E8">	}</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (wait </span><span style="--l:#D73A49;--d:#F97583">&lt;</span> <span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`		<span style="--l:#D73A49;--d:#F97583">throw</span> <span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#6F42C1;--d:#B392F0">RangeError</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#032F62;--d:#9ECBFF">'\`wait\` must not be negative.'</span><span style="--l:#24292E;--d:#E1E4E8">);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	}</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">typeof</span><span style="--l:#24292E;--d:#E1E4E8"> options </span><span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#032F62;--d:#9ECBFF">'boolean'</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,'		<span style="--l:#D73A49;--d:#F97583">throw</span> <span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#6F42C1;--d:#B392F0">TypeError</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#032F62;--d:#9ECBFF">\'The `options` parameter must be an object, not a boolean. Use `{immediate: true}` instead.\'</span><span style="--l:#24292E;--d:#E1E4E8">);</span>',`<span style="--l:#24292E;--d:#E1E4E8">	}</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">const</span><span style="--l:#24292E;--d:#E1E4E8"> {</span><span style="--l:#005CC5;--d:#79B8FF">immediate</span><span style="--l:#24292E;--d:#E1E4E8">} </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> options;</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> storedContext;</span>`,`	<span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> storedArguments;</span>`,`	<span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> timeoutId;</span>`,`	<span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> timestamp;</span>`,`	<span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> result;</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">run</span><span style="--l:#24292E;--d:#E1E4E8">() {</span>`,`		<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">callContext</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> storedContext;</span>`,`		<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">callArguments</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> storedArguments;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		storedContext </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#005CC5;--d:#79B8FF">undefined</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		storedArguments </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#005CC5;--d:#79B8FF">undefined</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		result </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> function_.</span><span style="--l:#6F42C1;--d:#B392F0">apply</span><span style="--l:#24292E;--d:#E1E4E8">(callContext, callArguments);</span>`,`		<span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> result;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	}</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">later</span><span style="--l:#24292E;--d:#E1E4E8">() {</span>`,`		<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">last</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> Date.</span><span style="--l:#6F42C1;--d:#B392F0">now</span><span style="--l:#24292E;--d:#E1E4E8">() </span><span style="--l:#D73A49;--d:#F97583">-</span><span style="--l:#24292E;--d:#E1E4E8"> timestamp;</span>`,``,`		<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (last </span><span style="--l:#D73A49;--d:#F97583">&lt;</span><span style="--l:#24292E;--d:#E1E4E8"> wait </span><span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span><span style="--l:#24292E;--d:#E1E4E8"> last </span><span style="--l:#D73A49;--d:#F97583">&gt;=</span> <span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			timeoutId </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#6F42C1;--d:#B392F0">setTimeout</span><span style="--l:#24292E;--d:#E1E4E8">(later, wait </span><span style="--l:#D73A49;--d:#F97583">-</span><span style="--l:#24292E;--d:#E1E4E8"> last);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		} </span><span style="--l:#D73A49;--d:#F97583">else</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			timeoutId </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#005CC5;--d:#79B8FF">undefined</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,``,`			<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">immediate) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">				result </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#6F42C1;--d:#B392F0">run</span><span style="--l:#24292E;--d:#E1E4E8">();</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	}</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#6F42C1;--d:#B392F0">debounced</span> <span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#D73A49;--d:#F97583">function</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">...</span><span style="--l:#E36209;--d:#FFAB70">arguments_</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`		<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			storedContext</span>`,`			<span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span> <span style="--l:#005CC5;--d:#79B8FF">this</span> <span style="--l:#D73A49;--d:#F97583">!==</span><span style="--l:#24292E;--d:#E1E4E8"> storedContext</span>`,`			<span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span><span style="--l:#24292E;--d:#E1E4E8"> Object.</span><span style="--l:#6F42C1;--d:#B392F0">getPrototypeOf</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#005CC5;--d:#79B8FF">this</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">===</span><span style="--l:#24292E;--d:#E1E4E8"> Object.</span><span style="--l:#6F42C1;--d:#B392F0">getPrototypeOf</span><span style="--l:#24292E;--d:#E1E4E8">(storedContext)</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		) {</span>`,`			<span style="--l:#D73A49;--d:#F97583">throw</span> <span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#6F42C1;--d:#B392F0">Error</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#032F62;--d:#9ECBFF">'Debounced method called with different contexts of the same prototype.'</span><span style="--l:#24292E;--d:#E1E4E8">);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		}</span>`,``,`<span style="--l:#24292E;--d:#E1E4E8">		storedContext </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#005CC5;--d:#79B8FF">this</span><span style="--l:#24292E;--d:#E1E4E8">; </span><span style="--l:#6A737D;--d:#6A737D">// eslint-disable-line unicorn/no-this-assignment</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		storedArguments </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> arguments_;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		timestamp </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> Date.</span><span style="--l:#6F42C1;--d:#B392F0">now</span><span style="--l:#24292E;--d:#E1E4E8">();</span>`,``,`		<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">callNow</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> immediate </span><span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span> <span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">timeoutId;</span>`,``,`		<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">timeoutId) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			timeoutId </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#6F42C1;--d:#B392F0">setTimeout</span><span style="--l:#24292E;--d:#E1E4E8">(later, wait);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		}</span>`,``,`		<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (callNow) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			result </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#6F42C1;--d:#B392F0">run</span><span style="--l:#24292E;--d:#E1E4E8">();</span>`,`			<span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> result;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		}</span>`,``,`		<span style="--l:#D73A49;--d:#F97583">return</span> <span style="--l:#005CC5;--d:#79B8FF">undefined</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	};</span>`]},Jt={code:`import Queue from 'yocto-queue';

export default function pLimit(concurrency) {
	let rejectOnClear = false;

	if (typeof concurrency === 'object') {
		({concurrency, rejectOnClear = false} = concurrency);
	}

	validateConcurrency(concurrency);

	if (typeof rejectOnClear !== 'boolean') {
		throw new TypeError('Expected \`rejectOnClear\` to be a boolean');
	}

	const queue = new Queue();
	let activeCount = 0;

	const resumeNext = () => {
		// Process the next queued function if we're under the concurrency limit
		if (activeCount < concurrency && queue.size > 0) {
			activeCount++;
			queue.dequeue().run();
		}
	};

	const next = () => {
		activeCount--;
		resumeNext();
	};

	const run = async (function_, resolve, arguments_) => {
		// Execute the function and capture the result promise
		const result = (async () => function_(...arguments_))();

		// Resolve immediately with the promise (don't wait for completion)
		resolve(result);

		// Wait for the function to complete (success or failure)
		// We catch errors here to prevent unhandled rejections,
		// but the original promise rejection is preserved for the caller
		try {
			await result;
		} catch {}

		// Decrement active count and process next queued function
		next();
	};

	const enqueue = (function_, resolve, reject, arguments_) => {
		const queueItem = {reject};

		// Queue the internal resolve function instead of the run function
		// to preserve the asynchronous execution context.
		new Promise(internalResolve => { // eslint-disable-line promise/param-names
			queueItem.run = internalResolve;
			queue.enqueue(queueItem);
		}).then(run.bind(undefined, function_, resolve, arguments_)); // eslint-disable-line promise/prefer-await-to-then

		// Start processing immediately if we haven't reached the concurrency limit
		if (activeCount < concurrency) {
			resumeNext();
		}
	};

	const generator = (function_, ...arguments_) => new Promise((resolve, reject) => {
		enqueue(function_, resolve, reject, arguments_);
	});`,lines:[`<span style="--l:#D73A49;--d:#F97583">import</span><span style="--l:#24292E;--d:#E1E4E8"> Queue </span><span style="--l:#D73A49;--d:#F97583">from</span> <span style="--l:#032F62;--d:#9ECBFF">'yocto-queue'</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,``,`<span style="--l:#D73A49;--d:#F97583">export</span> <span style="--l:#D73A49;--d:#F97583">default</span> <span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">pLimit</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#E36209;--d:#FFAB70">concurrency</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`	<span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> rejectOnClear </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#005CC5;--d:#79B8FF">false</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">typeof</span><span style="--l:#24292E;--d:#E1E4E8"> concurrency </span><span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#032F62;--d:#9ECBFF">'object'</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		({concurrency, rejectOnClear </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#005CC5;--d:#79B8FF">false</span><span style="--l:#24292E;--d:#E1E4E8">} </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> concurrency);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	}</span>`,``,`	<span style="--l:#6F42C1;--d:#B392F0">validateConcurrency</span><span style="--l:#24292E;--d:#E1E4E8">(concurrency);</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">typeof</span><span style="--l:#24292E;--d:#E1E4E8"> rejectOnClear </span><span style="--l:#D73A49;--d:#F97583">!==</span> <span style="--l:#032F62;--d:#9ECBFF">'boolean'</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`		<span style="--l:#D73A49;--d:#F97583">throw</span> <span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#6F42C1;--d:#B392F0">TypeError</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#032F62;--d:#9ECBFF">'Expected \`rejectOnClear\` to be a boolean'</span><span style="--l:#24292E;--d:#E1E4E8">);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	}</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">queue</span> <span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#6F42C1;--d:#B392F0">Queue</span><span style="--l:#24292E;--d:#E1E4E8">();</span>`,`	<span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> activeCount </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#6F42C1;--d:#B392F0">resumeNext</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> () </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`		<span style="--l:#6A737D;--d:#6A737D">// Process the next queued function if we're under the concurrency limit</span>`,`		<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (activeCount </span><span style="--l:#D73A49;--d:#F97583">&lt;</span><span style="--l:#24292E;--d:#E1E4E8"> concurrency </span><span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span><span style="--l:#24292E;--d:#E1E4E8"> queue.size </span><span style="--l:#D73A49;--d:#F97583">&gt;</span> <span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			activeCount</span><span style="--l:#D73A49;--d:#F97583">++</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			queue.</span><span style="--l:#6F42C1;--d:#B392F0">dequeue</span><span style="--l:#24292E;--d:#E1E4E8">().</span><span style="--l:#6F42C1;--d:#B392F0">run</span><span style="--l:#24292E;--d:#E1E4E8">();</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	};</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#6F42C1;--d:#B392F0">next</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> () </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		activeCount</span><span style="--l:#D73A49;--d:#F97583">--</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`		<span style="--l:#6F42C1;--d:#B392F0">resumeNext</span><span style="--l:#24292E;--d:#E1E4E8">();</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	};</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#6F42C1;--d:#B392F0">run</span> <span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#D73A49;--d:#F97583">async</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#E36209;--d:#FFAB70">function_</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">resolve</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">arguments_</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`		<span style="--l:#6A737D;--d:#6A737D">// Execute the function and capture the result promise</span>`,`		<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">result</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">async</span><span style="--l:#24292E;--d:#E1E4E8"> () </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span> <span style="--l:#6F42C1;--d:#B392F0">function_</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#D73A49;--d:#F97583">...</span><span style="--l:#24292E;--d:#E1E4E8">arguments_))();</span>`,``,`		<span style="--l:#6A737D;--d:#6A737D">// Resolve immediately with the promise (don't wait for completion)</span>`,`		<span style="--l:#6F42C1;--d:#B392F0">resolve</span><span style="--l:#24292E;--d:#E1E4E8">(result);</span>`,``,`		<span style="--l:#6A737D;--d:#6A737D">// Wait for the function to complete (success or failure)</span>`,`		<span style="--l:#6A737D;--d:#6A737D">// We catch errors here to prevent unhandled rejections,</span>`,`		<span style="--l:#6A737D;--d:#6A737D">// but the original promise rejection is preserved for the caller</span>`,`		<span style="--l:#D73A49;--d:#F97583">try</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`			<span style="--l:#D73A49;--d:#F97583">await</span><span style="--l:#24292E;--d:#E1E4E8"> result;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		} </span><span style="--l:#D73A49;--d:#F97583">catch</span><span style="--l:#24292E;--d:#E1E4E8"> {}</span>`,``,`		<span style="--l:#6A737D;--d:#6A737D">// Decrement active count and process next queued function</span>`,`		<span style="--l:#6F42C1;--d:#B392F0">next</span><span style="--l:#24292E;--d:#E1E4E8">();</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	};</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#6F42C1;--d:#B392F0">enqueue</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#E36209;--d:#FFAB70">function_</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">resolve</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">reject</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">arguments_</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`		<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">queueItem</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> {reject};</span>`,``,`		<span style="--l:#6A737D;--d:#6A737D">// Queue the internal resolve function instead of the run function</span>`,`		<span style="--l:#6A737D;--d:#6A737D">// to preserve the asynchronous execution context.</span>`,`		<span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#005CC5;--d:#79B8FF">Promise</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#E36209;--d:#FFAB70">internalResolve</span> <span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> { </span><span style="--l:#6A737D;--d:#6A737D">// eslint-disable-line promise/param-names</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			queueItem.run </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> internalResolve;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			queue.</span><span style="--l:#6F42C1;--d:#B392F0">enqueue</span><span style="--l:#24292E;--d:#E1E4E8">(queueItem);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		}).</span><span style="--l:#6F42C1;--d:#B392F0">then</span><span style="--l:#24292E;--d:#E1E4E8">(run.</span><span style="--l:#6F42C1;--d:#B392F0">bind</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#005CC5;--d:#79B8FF">undefined</span><span style="--l:#24292E;--d:#E1E4E8">, function_, resolve, arguments_)); </span><span style="--l:#6A737D;--d:#6A737D">// eslint-disable-line promise/prefer-await-to-then</span>`,``,`		<span style="--l:#6A737D;--d:#6A737D">// Start processing immediately if we haven't reached the concurrency limit</span>`,`		<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (activeCount </span><span style="--l:#D73A49;--d:#F97583">&lt;</span><span style="--l:#24292E;--d:#E1E4E8"> concurrency) {</span>`,`			<span style="--l:#6F42C1;--d:#B392F0">resumeNext</span><span style="--l:#24292E;--d:#E1E4E8">();</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	};</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#6F42C1;--d:#B392F0">generator</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#E36209;--d:#FFAB70">function_</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#D73A49;--d:#F97583">...</span><span style="--l:#E36209;--d:#FFAB70">arguments_</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span> <span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#005CC5;--d:#79B8FF">Promise</span><span style="--l:#24292E;--d:#E1E4E8">((</span><span style="--l:#E36209;--d:#FFAB70">resolve</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">reject</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`		<span style="--l:#6F42C1;--d:#B392F0">enqueue</span><span style="--l:#24292E;--d:#E1E4E8">(function_, resolve, reject, arguments_);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	});</span>`]},Yt={code:`export default function dequal(foo, bar) {
	var ctor, len;
	if (foo === bar) return true;

	if (foo && bar && (ctor=foo.constructor) === bar.constructor) {
		if (ctor === Date) return foo.getTime() === bar.getTime();
		if (ctor === RegExp) return foo.toString() === bar.toString();

		if (ctor === Array) {
			if ((len=foo.length) === bar.length) {
			while (len-- && dequal(foo[len], bar[len]));
			}
			return len === -1;
		}

		if (!ctor || typeof foo === 'object') {
			len = 0;
			for (ctor in foo) {
				if (foo.hasOwnProperty(ctor) && ++len && !bar.hasOwnProperty(ctor)) return false;
				if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
		}
			return Object.keys(bar).length === len;
	}
	}

	return foo !== foo && bar !== bar;
}`,lines:[`<span style="--l:#D73A49;--d:#F97583">export</span> <span style="--l:#D73A49;--d:#F97583">default</span> <span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">dequal</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#E36209;--d:#FFAB70">foo</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">bar</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`	<span style="--l:#D73A49;--d:#F97583">var</span><span style="--l:#24292E;--d:#E1E4E8"> ctor, len;</span>`,`	<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (foo </span><span style="--l:#D73A49;--d:#F97583">===</span><span style="--l:#24292E;--d:#E1E4E8"> bar) </span><span style="--l:#D73A49;--d:#F97583">return</span> <span style="--l:#005CC5;--d:#79B8FF">true</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (foo </span><span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span><span style="--l:#24292E;--d:#E1E4E8"> bar </span><span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span><span style="--l:#24292E;--d:#E1E4E8"> (ctor</span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8">foo.</span><span style="--l:#005CC5;--d:#79B8FF">constructor</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">===</span><span style="--l:#24292E;--d:#E1E4E8"> bar.</span><span style="--l:#005CC5;--d:#79B8FF">constructor</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`		<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (ctor </span><span style="--l:#D73A49;--d:#F97583">===</span><span style="--l:#24292E;--d:#E1E4E8"> Date) </span><span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> foo.</span><span style="--l:#6F42C1;--d:#B392F0">getTime</span><span style="--l:#24292E;--d:#E1E4E8">() </span><span style="--l:#D73A49;--d:#F97583">===</span><span style="--l:#24292E;--d:#E1E4E8"> bar.</span><span style="--l:#6F42C1;--d:#B392F0">getTime</span><span style="--l:#24292E;--d:#E1E4E8">();</span>`,`		<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (ctor </span><span style="--l:#D73A49;--d:#F97583">===</span><span style="--l:#24292E;--d:#E1E4E8"> RegExp) </span><span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> foo.</span><span style="--l:#6F42C1;--d:#B392F0">toString</span><span style="--l:#24292E;--d:#E1E4E8">() </span><span style="--l:#D73A49;--d:#F97583">===</span><span style="--l:#24292E;--d:#E1E4E8"> bar.</span><span style="--l:#6F42C1;--d:#B392F0">toString</span><span style="--l:#24292E;--d:#E1E4E8">();</span>`,``,`		<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (ctor </span><span style="--l:#D73A49;--d:#F97583">===</span><span style="--l:#24292E;--d:#E1E4E8"> Array) {</span>`,`			<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> ((len</span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8">foo.</span><span style="--l:#005CC5;--d:#79B8FF">length</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">===</span><span style="--l:#24292E;--d:#E1E4E8"> bar.</span><span style="--l:#005CC5;--d:#79B8FF">length</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`			<span style="--l:#D73A49;--d:#F97583">while</span><span style="--l:#24292E;--d:#E1E4E8"> (len</span><span style="--l:#D73A49;--d:#F97583">--</span> <span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span> <span style="--l:#6F42C1;--d:#B392F0">dequal</span><span style="--l:#24292E;--d:#E1E4E8">(foo[len], bar[len]));</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			}</span>`,`			<span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> len </span><span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#D73A49;--d:#F97583">-</span><span style="--l:#005CC5;--d:#79B8FF">1</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		}</span>`,``,`		<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">ctor </span><span style="--l:#D73A49;--d:#F97583">||</span> <span style="--l:#D73A49;--d:#F97583">typeof</span><span style="--l:#24292E;--d:#E1E4E8"> foo </span><span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#032F62;--d:#9ECBFF">'object'</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">			len </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`			<span style="--l:#D73A49;--d:#F97583">for</span><span style="--l:#24292E;--d:#E1E4E8"> (ctor </span><span style="--l:#D73A49;--d:#F97583">in</span><span style="--l:#24292E;--d:#E1E4E8"> foo) {</span>`,`				<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (foo.</span><span style="--l:#6F42C1;--d:#B392F0">hasOwnProperty</span><span style="--l:#24292E;--d:#E1E4E8">(ctor) </span><span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span> <span style="--l:#D73A49;--d:#F97583">++</span><span style="--l:#24292E;--d:#E1E4E8">len </span><span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span> <span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">bar.</span><span style="--l:#6F42C1;--d:#B392F0">hasOwnProperty</span><span style="--l:#24292E;--d:#E1E4E8">(ctor)) </span><span style="--l:#D73A49;--d:#F97583">return</span> <span style="--l:#005CC5;--d:#79B8FF">false</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`				<span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">(ctor </span><span style="--l:#D73A49;--d:#F97583">in</span><span style="--l:#24292E;--d:#E1E4E8"> bar) </span><span style="--l:#D73A49;--d:#F97583">||</span> <span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#6F42C1;--d:#B392F0">dequal</span><span style="--l:#24292E;--d:#E1E4E8">(foo[ctor], bar[ctor])) </span><span style="--l:#D73A49;--d:#F97583">return</span> <span style="--l:#005CC5;--d:#79B8FF">false</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">		}</span>`,`			<span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> Object.</span><span style="--l:#6F42C1;--d:#B392F0">keys</span><span style="--l:#24292E;--d:#E1E4E8">(bar).</span><span style="--l:#005CC5;--d:#79B8FF">length</span> <span style="--l:#D73A49;--d:#F97583">===</span><span style="--l:#24292E;--d:#E1E4E8"> len;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	}</span>`,`<span style="--l:#24292E;--d:#E1E4E8">	}</span>`,``,`	<span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> foo </span><span style="--l:#D73A49;--d:#F97583">!==</span><span style="--l:#24292E;--d:#E1E4E8"> foo </span><span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span><span style="--l:#24292E;--d:#E1E4E8"> bar </span><span style="--l:#D73A49;--d:#F97583">!==</span><span style="--l:#24292E;--d:#E1E4E8"> bar;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`]},Xt={code:`const createStoreImpl: CreateStoreImpl = (createState) => {
  type TState = ReturnType<typeof createState>
  type Listener = (state: TState, prevState: TState) => void
  let state: TState
  const listeners: Set<Listener> = new Set()

  const setState: StoreApi<TState>['setState'] = (partial, replace) => {
    // TODO: Remove type assertion once https://github.com/microsoft/TypeScript/issues/37663 is resolved
    // https://github.com/microsoft/TypeScript/issues/37663#issuecomment-759728342
    const nextState =
      typeof partial === 'function'
        ? (partial as (state: TState) => TState)(state)
        : partial
    if (!Object.is(nextState, state)) {
      const previousState = state
      state =
        (replace ?? (typeof nextState !== 'object' || nextState === null))
          ? (nextState as TState)
          : Object.assign({}, state, nextState)
      listeners.forEach((listener) => listener(state, previousState))
    }
  }

  const getState: StoreApi<TState>['getState'] = () => state

  const getInitialState: StoreApi<TState>['getInitialState'] = () =>
    initialState

  const subscribe: StoreApi<TState>['subscribe'] = (listener) => {
    listeners.add(listener)
    // Unsubscribe
    return () => listeners.delete(listener)
  }

  const api = { setState, getState, getInitialState, subscribe }
  const initialState = (state = createState(setState, getState, api))
  return api as any
}

export const createStore = ((createState) =>
  createState ? createStoreImpl(createState) : createStoreImpl) as CreateStore`,lines:[`<span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#6F42C1;--d:#B392F0">createStoreImpl</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">CreateStoreImpl</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#E36209;--d:#FFAB70">createState</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`  <span style="--l:#D73A49;--d:#F97583">type</span> <span style="--l:#6F42C1;--d:#B392F0">TState</span> <span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#6F42C1;--d:#B392F0">ReturnType</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#D73A49;--d:#F97583">typeof</span><span style="--l:#24292E;--d:#E1E4E8"> createState&gt;</span>`,`  <span style="--l:#D73A49;--d:#F97583">type</span> <span style="--l:#6F42C1;--d:#B392F0">Listener</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#E36209;--d:#FFAB70">state</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">TState</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">prevState</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">TState</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span> <span style="--l:#005CC5;--d:#79B8FF">void</span>`,`  <span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> state</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">TState</span>`,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">listeners</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Set</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">Listener</span><span style="--l:#24292E;--d:#E1E4E8">&gt; </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#D73A49;--d:#F97583">new</span> <span style="--l:#6F42C1;--d:#B392F0">Set</span><span style="--l:#24292E;--d:#E1E4E8">()</span>`,``,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#6F42C1;--d:#B392F0">setState</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">StoreApi</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">TState</span><span style="--l:#24292E;--d:#E1E4E8">&gt;[</span><span style="--l:#032F62;--d:#9ECBFF">'setState'</span><span style="--l:#24292E;--d:#E1E4E8">] </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#E36209;--d:#FFAB70">partial</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">replace</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`    <span style="--l:#6A737D;--d:#6A737D">// TODO: Remove type assertion once https://github.com/microsoft/TypeScript/issues/37663 is resolved</span>`,`    <span style="--l:#6A737D;--d:#6A737D">// https://github.com/microsoft/TypeScript/issues/37663#issuecomment-759728342</span>`,`    <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">nextState</span> <span style="--l:#D73A49;--d:#F97583">=</span>`,`      <span style="--l:#D73A49;--d:#F97583">typeof</span><span style="--l:#24292E;--d:#E1E4E8"> partial </span><span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#032F62;--d:#9ECBFF">'function'</span>`,`        <span style="--l:#D73A49;--d:#F97583">?</span><span style="--l:#24292E;--d:#E1E4E8"> (partial </span><span style="--l:#D73A49;--d:#F97583">as</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#E36209;--d:#FFAB70">state</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">TState</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span> <span style="--l:#6F42C1;--d:#B392F0">TState</span><span style="--l:#24292E;--d:#E1E4E8">)(state)</span>`,`        <span style="--l:#D73A49;--d:#F97583">:</span><span style="--l:#24292E;--d:#E1E4E8"> partial</span>`,`    <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">!</span><span style="--l:#24292E;--d:#E1E4E8">Object.</span><span style="--l:#6F42C1;--d:#B392F0">is</span><span style="--l:#24292E;--d:#E1E4E8">(nextState, state)) {</span>`,`      <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">previousState</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> state</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      state </span><span style="--l:#D73A49;--d:#F97583">=</span>`,`<span style="--l:#24292E;--d:#E1E4E8">        (replace </span><span style="--l:#D73A49;--d:#F97583">??</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#D73A49;--d:#F97583">typeof</span><span style="--l:#24292E;--d:#E1E4E8"> nextState </span><span style="--l:#D73A49;--d:#F97583">!==</span> <span style="--l:#032F62;--d:#9ECBFF">'object'</span> <span style="--l:#D73A49;--d:#F97583">||</span><span style="--l:#24292E;--d:#E1E4E8"> nextState </span><span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#005CC5;--d:#79B8FF">null</span><span style="--l:#24292E;--d:#E1E4E8">))</span>`,`          <span style="--l:#D73A49;--d:#F97583">?</span><span style="--l:#24292E;--d:#E1E4E8"> (nextState </span><span style="--l:#D73A49;--d:#F97583">as</span> <span style="--l:#6F42C1;--d:#B392F0">TState</span><span style="--l:#24292E;--d:#E1E4E8">)</span>`,`          <span style="--l:#D73A49;--d:#F97583">:</span><span style="--l:#24292E;--d:#E1E4E8"> Object.</span><span style="--l:#6F42C1;--d:#B392F0">assign</span><span style="--l:#24292E;--d:#E1E4E8">({}, state, nextState)</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      listeners.</span><span style="--l:#6F42C1;--d:#B392F0">forEach</span><span style="--l:#24292E;--d:#E1E4E8">((</span><span style="--l:#E36209;--d:#FFAB70">listener</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span> <span style="--l:#6F42C1;--d:#B392F0">listener</span><span style="--l:#24292E;--d:#E1E4E8">(state, previousState))</span>`,`<span style="--l:#24292E;--d:#E1E4E8">    }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  }</span>`,``,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#6F42C1;--d:#B392F0">getState</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">StoreApi</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">TState</span><span style="--l:#24292E;--d:#E1E4E8">&gt;[</span><span style="--l:#032F62;--d:#9ECBFF">'getState'</span><span style="--l:#24292E;--d:#E1E4E8">] </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> () </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> state</span>`,``,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#6F42C1;--d:#B392F0">getInitialState</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">StoreApi</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">TState</span><span style="--l:#24292E;--d:#E1E4E8">&gt;[</span><span style="--l:#032F62;--d:#9ECBFF">'getInitialState'</span><span style="--l:#24292E;--d:#E1E4E8">] </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> () </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">    initialState</span>`,``,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#6F42C1;--d:#B392F0">subscribe</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">StoreApi</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">TState</span><span style="--l:#24292E;--d:#E1E4E8">&gt;[</span><span style="--l:#032F62;--d:#9ECBFF">'subscribe'</span><span style="--l:#24292E;--d:#E1E4E8">] </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#E36209;--d:#FFAB70">listener</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">    listeners.</span><span style="--l:#6F42C1;--d:#B392F0">add</span><span style="--l:#24292E;--d:#E1E4E8">(listener)</span>`,`    <span style="--l:#6A737D;--d:#6A737D">// Unsubscribe</span>`,`    <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> () </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span><span style="--l:#24292E;--d:#E1E4E8"> listeners.</span><span style="--l:#6F42C1;--d:#B392F0">delete</span><span style="--l:#24292E;--d:#E1E4E8">(listener)</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  }</span>`,``,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">api</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> { setState, getState, getInitialState, subscribe }</span>`,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">initialState</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> (state </span><span style="--l:#D73A49;--d:#F97583">=</span> <span style="--l:#6F42C1;--d:#B392F0">createState</span><span style="--l:#24292E;--d:#E1E4E8">(setState, getState, api))</span>`,`  <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> api </span><span style="--l:#D73A49;--d:#F97583">as</span> <span style="--l:#005CC5;--d:#79B8FF">any</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`,``,`<span style="--l:#D73A49;--d:#F97583">export</span> <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">createStore</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> ((</span><span style="--l:#E36209;--d:#FFAB70">createState</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">=&gt;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  createState </span><span style="--l:#D73A49;--d:#F97583">?</span> <span style="--l:#6F42C1;--d:#B392F0">createStoreImpl</span><span style="--l:#24292E;--d:#E1E4E8">(createState) </span><span style="--l:#D73A49;--d:#F97583">:</span><span style="--l:#24292E;--d:#E1E4E8"> createStoreImpl) </span><span style="--l:#D73A49;--d:#F97583">as</span> <span style="--l:#6F42C1;--d:#B392F0">CreateStore</span>`]},Zt={code:`export function push<T: Node>(heap: Heap<T>, node: T): void {
  const index = heap.length;
  heap.push(node);
  siftUp(heap, node, index);
}

export function peek<T: Node>(heap: Heap<T>): T | null {
  return heap.length === 0 ? null : heap[0];
}

export function pop<T: Node>(heap: Heap<T>): T | null {
  if (heap.length === 0) {
    return null;
  }
  const first = heap[0];
  const last = heap.pop();
  if (last !== first) {
    // $FlowFixMe[incompatible-type]
    heap[0] = last;
    // $FlowFixMe[incompatible-type]
    siftDown(heap, last, 0);
  }
  return first;
}

function siftUp<T: Node>(heap: Heap<T>, node: T, i: number): void {
  let index = i;
  while (index > 0) {
    const parentIndex = (index - 1) >>> 1;
    const parent = heap[parentIndex];
    if (compare(parent, node) > 0) {
      // The parent is larger. Swap positions.
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else {
      // The parent is smaller. Exit.
      return;
    }
  }
}

function siftDown<T: Node>(heap: Heap<T>, node: T, i: number): void {
  let index = i;
  const length = heap.length;
  const halfLength = length >>> 1;
  while (index < halfLength) {
    const leftIndex = (index + 1) * 2 - 1;
    const left = heap[leftIndex];
    const rightIndex = leftIndex + 1;
    const right = heap[rightIndex];

    // If the left or right node is smaller, swap with the smaller of those.
    if (compare(left, node) < 0) {
      if (rightIndex < length && compare(right, left) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (rightIndex < length && compare(right, node) < 0) {
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      // Neither child is smaller. Exit.
      return;
    }
  }
}

function compare(a: Node, b: Node) {
  // Compare sort index first, then task id.
  const diff = a.sortIndex - b.sortIndex;
  return diff !== 0 ? diff : a.id - b.id;
}`,lines:[`<span style="--l:#D73A49;--d:#F97583">export</span> <span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">push</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">T</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Node</span><span style="--l:#24292E;--d:#E1E4E8">&gt;(</span><span style="--l:#E36209;--d:#FFAB70">heap</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Heap</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">T</span><span style="--l:#24292E;--d:#E1E4E8">&gt;, </span><span style="--l:#E36209;--d:#FFAB70">node</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">T</span><span style="--l:#24292E;--d:#E1E4E8">)</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">void</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">index</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> heap.</span><span style="--l:#005CC5;--d:#79B8FF">length</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  heap.</span><span style="--l:#6F42C1;--d:#B392F0">push</span><span style="--l:#24292E;--d:#E1E4E8">(node);</span>`,`  <span style="--l:#6F42C1;--d:#B392F0">siftUp</span><span style="--l:#24292E;--d:#E1E4E8">(heap, node, index);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`,``,`<span style="--l:#D73A49;--d:#F97583">export</span> <span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">peek</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">T</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Node</span><span style="--l:#24292E;--d:#E1E4E8">&gt;(</span><span style="--l:#E36209;--d:#FFAB70">heap</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Heap</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">T</span><span style="--l:#24292E;--d:#E1E4E8">&gt;)</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">T</span> <span style="--l:#D73A49;--d:#F97583">|</span> <span style="--l:#005CC5;--d:#79B8FF">null</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`  <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> heap.</span><span style="--l:#005CC5;--d:#79B8FF">length</span> <span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#005CC5;--d:#79B8FF">0</span> <span style="--l:#D73A49;--d:#F97583">?</span> <span style="--l:#005CC5;--d:#79B8FF">null</span> <span style="--l:#D73A49;--d:#F97583">:</span><span style="--l:#24292E;--d:#E1E4E8"> heap[</span><span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">];</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`,``,`<span style="--l:#D73A49;--d:#F97583">export</span> <span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">pop</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">T</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Node</span><span style="--l:#24292E;--d:#E1E4E8">&gt;(</span><span style="--l:#E36209;--d:#FFAB70">heap</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Heap</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">T</span><span style="--l:#24292E;--d:#E1E4E8">&gt;)</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">T</span> <span style="--l:#D73A49;--d:#F97583">|</span> <span style="--l:#005CC5;--d:#79B8FF">null</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`  <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (heap.</span><span style="--l:#005CC5;--d:#79B8FF">length</span> <span style="--l:#D73A49;--d:#F97583">===</span> <span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`    <span style="--l:#D73A49;--d:#F97583">return</span> <span style="--l:#005CC5;--d:#79B8FF">null</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  }</span>`,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">first</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> heap[</span><span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">];</span>`,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">last</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> heap.</span><span style="--l:#6F42C1;--d:#B392F0">pop</span><span style="--l:#24292E;--d:#E1E4E8">();</span>`,`  <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (last </span><span style="--l:#D73A49;--d:#F97583">!==</span><span style="--l:#24292E;--d:#E1E4E8"> first) {</span>`,`    <span style="--l:#6A737D;--d:#6A737D">// $FlowFixMe[incompatible-type]</span>`,`<span style="--l:#24292E;--d:#E1E4E8">    heap[</span><span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">] </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> last;</span>`,`    <span style="--l:#6A737D;--d:#6A737D">// $FlowFixMe[incompatible-type]</span>`,`    <span style="--l:#6F42C1;--d:#B392F0">siftDown</span><span style="--l:#24292E;--d:#E1E4E8">(heap, last, </span><span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">);</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  }</span>`,`  <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> first;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`,``,`<span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">siftUp</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">T</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Node</span><span style="--l:#24292E;--d:#E1E4E8">&gt;(</span><span style="--l:#E36209;--d:#FFAB70">heap</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Heap</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">T</span><span style="--l:#24292E;--d:#E1E4E8">&gt;, </span><span style="--l:#E36209;--d:#FFAB70">node</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">T</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">i</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">number</span><span style="--l:#24292E;--d:#E1E4E8">)</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">void</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`  <span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> index </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> i;</span>`,`  <span style="--l:#D73A49;--d:#F97583">while</span><span style="--l:#24292E;--d:#E1E4E8"> (index </span><span style="--l:#D73A49;--d:#F97583">&gt;</span> <span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`    <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">parentIndex</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> (index </span><span style="--l:#D73A49;--d:#F97583">-</span> <span style="--l:#005CC5;--d:#79B8FF">1</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">&gt;&gt;&gt;</span> <span style="--l:#005CC5;--d:#79B8FF">1</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`    <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">parent</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> heap[parentIndex];</span>`,`    <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#6F42C1;--d:#B392F0">compare</span><span style="--l:#24292E;--d:#E1E4E8">(parent, node) </span><span style="--l:#D73A49;--d:#F97583">&gt;</span> <span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`      <span style="--l:#6A737D;--d:#6A737D">// The parent is larger. Swap positions.</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      heap[parentIndex] </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> node;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      heap[index] </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> parent;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      index </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> parentIndex;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">    } </span><span style="--l:#D73A49;--d:#F97583">else</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`      <span style="--l:#6A737D;--d:#6A737D">// The parent is smaller. Exit.</span>`,`      <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">    }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`,``,`<span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">siftDown</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">T</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Node</span><span style="--l:#24292E;--d:#E1E4E8">&gt;(</span><span style="--l:#E36209;--d:#FFAB70">heap</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Heap</span><span style="--l:#24292E;--d:#E1E4E8">&lt;</span><span style="--l:#6F42C1;--d:#B392F0">T</span><span style="--l:#24292E;--d:#E1E4E8">&gt;, </span><span style="--l:#E36209;--d:#FFAB70">node</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">T</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">i</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">number</span><span style="--l:#24292E;--d:#E1E4E8">)</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#005CC5;--d:#79B8FF">void</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`  <span style="--l:#D73A49;--d:#F97583">let</span><span style="--l:#24292E;--d:#E1E4E8"> index </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> i;</span>`,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">length</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> heap.</span><span style="--l:#005CC5;--d:#79B8FF">length</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">halfLength</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> length </span><span style="--l:#D73A49;--d:#F97583">&gt;&gt;&gt;</span> <span style="--l:#005CC5;--d:#79B8FF">1</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`  <span style="--l:#D73A49;--d:#F97583">while</span><span style="--l:#24292E;--d:#E1E4E8"> (index </span><span style="--l:#D73A49;--d:#F97583">&lt;</span><span style="--l:#24292E;--d:#E1E4E8"> halfLength) {</span>`,`    <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">leftIndex</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> (index </span><span style="--l:#D73A49;--d:#F97583">+</span> <span style="--l:#005CC5;--d:#79B8FF">1</span><span style="--l:#24292E;--d:#E1E4E8">) </span><span style="--l:#D73A49;--d:#F97583">*</span> <span style="--l:#005CC5;--d:#79B8FF">2</span> <span style="--l:#D73A49;--d:#F97583">-</span> <span style="--l:#005CC5;--d:#79B8FF">1</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`    <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">left</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> heap[leftIndex];</span>`,`    <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">rightIndex</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> leftIndex </span><span style="--l:#D73A49;--d:#F97583">+</span> <span style="--l:#005CC5;--d:#79B8FF">1</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`    <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">right</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> heap[rightIndex];</span>`,``,`    <span style="--l:#6A737D;--d:#6A737D">// If the left or right node is smaller, swap with the smaller of those.</span>`,`    <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (</span><span style="--l:#6F42C1;--d:#B392F0">compare</span><span style="--l:#24292E;--d:#E1E4E8">(left, node) </span><span style="--l:#D73A49;--d:#F97583">&lt;</span> <span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`      <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (rightIndex </span><span style="--l:#D73A49;--d:#F97583">&lt;</span><span style="--l:#24292E;--d:#E1E4E8"> length </span><span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span> <span style="--l:#6F42C1;--d:#B392F0">compare</span><span style="--l:#24292E;--d:#E1E4E8">(right, left) </span><span style="--l:#D73A49;--d:#F97583">&lt;</span> <span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">        heap[index] </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> right;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">        heap[rightIndex] </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> node;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">        index </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> rightIndex;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      } </span><span style="--l:#D73A49;--d:#F97583">else</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">        heap[index] </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> left;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">        heap[leftIndex] </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> node;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">        index </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> leftIndex;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">    } </span><span style="--l:#D73A49;--d:#F97583">else</span> <span style="--l:#D73A49;--d:#F97583">if</span><span style="--l:#24292E;--d:#E1E4E8"> (rightIndex </span><span style="--l:#D73A49;--d:#F97583">&lt;</span><span style="--l:#24292E;--d:#E1E4E8"> length </span><span style="--l:#D73A49;--d:#F97583">&amp;&amp;</span> <span style="--l:#6F42C1;--d:#B392F0">compare</span><span style="--l:#24292E;--d:#E1E4E8">(right, node) </span><span style="--l:#D73A49;--d:#F97583">&lt;</span> <span style="--l:#005CC5;--d:#79B8FF">0</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      heap[index] </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> right;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      heap[rightIndex] </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> node;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">      index </span><span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> rightIndex;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">    } </span><span style="--l:#D73A49;--d:#F97583">else</span><span style="--l:#24292E;--d:#E1E4E8"> {</span>`,`      <span style="--l:#6A737D;--d:#6A737D">// Neither child is smaller. Exit.</span>`,`      <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8">;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">    }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">  }</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`,``,`<span style="--l:#D73A49;--d:#F97583">function</span> <span style="--l:#6F42C1;--d:#B392F0">compare</span><span style="--l:#24292E;--d:#E1E4E8">(</span><span style="--l:#E36209;--d:#FFAB70">a</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Node</span><span style="--l:#24292E;--d:#E1E4E8">, </span><span style="--l:#E36209;--d:#FFAB70">b</span><span style="--l:#D73A49;--d:#F97583">:</span> <span style="--l:#6F42C1;--d:#B392F0">Node</span><span style="--l:#24292E;--d:#E1E4E8">) {</span>`,`  <span style="--l:#6A737D;--d:#6A737D">// Compare sort index first, then task id.</span>`,`  <span style="--l:#D73A49;--d:#F97583">const</span> <span style="--l:#005CC5;--d:#79B8FF">diff</span> <span style="--l:#D73A49;--d:#F97583">=</span><span style="--l:#24292E;--d:#E1E4E8"> a.sortIndex </span><span style="--l:#D73A49;--d:#F97583">-</span><span style="--l:#24292E;--d:#E1E4E8"> b.sortIndex;</span>`,`  <span style="--l:#D73A49;--d:#F97583">return</span><span style="--l:#24292E;--d:#E1E4E8"> diff </span><span style="--l:#D73A49;--d:#F97583">!==</span> <span style="--l:#005CC5;--d:#79B8FF">0</span> <span style="--l:#D73A49;--d:#F97583">?</span><span style="--l:#24292E;--d:#E1E4E8"> diff </span><span style="--l:#D73A49;--d:#F97583">:</span><span style="--l:#24292E;--d:#E1E4E8"> a.id </span><span style="--l:#D73A49;--d:#F97583">-</span><span style="--l:#24292E;--d:#E1E4E8"> b.id;</span>`,`<span style="--l:#24292E;--d:#E1E4E8">}</span>`]},Qt=`<div class="lead"><p><strong>ひとことで言うと</strong>: <code>clsx</code> は「渡されたものの中から、使えるものだけを拾って、空白でつなぐ」関数です。<code>0</code>・<code>null</code>・<code>e: 0</code> の3つが捨てられ、残りがつながって <code>&quot;a b c d f 2&quot;</code> になります。</p>
</div><h3>まず、言葉の確認</h3>
<p><strong>falsy（フォルシー）</strong> とは、<code>if (…)</code> の中に置いたとき「偽」として扱われる値のことです。JavaScript では次の値が falsy です。</p>
<p><span class="tag ng">false</span> <span class="tag ng">0</span> <span class="tag ng">&#39;&#39; (空文字)</span> <span class="tag ng">null</span> <span class="tag ng">undefined</span> <span class="tag ng">NaN</span></p>
<p>これ以外（<code>&#39;a&#39;</code>、<code>2</code>、<code>true</code>、配列、オブジェクトなど）は全部 <strong>truthy（トゥルーシー、真として扱われる）</strong> です。<code>clsx</code> は、この「falsy なら捨てる」を何度も使っています。</p>
<div class="note"><p><strong><code>clsx</code> は何に使う？</strong> React などで HTML の <code>class</code> を組み立てるときに使います。<code>clsx(&#39;btn&#39;, isActive &amp;&amp; &#39;active&#39;)</code> と書けば、<code>isActive</code> が <code>false</code> のときは <code>&#39;active&#39;</code> が消えて <code>&quot;btn&quot;</code> だけになります。「条件つきで入れたり消したりしたい」ので、falsy を捨てる作りになっているわけです。</p>
</div><h3>図で見る：何が残って、何が捨てられるか</h3>
<p>引数を1つずつ見ていきます。<span class="tag ok">残る</span> は結果に入るもの、<span class="tag ng">捨てる</span> は消えるものです。</p>
<figure class="fig">
<ul class="tree">
<li><b>clsx( … ) の引数</b>
<ul>
<li><code>'a'</code> <span class="tag ok">残る → "a"</span> <span class="muted">文字列はそのまま（5行目）</span></li>
<li><code>0</code> <span class="tag ng">捨てる</span> <span class="muted">falsy なので入口で弾かれる（33行目）</span></li>
<li><code>['b', [ … ]]</code> <span class="tag acc">配列 → 中身を1つずつ見る</span> <span class="muted">（7〜16行目）</span>
<ul>
<li><code>'b'</code> <span class="tag ok">残る → "b"</span></li>
<li><code>[null, 'c', { … }]</code> <span class="tag acc">配列の中の配列 → また中身を見る</span>
<ul>
<li><code>null</code> <span class="tag ng">捨てる</span> <span class="muted">falsy（10行目）</span></li>
<li><code>'c'</code> <span class="tag ok">残る → "c"</span></li>
<li><code>{ d: true, e: 0 }</code> <span class="tag acc">オブジェクト → キーを見る</span> <span class="muted">（18〜23行目）</span>
<ul>
<li><code>d: true</code> <span class="tag ok">残る → "d"</span> <span class="muted">値が truthy なのでキー名を使う（19行目）</span></li>
<li><code>e: 0</code> <span class="tag ng">捨てる</span> <span class="muted">値が falsy（19行目）</span></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li><code>{ f: 1 }</code> <span class="tag acc">オブジェクト</span>
<ul>
<li><code>f: 1</code> <span class="tag ok">残る → "f"</span></li>
</ul>
</li>
<li><code>2</code> <span class="tag ok">残る → "2"</span> <span class="muted">数値も文字列としてくっつく（5行目）</span></li>
</ul>
</li>
</ul>
<figcaption>残ったものを上から順に並べると a, b, c, d, f, 2</figcaption>
</figure><h3>コードを順番に追う</h3>
<p><strong>① 入口（<code>clsx</code> 本体、32〜39行目）</strong></p>
<p><code>for</code> で引数を1つずつ取り出し、<strong>33行目</strong> の <code>if (tmp = arguments[i])</code> で falsy なものを捨てます。<code>0</code> はここで消えます。</p>
<p>この行は「<code>tmp</code> に代入して、その値で if 判定する」を1行でやっています。<code>==</code> の書き間違いではありません。</p>
<p><strong>② 中身の仕分け（<code>toVal</code>、1〜27行目）</strong></p>
<p>入口を通ったものは <code>toVal</code> に渡され、<strong>型によって3通り</strong> に分かれます。</p>
<table>
<thead>
<tr>
<th>渡されたもの</th>
<th>どうなる</th>
<th>行</th>
</tr>
</thead>
<tbody><tr>
<td>文字列・数値</td>
<td>そのまま文字にする</td>
<td>4〜5行目</td>
</tr>
<tr>
<td>配列</td>
<td>中身を1つずつ見る。falsy は捨て、残りは <strong>もう一度 <code>toVal</code> に渡す</strong></td>
<td>7〜16行目</td>
</tr>
<tr>
<td>オブジェクト</td>
<td><strong>値が truthy なキーの名前</strong> だけを使う</td>
<td>18〜23行目</td>
</tr>
</tbody></table>
<p>配列の中身を <code>toVal</code> に渡し直す（11行目）ので、配列が何重に入れ子になっていても、奥のほうまで同じルールで処理されます。このように関数が自分自身を呼ぶことを <strong>再帰</strong> といいます。</p>
<p><strong>③ 空白でつなぐ</strong></p>
<p><code>str &amp;&amp; (str += &#39; &#39;)</code> は「<code>str</code> にもう何か入っているときだけ、空白を1つ足す」という意味です。</p>
<table>
<thead>
<tr>
<th>足すもの</th>
<th>足す前の str</th>
<th>空白を足す？</th>
<th>足した後の str</th>
</tr>
</thead>
<tbody><tr>
<td><code>&quot;a&quot;</code></td>
<td><code>&quot;&quot;</code>（空）</td>
<td>足さない</td>
<td><code>&quot;a&quot;</code></td>
</tr>
<tr>
<td><code>&quot;b c d&quot;</code></td>
<td><code>&quot;a&quot;</code></td>
<td>足す</td>
<td><code>&quot;a b c d&quot;</code></td>
</tr>
<tr>
<td><code>&quot;f&quot;</code></td>
<td><code>&quot;a b c d&quot;</code></td>
<td>足す</td>
<td><code>&quot;a b c d f&quot;</code></td>
</tr>
<tr>
<td><code>&quot;2&quot;</code></td>
<td><code>&quot;a b c d f&quot;</code></td>
<td>足す</td>
<td><code>&quot;a b c d f 2&quot;</code></td>
</tr>
</tbody></table>
<p>最初の1個のときは空白を足さないので、先頭に余計な空白がつきません。</p>
<h3>ここがポイント</h3>
<ul>
<li>数値の <code>0</code> は「数値だから残る」のではなく、<strong>falsy だから先に捨てられる</strong>。数値の処理（5行目）までたどり着かない</li>
<li>オブジェクトは <strong>値ではなくキーの名前</strong> が出てくる。<code>{ d: true }</code> から出てくるのは <code>&quot;d&quot;</code></li>
<li>中身が全部捨てられて空っぽ（<code>&quot;&quot;</code>）になったものは、11行目・34行目の <code>if (y = toVal(…))</code> で弾かれる。だから空白が二重になることもない</li>
</ul>
`,$t=`<div class="lead"><p><strong>ひとことで言うと</strong>: 本番用にビルドすると、<strong>20行目より後ろのコードが丸ごと消える</strong> ように書かれています。メッセージを組み立てるコードがアプリに入らなくなり、ファイルが小さくなる。それがねらいです。</p>
</div><h3>まず、言葉の確認</h3>
<p><strong>invariant（インバリアント）</strong> は「絶対に成り立っているはずの条件」のことです。<code>invariant(user, &#39;user がいない&#39;)</code> と書くと、「<code>user</code> があるはず。なかったらバグなのでエラーにして止めて」という意味になります。</p>
<p><strong>ビルド</strong> は、書いたソースコードを「ブラウザに配る用のファイル」に変換する作業です。このとき、たくさんのファイルを1つにまとめる道具を <strong>バンドラ</strong>（webpack、Vite など）といいます。</p>
<p><strong><code>process.env.NODE_ENV</code></strong> は「いま開発中か、本番用か」を表す値です。本番ビルドでは、バンドラがこの部分を <strong>文字列 <code>&quot;production&quot;</code> に書き換えて</strong> しまいます。</p>
<p><strong>ミニファイ（minify）</strong> は、配るファイルを小さくするために、空白や不要なコードを削る作業です。「絶対に実行されないコード」も削ってくれます。</p>
<div class="note"><p><strong>たとえ話</strong>: 引っ越しの荷造りで「この部屋はもう使わない」と決まっていたら、その部屋の荷物は箱に詰めませんよね。ミニファイも同じで、「絶対に通らない」と分かったコードは箱（配るファイル）に入れません。</p>
</div><h3>図で見る：この関数の通り道</h3>
<figure class="fig">
<svg viewBox="0 0 340 330" width="340" role="img" aria-label="invariant の流れ図。条件が真なら return。偽なら本番かどうかを見て、本番なら20行目で Invariant failed を投げる。開発なら26から32行目でメッセージを作って投げる。本番では開発側の道に絶対に進まないので削除できる。">
<defs><marker id="p002-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<rect x="30" y="6" width="160" height="34" rx="8" class="b"/>
<text x="110" y="28" text-anchor="middle" class="mono">invariant(…)</text>
<line x1="110" y1="40" x2="110" y2="58" class="l" marker-end="url(#p002-ah)"/>
<rect x="10" y="60" width="200" height="38" rx="8" class="b"/>
<text x="110" y="84" text-anchor="middle">条件は真？（13行目）</text>
<line x1="210" y1="79" x2="256" y2="79" class="l" marker-end="url(#p002-ah)"/>
<text x="233" y="71" text-anchor="middle" class="sm tok">はい</text>
<rect x="258" y="62" width="76" height="34" rx="8" class="bok"/>
<text x="296" y="84" text-anchor="middle" class="mono">return</text>
<line x1="110" y1="98" x2="110" y2="128" class="l" marker-end="url(#p002-ah)"/>
<text x="120" y="118" class="sm tng">いいえ</text>
<rect x="10" y="130" width="200" height="38" rx="8" class="ba"/>
<text x="110" y="154" text-anchor="middle">本番？（19行目）</text>
<line x1="110" y1="168" x2="110" y2="198" class="l" marker-end="url(#p002-ah)"/>
<text x="120" y="188" class="sm">はい</text>
<rect x="10" y="200" width="200" height="56" rx="8" class="bng"/>
<text x="110" y="222" text-anchor="middle" class="sm">20行目で throw</text>
<text x="110" y="243" text-anchor="middle" class="sm mono">Error('Invariant failed')</text>
<polyline points="210,149 279,149 279,198" class="l" marker-end="url(#p002-ah)"/>
<text x="245" y="141" text-anchor="middle" class="sm">いいえ</text>
<rect x="222" y="200" width="114" height="76" rx="8" class="b dash"/>
<text x="279" y="222" text-anchor="middle" class="sm">26〜32行目</text>
<text x="279" y="243" text-anchor="middle" class="sm">メッセージを</text>
<text x="279" y="264" text-anchor="middle" class="sm">作って throw</text>
<text x="170" y="302" text-anchor="middle" class="sm ta bold">本番では「いいえ」の道に絶対に進まない</text>
<text x="170" y="322" text-anchor="middle" class="sm ta bold">→ 点線の箱はまるごと削除できる</text>
</svg>
<figcaption>本番ビルドでは「本番？」の答えが常に「はい」に決まる</figcaption>
</figure><h3>図で見る：ビルドの前と後</h3>
<p>本番ビルドで何が起きるかを、ざっくり並べると次のようになります（実際の出力はもっと短く圧縮されます）。</p>
<figure class="fig">
<h4 style="margin:0 0 6px">① 書いたコード</h4>
<pre><code>const isProduction =
  process.env.NODE_ENV === 'production';
if (isProduction) {
  throw new Error(prefix);
}
const provided = …;
const value = …;
throw new Error(value);</code></pre>
<h4 style="margin:14px 0 6px">② バンドラが NODE_ENV を書き換えた後</h4>
<pre><code>const isProduction =
  'production' === 'production';
// ↑ いつでも true
if (true) {
  throw new Error(prefix);
}
const provided = …;  // 届かない
const value = …;     // 届かない
throw new Error(value); // 届かない</code></pre>
<h4 style="margin:14px 0 6px">③ ミニファイした後</h4>
<pre><code>throw new Error(prefix);
// 届かない行は全部消えた</code></pre>
<figcaption>メッセージを作るコード（26〜32行目）が配るファイルから消える</figcaption>
</figure><h3>コードを順番に追う</h3>
<p><strong>① 1行目</strong>: <code>isProduction</code> は「<code>NODE_ENV</code> が <code>&#39;production&#39;</code> かどうか」です。本番ビルドではバンドラがここを文字列に置き換えるので、<code>isProduction</code> は <strong>いつでも <code>true</code></strong> という定数になります。</p>
<p><strong>② 13〜15行目</strong>: <code>condition</code> が真なら、何もせずに <code>return</code> します。問題がないときはここで終わりです。</p>
<p><strong>③ 19〜21行目</strong>: 条件が偽で、しかも本番なら、<code>prefix</code>（<code>&#39;Invariant failed&#39;</code>）だけを入れたエラーを投げます。<code>throw</code> した時点で関数は終わります。</p>
<p><strong>④ 23〜32行目</strong>: 開発中だけ通る部分です。<strong>24行目のコメント</strong> に <em>This block will be removed in production builds</em>（このブロックは本番ビルドで削除される）とはっきり書かれています。ここでメッセージを用意して、<code>&#39;Invariant failed: user がいない&#39;</code> のようなエラーを投げます。</p>
<p>本番では ③ で必ず <code>throw</code> するので、④ には絶対に届きません。届かないコードはミニファイで削除できます。これがこの問題の答えです。</p>
<h3>ここがポイント</h3>
<ul>
<li>ねらいは <strong>配るファイルを小さくすること</strong>。省略した説明コメント（JSDoc）にも <em>to help keep bundles small</em>（バンドルを小さく保つため）と書かれている</li>
<li>「本番のユーザーにメッセージを隠すため」ではない。<code>invariant(x, &#39;秘密の情報&#39;)</code> と書けば、<code>&#39;秘密の情報&#39;</code> という文字列は呼び出し側のコードに残っている。表示されないだけで、隠れてはいない</li>
<li>コードの中のコメント（1行目・24行目）は、意図を知るための一番の手がかりになる</li>
</ul>
<h3>もっと知りたい人へ</h3>
<ul>
<li><strong>11行目</strong>: <code>message</code> に関数も渡せるのは、メッセージ作りが重いときに「失敗したときだけ」作らせるため（<strong>遅延評価</strong> といいます）</li>
<li><strong>12行目</strong>: <code>asserts condition</code> と書いておくと、この関数を呼んだ後は TypeScript が「<code>condition</code> は真」とみなして型を絞り込んでくれる</li>
<li><strong>6行目</strong>: <code>message</code> に初期値を書かないのも、出力を少しでも小さくするため（コメントのとおり）</li>
</ul>
`,en=`<div class="lead"><p><strong>ひとことで言うと</strong>: <code>parse</code> が受け付けるのは「<strong>数字1つ ＋ 単位1つ</strong>」だけです。<code>&#39;1h30m&#39;</code> は単位が2つ（<code>h</code> と <code>m</code>）あるので形に合わず、<code>NaN</code> になります。</p>
</div><h3>まず、言葉の確認</h3>
<p><strong><code>ms</code> ライブラリ</strong> は、<code>&#39;2h&#39;</code> や <code>&#39;10 minutes&#39;</code> のような「人間が読みやすい時間」を <strong>ミリ秒</strong>（1000分の1秒）の数値に変えるライブラリです。<code>parse(&#39;1s&#39;)</code> は <code>1000</code> を返します。</p>
<p><strong><code>NaN</code></strong>（Not a Number）は「数値になれなかった」ことを表す特別な値です。この関数では「読めない文字列だった」という意味で返されます。</p>
<p><strong>正規表現</strong> は「文字列の形」を表す小さな言語です。<code>/…/.exec(str)</code> で、<code>str</code> がその形に合うかを調べます。合わなければ <code>null</code> が返ります。この問題で出てくる記号は次のとおりです。</p>
<table>
<thead>
<tr>
<th>記号</th>
<th>意味</th>
<th>例</th>
</tr>
</thead>
<tbody><tr>
<td><code>^</code> と <code>$</code></td>
<td>文字列の <strong>最初</strong> と <strong>最後</strong>。両方あると「全体がこの形」という意味</td>
<td><code>^ab$</code> は <code>&#39;ab&#39;</code> だけに合う</td>
</tr>
<tr>
<td><code>\\d</code></td>
<td>数字1文字（0〜9）</td>
<td></td>
</tr>
<tr>
<td><code>?</code></td>
<td>直前のものが <strong>0個か1個</strong>（あってもなくてもよい）</td>
<td><code>-?</code> は「マイナスがあってもなくてもよい」</td>
</tr>
<tr>
<td><code>*</code></td>
<td>直前のものが <strong>0個以上</strong></td>
<td><code> *</code> は「空白がいくつあってもよい（なくてもよい）」</td>
</tr>
<tr>
<td><code>+</code></td>
<td>直前のものが <strong>1個以上</strong></td>
<td><code>\\d+</code> は「数字が1文字以上」</td>
</tr>
<tr>
<td><code>(a|b)</code></td>
<td>a か b のどちらか</td>
<td></td>
</tr>
<tr>
<td><code>i</code>（末尾）</td>
<td>大文字・小文字を区別しない</td>
<td><code>MINUTES</code> も <code>minutes</code> も合う</td>
</tr>
</tbody></table>
<h3>図で見る：78行目の正規表現を部品に分ける</h3>
<p>78行目の長い正規表現は、次の部品が上から順に並んだものです。文字列の頭から1文字ずつ、部品に当てはめていきます。</p>
<figure class="fig">
<svg viewBox="0 0 340 300" width="340" role="img" aria-label="正規表現の部品。最初、数値、空白0個以上、単位1つ省略可、最後、の順に並ぶ。">
<defs><marker id="p003-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<rect x="10" y="8" width="320" height="40" rx="8" class="b"/>
<text x="24" y="33" class="mono bold">^</text>
<text x="60" y="33">文字列の最初から</text>
<line x1="170" y1="48" x2="170" y2="64" class="l" marker-end="url(#p003-ah)"/>
<rect x="10" y="66" width="320" height="52" rx="8" class="ba"/>
<text x="24" y="88" class="mono sm">-?\\d*\\.?\\d+</text>
<text x="24" y="108" class="sm">数値（例: 10、.5、-3、1.5）</text>
<line x1="170" y1="118" x2="170" y2="134" class="l" marker-end="url(#p003-ah)"/>
<rect x="10" y="136" width="320" height="40" rx="8" class="b"/>
<text x="24" y="161" class="mono"> *</text>
<text x="60" y="161">空白（0個でも何個でもよい）</text>
<line x1="170" y1="176" x2="170" y2="192" class="l" marker-end="url(#p003-ah)"/>
<rect x="10" y="194" width="320" height="52" rx="8" class="ba"/>
<text x="24" y="216" class="mono sm">(?&lt;unit&gt;ms|s|m|h|…)?</text>
<text x="24" y="236" class="sm">単位を <tspan class="bold ta">1つだけ</tspan>（なくてもよい）</text>
<line x1="170" y1="246" x2="170" y2="262" class="l" marker-end="url(#p003-ah)"/>
<rect x="10" y="264" width="320" height="32" rx="8" class="b"/>
<text x="24" y="285" class="mono bold">$</text>
<text x="60" y="285">ここで文字列が終わっていること</text>
</svg>
<figcaption>単位の部品は1回しか出てこない。だから単位を2つ並べることはできない</figcaption>
</figure><h3>図で見る：4つの選択肢を部品に当てはめる</h3>
<figure class="fig">
<table style="white-space:nowrap">
<thead><tr><th>入力</th><th>数値</th><th>空白</th><th>単位</th><th>余った文字</th><th>結果</th></tr></thead>
<tbody>
<tr><td><code>'1h30m'</code></td><td><code>1</code></td><td>なし</td><td><code>h</code></td><td><span class="tag ng">30m</span></td><td><span class="tag ng">NaN</span></td></tr>
<tr><td><code>'.5s'</code></td><td><code>.5</code></td><td>なし</td><td><code>s</code></td><td>なし</td><td><span class="tag ok">500</span></td></tr>
<tr><td><code>'10 MINUTES'</code></td><td><code>10</code></td><td>1個</td><td><code>MINUTES</code></td><td>なし</td><td><span class="tag ok">600000</span></td></tr>
<tr><td><code>'5&nbsp;&nbsp;sec'</code></td><td><code>5</code></td><td>2個</td><td><code>sec</code></td><td>なし</td><td><span class="tag ok">5000</span></td></tr>
</tbody>
</table>
<figcaption>「余った文字」があると、最後の <code>$</code> に合わないので一致しない</figcaption>
</figure><p><code>&#39;1h30m&#39;</code> を1文字ずつ見ると、こうなります。</p>
<figure class="fig">
<svg viewBox="0 0 340 150" width="340" role="img" aria-label="1h30m の各文字。1 が数値、h が単位に当てはまり、残りの 3、0、m は余って最後の $ に合わない。">
<rect x="20" y="20" width="50" height="50" rx="6" class="ba"/>
<text x="45" y="52" text-anchor="middle" class="mono bold">1</text>
<rect x="76" y="20" width="50" height="50" rx="6" class="bok"/>
<text x="101" y="52" text-anchor="middle" class="mono bold">h</text>
<rect x="152" y="20" width="50" height="50" rx="6" class="bng"/>
<text x="177" y="52" text-anchor="middle" class="mono bold">3</text>
<rect x="208" y="20" width="50" height="50" rx="6" class="bng"/>
<text x="233" y="52" text-anchor="middle" class="mono bold">0</text>
<rect x="264" y="20" width="50" height="50" rx="6" class="bng"/>
<text x="289" y="52" text-anchor="middle" class="mono bold">m</text>
<text x="45" y="92" text-anchor="middle" class="sm">数値</text>
<text x="101" y="92" text-anchor="middle" class="sm">単位</text>
<line x1="139" y1="12" x2="139" y2="100" class="lng dash"/>
<text x="139" y="118" text-anchor="middle" class="sm tng bold">ここで終わってほしい（$）</text>
<text x="233" y="92" text-anchor="middle" class="sm tng">余った！</text>
<text x="170" y="142" text-anchor="middle" class="sm">→ 一致しない → 82〜83行目で NaN</text>
</svg>
</figure><h3>コードを順番に追う（<code>parse(&#39;1h30m&#39;)</code> の場合）</h3>
<p><strong>① 72行目</strong>: 文字列かどうか、長さが0や100超えでないかを調べます。<code>&#39;1h30m&#39;</code> は5文字なので通過します。</p>
<p><strong>② 78行目</strong>: 正規表現で形を調べます。数値 <code>1</code>、単位 <code>h</code> までは合いますが、その後ろに <code>30m</code> が残っています。正規表現の最後は <code>$</code>（ここで終わり）なので、<strong>一致に失敗</strong> します。<code>exec</code> は <code>null</code> を返します。</p>
<p><strong>③ 82〜83行目</strong>: <code>match?.groups</code> は <code>null</code> から取り出そうとしても <code>undefined</code> になるだけ（エラーにならない）です。<code>!undefined</code> は真なので、<code>return NaN</code> します。</p>
<p>一致した場合は次のように進みます（<code>&#39;10 MINUTES&#39;</code> の例）。</p>
<ul>
<li><strong>88行目</strong>: 正規表現の名前つきグループから <code>value = &#39;10&#39;</code>、<code>unit = &#39;MINUTES&#39;</code> を取り出す。単位が書かれていなければ <code>&#39;ms&#39;</code> になる</li>
<li><strong>93行目</strong>: <code>parseFloat(&#39;10&#39;)</code> で数値の <code>10</code> にする</li>
<li><strong>95行目</strong>: <code>&#39;MINUTES&#39;.toLowerCase()</code> で <code>&#39;minutes&#39;</code> にする</li>
<li><strong>98〜128行目</strong>: <code>switch</code> で <code>&#39;minutes&#39;</code> の <code>case</code> に入り、<code>10 * m</code>（<code>m</code> は1分のミリ秒 = 60000）で <code>600000</code> を返す</li>
</ul>
<h3>ここがポイント</h3>
<ul>
<li><code>NaN</code> を返す場所は <strong>82〜83行目の1か所だけ</strong>。「正規表現に合わなかったとき」だけ <code>NaN</code> になる</li>
<li>正規表現の <code>^…$</code> は「<strong>文字列全体</strong> がこの形」という意味。前や後ろに余計な文字があるとダメ</li>
<li>単位の部品は1回きり。「1時間30分」を表したいなら <code>&#39;1.5h&#39;</code> や <code>&#39;90m&#39;</code> と書く</li>
</ul>
<h3>もっと知りたい人へ</h3>
<ul>
<li><code>switch</code> の <code>default</code>（141〜145行目）は、型の上では絶対に来ない場所。<code>satisfies never</code> は「ここに来る単位が残っていたら型エラーにしてね」という TypeScript への指示</li>
<li>72行目は <code>str.length &gt; 100</code> で弾いているので、長さ100ちょうどの文字列は通る。エラーメッセージの「between 1 and 99」と1文字ずれている</li>
</ul>
`,tn=`<div class="lead"><p><strong>ひとことで言うと</strong>: <code>&#39;*&#39;</code> で登録したハンドラは、<code>&#39;foo&#39;</code> 用の名簿には入りません。<code>emit</code> が <strong>最後に <code>&#39;*&#39;</code> の名簿も見に行き</strong>、<strong>118行目</strong> の <code>handler(type, evt!)</code> で呼びます。</p>
</div><h3>まず、言葉の確認</h3>
<p><strong>mitt</strong> は「イベント」をやりとりするための小さなライブラリです。</p>
<ul>
<li><strong><code>on(名前, 関数)</code></strong>: 「この名前のイベントが起きたら、この関数を呼んで」と <strong>登録</strong> する</li>
<li><strong><code>emit(名前, データ)</code></strong>: 「この名前のイベントが起きたよ」と <strong>知らせる</strong>。登録された関数が呼ばれる</li>
<li><strong>ハンドラ</strong>: <code>on</code> で登録する関数のこと</li>
<li><strong>ワイルドカード <code>&#39;*&#39;</code></strong>: 「どんな名前のイベントでも呼んで」という特別な名前</li>
</ul>
<div class="note"><p><strong>たとえ話</strong>: 学校の連絡網を想像してください。「サッカー部」の名簿、「美術部」の名簿があり、<code>emit(&#39;サッカー部&#39;, …)</code> はサッカー部の名簿の人に電話をかけます。<code>&#39;*&#39;</code> は「全部の連絡を聞きたい」人のための <strong>別の名簿</strong> です。サッカー部の名簿に名前を書き足すのではなく、電話係が毎回「最後に <code>&#39;*&#39;</code> の名簿にもかける」というルールになっています。</p>
</div><p><strong><code>Map</code></strong> は「キー → 値」の組を入れておく入れ物です。mitt は「イベント名 → ハンドラの配列」を <code>all</code> という Map に入れています（52行目）。</p>
<h3>図で見る：名簿（Map）の中身</h3>
<p>次のコードを実行した直後の <code>all</code> の中身です。</p>
<pre><code class="language-js">const emitter = mitt()
emitter.on(&#39;foo&#39;, f)
emitter.on(&#39;bar&#39;, g)
emitter.on(&#39;*&#39;, h)
</code></pre>
<figure class="fig">
<svg viewBox="0 0 340 190" width="340" role="img" aria-label="all という Map の中身。キー foo には f、キー bar には g、キー * には h が入った配列が対応している。">
<defs><marker id="p004-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<text x="10" y="20" class="sm tm">all（Map）</text>
<text x="40" y="44" text-anchor="middle" class="sm tm">キー</text>
<text x="230" y="44" text-anchor="middle" class="sm tm">ハンドラの配列</text>
<rect x="10" y="54" width="70" height="36" rx="6" class="b"/>
<text x="45" y="77" text-anchor="middle" class="mono">'foo'</text>
<line x1="80" y1="72" x2="148" y2="72" class="l" marker-end="url(#p004-ah)"/>
<rect x="150" y="54" width="160" height="36" rx="6" class="b"/>
<text x="166" y="77" class="mono">[ f ]</text>
<rect x="10" y="98" width="70" height="36" rx="6" class="b"/>
<text x="45" y="121" text-anchor="middle" class="mono">'bar'</text>
<line x1="80" y1="116" x2="148" y2="116" class="l" marker-end="url(#p004-ah)"/>
<rect x="150" y="98" width="160" height="36" rx="6" class="b"/>
<text x="166" y="121" class="mono">[ g ]</text>
<rect x="10" y="142" width="70" height="36" rx="6" class="ba"/>
<text x="45" y="165" text-anchor="middle" class="mono bold">'*'</text>
<line x1="80" y1="160" x2="148" y2="160" class="la" marker-end="url(#p004-ah)"/>
<rect x="150" y="142" width="160" height="36" rx="6" class="ba"/>
<text x="166" y="165" class="mono">[ h ]</text>
</svg>
<figcaption>h は 'foo' の配列にも 'bar' の配列にも入っていない。'*' という名前の、別の配列にいる</figcaption>
</figure><h3>図で見る：<code>emit(&#39;foo&#39;, 42)</code> は2段階</h3>
<figure class="fig">
<svg viewBox="0 0 340 290" width="340" role="img" aria-label="emit foo 42 の流れ。1段階目、104行目で foo の配列を取り出し、109行目で f(42) を呼ぶ。2段階目、113行目で * の配列を取り出し、118行目で h('foo', 42) を呼ぶ。">
<defs><marker id="p004-ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<rect x="85" y="6" width="170" height="34" rx="8" class="b"/>
<text x="170" y="28" text-anchor="middle" class="mono">emit('foo', 42)</text>
<line x1="170" y1="40" x2="170" y2="58" class="l" marker-end="url(#p004-ah2)"/>
<rect x="10" y="60" width="320" height="90" rx="10" class="b"/>
<text x="22" y="82" class="sm bold">① 'foo' の名簿（104〜111行目）</text>
<text x="22" y="108" class="sm">104行目: <tspan class="mono">all.get('foo')</tspan> → <tspan class="mono">[ f ]</tspan></text>
<text x="22" y="134" class="sm">109行目: <tspan class="mono bold">f(42)</tspan> を呼ぶ</text>
<line x1="170" y1="150" x2="170" y2="168" class="l" marker-end="url(#p004-ah2)"/>
<rect x="10" y="170" width="320" height="110" rx="10" class="ba"/>
<text x="22" y="192" class="sm bold">② '*' の名簿（113〜120行目）</text>
<text x="22" y="218" class="sm">113行目: <tspan class="mono">all.get('*')</tspan> → <tspan class="mono">[ h ]</tspan></text>
<rect x="16" y="230" width="308" height="40" rx="6" class="bev"/>
<text x="22" y="255" class="sm">118行目: <tspan class="mono bold">h('foo', 42)</tspan> を呼ぶ ← 答え</text>
</svg>
<figcaption>どの名前で emit しても、② は毎回かならず実行される</figcaption>
</figure><h3>コードを順番に追う</h3>
<p><strong>① 登録するとき（<code>on</code>、66〜73行目）</strong></p>
<p><code>on(&#39;*&#39;, h)</code> を呼ぶと、<strong>67行目</strong> で <code>all.get(&#39;*&#39;)</code> を見ます。まだ <code>&#39;*&#39;</code> の配列がなければ <strong>71行目</strong> で <code>[h]</code> を新しく作って入れ、すでにあれば <strong>69行目</strong> で <code>push</code> して後ろに足します。</p>
<p>どちらの場合も、<code>h</code> が入るのは <strong><code>&#39;*&#39;</code> というキーの配列だけ</strong> です。<code>&#39;foo&#39;</code> の配列には入りません。</p>
<p><strong>② 知らせるとき（<code>emit</code>、103〜121行目）</strong></p>
<p><code>emit(&#39;foo&#39;, 42)</code> を呼ぶと、次の順に動きます。</p>
<ol>
<li><strong>104行目</strong>: <code>all.get(&#39;foo&#39;)</code> で <code>&#39;foo&#39;</code> の配列 <code>[f]</code> を取り出す</li>
<li><strong>106〜110行目</strong>: 配列の中のハンドラを1つずつ、<strong>109行目</strong> の <code>handler(evt!)</code> で呼ぶ → <code>f(42)</code></li>
<li><strong>113行目</strong>: 今度は <code>all.get(&#39;*&#39;)</code> で <code>&#39;*&#39;</code> の配列 <code>[h]</code> を取り出す（ここではまだ取り出しただけ）</li>
<li><strong>115〜119行目</strong>: 1つずつ、<strong>118行目</strong> の <code>handler(type, evt!)</code> で呼ぶ → <code>h(&#39;foo&#39;, 42)</code></li>
</ol>
<h3>ここがポイント</h3>
<ul>
<li><code>&#39;*&#39;</code> は「全部の配列に登録される」のではなく、「<code>emit</code> が毎回最後に見に行く特別なキー」</li>
<li>だから呼ばれる順番は必ず「<strong>名前ごとのハンドラ → <code>&#39;*&#39;</code> のハンドラ</strong>」</li>
<li><code>&#39;*&#39;</code> のハンドラだけは、1つ目の引数に <strong>イベント名</strong>（<code>&#39;foo&#39;</code>）を受け取る。どのイベントで呼ばれたかが分からないと困るから</li>
</ul>
<h3>もっと知りたい人へ</h3>
<ul>
<li><strong>107行目・116行目</strong> の <code>.slice()</code> は配列のコピーを作る。ハンドラの中で <code>on</code> / <code>off</code> されても、いま回しているループには影響しない</li>
<li><code>forEach</code> ではなく <code>.map</code> を使っている（戻り値は捨てている）。サイズの小ささが売りのライブラリなので、圧縮後に数文字でも短くなる書き方を選んでいるのだろう</li>
<li><strong>86行目</strong> の <code>indexOf(handler) &gt;&gt;&gt; 0</code> は、見つからないときの <code>-1</code> を <code>4294967295</code> という巨大な数に変える小技。<code>splice</code> がどこも消さずに空振りする</li>
</ul>
`,nn=`<div class="lead"><p><strong>ひとことで言うと</strong>: 256 通りの乱数を <code>%</code>（割り算の余り）で文字に割り当てると、割り切れないときに <strong>一部の文字だけが出やすくなります</strong>。それを防ぐため、割り切れない「はみ出し分」のバイトを <strong>29行目</strong> で捨てています。</p>
</div><h3>まず、言葉の確認</h3>
<ul>
<li><strong>バイト</strong>: 0〜255 の整数1つぶんのデータです。乱数バイトなら、0〜255 のどれかが同じ確率で出ます（全部で <strong>256 通り</strong>）</li>
<li><strong><code>%</code>（剰余、モジュロ）</strong>: 割り算の余りです。<code>37 % 10</code> は <code>7</code>。どんな数でも <code>% 10</code> すると 0〜9 のどれかになります</li>
<li><strong><code>alphabet</code></strong>: ID に使ってよい文字を並べた文字列です。この解説では例として <code>alphabet = &#39;0123456789&#39;</code>（10文字）を使います。<code>alphabet[7]</code> は <code>&#39;7&#39;</code> です</li>
<li><strong>偏り（バイアス）</strong>: 本当は全部同じ確率で出てほしいのに、出やすいものと出にくいものができてしまうことです</li>
</ul>
<div class="note"><p><strong>たとえ話</strong>: 256 枚のカードを 10 人に1枚ずつ順番に配ると、1人 25 枚ずつ配ったところで <strong>6 枚余ります</strong>。余りも配り続けると、最初の 6 人だけ 26 枚、残りの 4 人は 25 枚になって不公平です。公平にしたいなら、余った 6 枚は <strong>配らずに捨てる</strong> しかありません。nanoid がやっているのはこれです。</p>
</div><h3>図で見る：どのバイトを捨てるのか</h3>
<figure class="fig">
<svg viewBox="-2 0 344 230" width="420" role="img" aria-label="0から255のバイトのうち、0から249は10文字に25通りずつ割り当てられる。250から255を使うと文字0から5だけ1通り多くなるので捨てる">
<text x="4" y="18" class="bold">乱数バイト（0〜255 の 256 通り）</text>
<rect x="4" y="28" width="262" height="34" rx="4" class="bok"/>
<text x="135" y="50" text-anchor="middle">0〜249（250 個）</text>
<rect x="268" y="28" width="68" height="34" rx="4" class="bng"/>
<text x="302" y="49" text-anchor="middle" class="sm">250〜255</text>
<text x="135" y="84" text-anchor="middle" class="tok bold">% 10 で文字へ</text>
<text x="302" y="84" text-anchor="middle" class="tng bold">捨てる</text>
<text x="4" y="106" class="tm">文字ごとのバイトの数</text>
<rect x="4" y="114" width="30" height="22" rx="3" class="bng dash"/><text x="19" y="130" text-anchor="middle" class="sm">+1</text>
<rect x="38" y="114" width="30" height="22" rx="3" class="bng dash"/><text x="53" y="130" text-anchor="middle" class="sm">+1</text>
<rect x="72" y="114" width="30" height="22" rx="3" class="bng dash"/><text x="87" y="130" text-anchor="middle" class="sm">+1</text>
<rect x="106" y="114" width="30" height="22" rx="3" class="bng dash"/><text x="121" y="130" text-anchor="middle" class="sm">+1</text>
<rect x="140" y="114" width="30" height="22" rx="3" class="bng dash"/><text x="155" y="130" text-anchor="middle" class="sm">+1</text>
<rect x="174" y="114" width="30" height="22" rx="3" class="bng dash"/><text x="189" y="130" text-anchor="middle" class="sm">+1</text>
<rect x="4" y="140" width="30" height="44" rx="3" class="bok"/><text x="19" y="167" text-anchor="middle">25</text>
<rect x="38" y="140" width="30" height="44" rx="3" class="bok"/><text x="53" y="167" text-anchor="middle">25</text>
<rect x="72" y="140" width="30" height="44" rx="3" class="bok"/><text x="87" y="167" text-anchor="middle">25</text>
<rect x="106" y="140" width="30" height="44" rx="3" class="bok"/><text x="121" y="167" text-anchor="middle">25</text>
<rect x="140" y="140" width="30" height="44" rx="3" class="bok"/><text x="155" y="167" text-anchor="middle">25</text>
<rect x="174" y="140" width="30" height="44" rx="3" class="bok"/><text x="189" y="167" text-anchor="middle">25</text>
<rect x="208" y="140" width="30" height="44" rx="3" class="bok"/><text x="223" y="167" text-anchor="middle">25</text>
<rect x="242" y="140" width="30" height="44" rx="3" class="bok"/><text x="257" y="167" text-anchor="middle">25</text>
<rect x="276" y="140" width="30" height="44" rx="3" class="bok"/><text x="291" y="167" text-anchor="middle">25</text>
<rect x="310" y="140" width="30" height="44" rx="3" class="bok"/><text x="325" y="167" text-anchor="middle">25</text>
<text x="19" y="204" text-anchor="middle" class="mono">'0'</text>
<text x="53" y="204" text-anchor="middle" class="mono">'1'</text>
<text x="87" y="204" text-anchor="middle" class="mono">'2'</text>
<text x="121" y="204" text-anchor="middle" class="mono">'3'</text>
<text x="155" y="204" text-anchor="middle" class="mono">'4'</text>
<text x="189" y="204" text-anchor="middle" class="mono">'5'</text>
<text x="223" y="204" text-anchor="middle" class="mono">'6'</text>
<text x="257" y="204" text-anchor="middle" class="mono">'7'</text>
<text x="291" y="204" text-anchor="middle" class="mono">'8'</text>
<text x="325" y="204" text-anchor="middle" class="mono">'9'</text>
<text x="170" y="225" text-anchor="middle" class="sm tm">（赤の幅は見やすいように誇張）</text>
</svg>
<figcaption>緑だけを使えば、どの文字もちょうど 25 通り。赤（250〜255）まで使うと、'0'〜'5' だけ 26 通りになって出やすくなる</figcaption>
</figure><p>たとえば 250 は <code>250 % 10 = 0</code> なので <code>&#39;0&#39;</code>、255 は <code>255 % 10 = 5</code> なので <code>&#39;5&#39;</code> になります。だから余りの 6 個は、全部 <code>&#39;0&#39;</code>〜<code>&#39;5&#39;</code> のどれかに上乗せされてしまうのです。</p>
<h3>コードを順番に追う</h3>
<p><strong>① どこから先を捨てるか決める（2行目）</strong></p>
<pre><code class="language-js">let safeByteCutoff = 256 - (256 % alphabet.length)
</code></pre>
<p><code>alphabet.length</code> が 10 なら、<code>256 % 10 = 6</code>（余り6）なので <code>safeByteCutoff = 256 - 6 = 250</code>。「<strong>250 未満なら使ってよい</strong>」という境目です。250 は 10 で割り切れるので、0〜249 はどの文字にもちょうど 25 個ずつ対応します。</p>
<p><strong>② バイトを多めにもらう（24・26行目）</strong></p>
<p>捨てるバイトがあるので、ほしい文字数ぴったりのバイトでは足りなくなるかもしれません。そこで <strong>24行目</strong> で多めの個数 <code>step</code> を計算し、<strong>26行目</strong> でその数だけ乱数バイトをもらいます。</p>
<p>5文字の ID なら <code>step = Math.ceil(1.6 × 256 × 5 ÷ 250) = Math.ceil(8.192) = 9</code> で、9 バイトもらいます。</p>
<p><strong>③ 1バイトずつ、使うか捨てるか決める（28〜31行目）</strong></p>
<p><code>while (i--)</code> なので、配列の <strong>後ろから</strong> 順に見ます。もらったバイトが <code>[37, 254, 120, 9, 251, 66, 200, 13, 88]</code> だったとすると:</p>
<table>
<thead>
<tr>
<th>i</th>
<th>bytes[i]</th>
<th>250 未満？（29行目）</th>
<th>文字（30行目）</th>
<th>id</th>
</tr>
</thead>
<tbody><tr>
<td>8</td>
<td>88</td>
<td>はい</td>
<td><code>88 % 10 = 8</code> → <code>&#39;8&#39;</code></td>
<td><code>&quot;8&quot;</code></td>
</tr>
<tr>
<td>7</td>
<td>13</td>
<td>はい</td>
<td><code>&#39;3&#39;</code></td>
<td><code>&quot;83&quot;</code></td>
</tr>
<tr>
<td>6</td>
<td>200</td>
<td>はい</td>
<td><code>&#39;0&#39;</code></td>
<td><code>&quot;830&quot;</code></td>
</tr>
<tr>
<td>5</td>
<td>66</td>
<td>はい</td>
<td><code>&#39;6&#39;</code></td>
<td><code>&quot;8306&quot;</code></td>
</tr>
<tr>
<td>4</td>
<td>251</td>
<td><strong>いいえ → 捨てる</strong></td>
<td>—</td>
<td><code>&quot;8306&quot;</code></td>
</tr>
<tr>
<td>3</td>
<td>9</td>
<td>はい</td>
<td><code>&#39;9&#39;</code></td>
<td><code>&quot;83069&quot;</code></td>
</tr>
</tbody></table>
<p>5文字そろったので、<strong>31行目</strong> の <code>if (id.length &gt;= size) return id</code> で <code>&quot;83069&quot;</code> を返します。残りのバイト（120、254、37）は使いません。もし途中でバイトが足りなくなったら、<code>while (true)</code>（25行目）で戻って、またバイトをもらい直します。</p>
<h3>ここがポイント</h3>
<ul>
<li><code>%</code> の結果は必ず <code>0</code>〜<code>length - 1</code> なので、<strong>範囲外を指す心配はもともとない</strong>。捨てる理由は「公平さ」のため</li>
<li>ID は「推測されにくいこと」が命です。出やすい文字があると、そのぶん推測しやすくなってしまう</li>
<li>捨てるのは、割り切れない「はみ出し分」だけ。文字数によって捨てる割合は変わります</li>
</ul>
<table>
<thead>
<tr>
<th>文字の種類（例）</th>
<th>文字数</th>
<th><code>256 % 文字数</code></th>
<th><code>safeByteCutoff</code></th>
<th>捨てる割合</th>
</tr>
</thead>
<tbody><tr>
<td>数字だけ</td>
<td>10</td>
<td>6</td>
<td>250</td>
<td>約 2.3%</td>
</tr>
<tr>
<td>英小文字＋数字</td>
<td>36</td>
<td>4</td>
<td>252</td>
<td>約 1.6%</td>
</tr>
<tr>
<td>英大小文字＋数字</td>
<td>62</td>
<td>8</td>
<td>248</td>
<td>約 3.1%</td>
</tr>
<tr>
<td>URL 用の 64 文字</td>
<td>64</td>
<td>0</td>
<td>256</td>
<td>0%（捨てない）</td>
</tr>
</tbody></table>
<h3>もっと知りたい人へ</h3>
<ul>
<li><strong>4〜19行目</strong>: 文字数が 2 のべき乗（64 など）なら 256 で割り切れるので、捨てるバイトがありません（<code>safeByteCutoff === 256</code>）。このときは <code>% length</code> の代わりに <code>&amp; mask</code>（<code>mask = length - 1</code>）を使います。結果は同じで、計算がより軽くなります</li>
<li><strong>24行目の <code>1.6</code></strong>: 使えるバイトの割合は <code>safeByteCutoff / 256</code> です。それで割って必要な個数を見積もり、さらに 1.6 倍の余裕を持たせています。1.6 はベンチマークで選んだ係数です（元のソースのコメントより）</li>
<li>元のソースでは、この理由がコメントで丁寧に説明されています。出典リンクから読み比べてみてください</li>
</ul>
`,rn=`<div class="lead"><p><strong>ひとことで言うと</strong>: debounce は「<strong>呼び出しが止んでから</strong> <code>wait</code> ミリ秒たったら、1回だけ実行する」仕組みです。最後の呼び出しは 120ms なので、その 100ms 後の <strong>220ms に1回だけ</strong>、<strong>3回目の引数で</strong> 実行されます。</p>
</div><h3>まず、言葉の確認</h3>
<ul>
<li><strong>debounce（デバウンス）</strong>: 短い間に何度も呼ばれたとき、「落ち着いてから最後の1回だけ」実行する仕組みです。検索欄に1文字打つたびに検索するのではなく、<strong>打ち終わってから</strong> 1回だけ検索したいときに使います</li>
<li><strong><code>setTimeout(関数, ミリ秒)</code></strong>: 「○ミリ秒後にこの関数を呼んで」と予約する、キッチンタイマーのようなものです。予約したタイマーの番号が返ってきます</li>
<li><strong><code>Date.now()</code></strong>: 今の時刻をミリ秒で返します。2つの時刻を引き算すれば、何ミリ秒たったかがわかります</li>
<li><strong><code>wait</code></strong>: 待つ時間です。この問題では 100ms</li>
</ul>
<div class="note"><p><strong>たとえ話</strong>: エレベーターのドアを思い浮かべてください。人が乗るたびにドアは開いたままになり、<strong>最後の人が乗ってから</strong> しばらく誰も来なければ閉まります。debounce の「実行」は、この「ドアが閉まる」にあたります。</p>
</div><h3>図で見る：タイマーは1本だけ</h3>
<figure class="fig">
<svg viewBox="0 0 340 206" width="420" role="img" aria-label="0, 50, 120ミリ秒に呼び出し。タイマーは100と150ミリ秒に鳴るが、最後の呼び出しから100ミリ秒たっていないので張り直す。220ミリ秒で実行される">
<text x="4" y="14" class="sm tm">f() を呼んだ時刻</text>
<circle cx="20" cy="34" r="11" class="ba"/><text x="20" y="39" text-anchor="middle" class="sm bold">1</text>
<circle cx="80" cy="34" r="11" class="ba"/><text x="80" y="39" text-anchor="middle" class="sm bold">2</text>
<circle cx="164" cy="34" r="11" class="ba"/><text x="164" y="39" text-anchor="middle" class="sm bold">3</text>
<line x1="20" y1="45" x2="20" y2="64" class="la dash"/>
<line x1="80" y1="45" x2="80" y2="64" class="la dash"/>
<line x1="164" y1="45" x2="164" y2="64" class="la dash"/>
<line x1="20" y1="64" x2="324" y2="64" class="l"/>
<line x1="20" y1="60" x2="20" y2="68" class="l"/><text x="20" y="82" text-anchor="middle" class="sm tm">0</text>
<line x1="80" y1="60" x2="80" y2="68" class="l"/><text x="80" y="82" text-anchor="middle" class="sm tm">50</text>
<line x1="140" y1="60" x2="140" y2="68" class="l"/><text x="140" y="82" text-anchor="middle" class="sm tm">100</text>
<line x1="200" y1="60" x2="200" y2="68" class="l"/><text x="200" y="82" text-anchor="middle" class="sm tm">150</text>
<line x1="260" y1="60" x2="260" y2="68" class="l"/><text x="260" y="82" text-anchor="middle" class="sm tm">200</text>
<line x1="320" y1="60" x2="320" y2="68" class="l"/><text x="320" y="82" text-anchor="middle" class="sm tm">250</text>
<text x="4" y="104" class="sm tm">タイマー（いつも1本）</text>
<rect x="20" y="112" width="120" height="18" rx="3" class="b"/>
<rect x="140" y="112" width="60" height="18" rx="3" class="b"/>
<rect x="200" y="112" width="84" height="18" rx="3" class="b"/>
<circle cx="140" cy="121" r="6" class="bng"/>
<circle cx="200" cy="121" r="6" class="bng"/>
<circle cx="284" cy="121" r="7" class="bok"/>
<text x="140" y="148" text-anchor="middle" class="sm tng bold">まだ</text>
<text x="200" y="148" text-anchor="middle" class="sm tng bold">まだ</text>
<text x="284" y="148" text-anchor="middle" class="sm tok bold">実行！</text>
<line x1="164" y1="172" x2="284" y2="172" class="lok"/>
<line x1="164" y1="166" x2="164" y2="178" class="lok"/>
<line x1="284" y1="166" x2="284" y2="178" class="lok"/>
<text x="224" y="196" text-anchor="middle" class="sm">最後の呼び出しから 100ms</text>
</svg>
<figcaption>赤い点はタイマーが鳴ったが「最後の呼び出しから 100ms たっていない」ので張り直したところ。緑の点で初めて実行される</figcaption>
</figure><h3>コードを順番に追う</h3>
<p>この実装の作戦は、「呼ばれるたびにタイマーを消して作り直す」ではありません。<strong>タイマーは1本だけ張っておき、鳴ったときに「最後の呼び出しから何ミリ秒たったか」を測り直す</strong> やり方です。</p>
<p><strong>呼ばれたとき（<code>debounced</code>、45〜70行目）にすること</strong></p>
<ul>
<li><strong>55〜56行目</strong>: 引数と時刻（<code>timestamp</code>）を <strong>毎回上書き</strong> して覚える</li>
<li><strong>60〜61行目</strong>: タイマーがまだ無いときだけ、<code>wait</code> ミリ秒のタイマーを張る。すでにあれば <strong>何もしない</strong></li>
</ul>
<p><strong>タイマーが鳴ったとき（<code>later</code>、31〜43行目）にすること</strong></p>
<ul>
<li><strong>32行目</strong>: <code>last = 今 − 最後に呼ばれた時刻</code> を計算する</li>
<li><strong>34〜35行目</strong>: <code>last</code> が <code>wait</code> より小さければ、まだ早い。<strong>残り時間（<code>wait − last</code>）だけ</strong> タイマーを張り直す</li>
<li><strong>36〜40行目</strong>: <code>wait</code> 以上たっていれば、タイマーを片付けて <code>run()</code> で実行する</li>
</ul>
<p>これを時刻順に並べると、次のとおりです。</p>
<table>
<thead>
<tr>
<th>時刻</th>
<th>起きること</th>
<th>覚えている時刻</th>
<th>次にタイマーが鳴る時刻</th>
</tr>
</thead>
<tbody><tr>
<td>0</td>
<td>1回目の呼び出し。タイマーが無いので張る（61行目）</td>
<td>0</td>
<td>100</td>
</tr>
<tr>
<td>50</td>
<td>2回目。タイマーがあるので張らない（60行目）</td>
<td>50</td>
<td>100</td>
</tr>
<tr>
<td>100</td>
<td>タイマーが鳴る。<code>last = 100 − 50 = 50</code>。100 未満なので残り 50ms を張り直す（35行目）</td>
<td>50</td>
<td>150</td>
</tr>
<tr>
<td>120</td>
<td>3回目。タイマーがあるので張らない</td>
<td>120</td>
<td>150</td>
</tr>
<tr>
<td>150</td>
<td>タイマーが鳴る。<code>last = 150 − 120 = 30</code>。まだ早いので残り 70ms を張り直す</td>
<td>120</td>
<td>220</td>
</tr>
<tr>
<td>220</td>
<td>タイマーが鳴る。<code>last = 220 − 120 = 100</code>。100 未満ではないので <strong>40行目で実行</strong></td>
<td>120</td>
<td>—</td>
</tr>
</tbody></table>
<p><code>run()</code> は <strong>24行目</strong> で、最後に覚えた引数（<code>storedArguments</code>）を使います。55行目で毎回上書きされているので、使われるのは <strong>3回目の引数</strong> です。</p>
<h3>ここがポイント</h3>
<ul>
<li>呼び出しのたびに更新されるのは「時刻」と「引数」だけ。<strong>タイマーは増えない</strong>（60行目）</li>
<li>「いつ実行するか」は、タイマーが鳴ったときに <strong>32〜34行目で毎回計算し直して</strong> 決めている</li>
<li>結果は「毎回 <code>clearTimeout</code> して <code>setTimeout</code> し直す」素朴な作り方と同じです。でもこの書き方なら、連打されてもタイマーの操作が増えません</li>
</ul>
<h3>もっと知りたい人へ</h3>
<ul>
<li><strong>34行目の <code>last &gt;= 0</code></strong>: パソコンの時計が巻き戻って <code>Date.now()</code> が小さくなると、<code>last</code> がマイナスになります。そのときは待たずに実行してしまうための条件です</li>
<li><strong><code>immediate: true</code></strong> にすると、58行目の <code>callNow</code> が真になり、最初の1回は <strong>すぐに</strong> 実行されます（64〜66行目）。その代わり、タイマーが鳴ったときには実行しません（39行目）</li>
</ul>
`,an=`<div class="lead"><p><strong>ひとことで言うと</strong>: <code>fn</code> を実際に呼ぶのは <strong>34行目</strong> の <code>function_(...arguments_)</code> です。23行目の <code>.run()</code> は名前がそっくりですが、<strong><code>fn</code> を呼ぶのではなく「呼び鈴を鳴らすだけ」</strong> の別物です。</p>
</div><h3>まず、言葉の確認</h3>
<ul>
<li><strong>p-limit</strong>: 非同期の処理を「同時に最大○個まで」に制限するライブラリです。<code>const limit = pLimit(2)</code> なら、<code>limit(fn)</code> で頼んだ仕事は同時に2つまでしか動きません。3つ目以降は順番待ちになります</li>
<li><strong>同時実行数（<code>concurrency</code>）と <code>activeCount</code></strong>: お店の「席の数」と「今座っている人数」です。<code>activeCount &lt; concurrency</code> なら空席あり</li>
<li><strong>キュー（<code>queue</code>）</strong>: 順番待ちの列です。先に並んだものから先に出てきます（<code>enqueue</code> で並ぶ、<code>dequeue</code> で先頭が出る）</li>
<li><strong>Promise</strong>: 「あとで結果が届く引換券」です。<code>resolve()</code> を呼ぶと引換券が「受け取りOK」になります</li>
<li><strong><code>.then(関数)</code></strong>: 「引換券が受け取りOKになったら、この関数を呼んで」という予約です。予約した関数は、<strong>今の処理がひと段落した直後</strong> に呼ばれます（これを <strong>マイクロタスク</strong> といいます）</li>
</ul>
<figure class="fig">
<svg viewBox="0 0 340 120" width="420" role="img" aria-label="同時実行数2の例。実行中の席は2つで両方埋まっている。待ち行列に3つ並んでいて、席が空くと先頭から入る">
<text x="4" y="16" class="sm tm">実行中（上限 2）</text>
<rect x="4" y="24" width="120" height="76" rx="6" class="b"/>
<rect x="14" y="34" width="100" height="26" rx="4" class="bok"/><text x="64" y="52" text-anchor="middle" class="sm">仕事 A</text>
<rect x="14" y="66" width="100" height="26" rx="4" class="bok"/><text x="64" y="84" text-anchor="middle" class="sm">仕事 B</text>
<text x="190" y="16" class="sm tm">待ち行列（キュー）</text>
<rect x="190" y="46" width="44" height="30" rx="4" class="ba"/><text x="212" y="66" text-anchor="middle" class="sm">C</text>
<rect x="240" y="46" width="44" height="30" rx="4" class="ba"/><text x="262" y="66" text-anchor="middle" class="sm">D</text>
<rect x="290" y="46" width="44" height="30" rx="4" class="ba"/><text x="312" y="66" text-anchor="middle" class="sm">E</text>
<defs><marker id="m007s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="aha"/></marker></defs>
<line x1="184" y1="61" x2="132" y2="61" class="la" marker-end="url(#m007s)"/>
<text x="230" y="102" text-anchor="middle" class="sm tm">先頭から、席が空いたら入る</text>
</svg>
<figcaption>A か B が終わると席が1つ空き、待ち行列の先頭 C が実行に移る</figcaption>
</figure><h3>図で見る：<code>limit(fn)</code> から <code>fn</code> が動くまで</h3>
<p>空席があるとき、<code>limit(fn)</code> を呼んでから <code>fn</code> が動くまでには、これだけの段階があります。</p>
<figure class="fig">
<svg viewBox="0 0 340 326" width="420" role="img" aria-label="limit(fn)を呼ぶ、呼び鈴つきでキューに並ぶ、鳴ったらrunを呼ぶよう予約、空きを確認して呼び鈴を鳴らす、予約が動いてrunが呼ばれる、34行目でfnを実行、の6段階">
<defs><marker id="m007f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ah"/></marker></defs>
<rect x="10" y="4" width="320" height="36" rx="6" class="b"/>
<text x="22" y="27" class="bold">① limit(fn) を呼ぶ</text><text x="318" y="27" text-anchor="end" class="sm tm">66〜67行目</text>
<line x1="170" y1="40" x2="170" y2="56" class="l" marker-end="url(#m007f)"/>
<rect x="10" y="58" width="320" height="36" rx="6" class="b"/>
<text x="22" y="81">② 呼び鈴つきで列に並ぶ</text><text x="318" y="81" text-anchor="end" class="sm tm">55〜57行目</text>
<line x1="170" y1="94" x2="170" y2="110" class="l" marker-end="url(#m007f)"/>
<rect x="10" y="112" width="320" height="36" rx="6" class="b"/>
<text x="22" y="135">③「鳴ったら run を呼んで」と予約</text><text x="318" y="135" text-anchor="end" class="sm tm">58行目</text>
<line x1="170" y1="148" x2="170" y2="164" class="l" marker-end="url(#m007f)"/>
<rect x="10" y="166" width="320" height="36" rx="6" class="ba"/>
<text x="22" y="189">④ 空席を確認して呼び鈴を鳴らす</text><text x="318" y="189" text-anchor="end" class="sm tm">21〜23行目</text>
<line x1="170" y1="202" x2="170" y2="230" class="l dash" marker-end="url(#m007f)"/>
<text x="180" y="221" class="sm tm">少しあと（マイクロタスク）</text>
<rect x="10" y="232" width="320" height="36" rx="6" class="b"/>
<text x="22" y="255">⑤ 予約が動いて run が呼ばれる</text><text x="318" y="255" text-anchor="end" class="sm tm">58 → 32行目</text>
<line x1="170" y1="268" x2="170" y2="284" class="l" marker-end="url(#m007f)"/>
<rect x="10" y="286" width="320" height="36" rx="6" class="bok"/>
<text x="22" y="309" class="bold">⑥ fn を実行！</text><text x="318" y="309" text-anchor="end" class="sm tm">34行目</text>
</svg>
<figcaption>オレンジの④で鳴らしているのは「呼び鈴」だけ。実際に fn が動くのは緑の⑥</figcaption>
</figure><h3>名前がそっくりな2つの <code>run</code></h3>
<p>この問題の一番の罠は、<code>run</code> という名前のものが <strong>2つある</strong> ことです。</p>
<div class="cols">
<div class="fig">
<h4><code>queueItem.run</code>（56行目）＝ 呼び鈴</h4>
<p>中身は Promise の <code>resolve</code>（<code>internalResolve</code>）です。呼ぶと引換券が「受け取りOK」になるだけで、<b>fn は呼びません</b>。23行目の <code>queue.dequeue().run()</code> はこちら。</p>
</div>
<div class="fig">
<h4><code>run</code>（32行目）＝ 仕事をする本体</h4>
<p>58行目の <code>.then</code> で予約されていて、呼び鈴が鳴った後に呼ばれます。<b>34行目で fn を呼ぶ</b> のはこちら。</p>
</div>
</div><h3>コードを順番に追う</h3>
<p><code>const limit = pLimit(2)</code> で、まだ何も動いていない状態（<code>activeCount = 0</code>）から <code>limit(fn)</code> を1回呼んだとします。</p>
<ol>
<li><strong>66〜67行目</strong>: <code>limit(fn)</code> は、呼んだ人に返す Promise を作り、<code>enqueue</code> を呼ぶ</li>
<li><strong>55〜57行目</strong>: 新しい Promise（<code>internalResolve</code> つき）を作り、その <code>internalResolve</code> を <code>queueItem.run</code> にしまって、キューに並べる。これが「呼び鈴」</li>
<li><strong>58行目</strong>: その Promise に <code>.then(run.bind(…))</code> で「解決したら32行目の <code>run</code> を呼んで」と予約する。<strong>この時点ではまだ呼ばない</strong></li>
<li><strong>61〜62行目</strong>: <code>activeCount</code>（0）が <code>concurrency</code>（2）より小さいので <code>resumeNext()</code> を呼ぶ</li>
<li><strong>21〜23行目</strong>: もう一度空席を確かめ、<code>activeCount</code> を 1 に増やして、キューの先頭を取り出し <code>.run()</code>。これは <code>internalResolve()</code> なので、<strong>Promise が解決するだけ</strong></li>
<li><strong>58行目 → 32行目</strong>: 今の処理がひと段落すると、3で予約しておいた <code>run</code> が呼ばれる</li>
<li><strong>34行目</strong>: <code>function_(...arguments_)</code>、つまり <strong><code>fn</code> がここで実行される</strong></li>
</ol>
<h3>ここがポイント</h3>
<ul>
<li><strong>「呼ぶ」と「予約する」を区別する</strong>。58行目は <code>.then</code> で予約しているだけで、その場では呼ばない</li>
<li><strong>同じ名前でも中身が同じとは限らない</strong>。<code>queueItem.run</code> に何が入っているかは56行目を見ればわかる</li>
<li>迷ったら「その関数の <strong>本当の中身</strong> はどこで決まったか」までさかのぼって読む</li>
</ul>
<h3>もっと知りたい人へ</h3>
<ul>
<li><strong>わざわざ呼び鈴（Promise）を挟む理由</strong>: 53〜54行目のコメントのとおり、<code>limit()</code> を呼んだ時点の非同期コンテキスト（Node.js の AsyncLocalStorage など）を <code>fn</code> に引き継ぐためです</li>
<li><strong>上限を守る仕組み</strong>: 判定と <code>activeCount++</code> が組になった <strong>21〜22行目</strong> で守っています。<code>activeCount--</code> は <code>fn</code> の完了を待った後（43行目の <code>await</code> → 47行目の <code>next()</code> → 28行目）なので、実行中の数を正しく数えられます</li>
<li><strong>61行目の判定</strong>: 21行目でも同じ判定をするので、なくても結果は同じです。空きがないときに <code>resumeNext()</code> を呼ぶ手間を省く前置きです</li>
</ul>
`,on=`<div class="lead"><p><strong>ひとことで言うと</strong>: <code>Object.create(null)</code> で作ったオブジェクトには <code>hasOwnProperty</code> というメソッドが <strong>そもそも無い</strong> のに、19行目でそれを呼んでしまい、エラー（TypeError）で止まります。</p>
</div><h3>まず、言葉の確認</h3>
<p><strong>プロトタイプ</strong> は、オブジェクトの「親」のようなものです。オブジェクトは、自分が持っていないプロパティを聞かれると、親（プロトタイプ）に探しに行きます。</p>
<p>ふつうに <code>{ x: 1 }</code> と書いたオブジェクトの親は <code>Object.prototype</code> です。<code>hasOwnProperty</code> や <code>constructor</code> は、実はこの <strong>親が持っている</strong> もので、子のオブジェクトは借りて使っているだけです。</p>
<p><strong><code>Object.create(null)</code></strong> は「親を持たないオブジェクト」を作る書き方です。親がいないので、借りられるものも何もありません。キーと値を入れておくだけの「辞書」として使われることがあります。</p>
<div class="note"><p><strong>たとえ</strong>: ふつうのオブジェクトは「家に道具が無くても、親の家に借りに行ける子ども」です。<code>Object.create(null)</code> のオブジェクトは「親の家がない子ども」なので、<code>hasOwnProperty</code> という道具を借りに行けません。</p>
</div><p><strong><code>hasOwnProperty(キー)</code></strong> は「そのキーを <strong>自分自身が</strong> 持っているか（親から借りたものではないか）」を調べるメソッドです。</p>
<p><strong>TypeError</strong> は「関数ではないものを関数として呼んだ」ときなどに出るエラーです。<code>foo.hasOwnProperty</code> が <code>undefined</code> なのに <code>(...)</code> を付けて呼ぶと、<code>foo.hasOwnProperty is not a function</code> というエラーになります。</p>
<h3>図で見る：2つのオブジェクトの違い</h3>
<figure class="fig">
<svg viewBox="0 0 320 214" width="320" role="img" aria-label="ふつうの x:1 は親の Object.prototype から hasOwnProperty を借りられる。Object.create(null) で作った x:1 は親が null なので借りられない">
<defs><marker id="m008a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<text x="80" y="18" text-anchor="middle" class="bold">ふつうの { x: 1 }</text>
<text x="240" y="18" text-anchor="middle" class="bold">dict() の { x: 1 }</text>
<rect x="4" y="30" width="152" height="40" rx="8" class="b"/>
<text x="80" y="55" text-anchor="middle" class="mono">x: 1</text>
<rect x="164" y="30" width="152" height="40" rx="8" class="b"/>
<text x="240" y="55" text-anchor="middle" class="mono">x: 1</text>
<line x1="80" y1="70" x2="80" y2="104" class="l" marker-end="url(#m008a)"/>
<text x="88" y="92" class="sm tm">親</text>
<line x1="240" y1="70" x2="240" y2="104" class="l dash" marker-end="url(#m008a)"/>
<text x="248" y="92" class="sm tm">親</text>
<rect x="4" y="106" width="152" height="100" rx="8" class="bok"/>
<text x="80" y="128" text-anchor="middle" class="mono bold sm">Object.prototype</text>
<text x="12" y="152" class="mono sm">hasOwnProperty</text>
<text x="150" y="152" text-anchor="end" class="tok bold sm">あり</text>
<text x="12" y="174" class="mono sm">constructor</text>
<text x="150" y="174" text-anchor="end" class="tok bold sm">あり</text>
<text x="12" y="196" class="sm tm">toString なども</text>
<rect x="164" y="106" width="152" height="100" rx="8" class="bng"/>
<text x="240" y="128" text-anchor="middle" class="bold sm">null（親なし）</text>
<text x="172" y="152" class="mono sm">hasOwnProperty</text>
<text x="310" y="152" text-anchor="end" class="tng bold sm">なし</text>
<text x="172" y="174" class="mono sm">constructor</text>
<text x="310" y="174" text-anchor="end" class="tng bold sm">なし</text>
<text x="172" y="196" class="sm tm">何も借りられない</text>
</svg>
<figcaption>中身（x: 1）は同じでも、親がいるかどうかが違う。dict() は <code>Object.assign(Object.create(null), { x: 1 })</code></figcaption>
</figure><p>次の図は、<code>dequal(dict(), dict())</code> がコードのどこを通って、どこで止まるかです。</p>
<figure class="fig">
<svg viewBox="0 0 320 356" width="320" role="img" aria-label="5行目で constructor が同じと判定、6・7行目と9行目は該当せず、16行目で中身を比べる分岐に入り、19行目で hasOwnProperty を呼んで TypeError になる">
<defs><marker id="m008b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<rect x="4" y="8" width="312" height="36" rx="8" class="b"/>
<text x="24" y="31">5行目: constructor が同じ？</text>
<line x1="40" y1="44" x2="40" y2="66" class="l" marker-end="url(#m008b)"/>
<text x="52" y="60" class="sm tm">undefined === undefined →「はい」</text>
<rect x="4" y="68" width="312" height="36" rx="8" class="b"/>
<text x="24" y="91">6・7行目: Date？ RegExp？</text>
<line x1="40" y1="104" x2="40" y2="126" class="l" marker-end="url(#m008b)"/>
<text x="52" y="120" class="sm tm">いいえ</text>
<rect x="4" y="128" width="312" height="36" rx="8" class="b"/>
<text x="24" y="151">9行目: 配列？</text>
<line x1="40" y1="164" x2="40" y2="186" class="l" marker-end="url(#m008b)"/>
<text x="52" y="180" class="sm tm">いいえ</text>
<rect x="4" y="188" width="312" height="36" rx="8" class="ba"/>
<text x="24" y="211">16行目: <tspan class="mono">!ctor</tspan>（constructor が無い）？</text>
<line x1="40" y1="224" x2="40" y2="246" class="l" marker-end="url(#m008b)"/>
<text x="52" y="240" class="sm tm">はい → 中身を1つずつ比べる分岐へ</text>
<rect x="4" y="248" width="312" height="36" rx="8" class="bev"/>
<text x="24" y="271">19行目: <tspan class="mono">foo.hasOwnProperty('x')</tspan></text>
<line x1="40" y1="284" x2="40" y2="306" class="lng" marker-end="url(#m008b)"/>
<text x="52" y="300" class="sm tm">でも hasOwnProperty は無い…</text>
<rect x="4" y="308" width="312" height="40" rx="8" class="bng"/>
<text x="160" y="333" text-anchor="middle" class="tng bold">TypeError で止まる</text>
</svg>
<figcaption>constructor が無いオブジェクト用の分岐に入ったのに、その中で「親から借りる前提」のメソッドを呼んでいる</figcaption>
</figure><h3>コードを順番に追う</h3>
<p><code>dict()</code> を2つ作り、<code>foo</code> と <code>bar</code> として <code>dequal</code> に渡します。中身はどちらも <code>{ x: 1 }</code> ですが、別々に作ったので <strong>別のオブジェクト</strong> です。</p>
<ol>
<li><strong>3行目</strong>: <code>foo === bar</code> は <code>false</code>（別のオブジェクトなので）。先に進みます</li>
<li><strong>5行目</strong>: <code>foo.constructor</code> を見に行きます。親がいないので <code>undefined</code>。<code>bar.constructor</code> も <code>undefined</code>。<code>undefined === undefined</code> は <code>true</code> なので、<code>if</code> の中に入ります。このとき <code>ctor</code> には <code>undefined</code> が入ります</li>
<li><strong>6・7行目</strong>: <code>ctor</code> は <code>Date</code> でも <code>RegExp</code> でもありません</li>
<li><strong>9行目</strong>: <code>Array</code> でもありません</li>
<li><strong>16行目</strong>: <code>!ctor</code> は <code>!undefined</code> なので <code>true</code>。「中身を1つずつ比べる」分岐に入ります</li>
<li><strong>18行目</strong>: <code>for (ctor in foo)</code> でキーを順に取り出します。最初のキーは <code>&#39;x&#39;</code> です</li>
<li><strong>19行目</strong>: <code>foo.hasOwnProperty(&#39;x&#39;)</code> を呼ぼうとします。ところが <code>foo.hasOwnProperty</code> は <code>undefined</code>。関数ではないものを呼んだので <strong>TypeError</strong> になります</li>
</ol>
<p>ほかの選択肢は、どれもこのコードで正しく動きます。</p>
<ul>
<li><code>dequal([1, 2], [1, 2, 3])</code> → 10行目で長さが違うので比べずに13行目へ。<code>false</code>（正しい）</li>
<li><code>dequal(NaN, NaN)</code> → NaN は falsy なので5行目を素通りして26行目へ。<code>true</code>（正しい）</li>
<li><code>dequal(new Date(0), new Date(0))</code> → 6行目で時刻どうしを比べる。<code>true</code>（正しい）</li>
</ul>
<h3>ここがポイント</h3>
<ul>
<li><strong>16行目の <code>!ctor</code> は、まさに「constructor の無いオブジェクト」のための条件</strong>。なのに、その中の19行目で constructor と同じく親から借りる <code>hasOwnProperty</code> を使っている。この食い違いがバグの正体</li>
<li>「その分岐に入ってくる値は、分岐の中で使う機能を本当に持っているか？」と確かめると、こういうバグを見つけやすい</li>
<li><code>NaN</code> は自分自身とも <code>===</code> で等しくならない、ちょっと変わった値です。26行目の <code>foo !== foo</code> は「<code>foo</code> が NaN か？」を調べる定番の書き方です</li>
</ul>
<h3>もっと知りたい人へ</h3>
<p>このバグは次のコミット <a href="https://github.com/lukeed/dequal/commit/c8b3aceb0fb3cc685e489bceb0fed220ca907483">c8b3ace</a>（<em>fix: support object dictionary</em>）で直されました。先頭に <code>var has = Object.prototype.hasOwnProperty;</code> を置き、<code>has.call(foo, ctor)</code> と呼ぶ形です。</p>
<p>これは「親の道具を、オブジェクト自身を通さずに直接持ってきて使う」書き方です。この形なら、親がいないオブジェクトでも、<code>{ hasOwnProperty: 1 }</code> のように同じ名前の別物を持っているオブジェクトでも壊れません。最近の JavaScript なら <code>Object.hasOwn(foo, ctor)</code> でも同じことができます。</p>
`,sn=`<div class="lead"><p><strong>ひとことで言うと</strong>: 73行目は「中身が同じか」ではなく <strong>「同じオブジェクトそのものか」</strong> だけを見ています。これでうまくいくのは、「状態を変えるときは、元のオブジェクトを書き換えずに <strong>新しいオブジェクトを作る</strong>」という約束があるからです。</p>
</div><h3>まず、言葉の確認</h3>
<p><strong>ストア（store）</strong> は、アプリの「状態（state）」を1か所にしまっておく入れ物です。たとえば <code>{ count: 0 }</code> のようなオブジェクトが状態です。</p>
<p><strong>リスナー</strong> は「状態が変わったら教えてね」と登録しておく関数です。<code>subscribe</code> で登録し（89行目）、状態が変わると79行目で呼ばれます。画面の再描画などに使われます。</p>
<p><strong>参照</strong> は、オブジェクトの「置き場所」のことです。変数にオブジェクトを入れるとき、実際に入るのはオブジェクトそのものではなく、その置き場所を指す <strong>矢印</strong> のようなものです。</p>
<div class="note"><p><strong>たとえ</strong>: オブジェクトはロッカーの中身、変数はロッカーの番号札です。<code>Object.is(a, b)</code> は「2枚の番号札が <strong>同じロッカー</strong> を指しているか」を見るだけで、ロッカーを開けて中身を比べたりはしません。だから一瞬で終わります。</p>
</div><p><strong>イミュータブル（immutable）な更新</strong> とは、「元のオブジェクトは書き換えず、変えたいときは新しいオブジェクトを作る」やり方です。zustand はこれを前提にしています。</p>
<h3>図で見る：Object.is が見ているもの</h3>
<p><code>{ count: 0 }</code> の状態に、3通りの <code>setState</code> をしたときの様子です。矢印が「どのオブジェクトを指しているか」を表します。</p>
<figure class="fig">
<svg viewBox="0 0 320 392" width="320" role="img" aria-label="1つ目、s をそのまま返すと state と nextState は同じオブジェクトを指し通知なし。2つ目、新しい空オブジェクトを渡すと別のオブジェクトなので通知あり。3つ目、s を書き換えて返すと同じオブジェクトを指すので通知なしだが中身は変わっている">
<defs><marker id="m009a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<text x="4" y="16" class="mono sm bold">① setState((s) =&gt; s)</text>
<rect x="4" y="26" width="86" height="28" rx="6" class="b"/>
<text x="47" y="45" text-anchor="middle" class="mono sm">state</text>
<rect x="4" y="62" width="86" height="28" rx="6" class="b"/>
<text x="47" y="81" text-anchor="middle" class="mono sm">nextState</text>
<rect x="176" y="38" width="140" height="40" rx="8" class="b"/>
<text x="246" y="63" text-anchor="middle" class="mono sm">{ count: 0 }</text>
<line x1="90" y1="40" x2="174" y2="52" class="l" marker-end="url(#m009a)"/>
<line x1="90" y1="76" x2="174" y2="64" class="l" marker-end="url(#m009a)"/>
<text x="4" y="110" class="sm tm">同じオブジェクト → true →</text>
<text x="316" y="110" text-anchor="end" class="sm bold">通知しない</text>
<text x="4" y="146" class="mono sm bold">② setState({})</text>
<rect x="4" y="156" width="86" height="28" rx="6" class="b"/>
<text x="47" y="175" text-anchor="middle" class="mono sm">state</text>
<rect x="4" y="192" width="86" height="28" rx="6" class="b"/>
<text x="47" y="211" text-anchor="middle" class="mono sm">nextState</text>
<rect x="176" y="156" width="140" height="28" rx="6" class="b"/>
<text x="246" y="175" text-anchor="middle" class="mono sm">{ count: 0 }</text>
<rect x="176" y="192" width="140" height="28" rx="6" class="ba"/>
<text x="246" y="211" text-anchor="middle" class="mono sm">{ }</text>
<line x1="90" y1="170" x2="174" y2="170" class="l" marker-end="url(#m009a)"/>
<line x1="90" y1="206" x2="174" y2="206" class="l" marker-end="url(#m009a)"/>
<text x="4" y="240" class="sm tm">別のオブジェクト → false →</text>
<text x="316" y="240" text-anchor="end" class="sm bold tok">通知する</text>
<text x="4" y="276" class="mono sm bold">③ (s) =&gt; { s.count = 1; return s }</text>
<rect x="4" y="286" width="86" height="28" rx="6" class="b"/>
<text x="47" y="305" text-anchor="middle" class="mono sm">state</text>
<rect x="4" y="322" width="86" height="28" rx="6" class="b"/>
<text x="47" y="341" text-anchor="middle" class="mono sm">nextState</text>
<rect x="176" y="298" width="140" height="40" rx="8" class="bev"/>
<text x="246" y="323" text-anchor="middle" class="mono sm">{ count: 1 }</text>
<line x1="90" y1="300" x2="174" y2="312" class="l" marker-end="url(#m009a)"/>
<line x1="90" y1="336" x2="174" y2="324" class="l" marker-end="url(#m009a)"/>
<text x="4" y="370" class="sm tm">同じオブジェクト → true →</text>
<text x="316" y="370" text-anchor="end" class="sm bold tng">通知しない</text>
<text x="316" y="388" text-anchor="end" class="sm tng">でも中身は 0 → 1 に変わっている！</text>
</svg>
<figcaption>Object.is は矢印の先が同じかどうかだけを見る。③は約束違反なので、変化を見逃す</figcaption>
</figure><p>次の図は、<code>setState</code> 全体の流れです。</p>
<figure class="fig">
<svg viewBox="0 0 320 254" width="320" role="img" aria-label="69〜72行目で nextState を決める。73行目で state と同じなら何もしない。違えば75〜78行目で新しいオブジェクトを作り、79行目でリスナーに通知する">
<defs><marker id="m009b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="ah"/></marker></defs>
<rect x="4" y="6" width="312" height="36" rx="8" class="b"/>
<text x="16" y="29">69〜72行目: nextState を決める</text>
<line x1="40" y1="42" x2="40" y2="64" class="l" marker-end="url(#m009b)"/>
<rect x="4" y="66" width="206" height="40" rx="8" class="bev"/>
<text x="16" y="84" class="sm">73行目: state と</text>
<text x="16" y="100" class="sm">同じオブジェクト？</text>
<line x1="210" y1="86" x2="230" y2="86" class="l" marker-end="url(#m009b)"/>
<rect x="232" y="66" width="84" height="40" rx="8" class="b"/>
<text x="274" y="84" text-anchor="middle" class="sm">同じなら</text>
<text x="274" y="100" text-anchor="middle" class="sm">何もしない</text>
<line x1="40" y1="106" x2="40" y2="132" class="l" marker-end="url(#m009b)"/>
<text x="52" y="124" class="sm tm">違うなら</text>
<rect x="4" y="134" width="312" height="52" rx="8" class="ba"/>
<text x="16" y="155">75〜78行目: 新しいオブジェクトを作る</text>
<text x="16" y="176" class="mono sm">Object.assign({}, state, nextState)</text>
<line x1="40" y1="186" x2="40" y2="208" class="l" marker-end="url(#m009b)"/>
<rect x="4" y="210" width="312" height="36" rx="8" class="bok"/>
<text x="16" y="233">79行目: リスナーに知らせる</text>
</svg>
<figcaption>新しい状態は必ず新しいオブジェクトになる（78行目）。だから「矢印が変わった ＝ 状態が変わった」が成り立つ</figcaption>
</figure><h3>コードを順番に追う</h3>
<p>状態が <code>{ count: 0 }</code> のときに <code>setState({ count: 1 })</code> を呼んだとします。</p>
<ol>
<li><strong>69〜72行目</strong>: <code>partial</code>（渡したもの）が関数かどうかを見ます。今回は関数ではないので、<code>nextState</code> は <code>{ count: 1 }</code> そのものです。関数を渡した場合は、今の <code>state</code> を渡してその関数を呼び、戻り値を <code>nextState</code> にします（71行目）</li>
<li><strong>73行目</strong>: <code>Object.is(nextState, state)</code> で、2つが同じオブジェクトかを見ます。<code>{ count: 1 }</code> は今作ったばかりの別のオブジェクトなので「違う」。<code>if</code> の中に入ります</li>
<li><strong>74行目</strong>: 古い状態を <code>previousState</code> にとっておきます</li>
<li><strong>75〜78行目</strong>: <code>replace</code> を指定していないので、78行目の <code>Object.assign({}, state, nextState)</code> を使います。これは「空のオブジェクト <code>{}</code> に、今の state を写し、その上から nextState を上書きする」という意味です。結果は <strong>新しい</strong> <code>{ count: 1 }</code> になります</li>
<li><strong>79行目</strong>: 登録されているリスナーを全部呼び、「新しい状態」と「古い状態」を渡します</li>
</ol>
<p>ポイントは4の <strong>「必ず新しいオブジェクトを作る」</strong> ところです。こうしておけば、<code>state</code> の矢印が別のものに変わったときだけ「状態が変わった」と言えます。だから73行目は、中身を1つずつ比べなくても、矢印の比較だけで済むわけです。</p>
<h3>ここがポイント</h3>
<ul>
<li><code>Object.is</code> は <strong>中身ではなく「同じものか」</strong> を見る。中身が大きくても一瞬で判定できる</li>
<li>その代わり、③のように <strong>元のオブジェクトを直接書き換えると、変化に気づけない</strong>。React などの画面側も「矢印が変わったら描き直す」という同じ約束で動いているので、画面も更新されない</li>
<li>zustand のドキュメントが「状態は書き換えず、新しいオブジェクトで返して」と求めるのは、この73行目のため</li>
<li>逆に②のように、中身が同じでも新しいオブジェクトを渡すと「変わった」と判断される。深く比べない代わりに、余計な通知は起こりうる、という割り切りです</li>
</ul>
<h3>もっと知りたい人へ</h3>
<ul>
<li><code>Object.is</code> と <code>===</code> はほぼ同じですが、<code>Object.is(NaN, NaN)</code> は <code>true</code>（<code>===</code> だと <code>false</code>）、<code>Object.is(0, -0)</code> は <code>false</code>（<code>===</code> だと <code>true</code>）という違いがあります</li>
<li>76行目の <code>replace ?? (…)</code> は、<code>replace</code> を指定しなかったときの既定値です。<code>nextState</code> がオブジェクトでない（数値など）か <code>null</code> なら、混ぜずにそのまま置き換えます</li>
</ul>
`,cn=`<div class="lead"><p><strong>ひとことで言うと</strong>: 親を子と入れ替えて下に沈めるとき、子が2人とも親より小さいなら、<strong>小さいほうの子</strong> を上に上げないとルールが崩れます。その「左と右、どっちが小さい？」を比べているのが <strong>71行目</strong> の <code>compare(right, left) &lt; 0</code> です。</p>
</div><h3>まず、言葉の確認</h3>
<p><strong>ヒープ</strong> は「一番小さいものを、すぐ取り出せる」ように並べたデータの形です。React のスケジューラは、やるべき仕事（タスク）をヒープに入れ、一番急ぐものから順に実行します。急ぐほど <code>sortIndex</code> が小さくなります。</p>
<p><strong>最小ヒープのルール（不変条件）</strong> はたった1つです。</p>
<div class="note"><p><strong>どの親も、自分の子より小さいか同じ。</strong></p>
<p>トーナメント表を逆さにしたような木を思い浮かべてください。どの枝を見ても「上のほうが小さい」ので、<strong>一番上（根）が全体で一番小さい</strong> ことが保証されます。だから <code>peek</code>（23〜25行目）は <code>heap[0]</code> を返すだけで済みます。</p>
</div><p><strong>不変条件</strong> とは「いつどんな操作をした後でも、必ず守られているルール」のことです。ヒープの関数は、どれもこのルールを壊さないように作られています。</p>
<p><strong>siftDown（シフトダウン）</strong> は、ルールに合わない位置に置かれた要素を、子と入れ替えながら <strong>下へ沈めていく</strong> 処理です。逆に <code>siftUp</code>（42〜57行目）は <strong>上へ浮かせる</strong> 処理です。</p>
<h3>図で見る①：木と配列の対応</h3>
<p>ヒープは木の形で考えますが、実際には <strong>ただの配列</strong> に入っています。上の段から、左から右へ順に詰めていきます。</p>
<figure class="fig">
<svg viewBox="0 0 320 262" width="320" role="img" aria-label="配列 1,3,2,7,4,5 を木にした図。0番の子は1番と2番、1番の子は3番と4番、2番の子は5番">
<line x1="160" y1="30" x2="90" y2="90" class="l"/>
<line x1="160" y1="30" x2="230" y2="90" class="l"/>
<line x1="90" y1="90" x2="50" y2="150" class="l"/>
<line x1="90" y1="90" x2="130" y2="150" class="l"/>
<line x1="230" y1="90" x2="190" y2="150" class="l"/>
<circle cx="160" cy="30" r="18" class="ba"/>
<text x="160" y="35" text-anchor="middle" class="bold">1</text>
<text x="184" y="26" class="sm tm mono">[0]</text>
<circle cx="90" cy="90" r="18" class="b"/>
<text x="90" y="95" text-anchor="middle">3</text>
<text x="56" y="86" class="sm tm mono">[1]</text>
<circle cx="230" cy="90" r="18" class="b"/>
<text x="230" y="95" text-anchor="middle">2</text>
<text x="254" y="86" class="sm tm mono">[2]</text>
<circle cx="50" cy="150" r="18" class="b"/>
<text x="50" y="155" text-anchor="middle">7</text>
<circle cx="130" cy="150" r="18" class="b"/>
<text x="130" y="155" text-anchor="middle">4</text>
<circle cx="190" cy="150" r="18" class="b"/>
<text x="190" y="155" text-anchor="middle">5</text>
<text x="50" y="184" text-anchor="middle" class="sm tm mono">[3]</text>
<text x="130" y="184" text-anchor="middle" class="sm tm mono">[4]</text>
<text x="190" y="184" text-anchor="middle" class="sm tm mono">[5]</text>
<rect x="22" y="204" width="46" height="34" class="ba"/>
<rect x="68" y="204" width="46" height="34" class="b"/>
<rect x="114" y="204" width="46" height="34" class="b"/>
<rect x="160" y="204" width="46" height="34" class="b"/>
<rect x="206" y="204" width="46" height="34" class="b"/>
<rect x="252" y="204" width="46" height="34" class="b"/>
<text x="45" y="226" text-anchor="middle" class="bold">1</text>
<text x="91" y="226" text-anchor="middle">3</text>
<text x="137" y="226" text-anchor="middle">2</text>
<text x="183" y="226" text-anchor="middle">7</text>
<text x="229" y="226" text-anchor="middle">4</text>
<text x="275" y="226" text-anchor="middle">5</text>
<text x="45" y="256" text-anchor="middle" class="sm tm mono">0</text>
<text x="91" y="256" text-anchor="middle" class="sm tm mono">1</text>
<text x="137" y="256" text-anchor="middle" class="sm tm mono">2</text>
<text x="183" y="256" text-anchor="middle" class="sm tm mono">3</text>
<text x="229" y="256" text-anchor="middle" class="sm tm mono">4</text>
<text x="275" y="256" text-anchor="middle" class="sm tm mono">5</text>
</svg>
<figcaption>上が木、下が実際の配列。[ ] の数字が配列の位置（インデックス）</figcaption>
</figure><p>配列の位置だけで親子がわかるのがヒープの便利なところです。</p>
<ul>
<li><strong>左の子の位置</strong> = <code>2 × i + 1</code>（例: 位置1の左の子は 3）… 64行目</li>
<li><strong>右の子の位置</strong> = 左の子 + 1（例: 位置1の右の子は 4）… 66行目</li>
<li><strong>親の位置</strong> = <code>(i − 1) ÷ 2</code> の切り捨て（例: 位置3や4の親は 1）… 45行目</li>
</ul>
<p>64行目の <code>(index + 1) * 2 - 1</code> は、計算すると <code>2 * index + 1</code> と同じです。<code>&gt;&gt;&gt; 1</code> は「2で割って小数点以下を切り捨てる」の短い書き方です。</p>
<h3>図で見る②：なぜ「小さいほう」と入れ替えるのか</h3>
<p>根に <code>5</code> が置かれ、子が <code>3</code> と <code>2</code> だったとします。どちらも <code>5</code> より小さいので、どちらかと入れ替えて <code>5</code> を沈めます。</p>
<figure class="fig">
<svg viewBox="0 0 320 168" width="320" role="img" aria-label="入れ替える前は親5、子3と2。大きいほうの3と入れ替えると親3、子5と2になり、3が2より大きいのでルール違反。小さいほうの2と入れ替えると親2、子3と5になりルールを守れる">
<text x="53" y="14" text-anchor="middle" class="sm bold">入れ替える前</text>
<line x1="53" y1="42" x2="27" y2="98" class="l"/>
<line x1="53" y1="42" x2="79" y2="98" class="l"/>
<circle cx="53" cy="42" r="16" class="bev"/>
<text x="53" y="47" text-anchor="middle" class="bold">5</text>
<circle cx="27" cy="98" r="16" class="b"/>
<text x="27" y="103" text-anchor="middle">3</text>
<circle cx="79" cy="98" r="16" class="b"/>
<text x="79" y="103" text-anchor="middle">2</text>
<text x="53" y="138" text-anchor="middle" class="sm tm">左も右も</text>
<text x="53" y="156" text-anchor="middle" class="sm tm">5 より小さい</text>
<text x="160" y="14" text-anchor="middle" class="sm bold">3 と入れ替え</text>
<line x1="160" y1="42" x2="134" y2="98" class="l"/>
<line x1="160" y1="42" x2="186" y2="98" class="lng"/>
<circle cx="160" cy="42" r="16" class="bng"/>
<text x="160" y="47" text-anchor="middle" class="bold">3</text>
<circle cx="134" cy="98" r="16" class="b"/>
<text x="134" y="103" text-anchor="middle">5</text>
<circle cx="186" cy="98" r="16" class="bng"/>
<text x="186" y="103" text-anchor="middle">2</text>
<text x="160" y="138" text-anchor="middle" class="sm tng bold">✗ 親 3 ＞ 子 2</text>
<text x="160" y="156" text-anchor="middle" class="sm tng">ルール違反</text>
<text x="267" y="14" text-anchor="middle" class="sm bold">2 と入れ替え</text>
<line x1="267" y1="42" x2="241" y2="98" class="lok"/>
<line x1="267" y1="42" x2="293" y2="98" class="lok"/>
<circle cx="267" cy="42" r="16" class="bok"/>
<text x="267" y="47" text-anchor="middle" class="bold">2</text>
<circle cx="241" cy="98" r="16" class="b"/>
<text x="241" y="103" text-anchor="middle">3</text>
<circle cx="293" cy="98" r="16" class="b"/>
<text x="293" y="103" text-anchor="middle">5</text>
<text x="267" y="138" text-anchor="middle" class="sm tok bold">✓ 2 ≦ 3、2 ≦ 5</text>
<text x="267" y="156" text-anchor="middle" class="sm tok">ルールを守れる</text>
</svg>
<figcaption>小さいほうを上げれば、新しい親は残ったもう一方の子よりも必ず小さい</figcaption>
</figure><p>大きいほう（3）を上げてしまうと、もう一方の子（2）のほうが小さいので「親 ≦ 子」が崩れます。小さいほう（2）を上げれば、2 は 3 よりも 5 よりも小さいので、ルールが守られます。</p>
<h3>コードを順番に追う</h3>
<p>図①のヒープ <code>[1, 3, 2, 7, 4, 5]</code> から、一番小さい <code>1</code> を <code>pop</code> で取り出してみます。</p>
<ol>
<li><strong>31行目</strong>: 先頭の <code>1</code> を <code>first</code> にとっておきます</li>
<li><strong>32行目</strong>: 末尾の <code>5</code> を配列から外します。配列は <code>[1, 3, 2, 7, 4]</code></li>
<li><strong>35行目</strong>: その <code>5</code> を先頭に置きます。配列は <code>[5, 3, 2, 7, 4]</code>。根が 5 なのでルールが崩れています</li>
<li><strong>37行目</strong>: <code>siftDown</code> で 5 を沈めます</li>
</ol>
<p><code>siftDown</code> の中（<code>index</code> は 0、<code>length</code> は 5）:</p>
<ol>
<li><strong>62〜63行目</strong>: <code>halfLength = 5 &gt;&gt;&gt; 1 = 2</code>。位置が 2 より小さい間だけ続けます。今は 0 なので続けます</li>
<li><strong>64〜67行目</strong>: 左右の子を取り出します。左 = 位置1の <code>3</code>、右 = 位置2の <code>2</code></li>
<li><strong>70行目</strong>: 左は node（5）より小さい？ → 3 &lt; 5 で「はい」</li>
<li><strong>71行目</strong>: 右の子がいて、しかも <strong>右 &lt; 左</strong>？ → 2 &lt; 3 で「はい」</li>
<li><strong>72〜74行目</strong>: 右と入れ替えます。配列は <code>[2, 3, 5, 7, 4]</code>、<code>index</code> は 2 になります</li>
<li><strong>63行目に戻る</strong>: 2 &lt; 2 ではないので終わり</li>
</ol>
<p>結果は <code>[2, 3, 5, 7, 4]</code>。次に小さい <code>2</code> がちゃんと先頭に来ました。</p>
<p><code>if</code> の分かれ方をまとめると次のとおりです。</p>
<ul>
<li><strong>70行目が「はい」</strong>（左が node より小さい）→ <strong>71行目</strong> で左右を比べ、小さいほうと入れ替え（右なら72〜74行目、左なら76〜78行目）</li>
<li><strong>70行目が「いいえ」</strong> でも、右が node より小さければ <strong>80行目</strong> で右と入れ替え。左が node 以上なので、左右を比べるまでもなく右が小さい</li>
<li>どちらの子も node 以上なら <strong>86行目</strong> で終わり。もう正しい位置です</li>
</ul>
<h3>ここがポイント</h3>
<ul>
<li>ヒープのルールは「どの親も子以下」だけ。左の子と右の子の大小は決まっていない</li>
<li>だから沈めるときは、子どうしを比べて <strong>小さいほう</strong> を選ぶ必要がある。それが71行目</li>
<li>71行目の <code>rightIndex &lt; length</code> は「右の子が本当にいるか」の確認。末尾の親は左の子しか持たないことがある</li>
</ul>
<h3>もっと知りたい人へ</h3>
<ul>
<li><strong>62〜63行目</strong>: 配列の後ろ半分（位置 <code>length &gt;&gt;&gt; 1</code> 以降）は子を持たない「葉」です。葉まで来たらそれ以上沈められないので、そこでループを止めます</li>
<li><strong>91〜94行目</strong>: <code>sortIndex</code> が同じなら <code>id</code> で比べます。<code>id</code> は登録順に増えるので、同じ急ぎ具合のタスクは先に入れたものから実行されます</li>
<li><strong>42〜57行目</strong>: <code>push</code> で使う <code>siftUp</code> は逆向きです。末尾に置いた要素を、親より小さい間だけ上へ浮かせます</li>
<li><code>pop</code> も <code>push</code> も、木の高さぶん（要素数 n に対して約 log₂ n 回）しか入れ替えないので、タスクが増えても速いままです</li>
</ul>
`,ln=Object.assign({"./clsx.txt":`MIT License

Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`,"./debounce.txt":`MIT License

Coprighht (c) Jeremy Ashkenas, Julian Gonggrijp, DocumentCloud, Investigative Reporters & Editors
Copyright (c) Ben Carpenter, Billy Moon, Josh Goldberg, Julian Gruber, Kristofer Selbekk, Matthew Mueller, Nathan Rajlich, Oleg Pudeyev, Stephen Mathieson, TJ Holowaychuk, suhaotian, ven
Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`,"./dequal.txt":`The MIT License (MIT)

Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
`,"./mitt.txt":`MIT License

Copyright (c) 2021 Jason Miller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`,"./ms.txt":`The MIT License (MIT)

Copyright (c) 2025 Vercel, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`,"./nanoid.txt":`The MIT License (MIT)

Copyright 2017 Andrey Sitnik <andrey@sitnik.es>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`,"./p-limit.txt":`MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`,"./react.txt":`MIT License

Copyright (c) Meta Platforms, Inc. and affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`,"./tiny-invariant.txt":`MIT License

Copyright (c) 2019 Alexander Reardon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,"./zustand.txt":`MIT License

Copyright (c) 2019 Paul Henschel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`}),un=[{key:`clsx`,name:`clsx`,repo:`lukeed/clsx`},{key:`tiny-invariant`,name:`tiny-invariant`,repo:`alexreardon/tiny-invariant`},{key:`ms`,name:`ms`,repo:`vercel/ms`},{key:`mitt`,name:`mitt`,repo:`developit/mitt`},{key:`nanoid`,name:`nanoid`,repo:`ai/nanoid`},{key:`debounce`,name:`debounce`,repo:`sindresorhus/debounce`},{key:`p-limit`,name:`p-limit`,repo:`sindresorhus/p-limit`},{key:`dequal`,name:`dequal`,repo:`lukeed/dequal`},{key:`zustand`,name:`zustand`,repo:`pmndrs/zustand`},{key:`react`,name:`React (scheduler)`,repo:`facebook/react`}].map(e=>{let t=ln[`./${e.key}.txt`];if(t===void 0)throw Error(`licenses/${e.key}.txt がありません`);return{...e,text:t.trimEnd()}}),dn=e=>un.some(t=>t.key===e),fn=Object.assign({"./001-clsx/problem.ts":Mt,"./002-tiny-invariant/problem.ts":Nt,"./003-ms/problem.ts":Pt,"./004-mitt/problem.ts":Ft,"./005-nanoid/problem.ts":It,"./006-debounce/problem.ts":Lt,"./007-p-limit/problem.ts":Rt,"./008-dequal/problem.ts":zt,"./009-zustand/problem.ts":Bt,"./010-react-scheduler/problem.ts":Vt}),pn=Object.assign({"./001-clsx/snippet.js.txt":Ht,"./002-tiny-invariant/snippet.ts.txt":Ut,"./003-ms/snippet.ts.txt":Wt,"./004-mitt/snippet.ts.txt":Gt,"./005-nanoid/snippet.js.txt":Kt,"./006-debounce/snippet.js.txt":qt,"./007-p-limit/snippet.js.txt":Jt,"./008-dequal/snippet.js.txt":Yt,"./009-zustand/snippet.ts.txt":Xt,"./010-react-scheduler/snippet.js.txt":Zt}),mn=Object.assign({"./001-clsx/explanation.md":Qt,"./002-tiny-invariant/explanation.md":$t,"./003-ms/explanation.md":en,"./004-mitt/explanation.md":tn,"./005-nanoid/explanation.md":nn,"./006-debounce/explanation.md":rn,"./007-p-limit/explanation.md":an,"./008-dequal/explanation.md":on,"./009-zustand/explanation.md":sn,"./010-react-scheduler/explanation.md":cn});function hn(e,t){let n=e.replace(/\/problem\.ts$/,``),r=pn[`${n}/snippet.${t.language}.txt`],i=mn[`${n}/explanation.md`];if(!r)throw Error(`${n}: snippet.${t.language}.txt がありません`);if(i===void 0)throw Error(`${n}: explanation.md がありません`);let a={...t,code:r.code,codeLines:r.lines,firstLine:t.source.modified?1:t.source.lines[0],explanation:i};return gn(n,a),a}function gn(e,t){let n=[],r=t.codeLines.length,i=t.firstLine+r-1;`./${t.id}`!==e&&n.push(`id "${t.id}" がディレクトリ名と一致しない`),(r<20||r>80)&&n.push(`コードは20〜80行（現在 ${r} 行）`),t.evidenceLines.length===0&&n.push(`evidenceLines が空`);for(let e of t.evidenceLines)(e<t.firstLine||e>i)&&n.push(`evidenceLines ${e} が表示範囲 ${t.firstLine}-${i} の外`);let[a,o]=t.source.lines;if(!t.source.modified&&o-a+1!==r&&n.push(`改変なしなのに source.lines (${a}-${o}) とコード行数 ${r} が合わない`),t.source.modified&&!t.source.modification&&n.push(`modified なら modification を書く`),/^[0-9a-f]{40}$/.test(t.source.commit)||n.push(`source.commit は40桁のSHA`),dn(t.source.licenseKey)||n.push(`licenses/${t.source.licenseKey}.txt がない`),new Set(t.choices.map(e=>e.text)).size!==4&&n.push(`選択肢の本文が重複している`),n.length)throw Error(`問題データ ${e} が不正:\n  - ${n.join(`
  - `)}`)}var _n=Object.entries(fn).map(([e,t])=>hn(e,t)).sort((e,t)=>e.id.localeCompare(t.id)),vn=e=>_n.find(t=>t.id===e),yn=e=>_n.filter(t=>t.level===e);function bn(e){let t=yn(e.level);return t[t.indexOf(e)+1]}export{De as A,D as B,ze as C,Ve as D,Ie as E,x as F,M as G,O as H,S as I,E as K,Ne as L,w as M,T as N,Le as O,C as P,je as R,a as S,Re as T,e as U,k as V,Ae as W,X as _,un as a,et as b,at as c,gt as d,ht as f,_t as g,Xe as h,yn as i,N as j,ie as k,tt as l,dt as m,vn as n,jt as o,kt as p,P as q,_n as r,Et as s,bn as t,mt as u,nt as v,Fe as w,ut as x,lt as y,ke as z};