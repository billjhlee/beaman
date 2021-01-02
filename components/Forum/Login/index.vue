<template>
  <div class="flogin_ctnr">
    <div class="grid_container" style="height: 75px">
      <div
        class="grid_50 flex_center login_tab"
        :class="{ login_tab_s: show_login }"
        @click="show_login = true"
      >
        로그인
      </div>
      <div
        class="grid_50 flex_center login_tab"
        :class="{ login_tab_s: !show_login }"
        @click="show_login = false"
      >
        회원가입
      </div>
    </div>
    <form class="login_form_ctnr" @submit.prevent>
      <h3 class="is-size-6 login_hdr">비어맨에 오신걸 환영합니다</h3>
      <button
        class="google_btn form_btn bradfr"
        style="margin-bottom: 1rem;"
        @click="google_login"
      >
        구글로 로그인
      </button>
      <br />
      <!-- <hr class="form_hr" /> -->
      <button @click="non_social = true" class="f_sect_more_btn">
        이메일 사용하기
      </button>
      <div v-if="non_social" class="non_social_ctnr">
        <div class="login_fields" v-if="show_login">
          <div class="login_ipt_ctnr">
            <h6 class="login_ipt_hdr is-size-7">EMAIL</h6>
            <ValidationProvider
              ref="emailInput"
              class="validaiton_provider"
              rules="required|email"
              name="이메일  "
              v-slot="{ errors }"
            >
              <input
                class="login_ipt"
                type="email"
                v-model="account.email"
                placeholder="Email"
              />
              <span class="validation_error is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="login_ipt_ctnr">
            <h6 class="login_ipt_hdr is-size-7">PASSWORD</h6>

            <ValidationProvider
              ref="passwordInput"
              class="validaiton_provider"
              rules="required|min:6|max:30"
              name="패스워드  "
              v-slot="{ errors }"
            >
              <input
                class="login_ipt"
                type="password"
                v-model="account.password"
                placeholder="Password"
              />

              <span class="validation_error is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <div class="login_fields" v-else>
          <div class="login_ipt_ctnr">
            <h6 class="login_ipt_hdr is-size-7">USERNAME</h6>

            <ValidationProvider
              ref="usernameInput"
              class="validaiton_provider"
              rules="required|min:1|max:20"
              name="유저네임 "
              v-slot="{ errors }"
            >
              <input
                class="login_ipt"
                type="text"
                v-model="account.username"
                placeholder="Username"
              />
              <span class="validation_error is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="login_ipt_ctnr">
            <h6 class="login_ipt_hdr is-size-7">EMAIL</h6>
            <ValidationProvider
              ref="emailInput"
              class="validaiton_provider"
              rules="required|email"
              name="이메일  "
              v-slot="{ errors }"
            >
              <input
                class="login_ipt"
                type="email"
                v-model="account.email"
                placeholder="Email"
              />

              <span class="validation_error is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="login_ipt_ctnr">
            <h6 class="login_ipt_hdr is-size-7">PASSWORD</h6>

            <ValidationProvider
              ref="passwordInput"
              class="validaiton_provider"
              rules="required|min:6|max:30"
              name="패스워드  "
              v-slot="{ errors }"
            >
              <input
                class="login_ipt"
                type="password"
                v-model="account.password"
                placeholder="Password"
              />

              <span class="validation_error is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <p v-if="error" class="err_text">{{ error }}</p>
        <button
          @click="login"
          class="form_btn bradfr"
          style="background-color: black"
          v-if="show_login"
        >
          {{ 'LOGIN' }}
        </button>

        <button
          @click="signup"
          class="form_btn bradfr"
          style="background-color: black"
          v-else
        >
          {{ 'SIGN UP' }}
        </button>
        <button
          v-if="show_login"
          class="f_sect_more_btn"
          style="background-color: #95a5a6"
          @click="show_password_reset = true"
        >
          패스워드를 잊어버리셨나요?
        </button>
        <PasswordReset v-if="show_password_reset" />
      </div>
    </form>
  </div>
</template>
<style lang="scss">
.non_social_ctnr {
  width: 100%;
}
.err_text {
  margin-bottom: 1rem;
  color: red;
}
.login_tab {
  font-weight: 400;
  background-color: $grey-lighter;
}

.login_tab_s {
  background-color: #fafafa;
}
.form_hr {
  width: 70%;
  background-color: black;
}
.form_btn {
  border: 0;
  color: white;
  width: 100%;
  padding: 1rem;
}

.google_btn {
  background-color: #cc3732;
}
.flogin_ctnr {
  background-color: #fafafa;
  //   @media only screen and (min-width: $tablet) {
  //     width: 50%;
  //   }
  width: 100%;
}

.login_fields {
  width: 100%;
}

.login_form_ctnr {
  padding: 2rem 3rem;
  // background-color: white;

  @media only screen and (min-width: $tablet) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  width: 100%;
}
.login_ipt_ctnr {
  margin-bottom: 2rem;
  width: 100%;
}
.login_ipt_hdr {
  margin-bottom: 1rem;
}
.login_ipt {
  width: 100%;
  // background-color: #f8f8f8;
  border: 1px solid lightgrey;
  // border: 0;
  padding: 1rem 0.5rem;
}
.login_hdr {
  font-weight: 400;
  margin-bottom: 2rem;
}
</style>
<script>
import { ValidationProvider } from 'vee-validate'
import PasswordReset from './PasswordReset'
// import { provider } from '~/services/firebase'

export default {
  props: ['show_signup'],
  components: { ValidationProvider, PasswordReset },
  data() {
    return {
      error_status: 0,
      error: '',
      account: {
        username: '',
        email: '',
        password: ''
      },
      show_login: !this.show_signup || true,
      non_social: false,
      show_password_reset: false
    }
  },
  methods: {
    google_login: async function() {
      try {
        let result = await this.$store.dispatch(
          'users/googlelogin',
          this.$router,
          this.$toast
        )
        if (result) {
          this.$toast.clear()
          this.$toast.success('환영합니다', {
            duration: 2000,
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          })

          if (result === 'username') {
            this.$toast.show('유저네임을 변경해주세요!', {
              action: {
                text: 'CLOSE',
                onClick: (e, toastObject) => {
                  toastObject.goAway(0)
                }
              }
            })
            this.$router.push({ path: '/profile' })
          } else {
          }
        }
        this.$store.dispatch('modal/close')
      } catch (err) {
        this.$toast.clear()
        this.$toast.error('다시 한번 시도해주세요!', {
          action: {
            text: 'CLOSE',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        })
      }
    },
    login: async function() {
      this.$toast.clear()
      this.$toast.show('Loggin In....', {
        action: {
          text: 'CLOSE',
          onClick: (e, toastObject) => {
            toastObject.goAway(0)
          }
        }
      })
      try {
        let result = await this.$store.dispatch(
          'users/login',
          this.account,
          this.$router,
          this.$toast
        )
        if (result === 'social') {
          this.google_login()
          return
        }
        this.$toast.clear()
        this.$toast.success('Logged In!', { duration: 2000 })
        this.$store.dispatch('modal/close')
        // this.$router.push({ path: '/' })
      } catch (err) {
        this.$toast.clear()
        this.$toast.error(
          typeof err === 'string' && err
            ? err
            : 'Something went wrong!\nPlease try again',
          {
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          }
        )
      }
    },
    signup: async function() {
      this.$toast.clear()
      this.$toast.show('Signing Up....', {
        action: {
          text: 'CLOSE',
          onClick: (e, toastObject) => {
            toastObject.goAway(0)
          }
        }
      })
      if (this.error_status === 0) {
        try {
          await this.$store.dispatch('users/signup', this.account)
          this.$toast.clear()
          this.$toast.success('Signed Up!', { duration: 2000 })
        } catch (err) {
          this.$toast.clear()
          this.$toast.error(
            typeof err === 'string' && err
              ? err
              : 'Something went wrong!\nPlease try again',
            {
              action: {
                text: 'CLOSE',
                onClick: (e, toastObject) => {
                  toastObject.goAway(0)
                }
              }
            }
          )
          return
        }
      } else {
        try {
          await this.$store.dispatch('users/signup_firebase', this.account)
          this.$toast.clear()
          this.$toast.success('Signed Up!', { duration: 2000 })
        } catch (err) {
          this.$toast.clear()
          this.$toast.error(
            typeof err === 'string' && err
              ? err
              : 'Something went wrong!\nPlease try again',
            {
              action: {
                text: 'CLOSE',
                onClick: (e, toastObject) => {
                  toastObject.goAway(0)
                }
              }
            }
          )
          return
        }
      }
      try {
        await this.$store.dispatch('users/sendEmailVerification')
        this.$toast.success('이메일 인증을 해주세요', {
          action: {
            text: 'CLOSE',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        })
      } catch (err) {
        this.$toast.error('로그인해서 이메일 인증을 해주세요!', {
          action: {
            text: 'CLOSE',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        })
      }
    }
  }
}
</script>
