<template>
  <div class="flex flex-col min-h-screen w-screen max-w-screen antialiased text-base">
    <div class="flex-grow flex items-center">
      <div class="xl:container">
        <div class="p-4 md:py-12 md:px-6 text-center">
          <div class="flex flex-col space-y-6">
            <h1 class="font-bold text-2xl">
              {{ errorTitle }}
            </h1>
            <p v-if="error.message" class="max-w-lg mx-auto">
              {{ error.message }}
            </p>
            <NuxtLink v-if="errorLink" :to="errorLink.to" class="underline text-nsw-brand-primary-blue">
              {{ errorLink.title }}
            </NuxtLink>
            <NuxtLink v-else to="/" class="underline text-nsw-brand-primary-blue">
              Return to home page
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  computed: {
    errorTitle() {
      return this.error.title ? this.error.title : `${this.error.statusCode} error`
    },
    errorLink() {
      return this.error.link ? this.error.link : false
    }
  }
}
</script>
