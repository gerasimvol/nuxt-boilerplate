<template>
  <component
    :is="tag"
    :href="tag !== 'button' ? url : null"
    :to="tag === 'nuxt-link' ? url : null"
    :target="target"
    :class="classes"
    @click="onClick"
  >
    <span class="link__text">
      <slot />
    </span>
  </component>
</template>

<script>
  export default {
    name: 'BaseLink',

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
      },
      noStyles: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classes () {
        return [
          'link',
          { 'link_styled': !this.noStyles },
          { 'link_disabled': this.disabled }
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
      onClick () {
        if (this.disabled) return

        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .link_styled {
    &.link {
      cursor: pointer;
      outline: none;
    }
  }
</style>
