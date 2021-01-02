<template
  ><div class="fattend_ctnr">
    <input
      class="fattend_ipt"
      placeholder="1자 이상, 30자 이내로 적어주세요"
      type="text"
      v-model="text"
    />
    <button @click="submit">
      작성
    </button>
  </div>
</template>
<style lang="scss">
.fattend_ctnr {
  display: flex;
}
.fattend_ipt {
  padding: 8px;
  flex-grow: 1;
  outline: 0;
}
</style>
<script>
export default {
  // props: ['username', 'userId'],
  data() {
    return {
      text: ''
    }
  },
  methods: {
    submit: async function() {
      if (this.text.length > 30 || this.text.length < 1) {
        this.$toast.error('1자 이상 30자 이내로 적어주세요!', {
          duration: 2000,
          action: {
            text: '닫기',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        })
        return
      }
      if (!(await this.$store.dispatch('users/loginguard', this.$toast))) return

      this.$emit('attend', {
        content: this.text,
        username: this.$store.state.users.user.username,
        thumbnail: this.$store.state.users.user.thumbnail
      })
    }
  }
}
</script>
