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
      <flexbox :gutter="0" class="customerService-item" @click.native="changeAppPage('chat')">
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
import { mapActions } from 'vuex';
const appSpace = 'app';

export default {
  name: 'mail',
  components: {
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      isClick: false
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(appSpace, {
      getUserService: 'getUserService'
    }),
    /**
     * [changeAppPage 切换页面]
     * @param  {[String]} name [名称]
     */
    changeAppPage: async function(name) {
      if (this.isClick) {
        return;
      }
      this.isClick = true;
      if (name == 'chat') {
        try {
          let res = await this.getUserService();
          this.isClick = false;
          if (res.data.succeed == 'true') {
            let data = res.data.data[0];
            this.$router.push({
              name: name,
              params: {
                name: data.name,
                userId: data.userid,
                type: 'service',
                userType: 'service'
              }
            })
          } else {
          }
        } catch(e) {
          this.isClick = false;
        }
      } else {
        this.isClick = false;
        this.$router.push({
          name: name
        })
      }
    },
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>