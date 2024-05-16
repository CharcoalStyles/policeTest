<template>
  <div tabindex="0" class="border border-nsw-grey-400 hover:border-nsw-brand-primary-blue p-3 rounded-lg flex mb-3 cursor-pointer">
    <div class="w-10 h-10 flex-shrink-0">
      <div class="w-6 h-6 rounded-full border border-black flex items-center justify-center">
        <div v-if="isRoleSelected" class="h-4 w-4 bg-nsw-brand-primary-blue rounded-full block" />
      </div>
    </div>
    <div class="text-sm">
      <div class="sm:hidden font-bold mb-1">
        {{ role.name }}
      </div>
      <div class="text-nsw-grey-800 sm:flex sm:space-x-2 sm:mb-1">
        <div class="mb-1 sm:mb-0">
          Grade: {{ role.grade }}
        </div>
        <div>Salary: {{ $currency(role.salary.min) }} - {{ $currency(role.salary.max) }}</div>
      </div>

      <!-- <div class="text-nsw-grey-800 sm:flex sm:space-x-2 sm:mb-1">
        <div class="mb-1 sm:mb-0">
          familyFunction: {{ role.familyFunction }}
        </div>
        <div>familyRole: {{ role.familyRole }}</div>
      </div> -->
      <div class="hidden sm:block font-bold">
        {{ role.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    role: {
      type: Object,
      required: true
    },
    targetRole: {
      type: [Object, Boolean],
      required: true
    }
  },
  computed: {
    isRoleSelected() {
      return this.targetRole && this.role.id === this.targetRole.id
    }
  }
}
</script>
