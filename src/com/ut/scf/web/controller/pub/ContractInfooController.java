package com.ut.scf.web.controller.pub;

import java.io.IOException;
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

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.pub.ContractInfoDeleteReqBean;
import com.ut.scf.reqbean.pub.ContractInfoListReqBean;
import com.ut.scf.reqbean.pub.InformFileListReqBean;
import com.ut.scf.reqbean.pub.UploadFileRelaDeleteReqBean;
import com.ut.scf.reqbean.pub.UploadFileRelaListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.pub.IContractInfoService;
import com.ut.scf.service.pub.IUploadFileRelaService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * @author jihang
 * 文件上传controller类
 */
@Controller
@RequestMapping("/contractinfo")
public class ContractInfooController extends BaseJsonController{
	@Resource private IContractInfoService contractInfoService;
	private static final Logger log = LoggerFactory
			.getLogger(ContractInfooController.class);
	//展示上传的文件
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getUploadFileRela(HttpSession httpSession,
			@RequestBody ContractInfoListReqBean reqBean, BindingResult bindingResult) throws IOException{
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String,Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = contractInfoService.getContractList(paramMap,page);
		return respBean;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean deleteUploadFileRela(HttpSession httpSession,
			@RequestBody ContractInfoDeleteReqBean reqBean, BindingResult bindingResult) throws IOException{
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String contractid = reqBean.getContractid();
		respBean = contractInfoService.deleteContract(contractid);
		return respBean;
	}
	
}
