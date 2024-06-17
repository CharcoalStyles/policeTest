<template>
  <div
    tabindex="0"
    class="border border-nsw-grey-400 hover:border-nsw-brand-primary-blue p-3 rounded-lg flex mb-3 cursor-pointer"
  >
    <div class="w-10 h-10 flex-shrink-0">
      <div
        class="w-6 h-6 rounded-full border border-black flex items-center justify-center"
      >
        <div
          v-if="isRoleSelected"
          class="h-4 w-4 bg-nsw-brand-primary-blue rounded-full block"
        ></div>
      </div>
    </div>
    <div>
      <div class="flex justify-between text-grey-primary text-sm mb-4">
        <div>
          {{ role.grade }}
          <span class="pl-4"
            >Salary: {{ $currency(role.salary.min) }} -
            {{ $currency(role.salary.max) }}</span
          >
        </div>
      </div>
      <div class="flex flex-col text-nsw-blue-800">
        <div class="text-sm font-bold">
          {{ role.name }}
        </div>
        <div class="text-xs flex-grow">
          {{ role.jobFunction }}
        </div>
      </div>
      <EssentialRequirementsIcon :role="role" />
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
    },
    rank: {
      type: Object,
      required: false
    }
  },
  computed: {
    isRoleSelected() {
      return this.targetRole && this.role.id === this.targetRole.id
    },
    rankAsString() {
      if (this.rank) {
        return `(${this.rank.focusFocus.toFixed(
          2
        )}, ${this.rank.focusAll.toFixed(2)}, ${this.rank.allFocus.toFixed(
          2
        )}, ${this.rank.allAll.toFixed(2)})`
      }
      return ''
    }
  }
}
</script>
