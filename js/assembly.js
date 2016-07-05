var eyebuttonFlag=false;    //隐藏/显示按钮
function  showeyeMenu(){
	  eyebuttonFlag=!eyebuttonFlag;
	  for(var i=1;i<30;i++){
		var eyestr="#eyebutton";
        eyestr+=i;
        var mouthstr="#mouthbutton";
        mouthstr+=i;
        var nosestr="#nosebutton";
        nosestr+=i;
        var hatstr="#hatbutton";
        hatstr+=i;
		if(eyebuttonFlag){
           $(eyestr).fadeIn(300);
           $(mouthstr).fadeOut(0);
           $(nosestr).fadeOut(0);
           $(hatstr).fadeOut(0);
            $(addSubtitle).fadeOut(0);
           mouthbuttonFlag=nosebuttonFlag=hatbuttonFlag=SubtitleFlag=false;
		}
		else
        $(eyestr).fadeOut(150);
	  }  
}

var mouthbuttonFlag=false;
function  showmouthMenu(){
	  mouthbuttonFlag=!mouthbuttonFlag;
	  for(var i=1;i<30;i++){
		var eyestr="#eyebutton";
        eyestr+=i;
        var mouthstr="#mouthbutton";
        mouthstr+=i;
        var nosestr="#nosebutton";
        nosestr+=i;
        var hatstr="#hatbutton";
        hatstr+=i;
		if(mouthbuttonFlag){
            $(eyestr).fadeOut(0);
            $(mouthstr).fadeIn(300);
			$(nosestr).fadeOut(0);
            $(hatstr).fadeOut(0);
            $(addSubtitle).fadeOut(0);
            eyebuttonFlag=nosebuttonFlag=hatbuttonFlag=SubtitleFlag=false;
		}
		else
        $(mouthstr).fadeOut(150);
	  }  
}
var nosebuttonFlag=false;
function  shownoseMenu(){
	  nosebuttonFlag=!nosebuttonFlag;
	  for(var i=1;i<30;i++){
		var eyestr="#eyebutton";
        eyestr+=i;
        var mouthstr="#mouthbutton";
        mouthstr+=i;
        var nosestr="#nosebutton";
        nosestr+=i;
        var hatstr="#hatbutton";
        hatstr+=i;
		if(nosebuttonFlag){
            $(eyestr).fadeOut(0);
            $(mouthstr).fadeOut(0);
			$(nosestr).fadeIn(300);
            $(hatstr).fadeOut(0);
            $(addSubtitle).fadeOut(0);
            eyebuttonFlag=mouthbuttonFlag=hatbuttonFlag=SubtitleFlag=false;
		}
		else
        $(nosestr).fadeOut(150);
	  }  
}

var hatbuttonFlag=false;
function  showhatMenu(){
	  hatbuttonFlag=!hatbuttonFlag;
	  for(var i=1;i<30;i++){
		var eyestr="#eyebutton";
        eyestr+=i;
        var mouthstr="#mouthbutton";
        mouthstr+=i;
        var nosestr="#nosebutton";
        nosestr+=i;
        var hatstr="#hatbutton";
        hatstr+=i;
		if(hatbuttonFlag){
            $(eyestr).fadeOut(0);
            $(mouthstr).fadeOut(0);
			$(nosestr).fadeOut(0);
            $(hatstr).fadeIn(300);
            $(addSubtitle).fadeOut(0);
            eyebuttonFlag=nosebuttonFlag=mouthbuttonFlag=SubtitleFlag=false;
		}
		else
        $(hatstr).fadeOut(150);
	  }  
}

var SubtitleFlag=false;
function  showSubtitle(){
      SubtitleFlag=!SubtitleFlag;
      var c=document.getElementById("myCanvas");
      var ctx=c.getContext("2d");
      for(var i=1;i<30;i++){
        var eyestr="#eyebutton";
        eyestr+=i;
        var mouthstr="#mouthbutton";
        mouthstr+=i;
        var nosestr="#nosebutton";
        nosestr+=i;
        var hatstr="#hatbutton";
        hatstr+=i;
        if(SubtitleFlag){
            $(eyestr).fadeOut(0);
            $(mouthstr).fadeOut(0);
            $(nosestr).fadeOut(0);
            $(hatstr).fadeOut(0);
            eyebuttonFlag=nosebuttonFlag=nosebuttonFlag=hatbuttonFlag=false;
        }
      }  
      if(SubtitleFlag)
        $(addSubtitle).fadeIn(300);
      else
        $(addSubtitle).fadeOut(150);
}



//////////////////////////////////////////////////////////////////////////

var lvjingFlag=false;
function  showlvjingMenu(){
	  lvjingFlag=!lvjingFlag;
	  for(var i=1;i<30;i++){
		var lvjingstr="#lvjingbutton";
        lvjingstr+=i;
        var colorstr="#colorbutton";
        colorstr+=i;
		if(lvjingFlag){
            $(lvjingstr).fadeIn(300);
            $(colorstr).fadeOut(0);
            colorFlag=qudiFlag=false;
		}
		else
        $(lvjingstr).fadeOut(150);
	  }  
}

var colorFlag=false;
function  showcolorMenu(){
	  colorFlag=!colorFlag;
	  for(var i=1;i<30;i++){
	  	var lvjingstr="#lvjingbutton";
        lvjingstr+=i;
		var colorstr="#colorbutton";
        colorstr+=i;
		if(colorFlag){
			$(lvjingstr).fadeOut(0);
            $(colorstr).fadeIn(300);
            lvjingFlag=qudiFlag=false;
		}
		else
        $(colorstr).fadeOut(150);
	  }  
}

var qudiFlag=false;
function showqudiMenu(){
    
}

//////////////////////////////////////////////////////////////////////////

function guodu(){   //每次操作的过度效果
	$("#fCanvas").show();
}

function guoduover(){   //结束过度效果  任何操作可能结束的最后位置都要加
	 setTimeout("$('#fCanvas').hide();",300);
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