<template>
  <div :class="`content-from-editor content-from-editor_${colorTheme}`">
    <div v-html="content" />
  </div>
</template>

<script>
  export default {
    name: 'BaseContentFromEditor',

    props: {
      content: {
        type: String,
        default: ''
      },
      colorTheme: {
        type: String, 
        default: 'black',
        validator: colorTheme =>
          ['black', 'white'].includes(colorTheme)
      }
    }
  }
</script>

<style lang="scss">
  .content-from-editor {
    // your styles here
    font-size: 16px;
    line-height: 1.5;
  }
</style>
