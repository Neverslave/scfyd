var IS_CUSTOMER_HIDDEN = true;

$(document).ready(function() {
    CloudUtils.getMenuNames("nav");
    view();
    initTable();
    dateload();
});


function view() {
    var roleId = store.get("roleId");
    if (roleId == "ROLE000020") {
        IS_CUSTOMER_HIDDEN = false;
        $("#div_agency").hide();
    } else {
        $("#div_agency").show();
    }
}

function searchFun() {
    initTable();
}

function exportExcel() {
    var dataTemp = CloudUtils.convertStringJson('searchForm');
    var options = {
        url: '../interestQuery/exportExcel',
        data: dataTemp,
        callBackFun: function(data) {
            if (data) {
                window.open(data);
            } else {
                bootbox.alert("导出失败");
            }

        }
    };
    CloudUtils.ajax(options);
}


function dateload() {
    $('#repaymentDate').datetimepicker({
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

function initTable() {
    $('#interestListTable').bootstrapTable('destroy');
    $("#interestListTable").bootstrapTable({
        method: "post",
        url: "../interestQuery/list",
        striped: true, //表格显示条纹  
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
        queryParams: function queryParams(params) { //设置查询参数  
            var data = CloudUtils.convertAllJson('searchForm');
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
            field: 'agencyNum',
            title: '经销商代码',
            align: 'center',
            valign: 'middle',
            visible: IS_CUSTOMER_HIDDEN

        }, {
            field: 'corpName',
            title: '经销商名称',
            align: 'center',
            valign: 'middle',
            visible: IS_CUSTOMER_HIDDEN
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
            formatter:function(value){
                return $.number(value,2);
            }
        }, {
            field: 'financeStartDate',
            title: '付款承诺函起始日',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'financeEndDate',
            title: '付款承诺函到期日',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'financeBalance',
            title: '未销售金额',
            align: 'center',
            valign: 'middle',
            formatter:function(value){
                return $.number(value,2);
            }

        }, {
            field: 'counts',
            title: '未销售车辆数量',
            align: 'center',
            valign: 'middle',

        }, {
            field: 'interestSum',
            title: '合计利息',
            align: 'center',
            valign: 'middle',
            formatter:function(value){
                return $.number(value,2);
            }

        }]
    });
}