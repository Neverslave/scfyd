$(document).ready(function() {
    CloudUtils.getMenuNames("nav");
    initTable();
    loadDate();
});



function initTable() {
    $('#supRepayInfoListTable').bootstrapTable('destroy');
    $("#supRepayInfoListTable").bootstrapTable({
        method: "post",
        url: "../ssmStatistics/supRepayList",
        striped: false, //表格显示条纹  
        pagination: true, //启动分页  
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
        	params.month =  $("#month").val();
            return JSON.stringify(params);
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
            field: 'month',
            title: '月份',
            align: 'center',
            valign: 'middle'
        },{
            field: 'sumPrincipal',
            title: '本月应还本金',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'sumInterest',
            title: '本月应还利息',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'allMoney',
            title: '当月应还款总额',
            align: 'center',
            valign: 'middle',
            formatter: function(value,row) {
                var sumPrincipal = Number(row.sumPrincipal);
                var sumInterest = Number(row.sumInterest);
                var temp = sumPrincipal + sumInterest;
                return $.number(temp,2);
            }
        },{
            field: 'sumRepayPrincipal',
            title: '当月实还本金',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'sumRepayInterest',
            title: '当月实还利息',
            align: 'center',
            valign: 'middle',
            formatter: function(value) {
                return $.number(value, 2);
            }
        }, {
            field: 'moneyRepayAll',
            title: '当月实还总额',
            align: 'center',
            valign: 'middle',
            formatter: function(value,row) {
                var sumRepayPrincipal = Number(row.sumRepayPrincipal);
                var sumRepayInterest = Number(row.sumRepayInterest);
                var temp = sumRepayPrincipal + sumRepayInterest;
                return $.number(temp,2);
            }
        }, {
            field: 'moneyOverdue',
            title: '当月逾期金额',
            align: 'center',
            valign: 'middle',
            formatter: function(value,row) {
            	  var sumRepayPrincipal = Number(row.sumRepayPrincipal);
                  var sumRepayInterest = Number(row.sumRepayInterest);
                  var temp = sumRepayPrincipal + sumRepayInterest;
                  
                  var sumPrincipal = Number(row.sumPrincipal);
                  var sumInterest = Number(row.sumInterest);
                  var temp1 = sumPrincipal + sumInterest;
                  
                  return $.number(temp1-temp,2);
            }
        }, {
            field: 'rate2',
            title: '订单回款金额逾期占比',
            align: 'center',
            valign: 'middle',
            formatter: function(value,row) {
            	  var sumRepayPrincipal = Number(row.sumRepayPrincipal);
                  var sumRepayInterest = Number(row.sumRepayInterest);
                  var temp = sumRepayPrincipal + sumRepayInterest;
                  
                  var sumPrincipal = Number(row.sumPrincipal);
                  var sumInterest = Number(row.sumInterest);
                  var temp1 = sumPrincipal + sumInterest;
                  
                  temp = temp1 - temp;
                 
                  return $.number(temp/temp1,2)*100+"%";
            }
        }]
    });
}


function loadDate() {
    $('#month').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayHighlight: true,
        format: 'yyyy-mm',
        startView: 3,
        minView: 3,
        todayBtn: true,
        ShowUpDown:true,
        initialDate: new Date(),
        pickerPosition: "bottom-left"
    });
}