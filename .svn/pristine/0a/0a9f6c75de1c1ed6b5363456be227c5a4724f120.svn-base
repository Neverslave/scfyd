$(function(){
	getVariableByTaskId();
	numFormat();
});
function getVariableByTaskId(){
	var row = store.get('agencyRow');//从缓存中获取数据
	var taskId = row.taskId;
	 var options = {
				url : '../../activiti/findDataByTaskId',
				data : '{"taskId":"'+taskId+'"}',
				callBackFun : function(data) {
					if (data.result == 0) {
						var jsonData =  eval("(" + data.str + ")");
						if(jsonData.carCertificateName == ""||jsonData.carCertificateName == null){
							$("#detailHisFrom #downloadCertificate").hide();
//							$("#detailHisFrom #downloadCertificate button").removeClass("opacity-100");
//							$("#detailHisFrom #downloadCertificate button").addClass("opacity-65");
//							$("#detailHisFrom #downloadCertificate").removeAttr("href");
//							$("#detailHisFrom #downloadCertificate").removeAttr("download");
						}else{
//							$("#detailHisFrom #downloadCertificate button").removeClass("opacity-65");
//							$("#detailHisFrom #downloadCertificate button").addClass("opacity-100");
							$("#detailHisFrom #downloadCertificate").attr("href","../../.."+jsonData.carCertificate);
							$("#detailHisFrom #downloadCertificate").attr("download",jsonData.carCertificateName);
						}
						 CloudUtils.setForm(jsonData,"detailHisFrom");
						 initTable(jsonData.tableData)
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

function initTable(data){
	 $('#carInfoTableHis').bootstrapTable('destroy'); 
		$("#carInfoTableHis").bootstrapTable({  
			 method: "post", 
		     data : data, 
		     striped: true,  //表格显示条纹  
		     search: false,  //是否启用查询  
		     showColumns: false,  //显示下拉框勾选要显示的列  
		     showRefresh: false,  //显示刷新按钮  
		     sidePagination: "server", //表示服务端请求  
		     //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		     //设置为limit可以获取limit, offset, search, sort, order  
		     queryParamsType : "undefined",    
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
	  	        field: 'carFrameNum',
	  	        title: '车架号',
	  	        align: 'center',
	             valign: 'middle'
	  	    }, {
	  	        field: 'carActualPrice',
	  	        title: '实际提车价(元)',
	  	        align: 'center',
	             valign: 'middle',
	             formatter:function(value){
		             	return $.number(value, 2);
		             }
	  	    }
	 	    ]
	       });  
}
function numFormat(){
	$("#detailHisFrom #repayAmt").number(true,2);
	$("#detailHisFrom #payOrginAmount").number(true,2);
	$("#detailHisFrom #financeAmount").number(true,2);
	$("#detailHisFrom #payAmt").number(true,2);
	$("#detailHisFrom #financeBalance").number(true,2);
	$("#detailHisFrom #payActGuarantee").number(true,2);
	$("#detailHisFrom #offsetGap").number(true,2);
	$("#detailHisFrom #salesAmount").number(true,2);
	$("#detailHisFrom #notPayInterest").number(true,2);
}

