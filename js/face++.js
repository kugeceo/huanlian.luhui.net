 


function  getFaceInfo(urlstr){
	
	  var api = new FacePP('abc3b4dd8808310720f3a521311f0bf0', 'vyvK77UjUxGdksdyojX0cWgGmM64PaLq');
 api.request('detection/detect', {
      url:urlstr
  }, function(err, result) {
     if (err) {
      // TODO handle error
	         return;  
 }
        // TODO use result
      document.getElementById('response').innerHTML = JSON.stringify(result, null, 2);
  });
}

