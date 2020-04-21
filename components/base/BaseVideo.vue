<template>
  <div class="video__wrapper">
    <div
      ref="videoPlayTrigger"
      class="video__play-trigger"
      data-observer-repeat="true"
    />

    <video
      v-if="readyToLoad"
      ref="video"
      :autoplay="true"
      :loop="true"
      :muted="true"
      :playsinline="true"
      preload="none"
      class="video"
      @loadeddata="onLoaded"
    >
      <source
        v-for="(videoFormat, i) in Object.keys(video.src)"
        :key="`video-source-${i}`"
        :src="video.src[videoFormat]"
        :type="`video/${videoFormat}`"
      >
    </video>

    <transition name="fade">
      <div v-if="!isLoaded" class="video__poster">
        <BaseImage :image="video.poster" />
      </div>
    </transition>
  </div>
</template>

<script>
  // BaseVideo requires wrapper element with:
  //   1. non-static positioning
  //   2. width&height OR aspect ratio

  let loadObserver, playObserver
  if (process.browser) {
    const Observer = require('~/assets/js/modules/Observer').default

    loadObserver = new Observer({ root: null, rootMargin: '350px', threshold: 0 })
    playObserver = new Observer({ root: null, rootMargin: '0px', threshold: 0 })
  }

  export default {
    name: 'BaseVideo',

    props: {
      video: {
        type: Object,
        required: true,
        validator: $propTypes.video
      },
      lazy: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        readyToLoad: false,
        isLoaded: false
      }
    },

    mounted () {
      if (!this.lazy) {
        this.loadVideo()
      } else {
        loadObserver.observe(this.$el)
        this.$el.addEventListener('inview', event => {
          event.stopPropagation()
          this.loadVideo()
        })
      }

      playObserver.observe(this.$refs.videoPlayTrigger)
      this.$refs.videoPlayTrigger.addEventListener('inview', event => {
        event.stopPropagation()
        this.play()
      })
      this.$refs.videoPlayTrigger.addEventListener('outview', event => {
        event.stopPropagation()
        this.pause()
      })
    },

    beforeDestroy () {
      loadObserver.unobserve(this.$el)
      playObserver.unobserve(this.$refs.videoPlayTrigger)
    },

    methods: {
      async play () {
        if (this.$refs.video) {
          await this.$nextTick()
          this.$refs.video.play()
        }
      },
      async pause () {
        if (this.$refs.video) {
          await this.$nextTick()
          this.$refs.video.pause()
        }
      },
      onLoaded () {
        this.isLoaded = true
        this.$emit('load', this._uid)
      },
      loadVideo () {
        this.readyToLoad = true
        this.pause()
      }
    }
  }
</script>

<style lang="scss">
  .video {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;

    @include object-fit(cover);

    &__play-trigger {
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      pointer-events: none;
      visibility: hidden;
    }

    &__wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    &__poster {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
    }
  }
</style>
