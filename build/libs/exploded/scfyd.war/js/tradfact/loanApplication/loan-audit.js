$(function() {
	loadDict();
	loadTaskData();
	
	if (taskDefKey == 'usertask1') {
		$(".required").show();
	} else {
		$(".required").hide();
	}
	formValidator();
	numFormat();
	dateLoad();
});



function loadTaskData() {
	var data = {};
	data.taskId = taskId;
	var options = {
		url : '../../tradfact/loanApplication/bpm/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				data = eval("(" + data.str + ")");
				loadView(data.doc);
				CloudUtils.setForm(data, 'loanForm');
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
function loadView(doc) {
	if(doc){
	  var obj = JSON.parse(doc);
	    if(!obj.editable){
	        $('.form-control').attr("disabled","disabled");
	        $('#advice').attr("disabled",false);
	        $('#materialType').attr("disabled",false);
	    }
	    var editableExclusion = obj.editableExclusion;
	    if (editableExclusion){
	        for (var i=0;i<editableExclusion.length;i++) {
	            $('#' + editableExclusion[i]).attr("disabled", false);
	        }
	    }
	}
}
function getData() {
	var data = CloudUtils.convertAllJson('loanForm');
	var jsonData = eval("(" + data + ")");
	jsonData['agree'] = $("#agree").val();
	jsonData.taskId = taskId;
	jsonData.procInstId = procInstId;
	jsonData.advice = $.trim($("#advice").val());
	return jsonData;
}
function saveFun() {
	agree();
}
// 同意流程
function agree() {
	var options = {
		url : '../../tradfact/loanApplication/bpm/auditProcess',
		data : JSON.stringify(getData()),
		callBackFun : function(data) {
			bootbox.alert(
							data.resultNote,
							function() {
								window.location.href = '../../project/agencyTask/agencyTask.html';
							});
		}
	};
	CloudUtils.ajax(options);
}
// 再申请
function reapply() {
	var options = {
		url : '../../tradfact/loanApplication/bpm/reApply',
		data : JSON.stringify(getData()),
		callBackFun : function(data) {
			bootbox.alert(
							data.resultNote,
							function() {
								window.location.href = '../../project/agencyTask/agencyTask.html';
							});
		},
		errorCallback : function(data) {
			bootbox.alert(data.resultNote);
			return false;
		}
	};
	CloudUtils.ajax(options);
}

function formValidator() {
	$('#loanForm')
			.bootstrapValidator(
					{
						message : 'This value is not valid',
						excluded : ':disabled',
						feedbackIcons : {
							valid : 'glyphicon glyphicon-ok',
							invalid : 'glyphicon glyphicon-remove',
							validating : 'glyphicon glyphicon-refresh'
						},
						fields : {
							loanId : {
								validators : {
									notEmpty : {
										message : '放款编号不能为空'
									},
								}
							},
							loanDate:{
								validators:{
									notEmpty:{message:'放款日期不能为空'},
								}
							},
							factFinance : {
								validators : {
									notEmpty : {
										message : '保理融资投放金额不能为空'
									},
									regexp : {
										regexp : /^([0-9])+(\.[0-9]+)?$/,
										message : '保理融资投放金额>0'
									},
									callback : {
										message : '保理融资投放金额不得超过可用授信金额',
										callback : function(value, validator) {
											var availableCre = $("#availableCredit").val() == "" ? 0 : $("#availableCredit").val();
											var availableCreFloat = parseFloat(availableCre);
											var factFinance = parseFloat($("#factFinance").val());
											return value = "" || ((parseFloat(value) + factFinance) <= availableCreFloat);
										}
									}
								}
							},
							availableCredit : {
								validators : {
									notEmpty : {
										message : '保理融资投放金额不能为空'
									},
									numberic : {
										message : '只能输入数字'
									}
								}
							},
							loanPeriod : {
								validators : {
									notEmpty : {
										message : '放款期限不能为空'
									},
									regexp : {
										regexp : /^\d+$/,
										message : '只能输入整数'
									}
								}
							},
							manageRate : {
								validators : {
									notEmpty : {
										message : '保理管理费率不能为空'
									},
									numberic : {
										message : '只能输入数字'
									},
									callback : {
										message : "保理管理费率要在0~100之间",
										callback : function(value, validator) {
											return parseFloat(value) >= 0
													&& parseFloat(value) <= 100;
										}
									}
								}
							},
							depositeRate : {
								validators : {
									notEmpty : {
										message : '保证金率不能为空'
									},
									numberic : {
										message : '只能输入数字'
									},
									callback : {
										message : "保证金率要在0%~100%之间",
										callback : function(value, validator) {
											return parseFloat(value) >= 0
													&& parseFloat(value) <= 100;
										}
									}
								}
							},
							factRate : {
								validators : {
									notEmpty : {
										message : '保理融资利息率不能为空'
									},
									numberic : {
										message : '只能输入数字'
									},
									callback : {
										message : "保理融资利息率要在0~100之间",
										callback : function(value, validator) {
											return parseFloat(value) >= 0
													&& parseFloat(value) <= 100;
										}
									}
								}
							},
							shroffAccount : {
								validators : {
									notEmpty : {
										message : '融资收款账号不能为空'
									}									
								}
							},
							accountName : {
								validators : {
									notEmpty : {
										message : '开户名不能为空'
									}
								}
							},
							openBank : {
								validators : {
									notEmpty : {
										message : '开户行不能为空'
									}
								}
							},
							bankNum : {
								validators : {
									notEmpty : {
										message : '银联号不能为空'
									},
									regexp:{
										regexp:/\b\d{12}\b/,
										message:'请输入12位数字'
									}
								}
							}
						}
					}).on('success.form.bv', function(e) {
				e.preventDefault();
			});
}

function numFormat() {
	$("#availableCredit").number(true, 2);
	$("#factFinance").number(true, 2);
	$("#manageRate").number(true, 6);
	$("#manageFiance").number(true, 2);
	$("#depositeRate").number(true, 4);
	$("#factRate").number(true, 6);
}

function dateLoad() {
	$("#loanDate").datetimepicker({
		language : 'zh-CN',
		autoclose : 1,
		todayBtn : true,
		pickerPosition : "bottom-left",
		minuteStep : 5,
		format : 'yyyy-mm-dd',
		minView : 'month'
	}).on('hide',function(e) {
				$('#loanForm').data('bootstrapValidator').updateStatus(
						'loanDate', 'NOT_VALIDATED', null).validateField(
						'loanDate');
			});
}

function changeAmount() {
    // 计算费用
    var factFinance = $("#factFinance").val();
    var manageRate = $("#manageRate").val();
    var manageFiance = CloudUtils.Math(factFinance, manageRate, 'mul');
    $("#manageFiance").val(CloudUtils.ccyFormatNoPre(CloudUtils.Math(manageFiance, 100, 'div'), 2));

}