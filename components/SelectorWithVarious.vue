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
      <div>
        <p class="text-sm font-bold text-nsw-brand-primary-blue">
          {{ variousGuideText }}
        </p>
        <div
          v-for="datum in data.filter((d) => d.value === 'Various')"
          :key="datum.value"
        >
          <input
            :id="datum.value"
            v-model="values"
            :disabled="showLoader"
            class="nsw-form-checkbox__input"
            type="checkbox"
            :value="datum.value"
            @change="$emit('change', values)"
          />
          <label class="nsw-form-checkbox__label" :for="datum.value">{{
            datum.label
          }}</label>
        </div>
      </div>
      <div
        class="absolute inset-0 bg-slate-500 transition-all delay-1000"
        :class="{
          'opacity-0': !showLoader,
          'opacity-50': showLoader,
          'z-0': showLoader,
          '-z-50': !showLoader
        }"
      ></div>

      <loading-spinner
        :show="showLoader"
        size="large"
        class="absolute m-auto delay-1000 left-0 right-0 top-0 bottom-0 z-40"
      />
    </div>

    <div class="mt-4">
      <p class="text-sm font-bold text-nsw-brand-primary-blue">
        {{ normalGuideText }}
      </p>
      <div
        v-for="datum in data.filter((d) => d.value !== 'Various')"
        :key="datum.value"
      >
        <input
          :id="datum.value"
          v-model="values"
          :disabled="showLoader"
          class="nsw-form-checkbox__input"
          type="checkbox"
          :value="datum.value"
          @change="$emit('change', values)"
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
import LoadingSpinner from '@/components/LoadingSpinner'

export default {
  components: {
    BaseModal,
    LoadingSpinner
  },
  props: {
    title: {
      type: String,
      required: true
    },
    variousGuideText: {
      type: String,
      required: true
    },
    normalGuideText: {
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
    },
    showLoader: {
      type: Boolean,
      default: false
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
      this.$emit('change', [])
    }
  }
}
</script>
