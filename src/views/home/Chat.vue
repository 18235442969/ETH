<template>
  <div class="chat">
    <div class="chatList" id="chatList">
      <div class="chat-list-dialog" v-if="chat.list && chat.list.chat.length > 0">
        <div v-for="(i, index) in chat.list.chat" :key="index">
          <div class="time-line" v-if="isChatTimeShow(i, index, chat.list.chat)">{{ i.sendTime | timeFilter}}</div>
          <div>
            <chat-left v-if="i.userId !== myUserId" :list="i" :name="chat.name"></chat-left>
            <chat-right v-else :list="i"></chat-right>
          </div>
        </div>
      </div>
    </div>
    <chat-input v-on:onFocus="onFocus" v-on:more="more" id="chatInput" :name="chat.name"></chat-input>
  </div>
</template>

<script>
import ChatInput from './components/ChatInput.vue';
import ChatLeft from './components/ChatLeft.vue';
import ChatRight from './components/ChatRight.vue';
import { mapState } from 'vuex';
import auth from '../../utils/auth';
import time from '../../utils/time';
const appSpace = 'app';

export default {
  name: 'chat',
  components: {
    ChatInput,
    ChatLeft,
    ChatRight
  },
  beforeDestroy () {
    this.bus.$off('bottomScroll');
  },
  data() {
    return {
      myUserId: JSON.parse(auth.getUserInfo()).userid,
    }
  },
  computed: {
    ...mapState(appSpace, {
      userChat: state => state.userChat
    }),
    chat() {
      let chat = this.userChat.find(e => e.userId == this.$route.params.userId);
      return chat ? chat : {
        name: this.$route.params.name
      };
    },
    isChatTimeShow() {
      return function(chat, index, chatList) {
        if (index == 0) {
          return true;
        }
        if (index < (chatList.length - 1)) {
          let time = (Number(chatList[index+1].sendTime) - Number(chat.sendTime))/60000;
          return time > 5;
        }
        if (index == (chatList.length - 1)) {
          let time = (Number(chat.sendTime) - Number(chatList[index-1].sendTime))/60000;
          return time > 5;
        }
      }
    }
  },
  methods: {
    /**
     * [bottomScroll 滚动到底部]
     */
    bottomScroll() {
      //初始化滚动条位置
      const bodyHeight = document.getElementById('chatList').scrollHeight;
      document.getElementById('chatList').scrollTop = bodyHeight;
    },
    onFocus() {
      setTimeout(() => {
        this.bottomScroll();
      }, 150)
    },
    /**
     * [more 点击更多]
     * @param  {Boolean} isShow [是否显示]
     */
    more(isShow) {
      if (isShow) {
        document.getElementById('chatList').style.height = (document.getElementById('chatList').clientHeight - 95) + 'px';
      } else {
        document.getElementById('chatList').style.height = (document.getElementById('chatList').clientHeight + 95) + 'px';
      }
      this.bottomScroll();
    }
  },
  filters: {
    timeFilter(value) {
      return time.formatTime(value);
    }
  },
  mounted() {
    this.bottomScroll();
    this.bus.$on('bottomScroll', () => {
      this.bottomScroll();
    });
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./Home.scss"
</style>