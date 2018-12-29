<template>
  <div class="putout">
    <div class="navbar">
      <flexbox :gutter="0">
        <flexbox-item :span="1" @click.native="clickLeft" class="left">
          <i class="icon iconfont icon-left-arrow"></i>
        </flexbox-item>
        <flexbox-item :span="10" class="center">
          {{ $t('appTitle.putOutTitle') }}
        </flexbox-item>
        <flexbox-item :span="1">
        </flexbox-item>
      </flexbox>
    </div>
    <div class="putout-list" v-show="list.length > 0" id="putout">
      <div class="putout-item" v-for="(i, index) in list" :key="index">
        <div class="putout-orderId">
          {{ $t("home.ecolog.putOut.orderIdText") }}：{{ i.id }}
        </div>
        <div class="item-container">
          <flexbox :gutter="0" class="putout-container">
            <flexbox-item :span="6">
              {{ $t("home.ecolog.putOut.amountText") }}：{{ i.amount }}ETH
            </flexbox-item>
            <flexbox-item :span="6" >
              {{ $t("home.ecolog.putOut.createtimeText") }}：{{ i.createtime.split(" ")[0] }}
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0" class="putout-container">
            <flexbox-item :span="6">
              {{ $t("home.ecolog.putOut.profitText") }}：{{i.profit}}ETH
            </flexbox-item>
            <flexbox-item :span="6" >
              {{ $t("home.ecolog.putOut.expirydateText") }}：{{ i.expirydate.split(" ")[0]}}
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0" class="putout-container borderBottom">
            <flexbox-item :span="6">
              {{ $t("home.ecolog.putOut.returnamtText") }}：{{i.returnamt }}ETH
            </flexbox-item>
            <flexbox-item :span="6" v-if="i.state != '0'">
              {{ $t("home.ecolog.putOut.freezeAmountText") }}：{{i.freeze.amount}}ETH
            </flexbox-item>
          </flexbox>
        </div>
        <div class="item-bottom">
          <flexbox :gutter="0">
            <flexbox-item :span="6">
              <span style="color: #4eae00;" v-if="i.state == '0'">{{ $t("home.ecolog.putOut.stateInText") }}</span>
              <span style="color: #e91500;" v-if="i.state == '1'">{{ $t("home.ecolog.putOut.stateFinishText") }}</span>
              <span style="color: #ee8500;" v-if="i.state == '2'">{{ $t("home.ecolog.putOut.stateOverText") }}</span>
            </flexbox-item>
            <flexbox-item :span="6" class="bottom-btn" v-if="i.state == 0">
              <button @click="clickPutOut(i)">{{ $t("home.ecolog.putOut.btnText") }}</button>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <load-more tip="loading" v-show="isMoreLoading"></load-more>
      <div style="padding: 30px 30px;font-size: 0.8rem;" v-show="list.length == 0">
        <divider>
          {{ $t("home.ecolog.putOut.noData") }}
        </divider>
      </div>
    </div>
  </div>
</template>


<script>
import { Flexbox, FlexboxItem, Divider, Confirm, LoadMore } from 'vux';
import { Navbar } from './Navbar.vue'
import md5 from 'js-md5';
import { getInvestSet, unInvest } from '../../../api/eth.js';

export default {
  name: 'putout',
  beforeDestroy () {
    this.bus.$off('getInvest');
  },
  components: {
    Flexbox,
    FlexboxItem,
    Navbar,
    Divider,
    Confirm,
    LoadMore
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
    clickLeft() {
      this.$emit('close');
    },
    /**
     * [getInvest 获取投资列表]
     */
    getInvest: async function() {
      try {
        let params = {
          pi: this.pageIndex
        }
        let res = await getInvestSet(params);
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
        }
      } catch(e) {
      }
    },
    /**
     * [clickPutOut 点击赎回]
     */
    clickPutOut: async function(order) {
      try {
        const that = this;
        this.$vux.confirm.show({
          title: that.$t("home.ecolog.putOut.passwordText"),
          showInput: true,
          placeholder: that.$t("home.ecolog.putOut.passwordPlaceholderText"),
          inputAttrs: {
            type: 'password',
            maxlength: 8
          },
          onConfirm (value) {
            if (that.valid.isStrEmpty(value)) {
              return that.vuxUtils.showWarn(that.$t("home.ecolog.putOut.passwordErrorText"));
            }
            that.submitPutout(value, order);
          }
        })
      } catch(e) {
      }
    },
    /**
     * [submitPutout 提交赎回]
     */
    submitPutout: async function(password, order) {
      try {
        let params = {
          id: order.id,
          pin: md5(md5(localStorage.getItem('password')) + md5(password))
        };
        this.$vux.loading.show();
        let res = await unInvest(params);
        this.$vux.loading.hide();
        if (res.data.succeed == 'true') {
          this.$emit('getBalance');
          this.bus.$emit('changeUserInfo');
          this.list.forEach((e, index) => {
            if (e.id == order.id) {
              let data = res.data.data;
              e.expirydate = data.expirydate;
              e.freeze = data.freeze;
              e.level = data.level;
              e.profit = data.profit;
              e.returnamt = data.returnamt;
              e.state = data.state;
            }
          })

          this.$vux.toast.show(this.$t('home.ecolog.putOut.submitSuccessText'));
        } else {
          this.vuxUtils.showWarn(this.$t("home.ecolog.putOut.passwordErrorText"));
        }
      } catch(e) {
        this.$vux.loading.hide();
        this.vuxUtils.showWarn(this.$t("home.ecolog.putOut.passwordErrorText"));
      }
    },
    /**
     * [initScroll 初始化滚动条加载]
     */
    initScroll() {
      //初始化滚动加载
      const that = this
      document.getElementById('putout').onscroll= function(){
        const bodyHeight = document.getElementById('putout').scrollHeight;
        const clientHeight = document.getElementById('putout').clientHeight;
        const scrollAllHeight = bodyHeight - clientHeight;
        const scrollTop = document.getElementById('putout').scrollTop;
        if ((scrollTop > 0) && (scrollAllHeight - scrollTop) < 10 && !that.isMoreLoading && !that.dividerIsShow) {
          that.isMoreLoading = true
          that.pageIndex++
          that.getInvest();
        }
      }
    },
  },
  mounted() {
    this.bus.$on('getInvest', () => {
      this.getInvest();
    });
    this.initScroll();
    this.getInvest();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>