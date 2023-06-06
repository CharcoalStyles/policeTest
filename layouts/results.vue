<template>
  <div class="flex flex-col min-h-screen antialiased text-base print:w-full">
    <div class="bg-nsw-grey-100 block h-header absolute z-0" />
    <nsw-header />
    <div class="relative flex-grow z-10">
      <div class="xl:container">
        <div class="relative p-4 md:py-12 md:px-6">
          <Nuxt />
        </div>
      </div>
    </div>
    <nsw-footer />
    <portal-target name="modal" multiple />
  </div>
</template>

<script>
import NswHeader from '@/components/nsw/NswHeader'
import NswFooter from '@/components/nsw/NswFooter'

export default {
  components: {
    NswHeader,
    NswFooter
  }
}
</script>
