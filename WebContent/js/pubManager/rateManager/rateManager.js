$(document).ready(function() {
    CloudUtils.getMenuNames("nav");
    initdykRateTable();
    dykRateFormValidator();
    ajaxRelaCorps();
    
    $('#dykRateModal').on('hidden.bs.modal', function() {
        $("#dykRateForm").data('bootstrapValidator').destroy();
        $('#dykRateForm').data('bootstrapValidator', null);
        dykRateFormValidator();
    });
});




function ajaxRelaCorps() {
    var options = {
        url: '../../product/list',
        data: '{"isPage": 0}',
        callBackFun: function(data) {
            $.each(data.dataList, function(index, units) {
            	$('#productId').append("<option value=" + units.productId + ">" + units.productName + "</option>");
            });
        },
        errorCallback: function(data) {
            alert("error");
        }
    };
    CloudUtils.ajax(options);
}


function change(obj) {
    var text = $(obj).find("option:selected").text();
    $("#productName").val(text);
}

window.operateEventsLook = {
    'click .mod': function(e, value, row, index) {
        modLookFun(row, 2);
    },
    'click .remove': function (e, value, row, index) {
            bootbox.confirm("确定删除此条记录?", function(result) {  
                if (result) {
                	var data = {productId:row.productId,recUid:row.recUid};
                    var options = {
                            url : '../../dykRate/delete',
                            data : JSON.stringify(data),
                            callBackFun : function(data) {
                                if(data.result==0){
                                    initdykRateTable();
                                }else{
                                    bootbox.alert(data.resultNote);
                                    return false;
                                }
                            },
                            errorCallback:function(data){
                                bootbox.alert("error");
                            }
                    };
                    CloudUtils.ajax(options);
                } 
             });
        }
};


function addFun() {
	$('#dykRateForm')[0].reset();
    $("#isAdd").val("1");
    $("#updatedykRateModalLabel").text("添加");
    $("#div_productName").hide();
    $("#div_rateStandard").hide();
    $("#div_productId").show();
    $('#dykRateModal').modal();

}

function modLookFun(row) {
	$('#dykRateForm')[0].reset();
    $("#isAdd").val("0");
    $("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
    $("#div_productName").show();
    $("#div_rateStandard").show();
    $("#updatedykRateModalLabel").text("修改");
    $("#div_productId").hide();
    $('#dykRateModal').modal();
    CloudUtils.setForm(row, 'dykRateForm');
}


function saveLookFun() {
    var isAdd = $("#isAdd").val();
    $('#dykRateForm').data('bootstrapValidator').validate();
    if (!$('#dykRateForm').data('bootstrapValidator').isValid()) {
        return false;
    }
    var modal = $('#dykRateModal');
    var data = CloudUtils.convertStringJson('dykRateForm');
    var data = eval("(" + data + ")");
    if (isAdd == "0") {
        var options = {
            url: '../../dykRate/mod',
            data: JSON.stringify(data),
            callBackFun: function(data) {
                bootbox.alert(data.resultNote);
                if (data.result == 0) {
                    initdykRateTable();
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
    } else if (isAdd == "1") {
    	var text = $("#productId").find("option:selected").text();
    	if(!text){
    		 var selectId = document.getElementById("productId");
    		 text = selectId.options[0].text; 
    	}
    	data.productName = text;
    	data.productType = "0";
        var options = {
            url: '../../dykRate/add',
            data: JSON.stringify(data),
            callBackFun: function(data) {
                bootbox.alert(data.resultNote);
                if (data.result == 0) {
                    initdykRateTable();
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

// 初始化利率信息表
function initdykRateTable() {
    $('#dykRateList').bootstrapTable('destroy');
    $("#dykRateList").bootstrapTable({
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
                productName:$("#productName").val()
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
            title: '主键',
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
            field: 'daysEnd',
            title: '截止天数',
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
                /*if(row.recUid!="dyk0001"){*/
                return $.number(value, 2);
                /*}*/
            }
        }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
                var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
                var m = '<a class = "fa fa-edit mod" style="color:#278bdd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
                return m +' '+r;
            },
            events: 'operateEventsLook'
        }]
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
                    	notEmpty: { message: '利率不能为空' },
                        numeric: { message: '只能输入数字' },
                        callback: {
                            message: '利率在0~100之间',
                            callback: function(value, validator) {
                                return Number(value) >= 0 && Number(value) <= 100;
                            }
                        }
                    }
                },
                daysEnd:{
                	 validators: {
                         numeric: { message: '只能输入数字' },
                         regexp: {
                             regexp: /^[0-9]*[1-9][0-9]*$/,
                             message: '只能输入正整数'
                         },
                         callback: {
                             message: '截止天数需要大于0',
                             callback: function(value, validator) {
                                 return Number(value) > 0;
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