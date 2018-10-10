$(document).ready(function () {
	$("#riskManager").hide();
    initFileTable("reviewFiles", "material_type_report");
    initFileTable("buyFiles", "material_type_buy");
    initFileTable("saleFiles", "material_type_buy");
    initFileTable("guaranteeFiles", "material_type_guarantee");
    initFileTable("tranFiles", "material_type_tran");
    loadDict();
	loadTaskData();
	formValidator();
    $('.table').bootstrapTable('hideColumn', 'operation');
    if(taskDefKey == "usertask2"){
 	   $("#riskManager").show();
    }
    hideOrShow();
    dateLoad();
   
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

function getData() {
    var reviewFiles = $("#reviewFiles").bootstrapTable('getData');
    var buyFiles = $("#buyFiles").bootstrapTable('getData');
    var saleFiles = $("#saleFiles").bootstrapTable('getData');
    var guaranteeFiles = $("#guaranteeFiles").bootstrapTable('getData');
    var tranFiles = $("#tranFiles").bootstrapTable('getData');
    var data = CloudUtils.convertAllJson('infoForm');
    var jsonData = eval("(" + data + ")");
    jsonData['agree'] = $("#agree").val();
    jsonData.taskId = taskId;
    jsonData.projectId = $("#projectId").val();
    jsonData.procInstId = procInstId;
    jsonData.advice = $.trim($("#advice").val());
    jsonData['buyFiles'] = buyFiles;
    jsonData['saleFiles'] = saleFiles;
    jsonData['guaranteeFiles'] = guaranteeFiles;
    jsonData['tranFiles'] = tranFiles;
    jsonData['reviewFiles'] = reviewFiles;
    jsonData.countersign = $("#countersign").val();
    return jsonData;
}

function loadTaskData() {
    var data = {};
    data.taskId = taskId;
    var options = {
        url: '../../tradfact/projectReview/bpm/getTaskDataByTaskId',
        data: JSON.stringify(data),
        callBackFun: function (data) {
            if (data.result == 0) {
                data = eval("(" + data.str + ")");
                CloudUtils.setForm(data, 'infoForm');
                if(data.doc){
                    var countersign =  JSON.parse(data.doc).countersign;
                    if (countersign){
                        $("#countersign").val(countersign);//会签参数
                    }
                }
                tables = $(".table");
                for (var i = 0; i < tables.length; i++) {
                    var id = $(tables[i]).attr('id');
                    if (data[id]) {
                        $('#' + id).bootstrapTable("append", data[id]);
                    }
                }
            } else {
                return false;
            }
        },
        errorCallback: function (data) {
            bootbox.alert(data.resultNote);
            return false;
        }
    };
    CloudUtils.ajax(options);
}

//同意流程
function agree() {
    var options = {
        url: '../../tradfact/projectReview/bpm/auditProcess',
        data: JSON.stringify(getData()),
        callBackFun: function (data) {
            bootbox.alert(
                data.resultNote,
                function () {
                    window.location.href = '../../project/agencyTask/agencyTask.html';
                });
        }
    };
    CloudUtils.ajax(options);
}

function saveFun() {
	
		 $('#infoForm').data('bootstrapValidator').validate();
		 if (!$('#infoForm').data('bootstrapValidator').isValid()) {
		        //校验不通过 
		        return false;
		    }
		
    agree();
}

function reapply() {
    var options = {
        url: '../../tradfact/projectReview/bpm/reApply',
        data: JSON.stringify(getData()),
        callBackFun: function (data) {
            bootbox.alert(
                data.resultNote,
                function () {
                    window.location.href = '../../project/agencyTask/agencyTask.html';
                });
        },
        errorCallback: function (data) {
            bootbox.alert(data.resultNote);
            return false;
        }
    };
    CloudUtils.ajax(options);
}

function hideOrShow() {
  
    if (taskDefKey == 'usertask3' || taskDefKey == 'usertask1') {
        $("#up-load-button").show();
        $('#reviewFiles').bootstrapTable('showColumn', 'operation');
    } else {
        $("#up-load-button").hide();
        
    }
    if(taskDefKey == 'usertask1'){
    	$("#time").hide();
    }
    if(taskDefKey != 'usertask2'){
    	$("#reviewTime").attr("disabled",true);
    }
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
function dateLoad(){
	$("#reviewTime").datetimepicker({
		language:'zh-CN',
		autoclose:1,
		todayBtn:true,
		pickerPosition:"bottom-left",
		minuteStep:1,
		format:'yyyy-mm-dd hh:ii',
		minView:0
	}).on('hide', function(e){
		$('#infoForm').data('bootstrapValidator')
        .updateStatus('reviewTime', 'NOT_VALIDATED', null)
        .validateField('reviewTime');
	});
}
function formValidator() {
    $('#infoForm').bootstrapValidator({
            message: 'This value is not valid',
            excluded: ':disabled',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
            	reviewTime:{
            		validators:{
            			notEmpty:{message:'预评审时间不能为空'}
            		}
            	}
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
        });
}

