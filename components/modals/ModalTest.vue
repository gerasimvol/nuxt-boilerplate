<template>
  <div class="modal-test">
    ModalTest
    {{ foo }}
  </div>
</template>

<script>
  export default {
    name: 'ModalTest',

    props: {
      foo: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .modal-test {
    padding: 100px;
    background: white;
  }
</style>
