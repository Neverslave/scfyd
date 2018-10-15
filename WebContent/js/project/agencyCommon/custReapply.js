$(function() {
    setForm();
    formValidator();
    shareFormValidator();
    propertychange();
    numFormat();
    $('#shareInfoModal').on('hidden.bs.modal', function() {
        $("#shareInfoForm").bootstrapValidator('resetForm', true);
        $("#shareInfoForm")[0].reset();
    });
    $('#detailModal').on('hidden.bs.modal', function() {
        $("#detailForm").bootstrapValidator('resetForm', true);
    });
    ajaxFileUpload();
});

function setForm() {
	var data = {};
	data.taskId = taskId;
	 var options = {
		url : '../../activiti/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				loadAreas();
			    changeArea(jsonData.area);
				CloudUtils.setForm(jsonData,"detailForm");
				if(jsonData.companyPicturePath1!=null && jsonData.companyPicturePath1!=''){
					$("#Path1").attr("src",jsonData.companyPicturePath1);
				
				}
				if(jsonData.companyPicturePath2!=null && jsonData.companyPicturePath2!=''){
					$("#Path2").attr("src",jsonData.companyPicturePath2);
				
				}
				if(jsonData.companyPicturePath3!=null && jsonData.companyPicturePath3!=''){
					$("#Path3").attr("src",jsonData.companyPicturePath3);
				
				}
				if(jsonData.companyPicturePath4!=null && jsonData.companyPicturePath4!=''){
					$("#Path4").attr("src",jsonData.companyPicturePath4);
		
				}
				if(jsonData.companyPicturePath5!=null && jsonData.companyPicturePath5!=''){
					$("#Path5").attr("src",jsonData.companyPicturePath5);
			
				}
				if(jsonData.companyPicturePath6!=null && jsonData.companyPicturePath6!=''){
					$("#Path6").attr("src",jsonData.companyPicturePath6);
				
				}
				if(jsonData.businessLicensePath!=null && jsonData.businessLicensePath!=''){
					$("#businessLicensePath2").attr("src",jsonData.businessLicensePath);
					
				}
				if(jsonData.permissionAccountPath!=null && jsonData.permissionAccountPath!=''){
					$("#permissionAccountPath2").attr("src",jsonData.permissionAccountPath);
					
				}
				if(jsonData.legalIdNumberPath1!=null && jsonData.legalIdNumberPath1!=''){
					$("#legalIdNumberPath11").attr("src",jsonData.legalIdNumberPath1);
					
				}
				if(jsonData.legalIdNumberPath2!=null && jsonData.legalIdNumberPath2!=''){
					$("#legalIdNumberPath22").attr("src",jsonData.legalIdNumberPath2);
					
				}
                $(".required").hide();
                custManageReapply.initShareHolderTable(jsonData.shareInfoList);
                custManageReapply.attachInfoTable(jsonData.attachInfoList);
                custManageReapply.contractInfoTable(jsonData.contractInfoList);
                $("#corpNameTitle").text(jsonData.corpName);
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

var custManageReapply = new Object({　　　　
    initShareHolderTable: function(data) {　　　　　　
        $('#shareHolderInfoTable').bootstrapTable('destroy');
        $("#shareHolderInfoTable").bootstrapTable({
            method: "post",
            data: data,
            striped: false, //表格显示条纹  
            search: false, //是否启用查询  
            showColumns: false, //显示下拉框勾选要显示的列  
            showRefresh: false, //显示刷新按钮  
            sidePagination: "server", //表示服务端请求  
            //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
            //设置为limit可以获取limit, offset, search, sort, order  
            queryParamsType: "undefined",
            responseHandler: function responseHandler(res) {
                if (res.result == 0) {
                    return {
                        "rows": res.dataList,
                        "total": res.records
                    };

                } else {
                    alert(res.resultNote);
                    return {
                        "rows": [],
                        "total": 0
                    };
                }
            },
            columns: [{
                field: 'shareHolderId',
                title: '股东Id',
                align: 'center',
                valign: 'middle',
                visible: false
            }, {
                field: 'shareName',
                title: '股东名称',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'shareProportion',
                title: '持股比例(%)',
                align: 'center',
                valign: 'middle',
                formatter: function(value) {
                    return $.number(value, 2);
                }
            }, {
                field: 'registeredCapital',
                title: '注册资本份额',
                align: 'center',
                valign: 'middle',
                formatter: function(value) {
                    return $.number(value, 2);
                }
            }, {
                field: 'registeredCapitalProportion',
                title: '注册资本占比(%)',
                align: 'center',
                valign: 'middle',
                formatter: function(value) {
                    return $.number(value, 2);
                }
            }, {
                field: 'operation',
                title: '操作',
                align: 'center',
                valign: 'middle',
                formatter: function(value, row, index) {
                    var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="shareInfo" href="javascript:void(0)"></a>';
                    var m = '<a class = "fa fa-edit modify" style="color:#278bdd;padding:0px 5px;" title="编辑" data-type="shareInfo" href="javascript:void(0)"></a>';
                    return m + ' ' + r;
                },
                events: 'operateEvents'
            }]
        });　　　　
    },
    　　　　attachInfoTable: function(data) {
        $('#attachInfoTable').bootstrapTable('destroy');
        $("#attachInfoTable").bootstrapTable({
            method: "post",
            data: data,
            striped: false, //表格显示条纹  
            search: false, //是否启用查询  
            showColumns: false, //显示下拉框勾选要显示的列  
            showRefresh: false, //显示刷新按钮  
            sidePagination: "server", //表示服务端请求  
            //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
            //设置为limit可以获取limit, offset, search, sort, order  
            queryParamsType: "undefined",
            responseHandler: function responseHandler(res) {
                if (res.result == 0) {
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
            }, {
                field: 'fileName',
                title: '附件名称',
                align: 'center',
                valign: 'middle',
                formatter: function(value, row, index) {
                    var s = '<a target="view_window" href="/../..' + row.fileUrl + '">' + value + '</a>';
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
                formatter: function(value, row, index) {
                    var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="attach" href="javascript:void(0)"></a>';
                    return r;
                },
                events: 'operateEvents'
            }]
        });　　　　
    }　　,
    contractInfoTable: function(data) {
        $('#contractInfoTable').bootstrapTable('destroy');
        $("#contractInfoTable").bootstrapTable({
            method: "post",
            data: data,
            striped: false, //表格显示条纹  
            search: false, //是否启用查询  
            showColumns: false, //显示下拉框勾选要显示的列  
            showRefresh: false, //显示刷新按钮  
            sidePagination: "server", //表示服务端请求  
            //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
            //设置为limit可以获取limit, offset, search, sort, order  
            queryParamsType: "undefined",
            responseHandler: function responseHandler(res) {
                if (res.result == 0) {
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
  		 	        field: 'contractType',
  		 	        title: '业务类型',
  		 	        align: 'center',
  		             valign: 'middle',
  		 	    }, {
  		 	        field: 'endDate',
  		 	        title: '合同到期日',
  		 	        align: 'center',
  		             valign: 'middle',
  		 	    },{
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
});
var shareIndex = 0;
var shareDetailRow = null;
window.operateEvents = {

    'click .modify': function(e, value, row, index) {
        if ($(e.target).data('type') === "shareInfo") {
            //修改
            modShareFun(row, 2);
            shareIndex = index;
            shareDetailRow = row; //吧数据存进全局变量里
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
    	window.open(row.fileUrl);//预览pdf的js方法
    }
};

function modShareFun(row, isEdit) {
    $("#addshareInfoModalLabel").text("修改");
    $('#shareInfoModal').modal();
    CloudUtils.setForm(row, 'shareInfoForm');
    //
    $('#isEdit2').val(isEdit); //新增1;修改2
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

function saveFun(type) {//0.基础数据1股东2.合同信息
	 if(type ===1 ){//股东
		 $('#shareInfoForm').data('bootstrapValidator').validate();
		 if(!$('#shareInfoForm').data('bootstrapValidator').isValid()){  
			    //没有通过校验 
			 return false;
		 }
			  var data = CloudUtils.convertStringJson('shareInfoForm');
			  data = eval("(" + data + ")");
			 
			  data.shareHolderId=CloudUtils.getUUID(32, 63);
			  data.shareProportion = data.shareProportion ==""?0:data.shareProportion;
			  data.registeredCapital = data.registeredCapital ==""?0:data.registeredCapital;
			  data.registeredCapitalProportion = data.registeredCapitalProportion ==""?0:data.registeredCapitalProportion;
//					 先只在页面显示，不录入数据库
			 $("#shareHolderInfoTable").bootstrapTable('append', data);
			$("#shareInfoModal").modal("hide");
	 }
	 if(type ===2 ){//合同
//		 $('#contractForm').data('bootstrapValidator').validate();
//		 if(!$('#contractForm').data('bootstrapValidator').isValid()){  
//			    //没有通过校验 
//			 return false;
//		 }
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

function ajaxFileUpload() {
    $('#file').fileupload({
        url: "../../file/uploadFile?pathId=3",
        dataType: 'json',
        // 上传完成后的执行逻辑
        done: function(e, data) {
            data = data.result;
            if (data.result == 0) {
                var relData = {};
                relData.fileName = data.fileName;
                relData.attachSize = data.fileSize;
                relData.fileUrl = data.fileUrl;
                relData.attachType = data.fileType;
                $("#attachInfoTable").bootstrapTable("append", relData);
            } else {
            	bootbox.alert(data.resultNote);
            }

        }
    });
    $('#file').bind('fileuploadadd', function(e, data) {
        var obj = data.files[0];
        var name = obj.name;
        var size = obj.size;
        var attachData = $('#attachInfoTable').bootstrapTable('getData');
        if (attachData.length > 9) {
            bootbox.alert("上传的附件数不能超过10个");
            return false;
        }
        var type = name.substr(name.lastIndexOf(".")).toLowerCase();
        if (!checkFileType(type)) {
            bootbox.alert("仅支持上传word、excel、pdf、png、jpg类型的文件");
            return false;
        }

        if (!checkFileSize(size)) {
            bootbox.alert("上传文件不超过50M");
            return false;
        }

    });
    $('#cp1').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#Path1").attr("src",data.fileUrl);
	            	$("#companyPicturePath1").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#cp1').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type ==".jpg" || type == ".png"){
		}else{
			bootbox.alert("仅支持上传png、jpg类型的图片");
			return false;
		}
	});
	
	$('#cp2').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#Path2").attr("src",data.fileUrl);
	            	$("#companyPicturePath2").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#cp2').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type ==".jpg" || type == ".png"){
		}else{
			bootbox.alert("仅支持上传png、jpg类型的图片");
			return false;
		}
	});
	
	$('#cp3').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#Path3").attr("src",data.fileUrl);
	            	$("#companyPicturePath3").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#cp3').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type ==".jpg" || type == ".png"){
		}else{
			bootbox.alert("仅支持上传png、jpg类型的图片");
			return false;
		}
	});
	
	$('#cp4').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#Path4").attr("src",data.fileUrl);
	            	$("#companyPicturePath4").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#cp4').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type ==".jpg" || type == ".png"){
		}else{
			bootbox.alert("仅支持上传png、jpg类型的图片");
			return false;
		}
	});
	
	$('#cp5').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#Path5").attr("src",data.fileUrl);
	            	$("#companyPicturePath5").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#cp5').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type ==".jpg" || type == ".png"){
		}else{
			bootbox.alert("仅支持上传png、jpg类型的图片");
			return false;
		}
	});
	
	$('#cp6').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#Path6").attr("src",data.fileUrl);
	            	$("#companyPicturePath6").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#cp6').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type ==".jpg" || type == ".png"){
		}else{
			bootbox.alert("仅支持上传png、jpg类型的图片");
			return false;
		}
	});
	
	$('#bl').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#businessLicensePath2").attr("src",data.fileUrl);
	            	$("#businessLicensePath").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#bl').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type ==".jpg" || type == ".png"){
		}else{
			bootbox.alert("仅支持上传png、jpg类型的图片");
			return false;
		}
	});
	
	$('#pa').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#permissionAccountPath2").attr("src",data.fileUrl);
	            	$("#permissionAccountPath").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#pa').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type ==".jpg" || type == ".png"){
		}else{
			bootbox.alert("仅支持上传png、jpg类型的图片");
			return false;
		}
	});
	
	$('#lin1').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#legalIdNumberPath11").attr("src",data.fileUrl);
	            	$("#legalIdNumberPath1").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#lin1').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type ==".jpg" || type == ".png"){
		}else{
			bootbox.alert("仅支持上传png、jpg类型的图片");
			return false;
		}
	});
	
	$('#lin2').fileupload({
		  url:"../../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#legalIdNumberPath22").attr("src",data.fileUrl);
	            	$("#legalIdNumberPath2").val(data.fileUrl);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#lin2').bind('fileuploadadd', function (e, data) {
		var obj = data.files[0];
		var name = obj.name;
		var type = name.substr(name.lastIndexOf(".")).toLowerCase();
		if(type ==".jpg" || type == ".png"){
		}else{
			bootbox.alert("仅支持上传png、jpg类型的图片");
			return false;
		}
	});
	
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
			bootbox.alert("仅支持上传pdf类型的图片");
			return false;
		}
	});
}

//再申请
function reapply() {
    $('#detailForm').data('bootstrapValidator').validate();
    if (!$('#detailForm').data('bootstrapValidator').isValid()) {
        //没有通过校验 
        return false;
    } else {
        var data = CloudUtils.convertAllJson('detailForm');
        data = eval("(" + data + ")");
        data.regCap = data.regCap == "" ? 0 : data.regCap;
        data.maxLscreditAmount = data.maxLscreditAmount == "" ? 0 : data.maxLscreditAmount;
        data.maxCreditAmount = data.maxCreditAmount == "" ? 0 : data.maxCreditAmount;
        data.taskId = taskId;
        var allTableData = $('#shareHolderInfoTable').bootstrapTable('getData');
        var attachData = $('#attachInfoTable').bootstrapTable('getData');
        var contractData = $('#contractInfoTable').bootstrapTable('getData');
        data.shareInfoList = allTableData;
        data.attachInfoList = attachData;
        data.contractInfoList = contractData;
        var options = {
            url: '../../supplierInfo/reApply',
            data: JSON.stringify(data),
            callBackFun: function(data) {
                if (data.result == 0) {
                    bootbox.alert(data.resultNote, function() {
                        window.location.href = '../../project/agencyTask/agencyTask.html';
                    });
                } else {
                    bootbox.alert(data.resultNote);
                }
            },
            errorCallback: function(data) {
                bootbox.alert(data.resultNote);
                return false;
            }
        };
        CloudUtils.ajax(options);
    }
}

/************dyk地域开始*****************/
function loadAreas() {
    var options = {
        url: '../../represent/areas',
        data: '{}',
        callBackFun: function(data) {
            $.each(data.dataList, function(index, units) {
                $("#area").append("<option value=" + units.areaId + ">" + units.areaName + "</option>");
            });
        }
    };
    CloudUtils.ajax(options);
}

function changeArea(area) {
    var data = { areaId: area };
    data = JSON.stringify(data)
    var options = {
        url: '../../represent/represents',
        data: data,
        callBackFun: function(data) {
            $("#represent").html("");
            $.each(data.dataList, function(index, units) {
                $("#represent").append("<option value=" + units.representId + ">" + units.representName + "</option>");
            });
        }
    };
    CloudUtils.ajax(options);
}

function shareFormValidator() {
    $('#shareInfoForm').bootstrapValidator({
            message: 'This value is not valid',
            excluded: ':disabled',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                shareName: {
                    validators: {
                        notEmpty: {
                            message: '股东名称不能为空'
                        },
                        stringLength: {
                            max: 16,
                            message: '股东名称不能超过16'
                        },
                    }
                },
                shareProportion: {
                    validators: {
                        notEmpty: {
                            message: '股东持股比例不能为空'
                        },
                        numeric: { message: '只能输入数字' },
                        callback: {
                            message: '比例在0~100之间',
                            callback: function(value, validator) {
                                var shareProportionSum = parseFloat(getShareSum("shareProportion"));
                                return value == "" || (parseFloat(value) >= 0 && (parseFloat(value) + shareProportionSum) <= 100);
                            }
                        }
                    }
                },
                corpType: {
                    validators: {
                        notEmpty: {
                            message: '企业类型不能为空'
                        },
                    }
                },
                registeredCapital: {
                    validators: {
                        regexp: {
                            regexp: /^([0-9])+(\.[0-9]+)?$/,
                            message: '注册资本份额>0'
                        },
                        callback: {
                            message: '注册资本份额不得超过注册资本',
                            callback: function(value, validator) {
                          
                            	return true;
                            }
                        }
                    }
                },
                registeredCapitalProportion: {
                    validators: {
                        notEmpty: {
                            message: '注册资本占比不能为空'
                        },
                        numeric: { message: '只能输入数字' },
                        callback: {
                            message: '比例在0~100之间',
                            callback: function(value, validator) {
                                var registeredCapitalProportionSum = parseFloat(getShareSum("registeredCapitalProportion"));
                                return value == "" || (parseFloat(value) >= 0 && (parseFloat(value) + registeredCapitalProportionSum) <=100);
                            }
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
            //saveFun(1);
            //$(e.target).bootstrapValidator('resetForm', true);
            //$('#btn_save').attr('disabled',false);
        });
}

function formValidator() {
    $('#detailForm').bootstrapValidator({
            message: 'This value is not valid',
            excluded: ':disabled',
            group: '.valid_group',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
               
            	/* agencyNum: {
                    validators: {
                        notEmpty: {
                            message: '经销商代码不能为空'
                        },
                        stringLength: {
                            max: 32,
                            message: '经销商代码不能超过32'
                        }
                    }
                },
                maxCreditAmount: {
                    validators: {
                        numeric: { message: '只能输入数字' },
                        callback: {
                            message: '金额在0~1000000000之间(>0)',
                            callback: function(value, validator) {
                                return value == "" || (parseFloat(value) > 0 && parseFloat(value) <= 1000000000);
                            }
                        },
                        notEmpty: {
                            message: '请输入最高授信额度'
                        }
                    }
                },
                orgnNum: {
                    validators: {
                        regexp: {
                            regexp: /[A-Z0-9]{18}/, 
                            message: '社会统一信用代码证号格式为18位大写拉丁字母及数字混合'
                        },
                        stringLength: {
                            max: 18,
                            message: '社会统一信用代码证号长度不能超过18'
                        },
                    }
                },
                legalPerson: {
                    validators: {
                        notEmpty: {
                            message: '法定代表人不能为空'
                        },
                        stringLength: {
                            max: 32,
                            message: '法定代表人不能超过32'
                        },

                    }
                },
                maxCreditAmount: {
                    validators: {
                        numeric: { message: '只能输入数字' },
                        callback: {
                            message: '金额在0~1000000000之间',
                            callback: function(value, validator) {
                                return value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 1000000000);
                            }
                        }
                    }
                },
                regCap: {
                    validators: {
                        numeric: { message: '只能输入数字' },
                        callback: {
                            message: '金额在0~1000000000之间',
                            callback: function(value, validator) {
                                return value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 1000000000);
                            }
                        }
                    }
                },
                contactInfo: {
                    validators: {
                        notEmpty: {
                            message: '手机号不能为空'
                        },
                        stringLength: {
                            min: 11,
                            max: 11,
                            message: '手机号长度为11'
                        },
                        regexp: {
                            regexp: /^[0-9]*$/,
                            message: '手机号只能是数字'
                        }
                    }
                },*/
                officeAddress: {
                    validators: {
                        notEmpty: {
                            message: '地址不能为空'
                        },
                        stringLength: {
                            max: 32,
                            message: '地址不能超过32'
                        },
                    }
                },
                fixedPhone:{
		        	validators: {
		        		regexp: {
		                      regexp: /^0\d{2,4}-\d{7,8}$/,
		                      message: '请输入正式号码为区号-电话号'
		                  }
		        	}
	          }
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
        });
}

function numFormat() {
    $("#maxCreditAmount").number(true, 2);
    $("#regCap").number(true, 2);
    $("#shareProportion").number(true, 2);
    $("#registeredCapital").number(true, 2);
    $("#registeredCapitalProportion").number(true, 2);
}

//获取股东表中的数据和
function getShareSum(type) {
    var shareInfo = $('#shareHolderInfoTable').bootstrapTable('getData');
    var sum = 0;
    $.each(shareInfo, function(i, item) {
        sum = CloudUtils.Math(sum, eval('item.' + type), 'add');
    });
    //	如果是修改需要减去当前选中的值
    if ($('#isEdit2').val() == "2") {
        sum = CloudUtils.Math(sum, eval('shareDetailRow.' + type), 'sub');
    }
    return sum;
}

function propertychange() {
    $('#shareProportion,#registeredCapital,#registeredCapitalProportion').bind('keyup', function(event) {
        var keycode = event.which;
        if (keycode == 8) {
            if (event.target.value == "") {
                // $("#shareInfoForm").bootstrapValidator('resetForm', true);
                $("#" + event.target.id).val(0.00);
                $("#shareInfoForm").data('bootstrapValidator').destroy();
                shareFormValidator();
                $("#shareInfoForm").data("bootstrapValidator").validate();
            }
        }
    });
}

function showImg(val){
	var imgSrc;
	if(val == 1){
		imgSrc=$("#companyPicturePath1").val();
	}else if(val == 2){
		imgSrc=$("#companyPicturePath2").val();
	}else if(val == 3){
		imgSrc=$("#companyPicturePath3").val();
	}else if(val == 4){
		imgSrc=$("#companyPicturePath4").val();
	}else if(val == 5){
		imgSrc=$("#companyPicturePath5").val();
	}else if(val == 6){
		imgSrc=$("#companyPicturePath6").val();
	}else if(val == 7){
		imgSrc=$("#businessLicensePath").val();
	}else if(val == 8){
		imgSrc=$("#permissionAccountPath").val();
	}else if(val == 9){
		imgSrc=$("#legalIdNumberPath1").val();
	}else if(val == 10){
		imgSrc=$("#legalIdNumberPath2").val();
	}
	  CloudUtils.getTab("../../pubManager/imageShow.html", "imgPreviewDiv");  	
	
	  $("#img").attr('src',imgSrc);
	  $("#imgPreviewShow").modal("show");
}