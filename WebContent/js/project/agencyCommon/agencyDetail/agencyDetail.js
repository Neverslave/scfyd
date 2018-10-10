$(document).ready(function() {
	//modal绑定事件
	$('#detailAddModal').on('hidden.bs.modal', function(){
		$("#detailAddForm")[0].reset();
	});
	detailInitTable();
	getVariableByTaskId();
	
});

window.operateEvents = {
	'click .detailHistory': function (e, value, row, index) {
		detailHistory(row);
	},
};

function detailInitTable() { 
	$('#detailAgencyListTable')
	.bootstrapTable('destroy')
	.bootstrapTable({  
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
 	        field: 'corpName',
 	        title: '经销商名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'agencyNum',
 	        title: '经销商代码',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'maxCreditAmount',
 	        title: '最高授信额度',
 	        align: 'center',
            valign: 'middle',
            formatter: function(value,row,index){
 	            return $.number(value, 2);
 	        }
 	    }, {
 	        field: 'officeAddress',
 	        title: '公司地址',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'contactInfo',
 	        title: '联系方式',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'fixedPhone',
 	        title: '固定电话',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'area',
 	        title: '所属区域',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'represent',
 	        title: '所属商代处',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'firstTwoYearsPickupNum',
 	        title: '前2年度提车数量',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter: function(value,row,index){
 	            return $.number(value, 0);
 	        }
 	    }, {
 	        field: 'firstTwoYearsRetailNum',
 	        title: '前2年度零售数量',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter: function(value,row,index){
 	            return $.number(value, 0);
 	        }
 	    }, {
 	        field: 'firstTwoYearsSaleRank',
 	        title: '前2年度销售排名',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter: function(value,row,index){
 	            return $.number(value, 0);
 	        }
 	    }, {
 	        field: 'thisYearPlanPickupNum',
 	        title: '本年度计划提车数量',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter: function(value,row,index){
 	            return $.number(value, 0);
 	        }
 	    }, {
 	        field: 'thisYearPlanSales',
 	        title: '本年度计划销售额',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter: function(value,row,index){
 	            return $.number(value, 2);
 	        }
 	    }, {
 	        field: 'note',
 	        title: '备注',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
 	        formatter:function(value,row,index){
 	            var d = '<a class = "fa fa-list-ul detailHistory" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
 	            return d;
 	        },
 	        events: 'operateEvents'
 	    }]
       });
}

function detailHistory(row) {
	CloudUtils.getTab("../../project/dykManager/agencyDetail/agencyDetailOther.html", "agencyDetailModal");
	detailChangeArea(row.area);
	CloudUtils.setForm(row, "detailAddForm");
	$("#detailAddForm").find('select').attr("disabled", true);
	$("#detailAddModal").modal({backdrop: 'static', keyboard: false});
	detailNumFormat();
}

function detailChangeArea(areaVal) {
	$("#detailAddForm #represent").empty();
	if (areaVal == '0') {
		$("#detailAddForm #represent").append("<option value='0'>南京</option>")
						.append("<option value='1'>上海</option>");
	} else if (areaVal == '1') {
		$("#detailAddForm #represent").append("<option value='2'>西安</option>")
						.append("<option value='3'>成都</option>");
	} else if (areaVal == '2') {
		$("#detailAddForm #represent").append("<option value='4'>广州</option>")
						.append("<option value='5'>武汉</option>")
						.append("<option value='6'>郑州</option>");
	} else if (areaVal == '3') {
		$("#detailAddForm #represent").append("<option value='7'>北京</option>")
						.append("<option value='8'>沈阳</option>")
						.append("<option value='9'>济南</option>");
	}
}

/**
 * 金额项目千分位符表示
 */
function detailNumFormat(){
	$("#detailAddForm #maxCreditAmount").number(true, 2);
	$("#detailAddForm #firstTwoYearsPickupNum").number(true, 0);
	$("#detailAddForm #firstTwoYearsRetailNum").number(true, 0);
	$("#detailAddForm #firstTwoYearsSaleRank").number(true, 0);
	$('#detailAddForm #thisYearPlanPickupNum').number(true, 0);
	$('#detailAddForm #thisYearPlanSales').number(true, 2);
}

function getVariableByTaskId() {
	var row = store.get('agencyRow');//从缓存中获取数据
	var taskId = row.taskId;
	var options = {
		url : '../../activiti/findDataByTaskId',
		data : '{"taskId":"'+taskId+'"}',
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData, "detailNoteForm");
				var agencyListInfo = JSON.parse(jsonData.agencyListInfo);
				$.each(agencyListInfo, function(i, row) {
					$("#detailAgencyListTable").bootstrapTable('append', row);
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
