<template>
  <div v-if="imageObject" :class="classes">
    <div ref="imageRevealTrigger" class="lazy-image__reveal-trigger" />

    <div 
      :class="[
        'lazy-image__overlay',
        { 'lazy-image__overlay_hidden': readyToShow }
      ]"
    >
      <img
        v-if="revealAnimation === 'blur'"
        :src="imageObject.thumb"
        :alt="`thumb-${alt}`"
        class="lazy-image__overlay-thumb"
      >
      <div
        v-else
        class="lazy-image__overlay-div"
      />
    </div>

    <picture 
      v-if="readyToLoad" 
      :class="[
        'lazy-image__picture',
        { 'lazy-image__picture_ready': readyToShow }
      ]"
    >
      <!-- .webp -->
      <source
        :srcset="getSrcSet('webp')"
        type="image/webp"
      >
  
      <!-- .png, .jpg, ... -->
      <source :srcset="getSrcSet('default')">
  
      <!-- all events and styles goes to <img> -->
      <!-- and fallback if srcset is not supported -->
      <img
        :src="imageObject.originalSrc"
        :alt="alt"
        :title="imageObject.title"
        class="lazy-image"
        @load="onLoaded"
      >
    </picture>
  </div>
</template>

<script>
  // BaseImage requires wrapper element with:
  //   1. non-static positioning
  //   2. width&height OR aspect ratio

  let loadObserver, revealObserver
  if (process.browser) {
    const Observer = require('~/assets/js/modules/Observer').default

    loadObserver = new Observer({ root: null, rootMargin: '150px', threshold: 0 })
    revealObserver = new Observer({ root: null, rootMargin: '0px', threshold: 0.2 })
  }

  export default {
    name: 'BaseImage',

    props: {
      image: {
        type: [Object, String],
        required: true,
        validator (image) {
          // image object or url
          return typeof image === 'string'
            ? true
            : $propTypes.image(image)
        }
      },
      revealAnimation: {
        type: String,
        default: 'blur',
        validator (revealAnimation) {
          return ['blur', 'fromDark', 'fromOpacity', 'slideWhite', 'slideBlack'].includes(revealAnimation)
        }
      },
      objectFit: {
        type: String,
        default: 'cover'
      },
      lazy: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        readyToLoad: false,
        isInViewport: false,
        isLoaded: false
      }
    },

    computed: {
      classes () {
        return [
          'lazy-image__wrapper',
          `lazy-image__wrapper_reveal_${this.revealAnimation}`,
          { 'lazy-image__wrapper_visible': this.readyToShow },
          `lazy-image__wrapper_object-fit_${this.objectFit}`
        ]
      },
      readyToShow () {
        return this.isLoaded && this.isInViewport
      },
      alt () {
        return this.imageObject.alt || `image-${this._uid}`
      },
      imageObject () {
        return typeof this.image === 'string'
          ? this.getImageObjectFromSrc(this.image)
          : this.image
      }
    },

    mounted () {
      if (!this.imageObject) return

      if (!this.lazy) {
        this.readyToLoad = true
      } else {
        loadObserver.observe(this.$el)
        this.$el.addEventListener('inview', event => {
          event.stopPropagation()
          this.readyToLoad = true
        })
      }

      revealObserver.observe(this.$refs.imageRevealTrigger)
      this.$refs.imageRevealTrigger.addEventListener('inview', event => {
        event.stopPropagation()
        this.isInViewport = true
      })
    },

    beforeDestroy () {
      loadObserver.unobserve(this.$el)
      revealObserver.unobserve(this.$refs.imageRevealTrigger)
    },

    methods: {
      onLoaded () {
        this.isLoaded = true
        this.$emit('load', this._uid)
      },

      getSrcSet (type) {
        return Object.keys(this.imageObject.default)
          .reduce((result, width) => {
            result += `${this.imageObject[type][width]} ${width}w, `
            return result
          }, '')
      },
      
      // format to image object if image prop is string (url)
      getImageObjectFromSrc (src) {
        return {
          alt: `${this.$route.path}-image-${this._uid}`,
          title: `${this.$route.path}-image-${this._uid}`,
          originalSrc: src,
          thumb: src,
          default: { 540: src, 768: src, 1280: src, 1920: src },
          webp: { 540: src, 768: src, 1280: src, 1920: src }
        }
      }
    }
  }
</script>

<style lang="scss">
  .lazy-image {
    width: 100%;
    height: 100%;

    &__wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;

      &_reveal {
        &_fromDark {
          .lazy-image__overlay-div {
            background: black;
          }
        }

        &_fromOpacity {
          opacity: 0;
          transition: 1s;
        }

        &_slideWhite,
        &_slideBlack {
          .lazy-image__picture {
            transition: 0.8s;
            transform: translateX(7%);

            &_ready {
              transform: translateX(0);
            }
          }

          .lazy-image__overlay {
            opacity: 1;
            transform-origin: 0 0;

            &_hidden {
              transform: scaleX(0);
            }
          }
        }

        &_slideWhite {
          .lazy-image__overlay {
            &-div {
              background: gray;
            }
          }
        }

        &_slideBlack {
          .lazy-image__overlay {
            &-div {
              background: black;
            }
          }
        }
      }

      &_visible {
        opacity: 1;
      }

      &_object-fit {
        &_cover {
          .lazy-image {
            @include object-fit();

            &__overlay-thumb {
              @include object-fit();
            }
          }
        }

        &_contain {
          .lazy-image {
            @include object-fit(contain);

            &__overlay-thumb {
              @include object-fit(contain);
            }
          }
        }
      }
    }

    &__reveal-trigger {
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      pointer-events: none;
      visibility: hidden;
    }

    &__picture {
      display: flex;
      width: 100%;
      height: 100%;
    }

    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      overflow: hidden;
      transition: 1s;

      &-div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      &-thumb {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        filter: blur(4px);
        transform: scale(1.03);
      }

      &_hidden {
        opacity: 0;
        transition: 1s;
      }
    }
  }
</style>
