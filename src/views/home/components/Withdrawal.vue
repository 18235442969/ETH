<template>
  <div class="withdrawal">
    <div class="navbar">
      <flexbox :gutter="0">
        <flexbox-item :span="1" @click.native="clickLeft" class="left">
          <i class="icon iconfont icon-left-arrow"></i>
        </flexbox-item>
        <flexbox-item :span="10" class="center">
          {{ $t('appTitle.withdrawalTitle') }}
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
          {{ $t("home.user.withdrawal.addressText") }}
        </flexbox-item>
        <flexbox-item :span="9">
          <h-input inputClass="noline" :max="60" v-model="address" :placeholder="$t('home.user.withdrawal.addressPlaceholderText')"></h-input>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0" class="withdrawal-list">
        <flexbox-item :span="3" class="withdrawal-title">
          {{ $t("home.user.withdrawal.numberText") }}
        </flexbox-item>
        <flexbox-item :span="9">
          <h-input inputClass="noline" :max="15" v-model="number" :placeholder="$t('home.user.withdrawal.numberPlaceholderText')"></h-input>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0" class="withdrawal-list">
        <flexbox-item :span="3" class="withdrawal-title">
          {{ $t("home.user.withdrawal.passwordText") }}
        </flexbox-item>
        <flexbox-item :span="9">
          <h-input inputClass="noline" :max="8" v-model="password" :placeholder="$t('home.user.withdrawal.passwordPlaceholderText')"></h-input>
        </flexbox-item>
      </flexbox>
      <!-- <flexbox :gutter="0" class="withdrawal-list">
        <flexbox-item :span="12" class="withdrawal-remark">
          <h-input inputClass="noline" :max="20" v-model="remark" :placeholder="$t('home.user.withdrawal.remarkPlaceholderText')"></h-input>
        </flexbox-item>
      </flexbox> -->
      <div class="withdrawal-btn">
        <h-button @click.native="submitWithdrawal">
          {{ $t("home.user.withdrawal.btnText") }}
        </h-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import { Navbar } from './Navbar.vue';
import HInput from '../../../components/HInput.vue';
import HButton from '../../../components/HButton.vue';
import { cashout } from '../../../api/eth.js';

export default {
  name: 'withdrawal',
  components: {
    Flexbox,
    FlexboxItem,
    Navbar,
    HInput,
    HButton
  },
  data() {
    return {
      address: '',
      number: '',
      password: '',
      remark: ''
    }
  },
  computed: {
  },
  methods: {
    clickLeft() {
      this.$emit('close');
    },
    /**
     * [submitWithdrawal 提现]
     */
    submitWithdrawal: async function() {
      try {
        if (this.valid.isStrEmpty(this.address)) {
          return this.vuxUtils.showWarn(this.$t('home.user.withdrawal.addressWarnText'));
        }
        if (this.valid.isStrEmpty(this.number)) {
          return this.vuxUtils.showWarn(this.$t('home.user.withdrawal.numberWarnText'));
        }
        if (this.valid.isStrEmpty(this.password)) {
          return this.vuxUtils.showWarn(this.$t('home.user.withdrawal.passwordWarnText'));
        }
        let params = {
          amt: this.number,
          acc: this.address,
          pin: md5(md5(localStorage.getItem('password')) + md5(this.password))
        };
        let res = await cashout(params);
        if (res.data.success == 'true') {
          this.$vux.toast.show(this.$t('home.user.withdrawal.successText'));
        } else {
          return this.vuxUtils.showWarn(this.$t('home.user.withdrawal.failText'));
        }
      } catch(e) {
        return this.vuxUtils.showWarn(this.$t('home.user.withdrawal.failText'));
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