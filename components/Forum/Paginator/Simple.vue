<template>
  <div class="pgntn_ctnr">
    <span class="pag_chev" @click="changePage(at - 1)" v-if="at > 1">
      <
    </span>
    <span
      class="pag_chev pag_right"
      @click="changePage(at + 1)"
      v-if="at < last"
    >
      ></span
    >
  </div>
</template>
<style lang="scss">
.pgntn_ctnr {
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
    }
  }
}
</script>
