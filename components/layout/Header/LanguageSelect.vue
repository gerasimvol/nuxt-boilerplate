<template>
  <div
    :class="[
      'language-select',
      `language-select_theme_${theme}`,
      { 'language-select_active': isDropdownVisible }
    ]"
    @click="onClick"
    @mouseenter="isDropdownVisible = true"
    @mouseleave="isDropdownVisible = false"
  >
    <span class="language-select__lang language-select__lang_current">
      {{ getCurrentLocale.label }}
    </span>
    <div
      :class="[
        'language-select__dropdown',
        { 'language-select__dropdown_visible': isDropdownVisible }
      ]"
    >
      <div
        v-for="(lang, i) in languages"
        :key="`lang-${i}`"
        class="language-select__lang_in-dropdown-wrapper"
      >
        <a
          :href="lang.url"
          class="language-select__lang language-select__lang_in-dropdown"
        >
          {{ lang.label }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'LanguageSelect',

    props: {
      theme: {
        type: String,
        default: 'black',
        validator: theme => ['white', 'black'].includes(theme)
      }
    },

    data () {
      return {
        isDropdownVisible: false
      }
    },

    computed: {
      ...mapState(['origin', 'isErrorPage']),
      ...mapGetters(['getPageLocales', 'getCurrentLocale', 'getLocales']),
      languages () {
        const addUrlForErrorPage = lang => {
          const level1 = this.$route.params.level1 || ''
          const level2 = this.$route.params.level2 || ''
          const level3 = this.$route.params.level3 || ''
          const pathMatch = this.$route.params.pathMatch || ''
          const path = '/' + [level1, level2, level3, pathMatch].filter(part => part).join('/')
          const langCode = lang.default ? '' : `/${lang.code}`

          return {
            ...lang,
            url: this.origin + langCode + path
          }
        }
        const exceptCurrent = lang => lang.code !== this.getCurrentLocale.code

        const languagesList = this.isErrorPage
          ? this.getLocales.map(addUrlForErrorPage)
          : this.getPageLocales

        return languagesList.filter(exceptCurrent)
      }
    },

    mounted () {
      this.$bus.$on('scroll', this.onPageScroll)
    },

    beforeDestroy () {
      this.$bus.$on('scroll', this.onPageScroll)
    },

    methods: {
      onClick () {
        if (this.$store.state.helpers.hasTouch) {
          this.isDropdownVisible = !this.isDropdownVisible
        }
      },
      onPageScroll () {
        this.isDropdownVisible = false
      }
    }
  }
</script>

<style lang="scss">
  .language-select {
    font-size: 14px;
    line-height: 1em;
    transition: 0.3s;

    @include extra-click-area;

    &_theme {
      &_white {
        .language-select__lang {
          color: white;
        }

        &.language-select_active {
          background: black;

          .language-select {
            &__lang {
              background: black;
            }
          }
        }
      }

      &_black {
        color: black;

        &.language-select_active {
          background: black;

          .language-select {
            &__lang {
              color: white;
              background: black;
            }
          }
        }
      }
    }

    &__lang {
      position: relative;
      z-index: 1001;
      display: block;
      font-size: 14px;
      line-height: 1em;
      text-transform: uppercase;
      transition: 0.3s;

      &_current {
        cursor: default;
      }

      &_in-dropdown {
        &-wrapper {
          margin-top: 10px;

          &:first-child {
            margin-top: 20px;
          }
        }

        @include extra-click-area;

        @include hover {
          color: red;
        }
      }
    }

    &__dropdown {
      position: absolute;
      display: inline;
      pointer-events: none;
      visibility: hidden;
      opacity: 0;
      transition: 0.3s;
      transform: translateY(10px);

      &_visible {
        pointer-events: all;
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
</style>
