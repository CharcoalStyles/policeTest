<template>
  <div class="flex flex-col lg:flex-row">
    <div :class="widthStyle">
      <div class="mb-3 md:mb-8">
        <h2 class="btn-blue font-bold text-nsw-brand-primary-blue mb-3">
          {{ step.schema.section }}
        </h2>
        <h1 class="text-3xl md:text-4xl font-bold leading-snug">
          {{ step.title }}
        </h1>
      </div>
      <v-clamp tag="p" autoresize :max-lines="3" class="mb-8">
        {{ step.schema.help }}
        <template #after="{ clamped, toggle, expanded }">
          <button v-if="clamped" class="text-nsw-brand-primary-blue underline ml-2" @click="toggle">
            Read more
          </button>
          <button v-if="expanded" class="text-nsw-brand-primary-blue underline ml-2" @click="toggle">
            Read less
          </button>
        </template>
      </v-clamp>
      <component :is="componentName" :step="step" class="mb-6" />
    </div>
    <div v-if="showExplorerPanel" class="lg:w-1/2 flex lg:justify-end items-start">
      <div class="block p-4 md:p-8 bg-nsw-grey-100 lg:w-2/3 rounded-lg max-w-lg">
        <h3 class="font-bold text-xl mb-6">
          Can't find a relevant role?
        </h3>
        <div class="font-bold mb-3">
          Use the Role Explorer tool
        </div>
        <p class="mb-12">
          See all the various roles, levels and how they’re connected across NSW Government.
        </p>
        <nsw-button action="secondary" @click.native="$router.push('/explorer')">
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
          return 'w-full lg:w-9/12'
          break

        default:
          return 'w-full lg:w-1/2'
          break
      }
    },
    showExplorerPanel() {
      return ['current-gov-role', 'current-outside-role'].includes(this.step.id)
    }
  }
}
</script>
