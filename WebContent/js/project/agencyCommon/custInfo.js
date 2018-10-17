$(function(){
console.log("01");
	$("input").attr("readonly",true);
	$("select").attr("disabled",true); 
	console.log("02");
	setForm();
	console.log("03");
	numFormat();
	console.log("04");
	detailFun();
	console.log("05");
	
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
				//loadAreas();
		
				CloudUtils.setForm(jsonData,"detailForm");
				if(jsonData.companyPicturePath1!=null && jsonData.companyPicturePath1!=''){
					$("#Path1").attr("src",jsonData.companyPicturePath1);
					$("#cp1a").attr("href",jsonData.companyPicturePath1);
					 $("#cp1").hide();
				}
				if(jsonData.companyPicturePath2!=null && jsonData.companyPicturePath2!=''){
					$("#Path2").attr("src",jsonData.companyPicturePath2);
					$("#cp2a").attr("href",jsonData.companyPicturePath2);
					 $("#cp2").hide();
				}
				if(jsonData.companyPicturePath3!=null && jsonData.companyPicturePath3!=''){
					$("#Path3").attr("src",jsonData.companyPicturePath3);
					$("#cp3a").attr("href",jsonData.companyPicturePath3);
					 $("#cp3").hide();
				}
				if(jsonData.companyPicturePath4!=null && jsonData.companyPicturePath4!=''){
					$("#Path4").attr("src",jsonData.companyPicturePath4);
					$("#cp4a").attr("href",jsonData.companyPicturePath4);
					 $("#cp4").hide();
				}
				if(jsonData.companyPicturePath5!=null && jsonData.companyPicturePath5!=''){
					$("#Path5").attr("src",jsonData.companyPicturePath5);
					$("#cp5a").attr("href",jsonData.companyPicturePath5);
					 $("#cp5").hide();
				}
				if(jsonData.companyPicturePath6!=null && jsonData.companyPicturePath6!=''){
					$("#Path6").attr("src",jsonData.companyPicturePath6);
					$("#cp6a").attr("href",jsonData.companyPicturePath6);
					 $("#cp6").hide();
				}
				if(jsonData.businessLicensePath!=null && jsonData.businessLicensePath!=''){
					$("#businessLicensePath2").attr("src",jsonData.businessLicensePath);
					$("#bla").attr("href",jsonData.businessLicensePath);
					 $("#bl").hide();
				}
				if(jsonData.permissionAccountPath!=null && jsonData.permissionAccountPath!=''){
					$("#permissionAccountPath2").attr("src",jsonData.permissionAccountPath);
					$("#paa").attr("href",jsonData.permissionAccountPath);
					 $("#pa").hide();
				}
				if(jsonData.legalIdNumberPath1!=null && jsonData.legalIdNumberPath1!=''){
					$("#legalIdNumberPath11").attr("src",jsonData.legalIdNumberPath1);
					$("#lin1a").attr("href",jsonData.legalIdNumberPath1);
					 $("#lin1").hide();
				}
				if(jsonData.legalIdNumberPath2!=null && jsonData.legalIdNumberPath2!=''){
					$("#legalIdNumberPath22").attr("src",jsonData.legalIdNumberPath2);
					$("#lin2a").attr("href",jsonData.legalIdNumberPath2);
					 $("#lin2").hide();
				}
                $(".required").hide();
       /*         custManage.initShareHolderTable(jsonData.shareInfoList);
                custManage.attachInfoTable(jsonData.attachInfoList);
                custManage.contractInfoTable(jsonData.contractInfoList);*/
            	$("#corpNameTitle").text(jsonData.corpName);
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
　　　　},
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
function detailFun() {
    $('#detailForm input').attr('readonly', true);
    $('#shareInfoForm input').attr('readonly', true);
    $("select").attr("disabled", true);
    document.getElementById("btn_add").style.display = "none";

    document.getElementById("btn_contract").style.display = "none";
    document.getElementById("addContractInfo").style.display = "none";
    document.getElementById("saveCorpInfo").style.display = "none";

    document.getElementById("bl").style.display = "none";

}
function saveFun(){
	$("select").attr("disabled",false); 
	var data = CloudUtils.convertStringJson('detailForm');
	data = eval("(" + data + ")");
	var type = $("#agree").val();
	var advice = $("#advice").val();
	var allTableData = $('#shareHolderInfoTable').bootstrapTable('getData');
    var attachData = $('#attachInfoTable').bootstrapTable('getData');

    var contractData = $('#contractInfoTable').bootstrapTable('getData');
    data.regCap = data.regCap == "" ? 0 : data.regCap;
    
    data.maxLscreditAmount = data.maxLscreditAmount == "" ? 0 : data.maxLscreditAmount;
    data.maxCreditAmount = data.maxCreditAmount == "" ? 0 : data.maxCreditAmount;
    
    data.shareInfoList = allTableData;
    data.attachInfoList = attachData;
    data.contractInfoList = contractData;
    
	data.taskId = taskId;
	data.advice = advice;
	data.agree = type;
	if(type ==1){
		var options = {
				url : '../../supplierInfo/doAgree',
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
 	 				url : '../../supplierInfo/agreeThenAdd',
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
						url : '../../supplierInfo/agreeThenMod',
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

/*function loadAreas() {
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
}*/

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

