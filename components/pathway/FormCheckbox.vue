<template>
  <div>
    <div class="nsw-forms">
      <div class="nsw-form-group">
        <fieldset class="nsw-form-fieldset">
          <legend class="sr-only">
            {{ step.title }}
          </legend>
          <div class="nsw-form-radio">
            <div v-for="option in step.schema.field.options" :key="option.value">
              <input :id="option.value" v-model="answer" :name="option.value" :value="option.value" class="nsw-form-checkbox__input" type="checkbox">
              <label class="nsw-form-checkbox__label" :for="option.value">{{ option.title }}</label>
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
    answer: {
      get() {
        return this.$store.state.pathway.answers[this.step.id]?.value ?? this.step.schema.field.value
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
