<template>
  <div class="fbboard_item_ctnr">
    <div class="half_shadow" />
    <div class="hover_border_bottom" />
    <!--
    <div class="favorite" @click.prevent="mark_favorite">
      <fa :icon="[marked ? 'fas' : 'far', 'square']" />
    </div>
    -->
    <h3 class="fbboard_item_ttl is-size-5">{{ title }}</h3>
    <figure class="image is-4by3">
      <img
        src="https://bulma.io/images/placeholders/1280x960.png"
        alt="Placeholder image"
      />
    </figure>
  </div>
</template>
<style lang="scss">
.fbboard_item_ctnr {
  position: relative;
}

.fbboard_item_ttl {
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
  props: ['title', 'inView', 'id', 'fav', 'index'],
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
