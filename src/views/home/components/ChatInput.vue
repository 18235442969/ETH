<template>
  <div class="chatInput">
    <div class="chatInput-showInput">
      <input type="text" :placeholder="$t('home.mail.chat.chatPlaceholder')" ref="content" v-model="chatContent" v-on:focus="onFocus" @keyup.enter="sendMessage"/>
      <img src="../../../assets/image/chatSend.png" @click="sendMessage">
      <img src="../../../assets/image/chatMore.png" @click='more'>
    </div>
    <div class="chatInput-moreOperation" v-show="moreShow">
      <img src="../../../assets/image/picture.png" @click="openPicture">
      <img src="../../../assets/image/camera.png" @click="openCamera">
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux';
import auth from '../../../utils/auth.js';
import { upload } from '../../../api/user.js';
export default {
  name: 'chatInput',
  props: ['name'],
  components: {
  },
  data() {
    return {
      moreShow: false,
      chatContent: ''
    }
  },
  computed: {
  },
  methods: {
    onFocus() {
      if (this.moreShow) {
        this.moreShow = false;
        this.$emit('more', this.moreShow);
      }
      this.$emit('onFocus');
    },
    more() {
      this.moreShow = !this.moreShow;
      this.$emit('more', this.moreShow);
    },
    /**
     * [sendMessage 发送文字]
     */
    sendMessage() {
      let re= /select|update|delete|exec|count/i;
      if (re.test(this.chatContent)) {
        return;
      }
      this.sendChatContent(this.chatContent, 'text');
    },
    /**
     * [openPicture 发送图片]
     */
    openPicture() {
      const that = this;
      if (window.plus) {
        plus.gallery.pick( function(path){
          that.uploadImg(path);
        }, function ( e ) {
        }, {
          filter : 'image',
          multiple: false
        });
      }
    },
    /**
     * [openCamera 拍照]
     */
    openCamera() {
      const that = this;
      if (window.plus) {
        let cmr = plus.camera.getCamera();
        let res = cmr.supportedImageResolutions[0];
        let fmt = cmr.supportedImageFormats[0];
        cmr.captureImage(function(path) {
          plus.io.resolveLocalFileSystemURL(path, function(entry) {
            var url = entry.toLocalURL();
            that.uploadImg(url);
          }, function(e) {
          });
        }, function(err) {
        }, {
          resolution:res,
          format:fmt
        });
      }
    },
    /**
     * [uploadImg 上传图片]
     * @param  {[String]} url [地址]
     */
    uploadImg(url) {
      const that = this;
      this.vuxUtils.showToast('upload...');
      let image = new Image();
      let dataURL;
      image.setAttribute("crossOrigin",'Anonymous');
      image.onload = function(){ //要先确保图片完整获取到，这是个异步事件
        let canvas = document.createElement("canvas"); //创建canvas元素
        let width = image.width; //确保canvas的尺寸和图片一样
        let height = image.height;
        canvas.width=width;
        canvas.height=height;
        let ctx = canvas.getContext("2d")
        ctx.drawImage(image, 0, 0, width, height); //将图片绘制到canvas中
        dataURL = canvas.toDataURL('image/jpeg', 0.5); //转换图片为dataURL
        upload({
          fn: new Date().getTime(),
          pic: dataURL
        }).then(res => {
          if (res.data.succeed == 'true') {
            that.sendChatContent(res.data.data, 'image');
            that.vuxUtils.hideToast();
          } else {
            that.vuxUtils.hideToast();
            this.vuxUtils.apiError(this, res.data, this.$t('home.mail.chat.imageUploadError'));
          }
        }).catch(err => {
          that.vuxUtils.hideToast();
          that.vuxUtils.showWarn(this.$t('home.mail.chat.imageUploadError'));
        })
      };
      image.src = url;
    },
    /**
     * [sendChatContent 发送消息]
     */
    sendChatContent (msg, type) {
      if ( this.valid.isStrEmpty(msg) ) {
        return this.vuxUtils.showWarn(this.$t('home.mail.chat.enterEmpty'));
      }
      let params = {
        body: type == 'text' ? msg : this.$t('base.imageText'),
        sendtime: parseInt(new Date().getTime()) + '',
        sender: JSON.parse(auth.getUserInfo()).userid,
        receiver: this.$route.params.userId,
        pairs: [
          {
            key: 'type',
            value: type
          },
          {
            key: 'sendName',
            value: JSON.parse(auth.getUserInfo()).idnum
          },
          {
            key: 'reseiveName',
            value: this.$route.params.name
          },
          {
            key: 'userType',
            value: this.$route.params.userType
          }
        ]
      }
      if (type == 'image') {
        params.pairs.push({
          key: 'imgUrl',
          value: msg
        })
      }
      this.bus.$emit('sendMessage', {
        messageData: params,
      });
      this.chatContent = '';
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../Home.scss"
</style>