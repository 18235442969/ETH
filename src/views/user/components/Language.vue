<template>
  <div class="language">
    <group :gutter="0">
      <radio :options="languageList" v-model="language"></radio>
    </group>
    <div class="button">
      <h-button @click.native="setLanguage" btnClass="languageClass">{{ $t("base.confirmBtn") }}</h-button>
    </div>
  </div>
</template>

<script>
import { Group, Radio } from 'vux';
import HButton from '../../../components/HButton.vue';
import { mapActions } from 'vuex';
const appSpace = 'app';
export default {
  name: 'language',
  components: {
    Group,
    Radio,
    HButton
  },
  data() {
    return {
      languageList: [{
        key: 'zh',
        value: '中文'
      },
      {
        key: 'en',
        value: 'English'
      }],
      language: 'zh'
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(appSpace, {
      changeLanguage: 'changeLanguage'
    }),
    setLanguage() {
      localStorage.setItem('locale', this.language);
      this.$i18n.locale = this.language;
      this.changeLanguage(this.languageList.find(e => e.key === this.language).value);
      this.$emit('close');
    }
  },
  mounted() {
    let language = localStorage.getItem('locale');
    this.language = language ? language : 'zh';
  }
}
</script>

<style>
  .vux-radio-label{
    font-size: 0.8rem !important;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .button{
    margin-top: 15px;
    margin-left: 30%;
    width: 40%;
    height: 1.7rem;
  }
</style>