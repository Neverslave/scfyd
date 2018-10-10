var IS_CUSTOMER_HIDDEN = false;

$(document).ready(function() {
	CloudUtils.getMenuNames("nav");
	
	$('#detailModal').on('hidden.bs.modal', function() {
        $("#detailForm")[0].reset();
    });
	
	var roleId = store.get("roleId");
	if (roleId == 'ROLE000020') {// 经销商
		IS_CUSTOMER_HIDDEN = true;
		$("#divAgencyName").hide();
	}
	
	initTable();
});

window.detailEvents = {
    'click .detail': function (e, value, row, index) {
    	detailFun(row);
    },
};

function searchFun(){
	initTable();
}

function detailFun(row) {
	$('#detailModal').modal({backdrop: 'static', keyboard: false});
	CloudUtils.setForm(row,'detailForm');
 	contractFileTable(row.contractNo);
}

function initTable() { 
	$('#contractListInfo').bootstrapTable('destroy'); 
	$("#contractListInfo").bootstrapTable({  
		 method: "post", 
         url: "../contractInfo/listNew", 
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
           var data = CloudUtils.convertAllJson('searchForm');
           var jsonData = eval("(" + data + ")");
          
           var param = {    
               pageNumber: params.pageNumber,
               pageSize: params.pageSize,
               contractNo: jsonData.contractNo,
               agencyName: jsonData.agencyName
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
 	        field: 'contractNo',
 	        title: '合同编号',
 	        align: 'center',
            valign: 'middle'
       },{
 	        field: 'agencyNum',
 	        title: '经销商代码',
 	        align: 'center',
            valign: 'middle',
            visible: !IS_CUSTOMER_HIDDEN
 	   },{
	        field: 'agencyName',
	        title: '经销商名称',
	        align: 'center',
	        valign: 'middle',
	        visible: !IS_CUSTOMER_HIDDEN
 	   },{
 	        field: 'signDate',
 	        title: '合同签约时间',
 	        align: 'center',
            valign: 'middle',
           
 	   },{
 	        field: 'detail',
 	        title: '详情',
 	        align: 'center',
            valign: 'middle',
 	        formatter:function(value,row,index){
 	        	var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
 	            return d;
 	        },
 	        events: 'detailEvents'
 	    }]
       });
}

function contractFileTable(contractNo) {
	$('#contractInfoList').bootstrapTable('destroy');
	$("#contractInfoList").bootstrapTable({
		 method: "post", 
         url: "../contractInfo/fileListNew", 
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
             return JSON.stringify({
            	 contractNo: contractNo
             });
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
 	        field: 'fileName',
 	        title: '附件名称',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
	 			var s = '<a target="view_window" href="/../..'+row.filePath+'" download="'+value+'">'+value+'</a>';
	 			return s;
 		    }
 	    }, {
 	        field: 'fileType',
 	        title: '文件格式',
 	        align: 'center',
            valign: 'middle',
 	    }, {
 	        field: 'fileSize',
 	        title: '文件大小(KB)',
 	        align: 'center',
            valign: 'middle',
 	    }]
       });
}