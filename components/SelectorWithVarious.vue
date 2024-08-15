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
        v-if="showLoader"
        class="absolute inset-0 bg-slate-500 opacity-50"
      ></div>

      <div
        v-if="showLoader"
        class="absolute inset-0 bg-transparent flex items-center justify-center"
      >
        <img
          src="/loader.svg"
          alt="Loading..."
          class="w-32 h-32 bg-transparent animate-spin [animation-duration:_2s] pointer-events-none"
        />
      </div>
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

export default {
  components: {
    BaseModal
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
