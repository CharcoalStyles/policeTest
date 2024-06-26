(window.webpackJsonp=window.webpackJsonp||[]).push([[1,9,22],{449:function(e,t,r){"use strict";r.r(t);var n=r(455),o={components:{Popper:r.n(n).a},props:{size:{type:String,default:"md"},colour:{type:String,default:"grey"},tooltip:{type:String,default:""},rounded:{type:String,default:"full"}},computed:{tooltipOptions:function(){return{placement:"bottom",modifiers:{offset:{offset:"0,5px"}}}},baseSize:function(){return"md"===this.size?"text-base":"text-sm"},iconSize:function(){return"md"===this.size?"h-4":"h-3"},badgeCursor:function(){return this.tooltip?"hover:cursor-pointer":"hover:cursor-default"},badgeBorder:function(){return"blue-outline"===this.colour?"border border-nsw-brand-primary-blue":""},badgeRounded:function(){switch(this.rounded){case"full":return"rounded-full";case"lg":return"rounded-lg";case"md":return"rounded-md";case"sm":return"rounded-sm";default:return""}},textColor:function(){return"blue-outline"===this.colour?"text-nsw-brand-primary-blue":"text-nsw-grey-800"},badgeColour:function(){switch(this.colour){case"blue-outline":return"bg-white";case"blue":return"bg-role-pill-blue";case"green":return"bg-role-pill-green";case"orange":return"bg-orange-200";case"grey":return"bg-slate-200";default:return"bg-".concat(this.colour)}}}},l=r(11),component=Object(l.a)(o,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-shrink-0"},[t("popper",{attrs:{trigger:"hover",options:e.tooltipOptions,disabled:!e.tooltip}},[t("div",{staticClass:"popper"},[e._v("\n      "+e._s(e.tooltip)+"\n    ")]),e._v(" "),t("div",{staticClass:"px-3 py-0.5 inline-flex items-center whitespace-no-wrap focus:outline-none",class:[e.baseSize,e.badgeColour,e.badgeCursor,e.badgeBorder,e.textColor,e.badgeRounded],attrs:{slot:"reference"},slot:"reference"},[e._t("default"),e._v(" "),e.tooltip?t("img",{staticClass:"ml-2",class:e.iconSize,attrs:{src:"/icons/help.svg",alt:"Help icon"}}):e._e()],2)])],1)}),[],!1,null,null,null);t.default=component.exports},450:function(e,t,r){"use strict";r.r(t);var n={props:{role:{type:Object,required:!0},showDefault:{type:Boolean,default:!1},size:{type:String,default:"sm"}},computed:{showDefaultIcon:function(){return this.showDefault&&!this.role.essential.aboriginality&&!this.role.essential.detective},textSize:function(){return"sm"===this.size?"text-sm":"text-base"}}},o=r(11),component=Object(o.a)(n,(function(){var e=this,t=e._self._c;return t("div",[e.role.essential.aboriginality?t("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[t("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-atsi.svg",alt:"Essential Requirements icon"}}),e._v(" "),t("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:e.textSize},[e._v("\n      Aboriginal or Torres Strait Islander Identified Role\n    ")])]):e._e(),e._v(" "),e.role.essential.detective?t("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[t("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-detective.svg",alt:"Essential Requirements icon"}}),e._v(" "),t("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:e.textSize},[e._v("\n      Designated Detective Role\n    ")])]):e._e(),e._v(" "),e.showDefaultIcon?t("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[t("img",{attrs:{src:"/icons/essential.svg",alt:"Essential Requirements icon"}}),e._v(" "),t("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:e.textSize},[e._v("\n      Essential Requirements\n    ")])]):e._e()])}),[],!1,null,null,null);t.default=component.exports},477:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));r(29),r(81),r(52),r(453),r(14),r(98);var n=function(area,e,t){return function(t){return t?area.map((function(r){var n=e.map((function(e){var n=e.key,o=e.weight||1;return r[n]&&"string"==typeof r[n]?t.split(" ").map((function(e){return r[n].toLowerCase().split(" ").filter((function(t){return t.includes(e.toLowerCase())})).length*o})).reduce((function(a,b){return a+b}),0):0})).reduce((function(a,b){return a+b}),0);return{item:r,rank:n}})).filter((function(e){return e.rank>0})).sort((function(a,b){return b.rank-a.rank})):area.map((function(e){return{item:e,rank:0}}))}}},499:function(e,t,r){var content=r(531);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(55).default)("3de6f4f0",content,!0,{sourceMap:!1})},530:function(e,t,r){"use strict";r(499)},531:function(e,t,r){var n=r(54)((function(i){return i[1]}));n.push([e.i,".nsw-form-input.roles-autosuggest[data-v-5b0f0dfe]:disabled{background-color:#fff!important;color:#000!important}ul[data-v-5b0f0dfe]{z-index:50!important}",""]),n.locals={},e.exports=n},544:function(e,t,r){"use strict";r.r(t);r(27),r(51),r(29),r(52),r(34),r(14),r(30),r(166),r(43),r(44),r(31),r(25);var n=r(100),o=r(17),l=(r(61),r(81),r(99),r(453),r(98),r(38)),c=r(498),d=r(449),f=r(477),v=r(450);function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var _={components:{Autocomplete:c.a,InformationBadge:d.default,EssentialRequirementsIcon:v.default},props:{step:{type:Object,required:!0}},data:function(){return{value:"",focussed:!1,filter:{sworn:"",jobFamily:"",jobFunction:""}}},computed:h(h({},Object(l.b)(["getRoleByCode","answers"])),{},{currentValue:function(){var e;return null===(e=this.$store.state.pathway.answers[this.step.id])||void 0===e?void 0:e.value},defaultNoRole:function(){return this.getRoleByCode(99)},defaultValue:function(){return this.currentValue?this.getRoleByCode(this.currentValue).name:""},isDisabled:function(){return Boolean(this.currentValue)||"current-role"===this.step.id&&""===this.filter.sworn},searchPlaceholder:function(){return"current-role"===this.step.id&&""===this.filter.sworn?"":"Start typing"},currentRole:function(){return!!this.answers.hasOwnProperty("current-role")&&this.getRoleByCode(this.answers["current-role"].value)},jobFamilies:function(){var e=this.$store.state.roles.reduce((function(e,t){return"Policing"===t.jobFamily||e.includes(t.jobFamily)||e.push(t.jobFamily),e}),[]);return"role"===this.step.id?e:"no"!==this.$store.state.pathway.answers.sworn.value?["Policing"].concat(Object(n.a)(e.sort())):e.sort()},jobFunctions:function(){var e=this;return this.$store.state.roles.filter((function(t){return!e.filter.jobFamily||t.jobFamily===e.filter.jobFamily})).reduce((function(e,t){return e.includes(t.jobFunction)||e.push(t.jobFunction),e}),[])},filteredRoles:function(){var e=this,t=this.$store.state.roles.filter((function(t){return!e.currentRole||t.id!==e.currentRole.id})).filter((function(t){if("current-role"===e.step.id&&""!==e.filter.sworn)switch(e.filter.sworn){case"yes":return"Policing"===t.jobFamily;case"no":return"Policing"!==t.jobFamily}return!0})).filter((function(t){if("goal-role"===e.step.id)switch(e.$store.state.pathway.answers.sworn.value){case"yes":return"Policing"===t.jobFamily;case"no":return"Policing"!==t.jobFamily}return!0})).filter((function(t){return"goal-role"!==e.step.id||""===e.filter.jobFamily||t.jobFamily===e.filter.jobFamily})).sort((function(a,b){var e=a.name.toUpperCase(),t=b.name.toUpperCase();return e<t?-1:e>t?1:0}));return t},showWorkArea:function(){return"goal-role"===this.step.id&&"yes"!==this.$store.state.pathway.answers.sworn.value}}),methods:{search:function(input){this.value=input;var e=Object(f.a)(this.filteredRoles,[{key:"name",weight:2},{key:"alias"},{key:"command_BusUnit"},{key:"jobFunction"},{key:"grade",weight:1.5}])(input).map((function(e){return e.item}));return 0===e.length?[]:e},getResultValue:function(e){return e.name},onSelectFunction:function(){""===this.filter.jobFamily&&(this.filter.jobFamily=this.filteredRoles[0].jobFamily)},selectRole:function(e){e&&e.id&&(this.$store.dispatch("saveQuestionAnswer",{id:this.step.id,value:e.id}),"current-role"===this.step.id&&(this.$store.dispatch("saveQuestionAnswer",{id:"isDetective",value:"Detective"===e.grade.split(" ")[0]?"yes":"no"}),this.$store.dispatch("saveQuestionAnswer",{id:"detective-roles",value:""}),this.$store.dispatch("saveQuestionAnswer",{id:"isPolice",value:"Policing"===e.jobFamily?"yes":"no"})))},clearRole:function(){this.$refs.autocomplete.value="",this.$store.dispatch("saveQuestionAnswer",{id:this.step.id,value:""}),"current-role"===this.step.id&&(this.$store.dispatch("saveQuestionAnswer",{id:"isDetective",value:""}),this.$store.dispatch("saveQuestionAnswer",{id:"isPolice",value:""}),this.$store.dispatch("saveQuestionAnswer",{id:"detective-roles",value:""}))},isRoleSelected:function(e){return this.currentValue===e.id},toggleFocus:function(){this.focussed=!this.focussed},aliasList:function(e){return!!e&&e.join(", ")}}},y=(r(530),r(11)),component=Object(y.a)(_,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"nsw-forms mb-80"},["current-role"===e.step.id?t("div",{staticClass:"mb-12"},[e._m(0),e._v(" "),e._m(1),e._v(" "),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.filter.sworn,expression:"filter.sworn"}],staticClass:"nsw-form-radio__input",attrs:{id:"sworn",value:"yes",type:"radio"},domProps:{checked:e._q(e.filter.sworn,"yes")},on:{change:function(t){return e.$set(e.filter,"sworn","yes")}}}),e._v(" "),e._m(2),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.filter.sworn,expression:"filter.sworn"}],staticClass:"nsw-form-radio__input",attrs:{id:"unsworn",value:"no",type:"radio"},domProps:{checked:e._q(e.filter.sworn,"no")},on:{change:function(t){return e.$set(e.filter,"sworn","no")}}}),e._v(" "),e._m(3)])]):e._e(),e._v(" "),e.showWorkArea?t("div",{staticClass:"mb-12"},[e._m(4),e._v(" "),e._m(5),e._v(" "),t("div",[t("select",{directives:[{name:"model",rawName:"v-model",value:e.filter.jobFamily,expression:"filter.jobFamily"}],staticClass:"nsw-form-select",attrs:{id:"sort",placeholder:"Select"},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.filter,"jobFamily",t.target.multiple?r:r[0])}}},[t("option",{attrs:{value:"",disabled:"",selected:""}},[e._v("Select")]),e._v(" "),e._l(e.jobFamilies,(function(r){return t("option",{key:r},[e._v("\n          "+e._s(r)+"\n        ")])}))],2)])]):e._e(),e._v(" "),e._m(6),e._v(" "),e._m(7),e._v(" "),t("div",{staticClass:"mb-1"},["current-role"===e.step.id?t("div",{staticClass:"text-base"},[e._v("\n      Search by keyword, e.g. General Duties Supervisor\n    ")]):t("div",{staticClass:"text-base"},[e._v("\n      Search by keyword, e.g. Highway Patrol Operative\n    ")])]),e._v(" "),t("autocomplete",{ref:"autocomplete",attrs:{search:e.search,"get-result-value":e.getResultValue,"default-value":e.defaultValue,placeholder:e.searchPlaceholder,"aria-label":"Search by keyword, e.g. Case Officer, Intelligence, Coordinator"},on:{submit:e.selectRole},scopedSlots:e._u([{key:"default",fn:function(r){var n=r.rootProps,o=r.inputProps,l=r.inputListeners,c=r.resultListProps,d=r.resultListListeners,f=r.results,v=r.resultProps;return[t("div",e._b({},"div",n,!1),[t("div",{staticClass:"relative"},[t("input",e._g(e._b({ref:"role",staticClass:"nsw-form-input roles-autosuggest placeholder-gray-700 disabled:text-black",attrs:{disabled:e.isDisabled},on:{focus:e.toggleFocus,blur:e.toggleFocus}},"input",o,!1),l)),e._v(" "),e.currentValue?t("div",{staticClass:"absolute top-0 bottom-0 right-0 flex justify-center pointer-events-none"},[t("button",{staticClass:"px-4 pointer-events-auto border-2 border-nsw-brand-primary-blue my-1 mr-1 font-semibold rounded",attrs:{"aria-label":"Clear selected role"},on:{click:e.clearRole}},[e._v("\n              Reset\n            ")])]):e._e()]),e._v(" "),f.length?t("ul",e._g(e._b({staticClass:"bg-white mt-2 rounded shadow-md overflow-y-scroll max-h-autosuggest"},"ul",c,!1),d),e._l(f,(function(r,n){return t("li",e._b({key:v[n].id,staticClass:"py-3 px-4 border-b border-nsw-grey-200 cursor-pointer hover:bg-nsw-grey-100",class:{"bg-nsw-grey-100":e.isRoleSelected(r)}},"li",v[n],!1),[t("div",{staticClass:"sm:flex justify-between"},[t("div",{staticClass:"flex flex-col mb-3"},[t("div",{staticClass:"font-bold sm:whitespace-no-wrap"},[e._v("\n                  "+e._s(r.name)+"\n                ")]),e._v(" "),t("div",{staticClass:"text-sm text-nsw-brand-primary-blue sm:whitespace-no-wrap"},[e._v("\n                  "+e._s(r.jobFunction)+"\n                ")]),e._v(" "),t("EssentialRequirementsIcon",{attrs:{role:r}})],1),e._v(" "),t("div",{staticClass:"flex flex-col items-end mb-2 sm:mb-1"},[r.grade?t("information-badge",{staticClass:"mb-2",attrs:{size:"xs",colour:"nsw-brand-primary-blue-light"}},[e._v("\n                  "+e._s(r.grade)+"\n                ")]):e._e(),e._v(" "),r.salary.min&&r.salary.max?t("information-badge",{staticClass:"mb-2",attrs:{size:"xs",colour:"nsw-brand-primary-blue-light"}},[e._v("\n                  Salary: "+e._s(e.$currency(r.salary.min))+" -\n                  "+e._s(e.$currency(r.salary.max))+"\n                ")]):e._e()],1)]),e._v(" "),t("p",{staticClass:"text-sm"},[e._v("\n              "+e._s(r.description)+"\n            ")]),e._v(" "),r.alias&&r.alias.length>0?t("div",{staticClass:"mt-3"},[t("p",{staticClass:"text-sm"},[e._v("\n                This role can also be known as:\n                "),t("span",{staticClass:"font-bold"},[e._v(e._s(e.aliasList(r.alias)))])])]):e._e()])})),0):e._e()])]}}])})],1)}),[function(){var e=this._self._c;return e("div",{staticClass:"text-2xl font-bold mb-4"},[e("p",[this._v("Is your current role in Policing or Administration?")])])},function(){var e=this._self._c;return e("div",{staticClass:"mb-1"},[e("div",{staticClass:"text-base font-bold"},[this._v("Select one")])])},function(){var e=this,t=e._self._c;return t("label",{staticClass:"nsw-form-radio__label",attrs:{for:"sworn"}},[t("p",[e._v("Policing")]),e._v(" "),t("p",{staticClass:"text-xs text-nsw-brand-grey-primary"},[e._v("\n          (including student police officers)\n        ")])])},function(){var e=this,t=e._self._c;return t("label",{staticClass:"nsw-form-radio__label",attrs:{for:"unsworn"}},[t("p",[e._v("Administrative")]),e._v(" "),t("p",{staticClass:"text-xs text-nsw-brand-grey-primary"},[e._v("\n          (including Special Constables)\n        ")])])},function(){var e=this._self._c;return e("div",{staticClass:"text-2xl font-bold mb-4"},[e("p",[this._v("Select the relevant work area")])])},function(){var e=this._self._c;return e("div",{staticClass:"mb-1"},[e("div",{staticClass:"text-base font-bold"},[this._v("Select from the list below")])])},function(){var e=this._self._c;return e("div",{staticClass:"text-2xl font-bold mb-4"},[e("p",[this._v("Search and select your role")])])},function(){var e=this._self._c;return e("div",{staticClass:"mb-1"},[e("div",{staticClass:"text-base font-bold"},[this._v("\n      Start typing your job title, then select from the list\n    ")])])}],!1,null,"5b0f0dfe",null);t.default=component.exports;installComponents(component,{EssentialRequirementsIcon:r(450).default,InformationBadge:r(449).default})}}]);