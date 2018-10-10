$(document).ready(function() {
	loadDict();
	var recomMeetData = store.get('recomMeet');
	CloudUtils.setForm(recomMeetData, 'recomInfoForm');
    searchFileTable("projectFiles",recomMeetData.projectId,"5","material_type_report");
	searchFileTable("buyFiles",recomMeetData.projectId,"0","material_type_buy");
	searchFileTable("saleFiles",recomMeetData.projectId,"1","material_type_buy");
	searchFileTable("guaranteeFiles",recomMeetData.projectId,"2","material_type_guarantee");
	searchFileTable("tranFiles",recomMeetData.projectId,"3","material_type_tran");
	
    $('.table').bootstrapTable('hideColumn', 'operation');
});

function submit() {
        var data = CloudUtils.convertAllJson('recomInfoForm');
        var jsonData = eval("(" + data + ")");
        var buyFiles = $("#buyFiles").bootstrapTable('getData');
    	var saleFiles = $("#saleFiles").bootstrapTable('getData');
    	var guaranteeFiles = $("#guaranteeFiles").bootstrapTable('getData');
    	var tranFiles = $("#tranFiles").bootstrapTable('getData');
        var projectFiles = $("#projectFiles").bootstrapTable('getData');
		jsonData['buyFiles'] = buyFiles;
	    jsonData['saleFiles'] = saleFiles;
	    jsonData['guaranteeFiles'] = guaranteeFiles;
	    jsonData['tranFiles'] = tranFiles;
	    jsonData['projectFiles'] = projectFiles;
        jsonData['projectId'] = $("#projectId").val();
        jsonData['upwardsInfo'] = $("#upwardsInfo").val();
        var options = {
            url: '../../tradfact/recommeet/bpm/startProcess',
            data: JSON.stringify(jsonData),
            callBackFun: function(data) {
                if (data.result == 0) {
                    bootbox.alert(data.resultNote, function() {
                    	store.remove('recomMeet');
                        window.location.href = "../../homePage.html";
                    });
                } else {
                    return false;
                }
            },
            errorCallback: function(data) {
                return false;
            }
        };
        CloudUtils.ajax(options);

}
function cancel() {
    window.location.href = "../../homePage.html";
}