//cookie:  username: ""(未登录) "xxxxxx"(该用户登录)


function Setcookie (name, value){ 
    //设置名称为name,值为value的Cookie
    var expdate = new Date();   //初始化时间
    expdate.setTime(expdate.getTime() + 20 * 60 * 1000 );   //时间
    document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path=/";
   //即document.cookie= name+"="+value+";path=/";   时间可以不要，但路径(path)必须要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！~
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
  return ""
}

function clearRegisterInfo(){
	    document.getElementById("exampleInputUsername1").value="";
        document.getElementById("exampleInputPassword1").value="";
        document.getElementById("exampleInputEmail1").value="";
        document.getElementById("register_info").innerHTML=""
}

function register(){
	var username=document.getElementById("exampleInputUsername1").value;
	var password=document.getElementById("exampleInputPassword1").value;
	var email=document.getElementById("exampleInputEmail1").value;
	if(username.length>14||username.length<4){
		document.getElementById("register_info").innerHTML="<p class='text-warning'>用户名长度在4~14之间！</p>"
		return ;
	}
	if(password.length>18||password.length<6){
		document.getElementById("register_info").innerHTML="<p class='text-warning'>密码长度在6~18之间！</p>"
		return ;
	}
    var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
    if (!pattern.test(email)) {  
        document.getElementById("register_info").innerHTML="<p class='text-warning'>请输入正确的邮箱格式！</p>" 
        return false;  
    }  
	var Account_table = Bmob.Object.extend("account_table");
    var account_table = new Account_table();
    account_table.set("username", username);
    account_table.set("password",password);
    account_table.set("email",email);
    document.getElementById("register_info").innerHTML="<p class='text-primary'>注册中...</p>"
    //添加数据，第一个入口参数是null
    account_table.save(null, {
      success: function(account_table) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        //alert('添加数据成功，返回的objectId是：' + account_table.id);
        document.getElementById("register_info").innerHTML="<p class='text-success'>恭喜，注册成功~</p>"
        document.getElementById("exampleInputUsername1").value="";
        document.getElementById("exampleInputPassword1").value="";
        document.getElementById("exampleInputEmail1").value="";
        setTimeout("$('#register').modal('hide');",1000);
        Setcookie("username",username);
        document.getElementById("loginState").innerHTML="<span class='glyphicon glyphicon-user' aria-hidden='true'></span> 您好，尊敬的"+getCookie("username")+"<span class='caret'></span>";
            $("#loginbutton").hide();
            $("#registerbutton").hide();
            $("#myphotobutton").show();
            $("#cancelloginbutton").show();
      },
      error: function(account_table, error) {
        // 添加失败
        document.getElementById("register_info").innerHTML="<p class='text-danger'>该用户名已存在！</p>"
      }
    });
}
function clearLoginInfo(){
        document.getElementById("login_info").innerHTML=""
}

function login(){
    var username=document.getElementById("exampleInputUsername2").value;
	var password=document.getElementById("exampleInputPassword2").value;
	document.getElementById("register_info").innerHTML="<p class='text-primary'>登录中...</p>"
	var Account_table = Bmob.Object.extend("account_table");
    var query = new Bmob.Query(Account_table);
    query.equalTo("username", username);
    // 查询所有数据
    query.find({
      success: function(results) {
       // alert("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        /*
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          alert(object.id + ' - ' + object.get('playerName'));
        }*/      
        if(results.length==0){
        	document.getElementById("login_info").innerHTML="<p class='text-danger'>该用户名不存在！</p>";
        	return ;
        }
        var object=results[0];  
        if(object.get("password")!=password){
            document.getElementById("login_info").innerHTML="<p class='text-danger'>密码错误！</p>";
        	return ;
        }else{
        	Setcookie("username",username);
        	document.getElementById("loginState").innerHTML="<span class='glyphicon glyphicon-user' aria-hidden='true'></span> 您好，尊敬的"+getCookie("username")+"<span class='caret'></span>";
            $("#loginbutton").hide();
            $("#registerbutton").hide();
            $("#myphotobutton").show();
            $("#cancelloginbutton").show();
            showPhotoList();
            document.getElementById("login_info").innerHTML="<p class='text-success'>登录成功~</p>";
            setTimeout("$('#login').modal('hide');",1000);
        }
      },
      error: function(error) {
         document.getElementById("login_info").innerHTML="<p class='text-danger'>该用户名不存在！</p>";
      }
    });
}

function cancellogin(){
	Setcookie("username","");
	document.getElementById("loginState").innerHTML="<span class='glyphicon glyphicon-user' aria-hidden='true'></span> 用户登录 <span class='caret'></span>";
	$("#loginbutton").show();
    $("#registerbutton").show();
    $("#myphotobutton").hide();
    $("#cancelloginbutton").hide();
}