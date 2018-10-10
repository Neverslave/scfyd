var isEdit = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).isEdit;
var userRowsMap = {};
$(function() {
    $("#isEdit").val(isEdit);
   
    if (isEdit == 1) {
    	store.remove('informRow');
        initDate();
    }
    
    if (isEdit != 3) {
    	formValidator();
    	userInfoTable();
    }
    
    hideFun();
    getFormInfo();
    ajaxFileUpload();
    $('#userInfoModal').on('hidden.bs.modal', function() {
        $("#userInfoSearchForm").bootstrapValidator('resetForm', true);
        $("#userInfoSearchForm")[0].reset();
    });
});
var userInfoFormIndex = 0;
window.operateEvents = {
    'click .modify': function(e, value, row, index) {
        if ($(e.target).data('type') === "userInfo") {
            //修改
            moduserInfoFormFun(row, 2);
            userInfoFormIndex = index;
        }
    },
    'click .remove': function(e, value, row, index) {
        var attachData = $('#attachInfoTable').bootstrapTable('getData');
        if ($(e.target).data('type') === "userInfoFormInfo") {
            var values = [];
            values.push(row.username);
            $('#userInfoTable').bootstrapTable('remove', { field: 'username', values: values });
        } else if ($(e.target).data('type') === "attach") {
            attachData.length - 1;
            var values = [];
            values.push(row.filePath);
            $('#attachInfoTable').bootstrapTable('remove', { field: 'filePath', values: values });
        }

    }
};

function getFormInfo() {
    var row = store.get('informRow'); //从缓存中获取数据
    
    attachInfoTable(row ? row.recUid : '');
    
    if (isEdit == "3") {
        detailFun(row);
        $("#userInfoTable").hide();
    } else if (isEdit == "2") {
    	getTaskData(row.recUid);
        modFun(row, 2);
    }
}

function hideFun() {
    if (isEdit == 3) {
        $("#fileUpload").hide();
        $("#addbutton").hide();
        $("#btnSave").hide();
    } else if (isEdit == 2) {
        $("#fileUpload").show();
        $("#addbutton").show();
        $("#btnSave").show();
    }
}

function detailFun(row) {
	$('#r1').hide();
    $('#r2').hide();
    $("#detailForm").val("");
    CloudUtils.setForm(row, 'detailForm');
    $('#detailForm #title').attr('readonly', true);
    $('#detailForm #informContent').attr('readonly', true);
    document.getElementById("btn_save").style.display = "none";
    $("#btn_blank").removeClass('col-sm-4').addClass('col-sm-7');
}

function modFun(row, isEdit) {
	$('#detailForm #title').attr('readonly', false);
    $('#detailForm #informContent').attr('readonly', false);
    CloudUtils.setForm(row, 'detailForm');
    $('#isEdit').val(isEdit); // 新增1;修改2
}

function moduserInfoFormFun(row, isEdit) {
    $('#userInfoModal').modal();
    CloudUtils.setForm(row, 'userInfoForm');
    $('#isEdit2').val(isEdit); // 新增1;修改2
}

var selectionIds = [];
var selectionUserIds = [];

function addFun(type) {
    userRowsMap = {};
    $("#userInfoModal").modal({ backdrop: 'static', keyboard: false });
    initTable();
    $('#isEdit2').val(1); // 新增1;修改2

    $('#userInfoModal').on('hidden.bs.modal', function() {
        selectionIds = [];
        selectionUserIds = [];
    });
}

function saveFun(type) {
	var title = $('#title').val();
	var informContent = $('#informContent').val();
	if(title == "" || informContent == ""  ){
		bootbox.alert("公告标题或者内容不能为空");
	}else{
		 if (type === 0) {
		        // 保存到数据库
		        var data = CloudUtils.convertAllJson('detailForm');
		        var jsonData = eval("(" + data + ")");
		        var isEdit = $('#isEdit').val();
		        var allTableData = $('#userInfoTable').bootstrapTable('getData');
		        var attachData = $('#attachInfoTable').bootstrapTable('getData');
		        jsonData.userInfoList = allTableData;
		        jsonData.attachInfoList = attachData;
		        if (isEdit == 1) {
		            var options = {
		                url: '../../internalInform/add',
		                data: JSON.stringify(jsonData),
		                callBackFun: function(data) {
		                    if (data.result == 0) {
		                        bootbox.alert(data.resultNote, function() {
		                            cancle();
		                        });
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
		        } else if (isEdit == 2) {
		            var options = {
		                url: '../../internalInform/modInfo',
		                data: JSON.stringify(jsonData),
		                callBackFun: function(data) {
		                    if (data.result == 0) {
		                        bootbox.alert(data.resultNote, function() {
		                            cancle();
		                        });
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
		        $("#detailModal").modal("hide");
		    } else if (type === 1) {
		        var isEdit2 = $('#isEdit2').val();
		        if (isEdit2 == 1) { // 新增1；修改2
		            var data = CloudUtils.convertStringJson('userInfoForm');
		            data = eval("(" + data + ")");
		            data.userInfoFormProportion = data.userInfoFormProportion == "" ? 0 : data.userInfoFormProportion;
		            data.registeredCapital = data.registeredCapital == "" ? 0 : data.registeredCapital;
		            data.registeredCapitalProportion = data.registeredCapitalProportion == "" ? 0 : data.registeredCapitalProportion;
		            // 先只在页面显示，不录入数据库
		            $("#userInfoTable").bootstrapTable('append', data);
		        } else if (isEdit2 == 2) {
		            var data = CloudUtils.convertStringJson('userInfoFormInfoForm');
		            $('#userInfoTable').bootstrapTable('updateRow', {
		                index: userInfoFormIndex,
		                row: JSON.parse(data)
		            });
		        }
		        $("#userInfoModal").modal("hide");
		    }
	}
}

function getTaskData(informId) {
    var data = {
        informId: informId,
        isPage: '0'
    };
    var options = {
        url: '../../user/listInfo',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            if (data.result == 0) {
                $('#userInfoTable').bootstrapTable('append', data.dataList);
            }
        },
        errorCallback: function(data) {
            bootbox.alert(data.resultNote);
            return false;
        }
    };
    CloudUtils.ajax(options);
}

function userInfoTable() {
    $('#userInfoTable').bootstrapTable('destroy');
    $("#userInfoTable").bootstrapTable({
        method: "post",
        striped: true, // 表格显示条纹
        pagination: true, // 启动分页
        pageSize: 5, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [5, 10, 15, 20, 25], // 记录数可选列表
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        sidePagination: "client", // 表示服务端请求
        // 设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        // 设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { // 设置查询参数
            // var data =
            // CloudUtils.convertStringJson('searchForm');
            // var jsonData = eval("(" + data + ")");
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                informId: informId
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
            field: 'userId',
            title: 'Item ID',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'username',
            title: '用户名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'realname',
            title: '真实姓名',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'corpId',
            title: '所属机构id',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'deptName',
            title: '所属部门',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'deptId',
            title: '所属部门id',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="userInfoFormInfo" href="javascript:void(0)"></a>';
                // var m = '<a class = "fa fa-edit
                // modify"
                // style="color:#278bdd;padding:0px
                // 5px;" title="编辑"
                // data-type="userInfoFormInfo"
                // href="javascript:void(0)"></a>';
                if (isEdit == 3) {
                    return " ";
                } else if (isEdit == 2 || isEdit == 1) {
                    return r;
                }

            },
            events: 'operateEvents'
        }]
    });
}

/*function addFileNum() {
    var num = Number($("#num").val());
    $("#num").val(num + 1);
}*/

/*function subFileNum() {
    var num = Number($("#num").val());
    $("#num").val(num - 1);
}*/

var fileTypes = [".doc", ".xls", ".xlsx", ".docx", ".pdf", ".png", ".jpg"];

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

// 添加附件信息
function attachInfoTable(informId) {
    $('#attachInfoTable').bootstrapTable('destroy');
    $("#attachInfoTable").bootstrapTable({
        method: "post",
        url: "../../uploadFile/informFileList",
        striped: true, // 表格显示条纹
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        sidePagination: "server", // 表示服务端请求
        // 设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        // 设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { // 设置查询参数
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize
            };
            if (informId) {
                param.informId = informId
            }
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
            field: 'filePath',
            title: '附件地址',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'fileTitle',
            title: '附件名称',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                var s = '<a target="view_window" href="' + row.filePath + '" download="' + value + '">' + value + '</a>';
                return s;

            }
        }, {
            field: 'fileType',
            title: '附件格式',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'fileSize',
            title: '附件大小(KB)',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            valign: 'middle',
            visible: isEdit != 3,
            formatter: function(value, row, index) {
                var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="attach" href="javascript:void(0)"></a>';
                return r;
            },
            events: 'operateEvents'
        }]
    });
}

function ajaxFileUpload() {
    $('#fileupload').fileupload({
        url: "../../file/uploadFile?pathId=3",
        dataType: 'json',
        // 上传完成后的执行逻辑
        done: function(e, data) {
            data = data.result;
            if (data.result == 0) {
                var relData = {};
                relData.fileTitle = data.fileName;
                relData.fileSize = data.fileSize;
                relData.filePath = data.fileUrl;
                relData.fileType = data.fileType;
                $("#attachInfoTable").bootstrapTable("append", relData);
            } else {
            	bootbox.alert(data.resultNote);
            }

        }
    });
    $('#fileupload').bind('fileuploadadd', function(e, data) {
        var obj = data.files[0];
        var name = obj.name;
        var size = obj.size;
        var attachData = $('#attachInfoTable').bootstrapTable('getData');
        if (attachData.length > 9) {
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

function checkFileSize(fileSize) {
    fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
    fileSize = Math.round(fileSize / 1024);
    if (fileSize > 50) {
        return false;
    }
    return true;
}

function cancle() {
    // 取消
    // 清缓存
    store.remove('informRow');
    history.go(-1);
}

var $table;

function initTable() {
    $('#userListTable').bootstrapTable('destroy');
    $table = $("#userListTable").bootstrapTable({
        method: "post",
        url: "../../user/list",
        striped: true, // 表格显示条纹
        pagination: true, // 启动分页
        pageSize: 5, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [5, 10, 15, 20, 25], // 记录数可选列表
        idField: "userId",
        responseHandler: responseHandler,
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        sidePagination: "server", // 表示服务端请求
        clickToSelect: true,  //是否启用点击选中行
        // 设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        // 设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { // 设置查询参数
            var data = CloudUtils
                .convertStringJson('userInfoSearchForm');
            var jsonData = eval("(" + data + ")");
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                username: jsonData.username,
                sysType: 2
            };
            return JSON.stringify(param);
        },
        columns: [{
            field: 'checkStatus',
            checkbox: true
        }, {
            field: 'userId',
            title: 'Item ID',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'roleType',
            title: '角色类型',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'username',
            title: '用户名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'realname',
            title: '真实姓名',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'corpName',
            title: '所属企业',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'corpId',
            title: '所属机构id',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'deptName',
            title: '所属部门',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'deptId',
            title: '所属部门id',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'mobilephone',
            title: '手机号码',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'email',
            title: '邮箱',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'roleType',
            title: '系统类型',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'roleName',
            title: '用户角色',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'roleId',
            title: '用户角色id',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            valign: 'middle',
            visible: false,
            formatter: function(value, row, index) {
                var m = '<a class = "fa fa-edit modify" style="color:#278bdd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
                var d = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
                // if(store.get('roleType')==1){
                var r = '<a class = "fa fa-rotate-left reset" style="color:#278bdd;padding:0px 5px;" title="重置密码" href="javascript:void(0)"></a>';
                return m + ' ' + d + ' ' + r;
                // }
                // return m+' '+d;
            },
            events: 'operateEvents'
        }],
        onCheck: function(row) {
            userRowsMap[row.userId] = row;
        },
        onUncheck: function(row) {
            delete userRowsMap[row.userId];
        },
        onCheckAll: function() {
            var rows = $("#userListTable").bootstrapTable('getData');
            for (var i = 0; i < rows.length; i++) {
                delete userRowsMap[rows[i].userId];
                userRowsMap[rows[i].userId] = rows[i];
            }
        },
        onUncheckAll: function() {
            var rows = $("#userListTable").bootstrapTable('getData');
            for (var i = 0; i < rows.length; i++) {
                delete userRowsMap[rows[i].userId];
            }
        }
    });

}

function responseHandler(res) {

    $.each(res.dataList, function(i, row) {
        $.each(userRowsMap, function(key, value) {
            if (row.userId == key) { row.checkStatus = true; }

        });
    });
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
}

function initDate() {
	$('#informDate').val(store.get("serverDate"));

    var username = store.get("username");
    var userId = store.get("userId");
    $('#username').val(username);
    $('#userId').val(userId);
}

function checkFinaceInfo() {
    for (var key in userRowsMap) {
        var allTableData = $("#userInfoTable").bootstrapTable('getData');
        for (i = 0; i < allTableData.length; i++) {
            var name = allTableData[i].userId;
            if (key == name) {
                bootbox.alert("已经选择了" + allTableData[i].username + ",请重新选择");
                return;
            }
        }
    }

    $("#userInfoModal").modal('hide');
    $.each(userRowsMap, function(key, value) {
        $("#userInfoTable").bootstrapTable('append', value);
    });
    userRowsMap = {};
}

function searchAgencyFun() {
    initTable();
}

//form验证规则
function formValidator() {
    $('#detailForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            title: {
                validators: {
                    notEmpty: { message: '标题不能为空' },
                    stringLength: {
                        min: 1,
                        max: 20,
                        message: '长度为1-20'
                    }
                }
            },
            informContent: {
                validators: {
                    notEmpty: { message: '内容不能为空' },
                    stringLength: {
                        min: 1,
                        max: 128,
                        message: '长度为1-128'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
        e.preventDefault();
    });
}