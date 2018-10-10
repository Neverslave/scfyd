$(function () {
	$("form").attr("autocomplete","off");
    setForm();
    numFormat();
});

function numFormat(){
	$("#repaySumAmt").number(true, 2);
	$("#actRepayAmt").number(true, 2);
}

function setForm(){
	var data = {};
	data.taskId = taskId;
	var options = {
		url : '../../activiti/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData,"infoForm");
				$(".required").hide();
				initFinanceListTable(JSON.parse(jsonData.financeInfoList));
			} else {
				bootbox.alert(data.resultNote);
				return false;
			}
		},
		errorCallback : function(data) {
			bootbox.alert(data.resultNote);
			return false;
		}
	};
	CloudUtils.ajax(options);
}

function saveFun() {
	var data = CloudUtils.convertAllJson('infoForm');
	data = eval("(" + data + ")");
	data.taskId = taskId;
	data.procInstId = procInstId;
	data.agree = $("#agree").val();
	data.advice = $("#advice").val();
	var financeInfoList = $("#financeListTable").bootstrapTable('getData');
    data.financeInfoList = JSON.stringify(financeInfoList);
	
	var options = {
		url : "../../revenue/doAgree",
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if(data.result==0){
				bootbox.alert(data.resultNote, function() {
					window.location.href = '../../project/agencyTask/agencyTask.html';
				});
			}else{
				bootbox.alert(data.resultNote);
				return false;
			}
		},
		errorCallback : function(data) {
			bootbox.alert(data.resultNote);
			return false;
		}
	};
	CloudUtils.ajax(options);
}

function initFinanceListTable(data) {
    $('#financeListTable').bootstrapTable('destroy');
    $("#financeListTable").bootstrapTable({
        method: "post",
        data: data,
        url: "",
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
            return null;
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
        }]
    });
}