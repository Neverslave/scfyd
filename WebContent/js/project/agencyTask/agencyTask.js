$(function () {
    InitTable();
    dateload();
});

function InitTable(){
	$('#daiban').bootstrapTable('destroy');  
	$("#daiban").bootstrapTable({  
	     method: "post", 
	     url: "../../activiti/getAgencyTaskList", 
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
	       var data = CloudUtils.convertStringJson('searchForm');
           var jsonData = eval("(" + data + ")");
	       var param = {    
	           pageNumber: params.pageNumber,    
	           pageSize: params.pageSize,
	           taskName:jsonData.txt_taskName,
	           procdefName:jsonData.txt_procdefName,
	           createTime:jsonData.txt_createTime
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
	    		 alert(res.resultNote);
	    		 return {
			        	 "rows": [],
			        	 "total": 0
			        	 };
	    	 }
	     },
	     columns: [{
		        field: 'taskName',
		        title: '角色类型',
		        align: 'center',
	            valign: 'middle',
	            visible:false
		    }, {
		        field: 'procdefName',
		        title: '流程名称',
		        align: 'center',
	            valign: 'middle'
		    }, {
		        field: 'originAssignee',
		        title: '发起人',
		        align: 'center',
		        width:100,
	            valign: 'middle'
		    },{
		        field: 'originAssigneeGs',
		        title: '发起人公司',
		        align: 'center',
		        width:300,
	            valign: 'middle'
		    },{
		        field: 'procInstId',
		        title: '进程Id',
		        align: 'center',
	            valign: 'middle',
	            visible:false
		    }, {
		        field: 'taskId',
		        title: 'taskId',
		        align: 'center',
	            valign: 'middle',
	            visible:false
	            
		    }, {
		        field: 'procdefKey',
		        title: 'procdefKey',
		        align: 'center',
	            valign: 'middle',
	            visible:false
		    },{
		        field: 'taskDefKey',
		        title: '节点id',
		        align: 'center',
	            valign: 'middle',
	            visible:false
		    },{
		        field: 'preAssignee',
		        title: '上一执行人',
		        align: 'center',
		        width:100,
	            valign: 'middle'
	            
		    },{
		        field: 'preAssigneeGs',
		        title: '上一执行人公司',
		        align: 'center',
		        width:300,
	            valign: 'middle'
	            
		    },{
		        field: 'preDefKey',
		        title: '上一执行key',
		        align: 'center',
	            valign: 'middle',
	            visible:false
	            
		    },{
		        field: 'createTime',
		        title: '创建时间',
		        align: 'center',
	            valign: 'middle'
		    },{
		        title: '事项状态',
		        align: 'center',
	            valign: 'middle',
	            formatter:function(value,row,index){
	 					return "待办";
	 			}
		    },{
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	 	        formatter:function(value,row,index){
	 	        	var m = '<a class = "fa fa-edit mod" style="color:#278bdd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
		 	        return m;
	 	        },
	 	        events: 'operateEvents'
	 	    }]
	   });  
}

function searchFun(){
	InitTable();
}

window.operateEvents = {
		'click .mod': function (e, value, row, index) {
			$('#mainFrame',top.document).attr('src','project/agencyCommon/agencyCommon.html?taskId='+row.taskId+'&procInstId='+row.procInstId+'&taskDefKey='+row.taskDefKey+'&procdefKey='+row.procdefKey+'&preDefKey='+row.preDefKey);
		}
	
};

function initTaskTable(procInstId){
	$('#taskListTable').bootstrapTable('destroy');  
	$("#taskListTable").bootstrapTable({  
	     method: "post", 
	     url: "../../activiti/getHistoryTaskList", 
	     striped: false,  //表格显示条纹  
	     search: false,  //是否启用查询  
	     showColumns: false,  //显示下拉框勾选要显示的列  
	     showRefresh: false,  //显示刷新按钮  
	     sidePagination: "server", //表示服务端请求  
	     //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
	     //设置为limit可以获取limit, offset, search, sort, order  
	     queryParamsType : "undefined",   
	     queryParams: function queryParams(params) {   //设置查询参数  
	       var param = {    
	    	   procInstId: procInstId
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
	    		 alert(res.resultNote);
	    		 return {
			        	 "rows": [],
			        	 "total": 0
			        	 };
	    	 }
	     },
	     columns: [{
		        field: 'procInstId',
		        title: '进程Id',
		        align: 'center',
	            valign: 'middle',
	            visible:false
		    }, {
		        field: 'taskId',
		        title: 'taskId',
		        align: 'center',
	            valign: 'middle',
	            visible:false
	            
		    },{
		        field: 'name',
		        title: '任务名称',
		        align: 'center',
	            valign: 'middle'
		    }, {
		        field: 'assignee',
		        title: '办理人',
		        align: 'center',
	            valign: 'middle'
		    },{
		        field: 'createTime',
		        title: '创建时间',
		        align: 'center',
	            valign: 'middle'
		    },{
		        field: 'endTime',
		        title: '结束时间',
		        align: 'center',
	            valign: 'middle'
		    },{
	 	        field: 'operation',
	 	        title: '编辑',
	 	        align: 'center',
	 	       formatter:function(value,row,index){
	 	        	var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
		 	        return d;
	 	        },
	 	        events: 'operateEvents'
	 	    }]
	   });  
}

function dateload(){
	$("#txt_createTime").datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
}