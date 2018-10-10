var selDetailRowsObj = {};

$(function(){
	getVariableByTaskId();
	numFormat();
	
	var carStolenCertificate = $("#repayDetailForm #carStolenCertificateUrl").val();
	if (!CloudUtils.isEmpty(carStolenCertificate)) {
		var suffix = carStolenCertificate.substring(carStolenCertificate.lastIndexOf("."), carStolenCertificate.length);
	    var target;
	    // 图片格式
		if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(suffix)) {
			target = "_blank";
		} else {
			target = "_self";
		}
		$("#downCarCertificateHis").attr("href", carStolenCertificate);
		$("#downCarCertificateHis").attr("target", target);
	} else {
		$("#downCarCertificateHis").hide();
	}
});

function getVariableByTaskId(){
	var row = store.get('agencyRow');//从缓存中获取数据
	var taskId = row.taskId;
	var taskDefKey = row.taskDefKey;
	var options = {
		url : '../../activiti/findDataByTaskId',
		data : '{"taskId":"'+taskId+'"}',
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData,"repayDetailForm");
				
				var selCarFrameNums = jsonData.carListInfo;
				$.each(selCarFrameNums.split(","), function(i, val) {
					selDetailRowsObj[val] = val;
				});
				
				var allCarInfo = JSON.parse(jsonData.allCarInfo);
				var allCarFrameNums = [];
				for (var key in allCarInfo) {
					if (allCarInfo.hasOwnProperty(key)) {
						allCarFrameNums.push(key);
					}
				}
				
				initCarInfoListTable(allCarFrameNums.join(","), allCarInfo, taskDefKey);
				if (taskDefKey == 'usertask2') {
					$('#carInfoListTableDetail').bootstrapTable('hideColumn', 'checkStatus');
				}
				
				$("#carInfoListTableDetail [name='btSelectAll']").prop("disabled", true);
				
				if (jsonData.interestDate == false) {
					$("#repayDetailForm #divRepayInterestAmt").hide();
				}
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

function initCarInfoListTable(carFrameNums, allCarInfo, taskDefKey) { 
	$('#carInfoListTableDetail').bootstrapTable('destroy'); 
	$("#carInfoListTableDetail").bootstrapTable({  
		method: "post", 
        url: "../../repayInfo/getAllCarInfoList", 
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
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType : "undefined",   
        queryParams: function queryParams(params) {   //设置查询参数  
        	var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                carFrameNums: carFrameNums
            };    
            return JSON.stringify(param);
        },  
        responseHandler:function responseHandler(res) {
       	if (res.result==0) {
       		$.each(res.dataList, function(i, row) {
       			row.checkStatus = row.carFrameNum in selDetailRowsObj;
       			row.financeBalance = allCarInfo[row.carFrameNum];
       		});
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
	 	        field: 'checkStatus',
	 	        checkbox: taskDefKey == 'usertask1',
	 	        formatter: function(value,row,index) {
	 	        	return {
	 	        		disabled: true,
	 	        		checked: row.checkStatus
	 	        	}
	 	        }
		 	}, {
	 	        field: 'carFrameNum',
	 	        title: '车架号',
	 	        align: 'center',
	            valign: 'middle'
		 	}, {
	 	        field: 'carActualPrice',
	 	        title: '实际提车价（元）',
	 	        align: 'center',
	            valign: 'middle',
	            formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
	 	    }, {
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
	             formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
	 	    }, {
	 	        field: 'payAmt',
	 	        title: '付款金额',
	 	        align: 'center',
	             valign: 'middle',
	             formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
	 	    }, {
	 	        field: 'financeBalance',
	 	        title: '付款余额',
	 	        align: 'center',
	             valign: 'middle',
	             formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
	 	    }]
       });  
}

function numFormat(){
	$("#repayDetailForm #repaySumAmt").number(true, 2);
	$("#repayDetailForm #repayCapitalAmt").number(true, 2);
	$("#repayDetailForm #repayInterestAmt").number(true, 2);
}