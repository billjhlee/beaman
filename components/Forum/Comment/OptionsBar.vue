<template>
  <div>
    <div>
      <button
        class="fcomment_lkbtn fcomment_btn"
        :class="{ fcomment_liked: likestatus === 1 }"
        @click="like"
      >
        {{ likes }}
        좋아요
      </button>
      <button
        class="fcomment_lkbtn fcomment_btn"
        :class="{ fcomment_disliked: likestatus === 2 }"
        @click="dislike"
      >
        {{ dislikes }}
        싫어요
      </button>
      <button class="fcomment_reply fcomment_btn" @click="show_reply">
        답장
      </button>
      <button v-if="owns" class="fcomment_btn" @click="toggle_edit">
        수정
      </button>
      <button v-if="owns" class="fcomment_btn" @click="comment_delete">
        삭제
      </button>
    </div>
    <AddComment
      @comment_edited="comment_edited"
      @child_added="child_added"
      v-if="open_reply || show_edit"
      :articleId="articleId"
      :commentId="commentId"
      :edit="show_edit"
    />
  </div>
</template>
<style lang="scss">
.fcomment_lkbtn {
}
.fcomment_liked {
  background-color: #6ab04c;
  border: 1px solid #6ab04c;
  color: white;
}

.fcomment_disliked {
  background-color: #e74c3c;
  border: 1px solid #e74c3c;
  color: white;
}
.fcomment_reply {
}
</style>
<script>
import AddComment from './AddComment'
export default {
  props: ['owns', 'commentId', 'articleId', 'liked', 'likes_', 'dislikes_'],
  components: {
    AddComment
  },
  data() {
    return {
      likestatus: this.liked || 0,
      likes: this.likes_,
      dislikes: this.dislikes_,
      open_reply: false,
      show_edit: false
    }
  },
  methods: {
    toggle_edit: async function() {
      this.open_reply = false
      this.show_edit = !this.show_edit
    },
    like: async function() {
      if (!(await this.$store.dispatch('users/loginguard', this.$toast))) return

      let new_likestatus = 1
      if (this.likestatus === 1) new_likestatus = 0
      let res
      if (new_likestatus === 1) {
        res = await this.$axios.post('/like/comment', {
          commentId: this.commentId,
          like: true,
          wasdislike: this.likestatus === 2
        })
        if (this.likestatus === 2) this.dislikes--
        this.likes++
      } else {
        res = await this.$axios.delete(`/like/comment`, {
          params: {
            commentId: this.commentId,
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
        res = await this.$axios.post('/like/comment', {
          commentId: this.commentId,
          like: false,
          waslike: this.likestatus === 1
        })

        if (this.likestatus === 1) this.likes--
        this.dislikes++
      } else {
        res = await this.$axios.delete(`/like/comment`, {
          params: {
            like: false,
            commentId: this.commentId
          }
        })
        this.dislikes--
      }
      this.likestatus = new_likestatus
    },
    show_reply: function() {
      this.show_edit = false
      this.open_reply = !this.open_reply
    },
    comment_delete: function() {
      this.$emit('comment_delete')
    },
    comment_edited: function(content) {
      this.$emit('comment_edited', content)
    },
    child_added: function(content) {
      this.$emit('child_added', content)
    }
  }
}
</script>
