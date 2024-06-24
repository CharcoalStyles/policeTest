(window.webpackJsonp=window.webpackJsonp||[]).push([[41,22,45,56],{459:function(e,t,l){"use strict";l.r(t);var r=l(464),n={components:{Popper:l.n(r).a},props:{size:{type:String,default:"md"},colour:{type:String,default:"grey"},tooltip:{type:String,default:""},rounded:{type:String,default:"full"}},computed:{tooltipOptions:function(){return{placement:"bottom",modifiers:{offset:{offset:"0,5px"}}}},baseSize:function(){return"md"===this.size?"text-base":"text-sm"},iconSize:function(){return"md"===this.size?"h-4":"h-3"},badgeCursor:function(){return this.tooltip?"hover:cursor-pointer":"hover:cursor-default"},badgeBorder:function(){return"blue-outline"===this.colour?"border border-nsw-brand-primary-blue":""},badgeRounded:function(){switch(this.rounded){case"full":return"rounded-full";case"lg":return"rounded-lg";case"md":return"rounded-md";case"sm":return"rounded-sm";default:return""}},textColor:function(){return"blue-outline"===this.colour?"text-nsw-brand-primary-blue":"text-nsw-grey-800"},badgeColour:function(){switch(this.colour){case"blue-outline":return"bg-white";case"blue":return"bg-role-pill-blue";case"green":return"bg-role-pill-green";case"orange":return"bg-orange-200";case"grey":return"bg-slate-200";default:return"bg-".concat(this.colour)}}}},o=l(11),component=Object(o.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-shrink-0"},[t("popper",{attrs:{trigger:"hover",options:e.tooltipOptions,disabled:!e.tooltip}},[t("div",{staticClass:"popper"},[e._v("\n      "+e._s(e.tooltip)+"\n    ")]),e._v(" "),t("div",{staticClass:"px-3 py-0.5 inline-flex items-center whitespace-no-wrap focus:outline-none",class:[e.baseSize,e.badgeColour,e.badgeCursor,e.badgeBorder,e.textColor,e.badgeRounded],attrs:{slot:"reference"},slot:"reference"},[e._t("default"),e._v(" "),e.tooltip?t("img",{staticClass:"ml-2",class:e.iconSize,attrs:{src:"/icons/help.svg",alt:"Help icon"}}):e._e()],2)])],1)}),[],!1,null,null,null);t.default=component.exports},462:function(e,t,l){"use strict";l.r(t);l(125),l(82),l(34),l(162),l(14),l(30),l(54),l(99),l(163),l(252);var r={components:{InformationBadge:l(459).default},props:{skillCode:{type:String,required:!0},level:{type:[Number,String],required:!0},isSkill:{type:Boolean,default:!0}},computed:{pillLabel:function(){var e=this;if(this.isSkill){var t=this.$store.state.skills.find((function(t){return t.code===e.skillCode})).levels.find((function(t){return t.level.toString()===e.level.toString()})).name.trim();if(t.includes(" - "))return t.split(" - ")[1];var l=t.split(/[\u2010-\u2015\u2212\uFE58-\uFE5F\uFF0D\uFF3F]/);return l[l.length-1]}return this.$store.state.capabilities.find((function(t){return t.subcode===e.skillCode})).levels[this.level-1].name.split(" - ")[1]}}},n=l(11),component=Object(n.a)(r,(function(){var e=this,t=e._self._c;return t("information-badge",{staticClass:"break-words",attrs:{size:"xs"}},[t("p",{staticClass:"break-words"},[e._v(e._s(e.pillLabel))])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InformationBadge:l(459).default})},465:function(e,t,l){"use strict";l.r(t);l(34),l(162);var r={props:{name:{type:[String,Number],required:!0},selected:{type:[String,Number],required:!0}},computed:{isSelected:function(){return this.selected===this.name?"border-nsw-brand-primary-blue":"border-white"}}},n=l(11),component=Object(n.a)(r,(function(){var e=this;return(0,e._self._c)("button",{staticClass:"h-8 px-4 pb-1 border-b-4 cursor-pointer hover:border-nsw-brand-primary-blue focus:outline-none whitespace-no-wrap",class:e.isSelected},[e._t("default")],2)}),[],!1,null,null,null);t.default=component.exports},475:function(e,t,l){"use strict";l.r(t);l(27),l(52),l(34),l(125),l(82),l(14),l(30),l(99),l(163);var r=l(164),n=l(465),o=l(251),c=l(462),d={components:{PanelTab:n.default,BaseModal:o.default,SkillCapInfoBadge:c.default},props:{selectedCapability:{type:[Object,Boolean],required:!0},currentRole:{type:[Object,Boolean],required:!0},targetRole:{type:[Object,Boolean],required:!0},show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0},journey:{type:[Object,Boolean],required:!0},noRole:{type:Boolean,default:!1}},data:function(){return{skills:r,tabs:{level:!1}}},computed:{assessedCapabilities:function(){return this.$store.state.pathway.answers.capabilities},selectedLevel:function(){var e=this;return!1!==this.tabs.level&&this.selectedCapability.levels.find((function(t){return t.level===e.tabs.level}))},accessedLevel:function(){return this.selectedCapability.subcode in this.assessedCapabilities&&this.assessedCapabilities[this.selectedCapability.subcode].value},currentRoleLevel:function(){return this.$collect(this.currentRole.capabilities.focus).where("code",this.selectedCapability.subcode).first()},targetRoleLevel:function(){return!!this.targetRole&&this.$collect(this.targetRole.capabilities.focus).where("code",this.selectedCapability.subcode).first()}},watch:{selectedCapability:{immediate:!0,handler:function(e){var t,l;this.tabs.level=null!==(t=null===(l=e.levels)||void 0===l?void 0:l[0].level)&&void 0!==t&&t}}},mounted:function(){},methods:{getLabel:function(e){if(e.name.includes(" - "))return e.name.split(" - ")[1];var t=e.name.split(/[\u2010-\u2015\u2212\uFE58-\uFE5F\uFF0D\uFF3F]/);return t[t.length-1]}}},v=l(11),component=Object(v.a)(d,(function(){var e=this,t=e._self._c;return t("base-modal",{attrs:{show:e.show,"max-width":e.maxWidth,title:e.selectedCapability.subcategory,closeable:e.closeable},on:{close:function(t){return e.$emit("close")}}},[t("div",{staticClass:"leading-relaxed"},[t("div",[t("div",{staticClass:"mb-6"},[t("h4",{staticClass:"font-bold mb-4"},[e._v("Capability description")]),e._v(" "),t("p",[e._v(e._s(e.selectedCapability.description))])]),e._v(" "),e.noRole?e._e():t("div",{staticClass:"mb-12"},[t("h4",{staticClass:"text-lg font-bold mb-4"},[e._v("Capability level")]),e._v(" "),t("div",{staticClass:"flex flex-col md:flex-row"},[t("div",{staticClass:"mb-4 md:mb-0 md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("You assessed")]),e._v(" "),e.accessedLevel?t("skill-cap-info-badge",{attrs:{"is-skill":!1,"skill-code":e.selectedCapability.subcode,level:e.currentRoleLevel.level}}):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("\n              Not currently known\n            ")])],1),e._v(" "),t("div",{staticClass:"mb-4 md:mb-0 md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("Your current role")]),e._v(" "),e.currentRoleLevel?t("skill-cap-info-badge",{attrs:{"is-skill":!1,"skill-code":e.selectedCapability.subcode,level:e.currentRoleLevel.level}}):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("N/A")])],1),e._v(" "),t("div",{staticClass:"md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("Target role")]),e._v(" "),t("div",{staticClass:"flex space-x-3"},[e.targetRoleLevel?t("skill-cap-info-badge",{attrs:{"is-skill":!1,"skill-code":e.selectedCapability.subcode,level:e.targetRoleLevel.level}}):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("N/A")]),e._v(" "),e.journey?t("information-badge",{attrs:{size:"xs",colour:e.journey.colour,tooltip:e.journey.tooltip}},[e._v("\n                "+e._s(e.journey.text)+"\n              ")]):e._e()],1)])])]),e._v(" "),!1!==e.selectedLevel?t("div",[t("div",{staticClass:"border-b-2 border-nsw-grey-200 flex flex-wrap"},e._l(e.selectedCapability.levels,(function(l){return t("panel-tab",{key:l.level,attrs:{name:l.level,selected:e.tabs.level},nativeOn:{click:function(t){e.tabs.level=l.level}}},[e._v("\n            "+e._s(e.getLabel(l))+"\n          ")])})),1),e._v(" "),t("div",{staticClass:"pt-6"},[t("h5",{staticClass:"font-bold mb-4"},[e._v("\n            "+e._s(e.selectedLevel.name)+"\n          ")]),e._v(" "),t("p",{staticClass:"mb-4"},[e._v("\n            "+e._s(e.selectedLevel.easyDescription)+"\n          ")]),e._v(" "),t("ul",{staticClass:"list-disc pl-4 w-11/12"},e._l(e.selectedLevel.attributes,(function(l,r){return t("li",{key:r,staticClass:"mb-2"},[e._v("\n              "+e._s(l)+"\n            ")])})),0)])]):e._e()])])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{SkillCapInfoBadge:l(462).default,InformationBadge:l(459).default,BaseModal:l(251).default})}}]);