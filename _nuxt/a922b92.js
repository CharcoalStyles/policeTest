(window.webpackJsonp=window.webpackJsonp||[]).push([[3,7,9,22,38,41,42,45,56],{457:function(e,t,l){"use strict";l.r(t);var r=l(463),o={components:{Popper:l.n(r).a},props:{size:{type:String,default:"md"},colour:{type:String,default:"grey"},tooltip:{type:String,default:""},rounded:{type:String,default:"full"}},computed:{tooltipOptions:function(){return{placement:"bottom",modifiers:{offset:{offset:"0,5px"}}}},baseSize:function(){return"md"===this.size?"text-base":"text-sm"},iconSize:function(){return"md"===this.size?"h-4":"h-3"},badgeCursor:function(){return this.tooltip?"hover:cursor-pointer":"hover:cursor-default"},badgeBorder:function(){return"blue-outline"===this.colour?"border border-nsw-brand-primary-blue":""},badgeRounded:function(){switch(this.rounded){case"full":return"rounded-full";case"lg":return"rounded-lg";case"md":return"rounded-md";case"sm":return"rounded-sm";default:return""}},textColor:function(){return"blue-outline"===this.colour?"text-nsw-brand-primary-blue":"text-nsw-grey-800"},badgeColour:function(){switch(this.colour){case"blue-outline":return"bg-white";case"blue":return"bg-role-pill-blue";case"green":return"bg-role-pill-green";case"orange":return"bg-orange-200";case"grey":return"bg-slate-200";default:return"bg-".concat(this.colour)}}}},n=l(16),component=Object(n.a)(o,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-shrink-0"},[t("popper",{attrs:{trigger:"hover",options:e.tooltipOptions,disabled:!e.tooltip}},[t("div",{staticClass:"popper"},[e._v("\n      "+e._s(e.tooltip)+"\n    ")]),e._v(" "),t("div",{staticClass:"px-3 py-0.5 inline-flex items-center whitespace-no-wrap focus:outline-none",class:[e.baseSize,e.badgeColour,e.badgeCursor,e.badgeBorder,e.textColor,e.badgeRounded],attrs:{slot:"reference"},slot:"reference"},[e._t("default"),e._v(" "),e.tooltip?t("img",{staticClass:"ml-2",class:e.iconSize,attrs:{src:"/icons/help.svg",alt:"Help icon"}}):e._e()],2)])],1)}),[],!1,null,null,null);t.default=component.exports},458:function(e,t,l){"use strict";l.r(t);l(99);var r={props:{show:{type:Boolean,default:!1},title:{type:String,default:""},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0},scrollable:{type:Boolean,default:!0}},computed:{maxWidthClass:function(){return{sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl","3xl":"sm:max-w-3xl"}[this.maxWidth]},scrollableContainerClass:function(){return this.scrollable?"h-modal-accessible lg:h-modal-accessible-lg":"max-h-modal-accessible lg:max-h-modal-accessible-lg"},scrollableBodyClass:function(){return this.scrollable?"overflow-y-scroll":"overflow-y-scroll lg:overflow-auto"}},watch:{show:{immediate:!0,handler:function(e){e?(document.body.style.overflow="hidden",this.focusModal()):document.body.style.overflow=null}}},created:function(){var e=this,t=function(t){"Escape"===t.key&&e.show&&e.close()};document.addEventListener("keydown",t),this.$once("hook:destroyed",(function(){document.removeEventListener("keydown",t)}))},mounted:function(){this.focusModal()},methods:{focusModal:function(){setTimeout((function(){var e=document.getElementById("dialog");e&&e.focus()}),100)},close:function(){this.closeable&&this.$emit("close")}}},o=l(16),component=Object(o.a)(r,(function(){var e=this,t=e._self._c;return t("portal",{attrs:{to:"modal"}},[t("transition",{attrs:{"leave-active-class":"duration-200"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"fixed flex items-center justify-center inset-0 z-20"},[t("transition",{attrs:{"enter-active-class":"ease-out duration-300","enter-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"ease-in duration-200","leave-class":"opacity-100","leave-to-class":"opacity-0"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"fixed inset-0 transform transition-all",on:{click:e.close}},[t("div",{staticClass:"absolute inset-0 bg-nsw-brand-primary-blue opacity-50"})])]),e._v(" "),t("transition",{attrs:{"enter-active-class":"ease-out duration-300","enter-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to-class":"opacity-100 translate-y-0 sm:scale-100","leave-active-class":"ease-in duration-200","leave-class":"opacity-100 translate-y-0 sm:scale-100","leave-to-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"}},[e.show?t("div",{staticClass:"bg-white shadow-xl transform transition-all w-modal-accessible flex flex-col focus:outline-none",class:[e.maxWidthClass,e.scrollableContainerClass],attrs:{id:"dialog",tabindex:"-1","aria-labelledby":"modal-title","aria-modal":"true"}},[t("div",{staticClass:"sticky w-full top-0 left-0 font-bold text-lg px-4 lg:px-8 py-3 lg:py-6 flex items-center justify-between border-b border-nsw-grey-200 bg-white z-10"},[t("h1",{staticClass:"w-10/12",attrs:{id:"modal-title"}},[e._v("\n              "+e._s(e.title)+"\n            ")]),e._v(" "),e.closeable?t("button",{staticClass:"absolute top-0 right-0 p-4 lg:p-8",attrs:{type:"button",title:"Close this window"},on:{click:e.close}},[t("img",{attrs:{src:"/icons/close.svg",alt:"Close"}})]):e._e()]),e._v(" "),t("div",{staticClass:"px-4 lg:px-8 py-3 lg:py-6 flex-grow",class:e.scrollableBodyClass},[e._t("default")],2),e._v(" "),e.$slots.footer?t("div",{staticClass:"flex-shrink-0 px-4 lg:px-8 py-3 lg:py-6 bg-gray-100 flex justify-between"},[e._t("footer")],2):e._e()]):e._e()])],1)])],1)}),[],!1,null,null,null);t.default=component.exports},459:function(e,t,l){"use strict";l.r(t);var r={props:{role:{type:Object,required:!0},showDefault:{type:Boolean,default:!1},size:{type:String,default:"sm"}},computed:{showDefaultIcon:function(){return this.showDefault&&!this.role.essential.aboriginality&&!this.role.essential.detective},textSize:function(){return"sm"===this.size?"text-sm":"text-base"}}},o=l(16),component=Object(o.a)(r,(function(){var e=this,t=e._self._c;return t("div",[e.role.essential.aboriginality?t("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[t("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-atsi.svg",alt:"Essential Requirements icon"}}),e._v(" "),t("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:e.textSize},[e._v("\n      Aboriginal or Torres Strait Islander Identified Role\n    ")])]):e._e(),e._v(" "),e.role.essential.detective?t("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[t("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-detective.svg",alt:"Essential Requirements icon"}}),e._v(" "),t("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:e.textSize},[e._v("\n      Designated Detective Role\n    ")])]):e._e(),e._v(" "),e.showDefaultIcon?t("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[t("img",{attrs:{src:"/icons/essential.svg",alt:"Essential Requirements icon"}}),e._v(" "),t("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:e.textSize},[e._v("\n      Essential Requirements\n    ")])]):e._e()])}),[],!1,null,null,null);t.default=component.exports},461:function(e,t,l){"use strict";l.r(t);l(125),l(82),l(34),l(161),l(13),l(30),l(54),l(98),l(162),l(250);var r={components:{InformationBadge:l(457).default},props:{skillCode:{type:String,required:!0},level:{type:[Number,String],required:!0},isSkill:{type:Boolean,default:!0}},computed:{pillLabel:function(){var e=this;if(this.isSkill){var t=this.$store.state.skills.find((function(t){return t.code===e.skillCode})).levels.find((function(t){return t.level.toString()===e.level.toString()})).name.trim();if(t.includes(" - "))return t.split(" - ")[1];var l=t.split(/[\u2010-\u2015\u2212\uFE58-\uFE5F\uFF0D\uFF3F]/);return l[l.length-1]}return this.$store.state.capabilities.find((function(t){return t.subcode===e.skillCode})).levels[this.level-1].name.split(" - ")[1]}}},o=l(16),component=Object(o.a)(r,(function(){var e=this,t=e._self._c;return t("information-badge",{staticClass:"break-words",attrs:{size:"xs"}},[t("p",{staticClass:"break-words"},[e._v(e._s(e.pillLabel))])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InformationBadge:l(457).default})},462:function(e,t,l){"use strict";var r=l(2),o=l(4),n=l(46),c=l(32),d=l(57),f=l(252),v=l(12),m=l(3),h=l(253),y=l(167),x=l(466),_=l(467),w=l(102),C=l(468),k=[],S=o(k.sort),j=o(k.push),F=m((function(){k.sort(void 0)})),I=m((function(){k.sort(null)})),B=y("sort"),O=!m((function(){if(w)return w<70;if(!(x&&x>3)){if(_)return!0;if(C)return C<603;var code,e,t,l,r="";for(code=65;code<76;code++){switch(e=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:t=3;break;case 68:case 71:t=4;break;default:t=2}for(l=0;l<47;l++)k.push({k:e+l,v:t})}for(k.sort((function(a,b){return b.v-a.v})),l=0;l<k.length;l++)e=k[l].k.charAt(0),r.charAt(r.length-1)!==e&&(r+=e);return"DGBEFHACIJK"!==r}}));r({target:"Array",proto:!0,forced:F||!I||!B||!O},{sort:function(e){void 0!==e&&n(e);var t=c(this);if(O)return void 0===e?S(t):S(t,e);var l,r,o=[],m=d(t);for(r=0;r<m;r++)r in t&&j(o,t[r]);for(h(o,function(e){return function(t,l){return void 0===l?-1:void 0===t?1:void 0!==e?+e(t,l)||0:v(t)>v(l)?1:-1}}(e)),l=d(o),r=0;r<l;)t[r]=o[r++];for(;r<m;)f(t,r++);return t}})},464:function(e,t,l){"use strict";l.r(t);l(34),l(161);var r={props:{name:{type:[String,Number],required:!0},selected:{type:[String,Number],required:!0}},computed:{isSelected:function(){return this.selected===this.name?"border-nsw-brand-primary-blue":"border-white"}}},o=l(16),component=Object(o.a)(r,(function(){var e=this;return(0,e._self._c)("button",{staticClass:"h-8 px-4 pb-1 border-b-4 cursor-pointer hover:border-nsw-brand-primary-blue focus:outline-none whitespace-no-wrap",class:e.isSelected},[e._t("default")],2)}),[],!1,null,null,null);t.default=component.exports},466:function(e,t,l){"use strict";var r=l(83).match(/firefox\/(\d+)/i);e.exports=!!r&&+r[1]},467:function(e,t,l){"use strict";var r=l(83);e.exports=/MSIE|Trident/.test(r)},468:function(e,t,l){"use strict";var r=l(83).match(/AppleWebKit\/(\d+)\./);e.exports=!!r&&+r[1]},473:function(e,t,l){"use strict";l.r(t);l(34),l(27),l(29),l(43),l(44),l(31),l(25);var r=l(17),o=(l(125),l(82),l(63),l(478),l(13),l(30),l(54),l(98),l(162),l(250),l(457)),n=l(461);function c(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,r)}return l}function d(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?c(Object(l),!0).forEach((function(t){Object(r.a)(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):c(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}var f={components:{InformationBadge:o.default,SkillCapInfoBadge:n.default},props:{targetRole:{type:[Object,Boolean],default:void 0},currentRole:{type:[Object,Boolean],required:!0},item:{type:[Object,Boolean],required:!0},type:{type:String,required:!0},roleType:{type:String,required:!0},instructions:{type:String,default:"targetRole"},fullWidth:{type:Boolean,default:!1}},computed:{pillLabel:function(){return this.getItemText(this.item.level)},assessedSkills:function(){return d(d({},this.$store.state.pathway.answers.skills),this.$store.state.pathway.answers.capabilities)},emptyMessage:function(){return this.instructions?this.targetRole?"Not a focus ".concat(this.type,", but may be complimentary"):"Not currently known":""},valueName:function(){return"skill"===this.type?"skills":"capabilities"},journeyType:function(){if(!this.item)return!1;if("selfAssessed"===this.instructions&&this.targetRole){var e,t=this.$collect(this.currentRole[this.valueName].focus).where("code",this.item.code).first(),l=this.$collect(this.targetRole[this.valueName].focus).where("code",this.item.code).first(),r=null===(e=this.assessedSkills)||void 0===e||null===(e=e[this.item.code])||void 0===e?void 0:e.value;if("current"===this.roleType&&r<t.level){var o,n=this.getItemText(null===(o=this.assessedSkills)||void 0===o||null===(o=o[this.item.code])||void 0===o?void 0:o.value);return{text:"Upskill",colour:"orange",tooltip:"You assessed yourself at ".concat(n," in your current role.")}}if("target"===this.roleType&&r<l.level){var c,d=this.getItemText(null===(c=this.assessedSkills)||void 0===c||null===(c=c[this.item.code])||void 0===c?void 0:c.value);return{text:"Upskill",colour:"orange",tooltip:"You assessed yourself at ".concat(d," in your current role.")}}if("target"===this.roleType&&!t&&l)return{text:"New skill",colour:"green",tooltip:"A new skill that is required for this role."}}return!1}},methods:{capitaliseFirstLetter:function(e){return e.charAt(0).toUpperCase()+e.slice(1)},getItemText:function(e){var t=this;if("skill"===this.type){var l=this.$store.state.skills.find((function(s){return s.code===t.item.code}));console.log({skill:l});var r=l.levels.find((function(l){var r=("string"==typeof e?Number.parseInt(t.item.level):t.item.level).toString(),o=("string"==typeof l.level?Number.parseInt(l.level):l.level).toString();return console.log({userLevel:r,thisLevel:o}),r===o})).name.trim();if(r.includes(" - "))return r.split(" - ")[1];var o=r.split(/[\u2010-\u2015\u2212\uFE58-\uFE5F\uFF0D\uFF3F]/);return o[o.length-1]}return this.$store.state.capabilities.find((function(e){return e.subcode===t.item.code})).levels[e-1].name.split(" - ")[1]}}},v=l(16),component=Object(v.a)(f,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"comparison-cell py-4",class:{"border-b border-b-gray-200":e.item||e.emptyMessage,"lg:w-1/2 lg:px-8":!e.fullWidth}},[e.item?t("div",{staticClass:"flex items-start justify-between"},[t("button",{staticClass:"underline text-left flex-shrink",on:{click:function(t){return e.$emit("skillClicked",{skill:e.item.code,journey:e.journeyType})}}},[t("span",{},[e._v(e._s(e.item.name))])]),e._v(" "),t("div",{staticClass:"pl-4 flex space-x-3 whitespace-no-wrap"},[[e.journeyType?t("information-badge",{attrs:{size:"xs",colour:e.journeyType.colour,tooltip:e.journeyType.tooltip}},[e._v("\n          "+e._s(e.journeyType.text)+"\n        ")]):e._e()],e._v(" "),t("skill-cap-info-badge",{attrs:{"is-skill":"skill"===e.type,"skill-code":e.item.code,level:e.item.level}})],2)]):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("\n    "+e._s(e.emptyMessage)+"\n  ")])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InformationBadge:l(457).default,SkillCapInfoBadge:l(461).default})},474:function(e,t,l){"use strict";l.r(t);l(27),l(52),l(34),l(125),l(82),l(13),l(30),l(98),l(162);var r=l(163),o=l(464),n=l(458),c=l(461),d={components:{PanelTab:o.default,BaseModal:n.default,SkillCapInfoBadge:c.default},props:{selectedCapability:{type:[Object,Boolean],required:!0},currentRole:{type:[Object,Boolean],required:!0},targetRole:{type:[Object,Boolean],required:!0},show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0},journey:{type:[Object,Boolean],required:!0},noRole:{type:Boolean,default:!1}},data:function(){return{skills:r,tabs:{level:!1}}},computed:{assessedCapabilities:function(){return this.$store.state.pathway.answers.capabilities},selectedLevel:function(){var e=this;return!1!==this.tabs.level&&this.selectedCapability.levels.find((function(t){return t.level===e.tabs.level}))},accessedLevel:function(){return this.selectedCapability.subcode in this.assessedCapabilities&&this.assessedCapabilities[this.selectedCapability.subcode].value},currentRoleLevel:function(){return this.$collect(this.currentRole.capabilities.focus).where("code",this.selectedCapability.subcode).first()},targetRoleLevel:function(){return!!this.targetRole&&this.$collect(this.targetRole.capabilities.focus).where("code",this.selectedCapability.subcode).first()}},watch:{selectedCapability:{immediate:!0,handler:function(e){var t,l;this.tabs.level=null!==(t=null===(l=e.levels)||void 0===l?void 0:l[0].level)&&void 0!==t&&t}}},mounted:function(){},methods:{getLabel:function(e){if(e.name.includes(" - "))return e.name.split(" - ")[1];var t=e.name.split(/[\u2010-\u2015\u2212\uFE58-\uFE5F\uFF0D\uFF3F]/);return t[t.length-1]}}},f=l(16),component=Object(f.a)(d,(function(){var e=this,t=e._self._c;return t("base-modal",{attrs:{show:e.show,"max-width":e.maxWidth,title:e.selectedCapability.subcategory,closeable:e.closeable},on:{close:function(t){return e.$emit("close")}}},[t("div",{staticClass:"leading-relaxed"},[t("div",[t("div",{staticClass:"mb-6"},[t("h4",{staticClass:"font-bold mb-4"},[e._v("Capability description")]),e._v(" "),t("p",[e._v(e._s(e.selectedCapability.description))])]),e._v(" "),e.noRole?e._e():t("div",{staticClass:"mb-12"},[t("h4",{staticClass:"text-lg font-bold mb-4"},[e._v("Capability level")]),e._v(" "),t("div",{staticClass:"flex flex-col md:flex-row"},[t("div",{staticClass:"mb-4 md:mb-0 md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("You assessed")]),e._v(" "),e.accessedLevel?t("skill-cap-info-badge",{attrs:{"is-skill":!1,"skill-code":e.selectedCapability.subcode,level:e.currentRoleLevel.level}}):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("\n              Not currently known\n            ")])],1),e._v(" "),t("div",{staticClass:"mb-4 md:mb-0 md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("Your current role")]),e._v(" "),e.currentRoleLevel?t("skill-cap-info-badge",{attrs:{"is-skill":!1,"skill-code":e.selectedCapability.subcode,level:e.currentRoleLevel.level}}):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("N/A")])],1),e._v(" "),t("div",{staticClass:"md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("Target role")]),e._v(" "),t("div",{staticClass:"flex space-x-3"},[e.targetRoleLevel?t("skill-cap-info-badge",{attrs:{"is-skill":!1,"skill-code":e.selectedCapability.subcode,level:e.targetRoleLevel.level}}):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("N/A")]),e._v(" "),e.journey?t("information-badge",{attrs:{size:"xs",colour:e.journey.colour,tooltip:e.journey.tooltip}},[e._v("\n                "+e._s(e.journey.text)+"\n              ")]):e._e()],1)])])]),e._v(" "),!1!==e.selectedLevel?t("div",[t("div",{staticClass:"border-b-2 border-nsw-grey-200 flex"},e._l(e.selectedCapability.levels,(function(l){return t("panel-tab",{key:l.level,attrs:{name:l.level,selected:e.tabs.level},nativeOn:{click:function(t){e.tabs.level=l.level}}},[e._v("\n            "+e._s(e.getLabel(l))+"\n          ")])})),1),e._v(" "),t("div",{staticClass:"pt-6"},[t("h5",{staticClass:"font-bold mb-4"},[e._v("\n            "+e._s(e.selectedLevel.name)+"\n          ")]),e._v(" "),t("p",{staticClass:"mb-4"},[e._v("\n            "+e._s(e.selectedLevel.easyDescription)+"\n          ")]),e._v(" "),t("ul",{staticClass:"list-disc pl-4 w-11/12"},e._l(e.selectedLevel.attributes,(function(l,r){return t("li",{key:r,staticClass:"mb-2"},[e._v("\n              "+e._s(l)+"\n            ")])})),0)])]):e._e()])])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{SkillCapInfoBadge:l(461).default,InformationBadge:l(457).default,BaseModal:l(458).default})},475:function(e,t,l){"use strict";l.r(t);l(27),l(52),l(34),l(125),l(13);var r=l(163),o=l(464),n=l(458),c=l(461),d={components:{PanelTab:o.default,BaseModal:n.default,SkillCapInfoBadge:c.default},props:{selectedSkill:{type:[Object,Boolean],required:!0},currentRole:{type:[Object,Boolean],required:!0},targetRole:{type:[Object,Boolean],required:!0},show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0},journey:{type:[Object,Boolean],required:!0},noRole:{type:Boolean,default:!1}},data:function(){return{skills:r,tabs:{level:!1}}},computed:{assessedSkills:function(){return this.noRole?{}:this.$store.state.pathway.answers.skills},assessedCapabilities:function(){return this.noRole?{}:this.$store.state.pathway.answers.capabilities},selectedLevel:function(){var e=this;return!1!==this.tabs.level&&this.selectedSkill.levels.find((function(t){return t.level===e.tabs.level}))},accessedLevel:function(){return this.selectedSkill.code in this.assessedSkills&&this.assessedSkills[this.selectedSkill.code].value},currentRoleLevel:function(){return this.$collect(this.currentRole.skills.focus).where("code",this.selectedSkill.code).first()},targetRoleLevel:function(){return!!this.targetRole&&this.$collect(this.targetRole.skills.focus).where("code",this.selectedSkill.code).first()}},watch:{selectedSkill:{immediate:!0,handler:function(e){var t,l;this.tabs.level=null!==(t=null===(l=e.levels)||void 0===l?void 0:l[0].level)&&void 0!==t&&t}}},mounted:function(){}},f=l(16),component=Object(f.a)(d,(function(){var e=this,t=e._self._c;return t("base-modal",{attrs:{show:e.show,"max-width":e.maxWidth,title:e.selectedSkill.category,closeable:e.closeable},on:{close:function(t){return e.$emit("close")}}},[t("div",{staticClass:"leading-relaxed"},[t("div",[t("div",{staticClass:"mb-6"},[t("h4",{staticClass:"font-bold mb-4"},[e._v("Skill description")]),e._v(" "),t("p",[e._v(e._s(e.selectedSkill.description))])]),e._v(" "),e.noRole?e._e():t("div",{staticClass:"mb-12"},[t("h4",{staticClass:"text-lg font-bold mb-4"},[e._v("Skill level")]),e._v(" "),t("div",{staticClass:"flex flex-col md:flex-row"},[t("div",{staticClass:"mb-4 md:mb-0 md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("You assessed")]),e._v(" "),e.accessedLevel?t("skill-cap-info-badge",{attrs:{"is-skill":!0,"skill-code":e.selectedSkill.code,level:e.currentRoleLevel.level}}):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("N/A")])],1),e._v(" "),t("div",{staticClass:"mb-4 md:mb-0 md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("Your current role")]),e._v(" "),e.currentRoleLevel?t("skill-cap-info-badge",{attrs:{"is-skill":!0,"skill-code":e.selectedSkill.code,level:e.currentRoleLevel.level}}):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("N/A")])],1),e._v(" "),t("div",{staticClass:"md:mr-12"},[t("h5",{staticClass:"font-bold mb-3"},[e._v("Target role")]),e._v(" "),t("div",{staticClass:"flex space-x-3"},[e.targetRoleLevel?t("skill-cap-info-badge",{attrs:{"is-skill":!0,"skill-code":e.selectedSkill.code,level:e.targetRoleLevel.level}}):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("\n                Not currently known\n              ")]),e._v(" "),e.journey?t("information-badge",{attrs:{size:"xs",colour:e.journey.colour,tooltip:e.journey.tooltip}},[e._v("\n                "+e._s(e.journey.text)+"\n              ")]):e._e()],1)])])]),e._v(" "),!1!==e.selectedLevel?t("div",[t("div",{staticClass:"border-b-2 border-nsw-grey-200 flex overflow-x-scroll"},e._l(e.selectedSkill.levels,(function(l){return t("panel-tab",{key:l.level,attrs:{name:l.level,selected:e.tabs.level},nativeOn:{click:function(t){e.tabs.level=l.level}}},[e._v("\n            Level "+e._s(l.level)+"\n          ")])})),1),e._v(" "),t("div",{staticClass:"pt-6"},[t("h5",{staticClass:"font-bold mb-4"},[e._v("\n            "+e._s(e.selectedLevel.name)+"\n          ")]),e._v(" "),t("p",{staticClass:"mb-4"},[e._v("\n            "+e._s(e.selectedLevel.easyDescription)+"\n          ")]),e._v(" "),t("ul",{staticClass:"list-disc pl-4 w-11/12"},e._l(e.selectedLevel.attributes,(function(l,r){return t("li",{key:r,staticClass:"mb-2"},[e._v("\n              "+e._s(l)+"\n            ")])})),0)])]):e._e()])])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{SkillCapInfoBadge:l(461).default,InformationBadge:l(457).default,BaseModal:l(458).default})},478:function(e,t,l){"use strict";var r=l(2),o=l(479);r({target:"Number",stat:!0,forced:Number.parseInt!==o},{parseInt:o})},479:function(e,t,l){"use strict";var r=l(5),o=l(3),n=l(4),c=l(12),d=l(168).trim,f=l(169),v=r.parseInt,m=r.Symbol,h=m&&m.iterator,y=/^[+-]?0x/i,x=n(y.exec),_=8!==v(f+"08")||22!==v(f+"0x16")||h&&!o((function(){v(Object(h))}));e.exports=_?function(e,t){var l=d(c(e));return v(l,t>>>0||(x(y,l)?16:10))}:v},487:function(e,t,l){"use strict";l.d(t,"b",(function(){return o})),l.d(t,"a",(function(){return n})),l.d(t,"c",(function(){return c})),l.d(t,"d",(function(){return d}));var r=l(101);l(62),l(29),l(82),l(53),l(462),l(34),l(13),l(98),l(25);function o(e,t,l){return e.filter((function(e){return l.length>0?[t.jobFunction].concat(Object(r.a)(l)).includes(e.jobFunction):"policing"===t.gradeId.type?"Policing"===t.jobFamily:e.jobFunction===t.jobFunction})).filter((function(e){if(!("policing"!==t.gradeId.type&&"clerk"!==t.gradeId.type||"policing"!==e.gradeId.type&&"clerk"!==e.gradeId.type||-1===e.gradeId.grade||-1===t.gradeId.grade)){return"policing"===t.gradeId.type&&4===t.gradeId.grade&&"Sergeant"===t.grade&&"Senior Sergeant"===e.grade||!(e.gradeId.grade<=t.gradeId.grade)&&e.gradeId.grade<=t.gradeId.grade+2}if(e.salary.min>t.salary.min&&e.salary.max>t.salary.max)return!0}))}function n(e,t){return e.filter((function(e){return"Policing"!==t.jobFamily||e.jobFamily===t.jobFamily})).filter((function(e){return"Student Police Officer"!==e.name&&("policing"===t.gradeId.type&&"clerk"===t.gradeId.type?e.gradeId.grade===t.gradeId.grade:!(e.salary.min<.95*t.salary.min)&&(Math.abs(e.salary.min-t.salary.min)<2e4&&Math.abs(e.salary.max-t.salary.max)<2e4||void 0))}))}function c(e,t){return t.map((function(t){var l=d(e,t);if(-1!==e.gradeId.grade&&-1!==t.gradeId.grade){var r=e.gradeId.grade-t.gradeId.grade;0===r&&(l.focusFocus+=1),-1===r&&(l.focusFocus+=.5),r>0&&(l.focusFocus-=.5)}if(e.command_BusUnit!==t.command_BusUnit&&(l.focusFocus+=2.5),t.numPositions){var o=t.numPositions.split(" ")[1];l.focusFocus+=1+.1*o.length}return{role:t,rank:l}}),[]).sort((function(a,b){return b.rank.focusFocus-a.rank.focusFocus})).reduce((function(e,t){var l=t.rank.focusFocus;0===e.length?e.push([t]):e[e.length-1][0].rank.focusFocus===l?e[e.length-1].push(t):e.push([t]);return e}),[]).reduce((function(e,t){return t.sort((function(a,b){var e=a.rank.focusAll+.6*a.rank.allFocus+.1*a.rank.allAll;return b.rank.focusAll+.6*b.rank.allFocus+.1*b.rank.allAll-e})).forEach((function(t){e.push(t)})),e}),[])}function d(e,t){var l={focusFocus:0,allFocus:0,focusAll:0,allAll:0};return e.capabilities.all.forEach((function(r){t.capabilities.all.forEach((function(o){if(r.code===o.code){var n=e.capabilities.focus.map((function(e){return e.code})).includes(r.code),c=t.capabilities.focus.map((function(e){return e.code})).includes(o.code),d="focusFocus";!n&&c?d="allFocus":n&&!c?d="focusAll":n||c||(d="allAll");var f=r.level-o.level;if(0===f&&(l[d]+=1),f>=1)return void(l[d]+=1.2);-1===f&&(l[d]+=.3)}}))})),l}}}]);