<template>
  <div class="inline">
    <popper trigger="hover" :options="tooltipOptions" :disabled="!tooltip">
      <div class="popper">
        {{ tooltip }}
      </div>
      <div slot="reference">
        <img src="/icons/help.svg" class="ml-2" alt="Help icon">
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
    tooltip: {
      type: String,
      default: ''
    }
  },
  computed: {
    tooltipOptions () {
      return {
        placement: 'bottom',
        modifiers: { offset: { offset: '0,5px' } }
      }
    }
  }
}
</script>
