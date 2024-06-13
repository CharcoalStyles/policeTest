(window.webpackJsonp=window.webpackJsonp||[]).push([[27,47,48],{467:function(t,e,n){"use strict";n(468)},468:function(t,e,n){"use strict";var l=n(2),r=n(8),o=n(4),c=n(20),d=n(7),f=n(46),m=n(167),_=n(12),v=n(55),w=n(166),h=n(256),x=n(6),y=n(21),C=x("replace"),k=TypeError,S=o("".indexOf),P=o("".replace),j=o("".slice),W=Math.max;l({target:"String",proto:!0},{replaceAll:function(t,e){var n,l,o,x,O,A,I,N,D,F=c(this),H=0,J=0,M="";if(!f(t)){if((n=m(t))&&(l=_(c(w(t))),!~S(l,"g")))throw new k("`.replaceAll` does not allow non-global regexes");if(o=v(t,C))return r(o,t,F,e);if(y&&n)return P(_(F),t,e)}for(x=_(F),O=_(t),(A=d(e))||(e=_(e)),I=O.length,N=W(1,I),H=S(x,O);-1!==H;)D=A?_(e(O,H,x)):h(O,x,H,[],void 0,e),M+=j(x,J,H)+D,J=H+I,H=H+N>x.length?-1:S(x,O,H+N);return J<x.length&&(M+=j(x,J)),M}})},472:function(t,e,n){"use strict";n.r(e);var l={},r=n(16),component=Object(r.a)(l,(function(){this._self._c;return this._m(0)}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"lg:flex"},[e("div",{staticClass:"lg:w-7/12"},[e("div",{staticClass:"mb-8 md:mb-10"},[e("h2",{staticClass:"btn-blue font-bold text-nsw-brand-primary-blue mb-3"},[t._v("\n        Career Planner\n      ")]),t._v(" "),e("h1",{staticClass:"text-3xl md:text-[42px] font-bold leading-tight mb-4"},[t._v("\n        Get a personalised career recommendation and plan\n      ")])]),t._v(" "),e("div",{staticClass:"mb-6"},[e("h2",{staticClass:"text-2xl font-bold mb-3"},[t._v("How it works")]),t._v(" "),e("ul",{staticClass:"ml-5 list-outside list-disc leading-loose lg:w-5/6"},[e("li",[t._v("We'll ask a few questions")]),t._v(" "),e("li",[t._v("We'll show you what roles might best suit you ")]),t._v(" "),e("li",[t._v("We'll help you understand what you need to improve and develop")]),t._v(" "),e("li",[t._v("We'll give you the information to guide your next career conversation")])])]),t._v(" "),e("div",{staticClass:"mb-6"},[e("h3",{staticClass:"text-2xl font-bold mb-3"},[t._v("Who is this best suited for?")]),t._v(" "),e("ul",{staticClass:"ml-5 list-outside list-disc leading-loose lg:w-5/6"},[e("li",[t._v("People looking for the next step in their career")]),t._v(" "),e("li",[t._v("People looking for a change within NSWPF, but don't know where to start")])])])])])}],!1,null,null,null);e.default=component.exports},473:function(t,e,n){"use strict";n.r(e);n(27),n(52),n(60),n(82),n(31),n(98),n(64),n(467);var l={props:{step:{type:Object,required:!0}},computed:{stepIcon:function(){return!!this.step.icon&&"/icon-".concat(this.step.icon,".svg")}},methods:{parseDescription:function(t){var e="text-nsw-brand-primary-blue underline";if(t.includes("{{procurement_professionals_capability_set}}")){return t.replaceAll("{{procurement_professionals_capability_set}}",'<a href="'.concat("https://www.psc.nsw.gov.au/workforce-management/capability-framework/occupation-specific-capability-sets/procurement-capability-set",'" target="_blank" class="').concat(e,'" style="text-underline-offset: 2px;">').concat("Procurement Professionals Capability Set","</a>"))}if(t.includes("{{nsw_public_sector_capability_framework}}")){return t.replaceAll("{{nsw_public_sector_capability_framework}}",'<a href="'.concat("https://www.psc.nsw.gov.au/workforce-management/capability-framework/the-capability-framework",'" target="_blank" class="').concat(e,'" style="text-underline-offset: 2px;">').concat("NSW Public Sector Capability Framework","</a>"))}return t}}},r=n(16),component=Object(r.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"flex"},[e("div",{staticClass:"md:w-2/3 lg:w-1/2"},[e("div",{staticClass:"mb-3 md:mb-8"},[e("h2",{staticClass:"btn-blue font-bold text-nsw-brand-primary-blue mb-3"},[t._v("\n        "+t._s(t.step.schema.section)+"\n      ")]),t._v(" "),e("h1",{staticClass:"text-3xl md:text-[40px] font-bold leading-tight"},[t._v("\n        "+t._s(t.step.title)+"\n      ")])]),t._v(" "),e("p",{staticClass:"text-lg md:text-xl text-nsw-brand-grey-primary",domProps:{innerHTML:t._s(t.parseDescription(t.step.schema.description))}})]),t._v(" "),t.stepIcon?e("div",{staticClass:"hidden md:flex md:w-2/3 lg:w-1/2 justify-end"},[e("div",{staticClass:"bg-nsw-grey-100 w-full rounded-t-full rounded-l-full flex items-center justify-center",staticStyle:{"aspect-ratio":"1/1","max-width":"288px"}},[e("img",{attrs:{src:t.stepIcon,alt:"Arrow icon"}})])]):t._e()])}),[],!1,null,null,null);e.default=component.exports},475:function(t,e,n){"use strict";n.r(e);var l=n(472),r=n(473),o=n(487),c={components:{StepIntroduction:l.default,StepInterstitial:r.default,StepQuestion:o.default},props:{step:{type:Object,required:!0}},computed:{componentName:function(){return"step-".concat(this.step.type)}},methods:{updated:function(data){this.$emit("input",data)}}},d=n(16),component=Object(d.a)(c,(function(){var t=this;return(0,t._self._c)(t.componentName,{tag:"component",attrs:{step:t.step},on:{updated:t.updated}})}),[],!1,null,null,null);e.default=component.exports}}]);