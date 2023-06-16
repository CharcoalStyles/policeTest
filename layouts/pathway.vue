<template>
  <div class="flex flex-col min-h-screen max-w-screen antialiased text-base">
    <nsw-header />
    <div class="flex-grow">
      <div class="xl:container">
        <div class="p-4 md:py-16 md:px-6">
          <Nuxt />
        </div>
      </div>
    </div>
    <question-navigation :step-key="stepKey" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NswHeader from '@/components/nsw/NswHeader'
import QuestionNavigation from '@/components/pathway/QuestionNavigation'

export default {
  components: {
    NswHeader,
    QuestionNavigation
  },
  computed: {
    ...mapGetters([
      'filteredSteps',
      'flattenedSteps',
      'totalSteps',
      'getStepById',
      'getStepIndex',
      'getChildStepById',
      'getChildStepIndex',
      'getNextStepByCurrentIndex',
      'getPreviousStepByCurrentIndex',
      'getNextChildStepByCurrentIndex',
      'getPreviousChildStepByCurrentIndex'
    ]),

    /**
     * Generate step key to locate position in master sequence
     */
    stepKey() {
      return this.isChildStep() ? `${this.currentStep.id}-${this.currentChildStep().id}` : this.currentStep.id
    },

    /**
     * Current step based in url param id
     */
    currentStep() {
      return this.getStepById(this.$route.params.step)
    },

    /**
     * Current step based on id
     */
    currentStepIndex() {
      return this.getStepIndex(this.currentStep.id)
    },

    /**
     * Check if this step is the first
     */
    isFirstStep() {
      return this.currentStepIndex === 0
    },

    /**
     * Check if this step is the last
     */
    isLastStep() {
      return this.currentStepIndex === this.filteredSteps.length - 1
    }
  },
  methods: {
    isChildStep() {
      return this.$route.params.step && this.$route.params.id
    },

    /**
     * Current child step based in url param id
     */
    currentChildStep() {
      return this.getChildStepById(this.$route.params.step, this.$route.params.id)
    }
  }
}
</script>
