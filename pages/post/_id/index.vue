<template>
  <div class="f_sect f_bg_trans">
    <div class="f_ctnr f_bg_white">
      <Post :id="$route.params.id" />
    </div></div
></template>
<style lang="scss"></style>
<script>
import Post from '~/components/Forum/Posts'
// import Comments from '~/components/Forum/Comment/Comments'
export default {
  components: {
    Post
    // Comments
  },
  data() {
    return {}
  },
  layout: 'forum'
}
</script>
