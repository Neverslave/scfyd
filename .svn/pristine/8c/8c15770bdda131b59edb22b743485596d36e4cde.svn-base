 $(function() {
	 CloudUtils.getMenuNames("nav");
	 initDetailForm();
	 $("#corpId").val(store.get('corpId'));
	 initShareHolderInfoTable(store.get('corpId'));
	 attachInfoTable(store.get('corpId'));
	 shareFormValidator();
	 ajaxFileUpload();
	 formValidator();
	 propertychange();
	 numFormat();
	 $('#shareInfoModal').on('hidden.bs.modal', function() {
			$("#shareInfoForm").bootstrapValidator('resetForm', true);
			$("#shareInfoForm")[0].reset();
		});
	 
 });
 
 var shareIndex =0;
 var shareDetailRow = null;
 window.operateEvents = {
		'click .detail': function (e, value, row, index) {
			 detailFun(row);
			 initShareHolderInfoTable(row.corpId);
			 attachInfoTable(row.corpId);
	    },
	    'click .modify': function (e, value, row, index) {
	    	if($(e.target).data('type')==="shareInfo"){
	    		//修改
	    		modShareFun(row,2);
	    		shareDetailRow = row;//吧数据存进全局变量里
	    		shareIndex = index;
	    	}
	    },
	    'click .remove':function (e, value, row, index) {
	    	var attachData = $('#attachInfoTable').bootstrapTable('getData');
	    	//$('#shareHolderInfoTable').bootstrapTable('removeByUniqueId', index);
	    	if($(e.target).data('type')==="shareInfo"){
	    		var values = [];
		    	values.push(row.shareHolderId);
		    	$('#shareHolderInfoTable').bootstrapTable('remove', {field: 'shareHolderId', values: values});
	    	}else if ($(e.target).data('type')==="attach"){
	    		attachData.length - 1;
	    		var values = [];
		    	values.push(row.fileUrl);
		    	$('#attachInfoTable').bootstrapTable('remove', {field: 'fileUrl', values: values});
	    	}
		}
 };
 
 function subFileNum() {
    var num = Number($("#fileNum").val());
    $("#fileNum").val(num - 1);
}
 

 
 function modFun(row,isEdit){
	$("#addModalLabel").text("修改");
	$("#cancel").text("取消");
	$('#detailModal').modal();
	$('#detailForm input').attr('readonly',false);
 	$('#detailForm #corpType').attr('disabled',false);
	CloudUtils.setForm(row,'detailForm');
	 document.getElementById("saveCorpInfo").style.display="block";
	$('#isEdit').val(isEdit); //新增1;修改2
 }
 
 function modShareFun(row,isEdit){
    $("#addshareInfoModalLabel").text("修改");
	$('#shareInfoModal').modal();
	CloudUtils.setForm(row,'shareInfoForm');
	$('#isEdit2').val(isEdit); //新增1;修改2
 }
 
 var orginData = null;//存储原先数据
 function initDetailForm(){
	 var corpId = store.get('corpId');
	 var data = {
			 sysType: 4,  
			 corpId:corpId
	 };
	 var options = {
				url : '../custInfo/list',
				data: JSON.stringify(data),
				callBackFun : function(data) {
					if (data.result == 0) {
						CloudUtils.setForm(data.dataList[0],'detailForm');
						orginData = data.dataList[0];
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
 function addFun(type){
	 $("#addshareInfoModalLabel").text("添加");
	 if(type === 0){
		 $("#detailModal").modal();
		 $('#isEdit').val(1); //新增1;修改2 
	 }else if(type === 1){
		 $("#shareInfoModal").modal();
		 $('#isEdit2').val(1); //新增1;修改2 
	 }
 }
 
 function saveFun(type){
		 if(type === 0){
			 $('#detailForm').data('bootstrapValidator').validate();
			 if(!$('#detailForm').data('bootstrapValidator').isValid()){  
				    //没有通过校验 
				 return false;
			}else{
	//			保存到数据库
			 var data = CloudUtils.convertStringJson('detailForm');
		     var jsonData = eval("(" + data + ")");
		     jsonData.regCap = jsonData.regCap == "" ? 0 : jsonData.regCap;
		     var isEdit = $('#isEdit').val();
		     var allTableData = $('#shareHolderInfoTable').bootstrapTable('getData');
		     var regCap = $("#regCap").val() == "" ? 0 : $("#regCap").val();
		     var sum = 0;
	        	for(var i = 0; i < allTableData.length; i++){
	        		var registeredCapital = allTableData[i].registeredCapital;
	        		sum = sum + Number(registeredCapital);
	        		if(Number(regCap) < Number(sum)){
	        			bootbox.alert("注册资本份额不得超过注册资本，请修改！");
	        			return false;
	        		}
	        	}
		     var attachData = $('#attachInfoTable').bootstrapTable('getData');
		     jsonData.shareInfoList = allTableData;
		     jsonData.attachInfoList = attachData;
		     jsonData = editUniqueCust(jsonData);
		    	 var options = {
		 				url : '../custInfo/mod',
		 				data : JSON.stringify(jsonData),
		 				callBackFun : function(data) {
		 					bootbox.alert(data.resultNote);
		 					if (data.result == 0) {
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
		 if(type ===1 ){
			 $('#shareInfoForm').data('bootstrapValidator').validate();
			 if(!$('#shareInfoForm').data('bootstrapValidator').isValid()){  
				    //没有通过校验 
				 return false;
			}
			 var isEdit2 = $('#isEdit2').val();
			  if (isEdit2 == 1) {// 新增1；修改2
				  var data = CloudUtils.convertStringJson('shareInfoForm');
				  data = eval("(" + data + ")");
				  debugger
				  data.shareHolderId=CloudUtils.getUUID(32, 63);
				  data.shareProportion = data.shareProportion ==""?0:data.shareProportion;
				  data.registeredCapital = data.registeredCapital ==""?0:data.registeredCapital;
				  data.registeredCapitalProportion = data.registeredCapitalProportion ==""?0:data.registeredCapitalProportion;
//					 先只在页面显示，不录入数据库
				 $("#shareHolderInfoTable").bootstrapTable('append', data);
			     } else if(isEdit2 == 2){
			    	 var data = CloudUtils.convertStringJson('shareInfoForm');
			    	$('#shareHolderInfoTable').bootstrapTable('updateRow', {index: shareIndex, row: JSON.parse(data)});
			     }
				$("#shareInfoModal").modal("hide");
		 }
 }
 
// 初始化股东信息表
 function initShareHolderInfoTable(corpId){
	 $('#shareHolderInfoTable').bootstrapTable('destroy'); 
		$("#shareHolderInfoTable").bootstrapTable({  
	         method: "post", 
	         url: "../shareHolder/list", 
	         //striped: true,  //表格显示条纹  
	         //pagination: true, //启动分页  
	         //pageSize: 5,  //每页显示的记录数  
	         //pageNumber:1, //当前第几页  
	        // pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
	         search: false,  //是否启用查询  
	         showColumns: false,  //显示下拉框勾选要显示的列  
	         showRefresh: false,  //显示刷新按钮  
	         sidePagination: "server", //表示服务端请求  
	         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
	         //设置为limit可以获取limit, offset, search, sort, order  
	         queryParamsType : "undefined",   
	         queryParams: function queryParams(params) {   //设置查询参数  
	            // var data = CloudUtils.convertStringJson('searchForm');
	            // var jsonData = eval("(" + data + ")");
	             var param = {    
		                 pageNumber: params.pageNumber,    
		                 pageSize: params.pageSize
		             }; 
				 if(corpId){
					 param.corpId = corpId            	 
	             } 
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
		 	        field: 'shareHolderId',
		 	        title: '股东Id',
		 	        align: 'center',
		            valign: 'middle',
		 	        visible:false
		 	    },{
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
				  return $.number(value,2);
	            }
	 	    }, {
	 	        field: 'registeredCapital',
	 	        title: '注册资本份额',
	 	        align: 'center',
	             valign: 'middle',
			    formatter:function(value){
			    	return $.number(value,2);
	            }
	 	    }, {
	 	        field: 'registeredCapitalProportion',
	 	        title: '注册资本占比(%)',
	 	        align: 'center',
	             valign: 'middle',
			    formatter:function(value){
			    	return $.number(value,2);
	            }
	 	    }, {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	 	        formatter:function(value,row,index){
	 	        	var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="shareInfo" href="javascript:void(0)"></a>';
	 	        	var m = '<a class = "fa fa-edit modify" style="color:#278bdd;padding:0px 5px;" title="编辑" data-type="shareInfo" href="javascript:void(0)"></a>';
	 	            return m +' '+ r;
	 	        },
	 	        events: 'operateEvents'
	 	    }
	 	    ]
	       });  
 }
 
// 添加附件信息
function attachInfoTable(corpId){
	 $('#attachInfoTable').bootstrapTable('destroy'); 
		$("#attachInfoTable").bootstrapTable({  
	         method: "post", 
	         url: "../uploadFile/list", 
	         search: false,  //是否启用查询  
	         showColumns: false,  //显示下拉框勾选要显示的列  
	         showRefresh: false,  //显示刷新按钮  
	         sidePagination: "server", //表示服务端请求  
	         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
	         //设置为limit可以获取limit, offset, search, sort, order  
	         queryParamsType : "undefined",   
	         queryParams: function queryParams(params) {   //设置查询参数  
//	             var data = CloudUtils.convertStringJson('searchForm');
//	             var jsonData = eval("(" + data + ")");
	             var param = {    
	                 pageNumber: params.pageNumber,    
	                 pageSize: params.pageSize
	             }; 
	             if(corpId){
					 param.corpId = corpId            	 
	             } 
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
	 	    }, {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	 	        formatter:function(value,row,index){
	 	        	var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="attach" href="javascript:void(0)"></a>';
	 	        	//var m = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" data-type="shareInfo" href="javascript:void(0)"></a>';
	 	            return r;
	 	        },
	 	        events: 'operateEvents'
	 	    }
	 	    ]
	       });  
}

function shareFormValidator(){
 	$('#shareInfoForm').bootstrapValidator({
 	      message: 'This value is not valid',
 	      excluded:':disabled',
 	      feedbackIcons: {
 	          valid: 'glyphicon glyphicon-ok',
 	          invalid: 'glyphicon glyphicon-remove',
 	          validating: 'glyphicon glyphicon-refresh'
 	      },
 	      fields: {
 	    	 shareName: {
	              validators: {
	                  notEmpty: {
	                      message: '股东名称不能为空'
	                  },
	                  stringLength: {
			              max: 16,
			              message: '股东名称不能超过16'
			          },
	              }
	          },
 	    	 shareProportion: {
 	    		 validators: {
 	    			 notEmpty: {
	                      message: '股东持股比例不能为空'
	                  },
	    			  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '比例在0~100之间',  
	                       callback: function(value, validator) { 
	                    	    var shareProportionSum = parseFloat(getShareSum("shareProportion"));
	                        	return value =="" || (parseFloat(value)>=0&&(parseFloat(value)+shareProportionSum)<=100);
	                         }  
	                     } 
 	    		 }
 	    	 },
 	    	registeredCapital:{
 	    		validators: {
	                  regexp: {
	                      regexp: /^([0-9])+(\.[0-9]+)?$/,
	                      message: '注册资本份额>0'
	                  },
		              callback: {  
		            	  message: '注册资本份额不得超过注册资本',  
	                       callback: function(value, validator) {
	                    	   var regCap = $("#regCap").val() == "" ? 0 : $("#regCap").val();
	                    	   var regCapFloat = parseFloat(regCap);
	                    	   var registeredCapital = parseFloat(getShareSum("registeredCapital"));
	                    	   return value =="" || ((parseFloat(value)+registeredCapital) <=regCapFloat);
	                         }  
	                     } 
	              }
 	    	},
 	    	registeredCapitalProportion:{
 	    		validators: {
 	    			notEmpty: {
	                      message: '注册资本占比不能为空'
	                  },
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
		            	  message: '比例在0~100之间',  
	                       callback: function(value, validator) { 
	                    	   var registeredCapitalProportionSum = parseFloat(getShareSum("registeredCapitalProportion"));
	                    	   return value =="" || (parseFloat(value)>=0&&(parseFloat(value)+registeredCapitalProportionSum)<=100);
	                         }  
	                     } 
	              }
 	    	}
 	      }
 		})
 		.on('success.form.bv', function (e) {
 			e.preventDefault();
 			//saveFun(1);
 			//$(e.target).bootstrapValidator('resetForm', true);
 			//$('#btn_save').attr('disabled',false);
 		});	
 }
//获取股东表中的数据和
function getShareSum(type){
	var shareInfo = $('#shareHolderInfoTable').bootstrapTable('getData');
	var sum = 0;
	$.each(shareInfo, function(i, item){
		sum = CloudUtils.Math(sum,eval('item.'+type),'add');
	});
	//	如果是修改需要减去当前选中的值
	if($('#isEdit2').val() =="2"){
		sum = CloudUtils.Math(sum,eval('shareDetailRow.'+type),'sub');
	}
	return sum;
}

function formValidator(){
 	$('#detailForm').bootstrapValidator({
 	      message: 'This value is not valid',
 	      excluded: ':disabled',
 	      feedbackIcons: {
 	          valid: 'glyphicon glyphicon-ok',
 	          invalid: 'glyphicon glyphicon-remove',
 	          validating: 'glyphicon glyphicon-refresh'
 	      },
 	      fields: {
 	    	 corpName:{
 	    		validators: {
 	    			notEmpty: {
	                      message: '企业名称不能为空'
	                  },
	                  stringLength: {
			              max: 32,
			              message: '企业名称不能超过32'
			          },
 	    		}
 	    	 },
 	    	orgnNum:{
 	    		validators: {
 	    			notEmpty: {
	                      message: '社会统一信用代码证号不能为空'
	                  },
	                  regexp: {
                          regexp: /[A-Z0-9]{18}/, 
                          message: '社会统一信用代码证号格式为18位大写拉丁字母及数字混合'
                      },
                      stringLength: {
                          max: 18,
                          message: '社会统一信用代码证号长度不能超过18'
                      },
 	    		}
 	    	 },
 	    	corpType:{
 	    		validators: {
 	    			notEmpty: {
	                      message: '企业类型不能为空'
	                  },
 	    		}
 	    	 },
 	    	legalPerson:{
 	    		validators: {
 	    			notEmpty: {
	                      message: '法定代表人不能为空'
	                  },
	                  stringLength: {
			              max: 32,
			              message: '法定代表人不能超过32'
			          },

 	    		}
 	    	 },
 	    	regCap: {
 	    		validators: {
            	    numeric: {message: '只能输入数字'},
	                callback: {  
                       message: '金额在0~1000000000之间',  
                       callback: function(value, validator) { 
                        	return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=1000000000);
                         }  
                     } 
	              }
 	    	},
	    	contactInfo: {
	              validators: {
	            	  notEmpty: {
	                      message: '手机号不能为空'
	                  },
	                  regexp: {
	                      regexp: /^1(3|4|5|7|8)\d{9}$/,
	                      message: '请输入11位真实手机号码'
	                  }
	              }
	          },
	          officeAddress:{
	        	  validators: {
	        		  notEmpty: {
	                      message: '地址不能为空'
	                  },
	                  stringLength: {
			              max: 32,
			              message: '地址不能超过32'
			          },
	        	  }
	          },
	          fixedPhone:{
	        	validators: {
	        		regexp: {
	                      regexp: /^0\d{2,4}-\d{7,8}$/,
	                      message: '请输入正式号码为区号-电话号'
	                  }
	        	}
	          }
 	      }
 		})
 		.on('success.form.bv', function (e) {
 			e.preventDefault();
 		});	
 }

//修改唯一性判断
 function editUniqueCust(data){
//	获取原来的corpName和orgnNum
	 if(orginData.corpName==data.corpName){
		 data.corpName = null;
	 }
	 if(orginData.orgnNum ==data.orgnNum){
		 data.orgnNum = null;
	 }
	 return data;
}
 
function numFormat(){
 	$("#regCap").number(true, 2);
 	$("#shareProportion").number(true, 2);
 	$("#registeredCapital").number(true, 2);
 	$("#registeredCapitalProportion").number(true, 2);
 }

function propertychange(){
	$('#shareProportion,#registeredCapital,#registeredCapitalProportion').bind('keyup', function(event) {
		var keycode = event.which; 
		     if(keycode==8){
		    	 if(event.target.value==""){
		    		 $("#"+event.target.id).val(0.00);
		    		 $("#shareInfoForm").data('bootstrapValidator').destroy();
		    		 shareFormValidator();
		    		 $("#shareInfoForm").data("bootstrapValidator").validate();
		    	 }
		    } 
	});
}

function ajaxFileUpload(){
	$('#file').fileupload({
		  url:"../file/uploadFile?pathId=3",
	        dataType: 'json',
	        // 上传完成后的执行逻辑
	        done: function(e, data) {
	        	data = data.result;
	            if(data.result==0){
	            	var relData = {};
	            	relData.fileName = data.fileName;
	            	relData.attachSize = data.fileSize;
	            	relData.fileUrl = data.fileUrl;
	            	relData.attachType = data.fileType;
	            	$("#attachInfoTable").bootstrapTable("append", relData);
	            } else {
	            	 bootbox.alert(data.resultNote);
	            }
		            
		     }
	});
	$('#file').bind('fileuploadadd', function (e, data) {
 		var obj = data.files[0];
 		var name = obj.name;
 		var size = obj.size;
 		/*if (!checkFileNum()) {
	            bootbox.alert("上传的附件数不能超过10个");
	            return false;
	        }*/
 		var attachData = $('#attachInfoTable').bootstrapTable('getData');
        if (attachData.length > 9) {
            bootbox.alert("上传的附件数不能超过10个");
            return false;
        }
	        var type = name.substr(name.lastIndexOf(".")).toLowerCase();
	        if (!checkFileType(type)) {
	            bootbox.alert("仅支持上传word、excel、pdf、png、jpg类型的文件");
	            return false;
	        }
 		
 		 if (!checkFileSize(size)) {
            bootbox.alert("上传文件不超过50M");
	            return false;
	        }
	   
 	});
}

var fileTypes = [".doc", ".xls", ".xlsx", ".docx", ".pdf", ".png", ".jpg"];

function checkFileType(type) {
    var result = $.inArray(type, fileTypes);
    if (result == -1) {
        return false;
    }
    return true;
}

function checkFileSize(fileSize) {
    fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
    fileSize = Math.round(fileSize / 1024);
    if (fileSize > 50) {
        return false;
    }
    return true;
}