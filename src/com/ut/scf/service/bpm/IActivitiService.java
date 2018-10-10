package com.ut.scf.service.bpm;


import com.ut.scf.bpm.BpmProcessContext;

import com.ut.scf.respbean.BaseRespBean;

import java.util.Map;

public interface IActivitiService<T> {
	BaseRespBean startProcess(BpmProcessContext<T> processContext);

	BaseRespBean doAgree(BpmProcessContext<T> processContext);

	BaseRespBean reApply(BpmProcessContext<T> processContext);

	BaseRespBean getDataByTaskId(String taskId);

	BaseRespBean deleteProcessById(String procInstId);

	BaseRespBean getAgencyTaskList(Map<String, Object> map);

}
