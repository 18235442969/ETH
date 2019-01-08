<template>
  <div class="orderUser">
    <flexbox :gutter="0" class="title">
      <flexbox-item :span="2">
      </flexbox-item>
      <flexbox-item :span="8" class="title-name">
        {{ type == "buy" ? $t("home.mail.order.orderUser.buyInfoText") : $t("home.mail.order.orderUser.sellInfoText") }}
      </flexbox-item>
      <flexbox-item :span="2" class="title-icon">
        <i class="icon iconfont icon-quxiao" @click="$emit('closeDialog')"></i>
      </flexbox-item>
    </flexbox>

    <flexbox :gutter="0" class="info" v-if="!valid.isStrEmpty(userInfo.bank)">
      <flexbox-item :span="2.5" class="info-title">
        {{$t("home.mail.order.orderUser.bank")}}
      </flexbox-item>
      <flexbox-item :span="7.5" class="info-content">
        <input type="text" class="info-input" readonly :value="userInfo.bank">
      </flexbox-item>
      <flexbox-item :span="2" class="info-btn">
        <button v-clipboard:copy="userInfo.bank" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t("home.mail.order.orderUser.copytext")}}</button>
      </flexbox-item>
    </flexbox>

    <flexbox :gutter="0" class="info" v-if="!valid.isStrEmpty(userInfo.cardno)">
      <flexbox-item :span="2.5" class="info-title">
        {{$t("home.mail.order.orderUser.cardno")}}
      </flexbox-item>
      <flexbox-item :span="7.5" class="info-content">
        <input type="text" class="info-input" readonly :value="userInfo.cardno">
      </flexbox-item>
      <flexbox-item :span="2" class="info-btn">
        <button v-clipboard:copy="userInfo.cardno" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t("home.mail.order.orderUser.copytext")}}</button>
      </flexbox-item>
    </flexbox>

    <flexbox :gutter="0" class="info" v-if="!valid.isStrEmpty(userInfo.account)">
      <flexbox-item :span="2.5" class="info-title">
        {{$t("home.mail.order.orderUser.account")}}
      </flexbox-item>
      <flexbox-item :span="7.5" class="info-content">
        <input type="text" class="info-input" readonly :value="userInfo.account">
      </flexbox-item>
      <flexbox-item :span="2" class="info-btn">
        <button v-clipboard:copy="userInfo.account" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t("home.mail.order.orderUser.copytext")}}</button>
      </flexbox-item>
    </flexbox>

    <flexbox :gutter="0" class="info" v-if="!valid.isStrEmpty(userInfo.bankmob)">
      <flexbox-item :span="2.5" class="info-title">
        {{$t("home.mail.order.orderUser.bankmob")}}
      </flexbox-item>
      <flexbox-item :span="7.5" class="info-content">
        <input type="text" class="info-input" readonly :value="userInfo.bankmob">
      </flexbox-item>
      <flexbox-item :span="2" class="info-btn">
        <button v-clipboard:copy="userInfo.bankmob" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t("home.mail.order.orderUser.copytext")}}</button>
      </flexbox-item>
    </flexbox>

    <flexbox :gutter="0" class="info" v-if="!valid.isStrEmpty(userInfo.wechat)">
      <flexbox-item :span="2.5" class="info-title">
        {{$t("home.mail.order.orderUser.wechat")}}
      </flexbox-item>
      <flexbox-item :span="7.5" class="info-content">
        <input type="text" class="info-input" readonly :value="userInfo.wechat">
      </flexbox-item>
      <flexbox-item :span="2" class="info-btn">
        <button v-clipboard:copy="userInfo.wechat" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t("home.mail.order.orderUser.copytext")}}</button>
      </flexbox-item>
    </flexbox>

    <flexbox :gutter="0" class="info" v-if="!valid.isStrEmpty(userInfo.alipay)">
      <flexbox-item :span="2.5" class="info-title">
        {{$t("home.mail.order.orderUser.alipay")}}
      </flexbox-item>
      <flexbox-item :span="7.5" class="info-content">
        <input type="text" class="info-input" readonly :value="userInfo.alipay">
      </flexbox-item>
      <flexbox-item :span="2" class="info-btn">
        <button v-clipboard:copy="userInfo.alipay" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t("home.mail.order.orderUser.copytext")}}</button>
      </flexbox-item>
    </flexbox>

    <div class="tips">
      {{$t("home.mail.order.orderUser.tips")}}
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
export default {
  name: 'orderUser',
  props: ['type', 'userInfo'],
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
   onCopy() {
    this.$vux.toast.show({
      type: "success",
      text: this.$t('home.user.topUp.copySuccessText'),
      time: 1000
    })
  },
  onError() {
    this.vuxUtils.showWarn(this.$t('home.user.topUp.copyFailText'));
  },
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>