$(function(){
	ajaxRelaCorps();
	ajaxRzTemplate();
	initInterestTable();
	getVariableByTaskId();
	numFormat();
	$("#detailHisFrom #rzTemplate").prop("disabled", 'disabled');
});

function ajaxRelaCorps() {
    var options = {
        url: '../../product/list',
        data: '{"isPage": 0,"productType":0}',
        callBackFun: function(data) {
            var control1 = $('#detailHisFrom #productId');
            $.each(data.dataList, function(index, units) {
                control1.append("<option value=" + units.productId + ">" + units.productName + "</option>");
            });
        },
        errorCallback: function(data) {
            alert("error");
        }
    };
    CloudUtils.ajax(options);
}


function detail_click_YL(){
	window.open("../.." + $("#detailHisFrom #templateUrl").val());
}

function getVariableByTaskId(){
	var row = store.get('agencyRow');//从缓存中获取数据
	var taskId = row.taskId;
	 var options = {
				url : '../../activiti/findDataByTaskId',
				data : '{"taskId":"'+taskId+'"}',
				callBackFun : function(data) {
					if (data.result == 0) {
						var obj = JSON.parse(data.str);
						var interestListInfo = obj.interestListInfo;
						CloudUtils.setForm(obj, "detailHisFrom");
						if (interestListInfo != null && interestListInfo != '') {
							$.each(JSON.parse(interestListInfo), function(i, row) {
								$("#interestInfoList3").bootstrapTable('append', row);
							});
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


function initInterestTable() {
	$('#interestInfoList3').bootstrapTable('destroy'); 
	$("#interestInfoList3").bootstrapTable({  
		 method: "post", 
         url: "", 
         striped: true,  //表格显示条纹  
         pagination: false, //启动分页  
         search: false,  //是否启用查询  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
         //设置为limit可以获取limit, offset, search, sort, order  
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
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
 	        field: 'rateStandard',
 	        title: '利率标准',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'dykRate',
 	        title: '利率(%)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index) {
				return $.number(value, 2);
	    	}
 	    }, {
 	        field: 'interest',
 	        title: '日利息',
 	        align: 'center',
 	        valign: 'middle',
 	        formatter:function(value,row,index) {
 	        	return $.number(value, 2);
	    	}
 	    }]
       });
}

function numFormat(){
	$("#detailHisFrom #maxCredit").number(true, 2);	//最高信用额度
	$("#detailHisFrom #availableCredit").number(true, 2);	//可用信用额度
	$("#detailHisFrom #financeRate").number(true, 2);	//融资比例
	$("#detailHisFrom #cashRate").number(true, 4);	//费率
	$("#detailHisFrom #financeAmount").number(true, 2);	//融资金额
	$("#detailHisFrom #expense").number(true, 2);	//费用
	$("#detailHisFrom #payAbleGuarantee").number(true, 2);	//费用
	$("#detailHisFrom #payActGuarantee").number(true, 2);	//费用
	$("#detailHisFrom #guaranteeAccountAmt").number(true, 2);	//费用
}

function ajaxRzTemplate() {
	var options = {
		url : '../../ydcommon/cnhTemplates',
		data : JSON.stringify({
			templateType: '0'
		}),
		callBackFun : function(data) {
			if(data.result==0){
				$.each(data.dataList, function(i, rec) {
					$("#detailHisFrom #rzTemplate").append('<option value="' + rec.templateKey +'">' + rec.templateName + '</option>')
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