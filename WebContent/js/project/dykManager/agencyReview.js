var isReview;//0:再申请,1:审批

$(document).ready(function() {
	$("form").attr("autocomplete","off");
	if (taskDefKey == 'usertask1') {
		isReview = '0';
	} else {
		isReview = '1';
	}
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		window.parent.scrollTo(0,0);
		$("#addForm")[0].reset();
		if ($("#addForm").data('bootstrapValidator')) {
			$("#addForm").data('bootstrapValidator').resetForm();
			$("#addForm").data('bootstrapValidator').destroy();
	        $('#addForm').data('bootstrapValidator', null);
		}
	});
	initTable();
	setForm();
	// 金额项目千分位符表示 
	numFormat();
	if (isReview == '1') {
		$("#noteForm").find('textarea').attr('readonly', true);
		$("#btn_add").hide();
		$("#noteForm .required").hide();
	} else {
		noteFormValidator();
		$("#divAdvice").show();
	}
} );

function setForm(){
	var data = {};
	data.taskId = taskId;
	var options = {
		url : '../../activiti/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData, "noteForm");
				var agencyListInfo = jsonData.agencyListInfo;
				if (agencyListInfo != null && agencyListInfo != '') {
					$.each(JSON.parse(agencyListInfo), function(i, row) {
						$("#agencyListTable").bootstrapTable('append', row);
					});
				}
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

window.operateEvents = {
		'click .modify': function (e, value, row, index) {
			modify(row, index);
		},
		
		'click .remove': function (e, value, row, index) {
			$("#agencyListTable").bootstrapTable("remove", {
				field: "agencyNum",
				values: [row.agencyNum]
			});
		},
		
		'click .detail': function (e, value, row, index) {
			detail(row);
		},
};

function initTable() { 
	$('#agencyListTable')
	.bootstrapTable('destroy')
	.bootstrapTable({  
         method: "post", 
         url: "", 
         striped: false,  //表格显示条纹  
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
 	        	var s = '<a class = "fa fa-edit modify" style="color:#278bdd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
				var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
 	            var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
 	            if (isReview == '1') {
 	            	return d;
 	            } else {
 	            	return s + ' ' + r + ' ' + d;
 	            }
 	        },
 	        events: 'operateEvents'
 	    }]
       });
}

function add(){
	formValidator();
	$("#addForm #represent").empty();
	$('#addForm #isEdit').val("0"); //新增0；修改1
	$("#addForm").find('input').attr("readonly", false);
	$("#addForm").find('select').attr("disabled", false);
	$("#addForm #btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	$("#addForm #btn_save").show();
	$("#addForm .required").show();
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
}

function detail(row) {
	changeArea(row.area);
	CloudUtils.setForm(row, "addForm");
	$("#addForm").find('input').attr("readonly", true);
	$("#addForm").find('select').attr("disabled", true);
	$("#addForm #btn_save").hide();
	$("#addForm .required").hide();
	$("#addForm #btn_blank").removeClass('col-sm-4').addClass('col-sm-7');
	$("#addModal").modal({backdrop: 'static', keyboard: false});
}

function modify(row, index) {
	formValidator();
	changeArea(row.area);
	CloudUtils.setForm(row, "addForm");
	$('#addForm #isEdit').val("1"); //新增0；修改1
	$('#addForm #index').val(index);
	$("#addForm").find('input').attr("readonly", false);
	$("#addForm").find('select').attr("disabled", false);
	$("#addForm #btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	$("#addForm #btn_save").show();
	$("#addForm .required").show();
	$("#addModal").modal({backdrop: 'static', keyboard: false});
}

function changeArea(areaVal) {
	$("#addForm #represent").empty();
	if (areaVal == '0') {
		$("#addForm #represent").append("<option value='0'>南京</option>")
						.append("<option value='1'>上海</option>");
	} else if (areaVal == '1') {
		$("#addForm #represent").append("<option value='2'>西安</option>")
						.append("<option value='3'>成都</option>");
	} else if (areaVal == '2') {
		$("#addForm #represent").append("<option value='4'>广州</option>")
						.append("<option value='5'>武汉</option>")
						.append("<option value='6'>郑州</option>");
	} else if (areaVal == '3') {
		$("#addForm #represent").append("<option value='7'>北京</option>")
						.append("<option value='8'>沈阳</option>")
						.append("<option value='9'>济南</option>");
	}
}

function addAgency() {
	var bootstrapValidator = $('#addForm').data('bootstrapValidator');
	bootstrapValidator.validate();
	if (!bootstrapValidator.isValid()) { 
		return;
	}
	var agencyListData = $("#agencyListTable").bootstrapTable('getData');
	var agcNum = $("#addForm #agencyNum").val();
	var agencyName = $("#addForm #corpName").val();
	var isEdit = $('#isEdit').val(); //新增0；修改1
	var index = $("#index").val();
	for(var i = 0; i < agencyListData.length; i++){
		var agencyNum = agencyListData[i].agencyNum;
		var corpName = agencyListData[i].corpName;
		if(isEdit=='1'&&index==i){
			continue;
		}
		if(agcNum == agencyNum||agencyName == corpName){
			bootbox.alert("经销商名称或代码重复，请修改!");
			return false;
		}
	}
	var isEdit = $('#addForm #isEdit').val(); //新增0；修改1
	var index = $("#addForm #index").val();
	var data = CloudUtils.convertStringJson("addForm");
	if (isEdit == '0') {
		$("#agencyListTable").bootstrapTable('append', JSON.parse(data));
	} else {
		$("#agencyListTable").bootstrapTable('updateRow', {
			index: index,
			row: JSON.parse(data)
		});
	}
	$('#addModal').modal('hide');
	window.parent.scrollTo(0,0);
}

function reapply() {
	$('#noteForm').data('bootstrapValidator').validate();
	if (!$('#noteForm').data('bootstrapValidator').isValid()) {
		return false;
	}
	
	var agencyListData = $("#agencyListTable").bootstrapTable('getData');
	if (agencyListData.length == 0) {
		bootbox.alert("经销商列表不能为空");
		return false;
	}
	
	saveFun();
}

function saveFun() {
	var data = CloudUtils.convertAllJson('noteForm');
	var agencyListData = $("#agencyListTable").bootstrapTable('getData');
	var url
	
	data = eval("(" + data + ")");
	data.taskId = taskId;
	data.procInstId = procInstId;
	data.agencyListInfo = JSON.stringify(agencyListData);
	if (isReview == '0') {
		url = "../../supplierInfo/reApply";
	} else {
		url = "../../supplierInfo/doAgree";
		data.agree = $("#adviceModal #agree").val();
		data.advice = $("#adviceModal #advice").val();
	}
	
	var options = {
		url : url,
		data : JSON.stringify(data),
		callBackFun : function(data) {
//			if(data.result==0){
//				bootbox.alert(data.resultNote, function() {
//					window.location.href = '../../project/agencyTask/agencyTask.html';
//				});
//			}else{
//				bootbox.alert(data.resultNote);
//				return false;
//			}
			bootbox.alert(data.resultNote, function() {
				window.location.href = '../../project/agencyTask/agencyTask.html';
			});
		},
		errorCallback : function(data) {
			bootbox.alert(data.resultNote);
			return false;
		}
	};
	CloudUtils.ajax(options);
}

/**
 * 金额项目千分位符表示
 */
function numFormat(){
	$("#addForm #maxCreditAmount").number(true, 2);
	$("#addForm #firstTwoYearsPickupNum").number(true, 0);
	$("#addForm #firstTwoYearsRetailNum").number(true, 0);
	$("#addForm #firstTwoYearsSaleRank").number(true, 0);
	$('#addForm #thisYearPlanPickupNum').number(true, 0);
	$('#addForm #thisYearPlanSales').number(true, 2);
}

//form验证规则
function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  corpName: {
	              validators: {
	                  notEmpty: {
	                      message: '经销商名称不能为空'
	                  },
	                  stringLength: {
			              max: 32,
			              message: '经销商名称长度不能超过32位'
			          },
	              }
	          },
	          agencyNum: {
	              validators: {
	            	  notEmpty: {
	                      message: '经销商代码不能为空'
	                  },
	                  stringLength: {
			              max: 32,
			              message: '经销商代码长度不能超过32位'
			          },
	              }
	          }
	          },
	          officeAddress: {
	              validators: {
	                  notEmpty: {
	                      message: '公司地址不能为空'
	                  },
	                  stringLength: {
			              max: 32,
			              message: '公司地址长度不能超过32位'
			          },
	              }
	          },
	          contactInfo: {
	              validators: {
	                  notEmpty: {
	                      message: '手机号不能为空'
	                  },
			          stringLength: {
			              min: 11,
			              max: 11,
			              message: '手机号长度为11'
			          },
			          regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '手机号只能是数字'
	                  }
	              }
	          },
	          fixedPhone:{
	        	validators: {
	        		regexp: {
	                      regexp: /^0\d{2,4}-\d{7,8}$/,
	                      message: '请输入正式号码为区号-电话号'
	                  }
	        	}
	          },
	          area: {
	              validators: {
	                  notEmpty: {
	                      message: '所属区域不能为空'
	                  }
	              }
	          },
	          firstTwoYearsPickupNum: {
	              validators: {
	                  notEmpty: {
	                      message: '前2年度提车数量不能为空'
	                  },
	                  callback: {  
                         message: '前2年度提车数量要在0~1,000,000,000之间',
                         callback: function(value, validator) { 
                        	 return parseFloat(value)>=0&&parseFloat(value)<=1000000000;
                         }  
                     } 
	              }
	          },
	          firstTwoYearsRetailNum: {
	              validators: {
	                  notEmpty: {
	                      message: '前2年度零售数量不能为空'
	                  },
	                  callback: {  
	                         message: '前2年度零售数量在0~1,000,000,000之间',  
	                         callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=1000000000;
	                         }  
	                     } 
	              }
	          },
	          firstTwoYearsSaleRank: {
	              validators: {
	                  notEmpty: {
	                      message: '前2年度销售排名不能为空'
	                  },
	                  callback: {  
	                         message: '前2年度销售排名在0~10000之间',  
	                         callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=10000;
	                         }  
	                     } 
	              }
	          },
	          thisYearPlanPickupNum: {
	              validators: {
	                  notEmpty: {
	                      message: '本年度计划提车数量不能为空'
	                  },
	                  callback: {  
	                         message: '本年度计划提车数量在0~1,000,000,000之间',  
	                         callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=1000000000;
	                         }  
	                     } 
	              }
	          },
	          thisYearPlanSales: {
	              validators: {
	                  notEmpty: {
	                      message: '本年度计划销售额不能为空'
	                  },
	                  callback: {  
	                         message: '本年度计划销售额在0~1,000,000,000之间',  
	                         callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=1000000000;
	                         }  
	                     } 
	              }
	          },
	          note: {
	              validators: {
	            	  notEmpty: {
	                      message: '备注不能为空'
	                  },
	            	  stringLength: {
			              max: 128,
			              message: '备注长度不能超过128'
			          },
	              }
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});
}

function noteFormValidator(){
	$('#noteForm').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	          note: {
	              validators: {
	            	  notEmpty: {
	                      message: '备注不能为空'
	                  },
	            	  stringLength: {
			              max: 128,
			              message: '备注长度不能超过128'
			          },
	              }
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});	
}