var gulp = require("gulp");
var htmlclean = require("gulp-htmlclean");
var imageMin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var styip = require("gulp-strip-debug");
var concat = require("gulp-concat");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");//添加css3前缀插件
var cssnano = require("cssnano");//压缩css代码插件
var connect = require("gulp-connect");

//console.log(process.env.NODE_ENV == "producation") //生产环境
var devMode = process.env.NODE_ENV == "development";//开发环境

//gulp.src()//读文件
//gulp.dist()//写文件
//gulp.task()//任务
//gulp.watch()//监听

var folder= {
	src:"src/",//开发目录文件夹
	dist:"dist/"//压缩打包后目录文件夹
}

gulp.task("html",function () {
	var page = gulp.src(folder.src + "html/*")
					.pipe(connect.reload())//html发生改变就自动刷新
	//在开发环境下，代码就不进行压缩
	if(!devMode){
		page.pipe(htmlclean())
	}
		
		page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("images",function () {
	gulp.src(folder.src + "images/*")
		.pipe(imageMin())
		.pipe(gulp.dest(folder.dist + "images/"))
})

gulp.task("js",function () {
	var page = gulp.src(folder.src + "js/*")
					.pipe(connect.reload())
	if(!devMode){
		page.pipe(styip())//压缩前去掉调试语句
		//page.pipe(concat("main.js"))//把所有js文件都拼接到main.js里面
		page.pipe(uglify())
	}
		
		page.pipe(gulp.dest(folder.dist + "js/"))
})
gulp.task("css",function () {
	var options = [autoprefixer(),cssnano()];
	var page = gulp.src(folder.src + "css/*")
					.pipe(less())//把less文件打包成css文件
					.pipe(connect.reload())
	if(!devMode){
		page.pipe(postcss(options))
	}	
	page.pipe(gulp.dest(folder.dist + "css/"))
})

//监听，当html,css,js,images其中任何一个有改变的时候就帮我们重新打包
gulp.task("watch",function () {
	gulp.watch(folder.src + "html/*",["html"]);
	gulp.watch(folder.src + "css/*",["css"]);
	gulp.watch(folder.src + "js/*",["js"]);
	gulp.watch(folder.src + "images/*",["images"]);
})

gulp.task("server",function() {
	connect.server({
		port:"8090",//改端口号
		livereload:true//开启浏览器自动刷新
	})
})

gulp.task("default",["html","images","js","css","watch","server"])
