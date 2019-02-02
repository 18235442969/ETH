<template>
  <div class="payPassword">
    <flexbox :gutter="0" class="payPassword-phone">
      <flexbox-item :span="2" class="payPassword-icon">
        <i class="icon iconfont icon-shouji1"></i>
      </flexbox-item>
      <flexbox-item :span="10">
        <h-input :placeholder="$t('home.user.payPassword.payPasswordUsernamePlaceholder')" inputClass="noline" type="text" v-model="username" :max="30"></h-input>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" class="payPassword-code">
      <flexbox-item :span="2" class="payPassword-icon">
        <i class="icon iconfont icon-yanzhengma"></i>
      </flexbox-item>
      <flexbox-item :span="6">
        <h-input :placeholder="$t('home.user.payPassword.payPasswordCodePlaceholder')" inputClass="noline" type="text" v-model="code" :max="8"></h-input>
      </flexbox-item>
      <flexbox-item :span="4" class="codeBtn" @click.native="sendCode($event)">
        {{ $t("home.user.payPassword.payPasswordCodeText") }}
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" class="payPassword-password">
      <flexbox-item :span="2" class="payPassword-icon">
        <i class="icon iconfont icon-suo"></i>
      </flexbox-item>
      <flexbox-item :span="10">
        <h-input :placeholder="$t('home.user.payPassword.payPasswordPasswordPlaceholder')" inputClass="noline" type="password" v-model="password" :max="6"></h-input>
      </flexbox-item>
    </flexbox>
    <div class="payPassword-btn">
      <h-button @click.native="setPayPassword">{{ $t("base.confirmBtn") }}</h-button>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import HInput from '../../components/HInput.vue';
import HButton from '../../components/HButton.vue';
import { sendCode, setPin } from '../../api/user.js';
export default {
  name: 'payPassword',
  components: {
    Flexbox,
    FlexboxItem,
    HInput,
    HButton
  },
  data() {
    return {
      isCodeSend: false,
      username: '',
      code: '',
      password: ''
    }
  },
  computed: {
  },
  methods: {
    /**
     * [_countdown 验证码倒计时]
     */
    _countdown (e) {
      let element = e.target;
      let num = 60;
      var timer = setInterval(() => {
        num--;
        element.innerHTML = `${num} s`;
        element.style.color = '#9e9e9e'
        if (num === 0) {
          element.style.color = '#0c5fcc';
          element.innerHTML = this.$t('home.user.payPassword.payPasswordCodeText');
          this.isCodeSend = false;
          clearInterval(timer);
        }
      }, 1000);
    },
    /**
     * [发送验证码]
     */
    sendCode: async function(e) {
      try {
        if (this.isCodeSend) {
          return;
        }
        if (this.valid.isStrEmpty(this.username)) {
          return this.vuxUtils.showWarn(this.$t('home.user.payPassword.usernameWarnText'));
        }
        this.$vux.loading.show();
        let res = await sendCode({
          mob: this.username
        });
        this.$vux.loading.hide();
        if (res.data.succeed == 'true') {
          this.$vux.toast.show(this.$t('base.codeHasSend'));
          this._countdown(e);
          this.isCodeSend = true;
          this.code = res.data.data;
        } else {
          this.vuxUtils.apiError(this, res.data, this.$t('base.codeSendError'));
        }
      } catch(e) {
        this.$vux.loading.hide();
        this.vuxUtils.showWarn(this.$t('base.codeSendError'));

      }
    },
    /**
     * [设置交易密码]
     */
    setPayPassword: async function() {
      try {
        if (this.valid.isStrEmpty(this.username)) {
          return this.vuxUtils.showWarn(this.$t('home.user.payPassword.usernameWarnText'));
        }
        if (this.valid.isStrEmpty(this.code)) {
          return this.vuxUtils.showWarn(this.$t('home.user.payPassword.codeWarnText'));
        }
        if (this.valid.isStrEmpty(this.password)) {
          return this.vuxUtils.showWarn(this.$t('home.user.payPassword.passwordWarnText'));
        }
        const params = {
          pin: this.password,
          mob: this.username,
          code: this.code
        }
        this.$vux.loading.show();
        let res = await setPin(params);
        this.$vux.loading.hide();
        if (res.data.succeed == 'true') {
          this.$vux.toast.show(this.$t('home.user.payPassword.setSuccess'));
          this.code = '';
          this.username = '';
          this.password = '';
        } else {
          this.vuxUtils.apiError(this, res.data, this.$t('home.user.payPassword.setError'));
        }
      } catch(e) {
        this.$vux.loading.hide();
        this.vuxUtils.showWarn(this.$t('home.user.payPassword.setError'));
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./User.scss";
</style>