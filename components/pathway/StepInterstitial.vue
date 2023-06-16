<template>
  <div class="flex">
    <div class="md:w-2/3 lg:w-1/2">
      <div class="mb-3 md:mb-4">
        <h2 class="btn-blue font-bold text-nsw-brand-primary-blue mb-3">
          {{ step.schema.section }}
        </h2>
        <h1 class="text-3xl md:text-3xl font-bold leading-snug">
          {{ step.title }}
        </h1>
      </div>
      <p>
        {{ step.schema.description }}
      </p>
    </div>
    <div v-if="stepIcon" class="hidden md:flex md:w-2/3 lg:w-1/2 justify-end">
      <div class="bg-nsw-grey-100 w-full rounded-t-full rounded-l-full flex items-center justify-center" style="aspect-ratio: 1/1;max-width: 288px;">
        <img src="/icon-edit.svg" alt="Arrow icon">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  computed: {
    stepIcon() {
      if (this.step.icon) {
        return `/icon-${this.step.icon}.svg`
      }
      return false
    }
  }
}
</script>
