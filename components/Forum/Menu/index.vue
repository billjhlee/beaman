<template>
  <div class="f_ctnr f_bg_white">
    <ul class="f_menu_ul">
      <li class="f_menu_li f_menu_hide_1">
        <nuxt-link to="/" class="flink">
          <div>
            <fa :icon="['fas', 'home']" />
            HOME
          </div>
        </nuxt-link>
      </li>

      <hr class="f_menu_dvdr_solid" />
      <nuxt-link to="/attendance" class="flink">
        <li class="f_menu_li">
          <fa :icon="['fas', 'check']" />
          출석체크
        </li>
      </nuxt-link>

      <li class="f_menu_li">
        <nuxt-link to="/notice" class="flink">
          <div>
            <fa :icon="['fas', 'sticky-note']" />
            공지
          </div>
        </nuxt-link>
      </li>

      <hr class="f_menu_dvdr_solid" />

      <li class="f_menu_li">
        <nuxt-link to="/beerman" class="flink">
          <div>
            <fa :icon="['fas', 'beer']" />
            BEERMAN / 비어맨
          </div></nuxt-link
        >
      </li>

      <hr class="f_menu_dvdr_solid" />

      <li class="f_menu_li">
        <nuxt-link to="/boards/general" class="flink">
          <div>
            <fa :icon="['far', 'clipboard']" />

            자유 게시판
          </div>
        </nuxt-link>
      </li>

      <li class="f_menu_li">
        <nuxt-link to="/boards/health" class="flink">
          <div>
            <fa :icon="['fas', 'dumbbell']" />

            헬스 게시판
          </div>
        </nuxt-link>
      </li>

      <li class="f_menu_li">
        <nuxt-link to="/boards/info" class="flink">
          <div>
            <fa :icon="['fas', 'question']" />

            정보 게시판
          </div>
        </nuxt-link>
      </li>

      <li class="f_menu_li">
        <nuxt-link to="/boards/humour" class="flink">
          <div>
            <fa :icon="['far', 'grin-squint']" />

            유머 게시판
          </div>
        </nuxt-link>
      </li>

      <li class="f_menu_li">
        <nuxt-link to="/boards/prove" class="flink">
          <div>
            <fa :icon="['far', 'grin-squint']" />

            인증 게시판
          </div>
        </nuxt-link>
      </li>

      <hr class="f_menu_dvdr_solid" v-if="$store.state.users.user !== null" />

      <li class="f_menu_li" v-if="$store.state.users.user !== null">
        <nuxt-link to="/follows" class="flink">
          <div>
            <fa :icon="['far', 'grin-squint']" />

            팔로우
          </div>
        </nuxt-link>
      </li>
      <li class="f_menu_li" v-if="$store.state.users.user !== null">
        <nuxt-link to="/bookmarks" class="flink">
          <div>
            <fa :icon="['far', 'grin-squint']" />

            북마크
          </div>
        </nuxt-link>
      </li>
    </ul>
    <br class="f_menu_hide_1" />
    <div class="is_youtube f_menu_yt f_menu_btn f_menu_hide_1">
      <fa :icon="['fab', 'youtube']" />
      비어맨
    </div>
  </div></template
>
<style lang="scss">
.f_menu_ul {
  @media only screen and (max-width: $tablet) {
    display: flex;
    // flex-wrap: nowrap;
    overflow-x: auto;
    -ms-overflow-style: none;
  }
}
.f_menu_ul::-webkit-scrollbar {
  display: none;
}
.f_menu_hide_1 {
  @media only screen and (max-width: $tablet) {
    display: none;
  }
}
.f_menu_dvdr_dash {
  border-top: 1px solid #bbb;
  margin: 8px 0;
}

.f_menu_dvdr_solid {
  border-top: 1px solid #bbb;
  margin: 8px 0;
  @media only screen and (max-width: $tablet) {
    display: none;
  }
}

.f_menu_btn {
  cursor: pointer;
}
.f_menu_yt {
  border-radius: 4px;
  padding: 6px;
}
.f_menu_li {
  font-size: 0.8rem;
  font-weight: 400;
  padding: 6px 0;
  cursor: pointer;
  @media only screen and (max-width: $tablet) {
    // display: inline-block;
    flex-shrink: 0;
    margin-right: 20px;
  }
}
</style>
<script>
export default {
  data() {
    return {}
  }
}
</script>
