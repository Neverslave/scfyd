$(function(){

	$("input").attr("readonly",true);
	$("select").attr("disabled",true); 

	setForm();



	
});

function setForm(){
	var row = store.get('agencyRow');//从缓存中获取数据
	var taskId002 = row.taskId;
	var taskDefKey = row.taskDefKey;
	
	var data = {};
	data.taskId = taskId002;
	
	 var options = {
		url : '../../activiti/findDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData,"projectNoteForm");		
				custManage.contractInfoTable(jsonData.contractInfoList);
				initDetailForm(jsonData.corpId);
            	$("#projectNoteForm #corpNameTitle").text(jsonData.corpName);
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
function initDetailForm(corpId){
	 var data = {
			 sysType: 4,  
			 corpId:corpId
	 };
	 var options = {
				url : '../../supplierInfo/list',
				data: JSON.stringify(data),
				callBackFun : function(data) {
					if (data.result == 0) {				
						CloudUtils.setForm(data.dataList[0],'detailNoteForm');						
						$("#detailNoteForm #corpNameTitle").text(data.dataList[0].corpName);						
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

var custManage = new Object({
contractInfoTable: function(data) {
    $('#contractInfoNoteTable').bootstrapTable('destroy');
    $("#contractInfoNoteTable").bootstrapTable({
        method: "post",
        data: data,
        striped: false, //表格显示条纹  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
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
        columns: [
	            {
		 	        field: 'contractid',
		 	        title: '合同id',
		 	        align: 'center',
		            valign: 'middle',
		            visible:false
		 	    },{
		 	        field: 'contractName',
		 	        title: '合同名称',
		 	        align: 'center',
		            valign: 'middle',
		 	    },{
		 	        field: 'contractNum',
		 	        title: '合同编号',
		 	        align: 'center',
		 	        valign: 'middle'
		 	    }, {
		 	        field: 'contractType',
		 	        title: '业务类型',
		 	        align: 'center',
		             valign: 'middle',
		 	    }, {
		 	        field: 'endDate',
		 	        title: '合同到期日',
		 	        align: 'center',
		             valign: 'middle',
		 	    },{
		 	        field: 'fileName',
		 	        title: '合同pdf名称',
		 	        align: 'center',
		            valign: 'middle',
		            visible:false
		 	    },{
		 	        field: 'fileUrl',
		 	        title: '合同地址',
		 	        align: 'center',
		            valign: 'middle',
		            visible:false
		 	    }, {
		 	        field: 'operation',
		 	        title: '操作',
		 	        align: 'center',
		            valign: 'middle',
		 	        formatter:function(value,row,index){
		 	        	var m = '<a class = "glyphicon glyphicon-file yulan" style="color:#278bdd;padding:0px 5px;" title="预览" data-type="contract" href="javascript:void(0)"></a>';
		 	            return  m;
		 	        },
		 	        events: 'operateEvents'
		 	    }
	 	    ]
    });　　　　
}
　　});

window.operateEvents = {
	    'click .yulan': function (e, value, row, index) {
	    	window.open(row.fileUrl);//预览pdf的js方法
	    }
 };






