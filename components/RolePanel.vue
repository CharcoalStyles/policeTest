<template>
  <div class="border border-nsw-grey-200 relative bg-white shadow-lg rounded-md p-5 flex-shrink-0 float-left" :class="[clickableClasses, zoomToClass]">
    <div class="flex flex-col">
      <div class="flex items-center justify-between mb-2">
        <div class="font-semibold text-grey-primary text-sm">
          Grade {{ role.grade }}
        </div>
        <information-badge v-if="role.manager" size="xs" class="ml-6">
          Manager role
        </information-badge>
      </div>
      <div class="mb-2 text-nsw-gray-800 text-sm">
        Salary: {{ $currency(role.salary.min) }} - {{ $currency(role.salary.max) }}
      </div>
      <div class="flex items-center">
        <div class="flex-grow font-bold text-nsw-blue-800">
          {{ role.name }}
        </div>
        <div v-if="clickable" class="flex-shrink ml-6">
          <img src="/arrow.svg" class="h-4" alt="Arrow icon">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InformationBadge from '@/components/InformationBadge'

export default {
  components: {
    InformationBadge
  },
  props: {
    role: {
      type: Object,
      required: true
    },
    clickable: {
      type: Boolean,
      default: false
    },
    zoomable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    clickableClasses() {
      return this.clickable ? 'border border-nsw-brand-grey-light hover:border-nsw-brand-grey-primary hover:shadow-xl transition transform-all duration-200 cursor-pointer' : null
    },
    zoomToClass() {
      return this.zoomable ? `role-${this.role.id}` : null
    }
  }
}
</script>
