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
      <div v-if="step.schema.help" class="mb-8">
        <p v-if="step.schema.help" class="text-lg md:text-xl text-nsw-brand-grey-primary">
          {{ step.schema.help }}
        </p>
        <p v-if="step.schema.helpExtra" class="text-lg md:text-xl text-nsw-brand-grey-primary mt-4">
          {{ step.schema.helpExtra }}
        </p>
      </div>
      <component :is="componentName" :step="step" class="mb-6" />
      <div v-if="step.schema.support" class="">
        <p v-for="(text, index) in step.schema.support" :key="index" class="text-base text-nsw-brand-grey-primary mb-3">{{ text }}</p>
      </div>
    </div>
    <div v-if="showNoRolePanel" class="lg:w-1/2 flex lg:justify-end items-start">
      <div class="block p-4 md:p-8 bg-nsw-grey-100 lg:w-2/3 rounded-lg max-w-lg">
        <h3 class="font-bold text-2xl mb-8">
          None of these roles are similar to my current role
        </h3>
        <p class="mb-12">
          If you are not currently in a procurement role and none of these roles are similar, click the button below.
        </p>
        <nsw-button action="secondary-outline" @click.native="setDefaultRole">
          No current role
        </nsw-button>
      </div>
    </div>
    <div v-if="showExplorerPanel" class="lg:w-1/2 flex lg:justify-end items-start">
      <div class="block p-4 md:p-8 bg-nsw-grey-100 lg:w-2/3 rounded-lg max-w-lg">
        <h3 class="font-bold text-2xl mb-8">
          Cant find a role title that is relevant?
        </h3>
        <div class="font-bold mb-3">
          Use the Role Explorer tool
        </div>
        <p class="mb-12">
          See all the various procurement roles, levels and how they’re connected across the NSW public sector.
        </p>
        <nsw-button action="secondary-outline" @click.native="$router.push('/explorer')">
          Browse role types
        </nsw-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import step from '@/mixins/step'
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
  mixins: [step],
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'getRoleByCode',
      'getNextChildStepByCurrentIndex'
    ]),
    clampText() {
      return this.expanded ? 'Read less' : 'Read more'
    },
    componentName() {
      return `form-${this.step.schema.field.type}`
    },
    defaultNoRole() {
      return this.getRoleByCode(99)
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
    showNoRolePanel() {
      return ['current-gov-role', 'current-outside-role'].includes(this.step.id)
    },
    showExplorerPanel() {
      return ['goal-role'].includes(this.step.id)
    }
  },
  methods: {
    setDefaultRole() {
      if (this.defaultNoRole && this.defaultNoRole.id) {
        this.$store.dispatch('saveQuestionAnswer', {
          id: this.step.id,
          value: this.defaultNoRole.id
        })
        this.goToNextStep()
      }
    },
    goToNextStep() {
      const nextStep = this.getNextStepByCurrentIndex(this.currentStepIndex)
      this.$router.push(`/pathway/${nextStep.id}`)
    }
  }
}
</script>
