(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{507:function(e,t,r){"use strict";r.r(t);r(163);var n=r(499),l=r.n(n),o=(r(500),{components:{VueSlider:l.a},props:{value:{type:Array,required:!0},min:{type:Number,required:!0},max:{type:Number,required:!0}},data:function(){return{range:[0,100]}},watch:{value:{immediate:!0,handler:function(e){this.range=e}}},created:function(){this.railStyle={backgroundColor:"#A0A4AE"},this.processStyle={backgroundColor:"#002664"},this.dotStyle={backgroundColor:"#002664",boxShadow:"none"}},methods:{updateValue:function(){this.range[0]>18e4&&(this.range[0]=18e4,this.$refs.slider.setValue(this.range)),this.range[1]<8e4&&(this.range[1]=8e4,this.$refs.slider.setValue(this.range)),this.$emit("input",this.range)}}}),d=r(16),component=Object(d.a)(o,(function(){var e=this;return(0,e._self._c)("vue-slider",{ref:"slider",attrs:{min:e.min,max:e.max,"min-range":100,interval:1e3,"enable-cross":!1,"rail-style":e.railStyle,"process-style":e.processStyle,"dot-style":e.dotStyle,"dot-size":17,tooltip:"none",height:2},on:{change:e.updateValue},model:{value:e.range,callback:function(t){e.range=t},expression:"range"}})}),[],!1,null,null,null);t.default=component.exports}}]);