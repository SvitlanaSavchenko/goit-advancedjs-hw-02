import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i}from"./assets/vendor-651d7991.js";const o=document.querySelector(".form");function l(s,e){return new Promise((n,a)=>{const r=Math.random()>.3;setTimeout(()=>{r?n({position:s,delay:e}):a({position:s,delay:e})},e)})}o.addEventListener("submit",async s=>{s.preventDefault();const e=parseInt(o.elements.delay.value),n=parseInt(o.elements.step.value),a=parseInt(o.elements.amount.value);let r=e;for(let m=1;m<=a;m++){try{await l(m,r).then(({position:t,delay:c})=>{i.success({message:`✅ Fulfilled promise ${t} in ${c}ms`})}).catch(({position:t,delay:c})=>{i.error({message:`❌ Rejected promise ${t} in ${c}ms`})})}catch(t){console.error(t)}r+=n}});
//# sourceMappingURL=commonHelpers3.js.map
