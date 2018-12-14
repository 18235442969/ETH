let language = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'zh';

let appHomeTabIndex = 0;

let ethPrice = 0;

let userChat = JSON.parse(localStorage.getItem('chatList')) || [];

export default {
  language,
  appHomeTabIndex,
  ethPrice,
  userChat
}
