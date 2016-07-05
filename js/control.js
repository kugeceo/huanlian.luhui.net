function face_change_control(){
   $("#control_button_group").show();
   $("#myCanvas").show();
   fadeOutAllButton();
}
function features_combination_control(){
   $("#control_button_group").show();
   $("#myCanvas").show();
   fadeOutAllButton();
}

function face_attribute_control(){
   $("#control_button_group").hide();
   $("#myCanvas").hide();
   show_analysedFace();
   fadeOutAllButton();
}

function photo_beautify_control(){
   $("#control_button_group").show();
   $("#myCanvas").show();
   fadeOutAllButton();
}

function fadeOutAllButton(){
	//先全取真，然后再执行一次关闭
   eyebuttonFlag=mouthbuttonFlag=nosebuttonFlag=hatbuttonFlag=SubtitleFlag=lvjingFlag=colorFlag=qudiFlag=true;
   showeyeMenu();showmouthMenu();shownoseMenu();showhatMenu();
   showSubtitle();showlvjingMenu();showcolorMenu();showqudiMenu();    
}