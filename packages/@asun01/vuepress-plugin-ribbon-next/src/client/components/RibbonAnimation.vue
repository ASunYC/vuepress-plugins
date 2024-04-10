<template>
  <div class="RibbonAnimation" v-if="visible"></div>
</template>

<script>
  import Ribbons from '../js/ribbon.js'
  export default {
    name: 'RibbonAnimation',
    data() {
      return {
        RIBBON_OPTION: RIBBON_OPTIONS,
        visible: RIBBONANIMATION_SHOW
      }
    },
    mounted() {
      if (!RIBBONANIMATION_SHOW) {
        return
      }
      Ribbons(this.RIBBON_OPTION)
    }
  }
</script>
