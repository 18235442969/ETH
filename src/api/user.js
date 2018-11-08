/*
* @Author: monkey
* @Date:   2018-09-27 11:50:23
* @Last Modified by:   monkey
* @Last Modified time: 2018-09-27 11:55:55
*/
import service from '@/utils/service';

/**
 * [登录]
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
 */
const sendCode  = ({ mob }) => {
	const data = {
		mob
	};
	return service.post('/SendCode', data);
}

export {
	login,
	sendCode
}