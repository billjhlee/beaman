<template>
  <div class="dwm_ctnr">
    <span
      class="dwm_item"
      :class="selected === 0 ? 'dwm_item_sel' : ''"
      @click="dwm_change(0)"
    >
      일
    </span>

    <span
      class="dwm_item"
      :class="selected === 1 ? 'dwm_item_sel' : ''"
      @click="dwm_change(1)"
    >
      주
    </span>

    <span
      class="dwm_item"
      :class="selected === 2 ? 'dwm_item_sel' : ''"
      @click="dwm_change(2)"
    >
      월
    </span>
  </div>
</template>
<style lang="scss">
.dwm_item_sel {
  background-color: black;
  color: white;
  border-radius: 4px;
}
.dwm_ctnr {
  display: flex;
  width: 100%;
}
.dwm_item {
  width: 33.33%;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
</style>
<script>
export default {
  data() {
    return {
      selected: 0
    }
  },
  methods: {
    dwm_change: function(num) {
      this.$emit('dwm_change', num, this.selected)

      this.selected = num
    }
  }
}
</script>
