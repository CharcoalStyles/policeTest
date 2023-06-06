<template>
  <div class="nsw-form-checkbox cursor-pointer">
    <input
      :id="id"
      v-model="selected"
      :value="modelValue"
      class="nsw-form-checkbox__input"
      type="checkbox"
      @change="$emit('change', modelValue)"
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
    modelValue: {
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
  data () {
    return {
      selected: []
    }
  },
  computed: {
    id () {
      return `${this.name}_${this.modelValue}`
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        this.selected = value
      }
    }
  }
}
</script>

<style>
input:checked + svg {
  display: block;
}
</style>
