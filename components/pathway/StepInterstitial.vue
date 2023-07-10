<template>
  <div class="flex">
    <div class="md:w-2/3 lg:w-1/2">
      <div class="mb-3 md:mb-8">
        <h2 class="btn-blue font-bold text-nsw-brand-primary-blue mb-3">
          {{ step.schema.section }}
        </h2>
        <h1 class="text-3xl md:text-[40px] font-bold leading-tight">
          {{ step.title }}
        </h1>
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="text-lg md:text-xl text-nsw-brand-grey-primary" v-html="parseDescription(step.schema.description)"></p>
    </div>
    <div v-if="stepIcon" class="hidden md:flex md:w-2/3 lg:w-1/2 justify-end">
      <div class="bg-nsw-grey-100 w-full rounded-t-full rounded-l-full flex items-center justify-center" style="aspect-ratio: 1/1;max-width: 288px;">
        <img :src="stepIcon" alt="Arrow icon">
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
  },
  methods: {
    parseDescription(str) {
      const classes = 'text-nsw-brand-primary-blue underline'
      if (str.includes('{{procurement_professionals_capability_set}}')) {
        const label = 'Procurement Professionals Capability Set'
        const href = 'https://www.psc.nsw.gov.au/workforce-management/capability-framework/occupation-specific-capability-sets/procurement-capability-set'
        return str.replaceAll(
          '{{procurement_professionals_capability_set}}',
          `<a href="${href}" target="_blank" class="${classes}" style="text-underline-offset: 2px;">${label}</a>`)
      }
      if (str.includes('{{nsw_public_sector_capability_framework}}')) {
        const label = 'NSW Public Sector Capability Framework'
        const href = 'https://www.psc.nsw.gov.au/workforce-management/capability-framework/the-capability-framework'
        return str.replaceAll(
          '{{nsw_public_sector_capability_framework}}',
          `<a href="${href}" target="_blank" class="${classes}" style="text-underline-offset: 2px;">${label}</a>`)
      }
      return str
    }
  }
}
</script>
