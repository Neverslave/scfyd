$(document).ready(function() {
	loadDict();
	initFileTable("reviewFiles","material_type_report");
	var projectReview = store.get('projectReview');
	CloudUtils.setForm(projectReview, 'infoForm');
	searchFileTable("buyFiles",projectReview.projectId,"0","material_type_buy");
	searchFileTable("saleFiles",projectReview.projectId,"1","material_type_buy");
	searchFileTable("guaranteeFiles",projectReview.projectId,"2","material_type_guarantee");
	searchFileTable("tranFiles",projectReview.projectId,"3","material_type_tran");
	$('.table').bootstrapTable('hideColumn', 'operation');
	$('#reviewFiles').bootstrapTable('showColumn', 'operation');
	
});
function uploadClick(btnId, tableId, typeId) {
    $("#material-type").val(tableId);
    $("#btn_choice").children().attr('id', btnId);
    $("#materialType").attr('dictName', typeId);
    loadDict("materialType");
    ajaxFileUpload(btnId);
    $('#fileModal').modal('show');
}

function addFile() {
    if (!$("#fileName").val()) {
        bootbox.alert("请选择文件");
        return false;
    }
    var tableId = $("#material-type").val();
    var data = CloudUtils.convertStringJson('fileInfoForm');
    data = eval("(" + data + ")");
    $("#" + tableId).bootstrapTable("append", data);
    $('#fileModal').modal('hide');
    $("#fileInfoForm")[0].reset();
}

function submit() {
	var reviewFiles = $("#reviewFiles").bootstrapTable('getData');
    var data = CloudUtils.convertAllJson('infoForm');
    var jsonData = eval("(" + data + ")");
    var buyFiles = $("#buyFiles").bootstrapTable('getData');
	var saleFiles = $("#saleFiles").bootstrapTable('getData');
	var guaranteeFiles = $("#guaranteeFiles").bootstrapTable('getData');
	var tranFiles = $("#tranFiles").bootstrapTable('getData');
	jsonData['buyFiles'] = buyFiles;
    jsonData['saleFiles'] = saleFiles;
    jsonData['guaranteeFiles'] = guaranteeFiles;
    jsonData['tranFiles'] = tranFiles;
    jsonData['reviewFiles'] = reviewFiles;
    jsonData['projectId'] = $("#projectId").val();
    var options = {
        url: '../../tradfact/projectReview/bpm/startProcess',
        data: JSON.stringify(jsonData),
        callBackFun: function(data) {
            if (data.result == 0) {
                bootbox.alert(data.resultNote, function() {
                	store.remove('projectReview');
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