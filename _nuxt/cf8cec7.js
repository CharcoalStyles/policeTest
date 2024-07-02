(window.webpackJsonp=window.webpackJsonp||[]).push([[39,22,57],{486:function(e,t,r){"use strict";r.r(t);var n=r(492),l={components:{Popper:r.n(n).a},props:{size:{type:String,default:"md"},colour:{type:String,default:"grey"},tooltip:{type:String,default:""},rounded:{type:String,default:"full"}},computed:{tooltipOptions:function(){return{placement:"bottom",modifiers:{offset:{offset:"0,5px"}}}},baseSize:function(){return"md"===this.size?"text-base":"text-sm"},iconSize:function(){return"md"===this.size?"h-4":"h-3"},badgeCursor:function(){return this.tooltip?"hover:cursor-pointer":"hover:cursor-default"},badgeBorder:function(){return"blue-outline"===this.colour?"border border-nsw-brand-primary-blue":""},badgeRounded:function(){switch(this.rounded){case"full":return"rounded-full";case"lg":return"rounded-lg";case"md":return"rounded-md";case"sm":return"rounded-sm";default:return""}},textColor:function(){return"blue-outline"===this.colour?"text-nsw-brand-primary-blue":"text-nsw-grey-800"},badgeColour:function(){switch(this.colour){case"blue-outline":return"bg-white";case"blue":return"bg-role-pill-blue";case"green":return"bg-role-pill-green";case"orange":return"bg-orange-200";case"grey":return"bg-slate-200";default:return"bg-".concat(this.colour)}}}},o=r(17),component=Object(o.a)(l,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-shrink-0"},[t("popper",{attrs:{trigger:"hover",options:e.tooltipOptions,disabled:!e.tooltip}},[t("div",{staticClass:"popper"},[e._v("\n      "+e._s(e.tooltip)+"\n    ")]),e._v(" "),t("div",{staticClass:"px-3 py-0.5 inline-flex items-center whitespace-no-wrap focus:outline-none",class:[e.baseSize,e.badgeColour,e.badgeCursor,e.badgeBorder,e.textColor,e.badgeRounded],attrs:{slot:"reference"},slot:"reference"},[e._t("default"),e._v(" "),e.tooltip?t("img",{staticClass:"ml-2",class:e.iconSize,attrs:{src:"/icons/help.svg",alt:"Help icon"}}):e._e()],2)])],1)}),[],!1,null,null,null);t.default=component.exports},489:function(e,t,r){"use strict";r.r(t);r(93),r(73),r(43),r(176),r(491),r(13),r(32),r(92),r(178),r(177);var n={components:{InformationBadge:r(486).default},props:{skillCode:{type:String,required:!0},level:{type:[Number,String],required:!0},isSkill:{type:Boolean,default:!0}},computed:{pillLabel:function(){var e=this;if(this.isSkill){var t=this.$store.state.skills.find((function(t){return t.code===e.skillCode})).levels.find((function(t){return("string"==typeof e.level?Number.parseInt(t.level):t.level)===("string"==typeof e.level?Number.parseInt(e.level):e.level)})).name.trim();if(t.includes(" - "))return t.split(" - ")[1];var r=t.split(/[\u2010-\u2015\u2212\uFE58-\uFE5F\uFF0D\uFF3F]/);return r[r.length-1]}return this.$store.state.capabilities.find((function(t){return t.subcode===e.skillCode})).levels[this.level-1].name.split(" - ")[1]}}},l=r(17),component=Object(l.a)(n,(function(){var e=this,t=e._self._c;return t("information-badge",{staticClass:"break-words",attrs:{size:"xs"}},[t("p",{staticClass:"break-words"},[e._v(e._s(e.pillLabel))])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InformationBadge:r(486).default})},491:function(e,t,r){"use strict";var n=r(6),l=r(493);n({target:"Number",stat:!0,forced:Number.parseInt!==l},{parseInt:l})},493:function(e,t,r){"use strict";var n=r(10),l=r(7),o=r(8),c=r(18),d=r(179).trim,f=r(180),m=n.parseInt,y=n.Symbol,h=y&&y.iterator,v=/^[+-]?0x/i,k=o(v.exec),w=8!==m(f+"08")||22!==m(f+"0x16")||h&&!l((function(){m(Object(h))}));e.exports=w?function(e,t){var r=d(c(e));return m(r,t>>>0||(k(v,r)?16:10))}:m},503:function(e,t,r){"use strict";r.r(t);r(43),r(40),r(36),r(53),r(54),r(41),r(27);var n=r(23),l=(r(93),r(73),r(74),r(491),r(13),r(32),r(68),r(92),r(178),r(177),r(486)),o=r(489);function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var f={components:{InformationBadge:l.default,SkillCapInfoBadge:o.default},props:{targetRole:{type:[Object,Boolean],default:void 0},currentRole:{type:[Object,Boolean],required:!0},item:{type:[Object,Boolean],required:!0},type:{type:String,required:!0},roleType:{type:String,required:!0},instructions:{type:String,default:"targetRole"},fullWidth:{type:Boolean,default:!1},noJourney:{type:Boolean,default:!1}},computed:{pillLabel:function(){return this.getItemText(this.item.level)},assessedSkills:function(){return d(d({},this.$store.state.pathway.answers.skills),this.$store.state.pathway.answers.capabilities)},emptyMessage:function(){return this.instructions?this.targetRole?"Not a focus ".concat(this.type,", but may be complimentary"):"Not currently known":""},valueName:function(){return"skill"===this.type?"skills":"capabilities"},readableValueName:function(){return"skill"===this.type?"Skill":"Capability"},journeyType:function(){var e,t=this;if(!this.item||this.noJourney)return!1;var r=this.currentRole[this.valueName].focus.find((function(e){return e.code===t.item.code})),n=this.targetRole&&this.targetRole[this.valueName].focus.find((function(e){return e.code===t.item.code})),l=null===(e=this.assessedSkills)||void 0===e||null===(e=e[this.item.code])||void 0===e?void 0:e.value;if("current"===this.roleType&&l<r.level)return{text:"Upskill",colour:"orange",tooltip:"You assessed yourself at lower in this ".concat(this.readableValueName," than your current role requires.")};if("target"===this.roleType){if(!r&&n)return{text:"New skill",colour:"green",tooltip:"Compared to your current role, this role requires a new ".concat(this.readableValueName,".")};if(r.level<n.level)return{text:"Upskill",colour:"orange",tooltip:"This role requires a higher level of ".concat(this.readableValueName," than your current role.")}}return!1}},methods:{capitaliseFirstLetter:function(e){return e.charAt(0).toUpperCase()+e.slice(1)},getItemText:function(e){var t=this;if("skill"===this.type){var r=this.$store.state.skills.find((function(s){return s.code===t.item.code})).levels.find((function(r){return("string"==typeof e?Number.parseInt(t.item.level)-1:t.item.level-1).toString()===("string"==typeof r.level?Number.parseInt(r.level):r.level).toString()})).name.trim();if(r.includes(" - "))return r.split(" - ")[1];var n=r.split(/[\u2010-\u2015\u2212\uFE58-\uFE5F\uFF0D\uFF3F]/);return n[n.length-1]}return this.$store.state.capabilities.find((function(e){return e.subcode===t.item.code})).levels[e-1].name.split(" - ")[1]}}},m=r(17),component=Object(m.a)(f,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"comparison-cell py-4",class:{"border-b border-b-gray-200":e.item||e.emptyMessage,"lg:w-1/2 lg:px-8":!e.fullWidth}},[e.item?t("div",{staticClass:"flex items-start justify-between"},[t("button",{staticClass:"underline text-left flex-shrink",on:{click:function(t){return e.$emit("skillClicked",{skill:e.item.code,journey:e.journeyType})}}},[t("span",{},[e._v(e._s(e.item.name))])]),e._v(" "),t("div",{staticClass:"pl-4 flex flex-wrap gap-3 justify-end whitespace-no-wrap"},[[e.journeyType?t("information-badge",{attrs:{size:"xs",colour:e.journeyType.colour,tooltip:e.journeyType.tooltip}},[e._v("\n          "+e._s(e.journeyType.text)+"\n        ")]):e._e()],e._v(" "),t("skill-cap-info-badge",{attrs:{"is-skill":"skill"===e.type,"skill-code":e.item.code,level:e.item.level}})],2)]):t("div",{staticClass:"italic text-nsw-grey-600"},[e._v("\n    "+e._s(e.emptyMessage)+"\n  ")])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InformationBadge:r(486).default,SkillCapInfoBadge:r(489).default})}}]);