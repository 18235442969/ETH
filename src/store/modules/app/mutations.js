const CHANGELANGUAGE = (state, language) => {
  state.language = language
}

const CHANGETABINDEX = (state, index) => {
  state.appHomeTabIndex = index
}

export default {
	CHANGELANGUAGE,
  CHANGETABINDEX
}
