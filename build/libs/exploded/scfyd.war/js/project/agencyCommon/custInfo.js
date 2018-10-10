$(function(){
	$("input").attr("readonly",true);
	$("select").attr("disabled",true); 
	setForm();
	numFormat();
});

function setForm(){
	var data = {};
	data.taskId = taskId;
	 var options = {
		url : '../../activiti/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				loadAreas();
			    changeArea(jsonData.area);
				CloudUtils.setForm(jsonData,"detailForm");
				$(".required").hide();
				custManage.initShareHolderTable(jsonData.shareInfoList);
				custManage.attachInfoTable(jsonData.attachInfoList);
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
　　　　initShareHolderTable : function (data){
　　　　　　$('#shareHolderInfoTable').bootstrapTable('destroy');  
		$("#shareHolderInfoTable").bootstrapTable({  
		    method: "post", 
		    data : data, 
		    striped: false,  //表格显示条纹  
		    search: false,  //是否启用查询  
		    showColumns: false,  //显示下拉框勾选要显示的列  
		    showRefresh: false,  //显示刷新按钮  
		    sidePagination: "server", //表示服务端请求  
		    //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		    //设置为limit可以获取limit, offset, search, sort, order  
		    queryParamsType : "undefined", 
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
			        field: 'shareName',
			        title: '股东名称',
			        align: 'center',
		            valign: 'middle'
			    }, {
			        field: 'shareProportion',
			        title: '持股比例(%)',
			        align: 'center',
		            valign: 'middle',
		            formatter:function(value){
		  	        return $.number(value, 2);
		  	        
		            }
			    }, {
			        field: 'registeredCapital',
			        title: '注册资本份额',
			        align: 'center',
		            valign: 'middle',
		            formatter:function(value){
		 		  	return $.number(value, 2);
		 		  	        
		 		    }
			    }, {
			        field: 'registeredCapitalProportion',
			        title: '注册资本占比(%)',
			        align: 'center',
		            valign: 'middle',
		            formatter:function(value){
		 		    return $.number(value, 2);
		 		 		  	        
		 		   }
			    }]
		  });  
　　　　},
　　　　attachInfoTable : function (data){
	 $('#attachInfoTable').bootstrapTable('destroy'); 
		$("#attachInfoTable").bootstrapTable({  
			 method: "post", 
		     data : data, 
		     striped: false,  //表格显示条纹  
		     search: false,  //是否启用查询  
		     showColumns: false,  //显示下拉框勾选要显示的列  
		     showRefresh: false,  //显示刷新按钮  
		     sidePagination: "server", //表示服务端请求  
		     //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		     //设置为limit可以获取limit, offset, search, sort, order  
		     queryParamsType : "undefined",    
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
	 	        field: 'attachType',
	 	        title: '附件格式',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'attachSize',
	 	        title: '附件大小(KB)',
	 	        align: 'center',
	             valign: 'middle'
	 	    }
	 	    ]
	       }); 
　　　　}
　　});

function saveFun(){
	$("select").attr("disabled",false); 
	var data = CloudUtils.convertStringJson('detailForm');
	data = eval("(" + data + ")");
	var type = $("#agree").val();
	var advice = $("#advice").val();
	var allTableData = $('#shareHolderInfoTable').bootstrapTable('getData');
    var attachData = $('#attachInfoTable').bootstrapTable('getData');
    data.shareInfoList = allTableData;
    data.attachInfoList = attachData;
	data.taskId = taskId;
	data.advice = advice;
	data.agree = type;
	if(type ==1){
		var options = {
				url : '../../custInfo/doAgree',
				data : JSON.stringify(data),
				callBackFun : function(data) {
					$("#adviceModal").modal('hide');
					bootbox.alert(data.resultNote,function(){
						window.location.href='../../project/agencyTask/agencyTask.html';
					});
				},
				errorCallback : function(data) {
					return false;
				}
		};
		CloudUtils.ajax(options);
	}else if(type ==0){
//		 同意的时候录入数据库
		 if(data.isEdit=="1"){
//			 修改
			 var options = {
 	 				url : '../../custInfo/agreeThenAdd',
 	 				data : JSON.stringify(data),
 	 				callBackFun : function(data) {
 	 					bootbox.alert(data.resultNote);
 	 					if (data.result == 0) {
 	 						bootbox.alert(data.resultNote,function(){
 	 							window.location.href='../../project/agencyTask/agencyTask.html';
 	 						});
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
		 }else{
//			 添加
			 var options = {
						url : '../../custInfo/agreeThenMod',
						data : JSON.stringify(data),
						callBackFun : function(data) {
							if (data.result == 0) {
								bootbox.alert(data.resultNote,function(){
									window.location.href='../../project/agencyTask/agencyTask.html';
								});
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
	 }
}

function numFormat(){
 	$("#maxCreditAmount").number(true, 2);
 	$("#regCap").number(true, 2);
 	$("#shareProportion").number(true, 2);
 	$("#registeredCapital").number(true, 2);
 	$("#registeredCapitalProportion").number(true, 2);
 }

function loadAreas() {
    var options = {
        url: '../../represent/areas',
        data: '{}',
        callBackFun: function(data) {
            $.each(data.dataList, function(index, units) {
                $("#area").append("<option value=" + units.areaId + ">" + units.areaName + "</option>");
            });
        }
    };
    CloudUtils.ajax(options);
}

function changeArea(area) {
    var data = { areaId: area };
    data = JSON.stringify(data)
    var options = {
        url: '../../represent/represents',
        data: data,
        callBackFun: function(data) {
            $("#represent").html("");
            $.each(data.dataList, function(index, units) {
                $("#represent").append("<option value=" + units.representId + ">" + units.representName + "</option>");
            });
        }
    };
    CloudUtils.ajax(options);
}