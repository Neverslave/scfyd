$(document).ready(function() {
	CloudUtils.getMenuNames("nav");
	loadDict();
	var row = store.get('replyRow'); //从缓存中获取数据
	$("#noteForm #projectId").val(row.projectId);
	$("#noteForm #projectName").val(row.projectName);
	CloudUtils.setForm(row, 'detailForm');
	
	initFileTable("replyFiles","material_type_reply");
	searchFileTable("buyFiles",row.projectId,"0","material_type_buy");
	searchFileTable("saleFiles",row.projectId,"1","material_type_buy");
	searchFileTable("guaranteeFiles",row.projectId,"2","material_type_guarantee");
	searchFileTable("tranFiles",row.projectId,"3","material_type_tran");
	searchFileTable("reportFiles",row.projectId,"5","material_type_report");
	
	
});

function uploadClick(btnId,tableId,typeId){
	$("#material-type").val(tableId);
	$("#btn_choice").children().attr('id',btnId);
	$("#materialType").attr('dictName',typeId);
    loadDict("materialType");
	ajaxFileUpload(btnId);
	$('#fileModal').modal('show');
}

function cancle() {
    //	取消
    //	清缓存
    store.remove('replyRow');
    history.go(-1);
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

function checkFiles(list){
	if(list == null||list.length === 0){
		return false;
	}
	return true;
}

function saveFun(){
	var opinion = $("input[name='replyOpinion']:checked").val();
	if(opinion=="1"||opinion=="2"){
		if(!$("#remark").val()){
			bootbox.alert("请填写批复意见！");
			return false;
		}
	}
	var replyFiles = $("#replyFiles").bootstrapTable('getData');
	var data = CloudUtils.convertStringJson('noteForm');
	var jsonData = eval("(" + data + ")");
	jsonData['replyFiles'] = replyFiles;
	
	var options = {
			url : "../../reply/remark",
			data : JSON.stringify(jsonData),
			callBackFun : function(data) {
				if(data.result==0){
					bootbox.alert(data.resultNote, function() {
						window.location.href="../../tradfact/projectReply/projectReply.html";
					});
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback:function(data){
				bootbox.alert("error");
			}
		};
		CloudUtils.ajax(options);
	
}