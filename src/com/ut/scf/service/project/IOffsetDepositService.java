package com.ut.scf.service.project;

import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;

import com.ut.scf.reqbean.project.offsetDepositAgreeReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IOffsetDepositService {
	/**
	 * 获取车辆信息
	 * @param paramMap
	 * @return
	 */
	public BaseRespBean getCarInfo(Map<String, Object> paramMap);
	/**
	 * 流程最后同意的一步，写入业务数据库
	 * @param offsetDepositAgreeReqBean
	 * @return
	 */
	public BaseRespBean agreeThenMod(offsetDepositAgreeReqBean offsetDepositAgreeReqBean);
	/**
	 * 发起流程
	 * @param jsonObject
	 * @return
	 */
	public BaseRespBean startProcess(JSONObject jsonObject);
	public BaseRespBean reApply(JSONObject jsonObject);
	
	BaseRespBean wechatMod(offsetDepositAgreeReqBean offsetDepositAgreeReqBean);
}
