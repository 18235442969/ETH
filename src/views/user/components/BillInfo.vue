<template>
  <div class="billinfo">
    <flexbox :gutter="0" class="bill-all">
      <flexbox-item :span="6">
        <flexbox :gutter="0" orient="vertical">
          <flexbox-item :span="12" class="bill-title">
            {{ detailtype }}
          </flexbox-item>
          <flexbox-item :span="12" class="bill-time">
            {{ info.createtime }}
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item :span="6" class="bill-coin">
        <span v-if="info.detailtype == 1 || info.detailtype == 3 || info.detailtype == 4 || info.detailtype == 0 || info.detailtype == 7 || info.detailtype == 9">+</span>
        <span v-else>-</span>
        {{ info.amount }}
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';

export default {
  name: 'billinfo',
  components: {
    Flexbox,
    FlexboxItem
  },
  props: ['info', 'type'],
  data() {
    return {
    }
  },
  computed: {
    detailtype() {
      switch(Number(this.info.detailtype)) {
        case 0:
          return this.$t('home.user.bill.giftText');
          break;
        case 1:
          return this.$t('home.user.bill.topupText');
          break;
        case 2:
          return this.$t('home.user.bill.withdrawalText');
          break;
        case 3:
          return this.$t('home.user.bill.earningsText');
          break;
        case 4:
          return this.$t('home.user.bill.rewardText');
          break;
        case 5:
          return this.$t('home.user.bill.freezeText');
          break;
        case 6:
          return this.$t('home.user.bill.poundageText');
          break;
        case 7:
          return this.$t('home.user.bill.unfreezeText');
          break;
        case 8:
          return this.$t('home.user.bill.investmentText');
          break;
        case 9:
          return this.$t('home.user.bill.withdrawInvestmentText');
          break;
        default:
          return this.$t('home.user.bill.otherText');
          break;
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
  @import "../User.scss";
</style>