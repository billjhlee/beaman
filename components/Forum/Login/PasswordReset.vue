<template>
  <div class="login_ctnr">
    <form class="login_form_reset_ctnr" @submit.prevent>
      <h3 class="is-size-6 login_hdr">패스워드 변경</h3>
      <br />
      <!-- <hr class="form_hr" /> -->
      <div class="login_fields">
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
              v-model="email"
              placeholder="Email"
            />
            <span class="validation_error is-size-7">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <button @click="reset" class="form_btn" style="background-color: black">
        {{ '이메일 보내기' }}
      </button>
    </form>
  </div>
</template>
<style lang="scss">
.form_btn {
  border: 0;
  color: white;
  width: 100%;
  padding: 1rem;
}

.google_btn {
  background-color: #cc3732;
}

.login_ctnr {
  background-color: #fafafa;
  width: 100%;
}

.login_fields {
  width: 100%;
}

.login_form_reset_ctnr {
  //   padding: 2rem 3rem;
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
  font-weight: 600;
  margin-bottom: 2rem;
}
</style>
<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: { ValidationProvider },
  data() {
    return {
      email: ''
    }
  },
  methods: {
    reset: async function() {
      let result = await this.$store.dispatch('users/passwordreset', this.email)
      if (result === 'social') {
        this.$toast.show('구글 로그인을 이용하셨었네요!', {
          duration: 2000,
          action: {
            text: 'CLOSE',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        })
        try {
          let result = await this.$store.dispatch(
            'users/googlelogin',
            this.$router,
            this.$toast
          )

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
      } else {
        this.$toast.success('이메일을 확인해주세요!', {
          duration: 2000,
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
