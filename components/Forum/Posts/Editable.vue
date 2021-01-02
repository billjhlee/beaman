<template>
  <div v-if="post">
    <Upload
      :edit="true"
      :editid="id"
      :editcontent="post.content"
      :edititle="post.title"
      :category="post.category"
    /></div
></template>
<style lang="scss"></style>
<script>
import Upload from '~/components/Forum/Upload'
export default {
  props: ['id'],
  components: {
    Upload
  },
  data() {
    return {
      post: null
    }
  },
  methods: {
    getPost: async function() {
      try {
        let res = await this.$axios.get(`/article/${this.id}`)
        this.post = res.data.result

        // if (
        //   res.data.result.users_liked &&
        //   res.data.result.users_liked.length > 0
        // ) {
        //   let newliked = res.data.result.users_liked[0].UserArticleLike.like
        //   if (newliked) {
        //     this.liked = 1
        //   } else if (!newliked) {
        //     this.liked = 2
        //   }
        // }
        // if (res.data.result.user_favs && res.data.result.user_favs.length > 0) {
        //   this.bookmarked = true
        // }
        // if (
        //   res.data.result.user.users_followed_by &&
        //   res.data.result.user.users_followed_by.length > 0
        // ) {
        //   this.follow = true
        // }
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.getPost()
  }
}
</script>
