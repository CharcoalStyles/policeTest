(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{461:function(t,e,r){"use strict";var n=r(2),o=r(4),l=r(45),c=r(32),f=r(56),d=r(251),v=r(12),w=r(3),m=r(252),h=r(163),y=r(463),j=r(464),x=r(101),C=r(465),_=[],F=o(_.sort),k=o(_.push),A=w((function(){_.sort(void 0)})),P=w((function(){_.sort(null)})),$=h("sort"),D=!w((function(){if(x)return x<70;if(!(y&&y>3)){if(j)return!0;if(C)return C<603;var code,t,e,r,n="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(r=0;r<47;r++)_.push({k:t+r,v:e})}for(_.sort((function(a,b){return b.v-a.v})),r=0;r<_.length;r++)t=_[r].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:A||!P||!$||!D},{sort:function(t){void 0!==t&&l(t);var e=c(this);if(D)return void 0===t?F(e):F(e,t);var r,n,o=[],w=f(e);for(n=0;n<w;n++)n in e&&k(o,e[n]);for(m(o,function(t){return function(e,r){return void 0===r?-1:void 0===e?1:void 0!==t?+t(e,r)||0:v(e)>v(r)?1:-1}}(t)),r=f(o),n=0;n<r;)e[n]=o[n++];for(;n<w;)d(e,n++);return e}})},463:function(t,e,r){"use strict";var n=r(83).match(/firefox\/(\d+)/i);t.exports=!!n&&+n[1]},464:function(t,e,r){"use strict";var n=r(83);t.exports=/MSIE|Trident/.test(n)},465:function(t,e,r){"use strict";var n=r(83).match(/AppleWebKit\/(\d+)\./);t.exports=!!n&&+n[1]},523:function(t,e,r){"use strict";r.r(e);r(62),r(63),r(29),r(125),r(82),r(53),r(461),r(13),r(98);var n={props:{step:{type:Object,required:!0}},computed:{jobFamilies:function(){var t=this;return this.$store.state.roles.reduce((function(e,r){if("Development program"===r.jobFunction)return e;if(t.$store.state.pathway.answers.hasOwnProperty("sworn")){var n=t.$store.state.pathway.answers.sworn;if("sworn"===n.value&&"Policing"!==r.jobFamily)return e;if("unsworn"===n.value&&"Policing"===r.jobFamily)return e}e.find((function(t){return t.jobFamily===r.jobFamily}))||e.push({jobFamily:r.jobFamily,jobFunctions:[]});var o=e.find((function(t){return t.jobFamily===r.jobFamily}));return o.jobFunctions.includes(r.jobFunction)||o.jobFunctions.push(r.jobFunction),e}),[]).sort((function(a,b){return"Policing"===a.jobFamily?-1:"Policing"===b.jobFamily?1:a.jobFamily.localeCompare(b.jobFamily)})).map((function(t){return{jobFamily:t.jobFamily,jobFunctions:t.jobFunctions.sort()}}))},answer:{get:function(){var t;return null!==(t=this.$store.state.pathway.answers[this.step.id])&&void 0!==t&&t.value?this.$store.state.pathway.answers[this.step.id].value:this.step.schema.field.value?this.step.schema.field.value:[]},set:function(t){this.$store.dispatch("saveQuestionAnswer",{id:this.step.id,value:t})}}},methods:{isDisabled:function(t){return!this.answer.includes(t)&&3===this.answer.length},remove:function(t){this.answer=this.answer.filter((function(e){return e!==t}))}}},o=r(16),component=Object(o.a)(n,(function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"nsw-forms -mt-4"},[e("div",{staticClass:"nsw-form-group"},[e("fieldset",{staticClass:"nsw-form-fieldset"},[e("legend",{staticClass:"sr-only"},[t._v("\n          "+t._s(t.step.title)+"\n        ")]),t._v(" "),e("div",{staticClass:"nsw-form-radio"},[e("div",{staticClass:"flex flex-col"},[e("p",{staticClass:"font-bold"},[t._v("Your selections:")]),t._v(" "),e("div",{staticClass:"flex flex-row items-center p-4 justify-center border border-nsw-brand-primary-blue rounded-xl text-center h-min-28"},[0===t.answer.length?e("p",{staticClass:"text-nsw-grey-700"},[t._v("\n                Select a maximum of three interest areas\n              ")]):e("div",{staticClass:"w-full flex flex-col md:flex-row items-center gap-2 justify-around md:justify-start"},t._l(t.answer,(function(r){return e("div",{key:r,staticClass:"flex flex-row justify-between items-center border border-nsw-brand-primary-blue rounded-md"},[e("div",{staticClass:"px-2 py-1"},[e("p",{staticClass:"text-sm"},[t._v(t._s(r))])]),t._v(" "),e("div",{staticClass:"bg-nsw-brand-primary-blue p-2",on:{click:function(e){return t.remove(r)}}},[e("img",{staticClass:"h-5",attrs:{src:"/close-white.svg"}})])])})),0)]),t._v(" "),e("div",{staticClass:"flex flex-col flex-wrap w-full mt-12"},t._l(t.jobFamilies,(function(r){return e("div",{key:r.jobFamily,staticClass:"w-full"},[e("div",{staticClass:"flex flex-row w-full justify-between"},[e("div",{staticClass:"w-1/3"},[e("p",{staticClass:"font-bold"},[t._v(t._s(r.jobFamily))])]),t._v(" "),e("div",{staticClass:"w-2/3 flex flex-row flex-wrap items-center gap-4"},t._l(r.jobFunctions,(function(r){return e("div",{key:r,staticClass:"w-full md:w-1/3 flex-grow"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.answer,expression:"answer"}],staticClass:"nsw-form-checkbox__input",attrs:{id:r,name:r,disabled:t.isDisabled(r),type:"checkbox"},domProps:{value:r,checked:Array.isArray(t.answer)?t._i(t.answer,r)>-1:t.answer},on:{change:function(e){var n=t.answer,o=e.target,l=!!o.checked;if(Array.isArray(n)){var c=r,f=t._i(n,c);o.checked?f<0&&(t.answer=n.concat([c])):f>-1&&(t.answer=n.slice(0,f).concat(n.slice(f+1)))}else t.answer=l}}}),t._v(" "),e("label",{staticClass:"nsw-form-checkbox__label",attrs:{for:r}},[t._v(t._s(r))])])})),0)]),t._v(" "),e("hr",{staticClass:"my-4"})])})),0)]),t._v(" "),e("div")])])])])])}),[],!1,null,null,null);e.default=component.exports}}]);