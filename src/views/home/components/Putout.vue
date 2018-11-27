<template>
  <div class="putout">
    <div class="navbar">
      <flexbox :gutter="0">
        <flexbox-item :span="1" @click.native="clickLeft" class="left">
          <i class="icon iconfont icon-left-arrow"></i>
        </flexbox-item>
        <flexbox-item :span="10" class="center">
          {{ $t('appTitle.putOutTitle') }}
        </flexbox-item>
        <flexbox-item :span="1">
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import { Navbar } from './Navbar.vue'
import md5 from 'js-md5';
import { getInvestSet } from '../../../api/eth.js';

export default {
  name: 'putout',
  components: {
    Flexbox,
    FlexboxItem,
    Navbar,
  },
  data() {
    return {
      pageIndex: 1
    }
  },
  computed: {
  },
  methods: {
    clickLeft() {
      this.$emit('close');
    },
    /**
     * [getInvest 获取投资列表]
     */
    getInvest: async function() {
      try {
        let params = {
          pi: this.pageIndex
        }
        let res = await getInvestSet(params);
        console.log(res);
        if (res.data.succeed == 'true') {

        }
      } catch(e) {
      }
    },
    /**
     * [submitPutIn 提交投资]
     */
    submitPutIn: async function() {
      try {
        let params = {
        };
        let res = await setInvest(params);
        if (res.data.succeed == 'true') {
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
    this.getInvest();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>