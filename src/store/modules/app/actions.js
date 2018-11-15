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
			resolve(res);
		}).catch(err => {
			reject(err);
		})
	});
}

export default {
  changeLanguage,
  changeTabIndex,
  getEthPrice
}
