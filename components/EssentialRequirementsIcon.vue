<template>
  <div>
    <div
      v-if="role.essential.aboriginality"
      class="flex flex-row items-start gap-2 pt-4"
    >
      <img src="/icons/essential-atsi.svg" class="mt-1" alt="Essential Requirements icon" />
      <p class="text-nsw-brand-primary-blue font-bold" :class="textSize">
        Aboriginal or Torres Strait Islander Identified Role
      </p>
    </div>

    <div
      v-if="role.essential.detective"
      class="flex flex-row items-start gap-2 pt-4"
    >
      <img
        src="/icons/essential-detective.svg"
        alt="Essential Requirements icon"
        class="mt-1"
      />
      <p class="text-nsw-brand-primary-blue font-bold" :class="textSize">
        Designated Detective Role
      </p>
    </div>

    <div v-if="showDefaultIcon" class="flex flex-row items-start gap-2 pt-4">
      <img src="/icons/essential.svg" alt="Essential Requirements icon" />
      <p class="text-nsw-brand-primary-blue font-bold" :class="textSize">
        Essential Requirements
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    role: {
      type: Object,
      required: true
    },
    showDefault: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'sm'
    }
  },
  computed: {
    showDefaultIcon() {
      return (
        this.showDefault &&
        !this.role.essential.aboriginality &&
        !this.role.essential.detective
      )
    },
    textSize() {
      if (this.size === 'sm') {
        return 'text-sm'
      }
      return 'text-base'
    }
  }
}
</script>
