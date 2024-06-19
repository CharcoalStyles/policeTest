<template>
  <div
    class="comparison-cell py-4"
    :class="{
      'border-b border-b-gray-200': item || emptyMessage,
      'lg:w-1/2 lg:px-8': !fullWidth
    }"
  >
    <div v-if="item" class="flex items-start justify-between">
      <button
        class="underline text-left flex-shrink"
        @click="
          $emit('skillClicked', { skill: item.code, journey: journeyType })
        "
      >
        <span class="">{{ item.name }}</span>
      </button>
      <div class="pl-4 flex space-x-3 whitespace-no-wrap">
        <template>
          <information-badge
            v-if="journeyType"
            size="xs"
            :colour="journeyType.colour"
            :tooltip="journeyType.tooltip"
          >
            {{ journeyType.text }}
          </information-badge>
        </template>
        <information-badge size="xs" class="break-words">
          <p class="break-words">{{ pillLabel }}</p>
        </information-badge>
      </div>
    </div>
    <div v-else class="italic text-nsw-grey-600">
      {{ emptyMessage }}
    </div>
  </div>
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
      default: undefined
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
    roleType: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      default: 'targetRole'
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pillLabel() {
      if (this.type === 'skill') {
        const name = this.$store.state.skills
          .find((skill) => skill.code === this.item.code)
          .levels.find(
            (level) => level.level.toString() === this.item.level.toString()
          )
          .name.trim()

        if (name.includes(' - ')) {
          return name.split(' - ')[1]
        }

        // split the name string on a UTF dash characters
        const splitName = name.split(/[\u2010-\u2015\u2212\uFE58-\uFE5F\uFF0D\uFF3F]/)
        console.log(splitName)
        // return the last element of the split name array
        return splitName[splitName.length - 1]
      }
      return this.$store.state.capabilities
        .find((capability) => capability.subcode === this.item.code)
        .levels[this.item.level - 1].name.split(' - ')[1]
    },
    assessedSkills() {
      return {
        ...this.$store.state.pathway.answers.skills,
        ...this.$store.state.pathway.answers.capabilities
      }
    },
    emptyMessage() {
      if (this.instructions) {
        return this.targetRole
          ? `Not a focus ${this.type}, but may be complimentary`
          : 'Not currently known'
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

      if (this.instructions === 'selfAssessed' && this.targetRole) {
        const currentRoleItem = this.$collect(
          this.currentRole[this.valueName].focus
        )
          .where('code', this.item.code)
          .first()
        const targetRoleItem = this.$collect(
          this.targetRole[this.valueName].focus
        )
          .where('code', this.item.code)
          .first()
        const assessedValue = this.assessedSkills?.[this.item.code]?.value

        if (
          this.roleType === 'current' &&
          assessedValue < currentRoleItem.level
        ) {
          return {
            text: 'Upskill',
            colour: 'orange',
            tooltip: `You assessed yourself at Level ${assessedValue} in your current role.`
          }
        }
        if (
          this.roleType === 'target' &&
          assessedValue < targetRoleItem.level
        ) {
          return {
            text: 'Upskill',
            colour: 'orange',
            tooltip: `You assessed yourself at Level ${assessedValue} in your current role.`
          }
        }
        if (this.roleType === 'target' && !currentRoleItem && targetRoleItem) {
          return {
            text: 'New skill',
            colour: 'green',
            tooltip: 'A new skill that is required for this role.'
          }
        }
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
