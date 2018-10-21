var corpId = store.get("corpId")
var roleId =store.get("roleId")
$(document).ready(function() {
	// noinspection JSAnnotator
    if(roleId =='ROLE000016'||roleId=='4028808e668a142011868a1955790005'){
		$("#btn_add").attr("style","display:none;");
	}
	$("form").attr("autocomplete","off");
	CloudUtils.getMenuNames("nav");
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
	});
	initTable();

});




function searchFun() {
	initTable();
}

function initTable() { 
	$('#agencyProjectListTable').bootstrapTable('destroy');
	if(roleId !='ROLE000020'){
		corpId='';
	}
	$("#agencyProjectListTable").bootstrapTable({  
         method: "post", 
         url: "../../supplierProject/list",
         striped: false,  //表格显示条纹  
         pagination: true, //启动分页  
         pageSize: 20,  //每页显示的记录数  
         pageNumber:1, //当前第几页  
         pageList: [20, 50, 100, 200, 500],  //记录数可选列表  
         search: false,  //是否启用查询  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
         //设置为limit可以获取limit, offset, search, sort, order  
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
           $("#sysType").val(4);
           var data = CloudUtils.convertStringJson('searchForm');
           var jsonData = JSON.parse(data);
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               agencyNum: jsonData.txt_agencyCode,
               corpName: jsonData.txt_agencyName,
               sysType:jsonData.sysType,
			   corpId:corpId

               
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
  	        field: 'corpName',
  	        title: '供应商名称',
  	        align: 'center',
  	     	width: 250,
             valign: 'middle'
  	    },{
 	        field: 'corpId',
 	        title: '供应商ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'agencyNum',
 	        title: '供应商代码',
 	        align: 'center',
            valign: 'middle'
        },{
 	        field: 'projectName',
 	        title: '项目名称',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'projectDescribe',
 	        title: '项目描述',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'projectContract',
 	        title: '项目合同',
 	        align: 'center',
            valign: 'middle',
	  formatter:function(value,row,index){
        //  var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="attach" href="javascript:void(0)"></a>';
          var m = '<a class = "glyphicon glyphicon-file yulan" style="color:#d864fd;padding:0px 5px;" title="查看" data-type="view" href="javascript:void(0)"></a>';
          return m ;
      },
    events: 'operateEvents'
 	    },{
 	        field: 'projectInvoice',
 	        title: '项目发票',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'projectQua',
 	        title: '项目资质',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'projectAccept',
 	        title: '验收文件',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'systemTime',
 	        title: '操作时间',
 	        align: 'center',
            valign: 'middle'
 	    }]
       });  
}


function accAgency() {
	$('#mainFrame',top.document).attr('src','supplierManager/project/projectAddManager.html');
}

var row = store.get('agencyRow');//从缓存中获取数据
window.operateEvents={
	'click.view':function (e,value,row,index) {
		$("#modal_contrator").modal("show");



    }
	
	
}



