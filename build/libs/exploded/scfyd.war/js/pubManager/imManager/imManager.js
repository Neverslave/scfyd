$(document).ready(function() {
    $("form").attr("autocomplete", "off");
    CloudUtils.getMenuNames("nav");
    initTable();
    // modal绑定事件
    $('#addModal').on('hidden.bs.modal', function() {
        $("#addForm")[0].reset();
        if ($("#addForm").data('bootstrapValidator') != null) {
        	$("#addForm").data('bootstrapValidator').destroy();
            $("#addForm").data('bootstrapValidator', null);
        }
        // document.getElementById("field").disabled = false;
        $("#addForm input").attr("readonly", false);
        $("#addForm select").attr("disabled", false);
        document.getElementById("btn_save").style.display = "";
    });
    // 去掉modal上的验证缓存
    // $('#addModal').on('hide.bs.modal', function() {
    //     $("#addForm").data('bootstrapValidator').resetForm();
    // });
    $('#dykRateModal').on('hide.bs.modal', function() {
        $("#dykRateForm")[0].reset();
        $("#dykRateForm").data('bootstrapValidator').resetForm();
    });
    dykRateFormValidator();
    ajaxRelaCorps("txt_productId", "productId");
    numFormat();
});

window.operateEvents = {
    'click .detail': function(e, value, row, index) {
        detailFun(row, 0);
    },
    'click .mod': function(e, value, row, index) {
        modFun(row, 2);
    },
    'click .remove': function(e, value, row, index) {
        bootbox.confirm("确定删除此条记录?", function(result) {
            if (result) {
                var options = {
                    url: '../../im/delete',
                    data: '{"recUid":"' + row.recUid + '"}',
                    callBackFun: function(data) {
                        if (data.result == 0) {
                            searchFun();
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
};

//扣息方式事件
function onChangeBett(obj) {
    if (obj.value == "0") {
        $("#rd").show();
        $("#season").show();
        $("#month").hide();
    } else if (obj.value == "1") {
        $("#rd").show();
        $("#season").hide();
        $("#month").show();
    } else if (obj.value == "2") {
        $("#rd").hide();
    } else if (obj.value == "3") {
        $("#rd").hide();
    }
}

function onChangeProduct(obj) {
	
	showView($(obj).val());
}

function showView(productId){
	initdykRateLookTable(productId);
	var data={productId:productId};
	var options = {
            url: '../../product/type',
            data: JSON.stringify(data),
            callBackFun: function(data) {
            	if(data && data=="0"){
            		$("#bett").attr("disabled", false);
                    $("#deduct").attr("disabled", false);
                    $("#ir").hide();
                    $("#cr").show();
                    $("#list").show();
            	}else{
            		$("#bett").attr("disabled", false);
                    $("#deduct").attr("disabled", false);
                    $("#receptionDate").attr("readonly", false);
                    $("#costRate").attr("readonly", false);
                    $("#ir").show();
                    $("#cr").show();
                    $("#list").hide();
            	}
                
            },
            errorCallback: function(data) {
                bootbox.alert("error");
            }
        };
        CloudUtils.ajax(options);
}


function initTable() {
    $('#imList').bootstrapTable('destroy');
    $("#imList").bootstrapTable({
        method: "post",
        url: "../../im/list",
        striped: true, // 表格显示条纹
        pagination: true, // 启动分页
        pageSize: 5, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [5, 10, 15, 20, 25], // 记录数可选列表
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        sidePagination: "server", // 表示服务端请求
        // 设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        // 设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { // 设置查询参数
            var data = CloudUtils.convertStringJson('searchForm');
            var jsonData = eval("(" + data + ")");
            if (jsonData.txt_productName == "") {
                jsonData.txt_productName = null;
            }
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                productName: jsonData.txt_productName
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
            field: 'productId',
            title: '产品Id',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'productName',
            title: '产品名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'bett',
            title: '扣息方式',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                if (value == 0) {
                    return "按季结息";
                } else if (value == 1) {
                    return "按月结息";
                } else if (value == 2) {
                    return "利随本清";
                } else if (value == 3) {
                    return "预收息";
                }
            }
        }, {
            field: 'deduct',
            title: '扣费方式',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                if (value == 0) {
                    return "转让应收账款时支付费用";
                } else if (value == 1) {
                    return "获得融资款项时支付费用";
                }
            }
        }, {
            field: 'interestRate',
            title: '利率(%)',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                return $.number(value, 2);
            }
        }, {
            field: 'costRate',
            title: '费率(%)',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                return $.number(value, 2);
            }
        }, {
            field: 'receptionDate',
            title: '收息日',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'interestRateStandard',
            title: '利率标准',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
                var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
                var m = '<a class = "fa fa-edit mod" style="color:#278bdd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
                var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
                return d + ' ' + m + ' ' + r;
            },
            events: 'operateEvents'
        }]
    });
}

function searchFun() {
    initTable();
}

function addFun() {
    formValidator();
    $("#addForm .required").show();
    $("#rd").show();
    $("#ir").show();
    $("#season").show();
    $("#month").hide();
    var productId = $("#productId option:selected").val();
//    $("#list").show();
    if(productId==''||productId==null){
    	$("#list").hide();
    }else{
    	$("#list").show();
    }
    $("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
    $("#productId").attr("disabled", false);
    $("#addModalLabel").text("添加");
    $('#addModal').modal({ backdrop: 'static', keyboard: false }); // 防止点击空白/ESC 关闭
    $('#isEdit').val(1); // 新增1；修改2
}

function detailFun(row, isEdit) {
    modFun(row, isEdit);
    $("#addForm .required").hide();
    //    document.getElementById("field").readonly=true;
    $("#addForm input").attr("readonly", true);
    $("#addForm select").attr("disabled", true);
    document.getElementById("btn_save").style.display = "none";
    $("#btn_blank").removeClass('col-sm-4').addClass('col-sm-7');
}

function modFun(row, isEdit) {
	$("#addForm .required").show();
    $("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
    if (isEdit == 0) {
        $("#addModalLabel").text("详情");
    }
    if (isEdit == 2) {
        $("#addModalLabel").text("修改");
        formValidator();
    }
    if (row.bett == 0) {
        $("#rd").show();
        $("#season").show();
        $("#month").hide();
    } else if (row.bett == 1) {
        $("#rd").show();
        $("#season").hide();
        $("#month").show();
    }else if (row.bett == 2 || row.bett == 3 ){
    	$("#rd").hide();
    }
    $("#productId").attr("disabled", true);
    
    showView(row.productId);
    $('#addModal').modal();
    $('#isEdit').val(isEdit); // 新增1；修改2
    CloudUtils.setForm(row, 'addForm');
}

function modLookFun(row) {
    $("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');

    $("#updatedykRateModalLabel").text("修改");

    $("#productId").attr("disabled", true);
    $('#dykRateModal').modal();

    CloudUtils.setForm(row, 'dykRateForm');
}

function saveUser() {
    var productId = $("#productId option:selected").val();
    $('#addForm').data('bootstrapValidator').validate();
    if (productId == "") {
        bootbox.alert("产品名称为必选项");
    } else {
        if (!$('#addForm').data('bootstrapValidator').isValid()) {
            //没有通过校验 
            return false;
        }
        var modal = $('#addModal');
        var data = CloudUtils.convertStringJson('addForm');
        var data = eval("(" + data + ")");

        data = JSON.stringify(data);
        var isEdit = $('#isEdit').val();
        if (isEdit == 1) { // 新增1；修改2
            var options = {
                url: '../../im/add',
                data: data,
                callBackFun: function(data) {
                    debugger
                    if (data.result == 0) {
                        bootbox.alert(data.resultNote);
                        searchFun();
                        modal.modal("hide");
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
        } else {
            var options = {
                url: '../../im/mod',
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
    }

}





function initdykRateLookTable(productId) {
    $('#dykRateListLook').bootstrapTable('destroy');
    $("#dykRateListLook").bootstrapTable({
        method: "post",
        url: "../../dykRate/list",
        striped: true, // 表格显示条纹
        pagination: true, // 启动分页
        pageSize: 5, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [5, 10, 15, 20, 25], // 记录数可选列表
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        sidePagination: "server", // 表示服务端请求
        // 设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        // 设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { // 设置查询参数
            // var data = CloudUtils.convertStringJson('searchForm');
            // var jsonData = eval("(" + data + ")");
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                productId:productId
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
            field: 'productId',
            title: '股东名称',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'productName',
            title: '产品名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'rateStandard',
            title: '利率标准',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'dykRate',
            title: '利率(%)',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                return $.number(value, 2);
            }
        }]
    });
}



// 动态下拉框
function ajaxRelaCorps(Id1, Id2) {
    var relaCorpId = store.get('productId');
    var options = {
        url: '../../product/list',
        data: '{"relaCorpId":"' + relaCorpId + '","isPage": 0}',
        callBackFun: function(data) {
            var control1 = $('#' + Id1);
            var control2 = $('#' + Id2);
            control1.append("<option value=''>全部</option>");
            control2.append("<option value=''></option>");
            $.each(data.dataList, function(index, units) {
                control1.append("<option value=" + units.productId + ">" + units.productName + "</option>");
                control2.append("<option value=" + units.productId + ">" + units.productName + "</option>");
            });
            $('#txt_productId').selectOrDie({
                placeholder: '产品名称'
            });
        },
        errorCallback: function(data) {
            alert("error");
        }
    };
    CloudUtils.ajax(options);
}

// form验证规则
function formValidator() {
    $('#addForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                financingNote: {
                    validators: {
                        stringLength: {
                            min: 1,
                            max: 2000,
                            message: '长度为1-2000'
                        }
                    }
                },

                interestRateStandard: {
                    validators: {
                        stringLength: {
                            min: 1,
                            max: 200,
                            message: '字数限制长度为1-200'
                        }
                    }
                },
                receptionDate: {
                    validators: {
                        notEmpty: {
                            message: '收息日不能为空'
                        },
                        numeric: { message: '只能输入数字' },
                        callback: {
                            message: '收息日范围在1-28',
                            callback: function(value, validator) {
                                return parseFloat(value) >= 1 && parseFloat(value) <= 28;

                            }
                        }
                    }
                },
                interestRate: {
                    validators: {
                        numeric: { message: '只能输入数字' },
                        callback: {
                            message: '利率在0~100之间',
                            callback: function(value, validator) {
                                return parseFloat(value) >= 0 && parseFloat(value) <= 100;
                            }
                        }
                    }
                },
                costRate: {
                    validators: {
                        numeric: { message: '只能输入数字' },
                        callback: {
                            message: '费率在0~100之间',
                            callback: function(value, validator) {
                                return parseFloat(value) >= 0 && parseFloat(value) <= 100;
                            }
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
        });
}

function dykRateFormValidator() {
    $('#dykRateForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                dykRate: {
                    validators: {
                        numeric: { message: '只能输入数字' },
                        callback: {
                            message: '利率在0~100之间',
                            callback: function(value, validator) {
                                return parseFloat(value) >= 0 && parseFloat(value) <= 100;
                            }
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
        });
}

function numFormat() {
    $("#interestRate").number(true, 2);
    $("#costRate").number(true, 2);
    $("#dykRate").number(true, 2);
}