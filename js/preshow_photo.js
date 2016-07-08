window.URL = window.URL || window.webkitURL;
	var fileElem = document.getElementById("fileElem"),
	    fileList = document.getElementById("fileList");
	  
    function beforeHandle(){
       document.getElementById("pleasewait").innerHTML="";
	}
    

	function handleFiles(obj) {
		var files = obj.files;
		var img = new Image();
		    var c=document.getElementById("myCanvas");
            var cxt=c.getContext("2d");
			$("#closebutton").hide();
			facenum=0;
		    uploadBmob();
		if(window.URL){
			//File API
			//  alert(files[0].name + "," + files[0].size + " bytes");
		      img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
		   //   img.width = 200;
		      img.onload = function(e) {
				// alert(img.src);
		        // window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
		      }
		  //    fileList.appendChild(img);
			 
		}else if(window.FileReader){
			//opera不支持createObjectURL/revokeObjectURL方法。我们用FileReader对象来处理
			var reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = function(e){
				alert(files[0].name + "," +e.total + " bytes");
				img.src = this.result;
		//		img.width = 200;
			//	fileList.appendChild(img);
			}
		}else{
			//ie
			obj.select();
			obj.blur();
			var nfile = document.selection.createRange().text;
			document.selection.empty();
			img.src = nfile;
		//	img.width = 200;
			img.onload=function(){
		      alert(nfile+","+img.fileSize + " bytes");
		    }
			//fileList.appendChild(img);
			//fileList.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src='"+nfile+"')";
		}
	//	if(fileList.childNodes.length>0){
	//		fileList.replaceChild(img,fileList.childNodes.item(0));
	//	}else{
	//	    fileList.appendChild(img);	
	//	}
	  //  var fileBinary = files[0].getAsBinary();
	//	getFaceInfo("http://isnowfy.qiniudn.com/people.png");

	    analysedImage=img;    //面相分析需要原图
        img.onload = function () //确保图片已经加载完毕  
        { 
	      var bili=img.width/img.height;
		  clearCanvas();
		  var  limitW=window.screen.width*0.8,limitH=window.screen.height*0.65;
		  if(!IsPC()){   //手机端适当放大点
		  	limitW*=1.5;limitH*=1.5;
		  }
		  if(window.screen.height<750)
		  	 limitH*=0.8;
		  else if(window.screen.height<920)
		  	 limitH*=0.9;
	      var limitbili=limitW/limitH
		  if(img.width<limitW&&img.height<limitH){
			  document.getElementById("myCanvas").height=img.height;
              document.getElementById("myCanvas").width=img.width;
			  cxt.drawImage(img,0,0);
			 // addphoto(img.src);
		  }
		  else if(bili<limitbili){
			  document.getElementById("myCanvas").height=limitH;
              document.getElementById("myCanvas").width=img.width*limitH/img.height;
			  cxt.drawImage(img,0,0,img.width*limitH/img.height,limitH);
		  }else {
			  document.getElementById("myCanvas").height=img.height*limitW/img.width;
              document.getElementById("myCanvas").width=limitW;
			  cxt.drawImage(img,0,0,limitW,img.height*limitW/img.width);
		  }
	     
		 // document.getElementById("img1").src=img.src; 
		 // geteye();
		 // $("#img1").hide();
		  canvasState[0]=cxt.getImageData(0,0,limitW,limitH);
		  curState[0]=canvasState[0];
		  userState[0]=0;
		  faceArray[0]=-1;
		  point=0;
		  stateSize=1;
		  curFace=0;
		  analysedFace=0;
		  beforecurFace=-1; 
		  $('#choosePhoto').popover('destroy');
          document.getElementById("pleasewait").innerHTML="<p class='text-primary' >&nbsp;&nbsp;&nbsp;&nbsp;图片上传中，请勿关闭窗口~</p>";
          $('#face_attribute_text').fadeOut();
        }  
        
		
	//	getFaceInfo(img.src);
	}
	
     function uploadBmob(){
	  $("#loading").show();
      var fileUploadControl = $("#fileElem")[0]; 
      if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = "face.jpg";
        var file = new Bmob.File2(name, file); 
        file.save().then(function(obj) {
		 var url=obj.url(); 
	     getFaceInfo(url);
       }, function(error) {
  // the save failed.
      alert("bmob维护中，图片无法取得url");
	  document.getElementById("pleasewait").innerHTML="<p class='text-danger' >&nbsp;&nbsp;&nbsp;&nbsp;图片信息获取失败！</p>";
      });
	  }

    }
	
