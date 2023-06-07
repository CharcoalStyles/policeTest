<template>
  <div class="relative border group border-black mb-4 p-4 md:p-6 rounded-md flex flex-col">
    <slot />
    <div>
      <div class="pl-12">
        {{ description }}
      </div>
      <div v-show="expanded && descriptionLong" class="mt-3 pl-12">
        {{ descriptionLong }}
      </div>
    </div>
    <button v-if="descriptionLong" class="absolute top-0 right-0 p-3 m-3" @click="expanded = !expanded">
      <img src="/icons/chevron.svg" alt="Toggle Panel icon" class="transform" :class="expanded ? 'rotate-0' : 'rotate-180'">
    </button>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      required: true
    },
    descriptionLong: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      expanded: false
    }
  }
}
</script>
