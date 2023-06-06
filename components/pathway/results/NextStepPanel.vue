<template>
  <div class="bg-nsw-grey-100 p-4 md:p-6 cursor-pointer flex flex-col justify-between print:border print:border-nsw-grey-200 print:rounded-lg">
    <div>
      <h3 class="text-xl font-bold mb-6">
        {{ title }}
      </h3>
      <p class="mb-6">
        {{ text }}
      </p>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>
