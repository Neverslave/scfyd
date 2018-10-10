$(document).ready(function() {
    $("form").attr("autocomplete", "off");
    CloudUtils.getMenuNames("nav");

    $('#contractInfoModal').on('hidden.bs.modal', function() {
        $("#contractSearchForm")[0].reset();
    });

    $("#financeStartDay").val(store.get("serverDate"));
    $("#loanDate").val(store.get("serverDate"));

    ajaxProGuarantee();
    formValidator();
    numFormat();
});

function start() {
    if (!$('#contractNo').val()) {
        bootbox.alert("请选择合同信息");
        return false;
    }

    $('#addForm').data('bootstrapValidator').validate();
    if (!$('#addForm').data('bootstrapValidator').isValid()) {
        //校验不通过 
        return false;
    }

    var data = CloudUtils.convertStringJson('addForm');
    var options = {
        url: '../../../loanInfo/startProcess',
        data: data,
        callBackFun: function(data) {
            if (data.result == 0) {
                bootbox.alert(data.resultNote, function() {
                    window.location.href = '../../../project/ssmManager/LoanInfoManager/LoanInfoManager.html';
                });
            } else {
                bootbox.alert(data.resultNote);
                return false;
            }
        },
        errorCallback: function(data) {
            bootbox.alert("error");
            return false;
        }
    };
    CloudUtils.ajax(options);
}

function searchContract() {
    $("#contractInfoModal").modal();
    initContractListTable();
}

function searchContractNo() {
    initContractListTable();
}

function initContractListTable() {
    $('#contractListTable').bootstrapTable('destroy');
    $("#contractListTable").bootstrapTable({
        method: "post",
        url: "../../../loanInfo/contractInfo",
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
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                contractNo: $("#contract_no").val()
            };
            return JSON.stringify(param);
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
            field: 'contractNo',
            title: '合同编号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'orderBatchId',
            title: '订单批次号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'recOrderAmt',
            title: '接收订单金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'crReqTotalAmt',
            title: '超人所需费用总额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'currentRepayDate',
            title: '最后还款日',
            align: 'center',
            valign: 'middle'
        }]
    });
}

function ajaxProGuarantee() {
    var options = {
        url: '../../../finance/getProGuarantee',
        data: '{"productId":"product02"}',
        callBackFun: function(data) {
            if (data.result == 0) {
                // 保证金比例
                $("#guaranteeMoneyRate").val(data.guaranteeRate);
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

function calInterestList() {
    // 保证金计算
    var rows = $('#contractListTable').bootstrapTable('getSelections');
    if (rows.length > 0) {
        var row = $('#contractListTable').bootstrapTable('getSelections')[0];
        $('#contractNo').val(row.contractNo);
        $('#orderBatchId').val(row.orderBatchId);
        $('#orderAcceptMoney').val(row.recOrderAmt);
        $('#orderAllMoney').val(row.crReqTotalAmt);
        $('#loanAmt').val(row.crReqTotalAmt);
        $('#financeDueDay').val(row.currentRepayDate);

        var guaranteeMoneyRate = $("#guaranteeMoneyRate").val();
        var loanAmt = $("#loanAmt").val();
        var guaranteeMoney = CloudUtils.Math(loanAmt, CloudUtils.Math(guaranteeMoneyRate, 100, "div"), "mul");
        $("#guaranteeMoney").val(guaranteeMoney);
    }

}

//form验证规则
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
                guaranteeMoneyActual: {
                    validators: {
                        notEmpty: { message: '实缴保证金不能为空' },
                        callback: {
                            message: '实缴保证金要在0~1,000,000,000之间',
                            callback: function(value, validator) {
                                return parseFloat(value) > 0 && parseFloat(value) < 1000000000;
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
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
        });
}

function numFormat() {
    $("#orderAcceptMoney").number(true, 2);
    $("#orderAllMoney").number(true, 2);
    $("#loanAmt").number(true, 2);
    $("#guaranteeMoneyRate").number(true, 2);
    $("#guaranteeMoney").number(true, 2);
    $("#guaranteeMoneyActual").number(true, 2);
}
