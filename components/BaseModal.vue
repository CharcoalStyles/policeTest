<template>
  <portal to="modal">
    <transition leave-active-class="duration-200">
      <div v-show="show" class="fixed flex items-center justify-center inset-0 overflow-y-auto z-20">
        <transition
          enter-active-class="ease-out duration-300"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in duration-200"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-show="show" class="fixed inset-0 transform transition-all" @click="close">
            <div class="absolute inset-0 bg-nsw-brand-primary-blue opacity-50" />
          </div>
        </transition>
        <transition
          enter-active-class="ease-out duration-300"
          enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div v-if="show" id="dialog" class="bg-white shadow-xl transform transition-all w-modal-accessible flex flex-col focus:outline-none" tabindex="-1" :class="[maxWidthClass, scrollableContainerClass]" aria-labelledby="modal-title" aria-modal="true">
            <div class="sticky w-full top-0 left-0 font-bold text-lg px-4 lg:px-8 py-3 lg:py-6 flex items-center justify-between border-b border-nsw-grey-200 bg-white z-10">
              <h1 id="modal-title" class="w-10/12">
                {{ title }}
              </h1>
              <button v-if="closeable" type="button" class="absolute top-0 right-0 p-4 lg:p-8" title="Close this window" @click="close">
                <img src="/icons/close.svg" alt="Close">
              </button>
            </div>
            <div class="px-4 lg:px-8 py-3 lg:py-6 flex-grow" :class="scrollableBodyClass">
              <slot />
            </div>
            <div v-if="$slots.footer" class="flex-shrink-0 px-4 lg:px-8 py-3 lg:py-6 bg-gray-100 flex justify-between">
              <slot name="footer" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </portal>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    maxWidth: {
      type: String,
      default: '2xl'
    },
    closeable: {
      type: Boolean,
      default: true
    },
    scrollable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    maxWidthClass() {
      return {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl'
      }[this.maxWidth]
    },
    scrollableContainerClass() {
      return this.scrollable ? 'h-modal-accessible lg:h-modal-accessible-lg' : 'max-h-modal-accessible lg:max-h-modal-accessible-lg'
    },
    scrollableBodyClass() {
      return this.scrollable ? 'overflow-y-scroll' : 'overflow-y-scroll lg:overflow-auto'
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(value) {
        if (value) {
          document.body.style.overflow = 'hidden'
          this.focusModal()
        } else {
          document.body.style.overflow = null
        }
      }
    }
  },
  created() {
    const closeOnEscape = (e) => {
      if (e.key === 'Escape' && this.show) {
        this.close()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', closeOnEscape)
    })
  },
  mounted() {
    this.focusModal()
  },
  methods: {
    focusModal() {
      setTimeout(() => {
        const modal = document.getElementById('dialog')
        if (modal) {
          modal.focus()
        }
      }, 100)
    },
    close() {
      if (this.closeable) {
        this.$emit('close')
      }
    }
  }
}
</script>
