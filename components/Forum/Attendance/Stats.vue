<template>
  <div class="fstats_ctnr" v-if="stats">
    <div class="fstat_info_ctnr">
      <h3>총 출석 일수:</h3>
      <span>&nbsp{{ stats.total }}일</span>
    </div>

    <div class="fstat_info_ctnr">
      <h3>개근 일수:</h3>
      <span>&nbsp{{ stats.consecutive }}일</span>
    </div>

    <div class="fstat_info_ctnr">
      <h3>1등 일수:</h3>
      <span>&nbsp{{ stats.first }}일</span>
    </div>
  </div>
</template>
<style lang="scss">
.fstats_ctnr {
  display: flex;
}
.fstat_info_ctnr {
  display: flex;
  justify-content: center;
  width: 33%;
}
</style>
<script>
export default {
  data() {
    return {
      stats: null
    }
  },
  methods: {
    getStat: async function() {
      let res = await this.$axios.get('/3/checkin/info')
      if (res.data.result)
        this.stats = {
          first: res.data.result.first,
          consecutive: res.data.result.consecutive,
          total: res.data.result.total
        }
      else {
        this.stats = {
          first: 0,
          consecutive: 0,
          total: 0
        }
      }
    },
    update_stat: function(data) {
      this.stats = data
    }
  },
  mounted() {
    this.getStat()
  }
}
</script>
