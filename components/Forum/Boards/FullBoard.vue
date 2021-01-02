<template>
  <div class="fboard_table_cont">
    <ul class="fboard_table">
      <li class="fboard_rowhead fboard_li_head">
        <div class="fboard_col fboard_colhead fboard_head_id">
          #
        </div>
        <div class="fboard_col fboard_colhead fboard_head_title">
          제목
        </div>
        <div
          class="fboard_col fboard_colhead fboard_colhead_2 fboard_head_author"
        >
          작성자
        </div>
        <div
          class="fboard_col fboard_colhead fboard_colhead_2 fboard_head_date"
        >
          날짜
        </div>
        <div
          class="fboard_col fboard_colhead fboard_colhead_2 fboard_head_views"
        >
          조회수
        </div>
        <div
          class="fboard_col fboard_colhead fboard_colhead_2 fboard_head_likes"
        >
          <fa :icon="['fas', 'thumbs-up']" />
        </div>
      </li>
      <!---->
      <li v-if="post.posts.length === 0">
        등록된 글이 없습니다
      </li>
      <li v-for="(item, index) in post.posts" class="fboard_li">
        <hr class="f_board_dvdr_solid" />

        <div class="fboard_li_inner">
          <div class="fboard_col fboard_id fboard_text_span">
            <nuxt-link class="flink" :to="`/post/${item.id}`">
              {{ item.id }}
            </nuxt-link>
          </div>
          <div class="fboard_col fboard_title fboard_text_span">
            <nuxt-link class="flink" :to="`/post/${item.id}`">
              {{ item.title }}
            </nuxt-link>
          </div>
          <div class="fboard_col fboard_author">
            <div class="fboard_author_inner_ctnr">
              <div
                class="fboard_author_inner_inner_ctnr"
                @click="$store.dispatch('modal/setprofile', item.userId)"
              >
                <div
                  class="fboard_author_pf"
                  :style="
                    `background-image: url(${
                      item.User.thumbnail
                        ? item.User.thumbnail
                        : 'https://d2rkgndbm9lqnh.cloudfront.net/defaultprofile.png'
                    })`
                  "
                ></div>
                <span class="fboard_author_span fboard_text_span">
                  {{ item.username }}
                </span>
              </div>
            </div>
          </div>
          <div class="fboard_col fboard_date fboard_text_span">
            {{ $moment(item.createdAt).fromNow() }}
          </div>
          <div class="fboard_col fboard_views fboard_text_span">
            {{ item.views }}
          </div>
          <div class="fboard_col fboard_likes fboard_text_span">
            {{ item.likes }}
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <div class="fboard_pgntn_ctnr">
        <span class="fboard_pag_chev">
          <
        </span>

        <span
          class="fboard_pag_page"
          v-if="
            currentPage !== 1 && currentPage - 1 !== 1 && currentPage - 2 !== 1
          "
          @click="changePage(1)"
        >
          1
        </span>
        <span
          v-if="
            currentPage !== 1 && currentPage - 1 !== 1 && currentPage - 2 !== 1
          "
          >...</span
        >
        <span
          class="fboard_pag_page"
          v-if="currentPage - 1 > 1"
          @click="changePage(currentPage - 2)"
        >
          {{ currentPage - 2 }}
        </span>
        <span
          class="fboard_pag_page"
          v-if="currentPage > 1"
          @click="changePage(currentPage - 1)"
        >
          {{ currentPage - 1 }}
        </span>
        <span class="fboard_pag_page fboard_pag_sel">
          {{ currentPage }}
        </span>
        <span
          class="fboard_pag_page"
          v-if="currentPage < lastPage"
          @click="changePage(currentPage + 1)"
        >
          {{ currentPage + 1 }}
        </span>

        <span
          class="fboard_pag_page"
          v-if="currentPage + 1 < lastPage"
          @click="changePage(currentPage + 2)"
        >
          {{ currentPage + 2 }}
        </span>

        <span
          class="fboard_pag_page"
          v-if="
            currentPage !== lastPage &&
              currentPage + 1 !== lastPage &&
              currentPage + 2 !== lastPage
          "
        >
          ...
        </span>

        <span
          class="fboard_pag_page"
          v-if="
            currentPage !== lastPage &&
              currentPage + 1 !== lastPage &&
              currentPage + 2 !== lastPage
          "
          @click="changePage(lastPage)"
        >
          {{ lastPage }}
        </span>
        <span class="fboard_pag_chev fboard_pag_right"> ></span>
        <input
          class="fboard_pag_ipt"
          v-model="pageinput"
          @change="pageinputchange"
          type="number"
        />
        <button class="fboard_btn" style>
          고
        </button>
        <button @click="write" v-if="!dontwrite" class="fboard_btn">
          글쓰기
        </button>
      </div>
    </ul>
  </div></template
>
<style lang="scss">
.fboard_pag_sel {
  color: green;
}
.fboard_pag_page {
  cursor: pointer;
  padding: 0 2px;
}
.fboard_pag_chev {
  cursor: pointer;
  padding: 0 8px;
}
.fboard_pag_right {
  // margin-right: 4px;
}
.fboard_pag_ipt {
  // height: 100%;
  padding: 0.2rem;
  width: 40px;
  border-radius: 4px;
  border: 1px grey solid;
}
.fboard_pgntn_ctnr {
  width: 100%;
  text-align: center;
}
// .fboard_table_cont {
//   padding: 6px;
//   box-sizing: border-box;
// }

// .fboard_author_inner_ctnr {
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
// .fboard_text_span {
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// }
// .fboard_author_span {
// }

// .fboard_author_pf {
//   flex-shrink: 0;
//   width: 1.4rem;
//   height: 1.4rem;
//   margin: 0;
//   border-radius: 7px;
//   background-position: center center;
//   background-repeat: no-repeat;
//   //   background-attachment: fixed;
//   background-size: cover;
//   margin-right: 4px;
// }
.fboard_id {
  width: 7.5%;
  // text-align: center ;
}

.fboard_title {
  width: 47.5%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media only screen and (min-width: $tablet) {
    width: 40%;
  }

  @media only screen and (min-width: $desktop) {
    width: 47.5%;
  }
}

.fboard_author {
  width: 17.5%;

  @media only screen and (min-width: $tablet) {
    width: 25%;
  }

  @media only screen and (min-width: $desktop) {
    width: 17.5%;
  }
}

.fboard_date {
  width: 10%;
  text-align: center;
}

.fboard_views {
  width: 10%;
  text-align: center;
}

.fboard_likes {
  width: 7.5%;
  text-align: center;
  color: green !important;
}

// .fboard_col {
//   font-size: 0.9rem;
//   color: black;
//   padding: 4px;
// }

// .fboard_colhead {
//   font-weight: 600;
//   padding-bottom: 8px;
// }

// .fboard_colhead_2 {
//   text-align: center;
// }
// .fboard_rowhead {
//   // padding-bottom: 8px;
// }
.fboard_head_id {
  width: 7.5%;
}
.fboard_head_title {
  width: 47.5%;
  @media only screen and (min-width: $tablet) {
    width: 40%;
  }

  @media only screen and (min-width: $desktop) {
    width: 47.5%;
  }
}
.fboard_head_author {
  width: 17.5%;
  @media only screen and (min-width: $tablet) {
    width: 25%;
  }

  @media only screen and (min-width: $desktop) {
    width: 17.5%;
  }
}

.fboard_head_date {
  width: 10%;
}
.fboard_head_views {
  width: 10%;
}
.fboard_head_likes {
  width: 7.5%;
}

// .fboard_li_head {
//   display: flex;
//   margin-bottom: 6px;
// }
// .fboard_li {
//   // margin-bottom: 6px;
// }

// .fboard_li_inner {
//   display: flex;
// }
// .fboard_table {
//   width: 100%;
//   min-height: 600px;
// }

// .f_board_dvdr_solid {
//   border-top: 1px solid #bbb;
//   margin: 3px 0;
// }
</style>
<script>
export default {
  props: ['category', 'userIds', 'bookmarks', 'dontwrite'],
  data() {
    return {
      currentPage: 1,
      lastPage: 1,
      pageinput: '',
      post: {
        nextPage: 0,
        pageSize: 25,
        date: '',
        posts: [],
        categories: [],
        align: 'createdAt'
      }
    }
  },
  computed: {
    article_categories: function() {
      return this.category ? [this.category] : this.post.categories
    }
  },
  methods: {
    changePage: function(page) {
      //call some async function;
      this.currentPage = page
      this.post.nextPage = page - 1
      this.get_content()
    },
    pageinputchange: function() {
      if (this.pageinput < 1) this.pageinput = 1
      else if (this.pageinput > this.lastPage) this.pageinput = this.lastPage
    },
    get_pages: async function() {
      let result = await this.$axios.post('/article/category/pages', {
        categories: this.article_categories
      })
      this.lastPage = Math.floor(result.data.count / this.post.pageSize) + 1
    },
    get_content: async function() {
      let query = `?page=${this.post.nextPage}&pageSize=${this.post.pageSize}&date=${this.post.date}&align=${this.post.align}`
      let body = { categories: this.article_categories }
      if (this.bookmarks) {
        body.favs = true
      }
      if (
        this.userIds !== null &&
        this.userIds !== undefined &&
        this.userIds.length > 0
      ) {
        body.userIds = this.userIds
      }
      let res = await this.$axios.post('/article/category' + query, body)
      if (!this.post.date) this.post.date = res.data.date
      this.post.nextPage = res.data.nextPage
      this.post.pageSize = res.data.pageSize
      this.post.posts = res.data.result
    },
    write: async function() {
      if (!(await this.$store.dispatch('users/loginguard', this.$toast))) return
      this.$router.push({ path: `/upload/${this.category}` })
    }
  },
  mounted() {
    this.get_pages()
    this.get_content()
  }
}
</script>
