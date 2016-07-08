
//beforeDo参数: 用户的操作类型 
function addeye(srcstr){  
	if(facenum==0){
         alert("未发现人脸，请更换图片~");
     	 return ;
    }
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
	if(facenum==0){
         alert("未发现人脸，请更换图片~");
     	 return ;
    }
	guodu();
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
	var img = new Image();
	img.src=srcstr;
	img.onload = function ()
	{
         beforeDo(2);
         ctx.save();
         var eyeaverY=(lefteyeY[curFace]+righteyeY[curFace])*0.5;
         var mouthaverY=(rightmouthY[curFace]+leftmouthY[curFace])*0.5;
         var scalesizeX=(facewidth[curFace]*0.85)/img.width;
         var scalesizeY=Math.abs(eyeaverY-mouthaverY)*1.2/img.height;
		 var angel=Math.atan((rightmouthY[curFace]-leftmouthY[curFace])/(rightmouthX[curFace]-leftmouthX[curFace]));
		 ctx.translate((leftmouthX[curFace]+rightmouthX[curFace])*0.5,(leftmouthY[curFace]+rightmouthY[curFace])*0.5);
		 ctx.rotate(angel);
		 ctx.translate(-(leftmouthX[curFace]+rightmouthX[curFace])*0.5,-(leftmouthY[curFace]+rightmouthY[curFace])*0.5);
         ctx.scale(scalesizeX,scalesizeY);	 
		 ctx.drawImage(img,(leftmouthX[curFace]+rightmouthX[curFace])*0.5/scalesizeX-img.width*0.5,(leftmouthY[curFace]+rightmouthY[curFace])*0.5/scalesizeY-img.height*0.6);
		 ctx.restore();
		 afterDo();
		 guoduover();
    }
 }

 function addnose(srcstr){
	if(facenum==0){
         alert("未发现人脸，请更换图片~");
     	 return ;
    }
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

 function addhat(srcstr){
	if(facenum==0){
         alert("未发现人脸，请更换图片~");
     	 return ;
    }
	guodu();
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
	var img = new Image();
	img.src=srcstr;
	img.onload = function ()
	{
         beforeDo(4);
         ctx.save();
         var eyeaverY=(lefteyeY[curFace]+righteyeY[curFace])*0.5;
         var mouthaverY=(rightmouthY[curFace]+leftmouthY[curFace])*0.5;
         var scalesizeX=(facewidth[curFace]*2.2)/img.width;
         var scalesizeY=Math.abs(eyeaverY-mouthaverY)*3.2/img.height;
		 var angel=Math.atan((rightmouthY[curFace]-leftmouthY[curFace])/(rightmouthX[curFace]-leftmouthX[curFace]));
		 ctx.translate((leftmouthX[curFace]+rightmouthX[curFace])*0.5,(leftmouthY[curFace]+rightmouthY[curFace])*0.5);
		 ctx.rotate(angel);
		 ctx.translate(-(leftmouthX[curFace]+rightmouthX[curFace])*0.5,-(leftmouthY[curFace]+rightmouthY[curFace])*0.5);
         ctx.scale(scalesizeX,scalesizeY);	 
         var len_eye_nose=Math.abs(eyeaverY-mouthaverY)*2/scalesizeY;
		 ctx.drawImage(img,(leftmouthX[curFace]+rightmouthX[curFace])*0.5/scalesizeX-img.width*0.5,eyeaverY/scalesizeY-len_eye_nose);
		 ctx.restore();
		 afterDo();
		 guoduover();
    }
 }
 
 function addsubtitle(x,y){  //在x，y位置添加字幕
 	 beforeDo(5);
     var fontSize=document.getElementById("fontSize").value;
     var fontstyle=document.getElementById("fontstyle").value;
     var fontfamily=document.getElementById("fontfamily").value;
     var fontweight=document.getElementById("fontweight").value;
     var fontcolor=document.getElementById("fontcolor").value;
     var subtitleValue=document.getElementById("subtitleValue").value;
     var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
     var str=fontstyle;
     str+=" "+"normal";
     str+=" "+fontweight;
     str+=" "+fontSize+"px";
     str+=" "+fontfamily;
     ctx.font=str;
     ctx.textBaseline = 'top';
     var isfill=document.getElementById("fontfill").value;
     if(isfill=="yes"){
        ctx.fillStyle=fontcolor;
        ctx.fillText(subtitleValue,x,y);
     }else{
        ctx.strokeStyle=fontcolor;
        ctx.strokeText(subtitleValue,x,y);
     }
     beforeSubtitleImage=ctx.getImageData(0,0,1500,750);   //更新临时画布状态
     afterDo();
 } 

 function addpendant(srcstr){
    var c=document.getElementById("myCanvas");
    var canvas = new fabric.Canvas('myCanvas');

    fabric.Image.fromURL(srcstr, function(img) {
    img.scale(0.5).set({
    left: 150,
    top: 150,
    angle: -15
    });
    canvas.add(img).setActiveObject(img);
    });
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

