var isEdit = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).isEdit; 
var roleId = store.get('roleId');
$(function() {
	
	 CloudUtils.getMenuNames("nav");
	 detailFun();
	 initcontractInfoTable();
	 initinvoiceInfoTable();
	 initquaInfoTable();
	 initacceptInfoTable();
	 initnoObjectionInfoTable();

    ajaxPICUpload();
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
	    	var invoiceData =$('invoiceInfoTable').bootstrapTable('getData');
	    	var quaData =$('#quaInfoTable').bootstrapTable('getData');
	    	var acceptData =$('#acceptInfoTable').bootstrapTable('getData');
            var noObjectionData =$('#noObjectionInfoTable').bootstrapTable('getData');

	    	//$('#shareHolderInfoTable').bootstrapTable('removeByUniqueId', index);
	    	if($(e.target).data('type')==="shareInfo"){
	    		var values = [];sa
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
		}else if ($(e.target).data('type')==="accept"){
    		acceptData.length - 1;
    		var values = [];
	    	values.push(row.acceptfileName);
	    	$("#acceptInfoTable").bootstrapTable('remove', {field: 'acceptfileName', values: values});
    	}else if ($(e.target).data('type')==="invoice"){
    		invoiceData.length - 1;
    		var values = [];
	    	values.push(row.invoicefileName);
	    	$('#invoiceInfoTable').bootstrapTable('remove', {field: 'invoicefileName', values: values});
    	}else if ($(e.target).data('type')==="qua"){
    		contractData.length - 1;
    		var values = [];
	    	values.push(row.quafileName);
	    	$('#quaInfoTable').bootstrapTable('remove', {field: 'quafileName', values: values});
	    	
    	  }else if ($(e.target).data('type')==="noObjection"){
                noObjectionData.length - 1;
                var values = [];
                values.push(row.noObjectionfileName);
                $('#noObjectionInfoTable').bootstrapTable('remove', {field: 'noObjectionfileName', values: values});

            }
    	},
	  
	    
	    'click .yulan': function (e, value, row, index) {
	    	window.open("../../.." + row.fileUrl);//预览pdf的js方法
	    }
,
	  
	    
	    'click .previewInvoice': function (e, value, row, index) {
	    	window.open("../../.." + row.invoicefileUrl);//预览pdf的js方法
	    },
	  
	    
	    'click .previewQua': function (e, value, row, index) {
	    	window.open("../../.." + row.quafileUrl);//预览pdf的js方法
	    },
	  
	    
	    'click .previewAccept': function (e, value, row, index) {
	    	window.open("../../.." + row.acceptfileUrl);//预览pdf的js方法
	    }
     ,


     'click .previewnoObjection': function (e, value, row, index) {
         window.open("../../.." + row.noObjectionfileUrl);//预览pdf的js方法
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
	 }else if(type==4){
	 	$("#invoiceModal").modal();
	 }
     else if(type==5){
         $("#quaModal").modal();
     }else if(type==6){
         $("#acceptModal").modal();
     }
     else if(type==7){
         $("#noObjectionModal").modal();
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
			 
			 // data.contractid=CloudUtils.getUUID(32, 63);
			 // data.contractName = data.contractName;
			 /* data.contractNum = data.contractNum ==""?0:data.contractNum;
			  data.contractType = data.contractType ==""?0:data.contractType;
			  data.endDate = data.endDate ==""?0:data.endDate;
			  data.uploadFileName = data.uploadFileName ==""?0:data.uploadFileName;*/
			  //console.log(data);
//					 先只在页面显示，不录入数据库
			 $("#contractInfoTable").bootstrapTable('append', data);
			$("#contractInfoModal").modal("hide");
	 }
	 if(type==4){//发票

         var data = CloudUtils.convertStringJson('invoiceForm');
         data = eval("(" + data + ")");
         data.contractid=CloudUtils.getUUID(32, 63);
         data.contractName = data.contractName ;
         data.contractNum = data.contractNum ==""?0:data.contractNum;
         data.contractType = data.contractType ==""?0:data.contractType;
         data.endDate = data.endDate ==""?0:data.endDate;
         data.uploadFileName = data.uploadFileName ==""?0:data.uploadFileName;
//					 先只在页面显示，不录入数据库
         $("#invoiceInfoTable").bootstrapTable('append', data);
         $("#invoiceModal").modal("hide");

	 }
     if(type==5){//资质

         var data = CloudUtils.convertStringJson('quaForm');
         data = eval("(" + data + ")");

         data.contractid=CloudUtils.getUUID(32, 63);
//					 先只在页面显示，不录入数据库
         $("#quaInfoTable").bootstrapTable('append', data);
         $("#quaModal").modal("hide");

     }
     if(type==6){//三方

         var data = CloudUtils.convertStringJson('acceptForm');
         data = eval("(" + data + ")");

         data.contractid=CloudUtils.getUUID(32, 63);
//					 先只在页面显示，不录入数据库
         $("#acceptInfoTable").bootstrapTable('append', data);
         $("#acceptModal").modal("hide");

     }
     if(type==7){//无异议

         var data = CloudUtils.convertStringJson('noObjectionForm');
         data = eval("(" + data + ")");

         data.contractid=CloudUtils.getUUID(32, 63);
//					 先只在页面显示，不录入数据库
         $("#noObjectionInfoTable").bootstrapTable('append', data);
         $("#noObjectionModal").modal("hide");

     }
 }
 
 
 function subCorpInfo(){

	 var data = CloudUtils.convertStringJson('projectForm');
	 var jsonData = eval("(" + data + ")");
     var contractData = $('#contractInfoTable').bootstrapTable('getData');
 	var invoiceData =$('#invoiceInfoTable').bootstrapTable('getData');
	var quaData =$('#quaInfoTable').bootstrapTable('getData');
	var acceptData =$('#acceptInfoTable').bootstrapTable('getData');
     var noObjectionData =$('#noObjectionInfoTable').bootstrapTable('getData');
     jsonData.contractInfoList = contractData;

     jsonData.invoiceInfoList =invoiceData;
     jsonData.quaInfoList =quaData;
     jsonData.acceptInfoList =acceptData;
     jsonData.noObjectionInfoList =noObjectionData;
     console.log(JSON.stringify(jsonData))
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
	
	$('#invoicefile').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#invoicefileName").val(data.fileName);
	            	$("#invoicefileUrl").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#invoicefile').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type !=".pdf"){
			bootbox.alert("仅支持上传pdf类型");
			return false;
		}
	});
	
	$('#quafile').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#quafileName").val(data.fileName);
	            	$("#quafileUrl").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#quafile').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type !=".pdf"){
			bootbox.alert("仅支持上传pdf类型");
			return false;
		}
	});
	
	$('#acceptfile').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#acceptfileName").val(data.fileName);
	            	$("#acceptfileUrl").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#acceptfile').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type !=".pdf"){
			bootbox.alert("仅支持上传pdf类型");
			return false;
		}
	});
	
	$('#noObjectionfile').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#noObjectionfileName").val(data.fileName);
	            	$("#noObjectionfileUrl").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#noObjectionfile').bind('fileuploadadd', function (e, data) {
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


//照片上传逻辑
function ajaxPICUpload(){

    $('#legalID1').bind('fileuploadadd', function (e, data) {
        var obj = data.files[0];
        var name = obj.name;
        var type = name.substr(name.lastIndexOf(".")).toLowerCase();
        if(type ==".jpg" || type == ".png"){
        }else{
            bootbox.alert("仅支持上传png、jpg类型的图片");
            return false;
        }
    });

    $('#legalID2').bind('fileuploadadd', function (e, data) {
        var obj = data.files[0];
        var name = obj.name;
        var type = name.substr(name.lastIndexOf(".")).toLowerCase();
        if(type ==".jpg" || type == ".png"){
        }else{
            bootbox.alert("仅支持上传png、jpg类型的图片");
            return false;
        }
    });

    $('#authID1').bind('fileuploadadd', function (e, data) {
        var obj = data.files[0];
        var name = obj.name;
        var type = name.substr(name.lastIndexOf(".")).toLowerCase();
        if(type ==".jpg" || type == ".png"){
        }else{
            bootbox.alert("仅支持上传png、jpg类型的图片");
            return false;
        }
    });


    $('#authID2').bind('fileuploadadd', function (e, data) {
        var obj = data.files[0];
        var name = obj.name;
        var type = name.substr(name.lastIndexOf(".")).toLowerCase();
        if(type ==".jpg" || type == ".png"){
        }else{
            bootbox.alert("仅支持上传png、jpg类型的图片");
            return false;
        }
    });





    $('#leg1').fileupload({
        url:"../../file/uploadFile?pathId=3",
        dataType: 'json',
        // 上传完成后的执行逻辑
        done: function(e, data) {
            data = data.result;
            if(data.result==0){
                $("#legalID1").attr("src",data.fileUrl);
                $("#legalID1").val(data.fileUrl);
            } else {
                bootbox.alert(data.resultNote);
            }

        }
    });
    $('#leg2').fileupload({
        url:"../../file/uploadFile?pathId=3",
        dataType: 'json',
        // 上传完成后的执行逻辑
        done: function(e, data) {
            data = data.result;
            if(data.result==0){
                $("#legalID2").attr("src",data.fileUrl);
                $("#legalID2").val(data.fileUrl);
            } else {
                bootbox.alert(data.resultNote);
            }

        }
    });

    $('#auth1').fileupload({
        url:"../../file/uploadFile?pathId=3",
        dataType: 'json',
        // 上传完成后的执行逻辑
        done: function(e, data) {
            data = data.result;
            if(data.result==0){
                $("#authID1").attr("src",data.fileUrl);
                $("#authID1").val(data.fileUrl);
            } else {
                bootbox.alert(data.resultNote);
            }

        }
    });
    $('#auth2').fileupload({
        url:"../../file/uploadFile?pathId=3",
        dataType: 'json',
        // 上传完成后的执行逻辑
        done: function(e, data) {
            data = data.result;
            if(data.result==0){
                $("#authID2").attr("src",data.fileUrl);
                $("#authID2").val(data.fileUrl);
            } else {
                bootbox.alert(data.resultNote);
            }

        }
    });




}

function showImg(val) {
    var imgSrc;
    if(val == 8) {
        imgSrc = $("#legalID1").val();
    }
    if(val == 9) {
        imgSrc = $("#legalID2").val();
    }
    if(val == 10) {
        imgSrc = $("#authID1").val();
    }
    if(val == 11) {
        imgSrc = $("#authID2").val();
    }


    CloudUtils.getTab("../../supplierManager/imageShow.html", "imgPreviewDiv");
    $("#img").attr('src',imgSrc);
    $("#imgPreviewShow").modal("show");


}

//初始化发票信息
function initinvoiceInfoTable(){
    $('#invoiceInfoTable').bootstrapTable('destroy');
    $("#invoiceInfoTable").bootstrapTable({
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
                title: '发票编号',
                align: 'center',
                valign: 'middle',
                visible:false
            },{
                field: 'contractName',
                title: '银行账号',
                align: 'center',
                valign: 'middle',
            },{
                field: 'contractNum',
                title: '发票金额',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'invoicefileName',
                title: '合同pdf名称',
                align: 'center',
                valign: 'middle',
                visible:false
            },{
                field: 'invoicefileUrl',
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
                    var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="invoice" href="javascript:void(0)"></a>';
                    var m = '<a class = "glyphicon glyphicon-file previewInvoice" style="color:#278bdd;padding:0px 5px;" title="预览" data-type="invoice" href="javascript:void(0)"></a>';
                    return  r+"  "+m;
                },
                events: 'operateEvents'
            }
        ]
    });
}



function initquaInfoTable(){
    $('#quaInfoTable').bootstrapTable('destroy');
    $("#quaInfoTable").bootstrapTable({
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
                title: '发票编号',
                align: 'center',
                valign: 'middle',
                visible:false
            },{
                field: 'contractName',
                title: '银行账号',
                align: 'center',
                valign: 'middle',
                visible:false
            },{
                field: 'contractNum',
                title: '发票金额',
                align: 'center',
                valign: 'middle',
                visible:false
            }, {
                field: 'quafileName',
                title: '文件pdf名称',
                align: 'center',
                valign: 'middle'
            },{
                field: 'quafileUrl',
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
                    var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="qua" href="javascript:void(0)"></a>';
                    var m = '<a class = "glyphicon glyphicon-file previewQua" style="color:#278bdd;padding:0px 5px;" title="预览" data-type="qua" href="javascript:void(0)"></a>';
                    return  r+"  "+m;
                },
                events: 'operateEvents'
            }
        ]
    });
}


function initacceptInfoTable(){
    $('#acceptInfoTable').bootstrapTable('destroy');
    $("#acceptInfoTable").bootstrapTable({
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
                title: '发票编号',
                align: 'center',
                valign: 'middle',
                visible:false
            },{
                field: 'contractName',
                title: '银行账号',
                align: 'center',
                valign: 'middle',
                visible:false
            },{
                field: 'contractNum',
                title: '发票金额',
                align: 'center',
                valign: 'middle',
                visible:false
            }, {
                field: 'acceptfileName',
                title: '文件名称',
                align: 'center',
                valign: 'middle',
            },{
                field: 'acceptfileUrl',
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
                    var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="accept" href="javascript:void(0)"></a>';
                    var m = '<a class = "glyphicon glyphicon-file previewAccept" style="color:#278bdd;padding:0px 5px;" title="预览" data-type="accept" href="javascript:void(0)"></a>';
                    return  r+"  "+m;
                },
                events: 'operateEvents'
            }
        ]
    });
}


function initnoObjectionInfoTable(){
    $('#noObjectionInfoTable').bootstrapTable('destroy');
    $("#noObjectionInfoTable").bootstrapTable({
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
                title: '发票编号',
                align: 'center',
                valign: 'middle',
                visible:false
            },{
                field: 'contractName',
                title: '银行账号',
                align: 'center',
                valign: 'middle',
                visible:false
            },{
                field: 'contractNum',
                title: '发票金额',
                align: 'center',
                valign: 'middle',
                visible:false
            }, {
                field: 'noObjectionfileName',
                title: '文件名称',
                align: 'center',
                valign: 'middle',
            },{
                field: 'noObjectionfileUrl',
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
                    var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="noObjection" href="javascript:void(0)"></a>';
                    var m = '<a class = "glyphicon glyphicon-file previewnoObjection" style="color:#278bdd;padding:0px 5px;" title="预览" data-type="noObjection" href="javascript:void(0)"></a>';
                    return  r+"  "+m;
                },
                events: 'operateEvents'
            }
        ]
    });
}




