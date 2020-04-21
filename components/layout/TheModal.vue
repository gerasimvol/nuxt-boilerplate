<template>
  <transition name="modal-transition">
    <div v-if="isVisible" class="modal">
      <div class="modal__window">
        <button @click="isVisible = false">
          close X
        </button>
        <component :is="modal.component" v-bind="modal.props" />
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'TheModal',

    data () {
      return {
        modal: {},
        isVisible: false,
        isWindowVisible: false
      }
    },

    mounted () {
      this.$bus.$on('openModal', async ({ componentName, data }) => {
        try {
          const component = await import('~/components/modals/' + componentName)
          this.modal = {
            component: component.default || component,
            props: data
          }
          this.isVisible = true


          setTimeout(() => {
            this.isWindowVisible = true
          }, 200)
        } catch (error) {
          console.error(error)
        }
      })
    },

    beforeDestroy () {
      this.$bus.$off('openModal')
    }
  }
</script>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $z-index-modal;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal-transition {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.5s;

      .modal__window {
        transition: 0.5s;
      }
    }

    &-enter {
      .modal__window {
        transform: perspective(500px) translate3d(0, -20px, 50px);
      }

      opacity: 0;
    }

    &-leave-to {
      .modal__window {
        transform: perspective(500px) translate3d(0, 20px, -50px);
      }

      opacity: 0;
    }
  }
</style>
