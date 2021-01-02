<template>
  <div class="fp_options_bar">
    <button class="fcomment_btn" @click="edit">수정</button>
    <button class="fcomment_btn" @click="article_delete">삭제</button>
  </div>
</template>
<style lang="scss">
.fp_options_bar {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
<script>
export default {
  props: ['articleId'],
  data() {
    return {}
  },
  methods: {
    edit: function() {
      this.$router.push({ path: this.$route.path + '/edit' })
      //   this.push('')
    },
    article_delete: async function() {
      let res = await this.$axios.delete(`/2/article/${this.articleId}`)
      this.$router.go('-1')
    }
  }
}
</script>
