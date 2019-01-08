const CHANGELANGUAGE = (state, language) => {
  state.language = language;
}

const CHANGETABINDEX = (state, index) => {
  state.appHomeTabIndex = index;
}

const CHANGEUSERCHAT = (state, data) => {
  state.userChat = data;
}

const CHANGEPRICE = (state, data) => {
	state.coinPrice = data;
}

const CHANGECONFIG = (state, data) => {
  state.interestRate = data;
}

export default {
	CHANGELANGUAGE,
  CHANGETABINDEX,
  CHANGEUSERCHAT,
  CHANGEPRICE,
  CHANGECONFIG
}
