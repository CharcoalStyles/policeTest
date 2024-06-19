<template>
  <div
    class="w-60 my-3 border border-nsw-grey-800 relative bg-white rounded-lg px-4 py-3"
    :class="[clickableClasses, zoomToClass, selectedClass]"
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
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    clickableClasses() {
      return this.clickable
        ? 'hover:shadow-xl transition transform-all duration-200 cursor-pointer'
        : null
    },
    zoomToClass() {
      return this.zoomable ? `role-${this.role.id}` : null
    },
    selectedClass() {
      return this.selected ? 'border-2 border-amber-300' : null
    }
  }
}
</script>
