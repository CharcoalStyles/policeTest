<template>
  <div class="relative border group border-black mb-4 p-6 rounded-md flex hover:cursor-pointer focus:outline-none focus:border-nsw-brand-primary-blue" tabindex="0" @keydown.space="selectOption(option.level)">
    <div class="w-8 h-8 border border-nsw-grey-700 group-focus:bg-radio-focus group-hover:bg-radio-focus rounded-full flex flex-shrink-0 items-center justify-center mr-6" @click="selectOption(option.level)">
      <div class="w-radio h-radio rounded-full block bg-white" :class="{ 'bg-nsw-brand-primary-blue' : selected }" />
    </div>
    <div class="w-11/12">
      <div class="font-bold text-lg mb-2">
        {{ option.name }}
      </div>
      <div>
        {{ option.easyDescription }}
      </div>
      <div v-show="expanded" class="mt-3">
        <ul>
          <li v-for="(attribute, index) in option.attributes" :key="index" class="leading-loose list-inside list-disc">
            {{ attribute }}
          </li>
        </ul>
      </div>
    </div>
    <button class="absolute top-0 right-0 p-3 m-3" @click="expanded = !expanded">
      <img src="/icons/chevron.svg" alt="Toggle Panel icon" class="transform" :class="expanded ? 'rotate-0' : 'rotate-180'">
    </button>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Object,
      required: true
    },
    option: {
      type: Object,
      required: true
    },
    value: {
      type: [Number, Boolean],
      required: true
    }
  },
  data () {
    return {
      expanded: false
    }
  },
  computed: {
    selected () {
      return this.value === this.option.level
    }
  },
  methods: {
    selectOption (option) {
      this.$emit('input', option)
    }
  }
}
</script>
