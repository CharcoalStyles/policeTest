<template>
  <div class="pb-32">
    <dynamic-step :step="currentStep" />
    <navigation-actions>
      <template #left>
        <nsw-button
          v-if="currentStepIndex"
          action="secondary"
          @click.native="goToPreviousStep"
        >
          Back
        </nsw-button>
      </template>
      <template #right>
        <nsw-button
          :disabled="isStepDisabled(currentStep)"
          class="flex flex-row items-center"
          @click.native="goToNextStep"
        >
          {{ nextLabel }}
          <img src="/icons/sml-arrow.svg" class="ml-3 shrink-0" alt="Help icon" />
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
    ...mapGetters(['getHumanReadableAnswerValue']),
    nextLabel() {
      if (this.isLastStep) {
        return 'Create Career Plan '
      }
      if (this.currentStepIndex === 0) {
        return 'Get started'
      }
      return 'Next'
    }
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

      const previousStep = this.getPreviousStepByCurrentIndex(
        this.currentStepIndex
      )

      // If previous step has child steps redirect to last
      if ('steps' in previousStep && previousStep.steps.length > 0) {
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
        if ('steps' in this.currentStep && this.currentStep.steps.length > 0) {
          const nextChildStep = this.$collect(this.currentStep.steps).first()
          this.$router.push(
            `/pathway/${this.currentStep.id}/${nextChildStep.id}`
          )
        } else {
          this.$router.push(`/pathway/${nextStep.id}`)
        }
      }
    }
  }
}
</script>
