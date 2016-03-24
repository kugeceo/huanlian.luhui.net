var eyebuttonFlag=false;
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

   
