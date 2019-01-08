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
 * [获取配置]
 */
const getConfig = () => {
	const data = {};
	return service.post('/getconfig', data);
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
 * [修改登录密码]
 * @param  {[String]} options.cc  [国家区号]
 * @param  {[String]} options.mob  [账号]
 * @param  {[String]} options.pw   [密码]
 * @param  {[String]} options.code [验证码]
 */
const resetPw = ({cc, mob, pw, code }) => {
	const data = {
		cc,
		mob,
		pw,
		code
	};
	return service.post('/resetpw', data);
}

/**
 * [获取用户个人信息]
 * @param  {[type]} options.uid [用户id]
 */
const getUserInfo = ({uid}) => {
	const data = {
		uid
	};
	return service.post('/getuserinfo', data);
}

/**
 * [获取个人资产]
 */
const getBalance  = () => {
	const data = {};
	return service.post('/getbalance', data);
}

/**
 * [获取平台公告]
 */
const getNotice  = () => {
	const data = {};
	return service.post('/getnotice', data);
}

/**
 * [设置用户收款方式]
 * @param  {[String]} options.alipay [支付宝]
 * @param  {[String]} options.wechat [微信]
 * @param  {[String]} options.bank   [开户行]
 * @param  {[String]} options.card   [银行卡号]
 * @param  {[String]} options.acc    [姓名]
 * @param  {[String]} options.mob    [银行卡预留手机号]
 */
const setUsertInfo  = ({ alipay='', wechat='', bank='', card='', acc='', bankmob=''}) => {
	const data = {
		alipay,
		wechat,
		bank,
		card,
		acc,
		bankmob
	};
	return service.post('/setusertinfo', data);
}

/**
 * [设置交易密码]
 * @param  {[String]} options.pin  [交易密码]
 * @param  {[String]} options.mob  [账号]
 * @param  {[String]} options.code [验证码]
 */
const setPin = ({pin, mob, code}) => {
	const data = {
		pin,
		mob,
		code
	};
	return service.post('/setpin', data);
}

/**
 * [获取我的推荐]
 * @param  {[type]} options.userId [用户id]
 * @param  {[type]} options.pi     [页码]
 * @param  {[type]} options.ps     [页数]
 */
const getUserChilds = ({userid, pi=1, ps=20}) => {
	const data = {
		userid,
		pi,
		ps
	};
	return service.post('/getuserchilds', data);
}

/**
 * [获取我的推荐]
 * @param  {[type]} options.pi     [页码]
 * @param  {[type]} options.ps     [页数]
 */
const getFamily = ({pi=1, ps=20}) => {
	const data = {
		pi,
		ps
	};
	return service.post('/getmembers', data);
}

/**
 * [获取账单]
 * @param  {[Number]} options.type [类型]
 * @param  {Number} options.pi   [页数]
 * @param  {Number} options.ps   [数量]
 */
const getDetail = ({type, pi=1, ps=20}) => {
	const data = {
		pi,
		ps
	};
	if (type) {
		data.type = type;
	}
	return service.post('/getdetail', data);
}

/**
 * [获取客服信息]
 */
const getService = () => {
	const data = {};
	return service.post('/getservice', data);
}

/**
 * [上传]
 * @param  {[String]} options.fn  [名称]
 * @param  {[String]} options.pic [64字符串]
 */
const upload = ({fn, pic}) => {
	const data = {
		fn,
		pic
	};
	return service.post('/upload', data);
}

export {
	login,
	sendCode,
	regist,
	resetPw,
	getUserInfo,
	getBalance,
	setUsertInfo,
	setPin,
	getUserChilds,
	getFamily,
	getNotice,
	getDetail,
	getService,
	upload,
	getConfig
}