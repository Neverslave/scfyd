$(document).ready(function() {
    CloudUtils.getMenuNames("nav");
    initTable();
});

window.operateEvents = {
    'click .detail': function(e, value, row, index) {
        store.set('informRow', row); //把数据存储在缓存中
        $('#mainFrame', top.document).attr('src', 'office/officeManager/officeAdd.html?isEdit=3');
    },
    'click .modify': function(e, value, row, index) {
        store.set('informRow', row); //把数据存储在缓存中
        $('#mainFrame', top.document).attr('src', 'office/officeManager/officeAdd.html?isEdit=2');
    },
    'click .remove': function(e, value, row, index) {
        bootbox.confirm("确定删除此条记录?", function(result) {
            if (result) {
                var options = {
                    url: '../../internalInform/delete',
                    data: '{"recUid":"' + row.recUid + '"}',
                    callBackFun: function(data) {
                        if (data.result == 0) {
                            searchFun();
                        } else {
                            bootbox.alert(data.resultNote);
                            return false;
                        }
                    },
                    errorCallback: function(data) {
                        bootbox.alert("error");
                    }
                };
                CloudUtils.ajax(options);
            }
        });
    }
};

function searchFun() {
    initTable();
}

function initTable() {
    var informUserId = store.get("userId");
    $('#informUserId').val(informUserId);
    $('#officeListTable').bootstrapTable('destroy');
    $("#officeListTable").bootstrapTable({
        method: "post",
        url: "../../internalInform/list",
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
                title: jsonData.s_title == null ? "" : jsonData.s_title,
                informUserId: informUserId
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
            field: 'recUid',
            title: 'Item ID',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'title',
            title: '标题',
            align: 'center',
            valign: 'middle',
            cellStyle: function(value, row, index, field) {
                return {
                    css: { "color": "#333", "height": "40px" }
                };
            }
        }, {
            field: 'username',
            title: '发布人',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                var d = '<a class = "fa fa-eye detail" style="color:#278bdd;padding:0px 5px;" title="预览" href="javascript:void(0)"></a>';
                var m = '<a class = "fa fa-edit modify" style="color:#278bdd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
                var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
                return d + ' ' + m + ' ' + r;
            },
            events: 'operateEvents'
        }]
    });
}

function addFunLook() {
    $('#mainFrame', top.document).attr('src', 'office/officeManager/officeAdd.html?isEdit=1');
}