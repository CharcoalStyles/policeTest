<template>
  <div class="nsw-form-checkbox cursor-pointer">
    <input
      :id="id"
      v-model="model"
      type="checkbox"
      :value="inputValue"
      class="nsw-form-checkbox__input"
      @change="$emit('change', inputValue)"
    >
    <label class="nsw-form-checkbox__label" :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Array, String],
      required: true
    },
    inputValue: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected: []
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    id() {
      return `${this.name}_${this.modelValue}`
    }
  }
}
</script>

<style>
input:checked + svg {
  display: block;
}
</style>
