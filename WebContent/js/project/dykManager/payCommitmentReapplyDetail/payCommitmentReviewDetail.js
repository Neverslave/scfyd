$(function() {
	ajaxFkTemplate();
	numFormat();
	initCarInfoListTable();
    getVariableByTaskId();
    $('#detailHisForm #fkTemplate').prop("disabled", 'disabled');
});

function detail_click_pay(){
	window.open("../.." + $("#detailHisForm #templateUrl").val());
}

function getVariableByTaskId() {
    var row = store.get('agencyRow'); //从缓存中获取数据
    var taskId = row.taskId;
    var options = {
        url: '../../activiti/findDataByTaskId',
        data: '{"taskId":"' + taskId + '"}',
        callBackFun: function(data) {
            if (data.result == 0) {
                var jsonData = eval("(" + data.str + ")");
                var carListInfo = jsonData.carListInfo;
				$.each(JSON.parse(carListInfo), function(i, row) {
					$("#carInfoListHisTable").bootstrapTable('append', row);
				});
                CloudUtils.setForm(jsonData, "detailHisForm");
            } else {
                bootbox.alert(data.resultNote);
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

function initCarInfoListTable() { 
	$('#carInfoListHisTable').bootstrapTable('destroy'); 
	$("#carInfoListHisTable").bootstrapTable({  
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
          return null;
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
	 	        field: 'fileUrl',
	 	        title: '附件地址',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
		 	}, {
	 	        field: 'fileName',
	 	        title: '附件名称',
	 	        align: 'center',
	            valign: 'middle',
	            formatter:function(value,row,index){
					 var s = '<a target="view_window" href="/../..'+row.fileUrl+'" download="'+value+'">'+value+'</a>';
			         return s;
		           
		        }
	 	    }, {
	 	        field: 'fileType',
	 	        title: '文件格式',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'fileSize',
	 	        title: '文件大小(KB)',
	 	        align: 'center',
	             valign: 'middle'
	 	    }]
       });  
}

function numFormat(){
	$("#detailHisForm #maxCredit").number(true, 2);
	$("#detailHisForm #availableCredit").number(true, 2);
	$("#detailHisForm #payM").number(true, 2);
	$("#detailHisForm #guaranteeAmt").number(true, 2);
	$("#detailHisForm #payActGuarantee").number(true, 2);
	$("#detailHisForm #guaranteeDiff").number(true, 2);
	$("#detailHisForm #financeAmount").number(true, 2);
}

function ajaxFkTemplate() {
	var options = {
		url : '../../ydcommon/cnhTemplates',
		data : JSON.stringify({
			templateType: '1'
		}),
		callBackFun : function(data) {
			if(data.result==0){
				$.each(data.dataList, function(i, rec) {
					if (i == 0) {
						$("#detailHisForm #templateUrl").val(rec.templatePath);
					}
					$("#detailHisForm #fkTemplate").append('<option value="' + rec.templateKey +'">' + rec.templateName + '</option>')
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