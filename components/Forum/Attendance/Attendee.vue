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
        <div style="flex-grow: 1">
          {{ content }}
        </div>
        <!-- <button @click="$store.dispatch('modal/setprofile', 1)">
          더보기
        </button>-->
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
<script>
export default {
  props: ['username', 'userId', 'content', 'thumbnail'],
  data() {
    return {
      user: null,
      followed_status: true
    }
  },
  methods: {}
}
</script>
