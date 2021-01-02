<template>
  <div class="f_sect f_bg_trans">
    <div v-if="$store.state.users.user">
      <div class="f_ctnr f_bg_white">
        <ul class="ffollows_ctnr" v-if="followers.length > 0">
          <li v-for="follower in followers" class="ffollows_li">
            <Profile
              :username="follower.username"
              :userId="follower.id"
              :thumbnail="follower.thumbnail"
            />
          </li>
        </ul>
        <div v-else>
          유저를 팔로우 해보세요!
        </div>
      </div>

      <div class="f_ctnr f_bg_white" v-if="followers.length > 0">
        <FullBoard :userIds="user_ids" :dontwrite="true" />
      </div>
    </div>
    <div class="f_ctnr f_bg_white" v-else>
      기능을 이용하시려면 로그인해주세요!
    </div>
  </div>
</template>
<style lang="scss">
.ffollows_ctnr {
  display: flex;
  flex-wrap: wrap;
  max-height: 400px;
  overflow: auto;
}

.ffollows_li {
  width: 50%;
}
</style>
<script>
import Profile from './Profile'
import FullBoard from '~/components/Forum/Boards/FullBoard'

export default {
  components: {
    Profile,
    FullBoard
  },
  data() {
    return {
      followers: []
    }
  },
  computed: {
    user_ids: function() {
      return this.followers.map(follower => {
        return follower.id
      })
    }
  },
  methods: {
    getFollowers: async function() {
      let res = await this.$axios.get('/3/user/followers')
      this.followers = res.data.user_follows
    }

    // user_ids: function() {
    //   return this.followers.map(follower => {
    //     return follower.id
    //   })
    // }
  },
  mounted() {
    this.getFollowers()
  }
}
</script>
