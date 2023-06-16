<template>
  <div class="flex flex-col lg:flex-row">
    <div :class="widthStyle">
      <div class="mb-3 md:mb-8">
        <h2 class="btn-blue font-bold text-nsw-brand-primary-blue mb-3">
          {{ step.schema.section }}
        </h2>
        <h1 class="text-2xl md:text-[32px] font-bold leading-snug">
          {{ step.title }}
        </h1>
      </div>
      <p v-if="step.schema.help" class="text-lg md:text-xl text-nsw-brand-grey-primary mb-8">
        {{ step.schema.help }}
      </p>
      <component :is="componentName" :step="step" class="mb-6" />
    </div>
    <div v-if="showExplorerPanel" class="lg:w-1/2 flex lg:justify-end items-start">
      <div class="block p-4 md:p-8 bg-nsw-grey-100 lg:w-2/3 rounded-lg max-w-lg">
        <h3 class="font-bold text-2xl mb-8">
          Cant find a job title that is relevant?
        </h3>
        <div class="font-bold mb-3">
          Use the Role Explorer tool
        </div>
        <p class="mb-12">
          See all the various roles, levels and how they’re connected across NSW Governement.
        </p>
        <nsw-button action="secondary-outline" @click.native="$router.push('/explorer')">
          Browse roles
        </nsw-button>
      </div>
    </div>
  </div>
</template>

<script>
import FormRadio from '@/components/pathway/FormRadio'
import FormRole from '@/components/pathway/FormRole'
import FormSkill from '@/components/pathway/FormSkill'
import FormCapability from '@/components/pathway/FormCapability'
import FormText from '@/components/pathway/FormText'
import FormCheckbox from '@/components/pathway/FormCheckbox'
import NswButton from '@/components/nsw/NswButton'
import VClamp from 'vue-clamp'

export default {
  components: {
    FormRadio,
    FormRole,
    FormSkill,
    FormCapability,
    FormText,
    FormCheckbox,
    NswButton,
    VClamp
  },
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  computed: {
    clampText() {
      return this.expanded ? 'Read less' : 'Read more'
    },
    componentName() {
      return `form-${this.step.schema.field.type}`
    },
    widthStyle() {
      switch (this.step.schema.field.type) {
        case 'skill':
        case 'capability':
          return 'w-full lg:w-8/12'
          break

        default:
          return 'w-full lg:w-7/12'
          break
      }
    },
    showExplorerPanel() {
      return ['current-gov-role', 'current-outside-role'].includes(this.step.id)
    }
  }
}
</script>
