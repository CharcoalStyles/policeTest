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
        console.log(this.skillCode)
        const skill = this.$store.state.skills
        const name = skill
          .find((skill) => skill.code === this.skillCode)
          .levels.find((level) => {
            console.log(level, this.level)
            const userLevel = (
              typeof this.level === 'string'
                ? Number.parseInt(level.level) - 1
                : level.level - 1
            ).toString()
            const thisLevel = (
              typeof this.level === 'string'
                ? Number.parseInt(level.level) - 1
                : level.level - 1
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
      const cap = this.$store.state.capabilities.find(
        (capability) => capability.subcode === this.skillCode
      )
      const name = cap.levels[this.level - 1].name.split(' - ')[1]
      return name
    }
  }
}
</script>
