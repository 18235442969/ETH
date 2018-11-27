<template>
  <div class="mail">
    <div class="mail-header">
     {{ $t("appTitle.mailTitle") }}
    </div>
    <div class="platform">
      <flexbox :gutter="0" class="announcement-item" @click.native="changeAppPage('platformAnnouncement')">
        <flexbox-item :span="1.5" class="logo">
          <i class="icon iconfont icon-gonggao"></i>
        </flexbox-item>
        <flexbox-item :span="10.5" class="content">
          {{ $t("home.mail.announcementText") }}
        </flexbox-item>
      </flexbox>
      <!-- <flexbox :gutter="0" class="trade-item">
        <flexbox-item :span="1.5" class="logo">
          <i class="icon iconfont icon-xinxi"></i>
        </flexbox-item>
        <flexbox-item :span="10.5" class="content">
          {{ $t("home.mail.tradeText") }}
        </flexbox-item>
      </flexbox> -->
    </div>
    <div class="customerService">
      <flexbox :gutter="0" class="customerService-item">
        <flexbox-item :span="1.5" class="logo">
          <i class="icon iconfont icon-kefu"></i>
        </flexbox-item>
        <flexbox-item :span="10.5" class="content">
          {{ $t("home.mail.customerServiceText") }}
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux';
export default {
  name: 'mail',
  components: {
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    /**
     * [changeAppPage 切换页面]
     * @param  {[String]} name [名称]
     */
    changeAppPage(name) {
      this.$router.push({
        name: name
      })
    },
  },
  mounted() {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>