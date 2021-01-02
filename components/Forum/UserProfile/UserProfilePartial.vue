<template>
  <!--<div class="f_ctnr f_bg_white">-->
  <div>
    <div v-if="user !== null">
      <div class="fupp_ctnr">
        <div class="fupp_pf">
          <div
            class="fupp_change_photo"
            v-if="
              $store.state.users.user !== null &&
                user.email === $store.state.users.user.email
            "
          >
            <button class="fcomment_btn" @click="$refs.profile_img.click()">
              변경
            </button>
          </div>
          <figure class="image is-1by1">
            <img
              class="profile_img"
              :src="
                user.thumbnail
                  ? user.thumbnail
                  : 'https://d2rkgndbm9lqnh.cloudfront.net/defaultprofile.png'
              "
              alt="Placeholder image"
            />
            <input
              type="file"
              ref="profile_img"
              id="profile_img"
              name="profile_img"
              style="display:none"
              @change="uploadfile"
            />
          </figure>
        </div>
        <div class="fupp_info_ctnr">
          <div style="display: flex; box-sizing:border-box">
            <h3 class="fupp_ttl" style="overflow-x: auto;" v-if="!change">
              {{
                partial &&
                $store.state.users.user !== null &&
                $store.state.users.user.username
                  ? $store.state.users.user.username
                  : user
                  ? user.username
                  : ''
              }}
            </h3>
            <input
              v-model="new_username"
              v-else
              class="fupp_ttl"
              type="text"
              placeholder="새로운 유저네임을 적어주세요"
            />
            <div style="width:8px" />
            <button
              @click="$store.dispatch('modal/setprofile', user.id)"
              v-if="partial"
              class="f_sect_more_btn"
              style="margin:0;flex-shrink:0"
            >
              더보기
            </button>
            <button
              v-else-if="
                $store.state.users.user !== null &&
                  $store.state.users.user.email === user.email
              "
              class="f_sect_more_btn"
              @click="change = !change"
              style="margin:0;flex-shrink:0;border:1px solid black; background:white; color: black"
            >
              변경
            </button>
            <button
              v-else-if="
                !followed_status &&
                  $store.state.users.user !== null &&
                  $store.state.users.user.email !== user.email
              "
              @click="followUser"
            >
              팔로우
            </button>
            <button
              v-else-if="
                followed_status &&
                  $store.state.users.user !== null &&
                  $store.state.users.user.email !== user.email
              "
              @click="unfollowUser"
            >
              언팔로우
            </button>
          </div>
          <ul class="fupp_infotext_ul">
            <li class="fupp_infotext_item">
              <div>
                <div class="fupp_infotext_num">33</div>
                <small>게시글</small>
              </div>
            </li>
            <li class="fupp_infotext_item">
              <div>
                <div class="fupp_infotext_num">33</div>
                <small>댓글</small>
              </div>
            </li>
            <li class="fupp_infotext_item">
              <div>
                <div class="fupp_infotext_num">33</div>
                <small>받은 좋아요</small>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <button
        v-if="change || change_image"
        @click="save"
        class="fcomment_btn"
        style="margin-top: 1rem;"
      >
        저장
      </button>
      <button @click="signout" class="fcomment_btn" style="margin-top: 1rem;">
        로그 아웃
      </button>
    </div>
    <div v-else>
      <button
        @click="$store.dispatch('modal/setlogin')"
        class="f_sect_more_btn"
        style="margin: 0; background-color: #6ab04c;"
      >
        로그인 / 회원가입
      </button>
    </div>
  </div>
  <!--</div>-->
</template>
<style lang="scss">
.fupp_change_photo {
  position: absolute;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 4;
  cursor: pointer;
}

.fupp_pf:hover .fupp_change_photo {
  display: flex;
}
.fupp_infotext_num {
  font-size: 1.6rem;
}
.fupp_infotext_ul {
  color: black;
  flex-grow: 1;
  display: flex;
  flex-shrink: 1;
}
.fupp_infotext_item {
  text-align: center;
  margin: auto;
  width: 33.33%;
}
.fupp_ttl {
  font-weight: 400;
  color: black;
  flex-grow: 1;
  flex-shrink: 1;
}

.fupp_info_ctnr {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  // flex-shrink: 0;
  padding-left: 1rem;
  max-width: calc(100% - 100px);
}

.fupp_pf {
  position: relative;
  width: 100px;
  min-width: 100px;
  // flex-grow: 1;
}
.fupp_ctnr {
  display: flex;
}
</style>
<script>
import Cookie from 'js-cookie'

export default {
  props: {
    partial: {
      default: true
    },
    id: {},
    followed: {}
  },
  data() {
    return {
      new_username: '',
      change: false,
      change_image: false,
      user: null,
      followed_status: this.followed
    }
  },
  // computed: {
  //   partial_username: function() {
  //     return this.$store.state.users.user.email
  //   }
  // },
  computed: {
    user_state() {
      return this.$store.state.users.user
      // Or return basket.getters.fruitsCount
      // (depends on your design decisions).
    }
  },
  watch: {
    user_state(newState, oldState) {
      // Our fancy notification (2).
      if (newState !== null && oldState === null) {
        this.getUser()
      } else if (oldState !== null && newState === null && this.partial) {
        this.user = null
      }
    }
  },
  methods: {
    getUser: async function() {
      let res
      if (
        this.partial &&
        this.$store.state.users.user !== null &&
        this.$store.state.users.user.email
      ) {
        res = await this.$axios.get(
          `/user/email/${this.$store.state.users.user.email}`
        )
        this.user = res.data.result
      } else if (!this.partial) {
        res = await this.$axios.get(`/user/${this.id}`)
        this.user = res.data.result
      }
    },
    followUser: async function() {
      try {
        let res = await this.$axios.post(`/follow/${this.id}`)
        this.followed_status = true
      } catch (err) {}
    },
    unfollowUser: async function() {
      try {
        let res = await this.$axios.delete(`/follow/${this.id}`)
        this.followed_status = false
      } catch (err) {}
    },

    signout: async function() {
      try {
        this.$toast.clear()
        let result = await this.$store.dispatch('users/signout')
        this.user = null

        this.$router.push({ path: '/' })
        this.$toast.success('Signed out', { duration: 2000 })
        // this.$forceUpdate()
      } catch (err) {
        this.$toast.error(err)
      }
    },
    uploadfile(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
      this.change_image = true
    },
    createImage(file) {
      var image = new Image()
      var reader = new FileReader()
      var vm = this

      reader.onload = e => {
        vm.user.thumbnail = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async save() {
      try {
        let body = {
          email: this.$store.state.users.user.email,
          username: this.partial
            ? this.$store.state.users.user.username
            : this.user.username
        }
        if (this.change) body.username = this.new_username
        const file =
          this.$refs.profile_img.files.length > 0
            ? this.$refs.profile_img.files[0]
            : false
        let key = `${this.$store.state.users.user.uid}/thumbnail`
        if (file) {
          let new_url = await this.postS3(file, key)
          if (!new_url) return
          body.thumbnail = `https://d2rkgndbm9lqnh.cloudfront.net/${key}`
        }

        let result = await this.$axios.post('/user/update', body)
        const { username, thumbnail } = result.data.result
        Cookie.set('username', username, {
          expires: 7,
          domain: process.env.cookieUrl
        })
        Cookie.set('thumbnail', thumbnail, {
          expires: 7,
          domain: process.env.cookieUrl
        })
        this.$store.commit('users/UPDATE_USER_INFO', {
          username,
          thumbnail
        })
        if (this.change) {
          this.user.username = this.new_username
          this.change = false
        }
        this.change_image = false
      } catch (err) {
        this.error = 'PLEASE TRY AGAIN'
      }
    },
    async postS3(file, key) {
      try {
        let signedputurl = await this.$axios.get('/photo/upload/url?key=' + key)
        let res = await this.$axios.put(signedputurl.data.url, file, {
          headers: {
            'Content-Type': file.type
          },
          withCredentials: false
        })
        return res
      } catch (err) {
        //toast
        console.log(err)
      }
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>
