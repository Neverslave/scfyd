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
				CloudUtils.setForm(jsonData,"projectForm");	
				console.log("jsonData");
				custManage.contractInfoTable(jsonData.contractInfoList);
				custManage.invoiceInfoTable(jsonData.invoiceInfoList);
				custManage.quaInfoTable(jsonData.quaInfoList);
				custManage.acceptInfoTable(jsonData.acceptInfoList);
				custManage.noObjectionInfoTable(jsonData.noObjectionInfoList);
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
	    $('#contractInfoTable').bootstrapTable('destroy');
	    $("#contractInfoTable").bootstrapTable({
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
			 	        	var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="contract" href="javascript:void(0)"></a>';
			 	        	var m = '<a class = "glyphicon glyphicon-file yulan" style="color:#d864fd;padding:0px 5px;" title="预览" data-type="contract" href="javascript:void(0)"></a>';
			 	            return r+"  "+m;
			 	        },
			 	        events: 'operateEvents'
			 	    }
		 	    ]
	    });　　　　
	}
	　　},
	invoiceInfoTable():function(data){
		 $('#invoiceInfoTable').bootstrapTable('destroy');
		    $("#invoiceInfoTable").bootstrapTable({
		        method: "post",
		        /*url: "../contractinfo/list", */
		        //striped: true,  //表格显示条纹
		        //pagination: true, //启动分页
		        //pageSize: 5,  //每页显示的记录数
		        //pageNumber:1, //当前第几页
		        // pageList: [5, 10, 15, 20, 25],  //记录数可选列表
		        search: false,  //是否启用查询
		        showColumns: false,  //显示下拉框勾选要显示的列
		        showRefresh: false,  //显示刷新按钮
		        sidePagination: "client", //表示服务端请求
		        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
		        //设置为limit可以获取limit, offset, search, sort, order
		        queryParamsType : "undefined",
		        queryParams: function queryParams(params) {},
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
		        columns: [
		            {
		                field: 'contractid',
		                title: '发票编号',
		                align: 'center',
		                valign: 'middle',
		                visible:false
		            },{
		                field: 'contractName',
		                title: '银行账号',
		                align: 'center',
		                valign: 'middle',
		            },{
		                field: 'contractNum',
		                title: '发票金额',
		                align: 'center',
		                valign: 'middle'
		            }, {
		                field: 'invoicefileName',
		                title: '合同pdf名称',
		                align: 'center',
		                valign: 'middle',
		                visible:false
		            },{
		                field: 'invoicefileUrl',
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
		                    var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="invoice" href="javascript:void(0)"></a>';
		                    var m = '<a class = "glyphicon glyphicon-file previewInvoice" style="color:#278bdd;padding:0px 5px;" title="预览" data-type="invoice" href="javascript:void(0)"></a>';
		                    return  r+"  "+m;
		                },
		                events: 'operateEvents'
		            }
		        ]
		    });
		},
	 quaInfoTable(): function(data){
		 $('#quaInfoTable').bootstrapTable('destroy');
		    $("#quaInfoTable").bootstrapTable({
		        method: "post",
		        /*url: "../contractinfo/list", */
		        //striped: true,  //表格显示条纹
		        //pagination: true, //启动分页
		        //pageSize: 5,  //每页显示的记录数
		        //pageNumber:1, //当前第几页
		        // pageList: [5, 10, 15, 20, 25],  //记录数可选列表
		        search: false,  //是否启用查询
		        showColumns: false,  //显示下拉框勾选要显示的列
		        showRefresh: false,  //显示刷新按钮
		        sidePagination: "client", //表示服务端请求
		        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
		        //设置为limit可以获取limit, offset, search, sort, order
		        queryParamsType : "undefined",
		        queryParams: function queryParams(params) {},
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
		        columns: [
		            {
		                field: 'contractid',
		                title: '发票编号',
		                align: 'center',
		                valign: 'middle',
		                visible:false
		            },{
		                field: 'contractName',
		                title: '银行账号',
		                align: 'center',
		                valign: 'middle',
		                visible:false
		            },{
		                field: 'contractNum',
		                title: '发票金额',
		                align: 'center',
		                valign: 'middle',
		                visible:false
		            }, {
		                field: 'quafileName',
		                title: '文件pdf名称',
		                align: 'center',
		                valign: 'middle'
		            },{
		                field: 'quafileUrl',
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
		                    var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="qua" href="javascript:void(0)"></a>';
		                    var m = '<a class = "glyphicon glyphicon-file previewQua" style="color:#278bdd;padding:0px 5px;" title="预览" data-type="qua" href="javascript:void(0)"></a>';
		                    return  r+"  "+m;
		                },
		                events: 'operateEvents'
		            }
		        ]
		    });
		},
	 
	 acceptInfoTable(): function(data){
		 $('#acceptInfoTable').bootstrapTable('destroy');
		    $("#acceptInfoTable").bootstrapTable({
		        method: "post",
		        /*url: "../contractinfo/list", */
		        //striped: true,  //表格显示条纹
		        //pagination: true, //启动分页
		        //pageSize: 5,  //每页显示的记录数
		        //pageNumber:1, //当前第几页
		        // pageList: [5, 10, 15, 20, 25],  //记录数可选列表
		        search: false,  //是否启用查询
		        showColumns: false,  //显示下拉框勾选要显示的列
		        showRefresh: false,  //显示刷新按钮
		        sidePagination: "client", //表示服务端请求
		        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
		        //设置为limit可以获取limit, offset, search, sort, order
		        queryParamsType : "undefined",
		        queryParams: function queryParams(params) {},
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
		        columns: [
		            {
		                field: 'contractid',
		                title: '发票编号',
		                align: 'center',
		                valign: 'middle',
		                visible:false
		            },{
		                field: 'contractName',
		                title: '银行账号',
		                align: 'center',
		                valign: 'middle',
		                visible:false
		            },{
		                field: 'contractNum',
		                title: '发票金额',
		                align: 'center',
		                valign: 'middle',
		                visible:false
		            }, {
		                field: 'acceptfileName',
		                title: '文件名称',
		                align: 'center',
		                valign: 'middle',
		            },{
		                field: 'acceptfileUrl',
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
		                    var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="accept" href="javascript:void(0)"></a>';
		                    var m = '<a class = "glyphicon glyphicon-file previewAccept" style="color:#278bdd;padding:0px 5px;" title="预览" data-type="accept" href="javascript:void(0)"></a>';
		                    return  r+"  "+m;
		                },
		                events: 'operateEvents'
		            }
		        ]
		    });
		},
	 
	 noObjectionInfoTable():function(data){
		   $('#noObjectionInfoTable').bootstrapTable('destroy');
		    $("#noObjectionInfoTable").bootstrapTable({
		        method: "post",
		        /*url: "../contractinfo/list", */
		        //striped: true,  //表格显示条纹
		        //pagination: true, //启动分页
		        //pageSize: 5,  //每页显示的记录数
		        //pageNumber:1, //当前第几页
		        // pageList: [5, 10, 15, 20, 25],  //记录数可选列表
		        search: false,  //是否启用查询
		        showColumns: false,  //显示下拉框勾选要显示的列
		        showRefresh: false,  //显示刷新按钮
		        sidePagination: "client", //表示服务端请求
		        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
		        //设置为limit可以获取limit, offset, search, sort, order
		        queryParamsType : "undefined",
		        queryParams: function queryParams(params) {},
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
		        columns: [
		            {
		                field: 'contractid',
		                title: '发票编号',
		                align: 'center',
		                valign: 'middle',
		                visible:false
		            },{
		                field: 'contractName',
		                title: '银行账号',
		                align: 'center',
		                valign: 'middle',
		                visible:false
		            },{
		                field: 'contractNum',
		                title: '发票金额',
		                align: 'center',
		                valign: 'middle',
		                visible:false
		            }, {
		                field: 'noObjectionfileName',
		                title: '文件名称',
		                align: 'center',
		                valign: 'middle',
		            },{
		                field: 'noObjectionfileUrl',
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
		                    var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="noObjection" href="javascript:void(0)"></a>';
		                    var m = '<a class = "glyphicon glyphicon-file previewnoObjection" style="color:#278bdd;padding:0px 5px;" title="预览" data-type="noObjection" href="javascript:void(0)"></a>';
		                    return  r+"  "+m;
		                },
		                events: 'operateEvents'
		            }
		        ]
		    });
		}




	);

window.operateEvents = {
	    'click .yulan': function (e, value, row, index) {
	    	window.open(row.fileUrl);//预览pdf的js方法
	    },
	  
	    
	    'click .previewInvoice': function (e, value, row, index) {
	    	window.open("../../.." + row.invoicefileUrl);//预览pdf的js方法
	    },
	  
	    
	    'click .previewQua': function (e, value, row, index) {
	    	window.open("../../.." + row.quafileUrl);//预览pdf的js方法
	    },
	  
	    
	    'click .previewAccept': function (e, value, row, index) {
	    	window.open("../../.." + row.acceptfileUrl);//预览pdf的js方法
	    }
     ,


     'click .previewnoObjection': function (e, value, row, index) {
         window.open("../../.." + row.noObjectionfileUrl);//预览pdf的js方法
     }
 };


function showImg(val) {
	  var imgSrc;
	  if(val == 8) {
	      imgSrc = $("#legalID1").val();
	  }
	  if(val == 9) {
	      imgSrc = $("#legalID2").val();
	  }
	  if(val == 10) {
	      imgSrc = $("#authID1").val();
	  }
	  if(val == 11) {
	      imgSrc = $("#authID2").val();
	  }


	  CloudUtils.getTab("../../supplierManager/imageShow.html", "imgPreviewDiv");
	  $("#img").attr('src',imgSrc);
	  $("#imgPreviewShow").modal("show");


	}



