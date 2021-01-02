<template>
  <div style="padding-bottom: 1rem">
    <ul>
      <li v-if="post.posts.length === 0" style="padding: 1rem;">
        등록된 글이 없습니다
      </li>
      <li v-for="(post, index) in post.posts">
        <BBItem
          :userId="post.userId"
          :username="post.username"
          :title="post.title"
          :date="post.createdAt"
          :likes="post.likes"
          :views="post.views"
          :id="post.id"
          :thumbnail="post.User.thumbnail"
        />
      </li>
    </ul>
    <Paginator :at="currentPage" :last="lastPage" @page_change="changePage" />
  </div>
</template>
<style lang="scss"></style>
<script>
import BBItem from './BeermanBoardItemV2'
import Paginator from '../Paginator'
export default {
  components: {
    BBItem,
    Paginator
  },
  data() {
    return {
      currentPage: 1,
      lastPage: 1,
      pageinput: '',
      post: {
        nextPage: 0,
        pageSize: 10,
        date: '',
        posts: [],
        categories: ['beerman'],
        align: 'createdAt'
      }
    }
  },
  methods: {
    changePage: function(page) {
      //call some async function;
      this.currentPage = page
      this.post.nextPage = page - 1
      this.get_content()
    },
    get_pages: async function() {
      let result = await this.$axios.post('/article/category/pages', {
        categories: this.categories
      })
      this.lastPage = Math.ceil(result.data.count / this.post.pageSize)
    },
    get_content: async function() {
      let query = `?page=${this.post.nextPage}&pageSize=${this.post.pageSize}&date=${this.post.date}&align=${this.post.align}`
      let res = await this.$axios.post('/article/category' + query, {
        categories: this.post.categories
      })
      if (!this.post.date) this.post.date = res.data.date
      if (res.data.nextPage > this.lastPage) this.post.nextPage = -1
      else this.post.nextPage = res.data.nextPage
      this.post.pageSize = res.data.pageSize
      this.post.posts = res.data.result
    }
  },
  mounted() {
    this.get_pages()
    this.get_content()
  }
}
</script>
