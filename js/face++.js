var facenum=0;
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
var age_value=new Array();
var age_range=new Array();
var gender_value=new Array();
var gender_confidence=new Array();
var glass_value=new Array();
var glass_confidence=new Array();
var race_value=new Array();
var race_confidence=new Array();
var smiling_value=new Array();
var pitch_angle=new Array();

var firstuse=0;
function  getFaceInfo(urlstr){
 var api = new FacePP('abc3b4dd8808310720f3a521311f0bf0', 'vyvK77UjUxGdksdyojX0cWgGmM64PaLq');
 api.request('detection/detect', {
      url:urlstr,
      attribute:"glass,pose,gender,age,race,smiling"
    }, function(err, result) {
     if (err) {
      // TODO handle error
	   alert("Face++人脸云端识别出错，请重试！");
	   document.getElementById("pleasewait").innerHTML="<p class='text-danger'>&nbsp;&nbsp;&nbsp;&nbsp;图片信息获取失败！</p>";
	         return;  
      }
        // TODO 2.use result
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
	   get_analysedFace();  //面相分析先提取原图的脸部图片
	   show_analysedFace();  // 面相分析初始脸 
	   document.getElementById("pleasewait").innerHTML="<p class='text-success' >&nbsp;&nbsp;&nbsp;&nbsp;图片上传成功！</p>";
	   if(firstuse==0){
	     	firstuse=1;
	     	$('#changefacetip').popover('show');
	        setTimeout(" $('#changefacetip').popover('hide');",4000);
	   }
	  
  });
}

function getwuguan(json){
   var obj = eval ("(" + json + ")");   //解析json
   facenum=obj.face.length;
   if(facenum>1)     //检测到多张脸，弹出提示
   $('#lianbuqiehuan').popover('show');
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
	   age_value[i]=obj.face[i].attribute.age.value;
	   age_range[i]=obj.face[i].attribute.age.range;
	   gender_value[i]=obj.face[i].attribute.gender.value;
	   gender_confidence[i]=obj.face[i].attribute.gender.confidence;
	   glass_value[i]=obj.face[i].attribute.glass.value;
	   glass_confidence[i]=obj.face[i].attribute.glass.confidence;
	   race_value[i]=obj.face[i].attribute.race.value;
	   race_confidence[i]=obj.face[i].attribute.race.confidence;
       smiling_value[i]=obj.face[i].attribute.smiling.value;
       pitch_angle[i]=obj.face[i].attribute.pose.pitch_angle.value;

	   facecenterY[i]+=faceheight[i]*0.05;
	   if(gender_value[i]=="Male") gender_value[i]="男";
	   else gender_value[i]="女";
	   if(glass_value[i]=="Normal") glass_value[i]="普通眼镜";
	   else if(glass_value[i]=="Dark") glass_value[i]="墨镜";
	   else glass_value[i]="无";
	   if(race_value[i]=="Asian") race_value[i]="亚洲脸";
	   else if(race_value[i]=="White") race_value[i]="白种人脸";
	   else race_value[i]="黑种人脸";
	   if(smiling_value[i]<10)smiling_value[i]="生无可恋";
	   else if(smiling_value[i]<40)smiling_value[i]="微笑";
	   else if(smiling_value[i]<60)smiling_value[i]="猥琐的笑容";
	   else if(smiling_value[i]<80)smiling_value[i]="憨笑";
	   else if(smiling_value[i]<90)smiling_value[i]="大笑";
	   else smiling_value[i]="发疯般地狂笑";
       gender_confidence[i]*=100;
       gender_confidence[i]=Math.ceil(gender_confidence[i]);
       gender_confidence[i]/=100;
       glass_confidence[i]*=100;
       glass_confidence[i]=Math.ceil(glass_confidence[i]);
       glass_confidence[i]/=100;
       race_confidence[i]*=100;
       race_confidence[i]=Math.ceil(race_confidence[i]);
       race_confidence[i]/=100;
   }
  // obj.face[0].position.eye_left.x
}

