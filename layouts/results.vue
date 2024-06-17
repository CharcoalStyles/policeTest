<template>
  <div class="flex flex-col min-h-screen antialiased text-base">
    <div class="bg-nsw-grey-100 block h-header absolute z-0" />
    <nsw-header />
    <Nuxt />
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
