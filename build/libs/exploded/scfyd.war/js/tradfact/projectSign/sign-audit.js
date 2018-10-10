$(function () {
	 $("#riskManager").hide();
	initFileTable("signFiles","material_type_sign");
	loadDict();
	loadTaskData();
	if (taskDefKey == 'usertask1') {
		$(".required").show();
	} else {
		$(".required").hide();
	}
	formValidator();
	firstCreditFlag();
	 if(taskDefKey == "usertask3"){
		   $("#riskManager").show();
	   }
 });

function firstCreditFlag(){
	debugger
	if($("#firstCreditFlag").val() == 1 & store.get('roleId') == 'ROLE000016'){
		$("#creditContractNo").attr("readOnly",true);
		$("#creditContractName").attr("readOnly",true);
		$("#creditContractTerm").attr("readOnly",true);
		$("#creditContractNote").attr("readOnly",true);
	}else{
		$("#creditContractNo").attr("readOnly",false);
		$("#creditContractName").attr("readOnly",false);
		$("#creditContractTerm").attr("readOnly",false);
		$("#creditContractNote").attr("readOnly",false);
	}
}

function loadTaskData() {
    var data = {};
    data.taskId = taskId;
    var options = {
        url: '../../tradfact/sign/bpm/getTaskDataByTaskId',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            if (data.result == 0) {
                data = eval("(" + data.str + ")");
                loadView(data.doc);
                CloudUtils.setForm(data, 'signForm');
                var tables = $(".table");
                for (var i = 0; i<tables.length; i++){
                    var id = $(tables[i]).attr('id');
                    if(data[id]){
                        $('#'+id).bootstrapTable("append", data[id])
                    }
                }
            } else {
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

function loadView(doc) {
	if (taskDefKey == 'usertask1'||taskDefKey == 'usertask4') {
		$('.table').bootstrapTable('showColumn', 'operation');
	}else{
		$('.table').bootstrapTable('hideColumn', 'operation');
	}
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
    var visibleExclusion = obj.visibleExclusion;
    if(visibleExclusion){
        for (var i=0;i<visibleExclusion.length;i++) {
            $('#' + visibleExclusion[i]).hide();
        }
    }
}

function getData(){
    var signFiles = $("#signFiles").bootstrapTable('getData');
    var data = CloudUtils.convertAllJson('signForm');
    var jsonData = eval("(" + data + ")");
    jsonData['agree'] = $("#agree").val();
    jsonData.taskId = taskId;
    jsonData.procInstId = procInstId;
    jsonData.advice = $.trim($("#advice").val());
    jsonData['signFiles'] = signFiles;
    return jsonData;
}

function saveFun() {
    agree();
}

function uploadClick(btnId,tableId,typeId){
	$("#material-type").val(tableId);
	$("#btn_choice").children().attr('id',btnId);
	$("#materialType").attr('dictName',typeId);
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

function checkFiles(list){
	if(list == null||list.length === 0){
		return false;
	}
	return true;
}

//同意流程
function agree() {
    var options = {
        url: '../../tradfact/sign/bpm/auditProcess',
        data: JSON.stringify(getData()),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote, function() {
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

//再申请
function reapply() {
    var options = {
        url: '../../tradfact/sign/bpm/reApply',
        data: JSON.stringify(getData()),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote, function() {
                window.location.href = '../../project/agencyTask/agencyTask.html';
            });
        },
        errorCallback: function(data) {
            bootbox.alert(data.resultNote);
            return false;
        }
    };
    CloudUtils.ajax(options);
}

function formValidator(){
    $('#signForm').bootstrapValidator({
        message: 'This value is not valid',
        excluded: ':disabled',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
        	creditContractNo:{
        		validators: {
                    notEmpty: {
                        message: '授信合同编号不能为空'
                    }
        		}
            },
            creditContractName:{
            	validators: {
                    notEmpty: {
                        message: '授信合同名称不能为空'
                    }
                }
            },
            creditContractTerm:{
            	validators: {
                    notEmpty: {
                        message: '授信合同期限不能为空'
                    },
                    regexp: {
                        regexp: /^\d+$/,
                        message: '只能输入整数'
                    }
                }
            },
            factoringContractNo:{
            	validators: {
                    notEmpty: {
                        message: '保理合同编号不能为空'
                    }
                }
            },
            factoringContractName:{
            	validators: {
                    notEmpty: {
                        message: '保理合同名称不能为空'
                    }
                }
            },
            factoringContractTerm:{
            	validators: {
                    notEmpty: {
                        message: '保理合同期限不能为空'
                    },
                    regexp: {
                    	regexp: /^\d+$/,
                        message: '只能输入整数'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
            e.preventDefault();
        });
}
function searchriskManager() {
    $("#riskManagerInfoModal").modal();
    initriskManagerListTable();
}

function searchriskManagerNo() {
    initriskManagerListTable();
}

function initriskManagerListTable() {
    $('#riskManagerListTable').bootstrapTable('destroy');
    $("#riskManagerListTable").bootstrapTable({
        method: "post",
        url: "../../tradfact/projectAdjust/riskManagerList",
        striped: true, // 表格显示条纹
        pagination: true, // 启动分页
        pageSize: 5, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [5, 10, 15, 20, 25], // 记录数可选列表
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        clickToSelect: true, //是否启用点击选中行
        sidePagination: "server", // 表示服务端请求
        queryParamsType: "undefined",
        singleSelect: true,
        queryParams: function queryParams(params) { // 设置查询参数
        	var data = CloudUtils.convertStringJson('riskManagerSearchForm');
        	var jsonData = eval("(" + data + ")");
        	jsonData.pageNumber = params.pageNumber;
            jsonData.pageSize = params.pageSize;
            return JSON.stringify(jsonData);
        },
        responseHandler: function responseHandler(res) {
            if (res.result == 0) {
                return {
                    "rows": res.dataList,
                    "total": res.records
                };
            } else {
                bootbox.alert(res.resultNote);
                return {
                    "rows": [],
                    "total": 0
                };
            }
        },
        columns: [{
            checkbox: true
        }, {
            field: 'userName',
            title: '用户名',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'realName',
            title: '真实姓名',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'userId',
            visible: false
        }]
    });
}
function riskManagerInfo() {
    var rows = $('#riskManagerListTable').bootstrapTable('getSelections');
    if (rows.length > 0) {
        var row = $('#riskManagerListTable').bootstrapTable('getSelections')[0];
        $('#realName').val(row.realName);
        $("#userId").val(row.userId);
    }

}