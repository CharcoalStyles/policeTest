<template>
  <div v-if="image" class="px-3 md:px-0 flex flex-1 items-center justify-center">
    <img :src="image" :alt="alt">
  </div>
  <div v-else class="md:w-1/2 flex flex-col flex-1 justify-center items-center">
    <div style="max-width:362px;">
      <h3 v-if="title" class="font-bold text-2xl md:text-[32px] text-nsw-brand-grey-primary mb-4 leading-tight">
        {{ title }}
      </h3>
      <p v-if="description" class="mb-6">
        {{ description }}
      </p>
      <nuxt-link v-if="link" class="flex items-center font-bold" :to="link">
        Get started <img src="/icons/arrow.svg" alt="Arrow icon" class="ml-2">
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    link: {
      type: String,
      required: false,
      default: ''
    },
    image: {
      type: String,
      required: false,
      default: ''
    },
    align: {
      type: String,
      required: false,
      default: 'left'
    }
  }
}
</script>
