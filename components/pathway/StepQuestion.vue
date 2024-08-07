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
        <p v-if="step.schema.help" class="text-nsw-brand-grey-primary">
          {{ step.schema.help }}
        </p>
        <p
          v-if="step.schema.helpExtra"
          class="text-nsw-brand-grey-primary mt-4"
        >
          {{ step.schema.helpExtra }}
        </p>
      </div>
      <component :is="componentName" :step="step" class="mb-6" />
      <!-- <div v-if="step.schema.support" class="">
        <p v-for="(text, index) in step.schema.support" :key="index" class="text-base text-nsw-brand-grey-primary mb-3">{{ text }}</p>
      </div> -->
    </div>
    <div
      v-if="showNoRolePanel"
      class="-mt-72 lg:mt-0 lg:w-1/2 flex lg:justify-end items-start"
    >
      <div
        class="block p-4 md:p-8 bg-nsw-brand-primary-blue-light lg:w-2/3 rounded-lg max-w-lg"
      >
        <h3 class="font-bold text-2xl mb-8">
          {{ noRolePanelText }}
        </h3>
        <p class="font-bold mb-2">Use the Role Explorer tool</p>
        <p class="mb-10">
          See the various roles and levels across the NSWPF and how they’re
          connected.
        </p>
        <nsw-button action="secondary-outline" @click.native="setDefaultRole">
          Browse Roles
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
import FormInterests from '@/components/pathway/FormInterests'
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
    FormInterests,
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
    ...mapGetters(['getRoleByCode', 'getNextChildStepByCurrentIndex']),
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

        case 'interests':
          return 'w-full lg:w-10/12'

        default:
          return 'w-full lg:w-7/12'
      }
    },
    showNoRolePanel() {
      return ['current-role', 'goal-role'].includes(this.step.id)
    },
    noRolePanelText() {
      switch (this.step.id) {
        case 'current-role':
          return 'Unsure of the details of your role?'
        case 'goal-role':
          return 'Unsure of the details of your goal role?'
        default:
          return 'Cant find a job title that is relevant?'
      }
    }
  },
  methods: {
    setDefaultRole() {
      this.$router.push('/explorer')
    },
    goToNextStep() {
      const nextStep = this.getNextStepByCurrentIndex(this.currentStepIndex)
      this.$router.push(`/pathway/${nextStep.id}`)
    }
  }
}
</script>
