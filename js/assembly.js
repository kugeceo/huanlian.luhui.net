var eyebuttonFlag=false;    //隐藏/显示按钮
function  showeyeMenu(){
	  eyebuttonFlag=!eyebuttonFlag;
	  for(var i=1;i<30;i++){
		var eyestr="#eyebutton";
        eyestr+=i;
		if(eyebuttonFlag)
        $(eyestr).fadeIn(300);
		else
        $(eyestr).fadeOut(150);
	  }  
}

var mouthbuttonFlag=false;
function  showmouthMenu(){
	  mouthbuttonFlag=!mouthbuttonFlag;
	  for(var i=1;i<30;i++){
		var mouthstr="#mouthbutton";
        mouthstr+=i;
		if(mouthbuttonFlag)
        $(mouthstr).fadeIn(300);
		else
        $(mouthstr).fadeOut(150);
	  }  
}
var nosebuttonFlag=false;
function  shownoseMenu(){
	  nosebuttonFlag=!nosebuttonFlag;
	  for(var i=1;i<30;i++){
		var nosestr="#nosebutton";
        nosestr+=i;
		if(nosebuttonFlag)
        $(nosestr).fadeIn(300);
		else
        $(nosestr).fadeOut(150);
	  }  
}

function guodu(){   //每次操作的过度效果
	$("#fCanvas").show();
}

function guoduover(){   //结束过度效果  任何操作可能结束的最后位置都要加
	 setTimeout("$('#fCanvas').hide();",200);
}

/*
var imgData,curXPoint;
function drawplay() {
	    var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
		var W=c.width,H=c.height;
        context2D.save(); //保存画笔状态
        context2D.clearRect(0, 0, W, H);
        curXPoint++;
        ctx.putImageData(imgData,curXPoint,0);
        context2D.restore(); //绘制结束以后，恢复画笔状态
}

function guodu(){
	    var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
		var W=c.width,H=c.height;
		curXPoint=0;
	    imgData=ctx.getImageData(0,0,W,H);
        var begin=setInterval(drawplay(imgData), 100);
		setTimeout(clearInterval(begin),2000);

}*/