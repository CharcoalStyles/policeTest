(window.webpackJsonp=window.webpackJsonp||[]).push([[61,25,37,45,46,49],{460:function(e,t,r){"use strict";r.r(t);var n={props:{action:{type:String,default:"primary"},size:{type:String,default:"md"},type:{type:String,default:"button"}},computed:{colourClasses:function(){switch(this.action){case"secondary":return"bg-white hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue";case"secondary-outline":return"hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue";case"highlight":return"bg-nsw-brand-primary-highlight text-white focus:bg-nsw-brand-tertiary-blue";case"psc":return"bg-nsw-brand-purple-dark text-white focus:bg-nsw-brand-tertiary-blue";default:return"bg-nsw-brand-primary-blue text-white focus:bg-nsw-brand-tertiary-blue"}},sizeClasses:function(){return"highlight"===this.size?"bg-nsw-brand-primary-highlight":"h-10 md:h-12 px-6 md:px-8 text-sm md:text-base"}}},l=r(16),component=Object(l.a)(n,(function(){var e=this;return(0,e._self._c)("button",{staticClass:"font-bold rounded-md focus:border-nsw-brand-tertiary-blue focus:outline-buttons disabled:opacity-75 whitespace-no-wrap",class:[e.colourClasses,e.sizeClasses],attrs:{type:e.type}},[e._t("default")],2)}),[],!1,null,null,null);t.default=component.exports},462:function(e,t,r){"use strict";var n=r(2),l=r(4),o=r(45),c=r(32),d=r(54),f=r(254),v=r(12),m=r(3),h=r(255),_=r(164),w=r(463),x=r(464),y=r(100),C=r(465),k=[],R=l(k.sort),O=l(k.push),P=m((function(){k.sort(void 0)})),S=m((function(){k.sort(null)})),j=_("sort"),A=!m((function(){if(y)return y<70;if(!(w&&w>3)){if(x)return!0;if(C)return C<603;var code,e,t,r,n="";for(code=65;code<76;code++){switch(e=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:t=3;break;case 68:case 71:t=4;break;default:t=2}for(r=0;r<47;r++)k.push({k:e+r,v:t})}for(k.sort((function(a,b){return b.v-a.v})),r=0;r<k.length;r++)e=k[r].k.charAt(0),n.charAt(n.length-1)!==e&&(n+=e);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:P||!S||!j||!A},{sort:function(e){void 0!==e&&o(e);var t=c(this);if(A)return void 0===e?R(t):R(t,e);var r,n,l=[],m=d(t);for(n=0;n<m;n++)n in t&&O(l,t[n]);for(h(l,function(e){return function(t,r){return void 0===r?-1:void 0===t?1:void 0!==e?+e(t,r)||0:v(t)>v(r)?1:-1}}(e)),r=d(l),n=0;n<r;)t[n]=l[n++];for(;n<m;)f(t,n++);return t}})},463:function(e,t,r){"use strict";var n=r(83).match(/firefox\/(\d+)/i);e.exports=!!n&&+n[1]},464:function(e,t,r){"use strict";var n=r(83);e.exports=/MSIE|Trident/.test(n)},465:function(e,t,r){"use strict";var n=r(83).match(/AppleWebKit\/(\d+)\./);e.exports=!!n&&+n[1]},493:function(e,t,r){"use strict";r.r(t);var n=r(16),component=Object(n.a)({},(function(){this._self._c;return this._m(0)}),[function(){var e=this._self._c;return e("button",{staticClass:"flex items-center underline print:hidden text-sm text-nsw-brand-primary-blue",staticStyle:{"text-underline-offset":"4px"}},[e("img",{staticClass:"mr-3",attrs:{src:"/saveCopy.svg",alt:"Save a copy icon"}}),this._v("\n  Save a copy\n")])}],!1,null,null,null);t.default=component.exports},497:function(e,t,r){var content=r(529);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(63).default)("0814bfb6",content,!0,{sourceMap:!1})},505:function(e,t,r){"use strict";r.r(t);r(35),r(60),r(259);var n={props:{role:{type:Object,required:!0},targetRole:{type:[Object,Boolean],required:!0},rank:{type:Object,required:!1}},computed:{isRoleSelected:function(){return this.targetRole&&this.role.id===this.targetRole.id},rankAsString:function(){return this.rank?"(".concat(this.rank.focusFocus.toFixed(2),", ").concat(this.rank.focusAll.toFixed(2),", ").concat(this.rank.allFocus.toFixed(2),", ").concat(this.rank.allAll.toFixed(2),")"):""}}},l=r(16),component=Object(l.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"border border-nsw-grey-400 hover:border-nsw-brand-primary-blue p-3 rounded-lg flex mb-3 cursor-pointer",attrs:{tabindex:"0"}},[t("div",{staticClass:"w-10 h-10 flex-shrink-0"},[t("div",{staticClass:"w-6 h-6 rounded-full border border-black flex items-center justify-center"},[e.isRoleSelected?t("div",{staticClass:"h-4 w-4 bg-nsw-brand-primary-blue rounded-full block"}):e._e()])]),e._v(" "),t("div",{staticClass:"text-sm"},[t("div",{staticClass:"sm:hidden font-bold mb-1"},[e._v("\n      "+e._s(e.role.name)+"\n    ")]),e._v(" "),t("div",{staticClass:"text-nsw-grey-800 sm:flex sm:space-x-2 sm:mb-1"},[t("div",{staticClass:"mb-1 sm:mb-0"},[e._v("\n        Grade: "+e._s(e.role.grade)+"\n      ")]),e._v(" "),t("div",[e._v("Salary: "+e._s(e.$currency(e.role.salary.min))+" - "+e._s(e.$currency(e.role.salary.max)))])]),e._v(" "),t("div",{staticClass:"hidden sm:block font-bold"},[e._v("\n      "+e._s(e.role.name)+"  "+e._s(e.rankAsString)+"\n    ")])])])}),[],!1,null,null,null);t.default=component.exports},506:function(e,t,r){"use strict";r.r(t);r(27),r(52),r(35),r(29),r(53),r(30),r(13);var n={components:{InformationBadge:r(458).default},props:{role:{type:Object,required:!0},roles:{type:Array,required:!0},type:{type:String,default:"current"}},computed:{pillColour:function(){return"current"===this.type?"nsw-brand-primary-blue-light":"green"},essentialRequirements:function(){return this.role.essentialRequirements?this.role.essentialRequirements.split("•\t").filter((function(e){return""!==e})):""},getEssentialRequirements:function(){var e=this;return Object.keys(this.role.essential).filter((function(t){return e.role.essential[t]})).map((function(e){switch(e){case"aboriginality":return"Flexible working hours";case"detective":return"Remote working";default:return e}}))}}},l=r(16),component=Object(l.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"p-4 lg:p-8"},[t("information-badge",{staticClass:"mb-4 font-bold",attrs:{colour:e.pillColour,rounded:"md"}},[t("p",{staticClass:"px-2"},[e._v("Your "+e._s(e.type)+" role")])]),e._v(" "),t("h3",{staticClass:"font-bold text-xl mb-4"},[e._v("\n    "+e._s(e.role.name)+"\n  ")]),e._v(" "),t("div",{staticClass:"flex flex-col gap-3 lg:flex-row mb-6"},[e.role.grade?t("information-badge",{staticClass:"rounded-full",attrs:{size:"sm"}},[e._v("\n      "+e._s(e.role.grade)+"\n    ")]):e._e(),e._v(" "),e.role.salary.min&&e.role.salary.max?t("information-badge",{staticClass:"rounded-full",attrs:{size:"sm"}},[e._v("\n      "+e._s(e.$currency(e.role.salary.min))+" -\n      "+e._s(e.$currency(e.role.salary.max))+"\n    ")]):e._e(),e._v(" "),e.role.manager?t("information-badge",{staticClass:"rounded-full",attrs:{size:"sm"}},[e._v("\n      Manager role\n    ")]):e._e(),e._v(" "),e.role.numPositions?t("information-badge",{staticClass:"rounded-full",attrs:{size:"sm"}},[e._v("\n      "+e._s(e.role.numPositions)+" positions\n    ")]):e._e(),e._v(" "),e.role.location&&"Various"!==e.role.location?t("information-badge",{staticClass:"rounded-full",attrs:{size:"sm"}},[e._v("\n      "+e._s(e.role.location)+"\n    ")]):e._e()],1),e._v(" "),t("p",{staticClass:"w-full lg:w-5/6 mb-6"},[e._v("\n    "+e._s(e.role.description)+"\n  ")]),e._v(" "),t("div",{staticClass:"w-fit"},[t("a",{staticClass:"flex flex-row gap-1 underline text-sm text-nsw-brand-primary-blue mb-6",attrs:{href:e.role.fullDescription}},[t("img",{attrs:{src:"/icons/pages.svg",alt:"Link icon"}}),e._v(" "),t("p",[e._v("Role Description")])])]),e._v(" "),""!=e.essentialRequirements?t("div",[e._m(0),e._v(" "),t("ul",{staticClass:"list-disc ml-5"},e._l(e.essentialRequirements,(function(r){return t("li",{key:r,staticClass:"text-sm mb-2"},[e._v("\n        "+e._s(r)+"\n      ")])})),0)]):e._e()],1)}),[function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex flex-row gap-2 mb-2"},[t("img",{attrs:{src:"/essential.svg",alt:"Link icon"}}),e._v(" "),t("p",{staticClass:"font-bold text-nsw-brand-primary-blue"},[e._v("\n        Essential Requirements\n      ")])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{InformationBadge:r(458).default})},510:function(e,t,r){"use strict";r.r(t);var n=r(459),l=r(460),o={components:{BaseModal:n.default,NswButton:l.default},props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0}},methods:{returnToQuestionFlow:function(){this.$emit("close"),this.$router.push("/pathway")}}},c=r(16),component=Object(c.a)(o,(function(){var e=this,t=e._self._c;return t("base-modal",{attrs:{show:e.show,"max-width":e.maxWidth,title:"Update answers",closeable:e.closeable,scrollable:!1},on:{close:function(t){return e.$emit("close")}},scopedSlots:e._u([{key:"footer",fn:function(){return[t("nsw-button",{staticClass:"mr-4",attrs:{action:"secondary"},nativeOn:{click:function(t){return e.$emit("close")}}},[e._v("\n      Cancel\n    ")]),e._v(" "),t("nsw-button",{nativeOn:{click:function(t){return e.returnToQuestionFlow.apply(null,arguments)}}},[e._v(" Update ")])]},proxy:!0}])},[t("p",{staticClass:"leading-relaxed"},[e._v("\n    In order to update your answers, we will return you to the questionnaire.\n    Your original answers will be available for you to edit and re-submit.\n  ")])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{NswButton:r(460).default,BaseModal:r(459).default})},511:function(e,t,r){"use strict";r.r(t);var n={props:{heading:{type:String,default:""}}},l=r(16),component=Object(l.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"border-l-4 border-nsw-brand-primary-blue px-6 py-6 pr-12 bg-nsw-grey-100 mt-3"},[t("div",{staticClass:"flex"},[e._m(0),e._v(" "),t("div",{staticStyle:{"margin-top":"3px"}},[e.heading?t("p",{staticClass:"font-bold mb-2 text-nsw-brand-grey-primary"},[e._v(e._s(e.heading))]):e._e(),e._v(" "),t("p",[e._t("default")],2)])])])}),[function(){var e=this._self._c;return e("div",{staticClass:"shrink-0"},[e("img",{staticClass:"mr-4",staticStyle:{width:"30px",height:"30px","min-width":"30px"},attrs:{src:"/icons/info.svg",alt:"Information"}})])}],!1,null,null,null);t.default=component.exports},522:function(e,t,r){"use strict";r.r(t);var n=r(16),component=Object(n.a)({},(function(){return(0,this._self._c)("div",{staticClass:"h-8 w-8 rounded-full inline-flex items-center justify-center bg-nsw-brand-psc-purple text-white text-lg font-bold mr-5"},[this._t("default")],2)}),[],!1,null,null,null);t.default=component.exports},527:function(e){e.exports=JSON.parse('{"STPR":"Strategic Procurement Leadership","PANA":"Procurement Analysis","STSO":"Strategic Sourcing","CONE":"Commercial Negotiation","PRRI":"Procurement Risk Management","SURE":"Supplier Relationship Management","CONM":"Contract Management","LEAN":"Legislative and Policy Environment","COLA":"Contract Law","COSM":"Cost Management","DIRE":"Display Resilience and Courage","ACWI":"Act with Integrity","MASE":"Manage Self","VADI":"Value Diversity and Inclusion","COEF":"Communicate Effectively","COTO":"Commit to Customer Service","WOCO":"Work Collaboratively","INAN":"Influence and Negotiate","DERE":"Deliver Results","PLAN":"Plan and Prioritise","THAN":"Think and Solve Problems","DEAC":"Demonstrate Accountability","FINA":"Finance","TECH":"Technology","PRAN":"Procurement and Contract Management","PRMA":"Project Management","MAAN":"Manage and Develop People","INDI":"Inspire Direction and Purpose","OPBU":"Optimise Business Outcomes","MARE":"Manage Reform and Change"}')},528:function(e,t,r){"use strict";r(497)},529:function(e,t,r){var n=r(62)((function(i){return i[1]}));n.push([e.i,'@page{size:A4;margin:1cm;-webkit-print-color-adjust:exact!important}#comparison table tr td:first-child{border-right-color:#728096;border-right-width:1px}.print-break{page-break-after:always}.inset-border{position:relative}.inset-border>div{position:relative;z-index:1}.inset-border:after{background-color:#fff;bottom:0;content:"";height:75px;left:0;position:absolute;right:0;z-index:0}',""]),n.locals={},e.exports=n},548:function(e,t,r){"use strict";r.r(t);r(61),r(35),r(27),r(43),r(44);var n=r(17),l=(r(29),r(125),r(82),r(101),r(53),r(462),r(30),r(13),r(98),r(25),r(38)),o=r(505),c=r(506),d=r(544),f=r(510),v=r(522),m=r(493),h=r(511),_=r(527);function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function x(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y={layout:"results",middleware:["completed"],components:{RoleSelector:o.default,RoleSelected:c.default,ResultsComparison:d.default,ModalUpdate:f.default,StepBadge:v.default,PrintPage:m.default,DisclaimerPanel:h.default},data:function(){return{targetRole:!1,modals:{update:!1,beta:!0}}},computed:x(x({},Object(l.b)(["answers","getHumanReadableAnswerValue"])),{},{roles:function(){return this.$store.state.roles},currentRole:function(){return this.answers.hasOwnProperty("current-role")?this.$store.getters.getRoleByCode(this.answers["current-role"].value):null},goalRole:function(){return!!this.answers.hasOwnProperty("goal-role")&&this.$collect(this.roles).where("id",this.answers["goal-role"].value).first()},readableSkillsList:function(){var e=Object.keys(this.answers.skills).map((function(e){return _[e]}));return e.length>0&&e.join(", ")},readableCapabilitiesList:function(){var e=Object.keys(this.answers.capabilities).map((function(e){return _[e]}));return e.length>0&&e.join(", ")},readableInterestsList:function(){return!!this.answers.hasOwnProperty("interests")&&this.answers.interests.value.join(", ")},managementPreference:function(){if(this.answers.hasOwnProperty("management"))switch(this.answers.management.value){case"individual":return"I would prefer to be an Individual contributor";case"manager":return"I would prefer to be a manager";case"either":return"I don't have a preference over being an Individual contributor or Manager";default:return null}return null},newRolePreference:function(){return this.answers.hasOwnProperty("new-role")?this.answers["new-role"].value.join(", "):""}}),mounted:function(){this.goalRole&&(this.targetRole=this.goalRole)},methods:{printPage:function(){window.print()},getQuestionAnswer:function(e){return this.$store.getters.getHumanReadableAnswerValue(e)},selectTargetRole:function(e){this.targetRole=e,this.$scrollTo("#comparison")},progressionRoles:function(e){var t=this,r=!!this.answers.hasOwnProperty("detective-roles")&&this.answers["detective-roles"].value.includes("yes"),n=this.roles.filter((function(e){if(t.answers.hasOwnProperty("sworn"))switch(t.answers.sworn.value){case"yes":return"Policing"===e.jobFamily;case"no":return"Policing"!==e.jobFamily;default:return!0}return!0})).filter((function(t){return t.jobFunction===e.jobFunction})).filter((function(e){return!("Detective"===e.grade.split(" ")[0]&&!r)})).filter((function(t){var r=1;return"policing"===e.gradeId.type&&2===e.gradeId.grade&&(r=2),t.gradeId.grade===e.gradeId.grade+r}));return this.rankAndSortRoles(e,n).map((function(e){return e.role}))},adjacentRoles:function(e){var t=this,r=!!this.answers.hasOwnProperty("detective-roles")&&this.answers["detective-roles"].value.includes("yes"),n=this.roles.filter((function(e){if(t.answers.hasOwnProperty("sworn"))switch(t.answers.sworn.value){case"yes":return"Policing"===e.jobFamily;case"no":return"Policing"!==e.jobFamily;default:return!0}return!0})).filter((function(t){return t.jobFamily===e.jobFamily})).filter((function(t){return t.jobFunction===e.jobFunction})).filter((function(e){return!("Detective"===e.grade.split(" ")[0]&&!r)})).filter((function(t){return t.gradeId.grade===e.gradeId.grade}));return this.rankAndSortRoles(e,n).map((function(e){return e.role}))},isRoleSharingSkills:function(e,t){return e.capabilities.focus.reduce((function(e,r){t.capabilities.focus.find((function(e){return r.code===e.code}))&&(t.capabilities.focus.find((function(e){return r.level>=e.level}))&&e.push(r));return e}),[])},roleShareCapabilitiesRank:function(e,t){var r={focusFocus:0,allFocus:0,focusAll:0,allAll:0};return e.capabilities.all.forEach((function(n){t.capabilities.all.forEach((function(l){if(n.code===l.code){var o=e.capabilities.focus.map((function(e){return e.code})).includes(n.code),c=t.capabilities.focus.map((function(e){return e.code})).includes(l.code),d="focusFocus";!o&&c?d="allFocus":o&&!c?d="focusAll":o||c||(d="allAll");var f=n.level-l.level;if(0===f&&(r[d]+=1),f>=1)return void(r[d]+=1.2);-1===f&&(r[d]+=.3)}}))})),r},rankAndSortRoles:function(e,t){var r=this;return t.map((function(t){var n=r.roleShareCapabilitiesRank(e,t);if(-1!==e.gradeId.grade&&-1!==t.gradeId.grade){var l=e.gradeId.grade-t.gradeId.grade;0===l&&(n.focusFocus+=1),-1===l&&(n.focusFocus+=.5),l>0&&(n.focusFocus-=.5)}(r.answers.hasOwnProperty("interests")&&r.answers.interests.value.includes(t.jobFunction)&&(n.focusFocus+=1),r.answers.hasOwnProperty("management"))&&("either"!==r.answers.management.value&&"manager"===r.answers.management.value===t.manager&&(n.focusFocus+=1));if(t.numPositions){var o=t.numPositions.split(" ")[1];n.focusFocus+=1+.1*o.length}return{role:t,rank:n}}),[]).sort((function(a,b){return b.rank.focusFocus-a.rank.focusFocus})).reduce((function(e,t){var r=t.rank.focusFocus;0===e.length?e.push([t]):e[e.length-1][0].rank.focusFocus===r?e[e.length-1].push(t):e.push([t]);return e}),[]).reduce((function(e,t){return t.sort((function(a,b){var e=a.rank.focusAll+.6*a.rank.allFocus+.1*a.rank.allAll;return b.rank.focusAll+.6*b.rank.allFocus+.1*b.rank.allAll-e})).forEach((function(t){e.push(t)})),e}),[])},skillRoles:function(e){var t=this,r=this.roles.filter((function(t){return t.jobFamily!==e.jobFamily})).filter((function(e){if(t.answers.hasOwnProperty("sworn"))switch(t.answers.sworn.value){case"yes":return"Policing"===e.jobFamily;case"no":return"Policing"!==e.jobFamily;default:return!0}return!0})).filter((function(r){return r.id!==e.id&&(!t.answers.hasOwnProperty("goal-role")||r.id===t.answers["goal-role"].value.id)}));return this.rankAndSortRoles(e,r).map((function(e){return e.role}))}}},C=(r(528),r(16)),component=Object(C.a)(y,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"relative flex-grow z-10"},[t("div",{staticClass:"bg-nsw-grey-100 inset-border"},[t("div",{staticClass:"xl:container"},[e._m(0),e._v(" "),t("div",{staticClass:"px-4 md:px-6 pt-6"},[t("div",{},[t("div",{staticClass:"flex flex-col md:flex-row justify-between items-center"},[e._m(1),e._v(" "),t("div",[t("print-page",{staticClass:"mb-6",nativeOn:{click:function(t){return e.printPage.apply(null,arguments)}}})],1)]),e._v(" "),t("div",{staticClass:"p-6 bg-white border rounded border-nsw-grey-200 lg:p-8 print-break"},[t("div",{staticClass:"flex flex-row items-center justify-between mb-8 print:flex-row"},[t("h2",{staticClass:"flex text-lg sm:text-2xl font-bold"},[e._v("Your answers")]),e._v(" "),t("nsw-button",{attrs:{action:"secondary-outline"},nativeOn:{click:function(t){e.modals.update=!0}}},[e._v("\n                Update answers\n              ")])],1),e._v(" "),t("div",{staticClass:"w-full"},[e.currentRole.name?t("div",{staticClass:"flex flex-col mb-6 md:flex-row"},[t("div",{staticClass:"flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6"},[e._v("\n                  My current role\n                ")]),e._v(" "),t("div",[t("span",{staticClass:"font-bold text-nsw-brand-secondary-blue"},[e._v("\n                    "+e._s(e.currentRole.name)+" - "+e._s(e.currentRole.grade)+"\n                  ")])])]):e._e(),e._v(" "),e.targetRole.name?t("div",{staticClass:"flex flex-col mb-6 md:flex-row"},[t("div",{staticClass:"flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6"},[e._v("\n                  Your target role\n                ")]),e._v(" "),t("div",[e._v("\n                  I would like to be a\n                  "),t("span",{staticClass:"font-bold text-nsw-brand-secondary-blue"},[e._v(e._s(e.targetRole.name))]),e._v("\n                  or similar\n                ")])]):e._e(),e._v(" "),e.readableInterestsList?t("div",{staticClass:"flex flex-col mb-6 md:flex-row"},[t("div",{staticClass:"flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6"},[e._v("\n                  Interest Areas\n                ")]),e._v(" "),t("div",[e._v("\n                  I'm instested in\n                  "),t("span",{staticClass:"font-bold text-nsw-brand-secondary-blue"},[e._v(e._s(e.readableInterestsList))])])]):e._e(),e._v(" "),e.managementPreference?t("div",{staticClass:"flex flex-col mb-6 md:flex-row"},[t("div",{staticClass:"flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6"},[e._v("\n                  How you like to work\n                ")]),e._v(" "),t("div",[e._v("\n                  "+e._s(e.managementPreference)+"\n                ")])]):e._e(),e._v(" "),e.newRolePreference?t("div",{staticClass:"flex flex-col mb-6 md:flex-row"},[t("div",{staticClass:"flex-shrink-0 mb-3 font-bold md:mb-0 md:w-2/6"},[e._v("\n                  When Choosing A Role\n                ")]),e._v(" "),t("div",[e._v("\n                  I consider\n                  "),t("span",{staticClass:"font-bold text-nsw-brand-secondary-blue"},[e._v("\n                    "+e._s(e.newRolePreference))])])]):e._e()])])])])])]),e._v(" "),t("div",{staticClass:"xl:container"},[t("div",{staticClass:"relative px-4 md:px-6"},[t("div",[t("div",{staticClass:"py-6 border-b lg:py-16 border-nsw-grey-200 print-break",attrs:{id:"target"}},[t("div",{staticClass:"mb-10"},[t("h3",{staticClass:"flex items-center mb-3 text-3xl font-bold md:text-3xl"},[t("step-badge",[e._v("1")]),e._v(" Select your target role\n            ")],1),e._v(" "),t("p",{staticClass:"md:w-2/3"},[e._v("\n              A target role compares your current role, identify skills gaps,\n              surfaces learning resources.\n            ")])]),e._v(" "),t("div",{staticClass:"w-full"},[e.goalRole?t("div",{staticClass:"w-full md:w-1/2 pb-4"},[t("div",[e._m(2),e._v(" "),t("role-selector",{attrs:{role:e.goalRole,"target-role":e.targetRole},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"space",32,t.key,[" ","Spacebar"])?null:e.selectTargetRole(e.goalRole)}},nativeOn:{click:function(t){return e.selectTargetRole(e.goalRole)}}})],1)]):e._e(),e._v(" "),t("hr",{staticClass:"mb-6"}),e._v(" "),t("div",{staticClass:"mb-7"},[e.goalRole?t("h4",{staticClass:"text-2xl font-bold"},[e._v("\n                Other options based on your answers\n              ")]):t("h4",{staticClass:"text-2xl font-bold"},[e._v("\n                Options based on your answers\n              ")])]),e._v(" "),t("div",{staticClass:"flex flex-row flex-wrap"},[e.progressionRoles(e.currentRole).length?t("div",{staticClass:"flex-none flex-grow md:w-1/3 md:max-w-[50%] px-4 pb-4"},[e._m(3)]):e._e(),e._v(" "),e.adjacentRoles(e.currentRole).length?t("div",{staticClass:"flex-none flex-grow md:w-1/3 md:max-w-[50%] px-4 pb-4"},[e._m(4)]):e._e(),e._v(" "),e.skillRoles(e.currentRole).length?t("div",{staticClass:"flex-none flex-grow md:w-1/3 md:max-w-[50%] px-4 pb-4"},[e._m(5)]):e._e()]),e._v(" "),t("div",{staticClass:"flex flex-row flex-wrap"},[e.progressionRoles(e.currentRole).length?t("div",{staticClass:"flex-none flex-grow md:w-1/3 md:max-w-[50%] px-4 pb-4"},e._l(e.progressionRoles(e.currentRole).slice(0,3),(function(r){return t("role-selector",{key:r.id,attrs:{role:r,"target-role":e.targetRole},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"space",32,t.key,[" ","Spacebar"])?null:e.selectTargetRole(r)}},nativeOn:{click:function(t){return e.selectTargetRole(r)}}})})),1):e._e(),e._v(" "),e.adjacentRoles(e.currentRole).length?t("div",{staticClass:"flex-none flex-grow md:w-1/3 md:max-w-[50%] px-4 pb-4"},e._l(e.adjacentRoles(e.currentRole).slice(0,3),(function(r){return t("role-selector",{key:r.id,attrs:{role:r,"target-role":e.targetRole},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"space",32,t.key,[" ","Spacebar"])?null:e.selectTargetRole(r)}},nativeOn:{click:function(t){return e.selectTargetRole(r)}}})})),1):e._e(),e._v(" "),e.skillRoles(e.currentRole).length?t("div",{staticClass:"flex-none flex-grow md:w-1/3 md:max-w-[50%] px-4 pb-4"},e._l(e.skillRoles(e.currentRole).slice(0,3),(function(r){return t("role-selector",{key:r.id,attrs:{role:r,"target-role":e.targetRole},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"space",32,t.key,[" ","Spacebar"])?null:e.selectTargetRole(r)}},nativeOn:{click:function(t){return e.selectTargetRole(r)}}})})),1):e._e(),e._v(" "),e.targetRole||0!==e.progressionRoles(e.currentRole).length||0!==e.adjacentRoles(e.currentRole).length||0!==e.skillRoles(e.currentRole).length?e._e():t("div",[t("disclaimer-panel",{attrs:{heading:"No roles available"}},[t("nuxt-link",{staticClass:"underline text-nsw-brand-primary-blue",attrs:{to:"/pathway/goal"}},[e._v("\n                    Update your answers\n                  ")]),e._v("\n                  to select a target role.\n                ")],1)],1)])])]),e._v(" "),t("div",{staticClass:"w-full py-6 border-b lg:py-16 border-nsw-grey-200 print-break",attrs:{id:"comparison"}},[t("div",{staticClass:"mb-24"},[t("h3",{staticClass:"flex items-center mb-3 text-xl font-bold md:text-3xl"},[t("step-badge",[e._v("2")]),e._v(" Your skills and capability comparison\n            ")],1),e._v(" "),e._m(6)]),e._v(" "),t("table",{staticClass:"block w-full overflow-x-scroll border border-gray-300 rounded-lg table-auto lg:overflow-x-auto"},[t("thead",{staticClass:"border-b border-gray-300"},[t("tr",[t("td",{staticClass:"align-top lg:w-1/2 print:w-1/2"},[t("role-selected",{attrs:{roles:e.roles,role:e.currentRole,type:"current"}})],1),e._v(" "),t("td",{staticClass:"align-top lg:w-1/2 print:w-1/2"},[e.targetRole?t("role-selected",{attrs:{roles:e.roles,role:e.targetRole,type:"target"}}):t("div",{staticClass:"flex items-center justify-center p-4 lg:p-8"},[t("div",{staticClass:"flex flex-col items-center m-4 lg:m-8"},[t("img",{staticClass:"mb-6",attrs:{src:"/icons/empty.svg",alt:"No target role selected"}}),e._v(" "),t("div",{staticClass:"text-center lg:w-2/3"},[e._v("\n                        Select a\n                        "),t("a",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#target",expression:"'#target'"}],staticClass:"underline text-nsw-brand-primary-blue",attrs:{href:"/pathway/goal"}},[e._v("target role")]),e._v("\n                        to start comparing roles.\n                      ")])])])],1)])]),e._v(" "),t("results-comparison",{attrs:{"current-role":e.currentRole,"target-role":e.targetRole}})],1)]),e._v(" "),t("div",{staticClass:"py-6 border-b lg:py-16 border-nsw-grey-200"},[t("h2",{staticClass:"mb-6 text-3xl md:text-4xl font-bold"},[e._v("Next steps")]),e._v(" "),t("div",{staticClass:"flex gap-6 w-full bg-nsw-grey-100 mb-12"},[t("div",{staticClass:"flex flex-col px-12 py-8"},[t("h3",{staticClass:"text-xl sm:text-2xl font-bold mb-2 sm:mb-4"},[e._v("\n                Start a career conversation\n              ")]),e._v(" "),t("p",{staticClass:"mb-4 sm:mb-8"},[e._v("\n                Share this plan with your Supervisor / Manager or support\n                network by printing this page or sending it to them via email.\n              ")]),e._v(" "),t("div",{staticClass:"flex flex-col"},[t("p",{staticClass:"mb-2"},[e._v("Relevant resources")]),e._v(" "),t("nuxt-link",{staticClass:"flex items-center underline text-nsw-brand-primary-blue",attrs:{to:"/explorer",target:"_blank"}},[e._v("\n                  NSWPF Careers intranet site\n                  "),t("img",{staticClass:"ml-2",attrs:{src:"/icons/link.svg",alt:"Link icon"}})]),e._v(" "),t("nuxt-link",{staticClass:"flex items-center underline text-nsw-brand-primary-blue",attrs:{to:"/explorer",target:"_blank"}},[e._v("\n                  NSWPF Role Description Library\n                  "),t("img",{staticClass:"ml-2",attrs:{src:"/icons/link.svg",alt:"Link icon"}})]),e._v(" "),t("nuxt-link",{staticClass:"flex items-center underline text-nsw-brand-primary-blue",attrs:{to:"/explorer",target:"_blank"}},[e._v("\n                  SFIA Skill framework\n                  "),t("img",{staticClass:"ml-2",attrs:{src:"/icons/link.svg",alt:"Link icon"}})])],1)]),e._v(" "),t("div",{staticClass:"w-52 pr-12 pt-8"},[t("print-page",{staticClass:"mb-6",nativeOn:{click:function(t){return e.printPage.apply(null,arguments)}}})],1)]),e._v(" "),t("div",{staticClass:"flex flex-row gap-10"},[t("div",{staticClass:"bg-nsw-grey-100 px-12 py-8"},[t("h3",{staticClass:"text-xl sm:text-2xl font-bold mb-2 sm:mb-4"},[e._v("\n                Search for more roles\n              ")]),e._v(" "),t("p",{staticClass:"mb-4 sm:mb-8"},[e._v("\n                If you haven’t found the role you are looking for you can\n                search over 1300 NSWPF roles with our role explorer.\n              ")]),e._v(" "),t("nuxt-link",{staticClass:"underline text-nsw-brand-primary-blue",attrs:{to:"/explorer",target:"_blank"}},[e._v("\n                Role explorer\n              ")])],1),e._v(" "),t("div",{staticClass:"bg-nsw-grey-100 px-12 py-8"},[t("h3",{staticClass:"text-xl sm:text-2xl font-bold mb-2 sm:mb-4"},[e._v("\n                Search for your target role and related roles\n              ")]),e._v(" "),t("p",{staticClass:"mb-4 sm:mb-8"},[e._v("\n                Browse available NSWPF administrative job opportunities with\n                NSW Government.\n              ")]),e._v(" "),t("nuxt-link",{staticClass:"flex items-center underline text-nsw-brand-primary-blue",attrs:{to:"/explorer",target:"_blank"}},[e._v("\n                I work for NSW\n                "),t("img",{staticClass:"ml-2",attrs:{src:"/icons/link.svg",alt:"Link icon"}})])],1)])]),e._v(" "),t("div",{staticClass:"md:w-8/12"},[t("div",{staticClass:"py-6 lg:py-16"},[t("print-page",{staticClass:"mb-6",nativeOn:{click:function(t){return e.printPage.apply(null,arguments)}}}),e._v(" "),t("disclaimer-panel",[e._v("\n              Salaries are indicative only. Check the job ad when applying for\n              a role.\n            ")]),e._v(" "),t("disclaimer-panel",[e._v("\n              Completing pre-requisites does not guarantee successful\n              transition to any role\n            ")])],1)])]),e._v(" "),t("modal-update",{attrs:{show:e.modals.update,"max-width":"xl",scrollable:!1},on:{close:function(t){e.modals.update=!1}}})],1)])])}),[function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex flex-row md:pb-10 md:pt-8"},[t("div",{staticClass:"bg-nsw-brand-primary-blue font-bold text-center text-white px-2 py-1"},[e._v("\n          Beta\n        ")]),e._v(" "),t("div",{staticClass:"text-nsw-brand-primary-blue px-2 py-1"},[e._v("\n          This is a "),t("span",{staticClass:"underline"},[e._v("new service")]),e._v(" - your\n          "),t("span",{staticClass:"underline"},[e._v("feedback")]),e._v(" will help us improve it.\n        ")])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"mb-8 md:mb-16 md:w-2/3 lg:w-1/2"},[t("h2",{staticClass:"pb-3 font-bold btn-blue text-nsw-brand-primary-blue"},[e._v("\n                Your personal career pathway\n              ")]),e._v(" "),t("h1",{staticClass:"text-3xl md:text-4xl font-bold leading-snug tracking-tight lg:text-5xl"},[e._v("\n                We’ve generated a plan to get you to your next role\n              ")])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"mb-6"},[t("h4",{staticClass:"text-2xl font-bold"},[e._v("Your desired role")]),e._v(" "),t("p",[e._v("The role you identified in the career questionnaire")])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"mb-6"},[t("h4",{staticClass:"text-xl font-bold"},[e._v("Progression roles")]),e._v(" "),t("p",[e._v("Roles that your current role can progress to")])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"mb-6"},[t("h4",{staticClass:"text-xl font-bold"},[e._v("Adjacent roles")]),e._v(" "),t("p",[e._v("\n                    Roles from your current work area that share your current\n                    capabilities\n                  ")]),e._v(" "),t("div",{staticClass:"flex flex-row gap-2 flex-wrap mb-2"})])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"mb-6"},[t("h4",{staticClass:"text-xl font-bold"},[e._v("Roles with similar skills")]),e._v(" "),t("p",[e._v("\n                    Roles from other parts of the organisation that share your\n                    current skills and capabilities\n                  ")]),e._v(" "),t("div",{staticClass:"flex flex-row gap-2 flex-wrap mb-2"})])},function(){var e=this,t=e._self._c;return t("p",[e._v("\n              Select any "),t("strong",[e._v("skill")]),e._v(" or\n              "),t("strong",[e._v("capability")]),e._v(" to understand gaps and upskilling\n              opportunities.\n            ")])}],!1,null,null,null);t.default=component.exports;installComponents(component,{PrintPage:r(493).default,NswButton:r(460).default})}}]);