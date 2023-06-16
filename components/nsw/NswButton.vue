<template>
  <button :type="type" class="font-bold rounded-md focus:border-nsw-brand-tertiary-blue focus:outline-buttons disabled:opacity-75 whitespace-no-wrap" :class="[colourClasses, sizeClasses]">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md'
    },
    type: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    colourClasses() {
      switch (this.action) {
        case 'secondary':
          return 'bg-white hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue'
          break
        case 'secondary-outline':
          return 'hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue'
          break
        case 'highlight':
          return 'bg-nsw-brand-primary-highlight text-white focus:bg-nsw-brand-tertiary-blue'
          break
        default:
          return 'bg-nsw-brand-primary-blue text-white focus:bg-nsw-brand-tertiary-blue'
          break
      }
    },
    sizeClasses() {
      return this.size === 'highlight' ? 'bg-nsw-brand-primary-highlight' : 'h-10 md:h-12 px-6 md:px-8 text-sm md:text-base'
    }
  }
}
</script>
