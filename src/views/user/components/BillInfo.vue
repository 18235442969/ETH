<template>
  <div class="billinfo">
    <flexbox :gutter="0" class="bill-all">
      <flexbox-item :span="6">
        <flexbox :gutter="0" orient="vertical">
          <flexbox-item :span="12" class="bill-title">
            {{ detailtype }}
            <span v-if="info.detailtype == '4' && info.remark">
              （{{info.remark}}）
            </span>
          </flexbox-item>
          <flexbox-item :span="12" class="bill-time">
            {{ info.createtime }}
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item :span="6" class="bill-coin">
        <span v-if="info.detailtype == 1 || info.detailtype == 3 || info.detailtype == 4 || info.detailtype == 0 || info.detailtype == 7 || info.detailtype == 9 || info.detailtype == 10">+</span>
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
      let typeList = ['giftText', 'topupText', 'withdrawalText', 'earningsText', 'rewardText', 'freezeText', 'poundageText', 'unfreezeText', 'investmentText', 'withdrawInvestmentText', 'transferIn', 'transferOut', 'otherText'];
      return this.$t(`home.user.bill.${typeList[Number(this.info.detailtype)]}`);
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