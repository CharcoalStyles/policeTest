(window.webpackJsonp=window.webpackJsonp||[]).push([[51,20],{458:function(e,t,r){"use strict";r.r(t);var o=r(461),l={components:{Popper:r.n(o).a},props:{size:{type:String,default:"md"},colour:{type:String,default:"grey"},tooltip:{type:String,default:""}},computed:{tooltipOptions:function(){return{placement:"bottom",modifiers:{offset:{offset:"0,5px"}}}},baseSize:function(){return"md"===this.size?"text-base":"text-sm"},iconSize:function(){return"md"===this.size?"h-4":"h-3"},badgeCursor:function(){return this.tooltip?"hover:cursor-pointer":"hover:cursor-default"},badgeBorder:function(){return"blue-outline"===this.colour?"border border-nsw-brand-primary-blue":""},textColor:function(){return"blue-outline"===this.colour?"text-nsw-brand-primary-blue":"text-nsw-grey-800"},badgeColour:function(){switch(this.colour){case"blue-outline":return"bg-white";case"blue":return"bg-role-pill-blue";case"green":return"bg-role-pill-green";case"orange":return"bg-orange-200";case"gray":return"bg-nsw-grey-100";default:return"bg-".concat(this.colour)}}}},n=r(16),component=Object(n.a)(l,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-shrink-0"},[t("popper",{attrs:{trigger:"hover",options:e.tooltipOptions,disabled:!e.tooltip}},[t("div",{staticClass:"popper"},[e._v("\n      "+e._s(e.tooltip)+"\n    ")]),e._v(" "),t("div",{staticClass:"px-3 py-0.5 inline-flex items-center rounded-full whitespace-no-wrap focus:outline-none",class:[e.baseSize,e.badgeColour,e.badgeCursor,e.badgeBorder,e.textColor],attrs:{slot:"reference"},slot:"reference"},[e._t("default"),e._v(" "),e.tooltip?t("img",{staticClass:"ml-2",class:e.iconSize,attrs:{src:"/icons/help.svg",alt:"Help icon"}}):e._e()],2)])],1)}),[],!1,null,null,null);t.default=component.exports},471:function(e,t,r){"use strict";r.r(t);r(35);var o={components:{InformationBadge:r(458).default},props:{role:{type:Object,required:!0},clickable:{type:Boolean,default:!1},zoomable:{type:Boolean,default:!1}},computed:{clickableClasses:function(){return this.clickable?"border border-nsw-brand-grey-light hover:border-nsw-brand-grey-primary hover:shadow-xl transition transform-all duration-200 cursor-pointer":null},zoomToClass:function(){return this.zoomable?"role-".concat(this.role.id):null}}},l=r(16),component=Object(l.a)(o,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"border border-nsw-grey-200 relative bg-white shadow-lg rounded-md p-5 flex-shrink-0 float-left",class:[e.clickableClasses,e.zoomToClass]},[t("div",{staticClass:"flex flex-col"},[t("div",{staticClass:"flex items-center justify-between mb-2"},[t("div",{staticClass:"font-semibold text-grey-primary text-sm"},[e._v("\n        Grade "+e._s(e.role.grade)+"\n      ")]),e._v(" "),e.role.manager?t("information-badge",{staticClass:"ml-6",attrs:{size:"xs"}},[e._v("\n        Manager role\n      ")]):e._e()],1),e._v(" "),t("div",{staticClass:"mb-2 text-nsw-gray-800 text-sm"},[e._v("\n      Salary: "+e._s(e.$currency(e.role.salary.min))+" - "+e._s(e.$currency(e.role.salary.max))+"\n    ")]),e._v(" "),t("div",{staticClass:"flex items-center"},[t("div",{staticClass:"flex-grow font-bold text-nsw-blue-800"},[e._v("\n        "+e._s(e.role.name)+"\n      ")]),e._v(" "),e.clickable?t("div",{staticClass:"flex-shrink ml-6"},[t("img",{staticClass:"h-4",attrs:{src:"/arrow.svg",alt:"Arrow icon"}})]):e._e()])])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InformationBadge:r(458).default})}}]);