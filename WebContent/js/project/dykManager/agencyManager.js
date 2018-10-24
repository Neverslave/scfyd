$(document).ready(function() {
	$("form").attr("autocomplete","off");
	CloudUtils.getMenuNames("nav");
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
	});
	initTable();
	// 金额项目千分位符表示 
	numFormat();
});

window.operateEvents = {
		'click .detail': function (e, value, row, index) {
			store.set('custRow', row); //把数据存储在缓存中
	        $('#mainFrame', top.document).attr('src', 'supplierManager/companyManager.html?isEdit='+false);
		},
	    'click .modify': function(e, value, row, index) {
	        store.set('custRow', row); //把数据存储在缓存中
	        $('#mainFrame', top.document).attr('src', 'supplierManager/companyManager.html?isEdit='+true);
	    }
};

function searchFun() {
	initTable();
}

function initTable() { 
	$('#agencyListTable').bootstrapTable('destroy');  
	$("#agencyListTable").bootstrapTable({  
         method: "post", 
         url: "../../supplierInfo/list",
         striped: false,  //表格显示条纹  
         pagination: true, //启动分页  
         pageSize: 20,  //每页显示的记录数  
         pageNumber:1, //当前第几页  
         pageList: [20, 50, 100, 200, 500],  //记录数可选列表  
         search: false,  //是否启用查询  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
         showExport: true ,                     //是否显示导出
         exportDataType: "basic" ,              //basic', 'all', 'selected'.
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
           $("#sysType").val(4);
           var data = CloudUtils.convertStringJson('searchForm');
           var jsonData = JSON.parse(data);
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               agencyCode: jsonData.txt_agencyCode,
               agencyName: jsonData.txt_agencyName
               
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
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
        	width: 80,
 	        formatter:function(value,row,index){
 	            var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
 	           var m = '<a class = "fa fa-edit modify" style="color:#278bdd;padding:0px 5px;" data-type="custInfo" title="编辑" href="javascript:void(0)"></a>';
               return d + ' ' + m;
 	        },
 	        events: 'operateEvents'
 	    },{
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
 	        width: 80,
            valign: 'middle'
            	},
			 {
	        field: 'corpType',
	        title: '企业类型',
	        align: 'center',
           valign: 'middle',
           visible: false
 	    },
 	    
 	    {
 	       field: 'locationProvince',
	        title: '所在省份',
	        align: 'center',
           valign: 'middle',
        	visible:false
 	    	
 	    },
 	    {
 	       field: 'locationCity',
	        title: '所在市',
	        align: 'center',
	        	width: 200 ,
	        valign: 'middle',
        	   visible:false
 	    },
 	    {
 	       field: 'locationArea',
	        title: '所在地',
	        align: 'center',
	        width: 200,
          valign: 'middle',
       	   visible:false
 	    },
 	     {
 	        field: 'locationAddress',
 	        title: '详细地址',
 	        align: 'center',
 	        width: 200,
            valign: 'middle'
 	    }, 
 	   {
  	       field: 'registerProvince',
 	        title: '注册省份',
 	        align: 'center',
 	        width: 200,
           valign: 'middle',
        	   visible:false
  	    },
  	    	{
  	 	       field: 'registerCity',
  		        title: '注册市',
  		        align: 'center',
  		        width: 200,
  	          valign: 'middle',
  	       	   visible:false
  	 	    },
  	 	    
  	 	    	
  	 	    	{
  	 	 	       field: 'registerArea',
  	 		        title: '注册地',
  	 		        align: 'center',
  	 		        width: 200,
  	 	          valign: 'middle',
  	 	       	   visible:false
  	 	 	    },
  	 	 	{
  	 	 	       field: 'registerAddress',
  	 		        title: '注册详细地址',
  	 		        align: 'center',
  	 		        width: 200,
  	 	          valign: 'middle',
  	 	       	   visible:false
  	 	 	    },
  	 	 	    
  	 	 	    {
  	 	 	       field: 'email',
  	 	        title: '邮箱',
  	 	        align: 'center',
  	 	        width: 200,
  	           valign: 'middle',
  	        	   visible:false
  	  	    },
  	  	{
  	 	       field: 'uniformCreditCode',
  		        title: '营业执照',
  		        align: 'center',
  		        width: 200,
  	          valign: 'middle',
  	       	   visible:false
  	 	    },
  	 
  	    {
 	        field: 'legalPerson',
 	        title: '法人',
 	        align: 'center',
 	        width: 120,
            valign: 'middle'
 	    }, {
 	        field: 'fixedPhone',
 	        title: '固定电话',
 	        align: 'center',
 	        width: 140,
            valign: 'middle'
 	    },
 	    {
   	       field: 'businessScope',
	        title: '经营范围',
	        align: 'center',
	        width: 200,
          valign: 'middle',
       	   visible:false
 	    },
 	    
 	    
 	   {
  	       field: 'createTime',
 	        title: '创建时间',
 	        align: 'center',
 	        width: 200,
           valign: 'middle',
        	   visible:false
  	    },
 	    {
 	        field: 'note',
 	        title: '备注',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }]
       });  
}

function showDetailInfo(row) {
	$("#addModal").modal({backdrop: 'static', keyboard: false});
	CloudUtils.setForm(row, "addForm");
	$("#addForm").find('input').attr("readonly", true);
	$("#addForm").find('select').attr("disabled", true);
	$(".required").hide();
}

function accAgency() {
	$('#mainFrame',top.document).attr('src','supplierManager/AgencyManager/agencyAdd.html');
}

function changeArea(areaVal) {
	$("#representSearch").empty();
	if (areaVal == '0') {
		$("#representSearch").append("<option value='0'>南京</option>")
						.append("<option value='1'>上海</option>");
	} else if (areaVal == '1') {
		$("#representSearch").append("<option value='2'>西安</option>")
						.append("<option value='3'>成都</option>");
	} else if (areaVal == '2') {
		$("#representSearch").append("<option value='4'>广州</option>")
						.append("<option value='5'>武汉</option>")
						.append("<option value='6'>郑州</option>");
	} else if (areaVal == '3') {
		$("#representSearch").append("<option value='7'>北京</option>")
						.append("<option value='8'>沈阳</option>")
						.append("<option value='9'>济南</option>");
	}
}

/**
 * 金额项目千分位符表示
 */
function numFormat(){
	$("input[name='maxCreditAmount']").number(true, 2);
	$("input[name='firstTwoYearsPickupNum']").number(true, 0);
	$("input[name='firstTwoYearsRetailNum']").number(true, 0);
	$("input[name='firstTwoYearsSaleRank']").number(true, 0);
	$('input[name="thisYearPlanPickupNum"]').number(true, 0);
	$('input[name="thisYearPlanSales"]').number(true, 2);
	$('#maxCreditAmountStart').number(true, 2);
	$('#maxCreditAmountEnd').number(true, 2);
	$('#maxLscreditAmountStart').number(true, 2);
	$('#maxLscreditAmountEnd').number(true, 2);
	$('#useAbleAmountStrat').number(true, 2);
	$('#useAbleAmountEnd').number(true, 2);
	$('#useLsableAmountStrat').number(true, 2);
	$('#useLsableAmountEnd').number(true, 2);
}