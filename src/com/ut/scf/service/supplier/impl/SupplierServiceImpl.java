package com.ut.scf.service.supplier.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.util.json.JSONArray;
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
import com.ut.scf.dao.auto.SupplierInfoMapper;
import com.ut.scf.dao.supplier.ISupplierDao;
import com.ut.scf.pojo.auto.ProcessRepeatCheck;
import com.ut.scf.pojo.auto.SupplierInfo;
import com.ut.scf.pojo.auto.SupplierInfoExample;
import com.ut.scf.pojo.auto.SupplierInfoExample.Criteria;
import com.ut.scf.reqbean.project.AgencyFlowReqBean;
import com.ut.scf.reqbean.supplier.SupplierSearchPageReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.project.IProcessRepeatChkService;
import com.ut.scf.service.supplier.ISupplierService;
@Service("supplierService")
public class SupplierServiceImpl  implements ISupplierService{
	@Resource
	private ISupplierDao supplierDao;
	@Resource
	private TaskService taskService;
	@Resource
	private ProcessEngine processEngine;
	@Resource
	private RuntimeService runtimeService;
	@Resource
	private SupplierInfoMapper supplierInfoMapper;
	@Resource
	private IProcessRepeatChkService processRepeatChkService;
    
	/* 分页查询获取供应商信息列表
	 * @see com.ut.scf.service.supplier.ISupplierService#SupplierList(com.ut.scf.reqbean.supplier.SupplierSearchPageReqBean)
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean SupplierList(SupplierSearchPageReqBean searchPageReqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(searchPageReqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(searchPageReqBean.getPageNumber());
		page.setPageSize(searchPageReqBean.getPageSize());
		//根据条件在数据库 supplier_info 中查找数据
		List<Map<String, Object>>  resultList = supplierDao.supplierList(paramMap, page);
		PageRespBean pageRespBean = new PageRespBean();
		pageRespBean.setPages(page.getTotalPage());
		pageRespBean.setRecords(page.getTotalRecord());
		pageRespBean.setDataList(resultList);
		return pageRespBean;
		
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean doAgree(AgencyFlowReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		
		// 1.获取taskId和当前用户
		JSONObject jsonObject = new JSONObject(reqBean);
		String procInstId = (String) jsonObject.get("procInstId");
		String taskId = (String) jsonObject.get("taskId");
		String userId = (String) jsonObject.get("userId");
		String agree = (String) jsonObject.get("agree");
		boolean flag = agree.equals("0") ? true : false;
		
		// 2.拾取用户
				try {
					taskService.claim(taskId, userId);
				} catch (Exception e) {
					throw new BizException(ErrorCodeEnum.ACTIVITI_REVIEW_ERROR);
				}
				
				// 3.设置变量
				taskService.setVariableLocal(taskId, "agencyJson", jsonObject.toString());
				// 4.流程走向
				taskService.setVariable(taskId, "agree", flag);
				// 5.完成流程
				taskService.complete(taskId);
				// 6.查看流程状态
				ProcessInstance pi = runtimeService.createProcessInstanceQuery()
					.processInstanceId(procInstId).singleResult();
				if (pi == null) { //流程已结束
					addSupplier(reqBean);
				}
				
				return respBean;
	}

	@Override
	
	public List<SupplierInfo> addSupplier(AgencyFlowReqBean reqBean) {
		String  supplierListInfo =reqBean.getAgencyListInfo();
		JSONArray jsonArray = new JSONArray(supplierListInfo);
		List<SupplierInfo> supplierInfos = new ArrayList<>();
//		循环为bean赋值
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject obj = jsonArray.getJSONObject(i);
			String corpId = ScfUUID.generate();
			SupplierInfo supplierInfo = new SupplierInfo();
			supplierInfo.setCorpId(corpId);
			supplierInfo.setCorpName(obj.getString("corpName"));
			supplierInfo.setAgencyNum(obj.getString("agencyNum"));
			supplierInfo.setSysType("4");
			supplierInfo.setStatus(new Integer(1));
			supplierInfo.setFixedPhone(obj.getString("fixedPhone"));
			supplierInfo.setLocationProvince(obj.getString("locationProvince"));
			supplierInfo.setLocationCity(obj.getString("locationcity"));
			supplierInfo.setLocationArea(obj.getString("locationArea"));
			supplierInfo.setLocationAddress(obj.getString("locationAddress"));
			supplierInfo.setRegisterProvince(obj.getString("registerProvince"));
			supplierInfo.setRegisterCity(obj.getString("registerCity"));
			supplierInfo.setRegisterArea(obj.getString("registerArea"));
			supplierInfo.setRegisterAddress(obj.getString("registerAddress"));
			supplierInfo.setEmail(obj.getString("email"));
			supplierInfo.setUniformCreditCode(obj.getString("uniformCreditCode"));
			supplierInfo.setLegalPerson(obj.getString("legalPerson"));
			supplierInfo.setCellphone(obj.getString("cellphone"));
			supplierInfo.setIdNumber(obj.getString("idNumber"));
			supplierInfo.setBusinessLicensePic(obj.getString("businessLicensePic"));
			supplierInfo.setCorpConsitutionDoc(obj.getString("corpConsitutionDoc"));
			supplierInfo.setNote(obj.getString("note"));
			
			int result = supplierInfoMapper.insert(supplierInfo);
			if (result<1) {
				throw new BizException(ErrorCodeEnum.ADD_FAILED);
				
			}
			supplierInfos.add(supplierInfo);
		}
		//返回supplierinfo list.
	  return supplierInfos;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean startProcess(JSONObject jsonObject) {
			BaseRespBean respBean = new BaseRespBean();
			String supplierListInfo = jsonObject.getString("supplierListInfo");
			List<ProcessRepeatCheck> checks = new ArrayList<ProcessRepeatCheck>();
			respBean=checkSupplier(supplierListInfo, checks);
			if(respBean.getResult()!=0) {
				return respBean;
			}
			String userName = (String)jsonObject.get("userId");
			String key = (String) jsonObject.get("activitiKey");
			
			// 加上当前用户
			ProcessInstance pi = processEngine.getRuntimeService()// 管理流程实例和执行对象，也就是表示正在执行的操作
					.startProcessInstanceByKey(key);
			String procInstId = pi.getProcessInstanceId();
			Task task = taskService.createTaskQuery().processInstanceId(pi.getId())
					.singleResult();

			// 拾取用户
			taskService.claim(task.getId(), userName);
			// 设置变量
			taskService.setVariable(task.getId(), "launchUser", userName);//发起者
			taskService.setVariableLocal(task.getId(), "agencyJson",
					jsonObject.toString());
			// 完成节点
			taskService.complete(task.getId());
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
	public BaseRespBean reApply(JSONObject jsonObject) {
		BaseRespBean respBean = new BaseRespBean();
		String procInstId = jsonObject.getString("procInstId");
		String supplierListInfo = jsonObject.getString("supplierListInfo");
		List<ProcessRepeatCheck> checks = new ArrayList<ProcessRepeatCheck>();
		
		int deleteCnt = processRepeatChkService.deleteByProcInstId(procInstId);
		if (deleteCnt < 1) {
			throw new BizException(ErrorCodeEnum.DELETE_FAILED);
		}
		
		// 经销商重复推荐验证
		respBean = checkSupplier(supplierListInfo, checks);
		if (respBean.getResult() == ErrorCodeEnum.AGENCY_NAME_NUM_EXIST.getValue()) {
			throw new BizException(ErrorCodeEnum.AGENCY_NAME_NUM_EXIST);
		} else if (respBean.getResult() == ErrorCodeEnum.ADD_FAILED.getValue()) {
			throw new BizException(ErrorCodeEnum.ADD_FAILED, respBean.getResultNote());
		}
		
		// 1.获取taskId和userId
		String taskId = (String) jsonObject.get("taskId");
		String userId = (String) jsonObject.get("userId");
		// 2.拾取用户
		taskService.claim(taskId, userId);
		// 3.设置流程变量
		taskService.setVariableLocal(taskId, "agencyJson",
				jsonObject.toString());
		// 4.完成流程
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
	
	
	/**
	 * 验证供应商是否正常。
	 * @param supplierListInfo
	 * @param checks
	 * @return
	 */
	public BaseRespBean checkSupplier(String supplierListInfo,List<ProcessRepeatCheck> checks) {
		BaseRespBean respBean = new BaseRespBean();
		JSONArray jsonArray = new JSONArray(supplierListInfo);
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject agencyObj = jsonArray.getJSONObject(i);
			String agencyName = agencyObj.getString("corpName");
			String agencyNum = agencyObj.getString("agencyNum");
			
			
			SupplierInfoExample supplierInfoExample= new SupplierInfoExample();
			
			//TODO NEED TO KNOW WHY
			Criteria criteria = supplierInfoExample.createCriteria();
			criteria.andCorpNameEqualTo(agencyName);
			Criteria criteria1 = supplierInfoExample.createCriteria();
			criteria1.andAgencyNumEqualTo(agencyNum);
			supplierInfoExample.or(criteria1);
			if (supplierInfoMapper.countByExample(supplierInfoExample) > 0) {
				respBean.setResult(ErrorCodeEnum.AGENCY_NAME_NUM_EXIST);
				return respBean;
			}
			
			ProcessRepeatCheck checkInfo = new ProcessRepeatCheck();
			checkInfo.setProcessKey("accAgencyProcess");
			checkInfo.setItemKey("AGENCY_NUM");
			checkInfo.setItemValue(agencyNum);
			checks.add(checkInfo);
			if (processRepeatChkService.isProcessExist(checkInfo)) {//验证经销商代码
				respBean.setResult(ErrorCodeEnum.ADD_FAILED);
				respBean.setResultNote("供应商代码为【" + agencyNum + "】的供应商已推荐，不能再次推荐");
				return respBean;
			} else {
				checkInfo = new ProcessRepeatCheck();
				checkInfo.setProcessKey("accAgencyProcess");
				checkInfo.setItemKey("AGENCY_NAME");
				checkInfo.setItemValue(agencyName);
				checks.add(checkInfo);
				if (processRepeatChkService.isProcessExist(checkInfo)) {//验证供应商名称
					respBean.setResult(ErrorCodeEnum.ADD_FAILED);
					respBean.setResultNote("供应商名称为【" + agencyName + "】供应商已推荐，不能再次推荐");
					return respBean;
				}
			}
		}
		
		return respBean;
		
	}

}
