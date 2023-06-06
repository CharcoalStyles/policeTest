<template>
  <div>
    <div class="flex flex-col md:flex-row md:py-12 xl:container">
      <div class="md:w-1/2 px-4 md:px-6">
        <div class="py-6 xl:py-12">
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
