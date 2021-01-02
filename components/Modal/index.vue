<template>
  <!-- <div v-if="open"> -->
  <transition name="m-modal-fade">
    <div
      class="modal-backdrop"
      @click="close"
      v-if="open"
      :style="styleoverride"
    >
      <div class="m_modal" :class="classoverride" @click.stop>
        <slot />
      </div>
    </div>
  </transition>
  <!-- </div> -->
</template>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.m_modal {
  max-height: 80vh;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0px 0 1px rgba(10, 10, 10, 0.02);
  overflow-x: auto;
  display: flex;
  color: black;
  flex-direction: column;
  border-radius: 4px;
  /* border: 10px solid black; */
}
.m-modal-fade-enter,
.m-modal-fade-leave-active {
  opacity: 0;
}

.m-modal-fade-enter-active,
.m-modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>

<script>
export default {
  props: ['open', 'styleoverride', 'classoverride'],
  data() {
    return {
      // on: this.open
    }
  },
  methods: {
    close() {
      this.$emit('m_modal_close')
    },
    scroll() {}
  }
}
</script>
