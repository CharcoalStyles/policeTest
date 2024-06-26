<template>
  <div class="bg-white rounded overflow-hidden shadow-lg min-h-[440px] xl:min-h-[520px]">
    <img :src="image" :alt="alt" class="w-full object-cover bg-nsw-grey-200 border-b-4 border-[#FECD47]" style="aspect-ratio: 9/4;">
    <div class="p-4 md:p-8">
      <div class="font-bold mb-3 text-xl" v-text="title" />
      <p>
        <slot />
      </p>
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
    alt: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
}
</script>
