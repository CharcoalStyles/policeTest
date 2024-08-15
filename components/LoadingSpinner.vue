<template>
  <img
    class="animate-spin [animation-duration:_2s] transition-opacity pointer-events-none"
    :class="{
      'opacity-0': !show,
      'opacity-100': show,
      'delay-500': show,
      'w-8 h-8': size === 'base',
      'w-16 h-16': size === 'large'
    }"
    src="/loader.svg"
  />
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'base'
    }
  }
}
</script>
