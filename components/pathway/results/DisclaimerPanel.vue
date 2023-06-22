<template>
  <div class="border-l-4 border-nsw-brand-primary-blue px-6 py-6 pr-12 bg-nsw-grey-100 mt-3">
    <div class="flex">
      <div>
        <img src="/icons/info.svg" alt="Information" class="mr-4" style="width:30px;height:30px;" />
      </div>
      <div style="margin-top:3px;">
        <p v-if="heading" class="font-bold mb-2 text-nsw-brand-grey-primary">{{ heading }}</p>
        <p><slot /></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      default: ''
    }
  }
}
</script>
