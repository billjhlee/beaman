<template>
  <div class="username_v_overlay">
    <div class="username_v_inner">
      <h3 class="username_v_text">유저네임을 정해주세요!</h3>
      <h3 class="username_v_text">1자 이상 20자 이하이어야합니다</h3>
      <input type="text" class="username_v_ipt" v-model="username" />
      <button class="username_v_btn" @click="username_submit">사용</button>

      <button @click="signout" class="username_v_btn" style="margin-top: 1rem;">
        로그 아웃
      </button>
    </div>
  </div>
</template>
<style lang="scss">
.username_v_inner {
  padding: 0.5rem;
  //   @media only screen and (max-width: $tablet) {
  //     width: 80%;
  //   }
  //   width: 60%;
}

.username_v_ipt {
  padding: 0.2rem;
  font-size: 1.5rem;
  border-radius: 4px;
  outline: 0;
}

.username_v_btn {
  border-radius: 4px;
  background-color: white;
  border: 1px solid black;
  padding: 0.2rem 0.4rem;
  font-size: 1.5rem;
  cursor: pointer;
  outline: 0;
}
.username_v_text {
  font-size: 2rem;
}
.username_v_overlay {
  padding-top: 100px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  justify-content: center;
  //   align-items: center;
  position: absolute;
  z-index: 6;
}
</style>
<script>
import sql_errs from '~/misc/sql_errs'
import Cookie from 'js-cookie'

export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    username_submit: async function() {
      try {
        let res = await this.$axios.post('user/update', {
          username: this.username,
          email: this.$store.state.users.user.email
        })
        this.$store.commit('users/UPDATE_USER_INFO', {
          username: this.username
        })
        Cookie.set('username', this.username, {
          expires: 7,
          domain: process.env.cookieUrl
        })
      } catch (err) {
        this.$toast.error(sql_errs[err.response.data], {
          duration: 2000,
          action: {
            text: '닫기',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        })
      }
    },
    signout: async function() {
      try {
        this.$toast.clear()
        let result = await this.$store.dispatch('users/signout')
        // this.user = null

        this.$router.push({ path: '/' })
        this.$toast.success('Signed out', { duration: 2000 })
        // this.$forceUpdate()
      } catch (err) {
        this.$toast.error(err)
      }
    }
  }
}
</script>
