<template>
  <div class="topup">
    <div class="navbar">
      <flexbox :gutter="0">
        <flexbox-item :span="1" @click.native="clickLeft" class="left">
          <i class="icon iconfont icon-left-arrow"></i>
        </flexbox-item>
        <flexbox-item :span="10" class="center">
          {{ $t('appTitle.topUpTitle') }}
        </flexbox-item>
        <flexbox-item :span="1">
        </flexbox-item>
      </flexbox>
    </div>
    <div style="background-color: #f5f4f7;height: 10px;">
    </div>
    <div>
      <div class="topup-title">
        {{ $t("home.user.topUp.titleText") }}
      </div>
      <div class="topup-address">
        {{address}}
      </div>
      <div class="topup-button">
        <button v-clipboard:copy="address" v-clipboard:success="onCopy" v-clipboard:error="onError">
          {{ $t("home.user.topUp.copyBtnText") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import { Navbar } from './Navbar.vue'
import { } from '../../../api/eth.js';

export default {
  name: 'topup',
  components: {
    Flexbox,
    FlexboxItem,
    Navbar,
  },
  data() {
    return {
      address: '123asd12asd1a5s4d15dsf454dsf5'
    }
  },
  computed: {
  },
  methods: {
    clickLeft() {
      this.$emit('close');
    },
    onCopy() {
      this.$vux.toast.show({
        type: "success",
        text: this.$t('home.user.topUp.copySuccessText'),
        time: 1000
      })
    },
    onError() {
      this.vuxUtils.showWarn(this.$t('home.user.topUp.copyFailText'));
    }
  },
  mounted() {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>