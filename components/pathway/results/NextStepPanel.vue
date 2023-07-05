<template>
  <div class="border border-nsw-grey-200 px-4 pb-6 pt-4 sm:px-8 sm:pt-8 sm:pb-8 rounded-lg cursor-pointer flex flex-col justify-between">
    <div>
      <h3 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
        {{ title }}
      </h3>
      <p class="mb-4 sm:mb-8">
        {{ text }}
      </p>
      <slot />
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
    text: {
      type: String,
      required: true
    }
  }
}
</script>
