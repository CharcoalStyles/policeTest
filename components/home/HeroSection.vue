<template>
  <div class="border-b border-nsw-grey-200">
    <div class="flex flex-col md:flex-row xl:container">
      <div class="flex md:w-1/2 px-4 md:px-6">
        <div class="flex flex-1 flex-col justify-center py-8">
          <slot />
        </div>
      </div>
      <img :src="image" :alt="imageAlt" class="md:w-1/2 object-cover">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    imageAlt: {
      type: String,
      default: ''
    }
  }
}
</script>
