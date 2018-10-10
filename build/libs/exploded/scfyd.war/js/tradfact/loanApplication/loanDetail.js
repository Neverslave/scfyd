$(function (){
	setForm();
	numFormat();
});

function setForm(){
	debugger;
	var row = store.get('agencyRow'); //从缓存中获取数据
    var taskId = row.taskId;
	 var options = {
		url : '../../activiti/findDataByTaskId',
		data: '{"taskId":"' + taskId + '"}',
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData,"detailForm");
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
function numFormat() {
	$("#availableCredit").number(true, 2);
	$("#factFinance").number(true, 2);
	$("#manageRate").number(true, 6);
	$("#manageFiance").number(true, 2);
	$("#depositeRate").number(true, 4);
	$("#factRate").number(true, 6);
}