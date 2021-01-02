<template>
  <div class="f_ctnr f_bg_white">
    <div class="fcp_ttl_dwm_ctnr">
      <h3 class="fsect_ttl fcp_ttl" style="padding: 0 0.25rem">인기 댓글</h3>
      <div class="fcp_dwm">
        <DWM @dwm_change="dwm_change" />
      </div>
    </div>
    <div class="fboard_table_cont">
      <ul class="fboard_table">
        <li class="fboard_rowhead fboard_li_head">
          <div class="fboard_col fboard_colhead fboardcmtp_head_title">
            내용
          </div>
          <!--<div
          class="fboard_col fboard_colhead fboard_colhead_2 fboard_head_author"
        >
          작성자
        </div>
        -->
          <!--<div
          class="fboard_col fboard_colhead fboard_colhead_2 fboard_head_views"
        >
          조회수
        </div>
        -->
          <div
            class="fboard_col fboard_colhead fboard_colhead_2 fboardcmtp_head_likes"
          >
            <fa :icon="['fas', 'thumbs-up']" />
          </div>
        </li>
        <!---->
        <li v-for="(item, index) in comment.comments" class="fboard_li">
          <hr class="f_board_dvdr_solid" />

          <div class="fboard_li_inner">
            <div class="fboard_col fboard_content fboard_text_span">
              <nuxt-link class="flink" :to="`/post/${item.id}`">
                {{ item.content }}
              </nuxt-link>
            </div>
            <!--<div class="fboard_col fboard_author">
            <div class="fboard_author_inner_ctnr">
              <div
                class="fboard_author_pf"
                :style="
                  `background-image: url(https://codetheweb.blog/assets/img/icon2.png)`
                "
              ></div>
              <span class="fboard_author_span fboard_text_span">
                {{ item.author }}
              </span>
            </div>
          </div>-->
            <!--<div class="fboard_col fboard_views fboard_text_span">
            {{ item.views }}
          </div>
          -->
            <div class="fboard_col fboardcmtp_likes fboard_text_span">
              {{ item.likes }}
            </div>
          </div>
        </li>
      </ul>
      <Paginator :at="currentPage" :last="lastPage" @page_change="changePage" />
    </div></div
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

.fboard_content {
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (max-width: $desktop) {
    width: 70%;
  }
  @media only screen and (max-width: $tablet) {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

// .fboard_author {
//   width: 30%;

//   @media only screen and (max-width: $desktop) {
//     width: 30%;
//   }

//   @media only screen and (max-width: $tablet) {
//     width: 30%;
//   }
// }

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

.fboardcmtp_likes {
  width: 30%;
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
.fboardcmtp_head_title {
  width: 70%;

  @media only screen and (max-width: $desktop) {
    width: 70%;
  }

  @media only screen and (max-width: $tablet) {
    width: 70%;
  }
}
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
.fboardcmtp_head_likes {
  width: 30%;

  @media only screen and (max-width: $desktop) {
    width: 30%;
  }

  @media only screen and (max-width: $tablet) {
    width: 30%;
  }
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
// }

// .f_board_dvdr_solid {
//   border-top: 1px solid #bbb;
//   margin: 3px 0;
// }
</style>
<script>
import Paginator from '../Paginator/Simple'
import DWM from '../DayWeekMonth'
export default {
  components: {
    Paginator,
    DWM
  },
  data() {
    return {
      dwm_tracker: 0,
      currentPage: 1,
      lastPage: 1,
      comment: {
        nextPage: 0,
        pageSize: 5,
        date: '',
        comments: [],
        // categories: [],
        align: 'createdAt'
      }
    }
  },
  methods: {
    changePage: function(page) {
      //call some async function;
      this.currentPage = page
      this.comment.nextPage = page - 1
      this.get_content()
    },
    dwm_change: async function(dwm, old_dwm) {
      if (dwm !== old_dwm) {
        this.dwm_tracker = dwm
        this.comment.nextPage = 0
        this.currentPage = 1
        this.lastPage = 1
        // this.$forceUpdate()
        this.get_content()
      }
    },
    get_content: async function(dwm = 0) {
      let query = `?page=${this.comment.nextPage}&pageSize=${this.comment.pageSize}&date=${this.comment.date}`
      let res = await this.$axios.post(
        `/comment/popular/${this.dwm_tracker}${query}`
      )
      if (!this.comment.date) this.comment.date = res.data.date
      if (res.data.nextPage >= 4) this.lastPage = 4
      else if (res.data.nextPage != -1 && res.data.nextPage > this.lastPage - 1)
        this.lastPage++
      if (res.data.nextPage > this.lastPage) this.comment.nextPage = -1
      else this.comment.nextPage = res.data.nextPage
      this.comment.pageSize = res.data.pageSize
      this.comment.comments = res.data.result
      // let result = await this.$axios.post()
      // this.data = [
      //   {
      //     id: 243,
      //     author: '댓글고라니1231231221412414124',
      //     content: '제목호랑3123123123123123이 124124124124',
      //     views: 123143,
      //     likes: 23
      //   },
      //   {
      //     id: 643,
      //     author: '댓글고라니',
      //     content: '제목호랑이',
      //     views: 123,
      //     likes: 23
      //   },
      //   {
      //     id: 643,
      //     author: '댓글고라니',
      //     content: '제목호랑이',
      //     views: 123,
      //     likes: 23
      //   }
      // ]
    }
  },
  mounted() {
    this.get_content()
  }
}
</script>
