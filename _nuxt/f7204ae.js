(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{459:function(t,e,n){"use strict";n.r(e);var l={props:{role:{type:Object,required:!0},showDefault:{type:Boolean,default:!1},size:{type:String,default:"sm"}},computed:{showDefaultIcon:function(){return this.showDefault&&!this.role.essential.aboriginality&&!this.role.essential.detective},textSize:function(){return"sm"===this.size?"text-sm":"text-base"}}},r=n(16),component=Object(r.a)(l,(function(){var t=this,e=t._self._c;return e("div",[t.role.essential.aboriginality?e("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[e("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-atsi.svg",alt:"Essential Requirements icon"}}),t._v(" "),e("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:t.textSize},[t._v("\n      Aboriginal or Torres Strait Islander Identified Role\n    ")])]):t._e(),t._v(" "),t.role.essential.detective?e("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[e("img",{staticClass:"mt-1",attrs:{src:"/icons/essential-detective.svg",alt:"Essential Requirements icon"}}),t._v(" "),e("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:t.textSize},[t._v("\n      Designated Detective Role\n    ")])]):t._e(),t._v(" "),t.showDefaultIcon?e("div",{staticClass:"flex flex-row items-start gap-2 pt-4"},[e("img",{attrs:{src:"/icons/essential.svg",alt:"Essential Requirements icon"}}),t._v(" "),e("p",{staticClass:"text-nsw-brand-primary-blue font-bold",class:t.textSize},[t._v("\n      Essential Requirements\n    ")])]):t._e()])}),[],!1,null,null,null);e.default=component.exports}}]);