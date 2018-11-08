/**
 * [改变标题内容]
 * @param  {[String]} title [标题]
 */
const changeAppTitle = ({state, commit, rootState}, title) => {
  commit('CHANGEAPPTITLE', title)
}

export default {
  changeAppTitle,
}
