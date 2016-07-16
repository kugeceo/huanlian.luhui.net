/*function saveCanvas(strType) {
	    var oCanvas=document.getElementById("myCanvas");
		var bRes = false;
		if (strType == "PNG")
			bRes = Canvas2Image.saveAsPNG(oCanvas);
		if (strType == "BMP")
			bRes = Canvas2Image.saveAsBMP(oCanvas);
		if (strType == "JPEG")
			bRes = Canvas2Image.saveAsJPEG(oCanvas);

		if (!bRes) {
			alert("Sorry, this browser is not capable of saving " + strType + " files!");
			return false;
		}
	}*/

//只需要该函数即可，上面的代码废了
var _fixType = function(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
};
var saveFile = function(data, filename){
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
};
function saveAsLocalImage () {  
       var type = 'png';
       var imgData = myCanvas.toDataURL(type);  
       imgData = imgData.replace(_fixType(type),'image/octet-stream');
       // 下载后的文件名
       var filename = document.getElementById("filename").value + '.' + type;
       // download
       saveFile(imgData,filename);
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function saveCanvasToBmob() {
	var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");	
    var imgData=ctx.getImageData(0,0,c.width,c.height); 
    var Canvas_table = Bmob.Object.extend("Canvas_table");
    var canvas_table = new Canvas_table();
    canvas_table.set("username", getCookie("username"));
    var dataurl = c.toDataURL('image/png');
    canvas_table.set("dataurl",dataurl);
    canvas_table.set("filename",document.getElementById("filename").value+'.png');
    //添加数据，第一个入口参数是null
    canvas_table.save(null, {
      success: function(canvas_table) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        document.getElementById("savestate").innerHTML="<p class='text-success'>图片成功保存至云端~</p>"
        showPhotoList();
      },
      error: function(gameScore, error) {
        // 添加失败
         document.getElementById("savestate").innerHTML="<p class='text-danger'>保存失败，请检查网络环境</p>"
      }
    });
}

function showPhotoList(){
	$("#waitphotolist").show();
	var Canvas_table = Bmob.Object.extend("Canvas_table");
    var query = new Bmob.Query(Canvas_table);
    query.equalTo("username", getCookie("username"));
    query.find({
      success: function(results) {
       // alert("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        /*
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          alert(object.id + ' - ' + object.get('playerName'));
        }*/
        var photolist="<table class='table table-bordered'>";  
        photolist+="<tr class='info'><th>缩略图</th><th>文件名</th><th>上传日期</th><th>操作</th></tr>" 
        for(var i=results.length-1;i>=0;i--){
        	   var object=results[i];
        	   curFilename[i]=object.get("filename");curURL[i]=object.get("dataurl");
        	   curKEY[i]=object.id;
               photolist+="<tr><td><img src='"+object.get('dataurl')+"' style='width:50px;height:40px'></td><td>"+object.get("filename")+"</td><td>"+object.createdAt+" </td><td><div style='width:120px'><button class='btn btn-success' onClick='savephotoByURL("+i+")'>下载</button>&nbsp&nbsp&nbsp<button class='btn btn-danger' onClick='deletephoto("+i+")' >删除</button></div></td></tr>";
        }
        photolist+="</table>"
        document.getElementById("showPhotoList").innerHTML=photolist;
        $("#waitphotolist").hide();
      },
      error: function(error) {
        alert("查询失败: " + error.code + " " + error.message);
      }
    });
}

var curURL=new Array(),curFilename=new Array();
var curKEY=new Array();
function savephotoByURL(i){
       var imgData = curURL[i];  
       var type='png';
       imgData = imgData.replace(_fixType(type),'image/octet-stream');
       // download
       saveFile(imgData,curFilename[i]);
}

function deletephoto(i){
    var Canvas_table = Bmob.Object.extend("Canvas_table");
    var query = new Bmob.Query(Canvas_table);
    query.equalTo("objectId", curKEY[i]);
    query.destroyAll({
      success: function() {
         showPhotoList();
      },
      error: function(error) {
      }
    });
}

function clearsavestate(){
	 document.getElementById("savestate").innerHTML= "";
}