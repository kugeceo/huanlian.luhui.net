

function uploadNewFace(obj){  //上传新脸
 /*  if(facenum<1){
        alert("请先上传一张照片~");
        return ;
   }*/ 
    if(facenum==0){
         alert("原图未发现人脸，请更换图片~");
     	 return ;
    }
   var files = obj.files;
   var img = new Image();
   var c=document.getElementById("NewfaceCanvas");
   var cxt=c.getContext("2d");
   cxt.clearRect(0,0,5000,5000);
   uploadBmob_New(img);
   if(window.URL){
		    img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
		    
	}else if(window.FileReader){
			var reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = function(e){
				alert(files[0].name + "," +e.total + " bytes");
				img.src = this.result;
			}
	}else{
			obj.select();
			obj.blur();
			var nfile = document.selection.createRange().text;
			document.selection.empty();
			img.src = nfile;
			img.onload=function(){
		      alert(nfile+","+img.fileSize + " bytes");
		    }
	}  

	img.onload= function(){
        var bili=img.width/img.height;
	    // cxt.clearRect(0,0,5000,5000);
		  var  limitW=window.screen.width*0.8,limitH=window.screen.height*0.7;
		  if(window.screen.height<750)
		  	 limitH*=0.8;
		  else if(window.screen.height<920)
		  	 limitH*=0.9;
	      var limitbili=limitW/limitH;
        //  document.getElementById("NewfaceCanvas").height=img.height;
        //  document.getElementById("NewfaceCanvas").width=img.width;
		//  cxt.drawImage(img,0,0);

	}
}

 function uploadBmob_New(img){
      var fileUploadControl = $("#NewFace")[0]; 
      if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = "newface.jpg";
        var file = new Bmob.File2(name, file); 
        file.save().then(function(obj) {
		 var url=obj.url(); 
	     getNewFaceInfo(url,img);
       }, function(error) {
  // the save failed.
      alert("文件上传出现了点问题，请重试~");
      });
  }
}



///////////////以下是新脸（被换上的脸）的数据/////////////////   
var Newfacenum=0;
var NewfaceID=new Array();
var NewfacecenterX=new Array();
var NewfacecenterY=new Array();
var Newfacewidth=new Array();
var Newfaceheight=new Array();
var NewlefteyeX=new Array();
var NewlefteyeY=new Array();
var NewrighteyeX=new Array();
var NewrighteyeY=new Array();
var NewnoseX=new Array();
var NewnoseY=new Array();
var NewleftmouthX=new Array();
var NewleftmouthY=new Array();
var NewrightmouthX=new Array();
var NewrightmouthY=new Array();


function  getNewFaceInfo(urlstr,img){
 var api = new FacePP('abc3b4dd8808310720f3a521311f0bf0', 'vyvK77UjUxGdksdyojX0cWgGmM64PaLq');
 api.request('detection/detect', {
      url:urlstr
    }, function(err, result) {
     if (err) {
      // TODO handle error
	   alert("人脸云端识别出错，请重试！");
	   return;  
      }
	   var json= JSON.stringify(result, null, 2); 
	   getNewwuguan(json,img); //获取五官信息
  });
}

function getNewwuguan(json,img){
   var obj = eval ("(" + json + ")");   //解析json
   Newfacenum=obj.face.length;
    if(Newfacenum==0){
         alert("该素材未发现人脸，请更换素材~");
     	 return ;
    }
    
   var H=img.height*0.01;
   var W=img.width*0.01;
   for(var i=0;i<Newfacenum;i++){
	   NewfaceID[i]=obj.face[i].face_id;
	   NewfacecenterX[i]=obj.face[i].position.center.x*W;
	   NewfacecenterY[i]=obj.face[i].position.center.y*H;
	   Newfacewidth[i]=obj.face[i].position.width*W;
	   Newfaceheight[i]=obj.face[i].position.height*H;
       NewlefteyeX[i]=obj.face[i].position.eye_left.x*W;
	   NewlefteyeY[i]=obj.face[i].position.eye_left.y*H;
	   NewrighteyeX[i]=obj.face[i].position.eye_right.x*W;
	   NewrighteyeY[i]=obj.face[i].position.eye_right.y*H;
	   NewnoseX[i]=obj.face[i].position.nose.x*W;
	   NewnoseY[i]=obj.face[i].position.nose.y*H;
	   NewleftmouthX[i]=obj.face[i].position.mouth_left.x*W;
       NewleftmouthY[i]=obj.face[i].position.mouth_left.y*H;
       NewrightmouthX[i]=obj.face[i].position.mouth_right.x*W;
	   NewrightmouthY[i]=obj.face[i].position.mouth_right.y*H;
	 //  NewfacecenterY[i]+=Newfaceheight[i]*0.05;
   }
   addNewface(img);
}

function addNewface(img){
    if(Newfacenum==0){
         alert("未发现人脸，请更换图片~");
     	 return ;
    } 

    getNewcontour(img);  //先获取脸部轮廓
}

/*
  大致思路： 先对新画布进行旋转，缩放，然后再提取像素，然后将新脸贴合在照片上，最后再对边缘进行裁剪
*/

var NewleftcontourX=new Array();
var NewleftcontourY=new Array();
var NewrightcontourX=new Array();
var NewrightcontourY=new Array();
var Newlinenum=0;  // 像素行的数量
var Newbeginpoint=new Array();  //新的左起点
var Newimgline=new Array();   //新像素行
function getNewcontour(img)   //解析新脸，返回左右部轮廓
{
   var api = new FacePP('abc3b4dd8808310720f3a521311f0bf0', 'vyvK77UjUxGdksdyojX0cWgGmM64PaLq');
   api.request('detection/landmark', {
       face_id: NewfaceID[0]
    }, function(err, result) {
     if (err) {
      // TODO handle error
	     alert("解析人脸关键点出错!");
	     return;  
      } 

	   var json= JSON.stringify(result, null, 2);
	   var obj = eval ("(" + json + ")");   //解析json
	   var H=img.height*0.01;
       var W=img.width*0.01;
	   var addW=Newfacewidth*0.12;   //容许脸部稍微扩展一点
	   addW=-Math.ceil(addW);
	   var c=document.getElementById("NewfaceCanvas"); 
       var ctx=c.getContext("2d");
	   //解析点集，存到数组里
       
       NewleftcontourX[0]=obj.result[0].landmark.left_eyebrow_upper_left_quarter.x*W-addW;
	   NewleftcontourY[0]=obj.result[0].landmark.left_eyebrow_upper_left_quarter.y*H;
	   NewleftcontourX[1]=obj.result[0].landmark.contour_left1.x*W-addW;
	   NewleftcontourY[1]=obj.result[0].landmark.contour_left1.y*H;
       NewleftcontourX[1]=obj.result[0].landmark.contour_left1.x*W-addW;
	   NewleftcontourY[1]=obj.result[0].landmark.contour_left1.y*H;
	   NewleftcontourX[2]=obj.result[0].landmark.contour_left2.x*W-addW;
	   NewleftcontourY[2]=obj.result[0].landmark.contour_left2.y*H;
	   NewleftcontourX[3]=obj.result[0].landmark.contour_left3.x*W-addW;
	   NewleftcontourY[3]=obj.result[0].landmark.contour_left3.y*H;
	   NewleftcontourX[4]=obj.result[0].landmark.contour_left4.x*W-addW;
	   NewleftcontourY[4]=obj.result[0].landmark.contour_left4.y*H;
	   NewleftcontourX[5]=obj.result[0].landmark.contour_left5.x*W-addW;
	   NewleftcontourY[5]=obj.result[0].landmark.contour_left5.y*H;
	   NewleftcontourX[6]=obj.result[0].landmark.contour_left6.x*W-addW;
	   NewleftcontourY[6]=obj.result[0].landmark.contour_left6.y*H;
	   NewleftcontourX[7]=obj.result[0].landmark.contour_left7.x*W-addW;
	   NewleftcontourY[7]=obj.result[0].landmark.contour_left7.y*H;
	   NewleftcontourX[8]=obj.result[0].landmark.contour_left8.x*W-addW;
	   NewleftcontourY[8]=obj.result[0].landmark.contour_left8.y*H;
	   NewleftcontourX[9]=obj.result[0].landmark.contour_left9.x*W-addW;
	   NewleftcontourY[9]=obj.result[0].landmark.contour_left9.y*H;
	   NewleftcontourX[10]=obj.result[0].landmark.contour_chin.x*W-addW;
	   NewleftcontourY[10]=obj.result[0].landmark.contour_chin.y*H;
	  
	   NewrightcontourX[0]=obj.result[0].landmark.right_eyebrow_upper_right_quarter.x*W+addW;
	   NewrightcontourY[0]=obj.result[0].landmark.right_eyebrow_upper_right_quarter.y*H;
	   NewrightcontourX[1]=obj.result[0].landmark.contour_right1.x*W+addW;
	   NewrightcontourY[1]=obj.result[0].landmark.contour_right1.y*H;
	   NewrightcontourX[2]=obj.result[0].landmark.contour_right2.x*W+addW;
	   NewrightcontourY[2]=obj.result[0].landmark.contour_right2.y*H;
	   NewrightcontourX[3]=obj.result[0].landmark.contour_right3.x*W+addW;
	   NewrightcontourY[3]=obj.result[0].landmark.contour_right3.y*H;
	   NewrightcontourX[4]=obj.result[0].landmark.contour_right4.x*W+addW;
	   NewrightcontourY[4]=obj.result[0].landmark.contour_right4.y*H;
	   NewrightcontourX[5]=obj.result[0].landmark.contour_right5.x*W+addW;
	   NewrightcontourY[5]=obj.result[0].landmark.contour_right5.y*H;
	   NewrightcontourX[6]=obj.result[0].landmark.contour_right6.x*W+addW;
	   NewrightcontourY[6]=obj.result[0].landmark.contour_right6.y*H;
	   NewrightcontourX[7]=obj.result[0].landmark.contour_right7.x*W+addW;
	   NewrightcontourY[7]=obj.result[0].landmark.contour_right7.y*H;
	   NewrightcontourX[8]=obj.result[0].landmark.contour_right8.x*W+addW;
	   NewrightcontourY[8]=obj.result[0].landmark.contour_right8.y*H;
	   NewrightcontourX[9]=obj.result[0].landmark.contour_right9.x*W+addW;
	   NewrightcontourY[9]=obj.result[0].landmark.contour_right9.y*H;
	   NewrightcontourX[10]=obj.result[0].landmark.contour_chin.x*W+addW;
	   NewrightcontourY[10]=obj.result[0].landmark.contour_chin.y*H;
        
       //对图片进行放大（缩小），放在画布上
       pregetoldcontour(img);  //再次获取原图的详细点集
       
  });
}


function pregetoldcontour(img)   //获取原图详细点集
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
	   var obj = eval ("(" + json + ")");    //解析json
	   var H=document.getElementById("myCanvas").height*0.01;
       var W=document.getElementById("myCanvas").width*0.01;
	   var addW=0;   //容许脸部稍微扩展一点
	   //解析点集，存到数组里
       leftcontourX[0]=obj.result[0].landmark.contour_left1.x*W-addW;
	   leftcontourY[0]=obj.result[0].landmark.contour_left1.y*H;
	   leftcontourX[1]=obj.result[0].landmark.contour_left2.x*W-addW;
	   leftcontourY[1]=obj.result[0].landmark.contour_left2.y*H;
	   leftcontourX[2]=obj.result[0].landmark.contour_left3.x*W-addW;
	   leftcontourY[2]=obj.result[0].landmark.contour_left3.y*H;
	   leftcontourX[3]=obj.result[0].landmark.contour_left4.x*W-addW;
	   leftcontourY[3]=obj.result[0].landmark.contour_left4.y*H;
	   leftcontourX[4]=obj.result[0].landmark.contour_left5.x*W-addW;
	   leftcontourY[4]=obj.result[0].landmark.contour_left5.y*H;
	   leftcontourX[5]=obj.result[0].landmark.contour_left6.x*W-addW;
	   leftcontourY[5]=obj.result[0].landmark.contour_left6.y*H;
	   leftcontourX[6]=obj.result[0].landmark.contour_left7.x*W-addW;
	   leftcontourY[6]=obj.result[0].landmark.contour_left7.y*H;
	   leftcontourX[7]=obj.result[0].landmark.contour_left8.x*W-addW;
	   leftcontourY[7]=obj.result[0].landmark.contour_left8.y*H;
	   leftcontourX[8]=obj.result[0].landmark.contour_left9.x*W-addW;
	   leftcontourY[8]=obj.result[0].landmark.contour_left9.y*H;
	   leftcontourX[9]=obj.result[0].landmark.contour_chin.x*W-addW;
	   leftcontourY[9]=obj.result[0].landmark.contour_chin.y*H;
	
	   rightcontourX[0]=obj.result[0].landmark.contour_right1.x*W+addW;
	   rightcontourY[0]=obj.result[0].landmark.contour_right1.y*H;
	   rightcontourX[1]=obj.result[0].landmark.contour_right2.x*W+addW;
	   rightcontourY[1]=obj.result[0].landmark.contour_right2.y*H;
	   rightcontourX[2]=obj.result[0].landmark.contour_right3.x*W+addW;
	   rightcontourY[2]=obj.result[0].landmark.contour_right3.y*H;
	   rightcontourX[3]=obj.result[0].landmark.contour_right4.x*W+addW;
	   rightcontourY[3]=obj.result[0].landmark.contour_right4.y*H;
	   rightcontourX[4]=obj.result[0].landmark.contour_right5.x*W+addW;
	   rightcontourY[4]=obj.result[0].landmark.contour_right5.y*H;
	   rightcontourX[5]=obj.result[0].landmark.contour_right6.x*W+addW;
	   rightcontourY[5]=obj.result[0].landmark.contour_right6.y*H;
	   rightcontourX[6]=obj.result[0].landmark.contour_right7.x*W+addW;
	   rightcontourY[6]=obj.result[0].landmark.contour_right7.y*H;
	   rightcontourX[7]=obj.result[0].landmark.contour_right8.x*W+addW;
	   rightcontourY[7]=obj.result[0].landmark.contour_right8.y*H;
	   rightcontourX[8]=obj.result[0].landmark.contour_right9.x*W+addW;
	   rightcontourY[8]=obj.result[0].landmark.contour_right9.y*H;
	   rightcontourX[9]=obj.result[0].landmark.contour_chin.x*W+addW;
	   rightcontourY[9]=obj.result[0].landmark.contour_chin.y*H;

////开始进行坐标的变换
  //对图片进行选择放大，同时对坐标也进行旋转放大
	   var scalesizeX=Math.sqrt((leftcontourX[0]-rightcontourX[0])*(leftcontourX[0]-rightcontourX[0])+(leftcontourY[0]-rightcontourY[0])*(leftcontourY[0]-rightcontourY[0]));   
       scalesizeX/=Math.sqrt((NewleftcontourX[1]-NewrightcontourX[1])*(NewleftcontourX[1]-NewrightcontourX[1])+(NewleftcontourY[1]-NewrightcontourY[1])*(NewleftcontourY[1]-NewrightcontourY[1]));  
	   var scalesizeY=(faceheight[curFace])/Newfaceheight[0]; 
	   scalesizeX*=0.9;scalesizeY*=0.9;
       ctx.save();
       ctx.scale(scalesizeX,scalesizeY); 
	   ctx.drawImage(img,0,0);
	   ctx.restore();
      
       for(var i=0;i<=10;i++){
       	 NewleftcontourX[i]*=scalesizeX;
       	 NewleftcontourY[i]*=scalesizeY;
       	 NewrightcontourX[i]*=scalesizeX;
       	 NewrightcontourY[i]*=scalesizeY;
       }


      //坐标变换完成后，提取脸部像素部分
       var Newleftborder=23333;
       for(var i=0;i<=10;i++){
       	Newleftborder=Math.min(Newleftborder,NewleftcontourX[i]);
       }
       Newleftborder=Math.ceil(Newleftborder);
       Newlinenum=0;
       var curL=0,curR=0; 
       var begin=Math.min(NewleftcontourY[0],NewrightcontourY[0]);
       var end= Math.min(NewleftcontourY[10],NewrightcontourY[10]);
       begin=Math.ceil(begin); end=Math.ceil(end);
   
       for(var i=begin;i<end;i++){
           var leftp=-1,rightp=-1;
           for(var j=0;j<10;j++){
           	 if(NewleftcontourY[j]<=i&&NewleftcontourY[j+1]>i){
           	 	leftp=(i-NewleftcontourY[j+1])*(NewleftcontourX[j]-NewleftcontourX[j+1])/(NewleftcontourY[j]-NewleftcontourY[j+1])+NewleftcontourX[j+1];
           	 }
           	 if(NewrightcontourY[j]<=i&&NewrightcontourY[j+1]>i){
           	 	rightp=(i-NewrightcontourY[j+1])*(NewrightcontourX[j]-NewrightcontourX[j+1])/(NewrightcontourY[j]-NewrightcontourY[j+1])+NewrightcontourX[j+1];
           	 }
           }

           if(leftp==-1){
           	  leftp=(i-NewrightcontourY[0])*(NewleftcontourX[0]-NewrightcontourX[0])/(NewleftcontourY[0]-NewrightcontourY[0])+NewrightcontourX[0];
           }
           if(rightp==-1){
           	  rightp=(i-NewrightcontourY[0])*(NewleftcontourX[0]-NewrightcontourX[0])/(NewleftcontourY[0]-NewrightcontourY[0])+NewrightcontourX[0];
           }
           leftp=Math.ceil(leftp);rightp=Math.ceil(rightp);
           if(rightp<leftp)rightp=leftp;
           Newbeginpoint[Newlinenum]=leftp-Newleftborder;
           Newimgline[Newlinenum++]=ctx.getImageData(leftp,i,rightp-leftp+1,1);
       }
	   putNewFaceOnCanvas(img);

  });
}


function putNewFaceOnCanvas(img){
      //放置脸部的部分
         var c=document.getElementById("myCanvas");
         var ctx=c.getContext("2d");	
	     var Top=facecenterY[curFace]-faceheight[curFace]*0.5,Left=facecenterX[curFace]-facewidth[curFace]*0.45;
	     Top=Math.ceil(Top*1.05); Left=Math.ceil(Left);

	     for(var i=0;i<Newlinenum;i++){
	     	ctx.putImageData(Newimgline[i],Left+Newbeginpoint[i],Top+i);
	     }
	
         alert("succeed");
		// putFaceAroundData(img);  //像素覆盖
		// afterDo();
	
}
