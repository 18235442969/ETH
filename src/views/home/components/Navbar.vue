<template>
  <div class="navbar">
    <flexbox :gutter="0">
      <flexbox-item :span="1" @click.native="clickLeft" class="left">
        <i class="icon iconfont icon-left-arrow"></i>
      </flexbox-item>
      <flexbox-item :span="10" class="center">
        {{ appTitle }}
      </flexbox-item>
      <flexbox-item :span="1">
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
export default {
  name: 'Navbar',
  props: ['appTitle'],
  components: {
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    clickLeft() {
      this.$emit('clickLeft');
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar{
    width: 100%;
    height: 45px;
    line-height: 45px;
    border-radius: 0px !important;
    background-color: #fff;
    border-bottom: 0.8px solid #ebebeb;
  }
  .left, .center, .right{
    color: #282525;
  }

  .center{
    text-align: center;
    font-size: 1rem;
  }

  .left{
    padding-left: 10px;
    font-size: 1.2rem;
  }

  .right{
    padding-right: 10px;
    text-align: right;
    font-size: 1rem;
  }
</style>