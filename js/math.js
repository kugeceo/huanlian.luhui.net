function Dis(x1,y1,x2,y2){
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function Dot(x1,y1,x2,y2,x3,y3){
	var ax=x1-x3,ay=y1-y3,bx=x2-x3,by=y2-y3;
    return ax*bx+ay*by;
}
function Length(x1,y1,x2,y2){
	return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}
function Angle(x1,y1,x2,y2,x3,y3){
	var ax=x1-x3,ay=y1-y3,bx=x2-x3,by=y2-y3;
    return Math.acos(Dot(x1,y1,x2,y2,x3,y3)/Length(x1,y1,x3,y3)/Length(x2,y2,x3,y3));
}

