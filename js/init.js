$(document).ready(function(){   //页面加载完毕触发事件
$(function () {
  $('[data-toggle="popover"]').popover();
})
$('#choosePhoto').popover('show');

Bmob.initialize("baef162ac09a8f23038da90b54918b66", "6a801014064680e32899ee4e75b7e624");

$("#loading").hide();
$('#myModal').modal('show');
for(var i=1;i<30;i++){    //隐藏组件
   var eyestr="#eyebutton";
   eyestr+=i;
   $(eyestr).hide();
   var mouthstr="#mouthbutton";
   mouthstr+=i;
   $(mouthstr).hide();
   var nosestr="#nosebutton";
   nosestr+=i;
   $(nosestr).hide();
}
if (window.innerWidth)
var winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
var winWidth = document.body.clientWidth;
// 获取窗口高度
if (window.innerHeight)
winHeight = window.innerHeight;
else if ((document.body) && (document.body.clientHeight))
winHeight = document.body.clientHeight;
// 通过深入 Document 内部对 body 进行检测，获取窗口大小
if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
{
winHeight = document.documentElement.clientHeight;
winWidth = document.documentElement.clientWidth;
}
var s_height=document.getElementById("convo").style.height=winHeight*0.9+'px'
var s_width=document.getElementById("convo").style.width;
var s_height=document.getElementById("convo2").style.height=winHeight*0.9+'px'
var s_width=document.getElementById("convo2").style.width;

}); 


window.onresize = function(){   //改变浏览器大小触发事件
if (window.innerWidth)
var winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
var winWidth = document.body.clientWidth;
// 获取窗口高度
if (window.innerHeight)
winHeight = window.innerHeight;
else if ((document.body) && (document.body.clientHeight))
winHeight = document.body.clientHeight;
// 通过深入 Document 内部对 body 进行检测，获取窗口大小
if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
{
winHeight = document.documentElement.clientHeight;
winWidth = document.documentElement.clientWidth;
}
document.getElementById("convo").style.height=winHeight*0.9+'px'
document.getElementById("convo2").style.height=winHeight*0.9+'px'

var c = document.getElementById('fCanvas'),
ctx = c.getContext('2d'),
cw = c.width = window.innerWidth;
ch = c.height = window.innerHeight;
circle.x=(cw *0.52);
circle.y=(ch *0.4);
}


  function requestFullScreen() {   //全屏模式
      var de = document.documentElement;
      if (de.requestFullscreen) {
          de.requestFullscreen();
      } else if (de.mozRequestFullScreen) {
          de.mozRequestFullScreen();
      } else if (de.webkitRequestFullScreen) {
          de.webkitRequestFullScreen();
     }
  }

  