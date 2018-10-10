$(document).ready(function() {
	$("form").attr("autocomplete","off");
	formValidator()
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
				CloudUtils.setForm(jsonData, "addForm");
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

function reapply(){
	$('#addForm').data('bootstrapValidator').validate();
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
	    //没有通过校验 
		return false;
	} else {
		var data = CloudUtils.convertStringJson('addForm');
		var jsonData = eval("(" + data + ")");
		jsonData.taskId = taskId;
		jsonData.procInstId = procInstId;
		
		var options = {
			url : "../../loanInfo/reApply",
			data : JSON.stringify(jsonData),
			callBackFun : function(data) {
				if(data.result==0){
					bootbox.alert(data.resultNote, function() {
						window.location.href = '../../project/agencyTask/agencyTask.html';
					});
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback:function(data){
				bootbox.alert("error");
			}
		};
		CloudUtils.ajax(options);
	}
}

//form验证规则
function formValidator(){
	$('#addForm').bootstrapValidator({
		 message: 'This value is not valid',
	      excluded:':disabled',
	      group:".valid_group",
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  guaranteeMoneyActual:{
	        	  validators: {
	        		  notEmpty: {message: '实缴保证金不能为空'},
	        		  callback: {  
      					message: '实缴保证金要在0~1,000,000,000之间',  
      						callback: function(value, validator) { 
      						return parseFloat(value) > 0 && parseFloat(value) < 1000000000;
      						}  
	      			  } 
	        	  } 
	          },
	          note:{
	        	  validators: {
	        		  notEmpty: {message: '备注不能为空'},
	        		  stringLength: {
			              max: 128,
			              message: '备注长度不能超过128'
			          }
	        	  }
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});
}

function numFormat(){
	$("#orderAcceptMoney").number(true, 2);
	$("#orderAllMoney").number(true, 2);
	$("#loanAmt").number(true, 2);
	$("#guaranteeMoneyRate").number(true, 2);
	$("#guaranteeMoney").number(true, 2);
	$("#guaranteeMoneyActual").number(true, 2);
}