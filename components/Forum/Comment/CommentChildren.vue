<template>
  <div>
    <ul>
      <li v-for="child in children"><Comment /></li>
    </ul>
  </div>
</template>
<style lang="scss"></style>
<script>
import Comment from './ChildComment'
export default {
  data() {
    return {
      children: [1, 2, 3, 4]
    }
  }
}
</script>
