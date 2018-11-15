<template>
  <div class="ecolog">
    <img src="../../../assets/image/ecologBg.png" class="bg">
    <div class="container">
      <flexbox :gutter="0" class="ecolog-header">
        <flexbox-item :span="6" class="level">
          <i>Lv.{{level}}</i>
        </flexbox-item>
        <flexbox-item :span="6" class="activation">
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
          <button class="putInBtn">{{ $t("home.ecolog.putInBtnText") }}</button>
          <button class="putOutBtn">{{ $t("home.ecolog.putOutBtnText") }}</button>
        </div>
      </div>
      <div class="price">
        <flexbox :gutter="0">
          <flexbox-item :span="3" class="title">
            ETH
          </flexbox-item>
          <flexbox-item :span="9" class="num">
            ￥1454.25
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
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import auth from '../../../utils/auth.js';

export default {
  name: 'ecolog',
  components: {
    Flexbox,
    FlexboxItem
  },
  props: ['invest'],
  data() {
    return {
      level: 0
    }
  },
  computed: {
  },
  methods: {
  },
  mounted() {
    let userInfo =  JSON.parse(auth.getUserInfo());
    if (userInfo) {
      this.level = userInfo.level;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>