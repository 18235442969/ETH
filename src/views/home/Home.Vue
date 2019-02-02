<template>
  <div class="home">
    <div class="home-container">
      <ecolog v-show="footIndex == 0" :invest="invest" :amount="amount" v-on:getNewBalance="getBalance"></ecolog>
      <market v-show="footIndex == 1"></market>
      <mail v-show="footIndex == 2"></mail>
      <user v-show="footIndex == 3" :freeze="freeze" :amount="amount"></user>
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
import Putin from './components/Putin.vue';

import { Tabbar, TabbarItem } from 'vux';
import { mapState, mapActions } from 'vuex';
import { getUserInfo, getBalance } from '../../api/user.js';
import auth from '../../utils/auth.js'
const appModule = 'app';

export default {
  name: 'home',
  components: {
    Ecolog,
    Market,
    Mail,
    User,
    Tabbar,
    TabbarItem,
  },
  beforeDestroy () {
    this.bus.$off('changeUserInfo');
    this.bus.$off('changeBalance');
  },
  data() {
    return {
      footIndex: 0,
      invest: 0,
      amount: 0,
      freeze: 0,
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
          this.amount = res.data.data.amount;
          this.freeze = res.data.data.freeze;
        } else {
          this.vuxUtils.apiError(this, res.data, this.$t('home.getBalanceWarnText'));
        }
      } catch(e) {
        this.vuxUtils.showWarn(this.$t('home.getBalanceWarnText'));
      }
    },
    /**
     * [getUserInfo 获取用户个人信息]
     */
    getUserInfo: async function() {
      try {
        let userInfo = JSON.parse(auth.getUserInfo());
        let res = await getUserInfo({
          uid: userInfo.userid
        });
        if (res.data.succeed == 'true') {
          let user = Object.assign(userInfo, res.data.data);
          auth.setUserInfo(JSON.stringify(user));
          this.bus.$emit('setUserLevel');
        }
      } catch(e) {
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
    this.getUserInfo();
    this.bus.$on('changeUserInfo', () => {
      this.getUserInfo();
    });
    this.bus.$on('changeBalance', () => {
      this.getBalance();
    });
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