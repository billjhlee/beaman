<template>
  <div class="f_100 f_ctnr fprofile_main_ctnr">
    <div
      class="f_100 fprofile_main_bg"
      :style="`background-image: url(${src})`"
    />
  </div>
</template>
<style lang="scss">
.fprofile_main_bg {
  background-position: center center;
  background-repeat: no-repeat;
  //   background-attachment: fixed;
  background-size: cover;
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
    getMainImg: async function() {
      this.src = 'https://codetheweb.blog/assets/img/icon2.png'
      this.$forceUpdate()
    }
  },
  mounted() {
    this.getMainImg()
  }
}
</script>
