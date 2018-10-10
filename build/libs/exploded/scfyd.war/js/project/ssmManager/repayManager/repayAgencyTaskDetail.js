$(document).ready(function() {
    getTaskData();
    numFormat();

});

function numFormat() {
    $("#sumPrincipalDetail").number(true, 2);
    $("#sumInterestDetail").number(true, 2);
    $("#paidPrincipalDetail").number(true, 2);
    $("#paidInterestDetail").number(true, 2);
}

function getTaskData() {
    var row = store.get('agencyRow'); //从缓存中获取数据
    var taskId = row.taskId;
    var options = {
        url: '../../activiti/findDataByTaskId',
        data: '{"taskId":"' + taskId + '"}',
        callBackFun: function(data) {
            if (data.result == 0) {
                var jsonData = eval("(" + data.str + ")");
                CloudUtils.setForm(jsonData, 'infoHisForm');
                initTable(jsonData.status);

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

function saveFun() {
    agree();
    // updateStatus();
}


//同意流程
function agree() {
    var guaranteeBalance = {};
    var temp = $('#repaymentListTableDetail').bootstrapTable('getData');
    for (var i = 0; i < temp.length; i++) {
        if (temp[i].status == "0") {
            guaranteeBalance[temp[i].contractNo] = temp[i].guaranteeBalance;
        }
    }
    debugger;
    var dataTemp = CloudUtils.convertStringJson('infoForm');
    var jsonData = eval("(" + dataTemp + ")");
    jsonData.agree = '0';
    jsonData.taskId = taskId;
    jsonData.guaranteeBalance = JSON.stringify(guaranteeBalance);
    jsonData.repayDate = $("#repayDateDetail").val();
    var options = {

        url: '../../ssmRepay/endProcess',
        data: JSON.stringify(jsonData),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote, function() {
                window.location.href = '../../project/agencyTask/agencyTask.html';
            });
        }
    };
    CloudUtils.ajax(options);
}

function updateStatus() {
    var data = {};
    data.repayDate = $("#repayDateDetail").val();
    var options = {
        url: '../../ssmRepay/updateStatus',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote, function() {
                window.location.href = '../../project/agencyTask/agencyTask.html';
            });
        }
    };
    CloudUtils.ajax(options);
}

function initTable(status) {
    $('#repaymentListTableDetail').bootstrapTable('destroy');
    $("#repaymentListTableDetail").bootstrapTable({
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
            debugger;
            var param = {
                repaymentId:$("#repaymentIdDetail").val(),
                status: status
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
                var d = '<a class = "is" style="color:#278bdd;padding:0px 5px;">否</a>';
                var e = '<a class = "no" style="color:#278bdd;padding:0px 5px;">是</a>';
                if (value == "0") {

                    return e;
                } else {
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
        }],
        onLoadSuccess: function() {
            debugger;
            var temp = $('#repaymentListTableDetail').bootstrapTable('getData');
            for (var i = 0; i < temp.length; i++) {
                var row = temp[i];
                var index = i;
                if (row.status == '0') {
                    row.offsetGap = (Number(row.currentPayablePrincipal) * Number(row.guaranteeMoneyRate) / 100).toFixed(2);
                    var result = Number(row.guaranteeBalance) - Number(row.offsetGap);
                    if (result >= 0) {
                        row.guaranteeBalance = result;
                    } else {
                        row.offsetGap = Number(row.guaranteeBalance);
                        row.guaranteeBalance = 0;

                    }
                    $("#repaymentListTableDetail").bootstrapTable('updateRow', { row:row, index:index});
                    // var offsetGap = Number($("#offsetGap").val());
                    // offsetGap = offsetGap + Number(row.offsetGap);
                    // $("#offsetGap").val(offsetGap);
                }
            }
        }
    });
}




function initRepayPlanTable(orderBatchId) {
    $('#repayPlanListTableDetail').bootstrapTable('destroy');
    $("#repayPlanListTableDetail").bootstrapTable({
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
            title: '应收账款总额',
            align: 'center',
            valign: 'top',
            width: 75,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }, {
            field: 'crReqAmt',
            title: '保理融资投放金额',
            align: 'center',
            valign: 'top',
            width: 75,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }, {
            field: 'payM',
            title: '每期应收账款金额',
            align: 'center',
            valign: 'top',
            width: 75,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }, {
            field: 'currentRepayDate',
            title: '每期应收账款到期日',
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
            title: '是否还款',
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
            title: '每期保理融资到账日',
            align: 'center',
            valign: 'middle',
            width: 110

        }, {
            field: 'currentPayablePrincipal',
            title: '每期保理融资本金到账金额',
            align: 'center',
            valign: 'middle',
            width: 115,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }, {
            field: 'currentPayableInterest',
            title: '每期保理融资利息到账金额',
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
    $('#orderListTableDetail').bootstrapTable('destroy');
    $("#orderListTableDetail").bootstrapTable({
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
            debugger;
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
            }
            /*, {
                        field: 'file',
                        title: '相关图片',
                        align: 'center',
                        valign: 'middle',
                        width: 100,
                        events: 'operateEvents',
                        formatter: function() {
                            return "<a class='stu_file' href='javascript:void(0)'>查看</a>";
                        }
                    }*/
        ]
    });
}

window.operateEvents = {
    'click .detail': function(e, value, row, index) {
        CloudUtils.getTab("../../project/ssmManager/orderManager/repayInfo.html", "agencyDetailModal");
        initRepayPlanTable(row.orderBatchId);
        $("#repayInfoDetail").modal("show");
    },
    'click .stu_file': function(e, value, row, index) {
        var data = { stuId: row.stuId };
        data = JSON.stringify(data);
        debugger;
        var options = {
            url: '../../sign/stuFileInfo',
            data: data,
            callBackFun: function(data) {
                debugger;
                CloudUtils.getTab("../../project/ssmManager/orderManager/stuInfo.html", "agencyDetailModal");
                $("#imgsDetail").html("");
                var dataList = data.dataList;
                for (var i = 0; i < dataList.length; i++) {
                    var temp = dataList[i];
                    var img = ReferrerKiller.imageHtml(temp.stuFile);
                    // var img = "<img src='" + temp.stuFile + "' style='width:100%;hight:200px'/>"
                    $("#imgsDetail").append(img);

                }
                $("#stuImgDetail").modal("show");
            }
        };
        CloudUtils.ajax(options);
    }
};

window.operateEvents2 = {
    'click .detail': function(e, value, row, index) {
        CloudUtils.getTab("../../project/ssmManager/repayManager/orderModalDetail.html", "agencyDetailModal");
        initOrderListTable(row.orderBatchId);
        $("#orderModalDetail").modal("show");
    }
};
