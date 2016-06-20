var analysedFace;
var analysedcanvasW=240,analysedcanvasH=240;
var analysedImage=new Array();
function get_analysedFace(){    // 预先提取人脸图片

	var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    for(var i=0;i<facenum;i++){
      	 analysedImage[i]=ctx.getImageData(facecenterX[i]-analysedcanvasW/2,facecenterY[i]-analysedcanvasH/2,analysedcanvasW,analysedcanvasH);
    }
}
function show_analysedFace(){  //显示待分析的脸
		  var c=document.getElementById("face_attribute_canvas");
		  var ctx=c.getContext("2d");
		  if(facenum<=0){
             ctx.clearRect(0,0,analysedcanvasW,analysedcanvasH);
		  	 return ;
		  }
		  ctx.putImageData(analysedImage[analysedFace],0,0);
		  ctx.fillStyle="white";     //标上十字标记
        //  ctx.fillRect(analysedcanvasW/2-2000,analysedcanvasH/2,5000,1);
		//  ctx.fillRect(analysedcanvasW/2,analysedcanvasH/2-2000,1,5000);
		  ctx.fillRect(analysedcanvasW/2-facewidth[analysedFace]/2,analysedcanvasH/2-faceheight[analysedFace]/2,facewidth[analysedFace],1);
		  ctx.fillRect(analysedcanvasW/2-facewidth[analysedFace]/2,analysedcanvasH/2-faceheight[analysedFace]/2,1,faceheight[analysedFace]);
		  ctx.fillRect(analysedcanvasW/2-facewidth[analysedFace]/2,analysedcanvasH/2+faceheight[analysedFace]/2,facewidth[analysedFace],1);
		  ctx.fillRect(analysedcanvasW/2+facewidth[analysedFace]/2,analysedcanvasH/2-faceheight[analysedFace]/2,1,faceheight[analysedFace]);
}

function change_analysedFace(){   //切换待分析的脸
	analysedFace=(analysedFace+1)%facenum;
	show_analysedFace();
}


function begin_analysedFace(){
	if(facenum<=0){
		alert("未发现脸部，请更换图片~");
		return ;
	}
    guodu();
    $('#face_attribute_text').fadeIn();
    document.getElementById("appearance_text").innerHTML="颜值："+get_appearance()+"分&nbsp&nbsp&nbsp&nbsp(满分为10分)";
    document.getElementById("age_text").innerHTML="年龄："+Math.max(0,Math.ceil(age_value[analysedFace]-age_range[analysedFace]/2.5))+" ~ "+Math.ceil(age_value[analysedFace]+age_range[analysedFace]/2.5);
    document.getElementById("gender_text").innerHTML="性别："+gender_value[analysedFace]+"&nbsp&nbsp&nbsp&nbsp(置信度："+gender_confidence[analysedFace]+")";
    document.getElementById("glass_text").innerHTML="戴眼镜："+glass_value[analysedFace]+"&nbsp&nbsp&nbsp&nbsp(置信度："+glass_confidence[analysedFace]+")";
    document.getElementById("race_text").innerHTML="人种："+race_value[analysedFace]+"&nbsp&nbsp&nbsp&nbsp(置信度："+race_confidence[analysedFace]+")";
    document.getElementById("smiling_text").innerHTML="表情："+smiling_value[analysedFace];
    document.getElementById("character_text").innerHTML="性格分析："+get_character();
    guoduover();
}

function get_appearance(){
	var sum=3.5;
	var aver=0;
	var c=document.getElementById("face_attribute_canvas");
    var ctx=c.getContext("2d");
	var imgData=ctx.getImageData(analysedcanvasW/2-facewidth[analysedFace]/2,analysedcanvasH/2-faceheight[analysedFace]/2,facewidth[analysedFace],faceheight[analysedFace]);
    for (var i=0;i<imgData.data.length;i++)
    {
     aver+=imgData.data[i];
    }
    aver/=imgData.data.length;
    if(aver<50)sum+=0.1;
    else if(aver<90)sum+=0.2;
    else if(aver<120)sum+=0.4;
    else if(aver<150)sum+=0.5;
    else if(aver<180)sum+=0.8;
    else if(aver<220)sum+=1.0;
    else sum+=1.4;
    var N=imgData.data.length/4;
    sum+=(N%7)*0.1;
    if(race_value[analysedFace]=='亚洲脸')
    	sum+=0.6;
    else if(race_value[analysedFace]=='白种人脸')
    	sum+=1.1;
    else 
    	sum+=0.1;
    if(Math.abs(lefteyeY[analysedFace]-righteyeY[analysedFace])<5)
    	sum+=0.3;
    else
    	sum+=0.1;
    if(Math.abs(leftmouthY[analysedFace]-rightmouthY[analysedFace])<5)
    	sum+=0.4;
    else
    	sum+=0.1;
    
    if(smiling_value[analysedFace]=="微笑")
    	sum+=1.2;
    else if(smiling_value[analysedFace]=="憨笑"||smiling_value[analysedFace]=="大笑")
    	sum+=0.9;
    else
    	sum+=0.6;
    if(age_value[analysedFace]<14)
    	sum+=1.3;
    else if(age_value[analysedFace]<25)
    	sum+=1.8;
    else if(age_value[analysedFace]<40)
    	sum+=1.2;
    else
    	sum+=0.8;
    if(gender_value[analysedFace]=='女')sum+=0.4;
    if(sum>10)sum=10;
    sum*=10;
    sum=Math.ceil(sum);
    sum/=10;
    return sum;
}

function get_character(){
	
    var tab_man=new Array();
    var tab_child=new Array();
    var tab_man_num=46,tab_child_num=11;
    tab_man[0]="思想成熟、精明能干、为人诚实。";
    tab_man[1]="有极强的系统管理能力。";
    tab_man[2]="能够独立工作、思想成熟、应变能力强。";
    tab_man[3]="个性稳重、具高度责任感。";
    tab_man[4]="能够在不同文化和工作人员的背景下出色地工作。";
    tab_man[5]="年轻、聪明、精力充沛，并有很强的事业心。";
    tab_man[6]="举止优雅、个人性格好。";
    tab_man[7]="有良好的管理艺术和组织能力。";
    tab_man[8]="思想活跃、有首创和革新精神尤佳。";
    tab_man[9]="善于同各种人员打交道。";
    tab_man[10]="富正义感、积极、果断的理想追求者。";
    tab_man[11]="非常外放、大方，倾向刚勇而富野心、活跃而且重视精神层面，对任何事情都充满了兴趣。";
    tab_man[12]="做事不拘小节、好动、喜欢群居生活。";
    tab_man[13]="大方、明朗，全身充满活力。不管跟什么人，你都能很快的和他打成一片。";
    tab_man[14]="你不但好学、知识丰富，还很会发挥你优秀的头脑。";
    tab_man[15]="温和、顺从是你最明显的个性。";
    tab_man[16]="你很勤奋，肯脚踏实地的努力。";
    tab_man[17]="你信念强、能够对抗虚伪和欺诈，持有高洁的信念。";
    tab_man[18]="你重感情、做人踏实、对自己也蛮有自信的哦！";
    tab_man[19]="你善于说服别人，还是个很好的倾听者。";
    tab_man[20]="你善于临机应变，富于机智，笔墨和言辞兼备。";
    tab_man[21]="你不但想像力丰富，而且有很强的理解力。";
    tab_man[22]="你坦白、大方、正直、忠于朋友。";
    tab_man[23]="你十分善于理财、也很会存钱。";
    tab_man[24]="你有着崇高的理想，为人慷慨、有恻隐心、具幽默感，所以会吸引很多人。";
    tab_man[25]="你生来就具有艺术家的特质。";
    tab_man[26]="你对色彩感觉丰富、有音乐欣赏力。";
    tab_man[27]="你做事认真、很守信用，不过有时也会任性、情绪不稳定。";
    tab_man[28]="你重视秩序，对于善恶、正邪，有锐利的批判力。";
    tab_man[29]="你精力充沛、兴趣广泛、喜欢活动。";
    tab_man[30]="虽然偶尔会任性一点，不过通常你冷静而崇尚调和，对任何事都不会狂热。";
    tab_man[31]="你是个热情而乐天、不喜欢欺骗、而且很专心的人。";
    tab_man[32]="你超有耐性的。平常给人的感觉是慎重、沉默寡言，可是事实上是怎么样的闷骚你自己知道吧？！";
    tab_man[33]="你自尊心、适应力强，遇到困难时，会有条有理地处理。";
    tab_man[34]="诚实、可信赖、头脑好是你的优点。你会带给人快乐！";
    tab_man[35]="虽然你会插手管无聊的事，不过还好啦，你会反省，找出自己该做的事，然后成为了不起的人物。";
    tab_man[36]="你不喜欢出风头，而且很现实。";
    tab_man[37]="你喜欢清纯的爱，即使是小小的幸福，也会使你感到很大的喜悦。";
    tab_man[38]="你非常朴素、爱干净。";
    tab_man[39]="你爱自由和善变，但是你的梦想无限大。";
    tab_man[40]="你不但有很多好朋友，而且也搏得年长者得疼爱。";
    tab_man[41]="你谦逊、有同情心、又有耐心。对心理、哲理方面有敏锐观察力。";
    tab_man[42]="你常常会感到束手无策而拙于应付，但是你有一个非常丰富的内心世界。 ";
    tab_man[43]="你天生便能全然接受一切现状和其他人的本来面目，而且你不会想去改变别人。";
    tab_man[44]="你是个温柔的人，即使碰见了讨厌的人，也会对他微笑。";
    tab_man[45]="你将自己内心最深处的感受潜藏于心，但是若能遇上志同道合的朋友，你也会对朋友倾诉自己的感受。";

    tab_child[0]="性格、情绪很不稳定，处理事情易情绪化。";
    tab_child[1]="能很好地与人相处。";
    tab_child[2]="喜爱与小同伴交往，在集体中能愉快地生活。";
    tab_child[3]="对人有同情心和友好行为。";
    tab_child[4]="有自尊心和一定的自信心。";
    tab_child[5]="对批评、指责感到羞愧，希望做受人欢迎的事，不愿意被责骂。";
    tab_child[6]="诚实而不说谎，肯承认错误，做错事不隐瞒";
    tab_child[7]="求知欲强，思维敏锐，接受新事物快，富于想象。";
    tab_child[8]="明事理，诚实，勤动脑，勤劳";
    tab_child[9]="乐于助人，开朗、活泼。";
    tab_child[10]="善于交往，能与人和睦相处。";
    if(age_value[analysedFace]<7){
        return "你是个天真活泼的小朋友，啥都不懂";
    }
    else if(age_value[analysedFace]<18){
    	return tab_child[Math.ceil(facewidth[analysedFace])*Math.ceil(faceheight[analysedFace])*17%tab_child_num];
    }else{
        return tab_man[Math.ceil(facewidth[analysedFace])*Math.ceil(faceheight[analysedFace])*17%tab_man_num]
    }
}
//颜值(appearance_text)： 公式计算 (0~10分)
//年龄(age_text)： age_value (包含了age_range：可能范围)
//性别(gender_text)： gender_value(包含了gender_confidence: 置信度)
//是否带眼镜(glass_text)： glass_value(包含了glass_confidence：置信度)
//种族(race_text)： race_value(包含了race_confidence：置信度)
//微笑指数(smiling_text)： smiling_value(0~100,值越大笑的越开心)
//抬头角度(pitch_angle_text)： pitch_angle (角度)
//测试老之后的样子：  添加皱纹层
//颜值分析：您的颜值超越了全国80%的人，是一个不折不扣的男屌丝~。。。。。。