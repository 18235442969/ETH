/*
* @Author: monkey
* @Date:   2018-09-27 14:20:51
* @Last Modified by:   monkey
* @Last Modified time: 2018-09-27 14:29:25
*/
import Vue from "vue";

/**
 * [显示loading]
 */
const showToast = (msg='加载中...') => {
  Vue.$vux.loading.show({
    text: msg
  });
}

/**
 * [隐藏loading]
 */
const hideToast = () => {
  Vue.$vux.loading.hide();
}

/**
 * [报错提示]
 * @param  {[string]} msg [提示信息]
 */
const showWarn = (msg) => {
	Vue.$vux.toast.show({
		text: msg,
    type: 'warn',
    time: 1000
	})
}

/**
 * [错误信息]
 * @param  {[type]} vue  [vue指向]
 * @param  {[type]} data [返回数据]
 * @param  {[type]} text [提示信息]
 */
const apiError = (vue, data, text) => {
	let errorCodeList = ['100', '101', '102', '10', '201', '200', '202', '302', '301', '303', '5'];
	let str = errorCodeList.includes(data.code) ? vue.$t(`errorCode.${data.code}`) : text;
	Vue.$vux.toast.show({
		text: str,
    type: 'warn',
    time: 1000
	})
}

export default {
	showToast,
	hideToast,
	showWarn,
	apiError
}