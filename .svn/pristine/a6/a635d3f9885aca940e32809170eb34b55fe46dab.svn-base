$(document).ready(function() {
	getTaskData();
});


function getTaskData() {
    var row = store.get('agencyRow'); //从缓存中获取数据
    debugger
    var taskId = row.taskId;
    var options = {
        url: '../../activiti/findDataByTaskId',
        data: '{"taskId":"' + taskId + '"}',
        callBackFun: function(data) {
            if (data.result == 0) {
                var jsonData = eval("(" + data.str + ")");
                debugger
                CloudUtils.setForm(jsonData, 'recomMeetDetailForm');
                CloudUtils.setForm(jsonData, 'detailForm');
                initTable(jsonData.buyFiles);
                initTable1(jsonData.saleFiles);
                initTable2(jsonData.guaranteeFiles);
                initTable3(jsonData.tranFiles);
                initTable4(jsonData.projectFiles);
            } else {
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

function initTable4(data){
	$('#projectFilesDetail').bootstrapTable('destroy');
    $("#projectFilesDetail").bootstrapTable({
        method: "post",
        data: data,
        striped: false, //表格显示条纹  
        pagination: false, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "client", //表示服务端请求
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数  
            var param = {
                contractNo: contractNo
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
            field: 'fileName',
            title: '文件名称',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row) {
                var a = "<a target='view_window' href='/../../.." + row.fileUrl + "' download='" + value + "'>" + value + "</a>"
                return a;
            }
        }, {
            field: 'fileType',
            title: '文件格式',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'fileSize',
            title: '文件大小(KB)',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'materialType',
            title: '材料类型',
            align: 'center',
            valign: 'middle',
            formatter: function (value) {
                if (value == '0') {
                    return '尽职调查报告';
                } else if (value == '1') {
                    return '风险评估报告';
                } 
            }
        }]
    });
}
function initTable(data){
	$('#buyFilesDetail').bootstrapTable('destroy');
    $("#buyFilesDetail").bootstrapTable({
        method: "post",
        data: data,
        striped: false, //表格显示条纹  
        pagination: false, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "client", //表示服务端请求
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数  
            var param = {
                contractNo: contractNo
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
            field: 'fileName',
            title: '文件名称',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row) {
                var a = "<a target='view_window' href='/../../.." + row.fileUrl + "' download='" + value + "'>" + value + "</a>"
                return a;
            }
        }, {
            field: 'fileType',
            title: '文件格式',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'fileSize',
            title: '文件大小(KB)',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'materialType',
            title: '材料类型',
            align: 'center',
            valign: 'middle',
            formatter: function (value) {
                if (value == '0') {
                    return '资质类文件';
                } else if (value == '1') {
                    return '财务资料';
                } else if (value == '2') {
                    return '其他资料';
                } 
            }
        }]
    });
}
function initTable1(data){
	$('#saleFilesDetail').bootstrapTable('destroy');
    $("#saleFilesDetail").bootstrapTable({
        method: "post",
        data: data,
        striped: false, //表格显示条纹  
        pagination: false, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "client", //表示服务端请求
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数  
            var param = {
                contractNo: contractNo
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
            field: 'fileName',
            title: '文件名称',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row) {
                var a = "<a target='view_window' href='/../../.." + row.fileUrl + "' download='" + value + "'>" + value + "</a>"
                return a;
            }
        }, {
            field: 'fileType',
            title: '文件格式',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'fileSize',
            title: '文件大小(KB)',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'materialType',
            title: '材料类型',
            align: 'center',
            valign: 'middle',
            formatter: function (value) {
            	if (value == '0') {
                    return '资质类文件';
                } else if (value == '1') {
                    return '财务资料';
                } else if (value == '2') {
                    return '其他资料';
                } 
            }
        }]
    });
}
function initTable2(data){
	$('#guaranteeFilesDetail').bootstrapTable('destroy');
    $("#guaranteeFilesDetail").bootstrapTable({
        method: "post",
        data: data,
        striped: false, //表格显示条纹  
        pagination: false, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "client", //表示服务端请求
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数  
            var param = {
                contractNo: contractNo
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
            field: 'fileName',
            title: '文件名称',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row) {
                var a = "<a target='view_window' href='/../../.." + row.fileUrl + "' download='" + value + "'>" + value + "</a>"
                return a;
            }
        }, {
            field: 'fileType',
            title: '文件格式',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'fileSize',
            title: '文件大小(KB)',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'materialType',
            title: '材料类型',
            align: 'center',
            valign: 'middle',
            formatter: function (value) {
                if (value == '0') {
                    return '资质类文件';
                } else if (value == '1') {
                    return '财务资料';
                } else if (value == '2') {
                    return '担保方股东会决议资料';
                } else if (value == '3') {
                    return '其他资料';
                }
            }
        }]
    });
}
function initTable3(data){
	$('#tranFilesDetail').bootstrapTable('destroy');
    $("#tranFilesDetail").bootstrapTable({
        method: "post",
        data: data,
        striped: false, //表格显示条纹  
        pagination: false, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "client", //表示服务端请求
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数  
            var param = {
                contractNo: contractNo
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
            field: 'fileName',
            title: '文件名称',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row) {
                var a = "<a target='view_window' href='/../../.." + row.fileUrl + "' download='" + value + "'>" + value + "</a>"
                return a;
            }
        }, {
            field: 'fileType',
            title: '文件格式',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'fileSize',
            title: '文件大小(KB)',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'materialType',
            title: '材料类型',
            align: 'center',
            valign: 'middle',
            formatter: function (value) {
                if (value == '0') {
                    return '基础交易合同';
                } else if (value == '1'){
                    return '应收账款票据扫描件/复印件';
                } else if (value == '2'){
                    return '出入库单';
                } else if (value == '3'){
                    return '工程进度表';
                }else if (value == '4') {
                    return '决议类文件';
                }else if (value == '5') {
                    return '监理审计类文件';
                }else if (value == '6') {
                    return '验收合格类文件';
                }else if (value == '7') {
                    return '其他资料';
                }
            }
        }]
    });
}


