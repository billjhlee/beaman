<template>
  <div class="f_sect f_bg_trans">
    <div class=" f_bg_white">
      <Full :id="$route.params.id" />
    </div></div
></template>
<style lang="scss"></style>
<script>
import Full from '~/components/Forum/UserProfile/Full'
// import Loading from 'vue-loading-overlay'

export default {
  layout: 'forum',
  components: {
    Full
    // Loading
  },
  data() {
    return {}
  }
}
</script>
