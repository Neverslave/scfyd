$(function(){
	ajaxRelaCorps();
	numFormat();
	getVariableByTaskId();
});

function ajaxRelaCorps() {
    var options = {
    		
        url: '../../product/list',
        data: '{"isPage": 0,"productType":0}',
        callBackFun: function(data) {
            var control1 = $('#detailHisFrom #productId');
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



function getVariableByTaskId(){
	var row = store.get('agencyRow');//从缓存中获取数据
	var taskId = row.taskId;
	 var options = {
				url : '../../activiti/findDataByTaskId',
				data : '{"taskId":"'+taskId+'"}',
				callBackFun : function(data) {
					debugger
					if (data.result == 0) {
						 var jsonData =  eval("(" + data.str + ")");
						 CloudUtils.setForm(jsonData,"detailHisFrom");
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
	$("#detailHisFrom #financeAmount").number(true, 2);	//融资金额
	$("#detailHisFrom #guaranteeRate").number(true, 2);	//保证金收取比例
	$("#detailHisFrom #payAbleGuarantee").number(true, 2);	//应缴保证金金额
	$("#detailHisFrom #payActGuarantee").number(true, 2);	//实缴保证金金额
}