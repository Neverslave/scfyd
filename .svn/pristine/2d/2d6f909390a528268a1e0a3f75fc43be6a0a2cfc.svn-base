$(document).ready(function() {
	$("form").attr("autocomplete","off");
	CloudUtils.getMenuNames("nav");
	initTable(); 
	dateload();
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
	});
	numFormat();
} );

window.operateEvents = {
	'click .detail': function (e, value, row, index) {
		detailFun(row);
	},
};

function initTable() { 
	$('#loanInfoList').bootstrapTable('destroy');  
	$("#loanInfoList").bootstrapTable({  
         method: "post", 
         url: "../../../loanInfo/list", 
         striped: true,  //表格显示条纹  
         pagination: true, //启动分页  
         pageSize: 5,  //每页显示的记录数  
         pageNumber:1, //当前第几页  
         pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
         search: false,  //是否启用查询  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
         //设置为lloanInfoit可以获取lloanInfoit, offset, search, sort, order  
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
           var data = CloudUtils.convertStringJson('searchForm');
           var jsonData = eval("(" + data + ")");
           var param = {
               pageNumber: params.pageNumber,
               pageSize: params.pageSize,
               loanDate: jsonData.txt_loanDate,
               contractNo: jsonData.txt_contractNo,
               orderBatchId: jsonData.txt_orderBatchId
           };    
           return JSON.stringify(param);
         },  
         responseHandler:function responseHandler(res) {
        	 if (res.result==0) {
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
 	        field: 'loanId',
 	        title: '放款编号',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'loanDate',
 	        title: '放款日期',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'loanAmt',
 	        title: '放款金额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
   	 	    	return $.number(value, 2);
   		    }
 	    },{
 	        field: 'financeStartDay',
 	        title: '融资起始日',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'financeDueDay',
 	        title: '融资到期日',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'contractNo',
 	        title: '合同编号',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'orderBatchId',
 	        title: '订单批次号',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'orderAcceptMoney',
 	        title: '接受订单金额',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter:function(value,row,index){
   	 	    	return $.number(value, 2);
   		    }
 	    },{
 	        field: 'orderAllMoney',
 	        title: '超人所需金额总额',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter:function(value,row,index){
   	 	    	return $.number(value, 2);
   		    }
 	    },{
 	        field: 'guaranteeMoneyRate',
 	        title: '保证金比例',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter:function(value,row,index){
   	 	    	return $.number(value, 2);
   		    }
 	    },{
 	        field: 'guaranteeMoney',
 	        title: '保证金',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter:function(value,row,index){
   	 	    	return $.number(value, 2);
   		    }
 	    },{
 	        field: 'guaranteeMoneyActual',
 	        title: '实缴保证金',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter:function(value,row,index){
   	 	    	return $.number(value, 2);
   		    }
 	    },{
 	        field: 'note',
 	        title: '备注',
 	        align: 'center',
            valign: 'middle',
            visible: false,
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
 	        formatter:function(value,row,index){
	        	var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
	 	        return d;
 	        },
 	        events: 'operateEvents'
 	    }]
       });
}

function searchFun() {
	initTable();
}

function addFun() {
	$('#mainFrame',top.document).attr('src','project/ssmManager/LoanInfoManager/loanInfoAdd.html');
}

function detailFun(row) {
	CloudUtils.setForm(row, "addForm");
	$("#addModal").modal();
}

function dateload(){
	$('#txt_loanDate').datetimepicker({
       language: 'zh-CN',
       autoclose: 1,
       todayBtn: true,// 显示今天时间
       pickerPosition: "bottom-left",
       minuteStep: 5,
       format: 'yyyy-mm-dd',
       minView: 'month',　　// 日期时间选择器所能够提供的最精确的时间选择视图。
       initialDate : new Date()
    });
}

function numFormat(){
	$("#orderAcceptMoney").number(true, 2);
	$("#orderAllMoney").number(true, 2);
	$("#loanAmt").number(true, 2);
	$("#guaranteeMoneyRate").number(true, 2);
	$("#guaranteeMoney").number(true, 2);
	$("#guaranteeMoneyActual").number(true, 2);
}