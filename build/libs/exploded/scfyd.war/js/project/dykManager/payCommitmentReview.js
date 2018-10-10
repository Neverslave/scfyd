$(function () {
	$("form").attr("autocomplete","off");
	
	ajaxFkTemplate();
	initCarInfoListTable();
	setForm();
    numFormat();
    
    if (taskDefKey == "usertask3") {
    	formValidator();
		$("#backTarget").append("<option value='0'>付款申请</option>");
		var guaranteeAmt = $("#guaranteeAmt").val(); //保证金金额
		var payActGuarantee = $("#payActGuarantee").val(); //实缴保证金金额
		if (parseFloat(guaranteeAmt) > parseFloat(payActGuarantee)) {
			$("#backTarget").append("<option value='1'>补缴保证金</option>");
		}
	} else {
		$("#fkTemplate").attr("disabled", true);
		$("#payId").attr("readonly", true);
	}
    
    if (CloudUtils.isEmpty($("#templateUrl").val())) {
		$("#fkTemplate option:first").prop("selected", 'selected');
		chgTemplate($("#fkTemplate").val());
	}
});

function click_pay(){
	window.open("../.." + $("#templateUrl").val());
}

function initCarInfoListTable() {
	$('#carInfoListTable').bootstrapTable('destroy'); 
	$("#carInfoListTable").bootstrapTable({  
		method: "post", 
        url: "", 
        striped: true,  //表格显示条纹  
        pagination: false, //启动分页  
        search: false,  //是否启用查询  
        showColumns: false,  //显示下拉框勾选要显示的列  
        showRefresh: false,  //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType : "undefined",   
        queryParams: function queryParams(params) {   //设置查询参数  
          return null;
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
		 	}, {
	 	        field: 'fileName',
	 	        title: '附件名称',
	 	        align: 'center',
	            valign: 'middle',
	            formatter:function(value,row,index){
					 var s = '<a target="view_window" href="/../..'+row.fileUrl+'" download="'+value+'">'+value+'</a>';
			         return s;
		           
		        }
	 	    }, {
	 	        field: 'fileType',
	 	        title: '文件格式',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'fileSize',
	 	        title: '文件大小(KB)',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false,
	 	        formatter:function(value,row,index){
	 	        	var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="attach" href="javascript:void(0)"></a>';
	 	            return r;
	 	        },
	 	        events: 'operateEvents'
	 	    }]
       });  
}

function setForm() {
	var options = {
		url : '../../commitment/getDataByTaskId',
		data : JSON.stringify({
			taskId : taskId,
			varName : "payApplyJson"
		}),
		callBackFun : function(data) {
			if (data.result == 0) {
				var json = JSON.parse(data.str);
				var carListInfo = json.carListInfo;
				CloudUtils.setForm(json, "addForm");
				$.each(JSON.parse(carListInfo), function(i, row) {
					$("#carInfoListTable").bootstrapTable('append', row);
				});
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

function numFormat(){
	$("#maxCredit").number(true, 2);
	$("#availableCredit").number(true, 2);
	$("#payM").number(true, 2);
	$("#guaranteeAmt").number(true, 2);
	$("#payActGuarantee").number(true, 2);
	$("#guaranteeDiff").number(true, 2);
	$("#financeAmount").number(true, 2);
}

function saveFun() {
	var data = CloudUtils.convertAllJson('addForm');
	var json = eval("(" + data + ")");
	json.taskId = taskId;
	json.procInstId = procInstId;
	var carListData = $("#carInfoListTable").bootstrapTable('getData');
	json.carListInfo = JSON.stringify(carListData);
	json.agree = $("#agree").val();
	json.advice = $("#advice").val();
	json.backTarget = $("#backTarget").val();
	
	var options = {
			url : '../../commitment/doAgree',
			data : JSON.stringify(json),
			callBackFun : function(data) {
				if(data.result==0){
					bootbox.alert(data.resultNote, function() {
						window.location.href = '../../project/agencyTask/agencyTask.html';
					});
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback:function(data){
				bootbox.alert(data.resultNote);
				return false;
			}
	};
	CloudUtils.ajax(options);
}

function ajaxFkTemplate() {
	var options = {
		url : '../../ydcommon/cnhTemplates',
		data : JSON.stringify({
			templateType: '1'
		}),
		callBackFun : function(data) {
			if(data.result==0){
				$.each(data.dataList, function(i, rec) {
					if (i == 0) {
						$("#templateUrl").val(rec.templatePath);
					}
					$("#fkTemplate").append('<option value="' + rec.templateKey +'">' + rec.templateName + '</option>')
				});
			}else{
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

function chgTemplate(templateKey) {
	var options = {
		url : '../../ydcommon/cnhTemplateUrl',
		data : JSON.stringify({
			templateKey: templateKey
		}),
		callBackFun : function(data) {
			if(data.result==0){
				$("#templateUrl").val(data.str);
			}else{
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

//form验证规则
function formValidator() {
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      group:'.valid_group',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  payId: {
	              validators: {
	            	  stringLength: {
                          max: 32,
                          message: '付款编号长度不能超过32'
                      }
	              }
	    	  }
	      }
		})
		.on('success.form.bv', function (e) {
        e.preventDefault();
		});
}