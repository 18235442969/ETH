/*
* @Author: monkey
* @Date:   2018-09-20 10:39:50
* @Last Modified by:   monkey
* @Last Modified time: 2018-10-09 15:47:16
*/
import Vue from 'vue'
import axios from 'axios'
import md5 from 'js-md5'
import appConfig from '../utils/config.js';
import auth from '../utils/auth.js';

// 网上测试
const baseURL = appConfig.apiUrl;
// 本地发布
// const baseURL = 'http://192.168.1.111:9000'

/**
 * [bubbleSort 方法排序]
 */
const bubbleSort = (r) => {
  var i, j; //交换标志
  var temp;
  var exchange;
  for (i = 0; i < r.length; i++) {
    exchange = false; //本趟排序开始前，交换标志应为假
    for (j = r.length - 2; j >= i; j--) {
      if (r[j + 1].localeCompare(r[j]) < 0) {
        temp = r[j + 1];
        r[j + 1] = r[j];
        r[j] = temp;
        exchange = true;
      }
    }
    if (!exchange) { //本趟排序未发生交换，提前终止算法
      break;
    }
  }
  return r;
};

const service = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret;
  }]
})

service.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

service.interceptors.request.use(config => {
  //判断加载配置文件的请求
  // const configFun = ['config', 'registn', 'logn'];
  // if ( configFun.includes(config.url.substring(1))) {
  //   config.data.os = appConfig.os;
  //   config.data.v = appConfig.v;
  //   config.data.b = appConfig.b;
  //   if ( window.plus ) {
  //     if (plus.device.imei.trim() !== '') {
  //       config.data.imei = plus.device.imei;
  //     }
  //     if (plus.device.imsi.length > 0) {
  //       config.data.imsi = plus.device.imsi[0];
  //     }
  //   }
  // }

  let initParams = {
    server: appConfig.server,
    appkey: config.url.substring(1) == 'login' ? config.data.appkey : config.url.substring(1),
    time: new Date().getTime(),
    format: appConfig.format,
    method: config.url.substring(1)
  }
  config.headers['server'] = initParams.server;
  config.headers['appkey'] = initParams.appkey;
  config.headers['time'] = initParams.time;
  config.headers['method'] = initParams.method;
  config.headers['format'] = initParams.format;
  //登录后从缓存拿取用户信息
  if (auth.getUserInfo()) {
    let localUserInfo = JSON.parse(auth.getUserInfo());
    config.headers['appkey'] = localUserInfo.mob;
    initParams.appkey = localUserInfo.mob;
  }

  let md5Password = config.data.md5Password || localStorage.getItem('password') || config.url.substring(1);
  delete config.data.md5Password;
  delete config.data.appkey;

  let signData = Object.assign(initParams, config.data);
  if (signData.method === 'upload') {
    config.headers['appkey'] = 'upload';
    md5Password = 'upload';
    config.data.pic = config.data.pic.replace(/\+/g, '%2B');
    signData.pic = signData.pic.replace(/\+/g, '%2B');
  }
  if (signData.method === 'resetpw') {
    config.headers['appkey'] = config.url.substring(1);
    md5Password = config.url.substring(1);
  }
  let sign = '';
  let signArr = [];
  for (let k in signData) {
    signArr.push(k);
  }
  signArr = bubbleSort(signArr);

  for (let i of signArr) {
    sign += `${i}=${signData[i]}`
  }
  config.headers['sign'] = md5(sign+md5(md5Password));

  config.url = '';
  return config;
}, error => {
  console.log('Request Error' + error)
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response
}, error => {
  console.log('Response Error' + error);
  return Promise.reject(error)
})

export default service;
