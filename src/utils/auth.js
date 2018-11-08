const userInfo = 'user-info'

const getUserInfo = () => {
  return localStorage.getItem(userInfo)
}

const setUserInfo = (data) => {
  return localStorage.setItem(userInfo, data)
}

const removeUserInfo = () => {
  return localStorage.removeItem(userInfo)
}

export default {
  getUserInfo,
  setUserInfo,
  removeUserInfo
}
