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
						 CloudUtils.setForm(jsonData,"detailHisForm");
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
	$("#detailHisForm #financeAmount").number(true,2);
	$("#detailHisForm #payAmt").number(true,2);
	$("#detailHisForm #guaranteeMoneyRate").number(true,2);
	$("#detailHisForm #payAbleGuarantee").number(true,2);
	$("#detailHisForm #payActGuarantee").number(true,2);
	$("#detailHisForm #returnGuaranteeAmt").number(true,2);
	$("#detailHisForm #availableCredit").number(true,2);
	$("#detailHisForm #maxCredit").number(true,2);
}
