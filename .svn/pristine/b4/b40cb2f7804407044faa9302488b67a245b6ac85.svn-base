var taskId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).taskId;
var processInstanceId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).processInstanceId;
var processDefinitionId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).processDefinitionId;
var isEnd = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).isEnd;
var isDetail = true;
var taskDefKey = "";
$(function () {
    initTaskTable(processInstanceId);
    showGraph();
});

function goback() {
    history.go(-1);
}

function showGraph() {
    if (isEnd == 1) {
        taskId = "";
        processInstanceId = "";
    }
    $("#pic").attr("src", "../../activiti/graph?processDefinitionId=" + processDefinitionId +
        "&processInstanceId=" + processInstanceId + "&taskId=" + taskId);
    $("#picModal").modal({backdrop: 'static', keyboard: false});
}

function initTaskTable(procInstId) {
    $('#taskListTable').bootstrapTable('destroy');
    $("#taskListTable").bootstrapTable({
        method: "post",
        url: "../../activiti/getHistoryTaskList",
        striped: false,  //表格显示条纹
        search: false,  //是否启用查询
        showColumns: false,  //显示下拉框勾选要显示的列
        showRefresh: false,  //显示刷新按钮
        sidePagination: "server", //表示服务端请求
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "undefined",
        queryParams: function queryParams(params) {   //设置查询参数
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
            field: 'assignee',
            title: '办理人',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'name',
            title: '角色',
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
            field: 'operation',
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
            events: 'handleOperateEvents'
        }]
    });
}


window.handleOperateEvents = {
    'click .detail': function (e, value, row, index) {
        /*getVariableByTaskId(row.taskId)*/
        store.set('agencyRow', row);//把数据存储在缓存中
        choosePage(row);
    }
};

function choosePage(row) {
    console.log(row);
    if (row.assignee != null) {
        $("#taskInfoModal").modal();//显示模态框
    } else {
        return;
    }
    if (row.proDefKey == "custManage") {
        CloudUtils.getTab("../../pubManager/custManager/custHisDetail/custHisDetail.html", "taskInfo");
        if (row.taskDefKey == "usertask1") {
            $(".adviceHidden").hide();
        } else {
            $(".adviceHidden").show();
        }
        jQuery.getScript("../../js/project/agencyCommon/custHisDetail/custHisDetail.js");
    }
    else if (row.proDefKey == "changeAgency") {
        CloudUtils.getTab("../../pubManager/custManager/custHisDetail/custHisDetail.html", "taskInfo");
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
        CloudUtils.getTab("../../project/dykManager/repayDetail/repayDetail.html", "taskInfo");
        if (row.taskDefKey == "usertask1") {
            $(".adviceHidden").hide();
        } else {
            $(".adviceHidden").show();
        }
        jQuery.getScript("../../js/project/agencyCommon/repayDetail/repayDetail.js");
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
        } else if (row.taskDefKey == "task_order_fzr") {
            //项目经理 task_order_fzr
            CloudUtils.getTab('../../project/ssmManager/orderManager/orderManagerDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/ssmManager/orderManager/orderManagerDetail.js");
        }
    } else if (row.proDefKey == "orderChargeBackProcess") {
    	
        CloudUtils.getTab('../../project/ssmManager/orderManager/orderUnusualManagerDetail.html', "taskInfo");
        jQuery.getScript("../../js/project/ssmManager/orderManager/orderUnusualManagerDetail.js");
        
    } else if (row.proDefKey == "orderEarlyClearProcess") {     
         
            CloudUtils.getTab('../../project/ssmManager/orderManager/orderUnusualManagerDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/ssmManager/orderManager/orderUnusualManagerDetail.js");
    
    } else if (row.proDefKey == "orderManagerCheckProcess") {
        if (row.taskDefKey == "task_order_check_pl") {
            //项目经理 task_order_fzr
            CloudUtils.getTab('../../project/ssmManager/orderManager/orderManagerDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/ssmManager/orderManager/orderManagerDetail.js");
        } else if (row.taskDefKey == "task_order_check_fw") {
            //项目经理 task_order_fzr
            CloudUtils.getTab('../../project/ssmManager/orderManager/orderManagerDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/ssmManager/orderManager/orderManagerDetail.js");
        } else if (row.taskDefKey == "task_order_check_fzr") {
            //项目经理 task_order_fzr
            CloudUtils.getTab('../../project/ssmManager/orderManager/orderManagerDetail.html', "taskInfo");
            jQuery.getScript("../../js/project/ssmManager/orderManager/orderManagerDetail.js");
        }
    } else if (row.proDefKey == "ssmRepayManager") {
        CloudUtils.getTab('../../project/ssmManager/repayManager/repayAgencyTaskDetail.html', "taskInfo");
        jQuery.getScript("../../js/project/ssmManager/repayManager/repayAgencyTaskDetail.js");
    } else if (row.proDefKey == "recommendMeeting") {
        CloudUtils.getTab('../../tradfact/recomMeet/recomMeetDetail.html', "taskInfo");
        jQuery.getScript("../../js/tradfact/recomMeet/recomMeetDetail.js");
    }else if (row.proDefKey == "project") {
        CloudUtils.getTab('../../tradfact/project/project-audit.html', "taskInfo");
        jQuery.getScript("../../js/tradfact/project/project-audit.js");
    }else if (row.proDefKey == "signApplyProcess") {
        CloudUtils.getTab("../../tradfact/projectSign/signDetail.html", "taskInfo");
        jQuery.getScript("../../js/tradfact/projectSign/signDetail.js");
    }else if(row.proDefKey == "loanApplication"){
    	 CloudUtils.getTab("../../tradfact/loanApplication/loanDetail.html", "taskInfo");
         jQuery.getScript("../../js/tradfact/loanApplication/loanDetail.js");
    }else if(row.proDefKey == "projectAdjust"){
   	     CloudUtils.getTab("../../tradfact/projectAdjust/projectAdjustDetail.html", "taskInfo");
          jQuery.getScript("../../js/tradfact/projectAdjust/projectAdjustDetail.js");
     }else if (row.proDefKey == "projectReview") {
         CloudUtils.getTab("../../tradfact/projectReview/projectReviewDetail.html", "taskInfo");
         jQuery.getScript("../../js/tradfact/projectReview/projectReviewDetail.js");
     }
    
}

function print1() {
    $('#taskInfoModal .modal-body').printThis({
        doctypeString: "<!DOCTYPE html>",
        importCSS: false,
        loadCSS: ["scfyd/css/print.css"],
        formValues: true
    });
}