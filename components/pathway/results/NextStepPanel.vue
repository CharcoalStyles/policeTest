<template>
  <div class="border border-nsw-grey-200 p-4 md:py-8 md:px-10 rounded-lg cursor-pointer flex flex-col justify-between">
    <div>
      <h3 class="text-2xl font-bold mb-4">
        {{ title }}
      </h3>
      <p class="mb-8">
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
