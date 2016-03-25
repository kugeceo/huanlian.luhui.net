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
var leftcontourX=new Array();
var leftcontourY=new Array();
var rightcontourX=new Array();
var rightcontourY=new Array();

var beginPoint;
var endPoint;
var leftimgdata=new Array();    //保存图片信息
var rightimgdata=new Array();    
var bottomimgdata=new Array();
var leftlinenum=0,rightlinenum=0;
var leftX=new Array();   //水平线和左轮廓交点的横坐标
var rightX=new Array();  //水平线和右轮廓交点的横坐标
var leftIgnoreFlag=new Array();   //不需要裁剪的标记
var rightIgnoreFlag=new Array();
var leftbj,rightbj;   //img的左侧坐标和右侧坐标
function getcontour(img)   //解析当前脸，返回左右部轮廓
{
   var api = new FacePP('abc3b4dd8808310720f3a521311f0bf0', 'vyvK77UjUxGdksdyojX0cWgGmM64PaLq');
   api.request('detection/landmark', {
       face_id: faceID[curFace]
    }, function(err, result) {
     if (err) {
      // TODO handle error
	     alert("解析人脸关键点出错!");
	     return;  
      }
	   var json= JSON.stringify(result, null, 2);
	   var obj = eval ("(" + json + ")");   //解析json
	   var H=document.getElementById("myCanvas").height*0.01;
       var W=document.getElementById("myCanvas").width*0.01;
	   
	   //解析点集，存到数组里
       leftcontourX[0]=obj.result[0].landmark.contour_left1.x*W;
	   leftcontourY[0]=obj.result[0].landmark.contour_left1.y*H;
	   leftcontourX[1]=obj.result[0].landmark.contour_left2.x*W;
	   leftcontourY[1]=obj.result[0].landmark.contour_left2.y*H;
	   leftcontourX[2]=obj.result[0].landmark.contour_left3.x*W;
	   leftcontourY[2]=obj.result[0].landmark.contour_left3.y*H;
	   leftcontourX[3]=obj.result[0].landmark.contour_left4.x*W;
	   leftcontourY[3]=obj.result[0].landmark.contour_left4.y*H;
	   leftcontourX[4]=obj.result[0].landmark.contour_left5.x*W;
	   leftcontourY[4]=obj.result[0].landmark.contour_left5.y*H;
	   leftcontourX[5]=obj.result[0].landmark.contour_left6.x*W;
	   leftcontourY[5]=obj.result[0].landmark.contour_left6.y*H;
	   leftcontourX[6]=obj.result[0].landmark.contour_left7.x*W;
	   leftcontourY[6]=obj.result[0].landmark.contour_left7.y*H;
	   leftcontourX[7]=obj.result[0].landmark.contour_left8.x*W;
	   leftcontourY[7]=obj.result[0].landmark.contour_left8.y*H;
	   leftcontourX[8]=obj.result[0].landmark.contour_left9.x*W;
	   leftcontourY[8]=obj.result[0].landmark.contour_left9.y*H;
	   leftcontourX[9]=obj.result[0].landmark.contour_chin.x*W;
	   leftcontourY[9]=obj.result[0].landmark.contour_chin.y*H;
	
	   rightcontourX[0]=obj.result[0].landmark.contour_right1.x*W;
	   rightcontourY[0]=obj.result[0].landmark.contour_right1.y*H;
	   rightcontourX[1]=obj.result[0].landmark.contour_right2.x*W;
	   rightcontourY[1]=obj.result[0].landmark.contour_right2.y*H;
	   rightcontourX[2]=obj.result[0].landmark.contour_right3.x*W;
	   rightcontourY[2]=obj.result[0].landmark.contour_right3.y*H;
	   rightcontourX[3]=obj.result[0].landmark.contour_right4.x*W;
	   rightcontourY[3]=obj.result[0].landmark.contour_right4.y*H;
	   rightcontourX[4]=obj.result[0].landmark.contour_right5.x*W;
	   rightcontourY[4]=obj.result[0].landmark.contour_right5.y*H;
	   rightcontourX[5]=obj.result[0].landmark.contour_right6.x*W;
	   rightcontourY[5]=obj.result[0].landmark.contour_right6.y*H;
	   rightcontourX[6]=obj.result[0].landmark.contour_right7.x*W;
	   rightcontourY[6]=obj.result[0].landmark.contour_right7.y*H;
	   rightcontourX[7]=obj.result[0].landmark.contour_right8.x*W;
	   rightcontourY[7]=obj.result[0].landmark.contour_right8.y*H;
	   rightcontourX[8]=obj.result[0].landmark.contour_right9.x*W;
	   rightcontourY[8]=obj.result[0].landmark.contour_right9.y*H;
	   rightcontourX[9]=obj.result[0].landmark.contour_chin.x*W;
	   rightcontourY[9]=obj.result[0].landmark.contour_chin.y*H;
         
		 //放置脸部的部分
         var c=document.getElementById("myCanvas");
         var ctx=c.getContext("2d");	
		 var scalesizeX=(facewidth[curFace]*1.1)/img.width;  // 设置脸的宽度放大倍数  
		 var scalesizeY=(faceheight[curFace]*1.25)/img.height;   //  设置脸的长度放大倍数
         getFaceAroundData(img,scalesizeX); //获取轮廓周围的像素
         beforeDo(5);
         ctx.save();
		 var eyeaverX=(lefteyeX[curFace]+righteyeX[curFace])*0.5;
		 var eyeaverY=(lefteyeY[curFace]+righteyeY[curFace])*0.5;
         var mouthaverX=(rightmouthX[curFace]+leftmouthX[curFace])*0.5;
	     var mouthaverY=(rightmouthY[curFace]+leftmouthY[curFace])*0.5;
		 var angel=Math.atan((mouthaverX-eyeaverX)/(eyeaverY-mouthaverY));
		 angel*=0.9;
		 ctx.translate(facecenterX[curFace],facecenterY[curFace]);
		 ctx.rotate(angel);
		 ctx.translate(-facecenterX[curFace],-facecenterY[curFace]);
         ctx.scale(scalesizeX,scalesizeY);	 
		 ctx.drawImage(img,facecenterX[curFace]/scalesizeX-img.width*0.5,facecenterY[curFace]/scalesizeY-img.height*0.5);
		 ctx.restore();
		 putFaceAroundData(img);  //像素覆盖
		 afterDo();
  });
}

function getFaceAroundData(img,scalesizeX){   //img 为图片  scalesizeX为横向拉伸比例
	 var c=document.getElementById("myCanvas"); 
     var ctx=c.getContext("2d");
	 leftlinenum=rightlinenum=0;
     beginPoint=Math.min(leftcontourY[0],rightcontourY[0])-faceheight[curFace]*0.3;
	 if(beginPoint<=0)beginPoint=0;
	 beginPoint= Math.ceil(beginPoint);
	 endPoint=leftcontourY[9]+faceheight[curFace]*0.3;
	 if(endPoint>=ctx.height)endPoint=ctx.height-1;
	 endPoint= Math.ceil(endPoint);
	 leftbj=facecenterX[curFace]-img.width*0.5*scalesizeX;    //左边界
	 rightbj=facecenterX[curFace]+img.width*0.5*scalesizeX;    //右边界
	 //--------------左侧裁剪前的像素提取
	 for(var i=beginPoint;i<Math.ceil(leftcontourY[0]);i++){
		   if(leftcontourX[0]<=leftbj){          //如果左边界在左轮廓的右边，无需裁剪
               leftIgnoreFlag[leftlinenum]=true;
			   leftlinenum++;
			   continue;
		   }else{
               leftIgnoreFlag[leftlinenum]=false;
		   }
           leftX[leftlinenum]=leftcontourX[0];
           leftimgdata[leftlinenum]=ctx.getImageData(leftbj,i,leftcontourX[0]-leftbj,1);
		   leftlinenum++;
	 }
     for(var i=0;i<9;i++){
          var x1=leftcontourX[i],y1=leftcontourY[i],x2=leftcontourX[i+1],y2=leftcontourY[i+1];
		  var k=(y1-y2)/(x1-x2);
		  for(var j=Math.ceil(y1);j<Math.ceil(y2);j++){ 
			   leftX[leftlinenum]=(j-y2)/k+x2;
			 if(leftX[leftlinenum]<=leftbj){    //如果左边界在左轮廓的右边，无需裁剪
               leftIgnoreFlag[leftlinenum]=true;
			   leftlinenum++;
			   continue;
		     }else{
                  leftIgnoreFlag[leftlinenum]=false;
		     }
               leftimgdata[leftlinenum]=ctx.getImageData(leftbj,j,leftX[leftlinenum]-leftbj,1);
			   leftlinenum++;
		  }
	 }
	
	 //----------------右侧裁剪前的像素提取
      for(var i=beginPoint;i<Math.ceil(rightcontourY[0]);i++){
		   if(rightcontourX[0]>=rightbj){          //如果右边界在右轮廓的左边，无需裁剪
               rightIgnoreFlag[rightlinenum]=true;
			   rightlinenum++;
			   continue;
		   }else{
               rightIgnoreFlag[rightlinenum]=false;
		   }
           rightX[rightlinenum]=rightcontourX[0];
           rightimgdata[rightlinenum]=ctx.getImageData(rightcontourX[0],i,rightbj-rightcontourX[0],1);
		   rightlinenum++;
	 }
     for(var i=0;i<9;i++){
          var x1=rightcontourX[i],y1=rightcontourY[i],x2=rightcontourX[i+1],y2=rightcontourY[i+1];
		  var k=(y1-y2)/(x1-x2);
		  for(var j=Math.ceil(y1);j<Math.ceil(y2);j++){ 
			   rightX[rightlinenum]=(j-y2)/k+x2;
			 if(rightX[rightlinenum]>=rightbj){    //如果左边界在左轮廓的右边，无需裁剪
               rightIgnoreFlag[rightlinenum]=true;
			   rightlinenum++;
			   continue;
		     }else{
                  rightIgnoreFlag[rightlinenum]=false;
		     }
               rightimgdata[rightlinenum]=ctx.getImageData(rightX[rightlinenum],j,rightbj-rightX[rightlinenum],1);
			   rightlinenum++;
		  }
	 }
     
	 //-----------------底部裁剪前的像素提取
     for(var i=rightcontourY[9];i<endPoint;i++){
          bottomimgdata[i]=ctx.getImageData(leftbj,i,rightbj-leftbj,1);
	 }
}

function putFaceAroundData(img){
	 var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d"); 
     for(var i=0;i<leftlinenum;i++){
		  if(leftIgnoreFlag[i])continue;   //跳过无需裁剪标记的行
          ctx.putImageData(leftimgdata[i],leftbj,beginPoint+i);
	 }
	 for(var i=0;i<rightlinenum;i++){
          if(rightIgnoreFlag[i]) continue //跳过无需裁剪的行
		  ctx.putImageData(rightimgdata[i],rightX[i],beginPoint+i);
	 } 
	 for(var i=rightcontourY[9];i<endPoint;i++){
          ctx.putImageData(bottomimgdata[i],leftbj,i);
	 }
}

function addface(srcstr){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
	var img = new Image();
	img.src=srcstr;
	img.onload = function ()         
	{
		 getcontour(img);  //先获取脸部轮廓
    }
}