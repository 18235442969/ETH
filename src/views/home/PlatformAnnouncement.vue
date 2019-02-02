<template>
  <div class="platformAnnouncement">
    <div class="platformAnnouncement-list" v-for="(i, index) in list" :key="index" @click="chooseList(i)">
      <flexbox :gutter="0" class="platformAnnouncement-title">
        <flexbox-item :span="8" class="platformAnnouncement-name">
          {{i.title}}
        </flexbox-item>
        <flexbox-item :span="4" class="platformAnnouncement-time">
          {{i.createtime}}
        </flexbox-item>
      </flexbox>
      <div class="platformAnnouncement-content">
        {{i.body | contentFilter}}
      </div>
      <flexbox :gutter="0" class="platformAnnouncement-more">
        <flexbox-item :span="6" class="platformAnnouncement-more-title">
          {{ $t("home.user.platformAnnouncement.loadMoreText") }}
        </flexbox-item>
        <flexbox-item :span="6" class="platformAnnouncement-more-icon">
          <i class="icon iconfont icon-arrow-rt icon-size"></i>
        </flexbox-item>
      </flexbox>
    </div>
    <div v-transfer-dom>
      <popup v-model="detailShow" position="right" width="100%" :popup-style="popupOption">
        <div class="navbar">
          <flexbox :gutter="0">
            <flexbox-item :span="1" @click.native="detailClose" class="left">
              <i class="icon iconfont icon-left-arrow" style="font-size: 16px;"></i>
            </flexbox-item>
            <flexbox-item :span="10" class="center">
              {{ $t('appTitle.platformAnnouncementTitle') }}
            </flexbox-item>
            <flexbox-item :span="1">
            </flexbox-item>
          </flexbox>
        </div>
        <div style="background-color: #f5f4f7;height: 10px;"></div>
        <div class="pop-title">
          {{ detail.title }}
        </div>
        <div class="pop-time">
          {{ detail.time }}
        </div>
        <div class="pop-content" v-html="detail.content">
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Popup, TransferDom } from 'vux';
import { getNotice } from '../../api/user.js';

export default {
  name: 'platformAnnouncement',
  components: {
    Flexbox,
    FlexboxItem,
    Popup
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      popupOption: {
        'z-index': 999
      },
      detailShow: false,
      list: [],
      detail: {
        title: '',
        time: '',
        content: ''
      }
    }
  },
  computed: {
  },
  methods: {
    chooseList(value) {
      this.detail.title = value.title;
      this.detail.time = value.createtime;
      this.detail.content = value.body;
      this.detailShow = true;
    },
    detailClose() {
      this.detailShow = false;
    },
    /**
     * [获取平台公告]
     */
    getNotice: async function() {
      try {
        let res = await getNotice();
        if (res.data.succeed == 'true') {
          this.list = res.data.data;
        } else {
          this.vuxUtils.apiError(this, res.data, this.$t('home.user.platformAnnouncement.errorText'));
        }
      } catch(e) {
        this.vuxUtils.showWarn(this.$t('home.user.platformAnnouncement.errorText'));
      }
    },
  },
  filters: {
    contentFilter(value) {
      let str = value.length > 50 ? value.slice(0, 50)+'...' : value;
      return str;
    }
  },
  mounted() {
    this.getNotice();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./Home.scss"
</style>