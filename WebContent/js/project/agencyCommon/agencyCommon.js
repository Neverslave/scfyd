var taskId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).taskId;
console.log("taskid: "+taskId);
var procInstId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).procInstId;
var taskDefKey = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).taskDefKey;
var procdefKey = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).procdefKey;
var preDefKey = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).preDefKey;
var processDefinitionId = "";
var isDetail = false;

$(function () {
    showTabs();
    showGraph();
    initTaskTable(procInstId);
    getAllHisVal();
    $('#adviceModal').on('hidden.bs.modal', function () {
        $("#advideForm #advice").val("");
    });
});


function showTabs() {
    showOrHideButton();
    //企业信息管理
    if (procdefKey == "custManage") {
        if (taskDefKey == "usertask1") {
            //在申请
            CloudUtils.getTab("../../supplierManager/supplierManager/custReapplyPackage.html", "projectInfo");
            jQuery.getScript("../../js/project/agencyCommon/custReapply.js");
        } else {
            //审批
            CloudUtils.getTab("../../supplierManager/supplierManager/custAgencyPackage.html", "projectInfo");
            jQuery.getScript("../../js/project/agencyCommon/custInfo.js");
        }
    } else if (procdefKey == "contractManager") {
        if (taskDefKey == "task_contract_pm" || taskDefKey == "task_contract_fw") {
            CloudUtils.getTab('../../project/dykManager/contractManager/contractAgencyTask.html', "projectInfo");
            jQuery.getScript("../../js/project/dykManager/contractManager/contractAgencyTask.js");
        } else if (taskDefKey == "task_contract_jxs") {
            CloudUtils.getTab('../../project/dykManager/contractManager/contractReapply.html', "projectInfo");
            jQuery.getScript("../../js/project/dykManager/contractManager/contractReapply.js");
        }
    }
    else if (procdefKey == "changeAgency") {
    	   if (taskDefKey == "usertask1") {
               //在申请
               CloudUtils.getTab("../../supplierManager/supplierManager/custReapplyPackage.html", "projectInfo");
               jQuery.getScript("../../js/project/agencyCommon/custReapply.js");
           } else {
               //审批
               CloudUtils.getTab("../../supplierManager/supplierManager/custAgencyPackage.html", "projectInfo");
               jQuery.getScript("../../js/project/agencyCommon/custInfo.js");
           }
    

    } else if (procdefKey == "dykRepayment2") {
        if (taskDefKey == "usertask1") {
        	//再申请
  
            CloudUtils.getTab('../../supplierManager/project/projectReapplyPackage.html', "projectInfo");
            jQuery.getScript("../../js/project/supplier/projectReapply.js");
        } else {
        	//审批
            CloudUtils.getTab('../../supplierManager/project/projectAgencyPackage.html', "projectInfo");
            jQuery.getScript("../../js/project/supplier/projectInfo.js");
        }
    
    }else if(procdefKey =="projectReview"){
    	CloudUtils.getTab('../../tradfact/projectReview/projectReview-audit.html',"projectInfo");
    	jQuery.getScript("../../js/tradfact/projectReview/projectReview-audit.js");
    }
}

function doAgree(type) {
/*	if(type==0){
		  $("#emailDiv").show();
	}else{
		 $("#emailDiv").hide();
	}*/
    // 表单验证：融资管理
    if (procdefKey == "financeMngProcess" && taskDefKey ==   "usertask3") {
        $('#addForm').data('bootstrapValidator').validate();
        if (!$('#addForm').data('bootstrapValidator').isValid()) {
            return false;
        }
    }

    $('#adviceModal').modal({backdrop: 'static', keyboard: false});
    $("#agree").val(type);
    // 融资管理和付款承诺函的场合
    if ((procdefKey == "financeMngProcess" && taskDefKey == "usertask3") || (procdefKey == "payCommitment" && taskDefKey == "usertask3")) {
        if (type == 0) { //同意
            $("#backDiv").hide();
        } else { //拒绝
            $("#backDiv").show();
        }
    }
    checkAdvice(type);
}

function showOrHideButton() {


    if (taskDefKey == "usertask1"
        || (procdefKey == "financeMngProcess" && taskDefKey == "usertask2")
         || (procdefKey == "financeMngProcess" && taskDefKey == "usertask2")
  
        || (procdefKey == "payCommitment" && taskDefKey == "usertask2")
        || taskDefKey == "task_contract_jxs"
        || taskDefKey == "task_sign_pl"
        || (procdefKey == "loanInfo" && taskDefKey == "xmjl_apply")|| taskDefKey == "task_order_check_pl") {
        $(".reapplyButton").show();
        $(".agencyButton").hide();
        $(".confirmButton").hide();
    }
     else if(  (procdefKey == "orderChargeBackProcess" && taskDefKey == "task_orderChargeback_pl")
             || (procdefKey == "orderEarlyClearProcess" && taskDefKey == "task_orderEarlyClear_pl"))
     {
    	  $(".confirmButton").show();
          $(".agencyButton").hide();
          $(".reapplyButton").hide();
     
    } else {
    	 $(".confirmButton").hide();
        $(".reapplyButton").hide();
        $(".agencyButton").show();
    }
    if ((procdefKey == "changeAgency" && taskDefKey == "usertask1")||
    		(procdefKey == "dykRepayment2" && taskDefKey == "usertask1")	)
    {
        $("#btn_refuse").hide();
    }


}

//图片
function showGraph() {
    $("#pic").attr("src", "../../activiti/graph?processDefinitionId=" + processDefinitionId +
        "&processInstanceId=" + procInstId + "&taskId=" + taskId);
    $("#picModal").modal({backdrop: 'static', keyboard: false});
}

//历史
function initTaskTable(procInstId) {
    $('#taskListTable').bootstrapTable('destroy');
    $("#taskListTable").bootstrapTable({
        method: "post",
        url: "../../activiti/getHistoryTaskList",
        striped: true, //表格显示条纹  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数  
            var param = {
                procInstId: procInstId
            };
            return JSON.stringify(param);
        },
        responseHandler: function responseHandler(res) {
            if (res.result == 0) {
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
            field: 'procInstId',
            title: '进程Id',
            align: 'center',
            valign: 'middle',
            visible: false
        }, {
            field: 'taskId',
            title: 'taskId',
            align: 'center',
            valign: 'middle',
            visible: false

        }, {
            field: 'name',
            title: '任务名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'assignee',
            title: '办理人',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'createTime',
            title: '创建时间',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'endTime',
            title: '结束时间',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'operAcivit',
            title: '详情',
            align: 'center',
            formatter: function (value, row, index) {
                if (row.assignee == "sys" && row.proDefKey == "orderManagerProcess") {
                    var d = '<a class = "fa fa-list-ul" style="color:#ccc;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
                } else {
                    var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
                }
                return d;
            },
            events: 'agencyOperateEvents'
        }]
    });
}

//获取历审核的意见
function getAllHisVal() {
    $('#historyAdviceTable').bootstrapTable('destroy');
    $("#historyAdviceTable").bootstrapTable({
        method: "post",
        url: "../../activiti/getAllHistoryVariable",
        striped: true, //表格显示条纹  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数  
            var param = {
                procInstId: procInstId
            };
            return JSON.stringify(param);
        },
        responseHandler: function responseHandler(res) {
            if (res.result == 0) {
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
            field: 'assignee',
            title: '办理人',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'createTime',
            title: '创建时间',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row, index) {
                return CloudUtils.FormatDate(value);
            }
        }, {
            field: 'agree',
            title: '是否同意',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row, index) {
                if (value == "0") {
                    return "是";
                } else if (value = "1") {
                    return "否";
                }
            }
        }, {
            field: 'advice',
            title: '意见',
            align: 'center',
            valign: 'middle'
        }]
    });
}


function goback() {
    history.go(-1);
}

window.agencyOperateEvents = {
    'click .detail': function (e, value, row, index) {
        /*getVariableByTaskId(row.taskId)*/
        store.set('agencyRow', row); //把数据存储在缓存中
        choosePage(row);
    }
};

//同意获取拒绝时的提示
function checkAdvice(type) {
    $("#adviceModal #advice").unbind("keyup"); //解除绑点
    if (type == "1") {
        $("#adviceModal #btn_save").attr("disabled", true);
        $("#adviceModal #checkAdvice").show();
        changeAdvice(type);
    } else {
        $("#adviceModal #btn_save").attr("disabled", false);
        $("#adviceModal #checkAdvice").hide();
    }
}

function changeAdvice(type) {
    $("#adviceModal #advice").keyup(function () {
        if ($.trim($("#adviceModal #advice").val())) {
            $("#adviceModal #checkAdvice").hide();
            $("#adviceModal #btn_save").attr("disabled", false);
        } else {
            $("#adviceModal #btn_save").attr("disabled", true);
            $("#adviceModal #checkAdvice").show();
        }
    });
}

function choosePage(row) {
    if (row.assignee != null) {
        $("#taskInfoModal").modal(); //显示模态框
    } else {
        return;
    }
    isDetail = true;
    if (row.proDefKey == "custManage") {
        CloudUtils.getTab("../../supplierManager/supplierManager/custHisDetail/custHisDetail.html", "taskInfo");
        if (row.taskDefKey == "usertask1") {
            $(".adviceHidden").hide();
        } else {
            $(".adviceHidden").show();
        }
        jQuery.getScript("../../js/project/agencyCommon/custHisDetail/custHisDetail.js");
    } 
    else if (row.proDefKey == "changeAgency") {
        CloudUtils.getTab("../../supplierManager/supplierManager/custHisDetail/custHisDetail.html", "taskInfo");
        if (row.taskDefKey == "usertask1") {
            $(".adviceHidden").hide();
        } else {
            $(".adviceHidden").show();
        }
        jQuery.getScript("../../js/project/agencyCommon/custHisDetail/custHisDetail.js");
    }
    else if (row.proDefKey == "refundDeposit") {
        if (row.taskDefKey == "usertask1") {
            CloudUtils.getTab('../../project/dykManager/refundDepositDetail/refundDepositRepDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/agencyCommon/refundDepositHisDetail/refundDepositHisDetail.js");
        } else {
            CloudUtils.getTab('../../project/dykManager/refundDepositDetail/refundDepositAgeDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/agencyCommon/refundDepositHisDetail/refundDepositHisDetail.js");
        }
    } else if (row.proDefKey == "OffsetDeposit") {
        if (row.taskDefKey == "usertask1") {
            CloudUtils.getTab('../../project/dykManager/offsetDepositDetail/offsetDepositRepDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/agencyCommon/offsetDepositHisDetail/offsetDepositHisDetail.js");
        } else {
            CloudUtils.getTab('../../project/dykManager/offsetDepositDetail/offsetDepositAgeDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/agencyCommon/offsetDepositHisDetail/offsetDepositHisDetail.js");
        }
    } else if (row.proDefKey == "contractManager") {
        CloudUtils.getTab('../../project/dykManager/contractManager/contractAgencyTaskDetail.html', "taskInfo");
        if (row.taskDefKey == "task_contract_pm" || row.taskDefKey == "task_contract_fw") {
            $(".adviceHidden").show();
        } else {
            $(".adviceHidden").hide();
        }
        jQuery.getScript("../../js/project/dykManager/contractManager/contractAgencyTaskDetail.js");
    } else if (row.proDefKey == "payCommitment") {
        if (row.taskDefKey == "usertask1") {
            CloudUtils.getTab('../../project/dykManager/payCommitmentReapplyDetail/payCommitmentReapplyDeatil.html', "taskInfo");
            jQuery.getScript("../../js/project/dykManager/payCommitmentReapplyDetail/payCommitmentReapplyDetail.js");
        } else if (row.taskDefKey == "usertask2") {
            CloudUtils.getTab('../../project/dykManager/payCommitmentReapplyDetail/fillGuaranteeDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/dykManager/payCommitmentReapplyDetail/fillGuaranteeDetail.js");
        } else {
            CloudUtils.getTab('../../project/dykManager/payCommitmentReapplyDetail/payCommitmentReviewDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/dykManager/payCommitmentReapplyDetail/payCommitmentReviewDetail.js");
        }
    } else if (row.proDefKey == "accAgencyProcess") {
        CloudUtils.getTab("../../project/dykManager/agencyDetail/agencyDetail.html", "taskInfo");
        jQuery.getScript("../../js/project/agencyCommon/agencyDetail/agencyDetail.js");
        if (row.taskDefKey == "usertask1") {
            $("#detailDivAdvice").hide();
            $("#detailDivAgree").hide();
        } else {
            $("#detailDivAdvice").show();
            $("#detailDivAgree").show();
        }
    } else if (row.proDefKey == "financeMngProcess") {
        if (row.taskDefKey == "usertask1") {
            CloudUtils.getTab('../../project/dykManager/financeDetail/financeDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/agencyCommon/financeDetail/financeDetail.js");
        } else if (row.taskDefKey == "usertask2") {
            CloudUtils.getTab('../../project/dykManager/financeDetail/FinanceGuarantee.html', "taskInfo");
            jQuery.getScript("../../js/project/agencyCommon/financeDetail/FinanceGuarantee.js");
        } else {
            CloudUtils.getTab('../../project/dykManager/financeDetail/financeDetailView.html', "taskInfo");
            jQuery.getScript("../../js/project/agencyCommon/financeDetail/financeDetailView.js");
        }
    } else if (row.proDefKey == "dykRepayment") {
        CloudUtils.getTab("../../project/dykManager/repayDetail/repayDetail.html", "taskInfo");
        if (row.taskDefKey == "usertask1") {
            $(".adviceHidden").hide();
        } else {
            $(".adviceHidden").show();
        }
        jQuery.getScript("../../js/project/agencyCommon/repayDetail/repayDetail.js");
    } else if (row.proDefKey == "dykRepayment2") {
    	
        CloudUtils.getTab("../../supplierManager/project/projectDetail.html", "taskInfo");
        if (row.taskDefKey == "usertask1") {
            $(".adviceHidden").hide();
        } else {
            $(".adviceHidden").show();
        }
        jQuery.getScript("../../js/project/supplier/projectDetail.js");
    } else if (row.proDefKey == "revenue") {
        CloudUtils.getTab('../../project/dykManager/revenueReapplyJB.html', "taskInfo");
        jQuery.getScript("../../js/project/dykManager/revenueReapplyJB.js");
        if (row.taskDefKey == "usertask2") {
            $("#divAdvice").show();
        } else {
            $("#divAdvice").hide();
        }
    } else if (row.proDefKey == "loanInfo") {
        CloudUtils.getTab('../../project/ssmManager/LoanInfoManager/LoanInfoHisDetail.html', "taskInfo");
        jQuery.getScript("../../js/project/ssmManager/LoanInfoManager/HistoryDetail/LoanInfoHisDetail.js");
        if (row.taskDefKey == "xmjl_apply") {
            $(".agrAndAdvHis").hide();
        } else {
            $(".agrAndAdvHis").show();
        }

    } else if (row.proDefKey == "contractSign") {
        if (row.taskDefKey == "task_sign_ssm") {
            CloudUtils.getTab('../../project/ssmManager/orderManager/ssmAgencyTaskDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/ssmManager/orderManager/ssmAgencyTaskDetail.js");

        } else if (row.taskDefKey == "task_sign_fw") {
            CloudUtils.getTab('../../project/ssmManager/orderManager/fwAgencyTaskDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/ssmManager/orderManager/fwAgencyTaskDetail.js");

        } else if (row.taskDefKey == "task_sign_pl") {
            CloudUtils.getTab('../../project/ssmManager/orderManager/fwAgencyTaskDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/ssmManager/orderManager/fwAgencyTaskDetail.js");
        }
    } else if (row.proDefKey == "orderManagerProcess") {
        if (row.taskDefKey == "task_order_pl") {
            //项目经理 task_order_fzr
            CloudUtils.getTab('../../project/ssmManager/orderManager/orderManagerDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/ssmManager/orderManager/orderManagerDetail.js");
            // $('#mainFrame', top.document).attr('src', 'project/ssmManager/orderManager/orderManager.html?taskId=' + row.taskId + '&procInstId=' + row.procInstId + '&taskDefKey=' + row.taskDefKey);
        } else if (row.taskDefKey == "task_order_fzr") {
            //项目经理 task_order_fzr
            CloudUtils.getTab('../../project/ssmManager/orderManager/orderManagerDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/ssmManager/orderManager/orderManagerDetail.js");
            // $('#mainFrame', top.document).attr('src', 'project/ssmManager/orderManager/orderManager.html?taskId=' + row.taskId + '&procInstId=' + row.procInstId + '&taskDefKey=' + row.taskDefKey);
        }
    } else if (row.proDefKey == "orderChargeBackProcess") {
    	 CloudUtils.getTab('../../project/ssmManager/orderManager/orderUnusualManagerDetail.html', "taskInfo");
         jQuery.getScript("../../js/project/ssmManager/orderManager/orderUnusualManagerDetail.js");
    } else if (row.proDefKey == "orderEarlyClearProcess") {
   	 CloudUtils.getTab('../../project/ssmManager/orderManager/orderUnusualManagerDetail.html', "taskInfo");
        jQuery.getScript("../../js/project/ssmManager/orderManager/orderUnusualManagerDetail.js");

    }else if (row.proDefKey == "orderManagerCheckProcess") {
        if (row.taskDefKey == "task_order_check_pl") {
            //项目经理 task_order_fzr
            CloudUtils.getTab('../../project/ssmManager/orderManager/orderManagerDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/ssmManager/orderManager/orderManagerDetail.js");
            // $('#mainFrame', top.document).attr('src', 'project/ssmManager/orderManager/orderManager.html?taskId=' + row.taskId + '&procInstId=' + row.procInstId + '&taskDefKey=' + row.taskDefKey);
        } else if (row.taskDefKey == "task_order_check_fw") {
            //项目经理 task_order_fzr
            CloudUtils.getTab('../../project/ssmManager/orderManager/orderManagerDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/ssmManager/orderManager/orderManagerDetail.js");
            // $('#mainFrame', top.document).attr('src', 'project/ssmManager/orderManager/orderManager.html?taskId=' + row.taskId + '&procInstId=' + row.procInstId + '&taskDefKey=' + row.taskDefKey);
        } else if (row.taskDefKey == "task_order_check_fzr") {
            //项目经理 task_order_fzr
            CloudUtils.getTab('../../project/ssmManager/orderManager/orderManagerDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/ssmManager/orderManager/orderManagerDetail.js");
            // $('#mainFrame', top.document).attr('src', 'project/ssmManager/orderManager/orderManager.html?taskId=' + row.taskId + '&procInstId=' + row.procInstId + '&taskDefKey=' + row.taskDefKey);
        }


    }  else if (row.proDefKey == "ssmRepayManager") {

        CloudUtils.getTab('../../project/ssmManager/repayManager/repayAgencyTaskDetail.html', "taskInfo");
        jQuery.getScript("../../js/project/ssmManager/repayManager/repayAgencyTaskDetail.js");

    } else if (row.proDefKey == "project") {

        CloudUtils.getTab('../../tradfact/project/project-audit.html', "taskInfo");
        jQuery.getScript("../../js/tradfact/project/project-audit.js");

    }else if (row.proDefKey == "loanApplication") {

        CloudUtils.getTab('../../tradfact/loanApplication/loanDetail.html', "taskInfo");
        jQuery.getScript("../../js/tradfact/loanApplication/loanDetail.js");

    }else if (row.proDefKey == "signApplyProcess") {
    	
        CloudUtils.getTab("../../tradfact/projectSign/signDetail.html", "taskInfo");
        jQuery.getScript("../../js/tradfact/projectSign/signDetail.js");
    }else if (row.proDefKey == "projectAdjust") {
    	
        CloudUtils.getTab("../../tradfact/projectAdjust/projectAdjustDetail.html", "taskInfo");
        jQuery.getScript("../../js/tradfact/projectAdjust/projectAdjustDetail.js");
    }else if (row.proDefKey == "projectReview") {
    	
        CloudUtils.getTab("../../tradfact/projectReview/projectReviewDetail.html", "taskInfo");
        jQuery.getScript("../../js/tradfact/projectReview/projectReviewDetail.js");
    }else if (row.proDefKey == "recommendMeeting") {
    	
        CloudUtils.getTab("../../tradfact/recomMeet/recomMeetDetail.html", "taskInfo");
        jQuery.getScript("../../js/tradfact/recomMeet/recomMeetDetail.js");
    }


}

/*function addExpress() {
	
	if($("#addformbody").html()!=undefined){
		
	}else{
	    //添加的内容
	    var addform = '<div id="addformbody"><form role="form"><div class="form-group">' +
	    '<label for="name">快递公司名称</label>' +
	    '<input type="text" class="form-control" id="expressName" placeholder="请填写快递公司名称" required></div>'+
	    '<div class="form-group">' +
	    '<label for="name">快递单号</label>' +
	    '<input type="text" class="form-control" id="expressId" placeholder="请填写快递单号" required></div>'+
	    '</form></div>';
	    
	    $("#formpart").after(addform);
	}
    //删除表单
    $("#deleteExpress").click(function(){
       $("#addformbody").remove();
    });

}*/