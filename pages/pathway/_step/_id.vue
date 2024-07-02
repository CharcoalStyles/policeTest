<template>
  <div class="pb-32">
    <dynamic-step :step="currentChildStep" />
    <navigation-actions>
      <template #left>
        <nsw-button action="secondary" @click.native="goToPreviousStep">
          Back
        </nsw-button>
      </template>
      <template #right>
        <nsw-button
          :disabled="isChildStepDisabled(currentChildStep)"
          @click.native="goToNextStep"
        >
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
    NavigationActions,
    DynamicStep
  },
  mixins: [step, validation],
  computed: {
    ...mapGetters([
      'getChildStepById',
      'getChildStepIndex',
      'getNextChildStepByCurrentIndex',
      'getPreviousChildStepByCurrentIndex'
    ]),
    /**
     * Current child step based in url param id
     */
    currentChildStep() {
      return this.getChildStepById(
        this.$route.params.step,
        this.$route.params.id
      )
    },

    /**
     * Current step index based on id
     */
    currentChildStepIndex() {
      return this.getChildStepIndex(
        this.$route.params.step,
        this.$route.params.id
      )
    },

    /**
     * Check if this child step is the first
     */
    isFirstChildStep() {
      return this.currentChildStepIndex === 0
    },

    /**
     * Check if this child step is the last
     */
    isLastChildStep() {
      return this.currentChildStepIndex === this.currentStep.steps.length - 1
    }
  },
  created() {
    this.$azureInsights.trackEvent({
      name: 'Pathway Step',
      step: this.currentStep.id,
      stepChild: this.currentChildStep.id
    })
    // 404 if the step id is invalid
    if (!this.currentStep || !this.currentChildStep) {
      return this.$nuxt.error({ statusCode: 404, message: 'Step not found' })
    }
  },
  methods: {
    /**
     * Redirect to last step
     */
    goToPreviousStep() {
      // Redirect to previous parent step
      if (this.isFirstChildStep) {
        this.$router.push(`/pathway/${this.currentStep.id}`)
      } else {
        // Redirect to next child step
        const previousChildStep = this.getPreviousChildStepByCurrentIndex(
          this.currentStep.id,
          this.currentChildStepIndex
        )
        this.$router.push(
          `/pathway/${this.currentStep.id}/${previousChildStep.id}`
        )
      }
    },

    /**
     * Redirect to next step
     */
    goToNextStep() {
      // Redirect to next parent step
      if (this.isLastChildStep) {
        const nextStep = this.getNextStepByCurrentIndex(this.currentStepIndex)
        this.$router.push(`/pathway/${nextStep.id}`)
      } else {
        // Redirect to next child step
        const nextChildStep = this.getNextChildStepByCurrentIndex(
          this.currentStep.id,
          this.currentChildStepIndex
        )
        this.$router.push(`/pathway/${this.currentStep.id}/${nextChildStep.id}`)
      }
    }
  }
}
</script>
