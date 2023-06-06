<template>
  <div>
    <div class="md:w-2/3 lg:w-1/2">
      <div class="mb-3 md:mb-8">
        <h2 class="btn-blue font-bold text-nsw-brand-primary-blue mb-3">
          {{ step.schema.section }}
        </h2>
        <h1 class="text-3xl md:text-4xl font-bold leading-snug">
          {{ step.title }}
        </h1>
      </div>
      <p>
        {{ step.schema.description }}
      </p>
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
  }
}
</script>
