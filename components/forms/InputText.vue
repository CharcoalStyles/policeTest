<template>
  <div class="nsw-forms">
    <div class="nsw-form-group">
      <label :for="step.id" class="sr-only">{{ step.title }}</label>
      <textarea :id="step.id" class="nsw-form-input placeholder-gray-700" :value="value" :name="step.id" @input="update($event)" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Object,
      required: true
    },
    value: {
      type: [String, Boolean],
      required: true
    }
  },
  methods: {
    update (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
