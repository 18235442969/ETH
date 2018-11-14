<template>
  <div class="resetPassword">
    <flexbox :gutter="0" class="resetPassword-phone">
      <flexbox-item :span="2" class="resetPassword-icon">
        <i class="icon iconfont icon-shouji1"></i>
      </flexbox-item>
      <flexbox-item :span="10">
        <h-input :placeholder="$t('user.changePasswordUsernamePlaceholder')" inputClass="noline" type="text" v-model="username"></h-input>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" class="resetPassword-code">
      <flexbox-item :span="2" class="resetPassword-icon">
        <i class="icon iconfont icon-yanzhengma"></i>
      </flexbox-item>
      <flexbox-item :span="6">
        <h-input :placeholder="$t('user.changePasswordCodePlaceholder')" inputClass="noline" type="text" v-model="code"></h-input>
      </flexbox-item>
      <flexbox-item :span="4" class="codeBtn" @click.native="sendCode($event)">
        {{ $t("user.changePasswordCodeText") }}
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" class="resetPassword-password">
      <flexbox-item :span="2" class="resetPassword-icon">
        <i class="icon iconfont icon-suo"></i>
      </flexbox-item>
      <flexbox-item :span="10">
        <h-input :placeholder="$t('user.changePasswordPasswordPlaceholder')" inputClass="noline" type="text" v-model="password"></h-input>
      </flexbox-item>
    </flexbox>
    <div class="resetPassword-btn">
      <h-button>{{ $t("base.confirmBtn") }}</h-button>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import HInput from '../../components/HInput.vue';
import HButton from '../../components/HButton.vue';
import { sendCode } from '../../api/user.js';
export default {
  name: 'resetPassword',
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
      let num = 3;
      var timer = setInterval(() => {
        num--;
        element.innerHTML = `${num} s`;
        element.style.color = '#9e9e9e'
        if (num === 0) {
          element.style.color = '#0c5fcc';
          element.innerHTML = this.$t('user.changePasswordCodeText');
          this.isCodeSend = false;
          clearInterval(timer);
        }
      }, 1000);
    },
    sendCode: async function(e) {
      try {
        if (this.isCodeSend) {
          return;
        }
        if (this.valid.isStrEmpty(this.username)) {
          return this.vuxUtils.showWarn(this.$t('user.usernameWarnText'));
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
          console.log(res)
        }
      } catch(e) {
        this.$vux.loading.hide();
        console.log(e);
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