<template>
  <button class="h-8 px-4 pb-1 border-b-4 cursor-pointer hover:border-nsw-brand-primary-blue focus:outline-none whitespace-no-wrap" :class="isSelected">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    name: {
      type: [String, Number],
      required: true
    },
    selected: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    isSelected() {
      return this.selected === this.name ? 'border-nsw-brand-primary-blue' : 'border-white'
    }
  }
}
</script>
