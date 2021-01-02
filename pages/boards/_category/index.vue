<template>
  <div class="f_sect f_bg_trans">
    <div class="f_ctnr f_bg_white">
      <Board :category="$route.params.category" />
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import Board from '~/components/Forum/Boards/FullBoard'
export default {
  props: ['category'],
  components: {
    Board
  },
  data() {
    return {
      allow: false,
      loader: null,
      allowed_params: {
        general: true,
        prove: true,
        health: true,
        humour: true,
        info: true
      }
    }
  },
  computed: {
    disallowed: function() {
      return !this.allowed_params[this.$route.params.category]
    }
  },
  methods: {
    gate: function() {
      if (this.disallowed) this.$router.push({ path: '/boards/general' })
    }
  },
  created() {
    this.gate()
  },

  layout: 'forum'
}
</script>
