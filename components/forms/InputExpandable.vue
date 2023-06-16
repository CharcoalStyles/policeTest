<template>
  <div class="relative border group border-black mb-4 p-4 md:py-4 md:pl-6 md:pr-8 rounded-md flex flex-col">
    <slot />
    <div>
      <div class="pl-12 pr-6">
        {{ description }}
      </div>
      <div v-show="expanded" class="mt-6 mb-4 pl-12">
        {{ descriptionLong }}
        <ul>
          <li v-for="(attribute, index) in attributes" :key="index">
            {{ attribute }}
          </li>
        </ul>
      </div>
    </div>
    <button v-if="descriptionLong || attributes.length > 0" class="absolute top-0 right-0 p-3 mx-3 my-4" @click="expanded = !expanded">
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
    },
    attributes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      expanded: false
    }
  }
}
</script>
