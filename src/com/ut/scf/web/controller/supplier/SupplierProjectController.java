package com.ut.scf.web.controller.supplier;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.dao.auto.SysUserMapper;
import com.ut.scf.reqbean.supplier.SupplierProjectReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.bpm.impl.BaseActivitiService;
import com.ut.scf.service.project.IAgencyService;
import com.ut.scf.service.project.IProcessRepeatChkService;
import com.ut.scf.service.supplier.ISupplierProjectManagerService;
import com.ut.scf.web.controller.BaseJsonController;
@Controller
@RequestMapping("supplierProject")
public class SupplierProjectController extends BaseJsonController{
	@Resource ProcessEngine processEngine;
	@Resource BaseActivitiService baseActivitiService;
	@Resource ISupplierProjectManagerService supplierProjectManagerService;

	@Resource
	IProcessRepeatChkService processRepeatChkService;
	@Resource
	SysUserMapper userMapper;
	
	@Resource
	private IAgencyService agencyService;
	//获取供应商信息列表
		@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
		public @ResponseBody BaseRespBean getSupplierInfoList(HttpSession httpSession,
				@RequestBody SupplierProjectReqBean reqBean,BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
		//	System.out.println(reqBean.getCorpId());
			

//			分页
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber(reqBean.getPageNumber());
			page.setPageSize(reqBean.getPageSize());
			Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
			respBean = supplierProjectManagerService.getsupplierProjectList(paramMap, page);
	
			return respBean;
		
			
		}
		

		//4.经销商类型,发起流程
		@RequestMapping(value = "/startProcess", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
		public @ResponseBody BaseRespBean startProcess(HttpSession httpSession,
				@RequestBody SupplierProjectReqBean supplierProcessReqBean,BindingResult bindingResult) {
				BaseRespBean respBean = new BaseRespBean();
//				获取当前用户
				String userName = (String) httpSession
						.getAttribute(ScfConsts.SESSION_USERNAME);

				supplierProcessReqBean.setUserId(userName);
				supplierProcessReqBean.setActivitiKey("dykRepayment2");
				JSONObject supplierInfoStr = new JSONObject(supplierProcessReqBean);
				respBean = supplierProjectManagerService.startProcess(supplierInfoStr);
				return respBean;
		}
		
		
//		5.审核是否同意
		@RequestMapping(value = "/doAgree", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
		public @ResponseBody BaseRespBean doAgree(HttpSession httpSession,
				@RequestBody SupplierProjectReqBean reqBean,
				BindingResult bindingResult) {
				BaseRespBean respBean = new BaseRespBean();
//				获取当前用户
				String userName = (String) httpSession
						.getAttribute(ScfConsts.SESSION_USERNAME);
				reqBean.setUserId(userName);
				JSONObject jsonObject = new JSONObject(reqBean);
				respBean = supplierProjectManagerService.doAgree(jsonObject);
				return respBean;
		}
//		5.审核是否同意
		@RequestMapping(value = "/agreeThenAdd", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
		public @ResponseBody BaseRespBean agreeThenAdd(HttpSession httpSession,
				@RequestBody SupplierProjectReqBean reqBean,
				BindingResult bindingResult) {
				BaseRespBean respBean = new BaseRespBean();
//				获取当前用户
				String userName = (String) httpSession
						.getAttribute(ScfConsts.SESSION_USERNAME);
				reqBean.setUserId(userName);
				
				respBean = supplierProjectManagerService.agreeThenAdd(reqBean);
				return respBean;
		}
//		6.流程再申请
		@RequestMapping(value = "/reApply", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
		public @ResponseBody BaseRespBean reApply(HttpSession httpSession,
				@RequestBody SupplierProjectReqBean reqBean,
				BindingResult bindingResult) {
				BaseRespBean respBean = new BaseRespBean();
				
//				获取当前用户
				String userName = (String) httpSession
						.getAttribute(ScfConsts.SESSION_USERNAME);
				reqBean.setUserId(userName);
				JSONObject jsonObject = new JSONObject(reqBean);
				respBean = supplierProjectManagerService.reApply(jsonObject);
				return respBean;
		}
		

}
