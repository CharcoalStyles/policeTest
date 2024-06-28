<template>
  <div>
    <hero-section
      image="/images/012 Administrative and Police 1.png"
      class="bg-nsw-brand-primary-blue py-12"
    >
      <div class="text-white">
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
      <nuxt-link to="/explorer">
        <feature-panel
          image="/images/rescueDrone.png"
          alt="Role Explorer"
          title="Role Explorer"
        >
          <div class="mb-6 w-5/6">
            Browse the various roles and careers that exist within the NSWPF.
          </div>
          <img src="/arrow.svg" />
        </feature-panel>
      </nuxt-link>
      <nuxt-link to="/pathway">
        <feature-panel
          image="/images/meeting.png"
          alt="Career Pathways Planner"
          title="Career Pathways Planner"
        >
          <div class="mb-6">
            Use this plan as a basis for career conversations, professional
            growth and identifying development opportunities.
          </div>
          <img src="/arrow.svg" />
        </feature-panel>
      </nuxt-link>
    </section-container>

    <section-container title="How it works">
      <div
        class="flex flex-col items-center md:items-stretch md:flex-row flex-wrap container"
      >
        <div class="flex flex-col w-full md:w-1/2 lg:w-1/4">
          <img src="/figures/1.svg" class="h-64 mb-6" />
          <div class="mx-6">
            <h4 class="font-bold text-xl mb-2">Explore Roles</h4>
            <p>Explore roles and pathways within NSWPF.</p>
          </div>
        </div>

        <div class="flex flex-col w-full md:w-1/2 lg:w-1/4">
          <img src="/figures/2.svg" class="h-64 mb-6" />
          <div class="mx-6">
            <h4 class="font-bold text-xl mb-2">
              Get personalised career pathways
            </h4>
            <p>
              Explore and prioritise career pathways based on what matters to
              you.
            </p>
          </div>
        </div>

        <div class="flex flex-col w-full md:w-1/2 lg:w-1/4">
          <img src="/figures/3.svg" class="h-64 mb-6" />
          <div class="mx-6">
            <h4 class="font-bold text-xl mb-2">
              Understand the skills required for future roles
            </h4>
            <p>
              Compare current and desired roles side by side to see the skills
              you may need to build or improve on.
            </p>
          </div>
        </div>

        <div class="flex flex-col w-full md:w-1/2 lg:w-1/4">
          <img src="/figures/4.svg" class="h-64 mb-6" />
          <div class="mx-6">
            <h4 class="font-bold text-xl mb-2">Save your plan</h4>
            <p>Save your plan and use it to start a career conversation.</p>
          </div>
        </div>
      </div>
    </section-container>

    <div class="mb-16">
      <div
        class="container flex flex-col md:flex-row mb-8 md:mb-16 items-center md:items-stretch"
      >
        <div class="w-full md:w-1/2">
          <img src="/images/individuals.png" class="p-6 object-cover" />
        </div>
        <div class="w-full md:w-1/2 px-4 over">
          <p class="text-3xl font-bold mb-4">Benefits for Individuals</p>
          <ul class="ml-4 list-disc">
            <li class="mb-3">
              <div>
                <p class="font-bold text-xl">View roles within NSWPF</p>
                <p>Explore roles and pathways within NSWPF.</p>
              </div>
            </li>

            <li class="mb-3">
              <div>
                <p class="font-bold text-xl">
                  Assess your skills and capabilities
                </p>
                <p>
                  Identify your strengths and areas for development required for
                  your next role.
                </p>
              </div>
            </li>

            <li class="mb-3">
              <div>
                <p class="font-bold text-xl">
                  Create a personalised career plan
                </p>
                <p>
                  Use this plan as a basis for career conversations,
                  professional growth and identifying development opportunities.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="container flex flex-col-reverse md:flex-row flex-wrap items-center md:items-stretch"
      >
        <div class="w-full md:w-1/2 px-4">
          <p class="text-3xl font-bold mb-4">Benefits for Managers</p>
          <ul class="ml-4 list-disc">
            <li class="mb-3">
              <div>
                <p class="font-bold text-xl">
                  Retain top talent by supporting career aspirations
                </p>
                <p>
                  Retain top talent by supporting team members in reaching their
                  desired career goal within NSWPF.
                </p>
              </div>
            </li>

            <li class="mb-3">
              <div>
                <p class="font-bold text-xl">
                  Improve the capability of your team
                </p>
                <p>
                  Show possible career pathways and identify areas for
                  improvement and development.
                </p>
              </div>
            </li>

            <li class="mb-3">
              <div>
                <p class="font-bold text-xl">
                  Start a meaningful career conversation
                </p>
                <p>
                  A self-assessment tool will create a tangible starting point
                  for honest and tailored career conversations.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="w-full md:w-1/2">
          <img src="/images/managers.png" class="p-6 object-cover" />
        </div>
      </div>
    </div>

    <div class="container mb-16">
      <hr class="my-4" />
      <div class="flex flex-row gap-4 lg:gap-0 justify-between">
        <div class="flex flex-col lg:flex-row gap-4 lg:gap-12">
          <img src="/pcc.png" class="h-12 xl:h-16" />
          <img src="/tcsc.svg" class="h-12 xl:h-16" />
        </div>
        <div class="w-1/2">
          <p class="text-xs text-nsw-brand-primary-blue pr-2">
            The NSWPF Career Pathfinder data is updated periodically from NSWPF
            role descriptions, NSWPF Job Family Model, pay grades/scales and the
            NSWPF Public Sector Capability Framework. All care has been taken
            to provide correct information, however if you identify an
            inaccuracy, we welcome your feedback. #PCC-Careers.
          </p>
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
