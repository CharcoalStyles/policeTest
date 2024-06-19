(window.webpackJsonp=window.webpackJsonp||[]).push([[53,9,22,54],{458:function(e,t,r){"use strict";r.r(t);var n=r(462),l={components:{Popper:r.n(n).a},props:{size:{type:String,default:"md"},colour:{type:String,default:"grey"},tooltip:{type:String,default:""},rounded:{type:String,default:"full"}},computed:{tooltipOptions:function(){return{placement:"bottom",modifiers:{offset:{offset:"0,5px"}}}},baseSize:function(){return"md"===this.size?"text-base":"text-sm"},iconSize:function(){return"md"===this.size?"h-4":"h-3"},badgeCursor:function(){return this.tooltip?"hover:cursor-pointer":"hover:cursor-default"},badgeBorder:function(){return"blue-outline"===this.colour?"border border-nsw-brand-primary-blue":""},badgeRounded:function(){switch(this.rounded){case"full":return"rounded-full";case"lg":return"rounded-lg";case"md":return"rounded-md";case"sm":return"rounded-sm";default:return""}},textColor:function(){return"blue-outline"===this.colour?"text-nsw-brand-primary-blue":"text-nsw-grey-800"},badgeColour:function(){switch(this.colour){case"blue-outline":return"bg-white";case"blue":return"bg-role-pill-blue";case"green":return"bg-role-pill-green";case"orange":return"bg-orange-200";case"grey":return"bg-slate-200";default:return"bg-".concat(this.colour)}}}},o=r(16),component=Object(o.a)(l,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-shrink-0"},[t("popper",{attrs:{trigger:"hover",options:e.tooltipOptions,disabled:!e.tooltip}},[t("div",{staticClass:"popper"},[e._v("\n      "+e._s(e.tooltip)+"\n    ")]),e._v(" "),t("div",{staticClass:"px-3 py-0.5 inline-flex items-center whitespace-no-wrap focus:outline-none",class:[e.baseSize,e.badgeColour,e.badgeCursor,e.badgeBorder,e.textColor,e.badgeRounded],attrs:{slot:"reference"},slot:"reference"},[e._t("default"),e._v(" "),e.tooltip?t("img",{staticClass:"ml-2",class:e.iconSize,attrs:{src:"/icons/help.svg",alt:"Help icon"}}):e._e()],2)])],1)}),[],!1,null,null,null);t.default=component.exports},459:function(e,t,r){"use strict";r.r(t);var n={props:{role:{type:Object,required:!0},showDefault:{type:Boolean,default:!1},size:{type:String,default:"sm"}},computed:{showDefaultIcon:function(){return this.showDefault&&!this.role.essential.aboriginality&&!this.role.essential.detective},textSize:function(){return"sm"===this.size?"text-sm":"text-base"}}},l=r(16),component=Object(l.a)(n,(function(){var e=this,t=e._self._c;return t("div",[e.role.essential.aboriginality?t("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[t("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-atsi.svg",alt:"Essential Requirements icon"}}),e._v(" "),t("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:e.textSize},[e._v("\n      Aboriginal or Torres Strait Islander Identified Role\n    ")])]):e._e(),e._v(" "),e.role.essential.detective?t("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[t("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-detective.svg",alt:"Essential Requirements icon"}}),e._v(" "),t("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:e.textSize},[e._v("\n      Designated Detective Role\n    ")])]):e._e(),e._v(" "),e.showDefaultIcon?t("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[t("img",{attrs:{src:"/icons/essential.svg",alt:"Essential Requirements icon"}}),e._v(" "),t("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:e.textSize},[e._v("\n      Essential Requirements\n    ")])]):e._e()])}),[],!1,null,null,null);t.default=component.exports},461:function(e,t,r){"use strict";var n=r(2),l=r(4),o=r(46),c=r(32),d=r(56),f=r(252),m=r(12),v=r(3),h=r(253),y=r(166),x=r(465),C=r(466),_=r(102),k=r(467),w=[],S=l(w.sort),F=l(w.push),$=v((function(){w.sort(void 0)})),z=v((function(){w.sort(null)})),B=y("sort"),R=!v((function(){if(_)return _<70;if(!(x&&x>3)){if(C)return!0;if(k)return k<603;var code,e,t,r,n="";for(code=65;code<76;code++){switch(e=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:t=3;break;case 68:case 71:t=4;break;default:t=2}for(r=0;r<47;r++)w.push({k:e+r,v:t})}for(w.sort((function(a,b){return b.v-a.v})),r=0;r<w.length;r++)e=w[r].k.charAt(0),n.charAt(n.length-1)!==e&&(n+=e);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:$||!z||!B||!R},{sort:function(e){void 0!==e&&o(e);var t=c(this);if(R)return void 0===e?S(t):S(t,e);var r,n,l=[],v=d(t);for(n=0;n<v;n++)n in t&&F(l,t[n]);for(h(l,function(e){return function(t,r){return void 0===r?-1:void 0===t?1:void 0!==e?+e(t,r)||0:m(t)>m(r)?1:-1}}(e)),r=d(l),n=0;n<r;)t[n]=l[n++];for(;n<v;)f(t,n++);return t}})},465:function(e,t,r){"use strict";var n=r(83).match(/firefox\/(\d+)/i);e.exports=!!n&&+n[1]},466:function(e,t,r){"use strict";var n=r(83);e.exports=/MSIE|Trident/.test(n)},467:function(e,t,r){"use strict";var n=r(83).match(/AppleWebKit\/(\d+)\./);e.exports=!!n&&+n[1]},471:function(e,t,r){"use strict";r.r(t);r(34);var n=r(458),l=r(459),o={components:{InformationBadge:n.default,EssentialRequirementsIcon:l.default},props:{role:{type:Object,required:!0},clickable:{type:Boolean,default:!1},zoomable:{type:Boolean,default:!1},selected:{type:Boolean,default:!1}},computed:{clickableClasses:function(){return this.clickable?"hover:shadow-xl transition transform-all duration-200 cursor-pointer":null},zoomToClass:function(){return this.zoomable?"role-".concat(this.role.id):null},selectedClass:function(){return this.selected?"border-2 border-amber-300":null}}},c=r(16),component=Object(c.a)(o,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"w-60 my-3 border border-nsw-grey-800 relative bg-white rounded-lg px-4 py-3",class:[e.clickableClasses,e.zoomToClass,e.selectedClass]},[t("div",{staticClass:"flex flex-col"},[t("div",{staticClass:"flex flex-col mb-2 text-grey-primary text-xs"},[t("p",{},[e._v("\n        "+e._s(e.role.grade)+"\n      ")]),e._v(" "),t("p",[e._v("\n        Salary: "+e._s(e.$currency(e.role.salary.min))+" -\n        "+e._s(e.$currency(e.role.salary.max))+"\n      ")])]),e._v(" "),t("div",{staticClass:"flex-grow text-sm font-bold text-nsw-blue-800"},[e._v("\n      "+e._s(e.role.name)+"\n    ")]),e._v(" "),t("EssentialRequirementsIcon",{attrs:{role:e.role}})],1)])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{EssentialRequirementsIcon:r(459).default})},483:function(e){e.exports=JSON.parse('[{"function":"Procurement and Contract Management","light":"#EBF8FF","dark":"#BEE3F8"}]')},495:function(e,t,r){"use strict";r.r(t);r(100),r(53),r(34);var n=r(101),l=(r(62),r(29),r(82),r(461),r(255),r(161),r(13),r(98),r(126),r(250),r(35),r(483)),o={components:{RolePanel:r(471).default},props:{zoom:{type:Number,required:!0},roles:{type:Array,required:!0},index:{type:Number,required:!0},roleFunction:{type:Object,required:!0},familyName:{type:String,required:!0},useSalary:{type:Boolean,required:!0},selectedRole:{type:Object,default:null}},data:function(){return{colours:l,axisKeys:{x:"command_BusUnit",y:"grade"},yAxisSalaryOverride:!1}},computed:{zoomedOut:function(){return this.zoom<=.15},columns:function(){var e=this,t=this.roleFunction.roles.reduce((function(t,r){return t.includes(r[e.axisKeys.x].trim())||t.push(r[e.axisKeys.x].trim()),t}),[]);return t},rows:function(){var e=this;if(!this.useSalary){var t=this.roleFunction.roles.reduce((function(t,r){return t.includes(r[e.axisKeys.y])||t.push(r[e.axisKeys.y]),t}),[]);if("Policing"===this.familyName){if("Investigations"===this.roleFunction.name){return{labels:["Detective Superintendent","Detective Inspector","Inspector","Detective Senior Sergeant","Detective Sergeant","Detective Senior Constable","Detective Constable / Detective Senior Constable","Detective Constable"],key:"grade"}}return{labels:["Superintendent","Inspector","Senior Sergeant","Sergeant","Senior Constable","Constable / Senior Constable","Constable","Clerk 1/2"],key:"grade"}}if(0===t.filter((function(e){return!e.startsWith("Clerk")})).length)return{labels:this.roleFunction.roles.reduce((function(e,t){return t.grade.startsWith("Clerk")&&!e.includes(t.grade)&&e.push(t.grade),e}),[]).reduce((function(e,t){return e.includes(t)?e:[].concat(Object(n.a)(e),[t])}),[]).sort((function(a,b){var e=a.split(" ")[1].split("/")[0];return b.split(" ")[1].split("/")[0]-e})),key:"grade"}}return{labels:["$185k +","$151k - $184k","$121k - $150k","$101k - $120k","< $100k"],key:"salary"}}},methods:{getRolesByAxis:function(e,t){for(var r=this,n=this.roleFunction.roles.filter((function(e){if(r.useSalary){var n=["$185k +","$151k - $184k","$121k - $150k","$101k - $120k","< $100k"].indexOf(t);return e.salary.max<101e3?4===n:e.salary.max<121e3?3===n:e.salary.max<151e3?2===n:e.salary.max<185e3?1===n:0===n}return e.grade===t})).filter((function(t){return t[r.axisKeys.x].trim()===e})),l=[];n.length>0;){var o=n.splice(0,5);l.push(o)}return l},groupRolesByFamilyRole:function(e){var t=this;return this.$collect(e).groupBy("jobFunction").keys().map((function(r){return{name:r,roles:t.$collect(e).where("jobFunction",r).all()}})).sort((function(a,b){return t.roleFunctionOrder.indexOf(a.name)-t.roleFunctionOrder.indexOf(b.name)}))},getBgColour:function(e){switch(e){case"light":return"background-color: #F0F5FB";case"dark":return"background-color: #E4EBF6";default:return"background-color: #FFFAF0"}},rolesInGrade:function(e,t){return this.$collect(e).where("grade",t).all()}}},c=r(16),component=Object(c.a)(o,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"mx-3 my-3 rounded-3xl overflow-visible"},[t("div",{staticClass:"w-max bg-nsw-brand-primary-blue-light rounded-t-3xl"},[t("div",{staticClass:"w-full border-b-4 border-white"},[t("div",{staticClass:"sticky w-fit left-0 px-4 py-6 ml-4 flex flex-col"},[t("h2",{staticClass:"sticky font-bold text-xl"},[e._v("\n          "+e._s(e.familyName)+"\n        ")]),e._v(" "),t("h3",{staticClass:"font-bold"},[e._v("\n          "+e._s(e.roleFunction.name)+"\n        ")])])]),e._v(" "),t("table",{staticClass:"w-full"},[t("tr",{staticClass:"bg-nsw-grey-200"},[t("th",{staticClass:"pl-12 text-left h-12 border-b-4 border-white"},[e._v("\n          "+e._s(e.useSalary?"Salary":"Rank")+"\n        ")]),e._v(" "),e._l(e.columns,(function(r){return t("th",{key:r,staticClass:"pr-8 h-max border-b-4 border-white"},[t("p",{staticClass:"sticky max-w-60 left-0"},[e._v(e._s(r))])])}))],2),e._v(" "),e._l(e.rows.labels,(function(r,n){return t("tr",{key:r.label,staticClass:"border-0 h-max",style:n%2==0?e.getBgColour("dark"):e.getBgColour("light")},[t("td",{staticClass:"pl-12 w-52 items-center text-sm font-bold"},[e._v("\n          "+e._s(r)+"\n        ")]),e._v(" "),e._l(e.columns,(function(n){return t("td",{key:n,staticClass:"p-0"},[t("transition-group",{staticClass:"whitespace-no-wrap min-h-28 h-full flex flex-col gap-2 mr-16",attrs:{name:"list",tag:"div"}},e._l(e.getRolesByAxis(n,r),(function(r){return t("div",{key:r.map((function(e){return e.name})).join("-"),staticClass:"flex flex-row gap-2 items-start h-full"},e._l(r,(function(r){return t("role-panel",{key:r.id,attrs:{role:r,selected:e.selectedRole&&e.selectedRole.id===r.id,clickable:"",zoomable:""},nativeOn:{click:function(t){return e.$emit("selected",r)}}})})),1)})),0)],1)}))],2)}))],2)])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{RolePanel:r(471).default})}}]);