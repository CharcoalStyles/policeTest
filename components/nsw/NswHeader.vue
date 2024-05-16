<template>
  <div class="relative z-20">
    <div class="bg-nsw-brand-primary-blue">
      <div class="xl:container px-6 py-2">
        <p class="text-white text-xs">A NSW Police Force website</p>
      </div>
    </div>
    <div class="xl:container bg-white py-5">
      <header class="px-6 flex gap-10">
        <nuxt-link to="/">
          <img
            src="/police-force-logo.svg"
            alt="Logo for NSW Police Force"
            title="NSW Police Force"
            height="76"
          />
        </nuxt-link>
        <div class="">
          <img
            src="/logo.svg"
            alt="Logo for NSW Government"
            title="NSW Police Force"
            height="76"
          />
        </div>
      </header>
    </div>

    <!-- <div class="xl:container flex flex-row bg-nsw-grey-200 px-6 pt-8 gap-2">
      <div class="bg-nsw-brand-primary-blue font-bold text-white w-12 text-center">
        Beta
      </div>
      <div class="text-nsw-brand-primary-blue">This is a <span class="underline">new service</span> - your <span class="underline">feedback</span> will help us improve it.</div>
    </div> -->
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
