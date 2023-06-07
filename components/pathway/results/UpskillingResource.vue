<template>
  <div class="p-6 border border-nsw-grey-200 hover:border-nsw-grey-400 rounded-lg cursor-pointer flex">
    <div class="w-11/12">
      <div class="flex items-start mb-3">
        <img :src="iconImage" alt="Video icon" class="mr-3">
        <div class="text-nsw-grey-700 text-sm capitalize">
          {{ resource.format }} &bull; {{ resource.author }}
        </div>
      </div>
      <div class="font-bold">
        {{ resource.title }}
      </div>
    </div>
    <div class="w-1/12 relative">
      <img src="/icons/link.svg" alt="Link icon" class="absolute top-0 right-0">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modal: false
    }
  },
  computed: {
    iconImage() {
      return `/icons/upskill-${this.resource.format}.svg`
    }
  }
}
</script>
