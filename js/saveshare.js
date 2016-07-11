function saveCanvas(strType) {
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
	}

//只需要该函数即可，上面的代码废了
function saveAsLocalImage () {  
       var myCanvas = document.getElementById("myCanvas");  
       // here is the most important part because if you dont replace you will get a DOM 18 exception.  
       // var image = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream;Content-Disposition: attachment;filename=foobar.png");  
       var image = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");   
       window.location.href=image; // it will save locally 
}  