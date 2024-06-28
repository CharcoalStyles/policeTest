(window.webpackJsonp=window.webpackJsonp||[]).push([[62,19,20,21],{514:function(t,e,l){"use strict";l.r(e);var r={props:{title:{type:String,required:!0},alt:{type:String,required:!0},image:{type:String,required:!0}}},n=l(15),component=Object(n.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"bg-white rounded overflow-hidden shadow-lg min-h-[440px] xl:min-h-[520px]"},[e("img",{staticClass:"w-full object-cover bg-nsw-grey-200 border-b-4 border-[#FECD47]",staticStyle:{"aspect-ratio":"9/4"},attrs:{src:t.image,alt:t.alt}}),t._v(" "),e("div",{staticClass:"p-4 md:p-8"},[e("div",{staticClass:"font-bold mb-3 text-xl",domProps:{textContent:t._s(t.title)}}),t._v(" "),e("p",[t._t("default")],2)])])}),[],!1,null,null,null);e.default=component.exports},515:function(t,e,l){"use strict";l.r(e);var r={props:{image:{type:String,required:!0},imageAlt:{type:String,default:""}}},n=l(15),component=Object(n.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"border-b border-nsw-grey-200"},[e("div",{staticClass:"w-full xl:container flex flex-col md:flex-row justify-between"},[e("div",{staticClass:"flex md:w-1/2 px-4 md:px-6"},[e("div",{staticClass:"flex flex-1 flex-col justify-center py-8"},[t._t("default")],2)]),t._v(" "),e("img",{staticClass:"md:w-1/2 2xl:w-2/5 object-cover",attrs:{src:t.image,alt:t.imageAlt}})])])}),[],!1,null,null,null);e.default=component.exports},516:function(t,e,l){"use strict";l.r(e);l(248),l(162);var r={props:{title:{type:String,required:!0},cols:{type:[Number,String],default:""},link:{type:[String,Boolean],default:!1}},computed:{columns:function(){return this.cols?3===this.cols?"md:grid-cols-3":"md:grid-cols-2":null}}},n=l(15),component=Object(n.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"w-full xl:container"},[e("div",{staticClass:"px-4 md:px-6 my-12 md:my-16"},[e("div",{staticClass:"flex flex-col md:flex-row justify-between"},[e("h2",{staticClass:"font-bold text-2xl md:text-[32px] mb-3 md:mb-6"},[t._v("\n        "+t._s(t.title)+"\n      ")])]),t._v(" "),e("div",{staticClass:"grid gap-6 xl:gap-8",class:t.columns},[t._t("default")],2),t._v(" "),t.link?e("nuxt-link",{staticClass:"inline-flex items-center font-bold rounded-md h-10 md:h-12 px-6 md:px-8 text-sm md:text-base bg-nsw-brand-purple-dark text-white mt-8",attrs:{to:t.link}},[t._v("\n      Plan my career growth\n    ")]):t._e()],1)])}),[],!1,null,null,null);e.default=component.exports},552:function(t,e,l){"use strict";l.r(e);var r=l(514),n=l(515),o=l(516),c={components:{FeaturePanel:r.default,HeroSection:n.default,SectionContainer:o.default},data:function(){return{videoID:"357726193",height:500,options:{muted:!0,autoplay:!0},playerReady:!1}},methods:{onReady:function(){this.playerReady=!0},play:function(){this.$refs.player.play()},pause:function(){this.$refs.player.pause()}}},d=l(15),component=Object(d.a)(c,(function(){var t=this,e=t._self._c;return e("div",[e("hero-section",{staticClass:"bg-nsw-brand-primary-blue py-12",attrs:{image:"/images/012 Administrative and Police 1.png"}},[e("div",{staticClass:"text-white"},[e("h1",{staticClass:"font-bold text-4xl xl:text-5xl leading-tight xl:w-11/12 mb-4"},[t._v("\n        Where can a career in the NSWPF take you?\n      ")]),t._v(" "),e("p",{staticClass:"text-lg xl:text-xl"},[t._v("\n        Identify and plan a career in the NSWPF based on your capabilities,\n        skills, goals, experience, and interests.\n      ")])])]),t._v(" "),e("section-container",{attrs:{title:"Explore roles and make a personalised career plan",cols:2}},[e("nuxt-link",{attrs:{to:"/explorer"}},[e("feature-panel",{attrs:{image:"/images/rescueDrone.png",alt:"Role Explorer",title:"Role Explorer"}},[e("div",{staticClass:"mb-6 w-5/6"},[t._v("\n          Browse the various roles and careers that exist within the NSWPF.\n        ")]),t._v(" "),e("img",{attrs:{src:"/arrow.svg"}})])],1),t._v(" "),e("nuxt-link",{attrs:{to:"/pathway"}},[e("feature-panel",{attrs:{image:"/images/meeting.png",alt:"Career Pathways Planner",title:"Career Pathways Planner"}},[e("div",{staticClass:"mb-6"},[t._v("\n          Use this plan as a basis for career conversations, professional\n          growth and identifying development opportunities.\n        ")]),t._v(" "),e("img",{attrs:{src:"/arrow.svg"}})])],1)],1),t._v(" "),e("section-container",{attrs:{title:"How it works"}},[e("div",{staticClass:"flex flex-col items-center md:items-stretch md:flex-row flex-wrap container"},[e("div",{staticClass:"flex flex-col w-full md:w-1/2 lg:w-1/4"},[e("img",{staticClass:"h-64 mb-6",attrs:{src:"/figures/1.svg"}}),t._v(" "),e("div",{staticClass:"mx-6"},[e("h4",{staticClass:"font-bold text-xl mb-2"},[t._v("Explore Roles")]),t._v(" "),e("p",[t._v("Explore roles and pathways within NSWPF.")])])]),t._v(" "),e("div",{staticClass:"flex flex-col w-full md:w-1/2 lg:w-1/4"},[e("img",{staticClass:"h-64 mb-6",attrs:{src:"/figures/2.svg"}}),t._v(" "),e("div",{staticClass:"mx-6"},[e("h4",{staticClass:"font-bold text-xl mb-2"},[t._v("\n            Get personalised career pathways\n          ")]),t._v(" "),e("p",[t._v("\n            Explore and prioritise career pathways based on what matters to\n            you.\n          ")])])]),t._v(" "),e("div",{staticClass:"flex flex-col w-full md:w-1/2 lg:w-1/4"},[e("img",{staticClass:"h-64 mb-6",attrs:{src:"/figures/3.svg"}}),t._v(" "),e("div",{staticClass:"mx-6"},[e("h4",{staticClass:"font-bold text-xl mb-2"},[t._v("\n            Understand the skills required for future roles\n          ")]),t._v(" "),e("p",[t._v("\n            Compare current and desired roles side by side to see the skills\n            you may need to build or improve on.\n          ")])])]),t._v(" "),e("div",{staticClass:"flex flex-col w-full md:w-1/2 lg:w-1/4"},[e("img",{staticClass:"h-64 mb-6",attrs:{src:"/figures/4.svg"}}),t._v(" "),e("div",{staticClass:"mx-6"},[e("h4",{staticClass:"font-bold text-xl mb-2"},[t._v("Save your plan")]),t._v(" "),e("p",[t._v("Save your plan and use it to start a career conversation.")])])])])]),t._v(" "),t._m(0),t._v(" "),t._m(1)],1)}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"mb-16"},[e("div",{staticClass:"container flex flex-col md:flex-row mb-8 md:mb-16 items-center md:items-stretch"},[e("div",{staticClass:"w-full md:w-1/2"},[e("img",{staticClass:"p-6 object-cover",attrs:{src:"/images/individuals.png"}})]),t._v(" "),e("div",{staticClass:"w-full md:w-1/2 px-4 over"},[e("p",{staticClass:"text-3xl font-bold mb-4"},[t._v("Benefits for Individuals")]),t._v(" "),e("ul",{staticClass:"ml-4 list-disc"},[e("li",{staticClass:"mb-3"},[e("div",[e("p",{staticClass:"font-bold text-xl"},[t._v("View roles within NSWPF")]),t._v(" "),e("p",[t._v("Explore roles and pathways within NSWPF.")])])]),t._v(" "),e("li",{staticClass:"mb-3"},[e("div",[e("p",{staticClass:"font-bold text-xl"},[t._v("\n                Assess your skills and capabilities\n              ")]),t._v(" "),e("p",[t._v("\n                Identify your strengths and areas for development required for\n                your next role.\n              ")])])]),t._v(" "),e("li",{staticClass:"mb-3"},[e("div",[e("p",{staticClass:"font-bold text-xl"},[t._v("\n                Create a personalised career plan\n              ")]),t._v(" "),e("p",[t._v("\n                Use this plan as a basis for career conversations,\n                professional growth and identifying development opportunities.\n              ")])])])])])]),t._v(" "),e("div",{staticClass:"container flex flex-col-reverse md:flex-row flex-wrap items-center md:items-stretch"},[e("div",{staticClass:"w-full md:w-1/2 px-4"},[e("p",{staticClass:"text-3xl font-bold mb-4"},[t._v("Benefits for Managers")]),t._v(" "),e("ul",{staticClass:"ml-4 list-disc"},[e("li",{staticClass:"mb-3"},[e("div",[e("p",{staticClass:"font-bold text-xl"},[t._v("\n                Retain top talent by supporting career aspirations\n              ")]),t._v(" "),e("p",[t._v("\n                Retain top talent by supporting team members in reaching their\n                desired career goal within NSWPF.\n              ")])])]),t._v(" "),e("li",{staticClass:"mb-3"},[e("div",[e("p",{staticClass:"font-bold text-xl"},[t._v("\n                Improve the capability of your team\n              ")]),t._v(" "),e("p",[t._v("\n                Show possible career pathways and identify areas for\n                improvement and development.\n              ")])])]),t._v(" "),e("li",{staticClass:"mb-3"},[e("div",[e("p",{staticClass:"font-bold text-xl"},[t._v("\n                Start a meaningful career conversation\n              ")]),t._v(" "),e("p",[t._v("\n                A self-assessment tool will create a tangible starting point\n                for honest and tailored career conversations.\n              ")])])])])]),t._v(" "),e("div",{staticClass:"w-full md:w-1/2"},[e("img",{staticClass:"p-6 object-cover",attrs:{src:"/images/managers.png"}})])])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"container mb-16"},[e("hr",{staticClass:"my-4"}),t._v(" "),e("div",{staticClass:"flex flex-row gap-4 lg:gap-0 justify-between"},[e("div",{staticClass:"flex flex-col lg:flex-row gap-4 lg:gap-12"},[e("img",{staticClass:"h-12 xl:h-16",attrs:{src:"/pcc.png"}}),t._v(" "),e("img",{staticClass:"h-12 xl:h-16",attrs:{src:"/tcsc.svg"}})]),t._v(" "),e("div",{staticClass:"w-1/2"},[e("p",{staticClass:"text-xs text-nsw-brand-primary-blue pr-2"},[t._v("\n          The NSWPF Career Pathfinder data is updated periodically from NSWPF\n          role descriptions, NSWPF Job Family Model, pay grades/scales and the\n          NSWPF Public Sector Capability Framework. All care has been taken\n          to provide correct information, however if you identify an\n          inaccuracy, we welcome your feedback. #PCC-Careers.\n        ")])])])])}],!1,null,null,null);e.default=component.exports}}]);