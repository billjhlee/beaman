<template>
  <div class="verify_ctnr">
    <section class="verify_ctnr_inner">
      <div class="hero-body">
        <div class="container">
          <h3 class="is-size-2 verify_item" style="font-weight:600">
            OOOOOOPS!
          </h3>

          <h3 class="is-size-4 verify_item">이메일 인증을 완료해주세요!</h3>
          <h3 class="is-size-4 verify_item">혹시 이메일이 가지 않았나요?</h3>
          <h3 class="is-size-4 verify_item">그렇다면 사과드립니다!</h3>

          <button
            class="button"
            style="margin-top:1rem"
            :disabled="busy"
            @click="resend"
          >
            인증 이메일 다시 보내기
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss">
.verify_ctnr_inner {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  height: 100%;
  width: 100%;
}
.verify_item {
  margin-bottom: 1rem;
}
.verify_ctnr {
  position: absolute;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // padding: 2rem 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
<script>
export default {
  data() {
    return {
      busy: false
    }
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
    }
  }
}
</script>
