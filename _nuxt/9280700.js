(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{470:function(t,e,r){"use strict";r(471)},471:function(t,e,r){"use strict";var n=r(2),c=r(8),l=r(4),o=r(20),f=r(7),d=r(45),w=r(166),m=r(12),_=r(57),h=r(165),x=r(256),y=r(6),v=r(21),k=y("replace"),C=TypeError,A=l("".indexOf),S=l("".replace),j=l("".slice),P=Math.max;n({target:"String",proto:!0},{replaceAll:function(t,e){var r,n,l,y,I,O,D,J,M,T=o(this),E=0,F=0,H="";if(!d(t)){if((r=w(t))&&(n=m(o(h(t))),!~A(n,"g")))throw new C("`.replaceAll` does not allow non-global regexes");if(l=_(t,k))return c(l,t,T,e);if(v&&r)return S(m(T),t,e)}for(y=m(T),I=m(t),(O=f(e))||(e=m(e)),D=I.length,J=P(1,D),E=A(y,I);-1!==E;)M=O?m(e(I,E,y)):x(I,y,E,[],void 0,e),H+=j(y,F,E)+M,F=E+D,E=E+J>y.length?-1:A(y,I,E+J);return F<y.length&&(H+=j(y,F)),H}})},476:function(t,e,r){"use strict";r.r(e);r(28),r(52),r(62),r(83),r(26),r(98),r(64),r(470);var n={props:{step:{type:Object,required:!0}},computed:{stepIcon:function(){return!!this.step.icon&&"/icon-".concat(this.step.icon,".svg")}},methods:{parseDescription:function(t){var e="text-nsw-brand-primary-blue underline";if(t.includes("{{procurement_professionals_capability_set}}")){return t.replaceAll("{{procurement_professionals_capability_set}}",'<a href="'.concat("https://www.psc.nsw.gov.au/workforce-management/capability-framework/occupation-specific-capability-sets/procurement-capability-set",'" target="_blank" class="').concat(e,'" style="text-underline-offset: 2px;">').concat("Procurement Professionals Capability Set","</a>"))}if(t.includes("{{nsw_public_sector_capability_framework}}")){return t.replaceAll("{{nsw_public_sector_capability_framework}}",'<a href="'.concat("https://www.psc.nsw.gov.au/workforce-management/capability-framework/the-capability-framework",'" target="_blank" class="').concat(e,'" style="text-underline-offset: 2px;">').concat("NSW Public Sector Capability Framework","</a>"))}return t}}},c=r(16),component=Object(c.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"flex"},[e("div",{staticClass:"md:w-2/3 lg:w-1/2"},[e("div",{staticClass:"mb-3 md:mb-8"},[e("h2",{staticClass:"btn-blue font-bold text-nsw-brand-primary-blue mb-3"},[t._v("\n        "+t._s(t.step.schema.section)+"\n      ")]),t._v(" "),e("h1",{staticClass:"text-3xl md:text-[40px] font-bold leading-tight"},[t._v("\n        "+t._s(t.step.title)+"\n      ")])]),t._v(" "),e("p",{staticClass:"text-lg md:text-xl text-nsw-brand-grey-primary",domProps:{innerHTML:t._s(t.parseDescription(t.step.schema.description))}})]),t._v(" "),t.stepIcon?e("div",{staticClass:"hidden md:flex md:w-2/3 lg:w-1/2 justify-end"},[e("div",{staticClass:"bg-nsw-grey-100 w-full rounded-t-full rounded-l-full flex items-center justify-center",staticStyle:{"aspect-ratio":"1/1","max-width":"288px"}},[e("img",{attrs:{src:t.stepIcon,alt:"Arrow icon"}})])]):t._e()])}),[],!1,null,null,null);e.default=component.exports}}]);