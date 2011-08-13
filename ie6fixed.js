/**
 * @fileOverview ie6fixed module
 * @copyright (c) 2011 
 * @author jianjun768@gmail.com
 * @version 1.0
 * @depend jquery.js 
 */

define(function(require, exports, module){
	var $ = require("jquery");

	/**
	 * fixed定位
	 * @param {jquery object} obj 
	 * @param {string / function} position 定位方式，position可以是cc lt rt lb rb字符串，也可以是自定义的定位函数 
	 */
	exports.fixed = function(obj, position){
		var obj = obj, fixed;
		fixed = function( pos ){
			obj[0].style.removeExpression('top');
			var dom = '(document.documentElement || document.body)', ch;
			
			switch(position){
				case "lt" : 
				case "rt" :
					obj[0].style.setExpression("top", 'eval('+ dom + '.scrollTop + ' + 0 + ') + "px"');	
					break ;
				case "cc" :
					ch = window.innerHeight || (document.documentElement || document.body).clientHeight;
					obj[0].style.setExpression("top", 'eval('+ dom + '.scrollTop + ' + (ch / 2) + ') + "px"');
					break ;
				case "lb" :
				case "rb" :
					obj[0].style.setExpression("top", 'eval('+ dom + '.scrollTop + ' + ($(window).height()-obj.outerHeight()) + ') + "px"');
					break ;
				default:
					obj[0].style.setExpression("top", 'eval('+ dom + '.scrollTop + ' + obj.offset().top + ') + "px"');
			}
		}
		if( $.isFunction(position) ){
			fixed = position;
		}

		if($.browser.msie && parseInt($.browser.version) <= 6){
			
			var html = document.getElementsByTagName('html')[0];
			if (document.body.currentStyle.backgroundAttachment !== 'fixed') {
				html.style.backgroundImage = 'url(about:blank)';
				html.style.backgroundAttachment = 'fixed';
			};

			obj.css("position","absolute");			
			fixed( position );
			
			$(window).bind("resize", function(){
				fixed( position );
			});
		}
	}
});
