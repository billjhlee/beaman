<template>
  <ul class="bboard_ctnr">
    <li v-for="(post, index) in post.posts" class="bboard_item">
      <BBoardItem
        :userId="post.userId"
        :username="post.username"
        :title="post.title"
        :date="post.createdAt"
        :likes="post.likes"
        :views="post.views"
        :id="post.id"
      />
    </li>
  </ul>
</template>
<style lang="scss">
.f_bboard_dvdr_solid {
  border-top: 1px solid #bbb;
  margin: 0px 0;
}
.bboard_item {
  width: 100%;
  // padding: 4px 0;
}
.bboard_ctnr {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>
<script>
import BBoardItem from './BeermanBoardItemV2'
export default {
  components: {
    BBoardItem
  },
  data() {
    return {
      post: {
        nextPage: 0,
        pageSize: 5,
        // date: '',
        posts: [],
        categories: ['beerman'],
        align: 'createdAt'
      }
    }
  },
  methods: {
    get_content: async function() {
      let query = `?page=${this.post.nextPage}&pageSize=${this.post.pageSize}&align=${this.post.align}`
      let res = await this.$axios.post('/article/category' + query, {
        categories: this.post.categories
      })
      // if (!this.post.date) this.post.date = res.data.date
      this.post.posts = res.data.result
    }
  },
  mounted() {
    this.get_content()
  }
}
</script>
