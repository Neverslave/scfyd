package com.ut.scf.web.controller.project;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.reqbean.project.CommonInfoReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.ICommonService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * 通用控制类
 * 
 * @author jiangl
 *
 */
@Controller
@RequestMapping("/ydcommon")
public class CommonController extends BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(CommonController.class);

	@Resource
	private ICommonService commonService;

	@RequestMapping(value = "/cnhTemplates", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean cnhTemplates(
			@RequestBody CommonInfoReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();

		respBean = commonService.getTemplateList(reqBean);
		log.debug("respBean: {}", respBean);

		return respBean;
	}

	@RequestMapping(value = "/cnhTemplateUrl", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean cnhTemplateUrl(
			@RequestBody CommonInfoReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();

		respBean = commonService.getTemplateUrl(reqBean);
		log.debug("respBean: {}", respBean);

		return respBean;
	}
}
