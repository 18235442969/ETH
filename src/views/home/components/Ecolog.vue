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
      <!-- <div class="operation">
        <flexbox :gutter="5">
          <flexbox-item :span="6" class="operation-item">
            <flexbox :gutter="0">
              <flexbox-item :span="5" class='operation-img'>
                <img src="../../../assets/image/transfer.png">
              </flexbox-item>
              <flexbox-item :span="7" class="operation-content">
                {{ $t("home.ecolog.operationOneText") }}
              </flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item :span="6" class="operation-item" v-if="level > 0">
            <flexbox :gutter="0">
              <flexbox-item :span="5" class='operation-img'>
                <img src="../../../assets/image/lowerLevel.png">
              </flexbox-item>
              <flexbox-item :span="7" class="operation-content">
                {{ $t("home.ecolog.operationTwoText") }}
              </flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
        <flexbox :gutter="5" style="margin-top: 5px;">
          <flexbox-item :span="6" class="operation-item" v-if="level > 1">
            <flexbox :gutter="0">
              <flexbox-item :span="5" class='operation-img'>
                <img src="../../../assets/image/middleLevel.png">
              </flexbox-item>
              <flexbox-item :span="7" class="operation-content">
                {{ $t("home.ecolog.operationThreeText") }}
              </flexbox-item>
            </flexbox>
          </flexbox-item>
          <flexbox-item :span="6" class="operation-item" v-if="level > 2">
            <flexbox :gutter="0">
              <flexbox-item :span="5" class='operation-img'>
                <img src="../../../assets/image/highLevel.png">
              </flexbox-item>
              <flexbox-item :span="7" class="operation-content">
                {{ $t("home.ecolog.operationFourText") }}
              </flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
      </div> -->
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
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Popup, TransferDom } from 'vux';
import Putin from './Putin.vue';
import Putout from './Putout.vue';
import auth from '../../../utils/auth.js';
import { mapState } from 'vuex'
const appModule = 'app';

export default {
  name: 'ecolog',
  components: {
    Flexbox,
    FlexboxItem,
    Popup,
    Putin,
    Putout
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
      level: 0,
      state: 0
    }
  },
  computed: {
    ...mapState(appModule, {
      ethPrice: state => state.ethPrice
    })
  },
  methods: {
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
    }
  },
  mounted() {
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