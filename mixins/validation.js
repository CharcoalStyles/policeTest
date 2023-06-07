export default {
  methods: {
    isStepDisabled(step) {
      // Only apply on question steps
      if (step.type === 'question' && step.schema.field.required === true) {
        // Does the step exist in answers
        return !this.$store.state.pathway.answers[step.id]?.value
      }
      return false
    },
    isChildStepDisabled(step) {
      if (step.schema.field.type === 'skill') {
        return !this.$store.state.pathway.answers.skills?.[step.id]?.value
      } else {
        return !this.$store.state.pathway.answers.capabilities?.[step.id]?.value
      }
    }
  }
}
