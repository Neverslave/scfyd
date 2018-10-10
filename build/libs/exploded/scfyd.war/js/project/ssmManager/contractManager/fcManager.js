$(document).ready(function() {
    $("form").attr("autocomplete", "off");
    CloudUtils.getMenuNames("nav");
    dateload();
    checkFactorContract();
    initFileTable();
    formValidator();
    ajaxFileUpload();
});
function fileSelect() {
	document.getElementById("fileupload").click();
}

window.operateEvents = {
    'click .remove': function(e, value, row, index) {
        bootbox.confirm("确定删除此条记录?", function(result) {
            if (result) {
                var values = [];
                values.push(row.fileUrl);
                $("#fileListTable").bootstrapTable("remove", { field: 'fileUrl', values: values });
                subFileNum();
            }
        });
    },
    'click .modify': function(e, value, row, index) {
        modFun(row);
    },

};


function addFileNum() {
    var num = Number($("#fileNum").val());
    $("#fileNum").val(num + 1);
    $("#addForm").data('bootstrapValidator').resetForm();
}

function subFileNum() {
    var num = Number($("#fileNum").val());
    $("#fileNum").val(num - 1);
}


var fileTypes = [".doc", ".xls", ".xlsx", ".docx", ".pdf", ".png", ".jpg"];

function checkFileType(type) {
    var result = $.inArray(type, fileTypes);
    if (result == -1) {
        return false;
    }
    return true;
}


function checkFileNum() {
    var num = Number($("#fileNum").val());
    if (num >= 10) {
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

function initFileTable(contractNo) {

    $('#fileListTable').bootstrapTable('destroy');
    $("#fileListTable").bootstrapTable({
        method: "post",
        url: '../../../contract/fileList',
        striped: false, //表格显示条纹  
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
            formatter: function(value, row) {
                var a = "<a target='view_window' href='/../../.." + row.fileUrl + "' download='" + value + "'>" + value + "</a>"
                return a;
            }
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
            field: 'operation',
            title: '操作',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                var d = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
                return d;
            },
            events: 'operateEvents'
        }]
    });

}


function ajaxFileUpload() {
 	$('#fileupload').fileupload({
 		  url:"../../../file/uploadFile?pathId=2",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	$("#fileListTable").bootstrapTable("append", data);
	                addFileNum();	
	            } else {
	                bootbox.alert(data.resultNote);
	            }
	            
	     }

 	    
    });
 	$('#fileupload').bind('fileuploadadd', function (e, data) {
      debugger;
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


function dateload() {
    $('#signDate').val(store.get("serverDate"));
    $('#contractValDate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month' // 日期时间选择器所能够提供的最精确的时间选择视图。
    }).on('hide', function(e) {
        $('#addForm').data('bootstrapValidator')
            .updateStatus('contractValDate', 'NOT_VALIDATED', null)
            .validateField('contractValDate');

    });
    $('#contractValDate').datetimepicker('setStartDate', new Date());
    $('#contractDueDate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month' // 日期时间选择器所能够提供的最精确的时间选择视图。
    }).on('hide', function(e) {
        $('#addForm').data('bootstrapValidator')
            .updateStatus('contractDueDate', 'NOT_VALIDATED', null)
            .validateField('contractDueDate');

    });
}

function setStartdate() {
    debugger;
    var startDate = $('#contractValDate').val();
    $('#contractDueDate').datetimepicker('setStartDate', startDate);
}

function save() {
    debugger;
    $("#addForm").data('bootstrapValidator').resetForm();

    $('#addForm').data('bootstrapValidator').validate();
    if (!$('#addForm').data('bootstrapValidator').isValid()) {
        //没有通过校验 
        return;
    }
    var allTableData = $("#fileListTable").bootstrapTable('getData');
    $("#fileInfo").val(JSON.stringify(allTableData));
    var data = CloudUtils.convertStringJson('addForm');
    data = eval("(" + data + ")");
    data = JSON.stringify(data);
    var options = {
        url: '../../../contract/add',
        data: data,
        callBackFun: function(data) {
            if (data.result == 0) {
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



function checkFactorContract() {
    var data = {
        productType: "1"
    };
    var options = {
        url: '../../../contract/check',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            if (data.result != 0) {
                bootbox.alert(data.resultNote);
                $("#btn_save").attr("disabled", true);
            }
        },
        errorCallback: function(data) {
            bootbox.alert("error");
        }
    };
    CloudUtils.ajax(options);
}
//form验证规则
function formValidator() {
    $('#addForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                signDate: {
                    validators: {
                        notEmpty: {
                            message: '签约日期不能为空'
                        }
                    }
                },
                contractNo: {
                    validators: {
                        notEmpty: {
                            message: '合同编号不能为空'
                        },
                        stringLength: {
                            max: 32,
                            message: '合同编号长度不能超过32'
                        }
                    }
                },
                fileNum: {
                    validators: {
                        callback: {
                            message: '请上传附件',
                            callback: function(value, validator, $field, options) {
                                var num = Number($('#fileNum').val());
                                if (num > 0) {
                                    return true;
                                }
                                return false;

                            }
                        }
                    }
                },
                contractValDate: {
                    validators: {
                        notEmpty: {
                            message: '合同生效日期不能为空'
                        },
                        callback: {
                            message: '合同生效日期不能小于签约日期',
                            callback: function(value, validator, $field, options) {
                                var begin = $('#addForm').find("input[name='signDate']").val();
                                return CloudUtils.DateDiffSec(value, begin) >= 0;

                            }
                        }
                    }
                },
                contractDueDate: {
                    validators: {
                        notEmpty: {
                            message: '合同到期日期不能为空'
                        },
                        callback: {
                            message: '合同到期日期要大于签约日期',
                            callback: function(value, validator, $field) {
                                debugger;
                                var contractValDate = $('#addForm').find("input[name='contractValDate']").val();
                                return CloudUtils.DateDiffSec(value, contractValDate) > 0;
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

function p(s) {
    return s < 10 ? '0' + s : s;
}
