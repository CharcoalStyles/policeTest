<template>
  <information-badge size="xs" class="break-words">
    <p class="break-words">{{ pillLabel }}</p>
  </information-badge>
</template>

<script>
import InformationBadge from '@/components/InformationBadge'

export default {
  components: {
    InformationBadge
  },
  props: {
    skillCode: {
      type: String,
      required: true
    },
    level: {
      type: [Number, String],
      required: true
    },
    isSkill: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    pillLabel() {
      if (this.isSkill) {
        const skill = this.$store.state.skills.find(
          (skill) => skill.code === this.skillCode
        )
        const name = skill.levels
          .find((level) => {
            const userLevel =
              typeof this.level === 'string'
                ? Number.parseInt(level.level)
                : level.level
            const thisLevel =
              typeof this.level === 'string'
                ? Number.parseInt(this.level)
                : this.level
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
      const cap = this.$store.state.capabilities.find(
        (capability) => capability.subcode === this.skillCode
      )
      const name = cap.levels[this.level - 1].name.split(' - ')[1]
      return name
    }
  }
}
</script>
