<template>
  <div>
    <div class="fcomment_ctnr">
      <figure class="media-left">
        <p class="image is-64x64">
          <img
            class="is-rounded"
            src="https://bulma.io/images/placeholders/128x128.png"
          />
        </p>
      </figure>
      <div class="fcomment_rest">
        <h3 class="fcomment_uname">{{ username }}</h3>
        <p>{{ content_ }}</p>
      </div>
    </div>
    <div class="fcomment_options">
      <OptionsBar
        :articleId="articleId"
        :likes_="likes"
        :dislikes_="dislikes"
        :owns="owns"
        :commentId="commentId"
        @comment_delete="comment_delete"
        @comment_edited="comment_edited"
        @child_added="child_added"
        ref="options"
      />
    </div>
  </div>
</template>
<style lang="scss">
.fcomment_options {
  padding-left: 64px;
}
.fcomment_ctnr {
  display: flex;
}
.fcomment_rest {
  flex-grow: 1;
}
.fcomment_uname {
  font-weight: 400;
  font-size: 0.8rem;
}
</style>
<script>
import ChildComment from './ChildComment'
import ReplyBar from './ReplyBar'
import OptionsBar from './OptionsBar'
import CommentChildren from './CommentChildren'

export default {
  components: {
    ChildComment,
    ReplyBar,
    OptionsBar,
    CommentChildren
  },
  props: [
    'articleId',
    'commentId',
    'content',
    'username',
    'haschildren',
    'owns',
    'likes',
    'dislikes',
    'liked',
    'index'
  ],
  data() {
    return {
      content_: this.content
      // likes: this.likes,
      // dislikes: this.dislikes
    }
  },
  methods: {
    comment_delete: async function() {
      let res = await this.$axios.delete(`/2/comment/delete/${this.commentId}`)
      this.$emit('comment_delete', this.index)
    },
    comment_edited: function(content) {
      this.content_ = content
      this.$refs.options.show_edit = false
    },
    child_added: function(content) {
      this.$emit('child_added', content)
    }
  }
}
</script>
