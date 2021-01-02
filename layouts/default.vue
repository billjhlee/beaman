<template>
  <div class="nuxt_ctnr">
    <div></div>
    <nuxt />
  </div>
</template>

<style>
/* hr {
  width: 100%;
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid black;
  margin: 1em 0;
  padding: 0;
} */
.nuxt_ctnr {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
html {
  font-family: 'Do Hyeon';
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

body {
  font-family: 'Do Hyeon';
  height: 100%;
}
</style>

<script>
// import Nav from '~/components/Nav'

export default {
  components: {
    // Nav
  },
  data() {
    return {}
  }
}
</script>
