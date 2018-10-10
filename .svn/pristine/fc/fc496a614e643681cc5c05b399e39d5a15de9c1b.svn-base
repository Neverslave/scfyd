package com.ut.scf.service.bpm.impl;

import javax.annotation.Resource;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.util.json.JSONObject;
import org.activiti.engine.runtime.Execution;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.stereotype.Service;

@Service
public class BpmActivitiService {
    @Resource
    ProcessEngine processEngine;
    @Resource
    RuntimeService runtimeService;
    @Resource
    TaskService taskService;

    private JSONObject jsonObject = new JSONObject();// 获取json

    public BpmActivitiService setValue(JSONObject jsonObject) {
        this.jsonObject = jsonObject;
        if (jsonObject.has("taskId")) {
            String taskId = jsonObject.getString("taskId");
            if (taskId != null && !"".equals(taskId) && !"null".equals(taskId)) {
                Task task = getTaskById(taskId);
                setTask(task);
                ProcessInstance procInstance = getProcessInstanceByTaskId(taskId);
                setPi(procInstance);
            }
        }
        return this;
    }

    public JSONObject getValue() {
        return jsonObject;
    }

    private Task task;

    private ProcessInstance pi;

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public ProcessInstance getPi() {
        return pi;
    }

    public void setPi(ProcessInstance pi) {
        this.pi = pi;
    }

    /**
     * 创建流程
     *
     * @return
     */
    public BpmActivitiService createProcess() {
        String key = (String) getValue().get("activitiKey");
        ProcessInstance p = processEngine.getRuntimeService()// 管理流程实例和执行对象，也就是表示正在执行的操作
                .startProcessInstanceByKey(key);
        setPi(p);
        Task createdTask = taskService.createTaskQuery().processInstanceId(pi.getId()).singleResult();
        setTask(createdTask);
        return this;
    }

    /**
     * 拾取用户
     *
     * @return
     */
    public BpmActivitiService claimUser(String userName) {

        taskService.claim(getTask().getId(), userName);
        return this;
    }

    /**
     * 设置全局变量
     *
     * @return
     */
    public BpmActivitiService setVariable(String key, Object value) {
        taskService.setVariable(getTask().getId(), key, value);// 发起者
        return this;
    }

    public BpmActivitiService setVariable(String taskId, String key, Object value) {
        taskService.setVariable(taskId, key, value);// 发起者
        return this;
    }

    /**
     * 设置局部变量
     *
     * @return
     */
    public BpmActivitiService setVariableLocal(String key, Object value) {
        taskService.setVariableLocal(getTask().getId(), key, value);// 发起者
        return this;
    }

    /**
     * 获取变量
     *
     * @return
     */
    public String getVariable(String key) {
        return (String) taskService.getVariable(getTask().getId(), "reviewUser");
    }

    public Object getVariable(String taskid, String key, Class type) {
        return taskService.getVariable(taskid, key, type);
    }

    /**
     * 流程完成，并设置下个Task
     */
    public BpmActivitiService complete() {
        taskService.complete(getTask().getId());
//        Task currentTask = getCurrentTask();
//        setTask(currentTask);
        return this;
    }

    /**
     * 获取目标节点的信息
     */
    public String getActivityId() {
        // 获取当前节点
        Execution execution = runtimeService.createExecutionQuery().processInstanceId(getPi().getId()).singleResult();
        return execution.getActivityId();
    }

    /**
     * 获取当前任务
     *
     * @return
     */
    public Task getCurrentTask() {
        Task task = taskService.createTaskQuery().processInstanceId(getPi().getId()).singleResult();
        return task;
    }

    /**
     * 根据taskId获取Task
     *
     * @param taskId
     * @return
     */
    public Task getTaskById(String taskId) {
        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
        return task;
    }

    /**
     * 根据taskId获取processInstance
     *
     * @param taskId
     * @return
     */
    public ProcessInstance getProcessInstanceByTaskId(String taskId) {
        Task task = getTaskById(taskId);
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
                .processInstanceId(task.getProcessInstanceId()).singleResult();
        return processInstance;
    }

    /**
     * 流程是否结束
     *
     * @return
     */
    public Boolean isProcessInstanceEnded() {
//        if (getTask() == null) {
//            return true;
//        }
        ProcessInstance pi = runtimeService.createProcessInstanceQuery()//
                .processInstanceId(getTask().getProcessInstanceId())// 使用流程实例ID查询
                .singleResult();
        if (pi == null) {
            return true;
        } else {
            return false;
        }
    }

}
