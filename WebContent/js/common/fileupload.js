/**
 * 文件上传
 * liwd
 */

var fileTypes = [".doc", ".xls", ".xlsx", ".docx", ".pdf", ".png", ".jpg"];

var initFileTable = function (id, typeId) {
    $('#' + id).bootstrapTable('destroy');
    $("#" + id).bootstrapTable({
        method: "post",
        url: '',
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
                return tableMapperDic(value, typeId);
            }

        }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row, index) {
                var d = '<a tableid = ' + id + ' class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
                return d;
            },
            events: 'operateEvents'
        }]
    });

}

function checkFileNum(tableId) {
    var files = $("#" + tableId).bootstrapTable('getData');
    var num = Number(files.length);
    if (num >= 10) {
        return false;
    }

    return true;
}

function checkFileType(type) {
    var result = $.inArray(type, fileTypes);
    if (result == -1) {
        return false;
    }
    return true;
}

function checkFileSize(fileSize) {
    fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
    fileSize = Math.round(fileSize / 1024);
    if (fileSize > 50) {
        return false;
    }
    return true;
}


var ajaxFileUpload = function (id, tabelId) {
    debugger
    $('#' + id).fileupload({
        url: "../../file/uploadFile?pathId=2",
        dataType: 'json',
        // 上传完成后的执行逻辑
        done: function (e, data) {
            debugger
            data = data.result;
            if (data.result == 0) {
                if (tabelId) {
                    $("#" + tabelId).bootstrapTable("append", data);
                } else {
                    CloudUtils.setForm(data, 'fileInfoForm');
                }
            } else {
                bootbox.alert(data.resultNote);
            }

        }


    });
    $('#' + id).bind('fileuploadadd', function (e, data) {
        var obj = data.files[0];
        var name = obj.name;
        var size = obj.size;
        if (!checkFileNum()) {
            bootbox.alert("上传的附件数不能超过10个");
            return false;
        }
        var type = name.substr(name.lastIndexOf(".")).toLowerCase();
        if (!checkFileType(type)) {
            bootbox.alert("仅支持上传word、excel、pdf、png、jpg类型的文件");
            return false;
        }

        if (!checkFileSize(size)) {
            bootbox.alert("上传文件不超过50M");
            return false;
        }

    });
}


var searchFileTable = function (elementId, projectId, materialClass, typeId) {
    $('#' + elementId).bootstrapTable('destroy');
    $("#" + elementId).bootstrapTable({
        method: "post",
        url: '/scfyd/tradfact/projectFile/list',
        striped: false, //表格显示条纹
        pagination: true, //启动分页
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
        queryParams: function queryParams(params) {
            //设置查询参数
            var param = {
                projectId: projectId,
                materialClass: materialClass,
                pageNumber: params.pageNumber,
                pageSize: params.pageSize
            };
            return JSON.stringify(param);
        },
        responseHandler: function responseHandler(res) {
            if (res.result == 0) {
            	$('#'+elementId).bootstrapTable('append', res.dataList);
//                return {
//                    "rows": res.dataList,
//                    "total": res.records
//                };

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
                    return tableMapperDic(value, typeId);
                }

            }, {
                field: 'operation',
                title: '操作',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var d = '<a tableid = ' + elementId + ' class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
                    return d;
                },
                events: 'operateEvents'
            }]
    });
    if (!typeId) {
        $('#' + elementId).bootstrapTable('hideColumn', 'materialType');
    }
}

window.operateEvents = {
    'click .remove': function (e, value, row, index) {
        bootbox.confirm("确定删除此条记录?", function (result) {
            if (result) {
                var tableId = e.target.getAttribute('tableid');
                var values = [];
                values.push(row.fileUrl);
                $("#" + tableId).bootstrapTable("remove", {field: 'fileUrl', values: values});
            }
        });
    },
    'click .modify': function (e, value, row, index) {
        modFun(row);
    },

};