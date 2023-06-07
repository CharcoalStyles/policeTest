import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'filteredSteps',
      'totalSteps',
      'getStepById',
      'getStepIndex',
      'getNextStepByCurrentIndex',
      'getPreviousStepByCurrentIndex'
    ]),
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
  }
}
