window.onload = function () {
	var utils = {
		getWindowSize: function() {
	        return {
	            width: this.getWindowWidth(),
	            height: this.getWindowHeight()
	        };
	    },
	    getWindowWidth: function() {
	        //浏览器的兼容
	        return window.innerWidth || document.documentElement.clientWidth;
	    },
	    getWindowHeight: function() {
	        //浏览器的兼容
	        return window.innerHeight || document.documentElement.clientHeight;
	    }
	}

	var CanvasSize = {
		width:null,		//画布宽度
		height:null,	//画布高度
		obj:null,
		ctx:null,
		init:function(arg){
			var windowSize = utils.getWindowSize();
			this.obj = document.getElementById(arg);
			this.ctx = this.obj.getContext('2d');
			if (this.ctx) {
				this.width = windowSize.width;
				this.height = Math.ceil(this.width * 0.3);
			}
			return this;
		}
	}

	var CanvasLoad = {
		width:null,		//图像宽度
		height:null,	//图像高度
		btnWidth:null,
		btnHeight:null,
		h1:{l:null,r:null},		//原横线  起始&结束位置
		h2:{l:null,r:null},		//顶部横线起始&结束位置
		h3:{l:null,r:null},		//底部横线起始&结束位置
		v1:{t:null,b:null},		//原侧边线起始&结束位置
		v2:{t:null,b:null},		//侧边线  起始&结束位置
		init:function(obj){
			this.width     = obj.obj.width  = Math.ceil(obj.width * 0.8);
			this.height    = obj.obj.height = Math.ceil(obj.height * 0.7);
			this.btnWidth  = Math.floor((this.width - (20 * 2)) / 3);
			this.btnHeight = Math.floor(this.btnWidth * 0.35); 
			this.setLineSize(obj);
			return this;
		},
		setLineSize:function(obj){
			this.h1.l = 0;
			this.h1.r = this.width;
			this.h2.l = this.h1.l  + 20;
			this.h2.r = this.width - 20;
			this.h3.l = this.h1.l  + 55;
			this.h3.r = this.width - 55;
			this.v1.t = Math.floor(this.height * 0.3);
			this.v1.b = this.height;
			this.v2.t = this.v1.t  + 20;
			this.v2.b = this.height- 55;
			return;
		}
	}

	var canvasInit = {
		timeOut_id:null,
		init: function(num, bg_color, size, load){
			//每个btn剩余宽度
			var surplus = Math.floor((load.btnWidth - (20 * 2) - (load.btnHeight * 2)) * 0.5);
			//btn主圆弧侧边线
			var v3 = {
				t : load.v2.t + (surplus * 0.3),
				b : load.v2.b
			};

			//btn十等分宽度
			var btn_w = Math.floor(load.btnWidth / 20);

			//水平运动距离
			var h_line = load.btnWidth * num;

			var i = 0;

			this.timeOut_id = setInterval(function() {
				canvasInit.start(size, load, bg_color, surplus, btn_w, h_line, v3, i);
				i++;
			}, 10);
			return;
		},
		start: function(size, load, bg_color, surplus, btn_w, h_line, v3, i){
			var ctx = size.ctx;

			var pi = Math.PI/180;

			console.log(btn_w *i);
			console.log(h_line);
			if (i != 0 && btn_w * i >= h_line) {
				clearInterval(this.timeOut_id);return;
			}else{
				//清除canvas
				ctx.clearRect(0,0,load.width,load.height);
			}

			//动态btn左圆弧与画布顶部横线左侧起点距离
			var btnSurplus = btn_w * i + surplus;

			ctx.fillStyle = bg_color;
			//左上角起始位置开始
			ctx.beginPath();
			ctx.moveTo(load.h2.l, load.v1.t);
			ctx.lineTo(load.h2.l + btnSurplus, load.v1.t);	//顶部横线左侧

			ctx.arc(load.h2.l + btnSurplus, load.v2.t, 20, pi*270, pi*0, false);		//btn左边圆弧
			ctx.lineTo(load.h2.l + btnSurplus + 20, v3.t);								//btn左边侧边线
			ctx.arc(load.h2.l + btnSurplus + 20 + load.btnHeight, v3.t, load.btnHeight, pi*180, 0, true); //btn主圆弧
			ctx.lineTo(load.h2.l + btnSurplus + 20 + (load.btnHeight * 2), load.v2.t); 	//btn右侧侧边线
			ctx.arc(load.h2.l + btnSurplus + 20 + (load.btnHeight * 2) + 20, load.v2.t, 20, pi*180, pi*270, false); //btn右侧圆弧
			ctx.lineTo(load.h2.r, load.v1.t);//顶部横线右侧

			ctx.arc(load.h2.r, load.v2.t, 20, pi*270, 0, false);	 //右上角圆弧
			ctx.lineTo(load.h1.r, load.v2.b);	//右侧边线
			ctx.arc(load.h3.r, load.v2.b, 55, 0, pi*90, false);		 //右下角圆弧
			ctx.lineTo(load.h3.l, load.v1.b);	//底部横线
			ctx.arc(load.h3.l, load.v2.b, 55, pi*90, pi*180, false); //左下角圆弧
			ctx.lineTo(load.h1.l, load.v2.t);	//左侧边线
			ctx.arc(load.h2.l, load.v2.t, 20, pi*180, pi*270, false);//左上角圆弧
			ctx.fill();		//闭合

			//圆形btn
			ctx.beginPath();
			ctx.moveTo(load.h2.l + btnSurplus + 20 + load.btnHeight, v3.t);
			ctx.arc(load.h2.l + btnSurplus + 20 + load.btnHeight, v3.t, load.btnHeight - surplus, 0, pi*360, false);
			ctx.fill();
			// return;
		}
	}

	//全局btn位置
	var btnNum = 0;

	/**
	 * 初始化canvas宽高
	 * @param arg canvas画布id
	*/
	var size = CanvasSize.init("canvas");
	/**
	 * 初始化canvas
	 * @param size canvas宽高对象
	*/
	var load = CanvasLoad.init(size);
	/**
	 * 初始化画布
	 * @param num 		当前btn位置
	 * @param bg_color 	canvas背景色
	 * @param size 		canvas宽高对象
	 * @param load 		canvas初始化对象
	*/
	canvasInit.init(2, "rgb(550,0,0)", size, load);

}