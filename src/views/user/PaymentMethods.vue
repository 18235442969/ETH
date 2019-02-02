<template>
  <div class="paymentMethods">
    <flexbox :gutter="0" class="alipay">
      <flexbox-item :span="3" class="title">
        {{ $t("home.user.paymentMethods.alipayText") }}
      </flexbox-item>
      <flexbox-item :span="9">
        <h-input type="text" :max="20" inputClass="noline" v-model="alipay" :placeholder="$t('home.user.paymentMethods.alipayPlaceholder')" :readonly="isSetAlipay"></h-input>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" class="wechat">
      <flexbox-item :span="3" class="title">
        {{ $t("home.user.paymentMethods.wechatText") }}
      </flexbox-item>
      <flexbox-item :span="9">
        <h-input type="text" :max="20" inputClass="noline" :placeholder="$t('home.user.paymentMethods.wechatPlaceholder')" v-model="wechat" :readonly="isSetWechat"></h-input>
      </flexbox-item>
    </flexbox>
    <div class="bank">
      <div class="tips">
        ●{{ $t("home.user.paymentMethods.tipsOneText") }}
      </div>
      <flexbox :gutter="0" class="bankName">
        <flexbox-item :span="3" class="title">
          {{ $t("home.user.paymentMethods.bankText") }}
        </flexbox-item>
        <flexbox-item :span="9">
          <h-input type="text" :max="30" inputClass="noline" v-model="bank" :placeholder="$t('home.user.paymentMethods.bankPlaceholder')" :readonly="isSetCardno"></h-input>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0" class="cardno">
        <flexbox-item :span="3" class="title">
          {{ $t("home.user.paymentMethods.cardnoText") }}
        </flexbox-item>
        <flexbox-item :span="9">
          <h-input type="text" :max="30" inputClass="noline" v-model="cardno" :placeholder="$t('home.user.paymentMethods.cardnoPlaceholder')" :readonly="isSetCardno"></h-input>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0" class="name">
        <flexbox-item :span="3" class="title">
          {{ $t("home.user.paymentMethods.nameText") }}
        </flexbox-item>
        <flexbox-item :span="9">
          <h-input type="text" :max="10" inputClass="noline" v-model="name" :placeholder="$t('home.user.paymentMethods.namePlaceholder')" :readonly="isSetCardno"></h-input>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0" class="phone">
        <flexbox-item :span="3" class="title">
          {{ $t("home.user.paymentMethods.phoneText") }}
        </flexbox-item>
        <flexbox-item :span="9">
          <h-input type="text" :max="15" inputClass="noline" v-model="phone" :placeholder="$t('home.user.paymentMethods.phonePlaceholder')" :readonly="isSetCardno"></h-input>
        </flexbox-item>
      </flexbox>
      <div class="tips">
        ●{{ $t("home.user.paymentMethods.tipsTwoText") }}
      </div>
    </div>
    <div class="botton" v-if="isButtonShow">
      <h-button @click.native="changePaymentMethods">{{ $t('base.confirmBtn') }}</h-button>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import HInput from '../../components/HInput.vue';
import HButton from '../../components/HButton.vue';
import auth from '../../utils/auth.js';
import { setUsertInfo } from '../../api/user.js';

export default {
  name: 'paymentMethods',
  components: {
    Flexbox,
    FlexboxItem,
    HInput,
    HButton
  },
  data() {
    return {
      wechat: '',
      alipay: '',
      bank: '',
      cardno: '',
      name: '',
      phone: '',
      isSetWechat: false,
      isSetAlipay: false,
      isSetCardno: false,
    }
  },
  computed: {
    isButtonShow() {
      return !this.isSetWechat || !this.isSetAlipay || !this.isSetCardno
    }
  },
  methods: {
    /**
     * [changePaymentMethods 修改收款方式]
     */
    changePaymentMethods: async function() {
      try {
        //未设置的账户信息
        let accountArr = [];
        if (!this.isSetWechat) {
          accountArr.push(this.wechat)
        }
        if (!this.isSetAlipay) {
          accountArr.push(this.alipay)
        }
        if (!this.isSetCardno) {
          accountArr.push(this.cardno)
        }
        //未填写内容的账户信息
        let filterAccountArr = accountArr.filter((e) => {
          return e.trim() == '';
        })
        //判断用户是否一个账户信息都没有填写
        if (filterAccountArr.length == accountArr.length) {
          return this.vuxUtils.showWarn(this.$t('home.user.paymentMethods.accountWarnText'))
        };
        let params = {};
        if (!this.isSetCardno) {
          let arr = [];
          arr.push(this.bank);
          arr.push(this.cardno);
          arr.push(this.name);
          arr.push(this.phone);
          let emptyArr = arr.filter(e => e.trim() != '');
          if (emptyArr.length > 0 && emptyArr.length < 3) {
            return this.vuxUtils.showWarn(this.$t('home.user.paymentMethods.cardnoWarnText'))
          }
          if (emptyArr.length == 4) {
            params.bank = this.bank;
            params.card = this.cardno;
            params.acc = this.name;
            params.bankmob = this.phone;
          }
        }
        if (!this.isSetWechat && !this.valid.isStrEmpty(this.wechat)) {
          params.wechat = this.wechat;
        }
        if (!this.isSetAlipay && !this.valid.isStrEmpty(this.alipay)) {
          params.alipay = this.alipay;
        }
        this.$vux.loading.show();
        let res = await setUsertInfo(params);
        this.$vux.loading.hide();
        if (res.data.succeed == 'true') {
          let data = res.data.data;
          let userInfo = JSON.parse(auth.getUserInfo());
          for (let i in params) {
            if (i == 'wechat') {
              this.isSetWechat = true;
              userInfo.wechat = data.wechat;
            }
            if (i == 'alipay') {
              this.isSetAlipay = true;
              userInfo.alipay = data.alipay;
            }
            if (i == 'card') {
              this.isSetCardno = true;
              userInfo.bank = data.bank;
              userInfo.cardno = data.cardno;
              userInfo.account = data.account;
              userInfo.bankmob = data.bankmob;
            }
          }
          auth.setUserInfo(JSON.stringify(userInfo));
        } else {
          this.$vux.loading.hide();
          this.vuxUtils.apiError(this, res.data, this.$t('home.user.paymentMethods.settingWarnText'));
        }
      } catch(e) {
        this.$vux.loading.hide();
        this.vuxUtils.showWarn(this.$t('home.user.paymentMethods.settingWarnText'));
      }
    }
  },
  mounted() {
    let userInfo = JSON.parse(auth.getUserInfo());
    if (userInfo) {
      if (userInfo.wechat) {
        this.wechat = userInfo.wechat;
        this.isSetWechat = true;
      }
      if (userInfo.alipay) {
        this.alipay = userInfo.alipay;
        this.isSetAlipay = true;
      }
      this.bank = userInfo.bank ? userInfo.bank : '';
      this.cardno = userInfo.cardno ? userInfo.cardno : '';
      this.name = userInfo.account ? userInfo.account : '';
      this.phone = userInfo.bankmob ? userInfo.bankmob : '';
      if (userInfo.bank && userInfo.cardno && userInfo.account && userInfo.bankmob) {
        this.isSetCardno = true;
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./User.scss";
</style>