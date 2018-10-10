package com.ut.scf.service.pub;

import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.reqbean.pub.CorpInfoReqBean;
import com.ut.scf.reqbean.pub.CustAgreeInfoReqBean;
import com.ut.scf.respbean.BaseRespBean;

/**
 * @author jihang
 *	企业
 */
public interface ICustManagerService {
	
	public BaseRespBean getcorpList(Map<String, Object> paramMap, PageInfoBean page);
	
	public BaseRespBean addCorp(CorpInfoReqBean corpInfoReqBean);
	
	public BaseRespBean updateCorp(CorpInfoReqBean corpInfoReqBean);
	
	/**
	 * @param jsonObject
	 * 发起流程
	 * @return 
	 */
	public BaseRespBean startProcess(JSONObject jsonObject);
	
	/**
	 * 审核的数据
	 * @param jsonObject 需要处理的数据，转换为jsonObject传过来
	 * @return
	 */
	public BaseRespBean doAgree(JSONObject jsonObject);
	
	/**
	 * 流程再申请
	 * @param jsonObject 需要处理的数据，转换为jsonObject传过来
	 * @return
	 */
	public BaseRespBean reApply(JSONObject jsonObject);
	
	
	/**
	 * 流程同意并保存到业务表中
	 * @param custAgreeInfoReqBean
	 * @return
	 */
	public BaseRespBean agreeThenAdd(CustAgreeInfoReqBean custAgreeInfoReqBean);
	
	/**
	 * 流程同意并修改业务表
	 * @param custAgreeInfoReqBean
	 * @return
	 */
	public BaseRespBean agreeThenMod(CustAgreeInfoReqBean custAgreeInfoReqBean);

	BaseRespBean doAgreeWechat(CustAgreeInfoReqBean custAgreeInfoReqBean);

}
