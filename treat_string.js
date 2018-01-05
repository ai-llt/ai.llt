/**
 *	作者：卞玉苹 2535012967@qq.com
 *	日期：2018-01-05 --:--
 *	描述：提供字符串处理能力的模块
 */
(function(){

	var Treat = (function(obj){

		/* 翻转字符串 */
		obj.reversal = function(string){
			console.log('翻转字符串');
		}

		/* 判断字符串是否回文 */
		obj.judge_palindrome = function(string){
			console.log('回文判断');
			return true;
		}
		return obj;
	})(Treat || {});
	return Treat;
})();