$(document).ready(function() {
	$("form").attr("autocomplete","off");
	setForm();
	numFormat();
});

function setForm(){
	var data = {};
	data.taskId = taskId;
	 var options = {
		url : '../../activiti/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				if(jsonData.carCertificateName == ""||jsonData.carCertificateName == null){
					$("#downloadCertificate").hide();
//					$("#downloadCertificate button").removeClass("opacity-100");
//					$("#downloadCertificate button").addClass("opacity-65");
//					$("#downloadCertificate").removeAttr("href");
//					$("#downloadCertificate").removeAttr("download");
				}else{
//					$("#downloadCertificate button").removeClass("opacity-65");
//					$("#downloadCertificate button").addClass("opacity-100");
					$("#downloadCertificate").attr("href","../../.."+jsonData.carCertificate);
					$("#downloadCertificate").attr("download",jsonData.carCertificateName);
				}
				CloudUtils.setForm(jsonData,"addForm");
				initTable(jsonData.tableData)
			} else {
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
	 $('#carInfoTable').bootstrapTable('destroy'); 
		$("#carInfoTable").bootstrapTable({  
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
	            	 return $.number(value,2);
	             }
	  	    }
	 	    ]
	       });  
}



function saveFun(){
	var data = CloudUtils.convertStringJson('addForm');
	data = eval("(" + data + ")");
	var type = $("#agree").val();
	data.agree = type;
	data.advice = $("#advice").val();
	data.taskId = taskId;
	var tableData = $('#carInfoTable').bootstrapTable('getData');
	data.tableData = tableData;
	if(taskDefKey == "usertask4"&&type ==0){
		var options = {
				url : '../../offsetDeposit/agreeThenMod',
				data : JSON.stringify(data),
				callBackFun : function(data) {
					bootbox.alert(data.resultNote,function(){
						window.location.href='../agencyTask/agencyTask.html';
					});
				},
				errorCallback : function(data) {
					bootbox.alert(data.resultNote);
					return false;
				}
			};
	 CloudUtils.ajax(options);
	}else{
		var options = {
				url : '../../offsetDeposit/doAgree',
				data : JSON.stringify(data),
				callBackFun : function(data) {
					bootbox.alert(data.resultNote,function(){
						window.location.href='../agencyTask/agencyTask.html';
					});
				},
				errorCallback : function(data) {
					bootbox.alert(data.resultNote);
					return false;
				}
			};
	 CloudUtils.ajax(options);
	 }
}
function numFormat(){
	$("#repayAmt").number(true,2);
	$("#payOrginAmount").number(true,2);
	$("#financeAmount").number(true,2);
	$("#payAmt").number(true,2);
	$("#financeBalance").number(true,2);
	$("#payActGuarantee").number(true,2);
	$("#offsetGap").number(true,2);
	$("#salesAmount").number(true,2);
	$("#notPayInterest").number(true,2);
}