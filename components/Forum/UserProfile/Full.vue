<template>
  <div style="width:100%" class="fuppfull_ctnr" v-if="user">
    <div class="fupp_upp_ctnr">
      <UPP
        :partial="false"
        :id="id"
        :followed="
          user && user.user_followed_by && user.user_followed_by.length > 0
        "
      />
    </div>
    <div class="">
      <div class="fuppfull_rs_ctnr">
        <h3 class="fuppfull_score">338점</h3>
        <h3 class="fuppfull_rank">2위</h3>
      </div>
      <div class="fuppfull_posts_ctnr">
        <h3 class="fuppfull_ttl">게시글</h3>
        <div class="">
          <div class="fboard_table_cont" style="padding:0">
            <ul class="fboard_table" style="margin-bottom: 1rem;">
              <li class="fboard_rowhead fboard_li_head">
                <div class="fboard_col fboard_colhead fboard_head_title_up">
                  내용
                </div>
                <!--<div
          class="fboard_col fboard_colhead fboard_colhead_2 fboard_head_author"
        >
          작성자
        </div>
        -->
                <div
                  class="fboard_col fboard_colhead fboard_colhead_2 fboard_head_views_up"
                >
                  조회수
                </div>

                <div
                  class="fboard_col fboard_colhead fboard_colhead_2 fboard_head_likes_up"
                >
                  <fa :icon="['fas', 'thumbs-up']" />
                </div>
              </li>
              <!---->
              <li v-for="(item, index) in post.posts" class="fboard_li">
                <hr class="f_board_dvdr_solid" />

                <div class="fboard_li_inner">
                  <div class="fboard_col fboard_content_up fboard_text_span">
                    <span @click="click_post(item.id)" style="cursor:pointer">
                      {{ item.title }}
                    </span>
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
                  <!--<div class="fboard_col fboard_views_up fboard_text_span">
            {{ item.views }}
          </div>
          -->
                  <div class="fboard_col fboard_views_up fboard_text_span">
                    {{ item.views }}
                  </div>
                  <div class="fboard_col fboard_likes_up fboard_text_span">
                    {{ item.likes }}
                  </div>
                </div>
              </li>
            </ul>
            <Paginator
              :at="currentPage"
              :last="this.lastPage"
              v-if="!isModal"
              @page_change="changePage"
            />
            <div v-else>
              <button
                @click="viewMore"
                class="f_sect_more_btn"
                style="margin:0"
              >
                더 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
    <div></div>
  </div>
</template>
<style lang="scss">
.fupp_upp_ctnr {
  padding: 1rem;
}
.fuppfull_posts_ctnr {
  padding: 1rem;
}
.fuppfull_rank {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  padding: 4rem 0;
}
.fuppfull_score {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  padding: 4rem 0;
}
.fuppfull_rs_ctnr {
  display: flex;
  background: black;
  color: white;
}
.fuppfull_ctnr {
  // padding: 18px;
}
.fuppfull_ttl {
  padding: 0 1rem;
  margin-bottom: 0.8rem;
  font-weight: 400;
  font-size: 1.8rem;
}
.fboard_likes_up {
  width: 25%;
  text-align: center;
  color: green !important;
}
.fboard_head_likes_up {
  width: 25%;

  @media only screen and (max-width: $desktop) {
    width: 25%;
  }

  @media only screen and (max-width: $tablet) {
    width: 25%;
  }
}

.fboard_content_up {
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (max-width: $desktop) {
    width: 50%;
  }
  @media only screen and (max-width: $tablet) {
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.fboard_views_up {
  width: 25%;
  text-align: center;
  // color: green !important;
}

.fboard_head_title_up {
  width: 50%;

  @media only screen and (max-width: $desktop) {
    width: 50%;
  }

  @media only screen and (max-width: $tablet) {
    width: 50%;
  }
}

.fboard_head_views_up {
  width: 25%;

  @media only screen and (max-width: $desktop) {
    width: 25%;
  }

  @media only screen and (max-width: $tablet) {
    width: 25%;
  }
}
</style>
<script>
import UPP from './UserProfilePartial'
import Paginator from '../Paginator'

export default {
  components: {
    UPP,
    Paginator
  },
  props: ['id', 'isModal'],
  data() {
    return {
      currentPage: 1,
      lastPage: 1,
      pageinput: '',
      post: {
        nextPage: 0,
        pageSize: this.isModal ? 10 : 25,
        date: '',
        posts: [],
        categories: [],
        align: 'createdAt'
      },
      user: null
    }
  },
  methods: {
    click_post: function(id) {
      this.$store.dispatch('modal/close')
      this.$router.push({ path: `/post/${id}` })
    },
    changePage: function(page) {
      //call some async function;
      this.currentPage = page
      this.post.nextPage = page - 1
      this.get_content()
    },
    get_user: async function() {
      let res = await this.$axios.get(`/user/${this.id}/f`)
      this.user = res.data.result
      this.lastPage = Math.ceil(this.user.articles / this.post.pageSize)
    },
    get_content: async function() {
      // change to eager loading user get all articles
      let query = `?page=${this.post.nextPage}&pageSize=${this.post.pageSize}&date=${this.post.date}`
      let res = await this.$axios.post(`/article/category/${query}`, {
        categories: this.post.categories,
        userId: this.id
      })
      if (!this.post.date) this.post.date = res.data.date
      if (res.data.nextPage > this.lastPage) this.post.nextPage = -1
      else this.post.nextPage = res.data.nextPage
      this.post.pageSize = res.data.pageSize
      this.post.posts = res.data.result
    },
    // getUser: async function() {
    //   // remove if later on
    //   if (this.$store.state.users.user.email) {
    //     let res = this.$axios.get(
    //       `/user/email/${this.$store.state.users.user.email}`
    //     )
    //     this.user = res.data.result
    //   }
    // }
    viewMore: function() {
      this.$router.push({ path: `/user/${this.id}` })
      this.$store.dispatch('modal/close')
    }
  },
  mounted() {
    this.get_user()
    this.get_content()
    // this.$store.dispatch('modal/close')
    // this.getInfo()
    // this.getUser()
  }
}
</script>
