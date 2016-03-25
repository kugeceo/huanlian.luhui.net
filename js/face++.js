var facenum;
var faceID=new Array();
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
function  getFaceInfo(urlstr){
 var api = new FacePP('abc3b4dd8808310720f3a521311f0bf0', 'vyvK77UjUxGdksdyojX0cWgGmM64PaLq');
 api.request('detection/detect', {
      url:urlstr
    }, function(err, result) {
     if (err) {
      // TODO handle error
	   alert("人脸云端识别出错，请重试！");
	   document.getElementById("pleasewait").innerHTML="<p class='text-danger'>&nbsp;&nbsp;&nbsp;&nbsp;图片信息获取失败！</p>";
	         return;  
      }
        // TODO use result
	   $("#loading").hide();
	   $("#closebutton").show();
	   var json= JSON.stringify(result, null, 2);
	   getwuguan(json); //获取五官信息
	   //生成脸部列表
	   var manyface="";  
	   if(facenum<=0)
		   manyface+="&nbsp&nbsp没有检测到脸部";
	   for(var i=0;i<facenum;i++){
          manyface+="<li><a href='#' style='height=30;width=30;' "+"onClick='curFace="+i+"' >  <canvas id='face"+i+"'  ></a></li>";
	   }
	   document.getElementById("manyface").innerHTML=manyface;
       for(var i=0;i<facenum;i++){    //对于每张脸，从原画布中提取像素，拷贝至按钮上
          var c=document.getElementById("myCanvas");
          var ctx=c.getContext("2d");
		  var imgData=ctx.getImageData(facecenterX[i]-160,facecenterY[i]-80,320,160);
		  c=document.getElementById("face"+i);
		  ctx=c.getContext("2d");
		  ctx.putImageData(imgData,0,0);
		  ctx.fillStyle="blue";     //标上十字标记
          ctx.fillRect(154,79,12,2);
		  ctx.fillRect(159,74,2,12);
	   }
	   document.getElementById("pleasewait").innerHTML="<p class='text-success' >&nbsp;&nbsp;&nbsp;&nbsp;图片上传成功！</p>";
  });
}

function getwuguan(json){
   var obj = eval ("(" + json + ")");   //解析json
   facenum=obj.face.length;
   var H=document.getElementById("myCanvas").height*0.01;
   var W=document.getElementById("myCanvas").width*0.01;
   for(var i=0;i<facenum;i++){
	   faceID[i]=obj.face[i].face_id;
	   facecenterX[i]=obj.face[i].position.center.x*W;
	   facecenterY[i]=obj.face[i].position.center.y*H;
	   facewidth[i]=obj.face[i].position.width*W;
	   faceheight[i]=obj.face[i].position.height*H;
       lefteyeX[i]=obj.face[i].position.eye_left.x*W;
	   lefteyeY[i]=obj.face[i].position.eye_left.y*H;
	   righteyeX[i]=obj.face[i].position.eye_right.x*W;
	   righteyeY[i]=obj.face[i].position.eye_right.y*H;
	   noseX[i]=obj.face[i].position.nose.x*W;
	   noseY[i]=obj.face[i].position.nose.y*H;
	   leftmouthX[i]=obj.face[i].position.mouth_left.x*W;
       leftmouthY[i]=obj.face[i].position.mouth_left.y*H;
       rightmouthX[i]=obj.face[i].position.mouth_right.x*W;
	   rightmouthY[i]=obj.face[i].position.mouth_right.y*H;
	   facecenterY[i]+=faceheight[i]*0.05;
   }
 
  // obj.face[0].position.eye_left.x
}

