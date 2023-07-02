<template>
  <div class="lg:flex">
    <div class="lg:w-7/12">
      <div class="mb-8 md:mb-10">
        <h2 class="btn-blue font-bold text-nsw-brand-primary-blue mb-3">
          Procurement Career Pathways Tool
        </h2>
        <h1 class="text-3xl md:text-[42px] font-bold leading-tight mb-4">
          Get a personalised career recommendation and plan
        </h1>
        <div class="flex items-center">
          <img src="/clock-outline.svg" class="mr-2" />
          <p class="text-nsw-grey-700">Estimated time: 8-10 mins</p>
        </div>
      </div>
      <div class="mb-6">
        <h2 class="text-2xl font-bold mb-3">
          How it works
        </h2>
        <ul class="ml-5 list-outside list-disc leading-loose lg:w-5/6">
          <li>Answer a few questions.</li>
          <li>See roles you could move into.</li>
          <li>Understand what skills you need to improve.</li>
          <li>Get ways to upskill.</li>
        </ul>
      </div>
      <div class="mb-6">
        <h3 class="text-2xl font-bold mb-3">
          Who is this best suited for?
        </h3>
        <p class="mb-3">People looking:</p>
        <ul class="ml-5 list-outside list-disc leading-loose lg:w-5/6">
          <li>to develop their skills and capabilities.</li>
          <li>for the next step in their career.</li>
          <li>to work in a NSW public sector procurement role.</li>
        </ul>
      </div>
      <div class="mb-6 lg:mb-0">
        <h3 class="text-2xl font-bold mb-3">
          Notes about this tool
        </h3>
        <ul class="ml-5 list-outside list-disc leading-loose">
          <li>All your responses are saved anonymously to your web browser while using this tool.</li>
          <li>None of your information is stored on the Internet after you leave this experience.</li>
          <li>The Procurement Career Pathways tool is built using the <a href="https://www.psc.nsw.gov.au/workforce-management/capability-framework/occupation-specific-capability-sets/procurement-capability-set" class="text-nsw-brand-primary-blue underline font-bold" style="text-underline-offset: 2px;">NSW Public Sector Capability Framework</a> and <a href="https://www.psc.nsw.gov.au/workforce-management/capability-framework/occupation-specific-capability-sets/procurement-capability-set" class="text-nsw-brand-primary-blue underline font-bold" style="text-underline-offset: 2px;">Procurement Professionals Capability Set</a>.</li>
        </ul>
      </div>
    </div>
    <div class="lg:w-5/12 flex justify-end items-start">
      <div class="block p-8 bg-nsw-grey-100 lg:w-10/12 rounded-lg xl:max-w-lg">
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
