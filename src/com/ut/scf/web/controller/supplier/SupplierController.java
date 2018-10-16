package com.ut.scf.web.controller.supplier;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.SupplierInfoMapper;
import com.ut.scf.dao.auto.SysUserMapper;
import com.ut.scf.dao.auto.SysUserRoleMapper;
import com.ut.scf.pojo.auto.CorpInfo;
import com.ut.scf.pojo.auto.ProcessRepeatCheck;
import com.ut.scf.pojo.auto.SupplierInfo;
import com.ut.scf.pojo.auto.SupplierInfoExample;
import com.ut.scf.pojo.auto.SupplierInfoExample.Criteria;
import com.ut.scf.pojo.auto.SysUser;
import com.ut.scf.pojo.auto.SysUserRole;
import com.ut.scf.reqbean.project.AgencyFlowReqBean;
import com.ut.scf.reqbean.supplier.SupplierAgreeInfoReqBean;
import com.ut.scf.reqbean.supplier.SupplierList;
import com.ut.scf.reqbean.supplier.SupplierManagerReqBean;
import com.ut.scf.reqbean.supplier.SupplierProcessReqBean;
import com.ut.scf.reqbean.supplier.SupplierReApplyReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.bpm.impl.BaseActivitiService;
import com.ut.scf.service.project.IAgencyService;
import com.ut.scf.service.project.IProcessRepeatChkService;
import com.ut.scf.service.supplier.ISupplierManagerService;
import com.ut.scf.web.controller.BaseJsonController;


/**
 * @author Administrator
 * 供应商信息
 *
 */
@Controller
@RequestMapping("/supplierInfo")
public class SupplierController extends BaseJsonController {
	private static final Logger log = LoggerFactory
			.getLogger(SupplierController.class);
	
	@Resource ProcessEngine processEngine;
	@Resource BaseActivitiService baseActivitiService;
	@Resource ISupplierManagerService supplierManagerService;
	@Resource SupplierInfoMapper supplierInfoMapper;
	@Resource  SysUserRoleMapper userRoleMapper;
	@Resource
	IProcessRepeatChkService processRepeatChkService;
	@Resource
	SysUserMapper userMapper;
	
	@Resource
	private IAgencyService agencyService;
	
	//开始申请
	@RequestMapping(value = "/apply", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean apply(HttpSession httpSession,
			@Valid @RequestBody AgencyFlowReqBean flowReqBean,BindingResult bindingResult){
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		String userName = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		flowReqBean.setUserId(userName);
		flowReqBean.setActivitiKey("accAgencyProcess");
		JSONObject jsonObject = new JSONObject(flowReqBean);
		
		
		String agencyListInfo = jsonObject.getString("agencyListInfo");
		List<ProcessRepeatCheck> checks = new ArrayList<ProcessRepeatCheck>();
		
		// 经销商重复推荐验证
		respBean = checkAgency(agencyListInfo, checks);
		if (respBean.getResult() != 0) {
			return respBean;
		}
		

//		respBean = agencyService.startProcess(jsonObject);
		List<SupplierInfo> supplierInfos = supplierManagerService.addSuppliers(flowReqBean);
		for (SupplierInfo supplierInfo : supplierInfos) {
			SysUser user = new SysUser();
			user.setUserId(ScfUUID.generate());
			user.setUsername(supplierInfo.getAgencyNum());
			user.setPassword("e10adc3949ba59abbe56e057f20f883e");//123456
			user.setCorpId(supplierInfo.getCorpId());
			user.setNote(supplierInfo.getNote());
			user.setCreateTime(supplierInfo.getCreateTime());
			user.setStatus((byte) 1);
			userMapper.insert(user);
			SysUserRole userRole =new SysUserRole();
			userRole.setRecUid(ScfUUID.generate());
			userRole.setUserId(user.getUserId());
			userRole.setCreateTime(new Date());
			userRole.setRoleId("ROLE000020");//经销商角色id
			userRole.setStatus((byte)1);
			userRoleMapper.insert(userRole);
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
			SupplierInfoExample supplierInfoExample = new SupplierInfoExample();
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
	

	
	
	
	//获取供应商信息列表
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getSupplierInfoList(HttpSession httpSession,
			@RequestBody SupplierList reqBean,BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
	//	System.out.println(reqBean.getCorpId());
		

//		分页
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = supplierManagerService.getsupplierList(paramMap, page);
		log.debug("getCustInfoList: {}", respBean);
		return respBean;
	
		
	}
	 //添加企业信息
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean addCustInfo(HttpSession httpSession,
			@RequestBody SupplierManagerReqBean supplierManagerReqBean,BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			respBean = supplierManagerService.addSupplier(supplierManagerReqBean);
			return respBean;
	}
	
//	3.修改企业信息
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean updateCustInfo(HttpSession httpSession,
			@RequestBody SupplierManagerReqBean supplierManagerReqBean,BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			respBean = supplierManagerService.updateSupplier(supplierManagerReqBean);
			return respBean;
	}
	
	//4.经销商类型,发起流程
	@RequestMapping(value = "/startProcess", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean startProcess(HttpSession httpSession,
			@RequestBody SupplierProcessReqBean supplierProcessReqBean,BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
//			获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			
	/*		String corpId = (String) httpSession
					.getAttribute(ScfConsts.SESSION_CORP_ID);
			//通过corpId获取名称
			CorpInfoExample example=new CorpInfoExample();
			Criteria criteria = example.createCriteria();
			criteria=criteria.andCorpIdEqualTo(corpId);
			List<CorpInfo> list=corpInfoMapper.selectByExample(example);
			String corpName=list.get(0).getCorpName();
			
			corpProcessInfo.setUserId(corpName+"("+userName+")");*/
			supplierProcessReqBean.setUserId(userName);
			supplierProcessReqBean.setActivitiKey("changeAgency");
			JSONObject supplierInfoStr = new JSONObject(supplierProcessReqBean);
			respBean = supplierManagerService.startProcess(supplierInfoStr);
			return respBean;
	}
	
	
//	5.审核是否同意
	@RequestMapping(value = "/doAgree", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean doAgree(HttpSession httpSession,
			@RequestBody SupplierAgreeInfoReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
//			获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			reqBean.setUserId(userName);
			JSONObject jsonObject = new JSONObject(reqBean);
			respBean = supplierManagerService.doAgree(jsonObject);
			return respBean;
	}
	
//	6.流程再申请
	@RequestMapping(value = "/reApply", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean reApply(HttpSession httpSession,
			@RequestBody SupplierReApplyReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			
//			获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			reqBean.setUserId(userName);
			JSONObject jsonObject = new JSONObject(reqBean);
			respBean = supplierManagerService.reApply(jsonObject);
			return respBean;
	}
	
	@RequestMapping(value = "/agreeThenAdd", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean agreeThenAdd(HttpSession httpSession,
			@RequestBody SupplierAgreeInfoReqBean supplierAgreeInfoReqBean,BindingResult bindingResult) {
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			supplierAgreeInfoReqBean.setUserId(userName);
			return supplierManagerService.agreeThenAdd(supplierAgreeInfoReqBean);
	}
	
	
	
	@RequestMapping(value = "/agreeThenMod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean agreeThenMod(HttpSession httpSession,
			@RequestBody SupplierAgreeInfoReqBean supplierAgreeInfoReqBean,BindingResult bindingResult) {
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			supplierAgreeInfoReqBean.setUserId(userName);
			return supplierManagerService.agreeThenMod(supplierAgreeInfoReqBean);
	}
	
	
	
	

	
	
	
	
	
	

}
