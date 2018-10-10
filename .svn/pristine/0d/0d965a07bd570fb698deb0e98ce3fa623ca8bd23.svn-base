package com.ut.scf.service.bpm.listener;


import com.ut.scf.dao.pub.ICustDao;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.DelegateTask;

import org.activiti.engine.delegate.Expression;
import org.activiti.engine.delegate.TaskListener;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class CountersignListener implements TaskListener {

    private static final long serialVersionUID = -123037493041558708L;
    private static WebApplicationContext ctx = ContextLoader.getCurrentWebApplicationContext();


    @Override
    public void notify(DelegateTask delegateTask) {
        DelegateExecution execution = delegateTask.getExecution();
        int actives = execution.getVariable("nrOfActiveInstances", Integer.class);
        // 不是最后一个会签任务提交
        if (actives != 1) {
            return;
        }
        int passCnt = execution.getVariable("countersign_passcount", Integer.class);//同意的数量
        int total = execution.getVariable("nrOfInstances", Integer.class); //总数
        int reject = execution.getVariable("countersign_rejectcount", Integer.class); //拒绝数量

        if (reject > 0) {
            execution.setVariable("CounterSign", false);
        } else if (passCnt == total) {
            execution.setVariable("CounterSign", true);
        }

    }


}
