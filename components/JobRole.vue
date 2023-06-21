<template>
  <div class="relative bg-white shadow-lg rounded-lg mb-4 px-6 py-5 flex flex-col cursor-pointer border border-nsw-brand-grey-light hover:border-nsw-brand-grey-primary hover:shadow-xl transition transform-all duration-200">
    <div class="flex justify-between mb-0">
      <div class="font-semibold mb-2 text-grey-primary text-sm">
        Grade {{ role.grade }}
      </div>
      <information-badge v-if="role.manager" size="xs">
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
      <div class="flex-shrink">
        <img src="/arrow.svg" class="h-4" alt="Arrow icon">
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
    }
  }
}
</script>
