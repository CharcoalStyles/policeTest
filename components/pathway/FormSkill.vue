<template>
  <div>
    <p class="font-bold mb-5">
      Assess yourself on this skill and select your current level
    </p>
    <input-expandable
      v-for="option in step.schema.field.options"
      :key="option.id"
      :description="option.easyDescription"
      :attributes="option.attributes"
    >
      <div class="nsw-form-radio">
        <input
          :id="option.level"
          v-model="answer"
          :name="option.level"
          :value="option.level"
          class="nsw-form-radio__input"
          type="radio"
        />
        <label
          class="nsw-form-radio__label mt-0 mb-0 font-bold text-base py-0 flex items-center"
          :for="option.level"
          >{{ option.name }}</label
        >
      </div>
    </input-expandable>
  </div>
</template>

<script>
import InputExpandable from '@/components/forms/InputExpandable'

export default {
  components: {
    InputExpandable
  },
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
        const skills = this.$store.state.pathway.answers.skills
        return this.step.id in skills ? skills[this.step.id].value : ''
      },
      // It isn't found so load default from schema
      set(value) {
        this.$store.dispatch('saveSkillAnswer', {
          id: this.step.id,
          value
        })
      }
    }
  }
}
</script>
