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
    :tooltip="'none'"
    @change="updateValue"
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
  data () {
    return {
      range: [0, 100]
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        this.range = value
      }
    }
  },
  created () {
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
  },
  methods: {
    updateValue () {
      // Force maximum range as component doesn't allow it
      if (this.range[0] > 180000) {
        this.range[0] = 180000
        this.$refs.slider.setValue(this.range)
      }
      // Force minimum range as component doesn't allow it
      if (this.range[1] < 80000) {
        this.range[1] = 80000
        this.$refs.slider.setValue(this.range)
      }

      this.$emit('input', this.range)
    }
  }
}
</script>
