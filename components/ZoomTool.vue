<template>
  <div class="flex items-start">
    <!-- <transition name="fade">
      <div v-show="help" class="bg-white p-4 shadow-lg mr-4 text-sm w-64 flex items-start">
        <img src="/status.svg">
        <span class="mx-3 -mt-1">Explore roles via the panel or map</span>
        <button @click="help = false">
          <img src="/close.svg" class="h-5">
        </button>
      </div>
    </transition> -->
    <div class="flex flex-row shadow-lg">
      <div class="h-8 bg-white flex items-center justify-center border border-gray-300 select-none" style="width:60px;">
        <span>{{ zoomRange }}%</span>
      </div>
      <button class="w-8 h-8 bg-white flex items-center justify-center border border-gray-300" @click="zoomOut">
        <img src="/zoom-minus.svg" alt="Zoom Minus icon" class="h-5">
      </button>
      <button class="w-8 h-8 bg-white flex items-center justify-center border border-gray-300" @click="zoomIn">
        <img src="/zoom-plus.svg" alt="Zoom Plus icon" class="h-5">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    zoom: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      help: true
    }
  },
  computed: {
    zoomRange() {
      const rounded = Math.round(this.zoom * 10) / 10
      return rounded * 100
    }
  },
  methods: {
    zoomIn() {
      this.$emit('zoom', 1.25)
    },
    zoomOut() {
      this.$emit('zoom', 0.8)
    }
  }
}
</script>
