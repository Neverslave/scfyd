$(document).ready(
    function () {
    	loadDict();
        loadFile();
        operation();
    });

function operation() {
    $('table').bootstrapTable('hideColumn', 'operation')
}

function loadFile() {
    var managementData = store.get('tf_project_query');
    CloudUtils.setForm(managementData, 'infoForm');
    CloudUtils.setForm(managementData, 'projectAdjustForm');
    CloudUtils.setForm(managementData, 'projectAdjustRiskForm');
    searchFileTable("buyFiles", managementData.projectId, "0", "material_type_buy");
    searchFileTable("saleFiles", managementData.projectId, "1", "material_type_buy");
    searchFileTable("guaranteeFiles", managementData.projectId, "2", "material_type_guarantee");
    searchFileTable("tranFiles", managementData.projectId, "3", "material_type_tran");
    searchFileTable("reportFiles", managementData.projectId, "5", "material_type_report");
    searchFileTable("approvalFiles", managementData.projectId, "4");
    signFileLoad(managementData.projectId, "material_type_sign");
    paymentOrderFilesLoad(managementData.projectId);
    searchFileTable("retReportFiles", managementData.projectId, "6");
}


function signFileLoad(projectId, typeId) {
    $('#signFiles').bootstrapTable('destroy');
    $("#signFiles").bootstrapTable({
        method: "post",
        url: '../tradfact/projectFile/contractList',
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
            //设置查询参数
            var param = {
                projectId: projectId
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
        columns: [
            {
                field: 'fileName',
                title: '文件名称',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row) {
                    var a = "<a target='view_window' href='/../../.." + row.fileUrl + "' download='" + value + "'>" + value + "</a>"
                    return a;
                }
            }, {
                field: 'contractNo',
                title: '合同编号',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'contractName',
                title: '合同名称',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'fileType',
                title: '文件类型',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'fileSize',
                title: '文件大小(KB)',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'materialType',
                title: '文件类型',
                align: 'center',
                valign: 'middle',
                formatter: function (value) {
                    return tableMapperDic(value, typeId);
                }

            }]
    });
}

function paymentOrderFilesLoad(projectId) {
    $('#paymentOrderFiles').bootstrapTable('destroy');
    $("#paymentOrderFiles").bootstrapTable({
        method: "post",
        url: '../../tradfact/projectFile/loanList',
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
            //设置查询参数
            var param = {
                projectId: projectId
            };
            return JSON.stringify(param);
        },
        responseHandler: function responseHandler(res) {
            debugger
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
        columns: [
            {
                field: 'fileName',
                title: '文件名称',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row) {
                    var a = "<a target='view_window' href='/../../.." + row.fileUrl + "' download='" + value + "'>" + value + "</a>"
                    return a;
                }
            }, {
                field: 'contractNo',
                title: '合同编号',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'loanNo',
                title: '放款编号',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'contractName',
                title: '合同名称',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'financingMain',
                title: '贷款人名称',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'noticeNo',
                title: '支付通知书编号',
                align: 'center',
                valign: 'middle'
            }]
    });
}




