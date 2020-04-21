<template>
  <header class="header">
    <div class="links">
      <Logo />

      <nuxt-link
        v-for="(link, i) in _get($store, 'state.globalData.header.links', [])"
        :key="`link-${i}`"
        :to="link.url"
      >
        {{ link.label }}
      </nuxt-link>
    </div>

    <div>
      <LanguageSelect />
    </div>
  </header>
</template>

<script>
  import Logo from '~/components/shared/Logo'
  import LanguageSelect from './LanguageSelect'
  import { mapMutations } from 'vuex'

  export default {
    name: 'TheHeader',

    components: {
      Logo,
      LanguageSelect
    },

    methods: {
      ...mapMutations('ui', ['SET_MENU_VISIBILITY'])
    }
  }
</script>

<style lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 15px;
    border-bottom: 1px solid $c-black;

    .links {
      a {
        padding: 5px;
        cursor: pointer;

        @include hover {
          color: red;
        }
      }

      .nuxt-link-exact-active {
        color: red;
      }
    }
  }
</style>
