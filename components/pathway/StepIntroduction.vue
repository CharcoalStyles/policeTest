<template>
  <div class="lg:flex">
    <div class="lg:w-7/12">
      <div class="mb-8 md:mb-10">
        <h2 class="btn-blue font-bold text-nsw-brand-primary-blue mb-3">
          Career Pathways Tool
        </h2>
        <h1 class="text-3xl md:text-[42px] font-bold leading-tight mb-4">
          Get a personalised career recommendation and plan
        </h1>
      </div>
      <div class="mb-6">
        <h2 class="text-2xl font-bold mb-3">How it works</h2>
        <ul class="ml-5 list-outside list-disc leading-loose lg:w-5/6">
          <li>We’ll ask a few questions</li>
          <li>We’ll show you what roles you could move into</li>
          <li>We’ll help you understand what skills you need to improve</li>
          <li>We’ll surface upskilling resources.</li>
        </ul>
      </div>
      <div class="mb-6">
        <h3 class="text-2xl font-bold mb-3">Who is this best suited for?</h3>
        <ul class="ml-5 list-outside list-disc leading-loose lg:w-5/6">
          <li>People looking for the next step in their career</li>
          <li>for the next step in their career</li>
          <li>People looking to work in a NSW Government digital role</li>
        </ul>
      </div>
    </div>
    <div class="lg:w-5/12 flex justify-end items-start">
      <div
        class="block p-8 bg-nsw-brand-primary-blue-light lg:w-10/12 rounded-lg xl:max-w-lg"
      >
        <h3 class="font-bold text-2xl mb-8">Unsure if this tool is for you?</h3>
        <div class="font-bold mb-3">Use the Role Explorer tool</div>
        <p class="mb-12">
          See common procurement roles types, levels, and how they’re connected
          across the NSW public sector.
        </p>
        <nuxt-link
          target="_blank"
          to="/explorer"
          class="inline-flex items-center justify-center font-bold rounded-md focus:border-nsw-brand-tertiary-blue focus:outline-buttons whitespace-no-wrap  hover:bg-nsw-brand-primary-blue text-nsw-brand-primary-blue hover:text-white border-2 border-nsw-brand-primary-blue h-10 md:h-12 px-6 md:px-8 text-sm md:text-base"
        >
          Browse role types
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
