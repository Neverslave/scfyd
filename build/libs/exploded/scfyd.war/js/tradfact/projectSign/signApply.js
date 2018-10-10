$(document).ready(function() {
	CloudUtils.getMenuNames("nav");
	initFileTable("signFiles","material_type_sign");
	loadDict();
	var row = store.get('signRow'); //从缓存中获取数据
	CloudUtils.setForm(row, 'detailForm');
	
	unoperation(row.creditContractNo);
	
	formValidator();
});


function unoperation(exist){
	if(exist){
		$("#creditContractNo").attr("readOnly",true);
		$("#creditContractName").attr("readOnly",true);
		$("#creditContractTerm").attr("readOnly",true);
		$("#creditContractNote").attr("readOnly",true);
		$("#firstCreditFlag").val(1);
		$("#s1").hide();
		$("#s2").hide();
		$("#s3").hide();
	}
}

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

function cancle() {
    //	取消
    //	清缓存
    store.remove('signRow');
    history.go(-1);
}

function saveFun(){
	var signFiles = $("#signFiles").bootstrapTable('getData');
	if(!checkFiles(signFiles)){
		bootbox.alert("请项目经理上传签约文件！");
		return;
	}
	$('#detailForm').data('bootstrapValidator').validate();
    if (!$('#detailForm').data('bootstrapValidator').isValid()) {
        //没有通过校验 
        return false;
    }
    var data = CloudUtils.convertStringJson('detailForm');
	var jsonData = eval("(" + data + ")");
	jsonData['creditMain'] = $("#creditMain").val();
	jsonData['factoringType'] = $("#factoringType").val();
	jsonData['projectId'] = $("#projectId").val();
	jsonData['projectName'] = $("#projectName").val();
	jsonData['signFiles'] = signFiles;
	var options = {
			url : "../../tradfact/sign/bpm/startProcess",
			data : JSON.stringify(jsonData),
			callBackFun : function(data) {
				if(data.result==0){
					bootbox.alert(data.resultNote, function() {
						window.location.href="../../tradfact/projectSign/projectSign.html";
					});
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback:function(data){
				return false;
			}
		};
		CloudUtils.ajax(options);
}

function formValidator(){
    $('#detailForm').bootstrapValidator({
        message: 'This value is not valid',
        excluded: ':disabled',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
        	creditContractNo:{
        		validators: {
                    notEmpty: {
                        message: '授信合同编号不能为空'
                    }
        		}
            },
            creditContractName:{
            	validators: {
                    notEmpty: {
                        message: '授信合同名称不能为空'
                    }
                }
            },
            creditContractTerm:{
            	validators: {
                    notEmpty: {
                        message: '授信合同期限不能为空'
                    },
                    regexp: {
                        regexp: /^\d+$/,
                        message: '只能输入整数'
                    }
                }
            },
            factoringContractNo:{
            	validators: {
                    notEmpty: {
                        message: '保理合同编号不能为空'
                    }
                }
            },
            factoringContractName:{
            	validators: {
                    notEmpty: {
                        message: '保理合同名称不能为空'
                    }
                }
            },
            factoringContractTerm:{
            	validators: {
                    notEmpty: {
                        message: '保理合同期限不能为空'
                    },
                    regexp: {
                    	regexp: /^\d+$/,
                        message: '只能输入整数'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
            e.preventDefault();
        });
}