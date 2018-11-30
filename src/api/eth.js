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
 * @param  {[String]} options.acc [地址]
 */
const cashin = ({ amt, acc }) => {
	const data = {
		amt,
		acc
	};
	return service.post('/cashin', data);
}

/**
 * [提现]
 * @param  {[Number]} options.amt [数量]
 * @param  {[String]} options.acc [地址]
 * @param  {[String]} options.pin [交易密码]
 */
const cashout = ({ amt, acc, pin }) => {
	const data = {
		amt,
		acc,
		pin
	};
	return service.post('/cashout', data);
}

export {
	getPriceSet,
	setInvest,
	getInvestSet,
	unInvest,
	cashin,
	cashout
}