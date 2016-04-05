
//beforeDo参数: 用户的操作类型 -1:变成原图  0:未使用 1:换了眼睛 2:换了嘴巴 3:换了鼻子 5:换了脸
function addeye(srcstr){  
	guodu();
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
	var img = new Image();
	img.src=srcstr+"_left.png";  //先加载左眼
	var eyeaverX=(lefteyeX[curFace]+righteyeX[curFace])*0.5;
		 var eyeaverY=(lefteyeY[curFace]+righteyeY[curFace])*0.5;
         var mouthaverX=(rightmouthX[curFace]+leftmouthX[curFace])*0.5;
	     var mouthaverY=(rightmouthY[curFace]+leftmouthY[curFace])*0.5;
		 var angel=Math.atan((mouthaverX-eyeaverX)/(eyeaverY-mouthaverY));
	img.onload = function () //确保图片已经加载完毕  
    {   
	   beforeDo(1);
       ctx.save(); 
	   ctx.translate(lefteyeX[curFace],lefteyeY[curFace]);
	   ctx.rotate(angel);
	   ctx.translate(-lefteyeX[curFace],-lefteyeY[curFace]);
	   var scalesize=(facewidth[curFace]*0.3)/img.width;
	   ctx.scale(scalesize,scalesize);
       ctx.drawImage(img,(lefteyeX[curFace])/scalesize-img.width*0.5,(lefteyeY[curFace])/scalesize-img.height*0.5);
	   ctx.restore();
	   img.src=srcstr+"_right.png";  //再加载右眼
	   img.onload = function () //确保图片已经加载完毕  
		{
			 ctx.save();
			 ctx.translate(righteyeX[curFace],righteyeY[curFace]);
		     ctx.rotate(angel);
		     ctx.translate(-righteyeX[curFace],-righteyeY[curFace]);
			 ctx.scale(scalesize,scalesize);
             ctx.drawImage(img,(righteyeX[curFace])/scalesize-img.width*0.5,(righteyeY[curFace])/scalesize-img.height*0.5);
	         ctx.restore();
             afterDo();
			 guoduover();
		}
     }  
 }
 
 function addmouth(srcstr){
	guodu();
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
	var img = new Image();
	img.src=srcstr;
	img.onload = function ()
	{
         beforeDo(2);
         ctx.save();
         var scalesize=(facewidth[curFace]*0.5)/img.width;
		 var angel=Math.atan((rightmouthY[curFace]-leftmouthY[curFace])/(rightmouthX[curFace]-leftmouthX[curFace]));
		 ctx.translate((leftmouthX[curFace]+rightmouthX[curFace])*0.5,(leftmouthY[curFace]+rightmouthY[curFace])*0.5);
		 ctx.rotate(angel);
		 ctx.translate(-(leftmouthX[curFace]+rightmouthX[curFace])*0.5,-(leftmouthY[curFace]+rightmouthY[curFace])*0.5);
         ctx.scale(scalesize,scalesize);	 
		 ctx.drawImage(img,(leftmouthX[curFace]+rightmouthX[curFace])*0.5/scalesize-img.width*0.5,(leftmouthY[curFace]+rightmouthY[curFace])*0.5/scalesize-img.height*0.5);
		 ctx.restore();
		 afterDo();
		 guoduover();
    }
 }

 function addnose(srcstr){
	guodu();
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
	var img = new Image();
	img.src=srcstr;
	img.onload = function ()
	{
         beforeDo(3);
         ctx.save();
         var scalesize=(facewidth[curFace]*0.4)/img.width;
		 var eyeaverX=(lefteyeX[curFace]+righteyeX[curFace])*0.5;
		 var eyeaverY=(lefteyeY[curFace]+righteyeY[curFace])*0.5;
         var mouthaverX=(rightmouthX[curFace]+leftmouthX[curFace])*0.5;
	     var mouthaverY=(rightmouthY[curFace]+leftmouthY[curFace])*0.5;
		 var angel=Math.atan((mouthaverX-eyeaverX)/(eyeaverY-mouthaverY));
		 ctx.translate(noseX[curFace],noseY[curFace]);
		 ctx.rotate(angel);
		 ctx.translate(-noseX[curFace],-noseY[curFace]);
         ctx.scale(scalesize,scalesize);	 
		 ctx.drawImage(img,noseX[curFace]/scalesize-img.width*0.5,noseY[curFace]/scalesize-img.height*0.5);
		 ctx.restore();
		 afterDo();
		 guoduover();
    }
 }
/*
var facenum;
var facecenterX=new Array();
var facecenterY=new Array();
var facewidth=new Array();
var faceheight=new Array();
var lefteyeX=new Array();
var lefteyeY=new Array();
var righteyeX=new Array();
var righteyeY=new Array();
var noseX=new Array();
var noseY=new Array();
var leftmouthX=new Array();
var leftmouthY=new Array();
var rightmouthX=new Array();
var rightmouthY=new Array();
*/

