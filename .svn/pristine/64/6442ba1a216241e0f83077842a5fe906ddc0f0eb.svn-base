$(document).ready(function() {
	CloudUtils.getMenuNames("nav");
	loadDict();
	initTable();
});

function searchFun() {
    initTable("");
}

function initTable() {
    $('#projectReplyListTable').bootstrapTable('destroy');
    $("#projectReplyListTable").bootstrapTable({
        method: "post",
        url: "../../reply/list",
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
            var data = CloudUtils.convertStringJson('searchForm');
            var jsonData = eval("(" + data + ")");
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                projectName: jsonData.projectName,
                buyName: jsonData.buyName,
                saleName: jsonData.saleName,
                factoringType: jsonData.factoringType
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
            field: 'projectId',
            title: 'Item ID',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'projectName',
            title: '项目名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'buyName',
            title: '买方名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'saleName',
            title: '卖方名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'creditMain',
            title: '授信主体',
            align: 'center',
            valign: 'middle',
            formatter: function (value) {
                if (value == '0') {
                    return '买方';
                } else if (value == '1') {
                    return '卖方';
                }
            }
        }, {
            field: 'creditAmount',
            title: '授信金额',
            align: 'center',
            valign: 'middle'
        },{
            field: 'factoringType',
            title: '保理类型',
            align: 'center',
            valign: 'middle',
            formatter: function (value) {
                if (value == '0') {
                    return '有追索权保理';
                } else if (value == '1') {
                    return '无追索权保理';
                } else if (value == '2') {
                    return '明保理';
                } else if (value == '3') {
                    return '暗保理';
                } else if (value == '4') {
                    return '正向保理';
                } else if (value == '5') {
                    return '反向保理';
                } else if (value == '6') {
                    return '联合保理';
                } else if (value == '7') {
                    return '再保理';
                }
            }
        }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                var d = '<a class = "reply" style="color:#278bdd;padding:0px 5px;" title="项目批复" href="javascript:void(0)">项目批复</a>';
                return d;
            },
            events: 'operateEvents'
        }]
    });
}

window.operateEvents = {
	    'click .reply': function(e, value, row, index) {
	        store.set('replyRow', row); //把数据存储在缓存中
	        $('#mainFrame', top.document).attr('src', 'tradfact/projectReply/submitReply.html');
	    }
	};