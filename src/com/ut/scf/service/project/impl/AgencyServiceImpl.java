package com.ut.scf.service.project.impl;

import java.math.BigDecimal;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.exception.BizException;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.CorpInfoMapper;
import com.ut.scf.dao.auto.LimitInfoMapper;
import com.ut.scf.dao.project.IAgencyDao;
import com.ut.scf.pojo.auto.CorpInfo;
import com.ut.scf.pojo.auto.CorpInfoExample;
import com.ut.scf.pojo.auto.CorpInfoExample.Criteria;
import com.ut.scf.pojo.auto.LimitInfo;
import com.ut.scf.pojo.auto.ProcessRepeatCheck;
import com.ut.scf.reqbean.project.AgencyFlowReqBean;
import com.ut.scf.reqbean.project.AgencySearchPageReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.project.IAgencyService;
import com.ut.scf.service.project.IProcessRepeatChkService;
@Service("agencyService")
public class AgencyServiceImpl implements IAgencyService {
	
	@Resource
	private IAgencyDao agencyDao;
	
	@Resource
	private ProcessEngine processEngine;
	
	@Resource
	private RuntimeService runtimeService;
	
	@Resource
	private TaskService taskService;
	
	@Resource
	private RepositoryService repositoryService;
	
	@Resource
	private CorpInfoMapper corpInfoMapper;
	
	@Resource
	private LimitInfoMapper limitInfoMapper;
	
	@Resource
	private IProcessRepeatChkService processRepeatChkService;
	
	/**
	 * 条件查询 分页获取user
	 * 
	 * @param paramMap
	 * @param page
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean agencyList(AgencySearchPageReqBean searchPage) {

		Map<String, Object> paramMap = BeanUtil.beanToMap(searchPage);

		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(searchPage.getPageNumber());
		page.setPageSize(searchPage.getPageSize());

		List<Map<String, Object>> resultList = agencyDao.agencyList(paramMap,page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(resultList);
		return respBean;
	}
		
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
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
			addAgency(reqBean);
		}
		
		return respBean;
	}
	
	@Override
	public List<CorpInfo> addAgency(AgencyFlowReqBean reqBean) {
		String agencyListInfo = reqBean.getAgencyListInfo();
		
		JSONArray jsonArray = new JSONArray(agencyListInfo);
		List<CorpInfo> corpinfos = new ArrayList<CorpInfo>();
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject obj = jsonArray.getJSONObject(i);
			String corpId = ScfUUID.generate();
			CorpInfo corpInfo = new CorpInfo();
			corpInfo.setCorpId(corpId);
			corpInfo.setCorpName(obj.getString("corpName"));
			corpInfo.setAgencyNum(obj.getString("agencyNum"));
			corpInfo.setSysType((short) 4);
		/*	corpInfo.setMaxCreditAmount(new BigDecimal(obj.getString("maxCreditAmount")));*/
			corpInfo.setOfficeAddress(obj.getString("officeAddress"));
			corpInfo.setContactInfo(obj.getString("contactInfo"));
			corpInfo.setFixedPhone(obj.getString("fixedPhone"));
			corpInfo.setArea((byte) obj.getInt("area"));
			corpInfo.setRepresent((byte) obj.getInt("represent"));
//			corpInfo.setFirstTwoYearsPickupNum(obj.getInt("firstTwoYearsPickupNum"));
//			corpInfo.setFirstTwoYearsRetailNum(obj.getInt("firstTwoYearsRetailNum"));
//			corpInfo.setFirstTwoYearsSaleRank(obj.getInt("firstTwoYearsSaleRank"));
//			corpInfo.setThisYearPlanPickupNum(obj.getInt("thisYearPlanPickupNum"));
//			corpInfo.setThisYearPlanSales(new BigDecimal(obj.getString("thisYearPlanSales")));
			corpInfo.setNote(obj.getString("note"));
			corpInfo.setCreateTime(new Date());
			corpInfo.setStatus((byte) 1);
			int result = corpInfoMapper.insert(corpInfo);
			if (result < 1) {
				throw new BizException(ErrorCodeEnum.ADD_FAILED);
			}
			corpinfos.add(corpInfo);
			// 额度表
			LimitInfo limitInfo = new LimitInfo();
			limitInfo.setCorpId(corpInfo.getCorpId());
			if(obj.getString("maxCreditAmount")!=null&&(!obj.getString("maxCreditAmount").isEmpty()))
			{
				limitInfo.setMaxCreditAmount(new BigDecimal(obj.getString("maxCreditAmount")));
				limitInfo.setUseAbleCreditAmt(new BigDecimal(obj.getString("maxCreditAmount")));
			}
			if(obj.getString("maxLscreditAmount")!=null&&(!obj.getString("maxLscreditAmount").isEmpty()))
			{
				limitInfo.setMaxLscreditAmount(new BigDecimal(obj.getString("maxLscreditAmount")));
				limitInfo.setUseAbleLscreditAmt(new BigDecimal(obj.getString("maxLscreditAmount")));
			}
		
			limitInfo.setDzId(obj.getString("dzId"));
			limitInfo.setLsId(obj.getString("lsId"));
			limitInfo.setPreOccupancyAmt(BigDecimal.ZERO);
			limitInfo.setOccupiedAmt(BigDecimal.ZERO);
			int result1 = limitInfoMapper.insert(limitInfo);
			if (result1 < 1) {
				throw new BizException(ErrorCodeEnum.ADD_FAILED);
			}
		}
		return corpinfos;
		// 申请流程删除
//		int result = processRepeatChkService.deleteByProcInstId(reqBean.getProcInstId());
//		if (result < 1) {
//			throw new BizException(ErrorCodeEnum.DELETE_FAILED);
//		}
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean startProcess(JSONObject jsonObject) {
		BaseRespBean respBean = new BaseRespBean();
		String agencyListInfo = jsonObject.getString("agencyListInfo");
		List<ProcessRepeatCheck> checks = new ArrayList<ProcessRepeatCheck>();
		
		// 经销商重复推荐验证
		respBean = checkAgency(agencyListInfo, checks);
		if (respBean.getResult() != 0) {
			return respBean;
		}
		
		String userName = (String) jsonObject.get("userId");
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
		String agencyListInfo = jsonObject.getString("agencyListInfo");
		List<ProcessRepeatCheck> checks = new ArrayList<ProcessRepeatCheck>();
		
		int deleteCnt = processRepeatChkService.deleteByProcInstId(procInstId);
		if (deleteCnt < 1) {
			throw new BizException(ErrorCodeEnum.DELETE_FAILED);
		}
		
		// 经销商重复推荐验证
		respBean = checkAgency(agencyListInfo, checks);
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
	
	//大宗id
	@Override
	public BaseRespBean isIdExit(String dzId) {
		BaseRespBean respBean = new BaseRespBean();
			LimitInfo limitInfo = new LimitInfo();
			limitInfo.setDzId(dzId);
			List<LimitInfo> list = limitInfoMapper.selectByTypeId(limitInfo);
			if (list.size() > 0) {
				respBean.setResult(1);
				respBean.setResultNote(list.get(0).getCorpId()==null?"":list.get(0).getCorpId().toString());
			}else{
				respBean.setResult(0);
			}
		return respBean;
	}
	//零售id
	@Override
	public BaseRespBean isIdExit2(String lsId) {
		BaseRespBean respBean = new BaseRespBean();
		LimitInfo limitInfo = new LimitInfo();
		limitInfo.setLsId(lsId);
		List<LimitInfo> list = limitInfoMapper.selectByTypeId2(limitInfo);
		if (list.size() > 0) {
			respBean.setResult(1);
			respBean.setResultNote(list.get(0).getCorpId()==null?"":list.get(0).getCorpId().toString());
		}else{
			respBean.setResult(0);
		}
		return respBean;
	}
	
	private BaseRespBean checkAgency(String agencyListInfo, List<ProcessRepeatCheck> checks) {
		BaseRespBean respBean = new BaseRespBean();
		JSONArray jsonArray = new JSONArray(agencyListInfo);
		
		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject agencyObj = jsonArray.getJSONObject(i);
			String agencyName = agencyObj.getString("corpName");
			String agencyNum = agencyObj.getString("agencyNum");
			CorpInfoExample corpInfoExample = new CorpInfoExample();
			Criteria criteria = corpInfoExample.createCriteria();
			criteria.andCorpNameEqualTo(agencyName);
			Criteria criteria1 = corpInfoExample.createCriteria();
			criteria1.andAgencyNumEqualTo(agencyNum);
			corpInfoExample.or(criteria1);
			if (corpInfoMapper.countByExample(corpInfoExample) > 0) {
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
				respBean.setResultNote("经销商代码为【" + agencyNum + "】的经销商已推荐，不能再次推荐");
				return respBean;
			} else {
				checkInfo = new ProcessRepeatCheck();
				checkInfo.setProcessKey("accAgencyProcess");
				checkInfo.setItemKey("AGENCY_NAME");
				checkInfo.setItemValue(agencyName);
				checks.add(checkInfo);
				if (processRepeatChkService.isProcessExist(checkInfo)) {//验证经销商名称
					respBean.setResult(ErrorCodeEnum.ADD_FAILED);
					respBean.setResultNote("经销商名称为【" + agencyName + "】的经销商已推荐，不能再次推荐");
					return respBean;
				}
			}
		}
		
		return respBean;
	}
}
