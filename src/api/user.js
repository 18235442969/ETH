/*
* @Author: monkey
* @Date:   2018-09-27 11:50:23
* @Last Modified by:   monkey
* @Last Modified time: 2018-09-27 11:55:55
*/
import service from '@/utils/service';

/**
 * [登录]
 * @param  {[type]} options.mob  [手机号]
 * @param  {[type]} options.pw   [密码]
 */
const login = ({ mob, pw }) => {
	const data = {
		mob,
		pw
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
		mob
	};
	return service.post('/regist', data);
}

export {
	login,
	sendCode,
	regist
}