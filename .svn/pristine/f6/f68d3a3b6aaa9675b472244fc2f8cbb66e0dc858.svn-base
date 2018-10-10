 var now = new Date();
$(document).ready(function() {
    CloudUtils.getMenuNames("nav");
    initTable();
    loadEcharts();
    loadDate();
});


function loadEcharts() {
   
    var jsonData = {
        year: now.getFullYear()
    };
    statistics(jsonData);
}

function searchFun() {
    initTable();
}




function echartSearchFun() {
    var dataTemp = CloudUtils.convertStringJson('echartSearchForm');
    var jsonData = eval("(" + dataTemp + ")");
    statistics(jsonData);
}


function statistics(jsonData) {
    var options = {
        url: '../sales/statistics',
        data: JSON.stringify(jsonData),
        callBackFun: function(data) {
            showEcharts(data.dataList)
        },
        errorCallback: function(data) {
            bootbox.alert("error");
        }
    };
    CloudUtils.ajax(options);

}


function showEcharts(data) {
    var x = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    var payAmt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var repayAmt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    $.each(data, function(index, value) {
        var time = value.time;
        var month = Number(time.substring(time.length - 2, time.leght)) - 1;
        payAmt.splice(month, 1, value.payAmt);
        repayAmt.splice(month, 1, value.repayAmt);
    });
    var year = new Date().getFullYear();
    if ($("#year").val()) {
        year = $("#year").val();
    }
    echarts.dispose(document.getElementById('echart'));
    var myChart = echarts.init(document.getElementById('echart'));
    option = {
        title: {
            text: '经销商销售情况统计',
            subtext: year + '年'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['回款金额', '付款承诺函金额']
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
                name: '回款金额',
                type: 'bar',
                data: repayAmt,
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
                name: '付款承诺函金额',
                type: 'bar',
                data: payAmt,
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

var orderBy = "";

function initTable() {
    $('#salesInfoListTable').bootstrapTable('destroy');
    $("#salesInfoListTable").bootstrapTable({
        method: "post",
        url: "../sales/list",
        silentSort: false,
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
            var dataTemp = CloudUtils.convertStringJson('searchForm');
            var jsonData = eval("(" + dataTemp + ")");
            jsonData.pageNumber = params.pageNumber;
            jsonData.pageSize = params.pageSize;
            jsonData.orderBy = orderBy;
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
            field: 'agencyNum',
            title: '经销商代码',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'corpName',
            title: '经销商名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'payId',
            title: '付款承诺函编号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'payAmt',
            title: '付款承诺函金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'repayAmt',
            title: '销售回款金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'repayAmtRate',
            title: '销售金额比例',
            align: 'center',
            valign: 'middle',
            sortable: true,
        }, {
            field: 'days',
            title: '业务开展天数',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'status',
            title: '是否达标',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                var days = Number(row.days);
                var rate = Number(row.repayAmtRate);
                var temp = Math.ceil(days / 30)
                if ((temp <= 2 && rate < 0.2) || (temp == 3 && rate < 0.5) || (temp == 4 && rate < 0.8)) {
                    return "否";
                } else {
                    return "是";
                }
            }
        }],
        onSort: function(name, order) {
            orderBy = order;
            //          initTable(order);
        }
    });
}


function loadDate() {
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
    $('#year').val(now.getFullYear());
}