function a(r,e={},t){for(const o in r){const s=r[o],i=t?`${t}:${o}`:o;typeof s=="object"&&s!==null?a(s,e,i):typeof s=="function"&&(e[i]=s)}return e}const l={run:r=>r()},d=()=>l,f=typeof console.createTask<"u"?console.createTask:d;function k(r,e){const t=e.shift(),o=f(t);return r.reduce((s,i)=>s.then(()=>o.run(()=>i(...e))),Promise.resolve())}function u(r,e){const t=e.shift(),o=f(t);return Promise.all(r.map(s=>o.run(()=>s(...e))))}function c(r,e){for(const t of[...r])t(e)}class _{constructor(){this._hooks={},this._before=void 0,this._after=void 0,this._deprecatedMessages=void 0,this._deprecatedHooks={},this.hook=this.hook.bind(this),this.callHook=this.callHook.bind(this),this.callHookWith=this.callHookWith.bind(this)}hook(e,t,o={}){if(!e||typeof t!="function")return()=>{};const s=e;let i;for(;this._deprecatedHooks[e];)i=this._deprecatedHooks[e],e=i.to;if(i&&!o.allowDeprecated){let h=i.message;h||(h=`${s} hook has been deprecated`+(i.to?`, please use ${i.to}`:"")),this._deprecatedMessages||(this._deprecatedMessages=new Set),this._deprecatedMessages.has(h)||(console.warn(h),this._deprecatedMessages.add(h))}if(!t.name)try{Object.defineProperty(t,"name",{get:()=>"_"+e.replace(/\W+/g,"_")+"_hook_cb",configurable:!0})}catch{}return this._hooks[e]=this._hooks[e]||[],this._hooks[e].push(t),()=>{t&&(this.removeHook(e,t),t=void 0)}}hookOnce(e,t){let o,s=(...i)=>(typeof o=="function"&&o(),o=void 0,s=void 0,t(...i));return o=this.hook(e,s),o}removeHook(e,t){if(this._hooks[e]){const o=this._hooks[e].indexOf(t);o!==-1&&this._hooks[e].splice(o,1),this._hooks[e].length===0&&delete this._hooks[e]}}deprecateHook(e,t){this._deprecatedHooks[e]=typeof t=="string"?{to:t}:t;const o=this._hooks[e]||[];delete this._hooks[e];for(const s of o)this.hook(e,s)}deprecateHooks(e){Object.assign(this._deprecatedHooks,e);for(const t in e)this.deprecateHook(t,e[t])}addHooks(e){const t=a(e),o=Object.keys(t).map(s=>this.hook(s,t[s]));return()=>{for(const s of o.splice(0,o.length))s()}}removeHooks(e){const t=a(e);for(const o in t)this.removeHook(o,t[o])}removeAllHooks(){for(const e in this._hooks)delete this._hooks[e]}callHook(e,...t){return t.unshift(e),this.callHookWith(k,e,...t)}callHookParallel(e,...t){return t.unshift(e),this.callHookWith(u,e,...t)}callHookWith(e,t,...o){const s=this._before||this._after?{name:t,args:o,context:{}}:void 0;this._before&&c(this._before,s);const i=e(t in this._hooks?[...this._hooks[t]]:[],o);return i instanceof Promise?i.finally(()=>{this._after&&s&&c(this._after,s)}):(this._after&&s&&c(this._after,s),i)}beforeEach(e){return this._before=this._before||[],this._before.push(e),()=>{if(this._before!==void 0){const t=this._before.indexOf(e);t!==-1&&this._before.splice(t,1)}}}afterEach(e){return this._after=this._after||[],this._after.push(e),()=>{if(this._after!==void 0){const t=this._after.indexOf(e);t!==-1&&this._after.splice(t,1)}}}}function p(){return new _}const n=document.getElementById("messages");function b(){for(;n.firstChild;)n.removeChild(n.firstChild)}function H(...r){console.log([...r]);const e=document.createElement("div");e.textContent=r.map(t=>Array.isArray(t)?t:t instanceof Object?Object.entries(t).reduce((o,s)=>`${o} ${s[0]}=${s[1]}`,""):t).join(" "),e.classList.add("message"),n.append(e)}async function v(r){return new Promise(e=>{setTimeout(()=>{e()},r)})}export{H as a,b,p as c,v as s};