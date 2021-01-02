<template>
  <div class="f_sect f_bg_trans">
    <div class="f_ctnr f_bg_white">
      <Board :bookmarks="true" :dontwrite="true" />
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import Board from '~/components/Forum/Boards/FullBoard'
export default {
  components: {
    Board
  },
  data() {
    return {}
  },
  layout: 'forum'
}
</script>
