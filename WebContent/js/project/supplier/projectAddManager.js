var isEdit = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).isEdit; 
var roleId = store.get('roleId');
$(function() {
	
	 CloudUtils.getMenuNames("nav");
	 detailFun();
	 initcontractInfoTable();

	 
	 ajaxFileUpload();

	 numFormat();
	 $('#shareInfoModal').on('hidden.bs.modal', function() {
			$("#shareInfoForm").bootstrapValidator('resetForm', true);
			$("#shareInfoForm")[0].reset();
		});
	 getFormInfo();
 });
 
 var shareIndex =0;
 var shareDetailRow = null;
 window.operateEvents = {
		'click .detail': function (e, value, row, index) {
			 detailFun(row);
			 initShareHolderInfoTable(row.corpId);
			 attachInfoTable(row.corpId);
	    },
	    'click .modify': function (e, value, row, index) {
	    	if($(e.target).data('type')==="shareInfo"){
	    		//修改
	    		modShareFun(row);
	    		shareDetailRow = row;//吧数据存进全局变量里
	    		shareIndex = index;
	    	}
	    },
	    'click .remove':function (e, value, row, index) {
	    	var attachData = $('#attachInfoTable').bootstrapTable('getData');
	    	var contractData = $('#contractInfoTable').bootstrapTable('getData');
	    	//$('#shareHolderInfoTable').bootstrapTable('removeByUniqueId', index);
	    	if($(e.target).data('type')==="shareInfo"){
	    		var values = [];
		    	values.push(row.shareHolderId);
		    	$('#shareHolderInfoTable').bootstrapTable('remove', {field: 'shareHolderId', values: values});
	    	}else if ($(e.target).data('type')==="attach"){
	    		attachData.length - 1;
	    		var values = [];
		    	values.push(row.fileUrl);
		    	$('#attachInfoTable').bootstrapTable('remove', {field: 'fileUrl', values: values});
	    	}else if ($(e.target).data('type')==="contract"){
	    		contractData.length - 1;
	    		var values = [];
		    	values.push(row.contractid);
		    	$('#contractInfoTable').bootstrapTable('remove', {field: 'contractid', values: values});
	    	}
		},
	    'click .yulan': function (e, value, row, index) {
	    	window.open("../../.." + row.fileUrl);//预览pdf的js方法
	    }
 };
 
 function subFileNum() {
    var num = Number($("#fileNum").val());
    $("#fileNum").val(num - 1);
}
 
 function modShareFun(row){
    $("#addshareInfoModalLabel").text("修改");
	$('#shareInfoModal').modal();
	CloudUtils.setForm(row,'shareInfoForm');
 }
 
 var orginData = null;//存储原先数据
 function initDetailForm(corpId){
	 var data = {
			 sysType: 4,  
			 corpId:corpId,
			 roleId:roleId
	 };
	 var options = {
				url : '../../supplierInfo/list',
				data: JSON.stringify(data),
				callBackFun : function(data) {
					if (data.result == 0) {				
						CloudUtils.setForm(data.dataList[0],'detailForm');						
						$("#corpNameTitle").text(data.dataList[0].corpName);						
					} else {
						return false;
					}
				},
				errorCallback : function(data) {
					bootbox.alert(data.resultNote);
					return false;
				}
			};
 	 CloudUtils.ajax(options);
 }
 function addFun(type){
	 //type  1. 新增股东 2. 新增合同信息 3.新增附件
	 if(type === 1){
		 $("#addshareInfoModalLabel").text("添加");
		 $("#shareInfoModal").modal();
	 }else if(type==2){
		 $("#contractInfoModal").modal(); 
	 }else if(type==3){
		 $("#fjModal").modal(); 
	 }
 }
 //取消
 function cancel(){
	 $('#mainFrame',top.document).attr('src','supplierManager/AgencyManager/agencyManager.html');
 }


 function saveFun(type){//0.基础数据1股东2.合同信息
	if(type === 0){//整个基础数据
		subCorpInfo();
		 
	}
	 if(type ===2 ){//合同

			  var data = CloudUtils.convertStringJson('contractForm');
			  data = eval("(" + data + ")");
			
			  data.contractid=CloudUtils.getUUID(32, 63);
			  data.contractName = data.contractName ==""?0:data.contractName;
			  data.contractNum = data.contractNum ==""?0:data.contractNum;
			  data.contractType = data.contractType ==""?0:data.contractType;
			  data.endDate = data.endDate ==""?0:data.endDate;
			  data.uploadFileName = data.uploadFileName ==""?0:data.uploadFileName;
//					 先只在页面显示，不录入数据库
			 $("#contractInfoTable").bootstrapTable('append', data);
			$("#contractInfoModal").modal("hide");
	 }
 }
 
 function subCorpInfo(){

	 var data = CloudUtils.convertStringJson('projectForm');
	 console.log(data);
	 var jsonData = eval("(" + data + ")");
     var contractData = $('#contractInfoTable').bootstrapTable('getData');
     jsonData.contractInfoList = contractData;
     jsonData.corpId=store.get('corpId');
     

	 var options = {
				url : '../../supplierProject/startProcess',
				data : JSON.stringify(jsonData),
				callBackFun : function(data) {
				
				    if (data.result == 0) {
	                    bootbox.alert(data.resultNote, function() {
	                        window.location.href = 'projectManager.html';
	                    });
	                } else {
	                    bootbox.alert(data.resultNote);
	                    return false;
	                }
				},
				errorCallback : function(data) {
					bootbox.alert(data.resultNote);
					return false;
				}
			};
	 CloudUtils.ajax(options);
	
 
 }
 

 
 
//初始化合同信息表
 function initcontractInfoTable(){
	 $('#contractInfoTable').bootstrapTable('destroy'); 
		$("#contractInfoTable").bootstrapTable({  
	         method: "post", 
	         /*url: "../contractinfo/list", */
	         //striped: true,  //表格显示条纹  
	         //pagination: true, //启动分页  
	         //pageSize: 5,  //每页显示的记录数  
	         //pageNumber:1, //当前第几页  
	        // pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
	         search: false,  //是否启用查询  
	         showColumns: false,  //显示下拉框勾选要显示的列  
	         showRefresh: false,  //显示刷新按钮  
	         sidePagination: "client", //表示服务端请求  
	         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
	         //设置为limit可以获取limit, offset, search, sort, order  
	         queryParamsType : "undefined",   
	         queryParams: function queryParams(params) {}, 
	         responseHandler:function responseHandler(res) {
	        	 if (res.result==0) {
		        	 return {
		        		 "rows": res.dataList,
		        		 "total": res.records
		        	 };

	        	 } else {
	        		 bootbox.alert(res.resultNote);
	        		 return {
				        	 "rows": [],
				        	 "total": 0
				        	 };
	        	 }
	         },
	         columns: [
	            {
		 	        field: 'contractid',
		 	        title: '合同id',
		 	        align: 'center',
		            valign: 'middle',
		            visible:false
		 	    },{
		 	        field: 'contractName',
		 	        title: '合同名称',
		 	        align: 'center',
		            valign: 'middle',
		 	    },{
		 	        field: 'contractNum',
		 	        title: '合同编号',
		 	        align: 'center',
		 	        valign: 'middle'
		 	    }, {
		 	        field: 'fileName',
		 	        title: '合同pdf名称',
		 	        align: 'center',
		            valign: 'middle',
		            visible:false
		 	    },{
		 	        field: 'fileUrl',
		 	        title: '合同地址',
		 	        align: 'center',
		            valign: 'middle',
		            visible:false
		 	    }, {
		 	        field: 'operation',
		 	        title: '操作',
		 	        align: 'center',
		            valign: 'middle',
		 	        formatter:function(value,row,index){
		 	        	var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="contract" href="javascript:void(0)"></a>';
		 	        	var m = '<a class = "glyphicon glyphicon-file yulan" style="color:#278bdd;padding:0px 5px;" title="预览" data-type="contract" href="javascript:void(0)"></a>';
		 	            return  r+"  "+m;
		 	        },
		 	        events: 'operateEvents'
		 	    }
	 	    ]
       });  
 }
 
 function getFormInfo() {

    var corpId = store.get('corpId'); //从缓存中获取数据

    console.log(corpId);
    

	initDetailForm(corpId);
	initcontractInfoTable(corpId);

        
   

}
 
 function detailFun() {
	    $('#detailForm input').attr('readonly', true);
	   
	}
 
 
 
// 添加附件信息
function attachInfoTable(corpId){
	 $('#attachInfoTable').bootstrapTable('destroy'); 
		$("#attachInfoTable").bootstrapTable({  
	         method: "post", 
	         url: "../uploadFile/list", 
	         search: false,  //是否启用查询  
	         showColumns: false,  //显示下拉框勾选要显示的列  
	         showRefresh: false,  //显示刷新按钮  
	         sidePagination: "server", //表示服务端请求  
	         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
	         //设置为limit可以获取limit, offset, search, sort, order  
	         queryParamsType : "undefined",   
	         queryParams: function queryParams(params) {   //设置查询参数  
	             var param = {    
	                 pageNumber: params.pageNumber,    
	                 pageSize: params.pageSize
	             }; 
	             if(corpId){
					 param.corpId = corpId            	 
	             } 
	             return JSON.stringify(param);                   
	           }, 
	         responseHandler:function responseHandler(res) {
	        	 if (res.result==0) {
		        	 return {
		        		 "rows": res.dataList,
		        		 "total": res.records
		        	 };

	        	 } else {
	        		 bootbox.alert(res.resultNote);
	        		 return {
				        	 "rows": [],
				        	 "total": 0
				        	 };
	        	 }
	         },
	         columns: [{
	 	        field: 'fileUrl',
	 	        title: '附件地址',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
		 	},{
	 	        field: 'uploadType',
	 	        title: '附件格式',
	 	        align: 'center',
	            valign: 'middle'
	 	    },{
	 	        field: 'fileName',
	 	        title: '附件名称',
	 	        align: 'center',
	             valign: 'middle',
	             formatter:function(value,row,index){
					 var s = '<a target="view_window" href="/../..'+row.fileUrl+'" download="'+value+'">'+value+'</a>';
			         return s;
		           
		        }
	 	    }, {
	 	        field: 'attachType',
	 	        title: '附件格式',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'attachSize',
	 	        title: '附件大小(KB)',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	 	        formatter:function(value,row,index){
	 	        	var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="attach" href="javascript:void(0)"></a>';
	 	        	var m = '<a class = "glyphicon glyphicon-file yulan" style="color:#d864fd;padding:0px 5px;" title="预览" data-type="attach" href="javascript:void(0)"></a>';
	 	            return r+"  "+m;
	 	        },
	 	        events: 'operateEvents'
	 	    }
	 	    ]
	       });  
}

//修改唯一性判断
 function editUniqueCust(data){
//	获取原来的corpName和orgnNum
	 if(orginData.corpName==data.corpName){
		 data.corpName = null;
	 }
	 if(orginData.orgnNum ==data.orgnNum){
		 data.orgnNum = null;
	 }
	 return data;
}
 
function numFormat(){
 	$("#regCap").number(true, 2);
 	$("#shareProportion").number(true, 2);
 	$("#registeredCapital").number(true, 2);
 	$("#registeredCapitalProportion").number(true, 2);
 	$("#maxLscreditAmount").number(true, 2);
 	$("#maxCreditAmount").number(true, 2);
 }


function ajaxFileUpload(){
	
	$('#contractfile').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#fileName").val(data.fileName);
	            	$("#fileUrl").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#contractfile').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type !=".pdf"){
			bootbox.alert("仅支持上传pdf类型");
			return false;
		}
	});
}

var fileTypes = [".doc", ".xls", ".xlsx", ".docx", ".pdf", ".png", ".jpg"];

function checkFileType(type) {
    var result = $.inArray(type, fileTypes);
    if (result == -1) {
        return false;
    }
    return true;
}

function checkFileSize(fileSize) {
    fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
    fileSize = Math.round(fileSize / 1024);
    if (fileSize > 50) {
        return false;
    }
    return true;
}


