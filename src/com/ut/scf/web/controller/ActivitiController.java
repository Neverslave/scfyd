package com.ut.scf.web.controller;

import javax.servlet.http.HttpSession;

import com.ut.scf.reqbean.ActivitiReqBean;
import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.bpm.BpmProcessContext;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.bpm.IActivitiService;

public abstract class ActivitiController<T> extends BaseJsonController {

	protected abstract IActivitiService<T> getBpmProcessService();

	// 流程申请
	@RequestMapping(value = "/bpm/startProcess")
	@ResponseBody
	public BaseRespBean startProcess(@RequestBody T reqBean, HttpSession httpSession) {
		String userName = httpSession.getAttribute(ScfConsts.SESSION_USERNAME).toString();
		BpmProcessContext<T> processContext = new BpmProcessContext<T>();
		processContext.setT(reqBean);
		processContext.setUserName(userName);
		return getBpmProcessService().startProcess(processContext);
	}

	// 流程审批 reApply
	@RequestMapping(value = "/bpm/auditProcess")
	@ResponseBody
	public BaseRespBean audit(@RequestBody T reqBean, HttpSession httpSession) {
		String userName = httpSession.getAttribute(ScfConsts.SESSION_USERNAME).toString();
		BpmProcessContext<T> processContext = new BpmProcessContext<T>();
		processContext.setT(reqBean);
		processContext.setUserName(userName);
		return getBpmProcessService().doAgree(processContext);
	}

	@RequestMapping(value = "/bpm/reApply")
	@ResponseBody
	public BaseRespBean reApply(@RequestBody T reqBean, HttpSession httpSession) {
		String userName = httpSession.getAttribute(ScfConsts.SESSION_USERNAME).toString();
		BpmProcessContext<T> processContext = new BpmProcessContext<T>();
		processContext.setT(reqBean);
		processContext.setUserName(userName);
		return getBpmProcessService().reApply(processContext);
	}

	@RequestMapping(value = "/bpm/getTaskDataByTaskId")
	@ResponseBody
	public BaseRespBean getTaskDataByTaskId(@RequestBody T reqBean) {
		JSONObject jsonObject = new JSONObject(reqBean);
		return getBpmProcessService().getDataByTaskId(jsonObject.getString("taskId"));
	}

	@RequestMapping(value = "/bpm/deleteByProcInstId")
	@ResponseBody
	public BaseRespBean deleteByProcInstId(@RequestBody ActivitiReqBean reqBean) {
		return getBpmProcessService().deleteProcessById(reqBean.getProcInstId());
	}
}
