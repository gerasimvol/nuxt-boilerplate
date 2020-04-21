<template>
  <component
    :is="tag"
    :href="tag !== 'button' ? url : null"
    :to="tag === 'nuxt-link' ? url : null"
    :target="target"
    :class="classes"
    @click="onClick"
  >
    <span class="button__text">
      <slot />
    </span>
  </component>
</template>

<script>
  export default {
    name: 'BaseButton',

    props: {
      url: {
        type: String,
        default: ''
      },
      target: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classes () {
        return [
          'button',
          { 'button_disabled': this.disabled }
        ]
      },
      tag () {
        if (!this.url) {
          return 'button'
        } else if (/(http|https)|(tel:)|(mailto:)/.test(this.url) || this.target === '_blank') {
          return 'a'
        } else {
          return 'nuxt-link'
        }
      }
    },

    methods: {
      onClick (event) {
        if (this.tag === 'nuxt-link') {
          event.preventDefault()
        }

        if (this.disabled) return

        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .button {
    position: relative;
    cursor: pointer;
    outline: none;

    &_disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
</style>
