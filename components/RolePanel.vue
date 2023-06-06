<template>
  <div class="border border-nsw-grey-200 relative bg-white shadow-lg rounded-md p-5 flex-shrink-0 float-left" :class="[clickableClasses, zoomToClass]">
    <div class="flex flex-col">
      <div class="flex items-center justify-between mb-3">
        <div class="font-bold mb-2 text-gray-700 text-sm">
          Grade {{ role.grade }}
        </div>
        <information-badge v-if="role.manager" size="xs" class="ml-3">
          Manager role
        </information-badge>
      </div>
      <div class="mb-4 text-gray-700 text-sm">
        Salary: {{ $currency(role.salary.min) }} - {{ $currency(role.salary.max) }}
      </div>
      <div class="flex items-center">
        <div class="flex-grow text-md font-bold text-nsw-blue-800 pr-4">
          {{ role.name }}
        </div>
        <div v-if="clickable" class="flex-shrink">
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
    clickableClasses () {
      return this.clickable ? 'border-white hover:border-black cursor-pointer' : null
    },
    zoomToClass () {
      return this.zoomable ? `role-${this.role.id}` : null
    }
  }
}
</script>
