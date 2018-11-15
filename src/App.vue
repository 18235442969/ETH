<template>
  <div id="app">
    <transition :name="transitionName">
    	<router-view class="child-view" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route'(value) {
      let isBack = this.$router.isAppBack;
      if (isBack) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      this.$router.isAppBack = false;
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss">
  @import "@/styles/main.scss";
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
