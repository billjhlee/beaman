<template>
  <div>
    <ul>
      <li
        v-for="(comment, index) in comments"
        :key="`${comment.id}`"
        class="comments_li"
      >
        <Comment
          @child_added="addComment"
          @comment_delete="comment_delete"
          :articleId="articleId"
          :commentId="comment.id"
          :content="comment.content"
          :username="comment.username"
          :haschildren="comment.Comments && comment.Comments.length > 0"
          :likes="comment.likes"
          :dislikes="comment.dislikes"
          :owns="
            $store.state.users.user !== null &&
              comment.User.email === $store.state.users.user.email
          "
          :index="index"
          :liked="
            comment.users_liked && comment.users_liked.length > 0
              ? getliked(comment.users_liked[0].UserCommentLike.like)
              : 0
          "
        />
      </li>
    </ul>
    <button @click="getComments" v-if="nextPage !== -1" class="f_sect_more_btn">
      더보기
    </button>
  </div>
</template>
<style lang="scss">
.comments_li {
  margin-top: 1rem;
}
</style>
<script>
import Comment from './index'

export default {
  props: ['articleId'],
  components: {
    Comment
  },
  data() {
    return {
      nextPage: 0,
      pageSize: 10,
      comments: [],
      added_ids: {}
    }
  },
  methods: {
    getComments: async function() {
      if (this.nextPage === -1) return
      let query = `?page=${this.nextPage}&pageSize=${this.pageSize}`
      let res = await this.$axios.get(
        `/comment/article/${this.articleId}${query}`
      )
      this.nextPage = res.data.nextPage
      this.pageSize = res.data.pageSize
      this.comments = this.comments.concat(res.data.result)
    },
    addComment: function(comment) {
      this.added_ids[comment.id] = true
      this.comments.unshift(comment)
    },
    comment_delete: function(index) {
      this.comments.splice(index, 1)
    },
    getliked: function(liked) {
      if (liked) return 1
      return 2
    }
  },
  mounted() {
    this.getComments()
  }
}
</script>
