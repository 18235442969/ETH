const CHANGELANGUAGE = (state, language) => {
  state.language = language
}

const CHANGETABINDEX = (state, index) => {
  state.appHomeTabIndex = index
}

const CHANGEUSERCHAT = (state, data) => {
  state.userChat = data
}

export default {
	CHANGELANGUAGE,
  CHANGETABINDEX,
  CHANGEUSERCHAT
}
