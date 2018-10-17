package com.ut.scf.service.supplier;

import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.reqbean.supplier.SupplierProjectReqBean;
import com.ut.scf.respbean.BaseRespBean;

/**
 * 
 *供应商信息管理接口
 * 
 */

public interface ISupplierProjectManagerService {
	//获取供应商信息列表
	public BaseRespBean getsupplierProjectList(Map<String, Object> paramMap,PageInfoBean page);
	//增加供应商
	public BaseRespBean addSupplierProject(SupplierProjectReqBean supplierManagerReqBean );


	
	
	/**
	 * 发起流程
	 * @param jsonObject
	 * @return
	 */
	public BaseRespBean startProcess(JSONObject jsonObject);
	
	/**
	 * 审核的数据
	 * @param jsonObject
	 * @return
	 */
	BaseRespBean agreeThenAdd(SupplierProjectReqBean supplierManagerReqBean);
	
	/**
	 * 流程再申请
	 * @param jsonObject 需要处理的数据，转换为jsonObject传过来
	 * @return
	 */
	public BaseRespBean reApply(JSONObject jsonObject);
	BaseRespBean doAgree(JSONObject jsonObject);
	
	
	

	
	
	
	
	
	
	
	
	
	
	

}
