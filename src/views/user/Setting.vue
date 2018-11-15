<template>
  <div class="setting">
    <flexbox :gutter='0' class="about">
      <flexbox-item class="title">
        {{ $t('home.user.setting.aboutText') }}ETH
      </flexbox-item>
      <flexbox-item class="content">
        <i class="icon iconfont icon-arrow-rt"></i>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter='0' class="version">
      <flexbox-item class="title">
        {{ $t('home.user.setting.versionText') }}
      </flexbox-item>
      <flexbox-item class="content">
        1.0.0
      </flexbox-item>
    </flexbox>
    <div class="settingBtn">
      <h-button @click.native="exitApp">{{ $t('home.user.setting.exitAppBtnText') }}</h-button>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import HButton from '../../components/HButton.vue';
import auth from '../../utils/auth.js';

export default {
  name: 'setting',
  components: {
    Flexbox,
    FlexboxItem,
    HButton
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    /**
     * [exitApp 退出登录]
     */
    exitApp() {
      this.$vux.confirm.show({
        title: 'ETH',
        content: this.$t('home.user.setting.exitConfirmContent'),
        confirmText: this.$t('home.user.setting.exitConfirmBtnText'),
        cancelText: this.$t('home.user.setting.exitCancelBtnText'),
        onConfirm: () => {
          auth.removeUserInfo();
          localStorage.removeItem('password');
          location.reload();
        }
      })
    }
  },
  mounted() {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./User.scss";
</style>