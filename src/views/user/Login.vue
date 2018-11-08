<template>
  <div class="login">
    asd
  </div>
</template>

<script>
import { sendCode } from '../../api/user';

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      
    }
  },
  computed: {
  },
  methods: {
    sendCode() {
      sendCode({
        mob: '18235442969'
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.sendCode();
  },
  watch: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 
</style>