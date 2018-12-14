<template>
  <div class="topup">
    <div class="navbar">
      <flexbox :gutter="0">
        <flexbox-item :span="1" @click.native="clickLeft" class="left">
          <i class="icon iconfont icon-left-arrow"></i>
        </flexbox-item>
        <flexbox-item :span="10" class="center">
          {{ $t('appTitle.topUpTitle') }}
        </flexbox-item>
        <flexbox-item :span="1">
        </flexbox-item>
      </flexbox>
    </div>
    <div style="background-color: #f5f4f7;height: 10px;">
    </div>
    <div>
      <flexbox :gutter="0" class="withdrawal-list">
        <flexbox-item :span="3" class="withdrawal-title">
          {{ $t("home.user.topUp.addressText") }}
        </flexbox-item>
        <flexbox-item :span="9">
          <h-input inputClass="noline" :max="60" v-model="myAddress" :placeholder="$t('home.user.topUp.addressPlaceholderText')"></h-input>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0" class="withdrawal-list">
        <flexbox-item :span="3" class="withdrawal-title">
          {{ $t("home.user.topUp.numberText") }}
        </flexbox-item>
        <flexbox-item :span="9">
          <h-input inputClass="noline" :max="15" v-model="number" :placeholder="$t('home.user.topUp.numberPlaceholderText')"></h-input>
        </flexbox-item>
      </flexbox>
      <div class="putupBtn">
        <h-button @click.native="submitTopup">
          {{ $t("home.user.topUp.btnText") }}
        </h-button>
      </div>
    </div>
    <div style="background-color: #f5f4f7;height: 10px;" v-if="address.trim() != ''">
    </div>
    <div v-if="address.trim() != ''">
      <div class="topup-title">
        {{ $t("home.user.topUp.titleText") }}
      </div>
      <div class="topup-address">
        {{address}}
      </div>
      <div class="topup-button">
        <button v-clipboard:copy="address" v-clipboard:success="onCopy" v-clipboard:error="onError">
          {{ $t("home.user.topUp.copyBtnText") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import { Navbar } from './Navbar.vue';
import HInput from '../../../components/HInput.vue';
import HButton from '../../../components/HButton.vue';
import { cashin } from '../../../api/eth.js';

export default {
  name: 'topup',
  components: {
    Flexbox,
    FlexboxItem,
    Navbar,
    HInput,
    HButton
  },
  data() {
    return {
      myAddress: '',
      number: '',
      address: '',
    }
  },
  computed: {
  },
  methods: {
    clickLeft() {
      this.myAddress = '';
      this.number = '';
      this.$emit('close');
    },
    onCopy() {
      this.$vux.toast.show({
        type: "success",
        text: this.$t('home.user.topUp.copySuccessText'),
        time: 1000
      })
    },
    onError() {
      this.vuxUtils.showWarn(this.$t('home.user.topUp.copyFailText'));
    },
    /**
     * [submitTopup 提交充币]
     */
    submitTopup: async function() {
      try {
        if (this.valid.isStrEmpty(this.myAddress)) {
          return this.vuxUtils.showWarn(this.$t('home.user.topUp.addressWarnText'));
        }
        if (this.valid.isStrEmpty(this.number)) {
          return this.vuxUtils.showWarn(this.$t('home.user.topUp.numberWarnText'));
        }
        this.$vux.loading.show();
        let params = {
          amt: this.number,
          addr: this.myAddress
        };
        let res = await cashin(params);
        this.$vux.loading.hide();
        if (res.data.succeed == 'true') {
          this.myAddress = '';
          this.number = '';
          this.address = res.data.data.address;
          this.$vux.toast.show(this.$t('home.user.topUp.successText'));
        } else {
          return this.vuxUtils.showWarn(this.$t('home.user.topUp.failText'));
        }
      } catch(e) {
        this.$vux.loading.hide();
        return this.vuxUtils.showWarn(this.$t('home.user.topUp.failText'));
      }
    }
  },
  mounted() {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>