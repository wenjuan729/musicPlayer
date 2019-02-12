//	获取index的模块，控制index循环的模块
//	$scope.on("click",".prev-btn",function(){
//		if(index === 0) {
//			index = songList.length -1;
//		}else{
//			index--;
//		}
//      root.render(songList[index]);
//  })
//	$scope.on("click",".next-btn",function(){
//		if(index === songList.length - 1){
//			index = 0;
//		}else{
//			index++;
//		}
(function($,root){
    function controlManager(len){
        this.index = 0;
        this.len = len;
    }
    controlManager.prototype = {
        prev : function(){//前一首
        	//index--
            return this.getIndex(-1);
        },
        next : function(){//后一首
        	//index++
            return this.getIndex(1);
        },
        getIndex : function(val){
            var index = this.index;
            var len = this.len;
            var curIndex = (index + val + len) % len;//用算法获取当前的index值
            this.index = curIndex;//把当前的index值放到全局
            return curIndex;
        }
    }
    root.controlManager = controlManager;
})(window.Zepto,window.player || (window.player = {}));