//渲染进度条
(function($,root){
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lastPercent = 0;
    var startTime;
    //把秒转换成分和秒
    function formatTime(duration){
        duration = Math.round(duration);//取整
        var minute = Math.floor(duration / 60);//转换成分钟
        var second = duration - minute * 60;//剩余的秒
        if(minute < 10){
            minute = "0" + minute;//分钟数不足10分钟的时候，要表示为04:00的形式
        }
        if(second < 10){
            second = "0" + second;
        }
        return minute + ":" +second;//返回的形式为04：01的类似形式
    }
    //渲染当前的总时间
    function renderAllTime(duration){
        lastPercent = 0;
        curDuration = duration;
        var allTime = formatTime(duration);//把处理好的时间拿过来
        $scope.find(".all-time").html(allTime);//把处理好的时间插入到dom结构中
    }
    //实时更新
    function updata(precent){
        var curTime = precent * curDuration;//实时播放的时间
        curTime = formatTime(curTime);//实时播放的时间转换成04:01的形式
        $scope.find(".cur-time").html(curTime);//插入dom结构
        //实时渲染进度条
        var percentage = (precent - 1) * 100 + "%";
        $scope.find(".pro-top").css({
            transform : "translateX("+percentage+")"
        })
    }
    //时间和进度条改变
    function start(precentage){
        lastPercent = precentage === undefined ? lastPercent : precentage; 
        cancelAnimationFrame(frameId);//切歌到下一首的时候就重新开始渲染
        startTime = new Date().getTime();//歌曲开始的时间
        function frame(){
            var curTime = new Date().getTime();//当前的时间
            var precent = lastPercent + (curTime - startTime) / (curDuration * 1000);//当前播过时间的百分比    curDuration * 1000是把秒转换成毫秒
            if(precent < 1){
                frameId = requestAnimationFrame(frame);//动画执行
                updata(precent);
            }else{
                cancelAnimationFrame(frameId);
                $scope.find(".next-btn").trigger("click");
            }
           
        }
        frame()
    }
    //暂停的时候取消动画
    function stop(){
        var stopTime = new Date().getTime();//记录当前点击暂停的时间
        lastPercent = lastPercent + (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);//清除动画
    }
    root.processor = {
        renderAllTime : renderAllTime,
        start : start,
        stop : stop,
        updata : updata
    }
})(window.Zepto,window.player || (window.player));