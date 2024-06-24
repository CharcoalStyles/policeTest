(window.webpackJsonp=window.webpackJsonp||[]).push([[24,26],{461:function(t,e,n){"use strict";n.r(e);var r={props:{action:{type:String,default:"primary"},size:{type:String,default:"md"},type:{type:String,default:"button"}},computed:{colourClasses:function(){switch(this.action){case"secondary":return"bg-white hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue";case"secondary-outline":return"hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue";case"highlight":return"bg-nsw-brand-primary-highlight text-white focus:bg-nsw-brand-tertiary-blue";case"psc":return"bg-nsw-brand-purple-dark text-white focus:bg-nsw-brand-tertiary-blue";default:return"bg-nsw-brand-primary-blue text-white focus:bg-nsw-brand-tertiary-blue"}},sizeClasses:function(){return"highlight"===this.size?"bg-nsw-brand-primary-highlight":"h-10 md:h-12 px-6 md:px-8 text-sm md:text-base"}}},o=n(11),component=Object(o.a)(r,(function(){var t=this;return(0,t._self._c)("button",{staticClass:"font-bold rounded-md focus:border-nsw-brand-tertiary-blue focus:outline-buttons disabled:opacity-75 whitespace-no-wrap",class:[t.colourClasses,t.sizeClasses],attrs:{type:t.type}},[t._t("default")],2)}),[],!1,null,null,null);e.default=component.exports},498:function(t,e,n){"use strict";n.r(e);var r={components:{BaseModal:n(251).default},props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"}},data:function(){return{panels:[{title:"Explore roles",text:"Search via keywords, skills and salary to understand where roles sit inside the NSW Police Force.",alt:"Graphic showing a magnifying glass near some cards representing job roles."},{title:"Understand the relationships between roles",text:"See how one role relates to another based on skills, grade, salary and role functions.",alt:"Graphic showing arrows between some cards representing job roles."},{title:"Take action toward desired role",text:"Once you find a role of interest, use the Pathways tool to get a personalised action plan.",alt:"Graphic showing a card representing a job role being moved."}],panel:0}},computed:{nextButtonText:function(){return this.isLastPanel?"Explore roles":"Next"},currentPanel:function(){return this.panels[this.panel]},panelImage:function(){return"/onboarding-".concat(this.panel,".svg")},isFirstPanel:function(){return 0===this.panel},isLastPanel:function(){return 2===this.panel}},methods:{pagePanelNext:function(){this.panel++},pagePanelPrevious:function(){this.panel--},nextButtonAction:function(){this.isLastPanel?this.$emit("close"):this.pagePanelNext()}}},o=n(11),component=Object(o.a)(r,(function(){var t=this,e=t._self._c;return e("base-modal",{attrs:{show:t.show,"max-width":t.maxWidth,title:"Role Explorer",closeable:!0,scrollable:!1},on:{close:function(e){return t.$emit("close")}},scopedSlots:t._u([{key:"footer",fn:function(){return[e("div",[e("transition",{attrs:{name:"fade"}},[t.isFirstPanel?t._e():e("nsw-button",{attrs:{action:"secondary"},nativeOn:{click:function(e){return t.pagePanelPrevious.apply(null,arguments)}}},[t._v("\n          Back\n        ")])],1)],1),t._v(" "),e("div",[e("nsw-button",{nativeOn:{click:function(e){return t.nextButtonAction.apply(null,arguments)}}},[t._v("\n        "+t._s(t.nextButtonText)+"\n      ")])],1)]},proxy:!0}])},[e("div",{staticClass:"flex flex-col items-center justify-center"},[e("img",{staticClass:"mb-6",attrs:{src:t.panelImage,alt:t.currentPanel.alt}}),t._v(" "),e("h2",{staticClass:"font-bold text-lg mb-2"},[t._v("\n      "+t._s(t.currentPanel.title)+"\n    ")]),t._v(" "),e("p",{staticClass:"text-center"},[t._v("\n      "+t._s(t.currentPanel.text)+"\n    ")])])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{NswButton:n(461).default,BaseModal:n(251).default})}}]);