<template>
  <div class="order" id="order">
    <ul v-if="orderList.length > 0">
      <li class="order-item" v-for="(i, index) in orderList" :key="index">
        <flexbox :gutter="0">
          <flexbox-item :span="6" class="order-item-id">
            {{$t("home.mail.order.orderIdText")}}：{{ i.id }}
          </flexbox-item>
          <flexbox-item :span="6" class="order-item-time">
            {{ i.createtime }}
          </flexbox-item>
        </flexbox>
        <flexbox :gutter="0">
          <flexbox-item :span="12" class="order-item-content">
            <span class="order-type-transfer" v-if="i.demandid == '0'">
              {{$t("home.mail.order.transferText")}}&nbsp;
            </span>
            <span v-if="userInfo.idnum == i.from.idnum">{{$t("home.mail.order.meText")}}</span>
            <span v-else>ID：{{i.from.idnum}}</span>
              {{$t("home.mail.order.sellText")}}
            <span v-if="userInfo.idnum == i.to.idnum">{{$t("home.mail.order.meText")}}</span>
            <span v-else>ID：{{i.to.idnum}}</span>
            <span class="order-item-content-price">{{i.amount}}ETH</span>
              ，{{$t("home.mail.order.priceText")}}
            <span class="order-item-content-price"> {{i.price}} </span>{{$t("home.mail.order.yuanText")}}，
            , {{$t("home.mail.order.allPriceText")}}<span class="order-item-content-price"> {{i.toatlamount}} </span>{{$t("home.mail.order.yuanText")}}。
          </flexbox-item>
        </flexbox>
        <flexbox :gutter="0" style="margin-top: 5px;">
          <flexbox-item :span="3" class="order-item-chat">
            <button class="order-btn order-btn-chat" @click="gotoChat(i)">{{$t("home.mail.order.chatText")}}</button>
          </flexbox-item>
          <flexbox-item :span="3" class="order-item-userInfo">
            <button class="order-btn order-btn-buy" v-if="i.state == 2 && i.from.userid == userInfo.userid" @click="showUserInfo(i, 'buy')">{{$t("home.mail.order.buyInfoText")}}</button>
            <button class="order-btn order-btn-sell" v-if="i.state == 0 && i.to.userid == userInfo.userid" @click="showUserInfo(i, 'sell')">{{$t("home.mail.order.sellInfoText")}}</button>
          </flexbox-item>
          <flexbox-item :span="3" class="order-item-commit">
            <button class="order-btn order-btn-pay" v-if="i.state == 0 && i.to.userid == userInfo.userid" @click="setOrder(i, 'true')">{{$t("home.mail.order.commitPayText")}}</button>
            <button class="order-btn order-btn-coin" v-if="i.state == 2 && i.from.userid == userInfo.userid" @click="setOrder(i, 'true')">{{$t("home.mail.order.commitCoinText")}}</button>
          </flexbox-item>
          <flexbox-item :span="3" class="order-item-cancel">
            <button class="order-btn order-btn-cancel" v-if="i.state == 0 && i.to.userid == userInfo.userid" @click="setOrder(i, 'false')">{{$t("home.mail.order.cancelText")}}</button>
            <span v-if="i.state == 0 && i.from.userid == userInfo.userid" class="order-state">{{$t("home.mail.order.waitBuyText")}}</span>
            <span v-if="i.state == 2 && i.to.userid == userInfo.userid" class="order-state">{{$t("home.mail.order.waitSellText")}}</span>
          </flexbox-item>
        </flexbox>
      </li>
    </ul>
    <x-dialog v-model="dialogShow" :hide-on-blur="true">
      <order-user :type="userType" :userInfo="orderUserInfo" v-on:closeDialog="closeDialog"></order-user>
    </x-dialog>
    <load-more tip="loading" v-show="isMoreLoading"></load-more>
      <div style="padding: 30px 30px;font-size: 0.8rem;" v-show="orderList.length == 0">
        <divider>
          {{ $t("home.user.bill.noData") }}
        </divider>
      </div>
    </div>
</template>

<script>
import { Flexbox, FlexboxItem, LoadMore, Divider, XDialog } from 'vux';
import OrderUser from './components/OrderUser.vue';
import { getOrder, setOrder } from '../../api/eth.js';
import auth from '../../utils/auth.js';
export default {
  name: 'order',
  components: {
    Flexbox,
    FlexboxItem,
    LoadMore,
    Divider,
    XDialog,
    OrderUser
  },
  data() {
    return {
      userInfo: JSON.parse(auth.getUserInfo()),
      pageIndex: 1,
      dividerIsShow: false,
      isMoreLoading: false,
      dialogShow: false,
      userType: 'buy',
      orderUserInfo: {

      },
      list: []
    }
  },
  computed: {
    orderList () {
      return this.list.filter(e => e.state != '4' && e.state != '3');
    }
  },
  methods: {
    /**
     * [获取订单]
     */
    getUserOrder: async function() {
      try {
        let res = await getOrder({
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
            this.list = this.list.concat(data.list);
          }
          if (localStorage.getItem('chatList').length / 1024 > 1500) {
            let userIdArr = [];
            data.list.forEach(i => {
              i.from.userid != this.userInfo.userid ? userIdArr.push(i.from.userid) : userIdArr.push(i.to.userid);
            })
            userIdArr = new Array(...new Set(userIdArr));
            this.clearChatHistory(userIdArr);
          }
        } else {
          this.vuxUtils.apiError(this, res.data, this.$t('home.mail.order.getOrderErrorText'));
        }
      } catch(e) {
        this.vuxUtils.showWarn(this.$t('home.mail.order.getOrderErrorText'));
      }
    },
    /**
    * [gotoChat 聊天]
    */
    gotoChat(data) {
      let toId = data.to.userid;
      let fromId = data.from.userid;
      this.$router.push({
        name: 'chat',
        params: {
          name: this.userInfo.userid == toId ? data.from.idnum : data.to.idnum,
          userId: this.userInfo.userid == toId ? fromId : toId,
          type: 'user',
          userType: 'user'
        }
      })
    },
    /**
     * [showUserInfo 查看用户信息]
     */
    showUserInfo(data, type) {
      if (type == 'buy') {
        this.userType = 'buy';
        this.orderUserInfo = data.to
      } else {
        this.userType = 'sell';
        this.orderUserInfo = data.from;
      }
      this.dialogShow = true;
    },
    closeDialog() {
      this.dialogShow = false;
    },
    /**
     * [setOrder 设置订单]
     */
    setOrder(data, type) {
      let that = this;
      this.$vux.confirm.show({
        title: this.$t('home.mail.order.passwordText'),
        placeholder: this.$t('home.mail.order.passwordPlaceholderText'),
        inputAttrs: {
          maxLength: 8,
          type: 'password'
        },
        showInput: true,
        confirmText: this.$t('home.user.setting.exitConfirmBtnText'),
        cancelText: this.$t('home.user.setting.exitCancelBtnText'),
        onConfirm: (value) => {
          if (this.valid.isStrEmpty(value)) {
            return that.vuxUtils.showWarn(this.$t('home.mail.order.passwordEmptyText'));
          }
          that.submitOrder(data.id, value, type);
        }
      })
    },
    /**
     * [提交订单]
     */
    submitOrder: async function(id, pin, ok) {
      try {
        let res = await setOrder({
          id,
          pin,
          ok
        });
        if (res.data.succeed == 'true') {
          this.$vux.toast.show(this.$t('home.mail.order.setSuccess'));
          let data = res.data.data;
          let index = this.list.findIndex(e => e.id == id);
          this.list[index] = Object.assign(this.list.find(e => e.id == id), data);
        } else {
          this.vuxUtils.apiError(this, res.data, this.$t('home.mail.order.setFail'));
        }
      } catch(e) {
        return that.vuxUtils.showWarn(this.$t('home.mail.order.setFail'));
      }
    },
    /**
     * [clearChatHistory 删除聊天记录]
     * @param  {[Array]} data [存在的订单列表]
     */
    clearChatHistory(data) {
      let chatList = JSON.parse(localStorage.getItem('chatList'));
      chatList.forEach((item, index) => {
        let chat = data.filter(e => {
          return item.userId == e;
        });
        if (chat.length === 0) {
          chatList.splice(index, 1);
        }
      })
      localStorage.setItem('chatList', JSON.stringify(chatList))
    },
    /**
     * [initScroll 初始化滚动条加载]
     */
    initScroll() {
      //初始化滚动加载
      const that = this;
      document.getElementById('order').onscroll= function(){
        const bodyHeight = document.getElementById('order').scrollHeight;
        const clientHeight = document.getElementById('order').clientHeight;
        const scrollAllHeight = bodyHeight - clientHeight;
        const scrollTop = document.getElementById('order').scrollTop;
        if ((scrollTop > 0) && (scrollAllHeight - scrollTop) < 10 && !that.isMoreLoading && !that.dividerIsShow) {
          that.isMoreLoading = true;
          that.pageIndex++;
          that.getUserOrder();
        }
      }
    },
  },
  mounted() {
    // this.initScroll();
    this.getUserOrder();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./Home.scss"
</style>