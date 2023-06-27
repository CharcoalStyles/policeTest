<template>
  <div class="p-4 lg:p-8">
    <information-badge class="mb-6 rounded-lg" :colour="pillColour">
      Your {{ type }} role
    </information-badge>
    <h3 class="font-bold text-xl mb-4">
      {{ role.name }}
    </h3>
    <p v-if="role.id !== 99" class="w-full lg:w-5/6 mb-6">
      {{ role.description }}
      {{ role.roleFunction }}
    </p>
    <div class="flex flex-col lg:flex-row">
      <information-badge v-if="role.grade" class="mb-6 rounded-full mr-3" size="sm">
        Grade: {{ role.grade }}
      </information-badge>
      <information-badge v-if="role.salary.min && role.salary.max" class="mb-6 rounded-full mr-3" size="sm" tooltip="Salaries are indicative only. Check the job ad when applying for a role.">
        Salary: {{ $currency(role.salary.min) }} - {{ $currency(role.salary.max) }}
      </information-badge>
      <information-badge v-if="role.manager" size="sm" class="mb-6 rounded-full">
        Manager role
      </information-badge>
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
    roles: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'current'
    }
  },
  computed: {
    pillColour() {
      return this.type === 'current' ? 'blue' : 'green'
    }
  }
}
</script>
