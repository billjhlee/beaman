<template>
  <div class="fupp_ctnr">
    <div class="fupp_pf">
      <figure class="image is-1by1">
        <img
          :src="
            thumbnail
              ? thumbnail
              : 'https://d2rkgndbm9lqnh.cloudfront.net/defaultprofile.png'
          "
          alt="Placeholder image"
        />
      </figure>
    </div>
    <div class="fupp_info_ctnr">
      <div>
        <h3 class="fupp_ttl" style="flex-grow:1">{{ username }}</h3>
        <button @click="$store.dispatch('modal/setprofile', userId)">
          더보기
        </button>

        <button v-if="!followed_status" @click="followUser">
          팔로우
        </button>
        <button v-else @click="unfollowUser">
          언팔로우
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
<script>
export default {
  props: ['username', 'userId', 'thumbnail'],
  data() {
    return {
      user: null,
      followed_status: true
    }
  },
  methods: {
    followUser: async function() {
      try {
        let res = await this.$axios.post(`/follow/${this.userId}`)
        this.followed_status = true
      } catch (err) {}
    },
    unfollowUser: async function() {
      try {
        let res = await this.$axios.delete(`/follow/${this.userId}`)
        this.followed_status = false
      } catch (err) {}
    }
  }
}
</script>
