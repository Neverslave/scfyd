package com.ut.scf.service.bpm.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.ut.scf.bpm.BpmProcessContext;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricTaskInstanceQuery;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.history.HistoricVariableInstanceQuery;
import org.activiti.engine.impl.util.json.JSONObject;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.task.Task;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.ScfDateUtil;
import com.ut.scf.dao.project.IActivitiDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.StringRespBean;
import com.ut.scf.service.project.IProcessRepeatChkService;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("baseActivitiService")
public class BaseActivitiService<T> {

    @Autowired
    IActivitiDao activitiDao;

    @Resource
    private IProcessRepeatChkService processRepeatChkService;

    @Resource
    private BpmActivitiService bpmActivitiService;

    @Resource
    ProcessEngine processEngine;


    private static final String ADVANCE_APPLY_BPM = "";

    public String getProcessDefinitionKey() {
        return ADVANCE_APPLY_BPM;
    }


    private List<Target> targetlist;

    public void setTargetlist(List<Target> targetlist) {
        this.targetlist = targetlist;
    }

    /**
     * 发起流程
     *
     * @param t
     * @return
     */
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public BaseRespBean startProcess(BpmProcessContext<T> processContext) {
        doStartBefore(processContext);
        JSONObject jsonObject = new JSONObject(processContext.getT());
        BaseRespBean respBean = new BaseRespBean();
        jsonObject.put("activitiKey", getProcessDefinitionKey());
        bpmActivitiService.setValue(jsonObject).createProcess().claimUser(processContext.getUserName())
                .setVariable("launchUser", processContext.getUserName())
                .setVariableLocal("agencyJson", jsonObject.toString()).complete();
        doStartAfter(processContext);
        return respBean;
    }

    public void doStartBefore(BpmProcessContext<T> processContext) {

    }

    public void doStartAfter(BpmProcessContext<T> processContext) {
        String processId  = bpmActivitiService.getPi().getId();
        processContext.setProcessId(processId);
    }

    public void doAgreeBefore(BpmProcessContext<T> processContext) {
        JSONObject jsonObject = new JSONObject(processContext.getT());
        String agree = (String) jsonObject.get("agree");
        String taskId = (String) jsonObject.get("taskId");
        if ("countersign".equals(jsonObject.get("countersign"))) {//会签
            if (agree.equals("0")) {
                //同意
                int passCount = (Integer) bpmActivitiService.getVariable(taskId, "countersign_passcount", Integer.class);
                // 会签同意时计数+1
                bpmActivitiService.setVariable(taskId, "countersign_passcount", passCount + 1);
            } else {
                //拒绝
                int rejectCount = (Integer) bpmActivitiService.getVariable(taskId, "countersign_rejectcount", Integer.class);
                // 会签拒绝时计数+1
                bpmActivitiService.setVariable(taskId, "countersign_rejectcount", rejectCount + 1);
            }

        }

    }

    public void doAgreeAfter(BpmProcessContext<T> bpmProcessContext) {

    }

    /**
     * 是否同意
     *
     * @param jsonObject
     * @return
     */
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public BaseRespBean doAgree(BpmProcessContext<T> processContext) {
        JSONObject jsonObject = new JSONObject(processContext.getT());
        StringRespBean respBean = new StringRespBean();
        doAgreeBefore(processContext);
        boolean flag;
        // 1.获取taskId和当前用户
        String agree = (String) jsonObject.get("agree");

        if (agree.equals("0")) {
            flag = true;
        } else {
            flag = false;
        }
        BpmActivitiService agreeResult = bpmActivitiService.setValue(jsonObject).claimUser(processContext.getUserName())
                .setVariableLocal("agencyJson", jsonObject.toString()).setVariable("agree", flag);
        if (targetlist != null && !targetlist.isEmpty()) {
            String activityId = bpmActivitiService.setValue(jsonObject).getActivityId();// 获取当前的usertaskId
            for (Target t : targetlist) {
                if (t.getNode().equals(activityId)) {
                    agreeResult.setVariable(t.getVariable(), processContext.getUserName());
                }
            }
        }
        Boolean isProcessEnd = agreeResult.complete().isProcessInstanceEnded();
        processContext.setProcessEnd(isProcessEnd);
        doAgreeAfter(processContext);
        respBean.setStr(jsonObject.toString());
        return respBean;
    }


    public BaseRespBean getDataByTaskId(String taskId) {
        Task task = bpmActivitiService.getTaskById(taskId);
        String doc = task.getDescription();
        // 根据taskId获取流程数据
        String processInstanceId = processEngine.getHistoryService()
                .createHistoricTaskInstanceQuery().taskId(taskId)
                .singleResult().getProcessInstanceId();
        StringRespBean respBean = new StringRespBean();
        Object value = getHistoricVariable(processInstanceId);
        JSONObject jsonObject = new JSONObject(value.toString());
        jsonObject.put("doc", doc);
        respBean.setStr(jsonObject.toString());
        return respBean;
    }

    private Object getHistoricVariable(String processInstanceId) {
        List<HistoricTaskInstance> list = processEngine.getHistoryService()
                .createHistoricTaskInstanceQuery()
                .processInstanceId(processInstanceId).list();
        Object value = "";

        HistoricVariableInstanceQuery query = processEngine.getHistoryService()
                .createHistoricVariableInstanceQuery()
                .variableName("agencyJson");

        for (HistoricTaskInstance historicTaskInstance : list) {
            List<HistoricVariableInstance> queryList = query.taskId(historicTaskInstance.getId()).list();
            if (queryList != null && queryList.size() > 0) {
                value = queryList.get(0).getValue();
            } else {
                break;
            }
        }
        return value;
    }

    /**
     * 再申请
     *
     * @param jsonObject
     * @return
     */
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public BaseRespBean reApply(BpmProcessContext<T> processContext) {
        BaseRespBean respBean = new BaseRespBean();
        reApplyBefore(processContext);
        JSONObject jsonObject = new JSONObject(processContext.getT());
        bpmActivitiService.setValue(jsonObject).claimUser(processContext.getUserName()).setVariableLocal("agencyJson", jsonObject.toString())
                .complete();
        reApplyAfter(processContext);
        return respBean;
    }

    public void  reApplyAfter(BpmProcessContext<T> processContext){

    }

    public void  reApplyBefore(BpmProcessContext<T> processContext){

    }

    /**
     * 查找代办
     */
    public BaseRespBean getAgencyTaskList(Map<String, Object> map) {
        // 2.查出所有的任务
        List<Map<String, Object>> list = activitiDao.selectAgencyTask(map);
        for (Map<String, Object> taskMap : list) {
            String processInstanceId = (String) taskMap.get("procInstId");
            // 获取倒数第二个taskId
            List<HistoricTaskInstance> AllTaskList = processEngine.getHistoryService().createHistoricTaskInstanceQuery()
                    .processInstanceId(processInstanceId).list();
            if (AllTaskList.size() >= 2) {
                String parentId = AllTaskList.get(AllTaskList.size() - 2).getId();
                HistoricTaskInstance preTask = processEngine.getHistoryService().createHistoricTaskInstanceQuery()
                        .taskId(parentId).singleResult();
                taskMap.put("preAssignee", preTask.getAssignee());
                taskMap.put("preName", preTask.getName());
                taskMap.put("preDefKey", preTask.getTaskDefinitionKey());
            }
        }
        PageRespBean respBean = new PageRespBean();
        respBean.setDataList(list);
        return respBean;
    }

    /**
     * 取当前节点 流程变量
     *
     * @param taskId
     * @return
     */
    public BaseRespBean findDataByTaskId(String taskId) {
        // 根据taskId获取流程数据
        Object value = processEngine.getHistoryService().createHistoricVariableInstanceQuery()
                .variableName("agencyJson").taskId(taskId).singleResult().getValue();
        StringRespBean respBean = new StringRespBean();
        respBean.setStr(value.toString());
        return respBean;
    }

    public BaseRespBean getAllHistoryVariable(Map<String, Object> map) {
        // 1.获取流程Id
        String procInstId = (String) map.get("procInstId");
        ListRespBean respBean = new ListRespBean();
        List<HistoricVariableInstance> historyList = processEngine.getHistoryService()
                .createHistoricVariableInstanceQuery().processInstanceId(procInstId).list();
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        for (HistoricVariableInstance historicVariableInstance : historyList) {
            Map<String, Object> historyMap = new HashMap<String, Object>();
            if (historicVariableInstance.getVariableName().equals("agencyJson")) {
                Object value = historicVariableInstance.getValue();
                JSONObject jsonObject = new JSONObject(value.toString());
                if (jsonObject.has("agree") && StringUtils.isNotEmpty(jsonObject.getString("agree"))
                        && !"null".equals(jsonObject.getString("agree"))) {
                    String taskId = historicVariableInstance.getTaskId();
                    HistoricTaskInstance task = processEngine.getHistoryService().createHistoricTaskInstanceQuery()
                            .taskId(taskId).list().get(0);
                    historyMap.put("taskName", task.getName());
                    historyMap.put("assignee", task.getAssignee());
                    historyMap.put("createTime", historicVariableInstance.getCreateTime());
                    historyMap.put("advice",
                            "null".equals(jsonObject.getString("advice")) ? "" : jsonObject.getString("advice"));
                    historyMap.put("taskId", taskId);
                    historyMap.put("agree", jsonObject.getString("agree"));
                    historyMap.put("hisId", historicVariableInstance.getId());
                    list.add(historyMap);
                }
            }
        }
        respBean.setDataList(list);
        return respBean;
    }

    public BaseRespBean getAgencyTaskNum(Map<String, Object> map) {
        int agencyTaskNum = activitiDao.countAgencyTask(map);
        ListRespBean respBean = new ListRespBean();
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Map<String, Object> numlist = new HashMap<String, Object>();
        numlist.put("AgencyTaskNum", agencyTaskNum);
        list.add(numlist);
        respBean.setDataList(list);
        return respBean;
    }

    public BaseRespBean getHandleTaskList(Map<String, Object> map, PageInfoBean page) {
        List<Map<String, Object>> list = activitiDao.selectHandleTask(map, page);
        for (Map<String, Object> map2 : list) {
            // 获取流程id
            String procInstId = (String) map2.get("procInstId");
            HistoricTaskInstance historicTaskInstance = processEngine.getHistoryService()
                    .createHistoricTaskInstanceQuery().processInstanceId(procInstId).orderByTaskDueDate().desc().list()
                    .get(0);
            String assignee = historicTaskInstance.getAssignee();
            String owner = historicTaskInstance.getOwner();
            map2.put("assignee", assignee);
            map2.put("roleId", owner);
        }
        PageRespBean respBean = new PageRespBean();
        respBean.setPages(page.getTotalPage());
        respBean.setRecords(page.getTotalRecord());
        respBean.setDataList(list);
        return respBean;
    }

    public BaseRespBean getHandleTaskNum(Map<String, Object> map) {
        int HandleTaskNum = activitiDao.countHandleTask(map);
        ListRespBean respBean = new ListRespBean();
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Map<String, Object> numlist = new HashMap<String, Object>();
        numlist.put("HandleTaskNum", HandleTaskNum);
        list.add(numlist);
        respBean.setDataList(list);
        return respBean;
    }

    public BaseRespBean getHistoryTaskList(Map<String, Object> map) {
        String procInstId = (String) map.get("procInstId");
        ListRespBean respBean = new ListRespBean();
        HistoricTaskInstanceQuery histTaskQuery = processEngine.getHistoryService().createHistoricTaskInstanceQuery()
                .processInstanceId(procInstId).orderByTaskCreateTime().asc();
        List<HistoricTaskInstance> historyTaskList = histTaskQuery.list();
        HistoricTaskInstance histSingleResult = historyTaskList.get(0);
        ProcessDefinition ProDefInfo = processEngine.getRepositoryService().createProcessDefinitionQuery()
                .processDefinitionId(histSingleResult.getProcessDefinitionId()).singleResult();
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        for (HistoricTaskInstance historicTaskInstance : historyTaskList) {
            Map<String, Object> historyMap = new HashMap<String, Object>();
            historyMap.put("taskId", historicTaskInstance.getId());
            historyMap.put("assignee", historicTaskInstance.getAssignee());
            historyMap.put("name", historicTaskInstance.getName());
            historyMap.put("procInstId", historicTaskInstance.getProcessInstanceId());
            historyMap.put("taskDefKey", historicTaskInstance.getTaskDefinitionKey());
            historyMap.put("proDefName", ProDefInfo.getName());
            historyMap.put("proDefKey", ProDefInfo.getKey());
            historyMap.put("createTime",
                    ScfDateUtil.format(historicTaskInstance.getCreateTime(), ScfConsts.DATETIME_FORMAT));
            historyMap.put("endTime", ScfDateUtil.format(historicTaskInstance.getEndTime(), ScfConsts.DATETIME_FORMAT));

            list.add(historyMap);
        }
        respBean.setDataList(list);
        return respBean;
    }

    /**
     * 删除流程
     *
     * @param procInstId
     * @return
     */
    public BaseRespBean deleteProcessById(String procInstId) {
        BaseRespBean respBean = new BaseRespBean();
        // 删除流程
        processEngine.getRuntimeService().deleteProcessInstance(procInstId, "delete");
        // 删除process_repeat_check数据
        processRepeatChkService.deleteByProcInstId(procInstId);
        Object value = getHistoricVariable(procInstId);
        JSONObject jsonObject = new JSONObject(value.toString());
        deleteProcessAfter(jsonObject);
        return respBean;
    }

    public void deleteProcessAfter(JSONObject jsonObject) {

    }

}
