function lvjing_fanse(){
     var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
     guodu();
      beforeDo(11);
      var imgData=ctx.getImageData(0,0,c.width,c.height);
       for (var i=0;i<imgData.data.length;i+=4)
      {
      imgData.data[i]=255-imgData.data[i];
      imgData.data[i+1]=255-imgData.data[i+1];
      imgData.data[i+2]=255-imgData.data[i+2];
      imgData.data[i+3]=255;
      }
      ctx.putImageData(imgData,0,0);
      afterDo();
    guoduover();
}


function lvjing_huise(){
    var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
      guodu();
      beforeDo(11);
      var imgData=ctx.getImageData(0,0,c.width,c.height);
      for (var i=0;i<imgData.data.length;i+=4)
      {
      var r=imgData.data[i];
      var g=imgData.data[i+1];
      var b=imgData.data[i+2];
      imgData.data[i]=(r * 0.272) + (g * 0.534) + (b * 0.131); 
      imgData.data[i+1]=(r * 0.349) + (g * 0.686) + (b * 0.168); 
      imgData.data[i+2]=(r * 0.393) + (g * 0.769) + (b * 0.189); 
      imgData.data[i+3]=255;
      }
      ctx.putImageData(imgData,0,0);
      afterDo();
    guoduover();
}

function lvjing_mohu(){
    var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
      guodu();
      beforeDo(11);
      var imgData=ctx.getImageData(0,0,c.width,c.height);
      var sumred = 0.0, sumgreen = 0.0, sumblue = 0.0; 
      for ( var x = 0; x < imgData.width; x++) { 
      for ( var y = 0; y < imgData.height; y++) { 
      // Index of the pixel in the array 
      var idx = (x + y * imgData.width) * 4; 
      for(var subCol=-2; subCol<=2; subCol++) { 
      var colOff = subCol + x; 
      if(colOff <0 || colOff >= imgData.width) { 
      colOff = 0; 
      } 
      for(var subRow=-2; subRow<=2; subRow++) { 
      var rowOff = subRow + y; 
      if(rowOff < 0 || rowOff >= imgData.height) { 
      rowOff = 0; 
      } 
      var idx2 = (colOff + rowOff * imgData.width) * 4; 
      var r = imgData.data[idx2 + 0]; 
      var g = imgData.data[idx2 + 1]; 
      var b = imgData.data[idx2 + 2]; 
      sumred += r; 
      sumgreen += g; 
      sumblue += b; 
      } 
      } 
      // calculate new RGB value 
      var nr = (sumred / 25.0); 
      var ng = (sumgreen / 25.0); 
      var nb = (sumblue / 25.0); 
      // clear previous for next pixel point 
      sumred = 0.0; 
      sumgreen = 0.0; 
      sumblue = 0.0; 
      // assign new pixel value 
      imgData.data[idx + 0] = nr; // Red channel 
      imgData.data[idx + 1] = ng; // Green channel 
      imgData.data[idx + 2] = nb; // Blue channel 
      imgData.data[idx + 3] = 255; // Alpha channel 
      } 
      } 
      ctx.putImageData(imgData,0,0);
      afterDo();
    guoduover();
}

function lvjing_fudiao(){
     var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
      guodu();
      beforeDo(11);
      var imgData=ctx.getImageData(0,0,c.width,c.height);
      var tempimgData=ctx.getImageData(0,0,c.width,c.height);
      for ( var x = 1; x < imgData.width-1; x++) 
      { 
      for ( var y = 1; y < imgData.height-1; y++) 
      { 
      // Index of the pixel in the array 
      var idx = (x + y * imgData.width) * 4; 
      var bidx = ((x-1) + y * imgData.width) * 4; 
      var aidx = ((x+1) + y * imgData.width) * 4; 
      // calculate new RGB value 
      var nr = imgData.data[aidx + 0] - imgData.data[bidx + 0] + 128; 
      var ng = imgData.data[aidx + 1] - imgData.data[bidx + 1] + 128; 
      var nb = imgData.data[aidx + 2] - imgData.data[bidx + 2] + 128; 
      nr = (nr < 0) ? 0 : ((nr >255) ? 255 : nr); 
      ng = (ng < 0) ? 0 : ((ng >255) ? 255 : ng); 
      nb = (nb < 0) ? 0 : ((nb >255) ? 255 : nb); 
      // assign new pixel value 
      tempimgData.data[idx + 0] = nr; // Red channel 
      tempimgData.data[idx + 1] = ng; // Green channel 
      tempimgData.data[idx + 2] = nb; // Blue channel 
      tempimgData.data[idx + 3] = 255; // Alpha channel 
      } 
      } 
      ctx.putImageData(tempimgData,0,0);
      afterDo();
    guoduover();
}

function lvjing_heibai(){
    var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
     guodu();
      beforeDo(11);
      var imgData=ctx.getImageData(0,0,c.width,c.height);
       for (var i=0;i<imgData.data.length;i+=4)
      {
      	var aver=imgData.data[i]+imgData.data[i+1]+imgData.data[i+2];
        aver/=3;
        if(aver<60){
           imgData.data[i]=imgData.data[i+1]=imgData.data[i+2]=0;	
        }else if(aver<90){
           imgData.data[i]=imgData.data[i+1]=imgData.data[i+2]=10;	
        }
        else if(aver<126){
            imgData.data[i]=imgData.data[i+1]=imgData.data[i+2]=20;	
        }else if(aver<175){
            imgData.data[i]=imgData.data[i+1]=imgData.data[i+2]=205;	
        }
        else if(aver<215){
        	imgData.data[i]=imgData.data[i+1]=imgData.data[i+2]=225;	
        }else{
            imgData.data[i]=imgData.data[i+1]=imgData.data[i+2]=255;	
        }
      }
      ctx.putImageData(imgData,0,0);
      afterDo();
    guoduover();
}

function lvjing_msk(){
	  var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
      guodu();
      beforeDo(11);
      var imgData=ctx.getImageData(0,0,c.width,c.height);
      var len=Math.min(imgData.width,imgData.height)/40;  //马赛克格子大小
      len=Math.floor(len);
      for ( var x = 0; x < imgData.width; x+=len) 
      { 
        for ( var y = 0; y < imgData.height; y+=len) 
        { 
        	var averR=0,averG=0,averB=0,averA=0;
            for(var ix=x;ix<x+len;ix++){
            	for(var iy=y;iy<y+len;iy++){
            		var idx=(ix+iy*imgData.width)*4;
                    averR+=imgData.data[idx];
                    averG+=imgData.data[idx+1];
                    averB+=imgData.data[idx+2];
                    averA+=imgData.data[idx+3];
            	}
            }
            var num=len*len;
            averR/=num,averG/=num,averB/=num,averA/=num;
             for(var ix=x;ix<x+len;ix++){
            	for(var iy=y;iy<y+len;iy++){
            		var idx=(ix+iy*imgData.width)*4;
                    imgData.data[idx]=averR;
                    imgData.data[idx+1]=averG;
                    imgData.data[idx+2]=averB;
                    imgData.data[idx+3]=averA;
            	}
            }
        } 
      } 
      ctx.putImageData(imgData,0,0);
      afterDo();
    guoduover();
}

function lvjing_qinshi(){
	var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
      guodu();
      beforeDo(11);
      var imgData=ctx.getImageData(0,0,c.width,c.height);
      var tempimgData=ctx.getImageData(0,0,c.width,c.height);
      var len=3;  //格子大小
      for ( var x = 0; x < imgData.width; x++) 
      { 
        for ( var y = 0; y < imgData.height; y++) 
        { 
        	var averR=0,averG=0,averB=0,averA=0;
            var maxx=0;
            for(var ix=x;ix<x+len;ix++){
            	for(var iy=y;iy<y+len;iy++){
            		var idx=(ix+iy*imgData.width)*4;
                    var sum=imgData.data[idx]+imgData.data[idx+1]+imgData.data[idx+2];
                    if(sum>maxx){
                    	maxx=sum;
                    	averR=imgData.data[idx],averG=imgData.data[idx+1],averB=imgData.data[idx+2];
                    }
            	}
            }
            var id=(x+y*imgData.width)*4;
            tempimgData.data[id]=averR,tempimgData.data[id+1]=averG,tempimgData.data[id+2]=averB;
        } 
      } 
      ctx.putImageData(tempimgData,0,0);
      afterDo();
    guoduover();
}

//////////////////////////////color///////////////////////////////
var bright_value=0,bright_size=12;
var bright_value_len=15;
function color_bright_add(){
     var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
      if(userState[point]!=12)  //别的操作之后再进行亮度操作都要重置
      	bright_value=0;
      beforeDo(12);
      bright_value++;
      if(bright_value>bright_value_len)bright_value=bright_value_len;
      if(bright_value<-bright_value_len)bright_value=-bright_value_len;
      var imgData=ctx.getImageData(0,0,c.width,c.height);
      for (var i=0;i<imgData.data.length;i+=4)
      {
      imgData.data[i]=Math.min(255,imgData.data[i]+bright_size*bright_value);
      imgData.data[i+1]=Math.min(255,imgData.data[i+1]+bright_size*bright_value);
      imgData.data[i+2]=Math.min(255,imgData.data[i+2]+bright_size*bright_value);
      imgData.data[i]=Math.max(0,imgData.data[i]+bright_size*bright_value);
      imgData.data[i+1]=Math.max(0,imgData.data[i+1]+bright_size*bright_value);
      imgData.data[i+2]=Math.max(0,imgData.data[i+2]+bright_size*bright_value);
      imgData.data[i+3]=255;
      }
      ctx.putImageData(imgData,0,0);
      afterDo();
}

function color_bright_sub(){
      var c=document.getElementById("myCanvas");
      var ctx=c.getContext("2d");
      if(userState[point]!=12)
      	bright_value=0;
      beforeDo(12);
      bright_value--;
      if(bright_value>bright_value_len)bright_value=bright_value_len;
      if(bright_value<-bright_value_len)bright_value=-bright_value_len;
      var imgData=ctx.getImageData(0,0,c.width,c.height);
      for (var i=0;i<imgData.data.length;i+=4)
      {
      imgData.data[i]=Math.min(255,imgData.data[i]+bright_size*bright_value);
      imgData.data[i+1]=Math.min(255,imgData.data[i+1]+bright_size*bright_value);
      imgData.data[i+2]=Math.min(255,imgData.data[i+2]+bright_size*bright_value);
      imgData.data[i]=Math.max(0,imgData.data[i]+bright_size*bright_value);
      imgData.data[i+1]=Math.max(0,imgData.data[i+1]+bright_size*bright_value);
      imgData.data[i+2]=Math.max(0,imgData.data[i+2]+bright_size*bright_value);
      imgData.data[i+3]=255;
      }
      ctx.putImageData(imgData,0,0);
      afterDo();
}

var alpha_value=0,alpha_size=20;
var alpha_value_len=-13;
function color_alpha_add(){
      var c=document.getElementById("myCanvas");
      var ctx=c.getContext("2d");
      if(userState[point]!=13)
      	alpha_value=0;
      beforeDo(13);
      alpha_value--;
      if(alpha_value<alpha_value_len)alpha_value=alpha_value_len;
      var imgData=ctx.getImageData(0,0,c.width,c.height);
      for (var i=0;i<imgData.data.length;i+=4)
      {
        imgData.data[i+3]=Math.max(0,imgData.data[i+3]+alpha_value*alpha_size);
        imgData.data[i+3]=Math.min(255,imgData.data[i+3]);
      }
      ctx.putImageData(imgData,0,0);
      afterDo();
}

function color_alpha_sub(){
     var c=document.getElementById("myCanvas");
      var ctx=c.getContext("2d");
      if(userState[point]!=13)
      	alpha_value=0;
      beforeDo(13);
      alpha_value++;
      if(alpha_value>0)alpha_value=0;
      var imgData=ctx.getImageData(0,0,c.width,c.height);
      for (var i=0;i<imgData.data.length;i+=4)
      {
        imgData.data[i+3]=Math.max(0,imgData.data[i+3]+alpha_value*alpha_size);
        imgData.data[i+3]=Math.min(255,imgData.data[i+3]);
      }
      ctx.putImageData(imgData,0,0);
      afterDo();
}

var contrast_value=1.1,contrast_size=0.15;
var contrast_value_len=3;
function color_contrast_add(){
    var c=document.getElementById("myCanvas");
      var ctx=c.getContext("2d");
      if(userState[point]!=14)
      	contrast_value=1.1;
      beforeDo(14);
      contrast_value+=contrast_size;
      if(contrast_value>contrast_value_len)contrast_value=contrast_value_len;
      if(contrast_value<0.1)contrast_value=0.1;
      var imgData=ctx.getImageData(0,0,c.width,c.height);
      for (var i=0;i<imgData.data.length;i+=4)
      {
          imgData.data[i]=Math.min(255,imgData.data[i]*contrast_value);
          imgData.data[i+1]=Math.min(255,imgData.data[i+1]*contrast_value);
          imgData.data[i+2]=Math.min(255,imgData.data[i+2]*contrast_value);
          imgData.data[i]=Math.max(0,imgData.data[i]);
          imgData.data[i+1]=Math.max(0,imgData.data[i+1]);
          imgData.data[i+2]=Math.max(0,imgData.data[i+2]);

      }
      ctx.putImageData(imgData,0,0);
      afterDo();
}

function color_contrast_sub(){
    var c=document.getElementById("myCanvas");
      var ctx=c.getContext("2d");
      if(userState[point]!=14)
      	contrast_value=0.9;
      beforeDo(14);
      contrast_value-=contrast_size;
      if(contrast_value>contrast_value_len)contrast_value=contrast_value_len;
      if(contrast_value<0.1)contrast_value=0.1;
      var imgData=ctx.getImageData(0,0,c.width,c.height);
      for (var i=0;i<imgData.data.length;i+=4)
      {
          imgData.data[i]=Math.min(255,imgData.data[i]*contrast_value);
          imgData.data[i+1]=Math.min(255,imgData.data[i+1]*contrast_value);
          imgData.data[i+2]=Math.min(255,imgData.data[i+2]*contrast_value);
          imgData.data[i]=Math.max(0,imgData.data[i]);
          imgData.data[i+1]=Math.max(0,imgData.data[i+1]);
          imgData.data[i+2]=Math.max(0,imgData.data[i+2]);

      }
      ctx.putImageData(imgData,0,0);
      afterDo();
}