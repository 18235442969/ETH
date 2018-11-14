<template>
  <div class="app-wrapper">
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from './components'
export default {
  name: 'layout',
  components: {
    Navbar,
    AppMain
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  },
  watch: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./Layout.scss";
</style>