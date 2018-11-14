/**
 * [改变语言]
 * @param  {[String]} language [语言]
 */
const changeLanguage = ({state, commit, rootState}, language) => {
  commit('CHANGELANGUAGE', language)
}

export default {
  changeLanguage,
}
