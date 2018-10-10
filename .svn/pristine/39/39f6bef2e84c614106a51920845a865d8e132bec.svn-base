$(document).ready(function() {
    $("form").attr("autocomplete", "off");
    CloudUtils.getMenuNames("nav");
    $('#agencyInfoModal').on('hidden.bs.modal', function() {
		$("#agencySearchForm")[0].reset();
		$("#agencySearchForm").bootstrapValidator('resetForm', true);
	});
    $("#repaymentDate").val(store.get("serverDate"));
    initFinanceListTable("init");
    numFormat();
    formValidator();
});

function numFormat(){
	$("#repaySumAmt").number(true, 2);
	$("#actRepayAmt").number(true, 2);
}

function formValidator(){
 	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      group:'.valid_group',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  note : {
	                validators: {
	                	notEmpty: {message: '备注不能为空'},
	                	stringLength: {
		                      max: 128,
		                      message: '备注长度长度不能超过128'
		                  }
	                }
	         },
	    	 actRepayAmt: {
	    		validators: {
	    			notEmpty: {message: '实收利息总额不能为空'},
		            callback: {  
	                       message: '实收利息总额要在0~1,000,000,000之间',  
	                       callback: function(value, validator) { 
	                        	return parseFloat(value)>=0 && parseFloat(value)<=1000000000;
	                         }  
	                     } 
	              }
	    	}
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});	
}
function start() {
	if(!$("#agency").val()){
		bootbox.alert("请选择经销商");
		return false;
	}
	if(parseFloat($("#actRepayAmt").val())!=parseFloat($("#repaySumAmt").val())){
		bootbox.alert("实收利息总额应该等于应还利息总额！");
		return false;
	}
	
	$('#addForm').data('bootstrapValidator').validate();
	if(!$('#addForm').data('bootstrapValidator').isValid()){
		//没有通过校验 
		return false;
	}
	
    // 发起流程
    var data = CloudUtils.convertStringJson('addForm');
    data = eval("(" + data + ")");
    var financeInfoList = $("#financeListTable").bootstrapTable('getData');
    data.financeInfoList = JSON.stringify(financeInfoList);
    
    var options = {
        url: '../../revenue/startProcess',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            if (data.result == 0) {
                bootbox.alert(data.resultNote).on('hide.bs.modal',function(){
                	window.location.reload();
			});
//                $("#addForm")[0].reset();
                initFinanceListTable("清空数据");
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

function serchAgency() {
    $("#agencyInfoModal").modal();
    initAgencyListTable();
}

function searchAgencyFun() {
    initAgencyListTable();
}

function initAgencyListTable() {
    $('#agencyListTable').bootstrapTable('destroy');
    $("#agencyListTable").bootstrapTable({
        method: "post",
        url: "../../corp/agencyRevenue",
        striped: true, // 表格显示条纹
        pagination: true, // 启动分页
        pageSize: 5, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [5, 10, 15, 20, 25], // 记录数可选列表
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        clickToSelect: true, // 是否启用点击选中行
        sidePagination: "server", // 表示服务端请求
        queryParamsType: "undefined",
        singleSelect: true,
        queryParams: function queryParams(params) { // 设置查询参数
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                corpName: $("#agency_name").val()
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
            checkbox: true,
        }, {
            field: 'corpName',
            title: '经销商名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'orgnNum',
            title: '经销商代码',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'corpId',
            title: '企业ID',
            align: 'center',
            valign: 'middle',
            visible: false
        }]
    });
}

function initFinanceListTable(corpId) {
    $('#financeListTable').bootstrapTable('destroy');
    $("#financeListTable").bootstrapTable({
        method: "post",
        url: "../../finance/financelist",
        striped: true, // 表格显示条纹
        pagination: false, // 启动分页
        pageSize: 15, // 每页显示的记录数
        pageNumber: 1, // 当前第几页
        pageList: [5, 10, 15, 20, 25], // 记录数可选列表
        search: false, // 是否启用查询
        showColumns: false, // 显示下拉框勾选要显示的列
        showRefresh: false, // 显示刷新按钮
        clickToSelect: true, // 是否启用点击选中行
        sidePagination: "server", // 表示服务端请求
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { // 设置查询参数
            var param = {
                corpId: corpId
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
            field: 'financeId',
            title: '融资编号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'financeStartDate',
            title: '融资起始日',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'financeEndDate',
            title: '融资到期日',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'financeAmount',
            title: '融资金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'payAmt',
            title: '付款金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'financeBalance',
            title: '付款余额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'notPayInterest',
            title: '应还利息金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }],
        onLoadSuccess:function(){
        	getTableListValue();
        }
    });
}

function checkFinaceInfo() {
    var finData = $("#agencyListTable").bootstrapTable('getSelections')[0];
    $("#agency").val(finData.corpName);
    $("#agencyNum").val(finData.orgnNum);
    $("#corpId").val(finData.corpId);
    $("#agencyInfoModal").modal('hide');
    initFinanceListTable(finData.corpId);
}

function getTableListValue() {
    var repaySumAmt = 0;
    var finData = $("#financeListTable").bootstrapTable('getData');
    $.each(finData, function(index, value) {
    	repaySumAmt += value.notPayInterest;
    });
    $("#repaySumAmt").val(repaySumAmt);
}