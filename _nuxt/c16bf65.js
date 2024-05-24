(window.webpackJsonp=window.webpackJsonp||[]).push([[34,20],{461:function(e,t,r){"use strict";r.r(t);var o=r(464),n={components:{Popper:r.n(o).a},props:{size:{type:String,default:"md"},colour:{type:String,default:"grey"},tooltip:{type:String,default:""}},computed:{tooltipOptions:function(){return{placement:"bottom",modifiers:{offset:{offset:"0,5px"}}}},baseSize:function(){return"md"===this.size?"text-base":"text-sm"},iconSize:function(){return"md"===this.size?"h-4":"h-3"},badgeCursor:function(){return this.tooltip?"hover:cursor-pointer":"hover:cursor-default"},badgeBorder:function(){return"blue-outline"===this.colour?"border border-nsw-brand-primary-blue":""},textColor:function(){return"blue-outline"===this.colour?"text-nsw-brand-primary-blue":"text-nsw-grey-800"},badgeColour:function(){switch(this.colour){case"blue-outline":return"bg-white";case"blue":return"bg-role-pill-blue";case"green":return"bg-role-pill-green";case"orange":return"bg-orange-200";case"gray":return"bg-nsw-grey-100";default:return"bg-gray-200"}}}},l=r(16),component=Object(l.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-shrink-0"},[t("popper",{attrs:{trigger:"hover",options:e.tooltipOptions,disabled:!e.tooltip}},[t("div",{staticClass:"popper"},[e._v("\n      "+e._s(e.tooltip)+"\n    ")]),e._v(" "),t("div",{staticClass:"px-3 py-0.5 inline-flex items-center rounded-full whitespace-no-wrap focus:outline-none",class:[e.baseSize,e.badgeColour,e.badgeCursor,e.badgeBorder,e.textColor],attrs:{slot:"reference"},slot:"reference"},[e._t("default"),e._v(" "),e.tooltip?t("img",{staticClass:"ml-2",class:e.iconSize,attrs:{src:"/icons/help.svg",alt:"Help icon"}}):e._e()],2)])],1)}),[],!1,null,null,null);t.default=component.exports},513:function(e,t,r){"use strict";r.r(t);r(35),r(28),r(30),r(43),r(44),r(31),r(13),r(25);var o=r(17);r(63);function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var c={components:{InformationBadge:r(461).default},props:{targetRole:{type:[Object,Boolean],required:!0},currentRole:{type:[Object,Boolean],required:!0},item:{type:[Object,Boolean],required:!0},type:{type:String,required:!0},roleType:{type:String,required:!0},instructions:{type:String,default:"targetRole"}},computed:{assessedSkills:function(){return l(l({},this.$store.state.pathway.answers.skills),this.$store.state.pathway.answers.capabilities)},emptyMessage:function(){return this.instructions?this.targetRole?"Not a focus ".concat(this.type,", but may be complimentary"):"Not currently known":""},valueName:function(){return"skill"===this.type?"skills":"capabilities"},journeyType:function(){if(!this.item)return!1;if("selfAssessed"===this.instructions&&this.targetRole){var e,t=this.$collect(this.currentRole[this.valueName].focus).where("code",this.item.code).first(),r=this.$collect(this.targetRole[this.valueName].focus).where("code",this.item.code).first(),o=null===(e=this.assessedSkills)||void 0===e||null===(e=e[this.item.code])||void 0===e?void 0:e.value;if("current"===this.roleType&&o<t.level)return{text:"Upskill",colour:"orange",tooltip:"You assessed yourself at Level ".concat(o," in your current role.")};if("target"===this.roleType&&o<r.level)return{text:"Upskill",colour:"orange",tooltip:"You assessed yourself at Level ".concat(o," in your current role.")};if("target"===this.roleType&&!t&&r)return{text:"New skill",colour:"green",tooltip:"A new skill that is required for this role."}}return!1}},methods:{capitaliseFirstLetter:function(e){return e.charAt(0).toUpperCase()+e.slice(1)}}},f=r(16),component=Object(f.a)(c,(function(){var e=this,t=e._self._c;return t("td",{staticClass:"comparison-cell lg:w-1/2 px-4 lg:px-8 py-4",class:{"border-b border-b-gray-200":e.item||e.emptyMessage}},[e.item?t("div",{staticClass:"flex items-start justify-between"},[t("button",{staticClass:"underline text-left",on:{click:function(t){return e.$emit("skillClicked",{skill:e.item.code,journey:e.journeyType})}}},[t("span",{},[e._v(e._s(e.item.name))])]),e._v(" "),t("div",{staticClass:"pl-4 flex-shrink-0 flex space-x-3 whitespace-no-wrap"},[[e.journeyType?t("information-badge",{attrs:{size:"xs",colour:e.journeyType.colour,tooltip:e.journeyType.tooltip}},[e._v("\n          "+e._s(e.journeyType.text)+"\n        ")]):e._e()],e._v(" "),t("information-badge",{attrs:{size:"xs"}},[e._v("\n        Level "+e._s(e.item.level)+"\n      ")])],2)]):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("\n    "+e._s(e.emptyMessage)+"\n  ")])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InformationBadge:r(461).default})}}]);