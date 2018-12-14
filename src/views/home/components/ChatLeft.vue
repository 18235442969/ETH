<template>
  <div class="chatLeft">
    <div class="chatLeft-head">
      {{name}}
    </div>
    <div class="chatLeft-content">
      <span v-if="list.type == 'text'">
        {{list.message}}
      </span>
      <img v-if="list.type == 'image'" :src="list.message" style="width:100px;" @click="showImage(list.message)">
    </div>
    <div v-transfer-dom>
      <previewer :list="imageUrl" ref="previewer"></previewer>
    </div>
  </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux';
export default {
  name: 'chatLeft',
  props: ['list', 'name'],
  directives: {
    TransferDom
  },
  components: {
    Previewer
  },
  data() {
    return {
      imageUrl: [],
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