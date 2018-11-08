/*
* @Author: monkey
* @Date:   2018-10-09 17:27:05
* @Last Modified by:   monkey
* @Last Modified time: 2018-10-09 17:38:46
*/



/**
 * [替换表情]
 * @param  {[string]} str [字符串]
 */
// const changeExpression = (str) => {
// 	str = str.replace(/&lt扮鬼脸&gt/g, "&nbsp;<img src='static/image/biaoqing/banguilian.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt鄙视&gt/g, "&nbsp;<img src='static/image/biaoqing/bishi.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt闭嘴&gt/g, "&nbsp;<img src='static/image/biaoqing/bizui.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt不开心&gt/g, "&nbsp;<img src='static/image/biaoqing/bukaixin.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt发抖&gt/g, "&nbsp;<img src='static/image/biaoqing/fadou.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt发怒&gt/g, "&nbsp;<img src='static/image/biaoqing/fanu.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt愤怒&gt/g, "&nbsp;<img src='static/image/biaoqing/fennu.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt尴尬&gt/g, "&nbsp;<img src='static/image/biaoqing/ganga.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt鬼脸&gt/g, "&nbsp;<img src='static/image/biaoqing/guilian.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt奸笑&gt/g, "&nbsp;<img src='static/image/biaoqing/jianxiao.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt挤眉弄眼&gt/g, "&nbsp;<img src='static/image/biaoqing/jimeinongyan.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt惊呆&gt/g, "&nbsp;<img src='static/image/biaoqing/jingdai.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt惊奇&gt/g, "&nbsp;<img src='static/image/biaoqing/jingqi.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt开心&gt/g, "&nbsp;<img src='static/image/biaoqing/kaixin.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt可爱&gt/g, "&nbsp;<img src='static/image/biaoqing/keai.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt哭&gt/g, "&nbsp;<img src='static/image/biaoqing/ku.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt酷&gt/g, "&nbsp;<img src='static/image/biaoqing/ku4.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt满足&gt/g, "&nbsp;<img src='static/image/biaoqing/manzu.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt难过&gt/g, "&nbsp;<img src='static/image/biaoqing/nanguo.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt亲亲&gt/g, "&nbsp;<img src='static/image/biaoqing/qinqin.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt色&gt/g, "&nbsp;<img src='static/image/biaoqing/se.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt生气&gt/g, "&nbsp;<img src='static/image/biaoqing/shengqi.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt失落&gt/g, "&nbsp;<img src='static/image/biaoqing/shiluo.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt睡觉&gt/g, "&nbsp;<img src='static/image/biaoqing/shuijiao.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt叹气&gt/g, "&nbsp;<img src='static/image/biaoqing/tanqi.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt叹息&gt/g, "&nbsp;<img src='static/image/biaoqing/tanxi.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt吐舌头&gt/g, "&nbsp;<img src='static/image/biaoqing/tushetou.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt微笑&gt/g, "&nbsp;<img src='static/image/biaoqing/weixiao.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt笑哭&gt/g, "&nbsp;<img src='static/image/biaoqing/xiaoku.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt要发怒&gt/g, "&nbsp;<img src='static/image/biaoqing/yaofanu.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	str = str.replace(/&lt忧伤&gt/g, "&nbsp;<img src='static/image/biaoqing/youshang.png' style='width: 1.5rem;height: 1.5rem;'>&nbsp;");
// 	return str;
// }

const changeExpression = (str) => {
	str = str.replace(/&lt扮鬼脸&gt/g, "static/image/biaoqing/banguilian.png");
	str = str.replace(/&lt鄙视&gt/g, "static/image/biaoqing/bishi.png");
	str = str.replace(/&lt闭嘴&gt/g, "static/image/biaoqing/bizui.png");
	str = str.replace(/&lt不开心&gt/g, "static/image/biaoqing/bukaixin.png");
	str = str.replace(/&lt发抖&gt/g, "static/image/biaoqing/fadou.png");
	str = str.replace(/&lt发怒&gt/g, "static/image/biaoqing/fanu.png");
	str = str.replace(/&lt愤怒&gt/g, "static/image/biaoqing/fennu.png");
	str = str.replace(/&lt尴尬&gt/g, "static/image/biaoqing/ganga.png");
	str = str.replace(/&lt鬼脸&gt/g, "static/image/biaoqing/guilian.png");
	str = str.replace(/&lt奸笑&gt/g, "static/image/biaoqing/jianxiao.png");
	str = str.replace(/&lt挤眉弄眼&gt/g, "static/image/biaoqing/jimeinongyan.png");
	str = str.replace(/&lt惊呆&gt/g, "static/image/biaoqing/jingdai.png");
	str = str.replace(/&lt惊奇&gt/g, "static/image/biaoqing/jingqi.png");
	str = str.replace(/&lt开心&gt/g, "static/image/biaoqing/kaixin.png");
	str = str.replace(/&lt可爱&gt/g, "static/image/biaoqing/keai.png");
	str = str.replace(/&lt哭&gt/g, "static/image/biaoqing/ku.png");
	str = str.replace(/&lt酷&gt/g, "static/image/biaoqing/ku4.png");
	str = str.replace(/&lt满足&gt/g, "static/image/biaoqing/manzu.png");
	str = str.replace(/&lt难过&gt/g, "static/image/biaoqing/nanguo.png");
	str = str.replace(/&lt亲亲&gt/g, "static/image/biaoqing/qinqin.png");
	str = str.replace(/&lt色&gt/g, "static/image/biaoqing/se.png");
	str = str.replace(/&lt生气&gt/g, "static/image/biaoqing/shengqi.png");
	str = str.replace(/&lt失落&gt/g, "static/image/biaoqing/shiluo.png");
	str = str.replace(/&lt睡觉&gt/g, "static/image/biaoqing/shuijiao.png");
	str = str.replace(/&lt叹气&gt/g, "static/image/biaoqing/tanqi.png");
	str = str.replace(/&lt叹息&gt/g, "static/image/biaoqing/tanxi.png");
	str = str.replace(/&lt吐舌头&gt/g, "static/image/biaoqing/tushetou.png");
	str = str.replace(/&lt微笑&gt/g, "static/image/biaoqing/weixiao.png");
	str = str.replace(/&lt笑哭&gt/g, "static/image/biaoqing/xiaoku.png");
	str = str.replace(/&lt要发怒&gt/g, "static/image/biaoqing/yaofanu.png");
	str = str.replace(/&lt忧伤&gt/g, "static/image/biaoqing/youshang.png");
	return str;
}

export {
	changeExpression
}