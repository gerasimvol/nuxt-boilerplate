<template>
  <div 
    :class="[
      'logo',
      { 'logo_disabled': $route.name === 'home' }
    ]"
  >
    <nuxt-link
      :to="homepageLink"
      aria-label="homepage"
    >
      Homepage
    </nuxt-link>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Logo',

    computed: {
      ...mapGetters(['getDefaultLocale', 'getCurrentLocale']),
      homepageLink () {
        return this.getCurrentLocale.code === this.getDefaultLocale.code
          ? '/'
          : `/${this.getCurrentLocale.code}`
      }
    }
  }
</script>

<style lang="scss">
  .logo {
    display: inline;
    cursor: pointer;

    &_disabled {
      pointer-events: none;
    }
  }
</style>
