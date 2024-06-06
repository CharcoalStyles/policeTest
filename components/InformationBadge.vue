<template>
  <div class="flex-shrink-0">
    <popper trigger="hover" :options="tooltipOptions" :disabled="!tooltip">
      <div class="popper">
        {{ tooltip }}
      </div>
      <div slot="reference" class="px-3 py-0.5 inline-flex items-center rounded-full whitespace-no-wrap focus:outline-none" :class="[baseSize, badgeColour, badgeCursor, badgeBorder, textColor]">
        <slot /> <img v-if="tooltip" src="/icons/help.svg" alt="Help icon" class="ml-2" :class="iconSize">
      </div>
    </popper>
  </div>
</template>

<script>
import Popper from 'vue-popperjs'

export default {
  components: {
    Popper
  },
  props: {
    size: {
      type: String,
      default: 'md'
    },
    colour: {
      type: String,
      default: 'grey'
    },
    tooltip: {
      type: String,
      default: ''
    }
  },
  computed: {
    tooltipOptions() {
      return {
        placement: 'bottom',
        modifiers: { offset: { offset: '0,5px' } }
      }
    },
    baseSize() {
      return this.size === 'md' ? 'text-base' : 'text-sm'
    },
    iconSize() {
      return this.size === 'md' ? 'h-4' : 'h-3'
    },
    badgeCursor() {
      return this.tooltip ? 'hover:cursor-pointer' : 'hover:cursor-default'
    },
    badgeBorder() {
      return this.colour === 'blue-outline' ? 'border border-nsw-brand-primary-blue' : ''
    },
    textColor() {
      switch (this.colour) {
        case 'blue-outline':
          return 'text-nsw-brand-primary-blue'
          break
        default:
          return 'text-nsw-grey-800'
          break
      }
    },
    badgeColour() {
      switch (this.colour) {
        case 'blue-outline':
          return 'bg-white'
          break
        case 'blue':
          return 'bg-role-pill-blue'
          break
        case 'green':
          return 'bg-role-pill-green'
          break
        case 'orange':
          return 'bg-orange-200'
          break
        case 'gray':
          return 'bg-nsw-grey-100'
          break
        default:
          return `bg-${this.colour}`
          break
      }
    }
  }
}
</script>
