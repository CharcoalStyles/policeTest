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
      <div class="pl-4 flex flex-wrap gap-3 justify-end whitespace-no-wrap">
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
        <skill-cap-info-badge
          :is-skill="type === 'skill'"
          :skill-code="item.code"
          :level="item.level"
        />
      </div>
    </div>
    <div v-else class="italic text-nsw-grey-600">
      {{ emptyMessage }}
    </div>
  </div>
</template>

<script>
import InformationBadge from '@/components/InformationBadge'
import SkillCapInfoBadge from '~/components/SkillCapInfoBadge.vue'

export default {
  components: {
    InformationBadge,
    SkillCapInfoBadge
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
      return this.getItemText(this.item.level)
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
    readableValueName() {
      return this.type === 'skill' ? 'Skill' : 'Capability'
    },
    journeyType() {
      if (!this.item) {
        return false
      }

      const currentRoleItem = this.currentRole[this.valueName].focus.find(
        (item) => item.code === this.item.code
      )
      const targetRoleItem =
        this.targetRole &&
        this.targetRole[this.valueName].focus.find(
          (item) => item.code === this.item.code
        )
      const assessedValue = this.assessedSkills?.[this.item.code]?.value
      // This is the thing that needs work
      if (
        this.roleType === 'current' &&
        assessedValue < currentRoleItem.level
      ) {
        return {
          text: 'Upskill',
          colour: 'orange',
          tooltip: `You assessed yourself at lower in this ${this.readableValueName} than your current role requires.`
        }
      }

      if (this.roleType === 'target') {
        if (!currentRoleItem && targetRoleItem) {
          return {
            text: 'New skill',
            colour: 'green',
            tooltip: `Compared to your current role, this role requires a new ${this.readableValueName}.`
          }
        }

        if (currentRoleItem.level < targetRoleItem.level) {
          return {
            text: 'Upskill',
            colour: 'orange',
            tooltip: `This role requires a higher level of ${this.readableValueName} than your current role.`
          }
        }
      }
      return false
    }
  },
  methods: {
    capitaliseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    getItemText(inputLevel) {
      if (this.type === 'skill') {
        const skill = this.$store.state.skills.find(
          (s) => s.code === this.item.code
        )
        const name = skill.levels
          .find((level) => {
            const userLevel = (
              typeof inputLevel === 'string'
                ? Number.parseInt(this.item.level) - 1
                : this.item.level - 1
            ).toString()
            const thisLevel = (
              typeof level.level === 'string'
                ? Number.parseInt(level.level)
                : level.level
            ).toString()
            return userLevel === thisLevel
          })
          .name.trim()

        if (name.includes(' - ')) {
          return name.split(' - ')[1]
        }

        // split the name string on a UTF dash characters
        const splitName = name.split(
          /[\u2010-\u2015\u2212\uFE58-\uFE5F\uFF0D\uFF3F]/
        )
        // return the last element of the split name array
        return splitName[splitName.length - 1]
      }
      return this.$store.state.capabilities
        .find((capability) => capability.subcode === this.item.code)
        .levels[inputLevel - 1].name.split(' - ')[1]
    }
  }
}
</script>
