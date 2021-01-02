<template>
  <div class="fld_ctnr">
    <div class="fld_inner_ctnr">
      <div class="fld_btn_ctnr">
        <button
          class="fld_btn fld_like fpost_btn"
          :class="{ fld_liked: likestatus === 1 }"
          @click="like"
        >
          좋아요
        </button>
        <span class="fld_like_num">
          {{ likes }}
        </span>
      </div>
      <div style="width: 8px" />
      <div class="fld_btn_ctnr">
        <button
          class="fld_btn fld_dislike fpost_btn"
          :class="{ fld_disliked: likestatus === 2 }"
          @click="dislike"
        >
          싫어요
        </button>
        <span class="fld_dislike_num">
          {{ dislikes }}
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.fld_liked {
  background-color: #6ab04c;
  border: 1px solid #6ab04c;
  color: white;
  // border: 0;
}
.fld_disliked {
  background-color: #e74c3c;
  border: 1px solid #e74c3c;
  color: white;
}
.fld_like_num {
}
.fld_dislike_num {
}
.fld_btn_ctnr {
  flex-grow: 1;
  //   display: flex;
  //   flex-direction:column;
  //   justify-content: center;
  //   align-items: center;
  text-align: center;
}
.fld_btn {
  //   flex-grow: 1;
  width: 100%;
  outline: none;
}
.fld_like {
}
.fld_dislike {
}
.fld_inner_ctnr {
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fld_ctnr {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<script>
export default {
  props: ['id', 'liked', 'likes_', 'dislikes_'],
  data() {
    return {
      likestatus: this.liked || 0,
      likes: this.likes_,
      dislikes: this.dislikes_
    }
  },
  methods: {
    like: async function() {
      if (!(await this.$store.dispatch('users/loginguard', this.$toast))) return

      let new_likestatus = 1
      if (this.likestatus === 1) new_likestatus = 0
      let res
      if (new_likestatus === 1) {
        res = await this.$axios.post('/like/article', {
          articleId: this.id,
          like: true,
          wasdislike: this.likestatus === 2
        })
        if (this.likestatus === 2) this.dislikes--
        this.likes++
      } else {
        res = await this.$axios.delete(`/like/article`, {
          params: {
            articleId: this.id,
            like: true
          }
        })
        this.likes--
      }
      this.likestatus = new_likestatus
    },
    dislike: async function() {
      if (!(await this.$store.dispatch('users/loginguard', this.$toast))) return

      let new_likestatus = 2
      if (this.likestatus === 2) new_likestatus = 0
      let res
      if (new_likestatus === 2) {
        res = await this.$axios.post('/like/article', {
          articleId: this.id,
          like: false,
          waslike: this.likestatus === 1
        })

        if (this.likestatus === 1) this.likes--
        this.dislikes++
      } else {
        res = await this.$axios.delete(`/like/article`, {
          params: {
            like: false,
            articleId: this.id
          }
        })
        this.dislikes--
      }
      this.likestatus = new_likestatus
    }
  }
}
</script>
