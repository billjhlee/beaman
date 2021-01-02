<template>
  <div class="pgntn_ctnr">
    <span class="pag_chev">
      <
    </span>

    <span
      class="pag_page"
      v-if="currentPage > 1 && currentPage - 1 > 1 && currentPage - 2 > 1"
      @click="changePage(1)"
    >
      1
    </span>
    <span v-if="currentPage > 1 && currentPage - 1 > 1 && currentPage - 2 > 1"
      >...</span
    >
    <span
      class="pag_page"
      v-if="currentPage - 2 >= 1"
      @click="changePage(currentPage - 2)"
    >
      {{ currentPage - 2 }}
    </span>
    <span
      class="pag_page"
      v-if="currentPage - 1 >= 1"
      @click="changePage(currentPage - 1)"
    >
      {{ currentPage - 1 }}
    </span>
    <span class="pag_page pag_sel">
      {{ currentPage }}
    </span>
    <span
      class="pag_page"
      v-if="currentPage + 1 <= lastPage"
      @click="changePage(currentPage + 1)"
    >
      {{ currentPage + 1 }}
    </span>

    <span
      class="pag_page"
      v-if="currentPage + 2 <= lastPage"
      @click="changePage(currentPage + 2)"
    >
      {{ currentPage + 2 }}
    </span>

    <span
      class="pag_page"
      v-if="
        currentPage < lastPage &&
          currentPage + 1 < lastPage &&
          currentPage + 2 < lastPage
      "
    >
      ...
    </span>

    <span
      class="pag_page"
      v-if="
        currentPage < lastPage &&
          currentPage + 1 < lastPage &&
          currentPage + 2 < lastPage
      "
      @click="changePage(lastPage)"
    >
      {{ lastPage }}
    </span>
    <span class="pag_chev pag_right"> ></span>
  </div>
</template>
<style lang="scss">
.pgntn_ctnr {
  width: 100%;
  text-align: center;
}
.pag_sel {
  color: green;
}
.pag_page {
  cursor: pointer;
  padding: 0 2px;
}
.pag_chev {
  cursor: pointer;
  padding: 0 8px;
}
.pag_right {
  // margin-right: 4px;
}
.pag_ipt {
  width: 40px;
  border-radius: 4px;
  border: 1px grey solid;
}
</style>
<script>
export default {
  props: ['last', 'at'],
  data() {
    return {
      currentPage: this.at || 1
    }
  },
  computed: {
    lastPage: function() {
      return this.last || 1
    }
  },
  methods: {
    changePage: function(page) {
      //call some async function;
      this.$emit('page_change', page)
      this.currentPage = page
    }
  }
}
</script>
