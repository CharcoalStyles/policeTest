<template>
  <div>
    <div class="nsw-forms">
      <div class="nsw-form-group">
        <fieldset class="nsw-form-fieldset">
          <legend class="sr-only">
            {{ step.title }}
          </legend>
          <p v-if="step.schema.field.limit" class="font-bold">
            You can select a maximum of {{ step.schema.field.limit }} options
          </p>
          <div class="nsw-form-radio">
            <div
              v-for="option in step.schema.field.options"
              :key="option.value"
            >
              <input
                :id="option.value"
                v-model="answer"
                :name="option.value"
                :value="option.value"
                :disabled="answer.includes(option.value) ? false : disabled"
                class="nsw-form-checkbox__input"
                type="checkbox"
              />
              <label class="nsw-form-checkbox__label" :for="option.value">{{
                option.title
              }}</label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  computed: {
    disabled(option) {
      if (this.step.schema.field.limit) {
        return this.answer.length >= this.step.schema.field.limit
      }
      return false
    },
    answer: {
      get() {
        if (this.$store.state.pathway.answers[this.step.id]?.value) {
          return this.$store.state.pathway.answers[this.step.id].value
        }
        if (this.step.schema.field.value) {
          return this.step.schema.field.value
        }
        return []
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
