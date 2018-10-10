$(function(){
	getVariableByTaskId();
	numFormat();
});

function numFormat(){
	$("#repaySumAmt").number(true, 2);
	$("#actRepayAmt").number(true, 2);
}

function getVariableByTaskId(){
	var row = store.get('agencyRow');//从缓存中获取数据	
	var taskId = row.taskId;
	var options = {
		url : '../../activiti/findDataByTaskId',
        data : '{"taskId":"'+taskId+'"}',
        callBackFun: function(data) {
            if (data.result == 0) {
				var obj = JSON.parse(data.str);
				CloudUtils.setForm(obj, "detailForm");
				$(".required").hide();
				initFinanceListTable(JSON.parse(obj.financeInfoList));
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

function initFinanceListTable(data) {
    $('#financeListTable_JB').bootstrapTable('destroy');
    $("#financeListTable_JB").bootstrapTable({
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