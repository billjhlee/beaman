<template>
  <div class="fprofile_grid f_bg_white">
    <div class="fprofile_vid"><Video /></div>
    <div class="fprofile_main">
      <Main />
    </div></div
></template>
<style lang="scss">
.fprofile_grid {
  display: flex;
  border-radius: 4px;
  width: 100%;
  height: 400px;
  @media only screen and(max-width: $desktop) {
    flex-wrap: wrap;
    height: 600px;
  }
}

.fprofile_vid {
  width: 40%;
  height: 100%;
  @media only screen and(max-width: $desktop) {
    // display: none;
    width: 100%;
    height: 200px;
  }
}

.fprofile_main {
  width: 60%;
  height: 100%;

  @media only screen and(max-width: $desktop) {
    width: 100%;
    height: 400px;
  }
}
</style>
<script>
import Main from './Main'
import Video from './Video'

export default {
  components: {
    Main,
    Video
  },
  data() {
    return {}
  }
}
</script>
