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
var temp=1;//每次填充像素的纵向偏移量
var leftimgdata=new Array();
var rightimgdata=new Array();
var leftlinenum=0,rightlinenum=0;
var leftX=new Array();   //水平线和左轮廓交点的横坐标
var rightX=new Array();  //水平线和右轮廓交点的横坐标

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

          var c=document.getElementById("myCanvas");
          var ctx=c.getContext("2d");	
        // getFaceAroundData(); //获取轮廓周围的像素
         beforeDo(5);
         ctx.save();
         var scalesizeX=(facewidth[curFace]*1.05)/img.width;
		 var scalesizeY=(faceheight[curFace]*1.25)/img.height;
		 var eyeaverX=(lefteyeX[curFace]+righteyeX[curFace])*0.5;
		 var eyeaverY=(lefteyeY[curFace]+righteyeY[curFace])*0.5;
         var mouthaverX=(rightmouthX[curFace]+leftmouthX[curFace])*0.5;
	     var mouthaverY=(rightmouthY[curFace]+leftmouthY[curFace])*0.5;
		 var angel=Math.atan((mouthaverX-eyeaverX)/(eyeaverY-mouthaverY));
		 ctx.translate(facecenterX[curFace],facecenterY[curFace]);
		 ctx.rotate(angel);
		 ctx.translate(-facecenterX[curFace],-facecenterY[curFace]);
         ctx.scale(scalesizeX,scalesizeY);	 
		 ctx.drawImage(img,facecenterX[curFace]/scalesizeX-img.width*0.5,facecenterY[curFace]/scalesizeY-img.height*0.5);
		 ctx.restore();
		// putFaceAroundData();  //像素覆盖
		 afterDo();
  });
}

function getFaceAroundData(){
	 var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
	 leftlinenum=rightlinenum=0;
     beginPoint=Math.min(leftcontourY[0],rightcontourY[0])-10;
	 
	 for(var i=beginPoint;i<leftcontourY[0];i++){
           leftimgdata[leftlinenum]=ctx.getImageData(0,i,leftcontourX[0],temp);
		   leftlinenum++;
	 }
     for(var i=0;i<9;i++){
          var x1=leftcontourX[i],y1=leftcontourY[i],x2=leftcontourX[i+1],y2=leftcontourY[i+1];
		  var k=-1*(y1-y2)/(x1-x2);
		  for(var j=y1;j<y2;j+=temp){ 
			   leftX[leftlinenum]=(j-y2)*(x1-x2)/(y1-y2)+x2;
			 //  alert(temp);//出错至此,从这里开始调试代码
               leftimgdata[leftlinenum]=ctx.getImageData(0,j,left[leftlinenum],temp);
			   leftlinenum++;
		  }
	 }
}

function putFaceAroundData(){
	 var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
     for(var i=0;i<leftlinenum;i++){
          ctx.putImageData(leftimgdata[i],0,beginPoint+i*temp);
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