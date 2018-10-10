$(document).ready(function () {
    if(isDetail){
        initFileTable("taskInfo #buyFiles", "material_type_buy");
        initFileTable("taskInfo #saleFiles", "material_type_buy");
        initFileTable("taskInfo #guaranteeFiles", "material_type_guarantee");
        initFileTable("taskInfo #tranFiles", "material_type_tran");
    }else {
        initFileTable("projectInfo #buyFiles", "material_type_buy");
        initFileTable("projectInfo #saleFiles", "material_type_buy");
        initFileTable("projectInfo #guaranteeFiles", "material_type_guarantee");
        initFileTable("projectInfo #tranFiles", "material_type_tran");
    }
    if (isDetail) {
        loadDictByParent("taskInfo");
    }else{
        loadDict();
    }
    loadTaskData();
    if (taskDefKey == 'usertask1') {
        $(".btnUpload").show();
    } else {
        $(".btnUpload").hide();
        $('#projectInfo .table').bootstrapTable('hideColumn', 'operation');
    }

    debugger
    if("usertask5" == taskDefKey){
    	$("#risk").show();
    	$("#userName").attr("disabled",false);
    	$("#realName").attr("disabled",false);
    }
    formValidator();
    numFormat();
});




function loadView(doc) {
    if (doc) {
        var obj = JSON.parse(doc);
        if (!obj.editable) {
            $('.form-control').attr("disabled", "disabled");
            $('#advice').attr("disabled", false);
            $('#taskInfo .table').bootstrapTable('hideColumn', 'operation');
        }
        var editableExclusion = obj.editableExclusion;
        if (editableExclusion) {
            for (var i = 0; i < editableExclusion.length; i++) {
                $('#' + editableExclusion[i]).attr("disabled", false);
            }
        }
        var visibleExclusion = obj.visibleExclusion;
        if (visibleExclusion) {
            for (var i = 0; i < visibleExclusion.length; i++) {
                $('#' + visibleExclusion[i]).hide();
            }
        }
    }
    if (isDetail) {
        $('#taskInfo .form-control').attr("disabled", "disabled");
        // $('#advice').attr("disabled", false);
        $('#taskInfo .table').bootstrapTable('hideColumn', 'operation');
    }

}

function loadTaskData() {
    var data = {};
    var url = "";
    if (isDetail) {
        url = '../../activiti/findDataByTaskId';
        data.taskId = store.get('agencyRow').taskId; //从缓存中获取数
    } else {
        url = '../../tradfact/project/bpm/getTaskDataByTaskId';
        data.taskId = taskId;
    }
    var options = {
        url: url,
        data: JSON.stringify(data),
        callBackFun: function (data) {
            debugger;
            if (data.result == 0) {
                var tables;
                data = eval("(" + data.str + ")");
                loadView(data.doc);
                if (isDetail) {
                    tables = $("#taskInfo .table");
                    CloudUtils.setForm(data, 'taskInfo #infoForm');
                } else {
                    tables = $("#projectInfo .table");
                    CloudUtils.setForm(data, 'projectInfo #infoForm');
                }
                for (var i = 0; i < tables.length; i++) {
                    var id = $(tables[i]).attr('id');
                    if (data[id]) {
                        if (isDetail) {
                            $('#taskInfo #' + id).bootstrapTable("append", data[id]);
                        } else {
                            $('#projectInfo #' + id).bootstrapTable("append", data[id]);
                        }
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

function checkFiles(list) {
    if (list == null || list.length === 0) {
        return false;
    }
    return true;
}

function saveFun() {
    agree();
}


function getData() {
    var buyFiles = $("#buyFiles").bootstrapTable('getData');
    var saleFiles = $("#saleFiles").bootstrapTable('getData');
    var guaranteeFiles = $("#guaranteeFiles").bootstrapTable('getData');
    var tranFiles = $("#tranFiles").bootstrapTable('getData');
    var data = CloudUtils.convertAllJson('infoForm');
    var jsonData = eval("(" + data + ")");
    jsonData['agree'] = $("#agree").val();
    jsonData.taskId = taskId;
    jsonData.procInstId = procInstId;
    jsonData.advice = $.trim($("#advice").val());
    jsonData['buyFiles'] = buyFiles;
    jsonData['saleFiles'] = saleFiles;
    jsonData['guaranteeFiles'] = guaranteeFiles;
    jsonData['tranFiles'] = tranFiles;
    return jsonData;
}

//同意流程
function agree() {
    var options = {
        url: '../../tradfact/project/bpm/auditProcess',
        data: JSON.stringify(getData()),
        callBackFun: function (data) {
            bootbox.alert(data.resultNote, function () {
                window.location.href = '../../project/agencyTask/agencyTask.html';
            });
        }
    };
    CloudUtils.ajax(options);
}

//再申请
function reapply() {
    var options = {
        url: '../../tradfact/project/bpm/reApply',
        data: JSON.stringify(getData()),
        callBackFun: function (data) {
            bootbox.alert(data.resultNote, function () {
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


function submit() {
    var buyFiles = $("#buyFiles").bootstrapTable('getData');
    var saleFiles = $("#saleFiles").bootstrapTable('getData');
    var guaranteeFiles = $("#guaranteeFiles").bootstrapTable('getData');
    var tranFiles = $("#tranFiles").bootstrapTable('getData');
    if (!checkFiles(buyFiles)) {
        bootbox.alert("请上传买方材料 ！");
        return;
    }
    if (!checkFiles(saleFiles)) {
        bootbox.alert("请上传卖方材料！");
        return;
    }

    if (!checkFiles(guaranteeFiles)) {
        bootbox.alert("请上传担保方材料！");
        return;
    }

    if (!checkFiles(tranFiles)) {
        bootbox.alert("请上传交易基础材料 ！");
        return;
    }

    $('#infoForm').data('bootstrapValidator').validate();
    if (!$('#infoForm').data('bootstrapValidator').isValid()) {
        //没有通过校验 
        return false;
    } else {
        var data = CloudUtils.convertStringJson('infoForm');
        var jsonData = eval("(" + data + ")");
        jsonData['buyFiles'] = buyFiles;
        jsonData['saleFiles'] = saleFiles;
        jsonData['guaranteeFiles'] = guaranteeFiles;
        jsonData['tranFiles'] = tranFiles;

        var options = {
            url: '../../tradfact/project/startProcess',
            data: JSON.stringify(jsonData),
            callBackFun: function (data) {
                if (data.result == 0) {
                    bootbox.alert(data.resultNote, function () {
                        window.location.href = "../../homePage.html";
                    });
                } else {
                    return false;
                }
            },
            errorCallback: function (data) {
                return false;
            }
        };
        CloudUtils.ajax(options);
    }

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
            projectName: {
                validators: {
                    notEmpty: {
                        message: '项目名称不能为空'
                    },
                    stringLength: {
                        max: 32,
                        message: '项目名称不能超过32'
                    }
                }
            },
            nameBuy: {
                validators: {
                    notEmpty: {
                        message: '买方名称不能为空'
                    },
                    stringLength: {
                        max: 32,
                        message: '买方名称不能超过32'
                    }
                }
            },
            orgnNumBuy: {
                validators: {
                    regexp: {
                        regexp: /[A-Z0-9]{18}/,
                        message: '社会统一信用代码证号格式为18位大写拉丁字母及数字混合'
                    },
                    notEmpty: {
                        message: '社会统一信用代码不能为空'
                    },
                    stringLength: {
                        max: 18,
                        message: '社会统一信用代码证号长度不能超过18'
                    }
                }
            },
            nameSale: {
                validators: {
                    notEmpty: {
                        message: '卖方名称不能为空'
                    },
                    stringLength: {
                        max: 32,
                        message: '卖方名称不能超过32'
                    }
                }
            },
            orgnNumSale: {
                validators: {
                    regexp: {
                        regexp: /[A-Z0-9]{18}/,
                        message: '社会统一信用代码证号格式为18位大写拉丁字母及数字混合'
                    },
                    notEmpty: {
                        message: '社会统一信用代码不能为空'
                    },
                    stringLength: {
                        max: 18,
                        message: '社会统一信用代码证号长度不能超过18'
                    }
                }
            },
            creditAmount: {
                validators: {
                    notEmpty: {
                        message: '授信金额不能为空'
                    }
                }
            },
            creditTerm: {
                validators: {
                    notEmpty: {
                        message: '授信期限不能为空'
                    },
                    regexp: {
                        regexp: /^\d+$/,
                        message: '只能输入整数'
                    }
                }
            },
            financingTerm: {
                validators: {
                    regexp: {
                        regexp: /^\d+$/,
                        message: '只能输入整数'
                    }
                }
            },
            interestRate: {
                validators: {
                    numeric: {message: '只能输入数字'},
                    callback: {
                        message: '利率在0~100之间',
                        callback: function (value, validator) {
                            return Number(value) >= 0 && Number(value) <= 100;
                        }
                    }
                }
            },
            manageFeeRate: {
                validators: {
                    numeric: {message: '只能输入数字'},
                    callback: {
                        message: '管理费比例在0~100之间',
                        callback: function (value, validator) {
                            return Number(value) >= 0 && Number(value) <= 100;
                        }
                    }
                }
            },
            returnRate: {
                validators: {
                    numeric: {message: '只能输入数字'},
                    callback: {
                        message: '内含报酬率在0~100之间',
                        callback: function (value, validator) {
                            return Number(value) >= 0 && Number(value) <= 100;
                        }
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
    });
}

function numFormat() {
    $("#creditAmount").number(true, 2);
    $("#financingAmount").number(true, 2);
    $("#manageFeeAmount").number(true, 2);
    $("#reapymentAmount").number(true, 2);
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
        $('#riskManager').val(row.realName);
        $("#userId").val(row.userId);
    }

}