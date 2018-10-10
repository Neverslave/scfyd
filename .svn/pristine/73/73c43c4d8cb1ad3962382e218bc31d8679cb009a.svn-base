package com.ut.scf.web.controller.project;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.commons.codec.digest.Md5Crypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.CorpInfoMapper;
import com.ut.scf.dao.auto.SysUserMapper;
import com.ut.scf.dao.auto.SysUserRoleMapper;
import com.ut.scf.pojo.auto.CorpInfo;
import com.ut.scf.pojo.auto.CorpInfoExample;
import com.ut.scf.pojo.auto.ProcessRepeatCheck;
import com.ut.scf.pojo.auto.SysUser;
import com.ut.scf.pojo.auto.CorpInfoExample.Criteria;
import com.ut.scf.pojo.auto.SysUserRole;
import com.ut.scf.reqbean.project.AgencyFlowReqBean;
import com.ut.scf.reqbean.project.AgencySearchPageReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.project.IAgencyService;
import com.ut.scf.service.project.IProcessRepeatChkService;
import com.ut.scf.web.controller.BaseJsonController;

@Controller
@RequestMapping("/agency")
public class AgencyManageController extends BaseJsonController{

	private static final Logger log = LoggerFactory
			.getLogger(AgencyManageController.class);
	
	@Resource
	private IAgencyService agencyService;
	
	@Resource
	private IActivitiService activitiService;
	
	@Resource
	CorpInfoMapper corpInfoMapper;
	
	@Resource
	SysUserMapper userMapper;
	
	@Resource
	SysUserRoleMapper userRoleMapper;
	
	@Resource
	IProcessRepeatChkService processRepeatChkService;
	
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getAgencyList(HttpSession httpSession,
			@Valid @RequestBody AgencySearchPageReqBean searchPage,
			BindingResult bindingResult){
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		respBean = this.agencyService.agencyList(searchPage);

		return respBean;
	}
	
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
		List<CorpInfo> corpinfos = agencyService.addAgency(flowReqBean);
		
		for (CorpInfo corpInfo : corpinfos) {
			SysUser user = new SysUser();
			user.setUserId(ScfUUID.generate());
			user.setUsername(corpInfo.getAgencyNum());
			user.setRealname(corpInfo.getCorpName());
			user.setPassword("e10adc3949ba59abbe56e057f20f883e");//123456
			user.setMobilephone(corpInfo.getContactInfo());
			user.setCorpId(corpInfo.getCorpId());
			user.setNote(corpInfo.getNote());
			user.setCreateTime(corpInfo.getCreateTime());
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
	
	@RequestMapping(value = "/doAgree", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean doAgree(HttpSession httpSession,
			@RequestBody AgencyFlowReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			// 获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			reqBean.setUserId(userName);
			respBean = agencyService.doAgree(reqBean);
			return respBean;
	}
	
	@RequestMapping(value = "/reApply", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean reApply(HttpSession httpSession,
			@RequestBody AgencyFlowReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			// 获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			reqBean.setUserId(userName);
			JSONObject jsonObject = new JSONObject(reqBean);
			respBean = agencyService.reApply(jsonObject);
			return respBean;
	}
	
	//大宗
	@ResponseBody
	@RequestMapping(value = "/isIdExit", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public  BaseRespBean isIdExit(HttpSession httpSession,String dzId) {
		BaseRespBean respBean = new BaseRespBean();
		respBean = agencyService.isIdExit(dzId);
		return respBean;
	}
	
	//零售
	@ResponseBody
	@RequestMapping(value = "/isIdExit2", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public  BaseRespBean isIdExit2(HttpSession httpSession,String lsId) {
		BaseRespBean respBean = new BaseRespBean();
		respBean = agencyService.isIdExit2(lsId);
		return respBean;
	}
}
