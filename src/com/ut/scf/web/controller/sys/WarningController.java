package com.ut.scf.web.controller.sys;

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
import com.ut.scf.reqbean.sys.WarningReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.IWarningService;
import com.ut.scf.web.controller.BaseJsonController;

@Controller
@RequestMapping("/warning")
public class WarningController extends BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(WarningController.class);
	@Resource
	private IWarningService iWarningService;

	// 获取批处理列表
	@RequestMapping(value = "/list")
	@ResponseBody
	public BaseRespBean warningInfoList(HttpSession httpSession,@Valid @RequestBody WarningReqBean reqBean)
			throws IOException {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		String username = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		paramMap.put("username", username);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		BaseRespBean respBean = new BaseRespBean();
		respBean = iWarningService.warningInfoList(paramMap, page);
		return respBean;
	}

	// 查阅
	@RequestMapping(value = "/count")
	@ResponseBody
	public String warningInfoDetail(HttpSession httpSession,@Valid @RequestBody WarningReqBean reqBean)
			throws IOException {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		String username = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		paramMap.put("username", username);
		return iWarningService.warningInfoCount(paramMap) + "";
	}
	
	// 更新
	@RequestMapping(value = "/detail", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean warningInfoUpdate(
			@Valid @RequestBody WarningReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		respBean = iWarningService.warningInfoDetail(reqBean);

		return respBean;
	}
	
	// 删除
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean warningInfoDelete(
			@Valid @RequestBody WarningReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String warningId = reqBean.getRecUid();
		respBean = iWarningService.warningInfoDelete(warningId);
		return respBean;
	}

}
