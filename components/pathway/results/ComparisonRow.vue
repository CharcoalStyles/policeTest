<template>
  <td class="comparison-cell lg:w-1/2 px-4 lg:px-8 py-4" :class="{ 'border-b border-b-gray-200' : item || emptyMessage }">
    <div v-if="item" class="flex items-start justify-between">
      <button class="underline text-left" @click="$emit('skillClicked', { skill: item.code, journey: journeyType })">
        <span class="">{{ item.name }}</span>
      </button>
      <div class="pl-4 flex-shrink-0 flex space-x-3 whitespace-no-wrap">
        <template>
          <information-badge v-if="journeyType" size="xs" :colour="journeyType.colour" :tooltip="journeyType.tooltip">
            {{ journeyType.text }}
          </information-badge>
        </template>
        <information-badge size="xs">
          Level {{ item.level }}
        </information-badge>
      </div>
    </div>
    <div v-else class="italic text-nsw-grey-600">
      {{ emptyMessage }}
    </div>
  </td>
</template>

<script>
import InformationBadge from '@/components/InformationBadge'

export default {
  components: {
    InformationBadge
  },
  props: {
    targetRole: {
      type: [Object, Boolean],
      required: true
    },
    currentRole: {
      type: [Object, Boolean],
      required: true
    },
    item: {
      type: [Object, Boolean],
      required: true
    },
    type: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      default: 'targetRole'
    }
  },
  computed: {
    assessedSkills() {
      return {
        ...this.$store.state.pathway.answers.skills,
        ...this.$store.state.pathway.answers.capabilities
      }
    },
    emptyMessage() {
      if (this.instructions) {
        return this.targetRole ? `This is not a focus ${this.type} for this role` : 'Not currently known'
      }
      return ''
    },
    valueName() {
      return this.type === 'skill' ? 'skills' : 'capabilities'
    },
    journeyType() {
      if (!this.item) {
        return false
      }

      if (this.instructions === 'selfAssessed' && this.item.code in this.assessedSkills) {
        const currentRoleItem = this.$collect(this.currentRole[this.valueName].focus).where('code', this.item.code).first()
        const assessedValue = this.assessedSkills[this.item.code].value
        if (assessedValue < currentRoleItem.level) {
          return {
            text: 'Upskill',
            colour: 'orange',
            tooltip: `You assessed yourself at Level ${assessedValue}.`
          }
        }
      } else if (this.instructions === 'targetRole' && this.targetRole) {
        const currentRoleItem = this.$collect(this.currentRole[this.valueName].focus).where('code', this.item.code).first()
        const targetRoleItem = this.$collect(this.targetRole[this.valueName].focus).where('code', this.item.code).first()

        if (!currentRoleItem && targetRoleItem) {
          return {
            text: 'New skill',
            colour: 'green',
            tooltip: 'A new skill that is required for this role.'
          }
        }

        if (targetRoleItem && targetRoleItem?.level > currentRoleItem?.level) {
          return {
            text: 'Upskill',
            colour: 'orange',
            tooltip: 'Upskilling in a skill you currently have.'
          }
        }
        return false
      }
      return false
    }
  },
  methods: {
    capitaliseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
</script>
