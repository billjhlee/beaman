<template>
  <div class="f_sect f_bg_trans">
    <div class="f_ctnr f_bg_white">
      <Attendance />
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import Attendance from '~/components/Forum/Attendance'
export default {
  components: {
    Attendance
  },
  data() {
    return {}
  },
  layout: 'forum'
}
</script>
