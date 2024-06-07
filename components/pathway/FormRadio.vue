<template>
  <div>
    <div class="nsw-forms -mt-4">
      <div class="nsw-form-group">
        <fieldset class="nsw-form-fieldset">
          <legend class="sr-only">
            {{ step.title }}
          </legend>
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
                class="nsw-form-radio__input"
                type="radio"
              />
              <label class="nsw-form-radio__label" :for="option.value">
                <p>{{ option.title }}</p>
                <p
                  v-if="option.description"
                  class="text-xs text-nsw-brand-grey-primary"
                >
                  {{ option.description }}
                </p></label
              >
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
      // Look for answer in store and load it
      get() {
        return this.$store.state.pathway.answers[this.step.id]?.value
      },
      // It isn't found so load default from schema
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
