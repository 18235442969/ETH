import { getService } from '../../../api/user.js';
import { getPriceSet } from '../../../api/eth.js';

/**
 * [改变语言]
 * @param  {[String]} language [语言]
 */
const changeLanguage = ({state, commit, rootState}, language) => {
  commit('CHANGELANGUAGE', language)
}

/**
 * [切换tab]
 * @param  {[Number]} index  [底部索引]
 */
const changeTabIndex = ({state, commit, rootState}, index) => {
  commit('CHANGETABINDEX', index)
}

/**
 * [获取最新ETH币价]
 */
const getEthPrice = ({state, commit, rootState}) => {
	return new Promise((resolve, reject) => {
		getPriceSet().then(res => {
			commit('CHANGEPRICE', res.data.data.current);
			resolve(res);
		}).catch(err => {
			reject(err);
		})
	});
}

/**
 * [改变聊天资料]
 */
const changeUserChat = ({state, commit, rootState}, data) => {
  commit('CHANGEUSERCHAT', data)
}

/**
 * [获取客服信息]
 */
const getUserService = ({state, commit, rootState}) => {
	return new Promise((resolve, reject) => {
		getService().then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		})
	});
}

export default {
  changeLanguage,
  changeTabIndex,
  getEthPrice,
  changeUserChat,
  getUserService
}
