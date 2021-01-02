<template>
  <div class="f_ctnr f_bg_white">
    <h3 class="frank_ttl">
      유저 랭킹
    </h3>
    <ul class="frank_ctnr">
      <li
        v-for="(user, index) in users"
        class="frank_usr"
        @click="$store.dispatch('modal/setprofile', user.id)"
      >
        <div class="frank_inner_ctnr">
          <div
            class="frank_pf"
            :style="
              `background-image: url(${
                user.thumbnail
                  ? user.thumbnail
                  : 'https://d2rkgndbm9lqnh.cloudfront.net/defaultprofile.png'
              })`
            "
          ></div>
          <span class="frank_text_span">
            {{ user.username }}
          </span>
        </div>
      </li>
    </ul>
  </div></template
>
<style lang="scss">
.frank_usr {
  margin-bottom: 0.5em;
  cursor: pointer;
  outline: 0;
}
.frank_ttl {
  margin-bottom: 1rem;
}
.frank_ctnr {
  width: 100%;
}
.frank_inner_ctnr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.frank_pf {
  flex-shrink: 0;
  width: 1.4rem;
  height: 1.4rem;
  margin: 0;
  border-radius: 7px;
  background-position: center center;
  background-repeat: no-repeat;
  //   background-attachment: fixed;
  background-size: cover;
  margin-right: 4px;
}

.frank_text_span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<script>
export default {
  data() {
    return {
      users: []
    }
  },
  methods: {
    getUsers: async function() {
      let res = await this.$axios.get(`/user/ranks`)
      this.users = res.data.result
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>
