/*
* @Author: monkey
* @Date:   2018-09-27 11:50:23
* @Last Modified by:   monkey
* @Last Modified time: 2018-09-27 11:55:55
*/
import service from '@/utils/service';

/**
 * [获取最新ETH价格]
 */
const getPriceSet  = () => {
	const data = {};
	return service.post('/getpriceSet', data);
}

/**
 * [投入ETH]
 * @param  {[String]} options.amt [数量]
 * @param  {[String]} options.pin [交易密码]
 */
const setInvest = ({amt, pin}) => {
	const data = {
		amt,
		pin
	};
	return service.post('/setinvest', data);
}

/**
 * [获取投资列表]
 * @param  {[Number]} options.pi [页数]
 * @param  {[Number]} options.ps [数量]
 */
const getInvestSet = ({pi, ps=20}) => {
	const data = {
		pi,
		ps
	};
	return service.post('/getinvestset', data);
}

/**
 * [赎回ETH]
 * @param  {[Number]} options.id  [id]
 * @param  {[String]} options.pin [交易密码]
 */
const unInvest = ({ id, pin }) => {
	const data = {
		id,
		pin
	};
	return service.post('/uninvest', data);
}

/**
 * [充值]
 * @param  {[Number]} options.amt [数量]
 * @param  {[String]} options.addr [地址]
 */
const cashin = ({ amt, addr }) => {
	const data = {
		amt,
		addr
	};
	return service.post('/cashin', data);
}

/**
 * [提现]
 * @param  {[Number]} options.amt [数量]
 * @param  {[String]} options.addr [地址]
 * @param  {[String]} options.pin [交易密码]
 */
const cashout = ({ amt, addr, pin }) => {
	const data = {
		amt,
		addr,
		pin
	};
	return service.post('/cashout', data);
}

/**
 * [转账]
 * @param  {[String]} options.amt [数量]
 * @param  {[String]} options.to  [地址]
 * @param  {[String]} options.pin [交易密码]
 * @param  {[String]} options.price [单价]
 */
const transfer = ({ amt, to, pin, price }) => {
	const data = {
		amt,
		to,
		pin,
		price
	};
	return service.post('/transfer', data);
}

/**
 * [获取订单]
 * @param  {Number} options.ps [页数]
 * @param  {Number} options.pi [页码]
 */
const getOrder = ({ps=20, pi=1}) => {
	const data = {
		ps,
		pi
	};
	return service.post('/getorders', data);
}

/**
 * [确认取消订单]
 * @param  {[String]} options.id  [订单id]
 * @param  {[String]} options.pin [支付密码]
 * @param  {[Bool]} options.ok  [确认/取消]
 */
const setOrder = ({id, pin, ok}) => {
	const data = {
		id,
		pin,
		ok
	};
	return service.post('/setorder', data);
}

export {
	getPriceSet,
	setInvest,
	getInvestSet,
	unInvest,
	cashin,
	cashout,
	transfer,
	getOrder,
	setOrder
}