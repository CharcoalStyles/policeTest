<template>
  <div
    class="relative bg-white shadow-lg rounded-lg mb-4 px-6 py-5 flex flex-col cursor-pointer border border-nsw-brand-grey-light hover:border-nsw-brand-grey-primary hover:shadow-xl transition transform-all duration-200"
  >
    <div class="flex justify-between text-grey-primary text-sm mb-4">
      <div>
        {{ role.grade }}
        <span class="pl-4">Salary: {{ $currency(role.salary.min) }} -
        {{ $currency(role.salary.max) }}</span>
      </div>
      <div class="-mt-2">
        <img
          src="/icons/chevron-left-blue.svg"
          style="transform: rotate(180deg)"
          alt="Arrow icon"
        />
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
</template>

<script>
import EssentialRequirementsIcon from './EssentialRequirementsIcon.vue'

export default {
  components: {
    EssentialRequirementsIcon
  },
  props: {
    role: {
      type: Object,
      required: true
    }
  }
}
</script>
