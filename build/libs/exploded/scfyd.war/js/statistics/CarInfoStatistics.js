$(document).ready(function() {
    CloudUtils.getMenuNames("nav");
    initTable();
});


function searchFun() {
    initTable();
}


function initTable() {
    $('#carInfoListTable').bootstrapTable('destroy');
    $("#carInfoListTable").bootstrapTable({
        method: "post",
        url: "../carInfoStatistics/list",
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
            field: 'represent',
            title: '所属商代处',
            align: 'center',
            valign: 'middle',
//            formatter: function(value) {
//                switch (value) {
//                    case '0':
//                        return "南京";
//                    case '1':
//                        return "上海";
//                    case '2':
//                        return "西安";
//                    case '3':
//                        return "成都";
//                    case '4':
//                        return "广州";
//                    case '5':
//                        return "武汉";
//                    case '6':
//                        return "郑州";
//                    case '7':
//                        return "北京";
//                    case '8':
//                        return "沈阳";
//                    case '9':
//                        return "济南";
//
//                }
//                //return $.number(value, 2);
//            }
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
            field: 'carFrameNum',
            title: '车架号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'carActualPrice',
            title: '实际提车价',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'saleStatus',
            title: '状态',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                if (value == '0') {
                    return "未售";
                } else if (value == '1') {
                    return "已售";
                }
            }
        }]
    });
}