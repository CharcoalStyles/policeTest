<template>
  <div class="fixed bottom-0 w-full bg-white">
    <div class="h-1 bg-nsw-grey-100 block">
      <div class="h-1 bg-nsw-brand-primary-blue transition-all duration-300 ease-in-out" :style="{ width: `${currentProgress}%` }" />
    </div>
    <div class="h-20 md:h-24 flex items-center justify-center xl:container">
      <div class="font-bold">
        <div class="inline sm:hidden">
          {{ currentStepNumber + 1 }} / {{ totalStepsNumber }}
        </div>
        <div class="hidden sm:inline">
          Step {{ currentStepNumber + 1 }} of {{ totalStepsNumber }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    progress: {
      type: Number,
      default: 0
    },
    stepKey: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'flattenedSteps'
    ]),
    totalStepsNumber() {
      return this.flattenedSteps.length
    },
    currentStepNumber() {
      return this.flattenedSteps.findIndex(step => step === this.stepKey)
    },
    currentProgress() {
      return Math.ceil(this.currentStepNumber / this.totalStepsNumber * 100)
    }
  }
}
</script>
