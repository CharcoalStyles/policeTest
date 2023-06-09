<template>
  <div class="relative z-20">
    <div class="bg-nsw-brand-primary-blue">
      <div class="xl:container px-4 md:px-6 py-2">
        <p class="text-white text-sm">A NSW Government website</p>
      </div>
    </div>
    <div class="bg-white">
      <header
        class="border-b border-nsw-grey-400 p-4 md:p-6 flex items-center justify-start xl:container"
      >
        <nuxt-link to="/" class="mr-6">
          <img
            src="/logo.svg"
            alt="Logo for NSW Public Service Commission"
            title="NSW Public Service Commission"
            class="h-12"
          />
        </nuxt-link>
        <p class="font-bold text-nsw-brand-primary-blue text-lg">Treasury</p>
      </header>
    </div>
    <nsw-beta-banner v-if="betaBanner" />
  </div>
</template>

<script>
import NswBetaBanner from '@/components/nsw/NswBetaBanner'

export default {
  components: {
    NswBetaBanner
  },
  props: {
    betaBanner: {
      type: Boolean,
      default: true
    }
  }
}
</script>
