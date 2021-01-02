<template>
  <div class="f_ctnr f_bg_white" style="padding-right: 0; padding-left: 0;">
    <h3 class="fsect_ttl" style="padding: 0 1rem;">Beerman / 비어맨</h3>
    <BBP />
    <button
      class="f_sect_more_btn"
      style="padding: 0 0.5rem; margin-left: 1rem;"
      @click="$router.push({ path: `/boards/beerman` })"
    >
      더보기
    </button>
  </div>
</template>
<style lang="scss"></style>
<script>
import BBP from './BeermanBoardPartial'

export default {
  components: {
    BBP
  },
  data() {
    return {}
  }
}
</script>
