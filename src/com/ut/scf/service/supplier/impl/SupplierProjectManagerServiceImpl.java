package com.ut.scf.service.supplier.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.util.json.JSONObject;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.exception.BizException;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.LimitInfoMapper;
import com.ut.scf.dao.auto.SupplierProjectInfoMapper;
import com.ut.scf.dao.pub.IContractInfoDao;
import com.ut.scf.dao.supplier.ISupplierDao;
import com.ut.scf.pojo.auto.ProcessRepeatCheck;
import com.ut.scf.pojo.auto.SupplierProjectInfo;
import com.ut.scf.reqbean.supplier.SupplierManagerReqBean;
import com.ut.scf.reqbean.supplier.SupplierProjectReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.StringRespBean;
import com.ut.scf.service.project.IProcessRepeatChkService;
import com.ut.scf.service.supplier.ISupplierProjectManagerService;

@Service("supplierProjectManagerService")
public class SupplierProjectManagerServiceImpl implements ISupplierProjectManagerService {
	@Resource 
	private ISupplierDao supplierDao;
	@Resource private ProcessEngine processEngine;
	@Resource private RuntimeService runtimeService;
	@Resource private TaskService taskService;
	@Resource private RepositoryService repositoryService;
	@Resource private LimitInfoMapper limitInfoMapper;
	@Resource private IProcessRepeatChkService processRepeatChkService;
	@Resource private SupplierProjectInfoMapper supplierProjectInfoMapper;
	@Resource private IContractInfoDao contractInfoDao;
	@Override
	public BaseRespBean getsupplierProjectList(Map<String, Object> paramMap, PageInfoBean page) {
		
		List<java.util.Map<String, Object>> list = supplierDao.supplierProjectList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	public BaseRespBean addSupplierProject(SupplierProjectReqBean supplierManagerReqBean) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BaseRespBean startProcess(JSONObject jsonObject) {
		BaseRespBean respBean = new BaseRespBean();
/*//		去重
		List<ProcessRepeatCheck> checks = new ArrayList<ProcessRepeatCheck>();
		
		respBean = checkAgency(jsonObject, checks);
		if (respBean.getResult() != 0) {
			return respBean;
		}*/
		String userName = (String) jsonObject.get("userId");
		String key = (String) jsonObject.get("activitiKey");
//		加上当前用户
		ProcessInstance pi = processEngine.getRuntimeService()//管理流程实例和执行对象，也就是表示正在执行的操作  
		            .startProcessInstanceByKey(key);
		String procInstId = pi.getProcessInstanceId();
//		TaskService taskService = processEngine.getTaskService();//获取任务的Service，设置和获取流程变量  
		Task task = taskService.createTaskQuery().processInstanceId(pi.getId()).singleResult();
//		拾取用户
		taskService.claim(task.getId(), userName);
//		设置变量
		taskService.setVariableLocal(task.getId(), "agencyJson", jsonObject.toString());
		taskService.setVariable(task.getId(), "launchUser", userName);//发起者
//		完成节点
		taskService.complete(task.getId());
/*		for (ProcessRepeatCheck check : checks) {
			check.setProcInstId(procInstId);
			int result = processRepeatChkService.insert(check);
			if (result < 1) {
				throw new BizException(ErrorCodeEnum.UPDATE_FAILED);
			}
		}*/
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean agreeThenAdd(SupplierProjectReqBean supplierManagerReqBean) {
		//	流程同意
		String taskId = supplierManagerReqBean.getTaskId();
		JSONObject jsonObject = new JSONObject(supplierManagerReqBean);
		doAgree(jsonObject);
//		添加进业务表中
		SupplierProjectReqBean reqBean  =new SupplierProjectReqBean();
		BeanUtil.BeanToBean(reqBean, supplierManagerReqBean);
		BaseRespBean addSupplierRespBean = insertSupplierProject(reqBean);
	/*	String procInstId = processEngine.getHistoryService().createHistoricTaskInstanceQuery().
				taskId(taskId).singleResult().getProcessInstanceId();
		int deleteCnt = processRepeatChkService.deleteByProcInstId(procInstId);
		if (deleteCnt < 1) {
			throw new BizException(ErrorCodeEnum.DELETE_FAILED);
		}*/
		return addSupplierRespBean;
	}

	private BaseRespBean insertSupplierProject(SupplierProjectReqBean reqBean) {
		BaseRespBean respBean=new BaseRespBean();
		try {
			SupplierProjectInfo supplierProjectInfo=new SupplierProjectInfo();
			
			
			BeanUtil.BeanToBean(supplierProjectInfo, reqBean);
			supplierProjectInfo.setId(ScfUUID.generate());
			supplierProjectInfoMapper.insertSelective(supplierProjectInfo);
			
			//添加合同表
			
			List<Map<String,Object>> contractInfoList = (List<Map<String, Object>>) reqBean.getContractInfoList();
			if(contractInfoList.size()>0){
				for(Map<String,Object> contractMap:contractInfoList){
					contractMap.put("contractid", ScfUUID.generate());
					contractMap.put("corpId", supplierProjectInfo.getId());
//					attachMap.put("relaCorpId", corpInfo.getRelaCorpId());
					contractInfoDao.insertContract(contractMap);
				}
			}
			
		} catch (Exception e) {
			respBean.setResult(-1);
		}
		
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean doAgree(JSONObject jsonObject) {
		boolean flag;
		StringRespBean respBean = new StringRespBean();
//		1.获取taskId和当前用户
		String taskId = (String) jsonObject.get("taskId");
		String agree = (String) jsonObject.get("agree");
		String userId = (String) jsonObject.get("userId");
//		2.拾取用户
		taskService.claim(taskId, userId);
//		3.设置变量
		taskService.setVariableLocal(taskId, "agencyJson", jsonObject.toString());
//		4.流程走向
		if(agree.equals("0")){
			flag = 	true;
		}else{
			flag = 	false;
		}
		taskService.setVariable(taskId, "agree", flag);
//		5.完成流程
		taskService.complete(taskId);
		respBean.setStr(jsonObject.toString());
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean reApply(JSONObject jsonObject) {
		BaseRespBean respBean = new BaseRespBean(); 
//		1.获取taskId和userId
		String taskId = (String) jsonObject.get("taskId");
		String userId = (String) jsonObject.get("userId");
	
	
//		2.拾取用户
		taskService.claim(taskId, userId);
//		3.设置流程变量
		taskService.setVariableLocal(taskId, "agencyJson", jsonObject.toString());
//		4.完成流程
		taskService.complete(taskId);

		return respBean;
	}
	
	
	
}



