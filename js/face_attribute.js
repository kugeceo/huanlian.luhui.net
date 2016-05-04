var analysedFace;
var analysedcanvasW=240,analysedcanvasH=240;
var analysedImage=new Array();
function show_analysedFace(){
	      var c=document.getElementById("myCanvas");
          var ctx=c.getContext("2d");
          for(var i=0;i<facenum;i++){
          	 analysedImage[i]=ctx.getImageData(facecenterX[i]-analysedcanvasW/2,facecenterY[i]-analysedcanvasH/2,analysedcanvasW,analysedcanvasH);
          }
		  c=document.getElementById("face_attribute_canvas");
		  ctx=c.getContext("2d");
		  ctx.putImageData(analysedImage[analysedFace],0,0);
		  ctx.fillStyle="white";     //标上十字标记
        //  ctx.fillRect(analysedcanvasW/2-2000,analysedcanvasH/2,5000,1);
		//  ctx.fillRect(analysedcanvasW/2,analysedcanvasH/2-2000,1,5000);
		  ctx.fillRect(analysedcanvasW/2-facewidth[analysedFace]/2,analysedcanvasH/2-faceheight[analysedFace]/2,facewidth[analysedFace],1);
		  ctx.fillRect(analysedcanvasW/2-facewidth[analysedFace]/2,analysedcanvasH/2-faceheight[analysedFace]/2,1,faceheight[analysedFace]);
		  ctx.fillRect(analysedcanvasW/2-facewidth[analysedFace]/2,analysedcanvasH/2+faceheight[analysedFace]/2,facewidth[analysedFace],1);
		  ctx.fillRect(analysedcanvasW/2+facewidth[analysedFace]/2,analysedcanvasH/2-faceheight[analysedFace]/2,1,faceheight[analysedFace]);
}

function change_analysedFace(){
	analysedFace=(analysedFace+1)%facenum;
	show_analysedFace();
}
//颜值： 公式计算 (0~10分)
//年龄： age_value (包含了age_range：可能范围)
//性别： gender_value(包含了gender_confidence: 置信度)
//是否带眼镜： glass_value(包含了glass_confidence：置信度)
//种族： race_value(包含了race_confidence：置信度)
//微笑指数： smiling_value(0~100,值越大笑的越开心)
//抬头角度： pitch_angle (角度)
