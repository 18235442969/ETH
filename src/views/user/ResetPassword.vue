<template>
  <div class="resetPassword">
    <flexbox :gutter="0" @click.native="chooseCountry" class="phoneType">
      <flexbox-item :span="11">
        <div class="inputHeight">
          {{country}}
        </div>
      </flexbox-item>
      <flexbox-item :span="1" class="alignRight">
        <div class="inputHeight">
          <i class="icon iconfont icon-jiantou"></i>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" class="resetPassword-phone">
      <flexbox-item :span="2" class="resetPassword-icon">
        <i class="icon iconfont icon-shouji1"></i>
      </flexbox-item>
      <flexbox-item :span="10">
        <h-input :placeholder="$t('home.user.resetPassword.changePasswordUsernamePlaceholder')" inputClass="noline" type="text" v-model="username" :max="30"></h-input>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" class="resetPassword-code">
      <flexbox-item :span="2" class="resetPassword-icon">
        <i class="icon iconfont icon-yanzhengma"></i>
      </flexbox-item>
      <flexbox-item :span="6">
        <h-input :placeholder="$t('home.user.resetPassword.changePasswordCodePlaceholder')" inputClass="noline" type="text" v-model="code" :max="8"></h-input>
      </flexbox-item>
      <flexbox-item :span="4" class="codeBtn" @click.native="sendCode($event)">
        {{ $t("home.user.resetPassword.changePasswordCodeText") }}
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" class="resetPassword-password">
      <flexbox-item :span="2" class="resetPassword-icon">
        <i class="icon iconfont icon-suo"></i>
      </flexbox-item>
      <flexbox-item :span="10">
        <h-input :placeholder="$t('home.user.resetPassword.changePasswordPasswordPlaceholder')" inputClass="noline" type="password" v-model="password" :max="30"></h-input>
      </flexbox-item>
    </flexbox>
    <div class="resetPassword-btn">
      <h-button @click.native="changePassword">{{ $t("base.confirmBtn") }}</h-button>
    </div>
    <div v-transfer-dom>
      <popup v-model="phoneChooseShow">
        <popup-header :right-text="$t('base.confirmBtn')" :title="$t('registe.phoneCountryPlaceholder')" :show-bottom-border="false" @on-click-right="phoneChooseShow = false"></popup-header>
        <group gutter="0">
          <radio :options="phoneCountryList" v-model="phoneCountry"></radio>
        </group>
      </popup>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, PopupHeader, Popup, TransferDom, Group, Radio } from 'vux';
import HInput from '../../components/HInput.vue';
import HButton from '../../components/HButton.vue';
import { sendCode, resetPw } from '../../api/user.js';
import auth from '../../utils/auth.js';

export default {
  name: 'resetPassword',
  directives: {
    TransferDom
  },
  components: {
    Flexbox,
    FlexboxItem,
    HInput,
    HButton,
    PopupHeader,
    Popup,
    Group,
    Radio
  },
  data() {
    return {
      isCodeSend: false,
      username: '',
      code: '',
      password: '',
      phoneChooseShow: false,
      phoneCountry: '86',
      phoneCountryList: [{
        key: '86',
        value: '中国(+86)'
      },
      {
        key: '87',
        value: 'English(+87)'
      }]
    }
  },
  computed: {
    country() {
      return this.phoneCountryList.find(e => e.key == this.phoneCountry).value;
    }
  },
  methods: {
    /**
     * [chooseCountry 选择国家区号]
     */
    chooseCountry() {
      this.phoneChooseShow = true;
    },
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
          element.innerHTML = this.$t('home.user.resetPassword.changePasswordCodeText');
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
          return this.vuxUtils.showWarn(this.$t('home.user.resetPassword.usernameWarnText'));
        }
        let mob;
        let type = this.valid.isPhone(this.username);
        mob = type ? (this.phoneCountry + this.username) : this.username;
        this.$vux.loading.show();
        let res = await sendCode({
          mob: mob
        });
        this.$vux.loading.hide();
        if (res.data.succeed == 'true') {
          this.$vux.toast.show(this.$t('base.codeHasSend'));
          this._countdown(e);
          this.isCodeSend = true;
          this.code = res.data.data;
        } else {
          this.vuxUtils.showWarn(this.$t('base.codeSendError'));
        }
      } catch(e) {
        this.$vux.loading.hide();
        this.vuxUtils.showWarn(this.$t('base.codeSendError'));
      }
    },
    /**
     * [changePassword 修改密码]
     */
    changePassword: async function() {
      try {
        if (this.valid.isStrEmpty(this.username)) {
          return this.vuxUtils.showWarn(this.$t('home.user.resetPassword.usernameWarnText'));
        }
        if (this.valid.isStrEmpty(this.code)) {
          return this.vuxUtils.showWarn(this.$t('home.user.resetPassword.codeWarnText'));
        }if (this.valid.isStrEmpty(this.password)) {
          return this.vuxUtils.showWarn(this.$t('home.user.resetPassword.passwordWarnText'));
        }
        this.$vux.loading.show();
        let res = await resetPw({
          cc: this.phoneCountry,
          mob: this.username,
          pw: this.password,
          code: this.code
        });
        this.$vux.loading.hide();
        if (res.data.succeed == 'true') {
          this.$vux.toast.show(this.$t('home.user.resetPassword.setSuccess'));
          if (auth.getUserInfo()) {
            localStorage.setItem('password', this.password);
          }
          this.username = '';
          this.code = '';
          this.password = '';
        } else {
          this.vuxUtils.showWarn(this.$t('home.user.resetPassword.setError'));
        }
      } catch(e) {
        this.$vux.loading.hide();
        this.vuxUtils.showWarn(this.$t('home.user.resetPassword.setError'));
      }
    }
  },
  mounted() {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./User.scss";
</style>