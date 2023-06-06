<template>
  <base-modal :show="show" title="Select skills" :max-width="maxWidth" :closeable="closeable" @close="$emit('close')">
    <p class="block mb-6">
      Select skills that relate to a role to see how they match to others.
    </p>
    <slot />
    <template #footer>
      <nsw-button action="secondary" @click.native="$emit('reset')">
        Reset
      </nsw-button>
      <nsw-button @click.native="$emit('close')">
        Done
      </nsw-button>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal'

export default {
  components: {
    BaseModal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '2xl'
    },
    closeable: {
      type: Boolean,
      default: true
    }
  }
}
</script>
