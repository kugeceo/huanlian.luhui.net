////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){   //页面加载完毕触发事件
$(function () {
  $('[data-toggle="popover"]').popover();
})
$('#choosePhoto').popover('show');
//获取登录状态

//拖动条触发事件，修改值
$("#yjqdRCZ").mousemove(function(){
   $("#showrcz1").html("<h5>容差值："+document.getElementById("yjqdRCZ").value+"</h5>");
});
$("#tcqdRCZ").mousemove(function(){
   $("#showrcz2").html("<h5>容差值："+document.getElementById("tcqdRCZ").value+"</h5>");
});
$("#xpcradius").mousemove(function(){
   $("#showrad1").html("<h5>橡皮半径："+document.getElementById("xpcradius").value+"</h5>");
});
$("#penradius").mousemove(function(){
   $("#showrad2").html("<h5>画笔半径："+document.getElementById("penradius").value+"</h5>");
});

Bmob.initialize("baef162ac09a8f23038da90b54918b66", "6a801014064680e32899ee4e75b7e624");

if(getCookie("username")==""){
  document.getElementById("loginState").innerHTML="<span class='glyphicon glyphicon-user' aria-hidden='true'></span> 用户登录 <span class='caret'></span>";
  $("#myphotobutton").hide();
  $("#cancelloginbutton").hide();
}else{
  document.getElementById("loginState").innerHTML="<span class='glyphicon glyphicon-user' aria-hidden='true'></span> 您好，尊敬的"+getCookie("username")+"<span class='caret'></span>";
  $("#loginbutton").hide();
  $("#registerbutton").hide();
  showPhotoList();
}

$("#loading").hide();   //先隐藏loading画布
$("#NewfaceCanvas").hide();
$("#uploadmyface").hide();
$('#face_attribute_text').fadeOut();//隐藏面相分析文本

setTimeout("$('#preloading').fadeOut(300); ",1000);  //设置多久消去预加载动画
setTimeout("$('#myModal').modal('show');",1500);    //设置什么时候弹出模态框
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
   var hatstr="#hatbutton";
   hatstr+=i;
   $(hatstr).hide();
   var lvjingstr="#lvjingbutton";
   lvjingstr+=i;
   $(lvjingstr).hide();
   var colorstr="#colorbutton";
   colorstr+=i;
   $(colorstr).hide();
   var qudistr="#qudibutton";
   qudistr+=i;
   $(qudistr).hide();
   var penstr="#penbutton";
   penstr+=i;
   $(penstr).hide();
   
}
$(addSubtitle).hide();
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
var s_height=document.getElementById("convo").style.height=winHeight*0.86+'px'
var s_width=document.getElementById("convo").style.width;
var s_height=document.getElementById("convo2").style.height=winHeight*0.86+'px'
var s_width=document.getElementById("convo2").style.width;
var s_height=document.getElementById("convo3").style.height=winHeight*0.86+'px'
var s_width=document.getElementById("convo3").style.width;

document.getElementById("maindiv").style.width=winWidth*1+'px'
  
document.getElementById("fatherdiv").style.width=window.screen.width*1+'px';    //固定画布父亲div，防止画布被挤压

var facelist="";    //换脸滚动条的系统预提提供脸部列表
for(var i=1;i<=8;i++){
       facelist+="<a class='thumbnail'  style='width:150px; height:105px'><img src='photo/face_button"+i+".png' onClick=\"addface('photo/face"+i+".png')\" class='img-rounded' style='width:150px; height:95px'></a>";
}
document.getElementById("supportedface").innerHTML=facelist;

var fontSizelist=""; //字体大小列表
for(var i=28;i<=94;){
       fontSizelist+="<option value='"+i+"'>"+i+"</option>";
       if(i<40)i+=4;
       else i+=8;
}
document.getElementById("fontSize").innerHTML=fontSizelist;

document.getElementById("face_attribute_canvas").width=analysedcanvasW;
document.getElementById("face_attribute_canvas").height=analysedcanvasH;

}); 
///////////////////////////////////////////////////////////////////////////////////

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
document.getElementById("convo").style.height=winHeight*0.86+'px'
document.getElementById("convo2").style.height=winHeight*0.86+'px'
document.getElementById("convo3").style.height=winHeight*0.86+'px'

var c = document.getElementById('fCanvas'),
ctx = c.getContext('2d'),
cw = c.width = winWidth;
ch = c.height = winHeight;
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

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}  


