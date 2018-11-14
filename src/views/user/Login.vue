<template>
  <div class="login">
    <v-head :isLanguage="true" v-on:changeLanguage="changeLanguage"></v-head>
    <div class="logo">
      <img src="../../assets/image/ethLogoLogin.png" class="login-img">
    </div>
    <div class="login-info">
      <div class="username">
        <flexbox :gutter="0">
          <flexbox-item :span="1">
            <i class="icon iconfont icon-shouji1"></i>
          </flexbox-item>
          <flexbox-item :span="11">
            <h-input v-model="username" type="text" :placeholder="$t('login.usernamePlaceholder')" inputClass="noline" :max="20"></h-input>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="password">
        <flexbox :gutter="0">
          <flexbox-item :span="1">
            <i class="icon iconfont icon-suo"></i>
          </flexbox-item>
          <flexbox-item :span="11">
            <h-input v-model="password" type="password" :placeholder="$t('login.passwordPlaceholder')" inputClass="noline" :max="20"></h-input>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <div class="login-btn">
      <h-button @click.native="login" :disabled="isLogin">{{ $t("login.loginBtn") }}</h-button>
    </div>
    <div class="link">
      <router-link to="/registe" class="link-item">{{ $t("login.registeText") }}&nbsp;&nbsp;></router-link>
      &nbsp;&nbsp;&nbsp;<span class="link-line">|</span>&nbsp;&nbsp;&nbsp;
      <router-link to="/user/resetPassword" class="link-item">{{ $t("login.resetPasswordText") }}&nbsp;&nbsp;></router-link>
    </div>
    <popup v-model="languageShow" position="right" width="60%">
      <language v-on:close="languageShow = false"></language>
    </popup>
  </div>
</template>

<script>
import { VHead, Language } from './components';
import { Flexbox, FlexboxItem, Popup } from 'vux';
import { login } from '../../api/user';
import HInput from '../../components/HInput.vue';
import HButton from '../../components/HButton.vue';
import auth from '../../utils/auth.js';

export default {
  name: 'Login',
  components: {
    VHead,
    Language,
    HInput,
    HButton,
    Flexbox,
    FlexboxItem,
    Popup
  },
  data() {
    return {
      languageShow: false,
      isLogin: false,
      username: '18235442969',
      password: '123456'
    }
  },
  computed: {
  },
  methods: {
    login: async function() {
      try {
        if (this.valid.isStrEmpty(this.username)) {
          return this.vuxUtils.showWarn(this.$t('login.usernameWarnText'));
        }
        if (this.valid.isStrEmpty(this.password)) {
          return this.vuxUtils.showWarn(this.$t('login.passwordWarnText'));
        }
        this.$vux.loading.show();
        let res = await login({
          appkey: this.username,
          md5Password: this.password
        });
        this.$vux.loading.hide();
        if (res.data.succeed == 'true') {
          localStorage.setItem('password', this.password);
          auth.setUserInfo(JSON.stringify(res.data.data));
          this.$router.push({
            path: '/'
          });
        } else {
          console.log(res.data)
        }
      } catch(e) {
        this.$vux.loading.hide();
        console.log(e);
      }
    },
    changeLanguage() {
      this.languageShow = true;
    }
  },
  mounted() {
  },
  watch: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./User.scss";
</style>