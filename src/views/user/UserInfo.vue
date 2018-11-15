<template>
  <div class="userInfo">
    <group :gutter="10">
      <cell :title="$t('home.user.userInfo.referrerIdText')" :value="referrerId"></cell>
      <cell title="ID" :value="id"></cell>
      <cell :title="$t('home.user.userInfo.phoneText')" :value="phone"></cell>
    </group>
    <group :gutter="10">
      <cell :title="$t('home.user.userInfo.investmentGradeText')">
        <span style="color: #f58723;font-size: 0.9rem;">Lv.{{ level }}</span>
      </cell>
      <cell :title="$t('home.user.userInfo.starTeamText')">
        <div style="color: #f58723;">
          <i class="icon iconfont icon-dengji" v-for="i in Number(rank)"></i>
        </div>
      </cell>
    </group>
    <group :gutter="10">
      <cell :title="$t('home.user.userInfo.paymentMethodsText')" @click.native="changePage('paymentMethods')">
        <i class="icon iconfont icon-zhifubao" style="font-size: 1.1rem;color: #00aaee;" v-if="alipay != ''"></i>
        <i class="icon iconfont icon-weixin" style="font-size: 1.03rem;color: #4cc832;" v-if="wechat != ''"></i>
        <i class="icon iconfont icon-yinhangqia1" style="font-size: 1.1rem;color: #5f695f;" v-if="bank != ''"></i>
        <i class="icon iconfont icon-arrow-rt"></i>
      </cell>
    </group>
    <group :gutter="10">
      <cell :title="$t('home.user.userInfo.loginPasswordText')" @click.native="changePage('resetPassword')">
        <i class="icon iconfont icon-arrow-rt"></i>
      </cell>
      <cell :title="$t('home.user.userInfo.payPasswordText')" @click.native="changePage('payPassword')">
        <i class="icon iconfont icon-arrow-rt"></i>
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux';
import auth from '../../utils/auth.js';

export default {
  name: 'userInfo',
  components: {
    Group,
    Cell
  },
  data() {
    return {
      referrerId: '',
      id: '',
      phone: '',
      level: '0',
      rank: '0',
      wechat: '',
      alipay: '',
      bank: '',
    }
  },
  computed: {
  },
  methods: {
    /**
     * [changePage 跳转页面]
     * @param  {[String]} name [页面名称]
     */
    changePage(name) {
      this.$router.push({
        name: name
      });
    }
  },
  mounted() {
    let userInfo = JSON.parse(auth.getUserInfo());
    if (userInfo) {
      this.referrerId = userInfo.parent.idnum;
      this.id = userInfo.idnum;
      this.phone = userInfo.mob;
      this.level = userInfo.level;
      this.rank = userInfo.rank;
      this.wechat = userInfo.wechat;
      this.alipay = userInfo.alipay;
      this.bank = userInfo.cardno;
    }
  }
}
</script>

<style>
  .weui-cells{
    line-height: 1.6 !important;
    font-size: 0.8rem !important;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./User.scss";
</style>