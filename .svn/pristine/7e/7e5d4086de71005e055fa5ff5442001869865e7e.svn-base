$(document).ready(function() {
    CloudUtils.getMenuNames("nav");
    dateload();
    setForm();
    initTable();
    formValidator();
    numFormat();
    // $("input").change(function() {
    //     $('#infoForm').data('bootstrapValidator').validate();
    // });

    //     $('#paidDate')  
    //     .on('changeDate show', function(e) {  
    //         // Revalidate the date when user change it  
    //         $('#infoForm').bootstrapValidator('revalidateField', 'datetime');  
    // });  
});

function numFormat() {
    $("#sumPrincipal").number(true, 2);
    $("#sumInterest").number(true, 2);
    $("#paidPrincipal").number(true, 2);
    $("#paidInterest").number(true, 2);
    $("#offsetGap").number(true, 2);
}



function loadCWView() {
    $('input').attr("disabled", true);
}

function getTaskData() {
    var data = {};
    data.taskId = taskId;
    var options = {
        url: '../../activiti/getTaskDataByTaskId',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            if (data.result == 0) {
                var jsonData = eval("(" + data.str + ")");
                CloudUtils.setForm(jsonData, 'infoForm');


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

function save() {
    $('#infoForm').data('bootstrapValidator').validate();
    if (!$('#infoForm').data('bootstrapValidator').isValid()) {
        //没有通过校验 
        return;
    }
    startProcess();

}


function cancel() {
    window.location.href = "../../homePage.html";
}

function change() {
    setForm();
    initTable();
}

//并发起流程
function startProcess() {
    var status = {};
    var repaymentId='';
    var guaranteeBalance={};//保证金
	var currentPayablePrincipal ={};//本期应还金额
    var dataTemp = CloudUtils.convertStringJson('infoForm');
    var jsonData = eval("(" + dataTemp + ")");
    var temp = $('#repaymentListTable').bootstrapTable('getData');
    for (var i = 0; i < temp.length; i++) {
        status[temp[i].orderBatchId] = temp[i].status;
        repaymentId += ","+temp[i].repaymentId;
        currentPayablePrincipal[temp[i].contractNo] = temp[i].currentPayablePrincipal;
        if (temp[i].status=="0") {
            guaranteeBalance[temp[i].contractNo] = temp[i].guaranteeBalance;
        }
    }
    jsonData.status = JSON.stringify(status);
    jsonData.repaymentId = repaymentId;
    jsonData.guaranteeBalance = JSON.stringify(guaranteeBalance);
    jsonData.currentPayablePrincipal = JSON.stringify(currentPayablePrincipal);
    var options = {
        url: '../../ssmRepay/startProcess',
        data: JSON.stringify(jsonData),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote, function() {
                window.location.href = 'repayManager.html';
            });
        }
    };
    CloudUtils.ajax(options);
}



//同意流程
// function agree() {
//     var dataTemp = CloudUtils.convertStringJson('infoForm');
//     var jsonData = eval("(" + dataTemp + ")");
//     jsonData.agree = '0';
//     jsonData.taskId = taskId;
//     var options = {

//         url: '../../ssmRepay/doAgree',
//         data: JSON.stringify(jsonData),
//         callBackFun: function(data) {
//             bootbox.alert(data.resultNote);
//         }
//     };
//     CloudUtils.ajax(options);
// }

function updateStatus() {
    var data = {};
    data.repayDate = $("#repayDate").val();
    var options = {
        url: '../../ssmRepay/updateStatus',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote);
        }
    };
    CloudUtils.ajax(options);
}

function setForm() {
    var data = {};
    data.repayDate = $("#repayDate").val();
    var options = {
        url: '../../ssmRepay/sum',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            var temp = data.dataList[0];
            CloudUtils.setForm(temp, 'infoForm');

        }
    };
    CloudUtils.ajax(options);

}


function dateload() {
    $('#repayDate').val(store.get("serverDate"));
    $('#repayDate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        initialDate: new Date(), //初始化当前日期
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month'　　　　 // 日期时间选择器所能够提供的最精确的时间选择视图。
    });
    // $("#paidDate").datetimepicker("setEndDate", new Date());
    $('#paidDate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        initialDate: new Date(), //初始化当前日期
        pickerPosition: "bottom-left",
        minuteStep: 5,
        endDate: new Date(),
        format: 'yyyy-mm-dd',
        minView: 'month'　　　　 // 日期时间选择器所能够提供的最精确的时间选择视图。
    }).on('hide', function(e) {
        $('#infoForm').data('bootstrapValidator')
            .updateStatus('paidDate', 'NOT_VALIDATED', null)
            .validateField('paidDate');

    });
}



function initTable() {
    $('#repaymentListTable').bootstrapTable('destroy');
    $("#repaymentListTable").bootstrapTable({
        method: "post",
        url: "../../ssmRepay/repayPlan",
        striped: true, //表格显示条纹  
        pagination: false, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数  
            var param = {
                repayDate: $("#repayDate").val(),
                superRepayStatus: "0"
                    // pageNumber: params.pageNumber,
                    // pageSize: params.pageSize
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
            field: 'orderBatchId',
            title: '订单批次号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'crReqAmt',
            title: '超人所需总费用',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'crReqAmt',
            title: '放款金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'currentPayablePrincipal',
            title: '本期应还本金金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'currentPayableInterest',
            title: '本期应还利息金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'guaranteeMoneyRate',
            title: '保证金比例',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'payActGuarantee',
            title: '保证金金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'guaranteeBalance',
            title: '保证金余额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'offsetGap',
            title: '保证金冲抵金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                if (!value) {
                    return $.number(0, 2);
                }
                return $.number(value, 2);
            }
        }, {
            field: 'status',
            title: '是否保证金冲抵',
            align: 'center',
            valign: 'middle',
            events: 'operateEvents',
            formatter: function(value, row, index) {
                var d = '<a class = "is" style="color:#278bdd;padding:0px 5px;" href="javascript:void(0)">否</a>';
                var e = '<a class = "no" style="color:#278bdd;padding:0px 5px;"  href="javascript:void(0)">是</a>';
                if (value == "0") {
                    return e;
                } else {
                    row.status = 1;
                    return d;
                }
            }
        }, {
            field: 'operation',
            title: '接收订单明细',
            align: 'center',
            valign: 'middle',
            events: 'operateEvents2',
            formatter: function(value, row, index) {
                var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
                return d;
            }
        }, {
            field: 'operation',
            title: '还款计划',
            align: 'center',
            valign: 'middle',
            events: 'operateEvents',
            formatter: function(value, row, index) {
                var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
                return d;
            }
        }]
    });
}



window.operateEvents = {
    'click .detail': function(e, value, row, index) {
        $("#repayModal").modal("show");
        initRepayPlanTable(row.orderBatchId);
    },
    'click .is': function(e, value, row, index) {
        row.status = '0';
        row.offsetGap = (Number(row.currentPayablePrincipal) * Number(row.guaranteeMoneyRate) / 100).toFixed(2);
        var result = Number(row.guaranteeBalance) - Number(row.offsetGap);
        if (result >= 0) {
            row.guaranteeBalance = result;
        } else {
            row.offsetGap = Number(row.guaranteeBalance);
            row.guaranteeBalance = 0;

        }
        $("#repaymentListTable").bootstrapTable('updateRow', { row:row, index:index});
        var offsetGap = Number($("#offsetGap").val());
        offsetGap = offsetGap + Number(row.offsetGap);
        $("#offsetGap").val(offsetGap);

    },
    'click .no': function(e, value, row, index) {
        var offsetGap = Number($("#offsetGap").val());
        offsetGap = offsetGap - Number(row.offsetGap);
        $("#offsetGap").val(offsetGap);
        row.guaranteeBalance = Number(row.guaranteeBalance) + Number(row.offsetGap);
        row.offsetGap = 0;
        row.status = '1';
        $("#repaymentListTable").bootstrapTable('updateRow', { row:row, index:index});

    },
    'click .stu_file': function(e, value, row, index) {
        var data = { stuId: row.stuId };
        data = JSON.stringify(data);
        var options = {
            url: '../../sign/stuFileInfo',
            data: data,
            callBackFun: function(data) {
                $("#imgs").html("");
                var dataList = data.dataList;
                for (var i = 0; i < dataList.length; i++) {
                    var temp = dataList[i];
                    // var img = "<img src='"+temp.stuFile+"'/>"

                    var img = ReferrerKiller.imageHtml(temp.stuFile);
                    // var img = "<img src='" + temp.stuFile + "' style='width:100%;hight:200px'/>"
                    $("#imgs").append(img);

                }
                $("#stuImg").modal("show");
            }
        };
        CloudUtils.ajax(options);
    }
};

window.operateEvents2 = {
    'click .detail': function(e, value, row, index) {
        $("#orderModal").modal("show");
        initOrderListTable(row.orderBatchId);
    }
};


function initRepayPlanTable(orderBatchId) {
    $('#repayPlanListTable').bootstrapTable('destroy');
    $("#repayPlanListTable").bootstrapTable({
        method: "post",
        url: "../../sign/repayListPage",
        striped: false, //表格显示条纹  
        pagination: true, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) {
            var jsonData = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                orderBatchId: orderBatchId
            };
            return JSON.stringify(jsonData);
            // return JSON.stringify({});
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
            field: 'orderId',
            title: '订单号',
            align: 'center',
            valign: 'top',
            width: 80

        }, {
            field: 'stuName',
            title: '学生姓名',
            align: 'center',
            valign: 'top',
            width: 80,
            visible: false

        }, {
            field: 'idCard',
            title: '身份证号',
            align: 'center',
            valign: 'top',
            width: 80,
            visible: false

        }, {
            field: 'mobilePhone',
            title: '联系方式',
            align: 'center',
            valign: 'top',
            width: 80,
            visible: false

        }, {
            field: 'productAmt',
            title: '应收账款<br>总额',
            align: 'center',
            valign: 'top',
            width: 75,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }, {
            field: 'crReqAmt',
            title: '保理融资<br>投放金额',
            align: 'center',
            valign: 'top',
            width: 75,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }, {
            field: 'payM',
            title: '每期应收<br>账款金额',
            align: 'center',
            valign: 'top',
            width: 75,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }, {
            field: 'currentRepayDate',
            title: '每期应收账<br>款到期日',
            align: 'center',
            valign: 'middle',
            width: 110

        }, {
            field: 'period',
            title: '期数',
            align: 'center',
            valign: 'middle',
            width: 50

        }, {
            field: 'superRepayStatus',
            title: '是否<br>还款',
            align: 'center',
            valign: 'middle',
            width: 50,
            formatter: function(value) {
            	if(value==1){
            		return "是";
            	}else{
            		return "否"
            	}
            }

        }, {
            field: 'currentRepayDate',
            title: '每期保理融<br>资到账日',
            align: 'center',
            valign: 'middle',
            width: 110

        }, {
            field: 'currentPayablePrincipal',
            title: '每期保理融<br>资本金到账<br>金额',
            align: 'center',
            valign: 'middle',
            width: 115,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }, {
            field: 'currentPayableInterest',
            title: '每期保理融<br>资利息到账<br>金额',
            align: 'center',
            valign: 'middle',
            width: 115,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }]
    });
}


function initOrderListTable(orderBatchId) {
    $('#orderListTable').bootstrapTable('destroy');
    $("#orderListTable").bootstrapTable({
        method: "post",
        url: "../../sign/orderList",
        striped: false, //表格显示条纹  
        pagination: true, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) {
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                orderBatchId: orderBatchId,
                orderStatus:'1'
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
            field: 'productName',
            title: '产品名称',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'productAmt',
            title: '产品金额',
            align: 'center',
            valign: 'middle',
            width: 100,
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'period',
            title: '分期期数',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'productAmt',
            title: '分期总费用',
            align: 'center',
            valign: 'middle',
            width: 100,
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'sellerId',
            title: '商家id',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'sellerName',
            title: '商家名称',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'crReqAmt',
            title: '超人所需费用',
            align: 'center',
            valign: 'middle',
            width: 100,
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'startPayAmt',
            title: '首付金额',
            align: 'center',
            valign: 'middle',
            width: 100,
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'payM',
            title: '每期还款金额',
            align: 'center',
            valign: 'middle',
            width: 100,
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'startPayDay',
            title: '首期还款日期',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'stuName',
            title: '姓名',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'gender',
            title: '性别',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'birthDate',
            title: '出身年月',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'age',
            title: '年龄',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'idCard',
            title: '身份证',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'mobilePhone',
            title: '联系方式',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'schoolName',
            title: '学校',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'grade',
            title: '年级',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'graduateDate',
            title: '毕业时间',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'file',
            title: '相关图片',
            align: 'center',
            valign: 'middle',
            width: 100,
            events: 'operateEvents',
            formatter: function() {
                return "<a class='stu_file' href='javascript:void(0)'>查看</a>";
            }
        }]
    });
}



//form验证规则
function formValidator() {
    $('#infoForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                paidDate: {
                    validators: {
                        notEmpty: {
                            message: '资金到账日期不能为空'
                        }
                        // callback: {
                        //     message: '资金到账日期不能为空',
                        //     callback: function(value, validator, $field, options) {
                        //         return $("#repayDate").val() != "";

                        //     }
                        // }
                    }
                },
                paidPrincipal: {
                    validators: {
                        notEmpty: {
                            message: '本金到账金额不能为空'
                        },
                        callback: {
                            message: '本金金额不能超过10亿',
                            callback: function(value, validator, $field, options) {
                                return Number($("#paidPrincipal").val()) < 1000000000;

                            }
                        }
                    },

                },
                paidInterest: {
                    validators: {
                        notEmpty: {
                            message: '利息到账金额不能为空'
                        },
                        callback: {
                            message: '利息金额不能超过10亿',
                            callback: function(value, validator, $field, options) {
                                return Number($("#paidInterest").val()) < 1000000000;

                            }
                        }
                    },

                },
                sumPrincipal: {
                    validators: {
                        notEmpty: {
                            message: '利应还本金总额不能为空'
                        }
                    }
                },
                sumInterest: {
                    validators: {
                        notEmpty: {
                            message: '应还利息总额不能为空'
                        }
                    }
                },
                remark: {
                    validators: {
                        notEmpty: {
                            message: '备注不能为空'
                        },
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
