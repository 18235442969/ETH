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
          18400.00
        </div>
        <div class="freeze">
        ( {{ $t("home.user.freezeText") }}：18600ETH )
        </div>
      </div>
      <div class="user-btn">
        <button class="topUpBtn">{{ $t("home.user.topUpBtnText") }}</button>
        <button class="withdrawalBtn">{{ $t("home.user.withdrawalBtnText") }}</button>
      </div>
    </div>
    <div class="user-operation">
      <flexbox :gutter="5">
        <flexbox-item :span="4" class="user-operation-item">
          <img src="../../../assets/image/bill.png" class="user-operation-img">
          <div class="user-operation-content">
            {{ $t("home.user.billText") }}
          </div>
        </flexbox-item>
        <flexbox-item :span="4" class="user-operation-item">
          <img src="../../../assets/image/recommend.png"class="user-operation-img">
          <div class="user-operation-content">
            {{ $t("home.user.recommendText") }}
          </div>
        </flexbox-item>
        <flexbox-item :span="4" class="user-operation-item">
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
        <flexbox-item :span="4" class="user-operation-item">
          <img src="../../../assets/image/platformAnnouncement.png" class="user-operation-img">
          <div class="user-operation-content">
            {{ $t("home.user.platformAnnouncementText") }}
          </div>
        </flexbox-item>
        <flexbox-item :span="4" class="user-operation-item">
          <img src="../../../assets/image/customerService.png" class="user-operation-img">
          <div class="user-operation-content">
            {{ $t("home.user.customerServiceText") }}
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import { mapActions } from 'vuex';
const appModule = 'app';

export default {
  name: 'user',
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
    ...mapActions(appModule, {
      getEthPrice: 'getEthPrice'
    }),
    /**
     * [changeAppPage 切换页面]
     * @param  {[String]} name [名称]
     */
    changeAppPage(name) {
      this.$router.push({
        name: name
      })
    }
  },
  mounted() {
    this.getEthPrice().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>