$(function() {
	var username=store.get('username');
	if(username.length>10){
		$("a[name='loginRealName']").attr("title",username);
		username = username.substring(0,8)+"...";
	}
	$("a[name='loginRealName']").text(username)
	InitLeftMenu();
	toWarning();
	ajaxWarningCount();
	logoShow();
	initRoleIds();
    loadDict();
	$("#leftSideMenu").niceScroll({styler:"fb",cursorcolor:"#ccc", cursorwidth: '12', cursorborderradius: '0px', background: '#424f63', spacebarenabled:false, cursorborder: '0',  zindex: '1000'});



});



function setIframeHeight(iframe) {
	var srcCont= $(iframe).attr("src");
	var contentHeight= $(window).height()-$("#titleLogo").height()-85;
	if (iframe) {
		if (typeof(iframe.contentWindow) == "undefined") { 
			   return false;
			}
			var iframeWin = iframe.contentWindow||(typeof(iframe.contentDocument.parentWindow)== "undefined"?false:iframe.contentDocument.parentWindow);
		if (iframeWin.document.body) {
			if(srcCont=="tabs-accordions.html"){
				iframe.height =CloudUtils.maxNumber( CloudUtils.maxNumber(iframeWin.document.documentElement.scrollHeight , iframeWin.document.body.scrollHeight),contentHeight);
			}else{
				iframe.height =CloudUtils.minNumber( CloudUtils.maxNumber(iframeWin.document.documentElement.scrollHeight , iframeWin.document.body.scrollHeight),contentHeight);
			}
		}
	}
};

//初始化角色列表
function initRoleIds(){
	 var jsonData = eval("(" + store.get("roleList") + ")");
	 var roleName = store.get('roleName');
	 $("#dropdownMenu1").prepend(roleName);
	$.each(jsonData, function (index, units) { 
		$("#roleType").append('<li><a changeRoleName="'+units.roleName+'" changeRoleId="'+units.roleId+'" onclick="changeRole(this)">'+units.roleName+'</a></li>');
	});
}

//切换角色
function changeRole(obj){
	 var thisObj=$(obj);  
	 var roleName=thisObj.attr("changeRoleName");
	 store.set('roleName',roleName);
	 var roleId=thisObj.attr("changeRoleId");
	 var jsondata  ='{"roleId":"'+roleId+'"}';
	store.set('roleId',roleId);
	var options = {
			url : 'user/changeRole',
			data : jsondata,
			callBackFun : function(data) {
				if(data.result==0){
						 store.remove('menuList');
	        			 store.set('menuList', JSON.stringify(data.menuList));
	        			 store.remove('representId');
	        			 store.set('representId', data.representId == null ? null : data.representId);
	        			 window.location.href="index.html";
	        	}else{
	        		bootbox.alert(data.resultNote);
	        		document.getElementById("clickImg").onclick();
	        		return false;
	        	}
			},
			errorCallback:function(data){
				bootbox.alert("error");
			}
	};
	CloudUtils.ajax(options);
}
	
//初始化左侧
function InitLeftMenu() {
	var jsonStringData = store.get("menuList");
	 jsonStringData=jsonStringData.replace(/menuName/g,'text');
	 jsonStringData=jsonStringData.replace(new RegExp("subMenuList","gm"),"nodes");
	 var jsonData=eval('('+ jsonStringData +')');
	$('#leftMenuList').treeview({
		data : jsonData,
		levels: 0,
		backColor: '#364150',
		onhoverColor:'#2c3542',
		selectedBackColor:'#2A323F',
		selectedColor:'#2582e3'
	});
	$('#leftMenuList').on('nodeSelected', function(event, data) {
		menuNames = [];
		$('#m_menuPath').val(data.menuPath);
		menuNames.push(data.text);
		getParentNodeName(data.nodeId);
		if(!CloudUtils.isEmpty(data.menuPath)){
		
			$("[name='mainFrame']").attr("src",data.menuPath);
			$("[name='mainFrame']").attr("menuPathNames",JSON.stringify(menuNames.reverse()));
		}
	})
    }
var menuNames = [];
function getParentNodeName(nodeId){
	var parentNode = $('#leftMenuList').treeview('getParent', nodeId);
	if(parentNode.menuLevel!=undefined){
		menuNames.push(parentNode.text)
		getParentNodeName(parentNode.nodeId);
	}
}

function logOut(){
	var roleId = store.get('roleId');
	var data ='{"roleId":"'+roleId+'"}';
	var options = {
			url:"login/logout",
			data:data,
			callBackFun : function(data) {
				if(data.result==0){
					store.clear();
					window.location.href="login.html";
	        	}
			},
			errorCallback:function(data){
				alert("error");
			}
	};
	CloudUtils.ajax(options);
}

/*
 * logo显示
 * by-JH
 */
function logoShow(){
	 var corpId = store.get('corpId');
	 if(corpId==null||corpId=='null'){
		 $("#logo").attr("src", "images/logo4.png");
		 return;
     }
	 var param = {    
             corpId: corpId,
             isLogo: "Y"
         };  
	var options = {
			url:"corp/list",
			data:JSON.stringify(param),
			callBackFun : function(data) {
				if(data.result==0){
					if(data.dataList.length == 0||data.dataList[0].logoUrl==null||data.dataList[0].logoUrl==""){
						$("#logo").attr("src", "images/logo4.png");
					}else{
						$("#logo").attr("src", data.dataList[0].logoUrl);
					}
					
	        	}
			}/*,
			errorCallback:function(data){
				alert("error");
			}*/
	};
	CloudUtils.ajax(options);
}

//tital预警
function toWarning(){
	$("#warnLogo").click(function(){
		$('#mainFrame',top.document).attr('src','sysManager/warningManager/warningManager.html');
	});
}
//tital预警条数
function ajaxWarningCount(){
	var options = {
			url : 'warning/count',
			data : "{}",
			callBackFun : function(data) {
					$("#warnCountTital").html(data);
			}
	};
	CloudUtils.ajax(options);
}

function loadDict(){
    var options = {
        url: 'dict/loadAll',
        data: '{}',
        callBackFun: function(data) {
            if (data.result == 0) {
                store.set('dictList', data.listMap);
            } else {
                bootbox.alert(data.resultNote);
                return false;
            }
        }
    };
    CloudUtils.ajax(options);
}