(window.webpackJsonp=window.webpackJsonp||[]).push([[42,20],{461:function(e,t,r){"use strict";r.r(t);var o=r(464),n={components:{Popper:r.n(o).a},props:{size:{type:String,default:"md"},colour:{type:String,default:"grey"},tooltip:{type:String,default:""}},computed:{tooltipOptions:function(){return{placement:"bottom",modifiers:{offset:{offset:"0,5px"}}}},baseSize:function(){return"md"===this.size?"text-base":"text-sm"},iconSize:function(){return"md"===this.size?"h-4":"h-3"},badgeCursor:function(){return this.tooltip?"hover:cursor-pointer":"hover:cursor-default"},badgeBorder:function(){return"blue-outline"===this.colour?"border border-nsw-brand-primary-blue":""},textColor:function(){return"blue-outline"===this.colour?"text-nsw-brand-primary-blue":"text-nsw-grey-800"},badgeColour:function(){switch(this.colour){case"blue-outline":return"bg-white";case"blue":return"bg-role-pill-blue";case"green":return"bg-role-pill-green";case"orange":return"bg-orange-200";case"gray":return"bg-nsw-grey-100";default:return"bg-gray-200"}}}},l=r(16),component=Object(l.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-shrink-0"},[t("popper",{attrs:{trigger:"hover",options:e.tooltipOptions,disabled:!e.tooltip}},[t("div",{staticClass:"popper"},[e._v("\n      "+e._s(e.tooltip)+"\n    ")]),e._v(" "),t("div",{staticClass:"px-3 py-0.5 inline-flex items-center rounded-full whitespace-no-wrap focus:outline-none",class:[e.baseSize,e.badgeColour,e.badgeCursor,e.badgeBorder,e.textColor],attrs:{slot:"reference"},slot:"reference"},[e._t("default"),e._v(" "),e.tooltip?t("img",{staticClass:"ml-2",class:e.iconSize,attrs:{src:"/icons/help.svg",alt:"Help icon"}}):e._e()],2)])],1)}),[],!1,null,null,null);t.default=component.exports},510:function(e,t,r){"use strict";r.r(t);r(28),r(52),r(35);var o={components:{InformationBadge:r(461).default},props:{role:{type:Object,required:!0},roles:{type:Array,required:!0},type:{type:String,default:"current"}},computed:{pillColour:function(){return"current"===this.type?"blue":"green"}}},n=r(16),component=Object(n.a)(o,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"p-4 lg:p-8"},[t("information-badge",{staticClass:"mb-6 rounded-lg",attrs:{colour:e.pillColour}},[e._v("\n    Your "+e._s(e.type)+" role\n  ")]),e._v(" "),t("h3",{staticClass:"font-bold text-xl mb-4"},[e._v("\n    "+e._s(e.role.name)+"\n  ")]),e._v(" "),99!==e.role.id?t("p",{staticClass:"w-full lg:w-5/6 mb-6"},[e._v("\n    "+e._s(e.role.description)+"\n  ")]):e._e(),e._v(" "),t("div",{staticClass:"flex flex-col lg:flex-row"},[e.role.grade?t("information-badge",{staticClass:"mb-2 sm:mb-6 rounded-full mr-3",attrs:{size:"sm"}},[e._v("\n      Grade: "+e._s(e.role.grade)+"\n    ")]):e._e(),e._v(" "),e.role.salary.min&&e.role.salary.max?t("information-badge",{staticClass:"mb-2 sm:mb-6 rounded-full mr-3",attrs:{size:"sm",tooltip:"Salaries are indicative only. Check the job ad when applying for a role."}},[e._v("\n      Salary: "+e._s(e.$currency(e.role.salary.min))+" - "+e._s(e.$currency(e.role.salary.max))+"\n    ")]):e._e(),e._v(" "),e.role.manager?t("information-badge",{staticClass:"mb-2 sm:mb-6 rounded-full",attrs:{size:"sm"}},[e._v("\n      Manager role\n    ")]):e._e()],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{InformationBadge:r(461).default})}}]);