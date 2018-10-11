package com.ut.scf.service.supplier;

import org.activiti.engine.impl.util.json.JSONObject;

import com.sun.javafx.collections.MappingChange.Map;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.reqbean.supplier.SupplierManagerReqBean;
import com.ut.scf.respbean.BaseRespBean;

/**
 * 
 *供应商信息管理接口
 * 
 */

public interface ISupplierManagerService {
	//获取供应商信息列表
	public BaseRespBean getsupplierList(Map<String, Object> paramMap,PageInfoBean page);
	//增加供应商
	public BaseRespBean addSupplier(SupplierManagerReqBean supplierManagerReqBean );
	//更新供应商信息
	public BaseRespBean updateSupplier(SupplierManagerReqBean supplierManagerReqBean ); 

	
	
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
	public BaseRespBean doAgree(JSONObject jsonObject);
	
	/**
	 * 流程再申请
	 * @param jsonObject 需要处理的数据，转换为jsonObject传过来
	 * @return
	 */
	public BaseRespBean reApply(JSONObject jsonObject);
	
	
	/**
	 * 流程同意并添加到数据库中 supplier_info 表
	 * @param supplierManagerReqBean
	 * @return
	 */
	public BaseRespBean agreeThenAdd(SupplierManagerReqBean supplierManagerReqBean);
	
	/**
	 * 流程同意并修改业务数据
	 * @param supplierManagerReqBean
	 * @return
	 */
	public BaseRespBean agreeThenMod(SupplierManagerReqBean supplierManagerReqBean);
	
	
	
	
	
	
	
	
	
	
	
	
	

}
