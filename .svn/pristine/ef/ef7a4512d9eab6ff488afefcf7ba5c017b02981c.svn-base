$(document).ready(function() {
    CloudUtils.getMenuNames("nav");
    $("#signDate").val(store.get("serverDate"));
    // initTable();
    initRepayListTable("页面初始化不显示数据"); //页面初始化不显示数据
    numFormat();
    
    
    $('#financeInfo').on('hidden.bs.modal', function() {
    	$('#searchForm')[0].reset();
    });
});


function numFormat() {

    $("#recOrderNum").number(true, 0);
    $("#orderTotalNum").number(true, 0);
    $("#orderTotalAmt").number(true, 2);
    $("#recOrderAmt").number(true, 2);
    $("#crReqTotalAmt").number(true, 2);
    $("#loanAmt").number(true, 2);
}

function batchInfoById(orderBatchId) {
    var data = {};
    data.orderBatchId = orderBatchId;
    debugger;
    var options = {
        url: '../../../sign/batchInfo',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            CloudUtils.setForm(data, 'detailForm');
        }
    };
    CloudUtils.ajax(options);
}

function searchFun() {
    initTable();
    // dateload();
}

function getBatchInfo() {
    initTable();
}

function setForm() {
    debugger;
    var row = $("#orderListTable").bootstrapTable('getSelections');
    CloudUtils.setForm(row[0], 'detailForm');
    $("#financeInfo").modal("hide");
    var orderBatchId = $("#orderBatchId2").val();
    if(!orderBatchId){
    	orderBatchId ="批次为空不显示数据";
    }
    initRepayListTable(orderBatchId);
    $("#btnAdd").attr('disabled', false);
}


function cancel() {
    window.location.href = "../../../homePage.html";
}



function add() {
    var dataTemp = CloudUtils.convertStringJson('detailForm');
    var options = {
        url: '../../../sign/add',
        data: dataTemp,
        callBackFun: function(data) {
            bootbox.alert(data.resultNote);
        }
    };
    CloudUtils.ajax(options);
}


function send() {
    debugger;
    var jsonData = { productId: $("#productId").val() };
    jsonData.orderBatchId = $("#orderBatchId2").val();
    var options = {
        url: '../../../sign/send',
        data: JSON.stringify(jsonData),
        callBackFun: function(data) {
            debugger;
            // data = JSON.stringify(data);
            if (data.result == 0) {
                var result = data.dataList
                for (var i = 0; i < result.length; i++) {
                    startProcess(result[i]);
                }
                // startProcess(data);
            } else {
                bootbox.alert(data.resultNote);
            }
        }

    };
    CloudUtils.ajax(options);
}

//签合同 并发起流程
function startProcess(data) {
    debugger;
    // data = JSON.stringify(data);
    // var jsonData = eval("(" + data + ")");
    data.orderBatchId = $("#orderBatchId2").val();
    data.signDate = store.get("serverDate");
    var options = {

        url: '../../../sign/startProcess',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote, function() {
                window.location.href = 'orderContract.html';
            });
        }
    };
    CloudUtils.ajax(options);
}


function initTable() {
    $('#orderListTable').bootstrapTable('destroy');
    $("#orderListTable").bootstrapTable({
        method: "post",
        url: "../../../sign/batchList",
        striped: true, //表格显示条纹  
        pagination: true, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        singleSelect: true, // 单选checkbox
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        clickToSelect: true,
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) {
        	var data = CloudUtils.convertStringJson('searchForm');
            var jsonData = eval("(" + data + ")");
            jsonData.pageNumber =  params.pageNumber;
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
            field: 'orderBatchId',
            title: '订单批次号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'orderTotalNum',
            title: '订单总数',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 0);
            }
        }, {
            field: 'orderTotalAmt',
            title: '订单总金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'recOrderNum',
            title: '接收订单数量',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 0);
            }
        }, {
            field: 'recOrderAmt',
            title: '接收订单金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'rejOrderNum',
            title: '拒绝订单数量',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 0);
            }
        }, {
            field: 'rejOrderAmt',
            title: '拒绝订单金额',
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
            field: 'syncDate',
            title: '同步日期',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'selDate',
            title: '筛选日期',
            align: 'center',
            valign: 'middle'
        }]
    });
}

function initRepayListTable(orderBatchId) {
    $('#repayListTable').bootstrapTable('destroy');
    $("#repayListTable").bootstrapTable({
        method: "post",
        url: "../../../sign/orderList",
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
        }, {
            field: 'operate',
            title: '还款计划',
            align: 'center',
            valign: 'middle',
            width: 100,
            events: 'operateEvents',
            formatter: function() {
                return "<a class='repayment_plan' href='javascript:void(0)'>查看</a>";
            }
        }]
    });
}

window.operateEvents = {
    'click .stu_file': function(e, value, row, index) {
        var data = { stuId: row.stuId };
        data = JSON.stringify(data);
        debugger;
        var options = {
            url: '../../../sign/stuFileInfo',
            data: data,
            callBackFun: function(data) {
                debugger;
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
    },
    'click .repayment_plan': function(e, value, row, index) {
        initRepayPlanListTable(row.orderId);
        $("#repayInfo").modal("show");

    }
};


function initRepayPlanListTable(orderId) {
    $('#repayPlanListTable').bootstrapTable('destroy');
    $("#repayPlanListTable").bootstrapTable({
        method: "post",
        url: "../../../sign/repayListOrder",
        striped: false, //表格显示条纹  
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
        queryParams: function queryParams(params) {
            var jsonData = {
                orderId: orderId
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


function dateload() {
    $('#financeStartDate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        initialDate: new Date(), //初始化当前日期
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month' // 日期时间选择器所能够提供的最精确的时间选择视图。
    });

    $('#financeDueDay').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        initialDate: new Date(), //初始化当前日期
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month' // 日期时间选择器所能够提供的最精确的时间选择视图。
    });

    $('#loanDate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        initialDate: new Date(), //初始化当前日期
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month' // 日期时间选择器所能够提供的最精确的时间选择视图。
    });
}
