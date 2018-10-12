package com.ut.scf.service.supplier;

import java.util.List;

import org.activiti.engine.impl.util.json.JSONObject;

import com.ut.scf.pojo.auto.SupplierInfo;
import com.ut.scf.reqbean.project.AgencyFlowReqBean;
import com.ut.scf.reqbean.supplier.SupplierSearchPageReqBean;
import com.ut.scf.respbean.BaseRespBean;

/**
 * @author zhu
 * 管理员供应商管理界面 操作类
 *
 */
public interface ISupplierService {
	
	/**
	 * @param searchPageReqBean
	 * @return
	 * 搜索页面
	 */
	public BaseRespBean SupplierList(SupplierSearchPageReqBean searchPageReqBean);
	
	
	public BaseRespBean doAgree(AgencyFlowReqBean reqBean);
	
	public List<SupplierInfo> addSupplier(AgencyFlowReqBean reqBean);
	
	public BaseRespBean startProcess(JSONObject jsonObject);
	
	public BaseRespBean reApply(JSONObject jsonObject);
	
	
	
	
	
	
	

}
