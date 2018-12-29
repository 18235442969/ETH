<template>
  <div class="transfer">
    <flexbox orient="vertical" :gutter="0" style="margin-top: 10px;">
      <flexbox-item :span="12" class="transfer-username">
        <h-input v-model="username" inputClass="noline" type="text" :max="15" :placeholder="$t('home.ecolog.transfer.usernamePlaceholder')"></h-input>
      </flexbox-item>
      <flexbox-item :span="12" class="transfer-number">
        <h-input v-model="number" inputClass="noline" type="text" :max="15" :placeholder="$t('home.ecolog.transfer.numberPlaceholder')"></h-input>
      </flexbox-item>
      <flexbox-item :span="12" class="transfer-number">
        <h-input v-model="password" inputClass="noline" type="password" :max="8" :placeholder="$t('home.ecolog.transfer.passwordPlaceholder')"></h-input>
      </flexbox-item>
      <flexbox-item :span="12" class="transfer-price">
        <flexbox>
          <flexbox-item :span="3">
            {{$t("home.ecolog.transfer.nowPriceText")}}
          </flexbox-item>
          <flexbox-item :span="9">
            <h-input :value="price" inputClass="noline" type="text" :readonly="true"></h-input>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>
    <div class="transfer-btn">
      <h-button @click.native="transfer">{{ $t("base.confirmBtn") }}</h-button>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import HInput from '../../components/HInput.vue';
import HButton from '../../components/HButton.vue';
import { transfer } from '../../api/eth.js';
import { mapState } from 'vuex';
const appSpace = "app";

export default {
  name: 'transfer',
  components: {
    Flexbox,
    FlexboxItem,
    HInput,
    HButton
  },
  data() {
    return {
      username: '',
      number: '',
      password: ''
    }
  },
  computed: {
    ...mapState(appSpace, {
      coinPrice: state => state.coinPrice
    }),
    price() {
      let data = this.coinPrice.find(e => e.currency == '0');
      if (data) {
        return `￥${data.amount}/ETH`
      } else {
        return '';
      }
    }
  },
  methods: {
    /**
     * [转账]
     */
    transfer: async function() {
      try {
        if (this.valid.isStrEmpty(this.username)) {
          return this.vuxUtils.showWarn(this.$t('home.ecolog.transfer.usernameEmpty'));
        }
        if (this.valid.isStrEmpty(this.number)) {
          return this.vuxUtils.showWarn(this.$t('home.ecolog.transfer.numberEmpty'));
        }
        if (this.valid.isStrEmpty(this.password)) {
          return this.vuxUtils.showWarn(this.$t('home.ecolog.transfer.passwordEmpty'));
        }
        this.$vux.loading.show();
        let res = await transfer({
          amt: this.number,
          to: this.username,
          pin: this.password,
        });
        this.$vux.loading.hide();
        if (res.data.succeed == 'true') {
          this.$vux.toast.show(this.$t('home.ecolog.transfer.successText'));
          this.number = '';
          this.username = '';
          this.password = '';
        } else {
          this.vuxUtils.showWarn(this.$t('home.ecolog.transfer.failText'));
        }
      } catch (e) {
        this.$vux.loading.hide();
        this.vuxUtils.showWarn(this.$t('home.ecolog.transfer.failText'));
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./Home.scss"
</style>