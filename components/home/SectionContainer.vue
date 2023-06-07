<template>
  <div class="w-full xl:container">
    <div class="p-4 pt-6 md:pt-12 md:px-6">
      <div class="flex flex-col md:flex-row justify-between">
        <h2 class="font-bold text-xl md:text-3xl mb-3 md:mb-6">
          {{ title }}
        </h2>
        <nuxt-link v-if="link" :to="link" class="mb-3 md:mb-2 font-bold flex items-center whitespace-no-wrap">
          Get started <img src="/icons/arrow.svg" alt="Arrow icon" class="ml-2">
        </nuxt-link>
      </div>
      <div class="grid gap-6 xl:gap-8" :class="columns">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    cols: {
      type: [Number, String],
      default: ''
    },
    link: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    columns() {
      if (this.cols) {
        return this.cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
      }
      return null
    }
  }
}
</script>
