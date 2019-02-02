<template>
  <div class="myfamily" id="myfamily">
    <div class="myInfo">
      <flexbox :gutter="0" class="title">
        <flexbox-item :span="6" class="content">
          {{ $t("home.user.myFamily.starTeamText") }}
        </flexbox-item>
        <flexbox-item :span="6" class="content">
          {{ $t("home.user.myFamily.investmentGradeText") }}
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0" class="title">
        <flexbox-item :span="6" class="title-icon">
          <span v-if="rank == 0">0</span>
          <div v-else>
            <i class="icon iconfont icon-dengji" style="color: #f58723;" v-for="i in Number(rank)" :key="i"></i>
          </div>
        </flexbox-item>
        <flexbox-item :span="6" class="title-icon">
          <span>Lv.{{level}}</span>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="recommend-info">
      <div class="recommend" v-for="(i, index) in list">
        <flexbox :gutter="0" class="recommend-top">
          <flexbox-item :span="6" class="recommend-id">
            ID：{{i.idnum}}
          </flexbox-item>
          <flexbox-item :span="6" class="recommend-username">
            {{ $t("home.user.myFamily.username") }}：{{i.mob}}
          </flexbox-item>
        </flexbox>
        <flexbox :gutter="0" class="recommend-bottom">
          <flexbox-item :span="12" class="recommend-level">
            Lv.{{i.level}}
          </flexbox-item>
          <flexbox-item :span="6" class="recommend-time">
            <!-- 2017-11-07 09:26 -->
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <load-more tip="loading" v-show="isMoreLoading"></load-more>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, LoadMore } from 'vux';
import { getFamily } from '../../api/user.js';
import auth from '../../utils/auth.js';

export default {
  name: 'myfamily',
  components: {
    Flexbox,
    FlexboxItem,
    LoadMore
  },
  data() {
    return {
      pageIndex: 1,
      list: [],
      rank: 0,
      level: 0,
      isMoreLoading: false,
      dividerIsShow: false,
    }
  },
  computed: {
  },
  methods: {
    /**
     * [initScroll 初始化滚动条加载]
     */
    initScroll() {
      //初始化滚动加载
      const that = this
      document.getElementById('myfamily').onscroll= function(){
        const bodyHeight = document.getElementById('myfamily').scrollHeight;
        const clientHeight = document.getElementById('myfamily').clientHeight;
        const scrollAllHeight = bodyHeight - clientHeight;
        const scrollTop = document.getElementById('myfamily').scrollTop;
        if ((scrollTop > 0) && (scrollAllHeight - scrollTop) < 10 && !that.isMoreLoading && !that.dividerIsShow) {
          that.isMoreLoading = true
          that.pageIndex++
          that.getUserFamily();
        }
      }
    },
    /**
     * [获取我的家族]
     */
    getUserFamily: async function() {
      try {
        let res = await getFamily({
          pi: this.pageIndex
        });
        if (res.data.succeed == 'true') {
          let data = res.data.data;
          if (data.list.length == 0) {
            this.dividerIsShow = true;
          }
          this.isMoreLoading = false;
          if (this.pageIndex == 1) {
            this.list = data.list;
          } else {
            this.list.concat(data.list);
          }
        } else {
          this.vuxUtils.apiError(this, res.data, this.$t('home.user.myFamily.getWarnText'));
        }
      } catch(e) {
          this.vuxUtils.showWarn(this.$t('home.user.myFamily.getWarnText'));
      }
    }
  },
  mounted() {
    this.initScroll();
    this.getUserFamily();
    let userInfo = JSON.parse(auth.getUserInfo());
    if (userInfo) {
      this.rank = userInfo.rank;
      this.level = userInfo.level;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./User.scss";
</style>