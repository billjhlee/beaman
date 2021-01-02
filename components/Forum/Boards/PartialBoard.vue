<template>
  <div class="fboard_table_cont">
    <ul class="fboard_table">
      <!--<li class="fboard_rowhead fboard_li_head">
        <div class="fboard_col fboard_colhead fboard_head_title">
          제목
        </div>
        <div
          class="fboard_col fboard_colhead fboard_colhead_2 fboard_head_author"
        >
          작성자
        </div>-->
      <!--<div
          class="fboard_col fboard_colhead fboard_colhead_2 fboard_head_views"
        >
          조회수
        </div>
        -->
      <!--<div
          class="fboard_col fboard_colhead fboard_colhead_2 fboard_head_likes"
        >
          <fa :icon="['fas', 'thumbs-up']" />
        </div>-->
      <!--</li>-->
      <!---->
      <li v-if="post.posts.length === 0">
        등록된 글이 없습니다
      </li>
      <li v-for="(item, index) in post.posts" class="fboard_li">
        <div class="fboard_li_inner">
          <div class="fboard_col fboardp_title fboard_text_span">
            <span
              @click="$store.dispatch('modal/setpost', item.id)"
              style="cursor:pointer"
            >
              {{ item.title }}
            </span>
          </div>
          <div class="fboard_col fboardp_author">
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
          <!--<div class="fboard_col fboard_views fboard_text_span">
            {{ item.views }}
          </div>
          -->
          <!--
          <div class="fboard_col fboard_likes fboard_text_span">
            {{ item.likes }}
          </div>
          -->
        </div>

        <hr class="f_board_dvdr_solid" />
      </li>
    </ul></div
></template>
<style lang="scss">
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

.fboardp_title {
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (max-width: $desktop) {
    width: 60%;
  }
  @media only screen and (max-width: $tablet) {
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.fboardp_author {
  width: 40%;

  @media only screen and (max-width: $desktop) {
    width: 40%;
  }

  @media only screen and (max-width: $tablet) {
    width: 40%;
  }
}

// .fboard_views {
//   width: 20%;

//   text-align: center;

//   @media only screen and (max-width: $desktop) {
//     width: 20%;
//   }
//   @media only screen and (max-width: $tablet) {
//     width: 20%;
//   }
// }

// .fboard_likes {
//   width: 7.5%;
//   text-align: center;
//   color: green !important;
// }

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
// .fboard_head_title {
//   width: 70%;

//   @media only screen and (max-width: $desktop) {
//     width: 70%;
//   }

//   @media only screen and (max-width: $tablet) {
//     width: 70%;
//   }
// }
// .fboard_head_author {
//   width: 30%;

//   @media only screen and (max-width: $desktop) {
//     width: 30%;
//   }

//   @media only screen and (max-width: $tablet) {
//     width: 30%;
//   }
// }

// .fboard_head_views {
//   width: 20%;

//   @media only screen and (max-width: $desktop) {
//     width: 20%;
//   }

//   @media only screen and (max-width: $tablet) {
//     width: 20%;
//   }
// }
// .fboard_head_likes {
//   width: 7.5%;
// }

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
// }

// .f_board_dvdr_solid {
//   border-top: 1px solid #bbb;
//   margin: 3px 0;
// }
</style>
<script>
export default {
  props: ['categories'],
  data() {
    return {
      // currentPage: 1,
      // lastPage: 1,
      // pageinput: '',
      post: {
        nextPage: 0,
        pageSize: 10,
        // date: '',
        posts: [],
        categories: this.categories || [],
        align: 'createdAt'
      }
    }
  },
  methods: {
    get_content: async function() {
      let query = `?page=${this.post.nextPage}&pageSize=${this.post.pageSize}&align=${this.post.align}`
      let res = await this.$axios.post('/article/category' + query, {
        categories: this.categories
      })
      // if (!this.post.date) this.post.date = res.data.date
      // console.log(this.post.date)
      // this.post.nextPage = res.data.nextPage
      // this.post.pageSize = res.data.pageSize
      this.post.posts = res.data.result
      // console.log(res)
      // this.data = [
      //   {
      //     id: 643,
      //     author: '댓글고라니1231231221412414124',
      //     title: '제목호랑3123123123123123이 124124124124',
      //     views: 123143,
      //     likes: 23,
      //     date: '232일전'
      //   },
      //   {
      //     id: 643,
      //     author: '댓글고라니',
      //     title: '제목호랑이',
      //     views: 123,
      //     likes: 23,
      //     date: '232일전'
      //   },
      //   {
      //     id: 643,
      //     author: '댓글고라니',
      //     title: '제목호랑이',
      //     views: 123,
      //     likes: 23,
      //     date: '232일전'
      //   }
      // ]
    }
  },
  created() {
    this.get_content()
  }
}
</script>
