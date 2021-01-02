<template>
  <div class="f_sect f_bg_trans">
    <div class=" f_bg_white">
      <Editor :category="$route.params.category" :user_type="user_type" />
    </div></div
></template>
<style lang="scss"></style>
<script>
import Editor from '~/components/Forum/Upload'
// import Loading from 'vue-loading-overlay'

export default {
  layout: 'forum',
  components: {
    Editor
    // Loading
  },
  data() {
    return {
      allow: false,
      loader: null,
      allowed_params: {
        beerman: 1,
        general: 3,
        prove: 3,
        notice: 1,
        health: 3,
        humour: 3,
        info: 3
      }
    }
  },
  computed: {
    user_type: function() {
      return this.allowed_params[this.$route.params.category]
    }
  },
  methods: {
    overlay: function() {
      this.loader = this.$loading.show({
        // Optional parameters
        container: null,
        canCancel: false
        // onCancel: this.onCancel
      })
    },
    gate: async function() {
      if (!this.$store.state.users.user) {
        this.$router.push({ path: '/' })
      }
      if (!this.user_type) {
        this.$router.push({ path: '/upload/general' })
      }

      try {
        let res = await this.$axios.get(`/${this.user_type}/user/check`, {
          email: this.$store.state.users.user.email
        })
        this.loader.hide()
      } catch (err) {
        this.$toast.error("Sorry. You don't have access to this page", {
          action: {
            text: 'CLOSE',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        })
        this.loader.hide()
        this.$router.push({ path: '/' })
      }
    }
  },

  mounted() {
    this.overlay()
    this.gate()
  }
}
</script>
