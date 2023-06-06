<template>
  <div class="flex flex-col min-h-screen max-w-screen antialiased text-base">
    <nsw-header :beta-banner="false" />
    <div class="flex-grow">
      <Nuxt />
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
