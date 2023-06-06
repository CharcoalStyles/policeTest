<template>
  <div class="relative z-20">
    <div class="bg-white">
      <header class="border-b border-nsw-grey-400 p-4 md:p-6">
        <nuxt-link to="/" class="xl:container">
          <img src="/logo.svg" alt="Logo for NSW Public Service Commission" title="NSW Public Service Commission" class="h-12">
        </nuxt-link>
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
