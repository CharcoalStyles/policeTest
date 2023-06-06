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
      type: Boolean,
      default: false
    }
  },
  computed: {
    emptyMessage () {
      if (this.instructions) {
        return this.targetRole ? `This ${this.type} is not required` : 'Not currently known'
      }
      return ''
    },
    valueName () {
      return this.type === 'skill' ? 'skills' : 'capabilities'
    },
    journeyType () {
      if (!this.instructions || !this.item || !this.targetRole) {
        return false
      }

      const currentRoleItem = this.$collect(this.currentRole[this.valueName].focus).where('code', this.item.code).first()
      const targetRoleItem = this.$collect(this.targetRole[this.valueName].focus).where('code', this.item.code).first()

      // New skill
      if (!currentRoleItem && targetRoleItem) {
        return {
          text: 'New skill',
          colour: 'green',
          tooltip: 'A new skill that is required for this role.'
        }
      }

      // Existing skill at correct level
      if (targetRoleItem.level === currentRoleItem.level) {
        return false
      }

      // Requires upskill
      if (targetRoleItem.level > currentRoleItem.level) {
        return {
          text: 'Upskill',
          colour: 'orange',
          tooltip: 'Upskilling in a skill you currently have.'
        }
      }

      return false
    }
  },
  methods: {
    capitaliseFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
</script>
