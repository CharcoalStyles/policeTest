<template>
  <component :is="componentName" :step="step" @updated="updated" />
</template>

<script>
import StepIntroduction from '@/components/pathway/StepIntroduction'
import StepInterstitial from '@/components/pathway/StepInterstitial'
import StepQuestion from '@/components/pathway/StepQuestion'

export default {
  components: {
    StepIntroduction,
    StepInterstitial,
    StepQuestion
  },
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  computed: {
    componentName() {
      return `step-${this.step.type}`
    }
  },
  methods: {
    updated(data) {
      this.$emit('input', data)
    }
  }
}
</script>
