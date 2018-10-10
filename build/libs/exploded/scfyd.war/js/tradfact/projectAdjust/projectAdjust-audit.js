$(document).ready(function() {
   $("#riskManager").hide();
   initFileTable("buyFiles", "material_type_buy");
   initFileTable("saleFiles", "material_type_buy");
   initFileTable("guaranteeFiles", "material_type_guarantee");
   initFileTable("tranFiles", "material_type_tran");
   loadDict();
   loadTaskData();
   formValidator();
   readOrWrite();
   if(taskDefKey == "usertask2"){
	   $("#riskManager").show();
   }
});

function loadTaskData() {
    var data = {};
    data.taskId = taskId;
    var options = {
        url: '../../tradfact/projectAdjust/bpm/getTaskDataByTaskId',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            if (data.result == 0) {
                data = eval("(" + data.str + ")");
                CloudUtils.setForm(data, 'projectAdjustForm');
                CloudUtils.setForm(data, 'projectAdjustRiskForm');
                CloudUtils.setForm(data, 'infoForm');
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
        errorCallback: function(data) {
            bootbox.alert(data.resultNote);
            return false;
        }
    };
    CloudUtils.ajax(options);
}

//同意流程
function agree() {
    var options = {
        url: '../../tradfact/projectAdjust/bpm/auditProcess',
        data: JSON.stringify(getData()),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote, function() {
                window.location.href = '../../project/agencyTask/agencyTask.html';
            });
        }
    };
    CloudUtils.ajax(options);
}

function saveFun(){
	if(taskDefKey == "usertask3"){
	 $('#projectAdjustRiskForm').data('bootstrapValidator').validate();
	 if (!$('#projectAdjustRiskForm').data('bootstrapValidator').isValid()) {
	        //校验不通过 
	        return false;
	    }
	}
	agree();
}
function reapply(){
    var options = {
        url: '../../tradfact/projectAdjust/bpm/reApply',
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

function getData(){
    var buyFiles = $("#buyFiles").bootstrapTable('getData');
    var saleFiles = $("#saleFiles").bootstrapTable('getData');
    var guaranteeFiles = $("#guaranteeFiles").bootstrapTable('getData');
    var tranFiles = $("#tranFiles").bootstrapTable('getData');
    var data = CloudUtils.convertAllJson('infoForm');
    var jsonData = eval("(" + data + ")");
    jsonData['agree'] = $("#agree").val();
    jsonData.taskId = taskId;
    jsonData.siteInfo = $("#siteInfo").val();
    jsonData.clientInfo = $("#clientInfo").val();
    jsonData.discussInfo = $("#discussInfo").val();
    jsonData.siteRiskInfo = $("#siteRiskInfo").val();
    jsonData.clientRiskInfo = $("#clientRiskInfo").val();
    jsonData.discussRiskInfo = $("#discussRiskInfo").val();
    jsonData.projectId = $("#projectId").val();
    jsonData.procInstId = procInstId;
    jsonData.advice = $.trim($("#advice").val());
    jsonData['buyFiles'] = buyFiles;
    jsonData['saleFiles'] = saleFiles;
    jsonData['guaranteeFiles'] = guaranteeFiles;
    jsonData['tranFiles'] = tranFiles;
    return jsonData;
}

function readOrWrite(){
	if(taskDefKey == "usertask1"){
		$("#siteInfo").attr("readOnly",false);
		$("#clientInfo").attr("readOnly",false);
		$("#discussInfo").attr("readOnly",false);
	}
	if(taskDefKey == "usertask1" || taskDefKey == "usertask2" ){
		$("#risk").hide();
	}
	if(taskDefKey == "usertask3"){
		$("#siteRiskInfo").attr("readOnly",false);
		$("#clientRiskInfo").attr("readOnly",false);
		$("#discussRiskInfo").attr("readOnly",false);
	}
}
function formValidator() {
    $('#projectAdjustRiskForm').bootstrapValidator({
            message: 'This value is not valid',
            excluded: ':disabled',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
            	siteRiskInfo:{
            		validators:{
            			notEmpty:{message:'现场调查材料清单不能为空'},
            		}
            	},
            	clientRiskInfo:{
            		validators:{
            			notEmpty:{message:'客户材料补充清单不能为空'},
            		}
            	},
            	discussRiskInfo:{
            		validators:{
            			notEmpty:{message:'商讨及确认问题清单不能为空'},
            		}
            	}
            }
        })
        .on('success.form.bv', function(e) {
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