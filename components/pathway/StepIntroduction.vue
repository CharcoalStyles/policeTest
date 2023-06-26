<template>
  <div class="lg:flex">
    <div class="lg:w-1/2">
      <div class="mb-8 md:mb-12">
        <h2 class="btn-blue font-bold text-nsw-brand-primary-blue mb-3">
          Procurement Career Pathways tool
        </h2>
        <h1 class="text-3xl md:text-[42px] font-bold leading-tight">
          Get a personalised career recommendation and plan.
        </h1>
      </div>
      <div class="mb-6">
        <h2 class="text-2xl font-bold mb-3">
          How it works
        </h2>
        <ul class="ml-5 list-outside list-disc leading-loose lg:w-5/6">
          <li>We’ll ask a few questions</li>
          <li>We’ll show you what roles you could move into</li>
          <li>We’ll help you understand what skills you need to improve</li>
          <li>Get ways to upskill</li>
        </ul>
      </div>
      <div class="mb-6">
        <h3 class="text-2xl font-bold mb-3">
          Who is this best suited for?
        </h3>
        <p class="mb-3">People looking:</p>
        <ul class="ml-5 list-outside list-disc leading-loose lg:w-5/6">
          <li>to develop their skills and capabilities</li>
          <li>for the next step in their career</li>
          <li>to work in a NSW Government procurement role</li>
        </ul>
      </div>
      <div class="mb-6 lg:mb-0">
        <h3 class="text-2xl font-bold mb-3">
          Your information
        </h3>
        <ul class="ml-5 list-outside list-disc leading-loose lg:w-5/6">
          <li>All your responses are saved anonymously to your web browser while you use this tool</li>
          <li>None of your information is stored on the internet after you leave this experience</li>
        </ul>
      </div>
    </div>
    <div class="lg:w-1/2 flex justify-end items-start">
      <div class="block p-8 bg-nsw-grey-100 lg:w-2/3 rounded-lg xl:max-w-lg">
        <h3 class="font-bold text-2xl mb-8">
          Unsure if this tool is for you?
        </h3>
        <div class="font-bold mb-3">
          Use the Role Explorer tool
        </div>
        <p class="mb-12">
          See common procurement roles types, levels, and how they’re connected across the NSW public sector.
        </p>
        <nsw-button action="secondary-outline" @click.native="$router.push('/explorer')">
          Browse role types
        </nsw-button>
      </div>
    </div>
  </div>
</template>

<script>
import NswButton from '@/components/nsw/NswButton'

export default {
  components: {
    NswButton
  }
}
</script>
