$(function() {
	initCntFileListTable();
    initCertifyFileListTable();
    getVariableByTaskId();


});

function getVariableByTaskId() {
    var row = store.get('agencyRow'); //从缓存中获取数据
    var taskId = row.taskId;
    var options = {
        url: '../../activiti/findDataByTaskId',
        data: '{"taskId":"' + taskId + '"}',
        callBackFun: function(data) {
            if (data.result == 0) {
                var jsonData = eval("(" + data.str + ")");
                CloudUtils.setForm(jsonData, "detailHisForm");
                //初始化table数据
                var tableJsonData = eval("(" + $("#fileInfoDetail").val() + ")");
                $("#certifyFileListTableDetail").bootstrapTable("append", tableJsonData);
                if ($("#pmFileInfoDetail").val()) {
                    var tableJsonData2 = eval("(" + $("#pmFileInfoDetail").val() + ")");
                    $("#cntFileListTableDetail").bootstrapTable("append", tableJsonData2);
                }
            } else {
                bootbox.alert(data.resultNote);
                return false;
            }
        },
        errorCallback: function(data) {
            bootbox.alert(data.resultNote);
            return false;
        }
    };
    CloudUtils.ajax(options);
}


function initCntFileListTable() {
    $('#cntFileListTableDetail').bootstrapTable('destroy');
    $("#cntFileListTableDetail").bootstrapTable({
        method: "post",
        //         url: "../..//", 
        striped: true, //表格显示条纹  
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
        queryParams: function queryParams(params) { //设置查询参数  

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
            field: 'fileName',
            title: '附件名称',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                var a = "<a target='view_window' href='/../../.." + row.fileUrl + "' download='" + value + "'>" + value + "</a>"
                return a;
            }
        }, {
            field: 'fileClass',
            title: '附件类型',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                if (value == '0') {
                    return '三方协议';
                } else if (value == '1') {
                    return '最高保额合同';
                } else if (value == '2') {
                    return '保单附件';
                }
            }
        }, {
            field: 'fileType',
            title: '文件格式',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'fileSize',
            title: '文件大小(KB)',
            align: 'center',
            valign: 'middle',
        }]
    });
}

function initCertifyFileListTable() {
    $('#certifyFileListTableDetail').bootstrapTable('destroy');
    $("#certifyFileListTableDetail").bootstrapTable({
        method: "post",
        //         url: "../../product/list", 
        striped: true, //表格显示条纹  
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
        queryParams: function queryParams(params) { //设置查询参数  
            
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
            field: 'fileName',
            title: '附件名称',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                var a = "<a target='view_window' href='" + row.fileUrl + "' download>" + value + "</a>"
                return a;
            }
        }, {
            field: 'fileClass',
            title: '附件类型',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                if (value == '0') {
                    return '签约视频';
                } else if (value == '1') {
                    return '签约文件';
                } else if (value == '2') {
                    return '其他';
                }
            }
        }, {
            field: 'fileType',
            title: '文件格式',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'fileSize',
            title: '文件大小(KB)',
            align: 'center',
            valign: 'middle',
        }]
    });
}