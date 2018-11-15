<template>
  <section class="app-main">
    <transition :name="transitionName">
      <router-view :key="key" class="child-view"/>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  methods: {
  },
  created() {
  },
  watch: {
    '$route'() {
      let isBack = this.$router.isBack;
      if (isBack) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      this.$router.isBack = false;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main {
    /*84 = navbar + tags-view = 50 +34 */
    min-height: calc(100vh - 45px);
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: #f5f4f7;
  }
  .child-view {
    position: absolute;
    width:100%;
    transition: all 0.15s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100px, 0);
    transform: translate(100px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100px, 0);
    transform: translate(-100px, 0);
  }
</style>

