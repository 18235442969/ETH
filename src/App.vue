<template>
  <div id="app">
    <transition :name="transitionName">
    	<router-view class="child-view" />
    </transition>
  </div>
</template>

<script>
import auth from './utils/auth.js';
import md5 from 'js-md5';
import config from './utils/config.js';
import { mapActions } from 'vuex';
const appSpace = 'app';

export default {
  name: 'App',
  beforeDestroy () {
    this.bus.$off('connectSocket');
    this.bus.$off('sendMessage');
  },
  data() {
    return {
      transitionName: 'slide-left',
      isTimerStart: false,
      ws: ''
    }
  },
  methods: {
    ...mapActions(appSpace, {
      changeUserChat: 'changeUserChat'
    }),
    websocketInit() {
      let userInfo = JSON.parse(auth.getUserInfo());
      if (!userInfo) {
        return;
      }
      let sign = md5(localStorage.getItem('password'));
      this.ws = new WebSocket(`${config.wsUrl}:35123?userid=${userInfo.userid}&sign=${sign}`);
      /**
       * [监听打开socket连接]
       */
      this.ws.onopen = (evt) => {
        console.log("socket connect ...");
      };

      /**
       * [onmessage 收到消息]
       */
      this.ws.onmessage = (evt) => {
        this.saveMessage(JSON.parse(evt.data));
      };

      /**
       * [onclose 监听关闭socket连接]
       */
      this.ws.onclose = function(evt) {
        console.log("socket closed.");
      };

      this.ws.onerror = function(evt) {
        console.log(evt);
      };
    },
    /**
     * [saveMessage 保存信息]
     * @param  {[Object]} data [信息数据]
     */
    saveMessage(data) {
      let chatList = localStorage.getItem('chatList') ? JSON.parse(localStorage.getItem('chatList')) : [];
      //接受的用户聊天列表
      let userChat;
      let userType = data.pairs.find(e => e.key == 'userType').value;
      let chat = userType === 'service' ? chatList.find(e => e.userId === 'service') : chatList.find(e => e.userId === data.sender);
      if (chat) {
        userChat = chat;
      } else {
        userChat = {
          userId: userType === 'service' ? 'service' : data.sender,
          unRead: 0,
          name: data.pairs.find(e => e.key == 'sendName').value,
          newContent: '',
          list: {
            chat: []
          }
        };
      }
      let message = {
        message: data.body,
        sendTime: new Date(data.sendtime).getTime(),
        type: data.pairs.find(e => e.key === 'type').value,
        userId: data.sender
      }
      switch(message.type) {
        case 'text':
          userChat.newContent = data.body;
          break;
        case 'image':
          let imgUrl = data.pairs.find(e => e.key === 'imgUrl').value;
          userChat.newContent = this.$t('base.imageText');
          message.message = `${config.imgUrl}?id=${imgUrl}`;
          break;
      }
      userChat.list.chat.push(message);
      if (this.$route.path !== '/user/chat') {
        userChat.unRead++;
        if ( window.plus ) {
          plus.push.createMessage(message.message, 'text', {
            title: data.pairs.find(e => e.key == 'sendName').value + this.$t('base.newMessageText')
          });
        }
        this.$vux.toast.show({
          text: data.pairs.find(e => e.key == 'sendName').value + this.$t('base.newMessageText'),
          time: 1500,
          position: 'top',
          type: 'text',
          width: '80%'
        });
      }
      userChat.time = new Date(data.sendtime).getTime();
      if (!chat) {
        chatList.push(userChat)
      }
      this.changeUserChat(chatList);
      localStorage.setItem('chatList', JSON.stringify(chatList));
      this.$nextTick(() => {
        this.bus.$emit('bottomScroll');
      });
    },
    /**
     * [sendMessage 发送信息]
     * @param  {[Object]} data [信息数据]
     */
    sendMessage(data) {
      if (this.ws === '' || (this.ws.readyState != 1 && this.ws.readyState != 0)) {
        this.vuxUtils.showWarn(this.$t('base.messageSendError'));
        this.websocketInit();
      } else {
        this.ws.send(JSON.stringify(data.messageData));
        let chatList = localStorage.getItem('chatList') ? JSON.parse(localStorage.getItem('chatList')) : [];
        let userChat;
        let userType = data.messageData.pairs.find(e => e.key == 'userType').value;
        let chat = userType === 'service' ? chatList.find(e => e.userId === 'service') : chatList.find(e => e.userId === data.messageData.receiver);
        if (chat) {
          userChat = chat;
        } else {
          userChat = {
            userId: userType === 'service' ? 'service' : data.messageData.receiver,
            unRead: 0,
            name: data.messageData.pairs.find(e => e.key == 'reseiveName').value,
            newContent: '',
            list: {
              chat: []
            }
          }
        }
        let message = {
          message: data.messageData.body,
          sendTime: data.messageData.sendtime,
          type: data.messageData.pairs.find(e => e.key === 'type').value,
          userId: data.messageData.sender
        }
        switch(message.type) {
          case 'text':
            userChat.newContent = message.message;
          break;
          case 'image':
            let imgUrl = data.messageData.pairs.find(e => e.key === 'imgUrl').value;
            message.message = `${config.imgUrl}?id=${imgUrl}`;
            userChat.newContent = this.$t('base.imageText');
            break;
        }
        userChat.list.chat.push(message);
        userChat.time = message.sendtime;
        if (!chat) {
          chatList.push(userChat)
        }
        this.changeUserChat(chatList);
        localStorage.setItem('chatList', JSON.stringify(chatList));
        this.$nextTick(() => {
          this.bus.$emit('bottomScroll');
        });
      }
    },
    /**
     * [listenWsConnect ws心跳监听]
     */
    listenWsConnect(time) {
      setTimeout(() => {
        if (this.ws === '' || (this.ws.readyState != 1 && this.ws.readyState != 0)) {
          this.websocketInit();
        } else {
          console.log(`ws${this.ws.readyState}`)
        }
        this.listenWsConnect(10000);
      }, time)
    },
    /**
     * [initWs 初始化socket]
     */
    initWs() {
      if (this.ws === '' || (this.ws.readyState != 1 && this.ws.readyState != 0)) {
        if (this.isTimerStart) {
          this.websocketInit();
        } else {
          this.listenWsConnect(100);
        }
      } else {
        console.log(`ws${this.ws.readyState}`)
      }
    }
  },
  mounted() {
    this.initWs();
    /**
     * [监听socket连接 请求]
     */
    this.bus.$on('connectSocket', () => {
      this.initWs();
    });
    this.bus.$on('sendMessage', (data) => {
      this.sendMessage(data);
    });
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
