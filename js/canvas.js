var canvasState=new Array();  //保存画布的状态
var curState=new Array();  //当前显示的状态（用于撤销和还原）
var userState=new Array();  //保存用户的操作类型 -1:变成原图  0:未使用 1:换了眼睛 2:换了嘴巴
var point=0;   //状态数组指针
var stateSize=1;  //总状态数
//point 和stateSize最少为1，初始状态不能改变

function beforeDo(usersta){  //修图操作前先执行  传参：用户做了哪个操作   
	point++;
	var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
	canvasState[point]=canvasState[point-1];  
	if(userState[point-1]==usersta){  //如果用户刚才做过这个操作
       ctx.putImageData(canvasState[point],0,0);  //先恢复图片状态，去除之前的同类特效
	}else{
       canvasState[point]=ctx.getImageData(0,0,1500,750);  //否则画布状态保存为当前画布显示的图像
	}
	userState[point]=usersta;
}

function afterDo(){   //每次修图后执行，保存新图状态
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
	curState[point]=ctx.getImageData(0,0,1500,750); 
	stateSize=point+1;
}
function doBack(){  //撤销
	if(point<=0){
		alert("已撤销至初始图片");
        return ;
	}
	point--;
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
	ctx.putImageData(curState[point],0,0);
}

function doFront(){   //重做
    if(point+1>=stateSize){
		alert("图片已是最新");
        return ;
	}	
	point++;
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
	ctx.putImageData(curState[point],0,0);
}

function firstCanvas(){   //原图操作
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
	beforeDo(-1);
	ctx.putImageData(curState[0],0,0);
    afterDo(); 
}

function addeye(srcstr,type){   //type=1代表左右眼相同，2代表左右眼不同
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
	var img = new Image();
	img.src=srcstr;
	img.onload = function () //确保图片已经加载完毕  
    {   
	   beforeDo(1);
	   var scalesize=img.width/30;
	   var minn=99999;
	   for(var i=0;i<eyenum;i++){   //防止眼睛距离过近
		for(var j=i+1;j<eyenum;j++){
		   if(Math.abs(eyex[i]-eyex[j])<minn)
		     minn=Math.abs(eyex[i]-eyex[j]);
		   if(Math.abs(eyey[i]-eyey[j])<minn)
		     minn=Math.abs(eyey[i]-eyey[j]); 
		 }
	   }
	    scalesize=Math.min(scalesize,minn/11);
	    ctx.save(); 
	    ctx.scale(scalesize,scalesize);
		for(var i=0;i<eyenum;i++){
		  ctx.drawImage(img,eyex[i]/scalesize,eyey[i]/scalesize); 
        }
	     ctx.restore();	
		 afterDo();
     }  
 }
 



function clearCanvas(){  //清除画布内容
	 var c=document.getElementById("myCanvas");
     var cxt=c.getContext("2d");
	 cxt.clearRect(0,0,1500,750);
}

function cnvs_getCoordinates(e)  //显示鼠标坐标
{
var x=e.clientX-document.getElementById("myCanvas").offsetLeft;
var y=e.clientY-document.getElementById("myCanvas").offsetTop;
document.getElementById("xycoordinates").innerHTML=" 坐标值: (" + x + "," + y + ")";
}
 
function cnvs_clearCoordinates()  //去除鼠标坐标显示
{
document.getElementById("xycoordinates").innerHTML="坐标值:";
}

function addphoto(fileurl){
	$(document).ready(function(){
    $("#test2").html("<img id='img' src='"+fileurl+"' />");
});
}

var eyenum=0;
var eyex = new Array();	
var eyey = new Array();	
var eyew = new Array();
var eyeh = new Array();
function addface(sx,sy){   
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
	/*var imgData=ctx.getImageData(350,100,2,2);
	for(var i=250;i<=400;i+=2){
	    for(var j=90;j<=220;j+=2){
			var imgData=ctx.getImageData(i,j-2,2,2);
			ctx.putImageData(imgData,i,j);
		}
	}*/
    var img = new Image();
	img.src="photo/jgz.png";
	img.onload = function () //确保图片已经加载完毕  
        { 
	     	ctx.save();
	       
	       ctx.rotate(3*Math.PI/180);
			  ctx.drawImage(img,sx,sy);
		      ctx.restore();
		  
        }  
}

function geteye(){   //获取眼部坐标
	eyenum=0;
   var img = document.getElementById('img');
  
	var tracker = new tracking.ObjectTracker(['eye']); // Based on parameter it will return an array.
   tracker.setStepSize(2.5);
 
   tracking.track('#img1', tracker);
  
   tracker.on('track', function(event) {
    event.data.forEach(function(rect) {
   //  draw(rect.x, rect.y, rect.width, rect.height);
  // alert(rect.x+" "+ rect.y+" "+rect.width+" "+rect.height);
   eyex[eyenum]=rect.x+5;
   eyey[eyenum]=rect.y+5;
   eyew[eyenum]=rect.width;
   eyeh[eyenum]=rect.height;
   eyenum++;
   
    });
   });	
		   
}
function addtest(){
   for(var i=0;i<eyenum;i++){
	   alert(eyex[i]+" "+eyey[i]);   
   }
}

function draw(x, y, w, h) {
    var rect = document.createElement('div');
    document.querySelector('.imgContainer').appendChild(rect);
    rect.classList.add('rect');
    rect.style.width = w + 'px';
    rect.style.height = h + 'px';
    rect.style.left = (img.offsetLeft + x) + 'px';
    rect.style.top = (img.offsetTop + y) + 'px';
 }

 
 function resetCanvas(){
	  var img=new Image();
	  img.src=document.getElementById("img1").src;
	  var bili=img.width/img.height;
		  clearCanvas();
		  if(img.width<1500&&img.height<750){
			  cxt.drawImage(img,0,0);
			 // addphoto(img.src);
			 
		  }
		  else if(bili<2){
			  cxt.drawImage(img,0,0,img.width*750/img.height,750);
			  document.getElementById("img1").width=img.width*750/img.height;
			  document.getElementById("img1").height=750; 
		  }else {
			  cxt.drawImage(img,0,0,1500,img.height*1500/img.width);
			  document.getElementById("img1").height=img.height*1500/img.width; 
			   document.getElementById("img1").width=1500;
		  }
		 
 }
