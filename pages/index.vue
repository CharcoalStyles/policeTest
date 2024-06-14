<template>
  <div class="bg-blob bg-no-repeat bg-right-50-screen">
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
    <section-container title="Explore roles and make a personalised career plan" :cols="2">
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

    <div class="bg-nsw-brand-purple-dark py-16 md:py-20 my-12 md:my-16">
      <div
        class="flex flex-col lg:flex-row px-4 md:px-6 xl:container space-y-6 lg:space-y-0 lg:space-x-6"
      >
        <div class="flex flex-col flex-1 justify-center">
          <div class="text-white">
            <!-- <div class="font-bold mb-4">
              Role explorer tool
            </div> -->
            <h2
              class="font-bold text-3xl xl:text-[32px] leading-tight xl:w-11/12 mb-4"
            >
              Learn more about working in procurement
            </h2>
            <p class="w-11/12 mb-4">
              Hear about what it’s like to work in public sector procurement,
              including the benefits and opportunities.
            </p>
          </div>
          <!-- <div>
            <nuxt-link to="/explorer" class="inline-flex items-center font-bold rounded-md h-10 md:h-12 px-6 md:px-8 text-sm md:text-base bg-white text-nsw-brand-grey-primary">
              Explore roles
            </nuxt-link>
          </div> -->
        </div>
        <div class="flex-1">
          <client-only>
            <vimeo-player
              ref="player"
              class="vimeo-video"
              :video-id="videoID"
              :player-height="height"
              :controls="true"
              video-url="https://vimeo.com/357726193/b1773b87c6"
              @ready="onReady"
            ></vimeo-player>
          </client-only>
          <!-- <img src="/images/home-hero.jpg" alt="" class="w-full object-cover" style="aspect-ratio: 16/9;" /> -->
        </div>
      </div>
    </div>

    <section-container title="How this tool can help you" :cols="1">
      <div class="lg:w-10/12 lg:my-8">
        <img
          src="images/feature-comparison.png"
          alt="Skills and capabilities comparison table"
          class="w-full object-cover mb-8"
        />
        <h3 class="font-bold text-lg leading-tight xl:w-11/12 mb-4">
          Understand the skills required for future roles
        </h3>
        <p class="w-11/12 mb-4">
          Compare current and desired roles side by side to see the skills you
          may need to build or improve on.
        </p>
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
