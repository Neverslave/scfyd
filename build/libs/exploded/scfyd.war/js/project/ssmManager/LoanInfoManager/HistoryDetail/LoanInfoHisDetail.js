$(function(){
	getVariableByTaskId();
	numFormat();
});
function getVariableByTaskId(){
	var row = store.get('agencyRow');//从缓存中获取数据
	var taskId = row.taskId;
	 var options = {
				url : '../../activiti/findDataByTaskId',
				data : '{"taskId":"'+taskId+'"}',
				callBackFun : function(data) {
					if (data.result == 0) {
						 var jsonData =  eval("(" + data.str + ")");
						 CloudUtils.setForm(jsonData,"addFormHis");
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

function numFormat(){
	$("#addFormHis #orderAcceptMoney").number(true, 2);
	$("#addFormHis #orderAllMoney").number(true, 2);
	$("#addFormHis #loanAmt").number(true, 2);
	$("#addFormHis #guaranteeMoneyRate").number(true, 2);
	$("#addFormHis #guaranteeMoney").number(true, 2);
	$("#addFormHis #guaranteeMoneyActual").number(true, 2);
}