$(document).ready(function() {
    CloudUtils.getMenuNames("nav");
	initFileTable("buyFiles","material_type_buy");
	initFileTable("saleFiles","material_type_buy");
	initFileTable("guaranteeFiles","material_type_guarantee");
	initFileTable("tranFiles","material_type_tran");
    loadDict();
    formValidator();
    numFormat();
});

function uploadClick(btnId,tableId,typeId){
	$("#material-type").val(tableId);
	$("#btn_choice").children().attr('id',btnId);
    $("#materialType").attr('dictName',typeId);
    loadDict("materialType");
	ajaxFileUpload(btnId);
	$('#fileModal').modal('show');
}

function addFile() {
    if (!$("#fileName").val()) {
        bootbox.alert("请选择文件");
        return false;
    }
    var tableId = $("#material-type").val();
    var data = CloudUtils.convertStringJson('fileInfoForm');
    data = eval("(" + data + ")");
    $("#" + tableId).bootstrapTable("append", data);
    $('#fileModal').modal('hide');
    $("#fileInfoForm")[0].reset();
}

function checkFiles(list){
	if(list == null||list.length === 0){
		return false;
	}
	return true;
}


function submit() {
	var buyFiles = $("#buyFiles").bootstrapTable('getData');
	var saleFiles = $("#saleFiles").bootstrapTable('getData');
	var guaranteeFiles = $("#guaranteeFiles").bootstrapTable('getData');
	var tranFiles = $("#tranFiles").bootstrapTable('getData');
	if(!checkFiles(buyFiles)){
		bootbox.alert("请上传买方材料 ！");
		return;
	}
	if(!checkFiles(saleFiles)){
		bootbox.alert("请上传卖方材料！");
		return;
	}
	
	if(!checkFiles(guaranteeFiles)){
		bootbox.alert("请上传担保方材料！");
		return;
	}
	
	if(!checkFiles(tranFiles)){
		bootbox.alert("请上传交易基础材料 ！");
		return;
	}
	
	$('#infoForm').data('bootstrapValidator').validate();
    if (!$('#infoForm').data('bootstrapValidator').isValid()) {
        //没有通过校验 
        return false;
    } else {
        var data = CloudUtils.convertStringJson('infoForm');
        var jsonData = eval("(" + data + ")");
        jsonData['buyFiles'] = buyFiles;
        jsonData['saleFiles'] = saleFiles;
        jsonData['guaranteeFiles'] = guaranteeFiles;
        jsonData['tranFiles'] = tranFiles;

        var options = {
            url: '../../tradfact/project/bpm/startProcess',
            data: JSON.stringify(jsonData),
            callBackFun: function(data) {
                debugger
                if (data.result == 0) {
                    bootbox.alert(data.resultNote, function() {
                        window.location.href = "../../homePage.html";
                    });
                } else {
                    bootbox.alert(data.resultNote);
                    return false;
                }
            },
            errorCallback: function(data) {
                return false;
            }
        };
        CloudUtils.ajax(options);
    }

}


function formValidator(){
    $('#infoForm').bootstrapValidator({
        message: 'This value is not valid',
        excluded: ':disabled',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
        	projectName:{
                validators: {
                    notEmpty: {
                        message: '项目名称不能为空'
                    },
                    stringLength: {
                        max: 32,
                        message: '项目名称不能超过32'
                    }
                }
            },
            nameBuy:{
                validators: {
                    notEmpty: {
                        message: '买方名称不能为空'
                    },
                    stringLength: {
                        max: 32,
                        message: '买方名称不能超过32'
                    }
                }
            },
            orgnNumBuy:{
                validators: {
                	regexp: {
                        regexp: /[A-Z0-9]{18}/, 
                        message: '社会统一信用代码证号格式为18位大写拉丁字母及数字混合'
                    },
                    notEmpty: {
                        message: '社会统一信用代码不能为空'
                    },
                    stringLength: {
                    	max: 18,
                        message: '社会统一信用代码证号长度不能超过18'
                    }
                }
            },
            nameSale:{
                validators: {
                    notEmpty: {
                        message: '卖方名称不能为空'
                    },
                    stringLength: {
                        max: 32,
                        message: '卖方名称不能超过32'
                    }
                }
            },
            orgnNumSale:{
                validators: {
                	regexp: {
                        regexp: /[A-Z0-9]{18}/, 
                        message: '社会统一信用代码证号格式为18位大写拉丁字母及数字混合'
                    },
                    notEmpty: {
                        message: '社会统一信用代码不能为空'
                    },
                    stringLength: {
                    	max: 18,
                        message: '社会统一信用代码证号长度不能超过18'
                    }
                }
            },
            creditAmount:{
                validators: {
                    notEmpty: {
                        message: '授信金额不能为空'
                    }
                }
            },
            creditTerm:{
                validators: {
                    notEmpty: {
                        message: '授信期限不能为空'
                    },
                    regexp: {
                        regexp: /^\d+$/,
                        message: '只能输入整数'
                    }
                }
            },
            financingTerm:{
                validators: {
                    regexp: {
                        regexp: /^\d+$/,
                        message: '只能输入整数'
                    }
                }
            },
            interestRate: {
                validators: {
                    numeric: { message: '只能输入数字' },
                    callback: {
                        message: '利率在0~100之间',
                        callback: function(value, validator) {
                            return Number(value) >= 0 && Number(value) <= 100;
                        }
                    }
                }
            },
            manageFeeRate: {
                validators: {
                    numeric: { message: '只能输入数字' },
                    callback: {
                        message: '管理费比例在0~100之间',
                        callback: function(value, validator) {
                            return Number(value) >= 0 && Number(value) <= 100;
                        }
                    }
                }
            },
            returnRate: {
                validators: {
                    numeric: { message: '只能输入数字' },
                    callback: {
                        message: '内含报酬率在0~100之间',
                        callback: function(value, validator) {
                            return Number(value) >= 0 && Number(value) <= 100;
                        }
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
            e.preventDefault();
        });
}

function numFormat() {
    $("#creditAmount").number(true, 2);
    $("#financingAmount").number(true, 2);
    $("#manageFeeAmount").number(true, 2);
    $("#reapymentAmount").number(true, 2);
}

function cancel(){
	window.location.href = "../../homePage.html";
}