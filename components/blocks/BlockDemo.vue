<template>
  <section class="block-test">
    <h6 v-animate>
      BlockDemo in {{ title }}
    </h6>

    <button @click="openModal">
      Open modal
    </button>

    <!-- <div class="media-wrapper">
      <BaseImage :image="testImg" />
    </div> -->

    <!-- <div class="media-wrapper">
      <BaseVideo :video="testVideo" />
    </div> -->
  </section>
</template>

<script>
  const testImg = {
    alt: 'sad',
    title: 'asd',
    originalSrc: 'http://front.digital-education.com.dev11.vintagedev.com.ua/uploads/0/561-20_4f7a1c4179dd46f32a02e260bb59d931_wide_big.jpg',
    thumb: 'http://localhost:3030/img/test-img.jpg',
    default: {
      540: 'http://front.digital-education.com.dev11.vintagedev.com.ua/uploads/thumb/561-4-20_4f7a1c4179dd46f32a02e260bb59d931_wide_big.jpg',
      768: 'http://front.digital-education.com.dev11.vintagedev.com.ua/uploads/thumb/561-3-20_4f7a1c4179dd46f32a02e260bb59d931_wide_big.jpg',
      1280: 'http://front.digital-education.com.dev11.vintagedev.com.ua/uploads/thumb/561-2-20_4f7a1c4179dd46f32a02e260bb59d931_wide_big.jpg',
      1920: 'http://front.digital-education.com.dev11.vintagedev.com.ua/uploads/thumb/561-1-20_4f7a1c4179dd46f32a02e260bb59d931_wide_big.jpg'
    },
    webp: {
      540: 'http://front.digital-education.com.dev11.vintagedev.com.ua/uploads/thumb/561-4-20_4f7a1c4179dd46f32a02e260bb59d931_wide_big.webp',
      768: 'http://front.digital-education.com.dev11.vintagedev.com.ua/uploads/thumb/561-3-20_4f7a1c4179dd46f32a02e260bb59d931_wide_big.webp',
      1280: 'http://front.digital-education.com.dev11.vintagedev.com.ua/uploads/thumb/561-2-20_4f7a1c4179dd46f32a02e260bb59d931_wide_big.webp',
      1920: 'http://front.digital-education.com.dev11.vintagedev.com.ua/uploads/thumb/561-1-20_4f7a1c4179dd46f32a02e260bb59d931_wide_big.webp'
    }
  }

  export default {
    name: 'BlockDemo',

    props: {
      title: {
        type: String,
        required: true
      }
    },

    data: () => ({
      testImg,
      testVideo: {
        poster: testImg,
        src: {
          mp4: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          webm: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }
      }
    }),

    methods: {
      openModal () {
        this.$openModal('ModalTest', { foo: 'bar' })
      }
    }
  }
</script>

<style lang="scss">
  .block-test {
    // height: 5000px;
    padding: 50px;

    .media-wrapper {
      position: relative;
      width: 50vw;
      height: 50vw;
      // margin-top: 2000px;
    }
  }
</style>
