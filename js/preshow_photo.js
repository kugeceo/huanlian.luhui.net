window.URL = window.URL || window.webkitURL;
	var fileElem = document.getElementById("fileElem"),
	    fileList = document.getElementById("fileList");
	  
	
	  
	function handleFiles(obj) {
		var files = obj.files,
			img = new Image();
		    var c=document.getElementById("myCanvas");
            var cxt=c.getContext("2d");
		  
		if(window.URL){
			//File API
			//  alert(files[0].name + "," + files[0].size + " bytes");
		      img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
		   //   img.width = 200;
		      img.onload = function(e) {
				// alert(img.src);
		         window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
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
	
        img.onload = function () //确保图片已经加载完毕  
        { 
	      var bili=img.width/img.height;
		  clearCanvas();
		  if(img.width<1500&&img.height<750){
			  document.getElementById("myCanvas").height=img.height;
              document.getElementById("myCanvas").width=img.width;
			  cxt.drawImage(img,0,0);
			 // addphoto(img.src);
			 
		  }
		  else if(bili<2){
			  document.getElementById("myCanvas").height=750;
              document.getElementById("myCanvas").width=img.width*750/img.height;
			  cxt.drawImage(img,0,0,img.width*750/img.height,750);
			  document.getElementById("img1").width=img.width*750/img.height;
			  document.getElementById("img1").height=750; 
		  }else {
			  document.getElementById("myCanvas").height=img.height*1500/img.width;
              document.getElementById("myCanvas").width=1500;
			  cxt.drawImage(img,0,0,1500,img.height*1500/img.width);
			  document.getElementById("img1").height=img.height*1500/img.width; 
			   document.getElementById("img1").width=1500;
		  }
		  document.getElementById("img1").src=img.src; 
		  geteye();
		  $("#img1").hide();
		  canvasState[0]=cxt.getImageData(0,0,1500,750);
		  curState[0]=canvasState[0];
		  userState[0]=0;
		  point=0;
		  stateSize=1;
		  $('#choosePhoto').popover('destroy');

        }  
        
		
	//	getFaceInfo(img.src);
	}
	

	
