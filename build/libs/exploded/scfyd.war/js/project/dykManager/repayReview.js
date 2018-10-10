var allRowsObj = {}; //保存所有行

$(function () {
	$("form").attr("autocomplete","off");
	setForm();
    numFormat();
    ajaxAllCarInfo($("#repaymentCorpId").val(), $("#carListInfo").val());
    initCarInfoListTable($("#repaymentCorpId").val(), $("#carListInfo").val());
    // 下载赎车凭证
    var carStolenCertificate = $("#carStolenCertificateUrl").val();
    if (!CloudUtils.isEmpty(carStolenCertificate)) {
    	var suffix = carStolenCertificate.substring(carStolenCertificate.lastIndexOf("."), carStolenCertificate.length);
        var target;
        // 图片格式
    	if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(suffix)) {
    		target = "_blank";
    	} else {
    		target = "_self";
    	}
    	$("#downCarCertificate").attr("href", carStolenCertificate);
    	$("#downCarCertificate").attr("target", target);
    } else {
    	$("#downCarCertificate").hide();
    }
});

function initCarInfoListTable(corpId, carFrameNums) { 
	$('#carInfoListTable').bootstrapTable('destroy'); 
	$("#carInfoListTable").bootstrapTable({  
		method: "post", 
        url: "../../repayInfo/getRepayCarInfoList", 
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
                corpId: corpId,
                carFrameNums: carFrameNums
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

function setForm(){
	var data = {};
	data.taskId = taskId;
	var options = {
		url : '../../activiti/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData, "addForm");
				
				if (jsonData.interestDate == false) {
					$("#divRepayInterestAmt").hide();
				}
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

function numFormat(){
	$("#repaySumAmt").number(true, 2);
	$("#repayCapitalAmt").number(true, 2);
	$("#repayInterestAmt").number(true, 2);
}

function saveFun() {
	var data = CloudUtils.convertAllJson('addForm');
	data = eval("(" + data + ")");
	data.taskId = taskId;
	data.procInstId = procInstId;
	data.agree = $("#agree").val();
	data.advice = $("#advice").val();
	data.allCarInfo = JSON.stringify(allRowsObj);
	
	var options = {
		url : "../../repayInfo/doAgree",
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

function ajaxAllCarInfo(corpId, carFrameNums) {
	var options = {
		url : '../../repayInfo/getRepayCarInfoList',
		data : JSON.stringify({
			isPage: 0,
			corpId: corpId,
            carFrameNums: carFrameNums
		}),
		callBackFun : function(data) {
			if (data.result == 0) {
				$.each(data.dataList, function(i, row) {
					allRowsObj[row.carFrameNum] = row.financeBalance
				});
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