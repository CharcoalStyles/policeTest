<template>
  <div class="min-h-screen pb-32">
    <dynamic-step :step="currentStep" />
    <navigation-actions>
      <template #left>
        <nsw-button v-if="currentStepIndex" action="secondary" @click.native="goToPreviousStep">
          Back
        </nsw-button>
      </template>
      <template #right>
        <nsw-button :disabled="isStepDisabled(currentStep)" @click.native="goToNextStep">
          Next
        </nsw-button>
      </template>
    </navigation-actions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import step from '@/mixins/step'
import validation from '@/mixins/validation'
import DynamicStep from '@/components/pathway/DynamicStep'
import NavigationActions from '@/components/pathway/NavigationActions'
import NswButton from '@/components/nsw/NswButton'

export default {
  layout: 'pathway',
  components: {
    NswButton,
    DynamicStep,
    NavigationActions
  },
  mixins: [step, validation],
  computed: {
    ...mapGetters([
      'getHumanReadableAnswerValue'
    ])
  },
  created() {
    // 404 if the step id is invalid
    if (!this.currentStep) {
      return this.$nuxt.error({ statusCode: 404, message: 'Step not found' })
    }
  },
  methods: {
    /**
     * Redirect to previous step
     */
    goToPreviousStep() {
      // No more steps
      if (this.isFirstStep) {
        return
      }

      const previousStep = this.getPreviousStepByCurrentIndex(this.currentStepIndex)

      // If previous step has child steps redirect to last
      if ('steps' in previousStep) {
        const previousChildStep = this.$collect(previousStep.steps).last()
        this.$router.push(`/pathway/${previousStep.id}/${previousChildStep.id}`)
      } else {
        // Redirect to previous parent step
        this.$router.push(`/pathway/${previousStep.id}`)
      }
    },

    /**
     * Redirect to next step
     */
    goToNextStep() {
      // No more steps
      if (this.isLastStep) {
        // Mark the questions as complete for middleware
        this.$store.dispatch('markQuestionsComplete')
        // Redirect
        this.$router.push('/pathway/results')
      } else {
        const nextStep = this.getNextStepByCurrentIndex(this.currentStepIndex)

        // If this step has child steps redirect to first
        if ('steps' in this.currentStep) {
          const nextChildStep = this.$collect(this.currentStep.steps).first()
          this.$router.push(`/pathway/${this.currentStep.id}/${nextChildStep.id}`)
        } else {
          this.$router.push(`/pathway/${nextStep.id}`)
        }
      }
    }
  }
}
</script>
