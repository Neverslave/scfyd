$(function(){
	CloudUtils.getMenuNames("nav");
	loadDate0();
	numFormat();
	initTable();
});
function initTable(){
	$('#overdueCountTable').bootstrapTable('destroy');  
	$("#overdueCountTable").bootstrapTable({  
         method: "post", 
         striped: true,  //表格显示条纹  
         search: false,  //是否启用查询  
         url:'../CountAnalyse/getOverdueInfo',
         pagination: true, //启动分页  
         pageSize: 5,  //每页显示的记录数  
         pageNumber:1, //当前第几页  
         pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
         queryParamsType : "undefined",
         queryParams: function queryParams(params) {   //设置查询参数  
             var data = CloudUtils.convertStringJson('searchForm');
             var jsonData = eval("(" + data + ")");
             var param = {
          		   pageNumber: params.pageNumber,    
  	               pageSize: params.pageSize,
  	               agencyName :jsonData.txt_agencyName,
  	               financeStartDate:jsonData.financeStartDate==""?"":jsonData.financeStartDate+"-01-01",
  	               financeEndDate:jsonData.financeEndDate==""?"":jsonData.financeEndDate+"-12-31"
             };    
             return JSON.stringify(param);                   
           },  
           responseHandler:function responseHandler(res) {
          	 if (res.result==0) {
          		 showChart(res.echartList);
  	        	 return {
  	        		 "rows": res.tableList,
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
	 	        field: 'agencyName',
	 	        title: '客户名称',
	 	        align: 'center',
			            valign: 'middle'
			 	},{
	 	        field: 'orgnNum',
	 	        title: '社会统一信用代码证号',
	 	        align: 'center',
			    valign: 'middle'
			 	},{
	 	        field: 'payAmtSum',
	 	        title: '总计融资金额',
	 	        align: 'center',
	 	       valign: 'middle',
				 formatter:function(value){
				   return $.number(value,2);
				            }
			 	}, {
		 	        field: 'payAmtSum',
		 	        title: '总计放款金额',
		 	        align: 'center',
		 	       valign: 'middle',
					 formatter:function(value){
					   return $.number(value,2);
					            }
		 	    },{
		 	        field: 'overdueAmountSum',
		 	        title: '总计逾期金额',
		 	        align: 'center',
		 	       valign: 'middle',
					 formatter:function(value){
					   return $.number(value,2);
					            }
		 	    },{
		 	        field: 'overdueCountSum',
		 	        title: '逾期频率',
		 	        align: 'center',
		 	       valign: 'middle',
                },{
		 	        field: 'overdueRate',
		 	        title: '逾期率',
		 	        align: 'center',
		 	       valign: 'middle',
					 formatter:function(value){
					   return $.number(value,2);
					            }
		 	    }]
       });  
}

function showChart(data){
	//销毁
	var yearsArray = [];//年份数组
	var overDueNum = [];
	var payNum = [];
	$.each(data, function(index, value) {
		yearsArray.push(value.financeEndDate+"年");
		overDueNum.push(value.overdueAmountSum);
		payNum.push(value.payAmtSum);
	});
	 echarts.dispose(document.getElementById('echart'));
	 var myChart = echarts.init(document.getElementById('echart'));
	 option = {
			   /* title: {
			        text: '世界人口总量',
			        subtext: '数据来自网络'
			    },*/
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'shadow'
			        }
			    },
			    legend: {
			        data: ['逾期融资金额', '总计融资金额']
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			             {
			                 type : 'value',
			                 scale:true,
			                 axisLabel : {
			                	 formatter: function (value, index) {
				                		 if(data){
				                			 return value+"百万";
				                		 }
			                		    return value/1000000 +"百万";
			                		}
			                 },
			                 splitLine: {
			                     show: false
			                 },
			                 scale:true,
//			                 splitNumber:3
			             }
			         ],
			    yAxis: {
			        type: 'category',
			        data: yearsArray
			    },
			    series: [
			        {
			            name: '逾期融资金额',
			            type: 'bar',
			            data: overDueNum
			        },
			        {
			            name: '总计融资金额',
			            type: 'bar',
			            data: payNum
			        }
			    ]
			};
     myChart.setOption(option);
}

function searchFun(){
	initTable();
}

function loadDate0(){
	$('#financeStartDate,#financeEndDate').datetimepicker('remove');
	$('#financeStartDate,#financeEndDate').datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayHighlight: true,
		format: 'yyyy',
		startView: 4,
        minView: 4,
		todayBtn: true,
		initialDate : new Date() ,
		pickerPosition: "bottom-left"
	});
}

function numFormat(){
	$("#overdueRate").number(true,2);
}

function clearDate(){
	$("#financeStartDate,#financeEndDate").val("");
}
