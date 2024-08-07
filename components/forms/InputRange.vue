<template>
  <vue-slider
    ref="slider"
    v-model="range"
    :min="min"
    :max="max"
    :min-range="100"
    :interval="1000"
    :enable-cross="false"
    :rail-style="railStyle"
    :process-style="processStyle"
    :dot-style="dotStyle"
    :dot-size="17"
    :tooltip="'none'"
    :height="2"
    @change="$emit('change', range)"
  />
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  components: {
    VueSlider
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      range: [0, 100]
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.range = value
      }
    }
  },
  created() {
    this.railStyle = {
      backgroundColor: '#A0A4AE'
    }
    this.processStyle = {
      backgroundColor: '#002664'
    }
    this.dotStyle = {
      backgroundColor: '#002664',
      boxShadow: 'none'
    }
  }
}
</script>
