package com.ut.scf.web.controller.pub;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.impl.util.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.dao.auto.CorpInfoMapper;
import com.ut.scf.pojo.auto.CorpInfo;
import com.ut.scf.pojo.auto.CorpInfoExample;
import com.ut.scf.pojo.auto.CorpInfoExample.Criteria;
import com.ut.scf.reqbean.pub.CorpInfoReqBean;
import com.ut.scf.reqbean.pub.CustAgreeInfoReqBean;
import com.ut.scf.reqbean.pub.CustListReqBean;
import com.ut.scf.reqbean.pub.CustProcessReqBean;
import com.ut.scf.reqbean.pub.CustReApplyReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.bpm.impl.BaseActivitiService;
import com.ut.scf.service.pub.ICustManagerService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * @author jihang
 *	企业信息查看类
 */
@Controller
@RequestMapping("/custInfo")
public class CustManagerController extends BaseJsonController{
	private static final Logger log = LoggerFactory
				.getLogger(CustManagerController.class);
	@Resource private ICustManagerService custManagerService;
	@Resource ProcessEngine processEngine;
	@Resource BaseActivitiService baseActivitiService;
	
	@Resource
	private CorpInfoMapper corpInfoMapper;
//	1.列出所有的企业信息
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getCustInfoList(HttpSession httpSession,
			@RequestBody CustListReqBean reqBean,BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
//			分页
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber(reqBean.getPageNumber());
			page.setPageSize(reqBean.getPageSize());
			Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
			respBean = custManagerService.getcorpList(paramMap, page);
			log.debug("getCustInfoList: {}", respBean);
			
			return respBean;
	}
//	2.添加企业信息
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean addCustInfo(HttpSession httpSession,
			@RequestBody CorpInfoReqBean corpInfo,BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			respBean = custManagerService.addCorp(corpInfo);
			return respBean;
	}
//	3.修改企业信息
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean updateCustInfo(HttpSession httpSession,
			@RequestBody CorpInfoReqBean corpInfo,BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			respBean = custManagerService.updateCorp(corpInfo);
			return respBean;
	}
//	4.经销商类型,发起流程
	@RequestMapping(value = "/startProcess", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean startProcess(HttpSession httpSession,
			@RequestBody CustProcessReqBean corpProcessInfo,BindingResult bindingResult) {
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
			corpProcessInfo.setUserId(userName);
			corpProcessInfo.setActivitiKey("changeAgency");
			JSONObject corpInfoStr = new JSONObject(corpProcessInfo);
			respBean = custManagerService.startProcess(corpInfoStr);
			return respBean;
	}
	
	
//	5.审核是否同意
	@RequestMapping(value = "/doAgree", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean doAgree(HttpSession httpSession,
			@RequestBody CustAgreeInfoReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
//			获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			reqBean.setUserId(userName);
			JSONObject jsonObject = new JSONObject(reqBean);
			respBean = custManagerService.doAgree(jsonObject);
			return respBean;
	}

	
//	6.流程再申请
	@RequestMapping(value = "/reApply", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean reApply(HttpSession httpSession,
			@RequestBody CustReApplyReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			
//			获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			reqBean.setUserId(userName);
			JSONObject jsonObject = new JSONObject(reqBean);
			respBean = custManagerService.reApply(jsonObject);
			return respBean;
	}
	
	@RequestMapping(value = "/agreeThenAdd", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean agreeThenAdd(HttpSession httpSession,
			@RequestBody CustAgreeInfoReqBean custAgreeInfoReqBean,BindingResult bindingResult) {
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			custAgreeInfoReqBean.setUserId(userName);
			return custManagerService.agreeThenAdd(custAgreeInfoReqBean);
	}
	
	@RequestMapping(value = "/agreeThenMod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean agreeThenMod(HttpSession httpSession,
			@RequestBody CustAgreeInfoReqBean custAgreeInfoReqBean,BindingResult bindingResult) {
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			custAgreeInfoReqBean.setUserId(userName);
			return custManagerService.agreeThenMod(custAgreeInfoReqBean);
	}
}
