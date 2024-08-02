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
    <div v-for="group in groups" :key="group.title" class="mb-4">
      <p class="text-lg font-bold text-nsw-brand-primary-blue">
        {{ group.title }}
      </p>
      <div
        v-for="datum in data.slice(group.start, group.end)"
        :key="datum.value"
      >
        <input
          :id="datum.value"
          v-model="values"
          class="nsw-form-checkbox__input"
          type="checkbox"
          :value="datum.value"
          @change="$emit('input', values)"
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
    groups: {
      type: Array,
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
