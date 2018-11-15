<template>
  <div class="hButton">
    <button class="button" :class="[btnClass]" :disabled="disabled">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'hButton',
  props: {
    value: String,
    btnClass: String,
    disabled: Boolean
  },
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .hButton{
    width: 100%;
    height: 100%;
    border-radius: 30px;
  }
  .button{
    width: 100%;
    height: 100%;
    background-color: #0c5fcc;
    background: linear-gradient(to right, #3473e2 , #0c5fcc);
    border: none;
    color: #fff;
    border-radius: 30px;
    font-size: 0.9rem;
  }
  .languageClass{
    font-size: 0.75rem;
  }
</style>