import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i as l}from"./assets/vendor-651d7991.js";const t=document.querySelector(".form");function u(s,e){return new Promise((n,o)=>{const r=Math.random()>.3;setTimeout(()=>{r?n({position:s,delay:e}):o({position:s,delay:e})},e)})}t.addEventListener("submit",s=>{s.preventDefault();const e=parseInt(t.elements.delay.value),n=parseInt(t.elements.step.value),o=parseInt(t.elements.amount.value);let r=e;for(let m=1;m<=o;m++)u(m,r).then(({position:a,delay:i})=>{l.success({message:`✅ Fulfilled promise ${a} in ${i}ms`})}).catch(({position:a,delay:i})=>{l.error({message:`❌ Rejected promise ${a} in ${i}ms`})}),r+=n;t.reset()});
//# sourceMappingURL=commonHelpers3.js.map
