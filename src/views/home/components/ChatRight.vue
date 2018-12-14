<template>
  <div class="chatRight">
    <div class="chatRight-content">
      <span v-if="list.type == 'text'">
        {{list.message}}
      </span>
      <img v-if="list.type == 'image'" :src="list.message" style="width:100px;" @click="showImage(list.message)">
    </div>
    <div class="chatRight-head">
      我
    </div>
    <div v-transfer-dom>
      <previewer :list="imageUrl" ref="previewer"></previewer>
    </div>
  </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux';
export default {
  name: 'chatRight',
  props: ['list'],
  directives: {
    TransferDom
  },
  components: {
    Previewer
  },
  data() {
    return {
      imageUrl: [],
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('img')[0]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  computed: {
  },
  methods: {
    showImage(url) {
      this.imageUrl = [{
        msrc: url,
        src: url
      }];
      this.$nextTick(() => {
        this.$refs.previewer.show(0);
      })
    }
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>