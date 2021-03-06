$(document).ready(function() {
    $("form").attr("autocomplete", "off");
    CloudUtils.getMenuNames("nav");
    ajaxFileUpload();
    // modal绑定事件
    $('#addModal').on('hidden.bs.modal', function() {
    	$("#addForm")[0].reset();
    	$("#addForm").bootstrapValidator('resetForm', true);
    });
    initTable();
    formValidator();
});

function uploadAttachment() {
    document.getElementById("fileupload").click();
}


function ajaxFileUpload() {
    $('#fileupload').fileupload({
        url: "../../file/uploadFile?pathId=2",
        dataType: 'json',
        // 上传完成后的执行逻辑
        done: function(e, data) {
            data = data.result;
            if (data.result == 0) {
                CloudUtils.setForm(data, 'addForm');
            } else {
            	 bootbox.alert(data.resultNote);
            }

        }


    });
    $('#fileupload').bind('fileuploadadd', function(e, data) {
        var obj = data.files[0];
        var name = obj.name;
        var size = obj.size;
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


window.operateEvents = {
    'click .detail': function(e, value, row, index) {
        detailFun(row);
    },
    'click .modify': function(e, value, row, index) {
        modFun(row, 2);
    },
    'click .remove': function(e, value, row, index) {
        if (row.productId == 'product01' || row.productId == 'product02') {
            bootbox.alert("不可刪除");
            return false;
        } else {
            bootbox.confirm("确定删除此条记录?", function(result) {
                if (result) {
                    var options = {
                        url: '../../product/delete',
                        data: '{"productId":"' + row.productId + '"}',
                        callBackFun: function(data) {
                            if (data.result == 0) {
                                initTable();
                                bootbox.alert(data.resultNote);
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
    }
};




function searchFun() {
    initTable();
}


function addFun() {
    $("#typeNote").hide();
    $("#prodName").attr("readonly", false);
    $("#file").attr("disabled", false);
    $("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
    $("#addModalLabel").text("添加");
    $('#addModal').modal({ backdrop: 'static', keyboard: false }); //防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
}



function modFun(row, isEdit) {
    $("#typeNote").hide();
    $("#prodName").attr("readonly", true);
    $("#fileName").attr("readonly", true);
    $("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
    if (isEdit == 2) {
        $("#addModalLabel").text("修改");
    }
    $('#addModal').modal({ backdrop: 'static', keyboard: false }); //防止点击空白/ESC 关闭

    $('#isEdit').val(isEdit); //新增1;修改2;详情0
    $('#addModal').modal();
    CloudUtils.setForm(row, 'addForm');
}

function detailFun(row){
	$('#isEdit').val('0');
	$('#addModal').modal({ backdrop: 'static', keyboard: false }); //防止点击空白/ESC 关闭
	CloudUtils.setForm(row, 'addForm');
}

function saveProduct() {
    
    var typeName = $("#prodName").val();
    var typeDescribe = $("#typeDescribe").val();
    var modal = $('#addModal');
    var data = CloudUtils.convertStringJson('addForm');
    data = eval("(" + data + ")");
    var isEdit = $('#isEdit').val();
    if (isEdit == 1) { //新增1；修改2
        data = JSON.stringify(data);
      
            var options = {
                url: '../../product/businessadd',
                data: data,
                callBackFun: function(data) {                
                	bootbox.alert(data.resultNote);                	
                    if (data.result == 0) {
                        searchFun();
                        modal.modal("hide");
                    } else {
                        return false;
                    }
                },
                errorCallback: function(data) {
                    bootbox.alert("error");
                }
            };
            CloudUtils.ajax(options);
        
    } else if (isEdit == 2) {
   
        data = JSON.stringify(data);

        var options = {
            url: '../../product/businessmod',
            data: data,
            callBackFun: function(data) {          
        	 bootbox.alert(data.resultNote);            
                if (data.result == 0) {
                    searchFun();
                    modal.modal("hide");
                } else {
                    return false;
                }
            },
            errorCallback: function(data) {
                bootbox.alert("error");
            }
        };
        CloudUtils.ajax(options);
    }
    window.parent.scrollTo(0, 0);
}

function initTable() {
    $('#productListTable').bootstrapTable('destroy');
    $("#productListTable").bootstrapTable({
        method: "post",
        url: "../../product/businesslist",
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
                isPage: 1,
                typeName: jsonData.typeName
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
            field: 'typeId',
            title: '业务ID',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'typeName',
            title: '业务名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'typeDescribe',
            title: '业务描述',
            align: 'center',
            valign: 'middle'
        },  {
            field: 'operation',
            title: '操作',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                // var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情"  href="javascript:void(0)"></a>';
                var s = '<a class = "fa fa-edit modify" style="color:#278bdd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
                var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
                return s + ' ' + r;
            },
            events: 'operateEvents'
        }]
    });
}


//form验证规则
function formValidator() {
    $('#addForm').bootstrapValidator({
            message: 'This value is not valid',
            excluded: ':disabled',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
            		typeName: {
                    validators: {
                        notEmpty: {
                            message: '业务名称不能为空'
                        },
                        stringLength: {
                            min: 2,
                            max: 20,
                            message: '长度为2-20'
                        }
                    }
                },
                productDesc: {
                    validators: {
                        notEmpty: {
                            message: '业务描述不能为空'
                        },
                        stringLength: {
                            min: 1,
                            max: 100,
                            message: '长度为1-100'
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
            saveProduct();
        });
}