(window.webpackJsonp=window.webpackJsonp||[]).push([[23,9],{459:function(t,e,r){"use strict";r.r(e);var n={props:{role:{type:Object,required:!0},showDefault:{type:Boolean,default:!1},size:{type:String,default:"sm"}},computed:{showDefaultIcon:function(){return this.showDefault&&!this.role.essential.aboriginality&&!this.role.essential.detective},textSize:function(){return"sm"===this.size?"text-sm":"text-base"}}},l=r(16),component=Object(l.a)(n,(function(){var t=this,e=t._self._c;return e("div",[t.role.essential.aboriginality?e("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[e("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-atsi.svg",alt:"Essential Requirements icon"}}),t._v(" "),e("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:t.textSize},[t._v("\n      Aboriginal or Torres Strait Islander Identified Role\n    ")])]):t._e(),t._v(" "),t.role.essential.detective?e("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[e("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-detective.svg",alt:"Essential Requirements icon"}}),t._v(" "),e("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:t.textSize},[t._v("\n      Designated Detective Role\n    ")])]):t._e(),t._v(" "),t.showDefaultIcon?e("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[e("img",{attrs:{src:"/icons/essential.svg",alt:"Essential Requirements icon"}}),t._v(" "),e("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:t.textSize},[t._v("\n      Essential Requirements\n    ")])]):t._e()])}),[],!1,null,null,null);e.default=component.exports},464:function(t,e,r){"use strict";r.r(e);r(34);var n={components:{EssentialRequirementsIcon:r(459).default},props:{role:{type:Object,required:!0}}},l=r(16),component=Object(l.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"relative bg-white shadow-lg rounded-lg mb-4 px-6 py-5 flex flex-col cursor-pointer border border-nsw-brand-grey-light hover:border-nsw-brand-grey-primary hover:shadow-xl transition transform-all duration-200"},[e("div",{staticClass:"flex justify-between text-grey-primary text-sm mb-4"},[e("div",[t._v("\n      "+t._s(t.role.grade)+"\n      "),e("span",{staticClass:"pl-4"},[t._v("Salary: "+t._s(t.$currency(t.role.salary.min))+" -\n      "+t._s(t.$currency(t.role.salary.max)))])]),t._v(" "),t._m(0)]),t._v(" "),e("div",{staticClass:"flex flex-col text-nsw-blue-800"},[e("div",{staticClass:"text-sm font-bold"},[t._v("\n      "+t._s(t.role.name)+"\n    ")]),t._v(" "),e("div",{staticClass:"text-xs flex-grow"},[t._v("\n      "+t._s(t.role.jobFunction)+"\n    ")])]),t._v(" "),e("EssentialRequirementsIcon",{attrs:{role:t.role}})],1)}),[function(){var t=this._self._c;return t("div",{staticClass:"-mt-2"},[t("img",{staticStyle:{transform:"rotate(180deg)"},attrs:{src:"/icons/chevron-left-blue.svg",alt:"Arrow icon"}})])}],!1,null,null,null);e.default=component.exports;installComponents(component,{EssentialRequirementsIcon:r(459).default})}}]);