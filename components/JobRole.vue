<template>
  <div class="relative bg-white shadow-lg rounded-md mb-4 p-4 flex flex-col cursor-pointer border border-nsw-grey-200 hover:border-black">
    <div class="flex justify-between mb-1">
      <div class="font-bold mb-2 text-gray-700 text-sm">
        Grade {{ role.grade }}
      </div>
      <information-badge v-if="role.manager" size="xs">
        Manager role
      </information-badge>
    </div>
    <div class="mb-3 text-gray-700 text-sm">
      Salary: {{ $currency(role.salary.min) }} - {{ $currency(role.salary.max) }}
    </div>
    <div class="flex items-center">
      <div class="flex-grow font-bold text-nsw-blue-800">
        {{ role.name }}
      </div>
      <div class="flex-shrink">
        <img src="/arrow.svg" class="h-3" alt="Arrow icon">
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
