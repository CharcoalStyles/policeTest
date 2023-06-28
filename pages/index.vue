<template>
  <div class="bg-blob bg-no-repeat bg-right-50-screen">
    <hero-section image="/images/home-hero.jpg" class="">
      <div class="text-nsw-brand-grey-primary">
        <h2 class="font-bold text-lg leading-tight xl:w-11/12 mb-4">
          Procurement Career Pathway Tool
        </h2>
        <h1 class="font-bold text-4xl xl:text-5xl leading-tight xl:w-11/12 mb-4">
          Supporting you to develop your procurement career
        </h1>
        <p class="text-lg xl:text-xl w-11/12">
          Get a personalised career plan to help you build and manage a procurement career in the NSW public sector.
        </p>
      </div>
    </hero-section>
    <section-container title="Plan your career pathway" :cols="2">
      <feature-panel image="/images/home1.jpg" alt="Explore roles" title="Explore roles">
        <div class="mb-6">
          See types of procurement roles that are common across the NSW public sector, and how they’re connected.
        </div>
        <nuxt-link to="/explorer" class="inline-flex items-center font-bold rounded-md h-10 md:h-12 px-6 md:px-8 text-sm md:text-base bg-nsw-brand-purple-dark text-white">
          Explore role types
        </nuxt-link>
      </feature-panel>
      <feature-panel image="/images/home2.jpg" alt="Assess your skills and capabilities" title="Assess your skills and capabilities">
        <div class="mb-6">
          Compare your current and target roles side by side to see the skills you may need to improve upon, and access upskilling resources to take your career to the next level.
        </div>
        <nuxt-link to="/pathway" class="inline-flex items-center font-bold rounded-md h-10 md:h-12 px-6 md:px-8 text-sm md:text-base bg-nsw-brand-purple-dark text-white">
          Get my career plan
        </nuxt-link>
      </feature-panel>
    </section-container>

    <div class="bg-nsw-brand-purple-dark py-16 md:py-20 my-12 md:my-16">
      <div class="flex flex-col lg:flex-row px-4 md:px-6 xl:container space-y-6 lg:space-y-0 lg:space-x-6">
        <div class="flex flex-col flex-1 justify-center">
          <div class="text-white">
            <!-- <div class="font-bold mb-4">
              Role explorer tool
            </div> -->
            <h2 class="font-bold text-3xl xl:text-[32px] leading-tight xl:w-11/12 mb-4">
              Learn more about working in procurement
            </h2>
            <p class="w-11/12 mb-4">
              Hear about what it’s like to work in public sector procurement, including the benefits and opportunities.
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
            <vimeo-player ref="player" class="vimeo-video" :video-id="videoID" :player-height="height" :controls="true" video-url="https://vimeo.com/357726193/b1773b87c6" @ready="onReady"></vimeo-player>
          </client-only>
          <!-- <img src="/images/home-hero.jpg" alt="" class="w-full object-cover" style="aspect-ratio: 16/9;" /> -->
        </div>
      </div>
    </div>

    <section-container title="How this tool can help you" :cols="2">
      <div class="lg:w-10/12 lg:my-8">
        <img src="images/feature-comparison.png" :alt="alt" class="w-full object-cover mb-8">
        <h3 class="font-bold text-lg leading-tight xl:w-11/12 mb-4">
          Understand the skills required for future roles
        </h3>
        <p class="w-11/12 mb-4">
          Compare current and desired roles side by side to see the skills you may need to build or improve on.
        </p>
      </div>
      <div class="lg:w-10/12 lg:my-8">
        <img src="images/feature-upskilling.png" :alt="alt" class="w-full object-cover mb-8">
        <h3 class="font-bold text-lg leading-tight xl:w-11/12 mb-4">
          Access upskilling resources
        </h3>
        <p class="w-11/12 mb-4">
          Access resources to take your career to the next level. Resource recommendations are based on skills and capabilities relevant to you.
        </p>
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
              View all procurement upskilling resources in one place to find what’s relevant to you.
            </p>
          </div>
        </div>
        <div class="flex flex-1 items-center md:justify-center">
          <nuxt-link to="/#" class="inline-flex items-center font-bold rounded-md h-10 md:h-12 px-6 md:px-8 text-sm md:text-base bg-nsw-brand-purple-dark text-white">
            ## View all resources ##
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
