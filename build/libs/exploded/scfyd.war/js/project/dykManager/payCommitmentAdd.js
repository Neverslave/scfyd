$(document).ready(function() {
    $("form").attr("autocomplete", "off");
    CloudUtils.getMenuNames("nav");
    $('#agencyModal').on('hidden.bs.modal', function() {
        $("#searchForm")[0].reset();
    });
    dateload();
    // 保证金收取比例取得
    initCarInfoListTable();
    numFormat();
    formValidator();
    // 付款日期
    $("#payDate").val(store.get("serverDate"));
    ajaxFileUpload();
    downloadTemp();
});

function dateload() {
    $('#financeStartDate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month',
        // 日期时间选择器所能够提供的最精确的时间选择视图。
        initialDate: new Date()
    }).on("click", function() {
        $("#financeStartDate").datetimepicker("setEndDate", $("#financeEndDate").val());
        $("#financeStartDate").datetimepicker("setStartDate", CloudUtils.addDays($("#financeEndDate").val(), -120));
    }).on('hide', function(e) {
        $('#addForm').data('bootstrapValidator')
            .updateStatus('financeStartDate', 'NOT_VALIDATED', null)
            .validateField('financeStartDate');
        $('#addForm').data('bootstrapValidator')
            .updateStatus('financeEndDate', 'NOT_VALIDATED', null)
            .validateField('financeEndDate');
    });

    $('#financeEndDate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month',
         // 日期时间选择器所能够提供的最精确的时间选择视图。
        initialDate: new Date()
    }).on("click", function() {
        $("#financeEndDate").datetimepicker("setStartDate", $("#financeStartDate").val());
        $("#financeEndDate").datetimepicker("setEndDate", CloudUtils.addDays($("#financeStartDate").val(), 120));
    }).on('hide', function(e) {
        $('#addForm').data('bootstrapValidator')
            .updateStatus('financeStartDate', 'NOT_VALIDATED', null)
            .validateField('financeStartDate');
        $('#addForm').data('bootstrapValidator')
            .updateStatus('financeEndDate', 'NOT_VALIDATED', null)
            .validateField('financeEndDate');
    });
}

function initCarInfoListTable() {
    $('#carInfoListTable').bootstrapTable('destroy');
    $("#carInfoListTable").bootstrapTable({
        method: "post",
        url: "",
        striped: true, //表格显示条纹  
        pagination: false, //启动分页  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数  
            return null;
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
            field: 'fileUrl',
            title: '附件地址',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'fileName',
            title: '附件名称',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                var s = '<a target="view_window" href="/../..' + row.fileUrl + '" download="' + value + '">' + value + '</a>';
                return s;

            }
        }, {
            field: 'fileType',
            title: '文件格式',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'fileSize',
            title: '文件大小(KB)',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="attach" href="javascript:void(0)"></a>';
                return r;
            },
            events: 'operateEvents'
        }]
    });
}

window.operateEvents = {
    'click .remove': function(e, value, row, index) {
        $('#carInfoListTable').bootstrapTable('remove', { field: 'fileUrl', values: [row.fileUrl] });
        $("#fileupload").val("");
        $("#payM").val("0");
        $('#addForm').data('bootstrapValidator').updateStatus('payM', 'NOT_VALIDATED').validateField('payM');
        if (!CloudUtils.isEmpty($("#agencyNum").val())) {
            chgPayM();
        } else {
            $("#guaranteeAmt").val("0");
        }
    }
};

function searchAgency() {
    initAgencyListTable();
}

function initAgencyListTable() {
    $('#agencyListTable').bootstrapTable('destroy');
    $("#agencyListTable").bootstrapTable({
        method: "post",
        url: "../../commitment/agencyList",
        striped: true, //表格显示条纹  
        pagination: true, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        singleSelect: true, // 单选checkbox 
        clickToSelect: true, //是否启用点击选中行
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数  
            return JSON.stringify({
                pageSize: params.pageSize,
                pageNumber: params.pageNumber,
                agencyName: $("#agency_name").val(),
                agencyNum: $("#agency_num").val(),
                financeId: $("#finance_id").val()
            });
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
            field: 'agencyName',
            title: '经销商名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'agencyNum',
            title: '经销商代码',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'financeId',
            title: '融资编号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'maxCredit',
            title: '最高授信额度',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'availableCredit',
            title: '可用授信额度',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'payActGuarantee',
            title: '实缴保证金金额',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'financeStartDate',
            title: '付款承诺函起始日',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'financeEndDate',
            title: '付款承诺函到期日',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'financeAmount',
            title: '融资金额',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'corpId',
            title: '企业ID',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'contractNo',
            title: '合同编号',
            align: 'center',
            valign: 'middle',
            visible: false
        }]
    });
}

function ajaxProGuarantee(productId) {
	var data = {productId:productId};
    var options = {
        url: '../../finance/getProGuarantee',
        data:  JSON.stringify(data),
        callBackFun: function(data) {
            if (data.result == 0) {
                $("#guaranteeRate").val(data.guaranteeRate);
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

function checkAgency() {
    var selData = $("#agencyListTable").bootstrapTable('getSelections')[0];
    ajaxProGuarantee(selData.productId);
    CloudUtils.setForm(selData, 'addForm');
    $("#agencyModal").modal('hide');
    if (!CloudUtils.isEmpty($("#payM").val())) {
        chgPayM();
    }
}

function numFormat() {
    $("#maxCredit").number(true, 2);
    $("#availableCredit").number(true, 2);
    $("#payM").number(true, 2);
    $("#guaranteeAmt").number(true, 2);
    $("#payActGuarantee").number(true, 2);
    $("#guaranteeDiff").number(true, 2);
    $("#financeAmount").number(true, 2);
}

function chgPayM() {
    var payM = $("#payM").val();
    var guaranteeRate = $("#guaranteeRate").val();
    var payActGuarantee = $("#payActGuarantee").val();
    // 保证金金额
    var a = CloudUtils.Math(payM, guaranteeRate, "mul");
    var b = CloudUtils.Math(a, 100, "div");
    $("#guaranteeAmt").val(b);
    // 保证金差额
    var guaranteeAmt = $("#guaranteeAmt").val();
    var guaranteeDiff = CloudUtils.Math(payActGuarantee, guaranteeAmt, "sub");
    $("#guaranteeDiff").val(Math.abs(guaranteeDiff));
}

// 下载模板
function downloadTemp() {
    var options = {
        url: '../../user/configKey',
        data: '{"itemKey":"carDetailExcelTemp"}',
        callBackFun: function(data) {
            if (data.result == 0) {
                var excelUrl = "../../" + data.itemValue;
                $("#downloadTemp").attr("href",excelUrl);
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

/*// 文件上传
function upload() {
    var carListData = $("#carInfoListTable").bootstrapTable('getData');
    if (carListData.length == 1) {
        bootbox.alert("只能上传一个文件");
        return false;
    }
    $("#fileupload").click();
}*/

var fileTypes = [".xls", ".xlsx", ".xlsm"];

function checkFileType(type) {
    var result = $.inArray(type, fileTypes);
    if (result == -1) {
        return false;
    }
    return true;
}

function checkFileSize(fileSize) {
    fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
    fileSize = Math.round(fileSize / 1024);
    if (fileSize > 50) {
        return false;
    }
    return true;
}

function ajaxFileUpload() {
    $('#fileupload').fileupload({
        url: "../../file/uploadFile?pathId=3",
        dataType: 'json',
        // 上传完成后的执行逻辑
        done: function(e, data) {
            data = data.result;
            if (data.result == 0) {
                $("#carInfoListTable").bootstrapTable('append', data);
                ajaxCalPayAmt(data.fileUrl);
            } else {
                bootbox.alert(data.resultNote);
            }
        }
    });
    $('#fileupload').bind('fileuploadadd', function(e, data) {
        var obj = data.files[0];
        var name = obj.name;
        var size = obj.size;
        var type = name.substr(name.lastIndexOf(".")).toLowerCase();
        if (!checkFileType(type)) {
            bootbox.alert("仅支持excel文件,请选择正确的文件类型");
            return false;
        }
        if (!checkFileSize(size)) {
            bootbox.alert("文件大小不得超过50M");
            return false;
        }
        var carListData = $("#carInfoListTable").bootstrapTable('getData');
        if (carListData.length == 1) {
            bootbox.alert("只能上传一个文件");
            return false;
        }
    });

}

function save() {
    if (!$('#agencyName').val()) {
        bootbox.alert("请选择经销商及融资信息信息");
        return false;
    }
    $('#addForm').data('bootstrapValidator').validate();
    if (!$('#addForm').data('bootstrapValidator').isValid()) {
        //没有通过校验 
        return false;
    } else {
        var carListData = $("#carInfoListTable").bootstrapTable('getData');
        if (carListData.length == 0) {
            bootbox.alert("请上传车辆明细");
            return false;
        }

        var data = CloudUtils.convertStringJson('addForm');
        var jsonData = eval("(" + data + ")");
        jsonData.carListInfo = JSON.stringify(carListData);

        var options = {
            url: "../../commitment/startProcess",
            data: JSON.stringify(jsonData),
            callBackFun: function(data) {
                if (data.result == 0) {
                    bootbox.alert(data.resultNote, function() {
                        window.location.href = '../../project/dykManager/payCommitmentManager.html';
                    });
                } else {
                    bootbox.alert(data.resultNote);
                    return false;
                }
            },
            errorCallback: function(data) {
                bootbox.alert("error");
            }
        };
        CloudUtils.ajax(options);
    }
}

function formValidator() {
    $('#addForm').bootstrapValidator({
            message: 'This value is not valid',
            excluded: ':disabled',
            group: ".valid_group",
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                financeStartDate: {
                    validators: {
                        notEmpty: {
                            message: '付款承诺函起始日不能为空'
                        },
                        callback: {
                            message: '付款承诺函起始日需要小于付款承诺函到期日,且不能超过120天',
                            callback: function(value, validator, $field, options) {
                                var financeEndDate = $('#addForm').find("input[name='financeEndDate']").val();
                                if (financeEndDate) {
                                    var n = CloudUtils.DateDiffSec(financeEndDate, value);

                                    return (n >= 1 && n <= 120);
                                } else {
                                    return true;
                                }

                            }
                        }
                    }
                },
                financeEndDate: {
                    validators: {
                        notEmpty: {
                            message: '付款承诺函到期日不能为空'
                        }
                    },
                    callback: {
                        message: '付款承诺函到期日需要大于付款承诺函起始期日,且不能超过120天',
                        callback: function(value, validator, $field, options) {
                            var financeStartDate = $('#addForm').find("input[name='financeStartDate']").val();
                            if (financeStartDate) {
                                var n = CloudUtils.DateDiffSec(value, financeStartDate);

                                return (n >= 1 && n <= 120);
                            } else {
                                return true;
                            }

                        }
                    }
                },
                payM: {
                    validators: {
                        callback: {
                            message: '付款金额要在0~1,000,000,000之间',
                            callback: function(value, validator) {
                                return parseFloat(value) > 0 && parseFloat(value) <= 1000000000;
                            }
                        }
                    }
                },
                note: {
                    validators: {
                        notEmpty: { message: '备注不能为空' },
                        stringLength: {
                            max: 128,
                            message: '备注长度不能超过128'
                        },
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
        });
}

function ajaxCalPayAmt(fileUrl) {
    var options = {
        url: "../../commitment/calculationCash",
        data: JSON.stringify({
            fileUrl: fileUrl
        }),
        callBackFun: function(data) {
            if (data.result == 0) {
                $("#addForm #payM").val(data.str);
                $('#addForm').data('bootstrapValidator').updateStatus('payM', 'NOT_VALIDATED').validateField('payM');
                if (!CloudUtils.isEmpty($("#agencyNum").val())) {
                    chgPayM();
                } else {
                    // 保证金金额
                    var payM = $("#payM").val();
                    var guaranteeRate = $("#guaranteeRate").val();
                    var a = CloudUtils.Math(payM, guaranteeRate, "mul");
                    var b = CloudUtils.Math(a, 100, "div");
                    $("#guaranteeAmt").val(b);
                }
            } else {
                bootbox.alert(data.resultNote);
                return false;
            }
        },
        errorCallback: function(data) {
            bootbox.alert("error");
        }
    };
    CloudUtils.ajax(options);
}