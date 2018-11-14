<template>
  <div class="user-header">
    <flexbox :gutter="0">
      <flexbox-item :span="3" class="header-left" @click.native="goBack">
        <div v-if="isBack">
          <i class="icon iconfont icon-left-arrow"></i>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </flexbox-item>
      <flexbox-item :span="6"></flexbox-item>
      <flexbox-item :span="3" class="header-right">
        <div v-if="isLanguage" @click="changeLanguage" class="language-right">
          {{ language }}
          <i class="icon iconfont icon-jiantou"></i>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
import { mapState } from 'vuex';
const appSpace = 'app';

export default {
  name: 'user-header',
  components: {
    Flexbox,
    FlexboxItem
  },
  props: {
    isBack: {
      type: Boolean,
      default: false
    },
    isLanguage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(appSpace, {
      language: state => state.language
    })
  },
  methods: {
    goBack() {
      this.$router.goAppBack();
    },
    changeLanguage() {
      this.$emit('changeLanguage');
    }
  },
  mounted() {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../User.scss";
</style>