<template>
  <div class="fixed bottom-0 left-0 h-20 md:h-24 w-full z-10">
    <div class="h-20 md:h-24 p-4 md:p-6 xl:container flex items-center justify-between">
      <div>
        <slot name="left" />
      </div>
      <div>
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
