<template>
  <div class="fpost_hdr_ctnr">
    <div class="fpost_hdr_info_ctnr">
      <h3 class="fpost_ttl wrapword">
        {{ title }}
      </h3>
    </div>
    <div class="fpost_hdr_pf_ctnr">
      <div style="padding: 0 1rem">
        <h3
          @click="$store.dispatch('modal/setprofile', userId)"
          class="wrapword fpost_username"
        >
          {{ username }}
        </h3>
        <button
          v-if="
            (!$store.state.users.user ||
              email !== $store.state.users.user.email) &&
              followed_status
          "
          @click="unfollowUser"
        >
          언팔로우
        </button>
        <button
          v-if="
            (!$store.state.users.user ||
              email !== $store.state.users.user.email) &&
              !followed_status
          "
          @click="followUser"
        >
          팔로우
        </button>
      </div>
      <div class="fpost_pf">
        <figure class="image is-1by1 ">
          <img
            class="profile_img"
            :src="
              user_pf
                ? user_pf
                : 'https://d2rkgndbm9lqnh.cloudfront.net/defaultprofile.png'
            "
            alt="Placeholder image"
          />
        </figure>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.fpost_username {
  cursor: pointer;
  min-width: 50px;
}
.fpost_ttl {
  font-size: 2rem;
}
.fpost_pf {
  max-width: 100px;
  min-width: 100px;
}
.fpost_hdr_ctnr {
  display: flex;
  padding: 1rem;
}
.fpost_hdr_pf_ctnr {
  //   width: 20%;
  display: flex;
}

.fposts_hdr_pf_inner_ctnr {
}

.fpost_hdr_info_ctnr {
  flex-grow: 1;
}

.fpost_hdr_info {
}
</style>
<script>
export default {
  props: [
    'board',
    'title',
    'user_pf',
    'username',
    'date',
    'views',
    'userId',
    'follow',
    'email'
  ],
  data() {
    return {
      followed_status: this.follow
    }
  },
  methods: {
    followUser: async function() {
      if (!(await this.$store.dispatch('users/loginguard', this.$toast))) return

      try {
        let res = await this.$axios.post(`/follow/${this.userId}`)
        this.followed_status = true
      } catch (err) {}
    },
    unfollowUser: async function() {
      if (!(await this.$store.dispatch('users/loginguard', this.$toast))) return

      try {
        let res = await this.$axios.delete(`/follow/${this.userId}`)
        this.followed_status = false
      } catch (err) {}
    }
  }
}
</script>
