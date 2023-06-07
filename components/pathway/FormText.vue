<template>
  <div>
    <input-text v-model="answer" :step="step" />
  </div>
</template>

<script>
import InputText from '@/components/forms/InputText'

export default {
  components: {
    InputText
  },
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  computed: {
    answer: {
      get() {
        return this.$store.state.pathway.answers?.[this.step.id]?.value ?? ''
      },
      set(value) {
        this.$store.dispatch('saveQuestionAnswer', {
          id: this.step.id,
          value
        })
      }
    }
  }
}
</script>
