$(document).ready(function() {
    CloudUtils.getMenuNames("nav");
    loadEcharts();
    initThrowListTable();
    initOweListTable();
    dateload();
});

function searchFun() {
    initThrowListTable();
    initOweListTable();
}

function loadEcharts() {
    var now = new Date();
    var jsonData = {
        year: now.getFullYear()
    };
    statistics(jsonData, $("#sysType").val());
}

function initThrowListTable() {
    $('#throwListTable').bootstrapTable('destroy');
    $("#throwListTable").bootstrapTable({
        method: "post",
        url: "../SSMProInfo/throwInfoList",
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
            var dataTemp = CloudUtils.convertStringJson('searchForm');
            var jsonData = eval("(" + dataTemp + ")");
            var param = {
                    pageNumber: params.pageNumber,
                    pageSize: params.pageSize,
                    payDate: jsonData.payDate
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
            field: 'orderNumber',
            title: '累计接收订单笔数',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'throwAmount',
            title: '累计投放金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'guaranteeAmount',
            title: '累计收取保证金金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'principalRepayment',
            title: '累计回款本金',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'paymentInterest',
            title: '累计回款利息',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'riskExposure',
            title: '风险敞口',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                var riskExposure = Number(row.throwAmount) - Number(row.principalRepayment) - Number(row.guaranteeAmount);
                return $.number(riskExposure, 2);
            }
        }]
    });
}

function initOweListTable() {
    $('#oweListTable').bootstrapTable('destroy');
    $("#oweListTable").bootstrapTable({
        method: "post",
        url: "../SSMProInfo/oweInfoList",
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
            var dataTemp = CloudUtils.convertStringJson('searchForm');
            var jsonData = eval("(" + dataTemp + ")");
            var param = {
                    pageNumber: params.pageNumber,
                    pageSize: params.pageSize,
                    payDate: jsonData.payDate
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
            field: 'arrearsNum',
            title: '累计欠款人次',
            align: 'center',
            valign: 'middle'
            ,
            formatter: function(value, row) {
                var periodAll = Number(row.periodAll);
                var periodRepay = Number(row.periodRepay)
                return $.number(periodAll-periodRepay, 2);
            }
        }, {
            field: 'overdueRate',
            title: '人次逾期率(%)',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                var periodAll = Number(row.periodAll);
                var periodRepay = Number(row.periodRepay)
                return $.number((periodAll-periodRepay) / periodAll * 100, 2);
            }
        }, {
            field: 'amount',
            title: '累计应还本金',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'amount',
            title: '累计应还总额',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                return $.number(value, 2);
            }
        }, {
            field: 'outstandingAmount',
            title: '累计未还总额',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                var outstandingAmount = Number(row.amount) - Number(row.repayAmount)
                return $.number(outstandingAmount, 2);
            }
        }, {
            field: 'repayOverdueRate',
            title: '应还金额逾期率(%)',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                var outstandingAmount = Number(row.amount) - Number(row.repayAmount)
                return $.number(outstandingAmount / Number(row.amount) * 100, 2);
            }
        }]
    });
}

function dateload() {
    $('#payDate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        initialDate: new Date(), //初始化当前日期
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month'　　　　 // 日期时间选择器所能够提供的最精确的时间选择视图。
    });

    $('#year').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayHighlight: true,
        format: 'yyyy',
        startView: 4,
        minView: 4,
        todayBtn: true,
        initialDate: new Date(),
        pickerPosition: "bottom-left"
    });
}

function statistics(jsonData, type) {
    var url = '';
    if (type == 1) {
        url = '../SSMProInfo/echartsOrder';
    } else if (type == 2) {
        url = '../SSMProInfo/echartsAmt';
    } else {
        url = '../SSMProInfo/echartsOverdue';
    }
    var options = {
        url: url,
        data: JSON.stringify(jsonData),
        callBackFun: function(data) {
            showEcharts2(data.dataList, type)
        },
        errorCallback: function(data) {
            bootbox.alert("error");
        }
    };
    CloudUtils.ajax(options);

}

 function changeYear(obj) {
     var jsonData = {
         year: $(obj).val()
     };
     statistics(jsonData,$("#sysType").val());
 }

function changeSysType() {
    var jsonData = {
         year: $("#year").val() == '' ? new Date().getFullYear() : $("#year").val()
        // type: $("#sysType").val()
    };
    statistics(jsonData,$("#sysType").val());
}



function showEcharts2(data, type) {
    var text = "";
    var y1Text = "";
    var y2Text = "";
    var legendData = [];
    var x = [];
    var y1 = [];
    var y2 = [];

    if (type == 1) {
        text = '订单受理情况';
        var y1Text = "订单总数";
        var y2Text = "接受订单数";
        legendData = ['订单总数', '接受订单数'];
    } else if (type == 2) {
        text = '投放及回款情况';
        var y1Text = "投放金额";
        var y2Text = "回款情况";
        legendData = ['投放金额', '回款情况'];
    } else {
        text = '逾期情况';
        var y1Text = "投放金额";
        var y2Text = "逾期金额";
        legendData = ['投放金额', '逾期金额'];
    }

    var year = new Date().getFullYear();
    if ($("#year").val()) {
        year = $("#year").val();
    }

    echarts.dispose(document.getElementById('echart'));
    var myChart = echarts.init(document.getElementById('echart'));


    $.each(data, function(index, value) {
        x[index] = "第" + (index + 1) + "次投放订单"
        y1[index] = value.y1;
        y2[index] = value.y2;
    });

    var option = {
        title: {
            text: text,
            // subtext: year + '年'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legendData
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                // dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            data: x
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
                name: y1Text,
                type: 'bar',
                data: y1,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            },
            {
                name: y2Text,
                type: 'bar',
                data: y2,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            }
        ]
    };

    myChart.setOption(option);
}
