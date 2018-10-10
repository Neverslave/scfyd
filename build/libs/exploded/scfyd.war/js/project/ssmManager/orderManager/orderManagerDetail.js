$(document).ready(function() {
    getTaskData();  
    numFormat();
});


function numFormat() {
    $("#orderTotalAmtDetail").number(true, 2);
    $("#recOrderAmtDetail").number(true, 2);
    $("#crReqTotalAmtDetail").number(true, 2);
    $("#loanAmtDetail").number(true, 2);
}


function getTaskData() {
   var row = store.get('agencyRow'); //从缓存中获取数据
    var taskId = row.taskId;
    var options = {
         url: '../../activiti/findDataByTaskId',
        data: '{"taskId":"' + taskId + '"}',
        callBackFun: function(data) {
            if (data.result == 0) {
                debugger;
                var jsonData = eval("(" + data.str + ")");
                // getBatchInfoById(jsonData.orderBatchId);
                 CloudUtils.setForm(jsonData, 'detailHisForm');
                initOrderListTable(jsonData.orderBatchId, jsonData.orderId, jsonData.orderStatus);

            } else {
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


function getBatchInfoById(batchId) {
    var data = {};
    data.orderBatchId = batchId;

    var options = {
        url: '../../order/batchInfo',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            CloudUtils.setForm(data, 'detailHisForm');
        }
    };
    CloudUtils.ajax(options);
}


function getPlanInfos() {
    debugger;
    var orderIds = "";
    var data = {};
    var allTableData = $("#orderListDetail").bootstrapTable('getData'); //获取表格的所有内容行 
    for (i = 0; i < allTableData.length; i++) {
        var row = allTableData[i];
        if (row.orderStatus == '1') {
            orderIds = orderIds + "," + row.orderId;
        }
    }
    data.orderId = orderIds;

}



function initOrderListTable(orderBatchId, orderId, orderStatus) {
	orderListDetail();
	getOrderList(orderBatchId, orderId, orderStatus)
}

function getOrderList(orderBatchId, orderId, orderStatus){
	var data ={
		orderBatchId: orderBatchId,
        orderStatus: orderStatus,
        orderId: orderId	
	};
	var options = {
            url: '../../order/orderList',
            data: JSON.stringify(data),
            callBackFun: function(data) {
            	$('#orderListDetail').bootstrapTable('append',data.dataList);
            }
	
        };
        CloudUtils.ajax(options);
}
function orderListDetail(){

    $('#orderListDetail').bootstrapTable('destroy');
    $("#orderListDetail").bootstrapTable({
        method: "post",
//        url: "../../order/orderList",
        striped: false, //表格显示条纹  
        pagination: true, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "client", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) {},
        responseHandler: function responseHandler(res) {},
        columns: [{
            field: 'orderId',
            title: '订单号',
            align: 'center',
            valign: 'middle',
            width: 150

        }, {
            field: 'productName',
            title: '产品名称',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'productAmt',
            title: '产品金额',
            align: 'center',
            valign: 'middle',
            width: 150,
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'period',
            title: '分期期数',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'productAmt',
            title: '分期总费用',
            align: 'center',
            valign: 'middle',
            width: 150,
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'sellerId',
            title: '商家id',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'sellerName',
            title: '商家名称',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'crReqAmt',
            title: '超人所需费用',
            align: 'center',
            valign: 'middle',
            width: 150,
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'startPayAmt',
            title: '首付金额',
            align: 'center',
            valign: 'middle',
            width: 150,
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'payM',
            title: '每期还款金额',
            align: 'center',
            valign: 'middle',
            width: 150,
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'startPayDay',
            title: '首期还款日期',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'stuName',
            title: '姓名',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'gender',
            title: '性别',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'birthDate',
            title: '出身年月',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'age',
            title: '年龄',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'idCard',
            title: '身份证',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'mobilePhone',
            title: '联系方式',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'schoolName',
            title: '学校',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'grade',
            title: '年级',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'graduateDate',
            title: '毕业时间',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'file',
            title: '相关图片',
            align: 'center',
            valign: 'middle',
            width: 100,
            events: 'operateEvents',
            formatter: function() {
                return "<a class='stu_file' href='javascript:void(0)'>查看</a>";
            }
        }, {
            field: 'orderStatus',
            title: '订单状态',
            align: 'center',
            valign: 'middle',
            width: 150,
            formatter: function(value) {
                if (value == "1") {
                    return "通过";
                } else {
                    return "拒绝";
                }
            }
        }]
    });

}

function initRepayPlanListTable() {
    $('#planInfoListTableDetail').bootstrapTable('destroy');
    $("#planInfoListTableDetail").bootstrapTable({
        method: "post",
        // url: "../../order/plans",
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
        queryParams: function queryParams(params) {
            var jsonData = {
                orderId: orderId
            };
            return JSON.stringify(jsonData);
            // return JSON.stringify({});
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
            field: 'orderId',
            title: '订单号',
            align: 'center',
            valign: 'top',
            width: 80

        }, {
            field: 'stuName',
            title: '学生姓名',
            align: 'center',
            valign: 'top',
            width: 80,
            visible: false

        }, {
            field: 'idCard',
            title: '身份证号',
            align: 'center',
            valign: 'top',
            width: 80,
            visible: false

        }, {
            field: 'mobilePhone',
            title: '联系方式',
            align: 'center',
            valign: 'top',
            width: 80,
            visible: false

        }, {
            field: 'productAmt',
            title: '应收账款<br>总额',
            align: 'center',
            valign: 'top',
            width: 75,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }, {
            field: 'crReqAmt',
            title: '保理融资<br>投放金额',
            align: 'center',
            valign: 'top',
            width: 75,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }, {
            field: 'payM',
            title: '每期应收<br>账款金额',
            align: 'center',
            valign: 'top',
            width: 75,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }, {
            field: 'currentRepayDate',
            title: '每期应收账<br>款到期日',
            align: 'center',
            valign: 'middle',
            width: 110

        }, {
            field: 'period',
            title: '期数',
            align: 'center',
            valign: 'middle',
            width: 50

        }, {
            field: 'superRepayStatus',
            title: '是否<br>还款',
            align: 'center',
            valign: 'middle',
            width: 50,
            formatter: function(value) {
            	if(value==1){
            		return "是";
            	}else{
            		return "否"
            	}
            }

        }, {
            field: 'currentRepayDate',
            title: '每期保理融<br>资到账日',
            align: 'center',
            valign: 'middle',
            width: 110

        }, {
            field: 'currentPayablePrincipal',
            title: '每期保理融<br>资本金到账<br>金额',
            align: 'center',
            valign: 'middle',
            width: 115,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }, {
            field: 'currentPayableInterest',
            title: '每期保理融<br>资利息到账<br>金额',
            align: 'center',
            valign: 'middle',
            width: 115,
            formatter: function(value) {
                return $.number(value, 2);
            }

        }]
    });
}




window.operateEvents = {
    'click .stu_file': function(e, value, row, index) {
        var data = { stuId: row.stuId };
        data = JSON.stringify(data);
        var options = {
            url: '../../sign/stuFileInfo',
            data: data,
            callBackFun: function(data) {
                CloudUtils.getTab("../../project/ssmManager/orderManager/stuInfo.html", "agencyDetailModal");
                $("#imgsDetail").html("");
                var dataList = data.dataList;
                for (var i = 0; i < dataList.length; i++) {
                    var temp = dataList[i];
                    var img = ReferrerKiller.imageHtml(temp.stuFile);
                    // var img = "<img src='" + temp.stuFile + "' style='width:100%;hight:200px'/>"
                    $("#imgsDetail").append(img);

                }
                $("#stuImgDetail").modal("show");
            }
        };
        CloudUtils.ajax(options);
    }

};
