/**
 * 身份证号验证
 */
const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
const ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
const isTrueValidateCodeBy18IdCard = (a_idCard) => {
    let sum = 0; // 声明加权求和变量
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
    }
    for (let i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i]; // 加权求和
    }
    let valCodePosition = sum % 11; // 得到验证码所位置
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}
/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
const isValidityBrithBy18IdCard = (idCard18) => {
    let year = idCard18.substring(6, 10);
    let month = idCard18.substring(10, 12);
    let day = idCard18.substring(12, 14);
    let temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
const isValidityBrithBy15IdCard = (idCard15) => {
    let year = idCard15.substring(6, 8);
    let month = idCard15.substring(8, 10);
    let day = idCard15.substring(10, 12);
    let temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
//去掉字符串头尾空格
const trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * [身份证验证]
 * @param  {[String]} idCard [身份证号]
 */
const idCardValidate = (idCard) => {
    // idCard = trim(idCard.replace(/ /g, "")); //去掉字符串头尾空格
    if (idCard.length == 15) {
        return isValidityBrithBy15IdCard(idCard); //进行15位身份证的验证
    } else if (idCard.length == 18) {
        let a_idCard = idCard.split(""); // 得到身份证数组
        if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) { //进行18位身份证的基本验证和第18位的验证  
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 银行卡验证
 */
//银行卡号Luhn校验算法
//luhn校验规则：16位银行卡号（19位通用）:
//1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
//2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
//3.将加法和加上校验位能被 10 整除。
//bankno为银行卡号
const luhnCheck = (bankno) => {
    var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）
    var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array(); //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9
    var arrOuShu = new Array(); //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) { //奇数位
            if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
            else arrJiShu2.push(parseInt(newArr[j]) * 2);
        } else //偶数位
            arrOuShu.push(newArr[j]);
    }
    var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }
    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }
    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }
    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
    //计算luhn值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhn = 10 - k;
    if (lastNum == luhn) {
        return true;
    } else {
        return false;
    }
}
//检查银行卡号
const checkBankNo = (bankno) => {
    var bankno = bankno.replace(/\s/g, '');
    if (bankno == "") {
        return false;
    }
    if (bankno.length < 16 || bankno.length > 19) {
        return false;
    }
    var num = /^\d*$/; //全数字
    if (!num.exec(bankno)) {
        return false;
    }
    //开头6位
    var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
        return false;
    }
    //Luhn校验
    if (!luhnCheck(bankno)) {
        return false;
    }
    return true;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * [isEmpty 判断字符串是否为空]
 * @param  {[string]}  str [字符串]
 */
const isStrEmpty = (str) => {
    if(typeof str === "undefined" || str === null || str.trim() === ""){
        return true;
    }else{
        return false;
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * [密码验证]
 * @param  {[string]} password [密码]
 */
const passwordValid = (password) => {
    let reg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
    return reg.test(password);
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * [手机号验证]
 */
const isPhone = (phone) => {
    let reg = /^1[1234567890]\d{9}$/;
    return reg.test(phone);
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * [判断数字]
 * @param  {[type]} value [内容]
 * @param  {[type]} few   [几位小数]
 */
const isNumber = (value, few) => {
    if (typeof value === 'undefined' || value === null || value.trim() === '') {
        return false;
    }
    let numberValue = Number(value);
    if (isNaN(numberValue)) {
        return false;
    }
    if (few) {
        return (numberValue+'').split('.')[1] && (numberValue+'').split('.')[1].length > 4 ? false : true;
    }
    return true;
}
export default {
    idCardValidate,
    checkBankNo,
    isStrEmpty,
    passwordValid,
    isPhone,
    isNumber
}