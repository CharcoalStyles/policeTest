(window.webpackJsonp=window.webpackJsonp||[]).push([[3,7,15,20,34,37,38,41],{461:function(e,t,l){"use strict";l.r(t);var o=l(464),r={components:{Popper:l.n(o).a},props:{size:{type:String,default:"md"},colour:{type:String,default:"grey"},tooltip:{type:String,default:""}},computed:{tooltipOptions:function(){return{placement:"bottom",modifiers:{offset:{offset:"0,5px"}}}},baseSize:function(){return"md"===this.size?"text-base":"text-sm"},iconSize:function(){return"md"===this.size?"h-4":"h-3"},badgeCursor:function(){return this.tooltip?"hover:cursor-pointer":"hover:cursor-default"},badgeBorder:function(){return"blue-outline"===this.colour?"border border-nsw-brand-primary-blue":""},textColor:function(){return"blue-outline"===this.colour?"text-nsw-brand-primary-blue":"text-nsw-grey-800"},badgeColour:function(){switch(this.colour){case"blue-outline":return"bg-white";case"blue":return"bg-role-pill-blue";case"green":return"bg-role-pill-green";case"orange":return"bg-orange-200";case"gray":return"bg-nsw-grey-100";default:return"bg-gray-200"}}}},n=l(16),component=Object(n.a)(r,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-shrink-0"},[t("popper",{attrs:{trigger:"hover",options:e.tooltipOptions,disabled:!e.tooltip}},[t("div",{staticClass:"popper"},[e._v("\n      "+e._s(e.tooltip)+"\n    ")]),e._v(" "),t("div",{staticClass:"px-3 py-0.5 inline-flex items-center rounded-full whitespace-no-wrap focus:outline-none",class:[e.baseSize,e.badgeColour,e.badgeCursor,e.badgeBorder,e.textColor],attrs:{slot:"reference"},slot:"reference"},[e._t("default"),e._v(" "),e.tooltip?t("img",{staticClass:"ml-2",class:e.iconSize,attrs:{src:"/icons/help.svg",alt:"Help icon"}}):e._e()],2)])],1)}),[],!1,null,null,null);t.default=component.exports},462:function(e,t,l){"use strict";l.r(t);l(99);var o={props:{show:{type:Boolean,default:!1},title:{type:String,default:""},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0},scrollable:{type:Boolean,default:!0}},computed:{maxWidthClass:function(){return{sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl","3xl":"sm:max-w-3xl"}[this.maxWidth]},scrollableContainerClass:function(){return this.scrollable?"h-modal-accessible lg:h-modal-accessible-lg":"max-h-modal-accessible lg:max-h-modal-accessible-lg"},scrollableBodyClass:function(){return this.scrollable?"overflow-y-scroll":"overflow-y-scroll lg:overflow-auto"}},watch:{show:{immediate:!0,handler:function(e){e?(document.body.style.overflow="hidden",this.focusModal()):document.body.style.overflow=null}}},created:function(){var e=this,t=function(t){"Escape"===t.key&&e.show&&e.close()};document.addEventListener("keydown",t),this.$once("hook:destroyed",(function(){document.removeEventListener("keydown",t)}))},mounted:function(){this.focusModal()},methods:{focusModal:function(){setTimeout((function(){var e=document.getElementById("dialog");e&&e.focus()}),100)},close:function(){this.closeable&&this.$emit("close")}}},r=l(16),component=Object(r.a)(o,(function(){var e=this,t=e._self._c;return t("portal",{attrs:{to:"modal"}},[t("transition",{attrs:{"leave-active-class":"duration-200"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"fixed flex items-center justify-center inset-0 overflow-y-auto z-20"},[t("transition",{attrs:{"enter-active-class":"ease-out duration-300","enter-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"ease-in duration-200","leave-class":"opacity-100","leave-to-class":"opacity-0"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"fixed inset-0 transform transition-all",on:{click:e.close}},[t("div",{staticClass:"absolute inset-0 bg-nsw-brand-primary-blue opacity-50"})])]),e._v(" "),t("transition",{attrs:{"enter-active-class":"ease-out duration-300","enter-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to-class":"opacity-100 translate-y-0 sm:scale-100","leave-active-class":"ease-in duration-200","leave-class":"opacity-100 translate-y-0 sm:scale-100","leave-to-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"}},[e.show?t("div",{staticClass:"bg-white shadow-xl transform transition-all w-modal-accessible flex flex-col focus:outline-none",class:[e.maxWidthClass,e.scrollableContainerClass],attrs:{id:"dialog",tabindex:"-1","aria-labelledby":"modal-title","aria-modal":"true"}},[t("div",{staticClass:"sticky w-full top-0 left-0 font-bold text-lg px-4 lg:px-8 py-3 lg:py-6 flex items-center justify-between border-b border-nsw-grey-200 bg-white z-10"},[t("h1",{staticClass:"w-10/12",attrs:{id:"modal-title"}},[e._v("\n              "+e._s(e.title)+"\n            ")]),e._v(" "),e.closeable?t("button",{staticClass:"absolute top-0 right-0 p-4 lg:p-8",attrs:{type:"button",title:"Close this window"},on:{click:e.close}},[t("img",{attrs:{src:"/icons/close.svg",alt:"Close"}})]):e._e()]),e._v(" "),t("div",{staticClass:"px-4 lg:px-8 py-3 lg:py-6 flex-grow",class:e.scrollableBodyClass},[e._t("default")],2),e._v(" "),e.$slots.footer?t("div",{staticClass:"flex-shrink-0 px-4 lg:px-8 py-3 lg:py-6 bg-gray-100 flex justify-between"},[e._t("footer")],2):e._e()]):e._e()])],1)])],1)}),[],!1,null,null,null);t.default=component.exports},472:function(e,t,l){"use strict";l.r(t);l(35),l(163);var o={props:{name:{type:[String,Number],required:!0},selected:{type:[String,Number],required:!0}},computed:{isSelected:function(){return this.selected===this.name?"border-nsw-brand-primary-blue":"border-white"}}},r=l(16),component=Object(r.a)(o,(function(){var e=this;return(0,e._self._c)("button",{staticClass:"h-8 px-4 pb-1 border-b-4 cursor-pointer hover:border-nsw-brand-primary-blue focus:outline-none whitespace-no-wrap",class:e.isSelected},[e._t("default")],2)}),[],!1,null,null,null);t.default=component.exports},478:function(e,t,l){"use strict";l.r(t);var o=l(464),r={components:{Popper:l.n(o).a},props:{tooltip:{type:String,default:""}},computed:{tooltipOptions:function(){return{placement:"bottom",modifiers:{offset:{offset:"0,5px"}}}}}},n=l(16),component=Object(n.a)(r,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"inline"},[t("popper",{attrs:{trigger:"hover",options:e.tooltipOptions,disabled:!e.tooltip}},[t("div",{staticClass:"popper"},[e._v("\n      "+e._s(e.tooltip)+"\n    ")]),e._v(" "),t("div",{attrs:{slot:"reference"},slot:"reference"},[t("img",{staticClass:"ml-2 shrink-0",attrs:{src:"/icons/help.svg",alt:"Help icon"}})])])],1)}),[],!1,null,null,null);t.default=component.exports},511:function(e,t,l){"use strict";l.r(t);l(28),l(52),l(35),l(126),l(13);var o=l(164),r=l(472),n=l(462),c={components:{PanelTab:r.default,BaseModal:n.default},props:{selectedSkill:{type:[Object,Boolean],required:!0},currentRole:{type:Object,required:!0},targetRole:{type:[Object,Boolean],required:!0},show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0},journey:{type:[Object,Boolean],required:!0}},data:function(){return{skills:o,tabs:{level:!1}}},computed:{assessedSkills:function(){return this.$store.state.pathway.answers.skills},assessedCapabilities:function(){return this.$store.state.pathway.answers.capabilities},selectedLevel:function(){var e=this;return!1!==this.tabs.level&&this.selectedSkill.levels.find((function(t){return t.level===e.tabs.level}))},accessedLevel:function(){return this.selectedSkill.code in this.assessedSkills&&this.assessedSkills[this.selectedSkill.code].value},currentRoleLevel:function(){return this.$collect(this.currentRole.skills.focus).where("code",this.selectedSkill.code).first()},targetRoleLevel:function(){return!!this.targetRole&&this.$collect(this.targetRole.skills.focus).where("code",this.selectedSkill.code).first()}},watch:{selectedSkill:{immediate:!0,handler:function(e){var t,l;this.tabs.level=null!==(t=null===(l=e.levels)||void 0===l?void 0:l[0].level)&&void 0!==t&&t}}},mounted:function(){window.dataLayer.push({event:"skill_modal_opened",category:"pathway_results",label:this.selectedSkill.code})}},d=l(16),component=Object(d.a)(c,(function(){var e=this,t=e._self._c;return t("base-modal",{attrs:{show:e.show,"max-width":e.maxWidth,title:e.selectedSkill.category,closeable:e.closeable},on:{close:function(t){return e.$emit("close")}}},[t("div",{staticClass:"leading-relaxed"},[t("div",[t("div",{staticClass:"mb-6"},[t("h4",{staticClass:"font-bold mb-4"},[e._v("Skill description")]),e._v(" "),t("p",[e._v(e._s(e.selectedSkill.description))])]),e._v(" "),t("div",{staticClass:"mb-12"},[t("h4",{staticClass:"text-lg font-bold mb-4"},[e._v("Skill level")]),e._v(" "),t("div",{staticClass:"flex flex-col md:flex-row"},[t("div",{staticClass:"mb-4 md:mb-0 md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("You assessed")]),e._v(" "),!1!==e.accessedLevel?t("information-badge",{attrs:{size:"xs"}},[e._v("\n              Level "+e._s(e.accessedLevel)+"\n            ")]):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("N/A")])],1),e._v(" "),t("div",{staticClass:"mb-4 md:mb-0 md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("Your current role")]),e._v(" "),e.currentRoleLevel?t("information-badge",{attrs:{size:"xs"}},[e._v("\n              Level "+e._s(e.currentRoleLevel.level)+"\n            ")]):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("N/A")])],1),e._v(" "),t("div",{staticClass:"md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("Target role")]),e._v(" "),t("div",{staticClass:"flex space-x-3"},[e.targetRoleLevel?t("information-badge",{attrs:{size:"xs"}},[e._v("\n                Level "+e._s(e.targetRoleLevel.level)+"\n              ")]):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("\n                Not currently known\n              ")]),e._v(" "),e.journey?t("information-badge",{attrs:{size:"xs",colour:e.journey.colour,tooltip:e.journey.tooltip}},[e._v("\n                "+e._s(e.journey.text)+"\n              ")]):e._e()],1)])])]),e._v(" "),!1!==e.selectedLevel?t("div",[t("div",{staticClass:"border-b-2 border-nsw-grey-200 flex overflow-x-scroll"},e._l(e.selectedSkill.levels,(function(l){return t("panel-tab",{key:l.level,attrs:{name:l.level,selected:e.tabs.level},nativeOn:{click:function(t){e.tabs.level=l.level}}},[e._v("\n            Level "+e._s(l.level)+"\n          ")])})),1),e._v(" "),t("div",{staticClass:"pt-6"},[t("h5",{staticClass:"font-bold mb-4"},[e._v("\n            "+e._s(e.selectedLevel.name)+"\n          ")]),e._v(" "),t("p",{staticClass:"mb-4"},[e._v("\n            "+e._s(e.selectedLevel.easyDescription)+"\n          ")]),e._v(" "),t("ul",{staticClass:"list-disc pl-4 w-11/12"},e._l(e.selectedLevel.attributes,(function(l,o){return t("li",{key:o,staticClass:"mb-2"},[e._v("\n              "+e._s(l)+"\n            ")])})),0)])]):e._e()])])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InformationBadge:l(461).default,BaseModal:l(462).default})},512:function(e,t,l){"use strict";l.r(t);l(28),l(52),l(35),l(126),l(13);var o=l(164),r=l(472),n=l(462),c={components:{PanelTab:r.default,BaseModal:n.default},props:{selectedCapability:{type:[Object,Boolean],required:!0},currentRole:{type:Object,required:!0},targetRole:{type:[Object,Boolean],required:!0},show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0},journey:{type:[Object,Boolean],required:!0}},data:function(){return{skills:o,tabs:{level:!1}}},computed:{assessedCapabilities:function(){return this.$store.state.pathway.answers.capabilities},selectedLevel:function(){var e=this;return!1!==this.tabs.level&&this.selectedCapability.levels.find((function(t){return t.level===e.tabs.level}))},accessedLevel:function(){return this.selectedCapability.subcode in this.assessedCapabilities&&this.assessedCapabilities[this.selectedCapability.subcode].value},currentRoleLevel:function(){return this.$collect(this.currentRole.capabilities.focus).where("code",this.selectedCapability.subcode).first()},targetRoleLevel:function(){return!!this.targetRole&&this.$collect(this.targetRole.capabilities.focus).where("code",this.selectedCapability.subcode).first()}},watch:{selectedCapability:{immediate:!0,handler:function(e){var t,l;this.tabs.level=null!==(t=null===(l=e.levels)||void 0===l?void 0:l[0].level)&&void 0!==t&&t}}},mounted:function(){window.dataLayer.push({event:"capability_modal_opened",category:"pathway_results",label:this.selectedCapability.subcode})}},d=l(16),component=Object(d.a)(c,(function(){var e=this,t=e._self._c;return t("base-modal",{attrs:{show:e.show,"max-width":e.maxWidth,title:e.selectedCapability.subcategory,closeable:e.closeable},on:{close:function(t){return e.$emit("close")}}},[t("div",{staticClass:"leading-relaxed"},[t("div",[t("div",{staticClass:"mb-6"},[t("h4",{staticClass:"font-bold mb-4"},[e._v("Skill description")]),e._v(" "),t("p",[e._v(e._s(e.selectedCapability.description))])]),e._v(" "),t("div",{staticClass:"mb-12"},[t("h4",{staticClass:"text-lg font-bold mb-4"},[e._v("Skill level")]),e._v(" "),t("div",{staticClass:"flex flex-col md:flex-row"},[t("div",{staticClass:"mb-4 md:mb-0 md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("You assessed")]),e._v(" "),e.accessedLevel?t("information-badge",{attrs:{size:"xs"}},[e._v("\n              Level "+e._s(e.accessedLevel)+"\n            ")]):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("\n              Not currently known\n            ")])],1),e._v(" "),t("div",{staticClass:"mb-4 md:mb-0 md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("Your current role")]),e._v(" "),e.currentRoleLevel?t("information-badge",{attrs:{size:"xs"}},[e._v("\n              Level "+e._s(e.currentRoleLevel.level)+"\n            ")]):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("N/A")])],1),e._v(" "),t("div",{staticClass:"md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("Target role")]),e._v(" "),t("div",{staticClass:"flex space-x-3"},[e.targetRoleLevel?t("information-badge",{attrs:{size:"xs"}},[e._v("\n                Level "+e._s(e.targetRoleLevel.level)+"\n              ")]):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("N/A")]),e._v(" "),e.journey?t("information-badge",{attrs:{size:"xs",colour:e.journey.colour,tooltip:e.journey.tooltip}},[e._v("\n                "+e._s(e.journey.text)+"\n              ")]):e._e()],1)])])]),e._v(" "),!1!==e.selectedLevel?t("div",[t("div",{staticClass:"border-b-2 border-nsw-grey-200 flex"},e._l(e.selectedCapability.levels,(function(l){return t("panel-tab",{key:l.level,attrs:{name:l.level,selected:e.tabs.level},nativeOn:{click:function(t){e.tabs.level=l.level}}},[e._v("\n            Level "+e._s(l.level)+"\n          ")])})),1),e._v(" "),t("div",{staticClass:"pt-6"},[t("h5",{staticClass:"font-bold mb-4"},[e._v("\n            "+e._s(e.selectedLevel.name)+"\n          ")]),e._v(" "),t("p",{staticClass:"mb-4"},[e._v("\n            "+e._s(e.selectedLevel.easyDescription)+"\n          ")]),e._v(" "),t("ul",{staticClass:"list-disc pl-4 w-11/12"},e._l(e.selectedLevel.attributes,(function(l,o){return t("li",{key:o,staticClass:"mb-2"},[e._v("\n              "+e._s(l)+"\n            ")])})),0)])]):e._e()])])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InformationBadge:l(461).default,BaseModal:l(462).default})},513:function(e,t,l){"use strict";l.r(t);l(35),l(28),l(30),l(43),l(44),l(31),l(13),l(25);var o=l(17);l(63);function r(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,o)}return l}function n(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?r(Object(l),!0).forEach((function(t){Object(o.a)(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):r(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}var c={components:{InformationBadge:l(461).default},props:{targetRole:{type:[Object,Boolean],required:!0},currentRole:{type:[Object,Boolean],required:!0},item:{type:[Object,Boolean],required:!0},type:{type:String,required:!0},roleType:{type:String,required:!0},instructions:{type:String,default:"targetRole"}},computed:{assessedSkills:function(){return n(n({},this.$store.state.pathway.answers.skills),this.$store.state.pathway.answers.capabilities)},emptyMessage:function(){return this.instructions?this.targetRole?"Not a focus ".concat(this.type,", but may be complimentary"):"Not currently known":""},valueName:function(){return"skill"===this.type?"skills":"capabilities"},journeyType:function(){if(!this.item)return!1;if("selfAssessed"===this.instructions&&this.targetRole){var e,t=this.$collect(this.currentRole[this.valueName].focus).where("code",this.item.code).first(),l=this.$collect(this.targetRole[this.valueName].focus).where("code",this.item.code).first(),o=null===(e=this.assessedSkills)||void 0===e||null===(e=e[this.item.code])||void 0===e?void 0:e.value;if("current"===this.roleType&&o<t.level)return{text:"Upskill",colour:"orange",tooltip:"You assessed yourself at Level ".concat(o," in your current role.")};if("target"===this.roleType&&o<l.level)return{text:"Upskill",colour:"orange",tooltip:"You assessed yourself at Level ".concat(o," in your current role.")};if("target"===this.roleType&&!t&&l)return{text:"New skill",colour:"green",tooltip:"A new skill that is required for this role."}}return!1}},methods:{capitaliseFirstLetter:function(e){return e.charAt(0).toUpperCase()+e.slice(1)}}},d=l(16),component=Object(d.a)(c,(function(){var e=this,t=e._self._c;return t("td",{staticClass:"comparison-cell lg:w-1/2 px-4 lg:px-8 py-4",class:{"border-b border-b-gray-200":e.item||e.emptyMessage}},[e.item?t("div",{staticClass:"flex items-start justify-between"},[t("button",{staticClass:"underline text-left",on:{click:function(t){return e.$emit("skillClicked",{skill:e.item.code,journey:e.journeyType})}}},[t("span",{},[e._v(e._s(e.item.name))])]),e._v(" "),t("div",{staticClass:"pl-4 flex-shrink-0 flex space-x-3 whitespace-no-wrap"},[[e.journeyType?t("information-badge",{attrs:{size:"xs",colour:e.journeyType.colour,tooltip:e.journeyType.tooltip}},[e._v("\n          "+e._s(e.journeyType.text)+"\n        ")]):e._e()],e._v(" "),t("information-badge",{attrs:{size:"xs"}},[e._v("\n        Level "+e._s(e.item.level)+"\n      ")])],2)]):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("\n    "+e._s(e.emptyMessage)+"\n  ")])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InformationBadge:l(461).default})},558:function(e,t,l){"use strict";l.r(t);var o=l(104),r=(l(62),l(30),l(83),l(35),l(13),l(98),l(25),l(511)),n=l(512),c=l(513),d={components:{ModalSkill:r.default,ModalCapability:n.default,ComparisonRow:c.default},props:{currentRole:{type:Object,required:!0},targetRole:{type:[Object,Boolean],required:!0}},data:function(){return{selectedSkill:!1,selectedCapability:!1,modalJourney:!1,modals:{skill:!1,capability:!1}}},computed:{skills:function(){return this.$store.state.skills},capabilities:function(){return this.$store.state.capabilities},skillsMatrix:function(){var e,t=this,l=this.$collect(this.currentRole.skills.focus).pluck("code").all();null!==(e=this.targetRole.skills)&&void 0!==e&&e.focus&&this.$collect(this.targetRole.skills.focus).pluck("code").each((function(code){l.includes(code)||l.push(code)}));var r=[];l.forEach((function(e){var l;r.push({current:t.isSkillRequiredByRole(t.currentRole,e),target:!(null===(l=t.targetRole.skills)||void 0===l||!l.focus)&&t.isSkillRequiredByRole(t.targetRole,e)})}));var n=this.$collect(r).filter((function(e){return e.current&&!e.target})).all(),c=this.$collect(r).filter((function(e){return e.current&&e.target})).all(),d=this.$collect(r).filter((function(e){return!e.current&&e.target})).all();return[].concat(Object(o.a)(n),Object(o.a)(c),Object(o.a)(d))},capabilitiesMatrix:function(){var e,t=this,l=this.$collect(this.currentRole.capabilities.focus).pluck("code").all();null!==(e=this.targetRole.capabilities)&&void 0!==e&&e.focus&&this.$collect(this.targetRole.capabilities.focus).pluck("code").each((function(code){l.includes(code)||l.push(code)}));var r=[];l.forEach((function(e){var l;r.push({current:t.isCapabilityRequiredByRole(t.currentRole,e),target:!(null===(l=t.targetRole.capabilities)||void 0===l||!l.focus)&&t.isCapabilityRequiredByRole(t.targetRole,e)})}));var n=this.$collect(r).filter((function(e){return e.current&&!e.target})).all(),c=this.$collect(r).filter((function(e){return e.current&&e.target})).all(),d=this.$collect(r).filter((function(e){return!e.current&&e.target})).all();return[].concat(Object(o.a)(n),Object(o.a)(c),Object(o.a)(d))}},methods:{showSkillModal:function(e){this.selectedSkill=this.getSkillByCode(e.skill),window.dataLayer.push({event:"open_modal",category:"skill",label:this.selectedSkill.name}),this.modalJourney=e.journey,this.modals.skill=!0},showCapabilityModal:function(e){this.selectedCapability=this.getCapabilityByCode(e.skill),window.dataLayer.push({event:"open_modal",category:"capability",label:this.selectedCapability.name}),this.modalJourney=e.journey,this.modals.capability=!0},getSkillByCode:function(code){return this.$collect(this.skills).where("code",code).first()},isSkillRequiredByRole:function(e,t){var l=this.$collect(e.skills.focus).where("code",t).first();if(!l)return!1;var o=this.getSkillByCode(l.code);return o?{name:o.name,code:o.code,level:l.level}:(console.warn("Unable to find matching skill: ".concat(l.code)),!1)},getCapabilityByCode:function(code){return this.$collect(this.capabilities).where("subcode",code).first()},isCapabilityRequiredByRole:function(e,t){var l=this.$collect(e.capabilities.focus).where("code",t).first();if(!l)return!1;var o=this.getCapabilityByCode(l.code);return{name:o.subcategory,code:o.subcode,level:l.level}}}},v=l(16),component=Object(v.a)(d,(function(){var e=this,t=e._self._c;return t("tbody",[e.skillsMatrix.length>0?t("tr",[t("td",{staticClass:"lg:w-1/2 p-4 lg:p-8"},[t("div",{staticClass:"flex items-center whitespace-no-wrap font-bold text-lg"},[e._v("\n        Current skill\n        "),t("help-bubble",{attrs:{tooltip:"Your current role procurement skill requirements."}})],1)]),e._v(" "),t("td",{staticClass:"lg:w-1/2 p-4 lg:p-8"},[t("div",{staticClass:"flex items-center whitespace-no-wrap font-bold text-lg"},[e._v("\n        Target skill\n        "),t("help-bubble",{attrs:{tooltip:"Your target role procurement skill requirements."}})],1)])]):e._e(),e._v(" "),e._l(e.skillsMatrix,(function(l,o){return t("tr",{key:"skill-".concat(o)},[t("comparison-row",{attrs:{"current-role":e.currentRole,"target-role":e.targetRole,item:l.current,type:"skill",instructions:"selfAssessed","current-instructions":"","role-type":"current"},on:{skillClicked:e.showSkillModal}}),e._v(" "),t("comparison-row",{attrs:{"current-role":e.currentRole,"target-role":e.targetRole,item:l.target,type:"skill",instructions:"selfAssessed","role-type":"target"},on:{skillClicked:e.showSkillModal}})],1)})),e._v(" "),e.capabilitiesMatrix.length>0?t("tr",[t("td",{staticClass:"lg:w-1/2 p-4 lg:p-8"},[t("div",{staticClass:"flex items-center whitespace-no-wrap font-bold text-lg"},[e._v("\n        Current capability\n        "),t("help-bubble",{attrs:{tooltip:"Your current role NSW Capability requirements. These are based on the NSW Capability Framework."}})],1)]),e._v(" "),t("td",{staticClass:"lg:w-1/2 p-4 lg:p-8"},[t("div",{staticClass:"flex items-center whitespace-no-wrap font-bold text-lg"},[e._v("\n        Target capability\n        "),t("help-bubble",{attrs:{tooltip:"Your target role NSW Capability requirements. These are based on the NSW Capability Framework."}})],1)])]):e._e(),e._v(" "),e._l(e.capabilitiesMatrix,(function(l,o){return t("tr",{key:"capability-".concat(o)},[t("comparison-row",{attrs:{"current-role":e.currentRole,"target-role":e.targetRole,item:l.current,type:"capability",instructions:"selfAssessed","role-type":"current"},on:{skillClicked:e.showCapabilityModal}}),e._v(" "),t("comparison-row",{attrs:{"current-role":e.currentRole,"target-role":e.targetRole,item:l.target,type:"capability",instructions:"selfAssessed","role-type":"target"},on:{skillClicked:e.showCapabilityModal}})],1)})),e._v(" "),t("modal-skill",{attrs:{show:e.modals.skill,"selected-skill":e.selectedSkill,"current-role":e.currentRole,"target-role":e.targetRole,"max-width":"3xl",journey:e.modalJourney},on:{close:function(t){e.modals.skill=!1}}}),e._v(" "),t("modal-capability",{attrs:{show:e.modals.capability,"selected-capability":e.selectedCapability,"current-role":e.currentRole,"target-role":e.targetRole,journey:e.modalJourney,"max-width":"3xl"},on:{close:function(t){e.modals.capability=!1}}})],2)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{HelpBubble:l(478).default})}}]);