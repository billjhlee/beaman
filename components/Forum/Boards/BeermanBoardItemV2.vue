<template>
  <div class="fbboard_item_ctnr">
    <!--
    <div class="half_shadow" />
    <div class="hover_border_bottom" />
    -->
    <!--
    <div class="favorite" @click.prevent="mark_favorite">
      <fa :icon="[marked ? 'fas' : 'far', 'square']" />
    </div>
    -->
    <nuxt-link class="flink" :to="`/post/${id}`">
      <div class="fbboard_item_pf">
        <figure class="image is-1by1">
          <img src="" />
        </figure>
      </div>
    </nuxt-link>
    <div class="fbboard_item_texts_ctnr">
      <h3 class="fbboard_item_ttl">
        <nuxt-link class="flink" :to="`/post/${id}`">
          {{ title }}
        </nuxt-link>
      </h3>
      <div
        class="fboard_author_inner_inner_ctnr_v2"
        @click="$store.dispatch('modal/setprofile', userId)"
      >
        <div
          class="fboard_author_pf"
          :style="
            `background-image: url(${
              thumbnail
                ? thumbnail
                : 'https://d2rkgndbm9lqnh.cloudfront.net/defaultprofile.png'
            })`
          "
        ></div>
        <span class="fboard_author_span fboard_text_span">
          {{ username }}
        </span>
      </div>
      <div style="display: flex; align-items:center">
        <small class="">{{ $moment(date).fromNow() }}</small>
        <div class="vert_line">|</div>
        <small class="">조회수: {{ views }}</small>
        <div class="vert_line">|</div>

        <small class="">좋아요: {{ likes }}</small>
      </div>
    </div>
    <!--
    <figure class="image is-4by3">
      <img
        src="https://bulma.io/images/placeholders/1280x960.png"
        alt="Placeholder image"
      />
    </figure>
    -->
  </div>
</template>
<style lang="scss">
.fbboard_item_ttl {
  color: black;
  font-weight: 400;
}
.fbboard_item_date {
  font-size: 0.8rem;
}
.fbboard_item_texts_ctnr {
  padding: 12px 8px 12px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
}
.fbboard_item_ctnr {
  display: flex;
  // align-items: center;
}

.fbboard_item_pf {
  width: 100px;
  height: 100px;
}

.fbboard_item_ttl1 {
  position: absolute;
  z-index: 2;
  text-align: center;
  width: 100%;
  bottom: 7%;
  color: white;
  padding: 0 1rem;
}
</style>
<script>
export default {
  props: [
    'title',
    'inView',
    'id',
    'fav',
    'index',
    'date',
    'likes',
    'views',
    'userId',
    'username',
    'thumbnail'
  ],
  data() {
    return {
      //   marked: this.fav
    }
  },
  watch: {
    // inView: function(oldval, newval) {
    // }
  },
  methods: {
    // mark_favorite: async function() {
    //   try {
    //     let result
    //     if (this.marked) {
    //       result = await this.$axios.delete('/favorite/article', {
    //         params: { articleId: this.id }
    //       })
    //       this.marked = false
    //       this.$emit('unfavorited', this.index)
    //     } else {
    //       result = await this.$axios.post('/favorite/article', {
    //         articleId: this.id
    //       })
    //       this.marked = true
    //     }
    //   } catch (err) {}
    // }
  }
}
</script>
