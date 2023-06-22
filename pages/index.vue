<template>
  <div class="bg-blob bg-no-repeat bg-right-50-screen">
    <hero-section image="/images/home-hero.jpg" class="">
      <div class="text-nsw-brand-grey-primary">
        <h1 class="font-bold text-4xl xl:text-5xl leading-tight xl:w-11/12 mb-6">
          Supporting individuals in procurement with career growth.
        </h1>
        <p class="w-11/12 mb-8">
          Build and manage a procurement career in the NSW Government based on procurement skills, capabilities and goals.
        </p>
      </div>
      <div>
        <nuxt-link to="/pathway" class="inline-flex items-center font-bold rounded-md h-10 md:h-12 px-6 md:px-8 text-sm md:text-base bg-nsw-brand-purple-dark text-white">
          Plan my career growth
        </nuxt-link>
      </div>
    </hero-section>
    <section-container title="Manage your career" link="/pathway" :cols="2">
      <feature-panel image="/images/home1.jpg" alt="Assess your skills and capabilities" title="Assess your skills and capabilities.">
        Identify your strengths and areas for development required for your next role. Compare current and desired roles side by side to see the skills you may need to build or improve on.
      </feature-panel>
      <feature-panel image="/images/home2.jpg" alt="Create a personalised career plan." title="Create a personalised career plan.">
        Get a personalised action plan with career opportunities that you can discuss with your manager. Access resources to take your career to the next level.
      </feature-panel>
    </section-container>

    <div class="bg-nsw-brand-purple-dark py-16 md:py-20 my-12 md:my-16">
      <div class="flex flex-col lg:flex-row px-4 md:px-6 xl:container space-y-6 lg:space-y-0 lg:space-x-6">
        <div class="flex flex-col flex-1 justify-center">
          <div class="text-white">
            <div class="font-bold mb-4">
              Role explorer tool
            </div>
            <h2 class="font-bold text-3xl xl:text-[32px] leading-tight xl:w-11/12 mb-4">
              Supporting individuals in procurement with career growth.
            </h2>
            <p class="w-11/12 mb-4">
              Build and manage a procurement career in the NSW Government based on procurement skills, capabilities and goals.
            </p>
          </div>
          <div>
            <nuxt-link to="/explorer" class="inline-flex items-center font-bold rounded-md h-10 md:h-12 px-6 md:px-8 text-sm md:text-base bg-white text-nsw-brand-grey-primary">
              Explore roles
            </nuxt-link>
          </div>
        </div>
        <div class="flex-1">
          <img src="/images/home-hero.jpg" alt="" class="w-full object-cover" style="aspect-ratio: 16/9;" />
        </div>
      </div>
    </div>

    <section-container title="How this tool can help you">
      <div class="flex flex-col md:flex-row md:justify-between md:ml-24 mt-6">
        <checkerboard-panel image="/images/illustration-personalised.svg" alt="Graphic showing how your interests influence your career plan." />
        <checkerboard-panel
          title="Get a personalised career pathway"
          description="Sort and prioritise career pathways based on what matters."
        />
      </div>

      <div class="flex flex-col-reverse md:flex-row md:justify-between md:mr-24">
        <checkerboard-panel
          title="Understand the skills required for future roles"
          description="Compare current and potential roles side by side to see the skills you may need to build or improve on."
        />
        <checkerboard-panel image="/images/illustration-understand.svg" alt="Graphic showing how your current role compares to your target role." />
      </div>

      <div class="flex flex-col md:flex-row md:justify-between md:ml-24">
        <checkerboard-panel image="/images/illustration-upskill.svg" alt="Graphic showing the different methods you can upskill." />
        <checkerboard-panel
          title="Access upskilling resources"
          description="Access resources to take your career to the next level, resource recommendations are based on future roles relevant to you."
        />
      </div>

      <div class="flex flex-col-reverse md:flex-row md:justify-between md:mr-24">
        <checkerboard-panel
          title="Share your plan"
          description="If you’re happy with the plan, share it with your manager ahead of your next one on one session."
        />
        <checkerboard-panel image="/images/illustration-share.svg" alt="Graphic showing how you can use the career planner." />
      </div>
    </section-container>

    <div class="bg-nsw-grey-50 py-16 md:py-20 mt-12 md:mt-16">
      <div class="flex flex-col lg:flex-row px-4 md:px-6 xl:container space-y-6 lg:space-y-0 lg:space-x-6">
        <div class="flex flex-col flex-1 justify-center">
          <div class="text-nsw-brand-grey-primary">
            <h2 class="font-bold text-3xl xl:text-[32px] leading-tight xl:w-11/12 mb-4">
              Explore upskilling resources
            </h2>
            <p class="w-10/12">
              View all procurement upskilling resources in one place and find what’s relevant to you.
            </p>
          </div>
        </div>
        <div class="flex flex-1 items-center md:justify-center">
          <nuxt-link to="/#" class="inline-flex items-center font-bold rounded-md h-10 md:h-12 px-6 md:px-8 text-sm md:text-base bg-nsw-brand-purple-dark text-white">
            ## View resources ##
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeaturePanel from '@/components/home/FeaturePanel'
import HeroSection from '@/components/home/HeroSection'
import SectionContainer from '@/components/home/SectionContainer'
import CheckerboardPanel from '@/components/home/CheckerboardPanel'

export default {
  components: {
    FeaturePanel,
    HeroSection,
    SectionContainer,
    CheckerboardPanel
  }
}
</script>
