<template>
  <base-modal
    :show="show"
    :title="title"
    :max-width="maxWidth"
    :closeable="closeable"
    @close="$emit('close')"
  >
    <p class="block mb-6">
      <slot />
    </p>
    <div>
      <div v-for="datum in data" :key="datum.value">
        <input
          :id="datum.value"
          v-model="values"
          class="nsw-form-checkbox__input"
          type="checkbox"
          :value="datum.value"
          @change="
            () => {
              $emit('input', values)
              $emit('userSelected', values.length > 0)
            }
          "
        />
        <label class="nsw-form-checkbox__label" :for="datum.value">{{
          datum.label
        }}</label>
      </div>
    </div>
    <template #footer>
      <nsw-button action="secondary" @click.native="reset()">
        Reset
      </nsw-button>
      <nsw-button @click.native="$emit('close')"> Done </nsw-button>
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
    title: {
      type: String,
      required: true
    },
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
    },
    data: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      values: []
    }
  },
  watch: {
    value() {
      this.values = this.value
    }
  },
  mounted() {
    this.values = this.value
  },
  methods: {
    reset() {
      // this.values = []
      this.$emit('reset')
    }
  }
}
</script>
