<template>
  <div class="ecolog">
    <img src="../../../assets/image/ecologBg.png" class="bg">
    <div class="container">
      <flexbox :gutter="0" class="ecolog-header">
        <flexbox-item :span="10" class="level">
          <i>Lv.{{level}}</i>
        </flexbox-item>
        <flexbox-item :span="2" class="activation" @click.native="putIn" v-if="state == 0">
          {{ $t("home.ecolog.headRightText") }}
        </flexbox-item>
        <flexbox-item :span="2" class="hasActivation" v-else>
          {{ $t("home.ecolog.hasHeadRightText") }}
        </flexbox-item>
      </flexbox>
      <div class="finance">
        <div class="totalPrice">
          {{invest}}
        </div>
        <div class="introduce">
          {{ $t("home.ecolog.introduceEth") }}ETH
        </div>
        <div class="btn-list">
          <button class="putInBtn" @click="putIn">{{ $t("home.ecolog.putInBtnText") }}</button>
          <button class="putOutBtn" @click="putOut">{{ $t("home.ecolog.putOutBtnText") }}</button>
        </div>
      </div>
      <div class="price">
        <flexbox :gutter="0">
          <flexbox-item :span="3" class="title">
            ETH
          </flexbox-item>
          <flexbox-item :span="9" class="num">
            ￥{{ethPrice}}
          </flexbox-item>
        </flexbox>
      </div>
      <div class="notice" v-if="noticeList.length > 0">
        <flexbox :gutter="0">
          <flexbox-item :span="1.5" class="notice-icon">
            <i class="icon iconfont icon-gonggao1"></i>
          </flexbox-item>
          <flexbox-item :span="10.5" class="notice-content">
            <marquee :item-height="32" :interval="10000">
              <marquee-item v-for="(i, index) in noticeList" :key="index" @click.native="getNoticeDetail(i)" class="align-middle">
                {{i.title}}
              </marquee-item>
            </marquee>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="operation">
        <flexbox :gutter="5">
          <flexbox-item :span="6" class="operation-item" @click.native="changePage('rewardBill')">
            <flexbox :gutter="0">
              <flexbox-item :span="5" class='operation-img'>
                <img src="../../../assets/image/rewardBill.png">
              </flexbox-item>
              <flexbox-item :span="7" class="operation-content">
                {{ $t("home.ecolog.rewardBillText") }}
              </flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item :span="6" class="operation-item" @click.native="changePage('revenueBill')">
            <flexbox :gutter="0">
              <flexbox-item :span="5" class='operation-img'>
                <img src="../../../assets/image/revenueBill.png">
              </flexbox-item>
              <flexbox-item :span="7" class="operation-content">
                {{ $t("home.ecolog.revenueBillText") }}
              </flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
        <flexbox :gutter="5" style="margin-top: 5px;">
          <flexbox-item :span="6" class="operation-item" @click.native="changePage('transfer')">
            <flexbox :gutter="0">
              <flexbox-item :span="5" class='operation-img'>
                <img src="../../../assets/image/transfer.png">
              </flexbox-item>
              <flexbox-item :span="7" class="operation-content">
                {{ $t("home.ecolog.operationOneText") }}
              </flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item :span="6" class="operation-item" @click.native="putOut">
            <flexbox :gutter="0">
              <flexbox-item :span="5" class='operation-img'>
                <img src="../../../assets/image/inTheVotingRecord.png">
              </flexbox-item>
              <flexbox-item :span="7" class="operation-content">
                {{ $t("home.ecolog.inTheVotingRecordText") }}
              </flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
        <!-- <flexbox :gutter="5" style="margin-top: 5px;">
          <flexbox-item :span="6" class="operation-item" v-if="level > 0" @click.native="changePage('releaseMenu', 'lower')">
            <flexbox :gutter="0">
              <flexbox-item :span="5" class='operation-img'>
                <img src="../../../assets/image/lowerLevel.png">
              </flexbox-item>
              <flexbox-item :span="7" class="operation-content">
                {{ $t("home.ecolog.operationTwoText") }}
              </flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox> -->
        <!-- <flexbox :gutter="5" style="margin-top: 5px;">
          <flexbox-item :span="6" class="operation-item" v-if="level > 1" @click.native="changePage('releaseMenu', 'middle')">
            <flexbox :gutter="0">
              <flexbox-item :span="5" class='operation-img'>
                <img src="../../../assets/image/middleLevel.png">
              </flexbox-item>
              <flexbox-item :span="7" class="operation-content">
                {{ $t("home.ecolog.operationThreeText") }}
              </flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item :span="6" class="operation-item" v-if="level > 2" @click.native="changePage('releaseMenu', 'high')">
            <flexbox :gutter="0">
              <flexbox-item :span="5" class='operation-img'>
                <img src="../../../assets/image/highLevel.png">
              </flexbox-item>
              <flexbox-item :span="7" class="operation-content">
                {{ $t("home.ecolog.operationFourText") }}
              </flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox> -->
      </div>
      <div v-transfer-dom>
        <popup v-model="putInShow" position="right" width="100%" :popup-style="popupOption">
          <putin :amount="amount" v-on:close="hidePutIn" v-on:getBalance="$emit('getNewBalance')"></putin>
        </popup>
      </div>
      <div v-transfer-dom>
        <popup v-model="putOutShow" position="right" width="100%" :popup-style="popupOption">
          <putout  v-on:close="hidePutOut" v-on:getBalance="$emit('getNewBalance')"></putout>
        </popup>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="detailShow" position="right" width="100%" :popup-style="popupOption">
        <div class="navbar">
          <flexbox :gutter="0">
            <flexbox-item :span="1" @click.native="detailClose" class="left">
              <i class="icon iconfont icon-left-arrow" style="font-size: 16px;"></i>
            </flexbox-item>
            <flexbox-item :span="10" class="center">
              {{ $t('appTitle.platformAnnouncementTitle') }}
            </flexbox-item>
            <flexbox-item :span="1">
            </flexbox-item>
          </flexbox>
        </div>
        <div style="background-color: #f5f4f7;height: 10px;"></div>
        <div class="pop-title">
          {{ detail.title }}
        </div>
        <div class="pop-time">
          {{ detail.time }}
        </div>
        <div class="pop-content" v-html="detail.content">
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Popup, TransferDom, Marquee, MarqueeItem } from 'vux';
import Putin from './Putin.vue';
import Putout from './Putout.vue';
import auth from '../../../utils/auth.js';
import { getNotice } from '../../../api/user.js';
import { mapState } from 'vuex'
const appModule = 'app';

export default {
  name: 'ecolog',
  components: {
    Flexbox,
    FlexboxItem,
    Popup,
    Putin,
    Putout,
    Marquee,
    MarqueeItem
  },
  beforeDestroy () {
    this.bus.$off('setUserLevel');
  },
  directives: {
    TransferDom
  },
  props: ['invest', 'amount'],
  data() {
    return {
      popupOption: {
        'z-index': 999
      },
      putInShow: false,
      putOutShow: false,
      detailShow: false,
      level: 0,
      state: 0,
      noticeList: [],
      detail: {
        title: '',
        time: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapState(appModule, {
      coinPrice: state => state.coinPrice
    }),
    ethPrice() {
      let data = this.coinPrice.find(e => e.currency == '0');
      if (data) {
        return data.amount;
      } else {
        return 0;
      }
    }
  },
  methods: {
    /**
     * [changePage 切换页面]
     */
    changePage(name, type) {
      if (type) {
        this.$router.push({
          name: name,
          params: {
            type: type
          }
        })
      } else {
        this.$router.push({
          name: name,
        })
      }
    },
    /**
     * [putIn 投入]
     */
    putIn() {
      this.putInShow = true;
    },
    /**
     * [putOut 赎回]
     */
    putOut() {
      this.putOutShow = true;
    },
    hidePutIn() {
      this.putInShow = false;
    },
    hidePutOut() {
      this.putOutShow = false;
    },
    /**
     * [获取平台公告]
     */
    getNotice: async function() {
      try {
        let res = await getNotice();
        if (res.data.succeed == 'true') {
          this.noticeList = res.data.data.slice(0, 3);
        } else {
          this.vuxUtils.apiError(this, res.data, this.$t('home.user.platformAnnouncement.errorText'));
        }
      } catch (e) {
        this.vuxUtils.showWarn(this.$t('home.user.platformAnnouncement.errorText'));
      }
    },
    /**
     * [getNoticeDetail 获取公告详情]
     * @param  {[Object]} data [公告详情]
     */
    getNoticeDetail(data) {
      this.detail.title = data.title;
      this.detail.time = data.createtime;
      this.detail.content = data.body;
      this.detailShow = true;
    },
    detailClose() {
      this.detailShow = false;
    },
  },
  mounted() {
    this.getNotice();
    this.bus.$on('setUserLevel', () => {
      let userInfo =  JSON.parse(auth.getUserInfo());
      if (userInfo) {
        this.state = userInfo.state;
        this.level = userInfo.level;
      }
    });
    let userInfo =  JSON.parse(auth.getUserInfo());
    if (userInfo) {
      this.state = userInfo.state;
      this.level = userInfo.level;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>