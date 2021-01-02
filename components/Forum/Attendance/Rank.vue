<template>
  <div class="f_ctnr f_bg_white">
    <h3 class="frank_title">{{ title }}</h3>
    <ul class="frank_ctnr">
      <li
        v-for="(user, index) in users"
        class="farank_usr"
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
.farank_usr {
  margin-bottom: 0.5rem;
  cursor: pointer;
  outline: 0;
}
.frank_title {
  font-weight: 600;
  text-align: center;
  font-weight: 400;
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
  props: ['title', 'align'],
  data() {
    return {
      users: []
    }
  },
  methods: {
    getUsers: async function() {
      let res = await this.$axios.get(`/checkin/rank?align=${this.align}`)
      this.users = res.data.result.map(stat => {
        return stat.User
      })
    },
    updateUser: function(user, column) {
      let user_found = this.users.findIndex(item => {
        return item.email === user.email
      })
      if (user_found === -1) {
        if (user.column > this.users[this.users.length - 1].column) {
          this.users[this.user.length - 1] = user
        }
      }
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>
