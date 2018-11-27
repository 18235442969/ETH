<template>
  <div class="putin">
    <div class="navbar">
      <flexbox :gutter="0">
        <flexbox-item :span="1" @click.native="clickLeft" class="left">
          <i class="icon iconfont icon-left-arrow"></i>
        </flexbox-item>
        <flexbox-item :span="10" class="center">
          {{ $t('appTitle.putInTitle') }}
        </flexbox-item>
        <flexbox-item :span="1">
        </flexbox-item>
      </flexbox>
    </div>

    <flexbox :gutter="0" class="balabce">
      <flexbox-item :span="3" class="title">
        {{ $t("home.ecolog.putIn.balanceText") }}
      </flexbox-item>
      <flexbox-item :span="9" class="content">
        <h-input v-model="balance" inputClass="noline" :readonly="true"></h-input>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" class="number">
      <flexbox-item :span="3" class="title">
        {{ $t("home.ecolog.putIn.putInNumber") }}
      </flexbox-item>
      <flexbox-item :span="9" class="content">
        <h-input v-model="number" inputClass="noline" :max="15" :placeholder="$t('home.ecolog.putIn.putInNumberPlaveholderText')"></h-input>
      </flexbox-item>
    </flexbox>

    <flexbox :gutter="0" class="password">
      <flexbox-item :span="3" class="title">
        {{ $t("home.ecolog.putIn.password") }}
      </flexbox-item>
      <flexbox-item :span="9" class="content">
        <h-input v-model="password" inputClass="noline" type="password" :max="6" :placeholder="$t('home.ecolog.putIn.passwordPlaveholderText')"></h-input>
      </flexbox-item>
    </flexbox>

    <div class="putIn-button">
      <h-button @click.native="putIn">
        {{ $t("home.ecolog.putIn.putInBtnText") }}
      </h-button>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import { Navbar } from './Navbar.vue'
import HInput from '../../../components/HInput.vue';
import HButton from '../../../components/HButton.vue';
import md5 from 'js-md5';
import { setInvest } from '../../../api/eth.js';

export default {
  name: 'putin',
  components: {
    Flexbox,
    FlexboxItem,
    Navbar,
    HInput,
    HButton
  },
  props: ['amount'],
  data() {
    return {
      number: '',
      password: ''
    }
  },
  computed: {
    balance() {
      return this.amount + 'ETH';
    }
  },
  methods: {
    clickLeft() {
      this.$emit('close');
    },
    /**
     * [putIn 确认投入]
     */
    putIn() {
      if (Number(this.amount) == 0) {
        return this.vuxUtils.showWarn(this.$t('home.ecolog.putIn.balanceEmptyErrorText'));
      }
      if (this.valid.isStrEmpty(this.number)) {
        return this.vuxUtils.showWarn(this.$t('home.ecolog.putIn.putInNumberEmptyErrorText'));
      }
      if (this.valid.isStrEmpty(this.password)) {
        return this.vuxUtils.showWarn(this.$t('home.ecolog.putIn.passwordErrorText'));
      }
      let reg = /^[0-9]+.?[0-9]*$/;
      if (!reg.test(this.number)) {
        return this.vuxUtils.showWarn(this.$t('home.ecolog.putIn.putInNumberErrorText'));
      }
      if (Number(this.number) == 0) {
        return this.vuxUtils.showWarn(this.$t('home.ecolog.putIn.putInNumberZeroErrorText'));
      }
      if (Number(this.amount) < Number(this.number)) {
        return this.vuxUtils.showWarn(this.$t('home.ecolog.putIn.putInNumberBalanceErrorText'));
      }
      this.submitPutIn();
    },
    /**
     * [submitPutIn 提交投资]
     */
    submitPutIn: async function() {
      try {
        let params = {
          amt: this.number,
          pin: md5(md5(localStorage.getItem('password')) + md5(this.password))
        };
        let res = await setInvest(params);
        if (res.data.succeed == 'true') {
          this.$emit('getBalance');
          this.number = '';
          this.password = '';
          this.$vux.toast.show(this.$t('home.ecolog.putIn.submitSuccessText'));
        } else {
          this.vuxUtils.showWarn(this.$t('home.ecolog.putIn.submitErrorText'));
        }
      } catch(e) {
        this.vuxUtils.showWarn(this.$t('home.ecolog.putIn.submitErrorText'));
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