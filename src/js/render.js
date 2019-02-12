//实现渲染

(function($,root){
    var $scope = $(document.body);
    console.log(root)
    //渲染当前这首歌的信息
    function renderInfo(info){
        var html = '<div class="song-name">'+info.song+'</div>'+
        '<div class="singer-name">'+info.singer+'</div>'+
        '<div class="album-name">'+info.album+'</div>';
        $scope.find(".song-info").html(html)//在body上找到.song-info，把html结构插入
    }
    //渲染当前这首歌的图片
    function renderImg(src){
        var img = new Image();
        img.onload = function(){
            root.blurImg(img,$scope);//高斯模糊背景，一来与高斯模糊函数
            $scope.find(".song-img img").attr("src",src)
        }
        img.src = src;
    }
    //渲染是否喜欢这首歌，空心或者实心
    function renderIsLike(isLike){
        if(isLike){
            $scope.find(".like-btn").addClass("liking");//两个类名同时存在的时候就是实心
        }else{
            $scope.find(".like-btn").removeClass("liking");
            
        }
    }
    root.render = function(data){//暴露函数
        renderInfo(data);
        renderImg(data.image);
        renderIsLike(data.isLike)
    }
})(window.Zepto,window.player || (window.player = {}))//容错window.player
//通过window.player暴露函数