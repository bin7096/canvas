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
		obj:null,
		ctx:null,
		init:function(arg){
			var windowSize = utils.getWindowSize();
			this.obj = document.getElementById(arg);
			this.ctx = this.obj.getContext('2d');
			if (this.ctx) {
				this.obj.width = windowSize.width-4;
				this.obj.height = Math.ceil(windowSize.height/10);
			}
			return this;
		}
	}

	var CanvasLoad = {
		init:function(ctx){
			//初始化路径
			ctx.beginPath();

		}
	}

	//初始化canvas宽高
	var CanvasSize = CanvasSize.init('canvas');
	var ctx = CanvasSize.ctx;
}