(window.webpackJsonp=window.webpackJsonp||[]).push([[46,10,23],{458:function(e,t,r){"use strict";r.r(t);var n=r(462),l={components:{Popper:r.n(n).a},props:{size:{type:String,default:"md"},colour:{type:String,default:"grey"},tooltip:{type:String,default:""},rounded:{type:String,default:"full"}},computed:{tooltipOptions:function(){return{placement:"bottom",modifiers:{offset:{offset:"0,5px"}}}},baseSize:function(){return"md"===this.size?"text-base":"text-sm"},iconSize:function(){return"md"===this.size?"h-4":"h-3"},badgeCursor:function(){return this.tooltip?"hover:cursor-pointer":"hover:cursor-default"},badgeBorder:function(){return"blue-outline"===this.colour?"border border-nsw-brand-primary-blue":""},badgeRounded:function(){switch(this.rounded){case"full":return"rounded-full";case"lg":return"rounded-lg";case"md":return"rounded-md";case"sm":return"rounded-sm";default:return""}},textColor:function(){return"blue-outline"===this.colour?"text-nsw-brand-primary-blue":"text-nsw-grey-800"},badgeColour:function(){switch(this.colour){case"blue-outline":return"bg-white";case"blue":return"bg-role-pill-blue";case"green":return"bg-role-pill-green";case"orange":return"bg-orange-200";case"grey":return"bg-slate-200";default:return"bg-".concat(this.colour)}}}},o=r(16),component=Object(o.a)(l,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-shrink-0"},[t("popper",{attrs:{trigger:"hover",options:e.tooltipOptions,disabled:!e.tooltip}},[t("div",{staticClass:"popper"},[e._v("\n      "+e._s(e.tooltip)+"\n    ")]),e._v(" "),t("div",{staticClass:"px-3 py-0.5 inline-flex items-center whitespace-no-wrap focus:outline-none",class:[e.baseSize,e.badgeColour,e.badgeCursor,e.badgeBorder,e.textColor,e.badgeRounded],attrs:{slot:"reference"},slot:"reference"},[e._t("default"),e._v(" "),e.tooltip?t("img",{staticClass:"ml-2",class:e.iconSize,attrs:{src:"/icons/help.svg",alt:"Help icon"}}):e._e()],2)])],1)}),[],!1,null,null,null);t.default=component.exports},459:function(e,t,r){"use strict";r.r(t);var n={props:{role:{type:Object,required:!0},showDefault:{type:Boolean,default:!1},size:{type:String,default:"sm"}},computed:{showDefaultIcon:function(){return this.showDefault&&!this.role.essential.aboriginality&&!this.role.essential.detective},textSize:function(){return"sm"===this.size?"text-sm":"text-base"}}},l=r(16),component=Object(l.a)(n,(function(){var e=this,t=e._self._c;return t("div",[e.role.essential.aboriginality?t("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[t("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-atsi.svg",alt:"Essential Requirements icon"}}),e._v(" "),t("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:e.textSize},[e._v("\n      Aboriginal or Torres Strait Islander Identified Role\n    ")])]):e._e(),e._v(" "),e.role.essential.detective?t("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[t("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-detective.svg",alt:"Essential Requirements icon"}}),e._v(" "),t("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:e.textSize},[e._v("\n      Designated Detective Role\n    ")])]):e._e(),e._v(" "),e.showDefaultIcon?t("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[t("img",{attrs:{src:"/icons/essential.svg",alt:"Essential Requirements icon"}}),e._v(" "),t("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:e.textSize},[e._v("\n      Essential Requirements\n    ")])]):e._e()])}),[],!1,null,null,null);t.default=component.exports},473:function(e,t,r){var content=r(484);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(55).default)("3d5fe4e5",content,!0,{sourceMap:!1})},483:function(e,t,r){"use strict";r(473)},484:function(e,t,r){var n=r(54)((function(i){return i[1]}));n.push([e.i,'@media print{.fold-links[data-v-52b7dd72]:after{content:"(" attr(href) ")";word-break:break-all}}',""]),n.locals={},e.exports=n},511:function(e,t,r){"use strict";r.r(t);r(27),r(52),r(34),r(29),r(53),r(13),r(250);var n=r(458),l=r(459),o={components:{InformationBadge:n.default,EssentialRequirementsIcon:l.default},props:{role:{type:Object,required:!0},roles:{type:Array,required:!0},type:{type:String,default:"current"}},computed:{pillColour:function(){return"current"===this.type?"nsw-brand-primary-blue-light":"green"},essentialRequirements:function(){return this.role.essentialRequirements?this.role.essentialRequirements.split("•").filter((function(e){return""!==e})).map((function(e){return e.trim()})):""}}},c=(r(483),r(16)),component=Object(c.a)(o,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"p-4 lg:p-8"},[t("information-badge",{staticClass:"mb-4 font-bold",attrs:{colour:e.pillColour,rounded:"md"}},[t("p",{staticClass:"px-2"},[e._v("Your "+e._s(e.type)+" role")])]),e._v(" "),t("h3",{staticClass:"font-bold text-xl mb-4"},[e._v("\n    "+e._s(e.role.name)+"\n  ")]),e._v(" "),t("div",{staticClass:"flex flex-col flex-wrap gap-3 lg:flex-row mb-6"},[e.role.grade?t("information-badge",{staticClass:"rounded-full",attrs:{size:"sm"}},[e._v("\n      "+e._s(e.role.grade)+"\n    ")]):e._e(),e._v(" "),e.role.salary.min&&e.role.salary.max?t("information-badge",{staticClass:"rounded-full",attrs:{size:"sm"}},[e._v("\n      "+e._s(e.$currency(e.role.salary.min))+" -\n      "+e._s(e.$currency(e.role.salary.max))+"\n    ")]):e._e(),e._v(" "),e.role.manager?t("information-badge",{staticClass:"rounded-full",attrs:{size:"sm"}},[e._v("\n      Manager role\n    ")]):e._e(),e._v(" "),e.role.numPositions?t("information-badge",{staticClass:"rounded-full",attrs:{size:"sm"}},[e._v("\n      "+e._s(e.role.numPositions)+" positions\n    ")]):e._e(),e._v(" "),e.role.location&&"Various"!==e.role.location?t("information-badge",{staticClass:"rounded-full",attrs:{size:"sm"}},[e._v("\n      "+e._s(e.role.location)+"\n    ")]):e._e()],1),e._v(" "),t("p",{staticClass:"w-full lg:w-5/6 mb-6"},[e._v("\n    "+e._s(e.role.description)+"\n  ")]),e._v(" "),t("div",{staticClass:"w-fit"},[t("a",{staticClass:"flex flex-row flex-wrap gap-1 underline text-sm text-nsw-brand-primary-blue mb-6 fold-links",attrs:{href:e.role.fullDescription}},[t("img",{attrs:{src:"/icons/pages.svg",alt:"Link icon"}}),e._v(" "),t("p",[e._v("Role Description")]),e._v(" "),t("div",{staticClass:"basis-full h-0"})])]),e._v(" "),t("div",{staticClass:"mb-4"},[t("essential-requirements-icon",{attrs:{role:e.role,size:"lg"}})],1),e._v(" "),""!=e.essentialRequirements?t("div",[e._m(0),e._v(" "),t("ul",{staticClass:"list-disc ml-5"},e._l(e.essentialRequirements,(function(r){return t("li",{key:r,staticClass:"text-sm mb-2"},[e._v("\n        "+e._s(r)+"\n      ")])})),0)]):e._e()],1)}),[function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex flex-row gap-2 mb-2"},[t("img",{attrs:{src:"/icons/essential.svg",alt:"Link icon"}}),e._v(" "),t("p",{staticClass:"font-bold text-nsw-brand-primary-blue"},[e._v("\n        Essential Requirements\n      ")])])}],!1,null,"52b7dd72",null);t.default=component.exports;installComponents(component,{InformationBadge:r(458).default,EssentialRequirementsIcon:r(459).default})}}]);