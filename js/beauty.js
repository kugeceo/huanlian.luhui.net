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
   //   imgData.data[i+3]=255;
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
   //   imgData.data[i+3]=255;
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
    //  imgData.data[idx + 3] = 255; // Alpha channel 
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
   //   tempimgData.data[idx + 3] = 255; // Alpha channel 
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
                  //  averA+=imgData.data[idx+3];
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
                 //   imgData.data[idx+3]=averA;
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

function sameColor(rcz,r1,g1,b1,r2,g2,b2){  //判断在规定容差值下，两像素是否属于同类
    if(abs(r1,r2)<rcz&&abs(b1,b2)<rcz&&abs(g1,g2)<rcz)
       return true;
    else
      return false;
}

function yijianqudi(){
      beforeDo(15);
      var c=document.getElementById("myCanvas");
      var ctx=c.getContext("2d");
      var rcz=document.getElementById("yjqdRCZ").value;  //容差值
      rcz*=255/120;
      if(rcz<=0)rcz=1;
      if(rcz>255)rcz=255;
      var imgData=ctx.getImageData(0,0,c.width,c.height);
      var jzs=0;  //取第一行为基准色
      var r=0,g=0,b=0;
      for (var i=0;i<c.width*4;i+=4){
          r+=imgData.data[i],g+=imgData.data[i+1],b+=imgData.data[i+2];
      }
      r/=c.width,g/=c.width,b/=c.width;
      for (var i=0;i<imgData.data.length;i+=4)
      {
          if(sameColor(rcz,r,g,b,imgData.data[i],imgData.data[i+1],imgData.data[i+2]))
          imgData.data[i+3]=0;
      }
     ctx.putImageData(imgData,0,0);
     afterDo();
}

var mousetype=0;  //鼠标类型
//0 无效果 1：填充笔 2：橡皮擦  3：马赛克笔  4：铅笔  5：荧光笔

var tcqdRCZ,tcqdR,tcqdG,tcqdB;
var dsa=0;
var tcimgData;
function BFS(x,y){
     var c=document.getElementById("myCanvas");
     var vis=new Array();
     for(var i=0;i<=c.height;i++){
       vis[i]=new Array();
       for(var j=0;j<=c.width;j++){
        vis[i][j]=0;
       }
     }
    
    var X=new Array(),Y=new Array(),front=0,rear=1;
    X[0]=x,Y[0]=y;
    while(front<rear){
      var curX=X[front],curY=Y[front++];
      if(curX<0||curX>=c.width||curY<0||curY>=c.height)
        continue;
      if(vis[curY][curX])
        continue;
      vis[curY][curX]=1;
      var idx=curY*c.width+curX;idx*=4;
      if(sameColor(tcqdRCZ,tcimgData.data[idx],tcimgData.data[idx+1],tcimgData.data[idx+2],tcqdR,tcqdG,tcqdB))
        tcimgData.data[idx+3]=0;
      else 
        continue;
      X[rear]=curX+1,Y[rear++]=curY;
      X[rear]=curX-1,Y[rear++]=curY;
      X[rear]=curX,Y[rear++]=curY+1;
      X[rear]=curX,Y[rear++]=curY-1;
    }
}
function tianchongqudi(x,y){
     var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
     ctx.putImageData(curState[point],0,0);
     beforeDo(16);
     tcimgData=ctx.getImageData(0,0,c.width,c.height); 
     tcqdRCZ=document.getElementById("tcqdRCZ").value;
     tcqdRCZ++;tcqdRCZ*=2;
     var idx=y*c.width+x;idx*=4;
     tcqdR=tcimgData.data[idx],tcqdG=tcimgData.data[idx+1],tcqdB=tcimgData.data[idx+2];
     BFS(x,y);
     ctx.putImageData(tcimgData,0,0);
     afterDo();
}


//////////////////update部分

var subtitleX=new Array(),subtitleY=new Array();
var subtitleP=0;

function updateSubtitle(x,y){
     var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
     var fontSize=document.getElementById("fontSize").value;
     var fontstyle=document.getElementById("fontstyle").value;
     var fontfamily=document.getElementById("fontfamily").value;
     var fontweight=document.getElementById("fontweight").value;
     var fontcolor=document.getElementById("fontcolor").value;
     var subtitleValue=document.getElementById("subtitleValue").value;
     var str=fontstyle;
     str+=" "+"normal";
     str+=" "+fontweight;
     str+=" "+fontSize+"px";
     str+=" "+fontfamily;
     ctx.font=str;
     ctx.textBaseline = 'top';
     var isfill=document.getElementById("fontfill").value;
     subtitleX[subtitleP]=x,subtitleY[subtitleP]=y;
     if(subtitleX[subtitleP]!=subtitleX[!subtitleP]||subtitleY[subtitleP]!=subtitleY[!subtitleP]){  //如果移动了鼠标，擦除
        ctx.putImageData(curState[point],0,0);
     }
     subtitleP=!subtitleP;
     if(isfill=="yes"){
        ctx.fillStyle=fontcolor;
        ctx.fillText(subtitleValue,x,y);
     }else{
        ctx.strokeStyle=fontcolor;
        ctx.strokeText(subtitleValue,x,y);
     }
}

var tianchongbiX=new Array(),tianchongbiY=new Array();
var tianchongbiP=0;
function updateTianchongbi(x,y){
   var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
     tianchongbiX[tianchongbiP]=x,tianchongbiY[tianchongbiP]=y;
     if(tianchongbiX[tianchongbiP]!=tianchongbiX[!tianchongbiP]||tianchongbiY[tianchongbiP]!=tianchongbiY[!tianchongbiP]){  //如果移动了鼠标，擦除
        ctx.putImageData(curState[point],0,0);
     }
     tianchongbiP=!tianchongbiP;
     ctx.fillStyle="#ffffff";
     ctx.fillRect(x-9,y,20,2);
     ctx.fillRect(x,y-9,2,20);
}

var xiangpiX=new Array(),xiangpiY=new Array();
var xiangpiP=0;
function updateXiangpi(x,y){
   var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
     var imgData=ctx.getImageData(0,0,c.width,c.height); 
     var rad=document.getElementById("xpcradius").value;
     xiangpiX[xiangpiP]=x,xiangpiY[xiangpiP]=y;
     if(xiangpiX[xiangpiP]!=xiangpiX[!xiangpiP]||xiangpiY[xiangpiP]!=xiangpiY[!xiangpiP]){  //如果移动了鼠标，擦除
        if(!ispush)
        ctx.putImageData(curState[point],0,0);
        else
        {   //在两园之间创建了一个矩形区域，对该区域透明化
          var a=rad;
          var x1=xiangpiX[xiangpiP],y1=xiangpiY[xiangpiP],x2=xiangpiX[!xiangpiP],y2=xiangpiY[!xiangpiP];
          var asin = a*Math.sin(Math.atan((y2-y1)/(x2-x1)));  
            var acos = a*Math.cos(Math.atan((y2-y1)/(x2-x1)))  
            var x3 = x1+asin;  
            var y3 = y1-acos;  
            var x4 = x1-asin;  
            var y4 = y1+acos;  
            var x5 = x2+asin;  
            var y5 = y2-acos;  
            var x6 = x2-asin;  
            var y6 = y2+acos;  
          ctx.save();
          ctx.beginPath();
            ctx.moveTo(x3,y3);  
            ctx.lineTo(x5,y5);  
            ctx.lineTo(x6,y6);  
            ctx.lineTo(x4,y4);  
            ctx.closePath();  
            ctx.clip();
            ctx.clearRect(0,0,c.width,c.height);  
          ctx.restore(); 
        }
     }
     xiangpiP=!xiangpiP;
     ctx.save()  
     ctx.beginPath();
     ctx.arc(x,y,rad,0,Math.PI*2,true); //Math.PI*2是JS计算方法，是圆
     ctx.clip();
     ctx.clearRect(0,0,c.width,c.height); 
     ctx.restore();   
}

var MSKpenX=new Array(),MSKpenY=new Array();
var MSKpenP=0;
function updateMSKpen(x,y){
     var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
     var imgData=ctx.getImageData(0,0,c.width,c.height); 
     var rad=document.getElementById("penradius").value;
     xiangpiX[xiangpiP]=x,xiangpiY[xiangpiP]=y;
     if(xiangpiX[xiangpiP]!=xiangpiX[!xiangpiP]||xiangpiY[xiangpiP]!=xiangpiY[!xiangpiP]){  //如果移动了鼠标，擦除
        if(!ispush)
        ctx.putImageData(curState[point],0,0);
     }
     if(ispush){
        var len=Math.min(imgData.width,imgData.height)/40;  //马赛克格子大小
            len=Math.floor(len);
            for ( var xx = 0; xx < imgData.width; xx+=len) 
            { 
              for ( var yy = 0; yy < imgData.height; yy+=len) 
              { 
                  var averR=0,averG=0,averB=0,averA=0;
                  for(var ix=xx;ix<xx+len;ix++){
                    for(var iy=yy;iy<yy+len;iy++){
                        if(Dis(ix,iy,x,y)>=rad+30)
                          continue;
                        var idx=(ix+iy*imgData.width)*4;
                          averR+=imgData.data[idx];
                          averG+=imgData.data[idx+1];
                          averB+=imgData.data[idx+2];
                        //  averA+=imgData.data[idx+3];
                    }
                  }
                  var num=len*len;
                  averR/=num,averG/=num,averB/=num,averA/=num;
                   for(var ix=xx;ix<xx+len;ix++){
                    for(var iy=yy;iy<yy+len;iy++){
                      if(Dis(ix,iy,x,y)<rad){
                            var idx=(ix+iy*imgData.width)*4;
                          imgData.data[idx]=averR;
                              imgData.data[idx+1]=averG;
                              imgData.data[idx+2]=averB;
                      }
                      
                    }
                  }
              } 
            } 
            ctx.putImageData(imgData,0,0);
     }
     xiangpiP=!xiangpiP;
}



var caibiX=new Array(),caibiY=new Array();
var caibiP=0;
function updatecaibi(x,y){
     var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
     var imgData=ctx.getImageData(0,0,c.width,c.height); 
     var rad=document.getElementById("penradius").value;
     var color=document.getElementById("pencolor").value;
     caibiX[caibiP]=x,caibiY[caibiP]=y;
     if(caibiX[caibiP]!=caibiX[!caibiP]||caibiY[caibiP]!=caibiY[!caibiP]){  //如果移动了鼠标，擦除
        if(!ispush)
        ctx.putImageData(curState[point],0,0);
        else
        {   //在两园之间创建了一个矩形区域
            var a=rad;
            var x1=caibiX[caibiP],y1=caibiY[caibiP],x2=caibiX[!caibiP],y2=caibiY[!caibiP];
            var asin = a*Math.sin(Math.atan((y2-y1)/(x2-x1)));  
            var acos = a*Math.cos(Math.atan((y2-y1)/(x2-x1)))  
            var x3 = x1+asin;  
            var y3 = y1-acos;  
            var x4 = x1-asin;  
            var y4 = y1+acos;  
            var x5 = x2+asin;  
            var y5 = y2-acos;  
            var x6 = x2-asin;  
            var y6 = y2+acos;  
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x3,y3);  
            ctx.lineTo(x5,y5);  
            ctx.lineTo(x6,y6);  
            ctx.lineTo(x4,y4);  
            ctx.closePath();  
            ctx.fillStyle=color;
            ctx.fill();
            ctx.restore(); 
        }
     }
     caibiP=!caibiP;
     ctx.save()  
     ctx.beginPath();
     ctx.arc(x,y,rad,0,Math.PI*2,true); //Math.PI*2是JS计算方法，是圆
     ctx.fillStyle=color;
     ctx.fill();
     ctx.restore();   
}

var yinguangbiX=new Array(),yinguangbiY=new Array();
var yinguangbiP=0;
function updateyinguangbi(x,y){
     var c=document.getElementById("myCanvas");
     var ctx=c.getContext("2d");
     var imgData=ctx.getImageData(0,0,c.width,c.height); 
     var rad=document.getElementById("penradius").value;
     var color=document.getElementById("pencolor").value;
     yinguangbiX[yinguangbiP]=x,yinguangbiY[yinguangbiP]=y;
     if(yinguangbiX[yinguangbiP]!=yinguangbiX[!yinguangbiP]||yinguangbiY[yinguangbiP]!=yinguangbiY[!yinguangbiP]){  //如果移动了鼠标，擦除
        if(!ispush)
        ctx.putImageData(curState[point],0,0);
        else
        {   //在两园之间创建了一个矩形区域
            var x1=yinguangbiX[yinguangbiP],y1=yinguangbiY[yinguangbiP],x2=yinguangbiX[!yinguangbiP],y2=yinguangbiY[!yinguangbiP];
            var x3 = x1;  
            var y3 = y1-rad;  
            var x4 = x1;  
            var y4 = y1+rad*1.0; 
            var x5 = x2;  
            var y5 = y2+rad*1.0;  
            var x6 = x2;  
            var y6 = y2-rad;  
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x3,y3);  
            ctx.lineTo(x4,y4);  
            ctx.lineTo(x5,y5);  
            ctx.lineTo(x6,y6);  
            ctx.closePath();  
            ctx.fillStyle=color;
            ctx.fill();
            ctx.restore(); 
        }
     }
     yinguangbiP=!yinguangbiP;
     ctx.save()  
     ctx.fillStyle=color;
     ctx.fillRect(x-1,y-rad,2,rad*2);
     ctx.restore();   
}