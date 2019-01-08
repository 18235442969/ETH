<template>
  <div class="revenueBill" id="revenueBill">
    <div style="background-color: #f5f4f7;height: 10px;"></div>
    <bill-info v-for="(i, index) in list" :key="index" :info="i"></bill-info>
    <load-more tip="loading" v-show="isMoreLoading"></load-more>
    <div style="padding: 30px 30px;font-size: 0.8rem;" v-show="list.length == 0">
      <divider>
        {{ $t("home.user.bill.noData") }}
      </divider>
    </div>
  </div>
</template>

<script>
import { LoadMore, Divider } from 'vux';
import BillInfo from '../user/components/BillInfo.vue';
import { getDetail } from '../../api/user.js';
export default {
  name: 'revenueBill',
  components: {
    LoadMore,
    Divider,
    BillInfo
  },
  data() {
    return {
      pageIndex: 1,
      isMoreLoading: false,
      dividerIsShow: false,
      list: []
    }
  },
  computed: {
  },
  methods: {
    /**
     * [getBill 获取账单]
     */
    getBill: async function() {
      try {
        let params = {
          pi: this.pageIndex,
          type: '3'
        }
        let res = await getDetail(params);
        if (res.data.succeed == 'true') {
          let data = res.data.data;
          if (data.list.length == 0) {
            this.dividerIsShow = true;
          }
          this.isMoreLoading = false;
          if (this.pageIndex == 1) {
            this.list = data.list;
          } else {
            this.list = this.list.concat(data.list);
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
      const that = this;
      document.getElementById('revenueBill').onscroll= function(){
        const bodyHeight = document.getElementById('revenueBill').scrollHeight;
        const clientHeight = document.getElementById('revenueBill').clientHeight;
        const scrollAllHeight = bodyHeight - clientHeight;
        const scrollTop = document.getElementById('revenueBill').scrollTop;
        if ((scrollTop > 0) && (scrollAllHeight - scrollTop) < 10 && !that.isMoreLoading && !that.dividerIsShow) {
          that.isMoreLoading = true;
          that.pageIndex++;
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
  @import "./Home.scss"
</style>