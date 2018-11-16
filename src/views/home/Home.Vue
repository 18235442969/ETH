<template>
  <div class="home">
    <div class="home-container">
      <ecolog v-show="footIndex == 0" :invest="invest"></ecolog>
      <market v-show="footIndex == 1"></market>
      <mail v-show="footIndex == 2"></mail>
      <user v-show="footIndex == 3"></user>
    </div>
    <div class="home-footer">
      <tabbar v-model="footIndex" @on-index-change="changeTab">
        <tabbar-item>
          <i slot="icon" class="icon iconfont icon-lingxing"></i>
          <span slot="label">{{ $t("home.homeTabOne") }}</span>
        </tabbar-item>
        <tabbar-item>
          <i slot="icon" class="icon iconfont icon-hangqing"></i>
          <span slot="label">{{ $t("home.homeTabTwo") }}</span>
        </tabbar-item>
        <tabbar-item>
          <i slot="icon" class="icon iconfont icon-xinxiangtianchong"></i>
          <span slot="label">{{ $t("home.homeTabThree") }}</span>
        </tabbar-item>
        <tabbar-item>
          <i slot="icon" class="icon iconfont icon-wode-copy"></i>
          <span slot="label">{{ $t("home.homeTabFour") }}</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
import { Ecolog, Market, Mail, User } from './components';
import { Tabbar, TabbarItem } from 'vux';
import { mapState, mapActions } from 'vuex';
import { getBalance } from '../../api/user.js';
const appModule = 'app';

export default {
  name: 'home',
  components: {
    Ecolog,
    Market,
    Mail,
    User,
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      footIndex: 0,
      invest: 0
    }
  },
  computed: {
    ...mapState(appModule, {
      appHomeTabIndex: state => state.appHomeTabIndex
    })
  },
  methods: {
    ...mapActions(appModule, {
      changeTabIndex: 'changeTabIndex',
      getEthPrice: 'getEthPrice'
    }),
    /**
     * [changeTabIndex 切换tab]
     */
    changeTab() {
      this.changeTabIndex(this.footIndex);
    },
    /**
     * [getBalance 获取个人资产]
     */
    getBalance: async function() {
      try {
        let res = await getBalance();
        if (res.data.succeed == 'true') {
          this.invest = res.data.data.invest;
        } else {
          this.vuxUtils.showWarn(this.$t('home.getBalanceWarnText'));
        }
      } catch(e) {
        this.vuxUtils.showWarn(this.$t('home.getBalanceWarnText'));
      }
    },
    /**
     * [获取ETH行情价格]
     */
    getAllEthPrice: async function(){
      try {
        let res = await this.getEthPrice();
        if (res.data.succeed == 'true') {
        } else {
        }
      } catch(e) {
      }
    }
  },
  mounted() {
    this.getBalance();
    this.getAllEthPrice();
  },
  created() {
    this.footIndex = this.appHomeTabIndex;
  }
}
</script>

<style>
  .weui-tabbar{
    background-color: #fff !important;
  }
  .weui-tabbar__icon{
    height: 20px !important;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./Home.scss";
</style>