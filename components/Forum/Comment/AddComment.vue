<template>
  <div class="faddcmt_ctnr">
    <input
      type="text"
      v-model="content"
      class="faddcmt_ipt"
      placeholder="1자 이상 50자 이내로 적어주세요"
    />
    <button @click="addComment" class="freply_btn">
      {{ edit ? '수정' : '답장' }}
    </button>
  </div>
</template>
<style lang="scss">
.faddcmt_ipt {
  //   width: 100%;
  flex-grow: 1;
  padding: 6px;
  outline: 0;
}
.faddcmt_ctnr {
  display: flex;
}
</style>
<script>
export default {
  props: ['articleId', 'article', 'commentId', 'edit'],
  data() {
    return {
      content: ''
    }
  },
  methods: {
    addComment: async function() {
      if (!(await this.$store.dispatch('users/loginguard', this.$toast))) return
      if (this.content.length === 0 || this.content.length > 50) {
        this.$toast.error('1자 이상 50자 이내로 적어주세요', {
          duration: 2000,
          action: {
            text: '닫가',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        })
        return
      }
      if (this.edit) {
        let res = await this.$axios.post('/2/comment/update', {
          id: this.commentId,
          content: this.content
        })
        this.$emit('comment_edited', this.content)
      } else {
        let data = { articleId: this.articleId, content: this.content }
        if (this.commentId) data.commentId = this.commentId
        let res = await this.$axios.post('/3/comment', data)
        let comment = res.data.comment
        comment.User = res.data.user
        if (this.article) this.$emit('comment_added', comment)
        else this.$emit('child_added', comment)
      }
    }
  }
}
</script>
