/*
* @Author: monkey
* @Date:   2018-09-27 11:50:23
* @Last Modified by:   monkey
* @Last Modified time: 2018-09-27 11:55:55
*/
import service from '@/utils/service';

/**
 * [登录]
 * @param  {[type]} options.appkey  [手机号]
 * @param  {[type]} options.md5Password   [密码]
 */
const login = ({ appkey, md5Password }) => {
	const data = {
		appkey,
		md5Password,
	};
	return service.post('/login', data);
}

/**
 * [发送验证码]
 * @param  {[type]} options.mob  [手机号]
 */
const sendCode  = ({ mob }) => {
	const data = {
		mob
	};
	return service.post('/sendcode', data);
}

/**
 * [注册]
 * @param  {[type]} options.cc  [国家区号]
 * @param  {[type]} options.mob  [手机号]
 * @param  {[type]} options.pw   [密码]
 * @param  {[type]} options.pmob [推荐人id或者手机号]
 * @param  {[type]} options.code [验证码]
 */
const regist  = ({ cc, mob, pw, pmob, code }) => {
	const data = {
		cc,
		mob,
		pw,
		pmob,
		code
	};
	return service.post('/regist', data);
}

/**
 * [获取个人资产]
 */
const getBalance  = () => {
	const data = {};
	return service.post('/getbalance', data);
}

export {
	login,
	sendCode,
	regist,
	getBalance
}