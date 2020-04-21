<template>
  <div class="layout">
    <TheHeader />

    <div class="page-content-wrapper">
      <nuxt />
    </div>

    <TheModal />

    <TheFooter />
  </div>
</template>

<script>
  import TheHeader from '~/components/layout/Header/TheHeader'
  import TheFooter from '~/components/layout/TheFooter'
  import TheModal from '~/components/layout/TheModal'

  export default {
    name: 'DefaultLayout',

    components: {
      TheHeader,
      TheFooter,
      TheModal
    }
  }
</script>
