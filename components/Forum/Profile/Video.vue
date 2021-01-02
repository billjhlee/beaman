<template>
  <div class="fprofile_vid_ctnr">
    <vue-friendly-iframe
      className="fprofile_vid_style"
      :src="src"
      style="height:100%"
    ></vue-friendly-iframe></div
></template>
<style lang="scss">
.fprofile_vid_ctnr {
  width: 100%;
  height: 100%;
}
.fprofile_vid_style {
  height: 100%;
  width: 100%;
}
</style>
<script>
export default {
  data() {
    return {
      src: ''
    }
  },
  methods: {
    getIframeUrl: async function() {
      this.src = 'https://www.youtube.com/embed/rrFaY7kQ40Y'
    }
  },
  mounted() {
    this.getIframeUrl()
  }
}
</script>
