<template>
  <div class="f_ctnr f_bg_white">
    <h3 class="fsect_ttl" style="padding: 0 0.25rem">{{ ttl }}</h3>
    <PB :categories="categories" />
    <button
      class="f_sect_more_btn"
      @click="$router.push({ path: `/boards/${board_name}` })"
    >
      더보기
    </button>
  </div>
</template>
<style lang="scss"></style>
<script>
import PB from './PartialBoard'
export default {
  props: ['board_name', 'categories', 'ttl'],

  components: {
    PB
  },
  data() {
    return {}
  }
}
</script>
