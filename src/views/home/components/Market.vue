<template>
  <div class="market">
    <div class="markey-header">
      {{ $t("appTitle.marketTitle") }}
    </div>
    <flexbox :gutter="0" class="market-item">
      <flexbox-item :span="1.5" class="market-name">
        ETH
      </flexbox-item>
      <flexbox-item :span="5.5" class="market-price">
        <span class="rose">￥1980.1212</span>
        <!-- <span class="fall">￥1980.1212</span> -->
      </flexbox-item>
      <flexbox-item :span="5" class="market-time">
        2018-12-30 09:55
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';

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