(window.webpackJsonp=window.webpackJsonp||[]).push([[47,9],{459:function(t,e,r){"use strict";r.r(e);var l={props:{role:{type:Object,required:!0},showDefault:{type:Boolean,default:!1},size:{type:String,default:"sm"}},computed:{showDefaultIcon:function(){return this.showDefault&&!this.role.essential.aboriginality&&!this.role.essential.detective},textSize:function(){return"sm"===this.size?"text-sm":"text-base"}}},n=r(16),component=Object(n.a)(l,(function(){var t=this,e=t._self._c;return e("div",[t.role.essential.aboriginality?e("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[e("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-atsi.svg",alt:"Essential Requirements icon"}}),t._v(" "),e("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:t.textSize},[t._v("\n      Aboriginal or Torres Strait Islander Identified Role\n    ")])]):t._e(),t._v(" "),t.role.essential.detective?e("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[e("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-detective.svg",alt:"Essential Requirements icon"}}),t._v(" "),e("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:t.textSize},[t._v("\n      Designated Detective Role\n    ")])]):t._e(),t._v(" "),t.showDefaultIcon?e("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[e("img",{attrs:{src:"/icons/essential.svg",alt:"Essential Requirements icon"}}),t._v(" "),e("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:t.textSize},[t._v("\n      Essential Requirements\n    ")])]):t._e()])}),[],!1,null,null,null);e.default=component.exports},512:function(t,e,r){"use strict";r.r(e);r(34),r(62),r(256);var l={props:{role:{type:Object,required:!0},targetRole:{type:[Object,Boolean],required:!0},rank:{type:Object,required:!1}},computed:{isRoleSelected:function(){return this.targetRole&&this.role.id===this.targetRole.id},rankAsString:function(){return this.rank?"(".concat(this.rank.focusFocus.toFixed(2),", ").concat(this.rank.focusAll.toFixed(2),", ").concat(this.rank.allFocus.toFixed(2),", ").concat(this.rank.allAll.toFixed(2),")"):""}}},n=r(16),component=Object(n.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"border border-nsw-grey-400 hover:border-nsw-brand-primary-blue p-3 rounded-lg flex mb-3 cursor-pointer",attrs:{tabindex:"0"}},[e("div",{staticClass:"w-10 h-10 flex-shrink-0"},[e("div",{staticClass:"w-6 h-6 rounded-full border border-black flex items-center justify-center"},[t.isRoleSelected?e("div",{staticClass:"h-4 w-4 bg-nsw-brand-primary-blue rounded-full block"}):t._e()])]),t._v(" "),e("div",[e("div",{staticClass:"flex justify-between text-grey-primary text-sm mb-4"},[e("div",[t._v("\n        "+t._s(t.role.grade)+"\n        "),e("span",{staticClass:"pl-4"},[t._v("Salary: "+t._s(t.$currency(t.role.salary.min))+" -\n          "+t._s(t.$currency(t.role.salary.max)))])])]),t._v(" "),e("div",{staticClass:"flex flex-col text-nsw-blue-800"},[e("div",{staticClass:"text-sm font-bold"},[t._v("\n        "+t._s(t.role.name)+"\n      ")]),t._v(" "),e("div",{staticClass:"text-xs flex-grow"},[t._v("\n        "+t._s(t.role.jobFunction)+"\n      ")])]),t._v(" "),e("EssentialRequirementsIcon",{attrs:{role:t.role}})],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{EssentialRequirementsIcon:r(459).default})}}]);