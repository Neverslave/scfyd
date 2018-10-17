package com.ut.scf.service.supplier.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.JSONObject;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.exception.BizException;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.LimitInfoMapper;
import com.ut.scf.dao.auto.SupplierInfoMapper;
import com.ut.scf.dao.supplier.ISupplierDao;
import com.ut.scf.pojo.auto.CorpInfo;
import com.ut.scf.pojo.auto.CorpInfoExample;
import com.ut.scf.pojo.auto.ProcessRepeatCheck;
import com.ut.scf.pojo.auto.SupplierInfo;
import com.ut.scf.pojo.auto.SupplierInfoExample;
import com.ut.scf.pojo.auto.SupplierInfoExample.Criteria;
import com.ut.scf.reqbean.project.AgencyFlowReqBean;
import com.ut.scf.reqbean.pub.CorpInfoReqBean;
import com.ut.scf.reqbean.supplier.SupplierAgreeInfoReqBean;
import com.ut.scf.reqbean.supplier.SupplierManagerReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.StringRespBean;
import com.ut.scf.service.project.IProcessRepeatChkService;
import com.ut.scf.service.supplier.ISupplierManagerService;

@Service("supplierManagerService")
public class SupplierManagerServiceImpl implements ISupplierManagerService {
	@Resource 
	private ISupplierDao supplierDao;
	@Resource
	private SupplierInfoMapper supplierInfoMapper;	
	@Resource ProcessEngine processEngine;
	@Resource RuntimeService runtimeService;
	@Resource TaskService taskService;
	@Resource RepositoryService repositoryService;
	@Resource LimitInfoMapper limitInfoMapper;
	@Resource private IProcessRepeatChkService processRepeatChkService;
	
	
	
	
	
	
	/* 
	 * 
	 * 获取供应商信息 与SupplierService中的几乎完全一样？？
	 * @see com.ut.scf.service.supplier.ISupplierManagerService#getsupplierList(java.util.Map, com.ut.scf.core.dict.PageInfoBean)
	 */
	@Override
	@Transactional(readOnly=true)
	public BaseRespBean getsupplierList(Map<String, Object> paramMap, PageInfoBean page) {
		List<java.util.Map<String, Object>> list = supplierDao.supplierList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addSupplier(SupplierManagerReqBean supplierManagerReqBean) {
		BaseRespBean respBean = new BaseRespBean();
		
		
		//企业名称不能重复
		SupplierInfoExample supplierInfoExample= new SupplierInfoExample();
		Criteria criteria = supplierInfoExample.createCriteria();
		criteria.andCorpNameEqualTo(supplierManagerReqBean.getCorpName());
		long exampleNum = supplierInfoMapper.countByExample(supplierInfoExample);
		if (exampleNum>0) {
			respBean.setResult(ErrorCodeEnum.CORP_NAME_EXIST);
			return respBean;
		}
		
		//添加到supplier_info 数据库
		String corpId = ScfUUID.generate();
		supplierManagerReqBean.setCorpId(corpId);
		supplierManagerReqBean.setStatus((byte)ScfBizConsts.STATUS_NORMAL);
		supplierManagerReqBean.setCreateTime(new Date());
		SupplierInfo supplierAuto = new SupplierInfo();
		//这步 bean to bean 的意义何在？
		BeanUtil.BeanToBean(supplierAuto, supplierManagerReqBean);
		int insertNum = supplierInfoMapper.insert(supplierAuto);
		if(insertNum<=0) {
			throw new BizException(ErrorCodeEnum.ADD_FAILED);
		}
		
		//添加到uploadfile
		
		
		
		
		
		return respBean;
	}
	
	
	
	

	@Override
	public BaseRespBean updateSupplier(SupplierManagerReqBean supplierManagerReqBean) {
		BaseRespBean respBean = new BaseRespBean();
		
		if(supplierManagerReqBean.getSysType()!="4"){
			//企业名称不能重复
			SupplierInfoExample supplierInfoExample = new SupplierInfoExample();
			Criteria criteria = supplierInfoExample.createCriteria();
			long exampleNum = 0;
			if("0".equals(supplierInfoExample.getOredCriteria())){
				criteria.andCorpNameEqualTo(supplierManagerReqBean.getCorpName());
				 exampleNum = supplierInfoMapper.countByExample(supplierInfoExample);
				
				if(exampleNum > 0){
					respBean.setResult(ErrorCodeEnum.CORP_NAME_EXIST);
					return respBean;
				}
			}
		
		}
		// 修改supplier_info 信息
		SupplierInfo supplierInfoAuto = new SupplierInfo();
		BeanUtil.BeanToBean(supplierInfoAuto, supplierManagerReqBean);
		int updateNum = supplierInfoMapper.updateByPrimaryKeySelective(supplierInfoAuto);
		if(updateNum<=0) {
		 throw new BizException(ErrorCodeEnum.UPDATE_FAILED);
		}
		
		//修改uploadfile表
		
		return respBean;
		
	}

	@Override
	public BaseRespBean startProcess(JSONObject jsonObject) {
		BaseRespBean respBean = new BaseRespBean();
//		去重
		List<ProcessRepeatCheck> checks = new ArrayList<ProcessRepeatCheck>();
		// 经销商重复推荐验证
		respBean = checkAgency(jsonObject, checks);
		if (respBean.getResult() != 0) {
			return respBean;
		}
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
		for (ProcessRepeatCheck check : checks) {
			check.setProcInstId(procInstId);
			int result = processRepeatChkService.insert(check);
			if (result < 1) {
				throw new BizException(ErrorCodeEnum.UPDATE_FAILED);
			}
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
		String procInstId = processEngine.getHistoryService().createHistoricTaskInstanceQuery().
				taskId(taskId).singleResult().getProcessInstanceId();
		int deleteCnt = processRepeatChkService.deleteByProcInstId(procInstId);
		if (deleteCnt < 1) {
			throw new BizException(ErrorCodeEnum.DELETE_FAILED);
		}
		List<ProcessRepeatCheck> checks = new ArrayList<ProcessRepeatCheck>();
		respBean = checkAgency(jsonObject, checks);
		if (respBean.getResult() == ErrorCodeEnum.ORGN_NUM_EXIST.getValue()) {
			throw new BizException(ErrorCodeEnum.ORGN_NUM_EXIST,respBean.getResultNote());
		} else if (respBean.getResult() == ErrorCodeEnum.AGENCY_NUM_EXIST.getValue()) {
			throw new BizException(ErrorCodeEnum.AGENCY_NUM_EXIST, respBean.getResultNote());
		} else if (respBean.getResult() == ErrorCodeEnum.CORP_NAME_EXIST.getValue()) {
			throw new BizException(ErrorCodeEnum.CORP_NAME_EXIST, respBean.getResultNote());
		} else if (respBean.getResult() == ErrorCodeEnum.ADD_FAILED.getValue()) {
			throw new BizException(ErrorCodeEnum.ADD_FAILED, respBean.getResultNote());
		}
//		2.拾取用户
		taskService.claim(taskId, userId);
//		3.设置流程变量
		taskService.setVariableLocal(taskId, "agencyJson", jsonObject.toString());
//		4.完成流程
		taskService.complete(taskId);
		for (ProcessRepeatCheck check : checks) {
			check.setProcInstId(procInstId);
			int result = processRepeatChkService.insert(check);
			if (result < 1) {
				throw new BizException(ErrorCodeEnum.ADD_FAILED);
			}
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean agreeThenAdd(SupplierAgreeInfoReqBean supplierManagerReqBean) {
		//	流程同意
		String taskId = supplierManagerReqBean.getTaskId();
		JSONObject jsonObject = new JSONObject(supplierManagerReqBean);
		doAgree(jsonObject);
//		添加进业务表中
		SupplierManagerReqBean reqBean  =new SupplierManagerReqBean();
		BeanUtil.BeanToBean(reqBean, supplierManagerReqBean);
		BaseRespBean addSupplierRespBean = updateSupplier(reqBean);
		String procInstId = processEngine.getHistoryService().createHistoricTaskInstanceQuery().
				taskId(taskId).singleResult().getProcessInstanceId();
		int deleteCnt = processRepeatChkService.deleteByProcInstId(procInstId);
		if (deleteCnt < 1) {
			throw new BizException(ErrorCodeEnum.DELETE_FAILED);
		}
		return addSupplierRespBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean agreeThenMod(SupplierAgreeInfoReqBean supplierManagerReqBean) {
		String taskId = supplierManagerReqBean.getTaskId();
		//流程同意
		JSONObject jsonObject = new JSONObject(supplierManagerReqBean);
		doAgree(jsonObject);
		SupplierManagerReqBean reqBean  =new SupplierManagerReqBean();
		BeanUtil.BeanToBean(reqBean, supplierManagerReqBean);
		BaseRespBean updateSupplierRespBean = updateSupplier(reqBean);
		String procInstId = processEngine.getHistoryService().createHistoricTaskInstanceQuery().
				taskId(taskId).singleResult().getProcessInstanceId();
		int deleteCnt = processRepeatChkService.deleteByProcInstId(procInstId);
		if (deleteCnt < 1) {
			throw new BizException(ErrorCodeEnum.DELETE_FAILED);
		}
		return updateSupplierRespBean;
	}
	
	
	private BaseRespBean checkAgency(JSONObject jsonObject, List<ProcessRepeatCheck> checks) {
		BaseRespBean respBean = new BaseRespBean();
		String corpName = jsonObject.getString("corpName");
		String agencyNum = jsonObject.getString("agencyNum");
		//String orginCorpName = jsonObject.getString("orginCorpName");
		//String orginAgencyNum = jsonObject.getString("orginAgencyNum");
		String corpId = jsonObject.has("corpId") ? jsonObject.getString("corpId") : null;
//		校验企业名称重复
		SupplierInfoExample supplierInfoExample = new SupplierInfoExample();
		Criteria criteria = supplierInfoExample.createCriteria();
		criteria.andCorpNameEqualTo(corpName);
		if (StringUtils.isNotEmpty(corpId)) {
			criteria.andCorpIdNotEqualTo(corpId);
		}
		long exampleNum = supplierInfoMapper.countByExample(supplierInfoExample);
		//if("0".equals(orginCorpName) && exampleNum>0){
			//respBean.setResult(ErrorCodeEnum.CORP_NAME_EXIST);
		//	//return respBean;
		//}
		
//		校验经销商代码
		supplierInfoExample = new SupplierInfoExample();
		criteria = supplierInfoExample.createCriteria();
		criteria.andAgencyNumEqualTo(agencyNum);
		if (StringUtils.isNotEmpty(corpId)) {
			criteria.andCorpIdNotEqualTo(corpId);
		}
		exampleNum = supplierInfoMapper.countByExample(supplierInfoExample);
		//
	//	if("0".equals(orginAgencyNum) && exampleNum > 0){
		////	respBean.setResult(ErrorCodeEnum.AGENCY_NUM_EXIST);
			//return respBean;
	//	}
//		校验经销商代码
		
		ProcessRepeatCheck checkInfo = new ProcessRepeatCheck();
		checkInfo.setProcessKey("custManage");
		checkInfo.setItemKey("CORP_NAME");
		checkInfo.setItemValue(corpName);
		checks.add(checkInfo);
		if (processRepeatChkService.isProcessExist(checkInfo)) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			respBean.setResultNote("企业名称为【" + corpName + "】的修改经销商信息审批流程已发起，不能再次发起");
			return respBean;
		} else {
			checkInfo = new ProcessRepeatCheck();
			checkInfo.setProcessKey("custManage");
			checkInfo.setItemKey("AGENCY_NUM");
			checkInfo.setItemValue(agencyNum);
			checks.add(checkInfo);
			if (processRepeatChkService.isProcessExist(checkInfo)) {
				respBean.setResult(ErrorCodeEnum.ADD_FAILED);
				respBean.setResultNote("经销商代码为【" + agencyNum + "】的修改经销商信息审批流程已发起，不能再次发起");
				return respBean;
			}
		}
		return respBean;
	}
	
	public List<SupplierInfo> addSuppliers(AgencyFlowReqBean reqBean){
		
		String agencyListInfo = reqBean.getAgencyListInfo();
		
		JSONArray jsonArray = new JSONArray(agencyListInfo);
		List<SupplierInfo> supplierInfos = new ArrayList<SupplierInfo>();
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject obj = jsonArray.getJSONObject(i);
			String corpId = ScfUUID.generate();
			SupplierInfo supplierInfo = new SupplierInfo();
			supplierInfo.setCorpId(corpId);
			supplierInfo.setCorpName(obj.getString("corpName"));
			supplierInfo.setAgencyNum(obj.getString("agencyNum"));
			supplierInfo.setSysType("4");;

			supplierInfo.setNote(obj.getString("note"));
			supplierInfo.setCreateTime(new Date());
			supplierInfo.setStatus(1);
			int result = supplierInfoMapper.insert(supplierInfo);
			if (result < 1) {
				throw new BizException(ErrorCodeEnum.ADD_FAILED);
				
			}
			supplierInfos.add(supplierInfo);
			
	}
		
		
		
		return supplierInfos;
		
	}
	
	
	
}



