<template>
  <Modal :open="on" @m_modal_close="on = false"><slot /></Modal>
</template>
<style lang="scss"></style>
<script>
import Modal from '~/components/Modal'
export default {
  components: { Modal },
  props: ['show'],
  data() {
    return {
      on: this.show
    }
  }
}
</script>
