$(document).ready(function() {
	CloudUtils.getMenuNames("nav");
    initTable();
    dateload();
});

function searchFun() {
    initTable();
}

function initTable() {
    $('#proViewListTable').bootstrapTable('destroy');
    $("#proViewListTable").bootstrapTable({
        method: "post",
        url: "../ProInfo/ProViewList",
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
                    financeStartDate: jsonData.financeStartDate,
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
            field: 'agencyCount',
            title: '合作经销商总数',
            align: 'center'
        }, {
            field: 'payNumber',
            title: '合计付款承诺函批次',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'payAmount',
            title: '合计付款承诺函金额',
            align: 'center',
            valign: 'middle',
            formatter:function(value){
            	return $.number(value,2);
            }
        }, {
            field: 'cashCollection',
            title: '累计销售回款金额',
            align: 'center',
            valign: 'middle',
            formatter:function(value){
            	return $.number(value,2);
            }
        }, {
            field: 'restGuaranteeAmount',
            title: '合计剩余保证金金额',
            align: 'center',
            valign: 'middle',
            formatter:function(value){
            	return $.number(value,2);
            }
        }, {
            field: 'riskExposure',
            title: '风险敞口',
            align: 'center',
            valign: 'middle',
            formatter:function(value){
            	return $.number(value,2);
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
        minView: 'month'　　　　 // 日期时间选择器所能够提供的最精确的时间选择视图。
    });

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
}
