package com.ut.scf.service.bpm.listener;


import com.ut.scf.dao.pub.ICustDao;
import org.activiti.engine.delegate.*;
import org.activiti.engine.impl.el.FixedValue;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import javax.management.relation.RoleList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class CounterSignCandidateQueryListener implements TaskListener {


	private Expression counterSignRole;

	@Override
	public void notify(DelegateTask task) {
		String roleIds = (String) counterSignRole.getValue(task);
		List<String> roleList = Arrays.asList(roleIds.split(","));
		task.setVariable("countersign_passcount", 0);//同意
		task.setVariable("countersign_rejectcount", 0);//拒绝
		task.setVariable("assigneeList", roleList);
	}


	public Expression getCounterSignRole() {
		return counterSignRole;
	}

	public void setCounterSignRole(Expression counterSignRole) {
		this.counterSignRole = counterSignRole;
	}
}
