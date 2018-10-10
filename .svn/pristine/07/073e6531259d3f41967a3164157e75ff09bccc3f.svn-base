package com.ut.scf.web.controller.office;

import java.io.IOException;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

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
import com.ut.scf.reqbean.RecUidReqBean;
import com.ut.scf.reqbean.office.InternalInformAddReqBean;
import com.ut.scf.reqbean.office.InternalInformListReqBean;
import com.ut.scf.reqbean.office.InternalInformUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.office.IinternalInformService;
import com.ut.scf.service.sys.IUserOperService;
import com.ut.scf.web.controller.BaseJsonController;

@Controller
@RequestMapping("/internalInform")
public class InternalInformController extends BaseJsonController{
	private static final Logger log = LoggerFactory
			.getLogger(InternalInformController.class);
	@Resource
	private IinternalInformService internalInform;
	
	@Resource
	private IUserOperService userOperService;
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean InternalInformList(
			HttpSession httpSession,
			@Valid @RequestBody InternalInformListReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		// 获取用户信息
		
		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);

		
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = internalInform.getInternalInformList(paramMap, page);
		return respBean;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean InternalInformAdd(
			HttpSession httpSession,
			@Valid @RequestBody InternalInformAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		// 获取用户信息
		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("userId", userIdSession);
		respBean = internalInform.addInternalInform(reqBean);
		return respBean;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean InternalInformDelete(
			HttpSession httpSession,
			@Valid @RequestBody RecUidReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String recUid = reqBean.getRecUid();
		respBean = internalInform.deleteInternalInform(recUid);
		return respBean;
	}
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean InternalInformUpdate(
			HttpSession httpSession,
			@Valid @RequestBody InternalInformUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = internalInform.updateInternalInform(paramMap);
		log.debug("internalInform respBean : {}", respBean);
		return respBean;
	}
	
//	修改内部公告信息
	@RequestMapping(value = "/modInfo", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean updateInternalform(HttpSession httpSession,
			@RequestBody InternalInformUpdateReqBean reqBean,BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			respBean = internalInform.updateInternalformInfo(reqBean);
			return respBean;
	}

	@RequestMapping(value = "/detail", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean InternalInformDetail(
			HttpSession httpSession,
			@Valid @RequestBody InternalInformListReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		// 获取用户信息
		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = internalInform.getInternalInform(paramMap,page);
		
		return respBean;
	}
	
	@RequestMapping(value = "/count", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean InternalInformCount(
			HttpSession httpSession,
			@Valid @RequestBody InternalInformListReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = internalInform.countInternalInform(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/delInform", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean MyInformDelete(
			HttpSession httpSession,
			@Valid @RequestBody RecUidReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String recUid = reqBean.getRecUid();
		respBean = internalInform.deleteMyInform(recUid);
		return respBean;
	}
}
