<template>
  <base-modal
    :show="show"
    :max-width="maxWidth"
    title="Update answers"
    :closeable="closeable"
    :scrollable="false"
    @close="$emit('close')"
  >
    <p class="leading-relaxed">
      In order to update your answers, we will return you to the questionnaire.
      Your original answers will be available for you to edit and re-submit.
    </p>
    <template #footer>
      <nsw-button
        action="secondary"
        class="mr-4"
        @click.native="$emit('close')"
      >
        Cancel
      </nsw-button>
      <nsw-button @click.native="returnToQuestionFlow"> Update </nsw-button>
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
    returnToQuestionFlow() {
      // Log action to GA
      // window.dataLayer.push({
      //   event: 'update_answer_modal',
      //   category: 'pathway_results'
      // })
      this.$store.dispatch('saveQuestionAnswer', {
        id: 'isDetective',
        value: ''
      })
      this.$emit('close')
      this.$router.push('/pathway')
    }
  }
}
</script>
