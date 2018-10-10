var IS_CUSTOMER_HIDDEN = false;

$(document).ready(function() {
    CloudUtils.getMenuNames("nav");

    var roleId = store.get("roleId");
    // 经销商 OR 分期超人
    if (roleId == 'ROLE000020' || roleId == 'ROLE000021') {
        IS_CUSTOMER_HIDDEN = true;
        $("#divAgencyName").hide();
    }

    dateload();
    initTable();
});

function searchFun() {
    initTable();
}

var orderBy ="";
function initTable() {
    $('#marginListTable').bootstrapTable('destroy');
    $("#marginListTable").bootstrapTable({
        method: "post",
        url: "../guaranteeQuery/listNew",
        silentSort:false,
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
        queryParams: function queryParams(params) {
            var dataTemp = CloudUtils.convertStringJson('searchForm');
            var jsonData = eval("(" + dataTemp + ")");
            jsonData.pageSize = params.pageSize;
            jsonData.pageNumber = params.pageNumber;
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
            field: 'financeId',
            title: '融资编号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'agencyName',
            title: '客户名称',
            align: 'center',
            valign: 'middle',
            visible: !IS_CUSTOMER_HIDDEN
        }, {
            field: 'financeAmount',
            title: '融资金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                return $.number(value, 2);
            }
        }, {
            field: 'payAmt',
            title: '放款金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                return $.number(value, 2);
            }
        }, {
            field: 'payAbleGuarantee',
            title: '应缴保证金金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                return $.number(value, 2);
            }
        }, {
            field: 'guaranteePayDate',
            title: '缴纳日期',
            align: 'center',
            valign: 'middle',
            sortable:true,
        }, {
            field: 'payActGuarantee',
            title: '实缴保证金金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                return $.number(value, 2);
            }
        }, {
            field: 'guaranteeBalance',
            title: '剩余保证金金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                return $.number(value, 2);
            }
        }],
        onSort:function(name, order){
            orderBy = order;
//          initTable(order);
        }
    });
}

function dateload() {
    $('#guaranteePayDate').datetimepicker({
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

function exportExcel(){
    var dataTemp = CloudUtils.convertStringJson('searchForm');
    var options = {
        url: '../guaranteeQuery/exportExcel',
        data: dataTemp,
        callBackFun: function(data) {
            if (data) {
               window.open(data); 
           }else{
                 bootbox.alert("导出失败");
           }    
            
        }
    };
    CloudUtils.ajax(options);
}