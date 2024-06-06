(window.webpackJsonp=window.webpackJsonp||[]).push([[40,7,24],{459:function(t,e,l){"use strict";l.r(e);l(99);var o={props:{show:{type:Boolean,default:!1},title:{type:String,default:""},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0},scrollable:{type:Boolean,default:!0}},computed:{maxWidthClass:function(){return{sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl","3xl":"sm:max-w-3xl"}[this.maxWidth]},scrollableContainerClass:function(){return this.scrollable?"h-modal-accessible lg:h-modal-accessible-lg":"max-h-modal-accessible lg:max-h-modal-accessible-lg"},scrollableBodyClass:function(){return this.scrollable?"overflow-y-scroll":"overflow-y-scroll lg:overflow-auto"}},watch:{show:{immediate:!0,handler:function(t){t?(document.body.style.overflow="hidden",this.focusModal()):document.body.style.overflow=null}}},created:function(){var t=this,e=function(e){"Escape"===e.key&&t.show&&t.close()};document.addEventListener("keydown",e),this.$once("hook:destroyed",(function(){document.removeEventListener("keydown",e)}))},mounted:function(){this.focusModal()},methods:{focusModal:function(){setTimeout((function(){var t=document.getElementById("dialog");t&&t.focus()}),100)},close:function(){this.closeable&&this.$emit("close")}}},n=l(16),component=Object(n.a)(o,(function(){var t=this,e=t._self._c;return e("portal",{attrs:{to:"modal"}},[e("transition",{attrs:{"leave-active-class":"duration-200"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"fixed flex items-center justify-center inset-0 overflow-y-auto z-20"},[e("transition",{attrs:{"enter-active-class":"ease-out duration-300","enter-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"ease-in duration-200","leave-class":"opacity-100","leave-to-class":"opacity-0"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"fixed inset-0 transform transition-all",on:{click:t.close}},[e("div",{staticClass:"absolute inset-0 bg-nsw-brand-primary-blue opacity-50"})])]),t._v(" "),e("transition",{attrs:{"enter-active-class":"ease-out duration-300","enter-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to-class":"opacity-100 translate-y-0 sm:scale-100","leave-active-class":"ease-in duration-200","leave-class":"opacity-100 translate-y-0 sm:scale-100","leave-to-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"}},[t.show?e("div",{staticClass:"bg-white shadow-xl transform transition-all w-modal-accessible flex flex-col focus:outline-none",class:[t.maxWidthClass,t.scrollableContainerClass],attrs:{id:"dialog",tabindex:"-1","aria-labelledby":"modal-title","aria-modal":"true"}},[e("div",{staticClass:"sticky w-full top-0 left-0 font-bold text-lg px-4 lg:px-8 py-3 lg:py-6 flex items-center justify-between border-b border-nsw-grey-200 bg-white z-10"},[e("h1",{staticClass:"w-10/12",attrs:{id:"modal-title"}},[t._v("\n              "+t._s(t.title)+"\n            ")]),t._v(" "),t.closeable?e("button",{staticClass:"absolute top-0 right-0 p-4 lg:p-8",attrs:{type:"button",title:"Close this window"},on:{click:t.close}},[e("img",{attrs:{src:"/icons/close.svg",alt:"Close"}})]):t._e()]),t._v(" "),e("div",{staticClass:"px-4 lg:px-8 py-3 lg:py-6 flex-grow",class:t.scrollableBodyClass},[t._t("default")],2),t._v(" "),t.$slots.footer?e("div",{staticClass:"flex-shrink-0 px-4 lg:px-8 py-3 lg:py-6 bg-gray-100 flex justify-between"},[t._t("footer")],2):t._e()]):t._e()])],1)])],1)}),[],!1,null,null,null);e.default=component.exports},460:function(t,e,l){"use strict";l.r(e);var o={props:{action:{type:String,default:"primary"},size:{type:String,default:"md"},type:{type:String,default:"button"}},computed:{colourClasses:function(){switch(this.action){case"secondary":return"bg-white hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue";case"secondary-outline":return"hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue";case"highlight":return"bg-nsw-brand-primary-highlight text-white focus:bg-nsw-brand-tertiary-blue";case"psc":return"bg-nsw-brand-purple-dark text-white focus:bg-nsw-brand-tertiary-blue";default:return"bg-nsw-brand-primary-blue text-white focus:bg-nsw-brand-tertiary-blue"}},sizeClasses:function(){return"highlight"===this.size?"bg-nsw-brand-primary-highlight":"h-10 md:h-12 px-6 md:px-8 text-sm md:text-base"}}},n=l(16),component=Object(n.a)(o,(function(){var t=this;return(0,t._self._c)("button",{staticClass:"font-bold rounded-md focus:border-nsw-brand-tertiary-blue focus:outline-buttons disabled:opacity-75 whitespace-no-wrap",class:[t.colourClasses,t.sizeClasses],attrs:{type:t.type}},[t._t("default")],2)}),[],!1,null,null,null);e.default=component.exports},510:function(t,e,l){"use strict";l.r(e);var o=l(459),n=l(460),r={components:{BaseModal:o.default,NswButton:n.default},props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0}},methods:{returnToQuestionFlow:function(){this.$emit("close"),this.$router.push("/pathway")}}},c=l(16),component=Object(c.a)(r,(function(){var t=this,e=t._self._c;return e("base-modal",{attrs:{show:t.show,"max-width":t.maxWidth,title:"Update answers",closeable:t.closeable,scrollable:!1},on:{close:function(e){return t.$emit("close")}},scopedSlots:t._u([{key:"footer",fn:function(){return[e("nsw-button",{staticClass:"mr-4",attrs:{action:"secondary"},nativeOn:{click:function(e){return t.$emit("close")}}},[t._v("\n      Cancel\n    ")]),t._v(" "),e("nsw-button",{nativeOn:{click:function(e){return t.returnToQuestionFlow.apply(null,arguments)}}},[t._v(" Update ")])]},proxy:!0}])},[e("p",{staticClass:"leading-relaxed"},[t._v("\n    In order to update your answers, we will return you to the questionnaire.\n    Your original answers will be available for you to edit and re-submit.\n  ")])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{NswButton:l(460).default,BaseModal:l(459).default})}}]);