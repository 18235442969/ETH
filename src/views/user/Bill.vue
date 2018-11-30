<template>
  <div class="bill">
    <div style="background-color: #f5f4f7;height: 10px;">
    </div>
    <div class="bill-tab">
      <flexbox :gutter="0">
        <flexbox-item class="tab-item" :class="{choose: tabIndex == 333}" @click.native="changeTab(333)">
          {{ $t("home.user.bill.allText") }}
        </flexbox-item>
        <flexbox-item class="tab-item" :class="{choose: tabIndex == 1}" @click.native="changeTab(1)">
          {{ $t("home.user.bill.topupText") }}
        </flexbox-item>
        <flexbox-item class="tab-item" :class="{choose: tabIndex == 2}" @click.native="changeTab(2)">
          {{ $t("home.user.bill.withdrawalText") }}
        </flexbox-item>
        <flexbox-item class="tab-item" :class="{choose: tabIndex == 3}" @click.native="changeTab(3)">
          {{ $t("home.user.bill.earningsText") }}
        </flexbox-item>
        <flexbox-item class="tab-item" :class="{choose: tabIndex == 4}" @click.native="changeTab(4)">
          {{ $t("home.user.bill.rewardText") }}
        </flexbox-item>
        <flexbox-item class="tab-item" :class="{choose: tabIndex == 8}" @click.native="changeTab(8)">
          {{ $t("home.user.bill.investmentText") }}
        </flexbox-item>
        <flexbox-item class="tab-item" :class="{choose: tabIndex == 5}" @click.native="changeTab(5)">
          {{ $t("home.user.bill.freezeText") }}
        </flexbox-item>
      </flexbox>
    </div>
    <div style="background-color: #f5f4f7;height: 10px;">
    </div>
    <div class="bill-container" id="container">
      <div v-show="tabIndex == 333">
        <bill-info v-for="(i, index) in allList" :key="index" :info="i"></bill-info>
      </div>
      <div v-show="tabIndex == 1">
        <bill-info v-for="(i, index) in intoList" :key="index" :info="i"></bill-info>
      </div>
      <div v-show="tabIndex == 2">
        <bill-info v-for="(i, index) in rolloutList" :key="index" :info="i"></bill-info>
      </div>
      <div v-show="tabIndex == 3">
        <bill-info v-for="(i, index) in earningsList" :key="index" :info="i"></bill-info>
      </div>
      <div v-show="tabIndex == 4">
        <bill-info v-for="(i, index) in rewardList" :key="index" :info="i"></bill-info>
      </div>
      <div v-show="tabIndex == 8">
        <bill-info v-for="(i, index) in spendingList" :key="index" :info="i"></bill-info>
      </div>
      <div v-show="tabIndex == 5">
        <bill-info v-for="(i, index) in freezeList" :key="index" :info="i"></bill-info>
      </div>
      <load-more tip="loading" v-show="allIsMoreLoading || intoIsMoreLoading || rolloutIsMoreLoading || earningsIsMoreLoading || rewardIsMoreLoading || spendingIsMoreLoading || freezeIsMoreLoading"></load-more>
      <div style="padding: 30px 30px;font-size: 0.8rem;" v-show="isDiverShow">
        <divider>
          {{ $t("home.user.bill.noData") }}
        </divider>
      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, LoadMore, Divider } from 'vux';
import BillInfo from './components/BillInfo.vue';
import { getDetail } from '../../api/user.js';

export default {
  name: 'bill',
  components: {
    Flexbox,
    FlexboxItem,
    LoadMore,
    Divider,
    BillInfo
  },
  data() {
    return {
      type: [{
        value: 'all',
        key: 333
      },{
        value: 'into',
        key: 1
      },{
        value: 'rollout',
        key: 2
      },{
        value: 'earnings',
        key: 3
      },{
        value: 'reward',
        key: 4
      },{
        value: 'spending',
        key: 8
      },{
        value: 'freeze',
        key: 5
      }],
      tabIndex: 333,
      allPageIndex: 1,
      intoPageIndex: 1,
      rolloutPageIndex: 1,
      earningsPageIndex: 1,
      rewardPageIndex: 1,
      spendingPageIndex: 1,
      freezePageIndex: 1,
      allList: [],
      intoList: [],
      rolloutList: [],
      earningsList: [],
      rewardList: [],
      spendingList: [],
      freezeList: [],
      allIsMoreLoading: false,
      intoIsMoreLoading: false,
      rolloutIsMoreLoading: false,
      earningsIsMoreLoading: false,
      rewardIsMoreLoading: false,
      spendingIsMoreLoading: false,
      freezeIsMoreLoading: false,
      allDividerIsShow: false,
      intoDividerIsShow: false,
      rolloutDividerIsShow: false,
      earningsDividerIsShow: false,
      rewardDividerIsShow: false,
      spendingDividerIsShow: false,
      freezeDividerIsShow: false,
      allScroll: 0,
      intoScroll: 0,
      rolloutScroll: 0,
      earningsScroll: 0,
      rewardScroll: 0,
      spendingScroll: 0,
      freezeScroll: 0,
    }
  },
  computed: {
    isDiverShow() {
      let page = this.type.find(e => e.key == this.tabIndex).value;
      return this[`${page}List`].length == 0;
    }
  },
  methods: {
    /**
     * [changeTab 改变tab]
     * @param  {[Number]} index [类型索引]
     */
    changeTab(index) {
      let page = this.type.find(e => e.key == this.tabIndex).value;
      const scrollTop = document.getElementById('container').scrollTop;
      this[`${page}Scroll`] = scrollTop;
      this.tabIndex = index;
      page = this.type.find(e => e.key == this.tabIndex).value;
      this.$nextTick(() => {
        document.getElementById('container').scrollTop = this[`${page}Scroll`];
        this.initScroll();
        if (this[`${page}List`].length == 0) {
          this.getBill();
        }
      })
    },
    /**
     * [getBill 获取账单]
     */
    getBill: async function() {
      let page = this.type.find(e => e.key == this.tabIndex).value;
      try {
        let params = {
          pi: this[`${page}PageIndex`]
        }
        if (this.tabIndex != 333) {
          params.type = this.tabIndex;
        }
        let res = await getDetail(params);
        if (res.data.succeed == 'true') {
          let data = res.data.data;
          if (data.list.length == 0) {
            this[`${page}DividerIsShow`] = true;
          }
          this[`${page}IsMoreLoading`] = false;
          if (this[`${page}PageIndex`] == 1) {
            this[`${page}List`] = data.list;
          } else {
            this[`${page}List`] = this[`${page}List`].concat(data.list);
          }
        } else {
          this.vuxUtils.showWarn(this.$t('home.user.bill.errorText'));
        }
      } catch(e) {
        this.vuxUtils.showWarn(this.$t('home.user.bill.errorText'));
      }
    },
    /**
     * [initScroll 初始化滚动条加载]
     */
    initScroll() {
      //初始化滚动加载
      let page = this.type.find(e => e.key == this.tabIndex).value;
      const that = this;
      document.getElementById('container').onscroll= function(){
        const bodyHeight = document.getElementById('container').scrollHeight;
        const clientHeight = document.getElementById('container').clientHeight;
        const scrollAllHeight = bodyHeight - clientHeight;
        const scrollTop = document.getElementById('container').scrollTop;
        if ((scrollTop > 0) && (scrollAllHeight - scrollTop) < 10 && !that[`${page}IsMoreLoading`] && !that[`${page}DividerIsShow`]) {
          that[`${page}IsMoreLoading`] = true
          that[`${page}PageIndex`]++
          that.getBill();
        }
      }
    },
  },
  mounted() {
    this.initScroll();
    this.getBill();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./User.scss";
</style>