$(document).ready(function() {
	var projectAdjustData = store.get('projectAdjust');
	loadDict();
	CloudUtils.setForm(projectAdjustData, 'infoForm');
	searchFileTable("buyFiles",projectAdjustData.projectId,"0","material_type_buy");
	searchFileTable("saleFiles",projectAdjustData.projectId,"1","material_type_buy");
	searchFileTable("guaranteeFiles",projectAdjustData.projectId,"2","material_type_guarantee");
	searchFileTable("tranFiles",projectAdjustData.projectId,"3","material_type_tran");
	$('.table').bootstrapTable('hideColumn', 'operation');
	formValidator();
});

function submit() {
	 $('#projectAdjustForm').data('bootstrapValidator').validate();
	    if (!$('#projectAdjustForm').data('bootstrapValidator').isValid()) {
	        //校验不通过 
	        return false;
	    }
        var data = CloudUtils.convertAllJson('infoForm');
        var jsonData = eval("(" + data + ")");
        var buyFiles = $("#buyFiles").bootstrapTable('getData');
    	var saleFiles = $("#saleFiles").bootstrapTable('getData');
    	var guaranteeFiles = $("#guaranteeFiles").bootstrapTable('getData');
    	var tranFiles = $("#tranFiles").bootstrapTable('getData');
		jsonData['buyFiles'] = buyFiles;
	    jsonData['saleFiles'] = saleFiles;
	    jsonData['guaranteeFiles'] = guaranteeFiles;
	    jsonData['tranFiles'] = tranFiles;
        jsonData['projectId'] = $("#projectId").val();
        jsonData['siteInfo'] = $("#siteInfo").val();
        jsonData['clientInfo'] = $("#clientInfo").val();
        jsonData['discussInfo'] = $("#discussInfo").val();
        jsonData['siteRiskInfo'] = $("#siteRiskInfo").val();
        jsonData['clientRiskInfo'] = $("#clientRiskInfo").val();
        jsonData['discussRiskInfo'] = $("#discussRiskInfo").val();
        var options = {
            url: '../../tradfact/projectAdjust/bpm/startProcess',
            data: JSON.stringify(jsonData),
            callBackFun: function(data) {
                if (data.result == 0) {
                    bootbox.alert(data.resultNote, function() {
                    	store.remove('projectAdjust');
                        window.location.href = "../../homePage.html";
                    });
                } else {
                    return false;
                }
            },
            errorCallback: function(data) {
                return false;
            }
        };
        CloudUtils.ajax(options);

}
function formValidator() {
    $('#projectAdjustForm').bootstrapValidator({
            message: 'This value is not valid',
            excluded: ':disabled',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
            	siteInfo:{
            		validators:{
            			notEmpty:{message:'现场调查材料清单不能为空'},
            		}
            	},
            	clientInfo:{
            		validators:{
            			notEmpty:{message:'客户材料补充清单不能为空'},
            		}
            	},
            	discussInfo:{
            		validators:{
            			notEmpty:{message:'商讨及确认问题清单不能为空'},
            		}
            	}
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
        });
}
function cancel() {
    window.location.href = "../../homePage.html";
}