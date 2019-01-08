<template>
  <div class="registe">
    <v-head :isBack="true"></v-head>
    <div class="logo">
      <img src="../../assets/image/ethLogoLogin.png" class="login-img">
    </div>
    <div class="registe-type">
      <div class="registe-type-password" :class="{ choose: isPhoneRegiste }" @click="chooseRegisteType('phone')">
        {{ $t("registe.phoneRegisteText") }}
      </div>
      <div class="registe-type-code" :class="{ choose: !isPhoneRegiste }" @click="chooseRegisteType('email')">
        {{ $t("registe.emailRegisteText") }}
      </div>
    </div>
    <div class="registe-info">
      <div class="phoneType" v-show="isPhoneRegiste">
        <flexbox :gutter="0" @click.native="chooseCountry">
          <flexbox-item :span="11">
            {{country}}
          </flexbox-item>
          <flexbox-item :span="1" class="alignRight">
            <i class="icon iconfont icon-jiantou"></i>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="phone" v-show="isPhoneRegiste">
        <flexbox :gutter="0">
          <flexbox-item :span="12">
            <h-input v-model="phone" type="tel" :placeholder="$t('registe.phoneRegistePlaceHolder')" inputClass="noline" :max="15"></h-input>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="phoneCode" v-show="isPhoneRegiste">
        <flexbox :gutter="0">
          <flexbox-item :span="6">
            <h-input v-model="phoneCode" type="tel" :placeholder="$t('registe.phoneCodeRegistePlaceHolder')" inputClass="noline" :max="6"></h-input>
          </flexbox-item>
          <flexbox-item :span="6" class="phoneCodeBtn" @click.native="sendCode($event)">
            {{ $t("registe.phoneCodeText") }}
          </flexbox-item>
        </flexbox>
      </div>
      <div class="email" v-show="!isPhoneRegiste">
        <flexbox :gutter="0">
          <flexbox-item :span="12">
            <h-input v-model="email" type="text" :placeholder="$t('registe.emailRegistePlaceHolder')" inputClass="noline" :max="20"></h-input>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="emailCode" v-show="!isPhoneRegiste">
        <flexbox :gutter="0">
          <flexbox-item :span="6">
            <h-input v-model="emailCode" type="text" :placeholder="$t('registe.emailCodeRegistePlaceHolder')" inputClass="noline" :max="8"></h-input>
          </flexbox-item>
          <flexbox-item :span="6" class="phoneCodeBtn" @click.native="sendCode($event)">
            {{ $t("registe.emailCodeText") }}
          </flexbox-item>
        </flexbox>
      </div>
      <div class="password">
        <flexbox :gutter="0">
          <flexbox-item :span="12">
            <h-input v-model="password" type="password" :placeholder="$t('registe.passwordRegistePlaceHolder')" inputClass="noline" :max="20"></h-input>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="referrer">
        <flexbox :gutter="0">
          <flexbox-item :span="3">
            {{ $t("registe.referrerText") }}
          </flexbox-item>
          <flexbox-item :span="9">
            <h-input v-model="referrer" type="text" :placeholder="$t('registe.referrerRegistePlaceHolder')" inputClass="noline" :max="20"></h-input>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <div class="registe-btn">
      <h-button @click.native="registe">{{ $t("registe.registeBtn") }}</h-button>
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
import { VHead } from './components';
import HInput from '../../components/HInput.vue';
import HButton from '../../components/HButton.vue';
import { Flexbox, FlexboxItem, PopupHeader, Popup, TransferDom, Group, Radio } from 'vux';
import { sendCode, regist } from '../../api/user.js';

export default {
  name: 'registe',
  directives: {
    TransferDom
  },
  components: {
    VHead,
    HInput,
    HButton,
    Flexbox,
    FlexboxItem,
    PopupHeader,
    Popup,
    Group,
    Radio
  },
  data() {
    return {
      isPhoneRegiste: true,
      phoneCodeIsSend: false,
      emailCodeIsSend: false,
      phone: '',
      phoneCode: '',
      password: '',
      referrer: '',
      email: '',
      emailCode: '',
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
     * [chooseRegisteType 切换注册类型]
     * @param  {[String]} type [注册类型]
     */
    chooseRegisteType(type) {
      if (type == 'phone') {
        this.isPhoneRegiste = true;
      } else {
        this.isPhoneRegiste = false;
      }
    },
    /**
     * [chooseCountry 选择国家区号]
     */
    chooseCountry() {
      this.phoneChooseShow = true;
    },
    /**
     * [_countdown 验证码倒计时]
     */
    _countdown (e, type) {
      let element = e.target;
      let num = 60;
      var timer = setInterval(() => {
        num--;
        element.innerHTML = `${num} s`;
        element.style.color = '#9e9e9e'
        if (num === 0) {
          element.style.color = '#0c5fcc';
          element.innerHTML = type ? this.$t('registe.phoneCodeText') : this.$t('registe.emailCodeText');
          type ? this.phoneCodeIsSend = false : this.emailCodeIsSend = false;
          clearInterval(timer);
        }
      }, 1000);
    },
    /**
     * [sendCode 发送验证码]
     */
    sendCode: async function(e) {
      try {
        let mob;
        let type = this.isPhoneRegiste;
        if (type) {
          //验证码已发送
          if (this.phoneCodeIsSend) {
            return;
          }
          if (this.valid.isStrEmpty(this.phone)) {
            return this.vuxUtils.showWarn(this.$t('registe.phoneWarnText'));
          } else {
            mob = this.phoneCountry + this.phone;
          }
        } else {
          //验证码已发送
          if (this.emailCodeIsSend) {
            return;
          }
          if (this.valid.isStrEmpty(this.email)) {
            return this.vuxUtils.showWarn(this.$t('registe.emailWarnText'));
          } else {
            mob = this.email;
          }
        }
        this.$vux.loading.show();
        let res = await sendCode({
          mob: mob
        });
        this.$vux.loading.hide();
        if (res.data.succeed == 'true') {
          this.$vux.toast.show(this.$t('base.codeHasSend'));
          type ? this.phoneCodeIsSend = true : this.emailCodeIsSend = true;
          this._countdown(e, type);
          this.phoneCode = res.data.data;
          this.emailCode = res.data.data;
        } else {
          this.vuxUtils.showWarn(this.$t('base.codeSendError'));
        }
      } catch(e) {
        this.$vux.loading.hide();
        this.vuxUtils.showWarn(this.$t('base.codeSendError'));
      }
    },
    /**
     * [registe 注册]
     */
    registe() {
      let mob;
      let code;
      let cc;
      if (this.isPhoneRegiste) {
        if (this.valid.isStrEmpty(this.phone)) {
          return this.vuxUtils.showWarn(this.$t('registe.phoneWarnText'));
        }
        if (this.valid.isStrEmpty(this.phoneCode)) {
          return this.vuxUtils.showWarn(this.$t('registe.phoneCodeWarnText'));
        }
        mob = this.phone;
        code = this.phoneCode;
        cc = this.phoneCountry;
      } else {
        if (this.valid.isStrEmpty(this.email)) {
          return this.vuxUtils.showWarn(this.$t('registe.emailWarnText'));
        }
        if (this.valid.isStrEmpty(this.emailCode)) {
          return this.vuxUtils.showWarn(this.$t('registe.emailCodeWarnText'));
        }
        mob = this.email;
        code = this.emailCode;
        cc = '';
      }
      if (this.valid.isStrEmpty(this.password)) {
        return this.vuxUtils.showWarn(this.$t('registe.passwordWarnText'));
      }
      if (this.valid.isStrEmpty(this.referrer)) {
        return this.vuxUtils.showWarn(this.$t('registe.referrerWarnText'));
      }
      this.submitRegiste(cc, mob, code);
    },
    /**
     * [提交注册信息]
     * @param  {[String]} cc   [国家区号]
     * @param  {[String]} mob  [手机号]
     * @param  {[String]} code [验证码]
     */
    submitRegiste: async function(cc, mob, code) {
      try {
        this.$vux.loading.show();
        let res = await regist({
          cc: this.phoneCountry,
          mob: mob,
          pw: this.password,
          pmob: this.referrer,
          code: code
        });
        this.$vux.loading.hide();
        if (res.data.succeed == 'true') {
          this.$vux.toast.show(this.$t('registe.registeSuccess'));
          this.$router.goAppBack();
        } else {
          this.vuxUtils.showWarn(this.$t('registe.registeFail'));
        }
      } catch(e) {
        this.$vux.loading.hide();
        this.vuxUtils.showWarn(this.$t('registe.registeFail'));
      }
    }
  },
  mounted() {

  },
  watch: {
  }
}
</script>

<style>
  .vux-radio-label{
    font-size: 0.8rem !important;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./User.scss";
</style>