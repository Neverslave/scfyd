$(document).ready(function() {
	$("form").attr("autocomplete","off");
	ajaxRelaCorps();
	ajaxRzTemplate();
	initInterestTable();
	setForm();
	numFormat();
	
	if (taskDefKey == "usertask3") {
		formValidator();
		$("#backTarget").append("<option value='0'>融资申请</option>")
						.append("<option value='1'>登记保证金</option>");
	} else {
		$("#guaranteeAccountAmt").attr("readonly", true);
		$("#financeId").attr("readonly", true);
		$(".required").hide();
		$("#rzTemplate").attr("disabled", true);
	}
	
	if (CloudUtils.isEmpty($("#templateUrl").val())) {
		$("#rzTemplate option:first").prop("selected", 'selected');
		chgTemplate($("#rzTemplate").val());
	}
});


function ajaxRelaCorps() {
    var options = {
        url: '../../product/list',
        data: '{"isPage": 0,"productType":0}',
        callBackFun: function(data) {
            var control1 = $('#productId');
            $.each(data.dataList, function(index, units) {
                control1.append("<option value=" + units.productId + ">" + units.productName + "</option>");
            });
        },
        errorCallback: function(data) {
            alert("error");
        }
    };
    CloudUtils.ajax(options);
}

function click_YL(){
	window.open("../.." + $("#templateUrl").val());
}

function saveFun() {
//	// 表单验证
//	$('#addForm').data('bootstrapValidator').validate();
//	if (!$('#addForm').data('bootstrapValidator').isValid()) {
//		$("#adviceModal").modal('hide');
//		return false;
//	}
	
	var data = CloudUtils.convertAllJson('addForm');
	var interestListInfo = $("#interestInfoList").bootstrapTable('getData');
	
	data = eval("(" + data + ")");
	data.taskId = taskId;
	data.procInstId = procInstId;
	data.cashRate = data.cashRate == "" ? 0 : data.cashRate;
	data.interestListInfo = JSON.stringify(interestListInfo);
	data.agree = $("#agree").val();
	data.advice = $("#advice").val();
	data.backTarget = $("#backTarget").val();
	
	var options = {
		url : '../../finance/doAgree',
		data : JSON.stringify(data),
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
	    	  financeId: {
	              validators: {
	            	  stringLength: {
                          max: 32,
                          message: '融资编号不能超过32'
                      }
	              }
	    	  },
	    	  guaranteeAccountAmt: {
	              validators: {
	            	  notEmpty: {message: '保证金到账金额不能为空'},
	        		  numeric: {message: '只能输入数字'},
	        		  callback: {
      					message: '保证金到账金额要在0~1000000000.00之间',  
      					callback: function(value, validator) {
      						return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
      					}
	      			  }
	              }
	    	  }
	      }
		})
		.on('success.form.bv', function (e) {
        e.preventDefault();
		});
}

function numFormat(){
	$("#maxCredit").number(true, 2);
	$("#availableCredit").number(true, 2);
	$("#financeRate").number(true, 2);
	$("#cashRate").number(true, 4);
	$("#financeAmount").number(true, 2);
	$("#expense").number(true, 2);
	$("#payAbleGuarantee").number(true, 2);
	$("#payActGuarantee").number(true, 2);
	$("#guaranteeAccountAmt").number(true, 2);
}

function initInterestTable() {
	$('#interestInfoList').bootstrapTable('destroy'); 
	$("#interestInfoList").bootstrapTable({  
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
 	        field: 'rateStandard',
 	        title: '利率标准',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'dykRate',
 	        title: '利率(%)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index) {
				return $.number(value, 2);
	    	}
 	    }, {
 	        field: 'interest',
 	        title: '日利息',
 	        align: 'center',
 	        valign: 'middle',
 	        formatter:function(value,row,index) {
 	        	return $.number(value, 2);
	    	}
 	    }]
       });
}

function setForm() {
	var options = {
		url : '../../finance/getFinanceInfo',
		data : JSON.stringify({
			taskId: taskId,
			varName : "payApplyJson"
		}),
		callBackFun : function(data) {
			if (data.result == 0) {
				var obj = JSON.parse(data.str);
				var interestListInfo = obj.interestListInfo;
				CloudUtils.setForm(obj, "addForm");
				initInterestTable();
				if (interestListInfo != null && interestListInfo != '') {
					$("#interestInfoList").bootstrapTable('append', JSON.parse(interestListInfo));
				}
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

function ajaxRzTemplate() {
	var options = {
		url : '../../ydcommon/cnhTemplates',
		data : JSON.stringify({
			templateType: '0'
		}),
		callBackFun : function(data) {
			if(data.result==0){
				$.each(data.dataList, function(i, rec) {
					if (i == 0) {
						$("#templateUrl").val(rec.templatePath);
					}
					$("#rzTemplate").append('<option value="' + rec.templateKey +'">' + rec.templateName + '</option>')
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