<template>
  <div class="market">
    <div class="markey-header">
      {{ $t("appTitle.marketTitle") }}
    </div>
    <flexbox :gutter="0" class="market-item">
      <flexbox-item :span="1.5" class="market-name">
        ETH
      </flexbox-item>
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="1.5" class="market-icon">
        <i class="icon iconfont icon-zhangdiefuzhang" style="color: #ee4343;" v-if="ethChange > 0"></i>
        <i class="icon iconfont icon-zhangdiefudie" style="color: #3bb46e;" v-if="ethChange < 0"></i>
      </flexbox-item>
      <flexbox-item :span="6" class="market-price">
        <span>￥{{ethPrice}}</span>
        <!-- <span class="rose">￥{{ethPrice}}</span> -->
        <!-- <span class="fall">￥1980.1212</span> -->
      </flexbox-item>
      <!-- <flexbox-item :span="5" class="market-time">
      </flexbox-item> -->
    </flexbox>
    <flexbox :gutter="0" class="market-item">
      <flexbox-item :span="1.5" class="market-name">
        BTC
      </flexbox-item>
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="1.5" class="market-icon">
        <i class="icon iconfont icon-zhangdiefuzhang" style="color: #ee4343;" v-if="btcChange > 0"></i>
        <i class="icon iconfont icon-zhangdiefudie" style="color: #3bb46e;" v-if="btcChange < 0"></i>
      </flexbox-item>
      <flexbox-item :span="6" class="market-price">
        <span>￥{{btcPrice}}</span>
        <!-- <span class="rose">￥{{btcPrice}}</span> -->
        <!-- <span class="fall">￥1980.1212</span> -->
      </flexbox-item>
      <!-- <flexbox-item :span="5" class="market-time">
      </flexbox-item> -->
    </flexbox>
    <flexbox :gutter="0" class="market-item">
      <flexbox-item :span="1.5" class="market-name">
        EOS
      </flexbox-item>
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="1.5" class="market-icon">
        <i class="icon iconfont icon-zhangdiefuzhang" style="color: #ee4343;" v-if="ethChange > 0"></i>
        <i class="icon iconfont icon-zhangdiefudie" style="color: #3bb46e;" v-if="ethChange < 0"></i>
      </flexbox-item>
      <flexbox-item :span="6" class="market-price">
        <span>￥{{eocPrice}}</span>
        <!-- <span class="rose">￥{{eocPrice}}</span> -->
        <!-- <span class="fall">￥1980.1212</span> -->
      </flexbox-item>
      <!-- <flexbox-item :span="5" class="market-time">
      </flexbox-item> -->
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import { mapState } from 'vuex'
const appModule = 'app';

export default {
  name: 'market',
  components: {
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
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
    },
    btcPrice() {
      let data = this.coinPrice.find(e => e.currency == '1');
      if (data) {
        return data.amount;
      } else {
        return 0;
      }
    },
    eocPrice() {
      let data = this.coinPrice.find(e => e.currency == '2');
      if (data) {
        return data.amount;
      } else {
        return 0;
      }
    },
    ethChange() {
      let data = this.coinPrice.find(e => e.currency == '0');
      if (data) {
        return Number(data.amount);
      } else {
        return 0;
      }
    },
    btcChange() {
      let data = this.coinPrice.find(e => e.currency == '1');
      if (data) {
        return Number(data.change);
      } else {
        return 0;
      }
    },
    eocChange() {
      let data = this.coinPrice.find(e => e.currency == '2');
      if (data) {
        return Number(data.change);
      } else {
        return 0;
      }
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>