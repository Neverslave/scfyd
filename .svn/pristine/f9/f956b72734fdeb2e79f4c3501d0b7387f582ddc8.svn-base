$(document).ready(function() {
	CloudUtils.getMenuNames("nav");
	loadDict();
	initTable();
	
});

window.operateEvents = {
	'click .push' : function(e, value, row, index) {
		store.set('managementData', row);
		$('#mainFrame',top.document).attr('src','tradfact/project/managementDetail.html');
	}
};
function initTable() {
	$('#financeListTable').bootstrapTable('destroy');
	$("#financeListTable")
			.bootstrapTable(
					{
						method : "post",
						url : "../../tradfact/recommeet/list",
						striped : true, //表格显示条纹
						pagination : true, //启动分页
						pageSize : 5, //每页显示的记录数
						pageNumber : 1, //当前第几页
						pageList : [ 5, 10, 15, 20, 25 ], //记录数可选列表
						search : false, //是否启用查询
						showColumns : false, //显示下拉框勾选要显示的列
						showRefresh : false, //显示刷新按钮
						sidePagination : "server", //表示服务端请求
						//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
						//设置为limit可以获取limit, offset, search, sort, order
						queryParamsType : "undefined",
						queryParams : function queryParams(params) {
							var dataTemp = CloudUtils
									.convertStringJson('searchForm');
							var jsonData = eval("(" + dataTemp + ")");
							jsonData.pageNumber = params.pageNumber;
							jsonData.pageSize = params.pageSize;
							return JSON.stringify(jsonData);
						},
						responseHandler : function responseHandler(res) {
							if (res.result == 0) {
								return {
									"rows" : res.dataList,
									"total" : res.records
								};

							} else {
								bootbox.alert(res.resultNote);
								return {
									"rows" : [],
									"total" : 0
								};
							}
						},
						columns : [
								{
									field : 'projectName',
									title : '项目名称',
									align : 'center',
									valign : 'middle'
								},
								{
									field : 'corpBuyName',
									title : '买方名称',
									align : 'center',
									valign : 'middle'
								},
								{
									field : 'corpSaleName',
									title : '卖方名称',
									align : 'center',
									valign : 'middle'
								},
								{
									field : 'creditMain',
									title : '授信主体',
									align : 'center',
									valign : 'middle',
									formatter : function(value) {
										if (value == '0') {
											return '买方';
										} else if (value == '1') {
											return '卖方';
										}
									}
								},
								{
									field : 'creditAmount',
									title : '授信金额',
									align : 'center',
									valign : 'middle',
									formatter : function(value) {
										return $.number(value, 2);
									}
								},
								{
									field : 'factoringType',
									title : '保理类型',
									align : 'center',
									valign : 'middle',
									formatter : function(value) {
										if (value == '0') {
											return '有追索权保理';
										} else if (value == '1') {
											return '无追索权保理';
										} else if (value == '2') {
											return '明保理';
										} else if (value == '3') {
											return '暗保理';
										} else if (value == '4') {
											return '正向保理';
										} else if (value == '5') {
											return '反向保理';
										} else if (value == '6') {
											return '联合保理';
										} else if (value == '7') {
											return '再保理';
										}

									}
								},
								{
									field : 'operation',
									title : '操作',
									align : 'center',
									valign : 'middle',
									formatter : function(value, row, index) {
										var s = '<a class = "fa fa-edit push" style="color:#278bdd;padding:0px 5px;" title="项目维护" href="javascript:void(0)"></a>';
										return s;
									},
									events : 'operateEvents'
								} ]
					});
}

function searchFun() {
	initTable();
}
