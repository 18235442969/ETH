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

export {
	getPriceSet
}