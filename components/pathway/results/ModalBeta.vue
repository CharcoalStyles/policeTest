<template>
  <base-modal :show="show" :max-width="maxWidth" title="Results" :closeable="false" :scrollable="false" @close="$emit('close')">
    <div class="flex flex-col items-center justify-center">
      <img src="/onboarding-0.svg" alt="Graphic showing a user giving a thumbs up approval." class="mb-6">
      <h2 class="font-bold text-lg mb-3">
        Help us learn
      </h2>
      <p class="text-center">
        This tool is currently in a pilot. Once finished using the tool please use the link at the top of the page to provide feedback.
      </p>
    </div>
    <template #footer>
      <div />
      <div>
        <nsw-button @click.native="$emit('close')">
          OK
        </nsw-button>
      </div>
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
    }
  }
}
</script>
