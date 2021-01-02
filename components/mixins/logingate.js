let loginmixin = {
  mounted() {
    if (this.$store.state.users.user === null) {
      this.$toast.error('로그인해주세요', {
        action: {
          text: 'CLOSE',
          onClick: (e, toastObject) => {
            toastObject.goAway(0)
          }
        }
      })
      this.$router.push({ path: '/' })
    }
  }
}

export default loginmixin
