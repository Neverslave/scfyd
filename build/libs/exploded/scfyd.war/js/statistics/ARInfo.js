$(document).ready(function() {
	CloudUtils.getMenuNames("nav");
    initTable();
});

function searchFun() {
    initTable();
    
}

function initTable() {
    $('#ARInfoListTable').bootstrapTable('destroy');
    $("#ARInfoListTable").bootstrapTable({
        method: "post",
        url: "../ARInfo/aRList",
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
        	var param = {
                    pageNumber: params.pageNumber,
                    pageSize: params.pageSize,
                    corpName: jsonData.corpName,
                    agencyNum: jsonData.agencyNum
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
            field: 'corpId',
            title: '企业Id',
            align: 'center',
            valign: 'middle',
            visible:false
        },{
            field: 'corpName',
            title: '经销商名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'agencyNum',
            title: '经销商代码',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'financeEndDate',
            title: '付款承诺函到期日',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'payAmt',
            title: '当期承诺付款金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'carNum',
            title: '管理车辆数量',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'useAbleCreditAmt',
            title: '最高授信额度',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'cashCollection',
            title: '已销售回款金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'backProportion',
            title: '销售回款占比(%)',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }]
    });
}
