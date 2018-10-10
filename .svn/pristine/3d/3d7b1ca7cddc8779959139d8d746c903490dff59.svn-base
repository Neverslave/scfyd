$(document).ready(function() {
	$("form").attr("autocomplete", "off");
    CloudUtils.getMenuNames("nav");
   $('#contractInfoModal').on('hidden.bs.modal', function() {
        $("#contractSearchForm")[0].reset();
    });
    loadDict();
    formValidator();
    numFormat();
    dateLoad();
});

function submit() {
	if (!$('#contractId').val()) {
        bootbox.alert("请选择合同信息");
        return false;
    }

   $('#detailForm').data('bootstrapValidator').validate();
    if (!$('#detailForm').data('bootstrapValidator').isValid()) {
        //校验不通过 
        return false;
    }

    var data = CloudUtils.convertStringJson('detailForm');
    var jsonData = eval("(" + data + ")");
	jsonData['financingCus'] = $("#financingCus").val();
	jsonData['factoringType'] = $("#factoringType").val();
    var options = {
        url: '../../tradfact/loanApplication/bpm/startProcess',
        data: JSON.stringify(jsonData),
        callBackFun: function(data) {
            if (data.result == 0) {
                bootbox.alert(data.resultNote, function() {
                    window.location.href = '../../homePage.html';
                });
            } else {
                bootbox.alert(data.resultNote);
                return false;
            }
        },
        errorCallback: function(data) {
            bootbox.alert("error");
            return false;
        }
    };
    CloudUtils.ajax(options);
}

function searchContract() {
    $("#contractInfoModal").modal();
    initContractListTable();
}

function searchContractNo(){
    initContractListTable();
    
}


function initContractListTable(){
    $('#contractListTable').bootstrapTable('destroy');
    $("#contractListTable").bootstrapTable({
        method: "post",
        url: "../../tradfact/loanApplication/contractInfo",
        striped: true, // 表格显示条纹
        pagination: true, // 启动分页
        pageSize: 5, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [5, 10, 15, 20, 25], // 记录数可选列表
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        clickToSelect: true, //是否启用点击选中行
        sidePagination: "server", // 表示服务端请求
        queryParamsType: "undefined",
        singleSelect: true,
        queryParams: function queryParams(params) { // 设置查询参数
        	var data = CloudUtils.convertStringJson('contractSearchForm');
        	var jsonData = eval("(" + data + ")");
            jsonData.pageNumber = params.pageNumber;
            jsonData.pageSize = params.pageSize;
            return JSON.stringify(jsonData);
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
            checkbox: true
        }, {
            field: 'contractId',
            title: '合同编号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'contractName',
            title: '合同名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'buyerName',
            title: '买方名称',
            align: 'center',
            valign: 'middle'
            
        }, {
            field: 'sellerName',
            title: '卖方名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'factType',
            title: '保理类型',
            align: 'center',
            valign: 'middle',
            formatter: function (value) {
                if (value == '0') {
                    return '有追索权保理';
                } else if (value == '1') {
                    return '无追索权保理';
                } else if (value == '2') {
                    return '明保理';
                } else if (value == '3') {
                    return '暗保理';
                } else if (value == '4') {
                    return '正向保理';
                } else if (value == '5') {
                    return '反向保理';
                } else if (value == '6') {
                    return '联合保理';
                } else if (value == '7') {
                    return '再保理';
                }
            }
        },{
            field: 'creditAmount',
            title: '授信金额',
            visible: false
        }, {
            field: 'creditUse',
            title: '占用授信金额',
            visible: false
        }
        	
        ]
    });
}

function ContractInfo() {
    var rows = $('#contractListTable').bootstrapTable('getSelections');
    if (rows.length > 0) {
        var row = $('#contractListTable').bootstrapTable('getSelections')[0];
        $('#contractId').val(row.contractId);
        $('#contractName').val(row.contractName);
        $('#buyerName').val(row.buyerName);
        $('#sellerName').val(row.sellerName);
        $('#factoringType').val(row.factType);
        $('#financingCus').val(row.financingCus);
        $('#projectId').val(row.projectId);
        $('#availableCredit').val(parseFloat(row.creditAmount)-parseFloat(row.creditUse));
    }

}

//form验证规则
function formValidator() {
    $('#detailForm').bootstrapValidator({
            message: 'This value is not valid',
            excluded: ':disabled',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
            	loanId:{
					validators:{
						notEmpty:{message:'放款编号不能为空'},
						}
					 },
				loanDate:{
						validators:{
							notEmpty:{message:'放款日期不能为空'},
						}
					},
			factFinance:{
					validators:{
						notEmpty:{message:'保理融资投放金额不能为空'},
						regexp:{
							regexp:/^([0-9])+(\.[0-9]+)?$/,
						    message:'保理融资投放金额>0'
						},
						callback:{
							message:'保理融资投放金额不得超过可用授信金额',
							callback:function(value,validator){
								var availableCre = $("#availableCredit").val() == "" ? 0 : $("#availableCredit").val();
								var availableCreFloat = parseFloat(availableCre);
								return value = "" || ((parseFloat(value)) <= availableCreFloat);
							}
						}
				}
			},
				loanPeriod:{
					validators:{
						notEmpty:{message:'放款期限不能为空'},
						regexp:{
							regexp:/^\d+$/,
							message:'只能输入整数'
						}
					}
				},
				manageRate:{
					validators:{
						notEmpty:{message:'保理管理费率不能为空'},
						numberic:{message:'只能输入数字'},
						callback:{
							message:"保理管理费率要在0~100之间",
							callback:function(value,validator){
								return parseFloat(value) >= 0 && parseFloat(value) <= 100;
							}
						}
					}
				},
				depositeRate:{
					validators:{
						notEmpty:{message:'保证金率不能为空'},
						numberic:{message:'只能输入数字'},
						callback:{
							message:"保证金率要在0%~100%之间",
							callback:function(value,validator){
								 return parseFloat(value) >= 0 && parseFloat(value) <= 100;
							}
					}
					}
				},
				factRate:{
					validators:{
						notEmpty:{message:'保理融资利息率不能为空'},
						numberic:{message:'只能输入数字'},
						callback:{
							message:"保理融资利息率要在0~100之间",
							callback:function(value,validator){
							 return parseFloat(value) >= 0 && parseFloat(value) <= 100;
							}
					}
					}
				},
				shroffAccount:{
					validators:{
						notEmpty:{message:'融资收款账号不能为空'}						
						}
					
				},
				accountName:{
					validators:{
						notEmpty:{message:'开户名不能为空'}
					}
				},
				openBank:{
					validators:{
						notEmpty:{message:'开户行不能为空'}
					}
				},
				bankNum:{
					validators:{
						notEmpty:{message:'银联号不能为空'},
						regexp:{
							regexp:/\b\d{12}\b/,
							message:'请输入12位数字'
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
	$("#availableCredit").number(true,2);
	$("#factFinance").number(true,2);
	$("#manageRate").number(true,6);
	$("#manageFiance").number(true,2);
	$("#depositeRate").number(true,4);
	$("#factRate").number(true,6);
}

function dateLoad(){
	$("#loanDate").val(store.get("serverDate"));
	$("#loanDate").datetimepicker({
		language:'zh-CN',
		autoclose:1,
		todayBtn:true,
		pickerPosition:"bottom-left",
		minuteStep:5,
		format:'yyyy-mm-dd',
		minView:'month'
	}).on('hide', function(e){
		$('#detailForm').data('bootstrapValidator')
        .updateStatus('loanDate', 'NOT_VALIDATED', null)
        .validateField('loanDate');
	});
}

function changeAmount(){
    // 计算费用
    var factFinance = $("#factFinance").val();
    var manageRate = $("#manageRate").val();
    var manageFiance = CloudUtils.Math(factFinance, manageRate, 'mul');
    $("#manageFiance").val(CloudUtils.ccyFormatNoPre(CloudUtils.Math(manageFiance, 100, 'div'), 2));

}