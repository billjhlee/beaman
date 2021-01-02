<template>
  <div class="post_ctnr" v-if="post !== null">
    <Header
      :board="'general'"
      :title="post.title"
      :date="post.createdAt"
      :username="post.username"
      :userId="post.userId"
      :email="post.User.email"
      :follow="follow"
      :user_pf="post.User.thumbnail"
    />
    <br />
    <Body :content="post.content" />
    <br />
    <LikeDislike
      :id="id"
      :liked="liked"
      :likes_="post.likes"
      :dislikes_="post.dislikes"
    />
    <div style="text-align: center">
      <button
        @click="bookmark"
        class="fpost_btn fpost_bm"
        :style="bookmarked ? 'background-color: #273c75;color:white;' : ''"
      >
        북마크
      </button>
    </div>
    <OptionsBar
      v-if="
        $store.state.users.user !== null &&
          post.User.email === $store.state.users.user.email
      "
      :articleId="id"
    />
    <AddComment
      :article="true"
      :articleId="id"
      @comment_added="reflect_comment"
    />
    <Comments ref="comments" :articleId="id" /></div
></template>
<style lang="scss">
.post_ctnr {
  padding: 1rem;
}
</style>
<script>
import Body from './Body'
import Header from './Header'
import LikeDislike from './LikeDislike'
import Comments from '~/components/Forum/Comment/Comments'
import AddComment from '~/components/Forum/Comment/AddComment'
import OptionsBar from './OptionsBar'

// comment is to be done;

export default {
  components: {
    Body,
    Header,
    LikeDislike,
    Comments,
    AddComment,
    OptionsBar
  },
  props: ['id'],
  data() {
    return {
      post: null,
      liked: 0,
      bookmarked: false,
      follow: false
    }
  },
  methods: {
    reflect_comment: function(comment) {
      this.$refs.comments.addComment(comment)
    },
    getPost: async function() {
      try {
        let res = await this.$axios.get(`/article/${this.id}`)
        this.post = res.data.result
        if (
          res.data.result.users_liked &&
          res.data.result.users_liked.length > 0
        ) {
          let newliked = res.data.result.users_liked[0].UserArticleLike.like
          if (newliked) {
            this.liked = 1
          } else if (!newliked) {
            this.liked = 2
          }
        }
        if (res.data.result.user_favs && res.data.result.user_favs.length > 0) {
          this.bookmarked = true
        }
        if (
          res.data.result.user.users_followed_by &&
          res.data.result.user.users_followed_by.length > 0
        ) {
          this.follow = true
        }
      } catch (err) {}
    },
    bookmark: async function() {
      if (!(await this.$store.dispatch('users/loginguard', this.$toast))) return

      if (!this.bookmarked) {
        try {
          let res = await this.$axios.post(`favorite/article`, {
            articleId: this.id
          })
          this.bookmarked = true
        } catch (err) {}
      } else {
        try {
          let res = await this.$axios.delete(`favorite/article/${this.id}`, {
            articleId: this.id
          })
          this.bookmarked = false
        } catch (err) {}
      }
    }
    // unmark: async function() {
    //   try {
    //     let res = await this.$axios.delete(`favorite/article/${this.id}`, {
    //       articleId: this.id
    //     })
    //     console.log(res)
    //   } catch (err) {}
    // }
  },
  mounted() {
    this.getPost()
  }
}
</script>
