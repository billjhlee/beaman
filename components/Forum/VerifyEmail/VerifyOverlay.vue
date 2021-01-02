<template>
  <Modal :open="open" :styleoverride="'background-color:rgba(0,0,0,0.5)'">
    <div>
      <div class="verify_nav">
        <Nav />
      </div>
      <section class="verify_body">
        <h3 class="is-size-5 verify_item">
          {{ open }}
          이메일 인증을 하셔야 이 페이지를 사용하실 수 있습니다
        </h3>

        <h3 class="is-size-6 verify_item">혹시 이메일이 가지 않았나요?</h3>
        <h3 class="is-size-6 verify_item">그렇다면 사과드립니다!</h3>

        <button
          class="button"
          style="margin-top:1rem"
          :disabled="busy"
          @click="resend"
        >
          인증 이메일 다시 보내기
        </button>

        <button @click="signout" class="fcomment_btn" style="margin-top: 1rem;">
          로그 아웃
        </button>
      </section>
    </div>
  </Modal>
</template>
<style lang="scss">
.verify_nav {
  position: fixed;
  top: 0;
  left: 0;
}
.verify_body {
  padding: 5rem;
  background-color: $primary;
  color: white;
  text-align: center;
}
.verify_item {
  margin-bottom: 1rem;
}
.verify_ctnr {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem 0;
  width: 100%;
}
</style>
<script>
import Modal from '~/components/Modal'
import Nav from '~/components/Nav'
export default {
  props: ['open'],
  data() {
    return {
      busy: false
    }
  },
  components: {
    Modal,
    Nav
  },
  methods: {
    resend: async function() {
      this.busy = true
      try {
        await this.$store.dispatch('users/sendEmailVerification', true)
        this.$toast.success('이메일은 확인해주세요!', {
          action: {
            text: 'CLOSE',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        })
      } catch (err) {
        if (err === 'auth/too-many-requests')
          this.$toast.show('이메일함을 다시 확인해주세요!', {
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          })
        else
          this.$toast.error(err, {
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          })
      }
      this.busy = false
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
