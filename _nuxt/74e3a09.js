(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{521:function(e,t,n){"use strict";n.r(t);n(60),n(82),n(61),n(98);var l={props:{step:{type:Object,required:!0}},computed:{disabled:function(option){return!!this.step.schema.field.limit&&this.answer.length>=this.step.schema.field.limit},answer:{get:function(){var e;return null!==(e=this.$store.state.pathway.answers[this.step.id])&&void 0!==e&&e.value?this.$store.state.pathway.answers[this.step.id].value:this.step.schema.field.value?this.step.schema.field.value:[]},set:function(e){this.$store.dispatch("saveQuestionAnswer",{id:this.step.id,value:e})}}}},r=n(16),component=Object(r.a)(l,(function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"nsw-forms"},[t("div",{staticClass:"nsw-form-group"},[t("fieldset",{staticClass:"nsw-form-fieldset"},[t("legend",{staticClass:"sr-only"},[e._v("\n          "+e._s(e.step.title)+"\n        ")]),e._v(" "),e.step.schema.field.limit?t("p",{staticClass:"font-bold"},[e._v("\n          You can select a maximum of "+e._s(e.step.schema.field.limit)+" options\n        ")]):e._e(),e._v(" "),t("div",{staticClass:"nsw-form-radio"},e._l(e.step.schema.field.options,(function(option){return t("div",{key:option.value},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.answer,expression:"answer"}],staticClass:"nsw-form-checkbox__input",attrs:{id:option.value,name:option.value,disabled:!e.answer.includes(option.value)&&e.disabled,type:"checkbox"},domProps:{value:option.value,checked:Array.isArray(e.answer)?e._i(e.answer,option.value)>-1:e.answer},on:{change:function(t){var n=e.answer,l=t.target,r=!!l.checked;if(Array.isArray(n)){var c=option.value,o=e._i(n,c);l.checked?o<0&&(e.answer=n.concat([c])):o>-1&&(e.answer=n.slice(0,o).concat(n.slice(o+1)))}else e.answer=r}}}),e._v(" "),t("label",{staticClass:"nsw-form-checkbox__label",attrs:{for:option.value}},[e._v(e._s(option.title))])])})),0)])])])])}),[],!1,null,null,null);t.default=component.exports}}]);