<template>
  <base-modal :show="show" :max-width="maxWidth" title="Update details" :closeable="closeable" :scrollable="false" @close="$emit('close')">
    <p class="leading-relaxed">
      In order to update your details we will return you to the questionnaire. Your original answers will be available for you to edit and re-submit.
    </p>
    <template #footer>
      <nsw-button action="secondary" class="mr-4" @click.native="$emit('close')">
        Cancel
      </nsw-button>
      <nsw-button @click.native="returnToQuestionFlow">
        Update
      </nsw-button>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal'
import NswButton from '@/components/nsw/NswButton'

export default {
  components: {
    BaseModal,
    NswButton
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
  },
  methods: {
    returnToQuestionFlow () {
      // Log action to GA
      this.$ga.event({
        eventCategory: 'Pathway Results',
        eventAction: 'Update Answer Modal'
      })

      this.$router.push('/pathway')
    }
  }
}
</script>
