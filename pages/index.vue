<template>
  <div class="bg-blob bg-no-repeat bg-right-50-screen">
    <hero-section image="/images/home-hero.jpg" class="bg-nsw-brand-psc-purple">
      <div class="text-white">
        <div class="font-bold mb-3 text-sm">
          Digital Career Pathways
        </div>
        <h1 class="font-bold text-4xl leading-tight xl:w-10/12 mb-6">
          Supporting individuals and managers with career growth.
        </h1>
        <p class="w-8/12 mb-8">
          Build and manage a digital career in NSW Government based on interests, capabilities, goals and past experiences.
        </p>
      </div>
      <nuxt-link to="/pathway" class="inline-flex items-center font-bold rounded-md h-10 md:h-12 px-6 md:px-8 text-sm md:text-base bg-white">
        Get started
      </nuxt-link>
    </hero-section>
    <section-container title="For individuals" link="/pathway" :cols="3">
      <feature-panel image="/images/home1.jpg" alt="Assess your skills and capabilities" title="Identify your strengths and areas for development required for your next role.">
        Understand your strengths and areas of development to build on for your next role. Get ideas on how to improve them.
      </feature-panel>
      <feature-panel image="/images/home2.jpg" alt="View digital roles within NSW Government" title="Learn about the digital roles currently available across NSW Government.">
        Better understand what digital roles currently exist in NSW Government and which agencies they sit in.
      </feature-panel>
      <feature-panel image="/images/home3.jpg" alt="Create a personalised career plan" title="Use this plan to discuss career growth and opportunities with your manager.">
        Create a personalised plan with career opportunities that you can discuss with your manager.
      </feature-panel>
    </section-container>
    <section-container title="For managers" class="mb-12" link="/pathway" :cols="3">
      <feature-panel image="/images/home4.jpg" alt="Group discussing a topic." title="Retain top talent by supporting career aspirations">
        Discuss with your team how they can reach career goals.
      </feature-panel>
      <feature-panel image="/images/home5.jpg" alt="Group talking in workshop." title="Improve the capability of your team">
        Outputs from the self-assessment tool create a tangible starting point for honest and productive performance conversations.
      </feature-panel>
      <feature-panel image="/images/home6.jpg" alt="Group listening in class." title="Take the guesswork out of career advice">
        Show possible career pathways and discuss skill development opportunities.
      </feature-panel>
    </section-container>
    <section-container title="How this tool can help you">
      <div class="flex flex-col md:flex-row md:justify-between">
        <checkerboard-panel
          title="Get a personalised career pathway"
          description="Sort and prioritise career pathways based on what matters."
          link="/pathway"
        />
        <checkerboard-panel image="/images/illustration-personalised.svg" alt="Graphic showing how your interests influence your career plan." />
      </div>

      <div class="flex flex-col-reverse md:flex-row md:justify-between">
        <checkerboard-panel image="/images/illustration-understand.svg" alt="Graphic showing how your current role compares to your target role." />
        <checkerboard-panel
          title="Understand the skills required for future roles"
          description="Compare current and potential roles side by side to see the skills you may need to build or improve on."
          link="/pathway"
        />
      </div>

      <div class="flex flex-col md:flex-row md:justify-between">
        <checkerboard-panel
          title="Access upskilling resources"
          description="Access resources to take your career to the next level, resource recommendations are based on future roles relevant to you."
          link="/pathway"
        />
        <checkerboard-panel image="/images/illustration-upskill.svg" alt="Graphic showing the different methods you can upskill." />
      </div>

      <div class="flex flex-col-reverse md:flex-row md:justify-between">
        <checkerboard-panel image="/images/illustration-share.svg" alt="Graphic showing how you can use the career planner." />
        <checkerboard-panel
          title="Share your plan"
          description="If you’re happy with the plan, share it with your manager ahead of your next one on one session."
          link="/pathway"
        />
      </div>
    </section-container>
    <hero-section image="/images/illustration-roleexplorer.svg" class="bg-nsw-grey-100 border-b border-nsw-grey-200 md:border-b-0">
      <div class="font-bold mb-3 text-sm">
        Digital careers in NSW Government
      </div>
      <h4 class="font-bold text-3xl leading-tight xl:w-10/12 mb-6">
        Explore digital careers with NSW Government
      </h4>
      <p class="w-8/12 mb-8">
        See all the various roles, levels and how they’re connected across NSW Government.
      </p>
      <nsw-button @click.native="$router.push('/explorer')">
        Explore now
      </nsw-button>
    </hero-section>
    <responsive-container class="my-6 md:my-3">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="mb-6 flex justify-center md:justify-start">
          <img src="/images/nsw-logo.png" alt="NSW Logo">
        </div>
        <div class="md:w-10/12 text-center md:text-left">
          <h4 class="font-bold text-lg mb-3">
            Meeting evolving citizen needs.
          </h4>
          <p>
            Highlighting exciting career opportunities in digital enables us to build a passionate workforce that has a clear career path for the future.
          </p>
        </div>
      </div>
    </responsive-container>
  </div>
</template>

<script>
import FeaturePanel from '@/components/home/FeaturePanel'
import HeroSection from '@/components/home/HeroSection'
import ResponsiveContainer from '@/components/ResponsiveContainer'
import SectionContainer from '@/components/home/SectionContainer'
import CheckerboardPanel from '@/components/home/CheckerboardPanel'
import NswButton from '@/components/nsw/NswButton'

export default {
  components: {
    NswButton,
    FeaturePanel,
    HeroSection,
    SectionContainer,
    CheckerboardPanel,
    ResponsiveContainer
  }
}
</script>