$(document).ready(function() {
	getVariableByTaskId();
	numFormat();
});


function getVariableByTaskId() {
    var row = store.get('agencyRow'); //从缓存中获取数据
    var taskId = row.taskId;
    var options = {
        url: '../../activiti/findDataByTaskId',
        data: '{"taskId":"' + taskId + '"}',
        callBackFun: function(data) {
            if (data.result == 0) {
            	var json = JSON.parse(data.str);
                CloudUtils.setForm(json, "detailHisForm");
            } else {
                bootbox.alert(data.resultNote);
                return false;
            }
        },
        errorCallback: function(data) {
            bootbox.alert(data.resultNote);
            return false;
        }
    };
    CloudUtils.ajax(options);
}

function numFormat(){
	$("#detailHisForm #payM").number(true, 2);
	$("#detailHisForm #guaranteeAmt").number(true, 2);
	$("#detailHisForm #payActGuarantee").number(true, 2);
	$("#detailHisForm #guaranteeDiff").number(true, 2);
	$("#detailHisForm #financeAmount").number(true, 2);
}
