/**
 *	作者：卞玉苹 2535012967@qq.com
 *	日期：2017-12-23 17:50
 *	描述：于以上日期完成测试定型，该文件为主导文件，主要功能是对其他功能模块发出请求并获取到对象参数返回使用。
 */
var AI = (function(a){

	var configure = new Array(),
		Timeout = null,
		Interval = null,
		mouseList = ['e-resize','nw-resize','n-resize','ne-resize'],
		section = false;

	configure['Treat_String'] = {
		type : false,
		src : 'treat_string.js',
		object : null
	};

	configure['test'] = {
		type : false,
		src : 'test.js',
		object : null
	};

	a.setModule = function(string,src,type){
		type = type || false;

		if(configure[string]){
			alert('模块重名，操作驳回');
			return;
		}else{
			configure[string] = {
				type : false,
				src : src,
				object : null
			}

			if(type){
				configure[string].time = Number(new Date());
			}
			console.log('添加自定义模块',configure[string]);
		}
	}


	a.requestJS = function(src,string){
		open_onload();

		var request = new XMLHttpRequest();

		request.open('get',src,false);

		request.onreadystatechange = function(){
			if(request.readyState === 4){
				if(
					request.status >= 200
					&& request.status <= 300
					|| request.status === 304
				){
					if(string){
						configure[string].type = true;

						configure[string].object = eval(request.responseText);
					}else{
						var script = window.document.createElement('script');

						script.type = 'text/javascript';
						script.text = request.responseText;

						window.document.body.appendChild(script);
					}
					close_onload();
				}
			}
		}
		request.send(null);
		if(string){
			return configure[string].object;
		}else{
			return null;
		}
	}

	a.require = function(string){
		var loadType = configure[string].type,
			type = configure[string].time ? true : false,
			JSSrc = configure[string].src + (type ? '?v=' + configure[string].time : '');

		if(loadType){
			return configure[string].object;
		}

		return a.requestJS(JSSrc,string);
	}

	// 调起加载条
	function open_onload(){
		if(!section){
			var i = 0;
			section = window.document.createElement('section');
			section.style.setProperty('position','absolute');
			section.style.setProperty('left','0px');
			section.style.setProperty('top','0px');
			section.style.setProperty('width','100%');
			section.style.setProperty('height','100%');
			section.style.setProperty('z-index','9999');
			window.document.body.appendChild(section);
			Interval = setInterval(function(){
				if(i == mouseList.length){
					i = 0;
				}
				section.style.setProperty('cursor',mouseList[i]);
				i++;
			},1000/16);
		}
	}

	function close_onload(){
		clearInterval(Interval);
		if(section){
			section.parentNode.removeChild(section);
			section = false;
		}
	}

	return a;
})(AI || {});