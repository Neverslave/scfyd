$(document).ready(function() {
	$("form").attr("autocomplete","off");
	setForm();
	numFormat();
});

function setForm(){
	var data = {};
	data.taskId = taskId;
	var options = {
		url : '../../activiti/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData, "addForm");
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

function saveFun() {
	var data = CloudUtils.convertAllJson('addForm');
	data = eval("(" + data + ")");
	data.taskId = taskId;
	data.procInstId = procInstId;
	data.agree = $("#agree").val();
	data.advice = $("#advice").val();
	
	var options = {
		url : "../../loanInfo/doAgree",
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

function numFormat(){
	$("#orderAcceptMoney").number(true, 2);
	$("#orderAllMoney").number(true, 2);
	$("#loanAmt").number(true, 2);
	$("#guaranteeMoneyRate").number(true, 2);
	$("#guaranteeMoney").number(true, 2);
	$("#guaranteeMoneyActual").number(true, 2);
}