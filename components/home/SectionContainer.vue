<template>
  <div class="w-full xl:container">
    <div class="px-4 md:px-6 my-12 md:my-16">
      <div class="flex flex-col md:flex-row justify-between">
        <h2 class="font-bold text-2xl md:text-[32px] mb-3 md:mb-6">
          {{ title }}
        </h2>
      </div>
      <div class="grid gap-6 xl:gap-8" :class="columns">
        <slot />
      </div>
      <nuxt-link v-if="link" :to="link" class="inline-flex items-center font-bold rounded-md h-10 md:h-12 px-6 md:px-8 text-sm md:text-base bg-nsw-brand-purple-dark text-white mt-8">
        Plan my career growth
      </nuxt-link>
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
