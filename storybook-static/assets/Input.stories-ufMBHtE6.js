import{l as z,h as c,i as C,u as I,j as E,k as U,d as x,p as m,a as f,g as M,b as D,f as S,e as H,s as y,c as _,r as h}from"./iframe-DYZLbkB8.js";import{a as W,c as q,i as A,d as K}from"./create-runtime-stories-CU0EMzP3.js";import{b as L}from"./this-Xkc7964o.js";import{F as $}from"./Field-B9tjvGdf.js";import"./preload-helper-PPVm8Dsz.js";function V(e,r,u=r){var i=new WeakSet;z(e,"input",async s=>{var l=s?e.defaultValue:e.value;if(l=F(e)?P(l):l,u(l),c!==null&&i.add(c),await C(),l!==(l=r())){var v=e.selectionStart,t=e.selectionEnd,o=e.value.length;if(e.value=l??"",t!==null){var a=e.value.length;v===t&&t===o&&a>o?(e.selectionStart=a,e.selectionEnd=a):(e.selectionStart=v,e.selectionEnd=Math.min(t,a))}}}),(U&&e.defaultValue!==e.value||I(r)==null&&e.value)&&(u(F(e)?P(e.value):e.value),c!==null&&i.add(c)),E(()=>{var s=r();if(e===document.activeElement){var l=c;if(i.has(l))return}F(e)&&s===P(e.value)||e.type==="date"&&!s&&!e.value||s!==e.value&&(e.value=s??"")})}function F(e){var r=e.type;return r==="number"||r==="range"}function P(e){return e===""?null:+e}var j=new Set(["$$slots","$$events","$$legacy","value","invalid","element","class"]),N=S("<input/>");function b(e,r){x(r,!0);let u=m(r,"value",15),i=m(r,"invalid",3,!1),s=m(r,"element",15),l=m(r,"class",3,""),v=D(r,j);const t="w-full rounded-md border px-3 py-2 text-sm leading-normal text-neutral-800 transition-colors focus:outline-none focus:ring-2 disabled:cursor-default disabled:bg-neutral-100 disabled:text-neutral-500",o="border-neutral-300 bg-white focus:border-primary-600 focus:ring-primary-600/15",a="border-error-500 bg-error-50 focus:border-error-500 focus:ring-error-500/20";var n=N();W(n,()=>({class:[t,!i()&&o,i()&&a,l()],...v}),void 0,void 0,void 0,"svelte-8ff5h4",!0),L(n,d=>s(d),()=>s()),V(n,u),f(e,n),M()}const O={title:"UI/Input",tags:["autodocs"]},{Story:g}=K();var p=S('<div class="w-72"><!></div>'),R=S("<!> <!> <!> <!>",1);function B(e,r){x(r,!1),A();var u=R(),i=H(u);g(i,{name:"Standard",children:(t,o)=>{var a=p(),n=_(a);$(n,{label:"E-Mail",for:"email",children:(d,k)=>{b(d,{id:"email",type:"email",placeholder:"name@example.de"})},$$slots:{default:!0}}),h(a),f(t,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div class="w-72">
<Field label="E-Mail" for="email">
	<Input id="email" type="email" placeholder="name@example.de" />
</Field>
</div>
 </undefined>`}}});var s=y(i,2);g(s,{name:"Mit Hinweis",children:(t,o)=>{var a=p(),n=_(a);$(n,{label:"Postleitzahl",for:"plz",hint:"Fünfstellig, ohne Leerzeichen.",children:(d,k)=>{b(d,{id:"plz",inputmode:"numeric",placeholder:"12345"})},$$slots:{default:!0}}),h(a),f(t,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div class="w-72">
<Field label="Postleitzahl" for="plz" hint="Fünfstellig, ohne Leerzeichen.">
	<Input id="plz" inputmode="numeric" placeholder="12345" />
</Field>
</div>
 </undefined>`}}});var l=y(s,2);g(l,{name:"Ungültig",children:(t,o)=>{var a=p(),n=_(a);$(n,{label:"Wohnfläche (m²)",for:"flaeche",required:!0,error:"Pflichtfeld.",children:(d,k)=>{b(d,{id:"flaeche",invalid:!0,placeholder:"0"})},$$slots:{default:!0}}),h(a),f(t,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div class="w-72">
<Field label="Wohnfläche (m²)" for="flaeche" required error="Pflichtfeld.">
	<Input id="flaeche" invalid placeholder="0" />
</Field>
</div>
 </undefined>`}}});var v=y(l,2);g(v,{name:"Deaktiviert",children:(t,o)=>{var a=p(),n=_(a);$(n,{label:"Kundennummer",for:"kdnr",children:(d,k)=>{b(d,{id:"kdnr",value:"AW-100234",disabled:!0})},$$slots:{default:!0}}),h(a),f(t,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
   <div class="w-72">
<Field label="Kundennummer" for="kdnr">
	<Input id="kdnr" value="AW-100234" disabled />
</Field>
</div>
 </undefined>`}}}),f(e,u),M()}const w=q(B,O),Y=["Standard","MitHinweis","Ungültig","Deaktiviert"],Z={...w.Standard,tags:["svelte-csf-v5"]},ee={...w.MitHinweis,tags:["svelte-csf-v5"]},ae={...w.Ungültig,tags:["svelte-csf-v5"]},re={...w.Deaktiviert,tags:["svelte-csf-v5"]};export{re as Deaktiviert,ee as MitHinweis,Z as Standard,ae as Ungültig,Y as __namedExportsOrder,O as default};
