<template>
  <div class="relative z-20">
    <div class="bg-nsw-brand-teal-primary">
      <div class="xl:container px-4 md:px-6 py-2">
        <p class="text-white text-xs">A NSW Government website</p>
      </div>
    </div>
    <div class="bg-white border-b border-nsw-grey-200 py-3 lg:py-0">
      <header class="px-4 md:px-6 flex xl:container nsw-header__main">
        <nuxt-link to="/">
          <img
            src="/logo.svg"
            alt="Logo for NSW Public Service Commission"
            title="NSW Public Service Commission"
            class="h-12 lg:h-auto"
          />
        </nuxt-link>
        <div class="nsw-header__name hidden lg:flex">
          <div class="nsw-header__title">
            Public Service Commission
          </div>
        </div>
      </header>
      <div class="px-4 md:px-6 mt-3 font-xl lg:hidden nsw-header__title">
        Public Service Commission
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    betaBanner: {
      type: Boolean,
      default: true
    }
  }
}
</script>
