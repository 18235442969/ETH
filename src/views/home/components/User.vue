<template>
  <div class="user">
    <img src="../../../assets/image/userBg.png" class="bg">
    <div class="container">
      <flexbox :gutter="0" class="user-header">
        <flexbox-item :span="4">
        </flexbox-item>
        <flexbox-item :span="4" class="title">
          {{ $t("appTitle.userTitle") }}
        </flexbox-item>
        <flexbox-item :span="4" class="set" @click.native="changeAppPage('setting')">
          <i class="icon iconfont icon-shezhi1"></i>
        </flexbox-item>
      </flexbox>
      <div class="money">
        <div class="title">
          {{ $t("home.user.balanceText") }}（ETH）
        </div>
        <div class="balance">
          {{amount}}
        </div>
        <div class="freeze">
        ( {{ $t("home.user.freezeText") }}：{{freeze}}ETH )
        </div>
      </div>
      <div class="user-btn">
        <button class="topUpBtn" @click="coinBtnClick('topUp')">{{ $t("home.user.topUpBtnText") }}</button>
        <button class="withdrawalBtn" @click="coinBtnClick('withdrawal')">{{ $t("home.user.withdrawalBtnText") }}</button>
      </div>
    </div>
    <div class="user-operation">
      <flexbox :gutter="5">
        <flexbox-item :span="4" class="user-operation-item" @click.native="changeAppPage('bill')">
          <img src="../../../assets/image/bill.png" class="user-operation-img">
          <div class="user-operation-content">
            {{ $t("home.user.billText") }}
          </div>
        </flexbox-item>
        <flexbox-item :span="4" class="user-operation-item" @click.native="changeAppPage('myRecommend')">
          <img src="../../../assets/image/recommend.png"class="user-operation-img">
          <div class="user-operation-content">
            {{ $t("home.user.recommendText") }}
          </div>
        </flexbox-item>
        <flexbox-item :span="4" class="user-operation-item" @click.native="changeAppPage('myFamily')">
          <img src="../../../assets/image/family.png" class="user-operation-img">
          <div class="user-operation-content">
            {{ $t("home.user.familyText") }}
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="5" style="margin-top: 5px;">
        <flexbox-item :span="4" class="user-operation-item" @click.native="changeAppPage('userInfo')">
          <img src="../../../assets/image/userInfo.png" class="user-operation-img">
          <div class="user-operation-content">
            {{ $t("home.user.userInfoText") }}
          </div>
        </flexbox-item>
        <flexbox-item :span="4" class="user-operation-item" @click.native="changeAppPage('platformAnnouncement')">
          <img src="../../../assets/image/platformAnnouncement.png" class="user-operation-img">
          <div class="user-operation-content">
            {{ $t("home.user.platformAnnouncementText") }}
          </div>
        </flexbox-item>
        <flexbox-item :span="4" class="user-operation-item" @click.native="changeAppPage('chat')">
          <img src="../../../assets/image/customerService.png" class="user-operation-img">
          <div class="user-operation-content">
            {{ $t("home.user.customerServiceText") }}
          </div>
        </flexbox-item>
      </flexbox>
    </div>

    <div v-transfer-dom>
      <popup v-model="topUpShow" position="right" width="100%" :popup-style="popupOption">
        <topup v-on:close="hideTopUp"></topup>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup v-model="withdrawalShow" position="right" width="100%" :popup-style="popupOption">
        <withdrawal v-on:close="hideWithdrawal"></withdrawal>
      </popup>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Popup, TransferDom } from 'vux';
import Topup from './Topup.vue';
import Withdrawal from './Withdrawal.vue';
import { mapActions } from 'vuex';
const appSpace = 'app';

export default {
  name: 'user',
  components: {
    Flexbox,
    FlexboxItem,
    Popup,
    Topup,
    Withdrawal
  },
  directives: {
    TransferDom
  },
  props: ['amount', 'freeze'],
  data() {
    return {
      popupOption: {
        'z-index': 999
      },
      topUpShow: false,
      withdrawalShow: false,
      isClick: false
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(appSpace, {
      getUserService: 'getUserService'
    }),
    /**
     * [changeAppPage 切换页面]
     * @param  {[String]} name [名称]
     */
    changeAppPage: async function (name) {
      if (this.isClick) {
        return;
      }
      this.isClick = true;
      if (name == 'chat') {
        try {
          let res = await this.getUserService();
          this.isClick = false;
          if (res.data.succeed == 'true') {
            let data = res.data.data[0];
            this.$router.push({
              name: name,
              params: {
                name: data.name,
                userId: data.userid,
                type: 'service',
                userType: 'service'
              }
            })
          } else {
          }
        } catch(e) {
          this.isClick = false;
        }
      } else {
        this.isClick = false;
        this.$router.push({
          name: name
        })
      }
    },
    /**
     * [coinBtnClick 点击按钮]
     * @param  {[String]} type [类型]
     */
    coinBtnClick(type) {
      if (type == 'topUp') {
        this.topUpShow = true;
      } else {
        this.withdrawalShow = true;
      }
    },
    hideTopUp() {
      this.topUpShow = false;
    },
    hideWithdrawal() {
      this.withdrawalShow = false;
    }
  },
  mounted() {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>