var A=Object.defineProperty;var w=s=>{throw TypeError(s)};var q=(s,e,t)=>e in s?A(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var h=(s,e,t)=>q(s,typeof e!="symbol"?e+"":e,t),v=(s,e,t)=>e.has(s)||w("Cannot "+t);var b=(s,e,t)=>(v(s,e,"read from private field"),t?t.call(s):e.get(s)),L=(s,e,t)=>e.has(s)?w("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t),E=(s,e,t,o)=>(v(s,e,"write to private field"),o?o.call(s,t):e.set(s,t),t),S=(s,e,t)=>(v(s,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();var f;const l=class l{constructor(){return l.instance||(l.instance=this),l.instance}static lock(){if(b(this,f))return;E(l,f,!0);const e=window.scrollY;document.body.style.position="fixed",document.body.style.top=`-${e}px`,document.body.style.width="100%",document.body.dataset.scrollLock=e}static unlock(){if(!b(this,f))return;E(l,f,!1);const e=parseInt(document.body.dataset.scrollLock||"0",10);document.body.style.position="",document.body.style.top="",document.body.style.width="",document.body.dataset.scrollLock="",window.scrollTo(0,e)}get isLocked(){return b(l,f)}};f=new WeakMap,L(l,f,!1),h(l,"instance");let g=l;const r=class r{constructor(e={}){if(r.instance)return r.instance;this.defaultOptions={animationClass:"fade",trapFocus:!1,...e},this.createOverlay(),r.instance=this}createOverlay(){if(!document.querySelector(r.selectors.modalOverlay)){const e=document.createElement("div");e.className="modal__overlay",e.classList.add(r.stateClasses.overlay),document.body.appendChild(e)}}openModal({message:e,needCloseBtn:t,inCloseBtn:o,onClose:n=()=>{},options:i={}}={}){const a=document.querySelector(r.selectors.modalOverlay),u={...this.defaultOptions,...i};a.innerHTML=`
    <div class="modal__content ${u.animationClass}">
      ${t?`<button data-js-close-btn class="btn">${o}</button>`:""}
      ${e}
    </div>
  `,a.classList.toggle(r.stateClasses.overlayOpen,!0),a.classList.toggle(r.stateClasses.overlayClose,!1),g.lock();const d=a.querySelector(r.selectors.closeBtn);if(d){const m=()=>{n(),this.closeAll(),d.removeEventListener("click",m)};d.addEventListener("click",m)}a.addEventListener("click",m=>{m.target===a&&(n(),this.closeAll())}),u.trapFocus&&this.trapFocus(a.querySelector(r.selectors.modalContent))}closeAll(){const e=document.querySelector(r.selectors.modalOverlay);e&&(e.classList.remove(r.stateClasses.overlayOpen),e.classList.add(r.stateClasses.overlayClose),e.innerHTML="",g.unlock())}trapFocus(e){const t=e.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),o=t[0],n=t[t.length-1];if(!t.length){console.warn("No focusable elements found in the modal.");return}e.addEventListener("keydown",i=>{i.key==="Tab"&&(i.shiftKey&&document.activeElement===o?(i.preventDefault(),n.focus()):!i.shiftKey&&document.activeElement===n&&(i.preventDefault(),o.focus()))}),o.focus()}static getInstance(e={}){return r.instance||(r.instance=new r(e)),r.instance}};h(r,"instance",null),h(r,"stateClasses",{overlay:"modal__overlay",overlayOpen:"modal__overlay_open",overlayClose:"modal__overlay_close"}),h(r,"selectors",{modalOverlay:".modal__overlay",modalContent:".modal__content",closeBtn:"[data-js-close-btn]"});let p=r;var y,x,B;const c=class c{constructor(){L(this,y);h(this,"attrs",{form:"data-js-form"});if(c.instance)return c.instance;S(this,y,B).call(this),c.instance=this}static getInstance(){return c.instance||(c.instance=new c),c.instance}};y=new WeakSet,x=function(e){const{target:t,submitter:o}=e;if(console.debug("form"),!t.hasAttribute(`${this.attrs.form}`)||!t.tagName.toLowerCase()==="form")return;if(t.hasAttribute("unsolicited")){o.disabled=!1;return}const n=JSON.parse(t.getAttribute(this.attrs.form)),{url:i,method:a="POST",showModalAfterSuccess:u,preventDefault:d=!0,redirectUrlAfterSuccess:m,delayBeforeRedirect:C}=n,F=new FormData(t);d&&e.preventDefault(),o.disabled=!0,fetch(i,{method:a,body:F}).then($=>{u&&(p.getInstance().closeAll(),p.getInstance().openModal({message:"Данные успешно отправлены",needCloseBtn:!0,inCloseBtn:"X"})),m&&(C?setTimeout(()=>{location.href=m},C):location.href=m)}).finally(()=>{o.disabled=!1})},B=function(){document.addEventListener("submit",e=>{S(this,y,x).call(this,e)},!1)},h(c,"instance");let O=c;class N{constructor(e,t){this.form=e,this.config=t,this.errors={},this.submitButton=e.querySelector('[type="submit"]'),this.init(),this.bindSubmitListener()}init(){this.form.addEventListener("input",e=>{const t=e.target;this.config[t.name]&&this.validateField(t)})}bindSubmitListener(){this.form.addEventListener("submit",this.handleSubmit.bind(this),!0)}handleSubmit(e){this.validateForm(),this.isValidForm()?this.form.removeAttribute("unsolicited"):(e.preventDefault(),this.form.setAttribute("unsolicited","true"))}validateField(e){const t=this.config[e.name],o=e.value.trim(),n=[],i=a=>{const u=a%10,d=a%100;return d>=11&&d<=14?"ов":u===1?"":u>=2&&u<=4?"а":"ов"};if(!t.required&&!o){this.errors[e.name]=[],this.displayErrors(e,[]);return}t.required&&!o&&n.push("Это поле обязательно."),t.minLength&&o.length<t.minLength&&n.push(`Минимальная длина ${t.minLength} символ${i(t.minLength)}.`),t.maxLength&&o.length>t.maxLength&&n.push(`Максимальная длина ${t.maxLength} символ${i(t.maxLength)}.`),t.pattern&&!t.pattern.test(o)&&n.push("Неверный формат."),this.errors[e.name]=n,this.displayErrors(e,n)}validateForm(){this.form.querySelectorAll("input, textarea, select").forEach(t=>{this.config[t.name]&&this.validateField(t)}),this.updateSubmitButtonState()}displayErrors(e,t){let o=e.nextElementSibling;(!o||!o.classList.contains("error-message"))&&(o=document.createElement("div"),o.className="error-message",e.after(o)),o.innerHTML=t.join("<br>")}updateSubmitButtonState(){this.isValidForm()?(this.submitButton.classList.remove("disabled"),this.submitButton.disabled=!1):(this.submitButton.classList.add("disabled"),this.submitButton.disabled=!0)}isValidForm(){return Object.values(this.errors).every(e=>e.length===0)}}class D{static setup(e){const t={email:{type:"text",required:!0,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/},message:{type:"text",required:!1,minLength:8,maxLength:50},fullName:{type:"text",required:!0,minLength:3,maxLength:15}};return new N(e,t)}}function T(){return new Promise(s=>{document.readyState=="loading"?document.addEventListener("DOMContentLoaded",()=>{s()}):s()})}T().then(()=>{console.debug("DOM ready"),document.getElementById("openModalBtn").addEventListener("click",()=>{p.getInstance().openModal({message:`
      <h2>Send us a message</h2>
      <form novalidate data-js-form='{"url": "/submit", "method": "POST", "showModalAfterSuccess": "Thank you!", "preventDefault": true}' id="contactForm">
        <label for="fullName">Full Name</label>
        <input type="text" id="fullName" name="fullName" placeholder="Your full name">
        
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your email">
        
        <label for="message">Message</label>
        <textarea id="message" name="message" placeholder="Your message" rows="4"></textarea>
        
        <button class = "btn" type="submit">Submit</button>
      </form>
    `,needCloseBtn:!0,inCloseBtn:"X"});const t=document.getElementById("contactForm");D.setup(t),new O})});
