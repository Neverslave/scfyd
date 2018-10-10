$(document).ready(function() {
    $("form").attr("autocomplete", "off");
    CloudUtils.getMenuNames("nav");

    $('#loanInfoModal').on('hidden.bs.modal', function() {
        $("#loanSearchForm")[0].reset();
    });
    loadDict();
    formValidator();
    numFormat();
    dateLoad();
}); 

function submit() {
    if (!$('#loanId').val()) {
        bootbox.alert("请选择还款信息");
        return false;
    }

    $('#addForm').data('bootstrapValidator').validate();
    if (!$('#addForm').data('bootstrapValidator').isValid()) {
        //校验不通过 
        return false;
    }
    var data = CloudUtils.convertStringJson('addForm');
    var options = {
    	method:"post",
        url: "../../tradfact/repayInfo",
        data: data,
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

function searchLoan() {
    $("#loanInfoModal").modal();
    initLoanListTable();
}

function searchLoanNo() {
    initLoanListTable();
}

function initLoanListTable() {
    $('#loanListTable').bootstrapTable('destroy');
    $("#loanListTable").bootstrapTable({
        method: "post",
        url: "../../tradfact/loanInfo",
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
        	debugger;
        	var data = CloudUtils.convertStringJson('loanSearchForm');
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
            field: 'loanId',
            title: '放款编号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'projectName',
            title: '项目名称',
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
        	field: 'moneyPerson',
            title: '融资主体',
            align: 'center',
            valign: 'middle',
            formatter:function (value){
            	if(value == '0'){
            		return '买方';
            	}else if(value == '1'){
            		return '卖方';
            	}
            }
        },{
            field: 'financeMoney',
            title: '保理融资投放金额',
            align: 'center',
            valign: 'middle'
        },{
            field: 'loanDate',
            title: '投放日期',
            align: 'center',
            valign: 'middle'
        },{
            field: 'financePeriod',
            title: '融资期限',
            align: 'center',
            valign: 'middle'
        },{
            field: 'sumPrinciple',
            title: '已付款本金',
            visible: false
        }]
    });
}
function loanInfo() {
	debugger;
    var rows = $('#loanListTable').bootstrapTable('getSelections');
    if (rows.length > 0) {
        var row = $('#loanListTable').bootstrapTable('getSelections')[0];
        CloudUtils.setForm(row,"addForm")
    }
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
            	thisRepayPrinciple:{
            		validators:{
            			notEmpty:{message:'本次还本金金额不能为空'},
            			numberic:{message:'只能输入数字'},
            			callback:{
            				message:'本次还本金金额应小于等于剩余应还本金金额',
            				callback:function(value,validator){
    							var restPrinciple = $("#restPrinciple").val() == "" ? 0 : $("#restPrinciple").val();
    							var restPrincipleFloat = parseFloat(restPrinciple);
    							return value = "" || ((parseFloat(value)) <= restPrincipleFloat);
    						}
            			}
            			
            		}
            	},
            	thisRepayInterest:{
            		validators:{
            			notEmpty:{message:'本次还利息金额不能为空'},
            			numberic:{message:'只能输入数字'},
            			callback:{
            				message:'本次还利息金额应小于等于剩余应还利息金额',
            				callback:function(value,validator){
    							var restInterest = $("#restInterest").val() == "" ? 0 : $("#restInterest").val();
    							var restInterestFloat = parseFloat(restInterest);
    							return value = "" || ((parseFloat(value)) <= restInterestFloat);
    						}
            			}
            		}
            	},
            	accountNo:{
            		validators:{
            			notEmpty:{message:'还款结算账号不能为空'}
            		}
            	},
            	accountName:{
            		validators:{
            			notEmpty:{message:'户名不能为空'}
            		}
            	},
            	bankName:{
            		validators:{
            			notEmpty:{message:'开户行不能为空'}
            		}
            	},
            	bankNo:{
            		validators:{
            			notEmpty:{message:'联行号不能为空'}
            		}
            	}
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
        });
}
function numFormat() {
	$("#thisRepayInterest").number(true,2);
	$("#thisRepayPrinciple").number(true,2);
	$("#restInterest").number(true,2);
	$("#restPrinciple").number(true,2);
	$("#financeMoney").number(true,2);
}
function dateLoad(){
	$("#loanDateSearch").datetimepicker({
		language:'zh-CN',
		autoclose:1,
		todayBtn:true,
		pickerPosition:"bottom-left",
		minuteStep:5,
		format:'yyyy-mm-dd',
		minView:'month'
	})/*.on('hide', function(e){
		$('#loanSearchForm').data('bootstrapValidator')
        .updateStatus('loanDateSearch', 'NOT_VALIDATED', null)
        .validateField('loanDateSearch');
	});*/
}

