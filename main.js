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
				this.height = Math.ceil(windowSize.height/6);
			}
			return this;
		}
	}

	var CanvasLoad = {
		width:null,		//图像宽度
		height:null,	//图像高度
		h1:{l:null,r:null},		//原横线  起始&结束位置
		h2:{l:null,r:null},		//顶部横线起始&结束位置
		h3:{l:null,r:null},		//底部横线起始&结束位置
		v1:{t:null,b:null},		//原侧边线起始&结束位置
		v2:{t:null,b:null},		//侧边线  起始&结束位置
		init:function(obj){
			this.width  = obj.obj.width  = Math.ceil(obj.width * 0.8);
			this.height = obj.obj.height = Math.ceil(obj.height * 0.6);
			this.setLineSize(obj);
			return this;
		},
		setLineSize:function(obj){
			this.h1.l = 0;
			this.h1.r = this.width;
			this.h2.l = this.h1.l + 20;
			this.h2.r = this.width  - 20;
			this.h3.l = this.h1.l + 55;
			this.h3.r = this.width  - 55;
			this.v1.t = Math.floor(this.height * 0.3);
			this.v1.b = this.height;
			this.v2.t = this.v1.t + 20;
			this.v2.b = this.height - 55;
		}
	}

	var canvasInit = {
		init: function(num, bg_color, canvas_id){
			//初始化canvas宽高
			var size = CanvasSize.init(canvas_id);
			var load = CanvasLoad.init(size);

			var ctx = size.ctx;
			var pi = Math.PI/180;
			ctx.fillStyle = bg_color;
			//左上角起始位置开始
			ctx.beginPath();
			ctx.moveTo(load.h2.l, load.v1.t);
			ctx.lineTo(load.h2.r, load.v1.t);	//顶部横线
			ctx.arc(load.h2.r, load.v2.t, 20, pi*270, 0, false);	 //右上角圆弧
			ctx.lineTo(load.h1.r, load.v2.b);	//右侧边线
			ctx.arc(load.h3.r, load.v2.b, 55, 0, pi*90, false);		 //右下角圆弧
			ctx.lineTo(load.h3.l, load.v1.b);	//底部横线
			ctx.arc(load.h3.l, load.v2.b, 55, pi*90, pi*180, false); //左下角圆弧
			ctx.lineTo(load.h1.l, load.v2.t);	//左侧边线
			ctx.arc(load.h2.l, load.v2.t, 20, pi*180, pi*270, false);//左上角圆弧
			ctx.fill();		//闭合

			return ctx;
		}
	}

	canvasInit.init(1, "rgb(550,0,0)", "canvas");

}