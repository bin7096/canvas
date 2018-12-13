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
		width:null,
		height:null,
		obj:null,
		ctx:null,
		init:function(arg){
			var windowSize = utils.getWindowSize();
			this.obj = document.getElementById(arg);
			this.ctx = this.obj.getContext('2d');
			if (this.ctx) {
				this.width  = this.obj.width = windowSize.width-4;
				this.height = this.obj.height = Math.ceil(windowSize.height/10);
			}
			return this;
		}
	}

	var CanvasLoad = {
		width:null,
		height:null,
		horizontal1:{left:null,right:null},
		horizontal2:{left:null,right:null},
		vertical   :{top:null,bottom:null},
		init:function(obj){
			this.width = obj.width * 0.8;
			this.height = obj.height * 0.6;
		}
	}

	//初始化canvas宽高
	var CanvasSize = CanvasSize.init('canvas');
}