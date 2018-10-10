package com.ut.scf.web.controller.pub;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.pub.BusinessHallReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.pub.IBusinessHallManagerService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * 门店
 * 
 * @author changx
 *
 */
@Controller
@RequestMapping("/businessHall")
public class BusinessHallController extends BaseJsonController {
	private static final Logger log = LoggerFactory
			.getLogger(BusinessHallController.class);

	@Resource
	private IBusinessHallManagerService businessHallManagerService;


	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean BusinessHallInfoList(HttpSession httpSession,
			@RequestBody BusinessHallReqBean reqBean,
			BindingResult bindingResult) {
		
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = businessHallManagerService.getBusinessHallList(paramMap, page);
	

		return respBean;
	}
	
}
