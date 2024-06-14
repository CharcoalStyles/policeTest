<template>
  <div>
    <hero-section
      image="/images/012 Administrative and Police 1.png"
      class="bg-nsw-brand-primary-blue py-12"
    >
      <div class="text-white">
        <div class="flex flex-row gap-2 mb-4">
          <img src="/icons/careerPathfinder.svg" />
          <h1 class="font-bold text-nsw-brand-primary-blue-light">
            CAREER PATHFINDER
          </h1>
        </div>
        <h1
          class="font-bold text-4xl xl:text-5xl leading-tight xl:w-11/12 mb-4"
        >
          Where can a career in the NSWPF take you?
        </h1>
        <p class="text-lg xl:text-xl">
          Identify and plan a career in the NSWPF based on your capabilities,
          skills, goals, experience, and interests.
        </p>
      </div>
    </hero-section>
    <section-container
      title="Explore roles and make a personalised career plan"
      :cols="2"
    >
      <feature-panel
        image="/images/rescueDrone.png"
        alt="Role Explorer"
        title="Role Explorer"
      >
        <nuxt-link to="/explorer">
          <div class="mb-6 w-5/6">
            Browse the broad array of roles and careers that exist in the NSWPF
          </div>
          <img src="/arrow.svg" />
        </nuxt-link>
      </feature-panel>
      <feature-panel
        image="/images/meeting.png"
        alt="Career Pathways Planner"
        title="Career Pathways Planner"
      >
        <nuxt-link to="/pathway">
          <div class="mb-6">
            Use this plan as a basis for career conversations, professional
            growth and identifying development opportunities.
          </div>
          <img src="/arrow.svg" />
        </nuxt-link>
      </feature-panel>
    </section-container>

    <section-container title="How it works">
      <div class="flex flex-col items-center md:items-stretch md:flex-row flex-wrap container">
        <div class="flex flex-col w-full md:w-1/2 lg:w-1/4">
          <img src="/figures/1.svg" class="h-64 mb-6" />
          <div class="mx-6">
            <p class="font-bold mb-2">Explore Roles</p>
            <p>Explore roles and pathways within NSWPF.</p>
          </div>
        </div>

        <div class="flex flex-col w-full md:w-1/2 lg:w-1/4">
          <img src="/figures/2.svg" class="h-64 mb-6" />
          <div class="mx-6">
            <p class="font-bold mb-2">Get personalised career pathways</p>
            <p>
              Explore and prioritise career pathways based on what matters to
              you.
            </p>
          </div>
        </div>

        <div class="flex flex-col w-full md:w-1/2 lg:w-1/4">
          <img src="/figures/3.svg" class="h-64 mb-6" />
          <div class="mx-6">
            <p class="font-bold mb-2">
              Understand the skills required for future roles
            </p>
            <p>
              Compare current and desired roles side by side to see the skills
              you may need to build or improve on.
            </p>
          </div>
        </div>

        <div class="flex flex-col w-full md:w-1/2 lg:w-1/4">
          <img src="/figures/4.svg" class="h-64 mb-6" />
          <div class="mx-6">
            <p class="font-bold mb-2">Save your plan</p>
            <p>Save your plan and use it to start a career conversation.</p>
          </div>
        </div>
      </div>
    </section-container>
  </div>
</template>

<script>
import FeaturePanel from '@/components/home/FeaturePanel'
import HeroSection from '@/components/home/HeroSection'
import SectionContainer from '@/components/home/SectionContainer'

export default {
  components: {
    FeaturePanel,
    HeroSection,
    SectionContainer
  },
  data() {
    return {
      videoID: '357726193',
      height: 500,
      options: {
        muted: true,
        autoplay: true
      },
      playerReady: false
    }
  },
  methods: {
    onReady() {
      this.playerReady = true
    },
    play() {
      this.$refs.player.play()
    },
    pause() {
      this.$refs.player.pause()
    }
  }
}
</script>
<style>
.vimeo-video {
  position: relative;
  padding-top: 56.25%;
}
.vimeo-video iframe {
  width: 100%;
  max-width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 0;
}
</style>
