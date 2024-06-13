(window.webpackJsonp=window.webpackJsonp||[]).push([[32,21],{458:function(t,e,r){"use strict";r.r(e);var n=r(461),o={components:{Popper:r.n(n).a},props:{size:{type:String,default:"md"},colour:{type:String,default:"grey"},tooltip:{type:String,default:""},rounded:{type:String,default:"full"}},computed:{tooltipOptions:function(){return{placement:"bottom",modifiers:{offset:{offset:"0,5px"}}}},baseSize:function(){return"md"===this.size?"text-base":"text-sm"},iconSize:function(){return"md"===this.size?"h-4":"h-3"},badgeCursor:function(){return this.tooltip?"hover:cursor-pointer":"hover:cursor-default"},badgeBorder:function(){return"blue-outline"===this.colour?"border border-nsw-brand-primary-blue":""},badgeRounded:function(){switch(this.rounded){case"full":return"rounded-full";case"lg":return"rounded-lg";case"md":return"rounded-md";case"sm":return"rounded-sm";default:return""}},textColor:function(){return"blue-outline"===this.colour?"text-nsw-brand-primary-blue":"text-nsw-grey-800"},badgeColour:function(){switch(this.colour){case"blue-outline":return"bg-white";case"blue":return"bg-role-pill-blue";case"green":return"bg-role-pill-green";case"orange":return"bg-orange-200";case"grey":return"bg-slate-200";default:return"bg-".concat(this.colour)}}}},l=r(16),component=Object(l.a)(o,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"flex-shrink-0"},[e("popper",{attrs:{trigger:"hover",options:t.tooltipOptions,disabled:!t.tooltip}},[e("div",{staticClass:"popper"},[t._v("\n      "+t._s(t.tooltip)+"\n    ")]),t._v(" "),e("div",{staticClass:"px-3 py-0.5 inline-flex items-center whitespace-no-wrap focus:outline-none",class:[t.baseSize,t.badgeColour,t.badgeCursor,t.badgeBorder,t.textColor,t.badgeRounded],attrs:{slot:"reference"},slot:"reference"},[t._t("default"),t._v(" "),t.tooltip?e("img",{staticClass:"ml-2",class:t.iconSize,attrs:{src:"/icons/help.svg",alt:"Help icon"}}):t._e()],2)])],1)}),[],!1,null,null,null);e.default=component.exports},474:function(t,e,r){var content=r(485);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(63).default)("4e6a177e",content,!0,{sourceMap:!1})},484:function(t,e,r){"use strict";r(474)},485:function(t,e,r){var n=r(62)((function(i){return i[1]}));n.push([t.i,".nsw-form-input.roles-autosuggest[data-v-5e9abe8a]:disabled{background-color:#fff!important;color:#000!important}ul[data-v-5e9abe8a]{z-index:50!important}",""]),n.locals={},t.exports=n},516:function(t,e,r){"use strict";r.r(e);r(27),r(52),r(29),r(53),r(35),r(13),r(31),r(165),r(43),r(44),r(30),r(25);var n=r(102),o=r(17),l=(r(60),r(82),r(101),r(462),r(98),r(38)),c=r(478),d=r(499),f=r(458);function v(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function m(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?v(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var h={components:{Autocomplete:d.a,InformationBadge:f.default},props:{step:{type:Object,required:!0}},data:function(){return{value:"",focussed:!1,filter:{jobFamily:"",jobFunction:""}}},computed:m(m({},Object(l.b)(["getRoleByCode","answers"])),{},{currentValue:function(){var t;return null===(t=this.$store.state.pathway.answers[this.step.id])||void 0===t?void 0:t.value},defaultNoRole:function(){return this.getRoleByCode(99)},defaultValue:function(){return this.currentValue?this.getRoleByCode(this.currentValue).name:""},isDisabled:function(){return Boolean(this.currentValue)},currentRole:function(){return!!this.answers.hasOwnProperty("current-role")&&this.getRoleByCode(this.answers["current-role"].value)},jobFamilies:function(){var t=this.$store.state.roles.reduce((function(t,e){return t.includes(e.jobFamily)||t.push(e.jobFamily),t}),[]);return["Policing"].concat(Object(n.a)(t.sort()))},jobFunctions:function(){var t=this;return this.$store.state.roles.filter((function(e){return!t.filter.jobFamily||e.jobFamily===t.filter.jobFamily})).reduce((function(t,e){return t.includes(e.jobFunction)||t.push(e.jobFunction),t}),[])},filteredRoles:function(){var t=this;return this.$collect(this.$store.state.roles).filter((function(e){return(!t.currentRole||e.id!==t.currentRole.id)&&(""!==t.filter.jobFunction?e.jobFunction===t.filter.jobFunction:""===t.filter.jobFamily||e.jobFamily===t.filter.jobFamily)})).sort((function(a,b){var t=a.name.toUpperCase(),e=b.name.toUpperCase();return t<e?-1:t>e?1:0})).all()}}),methods:{search:function(input){this.value=input;var t=new c.a(this.filteredRoles,["name","alias"],{sort:!0}).search(input);return 0===t.length?[this.defaultNoRole]:t},getResultValue:function(t){return t.name},onSelectFunction:function(){""===this.filter.jobFamily&&(this.filter.jobFamily=this.filteredRoles[0].jobFamily)},selectRole:function(t){t&&t.id&&(this.$store.dispatch("saveQuestionAnswer",{id:this.step.id,value:t.id}),"current-role"===this.step.id&&(this.$store.dispatch("saveQuestionAnswer",{id:"isDetective",value:"Detective"===t.grade.split(" ")[0]?"yes":"no"}),this.$store.dispatch("saveQuestionAnswer",{id:"isPolice",value:"Policing"===t.jobFamily?"yes":"no"})))},clearRole:function(){this.$refs.autocomplete.value="",this.$store.dispatch("saveQuestionAnswer",{id:this.step.id,value:""}),"current-role"===this.step.id&&(this.$store.dispatch("saveQuestionAnswer",{id:"isDetective",value:""}),this.$store.dispatch("saveQuestionAnswer",{id:"isPolice",value:""}),this.$store.dispatch("saveQuestionAnswer",{id:"detective-roles",value:""}))},isRoleSelected:function(t){return this.currentValue===t.id},toggleFocus:function(){this.focussed=!this.focussed},aliasList:function(t){return!!t&&t.join(", ")}}},_=(r(484),r(16)),component=Object(_.a)(h,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"nsw-forms mb-80"},[e("div",{staticClass:"mb-12"},[t._m(0),t._v(" "),t._m(1),t._v(" "),e("div",[e("select",{directives:[{name:"model",rawName:"v-model",value:t.filter.jobFamily,expression:"filter.jobFamily"}],staticClass:"nsw-form-select",attrs:{id:"sort",placeholder:"Select"},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.filter,"jobFamily",e.target.multiple?r:r[0])}}},[e("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Select")]),t._v(" "),t._l(t.jobFamilies,(function(r){return e("option",{key:r},[t._v("\n          "+t._s(r)+"\n        ")])}))],2)])]),t._v(" "),e("div",{staticClass:"mb-12"},[t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),e("div",[e("select",{directives:[{name:"model",rawName:"v-model",value:t.filter.jobFunction,expression:"filter.jobFunction"}],staticClass:"nsw-form-select",attrs:{id:"sort"},on:{change:[function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.filter,"jobFunction",e.target.multiple?r:r[0])},function(e){return t.onSelectFunction()}]}},[e("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Select")]),t._v(" "),t._l(t.jobFunctions,(function(r){return e("option",{key:r},[t._v("\n          "+t._s(r)+"\n        ")])}))],2)])]),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),e("autocomplete",{ref:"autocomplete",attrs:{search:t.search,"get-result-value":t.getResultValue,"default-value":t.defaultValue,placeholder:"Start typing","aria-label":"Search by keyword, e.g. Case Officer, Intelligence, Coordinator"},on:{submit:t.selectRole},scopedSlots:t._u([{key:"default",fn:function(r){var n=r.rootProps,o=r.inputProps,l=r.inputListeners,c=r.resultListProps,d=r.resultListListeners,f=r.results,v=r.resultProps;return[e("div",t._b({},"div",n,!1),[e("div",{staticClass:"relative"},[e("input",t._g(t._b({ref:"role",staticClass:"nsw-form-input roles-autosuggest placeholder-gray-700 disabled:text-black",attrs:{disabled:t.isDisabled},on:{focus:t.toggleFocus,blur:t.toggleFocus}},"input",o,!1),l)),t._v(" "),t.currentValue?e("div",{staticClass:"absolute top-0 bottom-0 right-0 flex justify-center pointer-events-none"},[e("button",{staticClass:"px-4 pointer-events-auto border-2 border-nsw-brand-primary-blue my-1 mr-1 font-semibold rounded",attrs:{"aria-label":"Clear selected role"},on:{click:t.clearRole}},[t._v("\n              Reset\n            ")])]):t._e()]),t._v(" "),f.length?e("ul",t._g(t._b({staticClass:"bg-white mt-2 rounded shadow-md overflow-y-scroll max-h-autosuggest"},"ul",c,!1),d),t._l(f,(function(r,n){return e("li",t._b({key:v[n].id,staticClass:"py-3 px-4 border-b border-nsw-grey-200 cursor-pointer hover:bg-nsw-grey-100",class:{"bg-nsw-grey-100":t.isRoleSelected(r)}},"li",v[n],!1),[e("div",{staticClass:"sm:flex justify-between"},[e("div",{staticClass:"flex flex-col mb-3"},[e("div",{staticClass:"font-bold sm:whitespace-no-wrap"},[t._v("\n                  "+t._s(r.name)+"\n                ")]),t._v(" "),e("div",{staticClass:"text-sm text-nsw-brand-primary-blue sm:whitespace-no-wrap"},[t._v("\n                  "+t._s(r.jobFunction)+"\n                ")])]),t._v(" "),e("div",{staticClass:"flex flex-col items-end mb-2 sm:mb-1"},[r.grade?e("information-badge",{staticClass:"mb-2",attrs:{size:"xs",colour:"nsw-brand-primary-blue-light"}},[t._v("\n                  "+t._s(r.grade)+"\n                ")]):t._e(),t._v(" "),r.salary.min&&r.salary.max?e("information-badge",{staticClass:"mb-2",attrs:{size:"xs",colour:"nsw-brand-primary-blue-light"}},[t._v("\n                  Salary: "+t._s(t.$currency(r.salary.min))+" -\n                  "+t._s(t.$currency(r.salary.max))+"\n                ")]):t._e()],1)]),t._v(" "),e("p",{staticClass:"text-sm"},[t._v("\n              "+t._s(r.description)+"\n            ")]),t._v(" "),r.alias&&r.alias.length>0?e("div",{staticClass:"mt-3"},[e("p",{staticClass:"text-sm"},[t._v("\n                This role can also be known as:\n                "),e("span",{staticClass:"font-bold"},[t._v(t._s(t.aliasList(r.alias)))])])]):t._e()])})),0):t._e()])]}}])})],1)}),[function(){var t=this._self._c;return t("div",{staticClass:"text-2xl font-bold mb-4"},[t("p",[this._v("Select your work area")])])},function(){var t=this._self._c;return t("div",{staticClass:"mb-1"},[t("div",{staticClass:"text-base font-bold"},[this._v("Select from the list below")])])},function(){var t=this._self._c;return t("div",{staticClass:"text-2xl font-bold mb-4"},[t("p",[this._v("Select your function")])])},function(){var t=this._self._c;return t("div",{staticClass:"mb-1"},[t("div",{staticClass:"text-base font-bold"},[this._v("Select from the list below")])])},function(){var t=this._self._c;return t("div",{staticClass:"mb-1"},[t("div",{staticClass:"text-base"},[this._v("Optional")])])},function(){var t=this._self._c;return t("div",{staticClass:"text-2xl font-bold mb-4"},[t("p",[this._v("Search and select your role")])])},function(){var t=this._self._c;return t("div",{staticClass:"mb-1"},[t("div",{staticClass:"text-base font-bold"},[this._v("\n      Start typing your job title, then select from the list\n    ")])])},function(){var t=this._self._c;return t("div",{staticClass:"mb-1"},[t("div",{staticClass:"text-base"},[this._v("Search by keyword, e.g. Case Officer")])])}],!1,null,"5e9abe8a",null);e.default=component.exports;installComponents(component,{InformationBadge:r(458).default})}}]);