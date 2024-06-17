<template>
  <div
    class="max-w-72 min-h-20 border border-nsw-grey-800 relative bg-white rounded-lg px-4 py-3 flex-shrink-0 float-left"
    :class="[clickableClasses, zoomToClass]"
  >
    <div class="flex flex-col">
      <div class="flex flex-col mb-2 text-grey-primary text-xs">
        <p class="">
          {{ role.grade }}
        </p>
        <p>
          Salary: {{ $currency(role.salary.min) }} -
          {{ $currency(role.salary.max) }}
        </p>
      </div>
      <div class="flex-grow text-sm font-bold text-nsw-blue-800">
        {{ role.name }}
      </div>
      <EssentialRequirementsIcon :role="role" />
    </div>
  </div>
</template>

<script>
import InformationBadge from '@/components/InformationBadge'
import EssentialRequirementsIcon from './EssentialRequirementsIcon.vue'

export default {
  components: {
    InformationBadge,
    EssentialRequirementsIcon
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
      return this.clickable
        ? 'border border-nsw-brand-grey-light hover:border-nsw-brand-grey-primary hover:shadow-xl transition transform-all duration-200 cursor-pointer'
        : null
    },
    zoomToClass() {
      return this.zoomable ? `role-${this.role.id}` : null
    }
  }
}
</script>
